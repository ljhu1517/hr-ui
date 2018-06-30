import React from 'react'; 
import ReactQueryParams from 'react-query-params';

class baseClass extends ReactQueryParams {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {

        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;  //any event target must carry exact the same name as it appears in state
        
        this.setState( //assuming that name of the target is the same as state's name attributes.
            {[name]: value}
        );
        //alert('A name was submitted: ' + this.state.value);
        event.preventDefault();

    };
}

export default baseClass;