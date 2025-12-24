"use client";

import Container from "./Container";
import Link from "next/link";
import { PcCase, ScanFace, Smartphone, Watch, Grid3x3, LayoutGrid, ArrowUpDown, Filter, Sparkles } from "lucide-react";
import Product from "./Product";
import { ProductType } from "@/type";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useState, useMemo } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ProductsProps {
  products: ProductType[];
}

const categories = [
  { id: "all", name: "All Products", href: "/", icon: LayoutGrid },
  { id: "phone", name: "Phones", href: "/phones", icon: Smartphone },
  { id: "watch", name: "Watches", href: "/watches", icon: Watch },
  { id: "phone case", name: "Phone Cases", href: "/phonecases", icon: PcCase },
  { id: "fragrance", name: "Fragrance", href: "/fragrance", icon: Sparkles },
  { id: "accessories", name: "Accessories", href: "/accessories", icon: ScanFace },
];

type SortOption = 'default' | 'price-low' | 'price-high' | 'name-asc' | 'name-desc' | 'newest';

const Products = ({ products }: ProductsProps) => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState<SortOption>('default');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);

  const filteredProducts = useMemo(() => {
    let filtered = selectedCategory === "all"
      ? products
      : products.filter((product) => product.category === selectedCategory);

    // Filter by price range
    filtered = filtered.filter(
      (product) => product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered = [...filtered].sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered = [...filtered].sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        filtered = [...filtered].sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'name-desc':
        filtered = [...filtered].sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'newest':
        filtered = [...filtered].sort((a, b) => {
          const aNew = a.isNew ? 1 : 0;
          const bNew = b.isNew ? 1 : 0;
          return bNew - aNew;
        });
        break;
      default:
        break;
    }

    return filtered;
  }, [products, selectedCategory, sortBy, priceRange]);

  return (
    <div className="py-16 lg:py-24">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-4 items-center mb-12"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl lg:text-4xl font-bold text-center"
          >
            Explore Our Collection
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg text-muted-foreground text-center max-w-2xl"
          >
            Discover amazing products from top brands with exclusive deals and fast shipping
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-3 mt-6"
          >
            {categories.map((category, index) => {
              const Icon = category.icon;
              const isActive = selectedCategory === category.id;

              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Button
                    variant={isActive ? "default" : "outline"}
                    className={`flex items-center gap-2 ${
                      isActive
                        ? "bg-designColor hover:bg-designColor/90"
                        : "hover:border-designColor"
                    }`}
                    onClick={() => setSelectedCategory(category.id)}
                    asChild={category.id !== "all"}
                  >
                    {category.id === "all" ? (
                      <div>
                        <Icon className="w-4 h-4" />
                        <span>{category.name}</span>
                      </div>
                    ) : (
                      <Link href={category.href}>
                        <Icon className="w-4 h-4" />
                        <span>{category.name}</span>
                      </Link>
                    )}
                  </Button>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

        <Separator className="my-8" />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6"
        >
          <p className="text-sm text-muted-foreground">
            Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
          </p>
          
          <div className="flex items-center gap-3">
            <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
              <SelectTrigger className="w-[180px]">
                <ArrowUpDown className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Default</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="name-asc">Name: A to Z</SelectItem>
                <SelectItem value="name-desc">Name: Z to A</SelectItem>
                <SelectItem value="newest">Newest First</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </motion.div>

        <Product products={filteredProducts} />
      </Container>
    </div>
  );
};

export default Products;