/**
 *
 * 区域新闻列表数据-状态树数据同步
 *
 */

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import areaBar from '../config/areaBar';
import {fetchNewsRecommendQq} from '../actions/actionTypes';
import {touchOffsetParent} from '../lib/interactive';
import {nodeUnLoad} from '../actions/actionCreator';
import NavigationBar from '../components/common/NavigationBar';
import NewsListArea from '../components/news/NewsListArea';
import AppDownloadBar from '../components/common/AppDownloadBar';

const mapStateToProps = (state, ownProps) => {
    return {
        isFetching: state.postNewsRecommendQq.isFetching,
        items: state.postNewsRecommendQq.items,
        isAppDownLoad: state.postAppDownLoad.isHidden,
        isNodeLoad: state.postNode.isNodeLoad,
        playload: state.postNewsRecommendQq.playload,
        pageInfo: state.postNewsRecommendQq.pageInfo
    };
};

@connect(mapStateToProps)
export default class NewsArea extends Component {
    static propTypes = {
        children: PropTypes.node
    };

    static fetch(state, dispatch, renderProps, route) {
        const fetchTasks = [];
        fetchTasks.push(
            dispatch(fetchNewsRecommendQq(areaBar.areaReflect[route.path.split('/')[1]].code, 20, 1))
        );
        return fetchTasks;
    };

    constructor(props) {
        super(props);
        this.loadMore = this.loadMore.bind(this);
        this.playloadModule = this.playloadModule.bind(this);
        this.state = {
            areaCode: this.props.location.pathname.split('/')[2],
            pathSwitch: this.props.location.pathname.split('/')[2],
            isLoadMore: false
        };
    };

    /**
     * 滚动加载分页数据
     * @param e
     */

    loadMore(e) {
        this.setState({isLoadMore: true});
        let {ratio} = touchOffsetParent.call(this, e);
        let {dispatch, playload, pageInfo, route} = this.props;
        let code = route.path.split('/')[1];
        let isLoadMoreStarted = (pageInfo.nextPage === ratio + 1) ? true : false;
        ratio && pageInfo.nextPage && isLoadMoreStarted && dispatch(fetchNewsRecommendQq(code, 20, pageInfo.nextPage, playload, ratio));
    };

    /**
     * 分页数据封装
     * @returns {*}
     */

    playloadModule() {
        const {playload, route} = this.props; 
        let code = route.path.split('/')[1];
        let loadMoreItem;
        if (playload && playload[code]) {
            let _values = [];
            for (let key in playload[code]) {
                _values.push(playload[code][key]);
            }
            loadMoreItem = Array.prototype.concat.apply([], _values);
        } else {
            loadMoreItem = [];
        }
        return loadMoreItem;
    };

    componentDidMount() {
        let {dispatch, route, isNodeLoad} = this.props;
        !isNodeLoad && dispatch(fetchNewsRecommendQq(areaBar.areaReflect[route.path.split('/')[1]].code, 20, 1));
    };

    componentWillReceiveProps(nextProps) {
        if (this.props.location.pathname.split('/')[2] 
        !== nextProps.location.pathname.split('/')[2]) {
            this.setState({isLoadMore: false});
            let {dispatch} = this.props;
            let _areaCode = nextProps.location.pathname.split('/')[2];
            dispatch(fetchNewsRecommendQq(areaBar.areaReflect[_areaCode].code, 20, 1));
            this.setState({areaCode: _areaCode});
        }
    };

    componentWillUnmount() {
        this.setState({isLoadMore: false});
        let {dispatch, isNodeLoad} = this.props;
        isNodeLoad && dispatch(nodeUnLoad());
    };

    render() {
        const {
            children, 
            items, 
            isFetching, 
            history, 
            dispatch, 
            isAppDownLoad, 
            playload
        } = this.props;
        const {isLoadMore} = this.state;
        let loadMoreItem = this.playloadModule();
        return (
            <div onTouchEnd={(e) => {this.loadMore(e)}}>
                <NavigationBar menuCode={this.state.pathSwitch}
                   historyBack={this.state.areaCode}
                   areaName={areaBar.areaReflect[this.state.areaCode].name}
                   history={history} />
                <NewsListArea items={items.resultBody}
                   isFetching={isFetching}
                   areaCode={this.state.areaCode} />
                {playload && isLoadMore && loadMoreItem.length > 0 ? <NewsListArea items={{suggest: loadMoreItem}} load={true} />:null} 
                {children}
                <AppDownloadBar dispatch={dispatch} 
                   isAppDownLoad={isAppDownLoad}></AppDownloadBar>
            </div>
        );
    };
};