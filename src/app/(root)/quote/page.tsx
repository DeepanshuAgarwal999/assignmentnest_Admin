"use client"
import CreateQuote from '@/components/forms/CreateQuote'
import Loader from '@/components/shared/Loader'
import { AssignmentQuote, QuoteTable } from '@/components/table/QuoteTable'
import { axiosInstance } from '@/lib/axios.instance'
import React, { useEffect, useState } from 'react'

const Quote = ({ searchParams }: SearchParamProps) => {

    const [Quote, setQuote] = useState<AssignmentQuote[] | []>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const quote = searchParams?.create_quote as string
    const orderId = searchParams?.order_id as string
    
    useEffect(() => {
        (async () => {
            try {
                const { data } = await axiosInstance.get('/admin/get-unquoted');
                if (data) {
                    setQuote(data.data)
                }
            } catch (error) {
                console.log(error)
            }
            finally {
                setIsLoading(false)
            }
        })()
    }, [quote, orderId])

    if (isLoading) {
        return <Loader />
    }

    return (
        <>
            <QuoteTable data={Quote} />
            {quote === 'true' && orderId && <CreateQuote orderId={orderId} />}
        </>
    )
}

export default Quote