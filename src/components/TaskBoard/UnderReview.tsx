"use client"
import { useAppSelector } from "@/lib/hooks";
import axios from "axios";
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react";
function UnderReview() {
  const [allTask, setAllTask] = useState<any>([])
  const taskFromStore = useAppSelector((state) => state.task);

  useEffect(() => {
    setAllTask(taskFromStore)
    console.log("this is state allTask", allTask)
  }, [taskFromStore])

  async function handleDelete(taskId: String) {

    allTask.filter((task: any) => task._id !== taskId)
    try {
      await axios.delete(`http://localhost:5000/${taskId}`, {
        withCredentials: true
      })
    } catch (error) {
      console.log("error in deleting", error)
    }
  }

  return (
    <div className="flex-1">
      <div className="flex justify-between items-center bg-green-300">
        <h3>Under Review</h3>
        <Image width={25} height={25} src="/menu.png" alt="" />

      </div>
      <div>
        <div>
          <div className="bg-white p-4 rounded-lg shadow-md">

            {allTask.filter((task: any) => task.status === "Under Review").map((task: any, index: any) => (
              <div className="bg-gray-100 p-4 rounded-lg mb-4" key={index}>
                <h3 className="font-semibold">{task.title}</h3>
                <p>{task.description}</p>
                <div className="flex justify-between">
                  <button className="bg-red-500 text-white p-1 rounded-sm">{task.priority}</button>
                  <Image onClick={() => handleDelete(task._id)} width={30} height={30} alt="delete" src='/delete.png' />
                </div>
              </div>
            ))}


            <div className="w-full bg-black text-center  text-white p-2 rounded-lg">
              <Link href={{
                pathname: './taskboard',
                query: { data: "Under Review" }
              }}>Add new</Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default UnderReview
