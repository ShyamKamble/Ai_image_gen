import React, { useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

export  function SignupForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/register", form);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md space-y-8">
        <Card>
          <CardContent>
            <form onSubmit={handleSignup} className="flex flex-col gap-6 p-6 md:p-8">
              <div>
                <h1 className="text-2xl font-bold">Create your account</h1>
                <p className="text-sm text-muted-foreground">Enter your details below to create your account</p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="name">Username</Label>
                <Input id="name" name="name" value={form.name} onChange={handleChange} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" value={form.email} onChange={handleChange} />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <a href="#" className="text-sm text-muted-foreground hover:underline">Create your password?</a>
                </div>
                <Input id="password" name="password" type="password" value={form.password} onChange={handleChange} />
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
              <Button type="submit" className="w-full">Sign Up</Button>
              <div className="text-center text-sm text-muted-foreground">
                Already have an account? <a href="/login" className="hover:underline">Login</a>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
