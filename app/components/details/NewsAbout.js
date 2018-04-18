/**
 *
 * 详情相关阅读组件
 *
 */

import React, {Component} from 'react';
import SuggestSmaller from '../news/SuggestSmaller';
import '../styles/newsAbout.scss';

export default class NewsAbout extends Component {
    render() {
        const {items} = this.props;
        return (
            <section className="NewsAbout">
                <div className="newsIcon">
                    {/*<img src={require('../img/newsAbout@2x.png')} alt=""/>*/}
                    <h4>相关新闻</h4>
                </div>
                {items.map((item, i) => (
                    <SuggestSmaller txttiny={item} key={`about${item.id}${i}`} />
                ))}
            </section>
        );
    };
};