/**
 *
 * 专家新闻观点列表组件
 *
 */

import React, {Component} from 'react';
import {Link} from 'react-router';
import '../styles/expertNewsList.scss';

export default class ExpertListNormal extends Component {
    render() {
        const {items} = this.props;
        return (
            <section className="ExpertListNormal">
                <ul>
                    {items.map(item => (
                        <li key={`authorList${item.id}${items.indexOf(item)}`}>
                            <Link
                                to={{
                                    pathname: `${item.newsUrl}`
                                }}>
                                <h3>{item.subject}</h3>
                                <p><time>{item.time}</time></p>
                            </Link>
                        </li>
                    ))}
                </ul>
            </section>
        );
    };
};