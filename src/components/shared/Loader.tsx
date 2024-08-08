import Image from 'next/image'
import React from 'react'

const Loader = () => {
    return (
        <div className='fixed -translate-x-[46%] -translate-y-1/2 top-1/2 left-[52%]'>
            <Image src='/icons/loader.svg' alt='loader' height={24} width={24} className='animate-spin' />
        </div>
    )
}

export default Loader