// import { Suspense } from "react";
// import { useRoutes, Routes, Route } from "react-router-dom";
// import Home from "./components/home";
// import routes from "tempo-routes";

// function App() {
//   return (
//     <Suspense fallback={<p>Loading...</p>}>
//       <>
//         <Routes>
//           <Route path="/" element={<Home />} />
//         </Routes>
//         {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
//       </>
//     </Suspense>
//   );
// }

// export default App;

import { Suspense, useState, useEffect } from "react";
import { useRoutes, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/home";
import routes from "tempo-routes";
import useAuth from "./hooks/useAuth";
import { supabase } from "./lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";

function App() {
  const { user, loading, error, signIn, signUp, signOut } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState<string | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  // Check if Supabase is configured
  useEffect(() => {
    const checkSupabaseConfig = async () => {
      try {
        // Simple check to see if Supabase client is properly configured
        await supabase.from('conversations').select('count', { count: 'exact', head: true });
        console.log('Supabase connection successful');
      } catch (error) {
        console.error('Supabase connection error:', error);
      }
    };

    checkSupabaseConfig();
  }, []);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setIsAuthenticating(true);

    try {
      if (isSignUp) {
        const result = await signUp(email, password);
        if (result?.user) {
          alert("Check your email for the confirmation link");
        }
      } else {
        await signIn(email, password);
      }
    } catch (error: any) {
      setAuthError(error.message || "Authentication failed");
    } finally {
      setIsAuthenticating(false);
    }
  };

  // Auth form component
  const AuthForm = () => (
    <div className="flex items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-900">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{isSignUp ? "Sign Up" : "Sign In"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAuth} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">Password</label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {authError && (
              <div className="text-red-500 text-sm">{authError}</div>
            )}
            <Button type="submit" className="w-full" disabled={isAuthenticating}>
              {isAuthenticating 
                ? "Loading..." 
                : isSignUp 
                  ? "Sign Up" 
                  : "Sign In"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button
            variant="link"
            className="w-full"
            onClick={() => setIsSignUp(!isSignUp)}
            disabled={isAuthenticating}
          >
            {isSignUp
              ? "Already have an account? Sign In"
              : "Don't have an account? Sign Up"}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="w-full text-sm"
            onClick={() => {
              const email = prompt("Enter your email to reset your password");
              if (email) {
                supabase.auth.resetPasswordForEmail(email)
                  .then(() => alert("Check your email for password reset instructions"))
                  .catch(err => setAuthError(err.message));
              }
            }}
            disabled={isAuthenticating}
          >
            Forgot password?
          </Button>
        </CardFooter>
      </Card>
    </div>
  );

  // Show loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <Suspense fallback={<p>Loading...</p>}>
      {user ? (
        // Authenticated routes
        <>
          <Routes>
            <Route path="/" element={<Home user={user} signOut={signOut} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
        </>
      ) : (
        // Unauthenticated routes
        <AuthForm />
      )}
    </Suspense>
  );
}

export default App;