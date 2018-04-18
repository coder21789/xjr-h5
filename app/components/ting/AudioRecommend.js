/**
 *
 * 音频推荐组件
 *
 */

import React, {Component} from 'react';
import {Link} from 'react-router';
import '../styles/audioPlayer.scss';

export default class AudioRecommend extends Component {
    render() {
        const {item} = this.props;
        return (
            <Link to={{
                pathname: `/audio/${item.id}.html`
            }}>
                <section className="AudioRecommend">
                    <img src={item.imageUrl} alt={item.subject} className="audioCover"
                         onError={(e) => {e.target.src=require('../img/bg_error.png')}} />
                    <div className="audioDescContainer">
                        <div className="audioDesc">
                            <h4>{item.subject}</h4>
                            <p>{item.playCount}次收听</p>
                        </div>
                    </div>
                </section>
            </Link>
        );
    };
};