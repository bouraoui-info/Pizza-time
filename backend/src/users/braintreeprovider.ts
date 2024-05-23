import { Injectable } from '@nestjs/common';
import * as braintree from 'braintree';

@Injectable()
export class BraintreeProvider {
readonly gateway: braintree.BraintreeGateway;

constructor() {
    this.gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: 'tntvsyxs3f6hnpts',
    publicKey: "twx8cq4b26mkcbf3",
    privateKey: "d60f5f42d4ec800cc52970e1bc28cdec"
    });
}

}