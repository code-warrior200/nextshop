"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, ShoppingBag, Search, Menu, X, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useStore } from "@/store/useStore";
import { useAuthStore } from "@/store/useAuthStore";
import { CartSheet } from "@/components/cart-sheet";
import { WishlistSheet } from "@/components/wishlist-sheet";
import { SearchDialog } from "@/components/search-dialog";
import { LoginDialog } from "@/components/auth/login-dialog";
import { SignupDialog } from "@/components/auth/signup-dialog";
import { UserMenu } from "@/components/auth/user-menu";

interface Props {
  className?: string;
  spanClassName?: string;
}

const Navbar = ({ className, spanClassName }: Props) => {
  const pathname = usePathname();
  const [searchDialogOpen, setSearchDialogOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);

  const { cart, wishlist } = useStore();
  const { isAuthenticated } = useAuthStore();

  const navigation = [
    { _id: 910, title: "Home", href: "/" },
    { _id: 911, title: "Phones", href: "/phones" },
    { _id: 912, title: "Phone Cases", href: "/phonecases" },
    { _id: 913, title: "Watches", href: "/watches" },
    { _id: 915, title: "Fragrance", href: "/fragrance" },
    { _id: 914, title: "Accessories", href: "/accessories" },
  ];

  return (
    <>
      {/* Top Bar - AliExpress Style */}
      <div className="bg-[#07120a] text-white text-xs py-1.5 hidden md:block">
        <div className="max-w-screen-2xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span>Free Shipping Worldwide</span>
            <span className="hidden lg:inline">|</span>
            <span className="hidden lg:inline">Buyer Protection</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="#" className="hover:underline">Help</Link>
            <Link href="#" className="hover:underline">Contact Us</Link>
          </div>
        </div>
      </div>

      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="w-full bg-white border-b sticky top-0 z-50 shadow-sm"
      >
        <div className="max-w-screen-2xl mx-auto px-4 h-20 flex items-center justify-between gap-4">
          {/* Logo - AliExpress Style */}
          <Link
            href="/"
            className={cn(
              "flex items-center justify-center h-full min-w-[120px]",
              className
            )}
          >
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-[#07120a] to-[#0d1f12] rounded flex items-center justify-center">
                <span className="text-white font-bold text-xl">N</span>
              </div>
              <span className="hidden sm:inline text-xl font-bold text-[#07120a]">
                iceShop
              </span>
            </div>
          </Link>

          {/* Search Bar - AliExpress Style */}
          <div className="flex-1 max-w-2xl hidden md:flex">
            <div className="relative w-full flex">
              <Input
                type="text"
                placeholder="Search for products, brands and more"
                className="w-full h-10 rounded-l-md rounded-r-none border-2 border-[#07120a] focus-visible:ring-0 focus-visible:ring-offset-0 pr-20"
                onFocus={() => setSearchDialogOpen(true)}
              />
              <Button
                className="h-10 rounded-l-none rounded-r-md bg-[#07120a] hover:bg-[#0d1f12] px-8"
                onClick={() => setSearchDialogOpen(true)}
              >
                <Search className="w-5 h-5" />
              </Button>
            </div>
          </div>


          {/* Desktop Actions - AliExpress Style */}
          <div className="hidden md:flex items-center gap-4">
            {/* Wishlist */}
            <Button
              variant="ghost"
              size="sm"
              className="relative text-gray-700 hover:text-[#07120a]"
              onClick={() => setWishlistOpen(true)}
            >
              <Heart className="h-5 w-5 mr-1" />
              <span className="text-xs">Wishlist</span>
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white w-4 h-4 rounded-full text-xs flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Button>

            {/* Cart - AliExpress Style */}
            <Button
              variant="ghost"
              size="sm"
              className="relative text-gray-700 hover:text-[#07120a]"
              onClick={() => setCartOpen(true)}
            >
              <ShoppingBag className="h-5 w-5 mr-1" />
              <span className="text-xs">Cart</span>
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white w-4 h-4 rounded-full text-xs flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </Button>

            {/* User/Auth */}
            {isAuthenticated ? (
              <UserMenu />
            ) : (
              <Button
                variant="outline"
                size="sm"
                className="border-[#07120a] text-[#07120a] hover:bg-[#07120a] hover:text-white"
                onClick={() => setLoginOpen(true)}
              >
                <LogIn className="h-4 w-4 mr-1" />
                Sign In
              </Button>
            )}
          </div>

          {/* Mobile Search */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setSearchDialogOpen(true)}
          >
            <Search className="h-5 w-5" />
          </Button>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden bg-white border-t overflow-hidden"
            >
              <nav className="flex flex-col p-4 space-y-3">
                {navigation.map((item) => (
                  <Link
                    key={item._id}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <motion.div
                      whileTap={{ scale: 0.95 }}
                      className={cn(
                        "p-2 rounded-md transition-colors hover:bg-gray-100",
                        item.href === pathname && "bg-designColor/10 text-designColor font-semibold"
                      )}
                    >
                      {item.title}
                    </motion.div>
                  </Link>
                ))}
                <div className="flex items-center gap-3 pt-4 border-t">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      setWishlistOpen(true);
                      setMobileMenuOpen(false);
                    }}
                  >
                    <Heart className="h-4 w-4 mr-2" />
                    Wishlist ({wishlist.length})
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      setCartOpen(true);
                      setMobileMenuOpen(false);
                    }}
                  >
                    <ShoppingBag className="h-4 w-4 mr-2" />
                    Cart ({cart.length})
                  </Button>
                </div>
                {isAuthenticated ? (
                  <div className="flex items-center gap-3 pt-4 border-t">
                    <UserMenu />
                    <span className="text-sm">My Account</span>
                  </div>
                ) : (
                  <Button
                    className="w-full"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setLoginOpen(true);
                    }}
                  >
                    <LogIn className="h-4 w-4 mr-2" />
                    Login
                  </Button>
                )}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Cart Sheet */}
      <CartSheet open={cartOpen} onOpenChange={setCartOpen} />

      {/* Wishlist Sheet */}
      <WishlistSheet open={wishlistOpen} onOpenChange={setWishlistOpen} />

      {/* Search Dialog */}
      <SearchDialog open={searchDialogOpen} onOpenChange={setSearchDialogOpen} />

      {/* Auth Dialogs */}
      <LoginDialog
        open={loginOpen}
        onOpenChange={setLoginOpen}
        onSwitchToSignup={() => setSignupOpen(true)}
      />
      <SignupDialog
        open={signupOpen}
        onOpenChange={setSignupOpen}
        onSwitchToLogin={() => setLoginOpen(true)}
      />
    </>
  );
};

export default Navbar;

