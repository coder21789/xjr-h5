/**
 *
 * 主导航组件
 *
 */

import React, {Component} from 'react';
import {Link} from 'react-router';
import SectionBar from './SectionBar';
import config from '../../config/menuBar';
import '../font/iconfont.css';

export default class NavigationBar extends Component {
    constructor(props) {
        super(props);
        this.handleShowClick = this.handleShowClick.bind(this);
        this.handleHideClick = this.handleHideClick.bind(this);
        this.state = {
            isShowOnce: true,
            isShowMenu: false,
            menuCode: this.props.menuCode
        };
    };

    handleShowClick() {
        this.setState({isShowMenu: true, isShowOnce: false});
    };

    handleHideClick() {
        this.setState({isShowMenu: false, isShowOnce: false});
    };

    componentDidMount() {
        this.setState({menuCode: this.props.menuCode});
    };

    componentWillReceiveProps(nextProps) {
        if (this.props.menuCode !== nextProps.menuCode) {
            this.setState({menuCode: nextProps.menuCode});
        }
    };

    /**
     * 导航功能定制
     * 页面返回、页面名称
     * @props {historyBack,areaName}
     */

    render() {
        const {historyBack, areaName, history} = this.props;
        return (
            <header className="navTop" ref="platformNavigartionBar">
                <div className="navContent">
                    <nav className="navigationBar">
                        {/*{historyBack?<img onClick={history.goBack} className="historyBack" src={require('../img/historyBack@3x.png')} alt=""/>:<img className="avatar" src={require('../img/user_avatar.png')} alt=""/>}*/}
                        {historyBack?<i onClick={history.goBack} className="iconfont icon-fanhuijiantou historyBackIcon"></i>:<img className="avatar" src={require('../img/user_avatar.png')} alt=""/>}
                        <div className="logo">
                            {areaName?(<h4>{areaName}</h4>):<img src={require('../img/logo.png')} alt=""/>}
                        </div>
                        {/*<img className="menu" src={require('../img/menu.png')} alt="" onClick={this.handleShowClick} />*/}
                        <i className="iconfont icon-gengduo menuIcon" onClick={this.handleShowClick}></i>
                    </nav>
                    <SectionBar menuCode={this.state.menuCode} />
                    <Menu isShowMenu={this.state.isShowMenu} isShowOnce={this.state.isShowOnce} onClick={this.handleHideClick} />
                </div>
            </header>
        );
    };
};

function Menu(props) {
    let menuClass = props.isShowOnce ? 'menuHide' : ( props.isShowMenu ? 'menuShow' : 'menuClose' );
    return (
        <section className={`menuBar ${menuClass}`}>
            <div className="menuCloseMask" onClick={props.onClick}></div>
            <div className="menuContent">
                <div className="menuContainer">
                    <figure>
                        <img src={require('../img/icon_menu_logo.png')} alt=""/>
                    </figure>
                    <nav>
                        <ul>
                            {(config.menuBar).map(menuBar => (
                                <li key={menuBar.code}><Link
                                    to={{
                                        pathname: menuBar.path
                                    }}
                                    onClick={props.onClick}>{menuBar.name}
                                </Link></li>
                            ))}
                            {/*<li>默认频道</li>*/}
                        </ul>
                    </nav>
                    <div className="btn_close">
                        <img src={require('../img/btn_close@3x.png')} alt="" onClick={props.onClick} />
                    </div>
                </div>
            </div>
        </section>
    )
};