/*eslint-disable no-unused-vars*/
import React, { Component } from 'react';
import RowComponent from './rowcomponent';
import {PropTypes} from 'prop-types';
/*eslint-enabled no-unused-vars*/

class DATALIST extends Component {
    /**
     * [constructor description]: Inplace of getInitialStates constructor has introduced in React ES6.
     * @param  {[props]} props = [propTypes]
     */
    constructor(props) {
        super(props);
        // this.props = props;
        this.tableStyle = { marginBottom: 0 + 'px' };
    }

    /**
     * [componentWillReceiveProps description] : this calls when state changes
     * @param  {Function} next [give updated props] 
     */
    componentWillReceiveProps(next) {
        // console.log(next);
    }

    _renderMovies() {
        if (!this.props.items.length) {
            return <tr><td colSpan="4">No records found...</td></tr>;
        }
        return this.props.items.map(item => <RowComponent {...item} key={item.id} onUpdateRow={this.props.onRowUpdate} onDeleteRow={this.props.onRowDelete} />);
    }

    _renderPanel() {
        return (
            <div class="panel panel-primary">
                <div class="panel-heading">
                    <h3 class="panel-title">{this.props.heading}</h3>
                </div>
                <div class="panel-body">
                    <table style={this.tableStyle} class="table table-bordered table-hover">
                        <thead>
                            <tr class={this.props.rowcolor}>
                                <th class="col-lg-2" width="60">Sr. No</th>
                                <th class="col-lg-4" width="">First Name</th>
                                <th class="col-lg-4" width="">Last Name</th>
                                <th class="col-lg-4" width="10">Gender</th>
                                <th class="col-lg-2" width="60">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            { this._renderMovies() }
                        </tbody>
                    </table>
                </div>
                <div class="panel-footer">
                    <span>{ this.props.items.length }, records in the table.</span>
                </div>
            </div>
        );
    }

    render() {
        if (!this.props.items) {
            return null;
        }
        return (
            <div>
                { this._renderPanel() }
            </div>
        );
    }
}

DATALIST.propTypes = {
    heading: PropTypes.string,
    rowcolor: PropTypes.string,
    items: PropTypes.array,
    onRowUpdate: PropTypes.func,
    onRowDelete: PropTypes.func
};

export default DATALIST;
