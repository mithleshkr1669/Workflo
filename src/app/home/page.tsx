"use client"
import Header from "@/components/Header"
import Sidebar from "@/components/Sidebar"
import Menubars from "@/components/Menubar"
import Wrapper from "@/components/TaskBoard/Wrapper"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import Cookies from "js-cookie"


function Page() {

  const router = useRouter();
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
