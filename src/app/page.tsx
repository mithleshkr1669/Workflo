// "use client"
import LoginForm from "@/components/LoginForm";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-gray-300 to-purple-400">
      <LoginForm></LoginForm>
    </main>
  );
}
