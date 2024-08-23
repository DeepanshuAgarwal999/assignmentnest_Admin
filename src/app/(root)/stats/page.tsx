"use client"
import Loader from '@/components/shared/Loader'
import { Card, CardDescription, CardTitle } from '@/components/ui/card'
import { axiosInstance } from '@/lib/axios.instance'
import React, { useEffect, useState } from 'react'
import shoppingBag from '../../../../public/icons/orders.svg'
import saleIcon from '../../../../public/icons/sales.svg'
import rupeeIcon from '../../../../public/images/rupee.png'
import Image from 'next/image'
import moneyIcon from '../../../../public/icons/money.svg'
import { cn } from '@/lib/utils'

type StatsType = {
    total_order: number;
    total_payments: number;
    total_amount: number;
    amount_received: number | null;
    pending_payments: number;
    pending_amount: number;
    complete_payments: number;
    complete_orders: number;
}

const StatsCard = ({ img_url, value, title, bgColor }: { img_url: string, value: number | null, title: string, bgColor: string }) => {
    return (
        <Card className={cn(`p-4 rounded-xl border-none space-y-2 min-w-fit w-[80%]`)} style={{ backgroundColor: bgColor }}>
            <Image src={img_url} alt="orders" height={24} width={24} className='size-8' />
            <p className='font-bold text-[#151D48] text-4xl'>{value ?? "0"}</p>
            <h1 className='text-lg font-medium text-[#425166]'>{title}</h1>
        </Card >
    )
}

const Stats = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [stats, setStats] = useState<StatsType | null>(null)

    useEffect(() => {
        (async () => {
            try {
                const { data } = await axiosInstance.get('/admin/get-dashboard')
                console.log(data.data)
                setStats(data.data)
            } catch (error) {
                console.log(error)
            }
            finally {
                setIsLoading(false)
            }
        })()
    }, [])

    if (isLoading) return <Loader />

    console.log(stats)
    if (!stats) {
        return <h1>No Stats Available to show</h1>
    }
    return (
        <section>
            <div className='shadow-md bg-white rounded-xl container p-5'>
                <h1 className='text-4xl font-bold '>Stats</h1>
                <p className='text-gray-400 font-medium mt-2'>
                    Sales Summary
                </p>
                <main className='grid grid-cols-2 md:grid-cols-4 place-items-center gap-10 mt-4'>
                    <StatsCard img_url={shoppingBag} title={"Total Orders"} value={stats.total_order} bgColor='#FFE2E5' />
                    <StatsCard img_url={shoppingBag} title={"Complete Orders"} value={stats.complete_orders} bgColor='#FFF4DE' />
                    <StatsCard img_url={saleIcon} title={"Total Payments "} value={stats.total_payments} bgColor='#DCFCE7' />
                    <StatsCard img_url={saleIcon} title={"Complete Payments"} value={stats.complete_payments} bgColor='#F3E8FF' />
                    <StatsCard img_url={saleIcon} title={"Pending Payments"} value={stats.pending_payments} bgColor='#e8f6a3' />
                    <Card className={cn(`p-4 rounded-xl border-none space-y-2 min-w-fit w-[80%] bg-[#aaedd5]`)}>
                        <div className='bg-[#3CD856] rounded-full flex items-center justify-center h-8 w-8 '>
                            <Image src={moneyIcon} alt="orders" height={24} width={24} className='size-6  fill-white' />
                        </div>
                        <p className='font-bold text-[#151D48] text-4xl'>${stats.total_amount ?? "0"}</p>
                        <h1 className='text-lg font-medium text-[#425166]'>Total Amount</h1>
                    </Card >
                    <Card className={cn(`p-4 rounded-xl border-none space-y-2 min-w-fit w-[80%] bg-[#c3eedd]`)}>
                        <div className='bg-[#3CD856] rounded-full flex items-center justify-center h-8 w-8 '>
                            <Image src={moneyIcon} alt="orders" height={24} width={24} className='size-6  fill-white' />
                        </div>
                        <p className='font-bold text-[#151D48] text-4xl'>${stats.amount_received ?? "0"}</p>
                        <h1 className='text-lg font-medium text-[#425166]'>Amount Received</h1>
                    </Card >
                    <Card className={cn(`p-4 rounded-xl border-none space-y-2 min-w-fit w-[80%] bg-[#b0e5aa]`)}>
                        <div className='bg-[#345639] rounded-full flex items-center justify-center h-8 w-8 '>
                            <Image src={moneyIcon} alt="orders" height={24} width={24} className='size-6  fill-white' />
                        </div>
                        <p className='font-bold text-[#151D48] text-4xl'>${stats.pending_amount ?? "0"}</p>
                        <h1 className='text-lg font-medium text-[#425166]'>Pending Amount</h1>
                    </Card >
                </main>
            </div>
        </section>
    )
}

export default Stats