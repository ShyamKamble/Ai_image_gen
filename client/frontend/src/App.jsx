import React from "react";
import Homepage from "./Homepage";
import { LoginForm } from "./Login";
import { Imggen2 } from "./imggen";
import PricingSection from "./pricing";
import { PlaceholdersAndVanishInput } from "./components/ui/placeholders-and-vanish-input";
import { BrowserRouter as Router, Route, Routes, useNavigate  } from "react-router-dom";
import { Navbar1 } from "./Navbar";
import {SignupForm} from "./Signup"

const LoginPage = () => (
  <div>
  <Navbar1 />
  <div className="container mx-auto flex items-center justify-center min-h-screen py-8">
    <LoginForm />
  </div>
  </div>
);
const SignupFormpage = () => (
  <div>
  <Navbar1 />
  <div className="container mx-auto flex items-center justify-center min-h-screen py-8">
  <SignupForm/>
  </div>
  </div>
);
const ImageGenPage = () => <Imggen2 />;

const PricingPage = () => (
  <div className="w-full min-h-screen overflow-x-hidden">
    <PricingSection />
    <PlaceholdersAndVanishInput />
  </div>
);

// NotFound fallback
const NotFound = () => (
  <div className="text-center mt-20 text-2xl font-bold">404 - Page Not Found</div>
);

// Main App
const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/Signup" element={<SignupForm/>}/>
      <Route path="/generate" element={<ImageGenPage />} />
      <Route path="/pricing" element={<PricingPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Router>
);

export default App;
