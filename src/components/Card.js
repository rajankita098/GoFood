// Card.js
import React, { useState, } from 'react';
import { useDispatchCart,useCart } from './ContextReducer';

export default function Card({ item }) {
  const dispatch = useDispatchCart();
  const data = useCart();

  const foodItem = item || {};
  const imgSrc = foodItem.img;
  const foodName = foodItem.name || "Unknown Food";
  const options = foodItem.options ? foodItem.options[0] || {} : {};
  const priceOptions = Object.keys(options);

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState(priceOptions[0] || "");

  const handleAddToCart = async () => {
    if (!foodItem._id) {
      console.error('Missing food item ID');
      return;
    }

    await dispatch({
      type: "ADD",
      id: foodItem._id,
      name: foodItem.name,
      price: options[size] * qty,
      qty: qty,
      size: size,
      img: foodItem.img
    });

    console.log('Cart state after dispatch:', data); // Ensure data is updated in the cart state
  };

  let finalPrice = qty * parseInt(options[size] || 0);

  return (
    <div className="d-flex justify-content-start mt-3">
      <div className="card w-100" style={{ maxHeight: "400px" }}>
        <img src={imgSrc} className="card-img-top" alt={foodName} style={{ height: "200px", objectFit: "fill" }} />
        <div className="card-body">
          <h5 className="card-title">{foodName}</h5>
          <div className='container w-100'>
            <select className='m-2 h-100 bg-success rounded' value={qty} onChange={(e) => setQty(parseInt(e.target.value))}>
              {Array.from(Array(6), (e, i) => (
                <option key={i + 1} value={i + 1}>{i + 1}</option>
              ))}
            </select>

            <select className='m-2 h-100 bg-success rounded' value={size} onChange={(e) => setSize(e.target.value)}>
              {priceOptions.map((option, index) => (
                <option key={index} value={option}>{option}</option>
              ))}
            </select>
          </div>
          <div className='d-inline h-100 fs-5'>
            Price: {finalPrice}/-
          </div>
          <hr />
          <button className='btn btn-success justify-center ms-2' onClick={handleAddToCart}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
}
