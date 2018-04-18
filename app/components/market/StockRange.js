/**
 *
 * 个股涨跌组件
 *
 */

import React, {Component} from 'react';
import {UA} from '../../lib/interactive';
import '../styles/stockRange.scss';

export default class StockRange extends Component {
    constructor(props) {
        super(props);
        this.state = {currentIndex: 0, app: ''};
        this.rangeToggle = this.rangeToggle.bind(this);
    };

    /**
     * tab选中状态
     * @param i
     * @returns {string}
     */

    rangeToggle(i) {
        return i === this.state.currentIndex ? 'actived' : '';
    };

    /**
     * UC手机浏览器兼容性处理
     * @userAgent
     */

    componentDidMount() {
        if (UA().versions.android) {
            if (UA().versions.UC) {this.setState({app: 'UC'});}
                else {this.setState({app: 'Android'});}
        }
    };

    render() {
        const {rangeName, rangeId, items} = this.props;
        return (
            <section className="StockRange">
                <dl>
                    {rangeName.map((item, i) =>
                        <dt key={`rangeUpDownName${i}`}
                            className={this.rangeToggle(i)}
                            onClick={() => this.setState({currentIndex: i})}>{item}</dt>)}
                    <dd className={this.state.app}>
                        <table>
                            <thead>
                                <tr>
                                    <th>名称</th>
                                    <th>最新价</th>
                                    <th>涨跌幅</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items[rangeId[this.state.currentIndex]].map((item, i) =>
                                    <tr key={`rangeUpDown${i}`}>
                                        <td>
                                            <div>
                                                <span>{item.name}</span>
                                                <cite>{item.code}</cite>
                                            </div>
                                        </td>
                                        <td><span className={this.state.currentIndex===0?`rangeNumUp`:`rangeNumDown`}>
                                            {item.trade}
                                        </span></td>
                                        <td><span className={this.state.currentIndex===0?``:`rangeDown`}>
                                            {this.state.currentIndex===0?`+${item.range}%`:`${item.range}%`}
                                        </span></td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </dd>
                </dl>
            </section>
        );
    };
};

StockRange.defaultProps = {
    rangeName: ['个人涨幅', '个人跌幅'],
    rangeId: ['asc', 'desc']
};