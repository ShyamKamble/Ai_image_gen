import React, { useEffect, useState } from "react";
import Homepage from "./Homepage";
import { LoginForm } from "./Login";
import { Imggen2 } from "./imggen";
import PricingSection from "./pricing";
import { PlaceholdersAndVanishInput } from "./components/ui/placeholders-and-vanish-input";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navbar1 } from "./Navbar";
import { SignupForm } from "./Signup";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [credits, setCredits]   = useState(0);          
  const [username, setUsername] = useState("");         

  
  useEffect(() => {
    const token      = localStorage.getItem("token");
    const userId     = localStorage.getItem("userId");
    const storedCr   = localStorage.getItem("credits");
    const storedUser = localStorage.getItem("username");

    setIsLoggedIn(!!token);

    if (token && userId) {
      if (storedCr)   setCredits(Number(storedCr));
      if (storedUser) setUsername(storedUser);
      fetchCredits(userId);
    }
  }, [isLoggedIn]);

 
  const fetchCredits = async (userId) => {
    try {
      const res = await fetch("http://localhost:5000/credits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userid: userId }),
      });
      const data = await res.json();
      if (data.response) {
        setCredits(data.credits);
        setUsername(data.name);
        localStorage.setItem("credits", data.credits);
        localStorage.setItem("username", data.name);
      }
    } catch (err) {
      console.error("Failed to fetch credits", err);
    }
  };

  return (
    <Router>
      <Navbar1
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        credits={credits}                     
        username={username}                    
      />
      <Routes>
        <Route path="/" element={<Homepage />} />
        {/* <Route path="/login" element={<LoginForm setIsLoggedIn={setIsLoggedIn} />} /> */}
        <Route path="/login" element={<LoginForm setIsLoggedIn={setIsLoggedIn} setUsername={setUsername} setCredits={setCredits} />} />
        <Route path="/signup" element={<SignupForm setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/generate" element={<Imggen2 />} />
        <Route path="/pricing" element={<PricingSection><PlaceholdersAndVanishInput /></PricingSection>} />
        <Route path="*" element={<div className="text-center mt-20 text-2xl font-bold">404 - Page Not Found</div>} />
      </Routes>
    </Router>
  );
};

export default App;
