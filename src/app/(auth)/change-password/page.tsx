"use client"
import React, { useState } from 'react'
import logo from '../../../../public/images/logo.jpg'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { axiosInstance } from '@/lib/axios.instance'
import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { SubmitButton } from '@/components/SubmitButton'
import Link from 'next/link'


const changePasswordSchema = z.object({
    email: z.string().email(),
    old_password: z.string().min(5, "Password length must be greater than 5"),
    new_password: z.string().min(5, "Password length must be greater than 5")
})


type FormFields = z.infer<typeof changePasswordSchema>

const ChangePassword = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { toast } = useToast()
    const router = useRouter()
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<FormFields>({
        resolver: zodResolver(changePasswordSchema), // Use Zod resolver for form validation
        defaultValues: {
            email: "",
            old_password: "",
            new_password: "",

        }
    });
    const onSubmit = async (values: FormFields) => {
        try {
            setIsLoading(true)
            const { data } = await axiosInstance.patch(`/auth/password-change`, values
            );
            if (data) {
                reset();
                toast({
                    title: "Password changed successfully"
                })
                router.push('/login')
            }

        } catch (error) {
            console.error("Error:", error);
        }
        finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center pt-4 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
            
                <h2 className=" text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Change your password
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
                <div className="bg-white bg-gradient-to-r from-purple-100  to-white/90 px-6 py-12 shadow sm:rounded-lg sm:px-12">
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
                                Enter old password
                            </label>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    {...register("old_password")}
                                    name="old_password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 px-2 sm:text-sm sm:leading-6 outline-none"
                                />
                            </div>
                            {errors.old_password && <p className="text-red-500 text-sm">{errors.old_password.message}</p>}

                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Enter new password
                            </label>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    {...register("new_password")}
                                    name="new_password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 px-2 sm:text-sm sm:leading-6 outline-none"
                                />
                            </div>
                            {errors.new_password && <p className="text-red-500 text-sm">{errors.new_password.message}</p>}
                        </div>


                        <div>
                            <SubmitButton
                                className='w-full mt-4'
                                disabled={isLoading}
                            >
                                Change Password
                            </SubmitButton>
                        </div>
                    </form>


                </div>

                <p className="mt-10 text-center text-sm text-gray-500">
                    <Link href={'/reset-password'} className="font-semibold leading-6 text-purple-600 hover:text-purple-500">
                        Reset Password
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default ChangePassword