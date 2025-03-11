
import React, { createContext, useContext, useState, useEffect } from "react";

// Define user role types
export type UserRole = "farmer" | "customer";

// Define user interface
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isVerified: boolean;
}

// Define auth context interface
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, password: string) => Promise<void>;
  verifyOTP: (email: string, otp: string) => Promise<void>;
  resendOTP: (email: string) => Promise<void>;
}

// Create auth context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  login: async () => {},
  signup: async () => {},
  logout: () => {},
  forgotPassword: async () => {},
  resetPassword: async () => {},
  verifyOTP: async () => {},
  resendOTP: async () => {},
});

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);

// Auth provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // In a real app, this would check for an existing auth token or session
        const storedUser = localStorage.getItem("farmfresh_user");
        
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Auth initialization error:", error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // Simulate API call to login
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, this would make an API request to authenticate
      // and return a user object with auth token
      
      // Mock successful login for demo purposes
      const mockUser: User = {
        id: "user-123",
        name: "John Doe",
        email,
        role: email.includes("farmer") ? "farmer" : "customer",
        isVerified: true,
      };
      
      // Save user to state and localStorage
      setUser(mockUser);
      localStorage.setItem("farmfresh_user", JSON.stringify(mockUser));
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Signup function
  const signup = async (name: string, email: string, password: string, role: UserRole) => {
    setIsLoading(true);
    
    try {
      // Simulate API call to register
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, this would make an API request to register a new user
      // For demo, we'll assume verification is needed
      
      // Return success but don't log in yet (verification needed)
      return;
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("farmfresh_user");
  };

  // Forgot password function
  const forgotPassword = async (email: string) => {
    try {
      // Simulate API call to request password reset
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, this would send a reset email
      return;
    } catch (error) {
      console.error("Forgot password error:", error);
      throw error;
    }
  };

  // Reset password function
  const resetPassword = async (token: string, password: string) => {
    try {
      // Simulate API call to reset password
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, this would verify the token and set new password
      return;
    } catch (error) {
      console.error("Reset password error:", error);
      throw error;
    }
  };

  // Verify OTP function
  const verifyOTP = async (email: string, otp: string) => {
    try {
      // Simulate API call to verify OTP
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, this would verify the OTP and mark the user as verified
      return;
    } catch (error) {
      console.error("OTP verification error:", error);
      throw error;
    }
  };

  // Resend OTP function
  const resendOTP = async (email: string) => {
    try {
      // Simulate API call to resend OTP
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, this would resend a verification code
      return;
    } catch (error) {
      console.error("Resend OTP error:", error);
      throw error;
    }
  };

  // Context value
  const value = {
    user,
    isLoading,
    login,
    signup,
    logout,
    forgotPassword,
    resetPassword,
    verifyOTP,
    resendOTP,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
