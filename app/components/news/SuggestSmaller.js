/**
 *
 * 推荐位小图组件
 *
 */

import React, {Component} from 'react';
import {Link} from 'react-router';
import LazyLoad from 'react-lazy-load';
import {webviewJavaScriptInterface} from '../../lib/webView';
import '../styles/suggestSmaller.scss';

export default class SuggestSmaller extends Component {
    constructor(props) {
        super(props);
        this.webviewJavaScriptInterface = this.webviewJavaScriptInterface.bind(this);
        this.showInfoFromJs = this.showInfoFromJs.bind(this);
        this.state = {webview: false};
    };

    /**
     * webview数据交互
     * @param props
     */

    webviewJavaScriptInterface() {
        const {topic} = this.props;
        webviewJavaScriptInterface(this.props, this.showInfoFromJs, false, topic, null);
    };

    /**
     * webview字段集合
     * @param props
     * @returns {{}}
     */

    showInfoFromJs(props) {
        let viewComponetType = 'newsDetails';
        let url = props.txttiny.newsUrl.slice(4);
        let newsId = props.txttiny.id;
        let newsUrl = props.txttiny.newsUrl;
        var result = {};
        result.viewComponetType = viewComponetType;
        // result.url = url;
        result.newsId = newsId;
        result.newsUrl = newsUrl;
        return result;
    };

    componentDidMount() {
        const {topic} = this.props;
        topic && window.HtWebView && this.setState({webview: true});
        topic && window.webkit && window.webkit.messageHandlers && this.setState({webview: true});
    };

    render() {
        const {txttiny, event, fontSize, lazyLoad, txtbanner} = this.props;
        const {webview} = this.state;
        return (
            <Link to={{
                pathname: webview ? 'javascript:void(0);' :
                    (event?txttiny.newsUrl:`${txttiny.newsUrl ? (txttiny.newsUrl.match('app/') ? txttiny.newsUrl.slice(4) : txttiny.newsUrl) : ''}`)
            }}>
                <section className="suggestSmaller" onClick={this.webviewJavaScriptInterface}>
                    {txttiny.newsImageUrl && !txtbanner?
                        <div className="suggestSmallerImg">
                            {lazyLoad?
                            <LazyLoad height={fontSize*2} offset={fontSize*3}>
                                <img src={event?txttiny.newsImageUrl:txttiny.newsImageUrl.split('%')[0]}
                                     onError={(e) => {e.target.src=require('../img/bg_error.png')}}
                                     alt={txttiny.subject} />
                            </LazyLoad>:
                            <img src={event?txttiny.newsImageUrl:txttiny.newsImageUrl.split('%')[0]}
                                 onError={(e) => {e.target.src=require('../img/bg_error.png')}}
                                 alt={txttiny.subject} />}
                        </div>:null}
                    <figure>
                        <figcaption>{txttiny.subject}</figcaption>
                        <div className="sectionFooter">
                            <cite>{event?null:(txttiny.source==='新融街'?'':txttiny.source)}</cite>
                            <div>
                                {event?<span className="eventTag">财经大事件</span>:null}
                                {event?null:(txttiny.source==='新融街'?<span className="onlyTag">独家</span>:null)}
                                <time>{txttiny.time}</time>
                            </div>
                        </div>
                    </figure>
                </section>
            </Link>
        );
    };
};