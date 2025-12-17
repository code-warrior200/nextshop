"use client";

import { useStore } from "@/store/useStore";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import FormattedPrice from "@/app/components/FormattedPrice";

interface WishlistSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function WishlistSheet({ open, onOpenChange }: WishlistSheetProps) {
  const { wishlist, removeFromWishlist, addToCart } = useStore();

  const handleAddToCart = (product: any) => {
    addToCart(product);
    removeFromWishlist(product._id);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Heart className="w-5 h-5" />
            Wishlist ({wishlist.length})
          </SheetTitle>
        </SheetHeader>

        {wishlist.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4">
            <Heart className="w-20 h-20 text-muted-foreground" />
            <p className="text-lg text-muted-foreground">
              Your wishlist is empty
            </p>
            <Button onClick={() => onOpenChange(false)}>
              Continue Shopping
            </Button>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto py-4">
            <AnimatePresence>
              {wishlist.map((item) => (
                <motion.div
                  key={item._id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex gap-4 py-4 border-b"
                >
                  <Link
                    href={`/${item._id}`}
                    className="relative w-24 h-24 rounded-lg overflow-hidden bg-gray-100"
                    onClick={() => onOpenChange(false)}
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </Link>
                  <div className="flex-1 flex flex-col">
                    <Link
                      href={`/${item._id}`}
                      onClick={() => onOpenChange(false)}
                    >
                      <h4 className="font-medium text-sm line-clamp-2 hover:text-designColor transition-colors">
                        {item.title}
                      </h4>
                    </Link>
                    <p className="text-sm font-semibold mt-1">
                      <FormattedPrice amount={item.price} className="" />
                    </p>
                    <div className="flex items-center gap-2 mt-auto">
                      <Button
                        size="sm"
                        className="h-8"
                        onClick={() => handleAddToCart(item)}
                      >
                        <ShoppingCart className="h-3 w-3 mr-1" />
                        Add to Cart
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => removeFromWishlist(item._id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}

