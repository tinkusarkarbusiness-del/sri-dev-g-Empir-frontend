import Link from "next/link";
import { UserAuthForm } from "@/components/user-auth-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function LoginPage() {
  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="font-headline text-2xl text-primary">Welcome Back</CardTitle>
        <CardDescription>Enter your credentials to access your empire.</CardDescription>
      </CardHeader>
      <CardContent>
        <UserAuthForm formType="login" />
        <p className="mt-4 px-8 text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link
            href="/signup"
            className="underline underline-offset-4 hover:text-primary"
          >
            Sign Up
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
