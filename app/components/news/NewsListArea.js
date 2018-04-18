/**
 *
 * 区域新闻列表组件
 *
 */

import React, {Component} from 'react';
import Loading from '../common/Loading';
import SuggestLarger from './SuggestLarger';
import SuggestSmaller from './SuggestSmaller';
import {resizeNavigationBar, seoCtrl} from '../../lib/interactive';

export default class NewsList extends Component {
    constructor(props) {
        super(props);
        this.suggestSwitchStyle = this.suggestSwitchStyle.bind(this);
    };

    /**
     * 二级频道展示样式动态生成
     * @param data
     * @param newsType
     * @returns {Component}
     */

    suggestSwitchStyle(data, index) {
        if (data.newsImageUrl && data.newsImageUrl.match('txtlong')) {
            return <SuggestLarger txtlong={data} key={`txtlong${data.id}${index}`} />;
        } else if (data.newsImageUrl && data.newsImageUrl.match('txtbanner')) {
            return <SuggestSmaller txttiny={data} key={`txtbanner${data.id}${index}`} txtbanner={true} />;
        } else {
            return <SuggestSmaller txttiny={data} key={`txttiny${data.id}${index}`} />;
        }
    };

    componentDidMount() {
        const {items} = this.props;
        resizeNavigationBar('', '0.02667', '1.17333');
        if (items) { seoCtrl(items.tkd.title, items.tkd.keywords, items.tkd.description); }
    };

    componentDidUpdate() {
        seoCtrl(this.props.items.tkd.title, this.props.items.tkd.keywords, this.props.items.tkd.description);
    };

    componentWillUnmount() {
        resizeNavigationBar('', '0', '2.24');
    };

    render() {
        const {items, isFetching} = this.props;
        return (
            <div>
                {isFetching?<Loading />:null}
                {items?(items.suggest).map((item, i) => this.suggestSwitchStyle(item, i)):null}
            </div>
        );
    };
};