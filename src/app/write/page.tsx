import { auth } from "@/auth";
import WritePage from "./components/WritePage";
import { redirect } from "next/navigation";

const Write = async () => {
  const session = await auth();

  if (!session?.user.id) return redirect("/login");

  return <WritePage />;
};

export default Write;
