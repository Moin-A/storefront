'use client';

import { useState, useEffect } from 'react';
import { useCartStore } from '../store/useCartStore';
import { useUserStore } from '../store/userStore';
import { useOrderStore } from '../store/useOrderStore';
import { User, Order, Address, LineItem } from '../types/solidus';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Badge } from '../../components/ui/badge';
import { Separator } from '../../components/ui/separator';
import { 
  CreditCard, 
  MapPin, 
  Package, 
  Check, 
  ArrowLeft,
  Plus,
  Edit,
  Trash2,
  Lock,
  Shield,
  Truck
} from 'lucide-react';

type CheckoutStep = 'address' | 'payment' | 'review' | 'complete';

export default function CheckoutPage() {
  const { cart } = useCartStore();
  const { user, isAuthenticated } = useUserStore();
  const { addOrder } = useOrderStore();
  
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('address');
  const [loading, setLoading] = useState(false);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedBillingAddress, setSelectedBillingAddress] = useState<Address | null>(null);
  const [selectedShippingAddress, setSelectedShippingAddress] = useState<Address | null>(null);
  const [useSameAddress, setUseSameAddress] = useState(true);
  const [orderComplete, setOrderComplete] = useState(false);

  // Payment form state
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    saveCard: false
  });

  // New address form state
  const [newAddress, setNewAddress] = useState({
    firstname: '',
    lastname: '',
    address1: '',
    address2: '',
    city: '',
    zipcode: '',
    phone: '',
    state_name: '',
    country_name: 'United States'
  });

  useEffect(() => {
    if (isAuthenticated && user) {
      fetchUserAddresses();
    }
  }, [isAuthenticated, user]);

  const fetchUserAddresses = async () => {
    try {
      // TODO: Replace with actual API call
      // const response = await fetch('/api/user/addresses');
      // const data = await response.json();
      setAddresses(user?.addresses || []);
    } catch (error) {
      console.error('Error fetching addresses:', error);
    }
  };

  const handleNextStep = () => {
    if (currentStep === 'address') {
      if (!selectedBillingAddress || !selectedShippingAddress) {
        alert('Please select billing and shipping addresses');
        return;
      }
      setCurrentStep('payment');
    } else if (currentStep === 'payment') {
      if (!paymentData.cardNumber || !paymentData.expiryDate || !paymentData.cvv) {
        alert('Please fill in all payment details');
        return;
      }
      setCurrentStep('review');
    }
  };

  const handlePlaceOrder = async () => {
    setLoading(true);
    try {
      // TODO: Process payment and create order
      // const order = await createOrder({
      //   billingAddress: selectedBillingAddress,
      //   shippingAddress: selectedShippingAddress,
      //   paymentData,
      //   lineItems: cart?.line_items || []
      // });
      
      // Mock order creation
      const mockOrder: Order = {
        id: Date.now(),
        number: `ORD-${Date.now()}`,
        state: 'complete',
        total: cart?.total || '$0.00',
        item_total: cart?.item_total || '$0.00',
        item_count: cart?.item_count || 0,
        created_at: new Date().toISOString(),
        line_items: cart?.line_items || [],
        bill_address: selectedBillingAddress || undefined,
        ship_address: selectedShippingAddress || undefined
      };

      addOrder(mockOrder);
      setOrderComplete(true);
      setCurrentStep('complete');
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddNewAddress = async () => {
    try {
      // TODO: Add new address via API
      const newAddr: Address = {
        id: Date.now(),
        ...newAddress
      };
      
      setAddresses([...addresses, newAddr]);
      setSelectedBillingAddress(newAddr);
      if (useSameAddress) {
        setSelectedShippingAddress(newAddr);
      }
      
      // Reset form
      setNewAddress({
        firstname: '',
        lastname: '',
        address1: '',
        address2: '',
        city: '',
        zipcode: '',
        phone: '',
        state_name: '',
        country_name: 'United States'
      });
    } catch (error) {
      console.error('Error adding address:', error);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="p-8 text-center max-w-md">
          <Lock className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Sign In Required</h2>
          <p className="text-gray-600 mb-4">You need to be signed in to proceed with checkout.</p>
          <Button asChild>
            <a href="/auth">Sign In</a>
          </Button>
        </Card>
      </div>
    );
  }

  if (!cart || cart.line_items?.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="p-8 text-center max-w-md">
          <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Your Cart is Empty</h2>
          <p className="text-gray-600 mb-4">Add some items to your cart before checking out.</p>
          <Button asChild>
            <a href="/products">Continue Shopping</a>
          </Button>
        </Card>
      </div>
    );
  }

  const steps = [
    { id: 'address', label: 'Address', icon: MapPin },
    { id: 'payment', label: 'Payment', icon: CreditCard },
    { id: 'review', label: 'Review', icon: Check }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Checkout</h1>
          <p className="text-gray-600">Complete your order securely</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center">
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = steps.findIndex(s => s.id === currentStep) > index;
              
              return (
                <div key={step.id} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    isActive 
                      ? 'border-blue-600 bg-blue-600 text-white' 
                      : isCompleted 
                        ? 'border-green-600 bg-green-600 text-white'
                        : 'border-gray-300 bg-white text-gray-500'
                  }`}>
                    {isCompleted ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      <StepIcon className="h-5 w-5" />
                    )}
                  </div>
                  <span className={`ml-2 text-sm font-medium ${
                    isActive ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-500'
                  }`}>
                    {step.label}
                  </span>
                  {index < steps.length - 1 && (
                    <div className="w-16 h-0.5 bg-gray-300 mx-4"></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {currentStep === 'address' && (
              <AddressStep 
                addresses={addresses}
                selectedBillingAddress={selectedBillingAddress}
                selectedShippingAddress={selectedShippingAddress}
                useSameAddress={useSameAddress}
                newAddress={newAddress}
                onBillingAddressChange={setSelectedBillingAddress}
                onShippingAddressChange={setSelectedShippingAddress}
                onUseSameAddressChange={setUseSameAddress}
                onNewAddressChange={setNewAddress}
                onAddNewAddress={handleAddNewAddress}
              />
            )}

            {currentStep === 'payment' && (
              <PaymentStep 
                paymentData={paymentData}
                onPaymentDataChange={setPaymentData}
              />
            )}

            {currentStep === 'review' && (
              <ReviewStep 
                billingAddress={selectedBillingAddress}
                shippingAddress={selectedShippingAddress}
                paymentData={paymentData}
                onPlaceOrder={handlePlaceOrder}
                loading={loading}
              />
            )}

            {currentStep === 'complete' && (
              <CompleteStep />
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <OrderSummary 
              cart={cart}
              currentStep={currentStep}
              onNextStep={handleNextStep}
              onPlaceOrder={handlePlaceOrder}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Address Step Component
function AddressStep({
  addresses,
  selectedBillingAddress,
  selectedShippingAddress,
  useSameAddress,
  newAddress,
  onBillingAddressChange,
  onShippingAddressChange,
  onUseSameAddressChange,
  onNewAddressChange,
  onAddNewAddress
}: {
  addresses: Address[];
  selectedBillingAddress: Address | null;
  selectedShippingAddress: Address | null;
  useSameAddress: boolean;
  newAddress: any;
  onBillingAddressChange: (address: Address | null) => void;
  onShippingAddressChange: (address: Address | null) => void;
  onUseSameAddressChange: (useSame: boolean) => void;
  onNewAddressChange: (address: any) => void;
  onAddNewAddress: () => void;
}) {
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [showNewShippingAddressForm, setShowNewShippingAddressForm] = useState(false);
  const [newShippingAddress, setNewShippingAddress] = useState({
    firstname: '',
    lastname: '',
    address1: '',
    address2: '',
    city: '',
    zipcode: '',
    phone: '',
    state_name: '',
    country_name: 'United States'
  });

  const handleAddNewShippingAddress = async () => {
    try {
      // TODO: Add new shipping address via API
      const newAddr: Address = {
        id: Date.now() + 1000, // Different ID to avoid conflicts
        ...newShippingAddress
      };
      
      onShippingAddressChange(newAddr);
      setShowNewShippingAddressForm(false);
      
      // Reset form
      setNewShippingAddress({
        firstname: '',
        lastname: '',
        address1: '',
        address2: '',
        city: '',
        zipcode: '',
        phone: '',
        state_name: '',
        country_name: 'United States'
      });
    } catch (error) {
      console.error('Error adding shipping address:', error);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Billing Address</h2>
        
        {addresses.length > 0 && (
          <div className="space-y-3 mb-6">
            {addresses.map((address) => (
              <div 
                key={address.id}
                className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                  selectedBillingAddress?.id === address.id 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => onBillingAddressChange(address)}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {address.firstname} {address.lastname}
                    </h3>
                    <p className="text-sm text-gray-600">{address.phone}</p>
                    <div className="text-sm text-gray-600 mt-1">
                      <p>{address.address1}</p>
                      {address.address2 && <p>{address.address2}</p>}
                      <p>{address.city}, {address.state_name} {address.zipcode}</p>
                      <p>{address.country_name}</p>
                    </div>
                  </div>
                  {selectedBillingAddress?.id === address.id && (
                    <Check className="h-5 w-5 text-blue-600" />
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <Button 
          variant="outline" 
          onClick={() => setShowNewAddressForm(!showNewAddressForm)}
          className="w-full"
        >
          <Plus className="h-4 w-4 mr-2" />
          {showNewAddressForm ? 'Cancel' : 'Add New Address'}
        </Button>

        {showNewAddressForm && (
          <div className="mt-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstname" className="mb-2 block">First Name</Label>
                <Input
                  id="firstname"
                  value={newAddress.firstname}
                  onChange={(e) => onNewAddressChange({...newAddress, firstname: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="lastname" className="mb-2 block">Last Name</Label>
                <Input
                  id="lastname"
                  value={newAddress.lastname}
                  onChange={(e) => onNewAddressChange({...newAddress, lastname: e.target.value})}
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="address1" className="mb-2 block">Address Line 1</Label>
              <Input
                id="address1"
                value={newAddress.address1}
                onChange={(e) => onNewAddressChange({...newAddress, address1: e.target.value})}
              />
            </div>
            
            <div>
              <Label htmlFor="address2" className="mb-2 block">Address Line 2 (Optional)</Label>
              <Input
                id="address2"
                value={newAddress.address2}
                onChange={(e) => onNewAddressChange({...newAddress, address2: e.target.value})}
              />
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="city" className="mb-2 block">City</Label>
                <Input
                  id="city"
                  value={newAddress.city}
                  onChange={(e) => onNewAddressChange({...newAddress, city: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="state" className="mb-2 block">State</Label>
                <Input
                  id="state"
                  value={newAddress.state_name}
                  onChange={(e) => onNewAddressChange({...newAddress, state_name: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="zipcode" className="mb-2 block">ZIP Code</Label>
                <Input
                  id="zipcode"
                  value={newAddress.zipcode}
                  onChange={(e) => onNewAddressChange({...newAddress, zipcode: e.target.value})}
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="phone" className="mb-2 block">Phone Number</Label>
              <Input
                id="phone"
                value={newAddress.phone}
                onChange={(e) => onNewAddressChange({...newAddress, phone: e.target.value})}
              />
            </div>
            
            <Button onClick={onAddNewAddress} className="w-full">
              Add Address
            </Button>
          </div>
        )}
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Shipping Address</h2>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={useSameAddress}
              onChange={(e) => onUseSameAddressChange(e.target.checked)}
              className="mr-2"
            />
            <span className="text-sm text-gray-600">Same as billing address</span>
          </label>
        </div>

        {!useSameAddress && (
          <>
            {addresses.length > 0 && (
              <div className="space-y-3 mb-6">
                {addresses.map((address) => (
                  <div 
                    key={address.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                      selectedShippingAddress?.id === address.id 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => onShippingAddressChange(address)}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {address.firstname} {address.lastname}
                        </h3>
                        <p className="text-sm text-gray-600">{address.phone}</p>
                        <div className="text-sm text-gray-600 mt-1">
                          <p>{address.address1}</p>
                          {address.address2 && <p>{address.address2}</p>}
                          <p>{address.city}, {address.state_name} {address.zipcode}</p>
                          <p>{address.country_name}</p>
                        </div>
                      </div>
                      {selectedShippingAddress?.id === address.id && (
                        <Check className="h-5 w-5 text-blue-600" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <Button 
              variant="outline" 
              onClick={() => setShowNewShippingAddressForm(!showNewShippingAddressForm)}
              className="w-full"
            >
              <Plus className="h-4 w-4 mr-2" />
              {showNewShippingAddressForm ? 'Cancel' : 'Add New Shipping Address'}
            </Button>

            {showNewShippingAddressForm && (
              <div className="mt-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="shipping-firstname" className="mb-2 block">First Name</Label>
                    <Input
                      id="shipping-firstname"
                      value={newShippingAddress.firstname}
                      onChange={(e) => setNewShippingAddress({...newShippingAddress, firstname: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="shipping-lastname" className="mb-2 block">Last Name</Label>
                    <Input
                      id="shipping-lastname"
                      value={newShippingAddress.lastname}
                      onChange={(e) => setNewShippingAddress({...newShippingAddress, lastname: e.target.value})}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="shipping-address1" className="mb-2 block">Address Line 1</Label>
                  <Input
                    id="shipping-address1"
                    value={newShippingAddress.address1}
                    onChange={(e) => setNewShippingAddress({...newShippingAddress, address1: e.target.value})}
                  />
                </div>
                
                <div>
                  <Label htmlFor="shipping-address2" className="mb-2 block">Address Line 2 (Optional)</Label>
                  <Input
                    id="shipping-address2"
                    value={newShippingAddress.address2}
                    onChange={(e) => setNewShippingAddress({...newShippingAddress, address2: e.target.value})}
                  />
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="shipping-city" className="mb-2 block">City</Label>
                    <Input
                      id="shipping-city"
                      value={newShippingAddress.city}
                      onChange={(e) => setNewShippingAddress({...newShippingAddress, city: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="shipping-state" className="mb-2 block">State</Label>
                    <Input
                      id="shipping-state"
                      value={newShippingAddress.state_name}
                      onChange={(e) => setNewShippingAddress({...newShippingAddress, state_name: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="shipping-zipcode" className="mb-2 block">ZIP Code</Label>
                    <Input
                      id="shipping-zipcode"
                      value={newShippingAddress.zipcode}
                      onChange={(e) => setNewShippingAddress({...newShippingAddress, zipcode: e.target.value})}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="shipping-phone" className="mb-2 block">Phone Number</Label>
                  <Input
                    id="shipping-phone"
                    value={newShippingAddress.phone}
                    onChange={(e) => setNewShippingAddress({...newShippingAddress, phone: e.target.value})}
                  />
                </div>
                
                <Button onClick={handleAddNewShippingAddress} className="w-full">
                  Add Shipping Address
                </Button>
              </div>
            )}
          </>
        )}

        {useSameAddress && selectedBillingAddress && (
          <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
            <div className="text-sm text-gray-600">
              <p>{selectedBillingAddress.firstname} {selectedBillingAddress.lastname}</p>
              <p>{selectedBillingAddress.phone}</p>
              <p>{selectedBillingAddress.address1}</p>
              {selectedBillingAddress.address2 && <p>{selectedBillingAddress.address2}</p>}
              <p>{selectedBillingAddress.city}, {selectedBillingAddress.state_name} {selectedBillingAddress.zipcode}</p>
              <p>{selectedBillingAddress.country_name}</p>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}

// Payment Step Component
function PaymentStep({
  paymentData,
  onPaymentDataChange
}: {
  paymentData: any;
  onPaymentDataChange: (data: any) => void;
}) {
  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <Shield className="h-5 w-5 text-green-600" />
        <h2 className="text-xl font-semibold text-gray-900">Payment Information</h2>
        <span className="text-sm text-green-600">Secure</span>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="cardNumber" className="mb-2 block">Card Number</Label>
          <Input
            id="cardNumber"
            placeholder="1234 5678 9012 3456"
            value={paymentData.cardNumber}
            onChange={(e) => onPaymentDataChange({...paymentData, cardNumber: e.target.value})}
          />
        </div>

        <div>
          <Label htmlFor="cardName" className="mb-2 block">Name on Card</Label>
          <Input
            id="cardName"
            placeholder="John Doe"
            value={paymentData.cardName}
            onChange={(e) => onPaymentDataChange({...paymentData, cardName: e.target.value})}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="expiryDate" className="mb-2 block">Expiry Date</Label>
            <Input
              id="expiryDate"
              placeholder="MM/YY"
              value={paymentData.expiryDate}
              onChange={(e) => onPaymentDataChange({...paymentData, expiryDate: e.target.value})}
            />
          </div>
          <div>
            <Label htmlFor="cvv" className="mb-2 block">CVV</Label>
            <Input
              id="cvv"
              placeholder="123"
              value={paymentData.cvv}
              onChange={(e) => onPaymentDataChange({...paymentData, cvv: e.target.value})}
            />
          </div>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="saveCard"
            checked={paymentData.saveCard}
            onChange={(e) => onPaymentDataChange({...paymentData, saveCard: e.target.checked})}
            className="mr-2"
          />
          <Label htmlFor="saveCard" className="text-sm text-gray-600">
            Save card for future purchases
          </Label>
        </div>
      </div>
    </Card>
  );
}

// Review Step Component
function ReviewStep({
  billingAddress,
  shippingAddress,
  paymentData,
  onPlaceOrder,
  loading
}: {
  billingAddress: Address | null;
  shippingAddress: Address | null;
  paymentData: any;
  onPlaceOrder: () => void;
  loading: boolean;
}) {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Review Your Order</h2>
        
        <div className="space-y-4">
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Billing Address</h3>
            {billingAddress && (
              <div className="text-sm text-gray-600">
                <p>{billingAddress.firstname} {billingAddress.lastname}</p>
                <p>{billingAddress.phone}</p>
                <p>{billingAddress.address1}</p>
                {billingAddress.address2 && <p>{billingAddress.address2}</p>}
                <p>{billingAddress.city}, {billingAddress.state_name} {billingAddress.zipcode}</p>
                <p>{billingAddress.country_name}</p>
              </div>
            )}
          </div>

          <div>
            <h3 className="font-medium text-gray-900 mb-2">Shipping Address</h3>
            {shippingAddress && (
              <div className="text-sm text-gray-600">
                <p>{shippingAddress.firstname} {shippingAddress.lastname}</p>
                <p>{shippingAddress.phone}</p>
                <p>{shippingAddress.address1}</p>
                {shippingAddress.address2 && <p>{shippingAddress.address2}</p>}
                <p>{shippingAddress.city}, {shippingAddress.state_name} {shippingAddress.zipcode}</p>
                <p>{shippingAddress.country_name}</p>
              </div>
            )}
          </div>

          <div>
            <h3 className="font-medium text-gray-900 mb-2">Payment Method</h3>
            <div className="text-sm text-gray-600">
              <p>**** **** **** {paymentData.cardNumber.slice(-4)}</p>
              <p>{paymentData.cardName}</p>
              <p>Expires {paymentData.expiryDate}</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

// Complete Step Component
function CompleteStep() {
  return (
    <Card className="p-8 text-center">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <Check className="h-8 w-8 text-green-600" />
      </div>
      <h2 className="text-2xl font-semibold text-gray-900 mb-2">Order Placed Successfully!</h2>
      <p className="text-gray-600 mb-6">Thank you for your purchase. You will receive a confirmation email shortly.</p>
      <div className="flex gap-4 justify-center">
        <Button asChild>
          <a href="/profile">View Orders</a>
        </Button>
        <Button variant="outline" asChild>
          <a href="/products">Continue Shopping</a>
        </Button>
      </div>
    </Card>
  );
}

// Order Summary Component
function OrderSummary({
  cart,
  currentStep,
  onNextStep,
  onPlaceOrder,
  loading
}: {
  cart: any;
  currentStep: CheckoutStep;
  onNextStep: () => void;
  onPlaceOrder: () => void;
  loading: boolean;
}) {
  return (
    <Card className="p-6 sticky top-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
      
      <div className="space-y-3 mb-6">
        {cart?.line_items?.map((item: LineItem) => (
          <div key={item.id} className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
              <Package className="h-6 w-6 text-gray-400" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-gray-900">{item.variant?.product?.name}</h4>
              <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
            </div>
            <div className="text-right">
              <p className="font-medium">{item.total}</p>
            </div>
          </div>
        ))}
      </div>

      <Separator className="my-4" />

      <div className="space-y-2 mb-6">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span>{cart?.item_total}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>
          <span className="text-green-600">Free</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Tax</span>
          <span>$0.00</span>
        </div>
        <Separator />
        <div className="flex justify-between text-lg font-semibold">
          <span>Total</span>
          <span>{cart?.total}</span>
        </div>
      </div>

      {currentStep === 'address' && (
        <Button onClick={onNextStep} className="w-full">
          Continue to Payment
        </Button>
      )}

      {currentStep === 'payment' && (
        <Button onClick={onNextStep} className="w-full">
          Review Order
        </Button>
      )}

      {currentStep === 'review' && (
        <Button 
          onClick={onPlaceOrder} 
          className="w-full"
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Place Order'}
        </Button>
      )}
    </Card>
  );
}
