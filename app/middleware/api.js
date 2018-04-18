/**
 *
 * 异步Action中间件处理逻辑
 *
 */

export const timeoutScheduler = store => next => action => {
    if (!action.meta || !action.meta.delay) {
        return next(action);
    };
    let timeoutId = setTimeout(
        () => next(action),
        action.meta.delay
    );
    return function cancel() {
        clearTimeout(timeoutId);
    };
};

export const callAPIMiddleware = ({dispatch, getState}) => {
    return next => action => {
        const {
            types,
            callAPI,
            shouldCallAPI = () => true,
            payload = {}
        } = action;
        if (!types) {
            return next(action);
        }
        if (
            !Array.isArray(types) ||
            types.length !== 2 ||
            !types.every(type => typeof type === 'string')
        ) {
            throw new Error('Expected an array of two string types.');
        }
        if (typeof callAPI !== 'function') {
            throw new Error('Expected callAPI to be a function.');
        }
        if (!shouldCallAPI(getState())) {
            return;
        }
        const [requestType, successType] = types;
        dispatch({...payload, type: requestType});
        return callAPI().then(
            response => dispatch({...payload, response, type: successType}),
            error => console.log(error)
        );
    };
};