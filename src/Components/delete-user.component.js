import React, { Component } from 'react'
import Axios from 'axios';

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
        Axios.get('http://localhost:3000/users')
            .then(response => {
                console.log('GET : http://localhost:3000/users');
                this.setState({
                    users: response.data
                });
            })
            .catch(err => console.log(err));
    }


    onchangeUser() {
        return this.state.users.map(currentUser => {
            return <DeleteUser currentUser={currentUser} deleteUser={this.deleteUser} key={currentUser._id} />
        });
    }

    deleteUser(id) {
        Axios.delete('http://localhost:3000/users/'+id)
            .then(res => {
                console.log('DELETE : http://localhost:3000/users/'+id);
                console.log(res.data)
                console.log('User deleted')
            })
            .catch(err => console.log(err));
    }

    render() {
        return (
            <div className="container">
                <form onSubmit={this.onSubmit}>
                
                <table className="table table-striped">
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
                
                </form>
            </div>
        )
    }
}

export default DeleteUsers;
