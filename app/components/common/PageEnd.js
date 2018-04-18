/**
 *
 * 内容加载完毕提示组件
 *
 */

import React, {Component} from 'react';
import '../styles/pageEnd.scss';

export default class PageEnd extends Component {
    render() {
        return (
            <section className="PageEnd">
                <div className="pageEndLine"></div>
                <div className="pageEndMsg"><span>就这么多了</span></div>
            </section>
        );
    };
};