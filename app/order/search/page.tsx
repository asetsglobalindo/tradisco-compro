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
  limit: number;
}

interface SearchMeta {
  total_found: number;
  limit: number;
  email: string;
}

interface SearchFormErrors {
  [key: string]: string;
}

const OrderSearchPage: React.FC = () => {
  const [formData, setFormData] = useState<SearchFormData>({
    email: "",
    limit: 20, // Default limit
  });
  const [errors, setErrors] = useState<SearchFormErrors>({});
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [searchError, setSearchError] = useState<string>("");
  const [searchMeta, setSearchMeta] = useState<SearchMeta | null>(null);

  // Email validation regex
  const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateField = (field: keyof SearchFormData, value: string | number): string => {
    switch (field) {
      case "email":
        if (!String(value).trim()) return "Email is required";
        if (!emailRegex.test(String(value))) return "Please enter a valid email address";
        return "";
      case "limit":
        const numValue = Number(value);
        if (numValue < 1) return "Limit must be at least 1";
        if (numValue > 50) return "Limit cannot exceed 50";
        return "";
      default:
        return "";
    }
  };

  const handleInputChange = (field: keyof SearchFormData, value: string | number): void => {
    setFormData((prev) => ({
      ...prev,
      [field]: field === 'limit' ? Number(value) : value,
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
    
    // Validate limit
    const limitError = validateField("limit", formData.limit);
    if (limitError) newErrors.limit = limitError;

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
      // 📋 Enhanced search with user-configurable limit
      const searchPayload = {
        email: formData.email,
        limit: formData.limit
      };

      console.log('🔍 Enhanced search payload:', searchPayload);

      const response = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.ORDERS_SEARCH), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(searchPayload),
      });

      const result = await handleApiResponse(response);
      setSearchResults(result.data || []);
      setSearchMeta(result.meta || null);
      
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
            Find all your orders quickly by searching with your email address. 
            Perfect for viewing your order history and tracking multiple orders at once.
          </p>
          <div className="mt-6 flex gap-3 justify-center">
            <Link href="/order">
              <Button variant="outline" className="inline-flex items-center gap-2">
                <Package className="w-4 h-4" />
                Create New Order
              </Button>
            </Link>
            <Link href="/order/track">
              <Button variant="outline" className="inline-flex items-center gap-2">
                <Search className="w-4 h-4" />
                Track Single Order
              </Button>
            </Link>
          </div>
        </div>

        <Card className="shadow-xl mb-8">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Search className="w-6 h-6" />
              Search Your Orders
            </CardTitle>
            <CardDescription>
              Enter your email address to see all your orders (default 20 results, up to 50)
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2 md:col-span-2">
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
                
                <div className="space-y-2">
                  <Label htmlFor="limit" className="text-sm font-medium">
                    How many orders?
                  </Label>
                  <Input
                    id="limit"
                    type="number"
                    min="1"
                    max="50"
                    placeholder="20"
                    value={formData.limit}
                    onChange={(e) => handleInputChange("limit", e.target.value)}
                    className={cn(
                      "h-12",
                      errors.limit ? "border-red-500 focus:ring-red-500" : ""
                    )}
                  />
                  {errors.limit && (
                    <div className="flex items-center space-x-1 text-red-500 text-xs">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.limit}</span>
                    </div>
                  )}
                  <p className="text-xs text-gray-500">Show up to 50 orders</p>
                </div>
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
            {/* Enhanced Results Header with Metadata */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl font-bold text-gray-900">
                  📋 Your Order History
                </h2>
                <Link href="/order/track">
                  <Button variant="outline" size="sm">
                    Track Specific Order
                  </Button>
                </Link>
              </div>
              
              {searchMeta && (
                <div className="flex flex-wrap gap-4 text-sm text-blue-700">
                  <div className="flex items-center gap-1">
                    <Mail className="w-4 h-4" />
                    <span className="font-medium">{searchMeta.email}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Package className="w-4 h-4" />
                    <span>{searchMeta.total_found} orders found</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Search className="w-4 h-4" />
                    <span>Showing {Math.min(searchResults.length, searchMeta.limit)} results</span>
                  </div>
                  {searchMeta.total_found > searchMeta.limit && (
                    <div className="text-orange-600 font-medium">
                      ⚠️ {searchMeta.total_found - searchMeta.limit} more orders available
                    </div>
                  )}
                </div>
              )}
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
            
            {/* Load More Section */}
            {searchMeta && searchMeta.total_found > searchMeta.limit && (
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <p className="text-gray-600 mb-4">
                  Showing {searchResults.length} of {searchMeta.total_found} orders from your history
                </p>
                <div className="flex justify-center gap-3">
                  <Button 
                    variant="outline"
                    onClick={async () => {
                      const newLimit = Math.min(searchMeta.total_found, searchMeta.limit + 20);
                      handleInputChange('limit', newLimit);
                      
                      // Auto-submit with new limit
                      setTimeout(() => {
                        const form = document.querySelector('form');
                        if (form) {
                          form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
                        }
                      }, 100);
                    }}
                    disabled={isSearching}
                  >
                    {isSearching ? 'Loading...' : `Load More (+${Math.min(20, searchMeta.total_found - searchMeta.limit)})`}
                  </Button>
                  <Button 
                    variant="secondary"
                    onClick={async () => {
                      handleInputChange('limit', searchMeta.total_found);
                      
                      // Auto-submit with new limit
                      setTimeout(() => {
                        const form = document.querySelector('form');
                        if (form) {
                          form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
                        }
                      }, 100);
                    }}
                    disabled={isSearching}
                  >
                    {isSearching ? 'Loading...' : `Show All (${searchMeta.total_found})`}
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Click "Load More" to see more of your orders, or "Show All" to see your complete history
                </p>
              </div>
            )}
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
              <h3 className="font-semibold mb-2">Quick Search</h3>
              <p className="text-sm text-gray-600">
                Find all your orders instantly with just your email
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">Order History</h3>
              <p className="text-sm text-gray-600">
                View all your orders with status, pricing, and progress tracking
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">Easy Navigation</h3>
              <p className="text-sm text-gray-600">
                Jump directly to order details or track specific orders
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OrderSearchPage;