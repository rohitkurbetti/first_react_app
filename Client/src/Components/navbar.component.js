import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "../../node_modules/bootstrap/dist/js/bootstrap.min.js"
import "../../node_modules/jquery/dist/jquery.min.js";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css"

class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <Link to="/" className="navbar-brand">ExcerciseTracker</Link>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="navbar-item active">
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
