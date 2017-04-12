import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class Application extends Component {

    constructor(props) {
        super(props);

    }

    render() {

        alert("testeing here again");
       let body = <div>Just a page</div>;
        return (body);
    }
}

Application.propTypes = {};

const mapStateToProps = store => {
    return store;
};

export default connect(mapStateToProps)(Application);