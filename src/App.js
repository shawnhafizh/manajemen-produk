import { useState, useEffect } from 'react';
import './App.css';
import Product from './components/Product';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({ name: '', price: '', stock: ''});
  const [currentUserId, setCurrentUserId] = useState(null);
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
      const updatedProducts = products.map((user, index) =>
        index === currentUserId ? formData : user
      );
      setProducts(updatedProducts);
      localStorage.setItem('products', JSON.stringify(updatedProducts));
      setIsEditing(false);
    } else {
      const newUser = { ...formData };
      const updatedProducts = [...products, newUser];
      setProducts(updatedProducts);
      localStorage.setItem('products', JSON.stringify(updatedProducts));
    }

    // Close modal and reset form
    toggleModal();
    setFormData({ name: '', price: '', stock: ''});
  };

  // Handle edit user
  const handleEdit = (index) => {
    const user = products[index];
    setFormData(user);
    setIsEditing(true);
    setCurrentUserId(index);
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
      if (column === 'age') {
        return direction === 'ascending' ? a.age - b.age : b.age - a.age;
      } else if (column === 'status') {
        return direction === 'ascending'
          ? a.status.localeCompare(b.status)
          : b.status.localeCompare(a.status);
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
    <div className="App">
      <Product        
          products={products} 
          handleEdit={handleEdit} 
          handleDelete={handleDelete} 
          handleSort={handleSort} 
          getSortIconClass={getSortIconClass}
      />
    </div>
  );
}

export default App;
