import React, { Component } from 'react'
import Axios from 'axios';

class CreateUsers extends Component {

    constructor(props){
        super(props)

        this.onchangeUsername = this.onchangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username:''
        }

    }

    onchangeUsername(e){
        this.setState({
            username:e.target.value
        });
    }

    onSubmit(e){
        e.preventDefault();
        const user = {
            username: this.state.username
        }

        console.log(user);
        //database path--! u can get it from Postman also
        Axios.post('http://localhost:3000/users/add',user)
        .then(res => console.log(res.data))

        this.setState({
            username:''
        });
        window.location='/';
    }


    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}> 
                    <label>Username: </label>
                    <div className="form-group">
                        <input
                            type="text"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onchangeUsername}
                        ></input>
                    </div>

                    <div className="form-group">
                        <input
                            type="submit"
                            className="btn btn-primary"
                            value="submit"
                        ></input>
                    </div>

                </form>
            </div>
        )
    }
}

export default CreateUsers;