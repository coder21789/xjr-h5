/**
 *
 * 直播列表组件
 *
 */

import React, {Component} from 'react';
import Loading from '../common/Loading';
import LiveCalendar from './LiveCalendar';
import LiveNormal from './LiveNormal';
import liveBar from '../../config/liveBar';
import '../styles/liveCalendar.scss';
import seo from '../../config/seoInfo';
import {seoCtrl} from '../../lib/interactive';

export default class NewsList extends Component {
    componentDidMount() {
        seoCtrl(seo.seo.zb.subject, seo.seo.zb.keywords, seo.seo.zb.summary);
    };

    render() {
        const {items, catId, isFetching, calendar} = this.props;
        return (
            <div>
                <div className="dateBar">
                    <h4 className="liveDate">{calendar.split(' ')[0]+' '+liveBar.liveDate[calendar.split(' ')[1]]}</h4>
                </div>
                {isFetching?<Loading />:null}
                {(items&&!catId)?<LiveCalendar items={items} />:<LiveNormal items={items} />}
            </div>
        );
    };
};