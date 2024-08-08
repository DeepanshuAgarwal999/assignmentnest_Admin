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
import { useRouter } from "next/navigation"

const FormSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string(),
  phone: z
    .string()
    .refine((phone) => /^\+\d{10,15}$/.test(phone), "Invalid phone number"),
})

const SignUp = () => {
  const router = useRouter()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  })

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/auth/register", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        router.push('/login')
      }

    } catch (error) {
      console.log(error)
    }
  }


  return (
    <Card className="w-full max-w-[600px] mx-auto mt-16 px-8 pt-6 bg-white">
      <div className="flex flex-col w-full sm:flex-row justify-between items-center sm:gap-10">
        <CardHeader>
          {/* <CardTitle><Image src={"/images/logo.jpg"} alt="AssignmentNest" height={120} width={120} /></CardTitle> */}
          <CardTitle className="text-3xl sm:text-4xl">SignUp</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 w-full">
          <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <TextField control={form.control} name="email" label="Email" />
              <TextField control={form.control} name="password" label="Password" type={"password"} />
              <TextField control={form.control} name="phone" label="Phone" />
              <SubmitButton isLoading={form.formState.isSubmitting}>Sign Up</SubmitButton>
            </form>

          </Form>
        </CardContent>
      </div>
      <CardFooter className="flex justify-center mt-4">
        Already have an account ?&nbsp;<Link href={'/login'} className="underline text-purple-600">Login</Link>
      </CardFooter>

    </Card>
  )
}

export default SignUp