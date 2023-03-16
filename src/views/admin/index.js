import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from "react-router-dom";

// reactstrap components
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
// core components

// style
import "./index.scss"

// tabs
import DashboardIndex from './dashboard';
import CourseIndex from './courses';
import BranchIndex from './branches';
import TrainingCenterIndex from './trainingCenter';
import TrainingVehiclesIndex from './trainingVehicles';

function AdminIndex() {
    const location = useLocation();
    const current_tab = location.pathname.split('/').pop();
    if (current_tab === 'admin') {
        window.location.href = '/admin/dashboard';
    }
    const [isOpen, setIsOpen] = useState(false);
    
    const toggle = () => setIsOpen(!isOpen);

    const logout = () => {
        localStorage.removeItem('loginData');
        const event = new Event('loginData');
        window.dispatchEvent(event);
        window.location.href = '/';
    }
    
    return (
      <div className="admin-panel">
        <div className="container-fluid">
            <div className="row">
                <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block sidebar collapse">
                    <div className="position-sticky pt-3">
                        <div className="brand-logo">
                            <h5 className="text-bold">Company Name</h5>
                        </div>   
                        <div className="border-bottom"/>
                        <ul className="nav flex-column">
                            <li className="nav-item">
                                <Link className={current_tab === "dashboard" ? "nav-link active": "nav-link"}
                                to="dashboard"
                                tag={Link}
                                >
                                Dashboard
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className={current_tab === "courses" ? "nav-link active": "nav-link"}
                                to="courses"
                                tag={Link}
                                >
                                Courses
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className={current_tab === "branches" ? "nav-link active": "nav-link"}
                                to="branches"
                                tag={Link}
                                >
                                Branches
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className={current_tab === "training-centers" ? "nav-link active": "nav-link"}
                                to="training-centers"
                                >
                                Training Centers
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className={current_tab === "vehicle-courses" ? "nav-link active": "nav-link"}
                                to="vehicle-courses"
                                >
                                Vehicle Courses
                                </Link>
                            </li>
                            
                            <li className="nav-item">
                                <Link className={current_tab === "special-programs" ? "nav-link active": "nav-link"}
                                to="special-programs"
                                >
                                Special Programs
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className={current_tab === "FAQs" ? "nav-link active": "nav-link"}
                                to="FAQs"
                                tag={Link}
                                >
                                FAQs
                                </Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            
                <main className="bg-light col-md-9 ms-sm-auto col-lg-10 px-md-4">
                    <header className="navbar bg-light sticky-top flex-md-nowrap p-0 shadow-none">
                        <Breadcrumb className="__breadcrumb">
                            <BreadcrumbItem>
                            <a href="#" >Home</a>
                            </BreadcrumbItem>
                            <BreadcrumbItem active className="h6 m-0">{current_tab}</BreadcrumbItem>
                        </Breadcrumb>
                        <button className="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="navbar-nav">
                            <div className="nav-item text-nowrap">
                            <a className="text-primary logout" onClick={logout}>Sign out</a>
                            </div>
                        </div>
                    </header>
                    <div className="main-section border-top">
                        {current_tab === 'dashboard' ? <DashboardIndex /> : null}
                        {current_tab === 'courses' ? <CourseIndex /> : null}
                        {current_tab === 'branches' ? <BranchIndex /> : null}
                        {current_tab === 'training-centers' ? <TrainingCenterIndex /> : null}
                        {current_tab === 'vehicle-courses' ? <TrainingVehiclesIndex /> : null}
                        
                    </div>
                </main>
            </div>
        </div>
      </div>
    );
  };

export default AdminIndex;
