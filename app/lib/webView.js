/**
 * webView方法类
 * @type {{
 *  webviewJavaScriptInterface: webviewJavaScriptInterface, 
 *  showInfoFromJs: showInfoFromJs
 * }}
 */

module.exports = {
    webviewJavaScriptInterface,
    showInfoFromJs
};

/**
 * webView原生方法调用
 * @param props
 * @param json
 * @param boolean
 * @param toNative
 */

function webviewJavaScriptInterface(props, json, boolean, toNative, parmas) {
    var androidExist = webViewExist('android');
    var iosExist = webViewExist('ios');
    // console.log(androidExist, iosExist);
    // if (!androidExist && !iosExist) {return;}
    var result = json(props, parmas);
    if (boolean && result.viewComponetType === 'topicDetails') {return;}
    var resultJsonString = JSON.stringify(result);
    // toNative && console.log(result, resultJsonString);
    toNative && androidExist && window.HtWebView.showInfoFromJs(resultJsonString);
    toNative && iosExist && window.webkit.messageHandlers.showInfoFromJs.postMessage(result);
};

/**
 * webView环境判断
 * @param webView
 * @returns {*}
 */

function webViewExist(webView) {
    switch (webView) {
        case 'android':
            var androidBoolean = window.HtWebView ? true : false;
            return androidBoolean;
        case 'ios':
            var iosBoolean = window.webkit && window.webkit.messageHandlers ? true : false;
            return iosBoolean;
        default: return null;
    }
};

/**
 * webView JSON封装
 * @param props
 * @param boolean
 * @returns {{}}
 */

function showInfoFromJs(props, boolean) {
    // console.log(boolean);
    let viewComponetType = boolean ? boolean : appViewComponetType(props);
    let url = boolean ? null : props.location.pathname;
    var resultNewsInfo = newsInfo(viewComponetType, url, props);
    var result = {};
    result.viewComponetType = viewComponetType;
    // result.url = url;
    result = {...result, ...resultNewsInfo};
    return result;
};

/**
 * webview交互参数定制
 * @param type
 * @param url
 * @param props
 * @returns {{}}
 */

function newsInfo(type, url, props) {
    var newsInfo = {};
    newsInfo.newsUrl = null;
    newsInfo.newsId = null;
    if (type === 'newsDetails') {
        newsInfo.newsUrl = `/app${url}`;
        newsInfo.newsId = props.params.splat[2];
    }
    if (type === 'topicDetails' && props.items) {
        newsInfo.newsUrl = props.items.newsUrl;
        newsInfo.subject = props.items.topicSubject;
        newsInfo.description = props.items.topicDesc;
        newsInfo.topicBanner = props.items.topicPic2;
    }
    // console.log(newsInfo);
    return newsInfo;
};

/**
 * app顶层view调整类型判断
 * @param props
 * @returns {*}
 */

function appViewComponetType(props) {
    let router = props.routes[props.routes.length-1];
    let type = viewComponentType(router.path);
    return type;
};

/**
 * view code类型判断
 * @param type
 * @returns {*}
 */

function viewComponentType(type) {
    switch (type) {
        case 'ht':
            return 'topicList';
        case 'ht/:collection':
            return 'topicDetails';
        case '*/*-d-*.html':
            return 'newsDetails';
        case 'tj':
            return 'atlasList';
        case 'tj/:atlas':
            return 'atlasDetails';
        default: return null;
    }
};