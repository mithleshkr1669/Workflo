"use client"
import LoginForm from "@/components/LoginForm";
import { getAllTask } from "@/lib/features/allTask/Task";
import { useAppDispatch } from "@/lib/hooks";
import axios from "axios";
import Image from "next/image";
import { useEffect } from "react";

export default function Home() {
  console.log("this is your main page")

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-gray-300 to-purple-400">
      <LoginForm></LoginForm>
    </main>
  );
}
