/**
 *
 * 大画财经列表组件
 *
 */

import React, {Component} from 'react';
import Loading from '../common/Loading';
import SuggestFinance from './SuggestFinance';
import {resizeNavigationBar, seoCtrl} from '../../lib/interactive';

export default class FinanceList extends Component {
    componentDidMount() {
        resizeNavigationBar('f5f5f5', '0.02667', '1.17333');
        const {items} = this.props;
        if (items && items.tkd) { seoCtrl(items.tkd.title, items.tkd.keywords, items.tkd.description); }
    };

    componentWillUnmount() {
        resizeNavigationBar('ffffff', '0', '2.24');
    };

    render() {
        const {items, isFetching, fontSize} = this.props;
        return (
            <div className="FinanceList">
                {isFetching?<Loading />:null}
                {items?(items.list).map((item, i) => <SuggestFinance lazyLoad={true} fontSize={fontSize} item={item} key={`finance${i}`} />):null}
            </div>
        );
    };
};