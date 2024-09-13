import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Menu } from 'lucide-react';

import { getServerAuthSession } from "~/server/auth";

const Header = async () => {
  const session = await getServerAuthSession();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Button variant="ghost" size="icon" className="mr-2 md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
        <div className="flex items-center space-x-2">
          <Link href="/">
            <Button variant="ghost" size="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              <span className="sr-only">Home</span>
            </Button>
          </Link>
          <span className="hidden font-bold sm:inline-block">My Blog</span>
        </div>
        <div className="flex-1" />
        <Avatar>
          <AvatarImage src={session?.user?.image ?? "/placeholder-avatar.jpg"} alt={session?.user?.name ?? "@username"} />
          {/* <AvatarFallback>UN</AvatarFallback> */}
        </Avatar>
        <div className="flex flex-col items-center justify-center gap-4">
          <Link
            href={session ? "/api/auth/signout" : "/api/auth/signin"}
            className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
          >
            {session ? "Sign out" : "Sign in"}
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header