define(function(){

    var yobidashi = {
        pub: function (eventname, data) {
            //emit event
            //create unique eventname name
            var uniqueName = 'yobidashi.' + eventname;
            var CustomEvent = function (event, params) {
                //a fill for IE9 and 10 proper operation
                params = params || {
                    bubbles: false,
                    cancelable: false
                };
                var evt = document.createEvent('CustomEvent');
                evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
                return evt;
            };
            if (window.CustomEvent) {
                //check if we can use native eventing
                var event = new CustomEvent(uniqueName, {
                    'detail': data
                });
                var elem = document.getElementsByTagName('body')[0];
                elem.dispatchEvent(event);
            } else {
                //use a document property event for eventing
                if (document.attachEvent) {
                    document.documentElement[uniqueName] = data;
                }
            }
        },
        sub: function (eventname, callback) {
            // bind a callback to an event emitters
            if (document.createEvent) {
                //bind an event to the body tag
                var obj = document.getElementsByTagName('body')[0];
                obj.addEventListener('yobidashi.' + eventname, callback);
            } else if (document.createEventObject) {
                //attach a callback to the onpropertychange for eventing
                document.documentElement.attachEvent('onpropertychange', callback);
            }
        },
        unsub: function (eventname, callback) {
            // remove bound event
            if (document.createEvent) {
                //remove event from body tag
                var obj = document.getElementsByTagName('body')[0];
                obj.removeEventListener('yobidashi.' + eventname, callback);
            } else if (document.createEventObject) {
                //detach event from onpropertychange event
                document.documentElement.detachEvent('onpropertychange', callback);
            }
        },
        bind: function (func, context) {
            //bind function ripped from underscore, changes the scope of this inside func to context
            var ArrayProto = Array.prototype,
                FuncProto = Function.prototype,
                slice = ArrayProto.slice,
                nativeBind = FuncProto.bind;
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

    return yobidashi;
});

