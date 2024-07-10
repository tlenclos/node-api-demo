const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const app = express();
const port = 3000;

app.use(express.json());

// Fausses données pour les produits
const products = [
  { id: 1, name: "Smartphone", price: 499.99 },
  { id: 2, name: "Laptop", price: 999.99 },
  { id: 3, name: "Tablette", price: 299.99 },
  { id: 4, name: "Écouteurs sans fil", price: 79.99 },
  { id: 5, name: "Montre connectée", price: 199.99 },
];

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API REST Simple",
      version: "1.0.0",
      description: "Une API REST simple avec documentation OpenAPI",
    },
  },
  apis: ["./server.js"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * /api/hello:
 *   get:
 *     summary: Retourne un message de salutation
 *     responses:
 *       200:
 *         description: Succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
app.get("/api/hello", (req, res) => {
  res.json({ message: "Bonjour, monde!" });
});

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Récupère la liste de tous les produits
 *     responses:
 *       200:
 *         description: Succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   price:
 *                     type: number
 */
app.get("/api/products", (req, res) => {
  res.json(products);
});

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Récupère un produit par son ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 price:
 *                   type: number
 *       404:
 *         description: Produit non trouvé
 */
app.get("/api/products/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find((p) => p.id === id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Produit non trouvé" });
  }
});

app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
  console.log(
    `Documentation API disponible sur http://localhost:${port}/api-docs`
  );
});
