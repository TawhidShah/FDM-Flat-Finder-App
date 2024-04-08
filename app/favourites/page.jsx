"use client";

import { useEffect, useState } from "react";

import { useUser } from "@clerk/nextjs";
import axios from "axios";
import InternalListingCard from "@/components/Listings/internalListings/InternalListingCard";
import InternalListingsGrid from "@/components/Listings/internalListings/InternalListingsGrid";

const Favoruites = () => {
  const { user } = useUser();
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const res = await axios.get(
          `/api/users/${user?.username}/bookmarks?populate=1`,
        );
        setFavourites(res.data.bookmarks);
      } catch (error) {
        console.error(error);
      }
    };

    if (user) {
      fetchFavourites();
    }
  }, [user]);

  return (
    <div className="flex flex-col p-8">
      <h1 className="mb-4 mt-8 text-center text-3xl font-bold text-primary">
        Favourites
      </h1>

      {favourites.length === 0 && (
        <div className="text-center text-lg mt-8 text-primary">
          You have no favourites yet
        </div>
      )}
      <InternalListingsGrid listings={favourites} />
    </div>
  );
};

export default Favoruites;
