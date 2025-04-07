// src/components/FriendRequestButtons.tsx
import { Button } from "@/components/ui/button.tsx";
import { useState } from "react";

type Props = {
  userId: string;
  isFollowing: boolean;
  isFriend: boolean;
  hasRequested: boolean;
};

export function FriendRequestButtons({
  userId,
  isFollowing,
  isFriend,
  hasRequested,
}: Props) {
  const [loading, setLoading] = useState(false);

  const handleAction = async (action: string) => {
    setLoading(true);
    await fetch(`/api/social/${action}/${userId}`, {
      method: "POST",
      credentials: "include", // or add token manually
    });
    setLoading(false);
    window.location.reload();
  };

  return (
    <div className="space-x-2">
      {!isFollowing ? (
        <Button onClick={() => handleAction("follow")} disabled={loading}>
          Follow
        </Button>
      ) : (
        <Button onClick={() => handleAction("unfollow")} disabled={loading} variant="secondary">
          Unfollow
        </Button>
      )}

      {!isFriend && !hasRequested && (
        <Button onClick={() => handleAction("friend-request")} disabled={loading}>
          Add Friend
        </Button>
      )}
    </div>
  );
}
