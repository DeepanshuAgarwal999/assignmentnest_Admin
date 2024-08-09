import { Button } from '@/components/ui/button'
import React from 'react'
import notFoundImage from '../../public/images/404.svg'
import Image from 'next/image'
import Link from 'next/link'
const Page404 = () => {
    return (
        <div> <section className='h-full bg-ribbon bg-no-repeat w-full bg-cover pt-10'>
            <div className='w-full container flex flex-col lg:flex-row items-center justify-between px-4  lg:px-20 gap-10 '>
                <div>
                    <h1 className='font-bold  text-3xl sm:text-5xl'>Ooops...</h1>
                    <p className='text-[#626262] text-3xl sm:text-5xl tracking-wider'>Page not found</p>
                    <p className='text-lg py-10'>Don’t worry , we all take wrong turns sometimes.</p>
                    <Link href={'/'} replace>
                        <Button className='px-6 sm:px-8 mt-10 h-14 text-lg md:text-xl lg:text-2xl' >
                            Go Back
                        </Button></Link>
                </div>
                <div className=''>
                    <Image src={notFoundImage} alt="PageNotFound" />
                </div>
            </div>
        </section></div>
    )
}

export default Page404