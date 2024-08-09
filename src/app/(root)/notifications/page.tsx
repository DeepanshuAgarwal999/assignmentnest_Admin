"use client"
import Notification from "@/components/Notification"
import Loader from "@/components/shared/Loader"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { axiosInstance } from "@/lib/axios.instance"
import { useEffect, useState } from "react"

export default function Notifications() {
    const [notification, setNotification] = useState<AppNotification[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        (async () => {
            try {
                const { data } = await axiosInstance.get('/notification/get-admin')
                if (data.data) {
                    setNotification(data.data)
                }
            } catch (error) {
                console.log(error)
            }
            finally{
                setIsLoading(false)
            }
        })()
    }, [])
    if (isLoading) {
        return <Loader />
    }

    return (
        <section className="max-w-5xl flex flex-col gap-4 h-[550px] overflow-y-auto custom-scrollbar ">
            {
                notification.length !== 0 ? notification.map((notification) => (
                    <Notification notification={notification} key={notification.notification_id}/>
                )) : <Alert>
                    <AlertDescription className="text-center font-semibold text-lg">No Notification yet</AlertDescription>
                </Alert>
            }
        </section>
    )
}
