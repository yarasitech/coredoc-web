import { redirect } from "next/navigation";

export default function AppPage() {
  // For now, redirect to login
  // Later this will check authentication and redirect accordingly
  redirect("/app/login");
}