import { world, system, EffectTypes } from '@minecraft/server';

const SLOWNESS = EffectTypes.get('slowness');
const WEAKNESS = EffectTypes.get('weakness');
const NAUSEA = EffectTypes.get('nausea');
const PHOBIA_DURATION = 5; 

/**
 * Power function for "Phobia of Caves". Checks conditions and applies effects.
 * This function is assumed to be called by a ticking power in the origin definition.
 * @param {world.Player} entity The entity (player) that has this power.
 */
export function checkCavePhobia(entity) {
    
    // Condition a: Player is below Y=40
    if (entity.location.y >= 40) {
        return;
    }

    try {
        const dimension = entity.dimension;
        // Get the block at the player's feet/center for light check.
        // We use Math.floor(entity.location.y) to get the correct block Y.
        const blockLocation = { 
            x: Math.floor(entity.location.x), 
            y: Math.floor(entity.location.y), 
            z: Math.floor(entity.location.z) 
        };
        const playerBlock = dimension.getBlock(blockLocation);

        if (playerBlock) {
            // Condition b: Light level < 8 (using block.light for block-emitted and ambient light)
            if (playerBlock.light < 8) {
                // Conditions met. Apply negative effects.
                entity.addEffect(SLOWNESS, PHOBIA_DURATION, { amplifier: 0, showParticles: false }); 
                entity.addEffect(WEAKNESS, PHOBIA_DURATION, { amplifier: 0, showParticles: false }); 
                entity.addEffect(NAUSEA, PHOBIA_DURATION, { amplifier: 0, showParticles: false }); 
            }
        }
    } catch (e) {
        // Simple error handling to prevent script crashes
        console.warn(`[ValkyrieOrigins] Cave Phobia check failed: ${e}`);
    }
}
