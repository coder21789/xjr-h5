/**
 *
 * 评论列表数据-状态树数据同步
 *
 */

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {fetchReviewList} from '../actions/actionTypes';
import {safari} from '../lib/interactive';
import NavigationBar from '../components/common/NavigationBar';
import CommentList from '../components/comment/CommentList';
import AppDownloadBar from '../components/common/AppDownloadBar';

const mapStateToProps = (state, ownProps) => {
    return {
        isFetching: state.postReviewList.isFetching,
        items: state.postReviewList.items,
        isAll: state.postReviewList.isAll,
        isAppDownLoad: state.postAppDownLoad.isHidden
    };
};

@connect(mapStateToProps)
export default class Comment extends Component {
    static propTypes = {
        children: PropTypes.node
    };

    static fetch(state, dispatch, renderProps) {
        const fetchTasks = [];
        fetchTasks.push(
            dispatch(fetchReviewList(renderProps.params.reviewId.split('.')[0], 1))
        );
        return fetchTasks;
    };

    constructor(props) {
        super(props);
        this.state = {pathSwitch: this.props.location.pathname.split('/')[1]};
    };

    componentDidMount() {
        let {dispatch, params} = this.props;
        dispatch(fetchReviewList(params.reviewId.split('.')[0], 1));
        safari('root', 'IOS');
    };

    componentWillReceiveProps(nextProps) {
        if (this.props.params.reviewId.split('.')[0] !== nextProps.params.reviewId.split('.')[0]) {
            let {dispatch} = this.props;
            dispatch(fetchReviewList(nextProps.params.reviewId.split('.')[0], 1));
        }
    };

    render() {
        const {children, history, isFetching, items, dispatch, isAppDownLoad} = this.props;
        return (
            <div>
                <NavigationBar menuCode={this.state.pathSwitch}
                   areaName="全部评论"
                   historyBack={true}
                   history={history} />
                <CommentList isFetching={isFetching} items={items.resultBody} dispatch={dispatch} />
                {children}
                <AppDownloadBar dispatch={dispatch} isAppDownLoad={isAppDownLoad}></AppDownloadBar>
            </div>
        );
    };
};