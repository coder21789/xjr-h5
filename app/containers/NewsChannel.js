/**
 *
 * 小频道新闻列表数据-状态树数据同步
 *
 */

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {fetchNewsRecommendChannel} from '../actions/actionTypes';
import NavigationBar from '../components/common/NavigationBar';
import NewsListChannel from '../components/news/NewsListChannel';
import AppDownloadBar from '../components/common/AppDownloadBar';

const mapStateToProps = (state, ownProps) => {
    return {
        isFetching: state.postNewsRecommendChannel.isFetching,
        items: state.postNewsRecommendChannel.items,
        isAppDownLoad: state.postAppDownLoad.isHidden
    };
};

@connect(mapStateToProps)
export default class NewsChannel extends Component {
    static propTypes = {
        children: PropTypes.node
    };

    static fetch(state, dispatch, renderProps, route) {
        const fetchTasks = [];
        fetchTasks.push(
            dispatch(fetchNewsRecommendChannel(renderProps.params.splat[1]))
        );
        return fetchTasks;
    };

    constructor(props) {
        super(props);
        this.state = {
            areaCode: this.props.location.pathname.split('/')[2].split('-')[0],
            pathSwitch: this.props.location.pathname.split('/')[2].split('-')[0]
        };
    };

    componentDidMount() {
        let {dispatch, params} = this.props;
        dispatch(fetchNewsRecommendChannel(params.splat[1]));
    };

    componentWillReceiveProps(nextProps) {
        if (this.props.location.pathname.split('/')[2].split('-')[0] 
        !== nextProps.location.pathname.split('/')[2].split('-')[0]) {
            let {dispatch} = this.props;
            let _areaCode = nextProps.location.pathname.split('/')[2].split('-')[0];
            dispatch(fetchNewsRecommendChannel(_areaCode));
            this.setState({areaCode: _areaCode});
        }
    };

    render() {
        const {
            children, 
            history, 
            items, 
            isFetching, 
            dispatch, 
            isAppDownLoad
        } = this.props;
        return (
            <div>
                <NavigationBar menuCode={this.state.pathSwitch}
                   historyBack={this.state.areaCode}
                   history={history}
                   areaName={items.resultBody ? items.resultBody.tkd.NAME : null} />
                {items.resultBody?<NewsListChannel items={items.resultBody}
                   isFetching={isFetching} />:null}
                {children}
                <AppDownloadBar dispatch={dispatch} 
                   isAppDownLoad={isAppDownLoad}></AppDownloadBar>
            </div>
        );
    };
};