"use client"
import Link from "next/link"

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
import { useEffect, useState } from "react"
import axios from "axios";
import { useRouter, redirect } from "next/navigation"
import Cookies from "js-cookie"

export default function LoginForm() {
  const [formData, setFormData] = useState<object>({ email: '', password: '' });

  const router = useRouter();
  useEffect(() => {
    // Fetch the JWT token from the cookie
    const token = Cookies.get('email');
    console.log("this is token on client side", token)
    if (token) {
      router.push("/home")
    }
  }, []);



  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {

    // isAuth()
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/login", formData, {
        withCredentials: true
      });
      console.log("Finally responsing", response.data);// Access the data property from the response
      if (response.data.msg === "successful") {
        // localStorage.setItem("isLoggedin", "yes")
        router.push("/home")
      }
    } catch (error) {
      console.error("Error in logging:", error);
    }
  }



  return (
    <form onSubmit={handleSubmit} className=" mx-w-200rem">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-3xl text-center">Welcome to <span className="text-purple-800">Workflo</span>!</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Input onChange={handleChange} name="email"
                id="email"
                type="email"
                placeholder="Your email"
                required
              />
            </div>
            <div className="grid gap-2">
              {/* <div className="flex items-center">
            </div> */}
              <Input onChange={handleChange} name="password" id="password" type="password" placeholder="password" required />
            </div>
            <Button type="submit" className="w-full bg-gradient-to-b from-purple-300 to-purple-700">
              Login
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account? Create a {" "}
            <Link href="/signup" className="text-blue-600">
              new account
            </Link>
          </div>
        </CardContent>
      </Card>

    </form>

  )
}
