/**
 *
 * 单项选择弹出框组件
 *
 */

import React, {Component} from 'react';
import '../styles/shareDialog.scss';

export default class CompanyScale extends Component {
    constructor(props) {
        super(props);
        this.dispatchScale = this.dispatchScale.bind(this);
        this.state = {height: '100%'};
    };

    /**
     * 弹出框数据回传父组件
     * @func {transformModel}
     */

    dispatchScale(e) {
        let value = e.target.innerText;
        let {transformModel, handleDialogHide} = this.props;
        transformModel(value);
        handleDialogHide();
    };

    componentDidMount() {
        let _innerHeight = window.innerHeight;
        this.setState({height: `${_innerHeight}px`});
    };

    render() {
        const {handleDialogHide, companyScale} = this.props;
        const {height} = this.state;
        const scale = ['0-100人', '100-500人', '500人以上'];
        return (
            <section className="ShareDialog" style={{height: height}}>
                <div className="shareDialogClose" onClick={handleDialogHide}></div>
                <div className="shareDialogContainer CompanyScaleDialog">
                    <div className="CompanyScaleDialogCloseBtn">
                        <span onClick={handleDialogHide}>取消</span>
                        <p>公司规模</p>
                    </div>
                    <ul className="CompanyScaleContainer">
                        {scale.map((item, i) => <li data-scale={i+1} key={`scaleMap${i}`} 
                            onClick={e => this.dispatchScale(e)}
                            className={companyScale ? (companyScale === item ? 'CompanyScaleSeclected' : '')
                             : (i === 0 ? 'CompanyScaleSeclected' : '')}>{item}</li>)}
                    </ul>
                </div>
            </section>
        );
    };
};