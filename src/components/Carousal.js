import React from 'react'

export default function Carousal() {
  return (
    <div>
      <div>
        <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{objectFit:"contain !important"}}>

          <div className="carousel-inner" id='carousel'>
            <div className="carousel-caption" style={{zIndex:"10"}}>
              <form className="d-flex">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                  <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button>
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

    </div>


  )
}
