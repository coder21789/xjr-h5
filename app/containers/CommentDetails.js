/**
 *
 * 评论详情数据-状态树数据同步
 *
 */

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {fetchReviewDetails} from '../actions/actionTypes';
import {safari} from '../lib/interactive';
import NavigationBar from '../components/common/NavigationBar';
import CommentDetailsList from '../components/comment/CommentDetailsList';
import AppDownloadBar from '../components/common/AppDownloadBar';

const mapStateToProps = (state, ownProps) => {
    return {
        isFetching: state.postReviewDetails.isFetching,
        items: state.postReviewDetails.items,
        isAppDownLoad: state.postAppDownLoad.isHidden
    };
};

@connect(mapStateToProps)
export default class CommentDetails extends Component {
    static propTypes = {
        children: PropTypes.node
    };

    static fetch(state, dispatch, renderProps) {
        const fetchTasks = [];
        let _reviewId = renderProps.params.replyId.split('-')[1].split('.')[0];
        let _newsId = renderProps.params.replyId.split('-')[0];
        fetchTasks.push(
            dispatch(fetchReviewDetails(_reviewId, _newsId))
        );
        return fetchTasks;
    };

    constructor(props) {
        super(props);
        this.state = {
            pathSwitch: this.props.location.pathname.split('/')[1],
            newsId: this.props.params.replyId.split('-')[0],
            reviewId: this.props.params.replyId.split('-')[1].split('.')[0]
        };
    };

    componentDidMount() {
        safari('root', 'IOS');
    };

    componentWillMount() {
        let {dispatch, params} = this.props;
        let _reviewId = params.replyId.split('-')[1].split('.')[0];
        let _newsId = params.replyId.split('-')[0];
        dispatch(fetchReviewDetails(_reviewId, _newsId));
    };

    componentWillReceiveProps(nextProps) {
        if (this.props.params.replyId.split('.')[0] !== nextProps.params.replyId.split('.')[0]) {
            let {dispatch} = this.props;
            let _reviewId = nextProps.params.replyId.split('-')[1].split('.')[0];
            let _newsId = nextProps.params.replyId.split('-')[0];
            dispatch(fetchReviewDetails(_reviewId, _newsId));
            this.setState({newsId: _newsId});
            this.setState({reviewId: _reviewId});
        }
    };

    render() {
        const {
            children, 
            history, 
            isFetching, 
            items, 
            dispatch, 
            isAppDownLoad
        } = this.props;
        const {newsId, reviewId} = this.state;
        return (
            <div>
                <NavigationBar menuCode={this.state.pathSwitch}
                   areaName="评论详情"
                   historyBack={true}
                   history={history} />
                <CommentDetailsList isFetching={isFetching} 
                   items={items.resultBody}
                   newsId={newsId} 
                   reviewId={reviewId} 
                   dispatch={dispatch} />
                {children}
                <AppDownloadBar dispatch={dispatch} 
                   isAppDownLoad={isAppDownLoad}></AppDownloadBar>
            </div>
        );
    };
};