/**
 *
 * 直播日历组件
 *
 */

import React, {Component} from 'react';
import liveBar from '../../config/liveBar';

export default class LiveCalendar extends Component {
    render() {
        const {items} = this.props;
        return (
            <section className="LiveCalendar">
                <table>
                    {items?items.map(item => (
                        <tbody key={`rl${item.time}${item.flagClass}${items.indexOf(item)}`}>
                        {(item.dataArray)?(item.dataArray).map(row => (
                            <tr key={`rl${item.time}${item.flagClass}row${(item.dataArray).indexOf(row)}`}>
                                {(item.dataArray).indexOf(row)===0?(
                                    <td className="flagItem" rowSpan={item.dataArray.length}>
                                        <div>
                                            <img className="flag"
                                                 src={`http://www.xinrongnews.com/static/images/common/con_png/${item.flagClass}.png`}
                                                 onError={(e) => {e.target.src=require('../img/bg_error.png')}} alt={item.flagClass} />
                                        </div>
                                        <p className="timePoint">{item.time.split(' ')[1]}</p>
                                    </td>
                                ):null}
                                <td className={`dataItem ${liveBar.liveLevel[(row.importanceImgUrl>3?3:row.importanceImgUrl)-1].important}`}>
                                    <h4 className="important">{liveBar.liveLevel[(row.importanceImgUrl>3?3:row.importanceImgUrl)-1].name}</h4>
                                    <p className="rlContent">{row.target}</p>
                                    <ul className="rlRange">
                                        <li>
                                            <cite>前置:</cite>
                                            <span>{row.beforeVal}</span>
                                        </li>
                                        <li>
                                            <cite>预测值:</cite>
                                            <span>{row.predictionVal}</span>
                                        </li>
                                        <li>
                                            <cite>公布值:</cite>
                                            <span>{row.publishVal}</span>
                                        </li>
                                    </ul>
                                </td>
                            </tr>
                        )):null}
                        </tbody>
                    )):null}
                </table>
            </section>
        );
    };
};