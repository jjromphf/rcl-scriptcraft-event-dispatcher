package org.eventdispatcher.events.scriptcraft;

import org.eventdispatcher.events.scriptcraft.ScriptCraftEvent;
import org.bukkit.event.HandlerList;

public class ScriptCraftEventWrapper {
  private ScriptCraftEvent event;

  public ScriptCraftEventWrapper(String eventType) {
    this.event = new ScriptCraftEvent(eventType);
  }

  public HandlerList getHandlers() {
    return this.event.getHandlers();
  }

  public ScriptCraftEvent getEvent() {
    return this.event;
  }

  public static HandlerList getHandlerList() {
    return ScriptCraftEvent.getHandlerList();
  }
}
