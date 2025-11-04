import { Shield } from 'lucide-react';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

interface PaymentStepProps {
  paymentData: any;
  onPaymentDataChange: (data: any) => void;
}

export default function PaymentStep({
  paymentData,
  onPaymentDataChange
}: PaymentStepProps) {
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
