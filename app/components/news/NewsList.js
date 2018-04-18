/**
 *
 * 推荐新闻列表组件
 *
 */

import React, {Component} from 'react';
import Loading from '../common/Loading';
import BannerScroller from './BannerScroller';
import TodayFocus from './TodayFocus';
import SuggestAeraCollection from './SuggestAeraCollection';
import SuggestCollection from './SuggestCollection';
import SuggestLarger from './SuggestLarger';
import SuggestSmaller from './SuggestSmaller';
import SuggestAtlas from './SuggestAtlas';
import {seoCtrl} from '../../lib/interactive';

export default class NewsList extends Component {
    constructor(props) {
        super(props);
        this.suggestSwitchStyle = this.suggestSwitchStyle.bind(this);
    };

    /**
     * 推荐频道展示样式动态生成
     * @param data
     * @param newsType
     * @returns {Component}
     */

    suggestSwitchStyle(data, index) {
        let {fontSize} = this.props;
        switch (data.newsType) {
            case 1: return <SuggestSmaller lazyLoad={true} fontSize={fontSize} txttiny={data} key={`txttiny${data.id}${index}`} />;
            case 2: return <SuggestLarger lazyLoad={true} fontSize={fontSize} txtlong={data} key={`txtlong${data.id}${index}`} />;
            case 3: return <SuggestAtlas lazyLoad={true} fontSize={fontSize} item={data} key={`picSet${data.id}`} />;
            case 4: return <SuggestCollection lazyLoad={true} fontSize={fontSize} newsArray={data} key={`newsArray${data.id}${index}`} />;
            case 5: return <SuggestSmaller lazyLoad={true} fontSize={fontSize} txttiny={data} event={true} key={`event${data.id}${index}`} />;
            default: return null;
        }
    };

    componentDidMount() {
        const {items} = this.props;
        if (items) { seoCtrl(items.tkd.title, items.tkd.keywords, items.tkd.description); }
    };

    componentDidUpdate() {
        const {items} = this.props;
        if (items) { seoCtrl(items.tkd.title, items.tkd.keywords, items.tkd.description); }
    };

    render() {
        const {items, catId, isFetching, loadMore} = this.props;
        return (
            <div>
                {isFetching?<Loading />:null}
                {(items&&catId!=='qq'&&catId!=='gp'&&catId!=='wh'&&catId!=='qh')?<BannerScroller banner={items.banner} catId={catId} />:null}
                {(items&&items.today&&catId==='cj')?<TodayFocus today={items.today} />:null}
                {catId==='qq'?<SuggestAeraCollection />:null}
                {items?(items.suggest).map((item, i) => this.suggestSwitchStyle(item, i)):null}
                {loadMore?loadMore.map((item, i) => this.suggestSwitchStyle(item, i)):null}
            </div>
        );
    };
};