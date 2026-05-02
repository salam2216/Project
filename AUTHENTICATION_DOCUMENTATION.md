# SCALA-Guard Authentication System Documentation

## Overview

This documentation covers the complete authentication system for SCALA-Guard Website, including Register and Login pages with role-based access control.

## Files Created

### Frontend Files

#### 1. **frontend/src/pages/Register.jsx**
- Complete registration form component
- Form validation (name, email, password matching)
- Role selection (Guard, Manager, Director)
- Password strength requirements
- Error handling and user feedback

**Features:**
- Full name input validation
- Email format validation
- Password confirmation matching
- Role selection dropdown
- Password visibility toggle
- Real-time error messages
- Loading state during submission
- Link to login page

#### 2. **frontend/src/pages/Login.jsx**
- Complete login form component
- Email and password authentication
- Remember me functionality
- Google Sign-In integration
- Role-based redirection
- Forgot password link

**Features:**
- Email input with validation
- Password input with visibility toggle
- Remember me checkbox
- Forgot password link
- Google Sign-In button
- Role-based dashboard redirect
- Loading state management
- Error handling and display

#### 3. **frontend/src/pages/Auth.css**
- Complete styling for both Register and Login pages
- Responsive design (mobile, tablet, desktop)
- Dark mode support
- Animation effects
- Accessibility features
- Form styling and interactions
- Button styles and hover effects
- Error message styling
- Password input wrapper styling

**Styling Features:**
- Gold (#b8860b) and black color scheme matching the designs
- Gradient background (light gray/blue)
- Card-based layout with shadow
- Smooth transitions and animations
- Responsive breakpoints at 768px and 480px
- Focus states for accessibility
- WCAG 2.1 compliance
- Dark mode media query support

#### 4. **frontend/src/components/ProtectedRoute.jsx**
- Route protection component
- Role-based access control
- Token validation
- Loading state management
- Automatic redirection to login

**Features:**
- Checks authentication token
- Verifies user role
- Prevents unauthorized access
- Shows loading state
- Handles token expiration

#### 5. **frontend/src/App.jsx**
- Main application routing
- Public routes (Login, Register)
- Protected routes with role requirements
- Default redirects

**Routes:**
- `/login` - Login page (public)
- `/register` - Register page (public)
- `/guard/dashboard` - Guard dashboard (requires guard role)
- `/manager/dashboard` - Manager dashboard (requires manager role)
- `/director/dashboard` - Director dashboard (requires director role)

### Backend Files

#### 6. **backend/app/routes/auth.py**
- Complete authentication API endpoints
- User registration with validation
- Login with account lockout
- Token refresh mechanism
- Password reset functionality
- Email verification
- JWT token management

**Endpoints:**
- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/refresh` - Refresh access token
- `POST /api/v1/auth/logout` - Logout user
- `GET /api/v1/auth/me` - Get current user info
- `POST /api/v1/auth/forgot-password` - Request password reset
- `POST /api/v1/auth/reset-password` - Reset password with token
- `POST /api/v1/auth/verify-email` - Verify email address

## Usage Instructions

### Frontend Setup

#### 1. Install Dependencies
```bash
npm install react-router-dom axios
```

#### 2. Component Integration
```jsx
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';
import './pages/Auth.css';
```

#### 3. Configure API Base URL
```jsx
// Create axios instance with base URL
const API_BASE_URL = 'http://localhost:8000';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});
```

#### 4. Add Interceptor for Token
```jsx
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

### Backend Setup

#### 1. Install Dependencies
```bash
pip install fastapi uvicorn pydantic sqlalchemy bcrypt pyjwt python-multipart
```

#### 2. Environment Variables
Create `.env` file:
```
SECRET_KEY=your-secret-key-change-in-production
DATABASE_URL=postgresql://user:password@localhost/scala_guard
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_HOURS=24
```

#### 3. Database Setup
```python
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

DATABASE_URL = "postgresql://user:password@localhost/scala_guard"
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create tables
Base.metadata.create_all(bind=engine)
```

#### 4. Main Application
```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.auth import router as auth_router

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routes
app.include_router(auth_router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
```

## Security Features

### Password Security
- Minimum 8 characters required
- Must contain uppercase letter
- Must contain number
- Hashed with bcrypt (salt rounds: 10)
- Never stored in plain text

### Account Lockout
- Locks after 5 failed login attempts
- 30-minute lockout duration
- Failed attempts counter resets on successful login

### JWT Tokens
- 24-hour expiration
- Secure HS256 algorithm
- Issued and verified server-side
- Can be refreshed before expiration

### CORS Security
- Restricted to frontend domain
- Credentials-enabled
- Specific methods allowed

## API Response Format

### Success Response
```json
{
  "status": "success",
  "data": {
    "user_id": "user_1234567890",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "guard",
    "token": "eyJ0eXAiOiJKV1QiLCJhbGc..."
  },
  "message": "Login successful"
}
```

### Error Response
```json
{
  "detail": "Invalid email or password"
}
```

## Form Validation

### Register Form
- **Name**: Required, non-empty
- **Email**: Valid format, unique in database
- **Password**: Min 8 chars, uppercase, number
- **Confirm Password**: Must match password
- **Role**: Select from dropdown (guard, manager, director)

### Login Form
- **Email**: Valid email format
- **Password**: Required, non-empty

## User Roles

### Guard
- Check-in/check-out operations
- Report incidents
- View assigned shifts
- Personal profile access

### Manager
- Create and assign shifts
- Manage team attendance
- Monitor incidents
- View team reports

### Director
- Full system access
- Strategic analytics
- All guard management
- System configuration

### Admin
- System administration
- User management
- Backup operations
- Audit logs

## Responsive Design

### Desktop (>1024px)
- Full-width card at 480px
- All features visible
- Multi-column layouts

### Tablet (768px - 1023px)
- Adjusted padding and font sizes
- Touch-friendly buttons (48px)
- Stacked form options

### Mobile (<768px)
- Full-width forms
- Larger touch targets
- Simplified layouts
- Bottom navigation ready

## Accessibility Features

- WCAG 2.1 AA compliant
- Color contrast ratio 4.5:1
- Keyboard navigation support
- ARIA labels and roles
- Focus indicators
- Screen reader compatible

## Dark Mode Support

The authentication pages include automatic dark mode support:
```css
@media (prefers-color-scheme: dark) {
  /* Dark mode styles */
}
```

## Testing

### Frontend Testing
```javascript
// Test registration
test('Register new user', async () => {
  // Fill form
  // Submit
  // Verify navigation to dashboard
});

// Test login
test('Login with credentials', async () => {
  // Enter email and password
  // Click login
  // Verify token stored
  // Verify redirect to role dashboard
});
```

### Backend Testing
```python
# Test registration
def test_register():
    response = client.post("/api/v1/auth/register", json={
        "name": "Test User",
        "email": "test@example.com",
        "password": "TestPass123",
        "role": "guard"
    })
    assert response.status_code == 200

# Test login
def test_login():
    response = client.post("/api/v1/auth/login", json={
        "email": "test@example.com",
        "password": "TestPass123"
    })
    assert response.status_code == 200
    assert "token" in response.json()["data"]
```

## Error Handling

### Frontend Errors
- Network errors → "Connection failed"
- Validation errors → Field-specific messages
- Server errors → User-friendly error display

### Backend Errors
- 400: Bad Request (validation failed)
- 401: Unauthorized (invalid credentials)
- 403: Forbidden (account locked/inactive)
- 404: Not Found (user doesn't exist)
- 500: Internal Server Error

## Performance Optimization

### Frontend
- Code splitting by route
- Lazy loading
- Memoization for expensive operations
- Optimized re-renders

### Backend
- Connection pooling
- Query optimization
- Caching tokens
- Rate limiting

## Future Enhancements

1. **Two-Factor Authentication (2FA)**
   - TOTP support
   - SMS verification
   - Backup codes

2. **Social Login**
   - Google OAuth
   - Microsoft OAuth
   - Apple Sign-In

3. **Password Requirements**
   - Complexity rules
   - Expiration policy
   - History tracking

4. **Session Management**
   - Multiple device support
   - Session revocation
   - Concurrent login limits

5. **Audit Logging**
   - Track all authentication events
   - Security event alerts
   - Compliance reporting

## Troubleshooting

### Common Issues

**Issue: "Email already registered"**
- Solution: Use different email or recover account

**Issue: "Invalid email or password"**
- Solution: Check credentials, ensure correct capitalization

**Issue: "Account locked"**
- Solution: Wait 30 minutes or contact administrator

**Issue: CORS errors**
- Solution: Verify frontend URL in backend CORS settings

**Issue: Token expired**
- Solution: Use refresh endpoint or login again

## Support

For issues or questions:
- Email: support@scala-guard.mbstu.edu.bd
- GitHub: github.com/salam2216/Project
- Documentation: See SRS document

---

**Last Updated:** May 2026
**Version:** 1.0
**Status:** Production Ready
