import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import { userAPI, SignUpData } from '@/apis/userAPI'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SignIn() {
    const [userNameVal, setUserName] = useState<string>('')
    const [passwordVal, setPassword] = useState<string>('')

    const navigator = useNavigate();

    useEffect(() => {
        if(localStorage.getItem('token')) {
            navigator('/chat')
        }
    }, [])

    const handleSignUp = (e: any) => {
        e.preventDefault()

        const data: SignUpData = {
            username: userNameVal,
            password: passwordVal
        }

        userAPI.signIn(data).then((data) => {
            localStorage.setItem('token', data.access_token)    
            window.location.href = '/chat'
        }).catch((err) => {
            toast.error(err.response.data.detail)
        })
    }

    return (
        <>
            <div className="min-w-screen min-h-screen flex max-lg:flex-col-reverse">
                <div className="w-1/2 lg:min-h-full max-lg:w-full max-lg:min-h-[50vh] lg:pt-36 lg:pl-24 bg-radial-gradient-home before:content-[''] before:w-full before:h-full before:bg-[#FFFFFF40] before:absolute before:top-0 before:left-0 before:backdrop-blur-[128px]">
                    <div className='flex flex-col text-white z-2 relative gap-4 justify-center items-center font-black w-fit'>
                    {
                        //<h1 className='text-6xl'>Learn & Discover</h1>
                        //<h1 className='text-xl pl-40'>about</h1>
                    }
                    </div>
                    <div className='mt-16 flex font-bold relative z-20 text-white flex-col gap-8'>
                       <h1 className='text-2xl'></h1> 
                       <p className='max-w-[70ch]'></p>
                    </div>
                </div>

                <div className='lg:w-1/2 max-lg:pb-8 bg-[#1E1E1E] overflow-x-hidden relative z-20 flex flex-col justify-start items-center'>

                    <div className='mt-[25%] flex flex-col justify-center items-center text-white gap-14'>
                        <h1 className='text-6xl'>Log in</h1> 

                        <form onSubmit={handleSignUp} className='flex flex-col gap-5 w-[380px]'>
                            <div className="relative after:content-[''] after:w-full after:absolute after:bg-[#333] after:h-[1px] after:bottom-0 after:left-0">
                                <Input className="p-6 text-xl border-none" onChange={(e) => setUserName(e.target.value)} placeholder='Username' />
                            </div>

                            <div className="relative after:content-[''] after:w-full after:absolute after:bg-[#333] after:h-[1px] after:bottom-0 after:left-0">
                                <Input className="p-6 text-xl border-none" type="password" onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
                            </div>

                            <Button type="submit" className='mt-4 p-6 rounded-2xl text-xl bg-gradient-to-r from-[#6952F7] to-[#C11DA4]'>Log In</Button>          
                        </form>

                        <div className='flex justify-center items-center gap-14'>
                            <p className='text-[#888]'>Don't have an account?</p>
                            <Button onClick={() => navigator('/signup')} className='p-6 bg-[#333]'>Sign Up</Button>
                        </div>
                    </div>
                </div>
            </div>

            <ToastContainer />
        </>
    )
}
