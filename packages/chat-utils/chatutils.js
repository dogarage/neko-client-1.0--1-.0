// ==UserScript==
// @name         OWOP Chat Utils
// @namespace    https://greasyfork.org/en/users/1502179/
// @version      1.5.1.1
// @description  Adds several useful features to the chat.
// @author       NothingHere7759
// @match        https://ourworldofpixels.com/*
// @exclude      https://ourworldofpixels.com/api*
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAACgCAYAAACLz2ctAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsEAAA7BAbiRa+0AAAAYdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCA1LjEuOWxu2j4AAAC2ZVhJZklJKgAIAAAABQAaAQUAAQAAAEoAAAAbAQUAAQAAAFIAAAAoAQMAAQAAAAIAAAAxAQIAEAAAAFoAAABphwQAAQAAAGoAAAAAAAAA2XYBAOgDAADZdgEA6AMAAFBhaW50Lk5FVCA1LjEuOQADAACQBwAEAAAAMDIzMAGgAwABAAAAAQAAAAWgBAABAAAAlAAAAAAAAAACAAEAAgAEAAAAUjk4AAIABwAEAAAAMDEwMAAAAAACMojeFEB6NgAAArJJREFUeF7t28uNE1EQQFGbCFgzgZDGiEARaRAIrCeDYd8CqawpfP05Z9kLd7d99RZV8vn0IH79+Px+vPbIXl7fzsdr9+jT8QJckwBJCZCUAEkJkJQASQmQlABJCZBUNk2vNhdfvn47Xropv39+P166imqz4gQkJUBSAiQlQFICJCVAUgIkJUBSAiS1Pv3e3nA82+Zi+323n297Y+IEJCVAUgIkJUBSAiQlQFICJCVAUgIkNZ5qVxuO7Un+9L5Tt/58U9vvMd2YOAFJCZCUAEkJkJQASQmQlABJCZCUAEmNptWnCzYh00n+9uR92/Q9KtPvb/s9pve1CeEuCJCUAEkJkJQASQmQlABJCZCUAEmdpxuOqenkfTpRr0zf49ls/25OQFICJCVAUgIkJUBSAiQlQFICJCVAUuNNSLUZ2J68b7/H9vNt237fqen34gQkJUBSAiQlQFICJCVAUgIkJUBSAiR185uQynSS/yi2f9/p9+cEJCVAUgIkJUBSAiQlQFICJCVAUgIktb4JmU7Ap6b3ndp+vmcz/T2m37MTkJQASQmQlABJCZCUAEkJkJQASQmQlABJCZCUAEkJkJQASQmQlABJCZCUAEkJkNT4PyFT0/8MVKb/VeA6nICkBEhKgKQESEqApARISoCkBEhKgKTOxwv/Mt2YbG9CppuL6X2nn8fHvLy+jdpyApISICkBkhIgKQGSEiApAZISICkBkhpNq08XbEKmppuLio3Jx9iEcBcESEqApARISoCkBEhKgKQESEqApEbT6kvYmDy26YZjyglISoCkBEhKgKQESEqApARISoCkBEhqdap9ie2NyZTNyt9tbzimnICkBEhKgKQESEqApARISoCkBEhKgKSS6ff/UG1WKtXmYpsTkJQASQmQlABJCZCUAEkJkJQASQmQ1B8g1YFmQv53bQAAAABJRU5ErkJggg==
// @grant        none
// @license      MIT
// ==/UserScript==

// CREDITS: Advice about the code - NekoNoka
//          Beta testers - Rainbow, SyntexPr

/* CHANGELOG
Quick Tell 1.0 - Added /q and /qid
Group Chat 1.0 - Added /g
1.0 - Combined Quick Tell and Group Chat into Chat Utils
1.1 - Minor bugfixes for /g tell, /qid, /q and /help
        Added /qgname and /qg
1.2 - Added /r
1.3 - Added /l, /lset and /clear
      Improved command messages
      Added aliases and changed some of the default commands
1.3.1 - Changed some command messages
Colorful Chat 0.0 - Added red, orange, gold, yellow, lime, green, cyan, blue, purple, violet, pink, magenta, brown, gray, grey, tree, grass, Mr. Smiles, Forest Land and Riverland
Colorful Chat 0.1 - Added white, black, rgb, Rainbow, Monochrome, Romaniaball, NothingHere, Diermania, SyntexPr, Trion, Coalition, Nortia, Vinland and [Server]
                    Fixed Mr. Smiles not having chat mentions
1.3.2 - Changed /clear to actually clear the chat
Colorful Chat 0.1.1 - Added RSSR, R55R, Moth, Potassium, Atlan, ATLaDOS, :D Anon, St. and Orang
Colorful Chat 1.0 - Rewrote the script with RegEx
                    Added crimson, indigo, fuchsia, mauve, South Nortia, Norisia and Evermore
                    Added support for hex color codes
                    Fixed :D Anon, St. and Моль not being colored
Colorful Chat 1.0.1 - Added water, :D-Anon, USRNSNN and URNNSN
                      Fixed some color names not working
1.4 - Incorporated Colorful Chat into Chat Utils
      Added /color
      Added chat mentions for colorful chat
1.4.1 - Fixed a bug with the /help message
1.4.2 - Added lava, fire, HungaryBall, Rainbowball, Hungary, MagyarLabda, Magyar, Romania, Europe RP and Cyan (nickname) to colorful chat
        Changed crimson, orange, lime, indigo and Trion for colorful chat
1.5 - Added an icon to the script
      Added /yell
      Removed the ability for players to execute their own html
      Fixed the "unknown command" message when using /help for commands added by the script
      Fixed /group ids showing a stray comma when the group it's being used on has only one player
      Changed /help messages to be more similar to the vanilla ones
      Added Coali, EU, Slyntex, Syntaxis, Gabriel, CLN, CoalCRCition and Unbidden to colorful chat
      Changed Rainbow for colorful chat
      Fixed NothingHere7759 not being colored properly
1.5.1 - Cleaned up some of the code
        Added /mute and /unmute
        Added SAR, Shadow Taile, West Vlandia, East Vlandia, Sangsa, Kwapt, Siremia, Magyarország, România, Mothership, MothMethMyth, Mothylamine and СинтексПр to colorful chat
        Changed CoalCRCition, Hungary, Hungaryball, Magyarlabda and Magyar for colorful chat
        Made some names get colored when used as nickname too
1.5.1.1 - Compatible with Neko Client
          Turned off colorful chat by default
*/

'use strict';

!function () {

    //Utilities
    const say = OWOP.chat.send;
    function tell(id, msg) { say('/tell ' + id + ' ' + msg) };
    const locSend = OWOP.chat.local;
    const playerList = OWOP.misc.world.players;

    //Variables
    let quickID;
    let quickGroup;
    let responseID;
    let nearbyThresh = 500;

    //Group command
    const groups = {};
    function gHandle(args) {
        switch (args[0]) {
            case "create": {
                if (args.length != 2) {
                    locSend("Usage: /group create &lt;group name&gt; (group name cannot contain spaces)");
                    break;
                };
                if (!groups[args[1]]) {
                    groups[args[1]] = [];
                    locSend('Group "' + args[1] + '" was successfully created');
                    break;
                };
                locSend('Group "' + args[1] + '" already exists');
            }; break;
            case "delete": {
                if (args.length != 2) {
                    locSend("Usage: /group delete &lt;group name&gt;")
                    break;
                };
                if (!groups[args[1]]) {
                    locSend('Group "' + args[1] + '" does not exist');
                    break;
                };
                delete groups[args[1]];
                locSend('Group "' + args[1] + '" was successfully deleted')
            }; break;
            case "add": {
                if (args.length != 3 || isNaN(args[1])) {
                    locSend("Usage: /group add &lt;id&gt; &lt;group name&gt;");
                    break;
                };
                if (!groups[args[2]]) {
                    locSend('Group "' + args[2] + '" does not exist');
                    break;
                };
                if (groups[args[2]].includes(args[1])) {
                    locSend('Group "' + args[2] + '" already includes ' + args[1]);
                    break;
                };
                if (args[1] == OWOP.client.player.id) {
                    locSend('Group "' + args[2] + '" already includes you')
                    break;
                };
                if (!playerList[args[1]]) {
                    locSend("ID " + args[1] + " does not exist")
                    break;
                };
                groups[args[2]].push(args[1]);
                locSend("ID " + args[1] + ' was successfully added to group "' + args[2] + '"')
            }; break;
            case "remove": {
                if (args.length != 3 || isNaN(args[1])) {
                    locSend("Usage: /group remove &lt;id&gt; &lt;group name&gt;");
                    break;
                };
                if (!groups[args[2]]) {
                    locSend('Group "' + args[2] + '" does not exist');
                    break;
                };
                if (args[1] == OWOP.client.player.id) {
                    locSend('You cannot remove yourself from any group')
                    break;
                };
                if (!groups[args[2]].includes(args[1])) {
                    locSend('Group "' + args[2] + '" does not include ' + args[1]);
                    break;
                };
                groups[args[2]].splice(groups[args[2]].indexOf(args[1]), 1);
                locSend("ID " + args[1] + ' was successfully removed from group "' + args[2] + '"')
            }; break;
            case "tell": {
                if (args.length < 2) {
                    locSend('Correct usage: /group tell &lt;group name&gt; &lt;message&gt;');
                    break;
                };
                if (!groups[args[1]]) {
                    locSend('Group "' + args[1] + '" does not exist');
                    break;
                };
                for (let i = 0; i < groups[args[1]].length; i++) {
                    if (!playerList[groups[args[1]][i]]) {
                        locSend("ID " + groups[args[1]][i] + " disconnected");
                        groups[args[1]].splice(i, 1);
                    };
                };
                let msg = args.slice(2).join(' ') + "\nGroup chat: " + OWOP.client.player.id + ", " + groups[args[1]].join(', ');
                for (let i = 0; i < groups[args[1]].length; i++) {
                    tell(groups[args[1]][i], msg)
                };
            }; break;
            case "ids": {
                if (args.length != 2) {
                    locSend("Usage: /group ids &lt;group name&gt;");
                    break;
                };
                if (!groups[args[1]]) {
                    locSend('Group "' + args[1] + '" does not exist');
                    break;
                };
                locSend('Group "' + args[1] + '": ' + OWOP.client.player.id + (groups[args[1]].length == 0 ? '' : (', ' + groups[args[1]].join(', '))));
            }; break;
            case "groups": {
                if (args.length != 1) {
                    locSend("Usage: /group groups");
                    break;
                };
                locSend('Groups: ' + Object.keys(groups).join(", "))
            }; break;
            default: {
                locSend("Usage: /group&nbsp;create/delete&nbsp;&lt;group&nbsp;name&gt; | /group&nbsp;add/remove&nbsp;&lt;id&gt;&nbsp;&lt;group&nbsp;name&gt; | /group&nbsp;tell&nbsp;&lt;group&nbsp;name&gt;&nbsp;&lt;message&gt; | /group&nbsp;ids&nbsp;&lt;group&nbsp;name&gt; | /group&nbsp;groups");
            };
        };
    };

    //Help command
    function helpHandle(args) {
        if (args.length != 1) {
            locSend("Chat Utils commands: clear, color, group, local, lset, mute, q, qg, qgset, qset, respond, unmute, yell")
            return;
        };
        switch (args[0]) {
            case "group":
            case "groups":
            case "g":
                locSend("group - Create/delete a group, add/remove a player from a group, tell a message to a group, list ids inside a group or list current groups.\nUsage: /group&nbsp;create/delete&nbsp;&lt;group&nbsp;name&gt; | /group&nbsp;add/remove&nbsp;&lt;id&gt;&nbsp;&lt;group&nbsp;name&gt; | /group&nbsp;tell&nbsp;&lt;group&nbsp;name&gt;&nbsp;&lt;message&gt; | /group&nbsp;ids&nbsp;&lt;group&nbsp;name&gt; | /group&nbsp;groups\nAliases: g, groups");
                break;
            case "qset":
            case "qid":
                locSend("qset - Set an id to quickly message with /q.\nUsage: /qset &lt;id&gt;\nAliases: qid")
                break;
            case "q":
                locSend("q - Message the id set with /qset.\nUsage: /q &lt;message&gt;\nAliases: [None]")
                break;
            case "qgset":
            case "qgroup":
            case "qgname":
                locSend("qgset - Set a group to quickly message with /qg.\nUsage: /qgset &lt;group name&gt;\nAliases: qgroup, qgname")
                break;
            case "qg":
                locSend("qg - Message the group set with /qgset.\nUsage: /qg &lt;message&gt;\nAliases: [None]")
                break;
            case "respond":
            case "r":
                locSend("respond - Respond to the latest /tell message from another player.\nUsage: /respond &lt;message&gt;\nAliases: r")
                break;
            case "local":
            case "l":
                locSend("local - Message people within the distance set with /lset (default: 500 pixels).\nUsage: /local &lt;message&gt;\nAliases: l")
                break;
            case "lset":
                locSend("lset - Set the distance within which people receive messages sent with /local (default: 500 pixels).\nUsage: /lset &lt;distance&gt;\nAliases: [None]")
                break;
            case "c":
            case "clear":
                locSend("clear - Clears the chat.\nUsage: /clear\nAliases: c");
                break;
            case "color":
                locSend("color - Toggles colorful chat (currently does not work).\nUsage: /color &lt;true/false&gt;\nAliases: [None]");
                break;
            case "yell":
                locSend("yell - Tell another user a message privately or send it globally in all caps.\nUsage: /yell &lt;id*&gt; &lt;message&gt; (* = optional)\nAliases: [None]");
                break;
            case "mute":
                locSend("mute - Mutes the specified id.\nUsage: /mute &lt;id&gt;\nAliases: [None]");
                break;
            case "unmute":
                locSend("unmute - Unmutes the specified id.\nUsage: /unmute &lt;id&gt;\nAliases: [None]");
        };
        return '';
    };

    //Message processing
    const prevR = OWOP.misc.chatRecvModifier || (m => m);
    OWOP.misc.chatRecvModifier = (msg) => {
        msg = prevR(msg);
        const msgParsed = JSON.parse(msg);
        //Response
        if (msgParsed.type == "whisperSent") {
            responseID = msgParsed.data.targetID;
        };
        if (msgParsed.type == "whisperReceived") {
            responseID = msgParsed.data.senderID;
        };
        //Fix "Unknown command:" messages from /help
        if (msgParsed.type == "error" && msgParsed.data.message.startsWith("Unknown command: ")) {
            if (!['group', 'groups', 'g', 'qset', 'qid', 'q', 'qgset', 'qgroup', 'qgname', 'qg', 'respond', 'r', 'local', 'l', 'lset', 'c', 'clear', 'color', 'yell', 'mute', 'unmute'].every(cmd => cmd != msgParsed.data.message.slice(17, -1))) {
                return '';
            };
        };
        // Muting system because either idk how to use the vanilla one or it just isn't working
        if (OWOP.muted.includes(msgParsed.data.senderID)) return;
        //Colorful Chat
        if (localStorage.colorChat === undefined) localStorage.colorChat = false;
        if (localStorage.colorChat == "true") {
            if (msgParsed.sender == "server" || msgParsed.type == "whisperReceived") return msg;
            const rank = msgParsed.data.rank;
            //console.log("Message before: " + msg); // Debug
            msgParsed.data.rank = 3;
            function sName(rx, replace) {
                msgParsed.data.message = msgParsed.data.message.replace(rx, replace);
            };
            // Prevent people from executing their own code but leave dc emojis alone
            if (rank < 3) {
                sName(/<(?!a?:(.+?):(\d{8,32}))/g, `&lt;`);
                sName(/(?<!a?:(.+?):(\d{8,32}))>/g, `&gt;`);
            };
            // Colors
            sName(/#\b(\d|[a-f]){6}\b/gi, match => `<span style='color:${match}'>${match}</span>`);
            sName(/\bRED\b/gi, match => `<span style='color:#E53B44'>${match}</span>`);
            sName(/\bCRIMSON\b/gi, match => `<span style='color:#9E2835'>${match}</span>`);
            sName(/\bORANGE\b/gi, match => `<span style='color:#FB922B'>${match}</span>`);
            sName(/\bGOLD\b/gi, match => `<span style='color:#FFB735'>${match}</span>`);
            sName(/\bYELLOW\b/gi, match => `<span style='color:#FFE762'>${match}</span>`);
            sName(/\bGREEN\b/gi, match => `<span style='color:#63C64D'>${match}</span>`);
            sName(/\bLIME\b/gi, match => `<span style='color:#B1D657'>${match}</span>`);
            sName(/\bBLUE\b/gi, match => `<span style='color:#3AB2FF'>${match}</span>`);
            sName(/\bINDIGO\b/gi, match => `<span style='color:#0484D1'>${match}</span>`);
            sName(/\bCYAN\b/gi, match => `<span style='color:#2CE8F4'>${match}</span>`);
            sName(/\b(MAGENTA|PINK|FUCHSIA)\b/gi, match => `<span style='color:#FF41E4'>${match}</span>`);
            sName(/\b(VIOLET|PURPLE|MAUVE)\b/gi, match => `<span style='color:#AB80F9'>${match}</span>`);
            sName(/\bBROWN\b/gi, match => `<span style='color:#B86F50'>${match}</span>`);
            sName(/\bGR(A|E)Y\b/gi, match => `<span style='color:#AFBFD2'>${match}</span>`);
            sName(/\bWHITE\b/gi, match => `<span style='color:#FFFFFF'>${match}</span>`);
            sName(/\bBLACK\b/gi, match => `<span style='color:#000000'>${match}</span>`);
            sName(/\bRGB\b/gi, match => { match = match.split(""); return `<span style='color:#FF0000'>${match[0]}</span><span style='color:#00FF00'>${match[1]}</span><span style='color:#0000FF'>${match[2]}</span>` });
            // Other words
            sName(/\bTREE\b/gi, match => `<span style='color:#B86F50'>${match}</span>`);
            sName(/\bGRASS\b/gi, match => `<span style='color:#63C64D'>${match}</span>`);
            sName(/\bWATER\b/gi, match => `<span style='color:#3AB2FF'>${match}</span>`);
            sName(/\bLAVA\b/gi, match => `<span style='color:#FB922B'>${match}</span>`);
            sName(/\bFIRE\b/gi, match => `<span style='color:#E53B44'>${match}</span>`);
            // Forest Land
            if (msgParsed.data.nick.match(/\b(F|L)OREST\s(L|F)AND\b/gi)) {
                msgParsed.data.nick = "<span style='color:#63C64D'>" + msgParsed.data.nick + "</span>"
            };
            sName(/\bFOREST(\s?LAND)?\b/gi, match => `<span style='color:#63C64D'>${match}</span>`);
            // Mr. Smiles
            if (msgParsed.data.nick.match(/\bMR\.?\sSMILES\b/gi)) {
                msgParsed.data.nick = "<span style='color:#FFFFFF'>" + msgParsed.data.nick + "</span>"
            };
            sName(/\b(MR\.?\s)?SMILES\b/gi, match => `<span style='color:#FFFFFF'>${match}</span>`);
            // Riverland
            if (msgParsed.data.nick.includes("Riverland")) {
                msgParsed.data.nick = "<span style='color:#0484D1'>" + msgParsed.data.nick + "</span>"
            };
            sName(/\bRIVER(\s?LAND)?\b/gi, match => `<span style='color:#0484D1'>${match}</span>`);
            // Rainbow
            if (msgParsed.data.nick.includes("Rainbowball")) {
                msgParsed.data.nick = msgParsed.data.nick.replace(/\bRAINBOWBALL\b/gi, `<span class="rainbow-container"><span class="rainbow">Rainbowball</span><span class="rainbow-back">Rainbowball</span></span>`);
                msgParsed.data.nick = msgParsed.data.nick.replace(/\[\d+?\]\s/, ``);
                if (rank < 2) { msgParsed.data.nick = `<span style='color:#FF0000'>[</span><span style='color:#00FF00'>${msgParsed.data.senderID}</span><span style='color:#0000FF'>]</span> ${msgParsed.data.nick}` };
                if (rank == 2) { msgParsed.data.nick = `<span style='color:#FF0000'>(</span><span style='color:#00FF00'>M</span><span style='color:#0000FF'>)</span> ${msgParsed.data.nick}` };
                if (rank == 3) { msgParsed.data.nick = `<span style='color:#FF0000'>(</span><span style='color:#00FF00'>A</span><span style='color:#0000FF'>)</span> ${msgParsed.data.nick}` };
            } else if (msgParsed.data.nick.includes("Rainbow")) {
                msgParsed.data.nick = msgParsed.data.nick.replace(/\bRAINBOW\b/gi, `<span class="rainbow-container"><span class="rainbow">Rainbow</span><span class="rainbow-back">Rainbow</span></span>`);
                msgParsed.data.nick = msgParsed.data.nick.replace(/\[\d+?\]\s/, ``);
                if (rank < 2) { msgParsed.data.nick = `<span style='color:#FF0000'>[</span><span style='color:#00FF00'>${msgParsed.data.senderID}</span><span style='color:#0000FF'>]</span> ${msgParsed.data.nick}` };
                if (rank == 2) { msgParsed.data.nick = `<span style='color:#FF0000'>(</span><span style='color:#00FF00'>M</span><span style='color:#0000FF'>)</span> ${msgParsed.data.nick}` };
                if (rank == 3) { msgParsed.data.nick = `<span style='color:#FF0000'>(</span><span style='color:#00FF00'>A</span><span style='color:#0000FF'>)</span> ${msgParsed.data.nick}` };
            };
            sName(/\bRAINBOW\b/gi, match => `<span class="rainbow-container"><span class="rainbow">${match}</span><span class="rainbow-back">${match}</span></span>`);
            sName(/\bRAINBOWBALL\b/gi, match => `<span class="rainbow-container"><span class="rainbow">${match}</span><span class="rainbow-back">${match}</span></span>`);
            // Monochrome
            if (msgParsed.data.nick.includes("Monochrome")) {
                msgParsed.data.nick = "<span style='color:#000000'>" + msgParsed.data.nick.replaceAll("Monochrome", "M<span style='color:#404040'>o<span style='color:#808080'>n<span style='color:#C0C0C0'>o<span style='color:#FFFFFF'>ch</span>r</span>o</span>m</span>e") + "</span>";
            };
            sName(/\bMONOCHROME\b/gi, match => { match = match.split(""); return `<span style='color:#000000'>${match[0]}<span style='color:#404040'>${match[1]}<span style='color:#808080'>${match[2]}<span style='color:#C0C0C0'>${match[3]}<span style='color:#FFFFFF'>${match[4]}${match[5]}</span>${match[6]}</span>${match[7]}</span>${match[8]}</span>${match[9]}</span>` });
            // Romaniaball
            if (msgParsed.data.nick.includes("Romaniaball")) {
                msgParsed.data.nick = "<span style='color:#003CB3'>" + msgParsed.data.nick.replaceAll("Romaniaball", "Roma<span style='color:#FCD116'>nia</span><span style='color:#CE1126'>ball</span>") + "</span>";
            };
            sName(/\bROMANIABALL\b/gi, match => { match = match.split(""); return `<span style='color:#003CB3'>${match[0] + match[1] + match[2] + match[3]}</span><span style='color:#FCD116'>${match[4] + match[5] + match[6]}</span><span style='color:#CE1126'>${match[7] + match[8] + match[9] + match[10]}</span>` });
            sName(/\bROM(A|Â)NIA\b/gi, match => { match = match.split(""); return `<span style='color:#003CB3'>${match[0] + match[1]}</span><span style='color:#FCD116'>${match[2] + match[3] + match[4]}</span><span style='color:#CE1126'>${match[5] + match[6]}</span>` });
            // Nothinghere
            if (msgParsed.data.nick.includes("NothingHere")) {
                msgParsed.data.nick = "<span style='color:#63C64D'>" + msgParsed.data.nick.replaceAll("NothingHere", "<span style='color:#FFE762'>Nothing</span><span style='color:#63C64D'>Here</span>") + "</span>";
            };
            sName(/\bNOTHINGHERE(7759)?\b/gi, match => { match = match.split(""); return `<span style='color:#FFE762'>${match[0] + match[1] + match[2] + match[3] + match[4] + match[5] + match[6]}<span style='color:#63C64D'>${match[7] + match[8] + match[9] + match[10]}</span>${match[11] ? "7759" : ""}</span>` });
            // Diermania
            if (msgParsed.data.nick.includes("Diermania")) {
                msgParsed.data.nick = "<span style='color:#DD0000'>" + msgParsed.data.nick.replaceAll("Diermania", "Die<span style='color:#FFCE00'>r<span style='color:#000000'>m</span>a</span>nia") + "</span>";
            };
            sName(/\bDIERMANIA\b/gi, match => { match = match.split(""); return `<span style='color:#DD0000'>${match[0] + match[1] + match[2]}<span style='color:#FFCE00'>${match[3]}<span style='color:#000000'>${match[4]}</span>${match[5]}</span>${match[6] + match[7] + match[8]}</span>` });
            // SyntexPr
            if (msgParsed.data.nick.match(/\bSL?YNT(EX(PR)?|AXIS)\b/gi)) {
                msgParsed.data.nick = "<span style='color:#417171'>" + msgParsed.data.nick + "</span>";
            };
            sName(/\bSL?YNT(EX(PR)?|AXIS)\b/gi, match => `<span style='color:#417171'>${match}</span>`);
            sName(/\bTRION(\sNEX(\b\.|US(ORIATE)?)?)?(?=\s|$|"|'|\b)/gi, match => { match = match.split(""); return `<span style='color:#21D714'>${match[0]}<span style='color:#FFFFFF'>${match[1]}<span style='color:#000000'>${match[2]}</span>${match[3]}</span>${match.slice(4).join("")}</span>`; });
            // СинтексПр
            if (msgParsed.data.nick.match(/(?<=\s|^|"|'|\b)СЛ?ИНТ((Е|Э)КС(ПР)?|АКСИС)(?=\s|$|"|'|\b)/gi)) {
                msgParsed.data.nick = "<span style='color:#417171'>" + msgParsed.data.nick + "</span>";
            };
            sName(/(?<=\s|^|"|'|\b)СЛ?ИНТ((Е|Э)КС(ПР)?|АКСИС)(?=\s|$|"|'|\b)/gi, match => `<span style='color:#417171'>${match}</span>`);
            // Coalition
            if (msgParsed.data.nick.includes("Coalition")) {
                msgParsed.data.nick = "<span style='color:#608C5E'>" + msgParsed.data.nick + "</span>";
            };
            sName(/\b(COALI(TION)?|CLN)\b/gi, match => `<span style='color:#608C5E'>${match}</span>`);
            // Unbidden
            if (msgParsed.data.nick.match(/\b(CRC|UNBIDDEN)\b/gi)) {
                msgParsed.data.nick = "<span style='color:#90F1F8'>" + msgParsed.data.nick + "</span>";
            };
            sName(/\b(CRC|UNBIDDEN)\b/gi, match => `<span style='color:#90F1F8'>${match}</span>`);
            // CoalCRCition
            if (msgParsed.data.nick.match(/\bCOALCRCITION\b/gi)) {
                msgParsed.data.nick = "<span style='color:#6D80A5'>" + msgParsed.data.nick + "</span>";
            };
            sName(/\bCOALCRCITION\b/gi, match => `<span style='color:#6D80A5'>${match}</span>`);
            // Nortia
            if (msgParsed.data.nick.includes("Nortia") || msgParsed.data.nick.includes("USRNSNN") || msgParsed.data.nick.includes("URNNSN")) {
                msgParsed.data.nick = "<span style='color:#32E27E'>" + msgParsed.data.nick + "</span>";
            };
            sName(/\b((SOUTH\s)?NORTIA|USRNSNN|URNNSN)\b/gi, match => `<span style='color:#32E27E'>${match}</span>`);
            sName(/\bNORISIA\b/gi, match => `<span style='color:#1E8F73'>${match}</span>`);
            // Vinland
            if (msgParsed.data.nick.includes("Vinland")) {
                msgParsed.data.nick = "<span style='color:#DEB129'>" + msgParsed.data.nick + "</span>";
            };
            sName(/\bVINLAND\b/gi, match => `<span style='color:#DEB129'>${match}</span>`);
            // [Server]:
            if (msgParsed.data.nick.includes("[Server]")) {
                msgParsed.data.nick = "<span style='color:#FF41E4'>" + msgParsed.data.nick; + "</span>"
            };
            // RSSR
            if (msgParsed.data.nick.match(/\bR(SS|55)R\b/gi)) {
                msgParsed.data.nick = "<span style='color:#FF0000'>" + msgParsed.data.nick + "</span>";
            };
            sName(/\bR(SS|55)R\b/gi, match => `<span style='color:#FF0000'>${match}</span>`);
            // Moth
            if (msgParsed.data.nick.match(/(?<=\s|^|"|'|\b)(MOTH(ERSHIP|METHMYTH|YLAMINE)?|МОЛЬ)(?=\s|$|"|'|\b)/gi)) {
                msgParsed.data.nick = "<span style='color:#D7C39F'>" + msgParsed.data.nick + "</span>";
            };
            sName(/(?<=\s|^|"|'|\b)(MOTH(ERSHIP|METHMYTH|YLAMINE)?|МОЛЬ)(?=\s|$|"|'|\b)/gi, match => `<span style='color:#D7C39F'>${match}</span>`);
            sName(/\bSAR\b/gi, match => `<span style='color:#D50B0B'>${match}</span>`);
            // Potassium
            if (msgParsed.data.nick.includes("Potassium")) {
                msgParsed.data.nick = "<span style='color:#FFA200'>" + msgParsed.data.nick + "</span>";
            };
            sName(/\b(POTASS(IUM)?|EVERMORE)\b/gi, match => `<span style='color:#FFA200'>${match}</span>`);
            // Atlan
            if (msgParsed.data.nick.includes("Atlan")) {
                msgParsed.data.nick = "<span style='color:#FFFFFF'>" + msgParsed.data.nick.replaceAll("Atlan", "A<span style='color:#808080'>t<span style='color:#FF0000'>l</span>a</span>n") + "</span>";
            };
            sName(/\bATLAN\b/gi, match => { match = match.split(""); return `<span style='color:#FFFFFF'>${match[0]}<span style='color:#808080'>${match[1]}<span style='color:#FF0000'>${match[2]}</span>${match[3]}</span>${match[4]}</span>` });
            // ATLaDOS
            if (msgParsed.data.nick.includes("ATLaDOS")) {
                msgParsed.data.nick = "<span style='color:#FFFFFF'>" + msgParsed.data.nick.replaceAll("ATLaDOS", "A<span style='color:#AAAAAA'>T<span style='color:#555555'>L<span style='color:#FF0000'>a</span>D</span>O</span>S") + "</span>";
            };
            sName(/\bATLAN?DOS\b/gi, match => { match = match.split(""); return `<span style='color:#FFFFFF'>${match[0]}<span style='color:#AAAAAA'>${match[1]}<span style='color:#555555'>${match[2]}<span style='color:#FF0000'>${match[3] + (match.length == 7 ? "" : match[4])}</span>${match[match.length - 3]}</span>${match[match.length - 2]}</span>${match[match.length - 1]}</span>` });
            // :D anon
            sName(/(?<=\s|^|"|'|\b):\bD(\s|-)ANON\b/gi, match => `<span style='color:#0080FF'>${match}</span>`);
            // St.
            if (msgParsed.data.nick.includes("St.")) {
                msgParsed.data.nick = "<span style='color:#A1409D'>" + msgParsed.data.nick + "</span>";
            };
            sName(/\bST\.?(?=\s|$|"|'|\b)/gi, match => `<span style='color:#A1409D'>${match}</span>`);
            sName(/\bSHADOW\sTAI?LE\b/gi, match => `<span style='color:#4394A0'>${match.slice(0, 6)}</span><span style='color:#F430B2'>${match.slice(7)}</span>`);
            // Orang
            if (msgParsed.data.nick.includes("Orang")) {
                msgParsed.data.nick = "<span style='color:#FF8800'>" + msgParsed.data.nick + "</span>";
            };
            sName(/\bOrang\b/gi, match => `<span style='color:#FF8800'>${match}</span>`);
            // HungaryBall
            if (msgParsed.data.nick.includes("HungaryBall")) {
                msgParsed.data.nick = "<span style='color:#CE2939'>" + msgParsed.data.nick.replaceAll("HungaryBall", "Hung<span style='color:#FFFFFF'>ary</span><span style='color:#477050'>Ball</span>") + "</span>";
            };
            if (msgParsed.data.nick.includes("Hungaryball")) {
                msgParsed.data.nick = "<span style='color:#CE2939'>" + msgParsed.data.nick.replaceAll("Hungaryball", "Hung<span style='color:#FFFFFF'>ary</span><span style='color:#477050'>ball</span>") + "</span>";
            };
            sName(/\bHUNGARYBALL\b/gi, match => { match = match.split(""); return `<span style='color:#CE2939'>${match[0] + match[1] + match[2] + match[3]}</span><span style='color:#FFFFFF'>${match[4] + match[5] + match[6]}</span><span style='color:#477050'>${match[7] + match[8] + match[9] + match[10]}</span>` });
            sName(/\bHUNGARY\b/gi, match => { match = match.split(""); return `<span style='color:#CE2939'>${match[0] + match[1]}</span><span style='color:#FFFFFF'>${match[2] + match[3] + match[4]}</span><span style='color:#477050'>${match[5] + match[6]}</span>` });
            // HungaryBall
            if (msgParsed.data.nick.includes("MagyarLabda")) {
                msgParsed.data.nick = "<span style='color:#CE2939'>" + msgParsed.data.nick.replaceAll("MagyarLabda", "Magy<span style='color:#FFFFFF'>arL</span><span style='color:#477050'>abda</span>") + "</span>";
            };
            if (msgParsed.data.nick.includes("Magyarlabda")) {
                msgParsed.data.nick = "<span style='color:#CE2939'>" + msgParsed.data.nick.replaceAll("Magyarlabda", "Magy<span style='color:#FFFFFF'>arl</span><span style='color:#477050'>abda</span>") + "</span>";
            };
            sName(/\bMAGYARLABDA\b/gi, match => { match = match.split(""); return `<span style='color:#CE2939'>${match[0] + match[1] + match[2] + match[3]}</span><span style='color:#FFFFFF'>${match[4] + match[5] + match[6]}</span><span style='color:#477050'>${match[7] + match[8] + match[9] + match[10]}</span>` });
            sName(/\bMAGYAR\b/gi, match => { match = match.split(""); return `<span style='color:#CE2939'>${match[0] + match[1]}</span><span style='color:#FFFFFF'>${match[2] + match[3]}</span><span style='color:#477050'>${match[4] + match[5]}</span>` });
            sName(/\bMAGYARORSZ(Á|A)G\b/gi, match => `<span style='color:#CE2939'>${match.slice(0, 4)}</span><span style='color:#FFFFFF'>${match.slice(4, 8)}</span><span style='color:#477050'>${match.slice(8)}</span>`);
            // Europe RP
            if (msgParsed.data.nick.includes("Europe RP")) {
                msgParsed.data.nick = "<span style='color:#0000FF'>" + msgParsed.data.nick + "</span>";
            };
            sName(/\bEU(ROPE(\sRP)?)?\b/gi, match => `<span style='color:#0000FF'>${match}</span>`);
            // Cyan
            if (msgParsed.data.nick.match(/\bCYAN\b/gi)) {
                msgParsed.data.nick = "<span style='color:#2CE8F4'>" + msgParsed.data.nick + "</span>";
            };
            // Gabriel
            if (msgParsed.data.nick.match(/\bGABRIEL\b/gi)) {
                msgParsed.data.nick = msgParsed.data.nick.replace(/\bGABRIEL\b/gi, match => `<span style='color:#F0F0F0'>${match[0]}<span style='color:#F4E5BC'>${match[1]}<span style='color:#F9DB88'>${match[2]}<span style='color:#FED154'>${match[3]}</span>${match[4]}</span>${match[5]}</span>${match[6]}</span>`);
                msgParsed.data.nick = msgParsed.data.nick.replace(/\[\d+?\]\s/, ``);
                if (rank < 2) { msgParsed.data.nick = `<span style='color:#F0F0F0'>[<span style='color:#F9DB88'>${msgParsed.data.senderID}</span>]</span> ${msgParsed.data.nick}` };
                if (rank == 2) { msgParsed.data.nick = `<span style='color:#F0F0F0'>(<span style='color:#F9DB88'>M</span>)</span> ${msgParsed.data.nick}` };
                if (rank == 3) { msgParsed.data.nick = `<span style='color:#F0F0F0'>(<span style='color:#F9DB88'>A</span>)</span> ${msgParsed.data.nick}` };
            };
            sName(/\bGABRIEL\b/gi, match => `<span style='color:#F0F0F0'>${match[0]}<span style='color:#F4E5BC'>${match[1]}<span style='color:#F9DB88'>${match[2]}<span style='color:#FED154'>${match[3]}</span>${match[4]}</span>${match[5]}</span>${match[6]}</span>`);
            // Vlandia
            sName(/\bWEST\sVLANDIA\b/gi, match => `<span style='color:#950000'>${match}</span>`);
            sName(/\bEAST\sVLANDIA\b/gi, match => `<span style='color:#FF7A33'>${match}</span>`);
            sName(/\b(?<!(EA|WE)ST\s)VLANDIA\b/gi, match => `<span style='color:#950000'>${match}</span>`);
            // Sangsa
            sName(/\bSANGSA\b/gi, match => `<span style='color:#FF0000'>${match.slice(0, 1)}</span><span style='color:#0000FF'>${match.slice(1, 5)}</span><span style='color:#FF00F7'>${match.slice(-1)}</span>`);
            // Kwapt
            sName(/\b(KWAPT|62143)\b/gi, match => `<span style='color:#A45195'>${match}</span>`);
            // Siremia
            sName(/\bSIREMIA\b/gi, match => `<span style='color:#FFFFFF'>${match}</span>`);
            // Chat mention
            let findPlayer = new RegExp(`(?<=\\s|^|"|'|\\b)${OWOP.client.player.id}(?=\\s|$|"|'|\\b)`, "g");
            sName(findPlayer, match => `<span style='color:#FF0000'>${match}</span>`);
            // Restore normal message color
            if (rank == 0) msgParsed.data.nick = "<span style='color:#999999'>" + msgParsed.data.nick
            if (rank == 1) msgParsed.data.nick = "<span style='color:#3AB2FF'>" + msgParsed.data.nick + "</span><span style='color:#FFFFFF'>";
            if (rank == 2) msgParsed.data.nick = "<span style='color:#86FF41'>" + msgParsed.data.nick;

            //console.log("Message after: " + JSON.stringify(msgParsed)); // Debug
            return JSON.stringify(msgParsed);
        };
        return msg;
    };

    //Command processing
    const prevS = OWOP.misc.chatSendModifier || (m => m);
    OWOP.misc.chatSendModifier = msg => {
        msg = prevS(msg);
        if (!msg.startsWith('/')) return msg;
        const [cmd, ...args] = msg.slice(1).trim().split(/\s+/);
        switch (cmd.toLowerCase()) {
            case "local":
            case "l":
                if (args.length < 1) {
                    locSend('Usage: /local &lt;message&gt;');
                    return '';
                };
                let px = OWOP.client.mouse.tileX
                let py = OWOP.client.mouse.tileY
                let nearbyPlayers = []
                for (let x in playerList) {
                    if (Math.abs(playerList[x].x / 16 - px) <= nearbyThresh && Math.abs(playerList[x].y / 16 - py) <= nearbyThresh) {
                        nearbyPlayers.push(x);
                    };
                };
                if (nearbyPlayers.length == 0) {
                    locSend('No players nearby');
                    return '';
                };
                let localMsg = args.join(' ') + "\nLocal chat: " + OWOP.client.player.id + ", " + nearbyPlayers.join(', ');
                for (let i = 0; i < nearbyPlayers.length; i++) {
                    tell(nearbyPlayers[i], localMsg);
                };
                return '';
            case "lset":
                if (args.length != 1 || isNaN(args[0]) || args[0] < 0) {
                    locSend("Usage: /lset &lt;distance&gt;");
                    return '';
                };
                nearbyThresh = args;
                return '';
            case "clear":
            case "c":
                if (args.length != 0) {
                    locSend("Usage: /clear");
                    return '';
                };
                OWOP.chat.clear();
                return '';
            case "respond":
            case "r":
                if (!responseID) {
                    locSend('Nobody messaged you yet');
                    return '';
                }
                if (!playerList[responseID]) {
                    locSend(`ID ${responseID} disconnected`);
                    return '';
                };
                tell(responseID, args.join(" "));
                return '';
            case "qid":
            case "qset":
                if (args.length != 1) {
                    locSend('Usage: /qset &lt;id&gt;');
                    return '';
                };
                if (!isNaN(args)) {
                    if (!playerList[args]) {
                        locSend("ID " + args + " doesn't exist.")
                        return '';
                    };
                    quickID = args;
                    return '';
                };
                locSend('Usage: /qset &lt;id&gt;');
                return '';
            case "q":
                if (quickID === undefined) {
                    locSend('Use "/qset &lt;id&gt;" to set a quick id');
                    return '';
                };
                if (args.length == 0) {
                    locSend('Usage: /q &lt;message&gt;');
                    return '';
                };
                if (!playerList[quickID]) {
                    locSend("ID " + quickID + " disconnected");
                    quickID = undefined;
                    return '';
                };
                tell(quickID, args.join(' '));
                return '';
            case "qgname":
            case "qgset":
            case "qgroup": // Group-based
                if (args.length != 1) {
                    locSend('Usage: /qgset &lt;group name&gt;');
                    return '';
                };
                if (!groups[args]) {
                    locSend('Group "' + args + '" does not exist');
                    return '';
                };
                quickGroup = args;
                return '';
            case "qg": // Group-based
                if (quickGroup === undefined) {
                    locSend('Use "/qgset &lt;group name&gt;" to set a quick group');
                    return '';
                };
                if (!groups[quickGroup]) {
                    locSend('Group "' + quickGroup + '" does not exist anymore');
                    quickGroup = undefined;
                    return '';
                };
                for (let i = 0; i < groups[quickGroup].length; i++) {
                    if (!playerList[groups[quickGroup][i]]) {
                        locSend("ID " + groups[quickGroup][i] + " disconnected");
                        groups[quickGroup].splice(i, 1);
                    };
                };
                let quickGroupMsg = args.join(' ') + "\nGroup chat: " + OWOP.client.player.id + ", " + groups[quickGroup].join(', ');
                for (let i = 0; i < groups[quickGroup].length; i++) {
                    tell(groups[quickGroup][i], quickGroupMsg)
                };
                return '';
            case "color":
                if (args.length != 1 || (args != "true" && args != "false")) {
                    locSend("Usage: /color &lt;true/false&gt;");
                    return '';
                };
                localStorage.colorChat = args;
                return '';
            case "mute":
                if (args.length != 1) {
                    locSend('Usage: /mute &lt;id&gt;');
                    return '';
                };
                if (!playerList[args]) {
                    locSend(`ID ${args} does not exist`);
                    return '';
                };
                if (OWOP.muted.includes(Number(args))) {
                    locSend(`ID ${args} is already muted`);
                    return '';
                };
                OWOP.muted.push(Number(args));
                return '';
            case "unmute":
                if (args.length != 1) {
                    locSend('Usage: /unmute &lt;id&gt;');
                    return '';
                };
                if (!playerList[args]) {
                    locSend(`ID ${args} does not exist`);
                    return '';
                };
                if (!OWOP.muted.includes(Number(args))) {
                    locSend(`ID ${args} is not muted`);
                    return '';
                };
                OWOP.muted.splice(OWOP.muted.indexOf(Number(args)), 1);
                return '';
            case "g":
            case "group":
            case "groups": // Group-based
                gHandle(args);
                return '';
            case "yell":
                if (args.length == 0) {
                    locSend('Usage: /yell &lt;id*&gt; &lt;message&gt; (* = optional)');
                    return '';
                };
                if (!isNaN(args[0])) {
                    tell(args[0], args.slice(1).join(' ').toUpperCase());
                    return '';
                };
                say(args.join(' ').toUpperCase());
                return '';
            case "help":
            case "h":
            case "?":
                helpHandle(args);
        };
        return msg;
    };
    console.log('Chat Utils installed');
}();