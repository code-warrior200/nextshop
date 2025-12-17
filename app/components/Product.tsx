"use client";

import Link from "next/link";
import { ProductType } from "@/type";
import Image from "next/image";
import { Heart, ShoppingCart, Eye } from "lucide-react";
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
          <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 hover:border-designColor/50">
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

              {/* Badges */}
              <div className="absolute top-3 left-3 flex flex-col gap-2">
                {product.isNew && (
                  <Badge className="bg-designColor hover:bg-designColor/90">
                    New
                  </Badge>
                )}
                {product.previousPrice > product.price && (
                  <Badge variant="destructive">
                    Save{" "}
                    {Math.round(
                      ((product.previousPrice - product.price) /
                        product.previousPrice) *
                        100
                    )}
                    %
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
                <h3 className="font-medium text-sm line-clamp-2 hover:text-designColor transition-colors mb-2">
                  {product.title}
                </h3>
              </Link>
              <p className="text-xs text-muted-foreground mb-2">
                {product.brand}
              </p>
              <div className="flex items-center gap-2">
                <p className="font-bold text-lg">
                  <FormattedPrice amount={product.price} className="" />
                </p>
                {product.previousPrice > product.price && (
                  <p className="text-sm text-muted-foreground line-through">
                    <FormattedPrice
                      amount={product.previousPrice}
                      className=""
                    />
                  </p>
                )}
              </div>
            </CardContent>

            <CardFooter className="p-4 pt-0">
              <Button
                className="w-full bg-designColor hover:bg-designColor/90"
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