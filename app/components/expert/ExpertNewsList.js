/**
 *
 * 专家新闻观点组件
 *
 */

import React, {Component} from 'react';
import {Link} from 'react-router';
import ExpertListNormal from './ExpertListNormal';
import '../styles/expertNewsList.scss';

export default class ExpertNewsList extends Component {
    render() {
        const {items, load} = this.props;
        return (
            <section className={load?'ExpertNewsListNormal':'ExpertNewsList'}>
                {load?null:<h4>新闻观点</h4>}
                <ExpertListNormal items={items} />
            </section>
        );
    };
};