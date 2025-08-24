import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"

export default function Navbar() {
  return (
  <div className="flex justify-between items-center ">
  <Image
    src="/logo-susurradores.png"
    alt="Logo"
    width={190}
    height={190}
    className="absolute"
  />

  <div className="flex flex-col s w-full ">
    {/* Menu de cima */}
    <div className="bg-black text-white  rounded-lg px-4 py-2">
      <NavigationMenu className=" ml-auto">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>
              <Link href="https://www.instagram.com/sussurradores/reels/?hl=nb">Instagram</Link>
            </NavigationMenuTrigger>
            <NavigationMenuTrigger>
              <Link href="/about">Twitter</Link>
            </NavigationMenuTrigger>
            <NavigationMenuTrigger>
              <Link href="/shop">Facebook</Link>
            </NavigationMenuTrigger>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>

    {/* Menu de baixo */}
    <div className="bg-white text-black rounded-lg px-4 py-2 mt-2 ml-auto">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>
              <Link href="/">Home</Link>
            </NavigationMenuTrigger>
            <NavigationMenuTrigger>
              <Link href="/about">Sobre</Link>
            </NavigationMenuTrigger>
            <NavigationMenuTrigger>
              <Link href="/shop">Shop</Link>
            </NavigationMenuTrigger>
            <NavigationMenuTrigger>
              <Link href="/championships">Campeonatos</Link>
            </NavigationMenuTrigger>
            <NavigationMenuTrigger>
              <Link href="/teams">Times</Link>
            </NavigationMenuTrigger>
            <NavigationMenuTrigger>
              <Link href="/partner">Sócio Sofredor</Link>
            </NavigationMenuTrigger>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  </div>
</div>
  
  )
}
