/**
 *
 * 推荐新闻列表数据-状态树数据同步
 *
 */

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {nodeUnLoad} from '../actions/actionCreator';
import {fetchNewsRecommend} from '../actions/actionTypes';
import {touchOffsetParent} from '../lib/interactive';
import NavigationBar from '../components/common/NavigationBar';
import NewsList from '../components/news/NewsList';
import AppDownloadBar from '../components/common/AppDownloadBar';

const mapStateToProps = (state, ownProps) => {
    return {
        isFetching: state.postNewsRecommend.isFetching,
        items: state.postNewsRecommend.items,
        playload: state.postNewsRecommend.playload,
        pageInfo: state.postNewsRecommend.pageInfo,
        isAppDownLoad: state.postAppDownLoad.isHidden,
        isNodeLoad: state.postNode.isNodeLoad,
        windowObject: state.postWindowObject.fontSize
    };
};

@connect(mapStateToProps)
export default class News extends Component {
    static propTypes = {
        children: PropTypes.node
    };

    /**
     * 全应用通用node静态化逻辑
     * static fetch静态方法含需在node初始化数据的action函数
     * 以便node在初始化时遍历container的wrapcomponent上的fetch方法获取数据
     * @func {fetch}
     */

    static fetch(state, dispatch, renderProps, route) {
        const fetchTasks = [];
        fetchTasks.push(
            dispatch(fetchNewsRecommend(route.path, 20, 1))
        );
        return fetchTasks;
    };

    constructor(props) {
        super(props);
        this.loadMore = this.loadMore.bind(this);
        this.playloadModule = this.playloadModule.bind(this);
        this.state = {
            catId: this.props.location.pathname.split('/')[1],
            pathSwitch: this.props.location.pathname.split('/')[1],
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
        let {dispatch, route, playload, pageInfo} = this.props;
        let isLoadMoreStarted = (pageInfo.nextPage === ratio + 1) ? true : false;
        // console.log(isLoadMoreStarted, ratio, pageInfo.nextPage);
        ratio && pageInfo.nextPage && isLoadMoreStarted && dispatch(fetchNewsRecommend(route.path, 20, pageInfo.nextPage, playload, ratio));
    };

    /**
     * 分页数据封装
     * @returns {*}
     */

    playloadModule() {
        const {playload, route} = this.props; 
        let catCode = route.path ? route.path : 'index';
        let loadMoreItem;
        if (playload && playload[catCode]) {
            let _values = [];
            for (let key in playload[catCode]) {
                _values.push(playload[catCode][key]);
            }
            loadMoreItem = Array.prototype.concat.apply([], _values);
        } else {
            loadMoreItem = [];
        }
        // let loadMoreItem = playload && playload[catCode] ? Array.prototype.concat.apply([], Object.values(playload[catCode])) : [];
        return loadMoreItem;
    };


    /**
     * 全应用通用逻辑注释
     * isNodeLoad 表示数据是否已在node初始化
     * 若已获取数据则浏览器端无需再次请求、避免页面重复渲染
     * 后续页面dispatch必须含nodeUnLoad action以防止数据不再刷新
     * @params {isNodeLoad}
     */

    componentDidMount() {
        let {dispatch, route, isNodeLoad} = this.props;
        !isNodeLoad && dispatch(fetchNewsRecommend(route.path, 20, 1));
    };

    componentWillReceiveProps(nextProps) {
        if (this.props.location.pathname.split('/')[1] 
        !== nextProps.location.pathname.split('/')[1]) {
            this.setState({isLoadMore: false});
            let {dispatch} = this.props;
            let _catId = nextProps.location.pathname.split('/')[1];
            dispatch(fetchNewsRecommend(_catId, 20, 1));
            this.setState({
                catId: _catId,
                pathSwitch: _catId
            });
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
            dispatch,
            isAppDownLoad,
            windowObject,
            pageInfo
        } = this.props;
        const {isLoadMore} = this.state;
        let loadMoreItem = this.playloadModule();
        
        return (
            <div onTouchEnd={(e) => {this.loadMore(e);}}>
                <NavigationBar menuCode={this.state.pathSwitch} />
                {items?<NewsList items={items.resultBody}
                     isFetching={isFetching}
                     catId={this.state.catId}
                     fontSize={windowObject} />:null}
                {children}
                {loadMoreItem && isLoadMore ? <NewsList loadMore={loadMoreItem.slice(0, 20 * (Number(pageInfo.currentPage) - 1))}
                    fontSize={windowObject} />:null}
                <AppDownloadBar dispatch={dispatch} 
                     isAppDownLoad={isAppDownLoad}></AppDownloadBar>
            </div>
        );
    };
};