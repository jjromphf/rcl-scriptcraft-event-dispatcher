// a native Bukkit event

var events = require('events');
var EventDispatcher = function() {
  this.queue = {};
  this.dispatched = {};
  try {
    var ScriptCraftEvent = Java.type('org.eventdispatcher.events.scriptcraft.ScriptCraftEventWrapper');
    this.nativeEvent = function(name) { return new ScriptCraftEvent(name); }
    this.nativeEventClass = ScriptCraftEvent;
  } catch(error) {
    // no native event support
    console.log("Warning: EventDispatcher constructed without native support. To enable, move event-dispatcher.jar to SpigotMC's plugins folder");
    this.nativeEvent = null;
    this.nativeEventClass = null;
  }
}

EventDispatcher.prototype.on = function(eventType, callback) {
  if (events[eventType] !== undefined) {
    events[eventType](callback);
  } else {
    if (this.dispatched[eventType] === true) {
      return callback();
    }
    if (this.queue[eventType] === undefined) {
      this.queue[eventType] = [];
    }
    this.queue[eventType].push(callback);
  }
}

EventDispatcher.prototype.dispatch = function(eventType, eventData) {
  if (this.queue[eventType] === undefined) {
    return;
  }
  this.queue[eventType].forEach(function(callback) {
    callback(eventData);
    if (this.nativeEvent !== null) {
      var ne = this.nativeEvent(eventType).getEvent();
      ne.data = eventData;
      server.getPluginManager().callEvent(ne);
    }
  }.bind(this));
  this.queue[eventType] = [];
  this.dispatched[eventType] = true;
}

function testCustomEvent() {
  var eventSystem = new EventDispatcher();
  // we can add handlers for all events, as well as our own js events
  eventSystem.on('test', function(event) {
    console.log('Nashorn Event');
    console.log(event.message);
  });
  // native plugins can listen to our events via ScriptCraftEvent, which has eventType + data
  if (eventSystem.nativeEventClass !== null) {
    events.on(eventSystem.nativeEventClass, function(event) {
      console.log('Native Event');
      console.log(event.eventType);
      console.log(event.data.message);
    });
  }
  eventSystem.dispatch('test', { message: "this worked"});
}

module.exports = {
  EventDispatcher: EventDispatcher,
  test: testCustomEvent,
}
