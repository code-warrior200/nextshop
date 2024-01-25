import { cn } from "../lib/utils";
//import clsx from "clsx";

type Props={
    amount:number,
    className:string;
};


const FomattedPrice = ({amount,className}:Props) => {
    const formattedAmount = new Number(amount).toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 2,
    })
  return (
    <span className={cn("text-base text-black", className)}>{formattedAmount}</span>
  )
};

export default FomattedPrice;