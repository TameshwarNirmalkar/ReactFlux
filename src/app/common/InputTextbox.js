/*eslint-disable no-unused-vars*/
import React, { Component } from 'react';
import {PropTypes} from 'prop-types';
import _ from 'lodash';
/*eslint-enable no-unused-vars*/

class InputTextBox extends Component {
    constructor(props) {
        super(props);
    }

    _onChange(e) {
        this.props.onChange(e.target.value);
    }

    /**
     * [shouldComponentUpdate] : there is a place when you stop rerender copmonent.
     * @param  {[nextProps]}: getting next props
     * @return {[nextState]}: getting next states
     */
    shouldComponentUpdate(nextProps, nextState){
        return !_.isEqual(this.props, nextProps);
    }

    render() {
        return (
            <div>
                <div class="form-group">
                    <label>
                        { this.props.label }
                    </label>                    
                    <input type="text" value={this.props.val} onChange={this._onChange.bind(this)}  placeholder={this.props.placeholder} class="form-control" />
                </div>
            </div>
        );
    }

}

InputTextBox.PropTypes = {
    val: PropTypes.string,
    onChange: PropTypes.func,
    label: PropTypes.string,
    placeholder: PropTypes.string
};

export default InputTextBox;