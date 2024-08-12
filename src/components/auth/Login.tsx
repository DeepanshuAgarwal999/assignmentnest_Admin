"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import {
    Form,

} from "@/components/ui/form"
import TextField from "../TextField"
import { SubmitButton } from "../SubmitButton"
import Link from "next/link"
import { setCookie } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { useToast } from "../ui/use-toast"

const FormSchema = z.object({
    email: z.string().email(),
    password: z.string()
})

export interface LoginData {
    token: string
}

export default function Login() {
    const router = useRouter();
    const { toast } = useToast()
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: "",
        },
    })
    type Values = z.infer<typeof FormSchema>;
    const onSubmit = async (values: Values) => {
        try {
            const data = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/auth/login", {
                method: "POST",
                body: JSON.stringify(values),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const res = await data.json() as APIResponse<LoginData>
            if (res.data) {
                setCookie('token', res.data.token)
                toast({
                    title: "Login Successfully"
                })
                router.push('/')
            }
            else {
                toast({
                    variant: "destructive",
                    title: "Invalid credentials"
                })
            }
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Internal server errors"
            })

        }
    }


    return (
        <Card className="w-full max-w-[600px] mx-auto mt-16 px-8 pt-6 bg-white">

            <div className="flex flex-col w-full sm:flex-row justify-between items-center sm:gap-10">
                <CardHeader className=" text-center">
                    <CardTitle className="text-3xl sm:text-4xl tracking-widest">Login</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 w-full">
                    <Form {...form} >
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <TextField control={form.control} name="email" label="Email" />
                            <TextField control={form.control} name="password" label="Password" type={"password"} />
                            <SubmitButton isLoading={form.formState.isSubmitting}>Login</SubmitButton>
                        </form>

                    </Form>
                </CardContent>
            </div>
            <CardFooter className="flex justify-center mt-4">
                Don&apos;t have account ?&nbsp;<Link href={'/signup'} className="underline text-purple-600">Register Now</Link>
            </CardFooter>
        </Card>

    )
}
