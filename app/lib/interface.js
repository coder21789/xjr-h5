/**
 *
 * 接口检查类
 *
 */

export class Interface {
    constructor(name, methods) {
        if (arguments.length !== 2) {
            throw new Error(`Interface constructor called with ${arguments.length} arguments, but expected exactly 2.`);
        }
        this.name = name;
        this.methods = [];
        for(let i = 0, len = methods.length; i < len; i++) {
            if (typeof methods[i] !== 'string') {
                throw new Error(`Interface constructor expects method names to be passed in as a string.`);
            }
            this.methods.push(methods[i]);
        }
    };

    ensureImplements(object) {
        if (arguments.length < 2) {
            throw new Error(`Function Interface.ensureImplements called with ${arguments.length} arguments, but expected at least 2.`);
        }
        for (let i = 1, len = arguments.length; i < len; i++) {
            let _interface = arguments[i];
            if (_interface.constructor !== Interface) {
                throw new Error(`Function Interface.ensureImplements expects arguments two and above to be instances of Interface.`);
            }
            for (let j = 0, methodsLen = _interface.methods.length; j < methodsLen; j++) {
                let method = _interface.methods[j];
                if (!object[method]|| typeof object[method] !== 'function') {
                    throw new Error(`Function Interface.ensureImplements: object does not implement the ${_interface.name} interface. Method ${method} was not found.`);
                }
            }
        }
    };
};