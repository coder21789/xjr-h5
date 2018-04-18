/**
 *
 * 评论弹出框组件
 *
 */

import React, {Component} from 'react';
import {UA} from '../../lib/interactive';
import {
    fetchNewsReview,
    fetchAnswerReview,
    fetchAnswerReply,
    fetchReviewList,
    fetchReviewDetails
} from '../../actions/actionTypes';
import '../styles/commentDialog.scss';

export default class CommentDialog extends Component {
    constructor(props) {
        super(props);
        this.handlePageTop = this.handlePageTop.bind(this);
        this.textareaChange = this.textareaChange.bind(this);
        this.textAreaValidate = this.textAreaValidate.bind(this);
        this.newsComment = this.newsComment.bind(this);
        this.state = {textLength: 0, commentDisabled: true};
    };

    /**
     * 滚动至页面钩子处
     * @func {scrollIntoView}
     */

    handlePageTop() {
        window.document.getElementById('root').scrollIntoView();
    };

    /**
     * 评论输入实时验证、变更按钮状态
     * @func {textareaChange}
     */

    textareaChange() {
        let _text = this.refs.commentInputs.value;
        this.setState({textLength: _text.length});
        this.textAreaValidate(_text);
    };

    /**
     * 评论输入验证规则
     * @param {text}
     */

    textAreaValidate(text) {
        let textLength = text.length;
        var regu = '^[ ]+$',
            re = new RegExp(regu);
        let validate = re.test(text);
        // console.log(validate, textLength);
        if (!UA().versions.android && UA().versions.MQQBrowser) {
            if (textLength<301) {this.setState({commentDisabled: false});} 
                else {this.setState({commentDisabled: true});}
        } else {
            if (text && !validate && textLength<301) {this.setState({commentDisabled: false});} 
                else {this.setState({commentDisabled: true});}
        }
    };

    /**
     * 评论提交、根据所在ui界面刷新数据列表
     * replyId 评论详情列表
     * reviewId 评论列表 theme 1 评论列表页 2 评论详情页 3 文章详情页
     * newsId 文章评论 theme 1 文章详情页 2 评论列表页
     * @returns {Promise Asnyc Func newsComment}
     */

    async newsComment() {
        let {dispatch, newsId, reviewId, replyId, theme} = this.props;
        let _text = this.refs.commentInputs.value;
        _text = _text.replace(/<\/?[^>]*>/g,'');
        // console.log(_text, newsId, reviewId, replyId);
        if (replyId) {
            var _result = await dispatch(fetchAnswerReply(replyId, _text));
            await dispatch(fetchReviewDetails(reviewId, newsId));
        } else if (reviewId) {
            var _result = await dispatch(fetchAnswerReview(reviewId, _text));
            await theme===1 && dispatch(fetchReviewList(newsId, 1));
            await theme===2 && dispatch(fetchReviewDetails(reviewId, newsId));
            await theme===3 && dispatch(fetchReviewList(newsId, 0));
        } else if (newsId&&!reviewId&&!replyId) {
            var _result = await dispatch(fetchNewsReview(newsId, _text));
            await theme===1 && dispatch(fetchReviewList(newsId, 0));
            await theme===2 && dispatch(fetchReviewList(newsId, 1));
        }
        // console.log(_result);
        let {success} = _result.posts.resultBody;
        success && this.props.handleDialogHide();
    };

    /**
     * 默认选中评论输入框以弹出原生输入软键盘
     * @refs {commentInputs}
     */

    componentDidMount() {
        if (!UA().versions.android && UA().versions.safari) {
            this.handlePageTop();
        }
        this.refs.commentInputs.focus();
    };

    render() {
        const {handleDialogHide, commentor} = this.props;
        const {textLength, commentDisabled} = this.state;
        return (
            <section className="CommentDialog wrapId">
                <div className="commentDialogClose" onClick={handleDialogHide}></div>
                <div className="commentDialogTextarea">
                    <textarea ref="commentInputs" name="" id="" 
                              placeholder={commentor?`@${commentor}`:'发表你的评论'} onChange={this.textareaChange}
                              cols="30" rows="10"></textarea>
                    <div className="commentDialogTip">
                        <span>{textLength}/300</span>
                        <button onClick={this.newsComment} disabled={commentDisabled}
                                className={commentDisabled?'commentDisabled':''}>发布</button>
                    </div>
                </div>
            </section>
        );
    };
};