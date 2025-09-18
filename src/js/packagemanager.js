"use strict";

export var installedPackages = {};

var packagesInstalled = false;

export async function installPackage(packageName) {
    if (!installedPackages[packageName]) {
        if (!OWOP.packages[packageName]) return (console.error("either you are missing the package " + packageName + " in your packages\nor someone forgot to remove a false dependency"), new Promise(resolve => resolve()));
        if (OWOP.packages[packageName].dependencies.length) {
            let dependents = [];
            for (let dependencyPackageName of OWOP.packages[packageName].dependencies) {
                if (!installedPackages[dependencyPackageName]) {
                    dependents.push(installPackage(dependencyPackageName));
                } else {
                    dependents.push(installedPackages[packageName]);
                }
            }
            return new Promise(async function (resolve, reject) {
                await Promise.all(dependents);
                console.log("waiting on " + packageName);
                installedPackages[packageName] = new Promise(function (resolve, reject) {
                    var script = document.createElement('script');
                    script.onload = resolve;
                    script.onerror = reject;
                    document.head.appendChild(script);
                    script.src = "../packages/" + packageName + "/" + OWOP.packages[packageName].entry;
                }).then(() => { resolve(); console.log(packageName + " installed."); }).catch(reject);
            });
        } else {
            console.log("waiting on " + packageName);
            let promise = new Promise((resolve, reject) => {
                var script = document.createElement('script');
                script.onload = resolve;
                script.onerror = reject;
                document.head.appendChild(script);
                script.src = "../packages/" + packageName + "/" + OWOP.packages[packageName].entry;
            }).then(() => { console.log(packageName + " installed."); });
            installedPackages[packageName] = promise;
            return promise;
        }
    }
}

export function packagesPopulator() {
    if (packagesInstalled) return;
    var container = document.getElementById("packages-container");
    var packagesList = JSON.parse(localStorage.packages || "{}");
    for (let packageName of OWOP.packages.packages) {
        if (!OWOP.packages[packageName]) continue; // the packagelist has a package that doesnt exist.
        var packageContent = document.createElement("div");
        packageContent.className = "package-box";

        var packageIcon = document.createElement("img");
        var packageText = document.createElement("div");
        var packageInstallButton = document.createElement("button");

        packageIcon.src = `../packages/${packageName}/icon.png`;

        packageIcon.onerror = function (event) {
            event.target.src = "./img/owop.png";
        }

        packageText.innerHTML = `${OWOP.packages[packageName].displayName}<br>${OWOP.packages[packageName].description}`;

        if (packagesList[packageName]) {
            packageInstallButton.textContent = "Uninstall";
            installPackage(packageName);
        } else {
            packageInstallButton.textContent = "Install";
        }

        packageInstallButton.onclick = function (event) {
            packagesList[packageName] = !packagesList[packageName];
            if (packagesList[packageName]) {
                event.target.textContent = "Uninstall";
                installPackage(packageName);
            } else {
                event.target.textContent = "Install";
            }
            localStorage.packages = JSON.stringify(packagesList);
        }

        packageContent.appendChild(packageIcon);
        packageContent.appendChild(packageText);
        packageContent.appendChild(packageInstallButton);
        container.appendChild(packageContent);
    }
    packagesInstalled = true;
}

new Promise(function (resolve, reject) {
    var script = document.createElement('script');
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
    script.src = "../packages/packagelist.js";
}).then(function () {
    for (let packageName of OWOP.packages.packages) {
        new Promise(function (resolve, reject) {
            var script = document.createElement('script');
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
            script.src = "../packages/" + packageName + "/manifest.js";
        }).then(function () {
            console.log(packageName + " added to package list");
        }).catch(function (err) {
            console.log(packageName + " package not found");
        });
    }
}).catch(function (err) {
    console.log("packagelist.js doesnt exist in /packages/packagelist.js");
});