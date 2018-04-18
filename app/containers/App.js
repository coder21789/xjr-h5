/**
 *
 * 应用根组件数据-状态树数据同步
 *
 */

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {windowObject} from '../actions/actionCreator';
import {safari} from '../lib/interactive';
import {webviewJavaScriptInterface, showInfoFromJs} from '../lib/webView';
import '../components/styles/common.scss';

@connect()
export default class App extends Component {
    static propTypes = {
        children: PropTypes.node
    };

    constructor(props) {
        super(props);
        this.webviewJavaScriptInterface = this.webviewJavaScriptInterface.bind(this);
    };

    /**
     * webview数据交互
     * @param props
     */

    webviewJavaScriptInterface(props, json, boolean, toNative, parmas) {
        webviewJavaScriptInterface(props, json, boolean, toNative, parmas);
    };

    componentDidMount() {
        safari('root', 'IOS');

        /**
         * dispatch各分辨率下html根元素字体大小
         * 动态设置图片懒加载时的占位符宽高
         */

        let {dispatch} = this.props;
        let htmlFontSize = Number(window.document.getElementsByTagName('html')[0].style.fontSize.replace('px', ''));
        dispatch(windowObject(window.innerHeight, htmlFontSize));
    };

    /**
     * 单页刷新数据置顶页面
     * 清空body className
     */

    componentDidUpdate() {
        window.scrollTo(0, 0);
        window.document.body.className = '';
        this.webviewJavaScriptInterface(this.props, showInfoFromJs, true, true, null);
    };

    render() {
        const {children} = this.props;
        return (
            <div id="theme">
                {children}
            </div>
        );
    };
};