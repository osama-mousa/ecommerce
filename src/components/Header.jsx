/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import React, { useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import { useUser } from '@clerk/nextjs'
import { UserButton } from "@clerk/nextjs";
import { LuShoppingCart } from "react-icons/lu";
import { CartContext } from '@/context/CartContext';
import CartApis from '@/utils/CartApis';
import Cart from './Cart';
import Link from 'next/link';

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState();
    const [openCart, setOpenCart] = useState(false);
    const { cart, setCart } = useContext(CartContext)
    const { user } = useUser();

    useEffect(() => {
        user && getCartItems();
    }, [user])

    useEffect(() => {
        setIsLoggedIn(window.location.href.toString().includes('sign-in') || window.location.href.toString().includes('sign-up'))
    }, [user])

    const getCartItems = () => {
        CartApis.getUserCartItems(user.primaryEmailAddress.emailAddress).then(res => {
            console.log('response from cart items', res?.data?.data)
            res?.data?.data.forEach(citem => {
                setCart((oldCart) => [
                    ...oldCart,
                    {
                        id: citem?.id,
                        product: citem?.attributes?.products?.data[0]
                    }
                ])
            })
        })
    }

    return !isLoggedIn && (
        <header className="bg-white dark:bg-gray-900">
            <div className="mx-auto flex h-16 max-w-screen-xxl items-center gap-8 px-4 sm:px-6 lg:px-8 shadow-md">
                <a href="/">
                    <Link href={'/'} className='text-2xl md:text-5xl text-white font-semibold'>LOGO</Link>
                </a>

                <div className="flex flex-1 items-center justify-end md:justify-between">
                    <nav aria-label="Global" className="hidden md:block">
                        <ul className="flex items-center gap-6 text-sm">
                            <li>
                                <a
                                    className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                                    href="/"
                                >
                                    Home
                                </a>
                            </li>

                            <li>
                                <a
                                    className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                                    href="/"
                                >
                                    Explore
                                </a>
                            </li>

                            <li>
                                <a
                                    className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                                    href="/"
                                >
                                    Projects
                                </a>
                            </li>

                            <li>
                                <a
                                    className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                                    href="/"
                                >
                                    About Us
                                </a>
                            </li>

                            <li>
                                <a
                                    className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                                    href="/"
                                >
                                    Contact Us
                                </a>
                            </li>

                        </ul>
                    </nav>

                    <div className="flex items-center gap-4">
                        {!user ?
                            <div className="sm:flex sm:gap-4">
                                <a
                                    className="block rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-white transition hover:bg-secondary dark:hover:bg-secondary"
                                    href="/sign-in"
                                >
                                    Login
                                </a>

                                <a
                                    className="hidden rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600 transition hover:text-primary dark:bg-gray-800 dark:text-white dark:hover:text-white/100 dark:hover:bg-secondary sm:block"
                                    href="/sign-up"
                                >
                                    Register
                                </a>
                            </div>
                            :
                            <div className='flex items-center gap-5 text-white'>
                                <div onClick={() => setOpenCart(!openCart)}>
                                    <h2 className='flex gap-1 cursor-pointer items-center'>
                                        <LuShoppingCart />({cart?.length})
                                    </h2>
                                </div>
                                <UserButton afterSignOutUrl="/" />
                                {openCart && <Cart />}
                            </div>
                        }

                        <button
                            className="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 dark:bg-gray-800 dark:text-white dark:hover:text-white/75 md:hidden"
                        >
                            <span className="sr-only">Toggle menu</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header