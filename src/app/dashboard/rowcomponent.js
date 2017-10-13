/*eslint-disable no-unused-vars*/
import React, { Component } from 'react';
import {PropTypes} from 'prop-types';
import ReactDOM from 'react-dom';
/*eslint-enabled no-unused-vars*/

class RowComponent extends Component {

    constructor(props) {
        super(props);
        // this.props = props;
    }

    componentWillReceiveProps(next) {
        // console.log(next);
    }

    render() {
        const classes = (this.props.gender === 'M') ? 'bg-warning' : 'bg-primary';
        return (
            <tr onClick={this._onUpdate.bind(this)} role="button">
	            <td>{ this.props.id }</td>
	            <td>{ this.props.title }</td>
	            <td>{ this.props.author }</td>
                <td class={classes}>{ this.props.gender }</td>
	            <td>
	                <a href="javascript:void(0);"><i class="glyphicon glyphicon-edit text-success hidden"> </i></a>
	                <a onClick={this._onDelete.bind(this)} href="javascript:void(0);"><i class="glyphicon glyphicon-remove-circle text-danger"> </i></a>
	            </td>
	        </tr>
        );
    }

    _onUpdate() {
        this.props.onUpdateRow(this.props.id);
    }

    _onDelete(e) {
        e.stopPropagation();
        this.props.onDeleteRow(this.props.id);
    }
};

RowComponent.propTypes = {
    id: PropTypes.number,
    title: PropTypes.any,
    author: PropTypes.any,
    onUpdateRow: PropTypes.func,
    onDeleteRow: PropTypes.func
};

export default RowComponent;
