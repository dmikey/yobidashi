yobidashi
=========

A Micro JavaScript Pub Sub Utility for the Browser. IE6-10, and Modern.

subscribe to an event:
```javascript
//create a call back
var cb = function(){
    console.log('cb event happened');
}

//subscribe to some channel
yobidashi.sub('/channel/subchannel', cb);
```

publish:
```javascript
//subscribe to some channel
yobidashi.pub('/channel/subchannel');
```

unsubscribe:
```javascript
//create a call back
var cb = function(){
    console.log('cb event happened');
}

//subscribe to some channel
yobidashi.sub('/channel/subchannel', cb);

//unsubscribe with reference to same callback
yobidashi.unsub('/channel/subchannel', cb);
```