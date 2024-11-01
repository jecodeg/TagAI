// components/Home.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import xbrlImage from "@/assets/xbrl-tagging-image-1.jpeg";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 font-sans">
          Welcome to <span className="text-[#9C27B0] ">TagGen</span>
        </h1>
        <p className="text-lg mb-4">
          Transform the way you manage financial documents
        </p>
        
      </div >
      <div className="mu-8">
        <p className="text-lg mb-4 text-center">
          Financial tagging is a cumbersome operation that all companies are obliged to complete at least once a year if not on a quarterly basis. TagGen provides a platform to exponentially improve the efficiency of this process.
        </p>
        </div>
        <div className="outer-container" style={{ display: "flex", alignItems: "center" }}>
  {/* Image Container */}
  <div style={{ flex: 1, textAlign: "center" }}>
    <img
      src={xbrlImage}
      alt="XBRL Tagging Example"
      style={{ width: "85%", border: "2px solid purple-500" }}
    />
  </div>
  
  {/* Text Container */}
  <div style={{ flex: 1, paddingLeft: "20px" }}>
    <p className="text-lg">
      <p className="text-xl mb-4">Some problems faced in financial tagging are</p>
      <ul >
        <li className="mb-4">
          <strong>Lengthy Process:</strong> Manual tagging results in an average turnaround time of 5 days per document.
        </li>
        <li className="mb-4">
          <strong>Increased Error Risk:</strong> Inefficiencies heighten the risk of errors, leading to compliance issues.
        </li>
        <li className="mb-4">
          <strong>Missed Deadlines:</strong> Traditional methods hinder companies from meeting deadlines and maintaining reporting accuracy.
        </li>
      </ul>
    </p>
  </div>
</div>

        
      
      <div className="text-center">
        <Button size="lg" className="hover:text-[#9C27B0] hover:bg-[#1a1a1a] my-5" onClick={() => navigate("/upload")}>Get Started</Button>
      </div>
    </div>
  );
};

export default Home;
