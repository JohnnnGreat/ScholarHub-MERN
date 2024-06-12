"use client";
import React, { useState } from "react";

const ResourceCard = ({ resource }: { resource: any }) => {
  const [showShareOptions, setShowShareOptions] = useState(false);
  const handleShare = (platform: any) => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`Check out this resource: ${resource.title}`);

    let shareUrl = "";

    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
        break;
      case "whatsapp":
        shareUrl = `https://api.whatsapp.com/send?text=${text} ${url}`;
        break;
      default:
        return;
    }

    window.open(shareUrl, "_blank");
  };
  return (
    <div className="bg-[#76abae18] p-6 mb-6 rounded-[20px] text-gray-300">
      <h2 className="text-xl mb-2 text-[#76ABAE] golden-font">{resource.title}</h2>
      <p className="mb-4 text-[#ffffff93]">{resource.description}</p>
      <div className="flex space-x-4 mb-4">
        <button className="text-teal-300 hover:underline">View Paper</button>
        <button className="text-teal-300 hover:underline">View Analytics</button>
        <button
          className="text-teal-300 hover:underline"
          onClick={() => setShowShareOptions(!showShareOptions)}
        >
          Share
        </button>
        {showShareOptions && (
          <div className="absolute mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
            <div
              className="py-1"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              <button
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
                onClick={() => handleShare("facebook")}
              >
                Facebook
              </button>
              <button
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
                onClick={() => handleShare("twitter")}
              >
                Twitter
              </button>
              <button
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
                onClick={() => handleShare("whatsapp")}
              >
                WhatsApp
              </button>
            </div>
          </div>
        )}
        <button className="text-teal-300 hover:underline">Edit Resource</button>
        <button className="text-teal-300 hover:underline">Delete Resource</button>
      </div>
      <div className="text-gray-400">{resource.date}</div>
    </div>
  );
};

export default ResourceCard;
