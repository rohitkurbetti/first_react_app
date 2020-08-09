import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <Link to="/" className="navbar-brand">ExcerciseTracker</Link>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="navbar-item">
                            <Link to="/" className="nav-link">Excercises</Link>
                        </li>

                        <li className="navbar-item">
                            <Link to="/create" className="nav-link">Create Excercise Log</Link>
                        </li>

                        <li className="navbar-item">
                            <Link to="/user" className="nav-link">Create User</Link>
                        </li>

                        <li className="navbar-item">
                            <Link to="/delete" className="nav-link">Delete User</Link>
                        </li>

                    </ul>

                </div>
            </nav>
        )
    }
}

export default Navbar;