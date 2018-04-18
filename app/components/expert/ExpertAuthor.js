/**
 *
 * 专家信息组件
 *
 */

import React, {Component} from 'react';
import '../styles/expertAuthor.scss';
import {seoCtrl} from '../../lib/interactive';

export default class ExpertAuthor extends Component {
    constructor(props) {
        super(props);
        this.expertToggle = this.expertToggle.bind(this);
        this.expertDescHeight = this.expertDescHeight.bind(this);
        this.state = {expertToggle: false};
    };

    /**
     * 展现简介内容
     */

    expertToggle() {
        let {expertToggle} = this.state;
        this.setState({expertToggle: !expertToggle});
    };

    /**
     * 专家简介内容超过三行隐藏toggle标识
     */

    expertDescHeight(el, button, className) {
        let elDesc = window.document.getElementById(el);
        let elHeight = elDesc.offsetHeight;
        let htmlFontSize = Number(window.document.getElementsByTagName('html')[0].style.fontSize.replace('px', ''));
        let elFontSize = htmlFontSize * 0.32;
        let elEm = Number((elHeight / elFontSize).toFixed(1));
        let toggle = window.document.getElementById(button);
        elEm < 5 ? toggle.classList.add(className) : toggle.classList.remove(className);
    };

    componentDidMount() {
        if (this.props.item) seoCtrl(`${this.props.item.author}财经分析师,新融街xinrongnews.com`, `${this.props.item.author}财经分析师`, this.props.item.desc);
        this.expertDescHeight('expertDesc', 'expertDescToggle', 'expertToggleHide');
    };

    componentDidUpdate() {
        this.expertDescHeight('expertDesc', 'expertDescToggle', 'expertToggleHide');
    };

    render() {
        const {item} = this.props;
        const {expertToggle} = this.state;
        return (
            <section className="ExpertAuthor">
                <figure className="expertAvatarArea">
                    <div className="expertAvatarContainer">
                        <div className="expertAvatarLarger">
                            <div className={`expertAvatarInner ${item.authorImageUrl?'expertAvatarExist':''}`}>
                                <img src={item.authorImageUrl?item.authorImageUrl:require('../img/bg_error.png')}
                                     onError={(e) => {e.target.src=require('../img/bg_error.png')}}
                                     alt="" />
                            </div>
                        </div>
                        <div className="expertSkillsContainer">
                            <div className="expertSummary">
                                <figcaption>{item.author}</figcaption>
                                <h4>{item.job}</h4>
                            </div>
                            <ul className="expertSkillsList">
                                {item.goodAtCategoryNames.length>0&&item.goodAtCategoryNames.map((row, i) => <li>{row}</li>)}
                            </ul>
                        </div>
                    </div>
                </figure>
                <div className="expertSkills"></div>
                <div className={`expertSubject ${expertToggle?'expertDescToggle':''}`}>
                    <h4>专家简介:</h4>
                    <div className="expertDescContainer">
                        <p id="expertDesc">{item.desc}</p>
                    </div>
                    <div id="expertDescToggle" className="expertToggle" onClick={this.expertToggle}><i className="iconfont icon-fanhuijiantou"></i></div>
                </div>
            </section>
        );
    };
};