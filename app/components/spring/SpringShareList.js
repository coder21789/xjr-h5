/**
 *
 * 春运活动分享列表组件
 *
 */

import React, {Component} from 'react';
import LazyLoad from 'react-lazy-load';
import {Link} from 'react-router';
import SpringModal from './SpringModal';
import {wechatShare} from '../../lib/interactive';
import '../font/iconfont.css';
import '../styles/spring.scss';

export default class SpringShareList extends Component {
    constructor(props) {
        super(props);
        this.shareMode = this.shareMode.bind(this);
        this.modalShow = this.modalShow.bind(this);
        this.url = this.url.bind(this);
        this.rankShow = this.rankShow.bind(this);

        this.state = {
            isRankShow: false, isHelped: 0, modalShow: false, 
            modalMsg: '', mode: ''
        };
        this.defaultOptions = [
            {add: '为TA助力', details: '我要参加'}, 
            {add: '邀请好友为我助力', details: '查看活动详情'}, 
            {add: '邀请好友为TA助力', details: '我要参加'}
        ];
    };

    //评论按钮触发事件切换
    shareMode() {
        let {springReviewAdd} = this.props;
        let {isHelped} = this.state;
        if (isHelped) {
            this.modalShow(true, '', 'share');
        } else {
            springReviewAdd();
        }
    };

    //显示弹出层组件
    modalShow(boolean, msg, mode) {
        this.setState({modalShow: boolean, modalMsg: msg, mode: mode});
    };

    //url定向
    url() {
        window.location.href = `${window.location.origin}/chunyun/1000`;
    };

    //切换排行榜
    async rankShow() {
        let {isRankShow} = this.state;
        await this.setState({isRankShow: !isRankShow});
    };

    componentDidMount() {
        //本id用户打开页面显示按钮状态
        setTimeout(() => {
            let {shareId, userinfoDB} = this.props;
            if (Number(shareId) === Number(userinfoDB.id)) {
                this.setState({isHelped: 1});
            }
        }, 1000);

        wechatShare();
    };

    componentDidUpdate(prevProps, prevState) {
        let {isShareAdd, shareId, userinfoDB} = this.props;
        //已助力逻辑
        if (isShareAdd && prevProps.isShareAdd !== isShareAdd) {
            if (Number(isShareAdd) === 10000) {
                let {count} = this.refs;
                let plus = Number(count.innerText) + 1;
                count.innerText = plus;
            } else {
                this.modalShow(true, '无法重复助力', false);
            }
            if (Number(shareId) === Number(userinfoDB.id)) {
                this.setState({isHelped: 1});
            } else {
                this.setState({isHelped: 2});
            }
        }
    };

    render() {
        const {
            fontSize, review,
            rank, isShareAdd
        } = this.props;
        const {
            isRankShow, isHelped, modalShow, 
            modalMsg, mode
        } = this.state;
        return (
            <section className="SpringShareList">
            	<div className="springShareBanner">
                    {review?<img className="springSharePic" src={review.picture}
                        onError={(e) => {e.target.src=require('../img/bg_error.png')}}
                        alt="" />:null}
                    <div className="springShareCloud"></div>
                    <div className="springSharePlace">
                        {review?<p>{review.start}</p>:null}
                        <div className="springSharePlaceArrow"></div>
                        {review?<p>{review.end}</p>:null}
                    </div>
                    <div className="springShareBoard">
                        {review?<p>{review.nickName}:</p>:null}
                        {review?<p>{review.content}</p>:null}
                    </div>
                    <div className="springShareCount">
                        <p>已获助力数:</p>
                        {review?<p ref="count">{review.helpCount}</p>:null}
                    </div>
                    <div className="springShareAddLike" onClick={this.shareMode}>{this.defaultOptions[isHelped].add}</div>
                    <div className="springShareDetails" onClick={this.url}>{this.defaultOptions[isHelped].details}</div>
                    <div className="springShareRankContainer">
                        <div className="rankCaption">
                            <span></span>
                            <p><cite>助力榜</cite></p>
                        </div>
                        <ul className={`rankListContainer ${isRankShow?'isRankShow':''}`}>
                            {rank && (rank.slice(0,10)).map((row, i) => 
                                <li className="rankList" key={row.nickName}>
                                    <div className="rankPerson">
                                        <img className="rankPersonPic" src={row.photoImageUrl}
                                            alt={row.nickName} />
                                        <p>{row.nickName}</p>
                                    </div>
                                    <p className="rankListCount">{row.helpCount}</p>
                                </li>
                            )}
                        </ul>
                        <div className="rankToggle" onClick={this.rankShow}><i className={`iconfont icon-fanhuijiantou ${isRankShow?'isRankShow':''}`}></i></div>
                        <div className="rankCompanyInfo">
                            <div className="companyLine"></div>
                            <div className="rankCaption">
                                <span></span>
                                <p><cite>活动规则</cite></p>
                            </div>
                            <div className="companyContainer">
                                <div className="companyInfo">
                                    <p>1、上传跟回家、春运、过年相关照片+评论模式。</p>
                                    <p>2、@你心中的人选，助力春节买火车票。就有机会报销春运火车票。</p>
                                    <p>3、活动截止到2月23日。助力榜单将于2月24日在新融街微信公众号公布，请扫码关注。</p>
                                </div>
                                <img src={require("../img/share_code@3x.png")} alt="" />
                            </div>
                            <p className="companyName">最终解释权为新融街所有</p>
                        </div>
                    </div>
                </div>
                {modalShow?<SpringModal modalShow={this.modalShow} modalMsg={modalMsg} mode={mode} />:null}
            </section>
        );
    };
};