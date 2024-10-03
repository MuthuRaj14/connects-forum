import { DropdownMenu, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { MenuIcon } from 'lucide-react'
import React from 'react'
import defaultpng from './images/default.png'
import Image from 'next/image'
import { DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu'
import Link from 'next/link'
import {LogoutLink} from '@kinde-oss/kinde-auth-nextjs/components'



export const UserDropdown = () => {
  return (
    <DropdownMenu>
        <DropdownMenuTrigger >
            <div className='rounded-full border px-2 py-2 lg:px-4 flex items-center gap-x-3 lg:py-2'>
                <MenuIcon className='w-6 g-6 lg:w-5 lg:h-5'/>
                <Image src={defaultpng} alt='default' className='rounded-full h-8 w-10 hidden lg:block'/>
            </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end' className='w-[200px]' >
            
            <DropdownMenuItem>
                <Link className='w-full' href='/create'>
                    Create Post
                </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
                <Link className='w-full' href='/settings'>
                    Settings
                </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator/>
            <DropdownMenuItem>
                <LogoutLink className='w-full'>Log out</LogoutLink>
            </DropdownMenuItem>

        </DropdownMenuContent>
    </DropdownMenu>
  )
}
