import { useState } from 'react';

const CreateProductModal = ({ isOpen, onClose, onCreate }: any) => {
  const [formData, setFormData] = useState({
    codbarra: '',
    custo: '',
    estoque: '',
    margem: '',
    nome: '',
    venda: ''
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onCreate(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="blur-none fixed inset-0 flex items-center justify-center z-50 overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
      <div className="relative w-auto max-w-full p-6 mx-auto h-5/6 bg-white rounded-xl shadow-xl">
        <div className="mt-2 text-center sm:mt-0 sm:ml-4 sm:text-left">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Criar Novo Produto</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
          <div>
              <label htmlFor="nome" className="block text-sm font-medium text-gray-700">Nome:</label>
              <input
                id="nome"
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="codbarra" className="block text-sm font-medium text-gray-700">Código de Barras:</label>
              <input
                id="codbarra"
                type="text"
                name="codbarra"
                value={formData.codbarra}
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="custo" className="block text-sm font-medium text-gray-700">Custo:</label>
              <input
                id="custo"
                type="number"
                name="custo"
                value={formData.custo}
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="estoque" className="block text-sm font-medium text-gray-700">Estoque:</label>
              <input
                id="estoque"
                type="number"
                name="estoque"
                value={formData.estoque}
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="margem" className="block text-sm font-medium text-gray-700">Margem:</label>
              <input
                id="margem"
                type="number"
                name="margem"
                value={formData.margem}
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            
            <div>
              <label htmlFor="venda" className="block text-sm font-medium text-gray-700">Preço de Venda:</label>
              <input
                id="venda"
                type="number"
                name="venda"
                value={formData.venda}
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <button type="submit" className="w-full py-2 px-4 bg-[#4de577] text-black rounded-md hover:bg-[#4de577]/80 focus:outline-none focus:bg-[#4de577]/80">Criar Produto</button>
            <button onClick={onClose} className="w-full py-2 px-4 bg-gray-500 text-white rounded-md hover:bg-gray-600/90 focus:outline-none focus:bg-gray-600/90">Cancelar</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProductModal;
