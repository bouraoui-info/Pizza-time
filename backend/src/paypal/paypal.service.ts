// src/paypal/paypal.service.ts
import { Injectable } from '@nestjs/common';
import * as paypal from '@paypal/checkout-server-sdk';

@Injectable()
export class PaypalService {
  private environment: paypal.core.LiveEnvironment | paypal.core.SandboxEnvironment;
  private client: paypal.core.PayPalHttpClient;

  constructor() {
    const clientId = process.env.PAYPAL_CLIENT_ID;
    const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
    const isLive = process.env.PAYPAL_MODE === 'live';

    this.environment = isLive
      ? new paypal.core.LiveEnvironment(clientId, clientSecret)
      : new paypal.core.SandboxEnvironment(clientId, clientSecret);

    this.client = new paypal.core.PayPalHttpClient(this.environment);
  }

  getClient() {
    return this.client;
  }
}
