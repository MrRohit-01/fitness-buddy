// src/components/social/FollowButton.tsx
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface FollowButtonProps {
  isFollowing: boolean
  onFollow: () => Promise<void>
  onUnfollow: () => Promise<void>
}

export function FollowButton({ isFollowing, onFollow, onUnfollow }: FollowButtonProps) {
  const [loading, setLoading] = useState(false)

  const handleClick = async () => {
    setLoading(true)
    if (isFollowing) {
      await onUnfollow()
    } else {
      await onFollow()
    }
    setLoading(false)
  }

  return (
    <Button variant={isFollowing ? "destructive" : "default"} onClick={handleClick} disabled={loading}>
      {loading ? "..." : isFollowing ? "Unfollow" : "Follow"}
    </Button>
  )
}
