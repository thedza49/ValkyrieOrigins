import { world, system } from '@minecraft/server';
import { valkyrie } from './valkyrie.js';
import { checkCavePhobia } from './cavePhobiaPower.js';

// Track cooldowns and state per player
const playerStates = new Map();

function getPlayerState(player) {
    if (!playerStates.has(player.id)) {
        playerStates.set(player.id, {
            leapCooldown: 0,
            wasOnGround: true,
            isGliding: false
        });
    }
    return playerStates.get(player.id);
}

system.runInterval(() => {
    for (const player of world.getAllPlayers()) {
        const hasValkyrieOrigin = player.getTags().includes('origins:valkyrie');
        if (!hasValkyrieOrigin) continue;

        const state = getPlayerState(player);
        const onGround = player.isOnGround;
        
        // 1. CAVE PHOBIA (from previous step)
        checkCavePhobia(player);

        // 2. LEAP LOGIC
        // Trigger: Jump button pressed while in the air (not on ground)
        if (player.isJumping && !onGround && state.wasOnGround === false && state.leapCooldown <= 0) {
            // Apply Leap
            const viewDir = player.getViewDirection();
            // Calculate impulse: mostly up, some forward
            const impulse = {
                x: viewDir.x * 0.5,
                y: 0.8, // Strong upward boost
                z: viewDir.z * 0.5
            };
            
            player.applyImpulse(impulse);
            state.leapCooldown = 100; // 5 seconds (20 ticks * 5)
            state.isGliding = true;
            
            // Visual indicator (silent as requested)
            player.onScreenDisplay.setActionBar("§l§cVALKYRIE LEAP!§r");
        }

        // 3. GLIDE LOGIC
        // If falling after a leap, apply slow falling
        if (state.isGliding && !onGround && player.getVelocity().y < 0) {
            player.addEffect("slow_falling", 20, { amplifier: 0, showParticles: false });
        }

        // Reset state when landing
        if (onGround) {
            state.isGliding = false;
        }

        // Update cooldown
        if (state.leapCooldown > 0) {
            state.leapCooldown--;
            // Optional: Show cooldown in action bar
            if (state.leapCooldown % 20 === 0 && state.leapCooldown > 0) {
                // Just a subtle reminder
            }
        }

        state.wasOnGround = onGround;
    }
}, 1);

world.afterEvents.playerSpawn.subscribe((event) => {
    const { player } = event;
    world.sendMessage(`§l§c[Valkyrie Origins]§r §7Welcome back, ${player.name}. Flight powers active.§r`);
});
