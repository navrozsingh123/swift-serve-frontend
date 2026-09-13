import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'

export default function Home() {

    const [foodCat, setFoodCat] = useState([]);
    const [foodItem, setFoodItem] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const loadData = async () => {
        try {
            setLoading(true);
            setError(false);
            let response = await fetch(`${import.meta.env.VITE_API_URL}/api/displayData`);
            if (!response.ok) throw new Error("Failed to fetch");
            response = await response.json();
            setFoodCat(response.foodCategory);
            setFoodItem(response.foodItems);
        } catch (err) {
            console.error("Failed to load menu:", err);
            setError(true);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadData();
    }, []);

    // Check if any category has matching items at all
    const hasAnyResults = foodCat.some((data) =>
        foodItem.some((item) =>
            item.CategoryName === data.CategoryName &&
            item.name.toLowerCase().includes(search.toLowerCase())
        )
    );

    return (
        <div>
            <div><Navbar /></div>
            {/* Carousel i.e search bar and image mover */}
            <div style={{ paddingTop: '73px' }}>
                <div id="carouselExampleFade" className="carousel slide carousel-fade position-relative" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836" className="d-block w-100" style={{ height: '500px', objectFit: 'cover', filter: 'brightness(70%)' }} alt="food" />
                        </div>
                        <div className="carousel-item">
                            <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0" className="d-block w-100" style={{ height: '500px', objectFit: 'cover', filter: 'brightness(70%)' }} alt="food" />
                        </div>
                        <div className="carousel-item">
                            <img src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c" className="d-block w-100" style={{ height: '500px', objectFit: 'cover', filter: 'brightness(70%)' }} alt="food" />
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

                    {/* Search bar — positioned relative to the carousel itself */}
                    <div
                        className="position-absolute bottom-0 start-50 translate-middle-x w-75"
                        style={{ zIndex: 10, marginBottom: '30px' }}
                    >
                        <div
                            className="d-flex align-items-center p-2"
                            style={{
                                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                                backdropFilter: 'blur(16px)',
                                WebkitBackdropFilter: 'blur(16px)',
                                borderRadius: '50px',
                                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                                border: '1px solid rgba(255, 255, 255, 0.3)'
                            }}
                        >
                            <span className="ps-3 pe-2" style={{ color: '#fff', fontSize: '1.2rem' }}>
                                <i className="bi bi-search"></i>
                            </span>
                            <input
                                className="form-control border-0 shadow-none"
                                type="search"
                                placeholder="Search for food, dishes, or cuisines..."
                                aria-label="Search"
                                style={{ backgroundColor: 'transparent', fontSize: '1rem', color: '#fff' }}
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Cards: */}
            <div className="container py-4">
                {loading && (
                    <div className="text-center text-white py-5">Loading menu...</div>
                )}

                {!loading && error && (
                    <div className="text-center text-white py-5">
                        Couldn't load the menu. Please check your connection and try again.
                    </div>
                )}

                {!loading && !error && foodCat.length !== 0 && !hasAnyResults && (
                    <div className="text-center text-white py-5">
                        No dishes found for "{search}"
                    </div>
                )}

                {!loading && !error && foodCat.length !== 0
                    ? foodCat.map((data) => {
                        const filteredItems = foodItem.filter((item) =>
                            item.CategoryName === data.CategoryName &&
                            item.name.toLowerCase().includes(search.toLowerCase())
                        );

                        if (filteredItems.length === 0) return null;

                        return (
                            <div className='row mb-3' key={data._id}>
                                <div className='fs-3 m-3'>{data.CategoryName}</div>
                                <hr />
                                {filteredItems.map(filterItems => {
                                    return (
                                        <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                                            <Card
                                                foodItem={filterItems}
                                                options={filterItems.options[0]}
                                            />
                                        </div>
                                    )
                                })}
                            </div>
                        );
                    })
                    : null
                }
            </div>
            <div><Footer /></div>
        </div>
    )
}