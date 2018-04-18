/**
 *
 * 大事件列表组件
 *
 */

import React, {Component} from 'react';
import Loading from '../common/Loading';
import PageEnd from '../common/PageEnd';
import EventSuggest from './EventSuggest';
import {resizeNavigationBar, seoCtrl} from '../../lib/interactive';
import '../styles/event.scss';

export default class EventList extends Component {
    componentDidMount() {
        resizeNavigationBar('f5f5f5', '0.02667', '1.17333', 'html');
        const {items} = this.props;
        if (items) { seoCtrl(items.tkd.title, items.tkd.keywords, items.tkd.description); }
    };

    componentWillUnmount() {
        resizeNavigationBar('ffffff', '0', '2.24', 'html');
    };

    render() {
        const {items, isFetching} = this.props;
        return (
            <div className="EventListComponent">
                {isFetching?<Loading />:null}
                <div className="eventListContainer">
                    {items?(items.list).map((item, i) => <EventSuggest item={item} key={`eventList${i}`} />):null}
                    {items && (items.list.length)%2===1?<section className="EventSuggest eventSuggestHide"></section>:null}
                </div>
                {items?<PageEnd />:null}
            </div>
        );
    };
};