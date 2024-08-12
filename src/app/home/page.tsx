"use client"
import Header from "@/components/Header"
import Sidebar from "@/components/Sidebar"
import Menubars from "@/components/Menubar"
import Wrapper from "@/components/TaskBoard/Wrapper"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Cookies from "js-cookie"
import axios from "axios"
import { getAllTask } from "@/lib/features/allTask/Task"
import { useAppDispatch } from "@/lib/hooks"


function Page() {



  const router = useRouter();
  // const pathname = usePathname(
  const dispatch = useAppDispatch()



  useEffect(() => {

    async function toDo() {
      try {
        const response = await axios.get("http://localhost:5000/getAllTask", {
          withCredentials: true
        });
        const tasks: any = response.data; // Store the data array
        console.log("all task in home page", response.data)
        dispatch(getAllTask(tasks));


      } catch (error) {
        console.error("Error in fetching data:", error);
      }
    }

    toDo()

  }, [])
  useEffect(() => {

    const token = Cookies.get('email');
    console.log("this is token on client side", token)
    if (!token) {
      router.push("/")
    }
  }, []);


  return (
    <div className="bg-gray-200 flex">
      <div className=" w-[20rem]">
        <Sidebar></Sidebar>

      </div>
      <div className="flex-grow mx-6 bg-gray-200 min-h-screen">
        <Header></Header>
        <Menubars></Menubars>
        <Wrapper></Wrapper>

      </div>




    </div>
  )
}
export default Page
