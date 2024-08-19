import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './components/Home';
import EmployeeService from './services/employeeService';
import DepartmentService from './services/departmentService';


const App = () => {
    
    return (
        <Router>
            <div className="container mx-auto p-4">
                <header className="mb-4">
                    <h1 className="text-5xl font-bold my-4">MICROSERVICE CRUD</h1>
                    <nav className="space-x-8 mt-3 w-full border-b-2  p-2 flex  items-center text-lg " >
                        <Link className="text-blue-500 hover:text-blue-700 mr-5  h transition-all active:text-red-500 focus:text-red-500 " to="/employees">Employee Service</Link>
                        <Link className="text-blue-500 hover:text-blue-700 mx-5 active:text-red-600 focus:text-red-400" to="/departments">Department Service</Link>
                    </nav>
                    
                </header>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/employees" element={<EmployeeService />} />
                    <Route path="/departments" element={<DepartmentService />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
