/**
 *
 * 合作登记列表数据-状态树数据同步
 *
 */

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import AdList from '../components/ad/AdList';

const mapStateToProps = (state, ownProps) => {
    return {
        items: state.postAdCooperate.items
    };
};

@connect(mapStateToProps)
export default class Ad extends Component {
    static propTypes = {
        children: PropTypes.node
    };

    constructor(props) {
        super(props);
    };

    render() {
        const {
            children,
            dispatch,
            items
        } = this.props;
        return (
            <div>
                <AdList dispatch={dispatch} items={items} />
                {children}
            </div>
        );
    };
};