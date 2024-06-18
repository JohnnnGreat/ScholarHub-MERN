"use client";
import { IResource } from "@/types";
import Link from "next/link";
import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { useDeleteResource } from "@/utils/queries";

const ResourceCard = ({ resource }: { resource: IResource }) => {
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { mutateAsync: deleteResource, isPending } = useDeleteResource();

  const handleShare = (platform: string, id: string) => {
    const urlF = new URL(window.location.href);
    console.log(urlF);
    const url = encodeURIComponent(`${urlF.origin}/resource/${id}`);
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
  const handleDelete = (resourceId: string) => {
    deleteResource(resourceId);
    console.log(`Deleting resource with id: ${resource.id}`);
    setShowDeleteModal(false); // Close the modal after deletion
  };

  return (
    <div className="bg-[#76abae17] p-6 mb-6 rounded-[18px] text-gray-300 flex flex-col lg:flex-row gap-4">
      <img
        className="rounded-[16px] w-full md:w-[200px!important] lg:w-auto"
        src={resource.thumbnail || "/fallbacki.jpg"}
        alt={resource.title}
      />
      <div className="flex flex-col flex-1">
        <h2 className="text-xl mb-2 text-[#76ABAE] golden-font">{resource.title}</h2>
        <p className="mb-4 text-[#ffffff93]">{resource.description}</p>
        <div className="flex gap-3">
          <div>
            <h1 className="text-[#fff7]">Resource Type</h1>
            <p className="text-[#fff] font-bold">{resource?.resourceType}</p>
          </div>
          <div>
            <h1 className="text-[#fff7]">Subject Area</h1>
            <p className="text-[#fff] font-bold">{resource?.subjectArea}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-4 mb-4 mt-[1rem]">
          <Link href={`/resources/${resource.id}`} className="text-[#66979A] hover:underline">
            View Paper
          </Link>
          <button className="text-[#66979A] hover:underline">View Analytics</button>
          <button
            className="text-[#66979A] hover:underline"
            onClick={() => setShowShareOptions(!showShareOptions)}
          >
            Share
          </button>
          {showShareOptions && (
            <div className="absolute mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
              <div
                className="py-1"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
              >
                <button
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                  onClick={() => handleShare("facebook", resource.id)}
                >
                  Facebook
                </button>
                <button
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                  onClick={() => handleShare("twitter", resource.id)}
                >
                  Twitter
                </button>
                <button
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                  onClick={() => handleShare("whatsapp", resource.id)}
                >
                  WhatsApp
                </button>
              </div>
            </div>
          )}
          <button className="text-[#66979A] hover:underline">Edit Resource</button>
          <button
            className="text-[#66979A] hover:underline"
            onClick={() => setShowDeleteModal(true)}
          >
            Delete Resource
          </button>
        </div>
      </div>

      <Modal
        closeButton
        aria-labelledby="modal-title"
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        size="md"
        placement={"bottom-center"}
        backdrop="blur"
        classNames={{
          body: "py-6",
          base: "border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]",
          header: "border-b-[1px] border-[#292f46]",
          footer: "border-t-[1px] border-[#292f46]",
          closeButton: "hover:bg-white/5 active:bg-white/10",
        }}
      >
        <ModalContent>
          <ModalHeader className="text-white golden-font font-light">Confirm Deletion</ModalHeader>
          <ModalBody>
            <p className="text-[#ffffff83] font-light">
              Are you sure you want to delete the resource titled <strong>{resource.title}</strong>?
            </p>
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              variant="light"
              onClick={() => {
                handleDelete(resource.id);
              }}
            >
              Delete
            </Button>
            <Button onClick={() => setShowDeleteModal(false)}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ResourceCard;
