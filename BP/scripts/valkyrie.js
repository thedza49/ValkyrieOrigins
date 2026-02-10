// Valkyrie Origin Definition
// This is structured to be read by the main registration script.
export const valkyrie = {
    // --- Core Identity ---
    'id': 'valkyrie', // Internal ID
    'namespace': 'valkyrie_project', // Our new unique namespace
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
            duration: -1, // Infinite duration
            is_ambient: true,
            show_particles: false,
            show_icon: true,
            id: 'valkyrie_slow_mining'
        },
        // Power: Negative trait - Phobia of Caves
        // This links to the custom script we created
        {
            type: 'origins:custom_tick', 
            script_path: 'cavePhobiaPower.js', // Path relative to /scripts/
            tick_function: 'checkCavePhobia',
            tick_rate: 20, // Run once per second
            id: 'valkyrie_cave_phobia'
        }
    ],

    // --- Controls ---
    'controls': []
};
