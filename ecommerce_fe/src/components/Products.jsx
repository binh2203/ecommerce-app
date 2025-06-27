
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Products.css';


function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container-products">
      <div className="grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            {product.image_url && (
              <img src={`http://127.0.0.1:8000/product-images/${product.image_url}`} alt={product.name} />
            )}
            <p className="description-font">{product.description}</p>
            <p className="price-red">{Number(product.price).toLocaleString('vi-VN')} ₫</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
