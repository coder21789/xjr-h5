/**
 *
 * 行情code配置
 *
 */

const marketBar = [
    {code: 'gp/', name: '股票'},
    {code: 'wh/', name: '外汇'},
    {code: 'jj/', name: '基金'},
    {code: 'qh/', name: '期货'},
    {code: 'zq/', name: '债券'}
];

const marketFund = [
    {code: 'mix', name: '混合型'},
    {code: 'stock', name: '股票型'},
    {code: 'bond', name: '债券型'}
];

const marketFutures = [
    {code: 'shfe', name: '上期所'},
    {code: 'dce', name: '大商所'},
    {code: 'zce', name: '郑商所'},
    {code: 'buy', name: '外盘'}
];

const marketBonds = [
    {code: 'countryBond', name: '国债'},
    {code: 'enterpriseBond', name: '企债'},
    {code: 'return', name: '可转债'}
];

export default {
    marketBar,
    marketFund,
    marketFutures,
    marketBonds
};