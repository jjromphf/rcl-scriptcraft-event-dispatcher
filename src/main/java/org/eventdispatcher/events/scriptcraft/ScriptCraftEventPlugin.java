package org.eventdispatcher.events.scriptcraft;

import org.eventdispatcher.events.scriptcraft.ScriptCraftEventListener;
import org.bukkit.plugin.java.JavaPlugin;


public class ScriptCraftEventPlugin extends JavaPlugin {
  @Override
  public void onEnable() {
    getServer().getPluginManager().registerEvents(new ScriptCraftEventListener(), this);
  }
}
