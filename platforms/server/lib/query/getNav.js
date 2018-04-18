/**
 * 导航区改版
 * 7.25
 **/

var {
    resultMapNormal
} = require('../lib/setDateFormat').default;
var getAnswerList = require('./getAnswerList');

export async function getCjNav(code, _this) {
    let category = _this.mysql('category');
    let recommend = _this.mysql('recommend');

    let getCjCode = await _this.findAllMap([{
        model: category,
        arg: {
            order: 'order_no DESC',
            attributes: ['code', 'name'],
            where: {
                parent_id: 4,
                deleted: 0
            }
        }
    }, {
        model: recommend,
        arg: {
            order: 'publish_time DESC',
            attributes: ['news_recommend_subject', 'news_url'],
            limit: 20,
            where: {
                category_code: 'cj',
                state: 1
            }
        }
    }]);

    getCjCode = await _this.resultMap(getCjCode);
    const getCjRecommend = getCjCode[1];
    getCjCode = getCjCode[0];
    // console.log(getCjRecommend);

    return {
        getCjCode: getCjCode,
        getCjRecommend: getCjRecommend
    }
};

export async function getGpNav(code, _this) {
    let category = _this.mysql('category');

    let getGpCode = await _this.findAllMap([{
        model: category,
        arg: {
            order: 'order_no ASC',
            attributes: ['code', 'name'],
            where: {
                parent_id: 5,
                deleted: 0
            }
        }
    }]);

    getGpCode = await _this.resultMap(getGpCode);
    getGpCode = getGpCode[0];
    // console.log(getGpCode);

    return {
        getGpCode: getGpCode
    }
};

export async function getWhNav(code, _this) {
    let category = _this.mysql('category');

    let getWhCode = await _this.findAllMap([{
        model: category,
        arg: {
            order: 'order_no ASC',
            attributes: ['code', 'name'],
            where: {
                parent_id: 15,
                deleted: 0
            }
        }
    }]);

    getWhCode = await _this.resultMap(getWhCode);
    getWhCode = getWhCode[0];
    // console.log(getWhCode);

    return {
        getWhCode: getWhCode
    }
};

export async function getBxNav(code, _this) {
    let category = _this.mysql('category');
    let recommend = _this.mysql('recommend');

    let getBxCode = await _this.findAllMap([{
        model: category,
        arg: {
            order: 'order_no ASC',
            attributes: ['code', 'name'],
            where: {
                parent_id: 181,
                deleted: 0
            }
        }
    }, {
        model: recommend,
        arg: {
            order: 'publish_time DESC',
            attributes: ['news_recommend_subject', 'news_url'],
            limit: 20,
            where: {
                category_code: 'bx',
                state: 1
            }
        }
    }]);

    getBxCode = await _this.resultMap(getBxCode);
    const getBxRecommend = getBxCode[1];
    getBxCode = getBxCode[0];
    // console.log(getBxRecommend);

    return {
        getBxCode: getBxCode,
        getBxRecommend: getBxRecommend
    }
};

export async function getYyNav(code, _this) {
    let category = _this.mysql('category');
    let recommend = _this.mysql('recommend');

    let getYyCode = await _this.findAllMap([{
        model: category,
        arg: {
            order: 'order_no ASC',
            attributes: ['code', 'name'],
            where: {
                parent_id: 183,
                deleted: 0
            }
        }
    }, {
        model: recommend,
        arg: {
            order: 'publish_time DESC',
            attributes: ['news_recommend_subject', 'news_url'],
            limit: 20,
            where: {
                category_code: 'yy',
                state: 1
            }
        }
    }]);

    getYyCode = await _this.resultMap(getYyCode);
    const getYyRecommend = getYyCode[1];
    getYyCode = getYyCode[0];
    // console.log(getYyCode);

    return {
        getYyCode: getYyCode,
        getYyRecommend: getYyRecommend
    }
};

export async function getQhNav(code, _this) {
    let category = _this.mysql('category');
    let recommend = _this.mysql('recommend');

    let getQhCode = await _this.findAllMap([{
        model: category,
        arg: {
            order: 'order_no ASC',
            attributes: ['code', 'name'],
            where: {
                parent_id: 182,
                deleted: 0
            }
        }
    }, {
        model: recommend,
        arg: {
            order: 'publish_time DESC',
            attributes: ['news_url', 'news_pic', 'news_recommend_subject'],
            where: {
                recommend_code: 'web_qh_jrrs_dhq',
                state: 1
            }
        }
    }]);

    getQhCode = await _this.resultMap(getQhCode);
    const getQhRecommend = getQhCode[1];
    getQhCode = getQhCode[0];
    // console.log(getQhRecommend);

    return {
        getQhCode: getQhCode,
        getQhRecommend: getQhRecommend
    }
};

export async function getZjNav(code, _this) {
    let category = _this.mysql('category');
    let news = _this.mysql('news');

    let parentId = await _this.setQueryListMap([{
        sqlQuery: `SELECT * FROM CATEGORY WHERE CODE='zj' AND DELETED=0`
    }]);
    parentId = parentId[0][0].ID;
    // console.log(parentId);

    let answerList = await getAnswerList.getAnswerList(_this, {
        status: 2,
        pageSize: 10
    });
    // console.log(answerList.result);
    if (answerList.result) var getZjAnswer = answerList.result;

    let getZjCode = await _this.findAllMap([{
        model: category,
        arg: {
            order: 'order_no DESC',
            attributes: ['code', 'name'],
            where: {
                parent_id: parentId,
                deleted: 0
            }
        }
    }, {
        model: news,
        arg: {
            order: "publish_time DESC",
            limit: 10,
            attributes: ['news_url', 'subject', 'publish_time'],
            where: {
                category_id: 126,
                status: 1
            }
        }
    }]);

    getZjCode = await resultMapNormal(getZjCode);
    const getZjNewsTop10 = getZjCode[1];
    getZjCode = getZjCode[0];
    // console.log(getZjNewsTop10);

    return {
        getZjCode: getZjCode,
        getZjNewsTop10: getZjNewsTop10,
        getZjAnswer: getZjAnswer
    }
};

export async function getHjNav(code, _this) {
    let category = _this.mysql('category');

    let getHjCode = await _this.findAllMap([{
        model: category,
        arg: {
            order: 'order_no DESC',
            attributes: ['code', 'name'],
            where: {
                parent_id: 184,
                deleted: 0
            }
        }
    }]);

    getHjCode = await _this.resultMap(getHjCode);
    getHjCode = getHjCode[0];
    // console.log(getHjCode);

    return {
        getHjCode: getHjCode
    }
};

export async function getZcNav(code, _this) {
    let category = _this.mysql('category');

    await _this.proxy({
        zcTodayNews: 'xinrongnews:post:news-api/web/news/top'
    }, {
        params: {
            catCode: 'zc',
            dayNum: 1,
            size: 10
        }
    });
    const zcTodayNews = _this.backData.zcTodayNews;
    // console.log(zcTodayNews);

    let getZcCode = await _this.findAllMap([{
        model: category,
        arg: {
            order: 'order_no ASC',
            attributes: ['code', 'name'],
            where: {
                parent_id: 179,
                deleted: 0
            }
        }
    }]);

    getZcCode = await _this.resultMap(getZcCode);
    getZcCode = getZcCode[0];
    // console.log(getZcCode);

    return {
        getZcCode: getZcCode,
        zcTodayNews: zcTodayNews
    }
};

export async function getLcNav(code, _this) {
    let category = _this.mysql('category');
    let recommend = _this.mysql('recommend');

    let getLcCode = await _this.findAllMap([{
        model: category,
        arg: {
            order: 'order_no ASC',
            attributes: ['code', 'name'],
            where: {
                parent_id: 7,
                deleted: 0
            }
        }
    }, {
        model: recommend,
        arg: {
            order: 'publish_time DESC',
            attributes: ['news_recommend_subject', 'news_url'],
            limit: 20,
            where: {
                category_code: 'lc',
                state: 1
            }
        }
    }]);

    getLcCode = await _this.resultMap(getLcCode);
    const getLcRecommend = getLcCode[1];
    getLcCode = getLcCode[0];
    // console.log(getLcRecommend);

    return {
        getLcCode: getLcCode,
        getLcRecommend: getLcRecommend
    }
};