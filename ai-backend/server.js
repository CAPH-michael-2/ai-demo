const express = require('express')
const app = express()
const streamChat = require('./vertex');

app.use(express.json());

app.post("/query", async (req,res) =>{
    const data = req.body.message;
    try {
        const result = await streamChat(data);
        res.send(result);
      } catch (error) {
        res.status(500).send(error.message);
      }
})

app.listen(5000, () => {
    console.log('Server listening on port 5000');
})