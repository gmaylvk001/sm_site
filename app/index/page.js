"use client";
import { useState, useEffect } from "react";

import HomeComponent from "@/components/index";


export default function Dashboard() {
  const [time, setTime] = useState(null);

  useEffect(() => {
    setTime(Date.now());
  }, []);

  return (
    <div className="bg-linear-to-r from-linearyellow via-white to-linearyellow">
      
      <HomeComponent /> {/* Use the Home component here */}
    </div>
  );
}
