/**
 *
 * 期货行情组件
 *
 */

import React, {Component} from 'react';
import '../styles/futuresRange.scss';
import seo from '../../config/seoInfo';
import {seoCtrl} from '../../lib/interactive';

export default class FuturesRange extends Component {
    componentDidMount() {
        seoCtrl(seo.seo.qhhq.subject, seo.seo.qhhq.keywords, seo.seo.qhhq.summary);
    };

    render() {
        const {name, item} = this.props;
        return (
            <section className="FuturesRange">
                <dl>
                    <dt>
                        <span>{name}</span>
                        <span>最新价</span>
                        <span>涨跌幅</span>
                    </dt>
                    <dd>
                        <table>
                            <tbody>
                            {item.map((row, i) => (
                                <tr key={`FuturesRangeRow${i}`}>
                                    <td>
                                        <span>{row.name}</span>
                                    </td>
                                    <td><span>{row.price}</span></td>
                                    <td><span className={row.range.match('-')?
                                        `rangeDown`:(row.range.match('0.00%')?`rangeDefine`:``)}>
                                        {row.range.match('-')?row.range:`+${row.range}`}
                                    </span></td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </dd>
                </dl>
            </section>
        );
    };
};