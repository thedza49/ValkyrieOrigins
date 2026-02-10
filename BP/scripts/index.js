import { world, system } from '@minecraft/server';
import { valkyrie } from './valkyrie.js';
import { checkCavePhobia } from './cavePhobiaPower.js';

// Global placeholder for our Origins registration system.
// In a real mod, there would be a dedicated system/API imported here.
// For this minimum viable test, we will use a simple command-based registration
// that ensures the script is running and the origin ID is accessible.

function registerValkyrieOrigin(originData) {
    // In a full OriginsPE setup, this would call a registration function like:
    // OriginsAPI.registerOrigin(originData.id, originData);

    // Since we don't have the full API, we'll confirm successful script loading.
    world.sendMessage(`[ValkyrieOrigins] Attempting to register ${originData.display_name} (${originData.id})...`);

    // **CRITICAL FIX:** We need the game to recognize the Valkyrie ID. 
    // This is typically done by setting up a scoreboard or tag that the UI looks for.
    // In the OriginsPE system, the dialogue files reference the origin ID directly.
    // For this minimal test, we rely on the `valkyrie_origins_init.mcfunction` to run.
}

system.run(() => {
    world.sendMessage("[ValkyrieOrigins] Script module started.");
    
    // 1. Register the origin data
    registerValkyrieOrigin(valkyrie);
    
    // 2. Register any per-tick functions that run on all players
    system.runInterval(() => {
        for (const player of world.getAllPlayers()) {
            // Placeholder: Check if player has the origin (e.g., via scoreboard/tag)
            const hasValkyrieOrigin = player.getTags().includes('origins:valkyrie'); 
            
            if (hasValkyrieOrigin) {
                // If they have the origin, apply its ticking powers.
                // For simplicity, we only run the Cave Phobia check for now.
                checkCavePhobia(player);
            }
        }
    }, 1); // Run every tick (20 times per second)
});

// We should also set up an initialization function for the first time the pack is loaded
// This should be done in valkyrie_origins_init.mcfunction
