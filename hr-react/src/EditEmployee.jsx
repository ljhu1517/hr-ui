import React from 'react';
import axios from 'axios';
import {Redirect} from 'react-router'
import baseClass from './baseClass';

class EditEmployee extends baseClass {

    constructor(props) {
        super(props);
        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);

        this.state = {
            toCancel: false, 
            toSave: false,
            fname: '',
            lname: '',
            email: '',
            salary: '',
            hiredate: '',
            id: ''
        };

    }

    componentDidMount() {
        var foo = this.queryParams.id;

        axios({
            method: 'post',
            url: 'http://localhost:8080/load-update',
            data: {
                id: foo
            },
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            })
          }).then((res) => {         
                
                this.setState({
                    fname: res.data.firstName,
                    lname: res.data.lastName,
                    email: res.data.email,
                    id: res.data.employeeId
            
                });
                
            }
          ).catch(err => alert(err));

    }

    handleSave() {

        axios({
            method: 'post', 
            url: 'http://localhost:8080/update',
            data: {
                fname: this.state.fname,
                lname: this.state.lname, 
                email: this.state.email,
                id: this.state.id
            },
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            })
        }).then(
            (res) => {
                if(res.data === "Success") {
                    window.location = "/ViewAll"; 
                }
                if(res.data === "Fail") {
                    alert("There was a problem with editing the employee");
                }
            }
        ).catch(err => alert(err));
    }

    handleCancel() {

        var foo = this.queryParams.id;

        axios({
            method: 'post',
            url: 'http://localhost:8080/load-update',
            data: {
                id: foo
            },
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            })
          }).then((res) => {         
                
                this.setState({
                    fname: res.data.firstName,
                    lname: res.data.lastName,
                    email: res.data.email,
                    id: res.data.employeeId
            
                });
                
            }
          ).catch(err => alert(err));
    }

    render() { 

        if(this.state.toCancel) {
            return <Redirect to='/ViewAll'/>
        }
        if(this.state.toSave) {
            return <Redirect to='/ViewAll'/>
        }

        return(
            <div className={'container'}>
            
            <h2>Edit employee info </h2>
             
              <div className={'form-group'}>
                <label htmlFor="fname">First name: </label> 
                <input type="text" className="form-control" id="fname" value={this.state.fname} onChange={this.handleChange} name="fname"/>
              </div>
              
              <div className={'form-group'}>
                <label htmlFor="lname">Last name: </label>
                <input type="text" className="form-control" value={this.state.lname} placeholder={this.state.lname} onChange = {this.handleChange}  name="lname"/>

              </div>
              
              <div className={'form-group'}>
                <label htmlFor="email">Email: </label>
                <input type="email" className="form-control" value={this.state.email} onChange = {this.handleChange}  name="email"/>
              </div>
              
              <div className={'form-group'}>
                <label htmlFor="id">Employee ID: </label>
                <input type="email" className="form-control" value={this.state.id} onChange = {this.handleChange}  name="email"/>
              </div>
              
              
              <button onClick={this.handleSave} className={'btn-default'}> Save </button>
              <button onClick={this.handleCancel} className={'btn-default'}> Cancel </button>

          </div>
        );
    }
}

export default EditEmployee;