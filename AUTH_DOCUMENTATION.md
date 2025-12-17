# Authentication Documentation

Complete guide for the authentication system in NiceShop.

## Overview

The authentication system provides secure user login and signup functionality for buyers. It uses client-side state management with Zustand and localStorage for persistence.

## Features

✅ **User Registration** - Create new accounts with email and password  
✅ **User Login** - Secure authentication  
✅ **User Profile** - View and manage user information  
✅ **Session Persistence** - Stay logged in across page refreshes  
✅ **Protected Features** - Checkout requires authentication  
✅ **User Menu** - Dropdown with profile, orders, and settings  

## Tech Stack

- **State Management**: Zustand with persistence
- **UI Components**: shadcn/ui (Dialog, Dropdown, Avatar, etc.)
- **Animations**: Framer Motion
- **Storage**: localStorage (mock backend)
- **Validation**: Client-side form validation

## Components

### 1. Auth Store (`store/useAuthStore.ts`)

Global authentication state management.

**State:**
```typescript
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email, password) => Promise<boolean>;
  signup: (email, password, name) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data) => void;
}
```

**Usage:**
```typescript
import { useAuthStore } from '@/store/useAuthStore';

function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuthStore();
  
  if (isAuthenticated) {
    return <div>Welcome {user.name}</div>;
  }
}
```

### 2. Login Dialog (`components/auth/login-dialog.tsx`)

Modal dialog for user login.

**Features:**
- Email and password fields
- Form validation
- Loading states
- Error handling
- Switch to signup
- Demo credentials display

**Usage:**
```typescript
import { LoginDialog } from '@/components/auth/login-dialog';

<LoginDialog
  open={loginOpen}
  onOpenChange={setLoginOpen}
  onSwitchToSignup={() => setSignupOpen(true)}
/>
```

### 3. Signup Dialog (`components/auth/signup-dialog.tsx`)

Modal dialog for user registration.

**Features:**
- Full name, email, password fields
- Password confirmation
- Password strength validation
- Duplicate email detection
- Switch to login

**Usage:**
```typescript
import { SignupDialog } from '@/components/auth/signup-dialog';

<SignupDialog
  open={signupOpen}
  onOpenChange={setSignupOpen}
  onSwitchToLogin={() => setLoginOpen(true)}
/>
```

### 4. User Menu (`components/auth/user-menu.tsx`)

Dropdown menu for authenticated users.

**Features:**
- User avatar with initials
- Profile link
- Orders link
- Wishlist link
- Settings link
- Logout button

**Usage:**
```typescript
import { UserMenu } from '@/components/auth/user-menu';

{isAuthenticated && <UserMenu />}
```

## User Flow

### Registration Flow

1. User clicks "Login" in navbar
2. Clicks "Sign up" in login dialog
3. Fills registration form:
   - Full Name
   - Email
   - Password (min 6 chars)
   - Confirm Password
4. Submits form
5. Account created and auto-logged in
6. Welcome toast notification
7. User menu appears in navbar

### Login Flow

1. User clicks "Login" in navbar
2. Fills login form:
   - Email
   - Password
3. Submits form
4. Authentication validated
5. User data stored in Zustand + localStorage
6. Welcome back toast
7. Dialog closes, user menu appears

### Logout Flow

1. User clicks profile dropdown
2. Clicks "Log out"
3. State cleared
4. Toast notification
5. Redirected to appropriate page

## Data Model

### User Object

```typescript
interface User {
  id: string;              // Unique identifier
  email: string;           // User email
  name: string;            // Full name
  avatar?: string;         // Profile picture URL (optional)
  createdAt: string;       // Account creation date
}
```

### Storage Structure

**localStorage Keys:**
- `auth-storage`: Auth state (user + isAuthenticated)
- `mock-users`: Array of registered users (includes passwords)

**Note**: In production, passwords should NEVER be stored in localStorage. This is for demo purposes only.

## Demo Account

A demo account is automatically seeded on app load:

```
Email: demo@niceshop.com
Password: demo123
```

This allows immediate testing without registration.

## Security Considerations

### Current Implementation (Demo)

⚠️ **For demonstration purposes only**:
- Passwords stored in localStorage
- No encryption
- Client-side only authentication
- No email verification
- No password reset

### Production Requirements

For production, implement:

1. **Backend API**
   - RESTful or GraphQL API
   - JWT or session-based auth
   - Secure password hashing (bcrypt, argon2)
   - HTTPS only

2. **Security Features**
   - Password hashing on server
   - Rate limiting
   - CSRF protection
   - XSS protection
   - Email verification
   - Password reset flow
   - Two-factor authentication (optional)

3. **Best Practices**
   - Never store passwords in localStorage
   - Use httpOnly cookies for tokens
   - Implement refresh tokens
   - Add session timeout
   - Log authentication attempts

## Integration Examples

### Protect Routes

```typescript
'use client';

import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function CheckoutPage() {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/');
      toast.error('Please login to checkout');
    }
  }, [isAuthenticated]);

  return <div>Checkout Page</div>;
}
```

### Conditional Rendering

```typescript
import { useAuthStore } from '@/store/useAuthStore';

function Header() {
  const { user, isAuthenticated } = useAuthStore();

  return (
    <div>
      {isAuthenticated ? (
        <span>Welcome, {user.name}</span>
      ) : (
        <button onClick={openLogin}>Login</button>
      )}
    </div>
  );
}
```

### Associate Cart with User

```typescript
// In useStore.ts
const { user } = useAuthStore.getState();

addToCart: (product) => {
  set(state => ({
    cart: [...state.cart, {
      ...product,
      userId: user?.id, // Associate with logged-in user
      cartQuantity: 1
    }]
  }));
}
```

## API Integration (Future)

When connecting to a real backend:

### Login Endpoint

```typescript
// store/useAuthStore.ts
login: async (email: string, password: string) => {
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const { user, token } = await response.json();
      
      // Store token
      localStorage.setItem('token', token);
      
      // Update state
      set({ user, isAuthenticated: true });
      return true;
    }
    return false;
  } catch (error) {
    console.error('Login error:', error);
    return false;
  }
}
```

### Protected API Calls

```typescript
const token = localStorage.getItem('token');

const response = await fetch('/api/orders', {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
});
```

## Validation Rules

### Email
- Required field
- Valid email format
- Unique (no duplicates)

### Password
- Minimum 6 characters
- Required field
- Must match confirmation (signup)

### Name
- Required field
- Minimum 2 characters
- Maximum 50 characters

## Error Handling

All authentication actions provide user feedback:

**Success Messages:**
- ✅ "Account created successfully!"
- ✅ "Welcome back!"
- ✅ "Logged out successfully"

**Error Messages:**
- ❌ "Please fill in all fields"
- ❌ "Invalid email or password"
- ❌ "Email already exists"
- ❌ "Passwords do not match"
- ❌ "Password must be at least 6 characters"

## Testing

### Manual Testing

1. **Registration**
   ```
   Name: Test User
   Email: test@example.com
   Password: test123
   Confirm: test123
   ```

2. **Login**
   ```
   Email: test@example.com
   Password: test123
   ```

3. **Demo Account**
   ```
   Email: demo@niceshop.com
   Password: demo123
   ```

### Test Scenarios

- [ ] Register new account
- [ ] Login with correct credentials
- [ ] Login with wrong password
- [ ] Register with existing email
- [ ] Password mismatch error
- [ ] Short password error
- [ ] Logout functionality
- [ ] Session persistence (refresh page)
- [ ] User menu appears when logged in
- [ ] Login button shows when logged out

## Troubleshooting

### User Can't Login

1. Check localStorage for `mock-users`
2. Verify email and password match
3. Clear localStorage and try demo account
4. Check browser console for errors

### Session Not Persisting

1. Check if localStorage is enabled
2. Verify `auth-storage` key exists
3. Check Zustand persist configuration

### Demo User Not Working

1. Open browser console
2. Run: `localStorage.clear()`
3. Refresh page
4. Demo user will be re-seeded

## Future Enhancements

- [ ] OAuth integration (Google, Facebook)
- [ ] Email verification
- [ ] Password strength meter
- [ ] Remember me checkbox
- [ ] Profile picture upload
- [ ] Account settings page
- [ ] Order history
- [ ] Address management
- [ ] Payment methods
- [ ] Notification preferences

## Support

For questions or issues:
- Check this documentation
- Review component source code
- Open an issue on GitHub

---

**Built with security and user experience in mind** 🔐

