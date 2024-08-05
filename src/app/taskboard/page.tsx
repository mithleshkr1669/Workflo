"use client"
import { Input } from "@/components/ui/input";
import Image from "next/image";
import * as React from "react"
import dynamic from 'next/dynamic';
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
// import { Calendar } from "@/components/ui/calendar"
// const Calendar = dynamic(():Promise<any> => import('@/components/ui/calendar'), { ssr: false });
// const Calendar = dynamic(() => import('react-calendar'), { ssr: false });
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getAllTask } from "@/lib/features/allTask/Task";
import { RootState } from "@/lib/store";
import { useState, useEffect } from "react";
import { Suspense } from "react";




const Taskboard: React.FC = () => {
  // const [date, setDate] = React.useState<Date>()
  const searchParams = useSearchParams();
  const Router = useRouter()

  let data
  useEffect(() => {
    data = searchParams.get('data');

  }, [searchParams]);

  const dispatch = useAppDispatch()

  const [taskData, setTaskData] = React.useState<Object>({ title: '', status: { data }, priority: '', deadline: '', description: '', user_id: '' });
  useAppSelector((state: RootState) => console.log("app selector task", state.task))


  const handleChange = (e: any) => {
    setTaskData({
      ...taskData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSelectChange = (value: String) => {
    setTaskData((prevTaskData) => ({
      ...prevTaskData,
      priority: value
    }));
  };
  const handleDateChange = (e: any) => {
    setTaskData({
      ...taskData,
      deadline: e.target.value,
    });
  };
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {

    // isAuth()
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/taskData", taskData, {
        withCredentials: true
      });
      const tasks: any = response.data; // Store the data array
      console.log("all task", response.data)
      dispatch(getAllTask(tasks[tasks.length - 1]));

      Router.push("/home")

    } catch (error) {
      console.error("Error in logging:", error);
    }
  }
  return (

    <div className="flex min-h-screen flex-col mt-2 mx-7">
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between items-center">
          <Link href='./home'><Image className="" width={25} height={25} src="/cancel.png" alt="" /></Link>
          <div className="flex gap-4 ">
            <div className=" flex gap-4 rounded bg-gray-200 px-4 py-2">
              <span>Share</span>
              <Image src="/share.png" alt="" width={25} height={25} />
            </div>

            <div className=" flex gap-4 px-4 py-2 bg-gray-200">
              <span>Favourite</span>
              <Image src="/star.png" alt="" width={25} height={25} />

            </div>

          </div>
        </div>
        <Input onChange={handleChange} name="title" className="border-none p-8 text-[4rem] text-left font-medium mt-10" placeholder="Title" />
        <div className="flex justify-between itmes-center w-[50%] mt-11">
          <div className="flex gap-8 mb-11">
            <Image alt="" width={25} height={25} src="/sunny.png" />
            <div>Status</div>
          </div>
          <div className=" w-[75%]">

            <Suspense fallback={<div>Loading...</div>}>
              <p>{data}</p>

            </Suspense>

          </div>

        </div>
        <div className="flex justify-between itmes-center w-[50%]">
          <div className="flex gap-8 mb-11">
            <Image alt="" width={25} height={25} src="/diamond-exclamation.png" />
            <div>Priority</div>
          </div>
          <div className=" w-[75%] mt-[-.5rem]">

            {/* <Input name="priority" placeholder="Not Selected"/>*/}
            <Select onValueChange={handleSelectChange}>
              <SelectTrigger className="w-[100%] border-none">
                <SelectValue placeholder="Not selected" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
              </SelectContent>
            </Select>

          </div>

        </div>
        <div className="flex justify-between itmes-center w-[50%]">
          <div className="flex gap-8 mb-11">
            <Image alt="" width={25} height={25} src="/calendar.png" />
            <div>Deadline</div>
          </div>

          <div className=" w-[75%] mt-[-.5rem]">

            <Input
              type="date"
              name="deadline"
              onChange={handleDateChange}

            // Ensure this binds to the state correctly
            />



          </div>



        </div>
        <div className="flex justify-between itmes-center w-[50%]">
          <div className="flex gap-8 mb-11">
            <Image alt="" width={25} height={25} src="/pen.png" />
            <div>Description</div>
          </div>
          <div className=" w-[75%] mt-[-.5rem]">

            <Input onChange={handleChange} name="description" className="border-none" placeholder="Not Selected" />
          </div>

        </div>
        <Button type="submit" className="bg-gradient-to-b from-blue-800 to-blue-950 py-7 px-[4rem] rounded-lg text-2xl ml-[10%] w-[5rem]">Add</Button>
      </form>
    </div>



  )
}

// export default dynamic (() => Promise.resolve(Taskboard), {ssr: false})
export default Taskboard

