const express = require('express');
const fs=require('fs');
const path=require('path');
const app = express()
const port = 3000
const pathToFile=path.join(__dirname,'db.json');
async function readFile(){
  let data=await fs.promises.readFile(pathToFile,'utf-8');
  console.log(data);
  return JSON.parse(data);
}
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})