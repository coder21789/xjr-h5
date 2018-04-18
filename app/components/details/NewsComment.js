/**
 *
 * 详情评论组件
 * 老版评论区已移除
 *
 */

import React, {Component} from 'react';
import '../styles/newsComment.scss';

export default class NewsComment extends Component {
    render() {
        const {items} = this.props;
        return (
            <section className="NewsComment">
                <div className="newsUserComment">
                    {/*<img src={require('../img/comment@3x.png')} alt="" />*/}
                    <h4>热门评论</h4>
                </div>
                {items.map((item, i) => (
                    <CommentList row={item} key={`comment${item.createDate}${i}`} />
                ))}
            </section>
        );
    };
};

function CommentList(props) {
    return (
        <div className="CommentList">
            <figure>
                <img src={props.row.photoImageUrl}
                     onError={(e) => {e.target.src=require('../img/user_avatar_default@3x.png')}}
                     alt={props.row.name} />
                <div className="userCommentId">
                    <figcaption>{props.row.name}</figcaption>
                    <time>{props.row.createDate}</time>
                </div>
            </figure>
            <p>{props.row.content}</p>
        </div>
    );
};