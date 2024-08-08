"use client"
import CreateQuote from '@/components/forms/CreateQuote'
import Loader from '@/components/shared/Loader'
import { AssignmentQuote, QuoteTable } from '@/components/table/QuoteTable'
import { axiosInstance } from '@/lib/axios.instance'
import { useSearchParams } from 'next/navigation'
import React, { Suspense, useEffect, useState } from 'react'

const Quote = () => {
    const [Quote, setQuote] = useState<AssignmentQuote[] | []>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const params = useSearchParams();
    const quote = params.get('create_quote')
    const orderId = params.get('order_id')

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
        <Suspense fallback={<Loader />}>
            <QuoteTable data={Quote} />
            {quote === 'true' && orderId && <CreateQuote orderId={orderId} />}
        </Suspense>
    )
}

export default Quote