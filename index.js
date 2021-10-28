const express = require('express');
const { ConnectDB } = require('./DataBase/connect');
require('dotenv').config();
const mainRouter = require('./routes/route');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
// Middleware Connection

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

app.use('/user', mainRouter);

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello Every One you are in right way' });
});
const port = process.env.PORT || 5000;

// Connection with Data Base

const Start = async () => {
  try {
    await ConnectDB(process.env.MONGO_URI);
    // Server Connection
    app.listen(port, () => console.log(`server is listing at port ${port}`));
  } catch (error) {
    console.log(error);
  }
};
Start();
