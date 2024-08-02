import { createClient } from "@/utils/supabase/client";
import { useState, useEffect } from "react";
import { message } from "antd";
import { Button } from "@nextui-org/button";
import { CalendarOutlined } from "@ant-design/icons";

// NOTIFICATION TAB TO HANDLE ALL NOTIFICATION REQUEST
export const Notification = ({ userEmail }: { userEmail: string }) => {
  // All States
  const [notifications, setNotifications] = useState<any[] | null>([]);

  // Get all Notifications from Database
  const supabase = createClient();

  // Loader Setting Notification as read
  const [isLoading, setIsLoading] = useState(false);

  const fetchNotifications = async (userEmailAdd: string) => {
    try {
      const { data: notificationResponsePayload, error: errorFetchingNotifications } =
        await supabase.from("Notification").select("*").eq("notificationTo", userEmailAdd);

      console.log(notificationResponsePayload);
      setNotifications(notificationResponsePayload);
      if (errorFetchingNotifications) {
        // Show Notifications Alert or Log error
        message.error("There was an error fetching your activities!!!");
        return;
      }
    } catch (err) {
      console.log(err);
      message.error("An Error had occurred, please refresh!!");
    }
  };

  useEffect(() => {
    fetchNotifications(userEmail);
  }, [notifications]);

  // Real Time Updates to listen for a new Notifications
  const subscribeToChanges = () => {
    const channels = supabase
      .channel("custom-all-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "Notification" },
        (payload) => {
          console.log(payload);
          fetchNotifications(userEmail);
        }
      )
      .subscribe();

    return channels;
  };

  // useEffect to handle Side Actions for Listening to Database from Supabase
  useEffect(() => {
    subscribeToChanges();

    return () => {
      subscribeToChanges().unsubscribe();
    };
  }, [subscribeToChanges]);

  const calculateTimeAgo = (date: any) => {
    const now = new Date();
    const diffMs = (now as any) - date;
    const diffMinutes = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMinutes < 10) {
      return `${diffMinutes} mins ago`;
    } else if (diffDays >= 10) {
      return `${diffDays} days ago`;
    } else if (diffDays < 10 && diffMinutes >= 10) {
      return `${diffHours} hours ago`;
    }
  };

  // Function to Handle Response to Email
  const handleResponseNotification = async (id: string) => {
    setIsLoading(true);
    try {
      const { data: updateResponded, error: failedToUpdate } = await supabase
        .from("Notification")
        .update({ respondedTo: true })
        .eq("id", id);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log("An error occured");
    }
  };

  const handleDeleteNotification = async (id: string) => {
    try {
      const { data, error } = await supabase.from("Notification").delete().eq("id", id);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      {/* Render Notifications on Screen */}
      {notifications?.map((notification) => (
        <div className="p-[.8rem] bg-[#76abae17] rounded-[10px] mt-[1rem] ">
          <h1 className={`text-[22px] my-[.2rem] ${notification?.respondedTo && "font-bold"}`}>
            {notification?.notificationHeader}
          </h1>
          <p className="text-[#ffffff8e]">
            {notification?.notificationMessage} by {notification?.triggeredEmail}
          </p>
          <p className="flex gap-[.3rem] text-[13px] items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>

            {calculateTimeAgo(new Date(notification?.created_at))}
          </p>
          <div className="flex mt-[.9rem] gap-[.9rem] items-center ">
            <Button
              variant="faded"
              isLoading={isLoading}
              onClick={() => {
                handleResponseNotification(notification?.id);
              }}
              disabled={notification?.respondedTo}
            >
              {notification?.respondedTo ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              ) : (
                "Mark as Read"
              )}
            </Button>
            <Button
              variant="light"
              color="danger"
              onClick={() => {
                handleDeleteNotification(notification?.id);
              }}
            >
              Delete
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};
