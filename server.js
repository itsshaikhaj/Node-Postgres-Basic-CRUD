const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoute');

app.use(express.json()); // Parse incoming JSON requests

// Use the user routes
app.use('/api', userRoutes);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
