// Popula o banco com pratos de exemplo: node seed.js
require("dotenv").config();
const mongoose = require("mongoose");
const Prato    = require("./models/Prato");

const img = function(id) { return "https://images.unsplash.com/" + id + "?w=600&q=60&fit=crop"; };

const pratos = [
  { nome: "Taco al Pastor", descricao: "Carne de porco marinada, abacaxi, coentro e cebola", preco: 24.90, categoria: "Tacos", picante: 2,
    imagem: img("photo-1565299585323-38d6b0865b47") },
  { nome: "Taco de Carnitas", descricao: "Porco desfiado, guacamole e pico de gallo", preco: 22.90, categoria: "Tacos", picante: 1,
    imagem: img("photo-1599974579688-8dbdd335c77f") },
  { nome: "Burrito Supremo", descricao: "Tortilla recheada com carne, arroz, feijão e queijo", preco: 32.90, categoria: "Burritos", picante: 1,
    imagem: img("photo-1626700051175-6818013e1d4f") },
  { nome: "Burrito Vegetariano", descricao: "Legumes grelhados, arroz, feijão preto e guacamole", preco: 28.90, categoria: "Burritos", picante: 0,
    imagem: img("photo-1584208632869-05fa2b2a5934") },
  { nome: "Quesadilla de Queijo", descricao: "Tortilla crocante com mix de queijos derretidos", preco: 26.90, categoria: "Quesadillas", picante: 0,
    imagem: img("photo-1618040996337-56904b7850b9") },
  { nome: "Nachos Especiales", descricao: "Tortilhas crocantes, cheddar, jalapeños e sour cream", preco: 34.90, categoria: "Nachos", picante: 3,
    imagem: img("photo-1513456852971-30c0b8199d4d") },
  { nome: "Água de Horchata", descricao: "Bebida tradicional de arroz com canela", preco: 12.90, categoria: "Bebidas", picante: 0,
    imagem: img("photo-1645516957558-c165fd13be62") },
  { nome: "Refresco de Tamarindo", descricao: "Suco natural de tamarindo gelado", preco: 10.90, categoria: "Bebidas", picante: 0,
    imagem: img("photo-1470752354724-60a1d2b1907f") },
  { nome: "Churros con Dulce", descricao: "Churros crocantes com doce de leite e canela", preco: 18.90, categoria: "Sobremesas", picante: 0,
    imagem: img("photo-1669867405064-f31e8707216e") },
  { nome: "Flan Mexicano", descricao: "Pudim cremoso de baunilha com calda de caramelo", preco: 16.90, categoria: "Sobremesas", picante: 0,
    imagem: img("photo-1702728109878-c61a98d80491") }
];

mongoose.connect(process.env.MONGODB_URI)
  .then(async function() {
    await Prato.deleteMany({});
    await Prato.insertMany(pratos);
    console.log("✅ " + pratos.length + " pratos inseridos!");
    process.exit(0);
  })
  .catch(function(err) {
    console.error("❌ Erro:", err.message);
    process.exit(1);
  });
