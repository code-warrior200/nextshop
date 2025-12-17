"use client";

import { ProductType } from "@/type";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Container from "../components/Container";
import Image from "next/image";
import FormattedPrice from "../components/FormattedPrice";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import {
  Heart,
  ShoppingCart,
  Truck,
  Shield,
  RotateCcw,
  Star,
  Plus,
  Minus,
  Share2,
} from "lucide-react";
import { useStore } from "@/store/useStore";
import { toast } from "sonner";
import { getProducts } from "../helpers";

const ProductDetailPage = () => {
  const searchParams = useSearchParams();
  const _id = Number(searchParams.get("_id"));
  const [product, setProduct] = useState<ProductType | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } =
    useStore();

  useEffect(() => {
    const fetchProduct = async () => {
      const products = await getProducts();
      const foundProduct = products.find(
        (product: ProductType) => product._id === _id
      );
      setProduct(foundProduct || null);
      setLoading(false);
    };

    fetchProduct();
  }, [_id]);

  if (loading) {
    return (
      <Container className="py-20">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-designColor"></div>
        </div>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container className="py-20">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Product not found</h2>
          <Button asChild>
            <a href="/">Back to Home</a>
          </Button>
        </div>
      </Container>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    toast.success(`Added ${quantity} item(s) to cart!`);
  };

  const handleWishlistToggle = () => {
    if (isInWishlist(product._id)) {
      removeFromWishlist(product._id);
      toast.info("Removed from wishlist");
    } else {
      addToWishlist(product);
      toast.success("Added to wishlist!");
    }
  };

  const discountPercentage = Math.round(
    ((product.previousPrice - product.price) / product.previousPrice) * 100
  );

  const features = [
    {
      icon: Truck,
      title: "Free Shipping",
      description: "On orders over $50",
    },
    {
      icon: Shield,
      title: "Secure Payment",
      description: "100% secure payment",
    },
    {
      icon: RotateCcw,
      title: "Easy Returns",
      description: "30 days return policy",
    },
  ];

  return (
    <Container className="py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="overflow-hidden sticky top-24">
            <CardContent className="p-0">
              <div className="relative aspect-square bg-gray-50">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover"
                  priority
                />
                {product.isNew && (
                  <Badge className="absolute top-4 left-4 bg-designColor hover:bg-designColor/90">
                    New Arrival
                  </Badge>
                )}
                {discountPercentage > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute top-4 right-4"
                  >
                    Save {discountPercentage}%
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Product Info Section */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          {/* Brand & Title */}
          <div>
            <p className="text-sm text-muted-foreground uppercase tracking-wide mb-2">
              {product.brand}
            </p>
            <h1 className="text-3xl lg:text-4xl font-bold mb-4">
              {product.title}
            </h1>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-designColor text-designColor"
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                (128 reviews)
              </span>
            </div>
          </div>

          {/* Price Section */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-baseline gap-4 mb-2">
                <span className="text-4xl font-bold">
                  <FormattedPrice amount={product.price} className="" />
                </span>
                {product.previousPrice > product.price && (
                  <span className="text-xl text-muted-foreground line-through">
                    <FormattedPrice
                      amount={product.previousPrice}
                      className=""
                    />
                  </span>
                )}
              </div>
              {product.previousPrice > product.price && (
                <p className="text-sm text-green-600 font-medium">
                  You save{" "}
                  <FormattedPrice
                    amount={product.previousPrice - product.price}
                    className=""
                  />{" "}
                  ({discountPercentage}% off)
                </p>
              )}
            </CardContent>
          </Card>

          {/* Description */}
          <div>
            <h3 className="font-semibold mb-2">Description</h3>
            <p className="text-muted-foreground">{product.description}</p>
          </div>

          <Separator />

          {/* Quantity Selector */}
          <div>
            <label className="font-semibold mb-3 block">Quantity</label>
            <div className="flex items-center gap-4">
              <div className="flex items-center border rounded-lg">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center font-semibold">
                  {quantity}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <Badge variant="secondary">
                {product.quantity} in stock
              </Badge>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              size="lg"
              className="flex-1 bg-designColor hover:bg-designColor/90"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Add to Cart
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={handleWishlistToggle}
            >
              <Heart
                className={`w-5 h-5 ${
                  isInWishlist(product._id)
                    ? "fill-red-500 text-red-500"
                    : ""
                }`}
              />
            </Button>
            <Button size="lg" variant="outline">
              <Share2 className="w-5 h-5" />
            </Button>
          </div>

          {/* Features */}
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="flex flex-col items-center text-center"
                  >
                    <div className="w-12 h-12 rounded-full bg-designColor/10 flex items-center justify-center mb-3">
                      <feature.icon className="w-6 h-6 text-designColor" />
                    </div>
                    <h4 className="font-semibold mb-1">{feature.title}</h4>
                    <p className="text-xs text-muted-foreground">
                      {feature.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Product Meta */}
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">SKU:</span>
              <span className="font-medium">{product._id}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Category:</span>
              <Badge variant="secondary">{product.category}</Badge>
            </div>
          </div>
        </motion.div>
      </div>
    </Container>
  );
};

export default ProductDetailPage;
