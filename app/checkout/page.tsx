"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/store/useStore";
import { useAuthStore } from "@/store/useAuthStore";
import { useOrderStore, ShippingAddress, PaymentMethod } from "@/store/useOrderStore";
import Container from "../components/Container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import FormattedPrice from "../components/FormattedPrice";
import { toast } from "sonner";
import { ArrowLeft, Check, CreditCard, MapPin, Package, Truck } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

type Step = 'address' | 'payment' | 'review' | 'success';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, clearCart } = useStore();
  const { user, isAuthenticated } = useAuthStore();
  const { createOrder, defaultAddress, addShippingAddress, setDefaultAddress } = useOrderStore();
  
  const [currentStep, setCurrentStep] = useState<Step>('address');
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    fullName: defaultAddress?.fullName || user?.name || '',
    address: defaultAddress?.address || '',
    city: defaultAddress?.city || '',
    state: defaultAddress?.state || '',
    zipCode: defaultAddress?.zipCode || '',
    country: defaultAddress?.country || 'United States',
    phone: defaultAddress?.phone || '',
  });
  
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>({
    type: 'card',
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
  });

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("Please login to checkout");
      router.push('/');
      return;
    }
    
    if (cart.length === 0 && currentStep !== 'success') {
      toast.error("Your cart is empty");
      router.push('/');
    }
  }, [cart, isAuthenticated, router, currentStep]);

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.cartQuantity), 0);
  const shippingCost = subtotal > 100 ? 0 : 10;
  const tax = subtotal * 0.08;
  const total = subtotal + shippingCost + tax;

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep('payment');
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep('review');
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    
    try {
      // Save address
      addShippingAddress(shippingAddress);
      setDefaultAddress(shippingAddress);
      
      // Create order
      const orderItems = cart.map(item => ({
        productId: item._id,
        title: item.title,
        image: item.image,
        price: item.price,
        quantity: item.cartQuantity,
        brand: item.brand,
      }));
      
      const order = await createOrder(orderItems, shippingAddress, paymentMethod, user?.id);
      
      // Clear cart
      clearCart();
      
      setCurrentStep('success');
      toast.success("Order placed successfully!");
      
      // Redirect to order confirmation after 3 seconds
      setTimeout(() => {
        router.push(`/orders/${order.id}`);
      }, 3000);
    } catch (error) {
      toast.error("Failed to place order. Please try again.");
      setIsProcessing(false);
    }
  };

  if (!isAuthenticated || cart.length === 0) {
    return null;
  }

  if (currentStep === 'success') {
    return (
      <Container className="py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Order Placed Successfully!</h1>
          <p className="text-muted-foreground mb-8">
            Thank you for your purchase. You will receive a confirmation email shortly.
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild>
              <Link href="/orders">View Orders</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/">Continue Shopping</Link>
            </Button>
          </div>
        </motion.div>
      </Container>
    );
  }

  const steps = [
    { id: 'address', label: 'Shipping', icon: MapPin },
    { id: 'payment', label: 'Payment', icon: CreditCard },
    { id: 'review', label: 'Review', icon: Package },
  ];

  return (
    <Container className="py-8">
      <div className="mb-6">
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Cart
          </Link>
        </Button>
        
        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-8">
          {steps.map((step, index) => {
            const StepIcon = step.icon;
            const isActive = steps.findIndex(s => s.id === currentStep) >= index;
            const isCurrent = step.id === currentStep;
            
            return (
              <div key={step.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      isActive
                        ? 'bg-designColor text-white'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    <StepIcon className="w-5 h-5" />
                  </div>
                  <span className={`mt-2 text-sm ${isActive ? 'font-semibold' : ''}`}>
                    {step.label}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`h-1 flex-1 mx-2 ${
                      isActive ? 'bg-designColor' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            {currentStep === 'address' && (
              <motion.div
                key="address"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Shipping Address</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleAddressSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="fullName">Full Name *</Label>
                          <Input
                            id="fullName"
                            value={shippingAddress.fullName}
                            onChange={(e) =>
                              setShippingAddress({ ...shippingAddress, fullName: e.target.value })
                            }
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number *</Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={shippingAddress.phone}
                            onChange={(e) =>
                              setShippingAddress({ ...shippingAddress, phone: e.target.value })
                            }
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="address">Address *</Label>
                        <Input
                          id="address"
                          value={shippingAddress.address}
                          onChange={(e) =>
                            setShippingAddress({ ...shippingAddress, address: e.target.value })
                          }
                          required
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="city">City *</Label>
                          <Input
                            id="city"
                            value={shippingAddress.city}
                            onChange={(e) =>
                              setShippingAddress({ ...shippingAddress, city: e.target.value })
                            }
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="state">State *</Label>
                          <Input
                            id="state"
                            value={shippingAddress.state}
                            onChange={(e) =>
                              setShippingAddress({ ...shippingAddress, state: e.target.value })
                            }
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="zipCode">Zip Code *</Label>
                          <Input
                            id="zipCode"
                            value={shippingAddress.zipCode}
                            onChange={(e) =>
                              setShippingAddress({ ...shippingAddress, zipCode: e.target.value })
                            }
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="country">Country *</Label>
                        <Input
                          id="country"
                          value={shippingAddress.country}
                          onChange={(e) =>
                            setShippingAddress({ ...shippingAddress, country: e.target.value })
                          }
                          required
                        />
                      </div>
                      
                      <Button type="submit" className="w-full bg-designColor">
                        Continue to Payment
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {currentStep === 'payment' && (
              <motion.div
                key="payment"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Payment Method</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4 mb-6">
                      <Button
                        type="button"
                        variant={paymentMethod.type === 'card' ? 'default' : 'outline'}
                        className="w-full"
                        onClick={() => setPaymentMethod({ ...paymentMethod, type: 'card' })}
                      >
                        <CreditCard className="mr-2 h-4 w-4" />
                        Credit/Debit Card
                      </Button>
                      <Button
                        type="button"
                        variant={paymentMethod.type === 'paypal' ? 'default' : 'outline'}
                        className="w-full"
                        onClick={() => setPaymentMethod({ ...paymentMethod, type: 'paypal' })}
                      >
                        PayPal
                      </Button>
                      <Button
                        type="button"
                        variant={paymentMethod.type === 'cash' ? 'default' : 'outline'}
                        className="w-full"
                        onClick={() => setPaymentMethod({ ...paymentMethod, type: 'cash' })}
                      >
                        Cash on Delivery
                      </Button>
                    </div>

                    {paymentMethod.type === 'card' && (
                      <form onSubmit={handlePaymentSubmit} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="cardNumber">Card Number *</Label>
                          <Input
                            id="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            value={paymentMethod.cardNumber}
                            onChange={(e) =>
                              setPaymentMethod({ ...paymentMethod, cardNumber: e.target.value })
                            }
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cardHolder">Card Holder Name *</Label>
                          <Input
                            id="cardHolder"
                            placeholder="John Doe"
                            value={paymentMethod.cardHolder}
                            onChange={(e) =>
                              setPaymentMethod({ ...paymentMethod, cardHolder: e.target.value })
                            }
                            required
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="expiryDate">Expiry Date *</Label>
                            <Input
                              id="expiryDate"
                              placeholder="MM/YY"
                              value={paymentMethod.expiryDate}
                              onChange={(e) =>
                                setPaymentMethod({ ...paymentMethod, expiryDate: e.target.value })
                              }
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cvv">CVV *</Label>
                            <Input
                              id="cvv"
                              placeholder="123"
                              value={paymentMethod.cvv}
                              onChange={(e) =>
                                setPaymentMethod({ ...paymentMethod, cvv: e.target.value })
                              }
                              required
                            />
                          </div>
                        </div>
                        <Button type="submit" className="w-full bg-designColor">
                          Continue to Review
                        </Button>
                      </form>
                    )}

                    {(paymentMethod.type === 'paypal' || paymentMethod.type === 'cash') && (
                      <Button
                        onClick={() => setCurrentStep('review')}
                        className="w-full bg-designColor"
                      >
                        Continue to Review
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {currentStep === 'review' && (
              <motion.div
                key="review"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Review Your Order</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Shipping Address */}
                    <div>
                      <h3 className="font-semibold mb-2">Shipping Address</h3>
                      <p className="text-sm text-muted-foreground">
                        {shippingAddress.fullName}<br />
                        {shippingAddress.address}<br />
                        {shippingAddress.city}, {shippingAddress.state} {shippingAddress.zipCode}<br />
                        {shippingAddress.country}<br />
                        {shippingAddress.phone}
                      </p>
                      <Button
                        variant="link"
                        onClick={() => setCurrentStep('address')}
                        className="p-0 h-auto"
                      >
                        Change
                      </Button>
                    </div>

                    <Separator />

                    {/* Payment Method */}
                    <div>
                      <h3 className="font-semibold mb-2">Payment Method</h3>
                      <p className="text-sm text-muted-foreground capitalize">
                        {paymentMethod.type === 'card'
                          ? `Card ending in ${paymentMethod.cardNumber?.slice(-4) || '****'}`
                          : paymentMethod.type}
                      </p>
                      <Button
                        variant="link"
                        onClick={() => setCurrentStep('payment')}
                        className="p-0 h-auto"
                      >
                        Change
                      </Button>
                    </div>

                    <Separator />

                    {/* Order Items */}
                    <div>
                      <h3 className="font-semibold mb-4">Order Items</h3>
                      <div className="space-y-3">
                        {cart.map((item) => (
                          <div key={item._id} className="flex gap-4">
                            <div className="relative w-16 h-16 rounded bg-gray-100 flex-shrink-0">
                              <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                className="object-cover rounded"
                              />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium text-sm">{item.title}</p>
                              <p className="text-xs text-muted-foreground">
                                Qty: {item.cartQuantity} × <FormattedPrice amount={item.price} className="" />
                              </p>
                            </div>
                            <p className="font-semibold">
                              <FormattedPrice amount={item.price * item.cartQuantity} className="" />
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Button
                      onClick={handlePlaceOrder}
                      className="w-full bg-designColor"
                      disabled={isProcessing}
                      size="lg"
                    >
                      {isProcessing ? 'Processing...' : 'Place Order'}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <FormattedPrice amount={subtotal} className="" />
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span>{shippingCost === 0 ? 'Free' : <FormattedPrice amount={shippingCost} className="" />}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax</span>
                  <FormattedPrice amount={tax} className="" />
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <FormattedPrice amount={total} className="" />
                </div>
              </div>

              {subtotal < 100 && (
                <div className="p-3 bg-blue-50 rounded-lg text-xs text-blue-800">
                  Add <FormattedPrice amount={100 - subtotal} className="" /> more for free shipping!
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </Container>
  );
}

