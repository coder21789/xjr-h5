/**
 *
 * 春运活动列表数据-状态树数据同步
 *
 */

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import SpringList from '../components/spring/SpringList';
import {fetchWechatInfo, fetchSpringReviewList, fetchSpringReviewImageUpload, fetchSpringReviewAdd} from '../actions/actionTypes';
import {UA} from '../lib/interactive';

const mapStateToProps = (state, ownProps) => {
    return {
        windowObject: state.postWindowObject.fontSize,
        userinfo: state.postWechat.userinfo,
        userinfoDB: state.postWechat.userinfoDB,
        items: state.postSpringReviewList.items,
        playload: state.postSpringReviewList.playload,
        pageInfo: state.postSpringReviewList.pageInfo,
        isReviewAdd: state.postSpringReviewAdd.items,
        isReviewAddFetching: state.postSpringReviewAdd.isFetching,
        image: state.postSpringReviewImage.items
    };
};

@connect(mapStateToProps)
export default class Spring extends Component {
    static propTypes = {
        children: PropTypes.node
    };

    constructor(props) {
        super(props);
        this.springReviewListLoadMore = this.springReviewListLoadMore.bind(this);
        this.springReviewImageUpload = this.springReviewImageUpload.bind(this);
        this.springReviewAdd = this.springReviewAdd.bind(this);
        this.state = {springReviewListPageInfo: 1};
    };

    //加载评论列表
    springReviewListLoadMore() {
        let {dispatch, pageInfo, playload} = this.props;
        let {springReviewListPageInfo} = this.state;
        let pageStart = springReviewListPageInfo + 1;
        if (pageStart <= pageInfo) {
            dispatch(fetchSpringReviewList(5, pageStart, playload));
            this.setState({springReviewListPageInfo: pageStart});
        }
    };

    //上传图片
    springReviewImageUpload(file) {
        let {dispatch} = this.props;
        dispatch(fetchSpringReviewImageUpload(file));
    };

    //添加评论
    async springReviewAdd(json) {
        let {dispatch, isReviewAddFetching} = this.props;
        if (!isReviewAddFetching) dispatch(fetchSpringReviewAdd(json));
    };

    componentWillMount() {
        //获取openid code
        let {userinfo} = this.props;
        let code_sessionStorage = sessionStorage.getItem('code');
        let {host, pathname} = window.location;
        let url = [host, pathname];
        let isWecaht = UA().versions.wechat ? 'oauth2/authorize' : 'qrconnect';
        if (!userinfo && !code_sessionStorage) window.location = `https://open.weixin.qq.com/connect/${isWecaht}?appid=wx2975e7bf85f812c8&redirect_uri=http://www.xinrongnews.com/person/wap?page=${url}&from=weixin&response_type=code&scope=snsapi_login&state=1#wechat_redirect`;
    };

    componentDidMount() {
        let {location, dispatch, userinfo} = this.props;
        let {code} = location.query;
        if (!userinfo) {
            if (code) {
                //存储code并改变url
                code && sessionStorage.setItem('code', code);
                let code_sessionStorage = sessionStorage.getItem('code');
                let isLogin_sessionStorage = sessionStorage.getItem('isLogin');
                if (code_sessionStorage && !isLogin_sessionStorage) {
                    let {origin, pathname} = window.location
                    window.location = origin + pathname;          
                    sessionStorage.setItem('isLogin', 'isLogin');
                }
            } else {
                //获取用户信息
                let code_sessionStorage = sessionStorage.getItem('code');
                dispatch(fetchWechatInfo(code_sessionStorage));
            }
        } 
        //获取评论列表
        dispatch(fetchSpringReviewList(5, this.state.springReviewListPageInfo));
    };

    componentDidUpdate(prevProps, prevState) {
        //清空code存储
        let {userinfo} = this.props;
        if (prevProps.userinfo !== userinfo && userinfo) {
            sessionStorage.clear();
        }
    };

    render() {
        const {
            children,
            windowObject,
            items,
            playload,
            pageInfo,
            userinfoDB,
            isReviewAdd,
            image,
            dispatch
        } = this.props;
        const {springReviewListPageInfo} = this.state;
        return (
            <div>
                <SpringList fontSize={windowObject} 
                    items={items}
                    playload={playload}
                    pageInfo={pageInfo}
                    userinfoDB={userinfoDB}
                    isReviewAdd={isReviewAdd}
                    image={image}
                    springReviewListLoadMore={this.springReviewListLoadMore}
                    springReviewListPageInfo={springReviewListPageInfo}
                    springReviewImageUpload={this.springReviewImageUpload}
                    springReviewAdd={this.springReviewAdd}
                    dispatch={dispatch} />
                {children}
            </div>
        );
    };
};