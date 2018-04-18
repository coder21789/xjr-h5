/**
 *
 * 推荐新闻列表组件
 *
 */

import React, {Component} from 'react';
import Loading from '../common/Loading';
import SuggestCollection from '../news/SuggestCollection';
import SuggestLarger from '../news/SuggestLarger';
import SuggestSmaller from '../news/SuggestSmaller';
import SuggestAtlas from '../news/SuggestAtlas';
import {resizeNavigationBar, seoCtrl} from '../../lib/interactive';

export default class WordList extends Component {
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
        switch (data.newsType) {
            case 0: return <SuggestSmaller txttiny={data} key={`txttinyNoTitle${data.id}${index}`} />;
            case 1: return <SuggestSmaller txttiny={data} key={`txttiny${data.id}${index}`} />;
            case 2: return <SuggestLarger txtlong={data} key={`txtlong${data.id}${index}`} />;
            case 3: return <SuggestAtlas item={data} key={`picSet${data.id}`} />;
            case 4: return <SuggestCollection newsArray={data} key={`newsArray${data.id}${index}`} />;
            case 5: return <SuggestSmaller txttiny={data} event={true} key={`event${data.id}${index}`} />;
            default: return null;
        }
    };

    componentDidMount() {
        resizeNavigationBar('', '0.02667', '1.17333');
        const {items} = this.props;
        if (items) { seoCtrl(items.tkd.title, items.tkd.keywords, items.tkd.description); }
    };

    componentDidUpdate() {
        const {items} = this.props;
        if (items) { seoCtrl(items.tkd.title, items.tkd.keywords, items.tkd.description); }
    };

    componentWillUnmount() {
        resizeNavigationBar('', '0', '2.24');
    };

    render() {
        const {items, isFetching} = this.props;
        return (
            <div>
                {isFetching?<Loading />:null}
                {items?(items.newsList).map((item, i) => this.suggestSwitchStyle(item, i)):null}
            </div>
        );
    };
};