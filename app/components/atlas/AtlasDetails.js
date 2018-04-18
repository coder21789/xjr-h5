/**
 *
 * 图集详情轮播组件
 *
 */

import React, {Component} from 'react';
import {Link} from 'react-router';
import ReactSwipe from '../../lib/ReactSwipe';
import '../styles/atlasDetails.scss';

export default class AtlasDetails extends Component {
    constructor(props) {
        super(props);
        this.handleToggleClick = this.handleToggleClick.bind(this);
        this.atlasNavigartion = this.atlasNavigartion.bind(this);
        this.state = {isShow: true};
    };

    /**
     * 点击图片区域隐藏文字、评论条
     * @props {commentBarToggle}
     */

    handleToggleClick() {
        let {commentBarToggle} = this.props;
        this.setState({isShow: !this.state.isShow});
        let {isShow} = this.state;
        commentBarToggle(!isShow);
    };

    /**
     * 末页显示顶部导航
     * 末页隐藏评论条
     * @func {atlasNavigartion}
     */

    atlasNavigartion(last) {
        if (last) {window.document.getElementsByTagName('html')[0].className = 'themeBlack atlasLast';} 
            else {window.document.getElementsByTagName('html')[0].className = 'themeBlack';}
    };

    componentDidUpdate() {
        window.document.getElementsByTagName('html')[0].className = 'themeBlack';
    };

    render() {
        const {items, atlas, height} = this.props;
        const {isShow} = this.state;
        return (
            <div className="atlasSwipeContainerOuter wrapId" style={{height: height}}>
                <section className="atlasSwipeContainer" style={{height: height}}>
                    <ReactSwipe
                        className="reactSwipeAtlas"
                        swipeOptions={{speed: 600, continuous: false, callBack: this.atlasNavigartion}}
                        style={{
                            container: {
                                height: height,
                                overflow: 'hidden',
                                visibility: 'hidden',
                                position: 'relative'
                            },
                            wrapper: {
                                height: height,
                                overflow: 'hidden',
                                position: 'relative'
                            },
                            child: {
                                height: height,
                                float: 'left',
                                width: '100%',
                                position: 'relative',
                                transitionProperty: 'transform',
                                overflow: 'hidden'
                            }
                        }}
                        key={`${items.newsId}${items.subject}`}>
                        {atlas.map((row, i) => (
                            <div>
                                <figure className="atlasSwipe" style={{height: height}} key={`atlasSwipeList${i}${row.picUrl}`}>
                                    <img className="atlasSwipeImg"
                                         src={row.picUrl}
                                         onError={(e) => {e.target.src=require('../img/bg_error.png')}}
                                         alt="{items.subject}" />
                                    <div className={`atlasTips ${isShow?'':'isDetailsHide'}`}>
                                        <div className="atlasTipsSliderTag">
                                            <span>{i+1}</span>
                                            <span>/</span>
                                            <span>{atlas.length}</span>
                                        </div>
                                        <div className="atlasTitleDescContainer">
                                            <figcaption>{items.subject}</figcaption>
                                            <p>{row.desc}</p>
                                        </div>
                                    </div>
                                    <div className="photoMask" style={{height: height}} onClick={this.handleToggleClick}></div>
                                </figure>
                            </div>
                        ))}
                        <div>
                            <figure className="atlasSwipe" style={{height: height}} key={`${items.newsId}${items.subject}last`}>
                                <div className="atlasLastContainer">
                                    {items.picsList.map((row, i) => (
                                        <Link to={{
                                            pathname: row.newsUrl ? row.newsUrl.slice(4) : row.newsUrl
                                        }} key={`picsList${i}${row.picsArray[0]}`}>
                                            <img src={row.picsArray[0]}
                                                 onError={(e) => {e.target.src=require('../img/bg_error.png')}}
                                                 alt="" />
                                            <p>{row.subject}</p>
                                        </Link>
                                    ))}
                                </div>
                            </figure>
                        </div>
                    </ReactSwipe>
                </section>
            </div>
        );
    };
};