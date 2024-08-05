"use client"
import Link from "next/link";
import axios from "axios"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Router, { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import Cookies from "js-cookie"

export default function signup() {



  const router = useRouter()
  const [formData, setFormData] = useState<object>({ fullName: '', email: '', password: '' });
  useEffect(() => {

    const token = Cookies.get('email');
    console.log("this is token on client side", token)
    if (token) {
      router.push("/home")
    }
  }, []);

  // useAppSelector((state: RootState) => console.log("app selector task", state.task))

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/signup", formData, {
        withCredentials: true
      });
      console.log("response", response.data);// Access the data property from the response

      router.push("/home")
    } catch (error) {
      console.error("Error submitting form:", error);
    }

  }
  return (
    <main className="bg-gradient-to-b from-gray-300 to-purple-400">
      <form onSubmit={handleSubmit} className="flex min-h-screen flex-col items-center justify-center">
        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <CardTitle className="text-3xl text-center">Welcome to <span className="text-purple-800">Workflo</span>!</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Input onChange={handleChange}
                  name="fullName"
                  id="fullName"
                  type="text"
                  placeholder="Full name"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Input onChange={handleChange}
                  name="email"
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Input onChange={handleChange} name="password" id="password" placeholder="password" type="password" />
              </div>
              <Button type="submit" className="w-full bg-gradient-to-b from-purple-300 to-purple-700">
                Sign up
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link href="/" className="text-blue-600">
                Log in
              </Link>
            </div>
          </CardContent>
        </Card>

      </form>
    </main>


  )
}
