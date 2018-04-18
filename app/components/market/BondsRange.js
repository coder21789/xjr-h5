/**
 *
 * 债券行情组件
 *
 */

import React, {Component} from 'react';
import '../styles/bondsRange.scss';
import seo from '../../config/seoInfo';
import {seoCtrl} from '../../lib/interactive';

export default class BondsRange extends Component {
    componentDidMount() {
        seoCtrl(seo.seo.zqhq.subject, seo.seo.zqhq.keywords, seo.seo.zqhq.summary);
    };

    render() {
        const {name, item} = this.props;
        return (
            <section className="BondsRange">
                <dl>
                    <dt><span>{name}</span></dt>
                    <dd>
                        {item.map((row, i) => (
                            row.lastPrice?(
                                <div className={(row.lastPrice==='0.00'||row.upOrDown==='0.00'||row.upOrDown==='0.000%')?'dataTable nullRange':'dataTable'}
                                     key={`BondsRangeReturn${i}`}>
                                    <h5>{row.name}</h5>
                                    <ul>
                                        <li>
                                            <cite>最新价</cite>
                                            <span>{row.lastPrice}</span>
                                        </li>
                                        <li>
                                            <cite>涨跌幅</cite>
                                            <span className={row.upOrDown.match('-')?`rangeNumDown`:`rangeNumUp`}>
                                                {row.upOrDown}
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                            ):(
                                <div className={(row.closePrice==='0.00'||row.firr==='0.00')?'dataTable nullRange':'dataTable'}
                                     key={`BondsRangeRow${i}`}>
                                    <h5>{row.name}</h5>
                                    <ul>
                                        <li>
                                            <cite>收盘价</cite>
                                            <span>{row.closePrice}</span>
                                        </li>
                                        <li>
                                            <cite>收益率</cite>
                                            <span className={row.firr.match('-')?`rangeNumDown`:`rangeNumUp`}>
                                                {`${row.firr}%`}
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                            )
                        ))}
                    </dd>
                </dl>
            </section>
        );
    };
};