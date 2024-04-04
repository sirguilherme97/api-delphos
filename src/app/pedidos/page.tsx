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
  const [tokenAccess, setTokenAccess] = useState('');
  const router = useRouter();
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    // Verifique se o token de acesso está disponível
    //check if has local storage item user
    const storedUser = localStorage.getItem('user');

    if (!storedUser) {
      // Se não houver, redirecione de volta para a página de login
      router.push('/');
    } else {
      // Se houver, busque os produtos com o token de acesso
      setUser(JSON.parse(storedUser));
      console.log(user?.token)
      fetchProducts(user?.token);
    }

    if (!storedUser) {
      // Se não houver, redirecione de volta para a página de login
      router.push('/');
    }
  }, [user?.token]);

  async function fetchProducts(token: string) {
    try {
      const response = await axios.get('https://treina1.delphosautomacao.com/api/collections/pedidos/records', {
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
        <div className='flex gap-3 '>
        <a href="/produtos">Produtos</a>
        <a href="/pedidos">Pedidos</a>
        </div>
      </header>
      <main className="flex flex-col w-full items-center justify-center gap-4 px-5">
        <p>Bem vindo a Página principal</p>
        <div className="flex flex-col items-center justify-center w-full h-auto gap-4">
          {products?.map((product) => (
            <div key={product.id} className="w-full border p-4 rounded-md shadow-md">
              <h2 className="text-lg font-semibold">{product.nome}</h2>
              <p>Código de Barras: {product.codbarra}</p>
              <p>Preço de Venda: {product.venda}</p>
              <p>Collection ID: {product.collectionId}</p>
              <p>Collection Name: {product.collectionName}</p>
              <p>Data de Criação: {product.created}</p>
              <p>Custo: {product.custo}</p>
              <p>Estoque: {product.estoque}</p>
              <p>ID: {product.id}</p>
              <p>Margem: {product.margem}</p>
              <p>Atualizado: {product.updated}</p>
              <p>Usuário: {product.user}</p>
            </div>
          ))}
        </div>
      </main>
    </main>
  );
}
