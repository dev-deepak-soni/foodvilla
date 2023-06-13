var express = require('express');
const app = express();
var cors = require('cors')
const port = 5000

app.use(express.json());
app.use(cors())


app.use('/create',require('./modals/orders'));
app.use('/payment',require('./modals/orders'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})