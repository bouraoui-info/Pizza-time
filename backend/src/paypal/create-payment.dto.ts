// src/paypal/dto/create-payment.dto.ts
export class CreatePaymentDto {
    intent: string;
    purchase_units: Array<any>;
    application_context?: any;
  }
  