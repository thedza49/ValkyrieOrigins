import { world, system } from '@minecraft/server';
import { valkyrie } from './valkyrie.js';
import { checkCavePhobia } from './cavePhobiaPower.js';

// Track cooldowns and state per player
const playerStates = new Map();

function getPlayerState(player) {
    if (!playerStates.has(player.id)) {
        playerStates.set(player.id, {
            leapCooldown: 0,
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
        
        // 1. CAVE PHOBIA
        checkCavePhobia(player);

        // 2. LEAP LOGIC (v1.3 RELIABLE TRIGGER)
        // Trigger: SNEAKING while in the air
        if (player.isSneaking && !onGround && state.leapCooldown <= 0) {
            const viewDir = player.getViewDirection();
            // Upward and forward impulse
            player.applyImpulse({
                x: viewDir.x * 0.7,
                y: 0.9, 
                z: viewDir.z * 0.7
            });
            
            state.leapCooldown = 100; // 5 seconds
            state.isGliding = true;
            player.onScreenDisplay.setActionBar("§l§cVALKYRIE LEAP!§r");
        }

        // 3. GLIDE LOGIC
        if (state.isGliding && !onGround && player.getVelocity().y < 0) {
            player.addEffect("slow_falling", 20, { amplifier: 0, showParticles: false });
        }

        if (onGround) {
            state.isGliding = false;
        }

        if (state.leapCooldown > 0) {
            state.leapCooldown--;
        }
    }
}, 1);

world.afterEvents.playerSpawn.subscribe((event) => {
    const { player } = event;
    player.sendMessage("§l§c[Valkyrie Origins]§r §7V1.3 Active. Sneak while jumping to Leap!§r");
});
