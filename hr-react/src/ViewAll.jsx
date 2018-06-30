import React  from 'react';
import axios from 'axios';
import ReactTable from "react-table";
import {Redirect} from 'react-router';
import baseClass from './baseClass';

class ViewAll extends baseClass {

    constructor(props) {
        
        super(props);
        this.handleNew = this.handleNew.bind(this);

        this.state = {tableContent: '', toNew: false};
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
                
        }).catch(err => alert(err));
    }
    
    handleNew() {
        this.setState(prevState => ({
            toNew: true
        }));
    }

    handleDelete(rowId) {
        var foo = rowId;
        axios({
            method: 'post', 
            url: 'http://localhost:8080/delete',
            data: {
                id: rowId
            },
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            })
        }).then(
            (res) => {
                if(res.data === "Success") {
                    alert("Successfully deleted "+foo)
                    window.location = "/ViewAll"; 
                }
                if(res.data === "Fail") {
                    alert("There was a problem with editing the employee");
                }
            }
        ).catch(err => alert(err));        
     }

    render() {

        if(this.state.toNew) {
            return <Redirect to ='/AddNewEmployee'/>
        }

        if(this.state.toEdit) {
            return <Redirect to='/EditEmployee'/>
        }

        const columns = [

            {
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
                Header: 'Edit',  
                Cell: 
                    ({row}) => {
                        return (<a href={"/EditEmployee?id="+row.employeeId}>Edit</a>)
                    }
            },{
                Header: 'Delete', 
                // Cell: 
                //     ({row}) => {
                //         return(<button onClick={this.handleDelete(row.employeeId)}>Delete </button>)
                //     }
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
