"use client";

import Link from "next/link";
import { ProductType } from "@/type";
import Image from "next/image";
import { Heart, ShoppingCart, Eye, Star } from "lucide-react";
import FormattedPrice from "./FormattedPrice";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useStore } from "@/store/useStore";
import { toast } from "sonner";

interface Item {
  products: ProductType[];
}

const Product = ({ products }: Item) => {
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useStore();

  const handleAddToCart = (product: ProductType) => {
    addToCart(product);
    toast.success("Added to cart!", {
      description: product.title,
    });
  };

  const handleWishlistToggle = (product: ProductType) => {
    if (isInWishlist(product._id)) {
      removeFromWishlist(product._id);
      toast.info("Removed from wishlist");
    } else {
      addToWishlist(product);
      toast.success("Added to wishlist!");
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-10"
    >
      {products.map((product) => (
        <motion.div key={product._id} variants={item}>
          <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-[#07120a]/50 bg-white">
            <div className="relative aspect-square overflow-hidden bg-gray-50">
              <Link
                href={{
                  pathname: `/${product._id}`,
                  query: { _id: product._id },
                }}
              >
                <Image
                  src={product.image}
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  alt={product.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
              </Link>

              {/* Badges - AliExpress Style */}
              <div className="absolute top-2 left-2 flex flex-col gap-2">
                {product.isNew && (
                  <Badge className="bg-[#07120a] hover:bg-[#0d1f12] border-0 text-white">
                    New
                  </Badge>
                )}
                {product.previousPrice > product.price && (
                  <Badge className="bg-red-500 hover:bg-red-600 border-0 text-white font-semibold">
                    -{Math.round(
                      ((product.previousPrice - product.price) /
                        product.previousPrice) *
                        100
                    )}%
                  </Badge>
                )}
              </div>

              {/* Wishlist Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleWishlistToggle(product)}
                className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors"
              >
                <Heart
                  className={`w-5 h-5 transition-colors ${
                    isInWishlist(product._id)
                      ? "fill-red-500 text-red-500"
                      : "text-zinc-600"
                  }`}
                />
              </motion.button>

              {/* Quick View */}
              <Link
                href={{
                  pathname: `/${product._id}`,
                  query: { _id: product._id },
                }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Button
                    variant="secondary"
                    size="sm"
                    className="w-full"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Quick View
                  </Button>
                </motion.div>
              </Link>
            </div>

            <CardContent className="p-4">
              <Link
                href={{
                  pathname: `/${product._id}`,
                  query: { _id: product._id },
                }}
              >
                <h3 className="font-medium text-sm line-clamp-2 hover:text-[#07120a] transition-colors mb-2 text-gray-800">
                  {product.title}
                </h3>
              </Link>
              
              {/* Rating - AliExpress Style */}
              <div className="flex items-center gap-1 mb-2">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-3 h-3 ${
                        star <= 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-500">(128)</span>
              </div>

              <div className="flex items-center gap-2 mb-2">
                <p className="font-bold text-lg text-[#07120a]">
                  <FormattedPrice amount={product.price} className="" />
                </p>
                {product.previousPrice > product.price && (
                  <>
                    <p className="text-sm text-gray-400 line-through">
                      <FormattedPrice
                        amount={product.previousPrice}
                        className=""
                      />
                    </p>
                    <span className="text-xs text-red-500 font-medium">
                      -{Math.round(((product.previousPrice - product.price) / product.previousPrice) * 100)}%
                    </span>
                  </>
                )}
              </div>
              
              <p className="text-xs text-gray-500">
                Free Shipping
              </p>
            </CardContent>

            <CardFooter className="p-4 pt-0">
              <Button
                className="w-full bg-[#07120a] hover:bg-[#0d1f12] text-white"
                onClick={() => handleAddToCart(product)}
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default Product;