/**
 *
 * 图集详情组件
 *
 */

import React, {Component} from 'react';
import Loading from '../common/Loading';
import CommentBar from '../comment/CommentBar';
import AtlasDetails from './AtlasDetails';
import {resizeNavigationBar, seoCtrl} from '../../lib/interactive';

export default class AtlasDetailsList extends Component {
    constructor(props) {
        super(props);
        this.commentBarToggle = this.commentBarToggle.bind(this);
    };

    /**
     * 点击图片区域隐藏评论条
     * @param boolean
     */

    commentBarToggle(boolean) {
        if (boolean) {this.refs.platformCommentBarAtlas.refs.platformCommentBar.className = '';} 
            else {this.refs.platformCommentBarAtlas.refs.platformCommentBar.className = 'platformDisplay';}
    };

    componentDidMount() {
        /**
         * 图集黑色主题
         * @className {themeBlack}
         */

        resizeNavigationBar('333438', '0.02667', '1.17333');
        window.document.getElementsByTagName('html')[0].className = 'themeBlack';
        if (this.props.items) seoCtrl(`${this.props.items.subject}-新融街xinrongnews.com`, this.props.items.subject, this.props.items.subject);

        /**
         * 禁止图集上下滚动
         * @params {innerHeight}
         */

        let _innerHeight = this.props.height;
        window.document.body.style.height = `${_innerHeight}px`;
        window.document.body.style.overflow = 'hidden';
    };

    componentDidUpdate() {
        if (this.props.items) seoCtrl(`${this.props.items.subject}-新融街xinrongnews.com`, this.props.items.subject, this.props.items.subject);
    };

    componentWillUnmount() {
        resizeNavigationBar('ffffff', '0', '2.24');
        window.document.getElementsByTagName('html')[0].className = '';
        window.document.body.style.height = '';
        window.document.body.style.overflow = '';
    };

    render() {
        const {isFetching, items, newsId, total, dispatch, height} = this.props;
        return (
            <div style={{height: height}}>
                {isFetching?<Loading theme={1} />:null}
                {items?<AtlasDetails items={items} atlas={items.picsDetail} height={height}
                    commentBarToggle={this.commentBarToggle} />:null}
                <CommentBar theme={1} newsId={newsId} total={total} dispatch={dispatch}
                    subject={items?items.subject:''} summary={items?items.subject:''}
                    height={height} ref="platformCommentBarAtlas" />
            </div>
        );
    };
};