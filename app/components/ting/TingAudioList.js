/**
 *
 * 音频播放列表组件
 *
 */

import React, {Component} from 'react';
import AudioPlayer from './AudioPlayer';
import {seoCtrl} from '../../lib/interactive';
import AudioRecommend from './AudioRecommend';

export default class TingAudioList extends Component {
    constructor(props) {
        super(props);
    };

    componentDidMount() {
        const {audioPlayer} = this.props;
        if (audioPlayer) { seoCtrl(audioPlayer.subject, audioPlayer.nickName, audioPlayer.introduction); }
    };

    componentDidUpdate() {
        const {audioPlayer} = this.props;
        if (audioPlayer) { seoCtrl(audioPlayer.subject, audioPlayer.nickName, audioPlayer.introduction); }
    };

    render() {
        const {audioPlayer, audioList, audioRecommend} = this.props;
        return (
            <div>
                <AudioPlayer item={audioPlayer} list={audioList} />
                <section className="audioRecommendCaption">
                    <h2>相关推荐</h2>
                </section>
                {audioRecommend.map((item, i) => <AudioRecommend key={`AudioRecommend${item.id}`} item={item} />)}
            </div>
        );
    };
};