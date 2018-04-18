/**
 *
 * 评论详情组件
 *
 */

import React, {Component} from 'react';
import {Link} from 'react-router';
import Loading from '../common/Loading';
import CommentBar from '../comment/CommentBar';
import CommentContent from './CommentContent';
import PageEnd from '../common/PageEnd';
import {resizeNavigationBar} from '../../lib/interactive';
import '../styles/commentDetailsList.scss';

export default class CommentDetailsList extends Component {
    componentDidMount() {
        resizeNavigationBar('', '0.02667', '1.17333');
    };

    componentWillUnmount() {
        resizeNavigationBar('', '0', '2.24');
    };

    render() {
        const {isFetching, items, newsId, reviewId, dispatch} = this.props;
        return (
            <div className="CommentListContainer commentBarMargin">
                {isFetching?<Loading />:null}
                <div className="commentDetailsTop">
                    <Link
                        to={{
                            pathname: items.appNewsDetail.newsAppUrl ? items.appNewsDetail.newsAppUrl.slice(4) : items.appNewsDetail.newsAppUrl
                        }}>
                        <figure className="commentDetailsCaption">
                            <figcaption>原文：{items.appNewsDetail.subject}</figcaption>
                        </figure>
                    </Link>
                    <CommentContent theme={2} newsId={newsId} item={items.reviewDetail} 
                        reviewId={reviewId} dispatch={dispatch} />
                </div>
                <div className="newsCommentTag">
                    {/*<img src={require('../img/comment@3x.png')} alt="" />*/}
                    <h4>全部回复</h4>
                </div>
                {items&&items.replyList&&items.replyList.length>0?(
                    items.replyList.map((row, i) => (
                        <CommentContent theme={2} item={row} newsId={newsId} reviewId={reviewId}
                                        key={`replyList${row.commentor}${row.publishTime}${i}`} dispatch={dispatch} />
                    ))
                ):null}
                <PageEnd />
                <CommentBar theme={2} newsId={newsId} reviewId={reviewId} dispatch={dispatch} 
                    commentor={items.reviewDetail.commentor} />
            </div>
        );
    };
};