import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from "next/image"
import { AspectRatio } from '@radix-ui/react-aspect-ratio'

function Header() {
  return (
    <div>
      <h1 className="text-3xl font-bold mt-4">Good Morning, Joe!</h1>
      <div className="flex flex-row justify-between mt-3 gap-2">
        <div className="flex flex-1 justify-between mt-6 bg-green-500">

          <Card className="w-[15rem] rounded-none">
            <CardTitle>Introducing Tags</CardTitle>
            <CardDescription className="mt-2">Easily categorize and find your notes by adding tags. Keep your workspace clutter-free an</CardDescription>
          </Card>
        </div>
        <div className="flex flex-row justify-between mt-6 flex-1 bg-yellow-500">

          <Card className="w-[15rem] rounded-none">
            <CardTitle>Share notes immediately</CardTitle>
            <CardDescription className="mt-2">Effortlessly share your notes with others via email or link. Enhance collaboration with quick sharing options.</CardDescription>

          </Card>
        </div>
        <div className="flex flex-row justify-between mt-6 flex-1 bg-purple-700">

          <Card className="w-[15rem] rounded-none">
            <CardTitle>Access Anywhere</CardTitle>
            <CardDescription className="mt-2">Sync your notes across all devices. Stay productive whether you're on your phone,tablet or computer.</CardDescription>


          </Card>
        </div>
      </div>

    </div>
  )
}

export default Header
