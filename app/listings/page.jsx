"use client";
import { useState } from "react";

import InternalListings from "@/components/internalListings/InternalListings";
import ExternalListings from "@/components/externalListings/ExternalListings";

const ListingsPage = () => {
  const [activeTab, setActiveTab] = useState("tab1");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <div className="tabs mb-2.5 flex justify-center">
        <button
          className={`mr-2.5 cursor-pointer px-5 py-2.5 text-base outline-none ${activeTab === "tab1" ? "bg-primary p-3 px-6 font-bold text-black" : "bg-transparent text-primary hover:bg-primary hover:text-black"}`}
          onClick={() => handleTabChange("tab1")}
        >
          Internal
        </button>
        <button
          className={`mr-2.5 cursor-pointer px-5 py-2.5 text-base outline-none ${activeTab === "tab2" ? "bg-primary p-3 px-6 font-bold text-black" : "bg-transparent text-primary hover:bg-primary hover:text-black"}`}
          onClick={() => handleTabChange("tab2")}
        >
          External
        </button>
      </div>
      <div className="text-center">
        {activeTab === "tab1" && <InternalListings />}
        {activeTab === "tab2" && <ExternalListings />}
      </div>
    </div>
  );
};

export default ListingsPage;
