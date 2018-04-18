/**
 *
 * seo数据配置
 *
 */

export async function seoCtrl(route, store, config) {
    const _route = route.path;
    // console.log(_route);
    switch (_route) {
        case '*/*-d-*.html':
            return {
                subject: store.postNews.content.resultBody.subject,
                summary: store.postNews.content.resultBody.summary,
                keywords: config.seo.index.keywords
            };
        case 'zj/*/guandian.html':
            return {
                subject: `${store.postNewsExpertDetails.items.resultBody.expert.author}财经分析师,新融街xinrongnews.com`,
                summary: `${store.postNewsExpertDetails.items.resultBody.expert.desc}`,
                keywords: `${store.postNewsExpertDetails.items.resultBody.expert.author}财经分析师`
            };
        case 'ht/:collection':
            return {
                subject: `${store.postNewsTopicDetails.items.resultBody.desc.subject}-新融街xinrongnews.com`,
                summary: store.postNewsTopicDetails.items.resultBody.desc.summary,
                keywords: store.postNewsTopicDetails.items.resultBody.desc.subject
            };
        case '*/*.html':
            return {...store.postNewsRecommendChannel.items.resultBody.tkd};
        case 'cj':
        case 'qq':
        case 'gp':
        case 'wh':
        case 'jj':
        case 'qh':
        case 'lc':
            return {...store.postNewsRecommend.items.resultBody.tkd};
        case 'qq/ytsc':
        case 'qq/mgsc':
        case 'qq/ygsc':
        case 'qq/ozsc':
        case 'qq/mzsc':
        case 'qq/fzsc':
            return {...store.postNewsRecommendQq.items.resultBody.tkd};
        case 'tj':
            return {...store.postNewsAtlas.items.resultBody.tkd};
        case 'tj/:atlas':
            return Object.assign({}, config.seo.index,
                {
                    subject: `${store.postNewsAtlasDetails.items.resultBody.subject}-新融街xinrongnews.com`,
                    summary: `${store.postNewsAtlasDetails.items.resultBody.subject}`,
                    keywords: `${store.postNewsAtlasDetails.items.resultBody.subject}`
                });
        case 'cj/dashijian.html':
            return {...store.postNewsEvent.items.resultBody.tkd};
        case 'cj/dashijian/*-d-*.html':
            return {
                subject: `${store.postNewsEventDetails.items.resultBody.event.subject}-新融街xinrongnews.com`,
                summary: `${store.postNewsEventDetails.items.resultBody.event.subject}`,
                keywords: `${store.postNewsEventDetails.items.resultBody.event.subject}`
            };
        case 'word/*.html':
            return {...store.postNewsWord.items.resultBody.tkd};
        case 'review/list/:reviewId':
            return Object.assign({}, config.seo.index,
                {subject: `${store.postReviewList.items.resultBody.subject}-新融街xinrongnews.com`});
        case 'review/detail/:replyId':
            return Object.assign({}, config.seo.index,
                {subject: `${store.postReviewDetails.items.resultBody.reviewDetail.content}-新融街xinrongnews.com`});
        case 'audio/:audio':
            return {
                subject: `${store.postTingAudio.items.resultBody.main.subject}`,
                summary: `${store.postTingAudio.items.resultBody.main.introduction}`,
                keywords: `${store.postTingAudio.items.resultBody.main.nickName}`
            };
        case 'author/:author':
            return {
                subject: `${store.postTingAuthor.items.resultBody.nickName}`,
                summary: `${store.postTingAuthor.items.resultBody.introduction}`,
                keywords: `${store.postTingAuthor.items.resultBody.nickName}`
            };    
        case 'zb(/:catId)':
            return config.seo.zb;
        case 'hq/gp':
            return config.seo.gphq;
        case 'hq/wh':
            return config.seo.whhq;
        case 'hq/jj':
            return config.seo.jjhq;
        case 'hq/qh':
            return config.seo.qhhq;
        case 'hq/zq':
            return config.seo.zqhq;
        case 'zj':
            return {...store.postNewsExpert.items.resultBody.tkd};
        case 'ht':
            return config.seo.ht;
        case 'hezuodengji.html':
            return config.seo.cooperate;
        case 'dhcj':
            return {...store.postNewsFinance.items.resultBody.tkd};
        case 'dhcj/*-d-*.html':
            return {
                subject: `${store.postNewsFinanceDetails.items.resultBody.news.subject}`,
                summary: `${store.postNewsFinanceDetails.items.resultBody.news.summary}`,
                keywords: `${store.postNewsFinanceDetails.items.resultBody.news.subject}`
            };
        default:
            if (store.postNewsRecommend.items.resultBody) {
                return {...store.postNewsRecommend.items.resultBody.tkd};
            } else {
                return config.seo.index;
            }
    }
};