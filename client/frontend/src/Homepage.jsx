import React from 'react'
import { Navbar1 } from "./Navbar";
import { MacbookScroll } from "./components/ui/macbook-scroll";
import { useNavigate } from 'react-router-dom';
export default function Homepage() {
    const navigate = useNavigate();
  
    function hometologin() {
      navigate("/login");
    }
 
  return (
    <>
    <div>
    <Navbar1 />
    <MacbookScroll />
    <div className="flex flex-col items-center mt-10 pb-10">
      <h1 className="mb-4">create images like these</h1>
      <button onClick={hometologin} className="bg-transparent w-32 hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
        get started
      </button>
    </div>
  </div>
    </>
  )
}
