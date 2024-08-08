"use client"

import React from 'react'
import Logo from '/assets/images/logo.jpg'
import { navigation } from '@/constants/navigation'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import logoImage from '../../../public/images/logo.jpg'

export function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

const LeftSidebar = () => {
    const pathname = usePathname();
    return (
        <div>
            {/* <div className='lg:hidden'>
            <MobileSideNav />
            </div> */}
            {/* Static sidebar for desktop */}
            <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-56 lg:flex-col">
                {/* Sidebar component, swap this element with another sidebar if you like */}
                <div className="flex grow flex-col gap-y-8 overflow-y-auto border-r border-gray-200 bg-white px-6">
                    <div className="flex h-14 shrink-0 items-center pt-4 ">
                        <Link href='/'><Image src={logoImage} alt="assignmentNest" width={120} height={120} /></Link>
                    </div>
                    <nav className="flex flex-1 flex-col">
                        <ul role="list" className="flex flex-1 flex-col gap-y-7">
                            <li>
                                <ul role="list" className="-mx-2 space-y-1">
                                    {navigation.map((item) => {
                                        const isActive = pathname === item.href;
                                        return (
                                            <li key={item.name}>
                                                <Link
                                                    href={item.href}
                                                    className={
                                                        classNames(
                                                            isActive ? 'bg-gray-50 text-purple-500' : 'text-gray-700 hover:text-purple-500 hover:bg-gray-50',
                                                            'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                                        )
                                                    }
                                                >

                                                    <>
                                                        <item.icon
                                                            className={classNames(
                                                                isActive ? 'text-purple-500' : 'text-gray-400 group-hover:text-purple-500',
                                                                'h-6 w-6 shrink-0'
                                                            )}
                                                            aria-hidden="true"
                                                        />
                                                        {item.name}
                                                    </>

                                                </Link>
                                            </li>
                                        )
                                    }

                                    )}
                                </ul>
                            </li>


                        </ul>
                    </nav>
                </div>
            </div>


        </div>
    )
}

export default LeftSidebar