import React, { PureComponent, PropTypes }  from 'react';
import axios from 'axios';
import ReactTable from "react-table";
import {Redirect} from 'react-router';
import baseClass from './baseClass';
//import { PureComponent, PropTypes } from 'react';
import { addUrlProps, UrlQueryParamTypes } from 'react-url-query';


class ViewAll extends baseClass {

    

    constructor(props) {
        super(props);
        this.handleNew = this.handleNew.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);

        this.state = {tableContent: '', toEdit: false, toNew: false, toDelete: false};
    }

    componentDidMount() {
        axios({
            method: 'post',
            url: 'http://localhost:8080/getAll',
            data: {},
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            })
          }).then((res) => {          //error function
                
                this.setState({data: res.data});

                //alert(res.data[0].firstName);
                //this.setState({firstName: res.data[0].firstName, lastName: res.data[0].lastName});
                //set active component 
                
            }
          ).catch(err => alert(err));
    }
    
    handleNew() {
        this.setState(prevState => ({
            toNew: true
        }));
    }

    handleEdit() {

        this.setState(prevState => ({
            toEdit: true
        }));
    }

    handleDelete(event) {

        this.handleChange(event)
        //we have to access the ID of the row that the button was selected with 
        //take the id and then use delete(id) method in EmployeeService 
        
       // this.setState({empId: event.target.value});

        // this.setState(prevState => ({
        //     toDelete: true
        // }))
    }

    render() {

        if(this.state.toNew) {
            return <Redirect to ='/AddNewEmployee'/>
        }

        if(this.state.toEdit) {
            return <Redirect to='/EditEmployee'/>
        }

        if(this.state.toDelete) {

        }

        const columns = [{
            Header: 'First Name',
            accessor: 'firstName' // String-based value accessors!
          }, {
            Header: 'Last Name',
            accessor: 'lastName'
          }, {
            Header: 'Email', 
            accessor: 'email'
          }, {
            Header: 'Salary',
            accessor: 'salary'
          },{
            Header: 'ID',
            accessor: 'employeeId',
            show: true
          },{
            Header: 'Edit',     //data becomes a map 
            accessor: 'editUrl'
            //Cell: <button onClick={this.handleEdit}>Edit</button>,
            // Cell: 
            // ({row}) => {
            //     return(<button onClick={this.handleEdit}> Edit<span>{row.employeeId}</span> </button> )
            // }

        }, {
            Header: 'Delete', 
            accessor: 'deleteUrl' 
          }
        ];
        
        return(
            <div>
                <button 
                    onClick={this.handleNew}> Add New
                </button>

                <ReactTable
                    data={this.state.data}
                    columns={columns}
                />
            </div>
        );
    }
}

export default ViewAll;
