/**
 *
 * 推荐位大图组件
 *
 */

import React, {Component} from 'react';
import LazyLoad from 'react-lazy-load';
import {Link} from 'react-router';
import '../styles/suggestLarger.scss';

export default class SuggestLarger extends Component {
    render() {
        const {txtlong, lazyLoad, fontSize} = this.props;
        return (
            <Link to={{
                pathname: txtlong.newsUrl.match('app/') ? txtlong.newsUrl.slice(4) : txtlong.newsUrl
            }}>
                <section className="SuggestLarger">
                    <figure>
                        <figcaption>{txtlong.subject}</figcaption>
                        <div className="suggestLargerImg">
                            {lazyLoad?
                            <LazyLoad height={fontSize*4} offset={fontSize*6}>
                                <img src={txtlong.newsImageUrl.split('%')[0]}
                                     onError={(e) => {e.target.src=require('../img/bg_error.png')}}
                                     alt={txtlong.subject} />
                            </LazyLoad>:
                            <img src={txtlong.newsImageUrl.split('%')[0]}
                                 onError={(e) => {e.target.src=require('../img/bg_error.png')}}
                                 alt={txtlong.subject} />}
                        </div>
                        <p><cite>{txtlong.source}</cite></p>
                    </figure>
                </section>
            </Link>
        );
    };
};