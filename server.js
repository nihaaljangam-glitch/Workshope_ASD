const express = require('express')
const path = require('path')
const fs = require('fs/promises')
const app = express()
let pathTofile = path.join(__dirname, 'db.json')

async function readmyFile(){
    try{
        let data = await fs.readFile(pathTofile, 'utf-8')
        const items = JSON.parse(data)
        return items
    }catch(err){
        console.log(err)
    }
}
async function readFilewithDelay(){
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, 1500)
  })
  let products = await readmyFile()
  return products
}


app.get('/products', async (req, res) => {
  try {
    const products = await readMyFile()
    res.json(products)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Failed to fetch products' })
  }
})

app.get('/products/:id', async (req, res) => {
  try {
    const products = await readMyFile()
    const id = Number(req.params.id)
    const product = products.find((item) => item.id === id)

    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }

    res.json(product)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Failed to fetch product' })
  }
})

app.listen(3000, () => {
  console.log('Server running on port 3000')
})