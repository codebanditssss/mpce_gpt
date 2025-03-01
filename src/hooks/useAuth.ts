// import { useState, useEffect } from 'react';
// import { supabase } from '../lib/supabase';
// import type { User } from '@supabase/supabase-js';

// export function useAuth() {
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     // Get initial session
//     const getInitialSession = async () => {
//       try {
//         const { data, error } = await supabase.auth.getSession();
        
//         if (error) {
//           throw error;
//         }
        
//         setUser(data.session?.user ?? null);
//       } catch (err) {
//         setError((err as Error).message);
//         console.error('Error getting auth session:', err);
//       } finally {
//         setLoading(false);
//       }
//     };
    
//     getInitialSession();

//     // Listen for auth changes
//     const { data: { subscription } } = supabase.auth.onAuthStateChange(
//       (event, session) => {
//         setUser(session?.user ?? null);
//         setLoading(false);
//       }
//     );

//     return () => subscription.unsubscribe();
//   }, []);

//   const signIn = async (email: string, password: string) => {
//     setLoading(true);
//     setError(null);
    
//     try {
//       const { data, error } = await supabase.auth.signInWithPassword({
//         email,
//         password,
//       });
      
//       if (error) {
//         throw error;
//       }
      
//       return data;
//     } catch (err) {
//       setError((err as Error).message);
//       console.error('Error signing in:', err);
//       return null;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const signUp = async (email: string, password: string) => {
//     setLoading(true);
//     setError(null);
    
//     try {
//       const { data, error } = await supabase.auth.signUp({
//         email,
//         password,
//       });
      
//       if (error) {
//         throw error;
//       }
      
//       return data;
//     } catch (err) {
//       setError((err as Error).message);
//       console.error('Error signing up:', err);
//       return null;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const signOut = async () => {
//     setLoading(true);
//     setError(null);
    
//     try {
//       const { error } = await supabase.auth.signOut();
      
//       if (error) {
//         throw error;
//       }
//     } catch (err) {
//       setError((err as Error).message);
//       console.error('Error signing out:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return {
//     user,
//     loading,
//     error,
//     signIn,
//     signUp,
//     signOut,
//   };
// }

// export default useAuth;

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { User } from '@supabase/supabase-js';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          throw error;
        }
        
        setUser(data?.session?.user ?? null);
      } catch (err) {
        setError((err as Error).message);
        console.error('Error getting auth session:', err);
      } finally {
        setLoading(false);
      }
    };
    
    getInitialSession();

    // Listen for auth changes - safer approach without destructuring
    const authListener = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // Cleanup subscription on unmount
    return () => {
      if (authListener && authListener.data && authListener.data.subscription) {
        authListener.data.subscription.unsubscribe();
      }
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        throw error;
      }
      
      return data;
    } catch (err) {
      setError((err as Error).message);
      console.error('Error signing in:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      
      if (error) {
        throw error;
      }
      
      return data;
    } catch (err) {
      setError((err as Error).message);
      console.error('Error signing up:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        throw error;
      }
    } catch (err) {
      setError((err as Error).message);
      console.error('Error signing out:', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    error,
    signIn,
    signUp,
    signOut,
  };
}

export default useAuth;