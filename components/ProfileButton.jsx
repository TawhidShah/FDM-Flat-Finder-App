import { useState, useRef, useEffect } from "react";

import { SignOutButton } from "@clerk/nextjs";
import { LuUser } from "react-icons/lu";
import { AiOutlineProfile } from "react-icons/ai";
import { PiSignOut, PiHouseLight } from "react-icons/pi";
import { CiHeart } from "react-icons/ci";

import { useRouter } from "next/navigation";

const ProfileButton = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);

  return (
    <div ref={dropdownRef} className="relative z-[999998] text-primary">
      <button onClick={() => setIsOpen(!isOpen)} className="hover:scale-[110%]">
        <LuUser className="mr-2 h-6 w-6 text-primary" />
      </button>
      {isOpen && (
        <div className="absolute right-0 z-50 mt-2 flex w-96 flex-col rounded-md border-2 border-primary bg-black">
          <div
            className="flex cursor-pointer p-4 pt-6"
            onClick={() => {
              setIsOpen(false);
              router.push(`/user/${user.username}`);
            }}
          >
            <img
              src={user?.imageUrl}
              alt="profile"
              className="h-16 w-16 rounded-full"
            />
            <div className="ml-4">
              <p>{user.fullName}</p>
              <p className="ml-[2px]">{user?.username}</p>
            </div>
          </div>
          <button
            className="flex p-2 text-left hover:bg-secondary"
            onClick={() => {
              setIsOpen(false);
              router.push("/listings/create");
            }}
          >
            <PiHouseLight className="mr-2 h-6 w-6" />
            Create Listing
          </button>
          <button
            className="flex p-2 text-left hover:bg-secondary"
            onClick={() => {
              setIsOpen(false);
              router.push(`/user/${user.username}`);
            }}
          >
            <AiOutlineProfile className="mr-2 h-6 w-6" />
            View Profile
          </button>
          <button
            className="flex p-2 text-left hover:bg-secondary"
            onClick={() => {
              setIsOpen(false);
              router.push("/favourites");
            }}
          >
            <CiHeart className="mr-2 h-6 w-6" />
            Favourites
          </button>
          <div className="flex items-center pl-2 hover:bg-secondary">
            <PiSignOut className="h-6 w-6" />
            <SignOutButton className="w-full p-2 text-left" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileButton;
