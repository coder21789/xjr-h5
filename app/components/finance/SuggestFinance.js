/**
 *
 * 推荐位大画财经组件
 *
 */

import React, {Component} from 'react';
import LazyLoad from 'react-lazy-load';
import {Link} from 'react-router';
import '../styles/finance.scss';

export default class SuggestFinance extends Component {
    render() {
        const {item, lazyLoad, fontSize} = this.props;
        return (
            <Link to={{
                pathname: item.newsUrl
            }}>
                <section className="SuggestFinance">
                    <figure>
                        <figcaption>{item.subject}</figcaption>
                        <p className="suggestFinanceTime"><time>{item.time}</time><cite>阅读量:{item.readCount}</cite></p>
                        <div className="suggestFinanceImg">
                            {lazyLoad?
                            <LazyLoad offset={fontSize*6.48}>
                                <img src={item.newsImageUrl}
                                     onError={(e) => {e.target.src=require('../img/bg_error.png')}}
                                     alt={item.subject} />
                            </LazyLoad>:
                            <img src={item.newsImageUrl}
                                 onError={(e) => {e.target.src=require('../img/bg_error.png')}}
                                 alt={item.subject} />}
                        </div>
                        <div className="suggestFinanceSummary">
                            <span>{item.region}期</span>
                            <p>{item.summary}</p>
                        </div>
                    </figure>
                </section>
            </Link>
        );
    };
};