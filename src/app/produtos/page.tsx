'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'
import CreateProductModal from '../components/ModalProduct';


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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Estado de loading

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
    }finally {
      setIsLoading(false); // Definindo o estado de loading como falso quando os produtos são carregados
    }
  }

  async function createProduct(formData: any) {
    try {
      const newProduct: any = {
        codbarra: formData.codbarra,
        custo: formData.custo,
        estoque: formData.estoque,
        margem: formData.margem,
        nome: formData.nome,
        user: 'b6h6j6yezg7drz1',
        venda: formData.venda
      };
      const response = await axios.post('https://treina1.delphosautomacao.com/api/collections/produtos/records', newProduct, {
        headers: {
          Authorization: `Bearer ${user?.token}`
        }
      });

      console.log('Novo produto criado:', response.data);

      // Atualize a lista de produtos após criar o novo produto
      fetchProducts(user?.token);
    } catch (error) {
      console.error('Erro ao criar produto:', error);
    }
  }

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCreateProduct = (formData: any) => {
    // Aqui você pode enviar os dados do produto para onde quiser, como uma função de criação de produto
    console.log(formData);
    createProduct(formData)
      formData.codbarra = '',
      formData.custo =  '',
      formData.estoque =  '',
      formData.margem =  '',
      formData.nome =  '',
      formData.venda =  ''
    
    handleCloseModal();
  };

  return (
    <>
      <CreateProductModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onCreate={handleCreateProduct}
      />
      <main className={`flex flex-col items-center justify-start gap-5 bg-white w-full h-screen ${isModalOpen ? 'blur opacity-35' : 'blur-none'}`}>
        <header className="h-20 min-h-20 bg-white w-full flex flex-col items-center justify-center gap-2">
          <h1 className="text-[#4de577] font-bold text-2xl">Delphos Automação</h1>
        </header>
        <div className='flex gap-3 '>
          <a href="/produtos">Produtos</a>
          <a href="/pedidos">Pedidos</a>
        </div>
        {isLoading ? (
          <div className='h-full'>
            <h1 className='font-bold text-xl text-[#4de577]'>Carregando...</h1>
          </div>
        ): (
        <div className={`flex flex-col w-full items-center justify-center gap-4 px-5 `}>
          <p className='font-bold'>Página de Produtos</p>
          <div className=' flex items-center justify-center w-full'>
            <button
              onClick={handleOpenModal}
              className='bg-[#4de577] rounded-md px-5 py-2 '> Criar Produto</button>
          </div>
          <div className="flex flex-col lg:grid lg:grid-cols-2 items-center justify-center w-full h-auto gap-4">
            {products?.map((product) => (
              <div key={product.id} className="w-full lg:col-span-1 border p-4 rounded-md shadow-md">
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
        </div>
        )}
        <div className='w-full h-40 bg-gray-400 p-5'>
          <h1>Footer</h1>
        </div>
      </main>
    </>
  );
}
