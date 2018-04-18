/**
 *
 * 合作登记列表组件
 *
 */

import React, {Component} from 'react';
import {LocalForm, actions, Control} from 'react-redux-form';
import AdCooperate from './AdCooperate';
import AdOther from './AdOther';
import CompanyScale from './CompanyScale';
import CompanyDialog from './CompanyDialog';
import {fetchAdCooperate} from '../../actions/actionTypes';
import {resetAdCooperate} from '../../actions/actionCreator';
import {seoCtrl, resizeNavigationBar} from '../../lib/interactive';
import '../styles/ad.scss';

export default class AdList extends Component {
    constructor(props) {
        super(props);
        this.transformModel = this.transformModel.bind(this);
        this.adCooperateTypeChange = this.adCooperateTypeChange.bind(this);
        this.backendDispatch = this.backendDispatch.bind(this);
        this.formReset = this.formReset.bind(this);
        this.handleDialogShow = this.handleDialogShow.bind(this);
        this.handleDialogHide = this.handleDialogHide.bind(this);
        this.handleCompanyDialogHide = this.handleCompanyDialogHide.bind(this);
        this.state = {dialogShow: false, companyDialogShow: false, companyScale: undefined, adCooperateType: 1};
    };

    /**
     * form数据更新至store
     * @params {dispatch}
     */

    attachDispatch(dispatch) {
        this.formDispatch = dispatch;
    };

    /**
     * dispatch更新字段数据
     * @func {formDispatch}
     */

    changeModel(item) {
        let {companyScale} = this.state; 
        this.formDispatch(actions.change(item, companyScale));
    };

    /**
     * 公司规模弹出框数据回传更新字段
     * @params {companyScale}
     */

    transformModel(val) {
        this.setState({companyScale: val});
    };

    /**
     * 动态获取广告服务类型
     * @params {e}
     */

    adCooperateTypeChange(e) {
        let {type} = e.changedTouches[0].target.dataset;
        let {dispatch} = this.props;
        this.setState({adCooperateType: Number(type)});
        dispatch(resetAdCooperate());
    };

    /**
     * form数据提交验证并进行数据格式转换
     * @func {companyScale}
     */

    async backendDispatch(val) {
        var {dispatch} = this.props;
        let {adCooperateType} = this.state;
        if (val) {
            let params = Object.assign({type: adCooperateType}, val);
            if (params.companyScale) params.companyScale = companyScale(params.companyScale);
            console.log(params);
            await dispatch(fetchAdCooperate(params, this.formReset(adCooperateType, this, true)));
        }
        function companyScale(name) {
            switch (name) {
                case '0-100人': return 1;
                case '100-500人': return 2;
                case '500人以上': return 3;
                default: return null;
            }
        };    
    };

    /**
     * form数据重置
     * @params {adCooperateType}
     */

    formReset(adCooperateType, ctx, dialog) {
        if (ctx && dialog) ctx.setState({companyDialogShow: true});
        if (ctx) ctx.setState({companyScale: undefined});
        let dom = window.document.getElementsByClassName(`adCooperateType${adCooperateType}`)[0];
        dom.click();
    };

    /**
     * 弹出框显示隐藏
     */

    handleDialogShow() {
        this.setState({dialogShow: true});
    };

    handleDialogHide() {
        this.setState({dialogShow: false});
    };

    handleCompanyDialogHide() {
        this.setState({companyDialogShow: false});
    };

    componentDidMount() {
        resizeNavigationBar('f5f5f5', '0', '0');
    };

    componentDidUpdate(prevProps, prevState) {
        if(prevState.companyScale !== this.state.companyScale) {
            this.changeModel('user.companyScale');
        }
        if(prevState.adCooperateType !== this.state.adCooperateType) {
            this.formReset(this.state.adCooperateType, this);
        }
    };

    componentWillUnmount() {
        resizeNavigationBar('ffffff', '0', '2.24');
    };

    render() {
        const {dialogShow, companyDialogShow, adCooperateType, companyScale} = this.state;
        const type = ['广告合作', '内容合作', '其他'];
        return (
            <div>
                <img className="cooperateIntro"  src={require('../img/cooperate_banner@2x.png')} alt=""
                     onError={(e) => {e.target.src=require('../img/bg_error.png')}} />
                <LocalForm className="localForm" model="user" 
                    getDispatch={(dispatch) => this.attachDispatch(dispatch)}
                    onSubmit={v => this.backendDispatch(v)}>
                        <div className="cooperateTypeContainer">
                            <div className="cooperateType">
                                <section><figure>服务类型</figure><p><span></span></p></section>
                                <div className="adTypeKindContainer">
                                    {type.map((item, i) => <Control.reset model="user" className="adTypeKind"
                                        key={`adTypeKind${i}`}
                                        onTouchEnd={e => this.adCooperateTypeChange(e)}
                                        data-type={i+1}
                                        className={`adCooperateType${i+1} ${adCooperateType - 1 === i ? 'cooperateSelected' : ''}`}>
                                        {item}
                                    </Control.reset>)}
                                </div>
                            </div>
                        </div>
                        {adCooperateType < 3 ? <AdCooperate handleDialogShow={this.handleDialogShow} theme={adCooperateType} />: null}
                        {adCooperateType === 3 ? <AdOther />: null}
                        <button className="submitForm" type="submit">提交</button>
                </LocalForm>
                {dialogShow ? <CompanyScale handleDialogHide={this.handleDialogHide} 
                    transformModel={this.transformModel} companyScale={companyScale} /> : null}
                {companyDialogShow ? <CompanyDialog handleDialogHide={this.handleCompanyDialogHide} /> : null}
            </div>
        );
    };
};