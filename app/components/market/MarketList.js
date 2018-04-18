/**
 *
 * 推荐新闻列表组件
 *
 */

import React, {Component} from 'react';
import {resizeNavigationBar} from '../../lib/interactive';
import marketConfig from '../../config/marketBar';
import Loading from '../common/Loading';
import StockQuotes from './StockQuotes';
import StockRange from './StockRange';
import ForeignExchange from './ForeignExchange';
import ForeignRMB from './ForeignRMB';
import FundRange from './FundRange';
import FuturesRange from './FuturesRange';
import BondsRange from './BondsRange';

export default class MarketList extends Component {
    componentDidMount() {
        resizeNavigationBar('f5f5f5', '', '');
    };

    componentWillUnmount() {
        resizeNavigationBar('ffffff', '', '');
    };

    render() {
        const {isFetching, items, catCode} = this.props;
        return (
            <div>
                {isFetching?<Loading />:null}
                <div className={isFetching?"marketContainer":""}>
                    {items.gp&&catCode==='gp'?<StockQuotes items={items.gp.resultBody.chart} />:null}
                    {items.gp&&catCode==='gp'?<StockRange items={items.gp.resultBody} />:null}
                    {items.wh&&catCode==='wh'?<ForeignExchange items={items.wh.resultBody.price} />:null}
                    {/*{items.wh&&catCode==='wh'?<ForeignRMB items={items.wh.resultBody.rmb} />:null}*/}
                    {items.jj&&catCode==='jj'?
                        [1,2,3].map((item, i) =>
                            <FundRange item={items.jj.resultBody[marketConfig.marketFund[i].code]}
                                       name={marketConfig.marketFund[i].name}
                                       key={`FundRangeList${i}`} />):null}
                    {items.qh&&catCode==='qh'?
                        [1,2,3,4].map((item, i) =>
                            <FuturesRange item={items.qh.resultBody[marketConfig.marketFutures[i].code]}
                                          name={marketConfig.marketFutures[i].name}
                                          key={`FuturesRange${i}`} />):null}
                    {items.zq&&catCode==='zq'?
                        [1,2,3].map((item, i) =>
                            <BondsRange item={items.zq.resultBody[marketConfig.marketBonds[i].code]}
                                        name={marketConfig.marketBonds[i].name}
                                        key={`BondsRange${i}`} />):null}
                </div>
            </div>
        );
    };
};