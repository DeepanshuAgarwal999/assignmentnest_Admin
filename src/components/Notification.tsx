import React, { useState } from 'react'
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { RocketIcon } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { timeAgo } from '@/lib/timeago'
import { axiosInstance } from '@/lib/axios.instance'
import { useToast } from './ui/use-toast'
import { useRouter } from 'next/navigation'

const Notification = ({ notification, refreshNotifications }: { notification: AppNotification, refreshNotifications: () => void }) => {
    const { toast } = useToast()
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleDelete = async () => {
        if (!notification.notification_id) {
            return
        }
        try {
            setIsLoading(true)
            const res = await axiosInstance.delete(`/notification/delete/${notification.notification_id}`)
            if (res.status === 200) {
                toast({
                    title: "Notification Deleted successfully"
                })
            }
            refreshNotifications()
        } catch (error) {
            console.log(error)
            toast({
                title: "Unable to process request at this moment"
            })
        }
        finally {
            setIsLoading(false)
        }
    }
    return (
        <Alert>
            <RocketIcon className="h-4 w-4" />
            <AlertTitle> <Badge variant="secondary" className=''>{timeAgo(notification.created_at)}</Badge></AlertTitle>
            <div className="flex items-center justify-between">
                <AlertDescription className="flex justify-between items">
                    {notification.message}
                </AlertDescription>
                <Button disabled={isLoading} className='bg-cyan-400 active:scale-95 ease-in-out duration-150 transition-all' onClick={handleDelete}>Delete</Button>
            </div>
        </Alert>
    )
}

export default Notification