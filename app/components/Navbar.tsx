// import Logo from "../components/logo"
"use client"
import {cn} from "../lib/utils"
import Link  from 'next/link'


interface Props{
  className?:string;
  spanClassName?:string;
}

const Navbar = ({className,spanClassName}: Props) => {
  const pathname = usePathname
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
                  <li>{item?.title}</li>
                </Link>
              ))}
          </ul>
          {/* Icons */}
          <p>Icons</p>
        </div>
    </div>
  )
}

export default Navbar;