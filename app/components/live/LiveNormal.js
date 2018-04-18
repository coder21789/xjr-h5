/**
 *
 * 直播普通频道组件
 *
 */

import React, {Component} from 'react';
import '../styles/liveNormal.scss';

export default class LiveNormal extends Component {
    render() {
        const {items} = this.props;
        return (
            <section className="LiveNormal">
                <ul className="liveListNormal">
                    {items?items.map(item =>
                        <LiveContent
                            item={item}
                            key={`liveNormal${item.time}${items.indexOf(item)}`}/>):null}
                </ul>
            </section>
        );
    };
};

class LiveContent extends Component {
    constructor(props) {
        super(props);
        this.handleContentShowAll = this.handleContentShowAll.bind(this);
        this.state = {contentShowAll: false};
    };

    handleContentShowAll() {
        this.setState({contentShowAll: !this.state.contentShowAll});
    };

    render() {
        const {item} = this.props;
        return (
            <li>
                <div className="liveTimePoint">
                    <time>{(item.time).split(' ')[1].split(':').slice(0,2).join(':')}</time>
                </div>
                <div className={this.state.contentShowAll?'liveContentAll contentShowAll':'liveContentAll'}
                     onClick={this.handleContentShowAll}>
                    <p>{item.content}</p>
                    <div className="liveShow">
                        <span>{this.state.contentShowAll?'收起':'展开'}</span>
                    </div>
                </div>
            </li>
        );
    };
};