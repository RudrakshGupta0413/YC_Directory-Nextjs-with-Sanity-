'use client';

import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import { LogOut } from "lucide-react";
import { signOut, signIn } from 'next-auth/react';

interface NavbarClientProps {
    session: any; // Update with the correct session type if needed
}

const NavbarClient: React.FC<NavbarClientProps> = ({ session }) => {
    return (
        <header className="px-5 py-3 bg-white shadow-sm font-work-sans">
            <nav className="flex justify-between items-center">
                {/* Logo */}
                <Link href="/">
                    <Image src="/logo.png" alt="logo" width={144} height={30} />
                </Link>

                {/* Navigation and User Actions */}
                <div className="flex items-center gap-5 text-black">
                    {session && session.user ? (
                        <>
                            <Link href="/startup/create">
                                <span>Create</span>
                            </Link>

                            <form
                                action={async () => {
                                    await signOut({ callbackUrl: '/' }); // Redirect to home after logout
                                }}
                            >
                                <button type="submit">
                                    <span className="max-sm:hidden">Logout</span>
                                    <LogOut className="size-6 sm:hidden text-red-500" />
                                </button>
                            </form>

                            <Link href={`/user/${session.user.id}`}>
                                <span>{session.user.name}</span>
                            </Link>
                            
                        </>
                    ) : (
                        <button
                            onClick={() => {
                                signIn('github', { callbackUrl: '/' }); // Redirect to home after login
                            }}
                        >
                            Login
                        </button>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default NavbarClient;
