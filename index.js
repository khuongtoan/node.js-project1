const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req,res) =>{
  res.send('Trang chu');
})
app.get('/tours', (req,res) =>{
  res.send('danh sach tour');
})



app.listen(port,() => {
  console.log(`website is running on port ${port}`);
})