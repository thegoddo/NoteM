// app/login/page.jsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/api/auth/login", { email, password });
      const token = response.data;
      localStorage.setItem("authToken", token);
      toast.success("Login successful!");
      router.push("/notes");
    } catch (err) {
      toast.error("Invalid credentials.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-sm p-8 border rounded-md">
        <form onSubmit={handleLogin}>
          <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </div>
        </form>

        {/* --- NEW GOOGLE BUTTON --- */}
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        <Button variant="outline" className="w-full" asChild>
          <a href="http://localhost:8080/oauth2/authorization/google">
            Sign in with Google
          </a>
        </Button>

        <p className="mt-4 text-center text-sm text-muted-foreground">
          No account?{" "}
          <Link href="/register" className="font-medium hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
