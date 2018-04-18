/**
 *
 * 图集组件
 *
 */

import React, {Component} from 'react';
import LazyLoad from 'react-lazy-load';
import {Link} from 'react-router';
import {webviewJavaScriptInterface} from '../../lib/webView';
import '../styles/SuggestAtlas.scss';

export default class SuggestAtlas extends Component {
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
        const {atlas} = this.props;
        webviewJavaScriptInterface(this.props, this.showInfoFromJs, false, atlas, null);
    };

    /**
     * webview字段集合
     * @param props
     * @returns {{}}
     */

    showInfoFromJs(props) {
        let viewComponetType = 'atlasDetails';
        let url = props.item.newsUrl.slice(4);
        let newsId = props.item.id;
        let newsUrl = props.item.newsUrl;
        let subject = props.item.subject;
        var result = {};
        result.viewComponetType = viewComponetType;
        // result.url = url;
        result.newsId = newsId;
        result.newsUrl = newsUrl;
        result.subject = subject;
        return result;
    };

    componentDidMount() {
        const {atlas} = this.props;
        atlas && window.HtWebView && this.setState({webview: true});
        atlas && window.webkit && window.webkit.messageHandlers && this.setState({webview: true});
    };

    render() {
        const {item, lazyLoad, fontSize} = this.props;
        const {webview} = this.state;
        return (
            <Link to={{
                pathname: webview ? 'javascript:void(0);' : (item.newsUrl.match('app/') ? item.newsUrl.slice(4) : item.newsUrl)
            }}>
                <section className="SuggestAtlas" onClick={this.webviewJavaScriptInterface}>
                    <figure>
                        <figcaption>{item.subject}</figcaption>
                    </figure>
                    <ul className="atlasContainer">
                        {item?(item.pics.slice(0,3)).map((row, i) => (
                            <li key={`picsArray${i}`}>
                                {lazyLoad?
                                <LazyLoad height={fontSize*2.4} offset={fontSize*3.6}>    
                                    <img src={row.pic_url_list}
                                         onError={(e) => {e.target.src=require('../img/bg_error.png')}}
                                         alt={item.subject} />
                                </LazyLoad>:
                                <img src={row.pic_url_list}
                                     onError={(e) => {e.target.src=require('../img/bg_error.png')}}
                                     alt={item.subject} />}     
                            </li>
                        )):null}
                    </ul>
                    <div className="atlasSuggestIcon">
                        <i className="iconfont icon-tujiicon"></i>
                        <span>{item.pics.length}</span>
                    </div>
                    <div className="atlasDate">
                        <span>图集</span>
                        <time>{item.time}</time>
                    </div>
                </section>
            </Link>
        );
    };
};