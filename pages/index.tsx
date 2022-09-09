import axios from "axios";
import { useEffect, useState } from "react";

type Product = {
  id: number;
  name: string;
  description: string;
  price: string;
};

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function buscaProdutos() {
      const response = await axios.get("http://localhost:4000/products");

      setProducts(response.data);
    }
    buscaProdutos();
  }, []);

  async function deleteProduct(id: string) {
    await axios.delete(`http://localhost:4000/products/${id}`);
    const novaLista = products.filter((p) => String(p.id) !== id);

    setProducts(novaLista);
  }

  return (
    <div style={{ display: "flex", gap: "1rem" }}>
      {products.map((product) => (
        <div
          key={product.name}
          style={{ backgroundColor: "purple", color: "white", width: "8rem" }}
        >
          <p>{product.name}</p>
          <p>{product.description}</p>
          <p>{product.price}</p>

          <button onClick={() => deleteProduct(String(product.id))}>
            Deletar
          </button>
        </div>
      ))}
    </div>
  );
}
