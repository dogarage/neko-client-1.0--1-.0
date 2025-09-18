/* CHANGELOG
1.0 - Standalone
1.0.1 - Added /tpback
1.0.2 - Added support for scientific notation
1.0.3 - Added compatibility with vanilla player teleporting
1.1 - Added /warp
      Added support for k and m notation
      Added icon
1.1.1 - Fixed teleporting to x or y = 0 not working
        Added 'error' to borders
        Renamed to Teleport+
1.1.1.1 - Compatible with Neko Client 1.0.2
*/

// ==UserScript==
// @name         Teleport+
// @namespace    Neko Client script
// @version      1.1.1.1
// @description  Adds teleporting and warping.
// @author       NothingHere7759
// @match        https://ourworldofpixels.com/*
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAACgCAYAAACLz2ctAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsIAAA7CARUoSoAAAAAYdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCA1LjEuOWxu2j4AAAC2ZVhJZklJKgAIAAAABQAaAQUAAQAAAEoAAAAbAQUAAQAAAFIAAAAoAQMAAQAAAAIAAAAxAQIAEAAAAFoAAABphwQAAQAAAGoAAAAAAAAA8nYBAOgDAADydgEA6AMAAFBhaW50Lk5FVCA1LjEuOQADAACQBwAEAAAAMDIzMAGgAwABAAAAAQAAAAWgBAABAAAAlAAAAAAAAAACAAEAAgAEAAAAUjk4AAIABwAEAAAAMDEwMAAAAAArIfcnPEIHlAAAArRJREFUeF7t28uNE1EQQFGbBUkgEQo5jYhjRE6EMhJJsBn2LZDKmsLXn3OWvXB321dvUSWfTw/i64/v78drj+zt5fV8vHaPPh0vwDUJkJQASQmQlABJCZCUAEkJkJQASWXT9Gpz8eXb5+Olm/Lr5+/jpauoNitOQFICJCVAUgIkJUBSAiQlQFICJCVAUuvT7+0Nx7NtLrbfd/v5tjcmTkBSAiQlQFICJCVAUgIkJUBSAiQlQFLjqXa14die5E/vO3Xrzze1/R7TjYkTkJQASQmQlABJCZCUAEkJkJQASQmQ1GhafbpgEzKd5G9P3rdN36My/f6232N6X5sQ7oIASQmQlABJCZCUAEkJkJQASQmQ1Hm64ZiaTt6nE/XK9D2ezfbv5gQkJUBSAiQlQFICJCVAUgIkJUBSAiQ13oRUm4Htyfv2e2w/37bt952afi9OQFICJCVAUgIkJUBSAiQlQFICJCVAUje/CalMJ/mPYvv3nX5/TkBSAiQlQFICJCVAUgIkJUBSAiQlQFLrm5DpBHxqet+p7ed7NtPfY/o9OwFJCZCUAEkJkJQASQmQlABJCZCUAEkJkJQASQmQlABJCZCUAEkJkJQASQmQlABJjf8TMjX9z0Bl+l8FrsMJSEqApARISoCkBEhKgKQESEqApARI6ny88C/Tjcn2JmS6uZjed/p5fMzby+uoLScgKQGSEiApAZISICkBkhIgKQGSEiCp0bT6dMEmZGq6uajYmHyMTQh3QYCkBEhKgKQESEqApARISoCkBEhqNK2+hI3JY5tuOKacgKQESEqApARISoCkBEhKgKQESEqApFan2pfY3phM2az83faGY8oJSEqApARISoCkBEhKgKQESEqApARIKpl+/w/VZqVSbS62OQFJCZCUAEkJkJQASQmQlABJCZCUAEn9AZ4Wfs3fCVt6AAAAAElFTkSuQmCC
// @grant        none
// ==/UserScript==

(() => {

    // Pre-Installation
    const waitUntil = (probe, cb, t = 200) => {
        const id = setInterval(() => {
            try {
                if (probe()) {
                    clearInterval(id); cb();
                }
            } catch { }
        }, t);
    };

    waitUntil(() => window.OWOP && OWOP.client.camera?.centerCameraTo && OWOP.misc?.world?.players && OWOP.chat?.local && (OWOP.misc.chatSendModifier !== undefined), install);

    // Utilities
    const locSend = OWOP.chat.local

    // Install
    function install() {
        let xOld = 0, yOld = 0;

        function teleport(cx, cy) {
            xOld = OWOP.client.mouse.tileX;
            yOld = OWOP.client.mouse.tileY;
            OWOP.client.camera.centerCameraTo(cx, cy);
        }

        // Teleport
        function argToNum(n) {
            if (!isNaN(n)) {
                return Number(n);
            } else if (!isNaN(n.slice(0, -1))) {
                if (n.endsWith('k')) {
                    return n.slice(0, -1) * 1000;
                };
                if (n.endsWith('m')) {
                    return n.slice(0, -1) * 1000000;
                };
                return undefined;
            } else return undefined;
        };

        function tp(args) {
            if (args.length === 2 && args.every(a => argToNum(a) || argToNum(a) == 0)) {
                teleport(argToNum(args[0]), argToNum(args[1]));
                return '';
            }
            if (args.length === 1 && !isNaN(args[0])) {
                if (!OWOP.misc.world.players[args[0]]) { locSend(`No player with ID ${args[0]}`); return ''; }
                teleport((OWOP.misc.world.players[args[0]].x / 16) | 0, (OWOP.misc.world.players[args[0]].y / 16) | 0);
                return '';
            }
            if (args.length === 3 && args.every(a => !isNaN(a)) && OWOP.client.player.rank > 1) {
                return;
            };
            if (OWOP.client.player.rank > 1) {
                locSend('Correct usage: /tp &lt;x&gt; &lt;y&gt; | /tp &lt;id&gt; | /tp &lt;id&gt; &lt;x&gt; &lt;y&gt;');
                return '';
            };
            locSend('Correct usage: /tp &lt;x&gt; &lt;y&gt; | /tp &lt;id&gt;');
            return '';
        };

        //Warp
        const borders = {
            'limbo': 1e3,
            'oblivion': 1e4,
            'arcadia': 1e5,
            'purgatory': 2e5,
            'damnation': 3e5,
            'paradise': 4e5,
            'nirvana': 5e5,
            'ragnarok': 6e5,
            'olympus': 7e5,
            'eden': 8e5,
            'utopia': 9e5,
            'laniakea': 1e6,
            'proxima': 16776000,
            'worldborder': 16777216,
            'death': 134217728,
            'error': Infinity
        };
        const dirs = {
            'n': [0, -1],
            'ne': [1, -1],
            'e': [1, 0],
            'se': [1, 1],
            's': [0, 1],
            'sw': [-1, 1],
            'w': [-1, 0],
            'nw': [-1, -1]
        };
        function border(name, direction) {
            const dist = borders[name];
            if (dist == undefined) {
                locSend(`'${name}' does not exist`);
                return '';
            };
            const dir = dirs[direction];
            if (dir == undefined) {
                locSend(`'${direction}' is not a valid direction`);
                return '';
            };
            teleport(dist * dir[0], dist * dir[1]);
            return '';
        };

        if (localStorage.warpList === undefined) {
            localStorage.warpList = '{}';
        };
        function warp(args) {
            let warpList = JSON.parse(localStorage.warpList);
            switch (args[0]) {
                case 'add':
                    if (args.length != 4 && args.length != 5 || isNaN(args[2]) || isNaN(args[3])) {
                        locSend('Correct usage: /warp add &lt;name&gt; &lt;x&gt; &lt;y&gt; global* (* = optional)');
                        return '';
                    };
                    if (args[1] == "add" || args[1] == "remove" || args[1] == "border" || args[1] == "list") {
                        locSend('The warp name cannot be a reserved word (add, remove, border, list)');
                        return '';
                    };
                    if (warpList.$global?.[args[1]] || warpList[OWOP.misc.world.name]?.[args[1]]) {
                        locSend(`'${args[1]}' already exists`);
                        return '';
                    };
                    if (args[4] == 'global') {
                        if (!warpList.$global) warpList.$global = {};
                        warpList.$global[args[1]] = [args[2], args[3]];
                        localStorage.warpList = JSON.stringify(warpList);
                        return '';
                    };
                    if (!warpList[OWOP.misc.world.name]) warpList[OWOP.misc.world.name] = {};
                    warpList[OWOP.misc.world.name][args[1]] = [args[2], args[3]];
                    localStorage.warpList = JSON.stringify(warpList);
                    return '';
                    break;
                case 'remove':
                    if (args.length != 2) {
                        locSend('Correct usage: /warp remove &lt;name&gt;');
                        return '';
                    };
                    if (!warpList[OWOP.misc.world.name]?.[args[1]]) {
                        if (!warpList.$global?.[args[1]]) {
                            locSend(`'${args[1]}' does not exist`);
                            return '';
                        };
                        warpList.$global[args[1]] = undefined;
                        if (JSON.stringify(warpList.$global) === '{}') warpList.$global = undefined;
                        localStorage.warpList = JSON.stringify(warpList);
                        return '';
                    };
                    warpList[OWOP.misc.world.name][args[1]] = undefined;
                    if (JSON.stringify(warpList[OWOP.misc.world.name]) === '{}') warpList[OWOP.misc.world.name] = undefined;
                    localStorage.warpList = JSON.stringify(warpList);
                    return '';
                    break;
                case 'border':
                    if (args.length != 3) {
                        locSend('Correct usage: /warp border &lt;name&gt; &lt;direction&gt;');
                        return '';
                    };
                    border(args[1], args[2]);
                    break;
                case 'list':
                    if (args.length != 1) {
                        locSend('Correct usage: /warp list');
                        return '';
                    };
                    locSend(`Local warps: ${warpList[OWOP.misc.world.name] ? Object.keys(warpList[OWOP.misc.world.name]).join(', ') : '[None]'}\nGlobal warps: ${warpList.$global ? Object.keys(warpList.$global).join(', ') : '[None]'}`);
                    return '';
                    break;
                default:
                    if (args.length != 1) {
                        locSend('Usage: /warp add &lt;name&gt; &lt;x&gt; &lt;y&gt; global* | /warp remove &lt;name&gt; | /warp border &lt;name&gt; &lt;direction&gt; | /warp list | /warp &lt;name&gt; (* = optional)');
                        return '';
                    };
                    if (!warpList[OWOP.misc.world.name]?.[args]) {
                        if (!warpList.$global?.[args]) {
                            locSend(`'${args}' does not exist`);
                            return '';
                        };
                        teleport(Number(warpList.$global[args][0]), Number(warpList.$global[args][1]));
                        return '';
                    };
                    teleport(Number(warpList[OWOP.misc.world.name][args][0]), Number(warpList[OWOP.misc.world.name][args][1]));
                    return '';
            };
        };

        // Help
        function help(args) {
            if (args.length == 0) {
                if (OWOP.client.player.rank < 2) {
                    locSend('Teleport commands: /tp, /tpback, /warp');
                    return;
                };
                locSend('Teleport commands: /tpback, /warp');
                return;
            };
            switch (args[0]) {
                case 'tp':
                    if (OWOP.client.player.rank < 2) {
                        locSend('tp - Teleport to a given location or to another user.\nUsage: /tp &lt;id&gt; | /tp &lt;x&gt; &lt;y&gt;\nAliases: [None]');
                    };
                    break;
                case 'tpback':
                case 'tpb':
                    locSend('tpback - Teleports you to the position before your last teleportation.\nUsage: /tpback\nAliases: tpb');
                    break;
                case 'warp':
                    locSend('warp - Create or delete places, teleport to a border or location and list all places\nUsage: /warp add &lt;name&gt; &lt;x&gt; &lt;y&gt; global* | /warp remove &lt;name&gt; | /warp border &lt;name&gt; &lt;direction&gt; | /warp list | /warp &lt;name&gt; (* = optional)\nAliases: [None]')
            };
            return '';
        };

        // Command Processing
        const prev = OWOP.misc.chatSendModifier || (m => m);
        OWOP.misc.chatSendModifier = msg => {
            msg = prev(msg);
            if (!msg.startsWith('/')) return msg;
            const [cmd, ...args] = msg.slice(1).trim().split(/\s+/);
            switch (cmd.toLowerCase()) {
                case "tp":
                    tp(args);
                    break;
                case "tpback":
                case "tpb":
                    teleport(xOld, yOld);
                    break;
                case "warp":
                    warp(args);
                    break;
                case "help":
                case "h":
                case "?":
                    help(args);
            };
            return msg;
        };
        console.log('Teleport loaded');
    }
})();