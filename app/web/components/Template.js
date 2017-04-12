import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class Template extends Component {
    constructor(props) {
        super(props);
    }

    // invoke once, immediately after the initial rendering occurs, client only
    componentDidMount() {
    }

    // invoke immediately after the update are pushed to the DOM, not for initial render
    componentDidUpdate(prevProps, prevState) {
    }

    // invoke immediately before rendering when new props or state are being received, not called for initial render
    componentWillUpdate(nextProps, nextState) {
    }

    //invoke once, immediately b4 the initial rendering occurs, client and server
    componentWillMount() {
    }

    // invoke immediately b4 a component is unmounted
    componentWillUnmount() {
    }

    // use with caution, if false, skip render until the next state change
    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }

    //invoke when receiving new props, not called for initial render
    componentWillReceiveProps() {
    }

    render() {
        return (
            <ReactCSSTransitionGroup
                transitionAppear={true}
                transitionAppearTimeout={1000}
                transitionEnterTimeout={1000}
                transitionLeaveTimeout={1000}
                transitionName="active-list">
                <div id="template" ref="temp" className="template">
                    This is a template
                </div>
            </ReactCSSTransitionGroup>
        )
    }
}

Template.propTypes = {
    function: PropTypes.func.isRequired,
    variable: PropTypes.string.isRequired
};

const mapStateToProps = state => {
    return state;
}

export default connect(mapStateToProps)(Template);

// const mapDispatchToProps = dispatch => {
//     return {
//         updateNumberOfCabs: bindActionCreators(updateNumberOfCabs, dispatch)
//     };
// };
//
// const mapStateToProps = store => {
//     return {
//         contextualView: {
//             active: store.events.contextualView.active,
//             context: store.events.contextualView.context
//         }
//     };
// };
//
// export default connect(mapStateToProps, mapDispatchToProps)(CarouselItemCabOverlay);

