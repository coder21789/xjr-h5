/**
 *
 * 直播code配置
 *
 */

const liveBar = [
    {code: '0', path:'', name: '日历'},
    {code: '4', path:'cj/', name: '财经'},
    {code: '5', path:'gp/', name: '股票'},
    {code: '15', path:'wh/', name: '外汇'}
];

const liveReflect = {
    rl: {code: 0},
    cj: {code: 4},
    gp: {code: 5},
    wh: {code: 15}
};

const liveLevel = [
    {name: '低', important: ''},
    {name: '中', important: 'important2'},
    {name: '高', important: 'important3'}
];

const liveDate = {
    'Mon': '周一',
    'Tue': '周二',
    'Wed': '周三',
    'Thu': '周四',
    'Fri': '周五',
    'Sat': '周六',
    'Sun': '周日'
};

export default {
    liveBar,
    liveReflect,
    liveLevel,
    liveDate
};