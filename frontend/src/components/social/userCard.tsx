import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface UserCardProps {
  name: string
  bio: string
}

export default function UserCard({ name, bio }: UserCardProps) {
  const [isFollowing, setIsFollowing] = useState(false)

  return (
    <Card>
      <CardContent className="p-4 flex flex-col gap-2">
        <div>
          <h2 className="text-xl font-semibold">{name}</h2>
          <p className="text-gray-600">{bio}</p>
        </div>
        <Button
          variant={isFollowing ? "outline" : "default"}
          onClick={() => setIsFollowing((prev) => !prev)}
        >
          {isFollowing ? "Unfollow" : "Follow"}
        </Button>
      </CardContent>
    </Card>
  )
}
