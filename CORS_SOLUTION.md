# CORS Error Solution - Tradisco API Integration

## Problem
```
Access to fetch at 'http://127.0.0.1:8000/products' from origin 'http://localhost:3000' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

## Root Cause
The API server at `http://127.0.0.1:8000` doesn't have CORS (Cross-Origin Resource Sharing) headers configured to allow requests from the frontend at `http://localhost:3000`.

## Solutions

### ✅ **Solution 1: Configure CORS on API Server (Recommended)**

Add CORS headers to your API server. The implementation depends on your backend framework:

#### For FastAPI (Python):
```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)
```

#### For Express.js (Node.js):
```javascript
const express = require('express');
const cors = require('cors');
const app = express();

// Configure CORS
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
```

#### For Django (Python):
```python
# Install: pip install django-cors-headers
# settings.py
INSTALLED_APPS = [
    ...
    'corsheaders',
]

MIDDLEWARE = [
    ...
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    ...
]

CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
]
```

### ✅ **Solution 2: Development Proxy (Alternative)**

If you can't modify the API server, add a proxy to your Next.js config:

```javascript
// next.config.ts
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/v1/:path*',
        destination: 'http://127.0.0.1:8000/api/v1/:path*',
      },
    ];
  },
};

export default nextConfig;
```

Then update the API base URL:
```typescript
// lib/api-config.ts
BASE_URL: process.env.NEXT_PUBLIC_API_URL || '',
```

### ✅ **Solution 3: Development Environment Setup**

Update your `.env.local` file:

```env
# Current configuration
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000

# Alternative: Use proxy (if using Solution 2)
# NEXT_PUBLIC_API_URL=
```

## ✅ **Files Updated**

1. **API Configuration** (`/lib/api-config.ts`):
   - Updated base URL to `http://127.0.0.1:8000`
   - Corrected API endpoints to include `/api/v1` prefix

2. **Environment Configuration** (`.env.local`):
   - Set development API URL
   - Added production configuration comments

## Testing Steps

1. **Restart your development server**:
   ```bash
   npm run dev
   ```

2. **Check browser console** for any remaining CORS errors

3. **Test API endpoints**:
   - Go to `/order` page
   - Check if products load (should see dropdown populated)
   - Try submitting a test order
   - Test order tracking at `/order/track`

## Production Configuration

For production, update your environment variables:

```env
# Production .env
NEXT_PUBLIC_API_URL=https://api.tradisco.com
```

And ensure your production API server has CORS configured for your production domain.

## Debugging Tips

1. **Check API Server Status**:
   ```bash
   # Test if API is running
   curl http://127.0.0.1:8000/api/v1/products
   ```

2. **Browser DevTools**:
   - Open Network tab
   - Look for failed requests
   - Check response headers

3. **API Server Logs**:
   - Check your API server logs for incoming requests
   - Verify the endpoints are being hit

## Quick Fix Checklist

- [ ] API server is running on `http://127.0.0.1:8000`
- [ ] CORS middleware is configured on API server
- [ ] Frontend environment variables are set correctly
- [ ] Next.js development server is restarted
- [ ] Browser cache is cleared

## Contact

If you continue to have CORS issues, please:
1. Share your API server framework (FastAPI, Express, Django, etc.)
2. Confirm your API server is running and accessible
3. Check if you can access the API directly in the browser

The most reliable solution is to configure CORS on your API server (Solution 1).