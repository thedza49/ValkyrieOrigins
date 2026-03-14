import { world, system } from '@minecraft/server';
import { valkyrie } from './valkyrie.js';
import { checkCavePhobia } from './cavePhobiaPower.js';

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
        
        // 1. CONSTANT POWERS
        // Health Boost (24 max health = 12 hearts)
        const healthComponent = player.getComponent("minecraft:health");
        if (healthComponent && healthComponent.defaultValue !== 24) {
            healthComponent.defaultValue = 24;
            healthComponent.resetToDefaultValue();
        }

        // Mining Fatigue I
        if (!player.getEffect("mining_fatigue")) {
            player.addEffect("mining_fatigue", 40, { amplifier: 0, showParticles: false });
        }

        checkCavePhobia(player);

        // 2. LEAP LOGIC (v1.5 LOOK UP & JUMP)
        // Trigger: Jumping while looking upward (pitch < -40)
        if (player.isJumping && player.getRotation().x < -40 && state.leapCooldown <= 0) {
            const viewDir = player.getViewDirection();
            
            // Strong upward launch
            player.applyImpulse({
                x: viewDir.x * 0.6,
                y: 1.0, 
                z: viewDir.z * 0.6
            });
            
            state.leapCooldown = 100; // 5 seconds
            state.isGliding = true;
            player.onScreenDisplay.setActionBar("§l§cASCENDING!§r");
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
    player.sendMessage("§l§c[Valkyrie Origins]§r §7V1.5: Look UP and Jump to Ascend!§r");
    player.sendMessage("§e(Note: Ensure 'Beta APIs' is ON in world settings)§r");
});
