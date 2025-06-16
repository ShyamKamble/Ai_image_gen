import React, { useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

export  function LoginForm({ setIsLoggedIn, setUsername, setCredits }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log("Form data:", form); // Debug form data
      const res = await axios.post("http://localhost:5000/login", form);
      console.log("Response data:", res.data); // Debug response data
      // const token = res.data.token;
      const { token, name, credits, userid } = res.data;
      console.log("Token:", token); // Debug token
      // localStorage.setItem("token", token);
      localStorage.setItem("token", token);
localStorage.setItem("username", name);
localStorage.setItem("credits", credits);
localStorage.setItem("userId", userid);
      console.log("Navigating to /generate"); // Debug navigation
      navigate("/generate");
      // navigate("/generate");
    } catch (err) {
      console.error("Login error:", err); // Debug error
      setError(err.response?.data?.message || "Login failed.");
    }
  };
// Login.jsx

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-[400px]">
        <CardContent>
          <form onSubmit={handleLogin} className="flex flex-col gap-6 p-6 md:p-8">
            <div>
              <h1 className="text-2xl font-bold">Login to your account</h1>
              <p className="text-sm text-muted-foreground">Enter your details below to login</p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" value={form.email} onChange={handleChange} />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <a href="#" className="text-sm text-muted-foreground hover:underline">Forgot your password?</a>
              </div>
              <Input id="password" name="password" type="password" value={form.password} onChange={handleChange} />
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <Button type="submit" className="w-full">Login</Button>
            <div className="text-center text-sm text-muted-foreground">
              Don’t have an account? <a href="/signup" className="hover:underline">Sign up</a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}