"use client";

import { ProductType } from "@/type";
import Product from "./Product";
import Container from "./Container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Zap, ArrowRight } from "lucide-react";
import Link from "next/link";

interface FlashSaleProps {
  products: ProductType[];
}

export function FlashSale({ products }: FlashSaleProps) {
  // Get products with discounts (highest discount first)
  const flashProducts = products
    .filter(p => p.previousPrice > p.price)
    .sort((a, b) => {
      const discountA = ((a.previousPrice - a.price) / a.previousPrice) * 100;
      const discountB = ((b.previousPrice - b.price) / b.previousPrice) * 100;
      return discountB - discountA;
    })
    .slice(0, 8);

  if (flashProducts.length === 0) return null;

  return (
    <section className="py-8 bg-gradient-to-r from-red-50 to-orange-50">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-[#07120a] to-red-500 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Flash Sale</h2>
                <p className="text-sm text-gray-600">Limited time offers - Don&apos;t miss out!</p>
              </div>
            </div>
            <Button variant="outline" className="border-[#07120a] text-[#07120a] hover:bg-[#07120a] hover:text-white" asChild>
              <Link href="/">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </motion.div>

        <Product products={flashProducts} />
      </Container>
    </section>
  );
}

