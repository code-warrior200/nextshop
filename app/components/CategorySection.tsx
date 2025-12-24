"use client";

import Container from "./Container";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Product from "./Product";
import { ProductType } from "@/type";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface CategorySectionProps {
  category: {
    id: string;
    name: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
  };
  products: ProductType[];
  index: number;
}

export function CategorySection({ category, products, index }: CategorySectionProps) {
  if (products.length === 0) return null;

  const Icon = category.icon;
  const displayProducts = products.slice(0, 8); // Show 8 products per category

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="py-12"
    >
      <Container>
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#ff6a00] to-[#ff8a00] flex items-center justify-center">
              <Icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold">{category.name}</h2>
              <p className="text-sm text-muted-foreground">
                {products.length} product{products.length !== 1 ? 's' : ''} available
              </p>
            </div>
          </div>
          <Button variant="outline" className="border-[#ff6a00] text-[#ff6a00] hover:bg-[#ff6a00] hover:text-white" asChild>
            <Link href={category.href}>
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <Product products={displayProducts} />

        {products.length > 8 && (
          <div className="mt-8 text-center">
            <Button variant="outline" className="border-[#ff6a00] text-[#ff6a00] hover:bg-[#ff6a00] hover:text-white" asChild>
              <Link href={category.href}>
                View All {products.length} Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        )}

        {index < 3 && <Separator className="mt-8" />}
      </Container>
    </motion.section>
  );
}

