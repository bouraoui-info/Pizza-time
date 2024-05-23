import braintree from 'braintree'
const environment = process.env.BRAINTREE_ENVIRONMENT
const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: 'tntvsyxs3f6hnpts',
  publicKey: "twx8cq4b26mkcbf3",
  privateKey: "d60f5f42d4ec800cc52970e1bc28cdec"
})
export default gateway;