'use client'
import React, { useEffect, useState } from 'react'
import { SubmitButton } from './SubmitButton'
import { notFound } from 'next/navigation'
import { axiosInstance } from '@/lib/axios.instance'
import { useToast } from './ui/use-toast'
import Loader from './shared/Loader'

declare type SolutionFileType = {
    name: string,
    type: 'UPLOAD' | "QUERY" | "REWORK",
    referer: string

}

const GiveSolution = ({ orderId }: { orderId: string }) => {
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [isViewBtnLoading, setIsViewBtnLoading] = useState<boolean>(false)
    const [isGiveBtnLoading, setIsGiveBtnLoading] = useState<boolean>(false)
    const [solution, setSolution] = useState<SolutionFileType | null>(null)
    const { toast } = useToast();

    useEffect(() => {
        (async () => {
            try {
                const { data } = await axiosInstance.get(`/admin/file-meta/${orderId}`)
                if (data) {
                    setSolution(data.data)
                }
            } catch (error) {
                console.log(error)
                toast({
                    title: "Unable to get Solution"
                })
            }
            finally {
                setIsLoading(false)
            }
        })()
    }, [orderId])
    const viewSolution = async () => {
        if (!solution) {
            return
        }
        try {
            setIsViewBtnLoading(true)
            const data = await axiosInstance.get(`/admin/download-solution/${orderId}`, {
                responseType: 'blob'
            })
            const downloadUrl = window.URL.createObjectURL(data.data);
            const a = document.createElement('a');
            a.href = downloadUrl;
            a.download = solution.name;
            document.body.appendChild(a);
            a.click();
            a.remove();

        } catch (error) {
            console.log(error)
        }
        finally {
            setIsViewBtnLoading(false)
        }
    }
    const sendSolution = async () => {
        if (!solution) {
            return
        }
        try {
            setIsGiveBtnLoading(true)
            const { status, data } = await axiosInstance.get(`/admin/process-solution/${orderId}`)
            console.log(data)
            if (status === 200) {
                toast({
                    title: data.message
                })
            }

        } catch (error) {
            console.log(error)
            toast({
                title: "Unable to process this req at this moment"
            })
        }
        finally {
            setIsGiveBtnLoading(false)
        }
    }

    return (
        <div className="bg-white/75 rounded-lg shadow-md  mt-6 px-3 py-4 relative">
            <h1 className="text-xl sm:text-2xl font-semibold">Solution Information</h1>
            <p className='mt-2'> Solution name -  {isLoading ? <Loader className="absolute top-[66px] left-44 " /> : solution?.name}</p>
            <SubmitButton className="bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-200 mt-4" isLoading={isViewBtnLoading} onClick={viewSolution}>Review solution</SubmitButton>
            <SubmitButton className="bg-gradient-to-r from-green-500 to-white/40 mt-4" isLoading={isGiveBtnLoading} onClick={sendSolution}>Give solution</SubmitButton>
        </div>
    )
}

export default GiveSolution