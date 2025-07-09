"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Search,
  Package,
  CheckCircle,
  Clock,
  AlertCircle,
  Mail,
  FileText,
  DollarSign,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { API_CONFIG, buildApiUrl, handleApiResponse, getOptimalTrackingEndpoint, logEndpointUsage } from "@/lib/api-config";
import {
  StatusBadge,
  ChangeTypeBadge,
  PricingDisplay,
} from "@/components/ui/status-badge";
import { Suspense } from "react";

// Types
interface OrderStatus {
  order_number: string;
  status: "pending" | "processing" | "in_progress" | "completed" | "cancelled";
  status_label: string;
  status_color: string;

  // Order change information
  order_change?: "minor" | "major" | null;
  order_change_label?: string;
  order_change_color?: string;

  // Pricing information
  pricing_type?: "free" | "paid" | null;
  pricing_type_label?: string;
  pricing_type_color?: string;
  order_amount?: number;
  formatted_order_amount?: string;

  // Customer information
  full_name?: string;
  company_name?: string;
  division?: string;
  company_email?: string;

  // Product information
  product_display_name?: string;
  project_type?: string;
  project_name?: string;
  order_description?: string;

  // Timestamps
  created_at: string;
  last_updated: string;
  updated_at?: string;

  // Additional data
  status_history?: StatusHistoryItem[];
  google_drive_link?: string;
}

interface StatusHistoryItem {
  status: string;
  previous_status?: string;
  changed_at: string;
  changed_by?: number;
}


interface SearchResult {
  order_number: string;
  full_name: string;
  company_name: string;
  status: string;
  status_label: string;
  status_color: string;
  order_change?: string;
  order_change_label?: string;
  pricing_type?: string;
  formatted_order_amount?: string;
  created_at: string;
}

interface TrackingFormData {
  identifier: string;
}

interface TrackingFormErrors {
  [key: string]: string;
}

// Komponen child yang menggunakan useSearchParams
const OrderTrackingClient: React.FC = () => {
  const [formData, setFormData] = useState<TrackingFormData>({
    identifier: "",
  });
  const [errors, setErrors] = useState<TrackingFormErrors>({});
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [orderStatus, setOrderStatus] = useState<OrderStatus | null>(null);
  const [searchError, setSearchError] = useState<string>("");
  const [viewMode, setViewMode] = useState<"status" | "details">("status");
  const [trackingHistory, setTrackingHistory] = useState<string[]>([]);

  // Email validation regex
  const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Order number validation regex
  const orderNumberRegex: RegExp = /^ORD-\d{8}-\d{4}$/;

  const validateField = (
    field: keyof TrackingFormData,
    value: string
  ): string => {
    switch (field) {
      case "identifier":
        if (!value.trim()) return "Order number or email is required";
        return "";
      default:
        return "";
    }
  };

  const detectIdentifierType = (
    value: string
  ): "email" | "order" | "unknown" => {
    if (emailRegex.test(value)) return "email";
    if (orderNumberRegex.test(value)) return "order";
    return "unknown";
  };

  const handleInputChange = (
    field: keyof TrackingFormData,
    value: string
  ): void => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear errors when user starts typing
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  };

  const searchParams = useSearchParams();

  // Load tracking history from localStorage and URL params
  useEffect(() => {
    const saved = localStorage.getItem("order_tracking_history");
    if (saved) {
      try {
        setTrackingHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Error parsing tracking history:", e);
      }
    }

    // Check for URL parameters
    const identifier = searchParams.get("identifier");
    const mode = searchParams.get("mode");

    if (identifier) {
      setFormData({ identifier });
      if (mode === "details") {
        setViewMode("details");
      }
      // Auto-search if identifier is provided
      setTimeout(() => {
        const form = document.querySelector("form");
        if (form) {
          form.dispatchEvent(
            new Event("submit", { cancelable: true, bubbles: true })
          );
        }
      }, 100);
    }
  }, [searchParams]);

  const saveToHistory = (identifier: string) => {
    const newHistory = [
      identifier,
      ...trackingHistory.filter((item) => item !== identifier),
    ].slice(0, 5);
    setTrackingHistory(newHistory);
    localStorage.setItem("order_tracking_history", JSON.stringify(newHistory));
  };

  const validateForm = (): boolean => {
    const newErrors: TrackingFormErrors = {};

    // Validate identifier
    const identifierError = validateField("identifier", formData.identifier);
    if (identifierError) newErrors.identifier = identifierError;

    // Additional validation for identifier type
    if (formData.identifier.trim()) {
      const type = detectIdentifierType(formData.identifier);
      if (type === "unknown") {
        newErrors.identifier =
          "Please enter a valid order number (ORD-20250708-3467) or email address";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleTrackOrder = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSearching(true);
    setSearchError("");
    setOrderStatus(null);

    try {
      // 🎯 Use optimal endpoint selection
      const endpoint = getOptimalTrackingEndpoint(formData.identifier, viewMode);
      
      // 📊 Log usage for analytics
      logEndpointUsage(endpoint, formData.identifier);

      const response = await fetch(buildApiUrl(endpoint), {
        method: "GET",
      });

      const result = await handleApiResponse(response);
      setOrderStatus(result.data);

      // Save to tracking history
      saveToHistory(formData.identifier);
    } catch (error) {
      console.error("Error tracking order:", error);
      setSearchError(
        error instanceof Error
          ? error.message
          : "An error occurred while tracking your order. Please try again."
      );
    } finally {
      setIsSearching(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case "processing":
        return <Package className="w-5 h-5 text-blue-500" />;
      case "in_progress":
        return <Package className="w-5 h-5 text-blue-600" />;
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "cancelled":
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Package className="w-5 h-5 text-gray-500" />;
    }
  };

  const isValidGoogleDriveLink = (link: string): boolean => {
    return link.includes('drive.google.com') || link.includes('docs.google.com');
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Track Your Order
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Enter your order number (ORD-20250708-3467) or email address to
            track your order status. Auto-detection will determine the tracking
            method.
          </p>
          <div className="mt-6 flex gap-3 justify-center">
            <Link href="/order">
              <Button variant="outline" className="inline-flex items-center gap-2">
                <Package className="w-4 h-4" />
                Create New Order
              </Button>
            </Link>
            <Link href="/order/search">
              <Button variant="outline" className="inline-flex items-center gap-2">
                <Search className="w-4 h-4" />
                Search All Orders
              </Button>
            </Link>
          </div>
        </div>

        {/* View Mode Toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-sm border">
            <button
              onClick={() => {
                setViewMode("status");
                setOrderStatus(null); // Clear previous results when switching mode
              }}
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                viewMode === "status"
                  ? "bg-blue-500 text-white"
                  : "text-gray-600 hover:text-gray-900"
              )}
            >
              Quick Status
            </button>
            <button
              onClick={() => {
                setViewMode("details");
                setOrderStatus(null); // Clear previous results when switching mode
              }}
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                viewMode === "details"
                  ? "bg-blue-500 text-white"
                  : "text-gray-600 hover:text-gray-900"
              )}
            >
              Full Details
            </button>
          </div>
        </div>

        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Search className="w-6 h-6" />
              Track Order
            </CardTitle>
            <CardDescription>
              {viewMode === "status"
                ? "Enter order number or email to get quick status"
                : "Enter order number or email to get full order details"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {searchError && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="w-5 h-5 text-red-500" />
                  <p className="text-red-700 font-medium">Error</p>
                </div>
                <p className="text-red-600 text-sm mt-1">{searchError}</p>
              </div>
            )}

            <form onSubmit={handleTrackOrder} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="identifier" className="text-sm font-medium">
                  Order Number or Email <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="identifier"
                  type="text"
                  placeholder="Enter order number (ORD-20250708-3467) or email address"
                  value={formData.identifier}
                  onChange={(e) =>
                    handleInputChange("identifier", e.target.value)
                  }
                  className={cn(
                    "h-12",
                    errors.identifier ? "border-red-500 focus:ring-red-500" : ""
                  )}
                />
                {formData.identifier && (
                  <div className="text-xs text-gray-500 mt-1">
                    Detected:{" "}
                    {detectIdentifierType(formData.identifier) === "email"
                      ? "Email Address"
                      : detectIdentifierType(formData.identifier) === "order"
                      ? "Order Number"
                      : "Unknown format"}
                  </div>
                )}
                {errors.identifier && (
                  <div className="flex items-center space-x-1 text-red-500 text-xs">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.identifier}</span>
                  </div>
                )}
              </div>

              {/* Tracking History */}
              {trackingHistory.length > 0 && (
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-600">
                    Recent Searches
                  </Label>
                  <div className="flex flex-wrap gap-2">
                    {trackingHistory.map((item, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => handleInputChange("identifier", item)}
                        className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-center">
                <Button
                  type="submit"
                  disabled={isSearching}
                  className="px-8 py-3 text-base font-medium"
                >
                  {isSearching ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Searching...</span>
                    </div>
                  ) : (
                    <>
                      <Search className="w-5 h-5 mr-2" />
                      {viewMode === "status" ? "Get Status" : "Get Details"}
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Order Status Display */}
        {orderStatus && (
          <Card className="mt-8 shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Package className="w-6 h-6" />
                {viewMode === "status" ? "Order Status" : "Order Details"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Quick Status View */}
              {viewMode === "status" && (
                <div className="text-center space-y-6">
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Order Number
                    </label>
                    <p className="text-2xl font-bold text-gray-900 mt-1">
                      {orderStatus.order_number}
                    </p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Current Status
                    </label>
                    <div className="flex items-center justify-center gap-3 mt-2">
                      {getStatusIcon(orderStatus.status)}
                      <StatusBadge
                        status={orderStatus.status}
                        statusColor={orderStatus.status_color}
                        statusLabel={orderStatus.status_label}
                        size="lg"
                      />
                    </div>
                  </div>

                  {/* Additional status info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium text-gray-500">
                          Change Type
                        </label>
                        <div className="mt-1">
                          <ChangeTypeBadge
                            orderChange={orderStatus.order_change}
                            orderChangeLabel={orderStatus.order_change_label}
                            orderChangeColor={orderStatus.order_change_color}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-gray-500">
                          Order Date
                        </label>
                        <p className="text-lg font-medium text-gray-900">
                          {formatDate(orderStatus.created_at)}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium text-gray-500">
                          Pricing
                        </label>
                        <div className="mt-1">
                          <PricingDisplay
                            pricingType={orderStatus.pricing_type}
                            pricingTypeLabel={orderStatus.pricing_type_label}
                            pricingTypeColor={orderStatus.pricing_type_color}
                            formattedOrderAmount={
                              orderStatus.formatted_order_amount
                            }
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-gray-500">
                          Last Updated
                        </label>
                        <p className="text-lg font-medium text-gray-900">
                          {formatDate(
                            orderStatus.last_updated ||
                              orderStatus.updated_at ||
                              orderStatus.created_at
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Full Details View */}
              {viewMode === "details" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Order Number
                      </label>
                      <p className="text-lg font-semibold text-gray-900">
                        {orderStatus.order_number}
                      </p>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Status
                      </label>
                      <div className="flex items-center gap-2 mt-1">
                        {getStatusIcon(orderStatus.status)}
                        <StatusBadge
                          status={orderStatus.status}
                          statusColor={orderStatus.status_color}
                          statusLabel={orderStatus.status_label}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Change Type
                      </label>
                      <div className="mt-1">
                        <ChangeTypeBadge
                          orderChange={orderStatus.order_change}
                          orderChangeLabel={orderStatus.order_change_label}
                          orderChangeColor={orderStatus.order_change_color}
                        />
                      </div>
                    </div>

                    {orderStatus.full_name && (
                      <div>
                        <label className="text-sm font-medium text-gray-500">
                          Customer
                        </label>
                        <p className="text-lg font-medium text-gray-900">
                          {orderStatus.full_name}
                        </p>
                        {orderStatus.company_name && (
                          <p className="text-sm text-gray-600">
                            {orderStatus.company_name}
                          </p>
                        )}
                        {orderStatus.division && (
                          <p className="text-sm text-gray-600">
                            {orderStatus.division}
                          </p>
                        )}
                        {orderStatus.company_email && (
                          <p className="text-sm text-gray-600">
                            {orderStatus.company_email}
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Pricing
                      </label>
                      <div className="mt-1">
                        <PricingDisplay
                          pricingType={orderStatus.pricing_type}
                          pricingTypeLabel={orderStatus.pricing_type_label}
                          pricingTypeColor={orderStatus.pricing_type_color}
                          formattedOrderAmount={
                            orderStatus.formatted_order_amount
                          }
                        />
                      </div>
                    </div>

                    {orderStatus.product_display_name && (
                      <div>
                        <label className="text-sm font-medium text-gray-500">
                          Product/Service
                        </label>
                        <p className="text-lg font-medium text-gray-900">
                          {orderStatus.product_display_name}
                        </p>
                        {orderStatus.project_type && (
                          <p className="text-sm text-gray-600 capitalize">
                            {orderStatus.project_type} Project
                          </p>
                        )}
                        {orderStatus.project_name && (
                          <p className="text-sm text-gray-600">
                            {orderStatus.project_name}
                          </p>
                        )}
                      </div>
                    )}

                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Order Date
                      </label>
                      <p className="text-lg font-medium text-gray-900">
                        {formatDate(orderStatus.created_at)}
                      </p>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Last Updated
                      </label>
                      <p className="text-lg font-medium text-gray-900">
                        {formatDate(
                          orderStatus.last_updated ||
                            orderStatus.updated_at ||
                            orderStatus.created_at
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Additional Details - Only shown in details view */}
              {viewMode === "details" && (
                <>
                  {/* Order Description */}
                  {orderStatus.order_description && (
                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <label className="text-sm font-medium text-gray-500">
                        Order Description
                      </label>
                      <p className="text-gray-700 mt-1 whitespace-pre-wrap">
                        {orderStatus.order_description}
                      </p>
                    </div>
                  )}

                  {/* Status History */}
                  {orderStatus.status_history &&
                    orderStatus.status_history.length > 0 && (
                      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                        <label className="text-sm font-medium text-gray-500">
                          Status History
                        </label>
                        <div className="mt-2 space-y-3">
                          {orderStatus.status_history.map((history, index) => (
                            <div
                              key={index}
                              className="flex justify-between items-center p-2 bg-white rounded border"
                            >
                              <div>
                                <span className="text-gray-700 font-medium">
                                  {history.status}
                                </span>
                                {history.previous_status && (
                                  <span className="text-gray-500 text-sm ml-2">
                                    (from {history.previous_status})
                                  </span>
                                )}
                              </div>
                              <span className="text-gray-500 text-sm">
                                {formatDate(history.changed_at)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                  {/* Google Drive Link */}
                  {orderStatus.google_drive_link && (
                    <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                      <label className="text-sm font-medium text-blue-600 flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        Google Drive Link
                      </label>
                      <div className="mt-2">
                        <div className="p-3 bg-white rounded border hover:bg-gray-50 transition-colors">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <FileText className="w-5 h-5 text-gray-400" />
                              <div>
                                <span className="text-sm font-medium text-gray-900">
                                  Supporting Documents
                                </span>
                                <div className="text-xs text-gray-500">
                                  {isValidGoogleDriveLink(orderStatus.google_drive_link) 
                                    ? "Valid Google Drive Link" 
                                    : "External Link"}
                                </div>
                              </div>
                            </div>
                            <a
                              href={orderStatus.google_drive_link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                            >
                              Open Link
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* Summary section for both views */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg text-center">
                  <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full mx-auto mb-2">
                    <Package className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="text-sm font-medium text-blue-900">
                    Order Status
                  </div>
                  <div className="text-xs text-blue-600 mt-1">
                    Current: {orderStatus.status_label}
                  </div>
                </div>

                {orderStatus.order_change && (
                  <div className="p-4 bg-orange-50 rounded-lg text-center">
                    <div className="flex items-center justify-center w-8 h-8 bg-orange-100 rounded-full mx-auto mb-2">
                      <Settings className="w-4 h-4 text-orange-600" />
                    </div>
                    <div className="text-sm font-medium text-orange-900">
                      Change Level
                    </div>
                    <div className="text-xs text-orange-600 mt-1">
                      {orderStatus.order_change_label}
                    </div>
                  </div>
                )}

                {orderStatus.pricing_type && (
                  <div className="p-4 bg-green-50 rounded-lg text-center">
                    <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-full mx-auto mb-2">
                      <DollarSign className="w-4 h-4 text-green-600" />
                    </div>
                    <div className="text-sm font-medium text-green-900">
                      Pricing
                    </div>
                    <div className="text-xs text-green-600 mt-1">
                      {orderStatus.pricing_type_label}
                      {orderStatus.formatted_order_amount &&
                        orderStatus.formatted_order_amount !== "Not Set" && (
                          <div className="font-semibold">
                            {orderStatus.formatted_order_amount}
                          </div>
                        )}
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-yellow-600" />
                  <p className="text-yellow-800 font-medium">Need Help?</p>
                </div>
                <p className="text-yellow-700 text-sm mt-1">
                  If you have any questions about your order, please contact our
                  customer service team.
                </p>
              </div>

              {/* Toggle View Mode */}
              <div className="mt-6 flex justify-center">
                <Button
                  onClick={async () => {
                    const newMode =
                      viewMode === "status" ? "details" : "status";
                    setViewMode(newMode);

                    // Re-fetch data with new mode
                    if (formData.identifier) {
                      setIsSearching(true);
                      setSearchError("");

                      try {
                        // 🎯 Use optimal endpoint for view mode switching
                        const endpoint = getOptimalTrackingEndpoint(formData.identifier, newMode);
                        
                        // 📊 Log usage for analytics
                        logEndpointUsage(endpoint, formData.identifier);

                        const response = await fetch(buildApiUrl(endpoint), {
                          method: "GET",
                        });

                        const result = await handleApiResponse(response);
                        setOrderStatus(result.data);
                      } catch (error) {
                        console.error("Error switching view mode:", error);
                        setSearchError(
                          error instanceof Error
                            ? error.message
                            : "An error occurred while switching view mode."
                        );
                      } finally {
                        setIsSearching(false);
                      }
                    }
                  }}
                  variant="outline"
                  className="inline-flex items-center gap-2"
                  disabled={isSearching}
                >
                  {isSearching ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-gray-600 border-t-transparent rounded-full animate-spin" />
                      <span>Loading...</span>
                    </div>
                  ) : (
                    <>
                      {viewMode === "status"
                        ? "View Full Details"
                        : "View Quick Status"}
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

// Komponen utama page
const OrderTrackingPage: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OrderTrackingClient />
    </Suspense>
  );
};

export default OrderTrackingPage;
