import React, { useState, useRef, useEffect } from 'react';

const CreatePedidoModal = ({ isOpen, onClose, onCreate }: any) => {
  const initialItemState = { produto: '', quantidade: '', unitario: '', total: '' };
  const [formData, setFormData] = useState({
    subtotal: '',
    desconto: '',
    acrescimo: '',
    total: '',
    itens: [initialItemState],
    user: 'b6h6j6yezg7drz1'
  });

  // Referência para a div que contém os itens do pedido
  const itemsContainerRef = useRef<HTMLDivElement>(null);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleItemChange = (e: any, index: number) => {
    const { name, value } = e.target;
    const updatedItens = [...formData.itens];
    updatedItens[index][name] = value;
    setFormData({ ...formData, itens: updatedItens });
  };

  const handleAddItem = () => {
    setFormData({ ...formData, itens: [...formData.itens, initialItemState] });
  };

  const handleRemoveItem = (index: number) => {
    const updatedItens = [...formData.itens];
    updatedItens.splice(index, 1);
    setFormData({ ...formData, itens: updatedItens });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onCreate(formData);
    handleCloseModal();
  };

  const handleCloseModal = () => {
    onClose();
    // Resetar o número de itens para 1 e limpar os campos
    setFormData({
      subtotal: '',
      desconto: '',
      acrescimo: '',
      total: '',
      itens: [initialItemState],
      user: 'b6h6j6yezg7drz1'
    });
  };



  if (!isOpen) return null;

  return (
    <div className="blur-none fixed inset-0 flex items-center justify-center z-50 overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
      <div className="relative w-auto lg:w-1/3 max-w-full p-6 mx-auto h-auto bg-white rounded-xl shadow-xl">
        <div className="mt-2 text-center sm:mt-0 sm:ml-4 sm:text-left">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Criar Novo Pedido</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Campos de formulário existentes */}
            <div>
              <label htmlFor="subtotal" className="block text-sm font-medium text-gray-700">Subtotal:</label>
              <input
                id="subtotal"
                type="number"
                name="subtotal"
                value={formData.subtotal}
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="desconto" className="block text-sm font-medium text-gray-700">Desconto:</label>
              <input
                id="desconto"
                type="number"
                name="desconto"
                value={formData.desconto}
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="acrescimo" className="block text-sm font-medium text-gray-700">Acréscimo:</label>
              <input
                id="acrescimo"
                type="number"
                name="acrescimo"
                value={formData.acrescimo}
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="total" className="block text-sm font-medium text-gray-700">Total:</label>
              <input
                id="total"
                type="number"
                name="total"
                value={formData.total}
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            {/* Lista de itens do pedido */}
              <h4 className="text-lg font-medium text-gray-900 mb-2">Itens do Pedido</h4>
            <div ref={itemsContainerRef} className="space-y-4 overflow-y-auto max-h-80">
              {formData.itens.map((item: any, index: number) => (
                <div key={index}>
                  <button
                    type="button"
                    onClick={() => handleRemoveItem(index)}
                    className="float-right text-red-600 focus:outline-none"
                  >
                    X
                  </button>
                  <label htmlFor={`produto-${index}`} className="block text-sm font-medium text-gray-700">Produto:</label>
                  <input
                    id={`produto-${index}`}
                    type="text"
                    name="produto"
                    value={item.produto}
                    onChange={(e) => handleItemChange(e, index)}
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <label htmlFor={`quantidade-${index}`} className="block text-sm font-medium text-gray-700">Quantidade:</label>
                  <input
                    id={`quantidade-${index}`}
                    type="number"
                    name="quantidade"
                    value={item.quantidade}
                    onChange={(e) => handleItemChange(e, index)}
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <label htmlFor={`unitario-${index}`} className="block text-sm font-medium text-gray-700">Preço Unitário:</label>
                  <input
                    id={`unitario-${index}`}
                    type="number"
                    name="unitario"
                    value={item.unitario}
                    onChange={(e) => handleItemChange(e, index)}
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <label htmlFor={`total-item-${index}`} className="block text-sm font-medium text-gray-700">Total do Item:</label>
                  <input
                    id={`total-item-${index}`}
                    type="number"
                    name="total"
                    value={item.total}
                    onChange={(e) => handleItemChange(e, index)}
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={handleAddItem}
              className="w-full py-2 px-4 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:bg-gray-300"
            >
              Adicionar Item
            </button>
            {/* Botões de envio e cancelamento */}
            <button type="submit" className="w-full py-2 px-4 bg-[#4de577] text-black rounded-md hover:bg-[#4de577]/80 focus:outline-none focus:bg-[#4de577]/80">Criar Pedido</button>
            <button onClick={onClose} className="w-full py-2 px-4 bg-gray-500 text-white rounded-md hover:bg-gray-600/90 focus:outline-none focus:bg-gray-600/90">Cancelar</button>
          </form>
        </div>
      </div>
    </div>
);
              }
export default CreatePedidoModal;