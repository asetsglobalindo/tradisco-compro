# Order API Integration - Tradisco Website

## Overview
The Tradisco website has been successfully integrated with the Order Management API. This integration includes order submission, tracking, and management capabilities.

## Features Implemented

### 1. Order Submission (`/app/order/page.tsx`)
- **Form Fields**: Full name, company name, division, company email, product selection, custom product options, project details, and order description
- **File Upload**: Support for PDF, DOC, DOCX, JPG, PNG, XLS, XLSX files (max 10MB each)
- **Validation**: Real-time form validation with error handling
- **Progress Tracking**: Visual progress bar showing form completion
- **API Integration**: Direct submission to `/api/v1/orders` endpoint

### 2. Order Tracking (`/app/order/track/page.tsx`)
- **Track Specific Order**: Search by email + order number
- **Search All Orders**: Find all orders by email address
- **Order Status Display**: Complete order information with status updates
- **API Integration**: Uses `/api/v1/orders/track` and `/api/v1/orders/search` endpoints

### 3. API Configuration (`/lib/api-config.ts`)
- **Centralized Configuration**: All API endpoints and settings in one place
- **Helper Functions**: Utilities for API calls and form data handling
- **Environment Variables**: Support for different API URLs per environment

## API Endpoints Used

### 1. Get Products
```
GET /api/v1/products
```
**Response:**
```json
{
  "success": true,
  "data": [
    {"id": 1, "name": "Trading Services", "category": "Trading"},
    {"id": 2, "name": "Digital Solutions", "category": "Digital"}
  ]
}
```

### 2. Submit Order
```
POST /api/v1/orders
Content-Type: multipart/form-data
```
**Request Body:**
- `full_name` (required)
- `company_name` (required)
- `division` (required)
- `company_email` (required)
- `product` (required) - Product ID or "custom"
- `custom_product` (if product = "custom")
- `project_type` ("new" or "existing")
- `project_name` (if project_type = "existing")
- `order_description` (required)
- `files[]` (optional) - Multiple files

**Response:**
```json
{
  "success": true,
  "data": {
    "order_number": "ORD-2025-001",
    "message": "Order submitted successfully"
  }
}
```

### 3. Track Order
```
POST /api/v1/orders/track
Content-Type: application/json
```
**Request Body:**
```json
{
  "email": "user@company.com",
  "order_number": "ORD-2025-001"
}
```

### 4. Search Orders
```
POST /api/v1/orders/search
Content-Type: application/json
```
**Request Body:**
```json
{
  "email": "user@company.com"
}
```

## Environment Configuration

### Required Environment Variables
Add to your `.env.local`:
```
NEXT_PUBLIC_API_URL=https://your-api-domain.com/api/v1
```

### Development vs Production
- **Development**: API calls fallback to mock data if API is unavailable
- **Production**: Update the API URL in the environment variable

## File Upload Configuration
- **Maximum file size**: 10MB per file
- **Allowed file types**: PDF, DOC, DOCX, JPG, PNG, XLS, XLSX
- **Multiple files**: Supported
- **Validation**: Client-side validation before upload

## Error Handling
- **Network errors**: Graceful fallback with user-friendly messages
- **Validation errors**: Real-time field validation
- **API errors**: Detailed error messages from server
- **File upload errors**: Size and type validation

## User Experience Features
- **Progress tracking**: Visual progress bar during form completion
- **Order confirmation**: Order number displayed after successful submission
- **Order tracking**: Easy tracking with email and order number
- **Responsive design**: Works on all device sizes
- **Loading states**: Visual feedback during API calls

## Navigation
- **Order Form**: `/order`
- **Order Tracking**: `/order/track`
- **Track button**: Available on order form page

## Next Steps
1. Update the API URL in environment variables
2. Test all endpoints with your actual API
3. Customize styling if needed
4. Add additional order statuses as required
5. Implement push notifications for order updates (optional)

## Testing
To test the integration:
1. Fill out the order form with valid data
2. Upload test files
3. Submit the order
4. Use the returned order number to track the order
5. Test the search functionality with email addresses

## Security Considerations
- All API calls use HTTPS
- File uploads are validated client-side
- No sensitive data is stored in localStorage
- API keys should be server-side only
- CORS configuration required on API server

## Support
For issues or questions about the API integration, contact the development team.