/**
 * 用户登录接口
 * @func wechat
 */

const crypto = require('crypto');
const path = require('path');
const util = require('util');
const OSS = require('ali-oss');
const co = require('co');
const moment = require('moment');
const jsSHA = require('jssha');
const status = require('../../lib/status');

function aesEncrypt(data, key) {
  const cipher = crypto.createCipher('aes192', key);
  let crypted = cipher.update(data, 'utf8', 'hex');
  crypted += cipher.final('hex');
  return crypted;
};

function aesDecrypt(encrypted, key) {
  const decipher = crypto.createDecipher('aes192', key);
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
};

function Sha1(str) {
    let sha1 = crypto.createHash('sha1');
    sha1.update(str);
    let res = sha1.digest('hex');
    return res;
};

function calcSignature(ticket, noncestr, ts, url) {
    let str = 'jsapi_ticket=' + ticket + '&noncestr=' + noncestr + '&timestamp='+ ts +'&url=' + url;
    let shaObj = new jsSHA('SHA-1', 'TEXT');
    shaObj.update(str);
    return shaObj.getHash('HEX');
};

/**
 * 微信接口
 * @param {code} 用户code
 */

const wechat = async (ctx) => {
    let {code} = Object.getOwnPropertyNames(ctx.request.body).length > 0 ? ctx.request.body : ctx.query;
    let key = 'xinrongnewsspring';
    console.log(code);
    let decrypted = aesDecrypt(code, key);
    await ctx.proxy({
      access_token: `weixin:get:sns/oauth2/access_token?appid=wx2975e7bf85f812c8&secret=bee7f841db1f10ee9f5b00097bc3bfbd&code=${decrypted}&grant_type=authorization_code`
    });
    let access_token = ctx.backData.access_token;
    await ctx.proxy({
      userinfo: `weixin:get:sns/userinfo?access_token=${access_token.access_token}&openid=${access_token.openid}`
    });
    let userinfo = ctx.backData.userinfo;
    ctx.body = await Object.assign({}, status.scuccess, {resultBody: {userinfo: {openid: userinfo.openid, headimgurl: userinfo.headimgurl, nickname: userinfo.nickname}}});
};

/**
 * 微信签名接口
 * @param {url} url
 */

const signature = async (ctx) => {
  let {url} = Object.getOwnPropertyNames(ctx.request.body).length > 0 ? ctx.request.body : ctx.query;
  await ctx.proxy({
    credential: `weixin:get:cgi-bin/token?grant_type=client_credential&appid=wxdc90678b6188e246&secret=637db0c5f7c582d16b50b1e6b74c98b7`
  });
  let credential = ctx.backData.credential;
  await ctx.proxy({
    jsapi: `weixin:get:cgi-bin/ticket/getticket?access_token=${credential.access_token}&type=jsapi`
  });
  let jsapi = ctx.backData.jsapi;
  let token = {};
  token.appid = 'wxdc90678b6188e246';
  token.noncestr = 'Wm3WZYTPz0wzccnW';
  token.timestamp = Math.floor(Date.now() / 1000);
  // token.signature = Sha1('jsapi_ticket=' + jsapi.ticket + '&noncestr=' + token.noncestr + '&timestamp=' + token.timestamp + '&url=' + url);
  token.signature = calcSignature(jsapi.ticket, token.noncestr, token.timestamp, url);
  // console.log(credential, jsapi, token);
  ctx.body = await Object.assign({}, status.scuccess, {resultBody: {token: token}});
};

/**
 * 微信评论图片上传接口
 * @param {formdata} file
 */

const upload = co.wrap(function* (ctx) {
  const IMG_TYPE = '.jpg .png .gif .ico .bmp .jpeg';
  const MAX_UPLOAD_SIZE = 50*1024*1024;

  const client = new OSS({
      region: 'oss-cn-hangzhou',
      bucket: 'xrj',
      accessKeyId: 'bssHWYaAs07v1mg7',
      accessKeySecret: '4RJRgi0cXdcCdj1QjQfNMv54kBrlYw'
  });

  try {
    let files = JSON.parse(JSON.stringify({files: ctx.request.files})).files;

    if (files && files.length > 0) {
      for (let item in files) {
        let {path, name, size} = files[item];
        let date = moment().format('YYYYMMDD');
        let ext = `.${name.split('.')[name.split('.').length - 1]}`;
        let filename = parseInt(Math.random() * 100) + Date.parse(new Date()).toString() + ext;
        let uploadname = `chunyun/${date}/${filename}`;

        if (!IMG_TYPE.includes(ext.toLowerCase()) || size > MAX_UPLOAD_SIZE) {
          ctx.body = yield Object.assign({}, status.failed, {resultBody: '文件类型错误或者大小超出50M限制'});
        } else {
          let result = yield client.put(uploadname, path);
          ctx.body = yield Object.assign({}, status.scuccess, {resultBody: {'url': `https://img.xinrongnews.com/${result.name}`}});
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
});

/**
 * 微信接口签名凭证
 * @param {string} ajHggkWjKuaszeDq
 */

const MP_verify_ajHggkWjKuaszeDq = async (ctx) => {
  ctx.body = await 'ajHggkWjKuaszeDq';
};

export default {
	wechat,
  signature,
	upload,
  MP_verify_ajHggkWjKuaszeDq
};