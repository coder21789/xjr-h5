/**
 *
 * 评论内容组件
 *
 */

import React, {Component} from 'react';
import {Link} from 'react-router';
import {fetchReviewLike, fetchReplyLike} from '../../actions/actionTypes';
import CommentDialog from './CommentDialog';
import '../styles/commentContent.scss';

export default class CommentContent extends Component {
    constructor(props) {
        super(props);
        this.handleDialogShow = this.handleDialogShow.bind(this);
        this.handleDialogHide = this.handleDialogHide.bind(this);
        this.state = {dialogShow: false, scrollTop: 0};
    };

    /**
     * 禁止页面滚动、弹出框消失后回到页面原来位置
     * @className {scrollDisabled, scrollTop}
     */

    handleDialogShow() {
        this.setState({dialogShow: true, scrollTop: window.document.body.scrollTop});
        window.document.body.className = 'scrollDisabled';
    };

    handleDialogHide() {
        this.setState({dialogShow: false});
        window.document.body.className = '';
        window.scrollTo(0, this.state.scrollTop);
    };

    render() {
        const {dialogShow} = this.state;
        const {theme, item, newsId, dispatch, reviewId} = this.props;
        return (
            <CommentThemeList theme={theme}
              item={item}
              newsId={newsId}
              reviewLike={this.reviewLike}
              dispatch={dispatch}
              reviewId={reviewId}
              dialogShow={dialogShow}
              handleDialogHide={this.handleDialogHide}
              handleDialogShow={this.handleDialogShow} />
        );
    };
};

class CommentThemeList extends Component {
    constructor(props) {
        super(props);
        this.reviewLike = this.reviewLike.bind(this);
        this.state = {isLiked: false};
    };

    /**
     * refs 获取dom上dataset参数列表
     * 根据reviewid, replyid来dispatch评论或回复点赞、当前页无法重复点赞
     * @dispatch {fetchReviewLike, fetchReplyLike}
     */

    async reviewLike() {
        let {dispatch} = this.props;
        let {isLiked} = this.state;
        let _refs = this.refs.loveTags;
        let {newsid, reviewid, replyid} = _refs.dataset;
        // console.log(_refs.dataset);
        if (!isLiked) {
            if (replyid) {
                var _result = await dispatch(fetchReplyLike(replyid, newsid));
            } else if (reviewid) {
                var _result = await dispatch(fetchReviewLike(reviewid));
            } 
            let {liked} = _result.posts.resultBody;
            // console.log(_result, liked);
            if (liked) {
                this.setState({isLiked: true});
                let _dom = this.refs.countLikes.innerText;
                let _countLikes = _dom ? parseInt(_dom, 10) : 0;
                // console.log(this.refs.countLikes.innerText);
                this.refs.countLikes.innerText = _countLikes + 1;
            }
        }
    };

    /**
     * theme 1 评论列表 2 评论详情 3 文章详情评论
     * @props {theme}
     */

    render() {
        const {dispatch, dialogShow, theme, item, newsId, handleDialogHide, handleDialogShow, reviewId} = this.props;
        const {isLiked} = this.state;
        if (item) {
            return (
                <section className="CommentContent">
                    <figure>
                        <img src={item.imageUrl}
                             onError={(e) => {e.target.src=require('../img/user_avatar_default@3x.png')}}
                             alt='' />
                    </figure>
                    <div className="commentContainerLeft">
                        <div className="commentPerson">
                            <figcaption>{item.commentor}</figcaption>
                            <div className={`loveTag ${isLiked?'loveTagOn':''}`} onClick={this.reviewLike}
                                 ref="loveTags" data-newsId={newsId} data-reviewId={item.reviewId || reviewId} data-replyId={item.replyId}>
                                <i className={`iconfont ${isLiked?'icon-zan-shixin':'icon-zan-xian'}`}></i>
                                <span ref="countLikes">{item.countLike>0?item.countLike:''}{item.countLikes>0?item.countLikes:''}</span>
                                <div className="countLikesPlus"><em>+1</em></div>
                            </div>
                        </div>
                        {theme===2&&item.reply&&item.reply.commentor&&item.reply.content?(
                            <div className="commentReplyPrev">
                                <p className="replyPrevName">{item.reply.commentor}：</p>
                                <p className="replyPrevContent">{item.reply.content}</p>
                            </div>
                        ):null}
                        <div onClick={handleDialogShow}>
                            <p className="commentDetails">{item.content}</p>
                            <p className="commentDate">{item.publishTime}<span>回复</span></p>
                        </div>
                        {(theme===1||theme===3)&&item.replayList.length>0?(
                            <Link to={{
                                pathname: `/review/detail/${newsId}-${item.reviewId}.html`
                            }}>
                                <div className="commentReply">
                                    <ul>
                                        {item.replayList.map((row, i) => (
                                            <li key={`replayList${row.replyId}`}>{row.commentor}：{row.content}</li>
                                        ))}
                                    </ul>
                                    <p>查看全部{item.replayListSize}条回复<i className="iconfont icon-huifujiantou"></i></p>
                                </div>
                            </Link>
                        ):null}
                    </div>
                    {dialogShow?<CommentDialog 
                        theme={theme} reviewId={item.reviewId || reviewId} 
                        replyId={item.replyId} newsId={newsId}
                        dispatch={dispatch} handleDialogHide={handleDialogHide}
                        commentor={item.commentor} />:null}
                </section>
            );
        } else {
            return null;
        }
    };
};