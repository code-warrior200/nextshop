"use client";

import Link from "next/link";
import { 
  Home, 
  Smartphone, 
  Shirt, 
  Sparkles, 
  Car, 
  Dumbbell, 
  Gamepad2, 
  Heart,
  Menu 
} from "lucide-react";
import { motion } from "framer-motion";
import Container from "./Container";

const categories = [
  { id: 'home-garden', name: 'Home & Garden', href: '/home-garden', icon: Home, color: 'bg-green-500' },
  { id: 'consumer-electronics', name: 'Consumer Electronics', href: '/consumer-electronics', icon: Smartphone, color: 'bg-blue-500' },
  { id: 'fashion-apparel', name: 'Fashion & Apparel', href: '/fashion-apparel', icon: Shirt, color: 'bg-pink-500' },
  { id: 'beauty-health', name: 'Beauty & Health', href: '/beauty-health', icon: Sparkles, color: 'bg-purple-500' },
  { id: 'automobiles', name: 'Automobiles & Motorcycles', href: '/automobiles', icon: Car, color: 'bg-red-500' },
  { id: 'sports-entertainment', name: 'Sports & Entertainment', href: '/sports-entertainment', icon: Dumbbell, color: 'bg-orange-500' },
  { id: 'toys-hobbies', name: 'Toys & Hobbies', href: '/toys-hobbies', icon: Gamepad2, color: 'bg-yellow-500' },
  { id: 'health-household', name: 'Health & Household', href: '/health-household', icon: Heart, color: 'bg-rose-500' },
];

export function CategoryMenu() {
  return (
    <div className="bg-white border-b shadow-sm">
      <Container>
        <div className="flex items-center gap-6 py-3 overflow-x-auto">
          {/* All Categories Button */}
          <button className="flex items-center gap-2 px-4 py-2 bg-[#ff6a00] text-white rounded-md hover:bg-[#ff8a00] transition-colors whitespace-nowrap">
            <Menu className="w-5 h-5" />
            <span className="font-medium">All Categories</span>
          </button>

          {/* Category Links */}
          <div className="flex items-center gap-6">
            {categories.map((category, index) => {
              const Icon = category.icon;
              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={category.href}
                    className="flex items-center gap-2 text-gray-700 hover:text-[#ff6a00] transition-colors whitespace-nowrap group"
                  >
                    <div className={`w-8 h-8 ${category.color} rounded flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm font-medium">{category.name}</span>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Container>
    </div>
  );
}

