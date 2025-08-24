import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import Home from '../page'

export default function Navbar() {
  return (
    <div className='flex justify-between border-b-2 border-black margin-0'>
      <Image src="/logo.png" alt="Logo" width={100} height={50} />
      <ul className='flex gap-4 p-4 content-center justify-center'>
        <li><Link href="/">Home</Link></li>
        <li><Link href="/about">Sobre</Link></li>
        <li><Link href="/teams">Times</Link></li>
        <li><Link href="/championships">Campeonatos</Link></li>
        <li><Link href="/shop">Shop</Link></li>
        <li><Link href="/contacts">Contatos</Link></li>
        <li><Link href="/partner">Seja um sócio sofredor</Link></li>
      </ul>
    </div>
  )
}
