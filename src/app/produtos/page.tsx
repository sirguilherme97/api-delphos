'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'

interface IProduct {
  codbarra: string;
  collectionId: string;
  collectionName: string;
  created: string;
  custo: number;
  estoque: number;
  id: string;
  itens: any;
  margem: number;
  nome: string;
  updated: string;
  user: string;
  venda: number;
}

export default function Home({ accessToken }: { accessToken: string }) {
  const [user, setUser] = useState(null) as any;
  const router = useRouter();
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    // Verifique se o token de acesso está disponível

    //check if has local storage item user
    const user = localStorage.getItem('user');

    if (!user) {
      // Se não houver, redirecione de volta para a página de login
      router.push('/');
    } else {
      // Se houver, busque os produtos com o token de acesso
       setUser(JSON.parse(user));

       fetchProducts(user.token);
    }

    // if (!accessToken) {
    //   // Se não houver, redirecione de volta para a página de login
    //   router.push('/');
    // } else {
    //   // Se houver, busque os produtos com o token de acesso
    //   fetchProducts();
    // }
  }, []);

  async function fetchProducts(token: string) {
    try {
      const response = await axios.get('https://treina1.delphosautomacao.com/api/collections/produtos/records', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = response.data;
      if (data && data.items) {
        setProducts(data.items);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }

  return (
    <main className="flex flex-col items-center justify-start gap-5 bg-white w-full h-screen">
      <header className="h-20 bg-white w-full flex flex-col items-center justify-center gap-2">
        <h1 className="text-[#4de577] font-bold text-2xl">Delphos Automação</h1>
      </header>
      <main className="flex flex-col gap-5 justify-start align-center">
        <p>Bem vindo a Página principal</p>
        <div className="grid grid-cols-2 gap-4">
          {products.map((product) => (
            <div key={product.id} className="border p-4 rounded-md shadow-md">
              <h2 className="text-lg font-semibold">{product.nome}</h2>
              <p>Código de Barras: {product.codbarra}</p>
              <p>Preço de Venda: {product.venda}</p>
            </div>
          ))}
        </div>
      </main>
    </main>
  );
}
