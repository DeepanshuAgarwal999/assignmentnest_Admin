'use client'
import React, { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { navigation } from '@/constants/navigation'
import Link from 'next/link'
import { classNames } from './LeftSideBar'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import logoImage from '../../../public/images/logo.jpg'

const MobileSideNav = ({ sidebarOpen, setSidebarOpen }: { sidebarOpen: boolean, setSidebarOpen: (val: boolean) => void }) => {

    const pathname = usePathname()
    
    return (
        <div className='lg:hidden'>
            <button type="button" className="-m-2.5 p-2.5 text-gray-700 " onClick={() => setSidebarOpen(true)}>
                <span className="sr-only">Open sidebar</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
            <Transition.Root show={sidebarOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-900/80" />
                    </Transition.Child>

                    <div className="fixed inset-0 flex">
                        <Transition.Child
                            as={Fragment}
                            enter="transition ease-in-out duration-300 transform"
                            enterFrom="-translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="-translate-x-full"
                        >
                            <Dialog.Panel className="relative mr-12 flex w-full max-w-64 flex-1">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-in-out duration-300"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="ease-in-out duration-300"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <div className="absolute left-full top-0 flex w-16 justify-center pt-3">
                                        <button type="button" className="-m-2.5 p-2.5" onClick={() => setSidebarOpen(false)}>
                                            <span className="sr-only">Close sidebar</span>
                                            <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                        </button>
                                    </div>
                                </Transition.Child>
                                {/* Sidebar component, swap this element with another sidebar if you like */}
                                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-2">
                                    <div className="flex h-14 shrink-0 items-center  pt-4">
                                        <Link href='/'><Image src={logoImage} alt="AssignmentNest" height={120} width={120} /></Link>
                                    </div>
                                    <nav className="flex flex-1 flex-col">
                                        <ul role="list" className="flex flex-1 flex-col gap-y-7">
                                            <li>
                                                <ul role="list" className="-mx-2 space-y-1">
                                                    {navigation.map((item) => {
                                                        const isActive = pathname === item.href
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
                                                    })}
                                                </ul>
                                            </li>
                                            {/* <li>
                                                <div className="text-xs font-semibold leading-6 text-gray-400">Your teams</div>
                                                <ul role="list" className="-mx-2 mt-2 space-y-1">
                                                    {teams.map((team) => (
                                                        <li key={team.name}>
                                                            <a
                                                                href={team.href}
                                                                className={classNames(
                                                                    team.current
                                                                        ? 'bg-gray-50 text-purple-500'
                                                                        : 'text-gray-700 hover:text-purple-500 hover:bg-gray-50',
                                                                    'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                                                )}
                                                            >
                                                                <span
                                                                    className={classNames(
                                                                        team.current
                                                                            ? 'text-purple-500 border-purple-500'
                                                                            : 'text-gray-400 border-gray-200 group-hover:border-purple-500 group-hover:text-purple-500',
                                                                        'flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white'
                                                                    )}
                                                                >
                                                                    {team.initial}
                                                                </span>
                                                                <span className="truncate">{team.name}</span>
                                                            </a>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </li> */}
                                        </ul>
                                    </nav>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>


        </div>

    )
}

export default MobileSideNav