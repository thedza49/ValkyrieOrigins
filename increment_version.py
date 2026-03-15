import json
import os
import re

def update_manifest(filepath):
    with open(filepath, 'r') as f:
        data = json.load(f)

    # Increment version
    version = data['header']['version']
    version[2] += 1
    if version[2] >= 100: # Arbitrary wrap for minor version
        version[2] = 0
        version[1] += 1

    data['header']['version'] = version

    # Update version in modules
    for module in data.get('modules', []):
        module['version'] = version

    # Update version in dependencies if it's pointing to our other pack
    # Note: We'll need a more robust way if there are many dependencies,
    # but for this project it's straightforward.
    for dep in data.get('dependencies', []):
        if 'uuid' in dep:
             dep['version'] = version

    # Update description version if present (e.g., V1.6 -> V1.7)
    desc = data['header'].get('description', '')
    new_version_str = f"{version[0]}.{version[1]}.{version[2]}"
    # Replace V1.x or v1.x
    desc = re.sub(r'[Vv]\d+\.\d+(\.\d+)?', f'V{new_version_str}', desc)
    data['header']['description'] = desc

    with open(filepath, 'w') as f:
        json.dump(data, f, indent=4)

    return new_version_str

if __name__ == "__main__":
    bp_v = update_manifest('BP/manifest.json')
    rp_v = update_manifest('RP/manifest.json')
    print(f"{bp_v}")
