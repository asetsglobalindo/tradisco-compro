// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000',
  
  // API Endpoints - Optimal Structure
  ENDPOINTS: {
    // Core endpoints
    PRODUCTS: '/api/v1/products',
    ORDERS: '/api/v1/orders',
    
    // Tracking endpoints (performance optimized)
    ORDERS_LATEST: (email: string) => `/api/v1/orders/latest/${email}`, // ✨ NEW: Fast single order lookup
    ORDERS_SEARCH: '/api/v1/orders/search', // 📋 Enhanced: Admin/comprehensive search  
    ORDERS_STATUS: (identifier: string) => `/api/v1/orders/${identifier}/status`, // 📍 Existing: Quick status check
    ORDERS_DETAILS: (identifier: string) => `/api/v1/orders/${identifier}/details`, // 📄 Full order details
    
    // Legacy/additional endpoints
    ORDERS_TRACK: '/api/v1/orders/track',
    ORDERS_USER: '/api/v1/orders/user/orders',
  },
  
  // Request configuration
  TIMEOUT: 30000, // 30 seconds
  
  // File upload configuration
  UPLOAD: {
    MAX_SIZE: 10 * 1024 * 1024, // 10MB
    ALLOWED_TYPES: [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'image/jpeg',
      'image/jpg',
      'image/png',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    ],
  },
} as const;

// Helper function to build full API URL
export const buildApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

// Helper function to handle API responses
export const handleApiResponse = async (response: Response) => {
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API Error (${response.status}): ${errorText}`);
  }
  
  const data = await response.json();
  
  if (!data.success) {
    throw new Error(data.message || 'API request failed');
  }
  
  return data;
};

// Helper function to create FormData for file uploads
export const createFormData = (data: Record<string, any>, files: File[] = []): FormData => {
  const formData = new FormData();
  
  // Add text fields - only include non-empty values
  Object.entries(data).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== '') {
      formData.append(key, value);
    }
  });
  
  // Add files
  files.forEach(file => {
    formData.append('files', file);
  });
  
  return formData;
};

// 🎯 Optimal Endpoint Selection Helper
export const getOptimalTrackingEndpoint = (
  identifier: string, 
  viewMode: 'status' | 'details' = 'status'
): string => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmail = emailRegex.test(identifier);
  
  if (isEmail) {
    // 🚀 For emails: Use latest endpoint (fastest, most relevant for users)
    return API_CONFIG.ENDPOINTS.ORDERS_LATEST(identifier);
  } else {
    // 📍 For order numbers: Use specific endpoint based on view mode
    return viewMode === 'status' 
      ? API_CONFIG.ENDPOINTS.ORDERS_STATUS(identifier)
      : API_CONFIG.ENDPOINTS.ORDERS_DETAILS(identifier);
  }
};

// 📊 Usage Analytics Helper
export const logEndpointUsage = (endpoint: string, identifier: string): void => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`📊 Endpoint Usage:`, {
      endpoint,
      identifierType: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier) ? 'email' : 'order_number',
      timestamp: new Date().toISOString()
    });
  }
};