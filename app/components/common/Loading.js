/**
 *
 * 加载组件
 *
 */

import React, {Component} from 'react';
import '../styles/loading.scss';

export default class Loading extends Component {
    render() {
        const {theme} = this.props;
        return (
            <LoadingTheme theme={theme} />
        );
    };
};

/**
 * theme 1 旋转加载loading default 默认加载loading
 * @param {theme}
 * @constructor {LoadingTheme}
 */

function LoadingTheme(props) {
    const theme = props.theme?props.theme:null;
    const normal = <section className="loading">
        <div className="spinner">
            <div className="double-bounce1"></div>
            <div className="double-bounce2"></div>
        </div>
        <h4>数据正在卖力加载中(^-^)</h4>
    </section>;
    const rotate = <section className="loadingRotate">
        <div>
            <i className="iconfont icon-jiazai"></i>
            <span>图片加载中</span>
        </div>
    </section>;
    switch (theme) {
        case 1: return rotate;
        default: return normal;
    }
};