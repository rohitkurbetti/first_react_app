import React, { Component } from 'react';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

class EditExcercises extends Component {

    constructor(props){
        super(props);


        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username :'',
            description :'',
            duration : 0,
            date : new Date(),
            users : []
        }
    }
 

    componentDidMount(){

        Axios.get('http://localhost:3000/excercises/'+this.props.match.params.id)
        .then(response=>{
            console.log('GET : http://localhost:3000/excercises/'+this.props.match.params.id);
            this.setState({
                username: response.data.username,
                description: response.data.description,
                duration: response.data.duration,
                date: new Date(response.data.date)
            })
        })
        .catch(function(error){
            console.log(error);
        })


        Axios.get('http://localhost:3000/users')
        .then(response =>{
            console.log('GET : http://localhost:3000/users');
            if(response.data.length > 0){
                this.setState({
                    users: response.data.map(user => user.username)
                });
            }

        })
        //to fetch data from db and print to console
        //Axios.get('http://localhost:3000/excercises')
        //.then(res=>console.log(res.data))
    }

    onChangeUsername(e){
        this.setState({
            username : e.target.value
        });
    }

    onChangeDescription(e){
        this.setState({
            description : e.target.value
        });
    }

    onChangeDuration(e){
        this.setState({
            duration : e.target.value
        });
    }

    onChangeDate(date){
        this.setState({
            date : date
        });
    }

    onSubmit(e){
        e.preventDefault();

        const excercise = {
            username: this.state.username,
            description : this.state.description,
            duration : this.state.duration,
            date : this.state.date
        }

        console.log(excercise);

        Axios.put('http://localhost:3000/excercises/update/'+this.props.match.params.id,excercise)
        .then(response => {
            console.log('PUT : http://localhost:3000/excercises/update/'+this.props.match.params.id);
            console.log(response.data)
        })
        .catch(err => console.log(err));

        window.location = '/';
    }




    render() {
        return (
            <div>
                <h3>Edit Excercise Log</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="row">
                        <div className="col">
                    <div className="form-group">
                        <label>Username: </label>
                        <select 
                            required
                            ref="userInput"
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}>
                            {
                               this.state.users.map(function(user){
                               return <option key={user} value={user}>{user}</option>
                               })
                            }
                        </select>
                    </div>
                    </div>
                    <div className="col">
                    <div className="form-group">
                        <label>Description</label>
                        <input 
                        type="text" 
                        required
                        className="form-control"
                        value={this.state.description}
                        onChange={this.onChangeDescription}
                        ></input>
                    </div>
                    </div>
                    
                    <div className="col">
                    <div className="form-group">
                        <label>Duration (in minutes):</label>
                        <input type="text" 
                        required 
                        className="form-control" 
                        value={this.state.duration} 
                        onChange={this.onChangeDuration}
                        ></input>
                    </div>
                    </div>
                    <div className="col">
                    <div className="form-group">
                         <label>Date</label>
                         <br></br>
                         <DatePicker
                            className="form-control"
                            selected = {this.state.date}
                            onChange={this.onChangeDate}
                         />
                    </div>
                    </div>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Edit Excercise Log" className="btn btn-primary"></input>
                    </div>

                </form>
            </div>
        )
    }
}

export default EditExcercises;
