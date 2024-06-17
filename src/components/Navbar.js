import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';
import Cart from '../screens/Cart'; // Ensure this path is correct based on your project structure
import Modal from '../Modal'; 

export default function Navbar() {
    const [cartView, setCartView] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        navigate("/login");
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-success">
            <div className="container-fluid">
                <Link className="navbar-brand fs-1 fst-italic" to="/">GoFood</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav me-auto mb-2">
                        <Link className="nav-link active fs-5" aria-current="page" to="/">Home</Link>
                    </div>
                    <div className='d-flex ms-auto '>
                        {localStorage.getItem("authToken") &&
                            <Link className="nav-link active text-white mx-1" to="/">My Orders</Link>
                        }
                    </div>

                    {!localStorage.getItem("authToken") ?
                        <div className='d-flex'>
                            <Link className="btn bg-white text-success mx-1" to="/login">Login</Link>
                            <Link className="btn bg-white text-success mx-1" to="/signup">Sign Up</Link>
                        </div>
                        :
                        <div>
                            <div className='btn bg-white text-success mx-2' onClick={() => { setCartView(true) }}>
                                My Cart{"  "}
                                <Badge pill bg="danger">2</Badge> {/* Replace with actual cart item count */}
                            </div>
                            {cartView &&
                                <Modal onClose={() => setCartView(false)}>
                                    <Cart />
                                </Modal>
                            }
                            <div className='btn bg-white text-danger mx-2' onClick={handleLogout}>
                                Logout
                            </div>
                        </div>
                    }
                </div>
            </div>
        </nav>
    );
}
