/**
 *
 * 行情大盘组件
 *
 */

import React, {Component} from 'react';
import ReactSwipe from '../../lib/ReactSwipe';
import '../styles/stockQuotes.scss';
import seo from '../../config/seoInfo';
import {seoCtrl} from '../../lib/interactive';

export default class StockQuotes extends Component {
    constructor(props) {
        super(props);
        this.stockCode = this.stockCode.bind(this);
    };

    /**
     * 获取股票代码
     * @param urlString
     * @returns {string}
     */

    stockCode(urlString) {
        let _string = urlString.split('/').slice(-1) + '';
        return _string.split('.')[0];
    };

    componentDidMount() {
        seoCtrl(seo.seo.gphq.subject, seo.seo.gphq.keywords, seo.seo.gphq.summary);
    };

    render() {
        const {items} = this.props;
        return (
            <section className="StockQuotes">
                <ReactSwipe
                    className="reactSwipe"
                    swipeOptions={{speed: 1500, ratio: 0.7}}>
                    {items.map((item, i) => (
                        <div className="stockScroller" key={`stockScroller${i}`}>
                            <div className="stockData">
                                <img src={((item.limit).match('-')||(item.range).match('-'))?
                                    require('../img/card_down@3x.png'):require('../img/card_up@3x.png')} alt=""/>
                                <div>
                                    <p>股票名称:</p>
                                    <h4>{item.name}<em>{this.stockCode(item.chartUrl)}</em></h4>
                                    <ul>
                                        <li>
                                            <cite>最新价</cite>
                                            <span>{item.trade}</span>
                                        </li>
                                        <li>
                                            <cite>涨跌额</cite>
                                            <span>{item.limit}</span>
                                        </li>
                                        <li>
                                            <cite>涨跌幅</cite>
                                            <span>{item.range}</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>))}
                </ReactSwipe>
            </section>
        );
    };
};