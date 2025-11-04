import { Card } from '../ui/card';
import { Address } from '../../app/types/solidus';

interface ReviewStepProps {
  billingAddress: Address | null;
  shippingAddress: Address | null;
  paymentData: any;
  onPlaceOrder: () => void;
  loading: boolean;
}

export default function ReviewStep({
  billingAddress,
  shippingAddress,
  paymentData,
  onPlaceOrder,
  loading
}: ReviewStepProps) {
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
