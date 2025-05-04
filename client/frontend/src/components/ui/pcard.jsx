import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "../../lib/utils";

const PricingCard = ({
  title,
  description,
  price,
  credits,
  className,
}) => {
  return (
    <div className={cn("bg-white p-6 rounded-xl shadow-sm", className)}>
      <div className="flex justify-center mb-4">
        <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="text-white"
          >
            <path d="M20 6L9 17l-5-5"></path>
          </svg>
        </div>
      </div>
      
      <h3 className="text-lg font-medium text-center">{title}</h3>
      <p className="text-gray-600 text-sm text-center mt-1">{description}</p>
      
      <div className="mt-6 mb-6 text-center">
        <span className="text-2xl font-bold">${price}</span>
        <span className="text-gray-500 text-sm">/{credits} credits</span>
      </div>
      
      <Button 
        variant="default" 
        className="w-full bg-gray-800 hover:bg-gray-900 text-white"
      >
        Get started
      </Button>
    </div>
  );
};

export default PricingCard;