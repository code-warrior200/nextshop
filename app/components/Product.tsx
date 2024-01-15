/* eslint-disable react/jsx-key */
'use client'
import Link from "next/link";
import { ProductType } from "@/type";
import Image from "next/image";

interface Item{
  products: ProductType[];
}

const Product = ({products}:Item) => {
  return <div>
      {
        products.map((item)=>(
          <div>
            <Link href={'/'}>
              <Image src={item.image} alt="Product image" width={500} height={500}/>
            </Link>
          </div>
        ))
      }
    </div>;
};

export default Product;