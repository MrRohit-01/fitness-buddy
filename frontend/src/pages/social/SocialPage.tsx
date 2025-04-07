import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const mockUsers = [
  {
    id: 1,
    name: "Aditi Sharma",
    username: "@aditi_fit",
    status: "You follow each other",
    action: "Unfollow",
  },
  {
    id: 2,
    name: "Raj Patel",
    username: "@raj_workout",
    status: "Sent you a friend request",
    action: "Accept",
  },
  {
    id: 3,
    name: "Sara Khan",
    username: "@sarakhan",
    status: "You follow them",
    action: "Unfollow",
  },
]

export default function SocialPage() {
  const [tab, setTab] = useState("friends")

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Tabs defaultValue="friends" value={tab} onValueChange={setTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="friends">Friends</TabsTrigger>
          <TabsTrigger value="followers">Followers</TabsTrigger>
          <TabsTrigger value="following">Following</TabsTrigger>
        </TabsList>

        <TabsContent value="friends">
          <div className="grid gap-4 mt-4">
            {mockUsers.map((user) => (
              <Card key={user.id}>
                <CardHeader>
                  <CardTitle>{user.name} <span className="text-sm text-muted-foreground">{user.username}</span></CardTitle>
                </CardHeader>
                <CardContent className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{user.status}</span>
                  <Button variant="outline">{user.action}</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="followers">
          <div className="mt-4 text-gray-500">You have 5 followers.</div>
        </TabsContent>

        <TabsContent value="following">
          <div className="mt-4 text-gray-500">You follow 8 users.</div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
