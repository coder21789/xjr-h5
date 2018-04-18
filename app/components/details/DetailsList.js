/**
 *
 * 详情列表组件
 *
 */

import React, {Component} from 'react';
import Loading from '../common/Loading';
import DetailsContent from './DetailsContent';
import NewsAbout from './NewsAbout';
import CommentBar from '../comment/CommentBar';
import NewsSingalComment from './NewsSingalComment';
import {navigartionTouch, resizeNavigationBar} from '../../lib/interactive';

export default class DetailsList extends Component {
    constructor(props) {
        super(props);
        this.navigartionSwitch = this.navigartionSwitch.bind(this);
        this.detailsNavigartion = this.detailsNavigartion.bind(this);
    };

    /**
     * 根据banner推荐位改变导航ui
     * @param props
     */

    navigartionSwitch(props) {
        let {itemsContent} = props;
        let existBanner = itemsContent && itemsContent.bannerImageUrl ? true : false;
        !existBanner && resizeNavigationBar('', '0', '1.17333', '', 'existBanner', false);
        existBanner && resizeNavigationBar('', '0', '0', '', 'existBanner', true);
    };

    /**
     * touchend事件toggle导航
     * @param e
     * @param className
     * @param style
     * @param target
     * @param boolean
     */

    detailsNavigartion(e, className, style, target, boolean) {
        let {itemsContent} = this.props;
        let existBanner = itemsContent && itemsContent.bannerImageUrl ? true : false;
        existBanner && navigartionTouch.call(this, e, className, style, target, boolean);
    };

    componentDidMount() {
        this.navigartionSwitch(this.props);
    };

    componentDidUpdate() {
        this.navigartionSwitch(this.props);
    };

    componentWillUnmount() {
        resizeNavigationBar('', '0', '2.24', 'existBanner', false);
    };

    render() {
        const {newsId, isFetching, itemsContent, itemsAbout, itemsReviewList, dispatch, platform} = this.props;
        return (
            <div onTouchEnd={(e) => {this.detailsNavigartion(e, 'detailsBannerImg', 'existBanner', 'navTop', true)}}>
                {!platform && itemsContent&&itemsContent.bannerImageUrl?<img src={itemsContent.bannerImageUrl}
                    className="detailsBannerImg" alt={itemsContent.subject} />:null}
                <div className={`DetailsList ${!platform?'commentBarMargin':''}`}>
                    {isFetching?<Loading />:null}
                    {itemsContent?<DetailsContent newsId={newsId} item={itemsContent} platform={platform} 
                        bannerImageUrl={itemsContent&&itemsContent.bannerImageUrl?itemsContent.bannerImageUrl:''} />:null}
                    {itemsAbout?<NewsAbout items={itemsAbout}/>:null}
                    {itemsReviewList?<NewsSingalComment items={itemsReviewList} dispatch={dispatch} />:null}
                    <CommentBar theme={1} newsId={newsId}
                        total={itemsReviewList&&itemsReviewList.reviewListSize?itemsReviewList.reviewListSize:0}
                        dispatch={dispatch} subject={itemsContent?itemsContent.subject:''}
                        summary={itemsContent?itemsContent.summary:''} />
                </div>
            </div>
        );
    };
};