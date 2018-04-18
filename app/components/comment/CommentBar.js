/**
 *
 * 评论工具条组件
 *
 */

import React, {Component} from 'react';
import {Link} from 'react-router';
import CommentDialog from './CommentDialog';
import ShareDialog from '../common/ShareDialog';
import '../styles/commentBar.scss';

export default class CommentBar extends Component {
    constructor(props) {
        super(props);
        this.handleDialogShow = this.handleDialogShow.bind(this);
        this.handleDialogHide = this.handleDialogHide.bind(this);
        this.handleShareShow = this.handleShareShow.bind(this);
        this.handleShareHide = this.handleShareHide.bind(this);
        this.state = {dialogShow: false, shareShow: false, scrollTop: 0};
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

    handleShareShow() {
        this.setState({shareShow: true, scrollTop: window.document.body.scrollTop});
        window.document.body.className = 'scrollDisabled';
    };

    handleShareHide() {
        this.setState({shareShow: false});
        window.document.body.className = '';
        window.scrollTo(0, this.state.scrollTop);
    };

    /**
     * theme 1 默认评论 2 移除列表、分享
     * @props {theme}
     */

    render() {
        const {dialogShow, shareShow} = this.state;
        const {theme, newsId, total, reviewId, dispatch, subject, summary, commentor, resize, height} = this.props;
        return (
            <div ref="platformCommentBar">
                <section className={`CommentBar theme${theme}`}>
                    <div className="commentInput" onClick={this.handleDialogShow}>
                        <label htmlFor="">发表评论...</label>
                    </div>
                    {theme===2?null:(
                        <div className="commentBtnContainer">
                            {total>0?(
                                <Link to={{
                                    pathname: `/review/list/${newsId}.html`
                                }}>
                                    <div className="commentDetailsBtn">
                                        <i className="iconfont icon-pinglun"></i>
                                        <span>{total}</span>
                                    </div>
                                </Link>
                            ):null}
                            <i className="iconfont icon-fenxiang1" onClick={this.handleShareShow}></i>
                        </div>
                    )}
                </section>
                {dialogShow?<CommentDialog newsId={newsId} reviewId={reviewId}
                    dispatch={dispatch} handleDialogHide={this.handleDialogHide}
                    theme={theme} commentor={commentor?commentor:''}
                    height={height} />:null}
                {shareShow?<ShareDialog subject={subject} summary={summary} 
                    handleShareHide={this.handleShareHide} />:null}
            </div>
        );
    };
};