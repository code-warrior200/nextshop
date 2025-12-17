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
    { _id: 914, title: "Accessories", href: "/accessories" },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="w-full h-20 border-b bg-white/80 backdrop-blur-xl sticky top-0 z-50"
      >
        <div className="max-w-screen-xl mx-auto h-full flex items-center justify-between px-4 xl:px-0">
          {/* Logo */}
          <Link
            href="/"
            className={cn(
              "text-zinc-950 text-xl font-bold group flex items-center",
              className
            )}
          >
            <motion.span
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.3 }}
              className={cn(
                "bg-zinc-950 text-white w-8 h-8 rounded-full inline-flex items-center justify-center text-xl font-bold mr-2",
                spanClassName
              )}
            >
              N
            </motion.span>
            <span className="hidden sm:inline">
              ice<span className="text-designColor">Shop</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            {navigation.map((item) => (
              <Link key={item._id} href={item.href}>
                <motion.div
                  whileHover={{ y: -2 }}
                  className={cn(
                    "relative cursor-pointer transition-colors hover:text-designColor",
                    item.href === pathname && "text-designColor"
                  )}
                >
                  {item.title}
                  {item.href === pathname && (
                    <motion.span
                      layoutId="navbar-indicator"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-designColor"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </motion.div>
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* Search */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSearchDialogOpen(true)}
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Wishlist */}
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={() => setWishlistOpen(true)}
            >
              <Heart className="h-5 w-5" />
              {wishlist.length > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-designColor text-white w-5 h-5 rounded-full text-xs flex items-center justify-center font-semibold"
                >
                  {wishlist.length}
                </motion.span>
              )}
            </Button>

            {/* Cart */}
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={() => setCartOpen(true)}
            >
              <ShoppingBag className="h-5 w-5" />
              {cart.length > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-designColor text-white w-5 h-5 rounded-full text-xs flex items-center justify-center font-semibold"
                >
                  {cart.length}
                </motion.span>
              )}
            </Button>

            {isAuthenticated ? (
              <UserMenu />
            ) : (
              <Button
                variant="default"
                size="sm"
                onClick={() => setLoginOpen(true)}
              >
                <LogIn className="h-4 w-4 mr-2" />
                Login
              </Button>
            )}
          </div>

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

