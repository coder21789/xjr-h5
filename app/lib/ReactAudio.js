/**
 *
 * 音频播放组件
 *
 */

import React, {Component} from 'react';
import './style/audio.scss';

class ReactAudio extends Component {
    constructor(props) {
        super(props);
        this.timeChange = this.timeChange.bind(this);
        this.palyCtrl = this.palyCtrl.bind(this);
        this.loadedDataFunc = this.loadedDataFunc.bind(this);
        this.endedFunc = this.endedFunc.bind(this);
        this.touchMoveFunc = this.touchMoveFunc.bind(this);
        this.touchEndFunc = this.touchEndFunc.bind(this);
        this.progressChangeStart = this.progressChangeStart.bind(this);
        this.progressChangePause = this.progressChangePause.bind(this);
        this.progressInterval = undefined;
        this.state = {allTime: '00:00', currentTime: '00:00', playing: false};
    };

    /**
     * audio元素duration属性值转换指定格式00:00
     * @param time
     * @returns {string}
     */

    timeChange(time) {
        let minute = time / 60;
        let minutes = parseInt(minute);
        minutes < 10 ? minutes = `0${minutes}` : minutes = (minutes ? minutes : '00');
        let second = time % 60;
        let seconds = parseInt(second);
        seconds < 10 ? seconds = `0${seconds}` : seconds = (seconds ? seconds : '00');
        let allTime = `${minutes}:${seconds}`;
        return allTime;
    };

    /**
     * 音频播放暂停开始状态控制
     * @returns {Promise.<void>}
     */

    async palyCtrl() {
        let {playing} = this.state;
        let {discPlayer} = this.props;
        await this.setState({playing: !playing});
        let el = window.document.getElementById('audio');
        if (this.state.playing) {
            el.play();
            discPlayer();
        } else {
            el.pause();
            discPlayer();
        }
    };

    /**
     * 音频加载数据加载完毕状态处理
     */

    loadedDataFunc() {
        let dom = this.refs.audioCtrl;
        let el = window.document.getElementById('audio');
        let allTimeDom = this.timeChange(el.duration);
        dom.classList.remove('audioUnloaded');
        this.setState({allTime: allTimeDom});
    };

    /**
     * 音频播放完毕状态处理
     */

    endedFunc() {
        this.setState({playing: false});
        let {discPlayer} = this.props;
        discPlayer();
    };

    /**
     * 触控播放器滑块拖动播放进度显示
     * @param e
     */

    touchMoveFunc(e) {
        let touches = e.changedTouches[0];
        let pageX = touches.pageX;
        let innerWidth = window.innerWidth;
        let percent = Math.round((Number(pageX / innerWidth) * 1000).toFixed(1)) / 10;
        let progressSpeed = this.refs.progressSpeed;
        progressSpeed.style.width = `${percent}%`;
    };

    /**
     * 触控播放器滑块拖动设置播放时间
     * @param e
     */

    touchEndFunc(e) {
        let el = window.document.getElementById('audio');
        let touches = e.changedTouches[0];
        let pageX = touches.pageX;
        let innerWidth = window.innerWidth;
        let percent = Math.round((Number(pageX / innerWidth) * 1000).toFixed(1)) / 10;
        let time = el.duration * (percent / 100);
        this.setState({currentTime: this.timeChange(time)});
        el.currentTime = time;
    };

    /**
     * 音频播放进度状态开始变化
     */

    progressChangeStart() {
        let el = window.document.getElementById('audio');
        let progressSpeed = this.refs.progressSpeed;
        this.progressInterval = setInterval(() => {
           let percent = Math.round((Number(el.currentTime / el.duration) * 1000).toFixed(1)) / 10;
           this.setState({currentTime: this.timeChange(el.duration * (percent / 100))});
           progressSpeed.style.width = `${percent}%`;
        }, 500);
    };

    /**
     * 音频播放进度状态暂停变化
     */

    progressChangePause() {
        clearInterval(this.progressInterval);
    };

    /**
     * 播放器渲染完成后加装音频数据自动播放
     */

    componentDidMount() {
        let dom = this.refs.audioCtrl;
        dom.click();

        /**
         * iOS微信自动播放需引入微信js-sdk、配置可以为空
         */

        wx.config({
            debug: false,
            appId: '',
            timestamp: 1,
            nonceStr: '',
            signature: '',
            jsApiList: []
        });
        wx.ready(function() {
            window.document.getElementById('audio').play();
        });
    };

    /**
     * 音频数据源变化后重置播放状态
     */

    componentWillReceiveProps(nextProps) {
        let {audioUrl, discPlayerPause} = this.props;
        if (audioUrl !== nextProps.audioUrl) { 
           this.setState({playing: false});
           discPlayerPause();
        }
    };

    /**
     * 音频数据源变化后自动播放
     */

    componentDidUpdate(prevProps) {
        let {audioUrl} = this.props;
        let dom = this.refs.audioCtrl;
        if (audioUrl !== prevProps.audioUrl) {
            dom.click();
        }
    };

    /**
     * dom卸载前重置播放状态、移除定时器
     */

    componentWillUnmount() {
        let {discPlayerPause} = this.props;
        discPlayerPause();
        this.setState({playing: false});
        this.progressChangePause();
    };

    render() {
        const {allTime, currentTime, playing} = this.state;
        const {audioUrl} = this.props;
        return (
            <div className="audioCtrl">
                <div className="audioCtrlContainer">
                    <div className="audioProgressContainer">
                        <p className="audioProgressLine" ref="progressSpeed"></p>
                        <div className="audioProgressCtrl"
                           onTouchMove={(e) => {this.touchMoveFunc(e)}}  
                           onTouchEnd={(e) => {this.touchEndFunc(e)}}></div>
                    </div>
                    <div className="audioProgressTime">
                        <p>{currentTime}</p>
                        <p>{allTime}</p>
                    </div>
                    <div className={`audioProgressCtrlContainer ${playing?'playing':''}`}>
                        <p className="audioUnloaded" ref="audioCtrl" onClick={this.palyCtrl}></p>
                    </div>
                    <audio id="audio" src={audioUrl}
                           onLoadedData={this.loadedDataFunc}
                           onPlay={this.progressChangeStart}
                           onPause={this.progressChangePause}
                           onEnded={this.endedFunc}></audio>
                </div>
            </div>    
        );
    };
};

export default ReactAudio;