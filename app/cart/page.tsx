'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '../store/useCartStore';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { SOLIDUS_ROUTES } from '../../lib/routes';
import { Cart, LineItem } from '../types/solidus';
import Link from 'next/link';
import Image from 'next/image';

export default function CartPage() {
    const router = useRouter();
    const { cart, fetchCart,setCart } = useCartStore();
    const [loading, setLoading] = useState(true);
    const [updatingItems, setUpdatingItems] = useState<Set<number>>(new Set());

    useEffect(() => {
        setLoading(true);
        const loadCart = async () => {
            await fetchCart();
            setLoading(false);
        };
        loadCart();
    }, []);

    

    const updateQuantity = async (lineItemId: number, newQuantity: number) => {
        if (newQuantity < 1) return;

        setUpdatingItems(prev => new Set(prev).add(lineItemId));
        
        try {
            const response = await fetch(`/api/cart/update/${lineItemId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ quantity: newQuantity }),
            });

            if (response.ok) {
                const updatedCart = await response.json();
                setCart(updatedCart);
            }
        } catch (error) {
            console.error('Error updating quantity:', error);
        } finally {
            setUpdatingItems(prev => {
                const newSet = new Set(prev);
                newSet.delete(lineItemId);
                return newSet;
            });
        }
    };

    const removeItem = async (lineItemId: number) => {
        setUpdatingItems(prev => new Set(prev).add(lineItemId));
        
        try {
            const response = await fetch(`/api/cart/remove/${lineItemId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                const updatedCart = await response.json();
                setCart(updatedCart);
            }
        } catch (error) {
            console.error('Error removing item:', error);
        } finally {
            setUpdatingItems(prev => {
                const newSet = new Set(prev);
                newSet.delete(lineItemId);
                return newSet;
            });
        }
    };

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="flex items-center justify-center min-h-[400px]">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                        <p className="mt-4 text-muted-foreground">Loading your cart...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (!cart || !cart.line_items || cart.line_items.length === 0) {
        return (
            <div className="container mx-auto px-4 py-8">
                <Card className="max-w-2xl mx-auto">
                    <CardContent className="py-12">
                        <div className="text-center">
                            <svg
                                className="mx-auto h-24 w-24 text-muted-foreground"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                                />
                            </svg>
                            <h2 className="mt-6 text-2xl font-semibold text-gray-900 dark:text-white">
                                Your cart is empty
                            </h2>
                            <p className="mt-2 text-muted-foreground">
                                Add some items to your cart to get started
                            </p>
                            <div className="mt-6">
                                <Link href="/">
                                    <Button>Continue Shopping</Button>
                                </Link>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                Cart Items ({cart.item_count || 0} {cart.item_count === 1 ? 'item' : 'items'})
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {cart.line_items.map((item: LineItem) => {
                                    const isUpdating = updatingItems.has(item.id!);
                                    const imageUrl = item.variant?.product?.images?.[0]?.url || 
                                                   item.variant?.product?.images?.[0]?.url || 
                                                   '/placeholder.svg';
                                    return (
                                        <div
                                            key={item.id}
                                            className={`flex gap-4 p-4 border rounded-lg ${
                                                isUpdating ? 'opacity-50' : ''
                                            }`}
                                        >
                                            {/* Product Image */}
                                            <div className="flex-shrink-0">
                                                <div className="w-24 h-24 relative rounded-md overflow-hidden bg-gray-100">
                                                    <Image
                                                        src={imageUrl}
                                                        alt={item.variant?.product?.name || 'Product'}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                            </div>

                                            {/* Product Info */}
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-lg">
                                                    {item.variant?.product?.name || 'Product'}
                                                </h3>
                                                {item.variant?.name && (
                                                    <p className="text-sm text-muted-foreground">
                                                        Variant: {item.variant.name}
                                                    </p>
                                                )}
                                                {item.variant?.sku && (
                                                    <p className="text-xs text-muted-foreground">
                                                        SKU: {item.variant.sku}
                                                    </p>
                                                )}
                                                <p className="mt-2 font-medium">
                                                    ${item.price}
                                                </p>
                                            </div>

                                            {/* Quantity Controls */}
                                            <div className="flex flex-col items-end gap-2">
                                                <div className="flex items-center gap-2">
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        onClick={() => updateQuantity(item.id!, item.quantity! - 1)}
                                                        disabled={isUpdating || item.quantity === 1}
                                                    >
                                                        -
                                                    </Button>
                                                    <span className="w-12 text-center font-medium">
                                                        {item.quantity}
                                                    </span>
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        onClick={() => updateQuantity(item.id!, item.quantity! + 1)}
                                                        disabled={isUpdating}
                                                    >
                                                        +
                                                    </Button>
                                                </div>
                                                
                                                {/* Line Total */}
                                                <p className="font-semibold text-lg">
                                                    ${item.total}
                                                </p>

                                                {/* Remove Button */}
                                                <Button
                                                    size="sm"
                                                    variant="destructive"
                                                    onClick={() => removeItem(item.id!)}
                                                    disabled={isUpdating}
                                                >
                                                    Remove
                                                </Button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Continue Shopping Link */}
                            <div className="mt-6 pt-6 border-t">
                                <Link href="/">
                                    <Button variant="outline">
                                        ← Continue Shopping
                                    </Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Cart Summary */}
                <div className="lg:col-span-1">
                    <Card className="sticky top-4">
                        <CardHeader>
                            <CardTitle>Order Summary</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Subtotal</span>
                                    <span className="font-medium">${cart.item_total}</span>
                                </div>
                                
                                <div className="border-t pt-3">
                                    <div className="flex justify-between text-lg font-semibold">
                                        <span>Total</span>
                                        <span>${cart.total}</span>
                                    </div>
                                </div>

                                <Button 
                                    className="w-full mt-4" 
                                    size="lg"
                                    onClick={() => router.push(SOLIDUS_ROUTES.frontend.checkout)}
                                >
                                    Proceed to Checkout
                                </Button>

                                <p className="text-xs text-center text-muted-foreground mt-4">
                                    Shipping and taxes calculated at checkout
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

