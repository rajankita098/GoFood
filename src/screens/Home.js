import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';

export default function Home() {
  const [foodCat, setFoodCat] = useState([]); // Initialize as an empty array
  const [foodItem, setFoodItem] = useState([]);
  const [search, setSearch] = useState('');

  const loadData = async () => {
    try {
      let response = await fetch("http://localhost:5000/api/foodData", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const foodData = await response.json();
      console.log('Response:', foodData); // Debug logging to ensure the response structure

      setFoodCat(foodData[1] || []);
      setFoodItem(foodData[0] || []);  // Ensure data is defined or set an empty array
    } catch (error) {
      console.error('Failed to fetch:', error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Function to filter food items by category and search term
  const getItemsByCategory = (categoryName) => {
    return foodItem.filter((item) => 
      item.CategoryName === categoryName && item.name.toLowerCase().includes(search.toLowerCase())
    );
  };

  return (
    <>
      

      <div>
        <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{objectFit:"contain !important"}}>

            <div className="carousel-inner" id='carousel'>
              <div className="carousel-caption" style={{zIndex:"10"}}>
                <form className="d-flex justify-content-center">
                  <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}}/>
                </form>
              </div>

              <div className="carousel-item active">
                <img src="https://t4.ftcdn.net/jpg/02/75/39/23/360_F_275392381_9upAWW5Rdsa4UE0CV6gRu2CwUETjzbKy.jpg" className="d-block w-100" style={{filter: "brightness(30%)"}} alt="..." />
              </div>
              <div className="carousel-item">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjAMLedZRk2kc2Gg7NC0jRaHIjxa1-vf-b_A&s" className="d-block w-100" style={{filter: "brightness(30%)"}} alt="..." />
              </div>
              <div className="carousel-item">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjAMLedZRk2kc2Gg7NC0jRaHIjxa1-vf-b_A&s" className="d-block w-100" style={{filter: "brightness(30%)"}} alt="..." />
              </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
      </div>
        
      <div className='container'>
        {foodCat && foodCat.length > 0 ? (
          foodCat.map((category) => (
            <div key={category._id}>
              <h2>{category.CategoryName}</h2>
              {getItemsByCategory(category.CategoryName).length > 0 ? (
                <div className="row">
                  {getItemsByCategory(category.CategoryName).map((item) => (
                    <div key={item._id} className="col-12 col-md-6 col-lg-3">
                      <Card item={item} />
                      {/*<Card foodItem = {item}
                      options={item.options[0]}
                      ></Card>*/}
                    </div>
                  ))}
                </div>
              ) : (
                <div>No Items Available</div>
              )}
              <hr />
            </div>
          ))
        ) : (
          <div>No Categories Available</div>
        )}
      </div>

      <div>
        <Footer />
      </div>
    </>
  );
}
