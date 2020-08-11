import React, { Component } from 'react'
import Axios from 'axios';
import "../../node_modules/bootstrap/dist/js/bootstrap.min.js"
import "../../node_modules/jquery/dist/jquery.min.js";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css"

const port = process.env.PORT||3200;
const DeleteUser = props => (
    <tr>
        <td>{props.currentUser._id}</td>
        <td>{props.currentUser.username}</td>
        <td>
            <button className="btn btn-success btn-sm" onClick={()=>{props.deleteUser(props.currentUser._id)}}>DELETE</button>
        </td>
    </tr>
)

class DeleteUsers extends Component {

    constructor(props) {
        super(props)

        this.onchangeUser = this.onchangeUser.bind(this);

        this.state = {
            users: []
        }
    }

    componentDidMount() {
        Axios.get('/users')
            .then(response => {
                console.log('GET : http://localhost:3200/users');
                console.log('-->>>'+port);
                this.setState({
                    users: response.data
                });
            })
            .catch(err => {console.log(err)
                console.log('-->>>'+port);
            });
    }


    onchangeUser() {
        return this.state.users.map(currentUser => {
            return <DeleteUser currentUser={currentUser} deleteUser={this.deleteUser} key={currentUser._id} />
        });
    }

    deleteUser(id) {
        Axios.delete('/users/'+id)
            .then(res => {
                console.log('DELETE : http://localhost:3200/users/'+id);
                console.log(res.data)
                console.log('User deleted')
            })
            .catch(err => console.log(err));
    }

    render() {
        return (
            <div className="container">
                <form onSubmit={this.onSubmit}>
                <div className="table-responsive">
                <table className="table table-striped table-sm">
                    <thead className="thead-light">
                        <tr>
                            <th>Id</th>
                            <th>Username</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.onchangeUser()}
                    </tbody>
                    </table>
                </div>
                </form>
            </div>
        )
    }
}

export default DeleteUsers;
