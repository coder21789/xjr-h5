/**
 *
 * 确定弹出框组件
 *
 */

import React, {Component} from 'react';
import '../styles/shareDialog.scss';

export default class CompanyDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {height: '100%'};
    };

    componentDidMount() {
        let _innerHeight = window.innerHeight;
        this.setState({height: `${_innerHeight}px`});
    };

    render() {
        const {handleDialogHide} = this.props;
        const {height} = this.state;
        return (
            <section className="ShareDialog CompanyDialog" style={{height: height}}>
                <div className="shareDialogClose" onClick={handleDialogHide}></div>
                <div className="shareDialogContainer">
                    <div className="CompanyScaleDialogCloseBtn">
                        <span onClick={handleDialogHide}>确定</span>
                    </div>
                    <img src={require('../img/cooperate_pass@3x.png')} />
                    <h1>提交成功</h1>
                    <p>我们将在3个工作日内与您联系，请保证手机畅通</p>
                </div>
            </section>
        );
    };
};