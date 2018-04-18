/**
 *
 * 其他合作组件
 *
 */

import React, {Component} from 'react';
import {Control, Field, Errors} from 'react-redux-form';
import {
  validator,
  required,
  maxLength,
  isOnlyCnEn,
  isOnlyCnEnNum,
  isOnlyCnEnNumTag,
  isPhone,
  isWechat,
  maxLengthIgnore
} from '../../lib/tools'; 

export default class AdOther extends Component {
  constructor(props) {
    super(props);
    this.validator = this.validator.bind(this);
  };

  /**
   * form字段实时验证控制错误提示显示
   * @params {field, id, len}
   */

  validator(field, id, len) {
    return validator.call(this, field, id, len);
  };

	render() {
		const {handleDialogShow} = this.props;
    return (
      <div className="fieldContainer">
        <div className="field">
          <label>姓名</label>
          <Control.text
            model=".name"
            className="name"
            validators={{
              required,
              maxLength: maxLength(10),
              isOnlyCnEn
            }}
            placeholder="您的姓名"
          />
          <Errors
            className="errors"
            model="user.name"
            show={field => this.validator(field, 'name', '10')}
            messages={{
              required: '请填写您的姓名',
              maxLength: (val) => val && '请填写正确的姓名',
              isOnlyCnEn: (val) => val && '请填写正确的姓名'
            }}
          />  
        </div>
        <div className="field">
          <label>手机号</label>
          <Control.text
            model=".mobile"
            className="mobile"
            validators={{
              required,
              isPhone
            }}
            placeholder="输入手机号码"
          />
          <Errors
            className="errors"
            model="user.mobile"
            show={field => this.validator(field, 'mobile', '11')}
            messages={{
              required: '请填写您的手机号',
              isPhone: (val) => val && '请填写正确的手机号'
            }}
          />  
        </div>
        <div className="field">
          <label>微信号</label>
          <Control.text
            model=".weixin"
            className="weixin"
            validators={{
              maxLengthIgnore: maxLengthIgnore(20),
              isWechat
            }}
            placeholder="选填"
          />
          <Errors
            className="errors"
            model="user.weixin"
            show={field => this.validator(field, 'weixin', '20')}
            messages={{
              maxLengthIgnore: (val) => val && '请填写正确的微信号',
              isWechat: (val) => val && '请填写正确的微信号'
            }}
          />  
        </div>
        <div className="field">
          <label>岗位</label>
          <Control.text
            model=".positionName"
            className="positionName"
            validators={{
              required,
              maxLength: maxLength(10),
              isOnlyCnEn
            }}
            placeholder="您的岗位名称"
          />
          <Errors
            className="errors"
            model="user.positionName"
            show={field => this.validator(field, 'positionName', '10')}
            messages={{
              required: '请填写您的岗位名称',
              maxLength: (val) => val && '请填写正确的岗位名称',
              isOnlyCnEn: (val) => val && '请填写正确的岗位名称'
            }}
          />  
        </div>
        <div className="field">
          <label>公司名称</label>
          <Control.text
            model=".companyName"
            className="companyNameAd"
            validators={{
              required,
              maxLength: maxLength(20),
              isOnlyCnEnNum
            }}
            placeholder="您的公司名称"
          />
          <Errors
            className="errors"
            model="user.companyName"
            show={field => this.validator(field, 'companyName', '20')}
            messages={{
              required: '请填写您的公司名称',
              maxLength: (val) => val && '请填写正确的公司名称',
              isOnlyCnEnNum: (val) => val && '请填写正确的公司名称'
            }}
          />  
        </div>
        <div className="field fieldSuggest">
          <label>建议</label>
          <Control.textarea
            model=".suggest"
            className="suggest"
            validators={{
              required,
              maxLength: maxLength(200),
              isOnlyCnEnNumTag
            }}
            placeholder="您的建议"
          />
          <Errors
            className="errors"
            model="user.suggest"
            show={field => this.validator(field, 'suggest', '200')}
            messages={{
              required: '请填写您的建议',
              maxLength: (val) => val && '请填写正确的建议格式',
              isOnlyCnEnNumTag: (val) => val && '请填写正确的建议格式'
            }}
          />  
        </div>
      </div>
    );
  };
};