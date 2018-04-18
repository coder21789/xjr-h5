/**
 *
 * 推荐位轮播图组件
 *
 */

import React, {Component} from 'react';
import {Link} from 'react-router';
import ReactSwipe from '../../lib/ReactSwipe';
import '../styles/bannerScroller.scss';

export default class bannerScroller extends Component {

    /**
     * 轮播强制渲染、防止key相同导致样式错乱
     * @param nextProps
     * @param nextState
     * @returns {boolean}
     */

    shouldComponentUpdate(nextProps, nextState){
        if (this.props.banner !== nextProps.banner) {
            return true;
        }
        return false;
    };

    render() {
        const {banner, catId} = this.props;
        return (
            <section className="bannerScroller">
                <ReactSwipe
                    className="reactSwipe"
                    num={true}
                    swipeOptions={{speed: 600, auto: 6000}} key={`${catId}${banner.length}`}>
                    {banner.map((banner, i) => (
                        <div>
                            <figure className="scroller" key={`${catId}${banner.id}${i}`}>
                                <Link to={{
                                    pathname: `${banner.newsUrl.slice(4)}`
                                }}>
                                    <img src={banner.newsImageUrl.split('%')[0]}
                                         onError={(e) => {e.target.src=require('../img/bg_error.png')}}
                                         alt={banner.subject} />
                                </Link>
                                <figcaption>{banner.subject}</figcaption>
                            </figure>
                        </div>
                    ))}
                </ReactSwipe>
            </section>
        );
    };
};