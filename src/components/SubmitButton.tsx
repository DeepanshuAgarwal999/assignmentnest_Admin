import React from 'react'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import loader from '../../public/icons/loader.svg'

export const SubmitButton = ({ className, isLoading, children, onClick, disabled = false, ...props }: { disabled?: boolean, onClick?: () => any, className?: string, isLoading?: boolean, children: React.ReactNode }) => {

    return (
        <Button type='submit' onClick={onClick} {...props} className={cn('w-full  flex items-center gap-2 tracking-wide bg-emerald-500 h-12 text-lg text-white active:scale-95 ease-in-out duration-150 disabled:pointer-events-none ', className)} disabled={isLoading || disabled} >
            {isLoading && <Image src={loader} alt='loader' height={24} width={24} className='animate-spin' />}
            <span>{children}</span>
        </Button >
    )
}
