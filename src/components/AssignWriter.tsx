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
import { SubmitButton } from './SubmitButton'

type WriterType = {
    writerId: string,
    writerName: string
}

const AssignWriter = ({ orderId, writerId }: { orderId: string, writerId: string | null }) => {
    const [writers, setWriters] = useState<WriterType[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [isAssigningWriter, setIsAssigningWriter] = useState<boolean>(false)
    const { toast } = useToast()
    const [writer, setWriter] = useState<string | null>(null)
    const [assignedWriterName, setAssignedWriterName] = useState<string | null>(null)

    useEffect(() => {
        (async () => {
            try {
                const { data } = await axiosInstance.get('/admin/get-writers')
                if (data) {
                    if (data.data.length !== 0)
                        setWriters(data.data)
                }
                else {
                    toast({
                        title: "No writer found"
                    })
                }
                if (writerId) {
                    const getWriter = await axiosInstance.get(`/admin/writer-info/${writerId}`)
                    if (getWriter.status == 200 && getWriter.data) {
                        setAssignedWriterName(getWriter.data.data.name)
                    }
                }
            } catch (error) {
                console.log("error", error)
                toast({
                    title: "Unable to get writers"
                })
            }
            finally {
                setIsLoading(false)
            }
        })()
    }, [])



    const handleAssignWriter = async () => {
        if (!writer) {
            toast({
                title: "Please select atLeast one writer"
            })
            return;
        }
        try {
            setIsAssigningWriter(true);
            const { data } = await axiosInstance.get(`/admin/${writer}/assign-writer/${orderId}`)
            if (data) {
                toast({
                    title: "writer notified successfully"
                })
            }

        } catch (error) {
            console.log(error)
            toast({
                title: "Unable to assign writer at this moment",
                description: "Please try again later"
            })
        }
        finally {
            setIsAssigningWriter(false)
        }
    }

    const handleRemoveAndAssignWriter = async () => {

        if (writerId === writer) {
            toast({
                title: "Please select different writer"
            })
            return;
        }
        const payload = {
            order_id: orderId,
            writer_remove: writerId,
            writer_assign: writer
        }
        try {
            setIsAssigningWriter(true)
            const { data, status } = await axiosInstance.post('/admin/remove-writer', payload)
            console.log(status)
            if (status == 200) {
                toast({
                    title: data?.message
                })
            }
        } catch (error) {
            console.log(error)
        }
        setIsAssigningWriter(false)
    }

    return (
        <>{
            isLoading ? <Loader className='absolute top-28' /> :
                <div>
                    <article className="p-6 bg-gray-50 shadow-sm rounded-xl mt-6">
                        <Select onValueChange={(value: string) => setWriter(value)} >
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
                        {writerId ? <SubmitButton isLoading={isAssigningWriter} className='mt-10 bg-gradient-to-r from-purple-500 via-purple-500 to-purple-400' onClick={handleRemoveAndAssignWriter}>Remove and Assign Writer</SubmitButton> :
                            <SubmitButton isLoading={isAssigningWriter} className='mt-10 bg-gradient-to-r from-purple-500 via-purple-500 to-purple-400' onClick={handleAssignWriter}>Assign Writer</SubmitButton>
                        }
                    </article>
                    {assignedWriterName && <p className='mt-4'>Currently assigned writer : <span className='font-medium'>{assignedWriterName}</span></p>}
                </div>
        }</>
    )
}

export default AssignWriter