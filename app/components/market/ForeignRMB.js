/**
 *
 * 外汇人民币行情组件
 *
 */

import React, {Component} from 'react';
import '../styles/foreignRMB.scss';

export default class ForeignRMB extends Component {
    constructor(props) {
        super(props);
        this.countryType = this.countryType.bind(this);
    };

    countryType(type) {
        switch (type) {
            case '美元': return 'usa';
            case '欧元': return 'eur';
            case '日元': return 'jpy';
            case '英镑': return 'gbp';
            default: return null;
        }
    };

    render() {
        const {items} = this.props;
        return (
            <section className="ForeignRMB">
                <dl>
                    <dt><span>人民币挂牌价</span></dt>
                    <dd>
                        <table>
                            <thead>
                            <tr>
                                <th>币种</th>
                                <th>现汇买入价</th>
                                <th>卖出价</th>
                            </tr>
                            </thead>
                            <tbody>
                            {items?items.map((item, i) => (
                                <tr key={`ForeignRMB${i}`}>
                                    <td>
                                        <img src={item.type?require(`../img/${this.countryType(item.type)}@3x.png`):''} alt=""/>
                                        <span>{item.type?item.type:''}</span>
                                    </td>
                                    <td><span>{item.buyingRate?item.buyingRate:''}</span></td>
                                    <td><span>{item.sellingRate?item.sellingRate:''}</span></td>
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