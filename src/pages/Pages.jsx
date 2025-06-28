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
        <div className="flex mb-6">
          <h1 className="flex-1 text-4xl font-medium leading-tight">Manajemen Produk</h1>
          <button
            type="button"
            onClick={() => {
              setIsEditing(false);
              toggleModal();
            }}
            className="bg-red text-black"
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
