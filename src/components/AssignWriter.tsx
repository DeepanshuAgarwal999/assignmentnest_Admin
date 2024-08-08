"use client"
import React, { useEffect, useState } from 'react'

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { axiosInstance } from '@/lib/axios.instance'
import { useToast } from './ui/use-toast'
import Loader from './shared/Loader'

type WriterType = {
    writerId: string,
    writerName: string
}

const AssignWriter = () => {
    const [writers, setWriters] = useState<WriterType[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const { toast } = useToast()
    const [writer, setWriter] = useState<string | null>(null)
    useEffect(() => {
        (async () => {
            try {
                const { data } = await axiosInstance.get('/admin/get-writers')
                if (data) {
                    console.log(data)
                    if (data.data.length !== 0)
                        setWriters(data.data)
                }
                else {
                    toast({
                        title: "No writer found"
                    })
                }

            } catch (error) {
                console.log("error")
                toast({
                    title: "Unable to get writers"
                })
            }
            finally {
                setIsLoading(false)
            }
        })()
    }, [])

    return (
        <>{
            isLoading ? <Loader className='absolute top-28' /> :
                <div>
                    <article className="p-6 bg-gray-50 shadow-sm rounded-xl mt-6">
                        <Select onValueChange={(value: string) => setWriter(value)}>
                            <SelectTrigger className="w-full" >
                                <SelectValue placeholder="Select a Writer" />
                            </SelectTrigger>
                            <SelectContent >
                                <SelectGroup>
                                    <SelectLabel>Choose Writer</SelectLabel>
                                    {writers && writers.length !== 0 && writers.map((writer) => (
                                        <SelectItem key={writer.writerId} value={writer.writerId}>
                                            {writer.writerName}
                                        </SelectItem>
                                    ))}

                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </article>
                </div>


        }</>
    )
}

export default AssignWriter