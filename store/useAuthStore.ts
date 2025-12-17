import { create, StateCreator } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  
  // Actions
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
}

// Mock authentication - In production, replace with real API calls
const mockLogin = async (email: string, password: string): Promise<User | null> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Get stored users from localStorage
  const users = JSON.parse(localStorage.getItem('mock-users') || '[]');
  const user = users.find((u: any) => u.email === email && u.password === password);
  
  if (user) {
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
  
  return null;
};

const mockSignup = async (email: string, password: string, name: string): Promise<User | null> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Get stored users from localStorage
  const users = JSON.parse(localStorage.getItem('mock-users') || '[]');
  
  // Check if user already exists
  if (users.find((u: any) => u.email === email)) {
    return null; // User already exists
  }
  
  // Create new user
  const newUser = {
    id: Date.now().toString(),
    email,
    password, // In production, this should be hashed on the backend
    name,
    createdAt: new Date().toISOString(),
  };
  
  // Store user
  users.push(newUser);
  localStorage.setItem('mock-users', JSON.stringify(users));
  
  const { password: _, ...userWithoutPassword } = newUser;
  return userWithoutPassword;
};

const authStoreImpl: StateCreator<AuthState> = (set) => ({
  user: null,
  isAuthenticated: false,
  
  login: async (email: string, password: string) => {
    try {
      const user = await mockLogin(email, password);
      if (user) {
        set({ user, isAuthenticated: true });
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  },
  
  signup: async (email: string, password: string, name: string) => {
    try {
      const user = await mockSignup(email, password, name);
      if (user) {
        set({ user, isAuthenticated: true });
        return true;
      }
      return false;
    } catch (error) {
      console.error('Signup error:', error);
      return false;
    }
  },
  
  logout: () => {
    set({ user: null, isAuthenticated: false });
  },
  
  updateProfile: (data: Partial<User>) => {
    set((state) => ({
      user: state.user ? { ...state.user, ...data } : null,
    }));
  },
});

export const useAuthStore = create<AuthState>()(
  persist(authStoreImpl, {
    name: 'auth-storage',
    storage: createJSONStorage(() => localStorage),
    partialize: (state) => ({
      user: state.user,
      isAuthenticated: state.isAuthenticated,
    }),
  })
);

