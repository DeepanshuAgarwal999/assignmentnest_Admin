"use client"
import React, { useState } from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import Image from 'next/image';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { SubmitButton } from '../SubmitButton';
import { useRouter } from 'next/navigation';
import { axiosInstance } from '@/lib/axios.instance';
import { useToast } from '../ui/use-toast';
import closeImage from '../../../public/icons/close.svg'

const CreateQuote = ({ orderId }: { orderId: string }) => {
    const [open, setOpen] = useState<boolean>(true);
    const [amount, setAmount] = useState<number>(1)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { toast } = useToast()
    const router = useRouter();

    const onClose = () => {
        setOpen(false)
        router.push('/quote')
    }
    const handleSubmit = async () => {
        try {
            setIsLoading(true)
            const { data } = await axiosInstance.post('/admin/quote-order', {
                order_id: orderId,
                amount: amount
            })
            if (data) {
                toast({
                    title: "Quote created Successfully"
                })
                onClose()
                // revalidatePath('/quote')
            }
            else {
                toast({
                    variant: "destructive",
                    title: "Failed",
                    description: "Something went wrong while creating this order please try again later"
                })

            }
        } catch (error) {
            console.log(error)
            toast({
                variant: "destructive",
                title: "Failed",
                description: "Internal server error"
            })
            router.replace('/quote')
        }
        finally {
            setIsLoading(false)
        }

    }
    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent className=''>
                <AlertDialogHeader>
                    <AlertDialogTitle className='flex items-start justify-between'>Create Quote
                        <Image src={closeImage} height={20} width={20} alt='close' className='cursor-pointer invert' onClick={onClose} />
                    </AlertDialogTitle>
                </AlertDialogHeader>
                <>
                    <Label>Enter Amount ($)</Label>
                    <Input
                        value={amount}
                        min={1}
                        className='focus:ring-0 ring-0 outline-none  focus-visible:ring-0'
                        onChange={(e) => {
                            const value = parseInt(e.target.value, 10);
                            setAmount(isNaN(value) ? 0 : value);
                        }}
                    />
                </>
                <AlertDialogFooter>
                    <SubmitButton onClick={handleSubmit} isLoading={isLoading}>Submit</SubmitButton>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog >

    )
}

export default CreateQuote