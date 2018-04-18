/**
 *
 * 评论列表组件
 *
 */

import React, {Component} from 'react';
import Loading from '../common/Loading';
import CommentBar from '../comment/CommentBar';
import CommentContent from './CommentContent';
import PageEnd from '../common/PageEnd';
import {resizeNavigationBar} from '../../lib/interactive';

export default class CommentList extends Component {
    componentDidMount() {
        resizeNavigationBar('', '0.02667', '1.17333');
    };

    componentWillUnmount() {
        resizeNavigationBar('', '0', '2.24');
    };

    render() {
        const {isFetching, items, dispatch} = this.props;
        return (
            <div className="CommentListContainer commentBarMargin">
                {isFetching?<Loading />:null}
                {items&&items.hotList.length>0?(
                    items.hotList.map((row, i) => (
                        <CommentContent theme={1} item={row} newsId={items.newsId}
                            dispatch={dispatch} key={`hotList${row.reviewId}`} />
                    ))
                ):null}
                {items&&items.latestList.length>0?(
                    items.latestList.map((row, i) => (
                        <CommentContent theme={1} item={row} newsId={items.newsId}
                            dispatch={dispatch} key={`hotList${row.reviewId}`} />
                    ))
                ):null}
                <PageEnd />
                <CommentBar theme={2} newsId={items.newsId} dispatch={dispatch} />
            </div>
        );
    };
};