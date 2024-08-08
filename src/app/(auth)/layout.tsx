import React from 'react'
import Image from 'next/image'
import logoImage from '../../../public/images/logo.jpg'
const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <header className='p-4 border-b border-gray-200 bg-white'>
                <Image src={logoImage} alt="AssignmentNest" height={120} width={120} />
            </header>
            {children}
        </div>
    )
}

export default AuthLayout