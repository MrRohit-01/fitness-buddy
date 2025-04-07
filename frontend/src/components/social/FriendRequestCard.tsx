import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface FriendRequestCardProps {
  name: string
  onAccept: () => void
  onDecline: () => void
}

export const FriendRequestCard = ({ name, onAccept, onDecline }: FriendRequestCardProps) => {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-end gap-2">
        <Button variant="outline" onClick={onDecline}>Decline</Button>
        <Button onClick={onAccept}>Accept</Button>
      </CardContent>
    </Card>
  )
}
