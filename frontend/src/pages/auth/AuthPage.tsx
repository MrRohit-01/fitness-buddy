import { useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Login from "./Login"
import Register from "./Register"

export default function AuthPage() {
    useEffect(() => {
        console.log("AuthPage mounted");
    }, []);

    return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Welcome to Fitness Buddy</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <Login />
            </TabsContent>

            <TabsContent value="register">
              <Register />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
