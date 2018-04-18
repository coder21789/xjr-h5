/**
 *
 * 主播音频列表组件
 *
 */

import React, {Component} from 'react';
import AudioRecommend from './AudioRecommend';
import AudioNormal from './AudioNormal';
import {seoCtrl} from '../../lib/interactive';

export default class TingAuthorList extends Component {
    constructor(props) {
        super(props);
        this.authorDescToggle = this.authorDescToggle.bind(this);
        this.state = {isAuthorDescShow: false};
    };

    /**
     * 主播简介toggle
     */

    authorDescToggle() {
        const {isAuthorDescShow} = this.state;
        this.setState({isAuthorDescShow: !isAuthorDescShow});
    };

    componentDidMount() {
        const {items} = this.props;
        if (items) { seoCtrl(items.nickName, items.nickName, items.introduction); }
    };

    componentDidUpdate() {
        const {items} = this.props;
        if (items) { seoCtrl(items.nickName, items.nickName, items.introduction); }
    };

    render() {
        const {isAuthorDescShow} = this.state;
        const {items} = this.props;
        return (
            <div>
                <div className="authorList">
                    <div className="authorListDescContainer">
                        <img src={items.imageUrl} alt={items.nickName}
                             onError={(e) => {e.target.src=require('../img/bg_error.png')}} />
                        <div className="authorListDesc">
                            <h4>{items.nickName}</h4>
                            <div className="authorFollow">
                                <div className="followCount">
                                    <h5>{items.followsCount}</h5>
                                    <p>关注</p>
                                </div>
                                <div className="authorLine"></div>
                                <div className="authorAudioCreator">
                                    <h5>{items.audioCount}</h5>
                                    <p>作品</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`authorDescContent ${isAuthorDescShow?'isAuthorDescShow':''}`}>
                        <p>{items.introduction}</p>
                        <div onClick={this.authorDescToggle}></div>
                    </div>
                </div>
                <div className="audioLine"></div>
                <div className="authorAudioRecommend">
                    {items&&(items.list).length>0&&((items.list).slice(0,3)).map((row, i) => <AudioRecommend key={`AudioRecommend${row.id}`} item={row} />)}
                </div>
                <div className="audioLine"></div>
                <div className="authorAudioNormal">
                    {items&&(items.list).length>3&&((items.list).slice(3)).map((row, i) => <AudioNormal key={`AudioNormal${row.id}`} item={row} />)}
                </div>
            </div>
        );
    };
};