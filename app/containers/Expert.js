/**
 *
 * 专家新闻列表数据-状态树数据同步
 *
 */

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {nodeUnLoad} from '../actions/actionCreator';
import {fetchNewsExpert, fetchNewsExpertAuthor} from '../actions/actionTypes';
import {touchOffsetParent} from '../lib/interactive';
import NavigationBar from '../components/common/NavigationBar';
import ExpertList from '../components/expert/ExpertList';
import ExpertNewsList from '../components/expert/ExpertNewsList';
import AppDownloadBar from '../components/common/AppDownloadBar';

const mapStateToProps = (state, ownProps) => {
    return {
        isFetchingExpert: state.postNewsExpert.isFetching,
        itemsExpert: state.postNewsExpert.items,
        isFetchingExpertDetails: state.postNewsExpertDetails.isFetching,
        itemsExpertDetails: state.postNewsExpertDetails.items,
        playload: state.postNewsExpertDetails.playload,
        pageInfo: state.postNewsExpertDetails.pageInfo,
        isAppDownLoad: state.postAppDownLoad.isHidden,
        isNodeLoad: state.postNode.isNodeLoad
    };
};

@connect(mapStateToProps)
export default class Expert extends Component {
    static propTypes = {
        children: PropTypes.node
    };

    static fetch(state, dispatch, renderProps, route) {
        const fetchTasks = [];
        var _author = renderProps.params;
        if (_author && _author.splat) {
            fetchTasks.push(
                dispatch(fetchNewsExpertAuthor(_author.splat, 20, 1))
            );
        } else {
            fetchTasks.push(
                dispatch(fetchNewsExpert())
            );
        }
        return fetchTasks;
    };

    constructor(props) {
        super(props);
        this.dispatchSwitch = this.dispatchSwitch.bind(this);
        this.loadMore = this.loadMore.bind(this);
        this.playloadModule = this.playloadModule.bind(this);
        this.state = {
            author: this.props.params,
            pathSwitch: this.props.location.pathname.split('/')[1],
            isLoadMore: false
        };
    };

    /**
     * 根据是否存在专家id分发不同dispatch获取列表或详情
     * @params {id}
     */

    dispatchSwitch(id) {
        let {dispatch} = this.props;
        if (id && id.splat) {
            dispatch(fetchNewsExpertAuthor(id.splat, 20, 1));
        } else {
            dispatch(fetchNewsExpert());
        }
    };

    /**
     * 滚动加载分页数据
     * @param e
     */

    loadMore(e) {
        this.setState({isLoadMore: true});
        const {author} = this.state;
        let {ratio} = touchOffsetParent.call(this, e);
        let {dispatch, playload, pageInfo} = this.props;
        let isLoadMoreStarted = (pageInfo.nextPage === ratio + 1) ? true : false;
        author && ratio && pageInfo.nextPage && isLoadMoreStarted && dispatch(fetchNewsExpertAuthor(author.splat, 20, pageInfo.nextPage, playload, ratio));
    };

    /**
     * 分页数据封装
     * @returns {*}
     */

    playloadModule() {
        const {playload, params} = this.props; 
        let username = params.splat;
        let loadMoreItem;
        if (playload && playload[username]) {
            let _values = [];
            for (let key in playload[username]) {
                _values.push(playload[username][key]);
            }
            loadMoreItem = Array.prototype.concat.apply([], _values);
        } else {
            loadMoreItem = [];
        }
        return loadMoreItem;
    };

    componentDidMount() {
        let {params, isNodeLoad} = this.props;
        !isNodeLoad && this.dispatchSwitch(params);
        this.setState({author: params});
    };

    componentWillReceiveProps(nextProps) {
        if (this.props.params !== nextProps.params) {
            this.setState({isLoadMore: false});
            let _author = nextProps.params;
            this.dispatchSwitch(_author);
            this.setState({author: _author});
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
            itemsExpert, 
            isFetchingExpert, 
            itemsExpertDetails, 
            isFetchingExpertDetails, 
            dispatch, 
            isAppDownLoad,
            history,
            playload
        } = this.props;
        const {author, isLoadMore} = this.state;
        let loadMoreItem = this.playloadModule();
        return (
            <div className="expertComponent" onTouchEnd={(e) => {author && author.splat && this.loadMore(e)}}>
                {author && author.splat ?
                    <NavigationBar menuCode={this.state.pathSwitch}
                       historyBack={true}
                       history={history}
                       areaName=" " /> :
                    <NavigationBar menuCode={this.state.pathSwitch} />}
                <ExpertList author={this.state.author && this.state.author.splat ? true : false}
                    itemsExpert={itemsExpert.resultBody?itemsExpert.resultBody.expert:null}
                    itemsExpertNews={itemsExpert.resultBody?itemsExpert.resultBody.news:null}
                    itemsExpertTkd={itemsExpert.resultBody?itemsExpert.resultBody.tkd:null}
                    isFetchingExpert={isFetchingExpert}
                    itemsExpertAuthor={itemsExpertDetails.resultBody?itemsExpertDetails.resultBody.expert:null}
                    itemsExpertDetails={itemsExpertDetails.resultBody?itemsExpertDetails.resultBody.news:null}
                    isFetchingExpertDetails={isFetchingExpertDetails} />
                {playload && isLoadMore && author && loadMoreItem.length > 0 ? <ExpertNewsList items={loadMoreItem} load={true} />:null}    
                {children}
                <AppDownloadBar dispatch={dispatch} 
                    isAppDownLoad={isAppDownLoad}></AppDownloadBar>
            </div>
        );
    };
};