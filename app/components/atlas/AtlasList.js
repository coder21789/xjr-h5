/**
 *
 * 图集列表组件
 *
 */

import React, {Component} from 'react';
import Loading from '../common/Loading';
import SuggestAtlas from '../news/SuggestAtlas';
import {resizeNavigationBar, seoCtrl} from '../../lib/interactive';

export default class AtlasList extends Component {
    componentDidMount() {
        resizeNavigationBar('', '0.02667', '1.17333');
        const {items} = this.props;
        if (items && items.tkd) { seoCtrl(items.tkd.title, items.tkd.keywords, items.tkd.description); }
    };

    componentWillUnmount() {
        resizeNavigationBar('', '0', '2.24');
    };

    render() {
        const {items, isFetching, fontSize} = this.props;
        return (
            <div>
                {isFetching?<Loading />:null}
                {items?(items.picSet).map((item, i) => <SuggestAtlas lazyLoad={true} fontSize={fontSize} item={item} key={`picSet${i}`} />):null}
            </div>
        );
    };
};