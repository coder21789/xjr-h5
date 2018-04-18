/**
 *
 * app下载组件
 *
 */

import React, {Component} from 'react';
import * as actions from '../../actions/actionCreator';

export default class AppDownloadBar extends Component {
    constructor(props) {
        super(props);
        this.handleHideClick = this.handleHideClick.bind(this);
    };

    handleHideClick() {
        const {dispatch} = this.props;
        dispatch(actions.appDownLoad());
        this.refs.platformAppDownloadBar.style.display = 'none';
    };

    /**
     * 定时5s移除底部下载
     * @props {isShowApp}
     */

    componentDidMount() {
        setTimeout(() => {
            const {dispatch} = this.props;
            dispatch(actions.appDownLoad());
        }, 5000);
    };

    render() {
        const {isAppDownLoad, theme} = this.props;
        return (
            <footer className={`appDownloadBar ${isAppDownLoad?'isAppDownLoadBarHide':''} ${theme?`${theme}`:''}`} ref="platformAppDownloadBar" id="appDownload">
                <img className="btn_delete" src={require('../img/btn_delete.png')} alt="" 
                     onClick={this.handleHideClick} />
                {theme?<img className="icon_xrj" src={require(`../img/icon_${theme}.png`)} alt="" />:
                    <img className="icon_xrj" src={require('../img/icon_xrj.png')} alt="" />}
                <h4>更多资讯,下载客户端。</h4>
                {theme?<a href="https://itunes.apple.com/cn/app/id1294546777?mt=8">iOS客户端下载</a>:
                    <a href="http://www.xinrongnews.com/static/download/download.html">打开下载页</a>}
            </footer>
        );
    };
};