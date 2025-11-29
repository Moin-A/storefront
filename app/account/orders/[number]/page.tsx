'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { OrderDetails } from '../../../types/solidus';
import { Card, CardContent, CardHeader, CardTitle } from '../../../../components/ui/card';
import { Button } from '../../../../components/ui/button';
import { Badge } from '../../../../components/ui/badge';
import { Separator } from '../../../../components/ui/separator';
import { 
  ArrowLeft, 
  Package, 
  MapPin, 
  CreditCard, 
  Truck, 
  Calendar,
  Mail,
  CheckCircle2,
  Clock,
  XCircle
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { SOLIDUS_ROUTES } from '../../../../lib/routes';

export default function OrderDetailPage({ params }: { params: Promise<{ number: string }> }) {
  const router = useRouter();
  const { number } = use(params);
  const [order, setOrder] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      
      try {
        setLoading(true);
        const response = await fetch(`/api/orders/${number}`, {
          credentials: 'include',
        });

        if (!response.ok) {
          if (response.status === 404) {
            setError('Order not found');
          } else {
            setError('Failed to load order details');
          }
          return;
        }

        const data = await response.json();
        setOrder(data);
      } catch (err) {
        console.error('Error fetching order details:', err);
        setError('An error occurred while loading order details');
      } finally {
        setLoading(false);
      }
    };

    if (number) {
      fetchOrderDetails();
    }
  }, [number]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="p-8 text-center max-w-md">
          <XCircle className="h-16 w-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Order Not Found</h2>
          <p className="text-gray-600 mb-4">{error || 'The order you are looking for does not exist.'}</p>
          <div className="flex gap-2 justify-center">
            <Button variant="outline" onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </Button>
            <Button asChild>
              <Link href={SOLIDUS_ROUTES.frontend.orders}>View All Orders</Link>
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  const getStateBadgeVariant = (state: string) => {
    switch (state?.toLowerCase()) {
      case 'complete':
        return 'default';
      case 'pending':
      case 'processing':
        return 'secondary';
      case 'canceled':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  const getStateIcon = (state: string) => {
    switch (state?.toLowerCase()) {
      case 'complete':
        return <CheckCircle2 className="h-4 w-4" />;
      case 'canceled':
        return <XCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Order Details</h1>
              <p className="text-gray-600 mt-1">Order #{order.number}</p>
            </div>
            <Badge 
              variant={getStateBadgeVariant(order.state)} 
              className="text-sm px-3 py-1"
            >
              {getStateIcon(order.state)}
              <span className="ml-2 capitalize">{order.state}</span>
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Items */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Order Items ({order.item_count})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {order.line_items?.map((item) => {
                    debugger;
                    const productImage = item.product?.images?.[0]?.attachment_url || '/placeholder.svg';
                    const productName = item.variant?.name || item.variant?.product?.name || 'Product';
                    const productSlug = item.variant?.product?.slug;

                    return (
                      <div key={item.id} className="flex gap-4 pb-4 border-b border-gray-200 last:border-0">
                        <div className="relative w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={productImage}
                            alt={productName}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              {productSlug ? (
                                <Link 
                                  href={`/product/${item.variant?.product?.id || productSlug}`}
                                  className="font-medium text-gray-900 hover:text-blue-600 transition-colors"
                                >
                                  {productName}
                                </Link>
                              ) : (
                                <h3 className="font-medium text-gray-900">{productName}</h3>
                              )}
                              {item.variant?.sku && (
                                <p className="text-sm text-gray-500 mt-1">SKU: {item.variant.sku}</p>
                              )}
                              <p className="text-sm text-gray-600 mt-1">Quantity: {item.quantity}</p>
                            </div>
                            <div className="text-right ml-4">
                              <p className="font-semibold text-gray-900">{item.total}</p>
                              <p className="text-sm text-gray-500">{item.price} each</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Shipping Information */}
            {order.shipments && order.shipments.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="h-5 w-5" />
                    Shipping Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {order.shipments.map((shipment) => (
                      <div key={shipment.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <p className="font-medium text-gray-900">Shipment #{shipment.number}</p>
                            <Badge 
                              variant={shipment.state === 'shipped' ? 'default' : 'secondary'}
                              className="mt-2"
                            >
                              {shipment.state}
                            </Badge>
                          </div>
                          {shipment.tracking && (
                            <div className="text-right">
                              <p className="text-sm text-gray-600">Tracking</p>
                              <p className="font-medium text-gray-900">{shipment.tracking}</p>
                            </div>
                          )}
                        </div>
                        {shipment.shipped_at && (
                          <p className="text-sm text-gray-600">
                            Shipped on: {new Date(shipment.shipped_at).toLocaleDateString()}
                          </p>
                        )}
                        {shipment.cost && (
                          <p className="text-sm text-gray-600 mt-2">
                            Shipping Cost: {shipment.cost}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Payment Information */}
            {order.payments && order.payments.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Payment Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {order.payments.map((payment) => (
                      <div key={payment.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <p className="font-medium text-gray-900">
                              {payment.payment_method?.name || 'Payment'}
                            </p>
                            <Badge 
                              variant={payment.state === 'completed' ? 'default' : 'secondary'}
                              className="mt-2"
                            >
                              {payment.state}
                            </Badge>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-gray-900">{payment.amount}</p>
                          </div>
                        </div>
                        {payment.number && (
                          <p className="text-sm text-gray-600">Payment #: {payment.number}</p>
                        )}
                        {payment.created_at && (
                          <p className="text-sm text-gray-600 mt-1">
                            Paid on: {new Date(payment.created_at).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span>Order Date: {new Date(order.created_at).toLocaleDateString()}</span>
                </div>
                {order.completed_at && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Completed: {new Date(order.completed_at).toLocaleDateString()}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail className="h-4 w-4" />
                  <span>{order.email}</span>
                </div>
                <Separator />
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Item Total</span>
                    <span className="font-medium">{order.item_total}</span>
                  </div>
                  {order.shipment_total && parseFloat(order.shipment_total) > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-medium">{order.shipment_total}</span>
                    </div>
                  )}
                  {order.additional_tax_total && parseFloat(order.additional_tax_total) > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Tax</span>
                      <span className="font-medium">{order.additional_tax_total}</span>
                    </div>
                  )}
                  {order.promo_total && parseFloat(order.promo_total) < 0 && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Discount</span>
                      <span className="font-medium">{order.promo_total}</span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>{order.total}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Billing Address */}
            {order.bill_address && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Billing Address
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p className="font-medium text-gray-900">
                      {order.bill_address.firstname} {order.bill_address.lastname}
                    </p>
                    {order.bill_address.company && (
                      <p>{order.bill_address.company}</p>
                    )}
                    <p>{order.bill_address.address1}</p>
                    {order.bill_address.address2 && (
                      <p>{order.bill_address.address2}</p>
                    )}
                    <p>
                      {order.bill_address.city}, {order.bill_address.state_name} {order.bill_address.zipcode}
                    </p>
                    <p>{order.bill_address.country_name}</p>
                    {order.bill_address.phone && (
                      <p className="mt-2">{order.bill_address.phone}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Shipping Address */}
            {order.ship_address && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="h-5 w-5" />
                    Shipping Address
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p className="font-medium text-gray-900">
                      {order.ship_address.firstname} {order.ship_address.lastname}
                    </p>
                    {order.ship_address.company && (
                      <p>{order.ship_address.company}</p>
                    )}
                    <p>{order.ship_address.address1}</p>
                    {order.ship_address.address2 && (
                      <p>{order.ship_address.address2}</p>
                    )}
                    <p>
                      {order.ship_address.city}, {order.ship_address.state_name} {order.ship_address.zipcode}
                    </p>
                    <p>{order.ship_address.country_name}</p>
                    {order.ship_address.phone && (
                      <p className="mt-2">{order.ship_address.phone}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Special Instructions */}
            {order.special_instructions && (
              <Card>
                <CardHeader>
                  <CardTitle>Special Instructions</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">{order.special_instructions}</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

