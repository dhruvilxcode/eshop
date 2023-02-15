import Link from 'next/link'
import React from 'react'

export default function Footer() {
  return (
     <footer className='w-full bg-eshop-dark text-white flex justify-between gap-14 px-10 py-8'>
        <div className='w-96'>
            <img src="/assets/logo-white.svg" alt="logo" className='block' />
            <p className='mt-4'>
            Quality Products only at our shop. explore 45+ designer wear. With team of professional designer we are scaling like never before. We are Proudly Made In India.
            </p>
        </div>
        <div className='grid grid-cols-2 gap-8'>
            {/* nav links 1 */}
            <div className='flex flex-col gap-5'>
                <Link href="/" className='block'>
                    Home
                </Link>
                <Link href="/products" className='block'>
                    Products
                </Link>
                <Link href="/collections" className='block'>
                    Collections
                </Link>
                <Link href="/wishlist" className='block'>
                    Wishlist
                </Link>
                <Link href="/cart" className='block'>
                    Cart
                </Link>
                <Link href="/me" className='block'>
                    My Account
                </Link>
                <Link href="/contact" className='block'>
                    Contact US
                </Link>
                <Link href="/about" className='block'>
                    About US
                </Link>
                <Link href="/track-my-order" className='block'>
                    Track My Order
                </Link>
            </div>
            {/* nav links 1 */}

            {/* nav links 2 */}
            <div className='flex flex-col gap-5'>
                <Link href="#" className='block'>
                    Privacy Policy
                </Link>
                <Link href="#" className='block'>
                    Terms & Conditions
                </Link>
                <Link href="#" className='block'>
                    Payments & Refunds Policy
                </Link>
            </div>
            {/* nav links 2 */}
        </div>
     </footer>
  )
}
