/**
 *
 * 新闻详情数据-状态树数据同步
 *
 */

import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {safari, ThemeUI} from '../lib/interactive';
import NavigationBar from '../components/common/NavigationBar';
import DetailsList from '../components/details/DetailsList';
import AppDownloadBar from '../components/common/AppDownloadBar';
import {nodeUnLoad} from '../actions/actionCreator';
import {
    fetchNewsContent, 
    fetchReviewList, 
    fetchReviewLike
} from '../actions/actionTypes';

const mapStateToProps = (state, ownProps) => {
    return {
        isFetching: state.postNews.isFetching,
        isLoaded: state.postNews.isLoaded,
        itemsContent: state.postNews.content,
        itemsAbout: state.postNews.about,
        itemsComment: state.postNews.comment,
        isFetchingReviewList: state.postReviewList.isFetching,
        itemsReviewList: state.postReviewList.items,
        isAllReviewList: state.postReviewList.isAll,
        isAppDownLoad: state.postAppDownLoad.isHidden,
        isNodeLoad: state.postNode.isNodeLoad
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({fetchReviewLike}, dispatch);
};

@connect(mapStateToProps)
export default class Details extends Component {
    static propTypes = {
        children: PropTypes.node
    };

    static fetch(state, dispatch, renderProps) {
        let {platform} = renderProps.location.query;
        const fetchTasks = [];
        var _newsId = renderProps.params.splat[2];
        if (platform === 'ios' || platform === 'android') {
            fetchTasks.push(
                dispatch(fetchNewsContent(_newsId, true))
            );
        } else {
            fetchTasks.push(
                dispatch(fetchNewsContent(_newsId)),
                dispatch(fetchReviewList(_newsId, 0))
            );
        }
        return fetchTasks;
    };

    constructor(props) {
        super(props);
        this.state = {
            newsId: this.props.location.pathname.split('.')[0].split('-')[2],
            pathSwitch: this.props.location.pathname.split('/')[2]
        };
    };

    
    /**
     * 添加app内嵌逻辑、屏蔽评论列表dispatch
     * node渲染逻辑修改、移除评论列表dispatch
     * @params {platform, ios, android}
     */

    componentDidMount() {
        let {dispatch, params, location, isNodeLoad} = this.props;
        let {platform} = location.query;
        ThemeUI(this.props, 'dark');
        !isNodeLoad && dispatch(fetchNewsContent(params.splat[2]));
        !(platform === 'ios' || platform === 'android') && !isNodeLoad && dispatch(fetchReviewList(params.splat[2], 0));
        safari('root', 'IOS');
    };

    componentWillReceiveProps(nextProps) {
        if (this.props.location.pathname.split('.')[0].split('-')[2] 
        !== nextProps.location.pathname.split('.')[0].split('-')[2]) {
            let {dispatch} = this.props;
            let _newsId = nextProps.location.pathname.split('.')[0].split('-')[2];
            dispatch(fetchNewsContent(_newsId));
            dispatch(fetchReviewList(_newsId, 0));
            this.setState({newsId: _newsId});
        }
    };

    componentWillUnmount() {
        let {dispatch, isNodeLoad} = this.props;
        isNodeLoad && dispatch(nodeUnLoad());
    };

    render() {
        const {
            children, 
            history, 
            isFetching, 
            itemsContent, 
            itemsAbout, 
            itemsReviewList, 
            dispatch, 
            isAppDownLoad,
            location
        } = this.props;
        return (
            <div className="DetailsComponent">
                <NavigationBar menuCode={this.state.pathSwitch}
                    historyBack={this.state.newsId}
                    history={history}
                    areaName="新融街" />
                <DetailsList newsId={this.state.newsId}
                    isFetching={isFetching}
                    itemsContent={itemsContent.resultBody}
                    itemsAbout={itemsAbout.resultBody}
                    itemsReviewList={itemsReviewList.resultBody}
                    dispatch={dispatch}
                    platform={location.query.platform} />
                {children}
                <AppDownloadBar dispatch={dispatch} 
                    isAppDownLoad={isAppDownLoad}></AppDownloadBar>
            </div>
        );
    };
};