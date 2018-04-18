/**
 *
 * 大画财经详情数据-状态树数据同步
 *
 */

import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {safari} from '../lib/interactive';
import NavigationBar from '../components/common/NavigationBar';
import FinanceDetailsList from '../components/finance/FinanceDetailsList';
import AppDownloadBar from '../components/common/AppDownloadBar';
import {nodeUnLoad} from '../actions/actionCreator';
import {
    fetchNewsFinanceDetails, 
    fetchReviewList, 
    fetchReviewLike
} from '../actions/actionTypes';

const mapStateToProps = (state, ownProps) => {
    return {
        isFetching: state.postNewsFinanceDetails.isFetching,
        itemsFinance: state.postNewsFinanceDetails.items,
        isFetchingReviewList: state.postReviewList.isFetching,
        itemsReviewList: state.postReviewList.items,
        isAllReviewList: state.postReviewList.isAll,
        isAppDownLoad: state.postAppDownLoad.isHidden,
        isNodeLoad: state.postNode.isNodeLoad,
        windowObject: state.postWindowObject.fontSize
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({fetchReviewLike}, dispatch);
};

@connect(mapStateToProps)
export default class FinanceDetails extends Component {
    static propTypes = {
        children: PropTypes.node
    };

    static fetch(state, dispatch, renderProps) {
        let {platform} = renderProps.location.query;
        const fetchTasks = [];
        var _newsId = renderProps.params.splat[1];
        if (platform === 'ios' || platform === 'android') {
            fetchTasks.push(
                dispatch(fetchNewsFinanceDetails(_newsId))
            );
        } else {
            fetchTasks.push(
                dispatch(fetchNewsFinanceDetails(_newsId)),
                dispatch(fetchReviewList(_newsId, 0))
            );
        }
        return fetchTasks;
    };

    constructor(props) {
        super(props);
        this.state = {
            newsId: this.props.params.splat[1],
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
        !isNodeLoad && dispatch(fetchNewsFinanceDetails(params.splat[1]));
        !(platform === 'ios' || platform === 'android') && !isNodeLoad && dispatch(fetchReviewList(params.splat[1], 0));
        safari('root', 'IOS');
    };

    componentWillReceiveProps(nextProps) {
        if (this.props.params.splat[1] 
        !== nextProps.params.splat[1]) {
            let {dispatch} = this.props;
            let _newsId = nextProps.params.splat[1];
            dispatch(fetchNewsFinanceDetails(_newsId));
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
            itemsFinance,  
            itemsReviewList, 
            dispatch, 
            isAppDownLoad,
            windowObject
        } = this.props;
        return (
            <div>
                <NavigationBar menuCode={this.state.pathSwitch}
                    historyBack={this.state.newsId}
                    history={history}
                    areaName="大画财经" />
                <FinanceDetailsList newsId={this.state.newsId}
                    isFetching={isFetching}
                    items={itemsFinance.resultBody}
                    itemsReviewList={itemsReviewList.resultBody}
                    dispatch={dispatch}
                    fontSize={windowObject} />
                {children}
                <AppDownloadBar dispatch={dispatch} 
                    isAppDownLoad={isAppDownLoad}></AppDownloadBar>
            </div>
        );
    };
};