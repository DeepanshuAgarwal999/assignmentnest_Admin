import LeftSidebar from '@/components/shared/LeftSideBar'
import Navbar from '@/components/shared/Navbar'
import React from 'react'

const RootLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <LeftSidebar />
            <Navbar />
            <main className="lg:pl-60 pt-16">
                <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-8 relative">{children}</div>
            </main> 
        </div>
    )
}

export default RootLayout