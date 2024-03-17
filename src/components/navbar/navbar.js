import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import "./navbar.css"
import 'bootstrap/dist/css/bootstrap.min.css';

const ResponsiveNavbar = () => {

    const location = useLocation();


    return (
        <>
            <div className="sideBarContainer d-md-block fixed-left">


                <div className="DeskTopSideBarContainer " >

                    <ul class="sideBarUnOrderList">
                        <li className={`nav-item ${location.pathname === '/home' ? 'active' : ''}`}>

                            <Link to="/home" className="nav-link">

                                <span className="material-symbols-outlined">
                                    home
                                </span>
                                Home

                            </Link>
                        </li>
                        <li className={`nav-item ${location.pathname === '/community' ? 'active' : ''}`}>
                            <Link to="/community" className="nav-link">

                                <span class="material-symbols-outlined">
                                    diversity_2
                                </span>
                                Community

                            </Link>
                        </li>
                        <li className={`nav-item ${location.pathname === '/search' ? 'active' : ''}`}>

                            <Link to="/search" className="nav-link">
                                <span class="material-symbols-outlined">
                                    search
                                </span>
                                Search
                            </Link>
                        </li>

                        <li className={`nav-item ${location.pathname === '/create' ? 'active' : ''}`}>

                            <Link to="/create" className="nav-link">


                                <span class="material-symbols-outlined">
                                    add_circle
                                </span>
                                Create
                            </Link>
                        </li>

                        <li className={`nav-item ${location.pathname === '/notification' ? 'active' : ''}`}>
                            <Link to="/notification" className="nav-link">
                                <span class="material-symbols-outlined">
                                    favorite
                                </span>
                                Notification
                            </Link>
                        </li>

                        <li className={`nav-item ${location.pathname === '/cart' ? 'active' : ''}`}>
                            <Link to="/cart" className="nav-link">

                                <span class="material-symbols-outlined">
                                    shopping_cart
                                </span>
                                Your cart
                            </Link>
                        </li>
                        <li className={`nav-item ${location.pathname === '/profile' ? 'active' : ''}`}>

                            <Link to="/profile" className="nav-link">


                                <span class="material-symbols-outlined">
                                    person
                                </span>
                                Profile
                            </Link>
                        </li>
                    </ul>
                </div>




            </div>



            <div className="navBarBottomInMobileView fixed-bottom navbar-light bg-light d-md-none">
                <Link to="/home" className="nav-link">
                    <div className='mobileViewNavButton' >
                        <span class="material-symbols-outlined">
                            home
                        </span>
                    </div>
                </Link>

                <Link to="/community" className="nav-link">
                    <div className='mobileViewNavButton'>
                        <span class="material-symbols-outlined">
                            diversity_2
                        </span>
                    </div>
                </Link>

                <Link to="/create" className="nav-link">
                    <div className='mobileViewNavButton'>
                        <span class="material-symbols-outlined">
                            add_circle
                        </span>
                    </div>

                </Link>

                <Link to="/cart" className="nav-link">
                    <div className='mobileViewNavButton'>
                        <span class="material-symbols-outlined">
                            shopping_cart
                        </span>
                    </div>
                </Link>

                <Link to="/profile" className="nav-link">
                    <div className='mobileViewNavButton'>
                        <span class="material-symbols-outlined">
                            person
                        </span>
                    </div>
                </Link>
            </div>


            <div className="navBarTopInMobileView fixed-top navbar-light  d-md-none">


                <Link to="/home" className="AppName">
                    <div>
                        <h1>
                            Culinary
                        </h1>
                    </div>
                </Link>

                <Link to="/notification" className="nav-link">
                    <div className='mobileViewNavButton'>
                        <span class="material-symbols-outlined">
                            notifications_active
                        </span>

                    </div>
                </Link>
            </div>


        </>
    );
};

export default ResponsiveNavbar;
