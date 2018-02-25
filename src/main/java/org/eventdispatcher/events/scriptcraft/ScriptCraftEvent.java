package org.eventdispatcher.events.scriptcraft;

import org.bukkit.event.Event;
import org.bukkit.event.HandlerList;
import org.bukkit.event.Cancellable;
import org.eventdispatcher.events.scriptcraft.ScriptCraftEventData;
import jdk.nashorn.api.scripting.JSObject;

public class ScriptCraftEvent extends Event implements Cancellable {
  public String eventType;
  public JSObject data;
  private static final HandlerList handlers = new HandlerList();
  private boolean isCancelled;

  public ScriptCraftEvent(String eventType) {
    this.eventType = eventType;
    this.isCancelled = false;
  }

  public boolean isCancelled() {
    return this.isCancelled;
  }

  public void setCancelled(boolean isCancelled) {
    this.isCancelled = isCancelled;
  }

  public JSObject getData() {
    return this.data;
  }

  public void setData(JSObject data) {
    this.data = data;
  }

  public HandlerList getHandlers() {
    return handlers;
  }

  public static HandlerList getHandlerList() {
    return handlers;
  }
}
