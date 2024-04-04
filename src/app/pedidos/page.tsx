'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import CreatePedidoModal from '../components/ModalPedido';

interface IPedidoItem {
  produto: string;
  quantidade: number;
  total: number;
  unitario: number;
}

interface IPedido {
  acrescimo: number;
  collectionId: string;
  collectionName: string;
  created: string;
  desconto: number;
  id: string;
  itens: IPedidoItem[];
  subtotal: number;
  total: number;
  updated: string;
  user: string;
}

export default function Pedidos({ accessToken }: { accessToken: string }) {
  const [user, setUser] = useState(null) as any;
  const router = useRouter();
  const [pedidos, setPedidos] = useState<IPedido[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Estado de loading
  useEffect(() => {
    const storedUser = localStorage.getItem('user');

    if (!storedUser) {
      router.push('/');
    } else {
      setUser(JSON.parse(storedUser));
      fetchPedidos(user?.token);
    }
  }, [user?.token]);

  async function fetchPedidos(token: string) {
    try {
      const response = await axios.get('https://treina1.delphosautomacao.com/api/collections/pedidos/records', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = response.data;
      if (data && data.items) {
        setPedidos(data.items);
      }
    } catch (error) {
      console.error('Error fetching pedidos:', error);
    } finally {
      setIsLoading(false); // Definindo o estado de loading como falso quando os produtos são carregados
    }
  }

  async function createPedido(formData: any) {
    try {
      const response = await axios.post('https://treina1.delphosautomacao.com/api/collections/pedidos/records', formData, {
        headers: {
          Authorization: `Bearer ${user?.token}`
        }
      });

      console.log('Novo pedido criado:', response.data);

      // Atualize a lista de pedidos após criar o novo pedido
      fetchPedidos(user?.token);
    } catch (error) {
      console.error('Erro ao criar pedido:', error);
    }
  }

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <CreatePedidoModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onCreate={createPedido}
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
        ) : (
          <div className="flex flex-col w-full items-center justify-center gap-4 px-5">
            <p className='font-bold'>Página de Pedidos</p>
            <div className=' flex items-center justify-center w-full'>
              <button
                onClick={handleOpenModal}
                className='bg-[#4de577] rounded-md px-5 py-2 '> Criar Pedido
              </button>
            </div>
            <div className="flex flex-col items-center justify-center w-full h-auto gap-4">
              {pedidos?.map((pedido) => (
                <div key={pedido.id} className="w-full border p-4 rounded-md shadow-md">
                  <h2 className="text-lg font-semibold">Pedido ID: {pedido.id}</h2>
                  <p>Acrescimo: {pedido.acrescimo}</p>
                  <p>Collection ID: {pedido.collectionId}</p>
                  <p>Collection Name: {pedido.collectionName}</p>
                  <p>Data de Criação: {pedido.created}</p>
                  <p>Desconto: {pedido.desconto}</p>
                  <p>Subtotal: {pedido.subtotal}</p>
                  <p>Total: {pedido.total}</p>
                  <p>Atualizado: {pedido.updated}</p>
                  <p>Usuário: {pedido.user}</p>
                  <h3>Itens do Pedido:</h3>
                  {pedido.itens.map((item, index) => (
                    <div key={index}>
                      <p>Produto: {item.produto}</p>
                      <p>Quantidade: {item.quantidade}</p>
                      <p>Total: {item.total}</p>
                      <p>Unitário: {item.unitario}</p>
                    </div>
                  ))}
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
