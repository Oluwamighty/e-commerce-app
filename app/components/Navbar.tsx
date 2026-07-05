import Link from "next/link";
import Image from "next/image";
import CartBadge from "./CartBadge";

export default function Navbar(){
  return (
    <nav className="flex w-full justify-between h-15 items-center px-5 bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
      <div className="text-white text-2xl font-bold">
        <Link href="/">
          <Image src="/Lizzy.png" alt="NextCart Logo" width={60} height={40} className="pl-2" />
        </Link>
      </div>
      <div className="flex gap-5 text-white text-lg font-medium items-center mr-5">
        <Link href="/" className="hover:text-green-400 transition-colors">Home</Link>
        <Link href="/products" className="hover:text-green-400 transition-colors">Products</Link>
        <Link href="/checkout" className="hover:text-green-400 transition-colors">Checkout</Link>
        <CartBadge />
      </div>
    </nav>
  )
}