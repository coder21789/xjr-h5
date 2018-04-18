/**
 *
 * 音频播放组件
 *
 */

import React, {Component} from 'react';
import {Link} from 'react-router';
import ReactAudio from '../../lib/ReactAudio';
import AudioNormal from './AudioNormal';
import '../styles/audioPlayer.scss';

export default class AudioPlayer extends Component {
    constructor(props) {
        super(props);
        this.authorToggle = this.authorToggle.bind(this);
        this.discPlayer = this.discPlayer.bind(this);
        this.discPlayerPause = this.discPlayerPause.bind(this);
        this.state = {isAuthorClicked: false, isAuthorShow: false, CDPlaying: false};
    };

    /**
     * 主播信息toggle
     */

    authorToggle() {
        const {isAuthorShow, isAuthorClicked} = this.state;
        this.setState({isAuthorShow: !isAuthorShow});
        !isAuthorClicked && this.setState({isAuthorClicked: true});
    };

    /**
     * CD播放效果
     */

    discPlayer() {
        let {CDPlaying} = this.state;
        this.setState({CDPlaying: !CDPlaying});
    };

    /**
     * CD播放效果暂停
     */

    discPlayerPause() {
        this.setState({CDPlaying: false});
    };

    render() {
        const {isAuthorShow, isAuthorClicked, CDPlaying} = this.state;
        const {item, list} = this.props;
        return (
            <div>
                <section className="AudioPlayer">
                    <div className="audioContainer">
                        <div className="audioContainerBg">
                            <img src={item.imageUrl} alt={item.nickName}
                                 onError={(e) => {e.target.src=require('../img/bg_error.png')}} />
                        </div>
                        <div className="audioDisc">
                            <div className={`audioDiscContainer ${CDPlaying?'CDPlaying':''}`}>
                                <div></div>
                                <img src={item.imageUrl} alt={item.nickName}
                                     onError={(e) => {e.target.src=require('../img/bg_error.png')}} />
                            </div>
                        </div>
                        <div className={`authorShow ${isAuthorShow?'isAuthorShow':''}`} onClick={this.authorToggle}><p></p></div>
                        <div className={`authorAudioList ${isAuthorClicked?(isAuthorShow?'isAuthorBoardShow':'isAuthorBoardHide'):''}`}>
                            <Link to={{
                                pathname: `/author/${item.id}.html`
                            }}>
                                <div className="authorDescContainer">
                                    <img src={item.imageUrl} alt={item.nickName}
                                         onError={(e) => {e.target.src=require('../img/bg_error.png')}} />
                                    <div className="authorDesc">
                                        <h4>{item.nickName}</h4>
                                        <p>{item.introduction}</p>
                                    </div>
                                </div>
                            </Link>
                            {(list.slice(0,4)).map((row, i) => <AudioNormal key={`AudioNormal${row.id}`} isPlayed={row.id === Number(item.shareLink.split('/')[2].split('.')[0]) ? true : false} item={row} />)}
                        </div>
                    </div>
                    <ReactAudio audioUrl={item.audioUrl} discPlayer={this.discPlayer} discPlayerPause={this.discPlayerPause} />
                </section>
                <div className="audioLine"></div>
            </div>
        );
    };
};