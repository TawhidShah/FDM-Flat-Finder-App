"use client";
import { useEffect, useState } from "react";

import axios from "axios";

import Link from "next/link";

import Loading from "@/components/Loading";
import PropertyDetailsTab from "@/components/propertyDetails/PropertyDetailsTab";
import PropertyMessageTab from "@/components/propertyDetails/PropertyMessageTab";

const Listing = ({ params }) => {
  const { id } = params;

  const [activeTab, setActiveTab] = useState("tab1");
  const [listing, setListing] = useState();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await axios.get(`/api/listings/${id}`);
        setListing(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (!listing && !loading) {
    return (
      <div className="mt-[15vh] flex w-full flex-1 flex-col items-center">
        <h1 className="text-4xl font-semibold text-primary">
          Listing not found
        </h1>

        <Link
          href="/listings"
          className="mt-4 rounded bg-primary p-3 font-semibold hover:bg-white"
        >
          Back to listings
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="tabs mb-2.5 flex justify-center">
        <button
          className={`mr-2.5 cursor-pointer px-5 py-2.5 text-base outline-none ${activeTab === "tab1" ? "bg-primary p-3 px-6 font-bold text-black" : "bg-transparent text-primary hover:bg-primary hover:text-black"}`}
          onClick={() => setActiveTab("tab1")}
        >
          Property
        </button>
        <button
          className={`mr-2.5 cursor-pointer px-5 py-2.5 text-base outline-none ${activeTab === "tab2" ? "bg-primary p-3 px-6 font-bold text-black" : "bg-transparent text-primary hover:bg-primary hover:text-black"}`}
          onClick={() => setActiveTab("tab2")}
        >
          Contact
        </button>
      </div>
      <div>
        {activeTab === "tab1" && <PropertyDetailsTab listing={listing} />}
        {activeTab === "tab2" && (
          <PropertyMessageTab listingOwner={listing.owner} />
        )}
      </div>
    </div>
  );
};

export default Listing;
