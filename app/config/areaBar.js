/**
 *
 * 区域code配置
 *
 */

const areaBar = [
    {code: '185', path:'/qq/ytsc/', name: '亚太', enName: 'Asia'},
    {code: '186', path:'/qq/mgsc/', name: '美国', enName: 'American'},
    {code: '187', path:'/qq/ygsc/', name: '英国', enName: 'Britain'},
    {code: '188', path:'/qq/ozsc/', name: '欧洲', enName: 'Europe'},
    {code: '189', path:'/qq/mzsc/', name: '美洲', enName: 'Americas'},
    {code: '190', path:'/qq/qtsc/', name: '其他', enName: 'Others'}
];

const areaReflect = {
    ytsc: {code: 'ytsc', numberCode: 185, name: '亚太'},
    mgsc: {code: 'mgsc', numberCode: 186, name: '美国'},
    ygsc: {code: 'ygsc', numberCode: 187, name: '英国'},
    ozsc: {code: 'ozsc', numberCode: 188, name: '欧洲'},
    mzsc: {code: 'mzsc', numberCode: 189, name: '美洲'},
    qtsc: {code: 'qtsc', numberCode: 190, name: '其他'}
};

export default {
    areaBar,
    areaReflect
};