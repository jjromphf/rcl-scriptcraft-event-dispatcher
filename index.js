
var events = require('events');

var EventDispatcher = function() {
  var that = this;
  that.queue = {};
  that.dispatched = {};
  try {
    var ScriptCraftEvent = Java.type('org.eventdispatcher.events.scriptcraft.ScriptCraftEventWrapper');
    that.nativeEvent = function(name) { return new ScriptCraftEvent(name); }
    that.nativeEventClass = ScriptCraftEvent;
  } catch(error) {
    // no native event support
    console.log("Warning: EventDispatcher constructed without native support. To enable, move event-dispatcher.jar to SpigotMC's plugins folder");
    that.nativeEvent = null;
    that.nativeEventClass = null;
    // TODO add ability to unregister
  }

  return {
    nativeEvent: that.nativeEvent,
    nativeEventClass: that.nativeEventClass,
    on: function(eventType, callback) {
      if (events[eventType] !== undefined) {
        events[eventType](callback);
      } else {
        if (that.dispatched[eventType] === true) {
          return callback();
        }
        if (that.queue[eventType] === undefined) {
          that.queue[eventType] = [];
        }
        that.queue[eventType].push(callback);
      }
    },

    dispatch: function(eventType, eventData) {
      if (that.queue[eventType] === undefined) {
        return;
      }
      that.queue[eventType].forEach(function(callback) {
        callback(eventData);
        if (that.nativeEvent !== null) {
          var ne = that.nativeEvent(eventType).getEvent();
          ne.data = eventData;
          server.getPluginManager().callEvent(ne);
        }
      }.bind(that));
      that.queue[eventType] = [];
      that.dispatched[eventType] = true;
    }
  }
}();

module.exports = EventDispatcher;
