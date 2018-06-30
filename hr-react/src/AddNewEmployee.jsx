import React from 'react';
import axios from 'axios';
import {Redirect} from 'react-router';
import baseClass from './baseClass';

class AddNewEmployee extends baseClass {

    constructor(props) {
        super(props);
        this.handleSave = this.handleSave.bind(this);     //this is an event handler 
        this.handleCancel = this.handleCancel.bind(this);

        this.state = {
            toSave: false, 
            toCancel: false,
            fname: '',
            lname: '',
            email: '',
            salary: '',
            hiredate: ''
        };
    }

    componentDidMount() {

    }

    handleSave(event) {

        axios({
            method: 'post',
            url: 'http://localhost:8080/add-new',
            data: {
                fname: this.state.fname,
                lname: this.state.lname,
                email: this.state.email,
                salary: this.state.salary,
                hiredate: this.state.hiredate
            },
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                
            })
        }).then(
            (res) => {          //error function
            
                if(res.data === "Success") {
                    window.location = "/ViewAll";
                }
                if(res.data === "Fail") {
                    alert("Something is wrong with Add New");
                }
            }
        ).catch(err => alert(err));
    }

    handleCancel() {
        this.setState(prevState => ({
            toCancel: true
        }))
    }

    render() {

        if(this.state.toCancel) {       //rollback??
            return <Redirect to ='ViewAll'/>
        }

        if(this.state.toSave) {

            return <Redirect to = 'ViewAll'/>
        }

        return(
            <div className={'container'}>

                <h2>Add New Employee </h2>  


                        <div className={'form-group'} >
                            <label htmlFor="fname">First name: </label>
                            <input type="text" className="form-control" placeholder="Enter first name" onChange = {this.handleChange} name="fname"/>
                        </div>
                        
                        <div className={'form-group'} >
                            <label htmlFor="lname">Last name: </label>
                            <input type="text" className="form-control" placeholder="Enter last name" onChange = {this.handleChange}  name="lname"/>
                        </div>
                        
                        <div className={'form-group'} >
                            <label htmlFor="email">Email: </label>
                            <input type="email"   className="form-control"  placeholder="Enter email" onChange = {this.handleChange}  name="email"/>
                        </div>
                        
                        <div className={'form-group'} >
                            <label htmlFor="hiredate">Hire Date: </label>
                            <input type="text"   className="form-control"   placeholder="Enter hire date" onChange = {this.handleChange} name="hiredate"/>
                        </div>
                        
                        <div className={'form-group'} >
                            <label htmlFor="salary">Salary: </label>
                            <input type="number"  className="form-control" placeholder="Enter salary" onChange = {this.handleChange}  name="salary"/>
                        </div>
                        
                        {/* <div className={'form-group'} >
                            <label htmlFor="managerid">Manager ID: </label>
                            <select class = "form-control" value = {this.state.managerid} name = "managerid"></select>
                        </div>
                        
                        <div className={'form-group'} >
                            <label htmlFor="departmentid">Department ID: </label>
                            <select class="form-control" value = {this.state.departmentid} id="department" name="departmentid"> </select>
                        </div>
                        
                        <div className={'form-group'} >
                            <label htmlFor="jobid">Job ID: </label>
                            <select class="form-control" value = {this.state.jobit} id="job" name="jobid"> </select>
                        </div> */}
                    
                        <button onClick={this.handleSave} className={'btn-default'}> Save </button>
                        <button onClick={this.handleCancel} className={'btn-default'}> Cancel </button>
                    
            </div>

                   // <div>
            //     <p>Add New Employee</p>

            //     <form onSubmit={this.handleSubmit}>
            //         <label>
            //             Name:
            //             <input type="text" value={this.state.value} onChange={this.handleChange} />
            //         </label>
            //         <input type="submit" value="Submit" />
            //     </form>

            //     <button onClick={this.handleClick}> Save </button>
            // </div>
        );

    }
}

export default AddNewEmployee;