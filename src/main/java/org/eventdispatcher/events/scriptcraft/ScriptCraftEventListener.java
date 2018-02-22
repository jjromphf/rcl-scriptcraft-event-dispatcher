package org.eventdispatcher.events.scriptcraft;

import org.bukkit.event.EventHandler;
import org.bukkit.event.Listener;
import org.eventdispatcher.events.scriptcraft.ScriptCraftEvent;

public class ScriptCraftEventListener implements Listener {

  @EventHandler
  public void onScriptCraftEvent(ScriptCraftEvent event) {
    // can override
  }

}
