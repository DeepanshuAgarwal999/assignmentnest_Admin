"use client"
import * as React from "react"

import { Button } from "@/components/ui/button"
import { usePathname, useRouter } from "next/navigation"
import { Assignment } from "./table/AdminTable"
import { Textarea } from "./ui/textarea"
import { Label } from "./ui/label"
import { formatDate, formatDateEpoch } from "@/lib/utils"
import { axiosInstance } from "@/lib/axios.instance"
import Loader from "./shared/Loader"
import { SubmitButton } from "./SubmitButton"
import { useToast } from "./ui/use-toast"
import AssignWriter from "./AssignWriter"
import GiveSolution from "./GiveSolution"

export type PaymentStatusType =
    | 'PENDING'
    | 'CREATED'
    | 'APPROVED'
    | 'CAPTURED'
    | 'CANCELLED'
    | 'COMPLETED'
    | 'PAYER_ACTION_REQUIRED'

export type PaymentType = {
    id: string;
    paypalId: string | null;
    amount: number;
    payment_status: PaymentStatusType;
    payment_date: string | null;
    approve_link: string | null;
    capture_link: string | null;
    payer_id: string | null;
    create_time: number;
    update_time: number;
};

export function AssignmentDetails({ assignment }: { assignment: Assignment }) {
    const router = useRouter();
    const [paymentDetails, setPaymentDetails] = React.useState<PaymentType[]>([]);
    const [isLoading, setIsLoading] = React.useState<boolean>(true)
    const [isPaymentActivate, setIsPaymentActivate] = React.useState<{ isLoading: boolean, id: string }>({ isLoading: false, id: "" })
    const { toast } = useToast()
    const onClose = () => {
        router.push('/')
    }
    React.useEffect(() => {
        (async () => {
            try {
                const { data } = await axiosInstance.get(`/admin/get-payments/${assignment.order_id}`)
                if (data && data.data) {
                    setPaymentDetails(data.data)
                }
            } catch (error) {
                console.error(error)
            }
            finally {
                setIsLoading(false)
            }
        })()
    }, [isPaymentActivate])

    const handlePayment = async (paymentId: string) => {
        try {
            setIsPaymentActivate({ isLoading: true, id: paymentId })
            const { data } = await axiosInstance.get(`/admin/activate-payment/${paymentId}`)
            if (data) {
                toast({
                    title: "Payment Initiated successfully"
                })
            } else {
                toast({
                    title: "Payment already initiated"
                })
            }
        } catch (error) {
            console.log(error)
            toast({
                title: "Unable to active payment try again later"
            })

        }
        finally {
            setIsPaymentActivate({ isLoading: false, id: "" })
        }

    }

    return (
        <section className="container">
            <header className=" flex items-center justify-center sm:justify-between flex-wrap gap-4 bg-white p-2 rounded-lg shadow-md">
                <Button className="active:scale-95" onClick={onClose} variant={"default"} >
                    {"<"} Go Back
                </Button>
                <h1 className="font-semibold text-2xl px-2">
                    Assignment Details
                </h1>
                <p>OrderId - {assignment.order_id}</p>
            </header>
            <main className="grid md:grid-cols-2 gap-10 gap-y-6 mt-10">
                <div className="bg-white/75 rounded-lg shadow-md  mt-6 px-3 py-4">
                    <h1 className="text-xl sm:text-2xl font-semibold">Customer Information</h1>
                    <article className="p-6 bg-gray-50 shadow-sm rounded-xl mt-6">
                        <p className="space-y-3">
                            <span className="font-medium">Phone: </span><span>{assignment.phone}</span>
                            <br />
                            <span className="font-medium">Email: </span><span>{assignment.email}</span>
                            <br />
                            <span className="font-medium">Id: </span><span>{assignment.customer_id}</span>

                        </p>
                    </article>
                </div>
                <div className="bg-white/75 rounded-lg relative shadow-md  mt-6 px-3 py-4 ">
                    <h1 className="text-xl sm:text-2xl font-semibold">Payment Information</h1>
                    {isLoading ? <Loader className="absolute top-28 " /> :
                        <div className="grid sm:grid-cols-2 gap-4">
                            {
                                paymentDetails && paymentDetails.length !== 0 && paymentDetails.map((payment, idx) => {
                                    return (
                                        <article className="p-4 bg-gray-50 shadow-sm rounded-xl mt-6 border border-dashed border-purple-500" key={idx}>
                                            <h1 className="text-xl font-semibold text-center">{idx == 0 ? "Payment 1" : "Payment 2"}</h1>
                                            <p className="text-center mt-2 font-medium">Activate for {payment.amount}$</p>
                                            <SubmitButton className="mt-4 w-fit mx-auto" isLoading={isPaymentActivate.isLoading && isPaymentActivate.id === payment.id} onClick={() => handlePayment(payment.id)} disabled={!!payment.paypalId}>{!!payment.paypalId ? "Activated" : "Activate"}</SubmitButton>
                                        </article>
                                    )

                                })
                            }
                        </div>
                    }

                </div>

                <div className="bg-white/75 rounded-lg shadow-md  mt-6 px-3 py-4">
                    <h1 className="text-xl sm:text-2xl font-semibold">Order Information</h1>
                    <article className="p-6 bg-gray-50 rounded-xl mt-6 shadow-sm">
                        <span className="font-medium">Assignment Name: </span><span>{assignment.assignment_name}</span>
                        <span className="font-medium">Deadline: </span><span>{formatDate(assignment.deadline)}</span>
                        <br />
                        <span className="font-medium">Created At: </span><span>{formatDateEpoch(assignment.created_at)}</span>
                        <br />
                        <span className="font-medium">Subject: </span><span>{assignment.subject}</span>
                        <br />
                        <span className="font-medium">Reference: </span><span>{assignment.reference}</span>
                        <Label className="block  font-medium text-base">Description</Label>
                        <Textarea className="mt-2 bg-white outline-none pt-4" value={assignment.description} readOnly />

                    </article>
                </div>

                <div className="bg-white/75 rounded-lg shadow-md  mt-6 px-3 py-4 relative">
                    <h1 className="text-xl sm:text-2xl font-semibold">Assign Writer</h1>
                    <AssignWriter orderId={assignment.order_id} writerId={assignment.writer_Id} />
                </div>
                {(assignment.order_status === 'UPLOADED' || assignment.order_status === 'COMPLETED' || assignment.order_status === 'REWORK' || assignment.order_status === 'REFUNDED') && <GiveSolution orderId={assignment.order_id} />}
            </main>

        </section >
    )
}
