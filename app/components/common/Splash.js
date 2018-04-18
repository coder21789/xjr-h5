/**
 *
 * 默认显示组件
 *
 */

import React, {Component} from 'react';
import '../styles/splash.scss';

export default class Splash extends Component {
    render() {
        return (
            <div className="SplashContainer">
                <section className="splash"></section>
            </div>
        );
    };  
};