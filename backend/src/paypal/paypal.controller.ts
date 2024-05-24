// src/paypal/paypal.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { PaypalService } from './paypal.service';
import * as paypal from '@paypal/checkout-server-sdk';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('paiement')
@Controller('paypal')
export class PaypalController {
  constructor(private readonly paypalService: PaypalService) {}

  @Post('create-payment')
  async createPayment(@Body() paymentDto: any) {
    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer('return=representation');
    request.requestBody(paymentDto);

    try {
      const response = await this.paypalService.getClient().execute(request);
      return response.result;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  @Post('capture-payment')
  async capturePayment(@Body('orderId') orderId: string) {
    const request = new paypal.orders.OrdersCaptureRequest(orderId);
    request.requestBody({});

    try {
      const response = await this.paypalService.getClient().execute(request);
      return response.result;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}
