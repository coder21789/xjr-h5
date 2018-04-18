/**
 *
 * 弹出层组件
 *
 */

import React, {Component} from 'react';
import '../styles/spring.scss';

export default class SpringModal extends Component {
    constructor(props) {
        super(props);
    };

    render() {
    	const {modalShow, modalMsg, mode, preview} = this.props;
    	return (
    		<section className="Modal" onClick={e => modalShow(false, '')}>
                {!mode?<div className="dialog">
                    <p className="modalCaption">温馨提示</p>
                    <p className="modalMsg">{modalMsg}</p>
                    <p className="modalClose" onClick={e => modalShow(false, '')}>确定</p>
                </div>:(mode !== 'preview'?<div className="shareContainer">
                    <img src={require("../img/share_arrow@3x.png")} alt="" className="shareArrow" />
                    <p>点击右上角</p>
                    <p>发送给好友或者分享到朋友圈</p>
                    <p>邀请好友帮我一起助力春运!</p>
                </div>:<div className="preview">
                    <img src={preview} alt="" className="previewPic" />
                </div>)}
            </section>
    	);
    };
};