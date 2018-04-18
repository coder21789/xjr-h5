/**
 *
 * 专家集合组件
 *
 */

import React, {Component} from 'react';
import {Link} from 'react-router';
import '../styles/expertCollection.scss';
import seo from '../../config/seoInfo';
import {seoCtrl} from '../../lib/interactive';

export default class ExpertCollection extends Component {
    constructor(props) {
        super(props);
        this.state = {error: false};
        this.handleImgError = this.handleImgError.bind(this);
    };

    handleImgError() {
        this.setState({error: true});
    };

    componentDidMount() {
        const {tkd} = this.props;
        seoCtrl(tkd.title, tkd.keywords, tkd.description);
    };

    render() {
        const {item, newsArray} = this.props;
        return(
            <section className="ExpertCollection">
                <figure>
                    <div className="expertAvatar">
                        <Link
                            to={{
                                pathname: `/zj/${item.expertId}/guandian.html`
                            }}>
                            {this.state.error?
                                <div className="expertAvatarBg"></div>:
                                <img src={item.authorImageUrl}
                                     onError={this.handleImgError}
                                     alt="" />}
                        </Link>
                    </div>
                    {newsArray&&newsArray.length>0?(
                    <Link
                        to={{
                            pathname: `${newsArray[0].newsUrl}`
                        }}>
                        <div className="expertTop">
                            <figcaption>{item.author}</figcaption>
                            <h4>{newsArray[0].subject}</h4>
                            <p>{newsArray[0].summary}</p>
                        </div>
                    </Link>):(
                        <div className="expertTop">
                            <figcaption>{item.author}</figcaption>
                            <h4>还未发布最新观点</h4>
                            <p>还未发布最新观点</p>
                        </div>
                    )}
                </figure>
                <div className="moreSubject">
                    <h4><cite><Link
                        to={{
                            pathname: `/zj/${item.expertId}/guandian.html`
                        }}>其他观点</Link></cite></h4>
                    <ul>
                        {newsArray&&newsArray.length>1?(
                            <li><Link
                                to={{
                                    pathname: `${newsArray[1].newsUrl}`
                                }}>{newsArray[1].subject}</Link></li>
                        ):<li><a>还未发布最新观点</a></li>}
                        {newsArray&&newsArray.length>2?(
                            <li><Link
                                to={{
                                    pathname: `${newsArray[2].newsUrl}`
                                }}>{newsArray[2].subject}</Link></li>
                        ):<li><a>还未发布最新观点</a></li>}
                    </ul>
                </div>
            </section>
        );
    };
};