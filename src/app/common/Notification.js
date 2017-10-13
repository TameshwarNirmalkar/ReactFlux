import React, {Component} from 'react';
import {PropTypes} from 'prop-types';

class Notification extends Component {

	constructor(props){
		super(props);
	}

	shouldComponentUpdate(nextProps, nextState){
        return !_.isEqual(this.props, nextProps);
    }

    render(){
    	return ( <span>{ this.props.message}</span> );
    }

}


Notification.PropTypes = {
	message: PropTypes.string
};

export default Notification;