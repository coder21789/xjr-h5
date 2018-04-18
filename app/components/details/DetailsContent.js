/**
 *
 * 详情主体组件
 *
 */

import React, {Component} from 'react';
import {Link} from 'react-router';
import ShareButtons from '../../lib/Share';
import '../styles/detailsContent.scss';
import seo from '../../config/seoInfo';
import {seoCtrl} from '../../lib/interactive';

export default class DetailsContent extends Component {
    componentDidMount() {
        seoCtrl(this.props.item.subject, seo.seo.index.keywords, this.props.item.summary);
        let contentHeight = window.document.getElementById('article').offsetHeight;
        let ratio = window.devicePixelRatio;
        let {bannerImageUrl, platform} = this.props;
        let isBanner = bannerImageUrl && !platform ? 1 : 0;
        window.document.getElementById('contentHeight').innerText = contentHeight / ratio + 250 * isBanner + 50 * ratio;

        window.document.getElementsByClassName('content')[0].style.fontSize = `0.4533rem`;

        let imgs = document.getElementsByClassName('content')[0].getElementsByTagName('img');
        if (imgs && imgs.length > 0) {
            [...imgs].map((item, i) => {
                if (window.local_obj) {
                    window.local_obj.readImageUrl(item.src);
                    item.onclick = function() {
                        window.local_obj.openImage(item.src);
                    };
                }
            });
        }
    };

    componentDidUpdate() {
        seoCtrl(this.props.item.subject, seo.seo.index.keywords, this.props.item.summary);
    };

    render() {
        const {item, platform} = this.props;
        return (
            <section className="DetailsContent">
                <span id="contentHeight"></span>
                <article id="article">
                    <hgroup>{item.subject}</hgroup>
                    <div className="detailsSource">
                        {item.source?<address>{item.source}</address>:null}
                        {item.author?<cite>{item.author}</cite>:null}
                        <time>{item.time}</time>
                    </div>
                    <div className="content" dangerouslySetInnerHTML={dangerouslySetInnerHTML(item.content)}></div>
                </article>
                {!platform && item.keywordList && item.keywordList.length>0?(
                <div className="keywordsContainer">
                    <ul>
                        {(item.keywordList.slice(0, 5)).map((item, i) => <li><Link to={{pathname: `/word/${item.id}.html`}}>{item.name}</Link></li>)}
                    </ul>
                </div>):null}
                {!platform?(
                <a href="http://www.xinrongnews.com/static/download/download.html">
                    <div className="appDownloadTips">
                        <figure>
                            <img src={require('../img/icon_xrj@3x.png')} alt=""/>
                            <figcaption>更多资讯，下载客户端，全球财经一站逛遍！</figcaption>
                        </figure>
                    </div>
                </a>):null}
                {!platform?(<div className="newsShare">
                    <h4><em>分享到</em></h4>
                    <figure>
                        <ShareButtons sites={["qzone", "weibo"]} title={item.subject} site={item.subject}
                                      description={item.summary} image="https://www.xinrongnews.com/static/images/share_default.png" />
                    </figure>
                </div>):null}
            </section>
        );
    };
};

function dangerouslySetInnerHTML(_html) {
    return {__html: _html};
};