"use client"

import React from "react"
import { signIn, signOut, useSession, getProviders } from "next-auth/react"
import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"

const Nav = () => {
    const isUserLoggedIn = true
    const [providers, setProviders] = useState(null)
    const [toggleDropdown, setToggleDropdown] = useState(false)
    console.log(providers)
    useEffect(() => {
        const setProvider = async () => {
            const response = await getProviders()
            setProviders(response)
        }
        setProvider()
    }, [])
    return (
        <nav className='flex-between w-full mb-16 pt-3'>
            <Link href={"/"} className='flex gap-2 flex-center'>
                <Image
                    src={"/assets/images/logo.svg"}
                    width={30}
                    height={30}
                    className='object-contain'
                    alt='logo'
                />
                <p className='logo_text'>Promptopia</p>
            </Link>

            {/* Desktop Navigation */}
            <div className='sm:flex hidden'>
                {isUserLoggedIn ? (
                    <div className='flex gap-3 md:gap-5'>
                        <Link href={"/create-prompt"} className='black_btn'>
                            Create Post
                        </Link>

                        <button
                            type='button'
                            onClick={signOut}
                            className='outline_btn'
                        >
                            Sign Out
                        </button>

                        <Link href={"/profile"}>
                            <Image
                                src={"/assets/images/logo.svg"}
                                width={37}
                                height={37}
                                alt='profile'
                            />
                        </Link>
                    </div>
                ) : (
                    <>
                        {providers &&
                            Object.values(providers).map((provider) => (
                                <button
                                    type='button'
                                    key={provider.name}
                                    onClick={() => signIn(provider.id)}
                                    className='black_btn'
                                >
                                    Sign In
                                </button>
                            ))}
                    </>
                )}
            </div>

            {/* Mobile Navigation */}
            <div className='sm:hidden flex relative'>
                {isUserLoggedIn ? (
                    <div className='flex'>
                        <Image
                            src={"/assets/images/logo.svg"}
                            width={30}
                            height={30}
                            className='object-contain cursor-pointer'
                            alt='logo'
                            onClick={() => setToggleDropdown((prev) => !prev)}
                        />
                        {toggleDropdown && (
                            <div className='dropdown'>
                                <Link
                                    href={"/profle"}
                                    className='dropdown_link'
                                    onClick={() => setToggleDropdown(false)}
                                >
                                    My Profile
                                </Link>
                                <Link
                                    href={"/create-prompt"}
                                    className='dropdown_link'
                                    onClick={() => setToggleDropdown(false)}
                                >
                                    Create Prompt
                                </Link>
                                <button
                                    className='black_btn w-full mt-5'
                                    type='button'
                                    onClick={() => {
                                        setToggleDropdown(false)
                                        signOut()
                                    }}
                                >
                                    Sign Out
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <>
                        {providers &&
                            Object.values(providers).map((provider) => (
                                <button
                                    type='button'
                                    key={provider.name}
                                    onClick={() => signIn(provider.id)}
                                    className='black_btn'
                                >
                                    Sign In
                                </button>
                            ))}
                    </>
                )}
            </div>
        </nav>
    )
}

export default Nav
