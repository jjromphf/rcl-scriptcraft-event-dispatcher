// a native Bukkit event
var ScriptCraftEvent = Java.type('org.eventdispatcher.events.scriptcraft.ScriptCraftEventWrapper');
var events = require('events');
var EventDispatcher = function() {
  this.queue = {};
  this.dispatched = {};
  this.nativeEvent = function(name) { return new ScriptCraftEvent(name); }
  this.nativeEventClass = ScriptCraftEvent;
}

EventDispatcher.prototype.on = function(eventType, callback) {
  if (this.dispatched[eventType] === true) {
    return callback();
  }
  if (this.queue[eventType] === undefined) {
    this.queue[eventType] = [];
  }
  this.queue[eventType].push(callback);
}

EventDispatcher.prototype.dispatch = function(eventType, eventData) {
  if (this.queue[eventType] === undefined) {
    return;
  }
  var nativeEvent = this.nativeEvent;
  this.queue[eventType].forEach(function(callback) {
    callback(eventData);
    server.getPluginManager().callEvent(nativeEvent('test').getEvent());
  });
  this.queue[eventType] = [];
  this.dispatched[eventType] = true;
}

function testCustomEvent() {
  var eventSystem = new EventDispatcher();
  eventSystem.on('test', function(event) {
    console.log(event.message);
  });
  events.on(eventSystem.nativeEventClass, function() {
    console.log("this also worked");
  });
  eventSystem.dispatch('test', { message: "this worked"});
}

module.exports = {
  EventDispatcher: EventDispatcher,
  test: testCustomEvent,
}
