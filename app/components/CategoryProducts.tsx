"use client";

import { CategorySection } from "./CategorySection";
import { ProductType } from "@/type";
import { 
  Home, 
  Smartphone, 
  Shirt, 
  Sparkles, 
  Car, 
  Dumbbell, 
  Gamepad2, 
  Heart 
} from "lucide-react";

interface CategoryProductsProps {
  productsByCategory: {
    'home-garden': ProductType[];
    'consumer-electronics': ProductType[];
    'fashion-apparel': ProductType[];
    'beauty-health': ProductType[];
    'automobiles': ProductType[];
    'sports-entertainment': ProductType[];
    'toys-hobbies': ProductType[];
    'health-household': ProductType[];
  };
}

const categories = [
  { id: 'home-garden', name: 'Home & Garden', href: '/home-garden', icon: Home },
  { id: 'consumer-electronics', name: 'Consumer Electronics', href: '/consumer-electronics', icon: Smartphone },
  { id: 'fashion-apparel', name: 'Fashion & Apparel', href: '/fashion-apparel', icon: Shirt },
  { id: 'beauty-health', name: 'Beauty & Health', href: '/beauty-health', icon: Sparkles },
  { id: 'automobiles', name: 'Automobiles & Motorcycles', href: '/automobiles', icon: Car },
  { id: 'sports-entertainment', name: 'Sports & Entertainment', href: '/sports-entertainment', icon: Dumbbell },
  { id: 'toys-hobbies', name: 'Toys & Hobbies', href: '/toys-hobbies', icon: Gamepad2 },
  { id: 'health-household', name: 'Health & Household', href: '/health-household', icon: Heart },
];

export function CategoryProducts({ productsByCategory }: CategoryProductsProps) {
  return (
    <>
      {categories.map((category, index) => {
        const categoryProducts = productsByCategory[category.id as keyof typeof productsByCategory] || [];
        if (categoryProducts.length === 0) return null;
        
        return (
          <CategorySection
            key={category.id}
            category={category}
            products={categoryProducts}
            index={index}
          />
        );
      })}
    </>
  );
}

