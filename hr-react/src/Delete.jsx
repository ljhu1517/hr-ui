import React from 'react';
import axios from 'axios';
import baseClass from './baseClass';

class Delete extends baseClass {

    constructor(props) {
        super(props);

        this.state = {

        };
    }

    componentDidMount() {
        var foo = this.queryParams.id;

        axios({
            method: 'post', 
            url: 'http://localhost:8080/delete',
            data: {
                id: foo
            },
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            })
        }).then(
            (res) => {
                if(res.data === "Success") {
                    alert("Successfully deleted")
                    window.location = "/ViewAll"; 
                }
                if(res.data === "Fail") {
                    alert("There was a problem with deleting the employee");
                    window.location = "/ViewAll";
                }
            }
        ).catch(err => alert(err));    
    }

    render() {
        return null;
    }
}

export default Delete;