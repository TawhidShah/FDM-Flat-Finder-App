"use client";

import { useEffect, useState } from "react";

import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { useRouter } from "next/navigation";

import InternalListingsGrid from "@/components/Listings/internalListings/InternalListingsGrid";

const Favoruites = () => {
  const { user } = useUser();
  const router = useRouter();
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const res = await axios.get(
          `/api/users/${user?.username}/bookmarks?populate=1`,
        );
        setFavourites(res.data.bookmarks || []);
      } catch (error) {
        console.error(error);
      }
    };

    if (user && user.publicMetadata?.profileCreated) {
      fetchFavourites();
    } else if (user) {
      router.push("/createProfile");
    }
  }, [user]);

  return (
    <div className="flex flex-col p-8">
      <h1 className="mb-4 mt-8 text-center text-3xl font-bold text-primary">
        Favourites
      </h1>

      {favourites.length === 0 && (
        <div className="mt-8 text-center text-lg text-primary">
          You have no favourites yet
        </div>
      )}

      {favourites.length > 0 && <InternalListingsGrid listings={favourites} />}
    </div>
  );
};

export default Favoruites;
