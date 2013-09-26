var yobidashi = (function () {
    var _ = {
        pub: function (eventname) {
            //emit event
            var uniqueName = 'yobidashi.' + eventname;
            var CustomEvent = function (event, params) {
                params = params || {
                    bubbles: false,
                    cancelable: false,
                    detail: undefined
                };
                var evt = document.createEvent('CustomEvent');
                evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
                return evt;
            };

            if (window.CustomEvent) {
                var event = new CustomEvent(uniqueName, {
                    'detail': ''
                });
                var elem = document.getElementsByTagName('body')[0];
                elem.dispatchEvent(event);
            } else {
                if (document.attachEvent) {
                    document.documentElement[uniqueName] += 1;
                }
            }
        },
        sub: function (eventname, callback) {
            // bind a callback to an event emitter
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
        }
    };
    return _;
}());