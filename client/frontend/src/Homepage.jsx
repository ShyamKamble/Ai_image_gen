import React from 'react'
import { Navbar1 } from "./Navbar";
import { MacbookScroll } from "./components/ui/macbook-scroll";
import { useNavigate } from 'react-router-dom';
import { Button } from './components/ui/button';
export default function Homepage() {
    const navigate = useNavigate();
  
    function hometologin() {
      navigate("/login");
    }
 
  return (
    <>
    <div >
    
    <MacbookScroll />
    <div className="flex flex-col items-center mt-20 pb-10 ">
      <h1 className="mb-6 text-3xl md:text-4xl font-extrabold text-center text-gray-800 drop-shadow-lg">
  Create images like these
</h1>
     
      <Button
  onClick={hometologin}
  className="w-40 py-3 px-6 rounded-xl text-white bg-black"
>
  Get Started
</Button>
    </div>
  </div>
    </>
  )
}
