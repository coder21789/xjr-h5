/**
 *
 * 话题列表组件
 *
 */

import React, {Component} from 'react';
import Loading from '../common/Loading';
import TopicCollection from './TopicCollection';
import TopicDetails from './TopicDetails';
import {resizeNavigationBar} from '../../lib/interactive';

export default class TopicList extends Component {
    componentDidMount() {
        resizeNavigationBar('f5f5f5', '0.02667', '1.17333');
    };

    componentDidUpdate() {
        resizeNavigationBar('f5f5f5', '0.02667', '1.17333');
    };

    componentWillUnmount() {
        resizeNavigationBar('ffffff', '0', '2.24');
    };

    render() {
        const {
            collection,
            items,
            isFetching,
            itemsDetails,
            isFetchingDetails,
            fontSize
        } = this.props;
        return (
            <div>
                {(isFetching||isFetchingDetails)?<Loading />:null}
                {!collection?(
                    <div>
                        {items&&items.list?(items.list).map(item => (
                            <TopicCollection item={item}
                                 key={`topic${item.topicUrl}${(items.list).indexOf(item)}`}
                                 fontSize={fontSize} />
                        )):null}
                    </div>
                ):(itemsDetails?<TopicDetails items={itemsDetails} />:null)}
            </div>
        );
    };
};