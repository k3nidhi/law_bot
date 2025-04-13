// /server/index.js
const express = require('express');
const cors = require('cors');
const generateRoute = require('./routes/generate');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Register the generate route
app.use('/api', generateRoute);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
