import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  mockFriends,
  mockIncomingRequests,
  mockSentRequests,
} from "@/data/mockSocialData"

export const SocialCore = () => {
  const [friends, setFriends] = useState(mockFriends)
  const [incoming, setIncoming] = useState(mockIncomingRequests)
  const [sent, setSent] = useState(mockSentRequests)

  const handleAccept = (id: string) => {
    const request = incoming.find((r) => r.id === id)
    if (request) {
      setFriends([...friends, request])
      setIncoming(incoming.filter((r) => r.id !== id))
    }
  }

  const handleDecline = (id: string) => {
    setIncoming(incoming.filter((r) => r.id !== id))
  }

  const handleUnfollow = (id: string) => {
    setFriends(friends.filter((r) => r.id !== id))
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      {/* Friends */}
      <Card>
        <CardHeader>
          <CardTitle>Friends</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {friends.map((f) => (
            <div key={f.id} className="flex justify-between items-center">
              <span>{f.name}</span>
              <Button variant="destructive" onClick={() => handleUnfollow(f.id)}>
                Unfollow
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Incoming Requests */}
      <Card>
        <CardHeader>
          <CardTitle>Incoming Requests</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {incoming.map((req) => (
            <div key={req.id} className="flex justify-between items-center">
              <span>{req.name}</span>
              <div className="flex gap-2">
                <Button onClick={() => handleAccept(req.id)}>Accept</Button>
                <Button variant="outline" onClick={() => handleDecline(req.id)}>Decline</Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Sent Requests */}
      <Card>
        <CardHeader>
          <CardTitle>Sent Requests</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {sent.map((req) => (
            <div key={req.id}>
              <span>{req.name} (Pending)</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
