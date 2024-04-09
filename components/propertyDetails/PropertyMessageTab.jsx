"use client";

import { useState } from "react";

import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { toast } from "react-toastify";

import Loading from "../Loading";

import "react-toastify/dist/ReactToastify.css";

const PropertyMessageTab = ({ listingOwner, listingTitle }) => {
  const { user } = useUser();

  const senderEmail = user?.primaryEmailAddress.emailAddress;
  const recipientEmail = listingOwner.email;

  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/sendEmail", {
        sender: {
          email: senderEmail,
          firstName: user.firstName,
          lastName: user.lastName,
        },
        recipient: {
          email: recipientEmail,
          firstName: listingOwner.firstName,
          lastName: listingOwner.lastName,
        },
        listingTitle: listingTitle,
        subject: subject,
        message: message,
      });
      setSubject("");
      setMessage("");
      toast.success("Message sent successfully");
    } catch (error) {
      toast.error("Error sending message");
    }
  };

  if (!user) return <Loading />;

  return (
    <>
      <h1 className="mt-10 text-center text-3xl font-bold text-white">
        Send a Message to {listingOwner.firstName} {listingOwner.lastName}
      </h1>
      <div className="mx-auto my-[50px] w-[65%] rounded-md border border-[#2d2d2d] p-[60px] shadow-xl">
        <form
          onSubmit={handleSubmit}
          onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
          className="flex w-full flex-col gap-4"
        >
          <label
            className="mb-2.5 block font-bold text-white"
            htmlFor="subject"
          >
            Subject:
          </label>
          <input
            name="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="my-2.5 w-full rounded-md border border-[#232323] bg-[#202020] p-2.5 text-white"
          />

          <label
            className="mb-2.5 block font-bold text-white"
            htmlFor="message"
          >
            Message:
          </label>
          <textarea
            rows="10"
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="my-2.5 w-full rounded-md border border-[#232323] bg-[#202020] p-2.5 text-white"
          />

          <button
            type="submit"
            className="w-full rounded-md bg-primary py-2.5 font-semibold hover:bg-white"
            onClick={handleSubmit}
          >
            Send Message
          </button>
        </form>
      </div>
    </>
  );
};

export default PropertyMessageTab;
