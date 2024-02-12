const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const paymentRoutes = require('./routes/payment');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/payment', paymentRoutes);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

