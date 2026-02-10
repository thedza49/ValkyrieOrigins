// Valkyrie Origin Definition
export const valkyrie = {
    // --- Core Identity ---
    'id': 'valkyrie', 
    'namespace': 'valkyrie_project', 
    'display_name': 'Valkyrie',
    'description': 'A chosen warrior, blessed with flight and human resilience.',

    // --- Powers ---
    'powers': [
        // Power: Sets the max health to 20 (10 hearts).
        {
            type: 'origins:attribute',
            attribute: 'minecraft:health',
            operation: 'set',
            value: 20, 
            id: 'valkyrie_health'
        },
        // Power: Negative trait - Mines Slower (Mining Fatigue I)
        {
            type: 'origins:status_effect',
            effect: 'minecraft:mining_fatigue',
            amplifier: 0,
            duration: -1, 
            is_ambient: true,
            show_particles: false,
            show_icon: true,
            id: 'valkyrie_slow_mining'
        },
        // Power: Negative trait - Phobia of Caves
        {
            type: 'origins:custom_tick', 
            script_path: 'cavePhobiaPower.js', 
            tick_function: 'checkCavePhobia',
            tick_rate: 20, 
            id: 'valkyrie_cave_phobia'
        },
        // Power: Valkyrie Leap (Active)
        // Handled in index.js via jump detection
        {
            type: 'origins:active_power',
            id: 'valkyrie_leap',
            cooldown: 100 // 5 seconds in ticks (20 ticks per second)
        },
        // Power: Valkyrie Glide (Passive)
        // Handled in index.js
        {
            type: 'origins:passive',
            id: 'valkyrie_glide'
        }
    ],

    // --- Controls ---
    'controls': []
};
