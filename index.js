const express = require('express');
const axios = require('axios');

const app = express();

// Endpoint to filter users by email or username
app.get('/users', async (req, res) => {
  const { search } = req.query;
  
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    const users = response.data.filter(user => user.email.includes(search) || user.username.includes(search));
    const results = {
      success: true,
      total: users.length,
      data: users,
      error: false,
      message: `Search results for "${search}"`
    };
    console.log(results);
    res.json(results);
  } catch (error) {
    console.error(error);
    const results = {
      success: false,
      total: 0,
      data: [],
      error: true,
      message: `Internal Server Error: ${error.message}`
    };
    res.status(500).json(results);
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));


