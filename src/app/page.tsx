"use client";

import { useState } from "react";
import { api } from "./services/api";

interface Product {
  id: number;
  nome: string;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProducts, setNewProducts] = useState("");

  async function loadProducts() {
    console.log("carregando produtos...");
    try {
      const response = await api.get("/products");
      console.log(response.data);
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleAddProducts() {
    try {
      const response = await api.post("/products", { name: newProducts });
      const responseData = response.data;
      setNewProducts("");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <main className=" p-4">
      <h1 className="pb-6">AULA 10 - Web-services</h1>
      <div className="flex gap-4 pb-4">
        <button
          className="border border-black px-4 py-2"
          onClick={loadProducts}
        >
          Carregar Produtos
        </button>
        <button
          className="border border-black px-4 py-2"
          onClick={handleAddProducts}
        >
          Adicionar Produtos
        </button>
      </div>

      <div>
        <input
          className="border border-black p-1"
          type="text"
          value={newProducts}
          onChange={(e) => setNewProducts(e.target.value)}
          placeholder="Nome do produto"
        />
      </div>
      <ul className="pt-4">
        {products.map((item) => (
          <li key={item.id}>{item.nome}</li>
        ))}
      </ul>
    </main>
  );
}
