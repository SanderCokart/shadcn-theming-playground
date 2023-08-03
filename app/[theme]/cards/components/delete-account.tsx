import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function DemoDeleteAccount() {
  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Delete an account</CardTitle>
        <CardDescription>
          Permanently delete your account and all of its data.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Button className="w-full" variant="destructive">
          Delete account
        </Button>
      </CardContent>
      <CardFooter>
        <span className="text-muted-foreground">
          Please note that this action is irreversible.
        </span>
      </CardFooter>
    </Card>
  )
}
