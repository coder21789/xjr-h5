/**
 *
 * 大事件详情组件
 *
 */

import React, {Component} from 'react';
import {Link} from 'react-router';
import Loading from '../common/Loading';
import {navigartionTouch, resizeNavigationBar, seoCtrl} from '../../lib/interactive';
import '../styles/event.scss';

export default class EventDetailsList extends Component {
    constructor(props) {
        super(props);
        this.navigartionSwitch = this.navigartionSwitch.bind(this);
        this.eventToggle = this.eventToggle.bind(this);
        this.eventNavigartion = this.eventNavigartion.bind(this);
        this.state = {eventToggle: false};
    };

    /**
     * 大事件详情页动态设置ui
     * @param target
     * @param className
     * @param toggle
     */

    navigartionSwitch(target, className, toggle, height) {
        let _htmlClass = window.document.getElementById(target).classList;
        toggle ? _htmlClass.add(className) : _htmlClass.remove(className);
        window.document.getElementsByTagName('body')[0].style.backgroundColor = '';
        window.document.getElementById('root').style.marginBottom = `${height}rem`;
    };

    /**
     * 导语内容展现
     */

    eventToggle() {
        let {eventToggle} = this.state;
        this.setState({eventToggle: !eventToggle});
    };

    /**
     * 根据touchend事件获取页面位置隐藏导航
     * @param e
     * @param className
     * @param style
     */

    eventNavigartion(e, className, style, target) {
        navigartionTouch.call(this, e, className, style, target);
    };

    componentDidMount() {
        resizeNavigationBar('', '0', '1.17333', '');
        this.navigartionSwitch('theme', 'event', true, '0');
        const {items} = this.props;
        if (items) { seoCtrl(`${items.event.subject}-新融街www.xinrongnews.com`, items.event.subject, items.event.subject); }
    };

    componentDidUpdate() {
        const {items} = this.props;
        if (items) { seoCtrl(`${items.event.subject}-新融街www.xinrongnews.com`, items.event.subject, items.event.subject); }
    };

    componentWillUnmount() {
        resizeNavigationBar('ffffff', '0', '2.24', '');
        this.navigartionSwitch('theme', 'event', false, '0.53333');
    };

    render() {
        const {isFetching, items} = this.props;
        let {eventToggle} = this.state;
        return (
            <div>
                {isFetching?<Loading />:null}
                {items?<section className="EventDetailsList" 
                    onTouchEnd={(e) => {this.eventNavigartion(e, 'navigationBar', 'eventNavigartionSwitch', 'navigationBar');}}>
                    <div className="eventDetailsBg"></div>
                    <img className="eventDetailsCover" src={require('../img/eventCoverBg@3x.png')} alt={items.event.subject} />
                    <h1>{items.event.subject}</h1>
                    <div className={`eventAuthorDesc ${eventToggle?'eventDescToggle':''}`}>
                        <div className="eventRegion">
                            <div className="eventAuthor">
                                <p>{items.event.user}</p>
                                <img src={require('../img/eventPath@3x.png')} alt={items.event.user} />
                            </div>
                            <p className="eventTime">{items.event.publish_time}</p>
                        </div>
                        <img src={require('../img/bitmap@3x.png')} alt={items.event.subject} className="eventSlogan" />
                        <p className="eventDetailsDesc">{items.event.news_recommend_summary}</p>
                        <div className="eventToggle" onClick={this.eventToggle}><i className="iconfont icon-fanhuijiantou"></i></div>
                    </div>
                    <div className="eventTimeContainer">
                        <p className="eventTimeSubject">事件回顾</p>
                        <div className="eventTimeNewsContainer">
                            <img src={require('../img/ovalNull@3x.png')} alt="" className="eventTimeNewsPointBefore"/>
                            {items.time.map((item, i) => <EventTime i={i} key={`EventTime${item.news_url}${i}`} item={item} />)}
                            <img src={require('../img/ovalNull@3x.png')} alt="" className="eventTimeNewsPointAfter"/>
                        </div>
                    </div>
                    <Link to={{
                        pathname: '/cj/dashijian.html'
                    }}>
                        <div className="eventListMore">查看更多大事件</div>
                    </Link>
                    <div className="eventListMargin"></div>
                </section>:null}
            </div>
        );
    };
};

/**
 * 时间轴内置组件
 * @param props
 * @returns {XML}
 * @constructor
 */

function EventTime(props) {
    const {i, item} = props;
    return (
        <section className={`EventTime EventTime${i}`}>
            <Link to={{
                pathname: item.news_url
            }}>
                <time>{item.event_time}</time>
                <div className="eventNewsContainer">
                    <figure>
                        <figcaption>{item.news_recommend_subject}</figcaption>
                        <div className="eventNewsList">
                            <img src={item.pic_url} alt={item.news_recommend_subject}
                                 onError={(e) => {e.target.src=require('../img/bg_error.png')}} />
                            <p>{item.news_recommend_summary}</p>
                        </div>
                    </figure>
                    {/*<img src={require('../img/oval@3x.png')} alt="" className="eventNewsListPointAfter"/>*/}
                    <i className="iconfont icon-Oval eventNewsListPointAfter"></i>
                </div>
            </Link>
        </section>
    );
};