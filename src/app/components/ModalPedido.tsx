import React, { useState, useEffect } from 'react';

interface Item {
  produtoId: string;
  quantidade: string;
  unitario: string;
  totalItem: string;
}

interface FormData {
  subtotal: number;
  desconto: number;
  acrescimo: number;
  total: number;
  itens: Item[];
  user: string;
}

const CreatePedidoModal = ({ isOpen, onClose, onCreate, existingProducts }:any) => {
  const initialItemState = { produtoId: '', quantidade: '', unitario: '', totalItem: '' };
  const [formData, setFormData] = useState({
    subtotal: 0,
    desconto: 0,
    acrescimo: 0,
    total: 0,
    itens: [initialItemState],
    user: 'b6h6j6yezg7drz1'
  });

  useEffect(() => {
    const calculateTotal = () => {
      let total = formData.subtotal;
      const { desconto, acrescimo } = formData;

      if (desconto !== 0) {
        total -= total * (desconto / 100);
      }

      if (acrescimo !== 0) {
        total += total * (acrescimo / 100);
      }

      return parseFloat(total.toFixed(2));
    };

    setFormData((prevFormData) => ({
      ...prevFormData,
      total: calculateTotal(),
    }));
  }, [formData.subtotal, formData.desconto, formData.acrescimo]);

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: parseFloat(value) || 0 }));
  };

  const handleItemChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>, index: number) => {
    const { name, value } = e.target;
    
    setFormData((prevFormData) => {
      const updatedItens = [...prevFormData.itens];
    
      // Check if the name exists in the Item interface before updating
      if (name in updatedItens[index]) {
        updatedItens[index][name as keyof Item] = value;
    
        if (name === 'produtoId') {
          const produto = existingProducts.find((p: any) => p.id === value);
          if (produto) {
            updatedItens[index].unitario = produto.venda.toString();
          }
        }
    
        const quantidade = parseInt(updatedItens[index].quantidade) || 0;
        const unitario = parseFloat(updatedItens[index].unitario) || 0;
        updatedItens[index].totalItem = (quantidade * unitario).toFixed(2);
    
        const subtotal = updatedItens.reduce((acc, item) => acc + parseFloat(item.totalItem), 0);
    
        return { ...prevFormData, itens: updatedItens, subtotal };
      } else {
        // Handle error case where name doesn't match any property in Item
        console.error(`Property '${name}' does not exist in Item interface.`);
        return prevFormData;
      }
    });
  };

  const handleAddItem = () => {
    setFormData((prevFormData) => ({ ...prevFormData, itens: [...prevFormData.itens, initialItemState] }));
  };

  const handleRemoveItem = (index:any) => {
    setFormData((prevFormData) => {
      const updatedItens = [...prevFormData.itens];
      updatedItens.splice(index, 1);
      return { ...prevFormData, itens: updatedItens };
    });
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();

    onCreate(formData);
    handleCloseModal();
  };

  const handleCloseModal = () => {
    onClose();
    setFormData({
      subtotal: 0,
      desconto: 0,
      acrescimo: 0,
      total: 0,
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
            <h4 className="text-lg font-medium text-gray-900 mb-2">Itens do Pedido</h4>
            <div className="space-y-4 overflow-y-auto max-h-80">
              {formData.itens.map((item, index) => (
                <div key={index}>
                  <button type="button" onClick={() => handleRemoveItem(index)} className="float-right text-red-600 focus:outline-none font-bold">X</button>
                  <label htmlFor={`produto-${index}`} className="block text-sm font-medium text-gray-700">Produto:</label>
                  <select id={`produto-${index}`} name="produtoId" value={item.produtoId} onChange={(e) => handleItemChange(e, index)} className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" required>
                    <option value="">Selecione um produto</option>
                    {existingProducts.map((produto:any) => (
                      <option key={produto.id} value={produto.id}>{produto.nome}</option>
                    ))}
                  </select>
                  <label htmlFor={`quantidade-${index}`} className="block text-sm font-medium text-gray-700">Quantidade:</label>
                  <input id={`quantidade-${index}`} type="number" name="quantidade" value={item.quantidade} onChange={(e) => handleItemChange(e, index)} className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" required />
                  <label htmlFor={`unitario-${index}`} className="block text-sm font-medium text-gray-700">Preço Unitário:</label>
                  <input id={`unitario-${index}`} type="number" name="unitario" value={item.unitario} readOnly className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" required />
                  <label htmlFor={`total-item-${index}`} className="block text-sm font-medium text-gray-700">Total do Item:</label>
                  <input id={`total-item-${index}`} type="number" name="totalItem" value={item.totalItem} readOnly className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" required />
                </div>
              ))}
            </div>
            <div className=' py-2 pt-10'>
              <div>
                <label htmlFor="subtotal" className="block text-sm font-medium text-gray-700">Subtotal:</label>
                <p>{formData.subtotal.toFixed(2)}</p>
                {/* <input id="subtotal" type="number" name="subtotal" value={formData.subtotal} onChange={handleChange} required /> */}
              </div>
              <div>
                <label htmlFor="desconto" className="block text-sm font-medium text-gray-700">Desconto (%):</label>
                <input id="desconto" type="number" name="desconto" value={formData.desconto} onChange={handleChange} required />
              </div>
              <div>
                <label htmlFor="acrescimo" className="block text-sm font-medium text-gray-700">Acréscimo (%):</label>
                <input id="acrescimo" type="number" name="acrescimo" value={formData.acrescimo} onChange={handleChange} required />
              </div>
              <div>
                <label htmlFor="total" className="block text-sm font-medium text-gray-700">Total:</label>
                <p>{formData.total.toFixed(2)}</p>
              </div>
            </div>
            <button type="button" onClick={handleAddItem} className="w-full py-2 px-4 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:bg-gray-300">Adicionar Produto</button>
            <button type="submit" className="w-full py-2 px-4 bg-[#4de577] text-black rounded-md hover:bg-[#4de577]/80 focus:outline-none focus:bg-[#4de577]/80">Criar Pedido</button>
            <button onClick={onClose} className="w-full py-2 px-4 bg-gray-500 text-white rounded-md hover:bg-gray-600/90 focus:outline-none focus:bg-gray-600/90">Cancelar</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePedidoModal;
