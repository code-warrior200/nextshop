// import Logo from "../components/logo"
"use client"
import {cn} from "../lib/utils"
import Link  from 'next/link'
import { usePathname } from "next/navigation" 
import {Heart,ShoppingBagIcon} from "lucide-react";

interface Props{
  className?:string;
  spanClassName?:string;
}

const Navbar = ({className,spanClassName}: Props) => {
  const pathname = usePathname();

  console.log(pathname);

  const navigation = [
    {_id:910, title:"Home", href:"/"},
    {_id:911, title:"Phone", href:"/phones"},
    {_id:912, title:"Phone Cases", href:"/phonecases"},
    {_id:913, title:"Watches", href:"/watches"},
    {_id:914, title:"Accessorries", href:"/accessories"},
  ]

  return (
    <div className="w-full h-20 border-b-[1px] border-b-zinc-500 bg-white text-zinc-600">
        <div className="max-w-screen-xl mx-auto h-full flex items-center justify-between px-4 xl:px-0 ">
          {/* Logo */}
          <Link href={"/"} className={cn('text-zinc-950 text-xl underline underline-offset-4 decoration-[1px] group')}>
            <span className={cn('bg-zinc-950 text-white w-8 h-8 rounded-full inline-flex items-center justify-center text-2xl font-bold mr-1 group-hover:bg-blue-700 duration-200', spanClassName)}>N</span>iceshop
          </Link>
          {/* Navigation */}
          <ul className="hidden md:flex items-center gap-5 text-sm uppercase font-semibold">
            {navigation.map((item) => (
                //eslint-disable-next-line react/jsx-key
                <Link href={item?.href}>
                  <li className={`hover:text-black cursor-pointer duration-200 relative overflow-hidden group 
                    ${item.href === pathname && 'text-designColor'}`}
                  >
                  {item?.title}
                    <span className={`absolute h-[1px] w-full bg-blue-700 left-0 bottom-0 -translate-x-[100%] group-hover:translate-x-0 transition-transform duration-500 
                      ${item.href === pathname && "translate-x-0 bg-designColor"}`}
                    />
                  </li>
                </Link>
              ))}
          </ul>
          {/* Icons */}
          <div className="flex items-center gap-x-5">
            <Link href={"/wishlist"} className="hover:text-black cursor-pointer duration-200 relative group">
              <Heart className="w-7 h-7"/>
              <span className="absolute top-0 -left-1 bg-zinc-800 text-zinc-200 w-4 h-4 rounded-full text-xs flex items-center justify-center group-hover:bg-black font-semibold group-hover:text-white">0</span>  
            </Link>
            <Link href={"/wishlist"} className="hover:text-black cursor-pointer duration-200 relative group">
              <ShoppingBagIcon className="w-7 h-7"/>
              <span className="absolute top-0 -left-1 bg-zinc-800 text-zinc-200 w-4 h-4 rounded-full text-xs flex items-center justify-center group-hover:bg-black font-semibold group-hover:text-white">0</span>  
            </Link>
            <button className="hover:text-black text-sm uppercase font-semibold cursor-pointer duration-200 relative overflow-hidden group">
              Login
              <span className="absolute h-[1px] w-full bg-blue-700 left-0 bottom-0 -translate-x-[100%] group-hover:translate-x-0 transition-transform duration-500" />
            </button>
          </div>
        </div>
    </div>
  )
}

export default Navbar;
