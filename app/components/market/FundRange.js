/**
 *
 * 基金行情组件
 *
 */

import React, {Component} from 'react';
import '../styles/fundRange.scss';
import seo from '../../config/seoInfo';
import {seoCtrl} from '../../lib/interactive';

export default class FundRange extends Component {
    constructor(props) {
        super(props);
        this.dataSort = this.dataSort.bind(this);
        this.state = {rowData: this.props.item};
    };

    dataSort() {
        this.setState({rowData: this.state.rowData.reverse()})
    };

    componentDidMount() {
        seoCtrl(seo.seo.jjhq.subject, seo.seo.jjhq.keywords, seo.seo.jjhq.summary);
    };

    render() {
        const {name} = this.props;
        return (
            <section className="FundRange">
                <dl>
                    <dt>
                        <span>{name}</span>
                        <span onClick={() => this.dataSort()}>今年以来收益</span>
                    </dt>
                    <dd>
                        <table>
                            <tbody>
                            {this.state.rowData.map((row, i) => (
                                <tr key={`FundRangeRow${i}`}>
                                    <td>
                                        <span>{row.name}</span>
                                        <cite>{row.code}</cite>
                                    </td>
                                    <td><span>{`${row.income}%`}</span></td>
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