/**
 *
 * 春运活动分享列表数据-状态树数据同步
 *
 */

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {fetchSpringShareList, fetchSpringShareAdd, fetchWechatInfo} from '../actions/actionTypes';
import {UA} from '../lib/interactive';
import SpringShareList from '../components/spring/SpringShareList';

const mapStateToProps = (state, ownProps) => {
    return {
        windowObject: state.postWindowObject.fontSize,
        userinfo: state.postWechat.userinfo,
        userinfoDB: state.postWechat.userinfoDB,
        items: state.postSpringShareList.items,
        isShareAdd: state.postSpringShareAdd.items
    };
};

@connect(mapStateToProps)
export default class SpringShare extends Component {
    static propTypes = {
        children: PropTypes.node
    };

    constructor(props) {
        super(props);
        this.springReviewAdd = this.springReviewAdd.bind(this);
    };

    //助力接口
    springReviewAdd() {
        let {dispatch, params, userinfo, userinfoDB} = this.props;
        if (userinfo) {
            let data = {};
            data.shareId = params.splat;
            data.userId = userinfoDB.id;
            dispatch(fetchSpringShareAdd(data));
        }
    };

    componentWillMount() {
        let {userinfo} = this.props;
        let code_sessionStorage = sessionStorage.getItem('code');
        let {host, pathname} = window.location;
        let url = [host, pathname];
        let isWecaht = UA().versions.wechat ? 'oauth2/authorize' : 'qrconnect';
        if (!userinfo && !code_sessionStorage) window.location = `https://open.weixin.qq.com/connect/${isWecaht}?appid=wx2975e7bf85f812c8&redirect_uri=http://www.xinrongnews.com/person/wap?page=${url}&from=weixin&response_type=code&scope=snsapi_login&state=1#wechat_redirect`;
    };

    componentDidMount() {
        let {location, dispatch, params, userinfo, userinfoDB} = this.props;
        let {code} = location.query;

        if (!userinfo) {
            if (code) {
                sessionStorage.setItem('code', code);
                let code_sessionStorage = sessionStorage.getItem('code');
                let isLogin_sessionStorage = sessionStorage.getItem('isLogin');
                if (code_sessionStorage && !isLogin_sessionStorage) {
                    let {origin, pathname} = window.location
                    window.location = origin + pathname;          
                    sessionStorage.setItem('isLogin', 'isLogin');
                }
            } else {
                let code_sessionStorage = sessionStorage.getItem('code');
                dispatch(fetchWechatInfo(code_sessionStorage));
            }
        }

        //获取分享页面数据
        let data = {};
        data.newsId = 1000;
        data.userId = params.splat;
        dispatch(fetchSpringShareList(data));
    };

    componentDidUpdate(prevProps, prevState) {
        let {userinfo} = this.props;
        if (prevProps.userinfo !== userinfo && userinfo) {
            sessionStorage.clear();
        }
    };

    render() {
        const {
            children,
            windowObject,
            userinfo,
            userinfoDB,
            params,
            items,
            isShareAdd
        } = this.props;
        return (
            <div>
                <SpringShareList fontSize={windowObject}
                    userinfo={userinfo}
                    userinfoDB={userinfoDB}
                    shareId={params.splat}
                    review={items.review}
                    rank={items.rankList}
                    springReviewAdd={this.springReviewAdd}
                    isShareAdd={isShareAdd} />
                {children}
            </div>
        );
    };
};