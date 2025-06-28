import { useState, useEffect } from 'react';
import Product from '../components/Product';
import Form from '../components/Form';


function Pages() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({ name: '', price: '', stock: ''});
  const [currentProductId, setCurrentProductId] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'ascending' });

  // Load data from localStorage
  useEffect(() => {
    const savedProducts = JSON.parse(localStorage.getItem('products'));
    if (savedProducts) {
      setProducts(savedProducts);
    }
    setSortConfig({ key: 'name', direction: 'ascending' });
  }, []);

  // Toggle modal form visibility
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      const updatedProducts = products.map((product, index) =>
        index === currentProductId ? formData : product
      );
      setProducts(updatedProducts);
      localStorage.setItem('products', JSON.stringify(updatedProducts));
      setIsEditing(false);
    } else {
      const newProduct = { ...formData };
      const updatedProducts = [...products, newProduct];

      if (newProduct.name === products.name) {
        
      } else {
        setProducts(updatedProducts);
        localStorage.setItem('products', JSON.stringify(updatedProducts));
      }
    }    

    // Close modal and reset form
    toggleModal();
    setFormData({ name: '', price: '', stock: ''});
  };

  // Handle form cancel
  const handleCancel = (e) => {
    e.preventDefault();
    toggleModal();
    setFormData({ name: '', price: '', stock: ''});
  };

  // Handle edit user
  const handleEdit = (index) => {
    const product = products[index];
    setFormData(product);
    setIsEditing(true);
    setCurrentProductId(index);
    toggleModal();
  };

  // Handle delete user
  const handleDelete = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
  };

  // Handle sorting
  const handleSort = (column) => {
    let direction = 'ascending';
    if (sortConfig.key === column && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key: column, direction });

    const sortedData = [...products].sort((a, b) => {
      if (column === 'stock') {
        return direction === 'ascending' ? a.stock - b.stock : b.stock - a.stock;
      } else {
        return direction === 'ascending'
          ? a[column].localeCompare(b[column])
          : b[column].localeCompare(a[column]);
      }
    });

    setProducts(sortedData);
    localStorage.setItem('products', JSON.stringify(sortedData));
  };

  const getSortIconClass = (column) => {
    if (sortConfig.key === column) {
      return sortConfig.direction === 'ascending' ? (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 28 28" strokeWidth={2} stroke="currentColor" className="size-4 inline-block">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25 12 21m0 0-3.75-3.75M12 21V3" />
        </svg>
        ) : (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 28 28" strokeWidth={2} stroke="currentColor" className="size-4 inline-block">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75 12 3m0 0 3.75 3.75M12 3v18" />
        </svg>
      );
    }
    return '';
  };

  return (
    <div>
      <div className="max-h-screen block rounded-lg bg-gray-200 m-10 p-10 text-surface shadow-secondary-1 dark:bg-surface-dark dark:text-black">
        <h1 className="flex-1 text-4xl font-medium leading-tight">Manajemen Produk</h1>
        <div className="flex justify-between my-6">
          <form class="max-w-md">   
            <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div class="relative">
                <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                </div>
                <input type="search" id="default-search" class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500" placeholder="Cari nama produk" required />
                <button type="submit" class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2">Search</button>
            </div>
          </form>
          <button
            type="button"
            onClick={() => {
              setIsEditing(false);
              toggleModal();
            }}
            className="px-4 bg-blue-500 text-white rounded-lg"
          >
            Tambah Produk 
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 28" strokeWidth={1.5} stroke="currentColor" className="size-6 inline-block">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </button>
        </div>
        <Product        
            products={products} 
            handleEdit={handleEdit} 
            handleDelete={handleDelete} 
            handleSort={handleSort} 
            getSortIconClass={getSortIconClass}
        />
        {isModalOpen && (
          <Form
            isEditing={isEditing} 
            formData={formData} 
            handleChange={handleChange} 
            handleSubmit={handleSubmit} 
            handleCancel={handleCancel} 
            toggleModal={toggleModal}
          />
        )}
      </div>      
    </div>
  );
}

export default Pages;
