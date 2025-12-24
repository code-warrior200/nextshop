"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { useOrderStore } from "@/store/useOrderStore";
import Container from "../../components/Container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import FormattedPrice from "../../components/FormattedPrice";
import { ArrowLeft, Package, Truck, CheckCircle, Clock, Download, MapPin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const statusInfo = {
  pending: {
    icon: Clock,
    color: 'text-yellow-600',
    bg: 'bg-yellow-100',
    message: 'Your order is being confirmed',
  },
  processing: {
    icon: Package,
    color: 'text-blue-600',
    bg: 'bg-blue-100',
    message: 'Your order is being prepared',
  },
  shipped: {
    icon: Truck,
    color: 'text-purple-600',
    bg: 'bg-purple-100',
    message: 'Your order is on the way',
  },
  delivered: {
    icon: CheckCircle,
    color: 'text-green-600',
    bg: 'bg-green-100',
    message: 'Your order has been delivered',
  },
  cancelled: {
    icon: Clock,
    color: 'text-red-600',
    bg: 'bg-red-100',
    message: 'Your order has been cancelled',
  },
};

export default function OrderDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();
  const { getOrderById } = useOrderStore();
  
  const [order, setOrder] = useState(useOrderStore.getState().getOrderById(params.id as string));

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/');
      return;
    }
    
    const foundOrder = getOrderById(params.id as string);
    if (!foundOrder) {
      router.push('/orders');
      return;
    }
    setOrder(foundOrder);
  }, [params.id, isAuthenticated, router, getOrderById]);

  if (!isAuthenticated || !order) {
    return null;
  }

  const StatusIcon = statusInfo[order.status].icon;

  const handleDownloadInvoice = () => {
    // Generate invoice HTML
    const invoiceHTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Invoice - ${order.id}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            .header { border-bottom: 2px solid #000; padding-bottom: 20px; margin-bottom: 20px; }
            .info { margin: 20px 0; }
            table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            th, td { padding: 10px; text-align: left; border-bottom: 1px solid #ddd; }
            .total { font-weight: bold; font-size: 1.2em; }
            .text-right { text-align: right; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>NiceShop Invoice</h1>
            <p>Order ID: ${order.id}</p>
            <p>Date: ${new Date(order.createdAt).toLocaleDateString()}</p>
          </div>
          <div class="info">
            <h3>Shipping Address</h3>
            <p>${order.shippingAddress.fullName}<br>
            ${order.shippingAddress.address}<br>
            ${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.zipCode}</p>
          </div>
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Quantity</th>
                <th class="text-right">Price</th>
                <th class="text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              ${order.items.map(item => `
                <tr>
                  <td>${item.title}</td>
                  <td>${item.quantity}</td>
                  <td class="text-right">$${item.price.toFixed(2)}</td>
                  <td class="text-right">$${(item.price * item.quantity).toFixed(2)}</td>
                </tr>
              `).join('')}
            </tbody>
            <tfoot>
              <tr>
                <td colspan="3" class="text-right">Subtotal:</td>
                <td class="text-right">$${order.subtotal.toFixed(2)}</td>
              </tr>
              <tr>
                <td colspan="3" class="text-right">Shipping:</td>
                <td class="text-right">$${order.shippingCost.toFixed(2)}</td>
              </tr>
              <tr>
                <td colspan="3" class="text-right">Tax:</td>
                <td class="text-right">$${order.tax.toFixed(2)}</td>
              </tr>
              <tr class="total">
                <td colspan="3" class="text-right">Total:</td>
                <td class="text-right">$${order.total.toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>
        </body>
      </html>
    `;
    
    // Open print dialog
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(invoiceHTML);
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <Container className="py-8">
      <div className="mb-6">
        <Button variant="ghost" asChild>
          <Link href="/orders">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Orders
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Status */}
          <Card>
            <CardHeader>
              <CardTitle>Order Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className={`w-16 h-16 rounded-full ${statusInfo[order.status].bg} flex items-center justify-center`}>
                  <StatusIcon className={`w-8 h-8 ${statusInfo[order.status].color}`} />
                </div>
                <div>
                  <Badge className={`${statusInfo[order.status].bg} ${statusInfo[order.status].color} border-0`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </Badge>
                  <p className="text-sm text-muted-foreground mt-1">
                    {statusInfo[order.status].message}
                  </p>
                  {order.trackingNumber && (
                    <p className="text-sm mt-2">
                      Tracking: <span className="font-mono">{order.trackingNumber}</span>
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Order Items */}
          <Card>
            <CardHeader>
              <CardTitle>Order Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.productId} className="flex gap-4">
                    <div className="relative w-20 h-20 rounded bg-gray-100 flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.brand}</p>
                      <p className="text-sm mt-1">
                        Quantity: {item.quantity} × <FormattedPrice amount={item.price} className="" />
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">
                        <FormattedPrice amount={item.price * item.quantity} className="" />
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Shipping Address */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Shipping Address
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm">
                <p className="font-medium">{order.shippingAddress.fullName}</p>
                <p className="text-muted-foreground mt-1">
                  {order.shippingAddress.address}<br />
                  {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}<br />
                  {order.shippingAddress.country}<br />
                  Phone: {order.shippingAddress.phone}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Order ID</span>
                  <span className="font-mono text-xs">{order.id.split('-')[1]}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Order Date</span>
                  <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <FormattedPrice amount={order.subtotal} className="" />
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{order.shippingCost === 0 ? 'Free' : <FormattedPrice amount={order.shippingCost} className="" />}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <FormattedPrice amount={order.tax} className="" />
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <FormattedPrice amount={order.total} className="" />
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={handleDownloadInvoice}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download Invoice
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/">
                    Continue Shopping
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Container>
  );
}

