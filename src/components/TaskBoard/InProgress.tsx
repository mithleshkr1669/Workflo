"use client"
import Image from "next/image"
import { Card, CardDescription, CardTitle } from "../ui/card"
import Link from "next/link"
import { useAppSelector } from "@/lib/hooks";
function InProgress() {
  const allTask = useAppSelector((state) => state.task);

  return (
    <div className="flex-1">
      <div className="flex justify-between items-center bg-purple-400">
        <h3>In Progress</h3>
        <Image width={25} height={25} src="/menu.png" alt="" />

      </div>
      <div className="">
        <div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div>
              {allTask.filter((task) => task.status === "In Progress").map((task, index) => (
                <div className="bg-gray-100 p-4 rounded-lg mb-4" key={index}>
                  <h3 className="font-semibold">{task.title}</h3>
                  <p>{task.description}</p>
                  <button className="bg-red-500 text-white p-1 rounded-sm">{task.priority}</button>
                </div>
              ))}


            </div>
            <div className="w-full bg-black text-center  text-white p-2 rounded-lg" >
              <Link href={{
                pathname: './taskboard',
                query: { data: "In Progress" }
              }} className="w-full bg-black text-white p-2 rounded-lg">Add new</Link>
            </div>

          </div>
        </div>

      </div>

    </div>
  )
}

export default InProgress
