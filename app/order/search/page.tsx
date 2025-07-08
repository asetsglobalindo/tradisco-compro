"use client";
import React, { useState } from "react";
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
import { Search, Package, AlertCircle, Mail, Calendar, Building } from "lucide-react";
import { cn } from "@/lib/utils";
import { API_CONFIG, buildApiUrl, handleApiResponse } from "@/lib/api-config";
import { StatusBadge, ChangeTypeBadge, PricingDisplay } from "@/components/ui/status-badge";
import Link from "next/link";

// Types
interface SearchResult {
  order_number: string;
  full_name: string;
  company_name: string;
  status: string;
  status_label: string;
  status_color: string;
  order_change?: string;
  order_change_label?: string;
  order_change_color?: string;
  pricing_type?: string;
  pricing_type_label?: string;
  pricing_type_color?: string;
  formatted_order_amount?: string;
  created_at: string;
}

interface SearchFormData {
  email: string;
}

interface SearchFormErrors {
  [key: string]: string;
}

const OrderSearchPage: React.FC = () => {
  const [formData, setFormData] = useState<SearchFormData>({
    email: "",
  });
  const [errors, setErrors] = useState<SearchFormErrors>({});
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [searchError, setSearchError] = useState<string>("");

  // Email validation regex
  const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateField = (field: keyof SearchFormData, value: string): string => {
    switch (field) {
      case "email":
        if (!value.trim()) return "Email is required";
        if (!emailRegex.test(value)) return "Please enter a valid email address";
        return "";
      default:
        return "";
    }
  };

  const handleInputChange = (field: keyof SearchFormData, value: string): void => {
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

  const validateForm = (): boolean => {
    const newErrors: SearchFormErrors = {};
    
    // Validate email
    const emailError = validateField("email", formData.email);
    if (emailError) newErrors.email = emailError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSearchOrders = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSearching(true);
    setSearchError("");
    setSearchResults([]);

    try {
      const response = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.ORDERS_SEARCH), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: formData.email }),
      });

      const result = await handleApiResponse(response);
      setSearchResults(result.data || []);
      
    } catch (error) {
      console.error("Error searching orders:", error);
      setSearchError(
        error instanceof Error 
          ? error.message 
          : "An error occurred while searching your orders. Please try again."
      );
    } finally {
      setIsSearching(false);
    }
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Search Your Orders
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Enter your email address to find all orders associated with your account.
            View order status, pricing, and change information for each order.
          </p>
        </div>

        <Card className="shadow-xl mb-8">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Search className="w-6 h-6" />
              Search Orders by Email
            </CardTitle>
            <CardDescription>
              Enter your email address to see all your orders (maximum 20 results)
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

            <form onSubmit={handleSearchOrders} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email Address <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className={cn(
                    "h-12",
                    errors.email ? "border-red-500 focus:ring-red-500" : ""
                  )}
                />
                {errors.email && (
                  <div className="flex items-center space-x-1 text-red-500 text-xs">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.email}</span>
                  </div>
                )}
              </div>

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
                      Search Orders
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                Search Results ({searchResults.length} orders found)
              </h2>
              <Link href="/order/track">
                <Button variant="outline" size="sm">
                  Track Specific Order
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchResults.map((order) => (
                <Card key={order.order_number} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Package className="w-5 h-5 text-blue-600" />
                      {order.order_number}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {formatDate(order.created_at)}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Customer Info */}
                    <div>
                      <div className="flex items-center gap-1 mb-1">
                        <Building className="w-4 h-4 text-gray-500" />
                        <span className="text-sm font-medium text-gray-700">{order.full_name}</span>
                      </div>
                      <p className="text-sm text-gray-600">{order.company_name}</p>
                    </div>

                    {/* Status */}
                    <div>
                      <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Status</label>
                      <div className="mt-1">
                        <StatusBadge
                          status={order.status}
                          statusColor={order.status_color}
                          statusLabel={order.status_label}
                          size="sm"
                        />
                      </div>
                    </div>

                    {/* Change Type */}
                    {order.order_change && (
                      <div>
                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Change Level</label>
                        <div className="mt-1">
                          <ChangeTypeBadge
                            orderChange={order.order_change}
                            orderChangeLabel={order.order_change_label}
                            orderChangeColor={order.order_change_color}
                          />
                        </div>
                      </div>
                    )}

                    {/* Pricing */}
                    {order.pricing_type && (
                      <div>
                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Pricing</label>
                        <div className="mt-1">
                          <PricingDisplay
                            pricingType={order.pricing_type}
                            pricingTypeLabel={order.pricing_type_label}
                            pricingTypeColor={order.pricing_type_color}
                            formattedOrderAmount={order.formatted_order_amount}
                          />
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="pt-2 border-t border-gray-100">
                      <div className="flex gap-2">
                        <Link href={`/order/track?identifier=${order.order_number}`} className="flex-1">
                          <Button variant="outline" size="sm" className="w-full">
                            Quick Status
                          </Button>
                        </Link>
                        <Link href={`/order/track?identifier=${order.order_number}&mode=details`} className="flex-1">
                          <Button size="sm" className="w-full">
                            Full Details
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* No Results */}
        {!isSearching && searchResults.length === 0 && formData.email && !searchError && (
          <Card className="text-center py-12">
            <CardContent>
              <div className="flex flex-col items-center space-y-4">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                  <Package className="w-8 h-8 text-gray-400" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">No Orders Found</h3>
                  <p className="text-gray-600 mt-1">
                    We couldn't find any orders associated with this email address.
                  </p>
                </div>
                <div className="flex gap-3">
                  <Link href="/order">
                    <Button>
                      Place New Order
                    </Button>
                  </Link>
                  <Link href="/order/track">
                    <Button variant="outline">
                      Track by Order Number
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Additional Information */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">Easy Search</h3>
              <p className="text-sm text-gray-600">
                Find all your orders with just your email address
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">Complete Information</h3>
              <p className="text-sm text-gray-600">
                View status, pricing, and change information for each order
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">Need Help?</h3>
              <p className="text-sm text-gray-600">
                Contact our support team if you need assistance
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OrderSearchPage;