/**
 *
 * 话题详情组件
 *
 */

import React, {Component} from 'react';
import SuggestSmaller from '../news/SuggestSmaller';
import {seoCtrl} from '../../lib/interactive';
import {webviewJavaScriptInterface, showInfoFromJs} from '../../lib/webView';
import '../styles/topicDetails.scss';

export default class TopicDetails extends Component {
    constructor(props) {
        super(props);
        this.webviewJavaScriptInterface = this.webviewJavaScriptInterface.bind(this);
    };

    /**
     * webview数据交互
     * @param props
     */

    webviewJavaScriptInterface(props, json, boolean, toNative, parmas) {
        webviewJavaScriptInterface(props, json, boolean, toNative, parmas);
    };

    componentDidMount() {
        this.webviewJavaScriptInterface(this.props, showInfoFromJs, false, true, 'topicDetails');
        seoCtrl(`${this.props.items.desc.subject}-新融街xinrongnews.com`, this.props.items.desc.subject, this.props.items.desc.summary);
    };

    componentDidUpdate() {
        seoCtrl(`${this.props.items.desc.subject}-新融街xinrongnews.com`, this.props.items.desc.subject, this.props.items.desc.summary);
    };

    render() {
        const {items} = this.props;
        return (
            <div>
                <section className="TopicDetails">
                    <figure>
                        <img src={items.desc.newsImageUrl}
                             onError={(e) => {e.target.src=require('../img/bg_error.png')}}
                             alt={items.desc.subject} />
                        <div className="topicSubject">
                            <figcaption>{items.desc.subject}</figcaption>
                            <p>{items.desc.summary}</p>
                        </div>
                    </figure>
                    <div className="topicGrayBg"></div>
                </section>
                <div className="topicDetailsList">
                    {(items&&items.list)?
                        (items.list).map(item =>
                            <SuggestSmaller
                                txttiny={item}
                                topic={true}
                                key={`topicDetailsList${item.news_url}${(items.list).indexOf(item)}`} />):null}
                </div>
            </div>
        );
    };
};