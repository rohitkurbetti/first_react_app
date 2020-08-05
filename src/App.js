import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from './Components/navbar.component';
import ExcercisesList from './Components/excercises-list.component';
import EditExcercise from './Components/edit-excercise.component';
import CreateExcercise from './Components/create-excercise.component';
import CreateUser from './Components/create-user.component';

import DeleteUser from './Components/delete-user.component';


class App extends Component {
    render() {
        return (
            <Router>
                <div className="container">
                    <Navbar />
                    <br />
                    <Route path="/" exact component={ExcercisesList} />
                    <Route path="/edit/:id" component={EditExcercise} />
                    <Route path="/create" component={CreateExcercise} />
                    <Route path="/user" component={CreateUser} />
                    <Route path="/delete" component={DeleteUser} />
                </div>
            </Router>
        );
    }
}
export default App;