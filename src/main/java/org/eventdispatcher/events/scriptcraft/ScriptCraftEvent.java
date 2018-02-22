package org.eventdispatcher.events.scriptcraft;

import org.bukkit.event.Event;
import org.bukkit.event.HandlerList;
import org.bukkit.event.Cancellable;

public class ScriptCraftEvent extends Event implements Cancellable {
  public String eventType;
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

  public HandlerList getHandlers() {
    return handlers;
  }

  public static HandlerList getHandlerList() {
    return handlers;
  }
}
