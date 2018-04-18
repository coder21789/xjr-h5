/**
 *
 * 春运活动列表组件
 *
 */

import React, {Component} from 'react';
import LazyLoad from 'react-lazy-load';
import ReactSwipe from '../../lib/ReactSwipe';
import SpringModal from './SpringModal';
import {resetSpringReviewAdd} from '../../actions/actionCreator';
import {touchOffsetParent, wechatShare} from '../../lib/interactive';
import '../styles/stockQuotes.scss';
import '../styles/spring.scss';

export default class SpringList extends Component {
    constructor(props) {
        super(props);
        this.imageUpload = this.imageUpload.bind(this);
        this.reviewAdd = this.reviewAdd.bind(this);
        this.formValidation = this.formValidation.bind(this);
        this.modalShow = this.modalShow.bind(this);
        this.videoShow = this.videoShow.bind(this);

        this.toggleReview = this.toggleReview.bind(this);
        this.toggleHistory = this.toggleHistory.bind(this);
        this.historyMove = this.historyMove.bind(this);
        this.pageScroll = this.pageScroll.bind(this);
        this.handlePage = this.handlePage.bind(this);

        this.state = {
            isReviewShow: false, time: '', isFormValidated: false, 
            historySlider: 0, history: 1, playing: false, 
            isVideoShow: false, picPreview: '', modalShow: false, 
            modalMsg: '', mode: '', preview: ''
        };
        this.defaultOptions = {
            historyOne: [
                '1959年试制成功的"巨龙型"内燃机车,在经过改进后,正式定型批量生产,定型为"东风型"', 
                '1969年，我国第一代电力机车韶山SS1型在株洲电力机车厂开始批量生产', 
                '2010年，时速超过380公里的国产“和谐号”CRH380A新一代高速动车组列车下线，揭开了中国新一代高速动车组的神秘面纱'
            ],
            historyTwo: [
                {caption: '纸板票—1950年', text: '新中国成立后，中国铁路的第一代火车票是硬板式火车票'},
                {caption: '条形码"软纸票"', text: '上世纪80年代，深圳火车站率先使用计算机售票，车票也改为软纸式火车票'},
                {caption: '磁卡火车票', text: '从2008年开始，国内部分大中型城市的火车站陆续开始发售磁卡式火车票'},
                {caption: '二维码"软纸票"', text: '2009年12月10日起，车票上的防伪条码更变为二维码'}
            ]
        };
    };

    componentDidMount() {
        //抢票日期格式化
        function GetDateStr(AddDayCount) {     
           let dd = new Date();   
           dd.setDate(dd.getDate() + AddDayCount);    
           let y = dd.getFullYear();     
           let m = dd.getMonth() + 1;   
           let d = dd.getDate();   
           return `${m}月${d}号`;   
        };
        this.setState({time: GetDateStr(30)});

        //重置评论状态
        let {dispatch} = this.props;
        dispatch(resetSpringReviewAdd());

        wechatShare();
    };

    componentDidUpdate(prevProps, prevState) {
        let {image, isReviewAdd, userinfoDB} = this.props;
        let {modalShow, history} = this.state;
        //上传大小判断
        if (prevProps.image !== image && image && !image.url) this.modalShow(true, '文件类型错误或者大小超出50M限制');
        //评论后跳转
        if (isReviewAdd && prevProps.isReviewAdd !== isReviewAdd) {
            let code = Number(isReviewAdd);
            code === 10000 && (window.location.href = `${window.location.origin}/chunyun/1000/${userinfoDB.id}`);
            code === 10001 && this.modalShow(true, '您已晒照，请勿重复晒照');
        }
        //已晒照点击确认后跳转
        if (prevState.modalShow !== modalShow && !modalShow && Number(isReviewAdd) === 10001) {
            window.location.href = `${window.location.origin}/chunyun/1000/${userinfoDB.id}`;
        }
        //火车票历史记录跳转
        if (prevState.history !== history) {
            let el = window.document.getElementsByClassName('historyTab');
            [1,2,3,4].map((item, i) => {
                if (Number(history) !== i + 1) {
                    el[i].classList.remove('historyTabOn');
                } else {
                    el[i].classList.add('historyTabOn');
                }
            });
        }
    };

    //图片上传并显示预览
    imageUpload(e) {
        let ctx = this;
        let reader  = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.addEventListener('load', function() {
            ctx.setState({picPreview: reader.result});
        }, false);

        let {dispatch, springReviewImageUpload} = this.props;
        let form = window.document.getElementById('form');
        let file = new FormData(form);
        file.append('width', '368');
        file.append('height', 'null');
        springReviewImageUpload(file);
        this.formValidation();
    };

    //添加评论
    async reviewAdd() {
        let {springReviewAdd, userinfoDB} = this.props;
        let {content, start, end, picture} = this.refs;
        let data = {};
        data.newsId = 1000;
        data.userId = userinfoDB.id;
        if (content.value && start.value && end.value && picture.value) {
            data.content = content.value;
            data.start = start.value;
            data.end = end.value;
            data.picture = picture.value;
            await springReviewAdd(data);
        } else {
            return;
        }
    };

    //表单验证
    formValidation() {
        let {content, start, end, picture} = this.refs;
        if (!content.value || !start.value || !end.value || !picture.value) {
            this.setState({isFormValidated: false});
        } else {
            this.setState({isFormValidated: true});
        }
    };

    //显示弹出层组件
    async modalShow(boolean, msg, mode, preview) {
        await this.setState({modalShow: boolean, modalMsg: msg, mode: mode, preview: preview});
    };

    //显示视频播放层
    async videoShow() {
        let {isVideoShow} = this.state;
        await this.setState({isVideoShow: !isVideoShow});
    };

    //切换评论框跳转
    toggleReview(e) {
        let {scroll} = touchOffsetParent.call(this, e);
        if (scroll > 0) {
            this.setState({isReviewShow: true});
        } else {
            this.setState({isReviewShow: false});
        }
    };

    //切换火车历史记录
    toggleHistory(e) {
        let {index} = e.target.dataset;
        this.setState({history: index});
    };

    //切换火车票历史记录
    historyMove(index) {
        this.setState({historySlider: index});
    };

    //屏幕滚动
    pageScroll() {
        let scroll = window.innerHeight;
        window.scrollTo(0, scroll);
    };

    //锚点跳转
    handlePage() {
        window.document.getElementById('reviewForm').scrollIntoView();
    };

    render() {
        const {
            fontSize, items, playload,
            pageInfo, springReviewListLoadMore,
            springReviewListPageInfo, image
        } = this.props;
        const {
            isReviewShow, time, historySlider, 
            history, playing, isVideoShow, 
            picPreview, modalShow, modalMsg, 
            mode, preview, isFormValidated
        } = this.state;
        return (
            <div>
                <section className="SpringList" onTouchEnd={(e) => {this.toggleReview(e);}}>
                	<div className="firstPageContainer">
                        <div className="pageScroll" onClick={this.pageScroll}></div>
                    </div>
                    <div className="lastPageContainer">
                        <LazyLoad height={fontSize*13.88} offset={fontSize*1}>
                            <img src={require("../img/spring_last_page_1.png")} alt="" className="springLastPage1" />
                        </LazyLoad>
                        <LazyLoad height={fontSize*11.12} offset={fontSize*3}>
                            <img src={require("../img/spring_last_page_2.png")} alt="" className="springLastPage2" />
                        </LazyLoad>
                        <div className="springLastPage3Container">
                            <LazyLoad height={fontSize*11.893} offset={fontSize*3}>
                                <img src={require("../img/spring_last_page_3.png")} alt="" className="springLastPage3" />
                            </LazyLoad>
                            <p className="springLastPage3Text">今日开抢：{time}</p>
                        </div>
                        <LazyLoad height={fontSize*3.173} offset={fontSize*12}>
                            <div className="springLastPageJoin" onClick={this.handlePage}></div>
                        </LazyLoad>
                        <LazyLoad height={fontSize*21.96} offset={fontSize*12}>
                            <img src={require("../img/spring_last_page_4.png")} alt="" className="springLastPage4" />
                        </LazyLoad>
                        <LazyLoad height={fontSize*27.2} offset={fontSize*12}>
                            <img src={require("../img/spring_last_page_5.png")} alt="" className="springLastPage5" />
                        </LazyLoad>
                        <div className="springLastPage6Container">
                            <LazyLoad height={fontSize*10.507} offset={fontSize*12}>
                                <img src={require("../img/spring_last_page_6.png")} alt="" className="springLastPage6" />
                            </LazyLoad>
                            <LazyLoad height={fontSize*10.507} offset={fontSize*12}>
                                <div className="StockQuotes springLastPage6Slider">
                                    <ReactSwipe
                                        className="reactSwipe"
                                        swipeOptions={{speed: 1500, ratio: 0.7, callback: this.historyMove}}>
                                            <div className="stockScroller" key={`stockScroller1`}>
                                                <div className="stockData">
                                                    <img src={require('../img/spring_last_page_6_1.jpg')} alt="" />
                                                </div>
                                            </div>
                                            <div className="stockScroller" key={`stockScroller2`}>
                                                <div className="stockData">
                                                    <img src={require('../img/spring_last_page_6_2.jpg')} alt="" />
                                                </div>
                                            </div>
                                            <div className="stockScroller" key={`stockScroller3`}>
                                                <div className="stockData">
                                                    <img src={require('../img/spring_last_page_6_3.jpg')} alt="" />
                                                </div>
                                            </div>
                                    </ReactSwipe>
                                    <p className="springLastPage6SliderText">{this.defaultOptions.historyOne[historySlider]}</p>
                                </div>
                            </LazyLoad>
                        </div>
                        <div className="springLastPage7Container">
                            <LazyLoad height={fontSize*11.187} offset={fontSize*12}>
                                <img src={require("../img/spring_last_page_7.png")} alt="" className="springLastPage7" />
                            </LazyLoad>
                            <LazyLoad height={fontSize*11.187} offset={fontSize*12}>
                                <div className="springLastPage7Slider">
                                    <img src={require(`../img/spring_last_page_7_${history}.jpg`)} alt="" className="springLastPage7Pic" />
                                    <div className="springLastPage7SliderText">
                                        <p>{this.defaultOptions.historyTwo[history-1].caption}</p>
                                        <p>{this.defaultOptions.historyTwo[history-1].text}</p>
                                    </div>
                                    <ul className="springLastPage7SliderIndex">
                                        <li>
                                            <p className="historyTab historyTabOn" data-index="1" onClick={e => this.toggleHistory(e)}>纸板票</p>
                                            <p className="historyArrow"></p>
                                        </li>
                                        <li>
                                            <p className="historyTab" data-index="2" onClick={e => this.toggleHistory(e)}>条形码</p>
                                            <p className="historyArrow"></p>
                                        </li>
                                        <li>
                                            <p className="historyTab" data-index="3" onClick={e => this.toggleHistory(e)}>磁卡</p>
                                            <p className="historyArrow"></p>
                                        </li>
                                        <li>
                                            <p className="historyTab" data-index="4" onClick={e => this.toggleHistory(e)}>二维码</p>
                                        </li>
                                    </ul>
                                </div>
                            </LazyLoad>
                        </div>
                        <LazyLoad height={fontSize*12.32} offset={fontSize*12}>
                            <img src={require("../img/spring_last_page_8.png")} alt="" className="springLastPage8" />
                        </LazyLoad>
                        <LazyLoad height={fontSize*10.56} offset={fontSize*12}>
                            <img src={require("../img/spring_last_page_9.png")} alt="" className="springLastPage9" />
                        </LazyLoad>
                        <LazyLoad height={fontSize*15.547} offset={fontSize*12}>
                            <img src={require("../img/spring_last_page_10.png")} alt="" className="springLastPage10" />
                        </LazyLoad>
                        <div className="springLastPage11Container">
                            <LazyLoad height={fontSize*26.133} offset={fontSize*12}>
                                <img src={require("../img/spring_last_page_11.png")} alt="" className="springLastPage11" />
                            </LazyLoad>
                            <LazyLoad height={fontSize*1.173} offset={fontSize*12}>
                                <div className="springLastPage11Button" onClick={this.videoShow}></div>
                            </LazyLoad>
                        </div>
                        <div className="springLastPage12Container">
                            <LazyLoad height={fontSize*26.133} offset={fontSize*12}>
                                <img src={require("../img/spring_last_page_12.png")} alt="" className="springLastPage12" />
                            </LazyLoad>
                            <LazyLoad height={fontSize*1.467} offset={fontSize*12}>
                                <div className="springLastPage12Button" onClick={this.handlePage}></div>
                            </LazyLoad>
                        </div>
                        <div className="reviewContainer">
                            <LazyLoad height={fontSize*1.44} offset={fontSize*12}>
                                <img src={require("../img/spring_review_logo.png")} alt="" className="springReviewLogo" />
                            </LazyLoad>
                            <div className="reviewListContainer">
                                <ul className="reviewList">
                                    {items.map((row, i) => 
                                        <li key={row.id}>
                                            <div className="personInfo">
                                                <img src={row.photoImageUrl}
                                                    alt={row.nickName} />
                                                <p>{row.nickName}</p>
                                            </div>
                                            <div className="personPlace">
                                                <p>{row.start}</p>
                                                <div className="personPlaceArrow"></div>
                                                <p>{row.end}</p>
                                            </div>
                                            <p className="personReview">{row.content}</p>
                                            <img className="personPic" src={row.picture}
                                                onError={(e) => {e.target.src=require('../img/bg_error.png')}} 
                                                alt="" onClick={e => this.modalShow(true, '', 'preview', e.target.src)} />
                                            <p className="personTime">{row.reviewTime}</p>
                                        </li>
                                    )}
                                    {playload && playload.map((row, i) => 
                                        <li key={row.id}>
                                            <div className="personInfo">
                                                <img src={row.photoImageUrl}
                                                    alt={row.nickName} />
                                                <p>{row.nickName}</p>
                                            </div>
                                            <div className="personPlace">
                                                <p>{row.start}</p>
                                                <div className="personPlaceArrow"></div>
                                                <p>{row.end}</p>
                                            </div>
                                            <p className="personReview">{row.content}</p>
                                            <img className="personPic" src={row.picture}
                                                onError={(e) => {e.target.src=require('../img/bg_error.png')}} 
                                                alt="" onClick={e => this.modalShow(true, '', 'preview', e.target.src)}/>
                                            <p className="personTime">{row.reviewTime}</p>
                                        </li>
                                    )}
                                </ul>
                                {springReviewListPageInfo===pageInfo?null:<div className="reviewLoadmore" onClick={springReviewListLoadMore}>查看更多</div>}
                            </div>
                        </div>
                        <div className="reviewForm" id="reviewForm">
                            <p className="reviewCaption">留言板</p>
                            <textarea ref="content" name="content" id="content" placeholder="说点什么吧(最多输入30个字符)" cols="30" rows="10" onChange={this.formValidation}></textarea>
                            {picPreview?<div className="reviewPreviewContainer">
                                <div className="previewPic">
                                    <img src={picPreview}
                                         onError={(e) => {e.target.src=require('../img/bg_error.png')}}
                                         alt="" />
                                </div>
                                <p className="reviewPlaceSelect">请输入您的行程<span>*</span></p>
                                <div className="reviewPlaces">
                                    <p>出发地</p>
                                    <p>目的地</p>
                                </div>
                                <div className="reviewPlacesContainer">
                                    <input ref="start" type="text" name="start" placeholder="出发地" onChange={this.formValidation} />
                                    <div className="reviewPlacesArrow"></div>
                                    <input ref="end" type="text" name="end" placeholder="目的地" onChange={this.formValidation} />
                                </div>
                            </div>:null}
                            <div className="reviewButton">
                                <form className="review_pic" id="form" name="" enctype="multipart/form-data">
                                    <input type="file" id="file" name="file" multiple="multiple" onChange={e => this.imageUpload(e)} />
                                </form>
                                <input ref="picture" type="hidden" name="picture" value={image?image.url:''} />
                                <div className={`review_add ${isFormValidated?'':'review_add_no'}`} onClick={this.reviewAdd}></div>
                            </div>
                        </div>
                    </div>
                </section>
                {isVideoShow?<div className="videoContainer" onClick={this.videoShow}>
                    <video src="https://img.xinrongnews.com/chunyun/video.mp4" controls></video>
                </div>:null}
                {isReviewShow?<div className="photoButton" onClick={this.handlePage}></div>:null}
                {modalShow?<SpringModal modalShow={this.modalShow} modalMsg={modalMsg} mode={mode} preview={preview} />:null}
            </div>
        );
    };
};