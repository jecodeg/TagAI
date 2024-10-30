// components/Home.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 font-sans">
          Welcome to <span className="text-[#9C27B0] ">TagGen</span>
        </h1>
        <p className="text-lg mb-8">
          Transform the way you manage financial documents
        </p>
        <Button size="lg" onClick={() => navigate("/upload")}>
          Get Started
        </Button>
      </div>
    </div>
  );
};

export default Home;
