/**
 *
 * 大事件列表组件组件
 *
 */

import React, {Component} from 'react';
import {Link} from 'react-router';

export default class EventSuggest extends Component {
    render() {
        const {item} = this.props;
        return (
            <section className="EventSuggest">
                <Link to={{
                    pathname: item.news_url
                }}>
                <figure className="eventCover">
                    <img className="eventCoverImg"
                         src={item.thumbnail_url}
                         onError={(e) => {e.target.src=require('../img/bg_error.png')}}
                         alt={item.subject} />
                    <figcaption>
                        <p>{item.user}</p>
                        <img src={require('../img/triangle@3x.png')} alt={item.subject} />
                    </figcaption>
                </figure>
                <p className="eventDesc">{item.subject}</p>
                </Link>
            </section>
        );
    };
};