"use client"
import * as React from "react"

import { Button } from "@/components/ui/button"
import {  useRouter } from "next/navigation"
import { Assignment } from "./table/AdminTable"
import { Textarea } from "./ui/textarea"
import { Label } from "./ui/label"
import { formatDate } from "@/lib/utils"


export function AssignmentDetails({ assignment }: { assignment: Assignment }) {
    const [open, setOpen] = React.useState<boolean>(true);
    const router = useRouter();
    const onClose = () => {
        setOpen(false)
        router.push('/')
    }
    console.log(assignment)

    return (
        <section className="container">
            <header className="flex items-center justify-between flex-wrap gap-4 bg-white p-2 rounded-lg shadow-md">
                <Button className="active:scale-95" onClick={onClose} variant={"default"} >
                    {"<"} Go Back
                </Button>
                <h1 className="font-semibold text-2xl px-2">
                    Assignment Details
                </h1>
                <p>OrderId - {assignment.order_id}</p>
            </header>
            <main className="grid md:grid-cols-2 gap-10 gap-y-6">
                <div className="bg-white/75 rounded-lg shadow-md  mt-6 px-3 py-4">
                    <h1 className="text-xl sm:text-2xl font-semibold">Customer Information</h1>
                    <article className="p-6 bg-gray-50 shadow-sm rounded-xl mt-6">
                        <p>
                            <span className="font-medium">Assignment Name: </span><span>{assignment.assignment_name}</span>
                            <br />
                            <span className="font-medium">Phone: </span><span>{assignment.phone}</span>
                            <br />
                            <span className="font-medium">Email: </span><span>{assignment.email}</span>
                            <br />
                            <span className="font-medium">Id: </span><span>{assignment.customer_id}</span>

                        </p>
                    </article>
                </div>
                <div className="bg-white/75 rounded-lg shadow-md  mt-6 px-3 py-4">
                    <h1 className="text-xl sm:text-2xl font-semibold">Payment Information</h1>
                    <article className="p-6 bg-gray-50 shadow-sm rounded-xl mt-6">
                        <h1></h1>
                    </article>
                </div>
                <div className="bg-white/75 rounded-lg shadow-md  mt-6 px-3 py-4">
                    <h1 className="text-xl sm:text-2xl font-semibold">Order Information</h1>
                    <article className="p-6 bg-gray-50 rounded-xl mt-6 shadow-sm">
                        <span className="font-medium">Deadline: </span><span>{assignment.deadline}</span>
                        <br />
                        <span className="font-medium">Created At: </span><span>{formatDate(assignment.created_at)}</span>
                        <br />
                        <span className="font-medium">Subject: </span><span>{assignment.subject}</span>
                        <br />
                        <span className="font-medium">Reference: </span><span>{assignment.reference}</span>
                        <Label className="block  font-medium text-base">Description</Label>
                        <Textarea className="mt-2 bg-white outline-none pt-4" value={assignment.description} readOnly />

                    </article>
                </div>
            </main>
            
        </section >
    )
}
