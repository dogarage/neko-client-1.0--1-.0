var packageManifest = {
    "displayName": "Coords saver window",
    "packageName": "coords-saver",
    "version": "1.0.1",
    "author": "enixx",
    "description": "Save coordinates with names in OWOP, Click in their name to teleport to the coordinates.",
    "tags": [
        "Coordinates",
        "Save"
    ],
    "dependencies": [
        "teleport-plus"
    ],
    "incompatible": [],
    "license": "",
    "entry": "main.js"
};

OWOP.packages[packageManifest.packageName] = packageManifest;