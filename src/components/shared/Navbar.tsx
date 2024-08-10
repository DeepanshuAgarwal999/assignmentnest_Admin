"use client"

import React, { useState } from 'react'

import { ArrowLeftEndOnRectangleIcon, Bars3Icon, BellAlertIcon, ChevronDownIcon, KeyIcon } from '@heroicons/react/24/outline'
import MobileSideNav from './MobileSideNav'
import { useGetUserRole } from '@/app/hooks/useGetUserRole'
import { generateColor, removeCookie } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Button } from '../ui/button'
import Link from 'next/link'
import {  UserRoundPlusIcon } from 'lucide-react'
const Navbar = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const { role, name } = useGetUserRole();
    const router = useRouter();

    function handleLogout() {
        removeCookie('token')
        router.push('/login')
    }

    return (
        <div className='flex items-center justify-between fixed xl:pl-60 h-14 w-full border-b border-gray-200 bg-white px-6 z-40'>
            {
                role && <>
                    <MobileSideNav sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                    <p className='ml-10 capitalize text-gray-900'>{name} ({role})</p>
                    <div className='flex items-center justify-between ml-auto'>
                        <div className='flex items-center gap-2 '>
                            <Link href={'/create-employee'} className='mr-2'><UserRoundPlusIcon className='size-5 text-gray-800' /></Link>
                            <Link href={'/notifications'} className='mr-4'><BellAlertIcon className='size-5' /></Link>
                            <div style={{ backgroundColor: generateColor(name.length) }} className='w-8 h-8 rounded-full flex justify-center items-center'>
                                <p className='text-white'>{name[0]}</p>
                            </div>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild className='outline-none'>
                                    <button><ChevronDownIcon className={'text-gray-800  size-4 shrink-0'} /></button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="p-2 py-3">
                                    <DropdownMenuItem onClick={() => handleLogout()} className='cursor-pointer flex items-center gap-2 active:text-red-500 ease-in-out duration-150'> <ArrowLeftEndOnRectangleIcon className='size-5' />Log Out</DropdownMenuItem>
                                    <Link href={'/change-password'}><DropdownMenuItem className='flex items-center gap-2 active:text-yellow-500 ease-in-out duration-150 cursor-pointer'> <KeyIcon className='size-5' />Change password</DropdownMenuItem></Link>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div></>
            }
        </div>
    )
}

export default Navbar