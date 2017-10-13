/*eslint-disable no-unused-vars*/
import React, { Component } from 'react';
import _ from 'lodash';
import Classnames from 'classnames';
import {PropTypes} from 'prop-types';
/*eslint-enable no-unused-vars*/

class InputButton extends Component {
    /**
     * [constructor description]: Inplace of getInitialStates constructor has introduced in React ES6.
     * @param  {[props]} props = [propTypes]
     */
    constructor(props) {
        super(props);
        // this.props = props;
    }

    /**
     * [componentWillReceiveProps description] : this calls when state changes
     * @param  {Function} next [give updated props] 
     */
    componentWillReceiveProps(next) {
        // console.log(next);
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
        const launchCampaignClasses = Classnames('btn btn-primary', { disabled: !this.props.buttondisabled });
        return (
            <span>
                <button onClick={ this.props.buttondisabled ? this.props.action : null } class={launchCampaignClasses} > { this.props.caption }</button>
            </span>
        );
    }
}

InputButton.propTypes = {
    caption: PropTypes.string,
    action: PropTypes.func,
    buttondisabled: PropTypes.bool
};

export default InputButton;
