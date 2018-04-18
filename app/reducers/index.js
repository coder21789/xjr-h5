/**
 *
 * 根Reducer模块
 *
 */

import {routerReducer as routing} from 'react-router-redux';
import {combineReducers} from 'redux';
import {postNewsLive} from './postNewsLive';
import {postNewsExpert, postNewsExpertDetails} from './postNewsExpert';
import {postNewsTopic, postNewsTopicDetails} from './postNewsTopic';
import {postNews} from './postNews';
import {postNewsRange} from './postNewsRange';
import {postNewsAtlas, postNewsAtlasDetails} from './postNewsAtlas';
import {postReviewList, postReviewDetails} from './postNewsComment';
import {postNode, postAppDownLoad, postWindowObject} from './postNode';
import {postNewsEvent, postNewsEventDetails} from './postNewsEvent';
import {postNewsWord} from './postNewsWord';
import {postTingAuthor, postTingAudio, postAdCooperate} from './postTing';
import {postNewsFinance, postNewsFinanceDetails} from './postNewsFinance';
import {
    postNewsRecommend,
    postNewsRecommendQq,
    postNewsRecommendChannel
} from './postNewsRecommend';
import {
    postWechat, 
    postSpringReviewList, 
    postSpringReviewAdd, 
    postSpringShareList, 
    postSpringShareAdd, 
    postSpringReviewImage
} from './postUser';

const rootReducer = combineReducers({
    routing,
    postNewsRecommend,
    postNewsRecommendQq,
    postNewsLive,
    postNewsExpert,
    postNewsExpertDetails,
    postNewsTopic,
    postNewsTopicDetails,
    postNews,
    postNewsRange,
    postNewsRecommendChannel,
    postNewsAtlas,
    postNewsAtlasDetails,
    postReviewList,
    postReviewDetails,
    postNode,
    postAppDownLoad,
    postWindowObject,
    postNewsEvent,
    postNewsEventDetails,
    postNewsWord,
    postTingAuthor,
    postTingAudio,
    postAdCooperate,
    postNewsFinance,
    postNewsFinanceDetails,
    postWechat,
    postSpringReviewList,
    postSpringReviewAdd,
    postSpringShareList,
    postSpringShareAdd,
    postSpringReviewImage
});

export default rootReducer;