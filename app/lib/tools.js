/**
 * 工具类
 * @type {{
 *  throttle: throttle, 
 *  debounce: debounce, 
 *  quickSort: quickSort
 * }}
 */

module.exports = {
    throttle,
    debounce,
    quickSort,
    required,
    maxLength,
    isOnlyCnEn,
    isOnlyCnEnNum,
    isOnlyCnEnNumTag,
    isPhone,
    isWechat,
    maxLengthIgnore,
    validator
};

/**
 * form字段验证规则
 * @object {businessReg}
 */

//必填
function required(val) {
    return val && val.length;
};

//最大字符数限制
function maxLength(len) {
    return function(val) {
        return val && val.length <= len;
    };
};

//英文、中文
function isOnlyCnEn(val) {
    return /^[a-zA-Z\u4e00-\u9fa5]+$/i.test(val);
};

//英文、中文、数字
function isOnlyCnEnNum(val) {
    return /^[a-zA-Z0-9\u4e00-\u9fa5]+$/i.test(val);
};

//英文、中文、数字、符号
function isOnlyCnEnNumTag(val) {
    return /^[\u4e00-\u9fa5，。！、……a-zA-Z\d]+$/i.test(val);
};

//手机号码
function isPhone(val) {
    return /^1[0-9]{10}$/i.test(val);
};

//有值时验证微信号
function isWechat(val) {
    if (val) { return /^[a-zA-Z\d_]{5,}$/i.test(val); }
    else { return true; }
};

//有值时验证最大字符数
function maxLengthIgnore(len) {
    return function(val) {
        if (val) { return val && val.length <= len; } 
        else { return true; }
    };
};

/**
 * form字段实时验证控制错误提示显示
 * @params {field, id, len}
 */

function validator(field, id, len) {
    let {model, valid, pristine, focus} = field;
    console.log(field);
    var dom;
    if (!pristine) dom = window.document.getElementsByClassName(id);
    if (dom && len) dom[0].setAttribute('maxlength', len);
    if (valid) { dom && dom[0].classList.remove('validate_error'); } 
    if (!valid && !focus) { dom && dom[0].classList.add('validate_error'); }
    return field.touched && !field.focus;
};

/**
 * 函数节流
 * @param func
 * @param wait
 * @param mustRun
 * @returns {Function}
 */

function throttle(func, wait, mustRun) {
    var timeout,
        startTime = new Date();
    return function() {
        var context = this,
            args = arguments,
            curTime = new Date();
        clearTimeout(timeout);
        if (curTime - startTime >= mustRun) {
            func.apply(context, args);
            startTime = curTime;
        } else {
            timeout = setTimeout(func, wait);
        }
    };
};

/**
 * 函数防抖
 * @param func
 * @param wait
 * @param immediate
 * @returns {Function}
 */

function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this,
            args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate & !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};

/**
 * 快速排序算法
 * @param arr
 * @returns {*}
 */

function quickSort(arr) {
    if (arr.length <= 1) return arr;
    let pivotIndex = Math.floor(arr.length / 2);
    let pivot = arr.splice(pivotIndex, 1)[0];
    let left = [];
    let right = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < pivot) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }
    return quickSort(left).contact([pivot], quickSort(right));
};