type Props={
    amount:number,
    className:string;
};


const FomattedPrice = ({amount}:Props) => {
    const formattedAmount = new Number(amount).toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 2,
    })
  return (
    <span>{formattedAmount}</span>
  )
};

export default FomattedPrice;