/**
 *
 * 专家列表组件
 *
 */

import React, {Component} from 'react';
import Loading from '../common/Loading';
import ExpertCollection from './ExpertCollection';
import ExpertAuthor from './ExpertAuthor';
import ExpertNewsList from './ExpertNewsList';
import {navigartionTouch, resizeNavigationBar} from '../../lib/interactive';

export default class ExpertList extends Component {
    constructor(props) {
        super(props);
        this.navigartionSwitch = this.navigartionSwitch.bind(this);
        this.expertNavigartion = this.expertNavigartion.bind(this);
    };

    /**
     * 根据banner推荐位改变导航ui
     * @param props
     */

    navigartionSwitch(props) {
        let {author} = props;
        !author && resizeNavigationBar('f5f5f5', '0', '1.17333', '', 'expertNavigartion', false);
        author && resizeNavigationBar('f5f5f5', '0', '0', '', 'expertNavigartion', true);
    };

    /**
     * touchend事件toggle导航
     * @param e
     * @param className
     * @param style
     * @param target
     * @param boolean
     */

    expertNavigartion(e, className, style, target, boolean) {
        navigartionTouch.call(this, e, className, style, target, boolean);
    };

    componentDidMount() {
        this.navigartionSwitch(this.props);
    };

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.author !== this.props.author) {
            this.navigartionSwitch(this.props);
        }
    };

    componentWillUnmount() {
        resizeNavigationBar('ffffff', '0', '2.24', '', 'expertNavigartion', false);
    };

    render() {
        const {
            author,
            itemsExpert,
            itemsExpertNews,
            itemsExpertTkd,
            isFetchingExpert,
            itemsExpertAuthor,
            itemsExpertDetails,
            isFetchingExpertDetails
        } = this.props;
        return (
            <div>
                {(isFetchingExpert||isFetchingExpertDetails)?<Loading />:null}
                {!author?(
                    <div>
                        {itemsExpert?itemsExpert.map((item, i) => (
                            <ExpertCollection
                                item={item}
                                newsArray={itemsExpertNews[i]}
                                tkd={itemsExpertTkd}
                                key={`expertCollection${item.username}${itemsExpert.indexOf(item)}`} />
                        )):null}
                    </div>
                ):(
                    <div onTouchEnd={(e) => {this.expertNavigartion(e, 'navContent', 'expertNavigartion', 'navTop', true);}}>
                        {itemsExpertAuthor?<ExpertAuthor item={itemsExpertAuthor}></ExpertAuthor>:null}
                        {itemsExpertDetails?<ExpertNewsList items={itemsExpertDetails} />:null}    
                    </div>
                )}
            </div>
        );
    };
};