# Neko Client Package Manager Documentation

This is documentation pertaining everything related to creating a script in Neko Client
the sub folder must contain a manifest.js to reveal to the user what kind of script this is, it must not contain any script functionalities

it should also contain the package script.js file or files

## manifest.js

here is the format for the manifest.js

-------------------------------------------------------------------------
```js
var packageManifest = {
    "displayName": "Script",
    "packageName": "script",
    "version": "1.0.0",
    "author": "Developer",
    "description": "My awesome script",
    "tags": [
        "script",
        "tool",
        "window"
    ],
    "dependencies": [],
    "incompatible": [],
    "entry": "script.js"
};

OWOP.packages[packageManifest.packageName] = packageManifest;
```
-------------------------------------------------------------------------

* displayName is what will be shown to the user

* packageName is how other packages and neko client will target the script and any relevant information about it

* version is the version of the script, this will be shown to users

* author is your name to display to users

* description is a short description of what your script does

* tags is used by users to sort packages

* dependencies is used to tell the package manager which scripts to install if this one is installed, it uses the packageName of other packages

* incompatible is used to tell the package manager which scripts cant be installed with this script due to some form of incompatibilities or reduced user experience, it uses the packageName of other packages

* entry is the filename.js of your script