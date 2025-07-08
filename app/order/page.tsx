"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Upload, X, FileText, CheckCircle, AlertCircle, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { API_CONFIG, buildApiUrl, handleApiResponse, createFormData } from "@/lib/api-config";

// Types
interface Product {
  id: number;
  name: string;
  category: string;
}

interface FormData {
  fullName: string;
  companyName: string;
  division: string;
  companyEmail: string;
  productType: string;
  customProduct: string;
  projectType: string;
  projectName: string;
  orderDescription: string;
}

interface FormErrors {
  [key: string]: string;
}

interface TouchedFields {
  [key: string]: boolean;
}

const OrderPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    companyName: "",
    division: "",
    companyEmail: "",
    productType: "",
    customProduct: "",
    projectType: "",
    projectName: "",
    orderDescription: "",
  });

  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState<boolean>(true);
  const [orderNumber, setOrderNumber] = useState<string>("");

  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<TouchedFields>({});
  const [submitError, setSubmitError] = useState<string>("");

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.PRODUCTS));
        const result = await handleApiResponse(response);
        setProducts(result.data);
      } catch (error) {
        console.error('Error fetching products:', error);
        // Fallback to mock data if API fails
        setProducts([
          { id: 1, name: "Trading Services", category: "Trading" },
          { id: 2, name: "Digital Solutions", category: "Digital" },
          { id: 3, name: "Construction Services", category: "Construction" },
          { id: 4, name: "Engineering Services", category: "Engineering" },
          { id: 5, name: "Project Management", category: "Management" },
        ]);
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchProducts();
  }, []);

  // Email validation regex
  const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Validation functions
  const validateField = (field: keyof FormData, value: string): string => {
    switch (field) {
      case "fullName":
        if (!value.trim()) return "Full name is required";
        if (value.trim().length < 2)
          return "Full name must be at least 2 characters";
        if (!/^[a-zA-Z\s.-]+$/.test(value))
          return "Full name can only contain letters, spaces, dots, and hyphens";
        return "";

      case "companyName":
        if (!value.trim()) return "Company name is required";
        if (value.trim().length < 2)
          return "Company name must be at least 2 characters";
        return "";

      case "division":
        if (!value.trim()) return "Division is required";
        if (value.trim().length < 2)
          return "Division must be at least 2 characters";
        return "";

      case "companyEmail":
        if (!value.trim()) return "Company email is required";
        if (!emailRegex.test(value))
          return "Please enter a valid email address";
        return "";

      case "productType":
        if (!value) return "Please select a product or service";
        return "";

      case "customProduct":
        if (formData.productType === "custom" && !value.trim())
          return "Custom product name is required";
        if (formData.productType === "custom" && value.trim().length < 3)
          return "Custom product name must be at least 3 characters";
        return "";

      case "projectType":
        if (
          formData.productType === "custom" &&
          formData.customProduct.trim() &&
          !value
        )
          return "Please select a project type";
        return "";

      case "projectName":
        if (
          formData.productType === "custom" &&
          formData.projectType === "existing" &&
          !value.trim()
        )
          return "Project name is required for existing projects";
        if (
          formData.productType === "custom" &&
          formData.projectType === "existing" &&
          value.trim().length < 3
        )
          return "Project name must be at least 3 characters";
        return "";

      case "orderDescription":
        if (!value.trim()) return "Order description is required";
        if (value.trim().length < 10)
          return "Order description must be at least 10 characters";
        if (value.trim().length > 2000)
          return "Order description must not exceed 2000 characters";
        return "";

      default:
        return "";
    }
  };

  // Real-time validation
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Validate all fields
    (Object.keys(formData) as Array<keyof FormData>).forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string): void => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Real-time validation for the changed field
    const error = validateField(field, value);
    setErrors((prev) => {
      const newErrors = { ...prev };
      if (error) {
        newErrors[field] = error;
      } else {
        // Remove the error completely if field is valid
        delete newErrors[field];
      }
      return newErrors;
    });
  };

  const handleBlur = (field: keyof FormData): void => {
    setTouched((prev) => ({
      ...prev,
      [field]: true,
    }));
  };

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const selectedFiles = Array.from(event.target.files || []);
    const validFiles: File[] = [];
    const newErrors: string[] = [];

    selectedFiles.forEach((file) => {
      // Check file size
      if (file.size > API_CONFIG.UPLOAD.MAX_SIZE) {
        newErrors.push(`${file.name} exceeds ${API_CONFIG.UPLOAD.MAX_SIZE / 1024 / 1024}MB limit`);
        return;
      }

      // Check file type
      if (!API_CONFIG.UPLOAD.ALLOWED_TYPES.includes(file.type)) {
        newErrors.push(`${file.name} has unsupported file type`);
        return;
      }

      validFiles.push(file);
    });

    if (newErrors.length > 0) {
      setErrors((prev) => ({
        ...prev,
        files: newErrors.join(", "),
      }));
    } else {
      setErrors((prev) => {
        const { files, ...rest } = prev;
        return rest;
      });
    }

    setFiles((prev) => [...prev, ...validFiles]);
  };

  const removeFile = (index: number): void => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    // Clear file errors when files are removed
    if (files.length === 1) {
      setErrors((prev) => {
        const { files, ...rest } = prev;
        return rest;
      });
    }
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    // Mark all fields as touched
    const allTouched: TouchedFields = {};
    (Object.keys(formData) as Array<keyof FormData>).forEach((field) => {
      allTouched[field] = true;
    });
    setTouched(allTouched);

    // Validate entire form
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      // Prepare form data for API submission
      const formDataToSend = createFormData(formData, files);
      
      // Submit to API
      const response = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.ORDERS), {
        method: 'POST',
        body: formDataToSend,
      });
      
      const result = await handleApiResponse(response);
      
      // Store order number for tracking
      setOrderNumber(result.data.order_number);
      localStorage.setItem('last_order_number', result.data.order_number);
      
      // Reset form
      setFormData({
        fullName: "",
        companyName: "",
        division: "",
        companyEmail: "",
        productType: "",
        customProduct: "",
        projectType: "",
        projectName: "",
        orderDescription: "",
      });
      setFiles([]);
      setErrors({});
      setTouched({});
      setIsSubmitted(true);
      
      // Reset success state after 10 seconds
      setTimeout(() => setIsSubmitted(false), 10000);
    } catch (error) {
      console.error("Error submitting order:", error);
      setSubmitError(
        error instanceof Error 
          ? error.message 
          : "An error occurred while submitting your order. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = (): boolean => {
    // Check if there are any validation errors
    const hasErrors = Object.keys(errors).length > 0;

    // Check basic required fields
    const basicFieldsValid =
      formData.fullName.trim() !== "" &&
      formData.companyName.trim() !== "" &&
      formData.division.trim() !== "" &&
      formData.companyEmail.trim() !== "" &&
      formData.productType !== "" &&
      formData.orderDescription.trim() !== "";

    // Check custom product fields if applicable
    let customFieldsValid = true;
    if (formData.productType === "custom") {
      customFieldsValid = formData.customProduct.trim() !== "";

      // If custom product is filled, check project type
      if (customFieldsValid) {
        customFieldsValid = formData.projectType !== "";

        // If project type is existing, check project name
        if (customFieldsValid && formData.projectType === "existing") {
          customFieldsValid = formData.projectName.trim() !== "";
        }
      }
    }

    // The form is valid if there are NO errors AND all required fields are filled
    return !hasErrors && basicFieldsValid && customFieldsValid;
  };

  // Calculate progress percentage
  const calculateProgress = (): number => {
    const basicFields: string[] = [
      formData.fullName.trim(),
      formData.companyName.trim(),
      formData.division.trim(),
      formData.companyEmail.trim(),
      formData.orderDescription.trim(),
    ];

    let totalFields = basicFields.length;
    let filledFields = basicFields.filter((field) => field !== "").length;

    // Add product field to calculation
    if (formData.productType === "custom") {
      totalFields += 1; // custom product name
      if (formData.customProduct.trim() !== "") {
        filledFields += 1;

        // Add project type to calculation when custom product is filled
        totalFields += 1;
        if (formData.projectType !== "") {
          filledFields += 1;

          // Add project name to calculation if existing project is selected
          if (formData.projectType === "existing") {
            totalFields += 1;
            if (formData.projectName.trim() !== "") {
              filledFields += 1;
            }
          }
        }
      }
    } else if (formData.productType !== "") {
      totalFields += 1;
      filledFields += 1;
    } else {
      totalFields += 1; // count empty product field
    }

    return Math.round((filledFields / totalFields) * 100);
  };

  const progress: number = calculateProgress();

  const getProgressMessage = (progress: number): string => {
    if (progress === 0) return "Start filling out the form";
    if (progress > 0 && progress < 50)
      return "Keep going! You're getting started";
    if (progress >= 50 && progress < 80) return "Great progress! Almost there";
    if (progress >= 80 && progress < 100)
      return "Almost done! Just a few more fields";
    if (progress === 100) return "Perfect! All required fields completed";
    return "";
  };

  const getProgressColor = (progress: number): string => {
    if (progress === 0) return "#d1d5db";
    if (progress < 50) return "#ef4444";
    if (progress < 80) return "#eab308";
    return "#22c55e";
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center space-y-4">
              <CheckCircle className="w-16 h-16 text-green-500" />
              <h2 className="text-2xl font-bold text-gray-900">
                Order Submitted Successfully!
              </h2>
              {orderNumber && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 w-full">
                  <p className="text-sm text-blue-600 font-medium mb-1">
                    Order Number:
                  </p>
                  <p className="text-lg font-bold text-blue-800">
                    {orderNumber}
                  </p>
                  <p className="text-xs text-blue-500 mt-1">
                    Please save this number for tracking your order
                  </p>
                </div>
              )}
              <p className="text-gray-600">
                Thank you for your order. We will review your request and get
                back to you soon via email.
              </p>
              <Button
                onClick={() => {
                  setIsSubmitted(false);
                  setOrderNumber("");
                }}
                variant="outline"
                className="mt-4"
              >
                Submit Another Order
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Place Your Order
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Fill out the form below to submit your order request. Our team will
            review and get back to you as soon as possible.
          </p>
          <div className="mt-4">
            <Link href="/order/track">
              <Button variant="outline" className="inline-flex items-center gap-2">
                <Search className="w-4 h-4" />
                Track Existing Order
              </Button>
            </Link>
          </div>
        </div>

        {/* Sticky Progress Bar */}
        <div className="sticky top-[4.5rem] z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200 py-3 mb-6">
          <div className="container mx-auto max-w-4xl px-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                Form Progress
              </span>
              <span className="text-sm font-medium text-gray-700">
                {progress}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="h-2.5 rounded-full transition-all duration-300 ease-out"
                style={{
                  width: `${progress}%`,
                  backgroundColor: getProgressColor(progress),
                }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {getProgressMessage(progress)}
            </p>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">Quick Review</h3>
              <p className="text-sm text-gray-600">
                We'll review your order within 24 hours
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">Confirmation</h3>
              <p className="text-sm text-gray-600">
                You'll receive an email confirmation
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Upload className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">Secure Upload</h3>
              <p className="text-sm text-gray-600">
                Your files are securely uploaded and encrypted
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl">Order Form</CardTitle>
            <CardDescription>
              Please provide all required information to process your order
            </CardDescription>
          </CardHeader>
          <CardContent>
            {submitError && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="w-5 h-5 text-red-500" />
                  <p className="text-red-700 font-medium">Error submitting order</p>
                </div>
                <p className="text-red-600 text-sm mt-1">{submitError}</p>
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-sm font-medium">
                    Full Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={(e) =>
                      handleInputChange("fullName", e.target.value)
                    }
                    onBlur={() => handleBlur("fullName")}
                    className={cn(
                      "h-12",
                      errors.fullName && touched.fullName
                        ? "border-red-500 focus:ring-red-500"
                        : ""
                    )}
                  />
                  {errors.fullName && touched.fullName && (
                    <div className="flex items-center space-x-1 text-red-500 text-xs">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.fullName}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="companyName" className="text-sm font-medium">
                    Company Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="companyName"
                    type="text"
                    placeholder="Enter your company name"
                    value={formData.companyName}
                    onChange={(e) =>
                      handleInputChange("companyName", e.target.value)
                    }
                    onBlur={() => handleBlur("companyName")}
                    className={cn(
                      "h-12",
                      errors.companyName && touched.companyName
                        ? "border-red-500 focus:ring-red-500"
                        : ""
                    )}
                  />
                  {errors.companyName && touched.companyName && (
                    <div className="flex items-center space-x-1 text-red-500 text-xs">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.companyName}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="division" className="text-sm font-medium">
                    Division <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="division"
                    type="text"
                    placeholder="Enter your division"
                    value={formData.division}
                    onChange={(e) =>
                      handleInputChange("division", e.target.value)
                    }
                    onBlur={() => handleBlur("division")}
                    className={cn(
                      "h-12",
                      errors.division && touched.division
                        ? "border-red-500 focus:ring-red-500"
                        : ""
                    )}
                  />
                  {errors.division && touched.division && (
                    <div className="flex items-center space-x-1 text-red-500 text-xs">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.division}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="companyEmail" className="text-sm font-medium">
                    Company Email <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="companyEmail"
                    type="email"
                    placeholder="Enter your company email"
                    value={formData.companyEmail}
                    onChange={(e) =>
                      handleInputChange("companyEmail", e.target.value)
                    }
                    onBlur={() => handleBlur("companyEmail")}
                    className={cn(
                      "h-12",
                      errors.companyEmail && touched.companyEmail
                        ? "border-red-500 focus:ring-red-500"
                        : ""
                    )}
                  />
                  {errors.companyEmail && touched.companyEmail && (
                    <div className="flex items-center space-x-1 text-red-500 text-xs">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.companyEmail}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Product Selection */}
              <div className="space-y-2">
                <Label htmlFor="product" className="text-sm font-medium">
                  Product/Service <span className="text-red-500">*</span>
                </Label>
                <select
                  id="product"
                  value={formData.productType}
                  onChange={(e) => {
                    handleInputChange("productType", e.target.value);
                    // Reset dependent fields when product changes
                    if (e.target.value !== "custom") {
                      handleInputChange("customProduct", "");
                      handleInputChange("projectType", "");
                      handleInputChange("projectName", "");
                    }
                  }}
                  onBlur={() => handleBlur("productType")}
                  className={cn(
                    "flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                    errors.productType && touched.productType
                      ? "border-red-500 focus:ring-red-500"
                      : ""
                  )}
                >
                  <option value="">Select a product or service</option>
                  {loadingProducts ? (
                    <option disabled>Loading products...</option>
                  ) : (
                    products.map((product) => (
                      <option key={product.id} value={product.id.toString()}>
                        {product.name} - {product.category}
                      </option>
                    ))
                  )}
                  <option value="custom">Custom Product/Service</option>
                </select>
                {errors.productType && touched.productType && (
                  <div className="flex items-center space-x-1 text-red-500 text-xs">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.productType}</span>
                  </div>
                )}
              </div>

              {/* Custom Product Fields */}
              {formData.productType === "custom" && (
                <div className="space-y-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="space-y-2">
                    <Label
                      htmlFor="customProduct"
                      className="text-sm font-medium"
                    >
                      Custom Product/Service Name{" "}
                      <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="customProduct"
                      type="text"
                      placeholder="Enter your custom product or service name"
                      value={formData.customProduct}
                      onChange={(e) =>
                        handleInputChange("customProduct", e.target.value)
                      }
                      onBlur={() => handleBlur("customProduct")}
                      className={cn(
                        "h-12",
                        errors.customProduct && touched.customProduct
                          ? "border-red-500 focus:ring-red-500"
                          : ""
                      )}
                    />
                    {errors.customProduct && touched.customProduct && (
                      <div className="flex items-center space-x-1 text-red-500 text-xs">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.customProduct}</span>
                      </div>
                    )}
                  </div>

                  {formData.customProduct.trim() !== "" && (
                    <>
                      <div className="space-y-2">
                        <Label
                          htmlFor="projectType"
                          className="text-sm font-medium"
                        >
                          Project Type <span className="text-red-500">*</span>
                        </Label>
                        <select
                          id="projectType"
                          value={formData.projectType}
                          onChange={(e) => {
                            handleInputChange("projectType", e.target.value);
                            // Reset project name when type changes
                            if (e.target.value !== "existing") {
                              handleInputChange("projectName", "");
                            }
                          }}
                          onBlur={() => handleBlur("projectType")}
                          className={cn(
                            "flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                            errors.projectType && touched.projectType
                              ? "border-red-500 focus:ring-red-500"
                              : ""
                          )}
                        >
                          <option value="">Select project type</option>
                          <option value="new">New Project</option>
                          <option value="existing">Existing Project</option>
                        </select>
                        {errors.projectType && touched.projectType && (
                          <div className="flex items-center space-x-1 text-red-500 text-xs">
                            <AlertCircle className="w-3 h-3" />
                            <span>{errors.projectType}</span>
                          </div>
                        )}
                      </div>

                      {formData.projectType === "existing" && (
                        <div className="space-y-2">
                          <Label
                            htmlFor="projectName"
                            className="text-sm font-medium"
                          >
                            Existing Project Name{" "}
                            <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="projectName"
                            type="text"
                            placeholder="Enter the existing project name"
                            value={formData.projectName}
                            onChange={(e) =>
                              handleInputChange("projectName", e.target.value)
                            }
                            onBlur={() => handleBlur("projectName")}
                            className={cn(
                              "h-12",
                              errors.projectName && touched.projectName
                                ? "border-red-500 focus:ring-red-500"
                                : ""
                            )}
                          />
                          {errors.projectName && touched.projectName && (
                            <div className="flex items-center space-x-1 text-red-500 text-xs">
                              <AlertCircle className="w-3 h-3" />
                              <span>{errors.projectName}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}

              {/* Order Description */}
              <div className="space-y-2">
                <Label
                  htmlFor="orderDescription"
                  className="text-sm font-medium"
                >
                  Order Description <span className="text-red-500">*</span>
                  <span className="text-gray-400 text-xs ml-2">
                    ({formData.orderDescription.length}/2000 characters)
                  </span>
                </Label>
                <Textarea
                  id="orderDescription"
                  placeholder="Please describe your order requirements, specifications, and any additional details..."
                  value={formData.orderDescription}
                  onChange={(e) =>
                    handleInputChange("orderDescription", e.target.value)
                  }
                  onBlur={() => handleBlur("orderDescription")}
                  className={cn(
                    "min-h-32 resize-none",
                    errors.orderDescription && touched.orderDescription
                      ? "border-red-500 focus:ring-red-500"
                      : ""
                  )}
                  maxLength={2000}
                />
                {errors.orderDescription && touched.orderDescription && (
                  <div className="flex items-center space-x-1 text-red-500 text-xs">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.orderDescription}</span>
                  </div>
                )}
              </div>

              {/* File Upload */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Evidence Files</Label>
                <div
                  className={cn(
                    "border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors",
                    errors.files ? "border-red-300 bg-red-50" : ""
                  )}
                >
                  <input
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.xls,.xlsx"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <p className="text-sm text-gray-600 mb-2">
                      <span className="font-medium text-blue-600 hover:text-blue-500">
                        Click to upload
                      </span>{" "}
                      or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">
                      PDF, DOC, DOCX, JPG, PNG, XLS, XLSX (Max 10MB each)
                    </p>
                  </label>
                </div>
                {errors.files && (
                  <div className="flex items-center space-x-1 text-red-500 text-xs">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.files}</span>
                  </div>
                )}

                {/* File List */}
                {files.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-700">
                      Uploaded Files ({files.length}):
                    </p>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {files.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                        >
                          <div className="flex items-center space-x-3">
                            <FileText className="h-5 w-5 text-gray-400 flex-shrink-0" />
                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-medium text-gray-900 truncate">
                                {file.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                {(file.size / 1024 / 1024).toFixed(2)} MB
                              </p>
                            </div>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFile(index)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50 flex-shrink-0"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="flex justify-end pt-6">
                <Button
                  type="submit"
                  disabled={!isFormValid() || isSubmitting}
                  className={cn(
                    "px-8 py-3 text-base font-medium",
                    isSubmitting && "opacity-50 cursor-not-allowed",
                    !isFormValid() &&
                      !isSubmitting &&
                      "opacity-50 cursor-not-allowed"
                  )}
                >
                  {isSubmitting ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Submitting...</span>
                    </div>
                  ) : (
                    "Submit Order"
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OrderPage;