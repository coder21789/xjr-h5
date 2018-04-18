/**
 *
 * 话题集合组件
 *
 */

import React, {Component} from 'react';
import {Link} from 'react-router';
import LazyLoad from 'react-lazy-load';
import '../styles/topicCollection.scss';
import seo from '../../config/seoInfo';
import {seoCtrl} from '../../lib/interactive';

export default class TopicCollection extends Component {
    componentDidMount() {
        seoCtrl(seo.seo.ht.subject, seo.seo.ht.keywords, seo.seo.ht.summary);
    };

    render() {
        const {item, fontSize} = this.props;
        return (
            <section className="TopicCollection">
                <Link
                    to={{
                        pathname: item.topicUrl
                    }}>
                    <figure>
                        <LazyLoad height={fontSize*5.86667} offset={fontSize*5.86667}>
                            <img src={item.topicPic}
                                 onError={(e) => {e.target.src=require('../img/bg_error.png')}}
                                 alt={item.topicSubject} />
                        </LazyLoad>
                        <div className="collectionSubject">
                            <figcaption>#<span>{item.topicSubject}</span>#</figcaption>
                        </div>
                    </figure>
                </Link>
            </section>
        );
    };
};