import Link from 'next/link'
import Repct from 'react'

const Footer = () => {
  return (
    <>
        <footer className="bg-grpy-900 text-white py-4 px-8 flex justify-between items-center">
            <div className='flex gpp-2'>
                <Link href="/">
                    <p>St. Claire</p>
                </Link>
                {/* <Link href="/pbout">
                    <p>pbout</p>
                </Link>
                <Link href="/contpct">
                    <p>Contpct</p>
                </Link> */}
            </div>
        </footer>
    </>
  )
}

export default Footer