import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
const port = process.env.PORT || 3200;

const Excercise = props => (
    <tr>
        <td>{props.excercise.username}</td>
        <td>{props.excercise.description}</td>
        <td>{props.excercise.duration}</td>
        <td>{props.excercise.date.substring(0,10)}</td>
        <td>
            <Link to={"/edit/"+props.excercise._id}>Edit</Link> | <a href="/#" onClick={()=>{props.deleteExcercise(props.excercise._id)}}>Delete</a>
        </td>
    </tr>
)


class ExcerciseList extends Component {

    constructor(props){
        super(props);

        this.deleteExcercise = this.deleteExcercise.bind(this);
        
        this.state = {
            excercises : []
        }
    }

    componentDidMount(){
        axios.get('http://localhost:'+port+'/excercises')
        .then(response => {
            this.setState({
                excercises : response.data
            })
            console.log('GET : http://localhost:'+port+'/excercises');
        })
        .catch((error) =>{
            console.log(error);
        })
    }

    excerciseList(){
        return this.state.excercises.map(currentexcercise=>{
            return <Excercise excercise={currentexcercise} deleteExcercise={this.deleteExcercise} key={currentexcercise._id} />
        })
    }

    deleteExcercise(id){
        axios.delete('http://localhost:'+port+'/excercises/'+id)
        .then(res => {
            console.log('DELETE API:http://localhost:'+port+'/excercises/'+id);
            console.log(res.data)
            console.log('Excercise Deleted');
        });
        this.setState({
            excercises : this.state.excercises.filter(el => el._id !== id)
        })
    }


    render() {
        return (
            <div>
                <h3>Logged Excercises</h3>
                <table className="table table-striped">
                    <thead className="thead-light">
                        <tr>
                            <th>Username</th>
                            <th>Description</th>
                            <th>Duration(Min)</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.excerciseList()}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default ExcerciseList;