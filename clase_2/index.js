const express = require("express");
const fs = require("fs/promises");

const app = express();
const PORT = 8000;

// Esto permite a express entender JSON
app.use(express.json())

// R all
app.get("/products", async (request, response) => {
  // Leo la DB (consulta)
  const data = await fs.readFile(__dirname + "/db/db.txt", "utf-8");

  // Le respondo al front con la data que consulte
  response.json(JSON.parse(data));
});

// R por ID
app.get("/products/:id", async (request, response) => {
  // Necesito obtener el id ese que viaja en el endpoint
  const { id } = request.params;

  // Leo la DB (consulta)
  const data = await fs.readFile(__dirname + "/db/db.txt", "utf-8");

  // Transformar la data a JS
  const products = JSON.parse(data);

  // Quiero encontrar un producto en la DB cuyo ID coincide con el
  // que me pidio el front
  const product = products.find(product => product.id === id)

  if(!product) {
    return response.json({statsText: "Producto no encontrado", status: 404})
  }

  response.json(product)
});

// C
app.post("/products", async (request, response) => {
    const newProduct = request.body;

    // Leo la DB (consulta)
    const data = await fs.readFile(__dirname + "/db/db.txt", "utf-8");

    // Transformar la data a JS
    const products = JSON.parse(data);

    // Con la DB parseada, quiero pushearle el newProduct (insertar el producto)
    products.push({ id: String(Date.now()),...newProduct})

    // Sobreescribo la base de datos con los cambios
    await fs.writeFile(__dirname + "/db/db.txt", JSON.stringify(products), "utf-8")

    response.json({statusText: "Producto agregado al carrito.", status: 201})
})

// U

// D

app.listen(PORT, () => {
  console.log("Servidor funcionando");
});

// Objeto de peticion
// const request = {
//     headers: {
//         authorization: "a8s7das7d89a8s9d7a89sd7a89sd7"
//     },
//     body: {
//         nombre: "Termo Stanley",
//         precio: "Todo tu sueldo",
//         cantidad: 1
//     },
//     params: {
//         id: 5,
//         name: "Termo Stanley"
//     }
// }
