/**
 *
 * 大画财经往期回顾组件
 *
 */

import React, {Component} from 'react';
import LazyLoad from 'react-lazy-load';
import {Link} from 'react-router';
import '../styles/finance.scss';

export default class FinanceHistory extends Component {
    render() {
        const {items, fontSize} = this.props;
        return (
            <section className="FinanceHistory">
                <figure>
                    <figcaption>往期回顾</figcaption>
                    <Link to={{
                        pathname: '/dhcj/'
                    }}>
                        <p>查看更多<i className="iconfont icon-fanhuijiantou"></i></p>
                    </Link>
                </figure>
                <ul className="financeHistoryScroll">
                    {items && items.map((row, i) => 
                    <Link to={{
                        pathname: row.newsUrl
                    }} key={`historyList${i}`}>
                        <li className="historyList">
                            <LazyLoad height={fontSize*2.10667} offsetHorizontal={fontSize*2.10667}>
                                <img src={row.newsImageUrl}
                                     onError={(e) => {e.target.src=require('../img/bg_error.png')}}
                                     alt={row.subject} />
                            </LazyLoad>
                            <p>{row.subject}</p>
                        </li>
                    </Link>)}
                </ul>
            </section>
        );
    };
};