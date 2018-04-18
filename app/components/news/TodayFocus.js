/**
 *
 * 今日关注组件
 *
 */

import React, {Component} from 'react';
import {Link} from 'react-router';
import '../styles/todayFocus.scss';

export default class TodayFocus extends Component {
    render() {
        const {today} = this.props;
        return (
            <Link to={{
                pathname: `${today.newsUrl}`
            }}>
                <section className="TodayFocus">
                    <div className="todayLogo">
                        <h4>今日关注</h4>
                        <em>Today's focus</em>
                    </div>
                    <p>{today.subject}</p>
                </section>
            </Link>
        );
    };
};