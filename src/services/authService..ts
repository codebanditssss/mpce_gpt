import { supabase } from '../lib/supabase';

/**
 * Sign in with email and password
 */
export const signIn = async (email: string, password: string) => {
  return supabase.auth.signInWithPassword({
    email,
    password,
  });
};

/**
 * Sign up with email and password
 */
export const signUp = async (email: string, password: string) => {
  return supabase.auth.signUp({
    email,
    password,
  });
};

/**
 * Sign out the current user
 */
export const signOut = async () => {
  return supabase.auth.signOut();
};

/**
 * Get the current logged-in user
 */
export const getCurrentUser = async () => {
  const { data } = await supabase.auth.getSession();
  return data.session?.user || null;
};

/**
 * Check if a user is currently logged in
 */
export const isLoggedIn = async () => {
  const { data } = await supabase.auth.getSession();
  return !!data.session;
};

/**
 * Reset password for a user
 */
export const resetPassword = async (email: string) => {
  return supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  });
};

/**
 * Update user password
 */
export const updatePassword = async (password: string) => {
  return supabase.auth.updateUser({
    password,
  });
};

/**
 * Update user email
 */
export const updateEmail = async (email: string) => {
  return supabase.auth.updateUser({
    email,
  });
};

/**
 * Set up auth state change listener
 */
export const onAuthStateChange = (callback: (event: string, session: any) => void) => {
  return supabase.auth.onAuthStateChange(callback);
};

export default {
  signIn,
  signUp,
  signOut,
  getCurrentUser,
  isLoggedIn,
  resetPassword,
  updatePassword,
  updateEmail,
  onAuthStateChange,
};