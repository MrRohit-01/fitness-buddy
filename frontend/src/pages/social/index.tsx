// src/pages/social/index.tsx
import { useEffect, useState } from "react";
import { SocialInfoCard } from "@/components/social/SocialInfoCard";

type UserLite = { _id: string; name: string; email: string };

export default function SocialPage() {
  const [data, setData] = useState<{
    followers: UserLite[];
    following: UserLite[];
    friends: UserLite[];
    friendRequests: UserLite[];
  } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/social", {
        credentials: "include",
      });
      const json = await res.json();
      setData(json);
    };
    fetchData();
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">My Social Info</h1>
      <SocialInfoCard title="Followers" users={data.followers} />
      <SocialInfoCard title="Following" users={data.following} />
      <SocialInfoCard title="Friends" users={data.friends} />
      <SocialInfoCard title="Friend Requests" users={data.friendRequests} />
    </div>
  );
}
