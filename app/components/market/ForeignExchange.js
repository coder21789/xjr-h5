/**
 *
 * 外汇直盘行情组件
 *
 */

import React, {Component} from 'react';
import '../styles/foreignExchange.scss';
import seo from '../../config/seoInfo';
import {seoCtrl} from '../../lib/interactive';

export default class ForeignExchange extends Component {
    componentDidMount() {
        seoCtrl(seo.seo.whhq.subject, seo.seo.whhq.keywords, seo.seo.whhq.summary);
    };

    render() {
        const {items} = this.props;
        return (
            <section className="ForeignExchange">
                <dl>
                    <dt><span>直盘报价</span></dt>
                    <dd>
                        <table>
                            <thead>
                            <tr>
                                <th>货币</th>
                                <th>最新价</th>
                                <th>涨跌幅</th>
                            </tr>
                            </thead>
                            <tbody>
                            {items?items.map((item, i) => (
                                <tr key={`ForeignExchange${i}`}>
                                    <td>
                                        <span>{item.name?item.name:''}</span>
                                    </td>
                                    <td><span>{item.trade?item.trade:''}</span></td>
                                    <td><span className={item.changepercent&&item.changepercent.match('-')?
                                        `rangeDown`:(item.changepercent&&item.changepercent.match('0.00%')?`rangeDefine`:``)}>
                                        {item.changepercent&&item.changepercent.match('-')?`${item.changepercent}`:`+${item.changepercent}`}
                                    </span></td>
                                </tr>
                            )):null}
                            </tbody>
                        </table>
                    </dd>
                </dl>
            </section>
        );
    };
};