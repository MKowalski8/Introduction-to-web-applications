import React, { useState, useEffect } from 'react';
import './ProductList.css';



const App = () => {
  const [products, setProducts] = useState([]);
  const [originalProducts, setOriginalProducts] = useState([]);
  
  const [filter, setFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('no-sort');
  
  const [editedProductTitle, setEditedProductTitle] = useState('');
  const [editedProductDescription, setEditedProductDescription] = useState('');
  const [editingProductId, setEditingProductId] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products`);
        const data = await response.json();

        if (data.products) {
          setOriginalProducts(data.products)
          setProducts(data.products);
          // console.log([...originalProducts])
        } else {
          console.error('Invalid data format:', data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    
    fetchData();
  }, []);

  function sortChange() {
    // console.log("Its first")

    if (sortOrder === 'no-sort') setSortOrder('asc');
    else if (sortOrder === 'asc') setSortOrder('desc');
    else setSortOrder('no-sort');
  };

  useEffect(() =>{
    setProducts(getSort([...products]));
  }, [sortOrder])


  const getSort = (productsList) => {
    if (sortOrder === 'no-sort' && filter === '') {
      return [...originalProducts];
    } else if (sortOrder === 'asc') {
      const sortedProducts = [...productsList].sort((a, b) => (a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1));
      return sortedProducts;
    } else {
      const sortedProducts = [...productsList].sort((a, b) => (a.title.toLowerCase() < b.title.toLowerCase() ? 1 : -1));
      return sortedProducts;
    }
  }
  


  function filterProducts() {
    console.log(filter)
    if (!filter) {
      console.log('undo')
      setProducts(getSort([...originalProducts]))
    } else {
      const filteredProducts = originalProducts.filter((product) =>
        product.title.toLowerCase().includes(filter.toLowerCase())
      );
      setProducts(getSort([...filteredProducts]));
    }
  };

  useEffect(() => {
    filterProducts();
  }, [filter]);


  
  const startEditing = (productId, initialTitle, initialDescription) => {
    setEditingProductId(productId);
    setEditedProductTitle(initialTitle);
    setEditedProductDescription(initialDescription);
  };

  const cancelEditing = () => {
    setEditingProductId(null);
    setEditedProductTitle('');
    setEditedProductDescription('');
  };
  
  const saveChanges = (productId) => {
    const updatedProducts = products.map((product) =>
      product.id === productId
        ? { ...product, title: editedProductTitle, description: editedProductDescription }
        : product
    );

    setProducts(updatedProducts);

    setOriginalProducts((prevOriginalProducts) => {
      const updatedOriginalProducts = prevOriginalProducts.map((product) =>
        product.id === productId
          ? { ...product, title: editedProductTitle, description: editedProductDescription }
          : product
      );
      return updatedOriginalProducts;
    });

    setEditingProductId(null);
    setEditedProductTitle('');
    setEditedProductDescription('');
  };



  return (
    <div>
      <h1>Product List</h1>
        <input
          type="text"
          placeholder="Filter by name"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <button onClick={() => {sortChange()
        }}>{sortOrder}</button>
        <ul>
        {products.map((product) => (
          <li key={product.id}>
            {editingProductId === product.id ? (
              <>
                <input
                  type="text"
                  value={editedProductTitle}
                  onChange={(e) => setEditedProductTitle(e.target.value)}
                />
                <br />
                <textarea
                  value={editedProductDescription}
                  onChange={(e) => setEditedProductDescription(e.target.value)}
                ></textarea>
                <br /><br />
                <button onClick={() => saveChanges(product.id)}>Save</button>
                <button onClick={cancelEditing}>Cancel</button>
                <br /><br />

              </>
            ) : (
              <>
                <strong>{product.title}</strong>
                <button className="editButton" onClick={() => startEditing(product.id, product.title, product.description)}>
                  Edit
                </button>
                <br />
                {product.description}
                <br /><br />
                <img src={product.images[0]} alt={product.title} />
                <br /><br /><br />
              </>
            )}
          </li>
          ))}
        </ul>
    </div>
  );
};

export default App;
