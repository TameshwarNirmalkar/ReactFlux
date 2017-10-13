import React, { Component } from 'react';
import {PropTypes} from 'prop-types';
import _ from 'lodash';

class Checkbox extends Component {
    constructor(props) {
        super(props);
    }

    handleChange(event) {
        this.props.onChange({ value: event.target.value });
    }

    isMaleFemale(){
        // const val = false;
        console.log(this.props.isChecked);
    }

    render() {
        return (
          <div>
            <label>
              <input type="radio" onChange={this.handleChange.bind(this)} checked={_.isEqual(this.props.type, 'M')} name={this.props.name} value="M" /> { this.props.labelA }
            </label>
            <label>
              <input type="radio" onChange={this.handleChange.bind(this)} checked={_.isEqual(this.props.type, 'F')} name={this.props.name} value="F" /> { this.props.labelB }
            </label>
          </div>
        );
    }
}

Checkbox.propTypes = {
    name: PropTypes.string,
    labelA: PropTypes.string,
    labelB: PropTypes.string,
    onChange: PropTypes.func,
    type: PropTypes.string
};

export default Checkbox;