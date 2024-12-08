let express = require('express');
let cors = require('cors');
const { resolve } = require('path');

const app = express();
const port = 3010;

app.use(cors());

let taxRate = 5;
let discountPercentage = 10;
let loyaltyRate = 2;

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

// <http://localhost:3000/cart-total?newItemPrice=1200&cartTotal=0>

app.get('/cart-total', (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);
  var totalCartValue = newItemPrice + cartTotal;
  res.send(totalCartValue.toString());
});

// API Call: <http://localhost:3000/membership-discount?cartTotal=3600&isMember=true>

// Expected Output: 3240

app.get('/membership-discount', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let result = cartTotal * 0.9;
  res.send(result.toString());
});

// <http://localhost:3000/calculate-tax?cartTotal=3600>

app.get('/calculate-tax', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let result = cartTotal * 0.05;
  res.send(result.toString());
});

// <http://localhost:3000/estimate-delivery?shippingMethod=express&distance=600>

// If the shippingMethod = Standard, the delivery days will be 1 day per 50 kms.

// If the shippingMethod = Express, the delivery days will be 1 day per 100 kms.

app.get('/estimate-delivery', (req, res) => {
  let shippingMethod = req.query.shippingMethod.toLowerCase();
  let distance = parseFloat(req.query.distance);
  let result;
  if (shippingMethod == 'express') {
    result = distance / 100;
  } else {
    result = distance / 50;
  }
  res.send(result.toString());
});

// weight * distance * 0.1 where weight is 2 kgs.

// API Call: <http://localhost:3000/shipping-cost?weight=2&distance=600>

// Expected Output: 120

app.get('/shipping-cost', (req, res) => {
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);
  let result = weight * distance * 0.1;
  res.send(result.toString());
});

// API Call: <http://localhost:3000/loyalty-points?purchaseAmount=3600>

// Expected Output: 7200

app.get('/loyalty-points', (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);
  let result = purchaseAmount * 2;
  res.send(result.toString());
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
