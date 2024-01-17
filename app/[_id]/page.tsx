import { ProductType } from "@/type";
import { getProducts } from "../helpers";

type Props={
    searchParams:{
        [key:string]:string |string[] | undefined
    };
};

const page = async({searchParams}: any) => {
    const products = await getProducts();
    const _idString = searchParams?._id;
    const _id =  Number(_idString);
    
    const singleProduct = (_id:number)=>{
        const item = products.find((product:ProductType)=>product._id === _id);
        return item;
    };
    

    const product = singleProduct(_id)
    console.log(product);



  return (
    <div>Product page</div>
  )
};

export default page;