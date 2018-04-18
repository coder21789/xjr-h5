/**
 *
 * 区域集合组件
 *
 */

import React, {Component} from 'react';
import {Link} from 'react-router';
import areaBar from '../../config/areaBar';
import '../styles/suggestAeraCollection.scss';

export default class SuggestAeraCollection extends Component {
    render() {
        return (
            <section className="SuggestAeraCollection">
                {(areaBar.areaBar).map(areaBar => (
                    <Link key={areaBar.code}
                        to={{
                        pathname: areaBar.path
                    }}>
                        <figure className={areaBar.enName}>
                            <div className="areaSubject">
                                <img src={require(`../img/${areaBar.enName}@3x.png`)}
                                     onError={(e) => {e.target.src=require('../img/bg_error.png')}}
                                     alt="" />
                                <figcaption>{areaBar.name}<em>{areaBar.enName}</em></figcaption>
                            </div>
                        </figure>
                    </Link>
                ))}
            </section>
        );
    };
};