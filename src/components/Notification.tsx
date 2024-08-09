import React from 'react'
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { RocketIcon } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { timeAgo } from '@/lib/timeago'

const Notification = ({ notification }: { notification: AppNotification }) => {
    return (
        <Alert>
            <RocketIcon className="h-4 w-4" />
            <AlertTitle>{notification.message} <Badge variant="secondary" className='ml-2'>{timeAgo(notification.created_at)}</Badge></AlertTitle>
            <div className="flex items-center justify-between">
                <AlertDescription className="flex justify-between items">
                    {notification.description}
                </AlertDescription>
                <Button className='bg-cyan-400 active:scale-95 ease-in-out duration-150 transition-all'>Mark as read</Button>
            </div>
        </Alert>
    )
}

export default Notification