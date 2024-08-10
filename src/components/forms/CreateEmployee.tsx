"use client"
import React, { useState } from 'react'
import logo from '../../../../public/images/logo.jpg'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { axiosInstance } from '@/lib/axios.instance'
import { useToast } from '@/components/ui/use-toast'
import { SubmitButton } from '@/components/SubmitButton'


const createEmployeeSchema = z.object({
    email: z.string().email(),
    employee_name: z.string().max(40),
    password: z.string().min(8, "Password must contain atLeast 8 character")
})


type FormFields = z.infer<typeof createEmployeeSchema>

const CreateEmployee = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { toast } = useToast()
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<FormFields>({
        resolver: zodResolver(createEmployeeSchema), // Use Zod resolver for form validation
        defaultValues: {
            email: "",
            employee_name: "",
            password: "",
        }
    });
    const onSubmit = async (values: FormFields) => {
        const formValues = { ...values, account_type: "MANAGER" }
        try {
            setIsLoading(true)
            const { data } = await axiosInstance.post(`/admin/create-employee`, formValues
            );
            if (data) {
                reset();
                toast({
                    title: "Employee created successfully"
                })
            }

        } catch (error) {
            console.error("Error:", error);
            toast({
                title: "Unable to create Employee",
                description: "please try again later"
            })
        }
        finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex h-[calc(100vh-130px)] flex-1 flex-col justify-center container  rounded-lg bg-gradient-to-b from-blue-100 to-sky-50 bg-cover">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">

                <h2 className=" text-center text-2xl font-bold bg-gradient-to-r from-blue-500 via-blue-400 to-sky-500 bg-clip-text text-transparent">
                    Create Employee
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
                <div className="bg-white/40 border border-[#EDF5F8] backdrop-blur-3xl px-6 py-8 shadow-md sm:rounded-lg sm:px-12">
                    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    {...register("email")}
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6 outline-none px-2"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Enter Employee name
                            </label>
                            <div className="mt-2">
                                <input
                                    {...register("employee_name")}
                                    name="employee_name"
                                    type="text"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 px-2 sm:text-sm sm:leading-6 outline-none"
                                />
                            </div>
                            {errors.employee_name && <p className="text-red-500 text-sm">{errors.employee_name.message}</p>}

                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Enter password
                            </label>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    {...register("password")}
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 px-2 sm:text-sm sm:leading-6 outline-none"
                                />
                            </div>
                            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                        </div>


                        <div>
                            <SubmitButton
                                className='w-full mt-4 bg-blue-500 '
                                isLoading={isLoading}
                            >
                                Create Employee
                            </SubmitButton>
                        </div>
                    </form>


                </div>
            </div>
        </div>
    )
}

export default CreateEmployee