import { Button } from "@/components/ui/button";
// import laptopMockup from "/laptop-example.png"
// import phoneMockup from "/phone-example.png"
import computerMockup from "/computer-mockup.png"
import { useNavigate } from 'react-router-dom'
import { useEffect } from "react";

export default function Home() {
    const navigator = useNavigate();

    useEffect(() => {
        if(localStorage.getItem('token')) {
            navigator('/chat')
        }
    }, [])

    return (
        <>
            <div className="flex items-center p-3 m-2 drop-shadow-2xl bg-gray-300 rounded-2xl relative">
                <h1 className="text-xl">ChatBot</h1> 

                <div className="flex absolute right-3 gap-3">
                    <Button onClick={() => {navigator("/signin")}} variant="outline" className="bg-gray-300 font-bold">Log in</Button>
                    <Button onClick={() => {navigator("/signup")}} className="font-bold">Sign up</Button>
                </div>
            </div>

            <div className="flex flex-col justify-center items-center min-h-[35vh]">
                <div className="max-w-1/2 flex flex-col gap-6 justify-center items-center">
                    <h1 className="font-bold text-4xl">VSCPI ChatBot</h1> 
                    <p className="max-w-[90ch] text-lg text-gray-600 text-center px-6">Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores, voluptas eligendi quam impedit expedita temporibus, itaque eaque pariatur, optio obcaecati veritatis et porro. Inventore, asperiores.</p>
                    <Button onClick={() => {navigator("/signup")}} className="px-8 py-6 font-bold text-lg">Get Started</Button>
                </div>
            </div>

            <div className="flex mt-[40px] items-end gap-10 justify-center max-lg:flex-col-reverse max-lg:items-center mb-[40px]">
               {/* <img width="250px" src={phoneMockup} alt="" />  */}
               {/* <img width="1000px" src={laptopMockup} alt="" />  */}
               <img width="1000px" src={computerMockup} alt="" /> 
            </div>
        </>
    );
}
