/**
 *
 * 详情评论列表组件
 * 新版详情评论区
 *
 */

import React, {Component} from 'react';
import CommentContent from '../comment/CommentContent';
import '../styles/newsSingalComment.scss';

export default class NewsSingalComment extends Component {
    render() {
        const {items, dispatch} = this.props;
        return (
            <div id="platformComment">
                {items&&items.hotList.length>0?(
                    <section className="NewsSingalComment">
                        <div className="newsCommentTag">
                            {/*<img src={require('../img/comment@3x.png')} alt="" />*/}
                            <h4>热门评论</h4>
                        </div>
                        {items.hotList.map((row, i) => (
                            <CommentContent theme={3} item={row} newsId={items.newsId}
                                dispatch={dispatch} key={`detailsHotList${row.reviewId}`} />
                        ))}
                    </section>
                ):null}
                {items&&items.latestList.length>0?(
                    <section className="NewsSingalComment">
                        <div className="newsCommentTag">
                            <h4>最新评论</h4>
                        </div>
                        {items.latestList.map((row, i) => (
                            <CommentContent theme={3} item={row} newsId={items.newsId}
                                dispatch={dispatch} key={`detailsLatestList${row.reviewId}`} />
                        ))}
                    </section>
                ):null}
            </div>
        );
    };
};