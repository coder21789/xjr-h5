/**
 *
 * 音频列表组件
 *
 */

import React, {Component} from 'react';
import {Link} from 'react-router';
import '../styles/audioPlayer.scss';

export default class AudioNormal extends Component {
    render() {
        const {isPlayed, item} = this.props;
        return (
            <Link to={{
                pathname: `/audio/${item.id}.html`
            }}>
                <section className={`AudioNormal ${isPlayed?'isPlayed':''}`}>
                    <h5>{item.subject}</h5>
                    <p>{item.playCount}</p>
                </section>
            </Link>
        );
    };
};