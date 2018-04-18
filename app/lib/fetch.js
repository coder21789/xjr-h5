/**
 *
 * Promise请求
 * Node同构封装
 * 自定义请求头Headers
 *
 * @constructor HttpFetch
 * @params {url, body, method, headers}
 *
 */

require('es6-promise').polyfill();
require('isomorphic-fetch');

export class HttpFetch {
    constructor(url, body, method, headers, contentType) {
        this.url = url;
        this.body = body;
        this.method = method;
        this.headers = headers;
        this.contentType = contentType;
    };

    /**
     * fetch promise
     * @returns {{myInit: {method: (*|string), headers: *, mode: string, cache: string, body: *}, myRequest: *}}
     */

    fetch() {
        let myInit = {
            method: this.method || 'POST',
            headers: Object.assign({}, {'Content-Type': this.contentType || 'application/x-www-form-urlencoded'}, this.headers),
            mode: 'cors',
            cache: 'default',
            body: this.body
        };
        // console.log(myInit);
        const myRequest = new Request(this.url, myInit);
        return {myInit, myRequest}
    };

    /**
     * Ajax
     * @param callback
     * @constructor
     */

    XMLHttp(callback) {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            if(xhr.readyState === 4){
                if (xhr.status === 200) {
                    let json = JSON.parse(xhr.responseText);
                    callback(json);
                } else {
                    console.log(xhr.status);
                }
            }
        };
        xhr.open(this.method || 'POST', this.url, true);
        if (this.contentType) xhr.setRequestHeader('Content-Type', this.contentType || 'application/x-www-form-urlencoded');
        xhr.send(this.body);
    };
};