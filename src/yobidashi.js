var yobidashi = (function () {
    var ArrayProto = Array.prototype,
        FuncProto = Function.prototype,
        slice = ArrayProto.slice,
        nativeBind = FuncProto.bind;
    var _ = {
        pub: function (eventname, data) {
            //emit event
            var uniqueName = 'yobidashi.' + eventname;
            var CustomEvent = function (event, params) {
                params = params || {
                    bubbles: false,
                    cancelable: false
                };
                var evt = document.createEvent('CustomEvent');
                evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
                return evt;
            };

            if (window.CustomEvent) {
                var event = new CustomEvent(uniqueName, {
                    'detail': data
                });
                var elem = document.getElementsByTagName('body')[0];
                elem.dispatchEvent(event);
            } else {
                if (document.attachEvent) {
                    document.documentElement[uniqueName] = data;
                }
            }
        },
        sub: function (eventname, callback) {
            // bind a callback to an event emitters
            if (document.createEvent) {
                var obj = document.getElementsByTagName('body')[0];
                obj.addEventListener('yobidashi.' + eventname, callback);
            } else if (document.createEventObject) {
                document.documentElement.attachEvent('onpropertychange', callback);
            }
        },
        unsub: function (eventname, callback) {
            if (document.createEvent) {
                var obj = document.getElementsByTagName('body')[0];
                obj.removeEventListener('yobidashi.' + eventname, callback);
            } else if (document.createEventObject) {
                document.documentElement.detachEvent('onpropertychange', callback);
            }
        },
        data: function (event) {
            return event.detail || document.documentElement[event.propertyName];
        },
        bind: function (func, context) {
            var args, bound;
            if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
            args = slice.call(arguments, 2);
            return bound = function () {
                if (!(this instanceof bound)) return func.apply(context, args.concat(slice.call(arguments)));
                ctor.prototype = func.prototype;
                var self = new ctor;
                ctor.prototype = null;
                var result = func.apply(self, args.concat(slice.call(arguments)));
                if (Object(result) === result) return result;
                return self;
            };
        }
    };
    return _;
}());