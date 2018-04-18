/**
 *
 * 话题集合组件
 *
 */

import React, {Component} from 'react';
import LazyLoad from 'react-lazy-load';
import {Link} from 'react-router';
import '../styles/suggestCollection.scss';

export default class SuggestCollection extends Component {
    render() {
        const {newsArray, lazyLoad, fontSize} = this.props;
        return (
            <Link
                to={{
                    pathname: newsArray.newsUrl.match('app/') ? newsArray.newsUrl.slice(4) : newsArray.newsUrl
                }}>
                <section className="suggestCollection">
                    <div className="suggestHeader">
                        <em>话题</em>
                        <h4>{newsArray.subject}</h4>
                        <img src={require('../img/arrow_suggest@3x.png')} alt=""/>
                    </div>
                    <div className="suggestContent">
                        {(newsArray.list).map((newsArray, i) => (
                            <figure className="suggestScroller" key={`suggestCollection${newsArray.id}${i}`}>
                                {lazyLoad?
                                <LazyLoad height={fontSize*2.66667} offsetHorizontal={fontSize*2.66667}>
                                    <img src={newsArray.newsImageUrl}
                                     onError={(e) => {e.target.src=require('../img/bg_error.png')}}
                                     alt={newsArray.subject} />
                                </LazyLoad>:
                                <img src={newsArray.newsImageUrl}
                                     onError={(e) => {e.target.src=require('../img/bg_error.png')}}
                                     alt={newsArray.subject} />    
                                }
                                <div className="suggestItem">
                                    <figcaption>{newsArray.subject}<time></time></figcaption>
                                </div>
                            </figure>
                        ))}
                    </div>
                </section>
            </Link>
        );
    };
};