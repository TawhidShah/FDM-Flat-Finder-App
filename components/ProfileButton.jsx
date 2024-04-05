import { useState, useRef, useEffect } from "react";

import { SignOutButton } from "@clerk/nextjs";
import { User } from "lucide-react";

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
    <div ref={dropdownRef} className="relative">
      <button onClick={() => setIsOpen(!isOpen)} className="hover:scale-[105%]">
        <User className="mr-2 text-[#C5FF00]" />
      </button>
      {isOpen && (
        <div className="absolute right-0 z-50 mt-2 flex w-96 flex-col rounded-md bg-gray-400">
          <div className="flex p-4 pt-6">
            <img
              src={user?.imageUrl}
              alt="profile"
              className="w-12 rounded-full"
            />
            <div className="ml-4">
              <p>{user.fullName}</p>
              <p className="ml-[3px]">{user?.username}</p>
            </div>
          </div>
          <button
            className="p-2 text-left hover:bg-gray-500"
            onClick={() => {
              setIsOpen(false);
              router.push("/listings/create");
            }}
          >
            Create Listing
          </button>
          <button
            className="p-2 text-left hover:bg-gray-500"
            onClick={() => {
              setIsOpen(false);
              router.push(`/user/${user.username}`);
            }}
          >
            View Profile
          </button>
          <button
            className="p-2 text-left hover:bg-gray-500"
            onClick={() => {
              setIsOpen(false);
              router.push("/manageAccount");
            }}
          >
            Manage Account
          </button>
          <SignOutButton className="p-2 text-left hover:bg-gray-500" />
        </div>
      )}
    </div>
  );
};

export default ProfileButton;
