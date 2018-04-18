/**
 *
 * 大画财经详情列表组件
 *
 */

import React, {Component} from 'react';
import LazyLoad from 'react-lazy-load';
import Loading from '../common/Loading';
import CommentBar from '../comment/CommentBar';
import NewsSingalComment from '../details/NewsSingalComment';
import FinanceHistory from './FinanceHistory';
import {seoCtrl, resizeNavigationBar} from '../../lib/interactive';
import '../styles/finance.scss';

export default class FinanceDetailsList extends Component {
    componentDidMount() {
        resizeNavigationBar('ffffff', '0.02667', '1.17333', 'html');
        const {items} = this.props;
        if (items) { seoCtrl(items.news.subject, items.news.subject, items.news.summary); }
    };

    componentDidUpdate(prevProps, prevState) {
        const {items} = this.props;
        if (items && prevProps.items.news.id !== items.news.id) seoCtrl(items.news.subject, items.news.subject, items.news.summary);
    };

    componentWillUnmount() {
        resizeNavigationBar('ffffff', '0', '2.24', 'html');
    };

    render() {
        const {newsId, isFetching, items, itemsReviewList, dispatch, fontSize} = this.props;
        return (
            <div>
                <div className="commentBarMargin">
                    {isFetching?<Loading />:null}
                    <div className="financeScrollBanner">
                        {items && (items.news.content).map((row, i) => i === items.news.content.length - 1 ?
                            <LazyLoad offset={fontSize*3} key={`financeScrollBanner${i}`}>
                                <img src={row}
                                     onError={(e) => {e.target.src=require('../img/bg_error.png')}}
                                     alt='尾页' />
                            </LazyLoad> : 
                            <LazyLoad height={fontSize*23.73333} offset={fontSize*3} key={`financeScrollBanner${i}`}>
                                <img src={row}
                                     onError={(e) => {e.target.src=require('../img/bg_error.png')}}
                                     alt='' />
                            </LazyLoad>
                        )}
                    </div>
                    <FinanceHistory items={items.history} fontSize={fontSize} />
                    {itemsReviewList?<NewsSingalComment items={itemsReviewList} dispatch={dispatch} />:null}
                    <CommentBar theme={1} newsId={newsId}
                        total={itemsReviewList&&itemsReviewList.reviewListSize?itemsReviewList.reviewListSize:0}
                        dispatch={dispatch} subject={items?items.news.subject:''}
                        summary={items?items.news.summary:''} />
                </div>
            </div>
        );
    };
};