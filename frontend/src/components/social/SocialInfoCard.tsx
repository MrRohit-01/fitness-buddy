// src/components/SocialInfoCard.tsx
import { Card, CardContent } from "../ui/card";

type UserLite = { _id: string; name: string; email: string };
type Props = {
  title: string;
  users: UserLite[];
};

export function SocialInfoCard({ title, users }: Props) {
  return (
    <Card className="mb-4">
      <CardContent>
        <h2 className="text-lg font-semibold mb-2">{title}</h2>
        {users.length === 0 ? (
          <p className="text-muted-foreground">No users</p>
        ) : (
          <ul className="space-y-1">
            {users.map((u) => (
              <li key={u._id}>
                {u.name} - {u.email}
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
