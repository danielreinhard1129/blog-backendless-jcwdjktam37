import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { LoginForm } from "./components/login-form";

const Login = async () => {
  const session = await auth();

  if (!!session?.user.id) return redirect("/");

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
