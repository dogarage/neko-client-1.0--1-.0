OWOP.chat.postFormatRecvModifier = msg => {
    let a = ['BOT', '5h1t', '5hit', 'a55', 'anal', 'anus', 'ar5e', 'arrse', 'arse', 'ass', 'ass-fucker', 'asses', 'assfucker', 'assfukka', 'asshole', 'assholes', 'asswhole', 'a_s_s', 'b00bs', 'b17ch', 'b1tch', 'ballbag', 'balls', 'ballsack', 'bastard', 'beastial', 'beastiality', 'bellend', 'bestial', 'bestiality', 'bi&plus;ch', 'biatch', 'bitch', 'bitcher', 'bitchers', 'bitches', 'bitchin', 'bitching', 'bloody', 'blowjob', 'blowjobs', 'boiolas', 'bollock', 'bollok', 'boner', 'boob', 'boobs', 'booobs', 'boooobs', 'booooobs', 'breasts', 'buceta', 'bugger', 'bum', 'butt', 'butthole', 'buttmuch', 'buttplug', 'c0ck', 'c0cksucker', 'cawk', 'chink', 'cipa', 'cl1t', 'clit', 'clitoris', 'clits', 'cnut', 'cock', 'cock-sucker', 'cockface', 'cockhead', 'cockmunch', 'cockmuncher', 'cocks', 'cocksuck', 'cocksucked', 'cocksucker', 'cocksucking', 'cocksucks', 'cocksuka', 'cocksukka', 'cok', 'cokmuncher', 'coksucka', 'coon', 'cox', 'cum', 'cummer', 'cumming', 'cums', 'cumshot', 'cunilingus', 'cunillingus', 'cunnilingus', 'cunt', 'cuntlick', 'cuntlicker', 'cuntlicking', 'cunts', 'cyalis', 'cyberfuc', 'cyberfuck', 'cyberfucked', 'cyberfucker', 'cyberfuckers', 'cyberfucking', 'd1ck', 'damn', 'dick', 'dickhead', 'dildo', 'dildos', 'dink', 'dinks', 'dirsa', 'dlck', 'doggin', 'dogging', 'donkeyribber', 'doosh', 'duche', 'dyke', 'ejaculate', 'ejaculated', 'ejaculates', 'ejaculating', 'ejaculatings', 'ejaculation', 'ejakulate', 'f4nny', 'fag', 'fagging', 'faggitt', 'faggot', 'faggs', 'fagot', 'fagots', 'fags', 'fanny', 'fannyflaps', 'fannyfucker', 'fanyy', 'fatass', 'fcuk', 'fcuker', 'fcuking', 'feck', 'fecker', 'felching', 'fellate', 'fellatio', 'fingerfuck', 'fingerfucked', 'fingerfucker', 'fingerfuckers', 'fingerfucking', 'fingerfucks', 'fistfuck', 'fistfucked', 'fistfucker', 'fistfuckers', 'fistfucking', 'fistfuckings', 'fistfucks', 'flange', 'fook', 'fooker', 'fuck', 'fucka', 'fucked', 'fucker', 'fuckers', 'fuckhead', 'fuckheads', 'fuckin', 'fucking', 'fuckings', 'fuckingshitmotherfucker', 'fuckme', 'fucks', 'fuckwhit', 'fuckwit', 'fudgepacker', 'fuk', 'fuker', 'fukker', 'fukkin', 'fuks', 'fukwhit', 'fukwit', 'fux', 'fux0r', 'f_u_c_k', 'gangbang', 'gangbanged', 'gangbangs', 'gaylord', 'gaysex', 'goatse', 'hardcoresex', 'heshe', 'hoar', 'hoare', 'hoer', 'homo', 'hore', 'horniest', 'horny', 'hotsex', 'jackoff', 'jap', 'jism', 'jiz', 'jizm', 'jizz', 'kawk', 'knob', 'knobead', 'knobed', 'knobend', 'knobhead', 'knobjocky', 'knobjokey', 'kock', 'kondum', 'kondums', 'kum', 'kummer', 'kumming', 'kums', 'kunilingus', 'l3i&plus;ch', 'l3itch', 'labia', 'lmfao', 'lust', 'lusting', 'm0f0', 'm0fo', 'm45terbate', 'ma5terb8', 'ma5terbate', 'masochist', 'masterb8', 'masterbat*', 'masterbat3', 'masterbate', 'masterbation', 'masterbations', 'masturbate', 'mof0', 'mofo', 'mothafuck', 'mothafucka', 'mothafuckas', 'mothafuckaz', 'mothafucked', 'mothafucker', 'mothafuckers', 'mothafuckin', 'mothafucking', 'mothafuckings', 'mothafucks', 'mother fucker', 'motherfuck', 'motherfucked', 'motherfucker', 'motherfuckers', 'motherfuckin', 'motherfucking', 'motherfuckings', 'motherfuckka', 'motherfucks', 'muff', 'mutha', 'muthafecker', 'muthafuckker', 'muther', 'mutherfucker', 'n1gga', 'n1gger', 'nazi', 'nigg3r', 'nigg4h', 'nigga', 'niggah', 'niggas', 'niggaz', 'nigger', 'niggers', 'nob', 'nobhead', 'nobjocky', 'nobjokey', 'numbnuts', 'nutsack', 'orgasim', 'orgasims', 'orgasm', 'orgasms', 'p0rn', 'pawn', 'pecker', 'penis', 'penisfucker', 'phonesex', 'phuck', 'phuk', 'phuked', 'phuking', 'phukked', 'phukking', 'phuks', 'phuq', 'pigfucker', 'pimpis', 'piss', 'pissed', 'pisser', 'pissers', 'pisses', 'pissflaps', 'pissin', 'pissing', 'pissoff', 'poop', 'porn', 'porno', 'pornography', 'pornos', 'prick', 'pricks', 'pron', 'pube', 'pusse', 'pussi', 'pussies', 'pussy', 'pussys', 'rectum', 'retard', 'rimjaw', 'rimming', 'sadist', 'schlong', 'screwing', 'scroat', 'scrote', 'scrotum', 'semen', 'sex', 'sh1t', 'shag', 'shagger', 'shaggin', 'shagging', 'shemale', 'shi&plus;', 'shit', 'shitdick', 'shite', 'shited', 'shitey', 'shitfuck', 'shitfull', 'shithead', 'shiting', 'shitings', 'shits', 'shitted', 'shitter', 'shitters', 'shitting', 'shittings', 'shitty', 'skank', 'slut', 'sluts', 'smegma', 'smut', 'snatch', 'spac', 'spunk', 's_h_i_t', 't1tt1e5', 't1tties', 'teets', 'teez', 'testical', 'testicle', 'tit', 'titfuck', 'tits', 'titt', 'tittie5', 'tittiefucker', 'titties', 'tittyfuck', 'tittywank', 'titwank', 'tosser', 'turd', 'tw4t', 'twat', 'twathead', 'twatty', 'twunt', 'twunter', 'v14gra', 'v1gra', 'vagina', 'viagra', 'vulva', 'w00se', 'wang', 'wank', 'wanker', 'wanky', 'whoar', 'whore', 'willies', 'willy', 'xrated', 'xxx', 'augustberchelmann'];
    return msg.replace(/\b\w+\b/g, w => a.indexOf(w.toLowerCase()) !== -1 ? '<s>' + w + '</s>' : w);
};

function stickyimg() {
    if (OWOP.spawnbanner) return;

    OWOP.spawnbanner = true;

    let elem = document.createElement('div');
    let shown = false;
    let ismag = false;
    elem.style.position = 'fixed';
    elem.style.transformOrigin = 'left top 0px';
    elem.style.overflow = 'hidden';
    elem.style.width = '512px';
    elem.style.height = '512px';
    elem.style.backgroundImage = 'url("https://uvias.com/art/mainbox.png")';
    let move = function () {
        let sc = OWOP.camera.zoom / 16;
        let tx = ((-OWOP.camera.x - 16) * OWOP.camera.zoom);
        let ty = ((-OWOP.camera.y - 16) * OWOP.camera.zoom);
        if (tx > -512 * sc && ty > -512 * sc && tx < window.innerWidth && ty < window.innerHeight) {
            if (sc > 1.0 && !ismag) {
                ismag = true;
                elem.style.imageRendering = 'pixelated';
            } else if (sc <= 1.0 && ismag) {
                ismag = false;
                elem.style.imageRendering = 'auto';
            }

            elem.style.transform = 'matrix(' + sc + ',0,0,' + sc + ',' + Math.round(tx) + ',' + Math.round(ty) + ')';
            if (!shown) {
                OWOP.client.elements.viewport.appendChild(elem);
                shown = true;
            }
        } else {
            if (shown) {
                elem.remove();
                shown = false;
            }
        }
    };
    if (OWOP.events.camMoved) {
        OWOP.on(OWOP.events.camMoved, move);
        move();
    }
    else if (OWOP.events.camera && OWOP.events.camera.moved) {
        OWOP.on(OWOP.events.camera.moved, move);
        move();
    }

}

stickyimg();
/*
if ('health' in OWOP) {
    OWOP.healthDiv.style.display = "none";
} else {
    OWOP.health = 10;
    OWOP.healthDiv = document.createElement("div");
    OWOP.animDiv = document.createElement("div");
    OWOP.animDiv.style.position = 'fixed';
    OWOP.animDiv.style.transformOrigin = 'left top 0px';
    OWOP.animDiv.style.pointerEvents = "none";
    OWOP.client.elements.viewport.appendChild(OWOP.animDiv);
    OWOP.fcss = document.createElement("style");
    OWOP.fcss.type = "text/css";
    OWOP.fcss.innerHTML = ".shock {position:fixed;width: 16px;height: 16px;background-color: red;border-radius: 100%;animation-name:ripple;animation-duration:1500ms;animation-fill-mode:forwards;} @keyframes ripple {from {opacity: 0.75;transform: scale3d(0.75, 0.75, 1);} to {opacity: 0;transform: scale3d(16, 16, 1);}}";
    OWOP.healthDiv.style.cssText = "pointer-events:none;position: fixed;display:none;width: 300px;height: 24px;bottom: 80px;left: 50%;transform: translateX(-50%);filter: drop-shadow(0px 0px 4px black);background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAICAYAAADA+m62AAAAXklEQVQY05XOMQqAQBBD0R8RsfJyK3g4PcJ6OW3EJhYqLDoWBqYJjzACkGSu2FbUSZJHm+EqOwmALaXb0c4zNY8sPof2nAFo+h6Aij+R5Am8Blf++olfKMKfqMQROgDAGDNeIzbaRAAAAABJRU5ErkJggg==);background-size: 30px;image-rendering: pixelated;";
    document.body.appendChild(OWOP.healthDiv);
    document.head.appendChild(OWOP.fcss);
    OWOP.net.connection.onmessage = function(e) {
        if  (typeof e.data === "string") return;
        let dv = new DataView(e.data);
        switch(dv.getUint8(0)) {
            case 9:
                OWOP.health = dv.getInt32(1, true);
                OWOP.healthDiv.style.width = 30 * OWOP.health + "px";
                OWOP.healthDiv.style.display = OWOP.health == 10 ? "none" : "initial";
                break;
            case 10:
                let bx = dv.getInt32(1, true);
                let by = dv.getInt32(5, true);
                let e = document.createElement("div");
                e.className = "shock";
                e.style.left = (16 * bx) + "px";
                e.style.top = (16 * by) + "px";
                OWOP.animDiv.appendChild(e);
                setTimeout(function() {e.remove();}, 1500);
                break;
        }
    };
    OWOP.on(14, function() {
        let sc = OWOP.camera.zoom / 16;
        let tx = ((-OWOP.camera.x) * OWOP.camera.zoom);
        let ty = ((-OWOP.camera.y) * OWOP.camera.zoom);
        OWOP.animDiv.style.transform = 'matrix(' + sc + ',0,0,' + sc + ',' + Math.round(tx) + ',' + Math.round(ty) + ')';
    });
    if (OWOP.tools) {
        OWOP.tools.addToolObject(new OWOP.tools.class("Hammertime", OWOP.cursors.ban, OWOP.fx.player.NONE, OWOP.RANK.NONE, function (tool) {tool.setEvent("mousedown", function(mouse, e) {if (mouse.buttons==1){OWOP.net.connection.send(new Uint8Array(2));}})}));
    } else {
        OWOP.cursors.ban.imgpos = [2, 2]
        OWOP.tool.addToolObject(new OWOP.tool.class("Hammertime", OWOP.cursors.ban, OWOP.fx.player.NONE, OWOP.RANK.NONE, function (tool) {tool.setEvent("mousedown", function(mouse, e) {if (mouse.buttons==1){OWOP.net.connection.send(new Uint8Array(2));}})}));
    }
}
*/
