import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <>
         {/* Top Navbar */}
         <nav className="bg-gray-900 text-white py-4 px-8 flex justify-between items-center">
            <div className='flex gap-2'>
                <h2>StudentServe</h2>
            </div>
            <div className='flex gap-4'>
                {/* Add your navigation links here */}
                <Link href="#" className="">Home</Link>
                <Link href="https://my.stclaircollege.ca/sites/student/Pages/Home.aspx" target="_blank">
                    <p>St. Claire</p>
                </Link>
                <Link href="#" className="">Contact</Link>
            </div>
        </nav>
    </>
  )
}

export default Header