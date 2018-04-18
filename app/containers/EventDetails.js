/**
 *
 * 大事件详情数据-状态树数据同步
 *
 */

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {ThemeUI} from '../lib/interactive';
import NavigationBar from '../components/common/NavigationBar';
import AppDownloadBar from '../components/common/AppDownloadBar';
import EventDetailsList from '../components/event/EventDetailsList';
import {nodeUnLoad} from '../actions/actionCreator';
import {fetchNewsEventDetails} from '../actions/actionTypes';

const mapStateToProps = (state, ownProps) => {
    return {
        isAppDownLoad: state.postAppDownLoad.isHidden,
        isFetching: state.postNewsEventDetails.isFetching,
        items: state.postNewsEventDetails.items,
        isNodeLoad: state.postNode.isNodeLoad
    };
};

@connect(mapStateToProps)
export default class EventDetails extends Component {
    static propTypes = {
        children: PropTypes.node
    };

    static fetch(state, dispatch, renderProps, route) {
        const fetchTasks = [];
        fetchTasks.push(
            dispatch(fetchNewsEventDetails(renderProps.params.splat[1]))
        );
        return fetchTasks;
    };

    constructor(props) {
        super(props);
        this.state = {
            pathSwitch: this.props.location.pathname.split('/')[2]
        };
    };

    componentDidMount() {
        ThemeUI(this.props, 'dark');
        let {dispatch, params, isNodeLoad} = this.props;
        !isNodeLoad && dispatch(fetchNewsEventDetails(params.splat[1]));
    };

    componentWillReceiveProps(nextProps) {
        if (this.props.params.splat[1] !== nextProps.params.splat[1]) {
            let {dispatch} = this.props;
            dispatch(fetchNewsEventDetails(nextProps.params.splat[1]));
        }
    };

    componentWillUnmount() {
        let {dispatch, isNodeLoad} = this.props;
        isNodeLoad && dispatch(nodeUnLoad());
    };

    render() {
        const {children, dispatch, isAppDownLoad, history, isFetching, items} = this.props;
        return (
            <div className="eventDetailsComponent">
                <NavigationBar menuCode={this.state.pathSwitch}
                   history={history}
                   historyBack={true}
                   areaName="新融街" />
                <EventDetailsList items={items.resultBody} isFetching={isFetching} />
                {children}
                <AppDownloadBar dispatch={dispatch} 
                    isAppDownLoad={isAppDownLoad}></AppDownloadBar>
            </div>
        );
    };
};