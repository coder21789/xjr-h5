/**
 * UI类
 * @type {{
 *  navigartionTouch: navigartionTouch, 
 *  resizeNavigationBar: resizeNavigationBar, 
 *  seoCtrl: seoCtrl, UA: UA, safari: safari, 
 *  ThemeUI: ThemeUI
 * }}
 */

import seo from '../config/seoInfo';
import {HttpFetch} from './fetch';
import INTERFACE from '../config/interface';
import fetch from 'isomorphic-fetch';

module.exports = {
    navigartionTouch,
    resizeNavigationBar,
    seoCtrl,
    UA,
    safari,
    ThemeUI,
    touchOffsetParent,
    wechatShare
};

/**
 * touchend事件封装toggle导航
 * @param e
 * @param className
 * @param style
 * @param target
 */

function navigartionTouch(e, className, style, target, boolean) {
    let scrollTop = touchOffsetParent(e).scrollTop;
    let container = window.document.getElementsByClassName(className)[0];
    let marginTop = container.offsetHeight;
    let targetEl = window.document.getElementsByClassName(target)[0];
    if (scrollTop > marginTop) {
        !boolean && targetEl.classList.add(style);
        boolean && targetEl.classList.remove(style);
    } else {
        !boolean && targetEl.classList.remove(style);
        boolean && targetEl.classList.add(style);
    }
};

/**
 * 根据touchend事件获取页面滚动距离、内置高度、滚动屏数
 * @param e
 * @returns {{scrollTop, innerHeight: Number, ratio: number}}
 */

function touchOffsetParent(e) {
    // console.log(e.changedTouches[0]);
    function _elEach(obj) {
        if (obj && obj.nodeName !== 'BODY') {
            return _elEach(obj.offsetParent);
        } else {
            return obj;
        }
    };
    let el = _elEach(e.changedTouches[0].target);
    let scrollTop;
    if (el) scrollTop = el.scrollTop;
    if (!scrollTop) scrollTop = window.document.documentElement.scrollTop;
    let innerHeight = window.innerHeight;
    let ratio = Math.floor(scrollTop / innerHeight);
    let scroll = scrollTop / innerHeight;
    // console.log(scrollTop, innerHeight, ratio);
    return {
        scrollTop: scrollTop,
        innerHeight: innerHeight,
        ratio: ratio,
        scroll: scroll
    };
};

/**
 * 导航动态设置
 * @param color
 * @param width
 * @param height
 */

function resizeNavigationBar(color, width, height, el, className, boolean) {
    let ratio = window.devicePixelRatio;
    if (ratio < 3) {resize(color, width, height, el, className, boolean);}
        else {resize(color, 1.5*width, height, el, className, boolean);}
    function resize(_color, _width, _height, _el, _className) {
        _color && (window.document.querySelector('body').style.backgroundColor = `#${_color}`);
        _color && _el && (window.document.querySelector('html').style.backgroundColor = `#${_color}`);
        _width && (window.document.querySelector('.navigationBar').style.borderBottom = `${_width}rem solid #e5e5e5`);
        let _htmlEl = window.document.querySelector('.navTop');
        if (_height && _htmlEl) {
            _htmlEl.style.height = `${_height}rem`;
            let _htmlClass = _htmlEl.classList;
            _className && boolean && _htmlClass.add(_className);
            _className && !boolean && _htmlClass.remove(_className);
        }
    };
};

/**
 * seo设置
 * @param title
 * @param key
 * @param desc
 */

function seoCtrl(title, key, desc) {
    window.document.title = title || seo.seo.index.subject;
    window.document.getElementsByName('site')[0].content = title || seo.seo.index.subject;
    window.document.getElementsByName('keywords')[0].content = key || seo.seo.index.keywords;
    window.document.getElementsByName('description')[0].content = desc || seo.seo.index.summary;
};

/**
 * 手机浏览器内核判断
 * @returns {{versions: {trident, presto, webKit, gecko, mobile, ios, android, iPhone, iPad, webApp}, language: string}}
 * @constructor
 */

function UA() {
    var browser={
        versions: function(){
            var u = navigator.userAgent, app = navigator.appVersion;
            return {
                trident: u.indexOf('Trident') > -1,
                presto: u.indexOf('Presto') > -1,
                webKit: u.indexOf('AppleWebKit') > -1,
                gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,
                mobile: !!u.match(/AppleWebKit.Mobile./),
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
                iPhone: u.indexOf('iPhone') > -1,
                iPad: u.indexOf('iPad') > -1,
                safari: u.indexOf('Safari') > -1,
                MQQBrowser: u.indexOf('MQQBrowser') > -1,
                UC: u.indexOf('UC') > -1,
                wechat: u.toLowerCase().indexOf('micromessenger') > -1
            };
        }(),
        language: (navigator.browserLanguage || navigator.language).toLowerCase()
    };
    return browser;
};

/**
 * 设置safari浏览器
 * @param el
 * @param className
 */

function safari(el, className) {
    if (!UA().versions.android && UA().versions.safari) {
        window.document.getElementById(el).className = className;
    }
};

/**
 * ui模式切换
 * @param props
 * @constructor
 */

function ThemeUI(props, style) {
    let {platform, theme} = props.location.query;
    var _htmlClass = window.document.getElementsByTagName('html')[0].classList;
    if (platform === 'ios' || platform === 'android') {
        _htmlClass.add('platform');
        theme === style && _htmlClass.add(style);
        theme !== style && _htmlClass.remove(style);
    }
};

/**
 * 微信jsapi授权
 * @param signature
 * @constructor
 */

async function wechatShare(config) {
    let {origin, pathname} = window.location;
    let url = origin + pathname;

    let FetchInit = new HttpFetch(INTERFACE.URL.postWapWechatSignature, `url=${url}`);
    let InterfaceInit = FetchInit.fetch();
    let data = await fetch(InterfaceInit.myRequest, InterfaceInit.myInit).then(response => response.json());

    wx.config({
        debug: false,
        appId: data.appid,
        timestamp: data.timestamp,
        nonceStr: data.nonceStr,
        signature: data.signature,
        jsApiList: [
            'checkJsApi',
            'onMenuShareTimeline',
            'onMenuShareAppMessage'
        ]
    });
    wx.ready(function() {
        wx.onMenuShareTimeline({
            title: config.title || '我在参加新融街免费领春运火车票活动，请求支援！',
            link: url,
            imgUrl: config.imgUrl || 'https://img.xinrongnews.com/chunyun/logo-share.png',
            fail: function(res) {
                console.log(JSON.stringify(res));
            }
        });
        wx.onMenuShareAppMessage({
            title: config.title || '我在参加新融街免费领春运火车票活动，请求支援！',
            desc: config.desc || '我在参加新融街免费领春运火车票活动，请求支援！',
            link: url,
            imgUrl: config.imgUrl || 'https://img.xinrongnews.com/chunyun/logo-share.png',
            fail: function(res) {
                console.log(JSON.stringify(res));
            }
        });
    });
};