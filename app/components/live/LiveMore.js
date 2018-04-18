/**
 *
 * 加载数据组件
 *
 */

import React, {Component} from 'react';
import '../styles/liveMore.scss';

export default class LiveMore extends Component {
    render() {
        const {handleClickCalendar} = this.props;
        return (
            <section className="LiveMore">
                <div>
                    <h4>今日暂无数据</h4>
                    <div className="liveYesterday">
                        <button onClick={handleClickCalendar}>查看昨日数据</button>
                    </div>
                </div>
            </section>
        );
    };
};