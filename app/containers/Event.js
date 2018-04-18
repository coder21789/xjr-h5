/**
 *
 * 大事件列表数据-状态树数据同步
 *
 */

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {ThemeUI} from '../lib/interactive';
import NavigationBar from '../components/common/NavigationBar';
import AppDownloadBar from '../components/common/AppDownloadBar';
import EventList from '../components/event/EventList';
import {nodeUnLoad} from '../actions/actionCreator';
import {fetchNewsEvent} from '../actions/actionTypes';

const mapStateToProps = (state, ownProps) => {
    return {
        isAppDownLoad: state.postAppDownLoad.isHidden,
        isFetching: state.postNewsEvent.isFetching,
        items: state.postNewsEvent.items,
        isNodeLoad: state.postNode.isNodeLoad
    };
};

@connect(mapStateToProps)
export default class Event extends Component {
    static propTypes = {
        children: PropTypes.node
    };

    static fetch(state, dispatch, renderProps, route) {
        const fetchTasks = [];
        fetchTasks.push(
            dispatch(fetchNewsEvent())
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
        let {dispatch, isNodeLoad} = this.props;
        !isNodeLoad && dispatch(fetchNewsEvent());
    };

    componentWillUnmount() {
        let {dispatch, isNodeLoad} = this.props;
        isNodeLoad && dispatch(nodeUnLoad());
    };

    render() {
        const {children, dispatch, isAppDownLoad, isFetching, items} = this.props;
        return (
            <div>
                <NavigationBar menuCode={this.state.pathSwitch} />
                <EventList items={items.resultBody} isFetching={isFetching} />
                {children}
                <AppDownloadBar dispatch={dispatch} 
                    isAppDownLoad={isAppDownLoad}></AppDownloadBar>
            </div>
        );
    };
};