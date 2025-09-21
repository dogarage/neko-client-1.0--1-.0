"use strict";
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // node_modules/events/events.js
  var require_events = __commonJS({
    "node_modules/events/events.js"(exports, module) {
      "use strict";
      var R = typeof Reflect === "object" ? Reflect : null;
      var ReflectApply = R && typeof R.apply === "function" ? R.apply : function ReflectApply2(target, receiver, args) {
        return Function.prototype.apply.call(target, receiver, args);
      };
      var ReflectOwnKeys;
      if (R && typeof R.ownKeys === "function") {
        ReflectOwnKeys = R.ownKeys;
      } else if (Object.getOwnPropertySymbols) {
        ReflectOwnKeys = function ReflectOwnKeys2(target) {
          return Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target));
        };
      } else {
        ReflectOwnKeys = function ReflectOwnKeys2(target) {
          return Object.getOwnPropertyNames(target);
        };
      }
      function ProcessEmitWarning(warning) {
        if (console && console.warn) console.warn(warning);
      }
      var NumberIsNaN = Number.isNaN || function NumberIsNaN2(value) {
        return value !== value;
      };
      function EventEmitter2() {
        EventEmitter2.init.call(this);
      }
      module.exports = EventEmitter2;
      module.exports.once = once;
      EventEmitter2.EventEmitter = EventEmitter2;
      EventEmitter2.prototype._events = void 0;
      EventEmitter2.prototype._eventsCount = 0;
      EventEmitter2.prototype._maxListeners = void 0;
      var defaultMaxListeners = 10;
      function checkListener(listener) {
        if (typeof listener !== "function") {
          throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
        }
      }
      Object.defineProperty(EventEmitter2, "defaultMaxListeners", {
        enumerable: true,
        get: function() {
          return defaultMaxListeners;
        },
        set: function(arg) {
          if (typeof arg !== "number" || arg < 0 || NumberIsNaN(arg)) {
            throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + ".");
          }
          defaultMaxListeners = arg;
        }
      });
      EventEmitter2.init = function() {
        if (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) {
          this._events = /* @__PURE__ */ Object.create(null);
          this._eventsCount = 0;
        }
        this._maxListeners = this._maxListeners || void 0;
      };
      EventEmitter2.prototype.setMaxListeners = function setMaxListeners(n) {
        if (typeof n !== "number" || n < 0 || NumberIsNaN(n)) {
          throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + ".");
        }
        this._maxListeners = n;
        return this;
      };
      function _getMaxListeners(that) {
        if (that._maxListeners === void 0)
          return EventEmitter2.defaultMaxListeners;
        return that._maxListeners;
      }
      EventEmitter2.prototype.getMaxListeners = function getMaxListeners() {
        return _getMaxListeners(this);
      };
      EventEmitter2.prototype.emit = function emit(type) {
        var args = [];
        for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
        var doError = type === "error";
        var events = this._events;
        if (events !== void 0)
          doError = doError && events.error === void 0;
        else if (!doError)
          return false;
        if (doError) {
          var er;
          if (args.length > 0)
            er = args[0];
          if (er instanceof Error) {
            throw er;
          }
          var err = new Error("Unhandled error." + (er ? " (" + er.message + ")" : ""));
          err.context = er;
          throw err;
        }
        var handler = events[type];
        if (handler === void 0)
          return false;
        if (typeof handler === "function") {
          ReflectApply(handler, this, args);
        } else {
          var len = handler.length;
          var listeners = arrayClone(handler, len);
          for (var i = 0; i < len; ++i)
            ReflectApply(listeners[i], this, args);
        }
        return true;
      };
      function _addListener(target, type, listener, prepend) {
        var m;
        var events;
        var existing;
        checkListener(listener);
        events = target._events;
        if (events === void 0) {
          events = target._events = /* @__PURE__ */ Object.create(null);
          target._eventsCount = 0;
        } else {
          if (events.newListener !== void 0) {
            target.emit(
              "newListener",
              type,
              listener.listener ? listener.listener : listener
            );
            events = target._events;
          }
          existing = events[type];
        }
        if (existing === void 0) {
          existing = events[type] = listener;
          ++target._eventsCount;
        } else {
          if (typeof existing === "function") {
            existing = events[type] = prepend ? [listener, existing] : [existing, listener];
          } else if (prepend) {
            existing.unshift(listener);
          } else {
            existing.push(listener);
          }
          m = _getMaxListeners(target);
          if (m > 0 && existing.length > m && !existing.warned) {
            existing.warned = true;
            var w = new Error("Possible EventEmitter memory leak detected. " + existing.length + " " + String(type) + " listeners added. Use emitter.setMaxListeners() to increase limit");
            w.name = "MaxListenersExceededWarning";
            w.emitter = target;
            w.type = type;
            w.count = existing.length;
            ProcessEmitWarning(w);
          }
        }
        return target;
      }
      EventEmitter2.prototype.addListener = function addListener(type, listener) {
        return _addListener(this, type, listener, false);
      };
      EventEmitter2.prototype.on = EventEmitter2.prototype.addListener;
      EventEmitter2.prototype.prependListener = function prependListener(type, listener) {
        return _addListener(this, type, listener, true);
      };
      function onceWrapper() {
        if (!this.fired) {
          this.target.removeListener(this.type, this.wrapFn);
          this.fired = true;
          if (arguments.length === 0)
            return this.listener.call(this.target);
          return this.listener.apply(this.target, arguments);
        }
      }
      function _onceWrap(target, type, listener) {
        var state = { fired: false, wrapFn: void 0, target, type, listener };
        var wrapped = onceWrapper.bind(state);
        wrapped.listener = listener;
        state.wrapFn = wrapped;
        return wrapped;
      }
      EventEmitter2.prototype.once = function once2(type, listener) {
        checkListener(listener);
        this.on(type, _onceWrap(this, type, listener));
        return this;
      };
      EventEmitter2.prototype.prependOnceListener = function prependOnceListener(type, listener) {
        checkListener(listener);
        this.prependListener(type, _onceWrap(this, type, listener));
        return this;
      };
      EventEmitter2.prototype.removeListener = function removeListener(type, listener) {
        var list, events, position, i, originalListener;
        checkListener(listener);
        events = this._events;
        if (events === void 0)
          return this;
        list = events[type];
        if (list === void 0)
          return this;
        if (list === listener || list.listener === listener) {
          if (--this._eventsCount === 0)
            this._events = /* @__PURE__ */ Object.create(null);
          else {
            delete events[type];
            if (events.removeListener)
              this.emit("removeListener", type, list.listener || listener);
          }
        } else if (typeof list !== "function") {
          position = -1;
          for (i = list.length - 1; i >= 0; i--) {
            if (list[i] === listener || list[i].listener === listener) {
              originalListener = list[i].listener;
              position = i;
              break;
            }
          }
          if (position < 0)
            return this;
          if (position === 0)
            list.shift();
          else {
            spliceOne(list, position);
          }
          if (list.length === 1)
            events[type] = list[0];
          if (events.removeListener !== void 0)
            this.emit("removeListener", type, originalListener || listener);
        }
        return this;
      };
      EventEmitter2.prototype.off = EventEmitter2.prototype.removeListener;
      EventEmitter2.prototype.removeAllListeners = function removeAllListeners(type) {
        var listeners, events, i;
        events = this._events;
        if (events === void 0)
          return this;
        if (events.removeListener === void 0) {
          if (arguments.length === 0) {
            this._events = /* @__PURE__ */ Object.create(null);
            this._eventsCount = 0;
          } else if (events[type] !== void 0) {
            if (--this._eventsCount === 0)
              this._events = /* @__PURE__ */ Object.create(null);
            else
              delete events[type];
          }
          return this;
        }
        if (arguments.length === 0) {
          var keys = Object.keys(events);
          var key;
          for (i = 0; i < keys.length; ++i) {
            key = keys[i];
            if (key === "removeListener") continue;
            this.removeAllListeners(key);
          }
          this.removeAllListeners("removeListener");
          this._events = /* @__PURE__ */ Object.create(null);
          this._eventsCount = 0;
          return this;
        }
        listeners = events[type];
        if (typeof listeners === "function") {
          this.removeListener(type, listeners);
        } else if (listeners !== void 0) {
          for (i = listeners.length - 1; i >= 0; i--) {
            this.removeListener(type, listeners[i]);
          }
        }
        return this;
      };
      function _listeners(target, type, unwrap) {
        var events = target._events;
        if (events === void 0)
          return [];
        var evlistener = events[type];
        if (evlistener === void 0)
          return [];
        if (typeof evlistener === "function")
          return unwrap ? [evlistener.listener || evlistener] : [evlistener];
        return unwrap ? unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
      }
      EventEmitter2.prototype.listeners = function listeners(type) {
        return _listeners(this, type, true);
      };
      EventEmitter2.prototype.rawListeners = function rawListeners(type) {
        return _listeners(this, type, false);
      };
      EventEmitter2.listenerCount = function(emitter, type) {
        if (typeof emitter.listenerCount === "function") {
          return emitter.listenerCount(type);
        } else {
          return listenerCount.call(emitter, type);
        }
      };
      EventEmitter2.prototype.listenerCount = listenerCount;
      function listenerCount(type) {
        var events = this._events;
        if (events !== void 0) {
          var evlistener = events[type];
          if (typeof evlistener === "function") {
            return 1;
          } else if (evlistener !== void 0) {
            return evlistener.length;
          }
        }
        return 0;
      }
      EventEmitter2.prototype.eventNames = function eventNames() {
        return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
      };
      function arrayClone(arr, n) {
        var copy = new Array(n);
        for (var i = 0; i < n; ++i)
          copy[i] = arr[i];
        return copy;
      }
      function spliceOne(list, index) {
        for (; index + 1 < list.length; index++)
          list[index] = list[index + 1];
        list.pop();
      }
      function unwrapListeners(arr) {
        var ret = new Array(arr.length);
        for (var i = 0; i < ret.length; ++i) {
          ret[i] = arr[i].listener || arr[i];
        }
        return ret;
      }
      function once(emitter, name) {
        return new Promise(function(resolve, reject) {
          function errorListener(err) {
            emitter.removeListener(name, resolver);
            reject(err);
          }
          function resolver() {
            if (typeof emitter.removeListener === "function") {
              emitter.removeListener("error", errorListener);
            }
            resolve([].slice.call(arguments));
          }
          ;
          eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });
          if (name !== "error") {
            addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });
          }
        });
      }
      function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
        if (typeof emitter.on === "function") {
          eventTargetAgnosticAddListener(emitter, "error", handler, flags);
        }
      }
      function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
        if (typeof emitter.on === "function") {
          if (flags.once) {
            emitter.once(name, listener);
          } else {
            emitter.on(name, listener);
          }
        } else if (typeof emitter.addEventListener === "function") {
          emitter.addEventListener(name, function wrapListener(arg) {
            if (flags.once) {
              emitter.removeEventListener(name, wrapListener);
            }
            listener(arg);
          });
        } else {
          throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
        }
      }
    }
  });

  // neko client 0.5.1 - closed beta feature complete/src/js/misc.js
  var KeyCode = {
    // Alphabet
    A: 65,
    B: 66,
    C: 67,
    D: 68,
    E: 69,
    F: 70,
    G: 71,
    H: 72,
    I: 73,
    J: 74,
    K: 75,
    L: 76,
    M: 77,
    N: 78,
    O: 79,
    P: 80,
    Q: 81,
    R: 82,
    S: 83,
    T: 84,
    U: 85,
    V: 86,
    W: 87,
    X: 88,
    Y: 89,
    Z: 90,
    // Numbers (Top row)
    ZERO: 48,
    ONE: 49,
    TWO: 50,
    THREE: 51,
    FOUR: 52,
    FIVE: 53,
    SIX: 54,
    SEVEN: 55,
    EIGHT: 56,
    NINE: 57,
    // Special characters and symbols
    BACKTICK: 192,
    TILDE: 192,
    MINUS: 173,
    UNDERSCORE: 189,
    EQUALS: 187,
    PLUS: 61,
    L_BRACKET: 219,
    L_CURLY: 219,
    R_BRACKET: 221,
    R_CURLY: 221,
    BACKSLASH: 220,
    PIPE: 220,
    SEMICOLON: 59,
    COLON: 59,
    APOSTROPHE: 222,
    QUOTE: 222,
    COMMA: 188,
    LESS_THAN: 188,
    PERIOD: 190,
    GREATER_THAN: 190,
    SLASH: 191,
    QUESTION: 191,
    EXCLAMATION: 49,
    AT: 50,
    HASH: 51,
    DOLLAR: 52,
    PERCENT: 53,
    CARET: 54,
    AMPERSAND: 55,
    ASTERISK: 56,
    LEFT_PAREN: 57,
    RIGHT_PAREN: 48,
    // Function keys
    F1: 112,
    F2: 113,
    F3: 114,
    F4: 115,
    F5: 116,
    F6: 117,
    F7: 118,
    F8: 119,
    F9: 120,
    F10: 121,
    F11: 122,
    F12: 123,
    // Control keys
    ENTER: 13,
    SPACE: 32,
    ESCAPE: 27,
    BACKSPACE: 8,
    TAB: 9,
    SHIFT: 16,
    CTRL: 17,
    ALT: 18,
    CAPS_LOCK: 20,
    PAUSE: 19,
    // Navigation keys
    INSERT: 45,
    HOME: 36,
    DELETE: 46,
    END: 35,
    PAGE_UP: 33,
    PAGE_DOWN: 34,
    // Arrow keys
    ARROW_UP: 38,
    ARROW_DOWN: 40,
    ARROW_LEFT: 37,
    ARROW_RIGHT: 39,
    // Numpad keys
    NUMPAD_0: 96,
    NUMPAD_1: 97,
    NUMPAD_2: 98,
    NUMPAD_3: 99,
    NUMPAD_4: 100,
    NUMPAD_5: 101,
    NUMPAD_6: 102,
    NUMPAD_7: 103,
    NUMPAD_8: 104,
    NUMPAD_9: 105,
    NUMPAD_MULTIPLY: 106,
    NUMPAD_ADD: 107,
    NUMPAD_SUBTRACT: 109,
    NUMPAD_DECIMAL: 110,
    NUMPAD_DIVIDE: 111,
    NUMPAD_ENTER: 13
  };
  var baseKeyPriority = {
    // Numbers take priority over their shifted symbol versions
    48: "ZERO",
    49: "ONE",
    50: "TWO",
    51: "THREE",
    52: "FOUR",
    53: "FIVE",
    54: "SIX",
    55: "SEVEN",
    56: "EIGHT",
    57: "NINE",
    // Other keys where we want the base version
    192: "BACKTICK",
    173: "MINUS",
    61: "EQUALS",
    219: "L_BRACKET",
    221: "R_BRACKET",
    220: "BACKSLASH",
    186: "SEMICOLON",
    222: "QUOTE",
    188: "COMMA",
    190: "PERIOD",
    191: "SLASH"
  };
  var KeyName = Object.fromEntries(
    Object.entries(KeyCode).filter(([name, code]) => !(code in baseKeyPriority) || baseKeyPriority[code] === name).map(([name, code]) => [code, name])
  );
  var time = Date.now();
  function getTime(update) {
    return update ? time = Date.now() : time;
  }
  function setCookie(name, value) {
    document.cookie = `${name}=${value}; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
  }
  function getCookie(name) {
    let cookie = document.cookie.split(";");
    for (let i = 0; i < cookie.length; i++) {
      let idx = cookie[i].indexOf(name + "=");
      if (idx === 0 || idx === 1 && cookie[i][0] === " ") {
        let off = idx + name.length + 1;
        return cookie[i].substring(off, cookie[i].length);
      }
    }
    return null;
  }
  function cookiesEnabled() {
    return navigator.cookieEnabled;
  }
  function storageEnabled() {
    try {
      return !!window.localStorage;
    } catch (e) {
      return false;
    }
  }
  function propertyDefaults(obj, defaults) {
    if (obj) {
      for (let prop in obj) {
        if (obj.hasOwnProperty(prop)) {
          defaults[prop] = obj[prop];
        }
      }
    }
    return defaults;
  }
  function absMod(n1, n2) {
    return (n1 % n2 + n2) % n2;
  }
  function htmlToElement(html) {
    return mkHTML("template", {
      innerHTML: html
    }).content.firstChild;
  }
  function mkHTML(tag, opts) {
    let elm = document.createElement(tag);
    for (let i in opts) {
      elm[i] = opts[i];
    }
    return elm;
  }
  function loadScript(src, onload) {
    new Promise(function(resolve, reject) {
      var script = document.createElement("script");
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
      script.src = src;
    }).then(onload).catch(console.error);
  }
  function eventOnce(element, events, func) {
    let ev = events.split(" ");
    let f = (e) => {
      for (let i = 0; i < ev.length; i++) {
        element.removeEventListener(ev[i], f);
      }
      return func();
    };
    for (let i = 0; i < ev.length; i++) {
      element.addEventListener(ev[i], f);
    }
  }
  var lastTooltipText = "";
  function initializeTooltips() {
    initDOMTooltips();
    let tooltip2 = document.createElement("div");
    tooltip2.id = "tooltip";
    document.body.appendChild(tooltip2);
    tooltip2.style.opacity = "0%";
  }
  function setTooltip(element, message, immediate = false) {
    element.setAttribute("tooltip", message);
    element.setAttribute("ttApplied", "true");
    element.addEventListener("mousemove", (e) => {
      tooltipHover(e);
    });
    element.addEventListener("mouseleave", tooltipLeave);
    if (immediate) {
      const rect = element.getBoundingClientRect();
      if (window.clientX < rect.left || window.clientX > rect.right || window.clientY < rect.top || window.clientY > rect.bottom) return;
      element.dispatchEvent(new MouseEvent("mousemove", {
        bubbles: true,
        cancelable: true,
        clientX: window.clientX,
        clientY: window.clientY
      }));
    }
  }
  function forceHideTooltip() {
    tooltipLeave();
  }
  function initDOMTooltips() {
    let elements2 = document.querySelectorAll("[tooltip]");
    for (let element of elements2) {
      if (element.getAttribute("ttApplied") == "true") continue;
      element.addEventListener("mousemove", (e) => {
        tooltipHover(e);
      });
      element.addEventListener("mouseleave", tooltipLeave);
      element.setAttribute("ttApplied", "true");
    }
  }
  function tooltipHover(e) {
    const tooltip2 = document.getElementById("tooltip");
    const tooltipText = e.target.getAttribute("tooltip");
    if (tooltipText != lastTooltipText) {
      tooltip2.innerHTML = tooltipText;
      lastTooltipText = tooltipText;
    }
    tooltip2.style.opacity = "100%";
    const tipRect = tooltip2.getBoundingClientRect();
    let tipX = e.clientX + 20;
    let tipY = e.clientY + 20;
    if (tipX + tipRect.width > window.innerWidth) {
      tipX = e.clientX - tooltip2.offsetWidth - 20;
    }
    if (tipY + tipRect.height > window.innerHeight) {
      tipY = e.clientY - tooltip2.offsetHeight - 20;
    }
    if (tipY < 0) {
      tipY = 0;
    }
    tooltip2.style.top = tipY + "px";
    tooltip2.style.left = tipX + "px";
  }
  function tooltipLeave() {
    tooltip.style.opacity = "0%";
  }
  function waitFrames(n, cb) {
    window.requestAnimationFrame(() => {
      return n > 0 ? waitFrames(--n, cb) : cb();
    });
  }
  function decompress(u8arr) {
    let originalLength = u8arr[1] << 8 | u8arr[0];
    let u8decompressedarr = new Uint8Array(originalLength);
    let numOfRepeats = u8arr[3] << 8 | u8arr[2];
    let offset = numOfRepeats * 2 + 4;
    let uptr = 0;
    let cptr = offset;
    for (let i = 0; i < numOfRepeats; i++) {
      let currentRepeatLoc = (u8arr[4 + i * 2 + 1] << 8 | u8arr[4 + i * 2]) + offset;
      while (cptr < currentRepeatLoc) {
        u8decompressedarr[uptr++] = u8arr[cptr++];
      }
      let repeatedNum = u8arr[cptr + 1] << 8 | u8arr[cptr];
      let repeatedColorR = u8arr[cptr + 2];
      let repeatedColorG = u8arr[cptr + 3];
      let repeatedColorB = u8arr[cptr + 4];
      cptr += 5;
      while (repeatedNum--) {
        u8decompressedarr[uptr] = repeatedColorR;
        u8decompressedarr[uptr + 1] = repeatedColorG;
        u8decompressedarr[uptr + 2] = repeatedColorB;
        uptr += 3;
      }
    }
    while (cptr < u8arr.length) {
      u8decompressedarr[uptr++] = u8arr[cptr++];
    }
    return u8decompressedarr;
  }
  function line(x1, y1, x2, y2, size, plot) {
    let dx = Math.abs(x2 - x1), sx = x1 < x2 ? 1 : -1;
    let dy = -Math.abs(y2 - y1), sy = y1 < y2 ? 1 : -1;
    let err = dx + dy, e2;
    while (true) {
      plot(x1, y1);
      if (x1 == x2 && y1 == y2) break;
      e2 = 2 * err;
      if (e2 >= dy) {
        err += dy;
        x1 += sx;
      }
      if (e2 <= dx) {
        err += dx;
        y1 += sy;
      }
    }
  }

  // neko client 0.5.1 - closed beta feature complete/src/img/toolset.png
  var toolset_default = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALQAAACQCAYAAACh8EESAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4gQYFzQSpo/+0wAADzxJREFUeNrtnb1uG0kSx5tjRgtsZD/EpsZaXMvCJVbg0QFO5YfY6CAKlxxkiNHhLId+CDndA0gHNHCBRIPyYtN9CDlaYEPzgkPxiu3+nqr+YhdASJTI+aj+9X+qa3qqhajQXj4+2rx8fLQRzfbORjXCjN//8tvNqDXz/ljnA0cpML+5WYg3N4siz6EZo0IDDCWoHIYZ2/lRP1ipY3aKEq8oOfmny+2AKWHGfws9h9jnXupVMZf9jX02lKN6mGDGUJ8f9YPO4eTtayGEEM+fHgohhPj4aUX+O1xNUsMW4qNc/DNyhYXi0s3dW3VQy47wOQfsg4+fVqznMz+7JPPxUOV0PYbc/OOs0BQqxxFP+TZcrjHq86eHYs6wXVBOX2g42xn24XNsrv4Z+xxI6VAPOWZu9ckplj2YTMTdeu3Vzi7+AZDhSgpXTt9ORwZ0rlDHUlBOqIds2wQzQOSr4L5Q2/wzP7v8JiTsry62/7NB7eqfcYgD9xXq3EMO08BYN7ZQwXS3XpMmBHSd6vjwmViubp2gdvVPF3qQ0LtipW049+Oy7dxDjiEx9vzsUtxfz8X99VycvH0tDiYTcTCZeIUCOv+AMps6W391IfqrC+vVRHACfXz4LBrUsH3bfs6P+m2PF0KI5erWmupx3TakjnIMOSigvluvxaNXJ0IIIR69Otn+7nOFCeWI0j/joc7ory7EYjpjCz9k0EzgySpwfPhMHKOUow3alCEUV5bDJxyYn12Kg8lk+94Xal1nOT/qtQoNArSYztKGHLh3cSm1y00TOQTy/Z/cGXTnwKGgFJdYk6LhY8bv4fc3Nwtx8va1OHn7env+oM6+MOfinzHVzqmVWobZdNPEBjxW6tA7ilxZDhgMUW9bDgHwe93vQghxfz0PUmeTf3Qq7aLOvv7pKJ1IpdTwfRdldfmMz2djD3bf3CzE/OySLEYH9VWps6zQqs+GqHOI4bEOpX/G1Ac6VKl9YPYZVPh8Fp9DjEEbnlpArcw2tY41qAWVltvVFjv7+qfjaCBKlVuubp17M+d+uLMcvjlkl9hZpcSq/3F1JBXUi+nMC2Zf/4yHQkCt1HArezGd7fRm075clde1Y4DTQ+aKpB6HmOLjmB3UBHXIXA5X/3TcDRSi1HCwuDfb4PMB1RVm7lG8qmMOvbqplNjH4AYLdcghQx0yf8PFP04KvVzd7qigTwhApdQmGCE20yn1cnW7/b5uO3gfquPknstBpdRD4+XQAWEu/nEOOVQQ+6gj9KpQqF2U9VgTZw1RZh0wFJPW58zhRwpL7R+nCf6qjIMvzKqQwjfzofsu/j9WaqzMLt+1/Z9LbfDxhnQ00yR7WTnhPf47fiJEDgVsk+pz808Q0DZIOMykVLZUnw0KmwpyNppLetLl+CkyJSFA5+Yf7yxHCpi592Xbdow5Ki5XP5fwQ6XQJbZNqH/GJcC8T2YK5Vx9jmNRX+OcXxLDP+MGc36NNdS/1NmGXNrbxT/j0mH2id9yzhhQwUwRYuToI1f/jEs+0ZDBSI5QU8FMXdejRP+MXIHJVdlcJzNRQcPVGYceF1WmoXT/VFHbbmjaLnWDtTEJnX+6UnqsyzGqRsA5woyPp8FM659Rjb0alDpXmJvxWSt43qxZCVC3QufNmjVr1qxZs2YtFKthUEiZ11Y1TBsAtsHyKIUzhzrURWUa3N/6CuY64xl1tflpFNOhUDcNyrVS1u1Q3VQp5Q4n17HKMOOnrWuFehSjwXABQLAQqFVrvsidZcj2U4YAXFctlSqb/l465GPuRlLBPGTbMsy27ec4uw7OBT/uND+7HFxtymS+9TBKLWbfpYDZVz1DYeasUwcZgyHbxvUvALIh24NC5fBSQa2C2fa9vQ05TCFGKNChMN+t12xzOnTQ+XZQOAdcCyNkaTeX0M7UCSjCweoUGjvA5EQKZ/nATK3U8nri+Elrl+1j+MAX1EptUt+a1JgdaNwIKqgpQg1TGAMvIb6td0cBta5cABQOt21fVtJYUO+Tjahhli/zQ1J1MtC6TIa8X/gdr7IEFhp+2GpffPy0EvfXc+152sKCIeGHbtu2cMP1irt3WQ65sZer222pJtxYVAYNpcpFyxVLZahjldjC27eNLUCpDyYTcX8930INmYkhxxqy1NtehxwqmH0HJj4gQ3ysglnVeHKhyZDwA6fZVCUCQJ3lGB9nQWydWhd+pLCSQ56OC2aOp0VUIMswqyqQUkAtA6yCWXc1cr1CNagTAu0D89Dn52DBGd0zg/3Vxc7+qaGG48Z31d7/7UKrzL4gq6C+W6+DUngUNj+73DnXkqDuuGHmHGCYqvxzK/WjVydaFcVKjVXXZ3zA4bfQpd6qznLEDDNkyOSbK7qyBbbi7KHZD9Uta5fQwHVgHJqjN2U5KCqSlpTx6HKFWbUtvNadqbBMiFL7HA++HNsq3nPD7KPMoUu9VZm2iw2zakCIoQbl0IGNoVUpsiql5wr1y8dHG1gQ0hZ+pIZZiHRLvWWr0KlhVl0G4datqbxqTkqdCmZdrBxjqbcsFTo3mFWXc3lw6KPUoefhq9SpYJbVN8el3qIpdAkwu5hJqYcs6kmp1Jw2dKm3KoDOGWYMtTyzzhfqoecSCnXMKZrPnx5uXzXFy85A44lG8pLBudWL81m8Xoaa6lx8oS55vnEVg8IcYfZZbVYFNXV+1RXqFDC7DADlv1czKMShRs7KjAdmpkGhLkvCcS66gSJYqlvZPmm70sORzgbzYjrLBmbVcfgqNfe5YKXGap0KZp1C71XIgWGWGypHc4U6VsfE28dgp/QhHhTWbGNTw5c0cDGFHynOR57cH2O/pklQtSszmPfa1ynM55hMs+ZqziroznvfJieNSmow34dr9wHkkI49NIxqQDcrGuqWL2/WrFmzZs2aNWvWrF5jKdbYBhLNigc6xzVPhlYJbZ18T4FWPXWccoqka7qKuxRYys7kk4uvKW8/4oA5JdQuihhzbZNUndz1ilnbamIdF8z477Eq7+B5E/3Vhfj9zz828uvd8sPml99uRvJcC+pjUNVf5lxRQGe4hrW8X7nWdQ3WccEcG2r8lM3vf/6xkYvN/PDd96Mfvvt+9PPxixEXYC4+id3JMdh4v7bywHsFtCvMsRoRK7MKZAwxtp+PX4yooLb55OFpL768XySFeh+s44Y5pjK9W37YYJh1IOdg3P6AkAqXTpNVGqtzabPqSIAOhZmzEVXq7AMzhUr7qHMO4UdTaOT0F//6R9bKlJsy62CO4Q+TSteozs5A46qb3YMHg4upcDZiLjA/PO2tMDelTgC0qoSsECJrqGMbXs4Og+wCM7c/dCoN72tSZyvQOphztdCyXiEFG3XgLKYzL5Bjd/Lzo774hYGCgHaBObc6biHhBs6MUCp1TlcurNJQnf9gMqlOnbVAgzN/fPJkp7YEpVHdBh56x+/48BlLw+YGNTa8dFz1Co1zlL9+/swCdS613SjVWbb+6oJsObuhhjuGCuaaBqPayklcUFPDjBvj5eOjjSuk75YfNlzqnCPUED7C6lrzs8vqbnsLgWbbme7tnx/14scnT8Svnz97L5gTA2Z5OWZ4r4qpAWSuEb480+7haS8W05nXzShKP+F2hWIzMsw1xdJOa6xAmgeUOiTrwQ3zl/eL7RJqALas1jLIXDADLOdHvTgQu0sfpwo1hPhfOTBTBSXu5aKzUWiVUh/89JMQm002MIcMxjhhxvUBAWQXqKl8JWepQJVV+Wj8mdKV+hug//mff4sH47ERank0nhvMtswHdYO5rHagymJwwwz7gkGgahwEMN9fz3fEoFSovRRaCCG+fv0q/v6XvzpBnRLm2Jd1V5hVfqMEyXT/ACuw6+eKBdoV6uXqVoxGo53eHuPxq1Jhdn3siRpmrLig0jqgbZ8tNm1nM2iwzWaz07PluLXBbK5DrVoHnfr4cZvYxhU+ny0KaNVEFhlmsM1ms1OHGRzRYHYrqg4Qt9IGzAqNoV6ubrfLGIxGar+roOZqpFpgjmE4DHR97tN1oF9MDG1SRptxNCY+hpxgVvkkF5h1gz1VTOzz2eKB9oGaqzHlR5tSp5V0/shthTCfQWcO1aWiAS2fcGxlytHZutvtuQHQKicFgBXDAbmv+VI6ALXZaEhD7nNjxlzdqlmzZs2aNWvWrFmzZs2aFT6AbEVk4lgboUeAGb9vWZEGdPEgyzdhGtgN6KwV0RROqB7J0lmDvFCgue7+pbhVrtun/JCEPP1WB3aDuiCgOYEzPaTKBQo+H9caF7r6exThiEko9mV5uXEKmFUxJaWFFm0MNZ+CLbgoO7b+6mKQP3QLAuk+WyvUXUyY+6sL5ZMnXDBz7cMGjA/Y1NvGPsamWpWrhRwDYcagcVUHWq5ut0qHKxdRXmpDQg3XK0lo6OEyd53a73un0DqYuQzDLATPA59UMJsUNkSpcX1qG8w1W5cCZm6V4Hr4lHqhSl3YgcMGqjuMD0/7nZCj1juXXekwY8hU6v/l/SLJCq452sPTXvRXF1Wv6TIuGWY53FBdUu/Wa9Gf9qLZt2FHjXF0VwPMtticM27PxeQHiuVzXkxn1cNMCnQKmHG4odoHXvNkn8IOUGLwP4a7dj90pcIshxvN/h9iyVWscN262scUXekw4/2p9gN/owg7TKXSqDuib+5c9zlVgZ6aoe644OKGWRVu2JSr9sstrpcnLzEnv68V6o4CKvl2dsy7UVjl4MkQ+bWv4Qf4X/5ZM9TdUJjf3Cy2q6fi+K1Ng8wj7leV7q0Zau+5AtjwVM2YT2PIczfwHTd4j38OjU91++YEmrvEmJzm45jzkq1Cu8Icu94xQLFc3W5f8P7L+8X2JyhRLgPD1DDXrNRjV5hxnHy3XkeZQO9ixjnEMFhEg8aUdw1zSy/C0hSwOhdAvZjOip0z3fnADJemg8lELKazJDDb5m64ZGFiKxG+euQ6cKxFqb0LnqcuPI6Py7dDDfluSCwdAnGqK14tMbU1hsYAp54TwaEYQ7epgjZnRfZR6hJn5XUuvVU1oEqZnsPhhs/+8V1D16U2bNtaTGc7g9IhIKdWRBnqKrIcMsyy5ZBr1k0VdTWqBrM9JVISzCqoS7ynMNZdfm2NnvIkKUIfqvAJMgWL6SxY9XOLVfHCnKVlOpwXkckBZKqqSBzVlWxr0ZhALhGcIhS6OZZG1VzUusEcSaGb0V5JdEvANZAb0MVCnVvo1oBuljzub9as2R7afwF49Fhid7IUNgAAAABJRU5ErkJggg==";

  // neko client 0.5.1 - closed beta feature complete/src/img/unloaded.png
  var unloaded_default = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABlBMVEXs7Oy2trbkIitNAAAAFklEQVQI12MwNmZIS2M4c4Zh5kxi2ABrnw/x769WFgAAAABJRU5ErkJggg==";

  // neko client 0.5.1 - closed beta feature complete/src/audio/launch.mp3
  var launch_default = "data:application/octet-stream;base64,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S+OOdIwXbj3+xq84mRgCkIh3hGMyvvADCsoYgUkkfzBJCu3Yo/XYVUFwp9pOhf////+pdS////HJ3Pive56gqrmWE0KS/BgDB4YrAGxRQAQFhmbLgIdmkOGtJcMri0tdCho3RVFWx/RYSEOmwEcyfz5P6yMnoxVUQ4hCfbD/+3Bk6gAS0yRMeXhI+DQiSV8gSVkKrJEx7DDS6LQI5jwEqCx2MVnTrsqyxwBbEYt/67fd///////3/UEO7ygGCzviAA/WoUnKGuUUMzz+lD/BlV5yFBJqSR9B1bDP/8M///////09WuhaGI//6QiamJMiK3fVgCtOodhE1GGAmvu0iSkI8QJAWSWk+KrbEfWNTiTMONsuQH45NQpTSzz6o1PlTHMFs73GlaleM4W4ldYitlIBp54TGkD9brkhb0EE8oj//////6VADREUJGbs4cAMTozS6IDwwuAFpEMCJsmXtUplmvSuoU//7GJeKbTouGf/////s0VvETRRv/9wVU1CoRJdfoAFXcghIQ1geJy1hTF17vM3FBA9tZj641Ay2mDxjKPlguJ1Llxx03LBURmryKyppCpN//twZOwAAqwjTPsJXKgvAXmPAGYHCryNL+VhI+DKieW8N40EPROaju0Xt2y+RQfGPmQIKfV///////obm6l8+OMAX/tByS8AACQwlUM+5aPTtJD1gsLzkdr61s1C7v/////////9mlSKf//c5Qh4h1MTGK+AADC4EFHkAyrnNlTOy3wQhs6maEpNaNxLKGGtUj9oEpu+y+1AZF06MBofTVqwoct/riSvgudp3Eo/pSU8iw/djdldcc0w+9X///b+f9X///O17Wmbr+nfhPYVAIh3lRQ7twAEIKxRRw15LoAJYGBakhPXhjc2vVq//////7/2ru//pBpmIhiUrL7AAMGkQObnYdriiqpCYzlqQEZ4MUvazNO3AcZWyGJl995lsPDIdrg/aBkcq407RWKuti5IyNhOiMF2Zv/7cGTwAALbIMt4GGB4NkEJbwBJEQrYfy/gYYGgrISldAGYVKlhMJQ80ONIlMc2L7/////1fo/7ty+r//XYyweGeHQzn4AjBQueFpMP7iQGdMoryZO2oApimVf///+JJhtykUPYu9i0f///Z9YC59UHqHhjRBtnoCJwYdPU5laDBF2ysUiVBi9miKqMrb6bcpoFOo+1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9+1ajbi6DBCiLn///7/9P/XV/TXo14N2ELRZL4n+/YpGzQAAAA6vDb8ANJUWrOBXBFcGddFem7///03vzqAxYxvQhVC61y9OWUuLdg9KUPlwG9kcw0chWZniGaJuBG1JrqYYCVzET4cSnJyKfUrQECAhQVv5jGeoYUFP+P/7gGTuAIMRaMl54BcYLwAZXwAAAQyEbyfnsNCg0oBlNAAABMG7v/waBkFQVO5JTEFNRTMuOTkuM1VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVMQU1FMy45OS4zVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//tQZP2BssMdSXhvYNgz4YlfACJRBMRfJ+G8SmgpgGf4AAAEVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/7EGTdj/AAAH+AAAAIAAAP8AAAAQAAAaQAAAAgAAA0gAAABFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV";

  // neko client 0.5.1 - closed beta feature complete/src/audio/place.mp3
  var place_default = "data:application/octet-stream;base64,//uQZAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAAHvwCqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq//////////////////////////////////////////////////////////////////8AAABQTEFNRTMuOTlyBLkAAAAAAAAAADUgJAJwTQAB4AAAB7+ZqT38AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//vgZAAAAfcAV30AAAA6ABsPoIABK1YjN/msgANkOyl/MvBIz+/qiGh82kWiQwNB95cuJwfUH8TwQcJ3tB9/WH4P/4If4Ylz78Hw+6sHwcicP5Q5KAgCDpQEAQlAQDHKOlAxmZ11V3tffRxyDB8Hw+KA+D4Pg+DhzaCBzKQfw/+Ughyjlg/icPy4P/9YPvLl3+Qgg7wQBD///5R0TxebdxWFEkqgCBwRAMEAABGAPphmjWNiMkhYGZBQYvC0Bv1LE0EaDD7EfDHXyUkDCIdE0cBxDxBMWiYAiIoKomKgucwkW0miIEykDaXNEgsnKEJyST/Q+1dqWCtqpRGgior/sZZ8nMtZuaYeS73HVqV0pgMpkJpWVE3dVEmSgJWbmwx7ZfGHchou676EIUHAcot9NfDMxQI/SCu2Z35RDyliqQCJLkl9EVQIWYBBnRgIAaWZLS1Ial8xBjvRq3K7d+UWJZNxcQ2GL2DsFoCMcI5WM+wMtA0RmRp7L2u3Wst7VuPDSujAax5Hfhicll2f5dMk8MuSVNAlSkuSny7MsTrXcj8lSWXHpTAJcFxZrv1suuzSVaRL2EsvYozuT0fM84Ylj0ah+IU5gkLad5NYuEuZpbOo7UznYz//////////arS7KI2d7/u+Zf/////////5/n3v/nhYpK/f7NzMmXw1mhF30+UCAwiAQKQSSGUiXrAB0FGukYRrzsKU+u9QUFdqGmtS3RWFOxQZ6Zj7erOAQhLXY5C7HjBSKkUeESyn7AFvUSMOLywU83rB7m8abJE+8j7Xbxdok4QUI+Q5VSFSOHN93iQzYRK4P5WnVPj+FaKpY+v9bxvW8vW57JvXzi3hWx9e9KU1fuTDuA9fTupt7YWVtYIeaqaFvO6bpun/9LM833X+25aNrqDbOP//BxpuUrj83///9PungTTsuoMWvr81///////7di0Kzb/48GAi9f7c3KRYUoF5Jw/eA6REHCAUnhbL3424krgDdymcKacpygcmrWk2UUIq9Q2k6iauNicpf388taatNXOc5znOc3c42c50V+5znOpzrqW1Tdsmp32udfta1v/uc5zac53LW3LWtadNTVznW1sOc3c518t/i+fuHOja1rv//2tbXDnU48w18IKCv3MuqZLnX8JOEdzQRBH8eBIhSU3a+G8OyqNU2+HVvSCtJVJZskbm4NBre8J4NCKJQ1TBUFflknv/UefxKCrp4XO1M+ty1lf//TMw7M0RD67/SRBUksCRHFKrYtfXX94RImhEJrjnVQ+riqhgiRExxohUFUtQulslxS7cRULYylzQolAICcsxr1LX0crGmcrGCiTF8xvM/5jStrXlZDN0djK+Vja2Qz1CgKiYKiL/qArphmYAiHjbfAMAIEP8//ugZKGABDJgTv9pYAJJIfne7ZgBDOVJK+ekS+DdhaU88BkMXFU6ta1vJxJEoKSlQWAp2ElhIDEhQCnQaPFnySgq4SplXKPf//2fLPEUNExBTUUzLjk5LjOqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq";

  // neko client 0.5.1 - closed beta feature complete/src/audio/click.mp3
  var click_default = "data:application/octet-stream;base64,//uQZAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAADAAAGuQCPj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4/h4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eH///////////////////////////////////////////8AAABQTEFNRTMuOTlyBLkAAAAAAAAAADUgJAKgTQAB4AAABrnqA6/TAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//vAZAAF4vQe19ApMUgdABjvAAABECh3W8xhgSg2AGiMAAAEkAAAAApy8Y5TIxWKySJGAcAYAwNhtHh5MBgMBgMLJoRnuzyZMgQIECCERn8GEAAAAAAAvTCBAhAIA+8P/4IAgCZ/g+D4Ph/w+CAIO4gBD8HwfB/y4EDHiAEAQM+D4fAAAAAJAAAOAAP8p////qc8p///6////ar/+XnJTKZhAAl5AUxZZM5VUADASWSNKUxVKqUBpZgJQJADACgRA6JJ67i4yMTExMTExPVtfmtWVq1aYnRkZGRkZPaSQmAkIx9/4hQUFBQSCgoKChQUN/woKCgoFd8IJBQUF/wUFBQYKf/5BQUFBJv+FAoKCm/4KCgoUFf8YKCgoK//hBIKKAHH////////////s/qVAAAADwAAAAD/WASAAAAAcAAAAZD/+n//////1v1DPobV6dVaLOz5N7mHHsDzkbwFsMvYKNMPHDXEA6grAqwawV/eAePx2AAAAP8wBQFzAMCGEYHJg6Eof5gXAHAIJQwkEdTYecr/zAdAJMAQAIzjzRDIIAt/3mQSGkAQHdoWf/skSZSTCJpNSmnMF2Y//6XYMAgMAwAmC4BmwL4myaWGxkLmQEwf//663wYIpB/zLoJDcFjDMyJzarETINuP///2QMocxx3/njIM3TGEQjFIYTAgSAcEJg2DH////yyk5nn3jR553aDGar/9f///////////65SEQAOAAAAAAAAAAOAAAAAAMPz////////RNP/////////0/////dKv////8jdWo26CQpDH/////////zuxiCxRwotHA924nYiWNFPcABkKAVWFGYEgM7EJSAYs000vskE3FE1AKrmIMOH0lGwciSTXCUurlrWmq1bba16bWt1rWmta1nVpiJIknrsEFFQgrIK//BXfoAAADwAAAAAAo+v//////////6LPV1KXxQP//////yyMj///+5Bk1gAATQBS9QAACC+gCR+gAAEXoMdL+e6CgQtEZ78CIBD1KHjNQ9VMQU1FMy45OS4zVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX/+zBk+A7yhB9Of2GAChdgGb/gAAECDAEgYAAAIAAAP8AAAARVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVU=";

  // neko client 0.5.1 - closed beta feature complete/src/js/conf.js
  var soundSys = {
    launchAudio: new Audio(launch_default),
    placeAudio: new Audio(place_default),
    clickAudio: new Audio(click_default),
    launchLastPlayed: 0,
    placeLastPlayed: 0,
    clickLastPlayed: 0,
    launch: function() {
      if (!options.enableSounds) return;
      let currentTime = Date.now();
      this.launchAudio.currentTime = 0;
      this.launchAudio.play();
      this.launchLastPlayed = currentTime;
    },
    place: function() {
      if (!options.enableSounds) return;
      let currentTime = Date.now();
      this.placeAudio.currentTime = 0;
      this.placeAudio.play();
      this.placeLastPlayed = currentTime;
    },
    click: function() {
      if (!options.enableSounds) return;
      let currentTime = Date.now();
      this.clickAudio.currentTime = 0;
      this.clickAudio.play();
      this.clickLastPlayed = currentTime;
    }
  };
  var elements = {
    animCanvas: null,
    chat: null,
    chatInput: null,
    chatMessages: null,
    dInfoDisplay: null,
    experimentalGridToggle: null,
    helpButton: null,
    hexToggle: null,
    keybindSelection: null,
    loadOptions: null,
    loadScr: null,
    loadUl: null,
    logo: null,
    noticeDisplay: null,
    pBucketDisplay: null,
    packages: null,
    packagesButton: null,
    palette: null,
    paletteBg: null,
    paletteColors: null,
    paletteCreate: null,
    paletteInput: null,
    paletteLoad: null,
    paletteOpts: null,
    paletteSave: null,
    pickerAnchor: null,
    playerCountDisplay: null,
    reconnectBtn: null,
    serverSelector: null,
    soundToggle: null,
    spinner: null,
    status: null,
    statusMsg: null,
    topLeftDisplays: null,
    topRightDisplays: null,
    viewport: null,
    windows: null,
    xyDisplay: null
  };
  var RANK = {
    NONE: 0,
    USER: 1,
    MODERATOR: 2,
    ADMIN: 3
  };
  var evtId = 0;
  var EVENTS = {
    loaded: ++evtId,
    init: ++evtId,
    tick: ++evtId,
    misc: {
      toolsRendered: ++evtId,
      toolsInitialized: ++evtId,
      logoMakeRoom: ++evtId,
      worldInitialized: ++evtId,
      windowAdded: ++evtId,
      captchaToken: ++evtId,
      loadingCaptcha: ++evtId
    },
    renderer: {
      addChunk: ++evtId,
      rmChunk: ++evtId,
      updateChunk: ++evtId
    },
    camera: {
      moved: ++evtId,
      zoom: ++evtId
      /* (zoom value), note that this event should not be used to SET zoom level. */
    },
    net: {
      connecting: ++evtId,
      connected: ++evtId,
      disconnected: ++evtId,
      playerCount: ++evtId,
      chat: ++evtId,
      devChat: ++evtId,
      world: {
        leave: ++evtId,
        join: ++evtId,
        /* (worldName string) */
        joining: ++evtId,
        /* (worldName string) */
        setId: ++evtId,
        playersMoved: ++evtId,
        /* (Object with all the updated player values) */
        playersLeft: ++evtId,
        tilesUpdated: ++evtId,
        teleported: ++evtId
      },
      chunk: {
        load: ++evtId,
        /* (Chunk class) */
        unload: ++evtId,
        /* (x, y) */
        set: ++evtId,
        /* (x, y, data), backwards compat */
        lock: ++evtId,
        allLoaded: ++evtId
      },
      sec: {
        rank: ++evtId
      },
      maxCount: ++evtId,
      donUntil: ++evtId
    }
  };
  var userOptions = {};
  if (storageEnabled()) {
    try {
      userOptions = JSON.parse(localStorage.getItem("owopOptions") || "{}");
    } catch (e) {
      console.error("Error while parsing user options!", e);
    }
  }
  var shouldFool = false;
  function getDefaultWorld() {
    try {
      return shouldFool ? "aprilfools" : (navigator.language || navigator.languages[0] || "").startsWith("ru") ? "ru" : "main";
    } catch (e) {
      return "main";
    }
  }
  var options = propertyDefaults(userOptions, {
    fallbackFps: 30,
    // Fps used if requestAnimationFrame is not supported
    maxChatBuffer: 256,
    // How many chat messages to retain in the chatbox
    tickSpeed: 30,
    // How many times per second to run a tick
    minGridZoom: 1,
    /* Minimum zoom level where the grid shows up */
    movementSpeed: 1,
    /* Pixels per tick */
    defaultWorld: getDefaultWorld(),
    enableSounds: true,
    enableIdView: true,
    defaultZoom: 16,
    zoomStrength: 1,
    zoomLimitMin: 1,
    zoomLimitMax: 32,
    unloadDistance: 10,
    toolSetUrl: toolset_default,
    unloadedPatternUrl: unloaded_default,
    noUi: false,
    fool: shouldFool,
    backgroundUrl: null,
    /* Bug only affects Windows users with an old Intel graphics card driver */
    chunkBugWorkaround: false,
    // navigator.userAgent.indexOf('Windows NT') !== -1
    hexCoords: false,
    showProtectionOutlines: true,
    showPlayers: true,
    experimentalGrid: false
  });
  var misc = {
    localStorage: storageEnabled() && window.localStorage,
    lastXYDisplay: [-1, -1],
    chatPostFormatRecvModifier: (msg) => msg,
    chatRecvModifier: (msg) => msg,
    chatSendModifier: (msg) => msg,
    exceptionTimeout: null,
    worldPasswords: {},
    tick: 0,
    urlWorldName: null,
    connecting: false,
    tickInterval: null,
    lastMessage: null,
    lastCleanup: 0,
    world: null,
    guiShown: false,
    cookiesEnabled: cookiesEnabled(),
    storageEnabled: storageEnabled(),
    showEUCookieNag: !options.noUi && cookiesEnabled() && getCookie("nagAccepted") !== "true",
    usingFirefox: navigator.userAgent.indexOf("Firefox") !== -1,
    donTimer: 0,
    keybinds: {},
    palettes: {},
    attemptedPassword: null
  };
  if (options.chunkBugWorkaround) {
    console.debug("Chunk bug workaround enabled!");
  }

  // neko client 0.5.1 - closed beta feature complete/src/js/util.js
  var import_events = __toESM(require_events());
  var eventSys = new import_events.EventEmitter();
  var colorUtils = {
    to888: (R, G, B) => [R * 527 + 23 >> 6, G * 259 + 33 >> 6, B * 527 + 23 >> 6],
    to565: (R, G, B) => [R * 249 + 1014 >> 11, G * 253 + 505 >> 10, B * 249 + 1014 >> 11],
    u16_565: (R, G, B) => B << 11 | G << 5 | R,
    u24_888: (R, G, B) => B << 16 | G << 8 | R,
    u32_888: (R, G, B) => colorUtils.u24_888(R, G, B) | 4278190080,
    u16_565_to_888: (color) => {
      const R = (color & 31) * 527 + 23 >> 6;
      const G = (color >> 5 & 31) * 527 + 23 >> 6;
      const B = (color >> 11 & 31) * 527 + 23 >> 6;
      return B << 16 | G << 8 | R;
    },
    arrFrom565: (color) => [color & 31, color >> 5 & 63, color >> 11 & 31],
    /* Takes an integer, and gives an html compatible color */
    toHTML: (color) => {
      color = (color >> 16 & 255 | color & 65280 | color << 16 & 16711680).toString(16);
      return "#" + ("000000" + color).substring(color.length);
    }
  };

  // neko client 0.5.1 - closed beta feature complete/src/js/tool_renderer.js
  var cursors = {
    set: new Image(),
    cursor: { imgpos: [0, 0], hotspot: [0, 0] },
    move: { imgpos: [1, 0], hotspot: [18, 18] },
    pipette: { imgpos: [0, 1], hotspot: [0, 28] },
    erase: { imgpos: [0, 2], hotspot: [4, 26] },
    zoom: { imgpos: [1, 2], hotspot: [19, 10] },
    fill: { imgpos: [1, 1], hotspot: [3, 29] },
    brush: { imgpos: [0, 3], hotspot: [0, 26] },
    select: { imgpos: [2, 0], hotspot: [0, 0] },
    // needs better hotspot
    selectprotect: { imgpos: [4, 0], hotspot: [0, 0] },
    copy: { imgpos: [3, 0], hotspot: [0, 0] },
    // and this
    paste: { imgpos: [3, 1], hotspot: [0, 0] },
    // this too
    cut: { imgpos: [3, 2], hotspot: [11, 5] },
    wand: { imgpos: [3, 3], hotspot: [0, 0] },
    shield: { imgpos: [2, 3], hotspot: [18, 18] },
    kick: { imgpos: [2, 1], hotspot: [3, 6] },
    ban: { imgpos: [2, 2], hotspot: [10, 4] },
    write: { imgpos: [1, 3], hotspot: [10, 4] }
    // fix hotspot
  };
  function reduce(canvas) {
    let nw = canvas.width;
    let nh = canvas.height;
    let ctx = canvas.getContext("2d");
    let idat = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let u32dat = new Uint32Array(idat.data.buffer);
    let xoff = 0;
    let yoff = 0;
    for (let y = 0, x, i = 0; y < idat.height; y++) {
      for (x = idat.width; x--; i += u32dat[y * idat.width + x] >> 26) ;
      if (i) {
        break;
      }
      yoff++;
      nh--;
    }
    for (let x = 0, y, i = 0; x < idat.width; x++) {
      for (y = nh; y--; i += u32dat[y * idat.width + x] >> 26) ;
      if (i) {
        break;
      }
      xoff++;
      nw--;
    }
    for (let y = idat.height, x, i = 0; y--; ) {
      for (x = idat.width; x--; i += u32dat[y * idat.width + x] >> 26) ;
      if (i) {
        break;
      }
      nh--;
    }
    for (let x = idat.width, y, i = 0; x--; ) {
      for (y = nh; y--; i += u32dat[y * idat.width + x] >> 26) ;
      if (i) {
        break;
      }
      nw--;
    }
    canvas.width = nw;
    canvas.height = nh;
    ctx.putImageData(idat, -xoff, -yoff);
  }
  function shadow(canvas, img) {
    canvas.width = 2 + img.width + 6;
    canvas.height = 2 + img.height + 6;
    let ctx = canvas.getContext("2d");
    ctx.shadowColor = "#000000";
    ctx.globalAlpha = 0.5;
    ctx.shadowBlur = 4;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    ctx.drawImage(img, 2, 2);
    ctx.globalAlpha = 1;
    ctx.shadowColor = "rgba(0, 0, 0, 0)";
    ctx.drawImage(img, 2, 2);
  }
  function popOut(canvas, img) {
    let shadowcolor = 4282069325;
    let backgroundcolor = 4284244862;
    canvas.width = img.width;
    canvas.height = img.height;
    let ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    let idat = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let u32dat = new Uint32Array(idat.data.buffer);
    let clr = function(x, y) {
      return x < 0 || y < 0 || x >= idat.width || y >= idat.height ? 0 : u32dat[y * idat.width + x];
    };
    for (let i = u32dat.length; i--; ) {
      if (u32dat[i] !== 0) {
        u32dat[i] = backgroundcolor;
      }
    }
    for (let y = idat.height; y--; ) {
      for (let x = idat.width; x--; ) {
        if (clr(x, y) === backgroundcolor && (!clr(x, y - 1) || !clr(x - 1, y)) && !clr(x - 1, y - 1)) {
          u32dat[y * idat.width + x] = shadowcolor;
        }
      }
    }
    for (let y = idat.height; y--; ) {
      for (let x = idat.width; x--; ) {
        if (clr(x, y - 1) === shadowcolor && clr(x - 1, y) === shadowcolor) {
          u32dat[y * idat.width + x] = shadowcolor;
        }
      }
    }
    ctx.putImageData(idat, 0, 0);
  }
  function load(oncomplete) {
    cursors.set.crossOrigin = "anonymous";
    cursors.set.onload = function() {
      let set = cursors.set;
      let slotcanvas = document.createElement("canvas");
      popOut(slotcanvas, set);
      let j = Object.keys(cursors).length - 1 + 1;
      for (let tool in cursors) {
        if (tool === "set") {
          continue;
        }
        tool = cursors[tool];
        let original = document.createElement("canvas");
        let i = tool.img = {
          shadowed: document.createElement("canvas"),
          shadowblob: null
        };
        original.width = original.height = 36;
        original.getContext("2d").drawImage(
          set,
          tool.imgpos[0] * 36,
          tool.imgpos[1] * 36,
          36,
          36,
          0,
          0,
          36,
          36
        );
        reduce(original);
        shadow(i.shadowed, original);
        tool.hotspot[0] += 2;
        tool.hotspot[1] += 2;
        i.shadowed.toBlob(function(blob) {
          this.img.shadowblob = URL.createObjectURL(blob);
          if (!--j) oncomplete();
        }.bind(tool));
      }
      slotcanvas.toBlob((blob) => {
        cursors.slotset = URL.createObjectURL(blob);
        if (!--j) oncomplete();
      });
    };
    cursors.set.src = options.toolSetUrl;
  }
  eventSys.once(EVENTS.loaded, () => {
    load(() => eventSys.emit(EVENTS.misc.toolsRendered));
  });

  // neko client 0.5.1 - closed beta feature complete/src/js/windowsys.js
  var windowSys = {
    windows: {},
    class: {
      input: UtilInput,
      dialog: UtilDialog,
      dropDown: OWOPDropDown,
      window: GUIWindow
    },
    addWindow,
    delWindow,
    centerWindow,
    closeAllWindows,
    getWindow: (windowName) => {
      return windowSys.windows[windowName];
    }
  };
  function closeAllWindows() {
    for (let x in windowSys.windows) {
      windowSys.windows[x].close();
    }
  }
  function UtilInput(title, message, inputType, cb) {
    this.win = new GUIWindow(title, {
      centerOnce: true,
      closeable: true
    }, function(win) {
      this.inputField = win.addObj(mkHTML("input", {
        style: "width: 100%; height: 50%;",
        type: inputType,
        placeholder: message,
        onkeyup: function(e) {
          if ((e.which || e.keyCode) == 13) {
            this.okButton.click();
          }
        }.bind(this)
      }));
      this.okButton = win.addObj(mkHTML("button", {
        innerHTML: "OK",
        style: "width: 100%; height: 50%;",
        onclick: function() {
          cb(this.inputField.value);
          this.getWindow().close();
        }.bind(this)
      }));
    }.bind(this)).resize(200, 60);
  }
  UtilInput.prototype.getWindow = function() {
    return this.win;
  };
  function UtilDialog(title, message, canClose, cb) {
    this.win = new GUIWindow(title, {
      centered: true,
      closeable: canClose
    }, function(win) {
      this.messageBox = win.addObj(mkHTML("span", {
        className: "whitetext",
        style: "display: block; padding-bottom: 4px;",
        innerHTML: message
      }));
      this.okButton = win.addObj(mkHTML("button", {
        innerHTML: "OK",
        style: "display: block; width: 80px; height: 30px; margin: auto;",
        onclick: function() {
          cb();
          this.getWindow().close();
        }.bind(this)
      }));
    }.bind(this));
  }
  UtilDialog.prototype.getWindow = function() {
    return this.win;
  };
  function OWOPDropDown() {
    this.win = new GUIWindow(null, {
      immobile: true
    }, function(win) {
      win.frame.className = "owopdropdown";
      win.container.style.cssText = "border: none;			background-color: initial;			pointer-events: none;			margin: 0;";
      let hlpdiv = win.addObj(mkHTML("div", {
        className: "winframe",
        style: "padding: 0;				width: 68px; height: 64px;"
      }));
      let hidebtn = win.addObj(mkHTML("button", {
        innerHTML: "hi"
        /*className: "winframe",
        style: "padding: 0;\
        background-color: #ffd162;\
        left: -6px; top: 70px;\
        width: 38px; height: 36px;"*/
      }));
      let hlpcontainer = mkHTML("div", {
        className: "wincontainer",
        style: "margin-top: -5px;"
      });
      hlpdiv.appendChild(hlpcontainer);
      hlpcontainer.appendChild(mkHTML("button", {
        style: "background-image: url(img/gui.png);				background-position: -64px 4px;				background-origin: border-box;				background-repeat: no-repeat;				width: 100%; height: 100%;",
        onclick: function() {
          console.log("help");
        }.bind(this)
      }));
    }).resize(68, 64);
  }
  OWOPDropDown.prototype.getWindow = function() {
    return this.win;
  };
  function GUIWindow(title, options2, initfunc) {
    options2 = options2 || {};
    this.wm = windowSys;
    this.opt = options2;
    this.title = title;
    this.frame = document.createElement("div");
    this.container = document.createElement("div");
    this.container.className = "wincontainer";
    this.x = 0;
    this.y = 0;
    if (title) {
      this.titlespan = document.createElement("span");
      this.titlespan.innerHTML = title;
      this.frame.appendChild(this.titlespan);
    }
    this.frame.appendChild(this.container);
    if (options2.centered) {
      options2.immobile = true;
      this.frame.className = "centered";
    }
    Object.defineProperty(this, "realw", {
      get: function() {
        return this.frame.offsetWidth;
      }.bind(this)
    });
    Object.defineProperty(this, "realh", {
      get: function() {
        return this.frame.offsetHeight;
      }.bind(this)
    });
    this.elements = [];
    this.creationtime = Date.now();
    this.currentaction = null;
    if (initfunc) {
      initfunc(this);
    }
    this.mdownfunc = function(e) {
      let offx = e.clientX - this.x;
      let offy = e.clientY - this.y;
      if (e.target === this.frame && !this.opt.immobile) {
        this.currentaction = function(x, y) {
          x = x <= 0 ? 0 : x > window.innerWidth ? window.innerWidth : x;
          y = y <= 0 ? 0 : y > window.innerHeight ? window.innerHeight : y;
          this.move(x - offx, y - offy);
        };
      }
    }.bind(this);
    if (options2.centerOnce) {
      this.move(window.innerWidth, window.innerHeight);
      waitFrames(2, () => centerWindow(this));
    }
    this.frame.addEventListener("mousedown", this.mdownfunc);
    this.mupfunc = function(e) {
      this.currentaction = null;
    }.bind(this);
    window.addEventListener("mouseup", this.mupfunc);
    this.mmovefunc = function(e) {
      if (this.currentaction) {
        this.currentaction(e.clientX, e.clientY);
      }
    }.bind(this);
    window.addEventListener("mousemove", this.mmovefunc);
    this.touchfuncbuilder = function(type) {
      return (event) => {
        let handlers = {
          start: this.mdownfunc,
          move: this.mmovefunc,
          end: this.mupfunc,
          cancel: this.mupfunc
        };
        let handler = handlers[type];
        if (handler) {
          let touches = event.changedTouches;
          if (touches.length > 0) {
            handler(touches[0]);
          }
        }
      };
    }.bind(this);
    this.frame.addEventListener("touchstart", this.touchfuncbuilder("start"));
    this.frame.addEventListener("touchmove", this.touchfuncbuilder("move"));
    this.frame.addEventListener("touchend", this.touchfuncbuilder("end"));
    this.frame.addEventListener("touchcancel", this.touchfuncbuilder("cancel"));
    if (options2.closeable) {
      this.frame.appendChild(mkHTML("button", {
        onclick: function() {
          this.close();
        }.bind(this),
        className: "windowCloseButton"
      }));
    }
  }
  GUIWindow.prototype.getWindow = function() {
    return this;
  };
  GUIWindow.prototype.addObj = function(object) {
    this.elements.push(object);
    this.container.appendChild(object);
    return object;
  };
  GUIWindow.prototype.delObj = function(object) {
    let i = this.elements.indexOf(object);
    if (i != -1) {
      this.elements.splice(i, 1);
      this.container.removeChild(object);
    }
  };
  GUIWindow.prototype.move = function(x, y) {
    if (!this.opt.immobile) {
      this.frame.style.transform = "translate(" + x + "px," + y + "px)";
      this.x = x;
      this.y = y;
    }
    return this;
  };
  GUIWindow.prototype.resize = function(w, h) {
    this.w = w;
    this.h = h;
    this.container.style.width = w + "px";
    this.container.style.height = h + "px";
    return this;
  };
  GUIWindow.prototype.close = function() {
    delWindow(this);
    window.removeEventListener("mousemove", this.mmovefunc);
    window.removeEventListener("mouseup", this.mupfunc);
    this.frame.removeEventListener("mousedown", this.mdownfunc);
    if (this.onclose) {
      this.onclose();
    }
  };
  function addWindow(window2) {
    if (options.noUi) return window2;
    let realWindow = window2.getWindow();
    if (!windowSys.windows[realWindow.title]) {
      elements.windows.appendChild(realWindow.frame);
      windowSys.windows[realWindow.title] = realWindow;
    }
    eventSys.emit(EVENTS.misc.windowAdded, window2);
    return window2;
  }
  function delWindow(window2) {
    let realWindow = window2.getWindow();
    if (windowSys.windows[realWindow.title]) {
      elements.windows.removeChild(realWindow.frame);
      delete windowSys.windows[realWindow.title];
    }
    return window2;
  }
  function centerWindow(win) {
    win = win.getWindow();
    win.move(window.innerWidth / 2 - win.realw / 2 | 0, window.innerHeight / 2 - win.realh / 2 | 0);
  }

  // neko client 0.5.1 - closed beta feature complete/src/js/tools.js
  var tools = {};
  var toolsWindow = null;
  var windowShown = false;
  function updateToolWindow(name) {
    if (!toolsWindow) return;
    let tool = tools[name];
    let children = toolsWindow.container.children;
    for (let i = 0; i < children.length; i++) {
      let button = children[i];
      let isSelected = button.id.split("-")[1] === name;
      button.className = isSelected ? "selected" : "";
      button.children[0].style.backgroundImage = "url(" + (isSelected ? cursors.slotset : cursors.set.src) + ")";
    }
    elements.viewport.style.cursor = "url(" + tool.cursorblob + ") " + tool.offset[0] + " " + tool.offset[1] + ", pointer";
  }
  function updateBindDisplay() {
    let binddiv = elements.keybindSelection;
    binddiv.innerHTML = "";
    for (let name in tools) {
      if (player.rank >= tools[name].rankRequired) {
        let item = document.createElement("li");
        let tname = document.createTextNode(`${name} - bound to "${misc.keybinds[name] == void 0 ? "unbound" : KeyName[misc.keybinds[name]]}"  `);
        let but = document.createElement("button");
        but.textContent = "rebind";
        but.addEventListener("click", () => {
          getNewBind(name, but);
        });
        item.appendChild(tname);
        item.appendChild(but);
        binddiv.appendChild(item);
      }
    }
  }
  function updateToolbar(win = toolsWindow) {
    if (!win) return;
    const container = win.container;
    const toolButtonClick = (name) => (event) => {
      player.tool = name;
      soundSys.click();
    };
    container.innerHTML = "";
    for (const name in tools) {
      let tool = tools[name];
      if (player.rank >= tool.rankRequired) {
        let element = document.createElement("button");
        let mask = document.createElement("div");
        setTooltip(element, tool.name + " tool");
        element.id = "tool-" + name;
        mask.style.pointerEvents = "none";
        element.addEventListener("click", toolButtonClick(name));
        if (tool === player.tool) {
          mask.style.backgroundImage = "url(" + cursors.slotset + ")";
          element.className = "selected";
        } else {
          mask.style.backgroundImage = "url(" + cursors.set.src + ")";
        }
        mask.style.backgroundPosition = tool.setposition;
        element.appendChild(mask);
        container.appendChild(element);
      }
    }
    updateBindDisplay();
  }
  function showToolsWindow(bool) {
    if (windowShown !== bool) {
      if (bool && toolsWindow) {
        windowSys.addWindow(toolsWindow);
      } else if (toolsWindow) {
        windowSys.delWindow(toolsWindow);
      }
      windowShown = bool;
    }
  }
  function addTool(tool) {
    tool.id = tool.name.toLowerCase();
    tools[tool.id] = tool;
    updateToolbar();
  }
  var Tool = class {
    constructor(name, cursor, fxRenderer, rankNeeded, onInit) {
      this.name = name;
      this.id = null;
      this.fxRenderer = fxRenderer;
      this.cursorblob = cursor.img.shadowblob;
      this.cursor = cursor.img.shadowed;
      this.setposition = -cursor.imgpos[0] * 36 + "px " + -cursor.imgpos[1] * 36 + "px";
      this.offset = cursor.hotspot;
      this.rankRequired = rankNeeded;
      this.extra = {};
      this.events = {
        mouseup: null,
        mousedown: null,
        mousemove: null,
        touchstart: null,
        touchmove: null,
        touchend: null,
        touchcancel: null,
        select: null,
        deselect: null,
        keydown: null,
        keyup: null,
        scroll: null,
        tick: null
      };
      onInit(this);
    }
    /* Doesn't update if tool already selected */
    setFxRenderer(func) {
      this.fxRenderer = func;
    }
    isEventDefined(type) {
      return type in this.events;
    }
    setEvent(type, func) {
      let events = type.split(" ");
      for (let i = 0; i < events.length; i++) {
        this.events[events[i]] = func || null;
      }
    }
    call(type, data) {
      let func = this.events[type];
      if (func) {
        return func.apply(this, data);
      } else if (type.indexOf("touch") === 0) {
        return this.defaultTouchHandler(type.slice(5), data);
      }
      return false;
    }
    defaultTouchHandler(type, data) {
      let mouse2 = data[0];
      let event = data[1];
      let handlers = {
        start: this.events.mousedown,
        move: this.events.mousemove,
        end: this.events.mouseup,
        cancel: this.events.mouseup
      };
      let handler = handlers[type];
      if (handler) {
        let touches = event.changedTouches;
        for (let i = 0; i < touches.length; i++) {
          mouse2.x = touches[i].pageX;
          mouse2.y = touches[i].pageY;
          handler.apply(this, data);
        }
      }
    }
  };
  eventSys.once(EVENTS.misc.toolsRendered, () => {
    addTool(new Tool(
      "Cursor",
      cursors.cursor,
      PLAYERFX.RECT_SELECT_ALIGNED(1),
      RANK.USER,
      (tool) => {
        let lastX, lastY;
        tool.setEvent("mousedown mousemove", (mouse2, event) => {
          let usedButtons = 3;
          let color = mouse2.buttons === 2 ? [255, 255, 255] : player.selectedColor;
          switch (mouse2.buttons) {
            case 1:
            case 2:
              if (!lastX || !lastY) {
                lastX = mouse2.tileX;
                lastY = mouse2.tileY;
              }
              line(lastX, lastY, mouse2.tileX, mouse2.tileY, 1, (x, y) => {
                let pixel = misc.world.getPixel(x, y);
                if (pixel !== null && !(color[0] === pixel[0] && color[1] === pixel[1] && color[2] === pixel[2])) {
                  misc.world.setPixel(x, y, color);
                }
              });
              lastX = mouse2.tileX;
              lastY = mouse2.tileY;
              break;
            case 4:
              if (event.ctrlKey) {
                usedButtons |= 4;
                let color2 = misc.world.getPixel(mouse2.tileX, mouse2.tileY);
                if (color2) {
                  player.selectedColor = color2;
                }
              }
              break;
          }
          return usedButtons;
        });
        tool.setEvent("mouseup", (mouse2) => {
          lastX = null;
          lastY = null;
        });
      }
    ));
    addTool(new Tool(
      "Move",
      cursors.move,
      PLAYERFX.NONE,
      RANK.NONE,
      (tool) => {
        function move(x, y, startX, startY) {
          moveCameraBy((startX - x) / 16, (startY - y) / 16);
        }
        tool.setEvent("mousemove", (mouse2, event) => {
          if (mouse2.buttons !== 0) {
            move(mouse2.worldX, mouse2.worldY, mouse2.mouseDownWorldX, mouse2.mouseDownWorldY);
            return mouse2.buttons;
          }
        });
      }
    ));
    addTool(new Tool(
      "Pipette",
      cursors.pipette,
      PLAYERFX.NONE,
      RANK.NONE,
      (tool) => {
        tool.setEvent("mousedown mousemove", (mouse2, event) => {
          if (mouse2.buttons !== 0 && !(mouse2.buttons & 4)) {
            let color = misc.world.getPixel(mouse2.tileX, mouse2.tileY);
            if (color) {
              player.selectedColor = color;
            }
            return mouse2.buttons;
          }
        });
      }
    ));
    addTool(new Tool(
      "Eraser",
      cursors.erase,
      PLAYERFX.RECT_SELECT_ALIGNED(16),
      RANK.MODERATOR,
      (tool) => {
        function fillChunk(chunkX, chunkY, c) {
          const color = c[2] << 16 | c[1] << 8 | c[0];
          let chunk = misc.world.getChunkAt(chunkX, chunkY);
          if (chunk) {
            let empty = true;
            firstLoop: for (let y = 0; y < OldProtocol.chunkSize; y++) {
              for (let x = 0; x < OldProtocol.chunkSize; x++) {
                if ((chunk.get(x, y) & 16777215) != color) {
                  empty = false;
                  break firstLoop;
                }
              }
            }
            if (!empty) {
              if (net.protocol.clearChunk(chunkX, chunkY, c)) {
                chunk.set(color);
              }
            }
          }
        }
        tool.setEvent("mousedown mousemove", (mouse2, event) => {
          if (mouse2.buttons & 1) {
            fillChunk(Math.floor(mouse2.tileX / OldProtocol.chunkSize), Math.floor(mouse2.tileY / OldProtocol.chunkSize), player.selectedColor);
            return 1;
          } else if (mouse2.buttons & 2) {
            fillChunk(Math.floor(mouse2.tileX / OldProtocol.chunkSize), Math.floor(mouse2.tileY / OldProtocol.chunkSize), [255, 255, 255]);
            return 1;
          }
        });
      }
    ));
    addTool(new Tool(
      "Zoom",
      cursors.zoom,
      PLAYERFX.NONE,
      RANK.NONE,
      (tool) => {
        function zoom(mouse2, type) {
          let lzoom = camera.zoom;
          let nzoom = camera.zoom;
          let offX = 0;
          let offY = 0;
          let w = window.innerWidth;
          let h = window.innerHeight;
          if (type === 1) {
            nzoom *= 1 + options.zoomStrength;
            offX = (mouse2.x - w / 2) / nzoom;
            offY = (mouse2.y - h / 2) / nzoom;
          } else if (type === 2) {
            nzoom /= 1 + options.zoomStrength;
            offX = (mouse2.x - w / 2) * (3 / lzoom - 2 / nzoom);
            offY = (mouse2.y - h / 2) * (3 / lzoom - 2 / nzoom);
          } else if (type === 3) {
            nzoom = options.defaultZoom;
          }
          nzoom = Math.round(nzoom);
          camera.zoom = nzoom;
          if (camera.zoom !== lzoom) {
            moveCameraBy(offX, offY);
          }
        }
        tool.setEvent("mousedown", (mouse2, event) => {
          zoom(mouse2, mouse2.buttons);
        });
        tool.setEvent("touchstart", (mouse2, event) => {
          tool.extra.maxTouches = Math.max(tool.extra.maxTouches || 0, event.touches.length);
        });
        tool.setEvent("touchend", (mouse2, event) => {
          if (event.touches.length === 0) {
            if (tool.extra.maxTouches > 1) {
              zoom(mouse2, tool.extra.maxTouches);
            }
            tool.extra.maxTouches = 0;
          }
        });
      }
    ));
    addTool(new Tool(
      "Export",
      cursors.select,
      PLAYERFX.NONE,
      RANK.NONE,
      (tool) => {
        tool.setFxRenderer((fx, ctx, time2) => {
          if (!fx.extra.isLocalPlayer) return 1;
          let x = fx.extra.player.x;
          let y = fx.extra.player.y;
          let fxx = (Math.floor(x / 16) - camera.x) * camera.zoom;
          let fxy = (Math.floor(y / 16) - camera.y) * camera.zoom;
          let oldlinew = ctx.lineWidth;
          ctx.lineWidth = 1;
          if (tool.extra.end) {
            let s = tool.extra.start;
            let e = tool.extra.end;
            let x2 = (s[0] - camera.x) * camera.zoom + 0.5;
            let y2 = (s[1] - camera.y) * camera.zoom + 0.5;
            let w = e[0] - s[0];
            let h = e[1] - s[1];
            ctx.beginPath();
            ctx.rect(x2, y2, w * camera.zoom, h * camera.zoom);
            ctx.globalAlpha = 1;
            ctx.strokeStyle = "#FFFFFF";
            ctx.stroke();
            ctx.setLineDash([3, 4]);
            ctx.strokeStyle = "#000000";
            ctx.stroke();
            ctx.globalAlpha = 0.25 + Math.sin(time2 / 500) / 4;
            ctx.fillStyle = renderer.patterns.unloaded;
            ctx.fill();
            ctx.setLineDash([]);
            let oldfont = ctx.font;
            ctx.font = "16px sans-serif";
            let txt = `${!tool.extra.clicking ? "Right click to screenshot " : ""}(${Math.abs(w)}x${Math.abs(h)})`;
            let txtx = window.innerWidth >> 1;
            let txty = window.innerHeight >> 1;
            txtx = Math.max(x2, Math.min(txtx, x2 + w * camera.zoom));
            txty = Math.max(y2, Math.min(txty, y2 + h * camera.zoom));
            drawText(ctx, txt, txtx, txty, true);
            ctx.font = oldfont;
            ctx.lineWidth = oldlinew;
            return 0;
          } else {
            ctx.beginPath();
            ctx.moveTo(0, fxy + 0.5);
            ctx.lineTo(window.innerWidth, fxy + 0.5);
            ctx.moveTo(fxx + 0.5, 0);
            ctx.lineTo(fxx + 0.5, window.innerHeight);
            ctx.globalAlpha = 1;
            ctx.strokeStyle = "#FFFFFF";
            ctx.stroke();
            ctx.setLineDash([3]);
            ctx.strokeStyle = "#000000";
            ctx.stroke();
            ctx.setLineDash([]);
            ctx.lineWidth = oldlinew;
            return 1;
          }
        });
        function dlarea(x, y, w, h, onblob) {
          let c = document.createElement("canvas");
          c.width = w;
          c.height = h;
          let ctx = c.getContext("2d");
          let d = ctx.createImageData(w, h);
          for (let i = y; i < y + h; i++) {
            for (let j = x; j < x + w; j++) {
              let pix = misc.world.getPixel(j, i);
              if (!pix) continue;
              d.data[4 * ((i - y) * w + (j - x))] = pix[0];
              d.data[4 * ((i - y) * w + (j - x)) + 1] = pix[1];
              d.data[4 * ((i - y) * w + (j - x)) + 2] = pix[2];
              d.data[4 * ((i - y) * w + (j - x)) + 3] = 255;
            }
          }
          ctx.putImageData(d, 0, 0);
          c.toBlob(onblob);
        }
        tool.extra.start = null;
        tool.extra.end = null;
        tool.extra.clicking = false;
        tool.setEvent("mousedown", (mouse2, event) => {
          let s = tool.extra.start;
          let e = tool.extra.end;
          const isInside = () => mouse2.tileX >= s[0] && mouse2.tileX < e[0] && mouse2.tileY >= s[1] && mouse2.tileY < e[1];
          if (mouse2.buttons === 1 && !tool.extra.end) {
            tool.extra.start = [mouse2.tileX, mouse2.tileY];
            tool.extra.clicking = true;
            tool.setEvent("mousemove", (mouse3, event2) => {
              if (tool.extra.start && mouse3.buttons === 1) {
                tool.extra.end = [mouse3.tileX, mouse3.tileY];
                return 1;
              }
            });
            const finish = () => {
              tool.setEvent("mousemove mouseup deselect", null);
              tool.extra.clicking = false;
              let s2 = tool.extra.start;
              let e2 = tool.extra.end;
              if (e2) {
                if (s2[0] === e2[0] || s2[1] === e2[1]) {
                  tool.extra.start = null;
                  tool.extra.end = null;
                }
                if (s2[0] > e2[0]) {
                  let tmp = e2[0];
                  e2[0] = s2[0];
                  s2[0] = tmp;
                }
                if (s2[1] > e2[1]) {
                  let tmp = e2[1];
                  e2[1] = s2[1];
                  s2[1] = tmp;
                }
              }
              renderer.render(renderer.rendertype.FX);
            };
            tool.setEvent("deselect", finish);
            tool.setEvent("mouseup", (mouse3, event2) => {
              if (!(mouse3.buttons & 1)) {
                finish();
              }
            });
          } else if (mouse2.buttons === 1 && tool.extra.end) {
            if (isInside()) {
              let offx = mouse2.tileX;
              let offy = mouse2.tileY;
              tool.setEvent("mousemove", (mouse3, event2) => {
                let dx = mouse3.tileX - offx;
                let dy = mouse3.tileY - offy;
                tool.extra.start = [s[0] + dx, s[1] + dy];
                tool.extra.end = [e[0] + dx, e[1] + dy];
              });
              const end = () => {
                tool.setEvent("mouseup deselect mousemove", null);
              };
              tool.setEvent("deselect", end);
              tool.setEvent("mouseup", (mouse3, event2) => {
                if (!(mouse3.buttons & 1)) {
                  end();
                }
              });
            } else {
              tool.extra.start = null;
              tool.extra.end = null;
            }
          } else if (mouse2.buttons === 2 && tool.extra.end && isInside()) {
            tool.extra.start = null;
            tool.extra.end = null;
            let cvs = dlarea(s[0], s[1], e[0] - s[0], e[1] - s[1], (b) => {
              let url = URL.createObjectURL(b);
              let img = new Image();
              img.onload = () => {
                windowSys.addWindow(new GUIWindow("Resulting image", {
                  centerOnce: true,
                  closeable: true
                }, function(win) {
                  let props = ["width", "height"];
                  if (img.width > img.height) {
                    props.reverse();
                  }
                  let r = img[props[0]] / img[props[1]];
                  let shownSize = img[props[1]] >= 128 ? 256 : 128;
                  img[props[0]] = r * shownSize;
                  img[props[1]] = shownSize;
                  win.container.classList.add("centeredChilds");
                  let image = win.addObj(img);
                  setTooltip(img, "Right click to copy/save!");
                }));
              };
              img.src = url;
            });
          }
        });
      }
    ));
    addTool(new Tool("Fill", cursors.fill, PLAYERFX.NONE, RANK.USER, function(tool) {
      tool.extra.tickAmount = 9;
      let queue = [];
      let fillingColor = null;
      let defaultFx = PLAYERFX.RECT_SELECT_ALIGNED(1);
      tool.setFxRenderer((fx, ctx, time2) => {
        ctx.globalAlpha = 0.8;
        ctx.strokeStyle = fx.extra.player.htmlRgb;
        let z = camera.zoom;
        if (!fillingColor || !fx.extra.isLocalPlayer) {
          defaultFx(fx, ctx, time2);
        } else {
          ctx.beginPath();
          for (let i = 0; i < queue.length; i++) {
            ctx.rect((queue[i][0] - camera.x) * z, (queue[i][1] - camera.y) * z, z, z);
          }
          ctx.stroke();
        }
      });
      function tick2() {
        const eq = (a, b) => a && b && a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
        const check = (x, y) => {
          if (eq(misc.world.getPixel(x, y), fillingColor)) {
            queue.unshift([x, y]);
            return true;
          }
          return false;
        };
        if (!queue.length || !fillingColor) {
          return;
        }
        let selClr = player.selectedColor;
        let painted = 0;
        let tickAmount = tool.extra.tickAmount;
        if (keysDown[17]) {
          tickAmount *= 3;
        }
        for (let painted2 = 0; painted2 < tickAmount && queue.length; painted2++) {
          let current = queue.pop();
          let x = current[0];
          let y = current[1];
          let thisClr = misc.world.getPixel(x, y);
          if (eq(thisClr, fillingColor) && !eq(thisClr, selClr)) {
            if (!misc.world.setPixel(x, y, selClr)) {
              queue.push(current);
              break;
            }
            let top = check(x, y - 1);
            let bottom = check(x, y + 1);
            let left = check(x - 1, y);
            let right = check(x + 1, y);
            if (top && left) {
              check(x - 1, y - 1);
            }
            if (top && right) {
              check(x + 1, y - 1);
            }
            if (bottom && left) {
              check(x - 1, y + 1);
            }
            if (bottom && right) {
              check(x + 1, y + 1);
            }
          }
        }
      }
      tool.setEvent("mousedown", (mouse2) => {
        if (!(mouse2.buttons & 4)) {
          fillingColor = misc.world.getPixel(mouse2.tileX, mouse2.tileY);
          if (fillingColor) {
            queue.push([mouse2.tileX, mouse2.tileY]);
            tool.setEvent("tick", tick2);
          }
        }
      });
      tool.setEvent("mouseup deselect", (mouse2) => {
        if (!mouse2 || !(mouse2.buttons & 1)) {
          fillingColor = null;
          queue = [];
          tool.setEvent("tick", null);
        }
      });
    }));
    addTool(new Tool("Line", cursors.wand, PLAYERFX.NONE, RANK.USER, function(tool) {
      var start = null;
      var end = null;
      var queue = [];
      function line2(x1, y1, x2, y2, plot) {
        let dx = Math.abs(x2 - x1), sx = x1 < x2 ? 1 : -1;
        let dy = -Math.abs(y2 - y1), sy = y1 < y2 ? 1 : -1;
        let err = dx + dy, e2;
        while (true) {
          plot(x1, y1);
          if (x1 == x2 && y1 == y2) break;
          e2 = 2 * err;
          if (e2 >= dy) {
            err += dy;
            x1 += sx;
          }
          if (e2 <= dx) {
            err += dx;
            y1 += sy;
          }
        }
      }
      let defaultFx = PLAYERFX.RECT_SELECT_ALIGNED(1);
      tool.setFxRenderer((fx, ctx, time2) => {
        ctx.globalAlpha = 0.8;
        ctx.strokeStyle = fx.extra.player.htmlRgb;
        let z = camera.zoom;
        if (!start || !end || !fx.extra.isLocalPlayer) {
          defaultFx(fx, ctx, time2);
        } else {
          ctx.beginPath();
          line2(start[0], start[1], end[0], end[1], (x, y) => {
            ctx.rect((x - camera.x) * camera.zoom, (y - camera.y) * camera.zoom, camera.zoom, camera.zoom);
          });
          ctx.stroke();
        }
      });
      function tick2() {
        for (let painted = 0; painted < 3 && queue.length; painted++) {
          let current = queue.pop();
          let c = misc.world.getPixel(current[0], current[1]);
          let pc = player.selectedColor;
          if ((c[0] != pc[0] || c[1] != pc[1] || c[2] != pc[2]) && !misc.world.setPixel(current[0], current[1], player.selectedColor)) {
            queue.push(current);
            break;
          }
        }
        if (!queue.length) {
          start = null;
          end = null;
          tool.setEvent("tick", null);
          return;
        }
      }
      tool.setEvent("mousedown", (mouse2) => {
        if (!(mouse2.buttons & 4)) {
          queue = [];
          tool.setEvent("tick", null);
          start = [mouse2.tileX, mouse2.tileY];
          end = [mouse2.tileX, mouse2.tileY];
        }
      });
      tool.setEvent("mousemove", (mouse2) => {
        if (!queue.length) {
          end = [mouse2.tileX, mouse2.tileY];
        }
      });
      tool.setEvent("mouseup", (mouse2) => {
        if (!(mouse2.buttons & 3) && !queue.length) {
          end = [mouse2.tileX, mouse2.tileY];
          if (!start) {
            end = null;
            return;
          }
          if (player.rank == RANK.ADMIN) {
            line2(start[0], start[1], end[0], end[1], (x, y) => {
              misc.world.setPixel(x, y, player.selectedColor);
            });
            start = null;
            end = null;
          } else {
            line2(start[0], start[1], end[0], end[1], (x, y) => {
              queue.push([x, y]);
            });
            tool.setEvent("tick", tick2);
          }
        }
      });
      tool.setEvent("deselect", (mouse2) => {
        queue = [];
        start = null;
        end = null;
        tool.setEvent("tick", null);
      });
    }));
    addTool(new Tool("Protect", cursors.shield, PLAYERFX.RECT_SELECT_ALIGNED(16, "#000000"), RANK.MODERATOR, (tool) => {
      tool.setFxRenderer((fx, ctx, time2) => {
        let x = fx.extra.player.x;
        let y = fx.extra.player.y;
        let fxx = (Math.floor(x / 256) * 16 - camera.x) * camera.zoom;
        let fxy = (Math.floor(y / 256) * 16 - camera.y) * camera.zoom;
        ctx.globalAlpha = 0.5;
        let chunkX = Math.floor(fx.extra.player.tileX / OldProtocol.chunkSize);
        let chunkY = Math.floor(fx.extra.player.tileY / OldProtocol.chunkSize);
        let chunk = misc.world.getChunkAt(chunkX, chunkY);
        if (chunk) {
          ctx.fillStyle = chunk.locked ? "#00FF00" : "#FF0000";
          ctx.fillRect(fxx, fxy, camera.zoom * 16, camera.zoom * 16);
        }
        return 1;
      });
      tool.setEvent("mousedown mousemove", (mouse2) => {
        let chunkX = Math.floor(mouse2.tileX / OldProtocol.chunkSize);
        let chunkY = Math.floor(mouse2.tileY / OldProtocol.chunkSize);
        let chunk = misc.world.getChunkAt(chunkX, chunkY);
        switch (mouse2.buttons) {
          case 1:
            if (!chunk.locked) {
              net.protocol.protectChunk(chunkX, chunkY, 1);
            }
            break;
          case 2:
            if (chunk.locked) {
              net.protocol.protectChunk(chunkX, chunkY, 0);
            }
            break;
        }
      });
    }));
    addTool(new Tool(
      "Area Protect",
      cursors.selectprotect,
      PLAYERFX.NONE,
      RANK.MODERATOR,
      (tool) => {
        tool.setFxRenderer((fx, ctx, time2) => {
          if (!fx.extra.isLocalPlayer) return 1;
          let x = fx.extra.player.x;
          let y = fx.extra.player.y;
          let fxx = (Math.round(x / 256) * OldProtocol.chunkSize - camera.x) * camera.zoom;
          let fxy = (Math.round(y / 256) * OldProtocol.chunkSize - camera.y) * camera.zoom;
          let oldlinew = ctx.lineWidth;
          ctx.lineWidth = 1;
          if (tool.extra.end) {
            let s = tool.extra.start;
            let e = tool.extra.end;
            let x2 = (s[0] * OldProtocol.chunkSize - camera.x) * camera.zoom + 0.5;
            let y2 = (s[1] * OldProtocol.chunkSize - camera.y) * camera.zoom + 0.5;
            let rw = e[0] - s[0];
            let rh = e[1] - s[1];
            let w = rw * camera.zoom * OldProtocol.chunkSize;
            let h = rh * camera.zoom * OldProtocol.chunkSize;
            ctx.beginPath();
            ctx.rect(x2, y2, w, h);
            ctx.globalAlpha = 1;
            ctx.strokeStyle = "#FFFFFF";
            ctx.stroke();
            ctx.setLineDash([3, 4]);
            ctx.strokeStyle = "#000000";
            ctx.stroke();
            if (tool.extra.isSure) {
              ctx.globalAlpha = 0.6;
              ctx.fillStyle = "#00EE00";
              ctx.fill();
            }
            ctx.globalAlpha = 0.25 + Math.sin(time2 / 500) / 4;
            ctx.fillStyle = renderer.patterns.unloaded;
            ctx.fill();
            ctx.setLineDash([]);
            let oldfont = ctx.font;
            ctx.font = "16px sans-serif";
            let txt = `${tool.extra.isSure ? "Click again to confirm. " : !tool.extra.clicking ? "Left/Right click to add/remove protection, respectively. " : ""}(${Math.abs(rw)}x${Math.abs(rh)})`;
            let txtx = window.innerWidth >> 1;
            let txty = window.innerHeight >> 1;
            txtx = Math.max(x2, Math.min(txtx, x2 + w));
            txty = Math.max(y2, Math.min(txty, y2 + h));
            drawText(ctx, txt, txtx, txty, true);
            ctx.font = oldfont;
            ctx.lineWidth = oldlinew;
            return 0;
          } else {
            ctx.beginPath();
            ctx.moveTo(0, fxy + 0.5);
            ctx.lineTo(window.innerWidth, fxy + 0.5);
            ctx.moveTo(fxx + 0.5, 0);
            ctx.lineTo(fxx + 0.5, window.innerHeight);
            ctx.globalAlpha = 1;
            ctx.strokeStyle = "#FFFFFF";
            ctx.stroke();
            ctx.setLineDash([3]);
            ctx.strokeStyle = "#000000";
            ctx.stroke();
            ctx.setLineDash([]);
            ctx.lineWidth = oldlinew;
            return 1;
          }
        });
        tool.extra.start = null;
        tool.extra.end = null;
        tool.extra.clicking = false;
        tool.extra.isSure = false;
        let timeout = null;
        const sure = () => {
          if (tool.extra.isSure) {
            clearTimeout(timeout);
            timeout = null;
            tool.extra.isSure = false;
            return true;
          }
          tool.extra.isSure = true;
          setTimeout(() => {
            tool.extra.isSure = false;
            timeout = null;
          }, 1e3);
          return false;
        };
        tool.setEvent("mousedown", (mouse2, event) => {
          let get = {
            rx() {
              return mouse2.tileX / OldProtocol.chunkSize;
            },
            ry() {
              return mouse2.tileY / OldProtocol.chunkSize;
            },
            x() {
              return Math.round(mouse2.tileX / OldProtocol.chunkSize);
            },
            y() {
              return Math.round(mouse2.tileY / OldProtocol.chunkSize);
            }
          };
          let s = tool.extra.start;
          let e = tool.extra.end;
          const isInside = () => get.rx() >= s[0] && get.rx() < e[0] && get.ry() >= s[1] && get.ry() < e[1];
          const isChunkSolid = (chunk) => {
            let lastClr = chunk.get(0, 0);
            return chunk.forEach((x, y, clr) => clr === lastClr);
          };
          if (mouse2.buttons === 1 && !tool.extra.end) {
            tool.extra.start = [get.x(), get.y()];
            tool.extra.clicking = true;
            tool.setEvent("mousemove", (mouse3, event2) => {
              if (tool.extra.start && mouse3.buttons === 1) {
                tool.extra.end = [get.x(), get.y()];
                return 1;
              }
            });
            const finish = () => {
              tool.setEvent("mousemove mouseup deselect", null);
              tool.extra.clicking = false;
              let s2 = tool.extra.start;
              let e2 = tool.extra.end;
              if (e2) {
                if (s2[0] === e2[0] || s2[1] === e2[1]) {
                  tool.extra.start = null;
                  tool.extra.end = null;
                }
                if (s2[0] > e2[0]) {
                  let tmp = e2[0];
                  e2[0] = s2[0];
                  s2[0] = tmp;
                }
                if (s2[1] > e2[1]) {
                  let tmp = e2[1];
                  e2[1] = s2[1];
                  s2[1] = tmp;
                }
              }
              renderer.render(renderer.rendertype.FX);
            };
            tool.setEvent("deselect", finish);
            tool.setEvent("mouseup", (mouse3, event2) => {
              if (!(mouse3.buttons & 1)) {
                finish();
              }
            });
          } else if (mouse2.buttons === 1 && tool.extra.end) {
            if (isInside() && sure()) {
              tool.extra.start = null;
              tool.extra.end = null;
              let [x, y, w, h] = [s[0], s[1], e[0] - s[0], e[1] - s[1]];
              for (let i = x; i < x + w; i++) {
                for (let j = y; j < y + h; j++) {
                  let chunk = misc.world.getChunkAt(i, j);
                  if (chunk && !chunk.locked) {
                    if (keysDown[17] && isChunkSolid(chunk)) {
                      continue;
                    }
                    net.protocol.protectChunk(i, j, 1);
                  }
                }
              }
            } else if (!isInside()) {
              tool.extra.start = null;
              tool.extra.end = null;
            }
          } else if (mouse2.buttons === 2 && tool.extra.end && isInside() && sure()) {
            tool.extra.start = null;
            tool.extra.end = null;
            let [x, y, w, h] = [s[0], s[1], e[0] - s[0], e[1] - s[1]];
            for (let i = x; i < x + w; i++) {
              for (let j = y; j < y + h; j++) {
                let chunk = misc.world.getChunkAt(i, j);
                if (chunk && chunk.locked) {
                  if (keysDown[17] && !isChunkSolid(chunk)) {
                    continue;
                  }
                  net.protocol.protectChunk(i, j, 0);
                }
              }
            }
          }
        });
      }
    ));
    addTool(new Tool("Paste", cursors.paste, PLAYERFX.NONE, RANK.MODERATOR, (tool) => {
      tool.extra.sendQueue = [];
      tool.setFxRenderer((fx, ctx, time2) => {
        let z = camera.zoom;
        let x = fx.extra.player.x;
        let y = fx.extra.player.y;
        let fxx = Math.floor(x / 16) - camera.x;
        let fxy = Math.floor(y / 16) - camera.y;
        let q = tool.extra.sendQueue;
        if (q.length) {
          let cs = OldProtocol.chunkSize;
          ctx.strokeStyle = "#000000";
          ctx.globalAlpha = 0.8;
          ctx.beginPath();
          for (let i = 0; i < q.length; i++) {
            ctx.rect((q[i].x * cs - camera.x) * z, (q[i].y * cs - camera.y) * z, z * cs, z * cs);
          }
          ctx.stroke();
          return 0;
        }
        if (tool.extra.canvas && fx.extra.isLocalPlayer) {
          ctx.globalAlpha = 0.5 + Math.sin(time2 / 500) / 4;
          ctx.strokeStyle = "#000000";
          ctx.scale(z, z);
          ctx.drawImage(tool.extra.canvas, fxx, fxy);
          ctx.scale(1 / z, 1 / z);
          ctx.globalAlpha = 0.8;
          ctx.strokeRect(fxx * z, fxy * z, tool.extra.canvas.width * z, tool.extra.canvas.height * z);
          return 0;
        }
      });
      const paint = (tileX, tileY) => {
        let tmpBuffer = new Uint32Array(OldProtocol.chunkSize * OldProtocol.chunkSize);
        let ctx = tool.extra.canvas.getContext("2d");
        let dat = ctx.getImageData(0, 0, tool.extra.canvas.width, tool.extra.canvas.height);
        let u32dat = new Uint32Array(dat.data.buffer);
        let totalChunksW = Math.ceil((absMod(tileX, OldProtocol.chunkSize) + dat.width) / OldProtocol.chunkSize);
        let totalChunksH = Math.ceil((absMod(tileY, OldProtocol.chunkSize) + dat.height) / OldProtocol.chunkSize);
        const getModifiedPixel = (x, y) => {
          let imgY = y - tileY;
          let imgX = x - tileX;
          if (imgY < 0 || imgX < 0 || imgY >= dat.height || imgX >= dat.width) {
            let currentPixel = misc.world.getPixel(x, y);
            if (!currentPixel && tool.extra.wreckStuff) {
              currentPixel = [255, 255, 255];
            }
            return currentPixel ? currentPixel[2] << 16 | currentPixel[1] << 8 | currentPixel[0] : null;
          }
          let img = u32dat[imgY * dat.width + imgX];
          let oldPixel = misc.world.getPixel(x, y);
          let alpha = img >> 24 & 255;
          if (!oldPixel) {
            if (tool.extra.wreckStuff) {
              oldPixel = [255, 255, 255];
            } else {
              return null;
            }
          }
          let r = (1 - alpha / 255) * oldPixel[0] + alpha / 255 * (img & 255);
          let g = (1 - alpha / 255) * oldPixel[1] + alpha / 255 * (img >> 8 & 255);
          let b = (1 - alpha / 255) * oldPixel[2] + alpha / 255 * (img >> 16 & 255);
          let rgb = b << 16 | g << 8 | r;
          return r == oldPixel[0] && g == oldPixel[1] && b == oldPixel[2] ? rgb : 4278190080 | rgb;
        };
        const getModifiedChunk = (chunkX, chunkY) => {
          let modified = 0;
          let offX = chunkX * OldProtocol.chunkSize;
          let offY = chunkY * OldProtocol.chunkSize;
          for (let y = 0; y < OldProtocol.chunkSize; y++) {
            for (let x = 0; x < OldProtocol.chunkSize; x++) {
              let color = getModifiedPixel(x + offX, y + offY);
              if (color !== null) {
                if (color & 4278190080) {
                  ++modified;
                }
                tmpBuffer[y * OldProtocol.chunkSize + x] = color & 16777215;
              } else {
                throw new Error(`Couldn't paste -- chunk (${chunkX}, ${chunkY}) is unloaded`);
              }
            }
          }
          return modified ? tmpBuffer : null;
        };
        if (!net.protocol.setChunk) {
          throw new Error("Protocol doesn't support pasting");
        }
        for (let y = Math.floor(tileY / OldProtocol.chunkSize), t = totalChunksH; --t >= 0; y++) {
          for (let x = Math.floor(tileX / OldProtocol.chunkSize), tw = totalChunksW; --tw >= 0; x++) {
            let newChunk = getModifiedChunk(x, y);
            if (newChunk) {
              if (!net.protocol.setChunk(x, y, newChunk)) {
                let nbuf = new Uint32Array(newChunk.length);
                nbuf.set(newChunk);
                tool.extra.sendQueue.push({
                  x,
                  y,
                  buf: nbuf
                });
              }
            }
          }
        }
      };
      tool.setEvent("tick", () => {
        let q = tool.extra.sendQueue;
        if (q.length) {
          if (net.protocol.setChunk(q[0].x, q[0].y, q[0].buf)) {
            q.shift();
          }
        }
      });
      tool.setEvent("mousedown", (mouse2) => {
        if (mouse2.buttons & 1) {
          if (tool.extra.canvas) {
            if (tool.extra.sendQueue.length) {
              throw new Error("Wait until pasting finishes, or cancel with right click!");
            }
            paint(mouse2.tileX, mouse2.tileY);
          }
        } else if (mouse2.buttons & 2) {
          tool.extra.sendQueue = [];
        }
      });
      let input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";
      tool.setEvent("select", () => {
        input.onchange = (event) => {
          if (input.files && input.files[0]) {
            let reader = new FileReader();
            reader.onload = (e) => {
              let image = new Image();
              image.onload = () => {
                tool.extra.canvas = document.createElement("canvas");
                tool.extra.canvas.width = image.width;
                tool.extra.canvas.height = image.height;
                let ctx = tool.extra.canvas.getContext("2d");
                ctx.drawImage(image, 0, 0);
                console.log("Loaded image");
              };
              image.src = e.target.result;
            };
            reader.readAsDataURL(input.files[0]);
          }
        };
        input.click();
      });
    }));
    addTool(new Tool("Copy", cursors.copy, PLAYERFX.NONE, RANK.MODERATOR, function(tool) {
      function drawText2(ctx, str, x, y, centered) {
        ctx.strokeStyle = "#000000", ctx.fillStyle = "#FFFFFF", ctx.lineWidth = 2.5, ctx.globalAlpha = 0.5;
        if (centered) {
          x -= ctx.measureText(str).width >> 1;
        }
        ctx.strokeText(str, x, y);
        ctx.globalAlpha = 1;
        ctx.fillText(str, x, y);
      }
      tool.setFxRenderer(function(fx, ctx, time2) {
        if (!fx.extra.isLocalPlayer) return 1;
        let x = fx.extra.player.x;
        let y = fx.extra.player.y;
        let fxx = (Math.floor(x / 16) - camera.x) * camera.zoom;
        let fxy = (Math.floor(y / 16) - camera.y) * camera.zoom;
        let oldlinew = ctx.lineWidth;
        ctx.lineWidth = 1;
        if (tool.extra.end) {
          let s = tool.extra.start;
          let e = tool.extra.end;
          let x2 = (s[0] - camera.x) * camera.zoom + 0.5;
          let y2 = (s[1] - camera.y) * camera.zoom + 0.5;
          let w = e[0] - s[0];
          let h = e[1] - s[1];
          ctx.beginPath();
          ctx.rect(x2, y2, w * camera.zoom, h * camera.zoom);
          ctx.globalAlpha = 1;
          ctx.strokeStyle = "#FFFFFF";
          ctx.stroke();
          ctx.setLineDash([3, 4]);
          ctx.strokeStyle = "#000000";
          ctx.stroke();
          ctx.globalAlpha = 0.25 + Math.sin(time2 / 500) / 4;
          ctx.fillStyle = renderer.patterns.unloaded;
          ctx.fill();
          ctx.setLineDash([]);
          let oldfont = ctx.font;
          ctx.font = "16px sans-serif";
          let txt = (!tool.extra.clicking ? "Right click to copy " : "") + "(" + Math.abs(w) + "x" + Math.abs(h) + ")";
          let txtx = window.innerWidth >> 1;
          let txty = window.innerHeight >> 1;
          txtx = Math.max(x2, Math.min(txtx, x2 + w * camera.zoom));
          txty = Math.max(y2, Math.min(txty, y2 + h * camera.zoom));
          drawText2(ctx, txt, txtx, txty, true);
          ctx.font = oldfont;
          ctx.lineWidth = oldlinew;
          return 0;
        } else {
          ctx.beginPath();
          ctx.moveTo(0, fxy + 0.5);
          ctx.lineTo(window.innerWidth, fxy + 0.5);
          ctx.moveTo(fxx + 0.5, 0);
          ctx.lineTo(fxx + 0.5, window.innerHeight);
          ctx.globalAlpha = 1;
          ctx.strokeStyle = "#FFFFFF";
          ctx.stroke();
          ctx.setLineDash([3]);
          ctx.strokeStyle = "#000000";
          ctx.stroke();
          ctx.setLineDash([]);
          ctx.lineWidth = oldlinew;
          return 1;
        }
      });
      tool.extra.start = null;
      tool.extra.end = null;
      tool.extra.clicking = false;
      tool.setEvent("mousedown", function(mouse2, event) {
        let s = tool.extra.start;
        let e = tool.extra.end;
        let isInside = function isInside2() {
          return mouse2.tileX >= s[0] && mouse2.tileX < e[0] && mouse2.tileY >= s[1] && mouse2.tileY < e[1];
        };
        if (mouse2.buttons === 1 && !tool.extra.end) {
          tool.extra.start = [mouse2.tileX, mouse2.tileY];
          tool.extra.clicking = true;
          tool.setEvent("mousemove", function(mouse3, event2) {
            if (tool.extra.start && mouse3.buttons === 1) {
              tool.extra.end = [mouse3.tileX, mouse3.tileY];
              return 1;
            }
          });
          let finish = function finish2() {
            tool.setEvent("mousemove mouseup deselect", null);
            tool.extra.clicking = false;
            let s2 = tool.extra.start;
            let e2 = tool.extra.end;
            if (e2) {
              if (s2[0] === e2[0] || s2[1] === e2[1]) {
                tool.extra.start = null;
                tool.extra.end = null;
              }
              if (s2[0] > e2[0]) {
                let tmp = e2[0];
                e2[0] = s2[0];
                s2[0] = tmp;
              }
              if (s2[1] > e2[1]) {
                let tmp = e2[1];
                e2[1] = s2[1];
                s2[1] = tmp;
              }
            }
            renderer.render(renderer.rendertype.FX);
          };
          tool.setEvent("deselect", finish);
          tool.setEvent("mouseup", function(mouse3, event2) {
            if (!(mouse3.buttons & 1)) {
              finish();
            }
          });
        } else if (mouse2.buttons === 1 && tool.extra.end) {
          if (isInside()) {
            let offx = mouse2.tileX;
            let offy = mouse2.tileY;
            tool.setEvent("mousemove", function(mouse3, event2) {
              let dx = mouse3.tileX - offx;
              let dy = mouse3.tileY - offy;
              tool.extra.start = [s[0] + dx, s[1] + dy];
              tool.extra.end = [e[0] + dx, e[1] + dy];
            });
            let end = function end2() {
              tool.setEvent("mouseup deselect mousemove", null);
            };
            tool.setEvent("deselect", end);
            tool.setEvent("mouseup", function(mouse3, event2) {
              if (!(mouse3.buttons & 1)) {
                end();
              }
            });
          } else {
            tool.extra.start = null;
            tool.extra.end = null;
          }
        } else if (mouse2.buttons === 2 && tool.extra.end && isInside()) {
          tool.extra.start = null;
          tool.extra.end = null;
          let x = s[0];
          let y = s[1];
          let w = e[0] - s[0];
          let h = e[1] - s[1];
          let c = document.createElement("canvas");
          c.width = w;
          c.height = h;
          let ctx = c.getContext("2d");
          let d = ctx.createImageData(w, h);
          for (let i = y; i < y + h; i++) {
            for (let j = x; j < x + w; j++) {
              let pix = misc.world.getPixel(j, i);
              if (!pix) continue;
              d.data[4 * ((i - y) * w + (j - x))] = pix[0];
              d.data[4 * ((i - y) * w + (j - x)) + 1] = pix[1];
              d.data[4 * ((i - y) * w + (j - x)) + 2] = pix[2];
              d.data[4 * ((i - y) * w + (j - x)) + 3] = 255;
            }
          }
          ctx.putImageData(d, 0, 0);
          let paste = tools.paste;
          paste.extra.canvas = c;
          let oldSelect = paste.events.select;
          paste.events.select = function() {
            paste.events.select = oldSelect;
          };
          player.tool = "paste";
        }
      });
    }));
    function paletteScroll(mouse2, event) {
      if (event.ctrlKey) camera.zoom += Math.sign(-event.deltaY);
      else player.paletteIndex += Math.sign(event.deltaY);
    }
    OWOP.client.tools.cursor.setEvent("scroll", paletteScroll);
    OWOP.client.tools.eraser.setEvent("scroll", paletteScroll);
    OWOP.client.tools.fill.setEvent("scroll", paletteScroll);
    OWOP.client.tools.line.setEvent("scroll", paletteScroll);
    eventSys.emit(EVENTS.misc.toolsInitialized);
  });
  eventSys.once(EVENTS.init, () => {
    toolsWindow = new GUIWindow("Tools", {}, (wdow) => {
      wdow.container.id = "toole-container";
      wdow.container.style.cssText = "max-width: 40px";
    }).move(5, 32);
  });
  eventSys.once(EVENTS.misc.toolsInitialized, () => {
    updateToolbar();
    if (windowShown) {
      windowSys.addWindow(toolsWindow);
    }
  });
  eventSys.on(EVENTS.net.disconnected, () => {
    showToolsWindow(false);
  });
  eventSys.on(EVENTS.misc.worldInitialized, () => {
    showToolsWindow(true);
  });

  // neko client 0.5.1 - closed beta feature complete/src/js/Player.js
  var plWidth = 0;
  var playerList = {};
  var playerListTable = document.createElement("table");
  var playerListWindow = new GUIWindow("Players", { closeable: true }, (wdow) => {
    let tableHeader = document.createElement("tr");
    tableHeader.innerHTML = "<th>Id</th><th>X</th><th>Y</th>";
    playerListTable.appendChild(tableHeader);
    wdow.container.appendChild(playerListTable);
    wdow.container.id = "player-list";
    plWidth = wdow.container.parentElement.offsetWidth;
  });
  playerListWindow.container.updateDisplay = function() {
    let diff = playerListWindow.container.parentElement.offsetWidth - plWidth;
    if (diff !== 0) {
      playerListWindow.move(playerListWindow.x - diff, playerListWindow.y);
      plWidth = playerListWindow.container.parentElement.offsetWidth;
    }
  };
  function fixPlayerListPos() {
    playerListWindow.move(window.innerWidth - playerListWindow.container.parentElement.offsetWidth - 16, elements.topRightDisplays.getBoundingClientRect().height + 16);
  }
  window.addEventListener("resize", fixPlayerListPos);
  function showPlayerList(bool = true) {
    if (bool) {
      windowSys.addWindow(playerListWindow);
      plWidth = playerListWindow.container.parentElement.offsetWidth;
      fixPlayerListPos();
    } else {
      windowSys.delWindow(playerListWindow);
    }
  }
  var Lerp = class {
    constructor(start, end, ms) {
      this.start = start;
      this.end = end;
      this.ms = ms;
      this.time = getTime();
    }
    get val() {
      let amt = Math.min((getTime() - this.time) / this.ms, 1);
      return (1 - amt) * this.start + amt * this.end;
    }
    set val(v) {
      this.start = this.val;
      this.end = v;
      this.time = getTime(true);
    }
  };
  var Player = class {
    constructor(x, y, rgb, tool, id) {
      this.id = id.toString();
      this._x = new Lerp(x, x, 65);
      this._y = new Lerp(y, y, 65);
      this.tool = tools[tool] || tools["cursor"];
      this.fx = new Fx(tool ? tool.fxType : PLAYERFX.NONE, { player: this });
      this.fx.setVisible(misc.world.validMousePos(Math.floor(this.endX / 16), Math.floor(this.endY / 16)));
      this.rgb = rgb;
      this.nick = this.id;
      this.htmlRgb = colorUtils.toHTML(colorUtils.u24_888(rgb[0], rgb[1], rgb[2]));
      this.clr = colorUtils.toHTML(
        0 | ((id + 75387) * 67283 + 53143) % 256 << 16 | ((id + 9283) * 4673 + 7483) % 256 << 8 | id * 3e3 % 256
      );
      let playerListEntry = document.createElement("tr");
      playerListEntry.innerHTML = "<td>" + this.id + "</td><td>" + Math.floor(x / 16) + "</td><td>" + Math.floor(y / 16) + "</td>";
      playerList[this.id] = playerListEntry;
      playerListTable.appendChild(playerListEntry);
      playerListWindow.container.updateDisplay();
    }
    get tileX() {
      return Math.floor(this.x / 16);
    }
    get tileY() {
      return Math.floor(this.y / 16);
    }
    get endX() {
      return this._x.end;
    }
    get endY() {
      return this._y.end;
    }
    get x() {
      return this._x.val;
    }
    get y() {
      return this._y.val;
    }
    update(x, y, rgb, tool) {
      this._x.val = x;
      this._y.val = y;
      this.tool = tools[tool] || tools["cursor"];
      this.fx.setRenderer((this.tool || {}).fxRenderer);
      this.fx.setVisible(isVisible(Math.floor(this.endX / 16), Math.floor(this.endY / 16)));
      this.rgb = rgb;
      this.htmlRgb = colorUtils.toHTML(colorUtils.u24_888(rgb[0], rgb[1], rgb[2]));
      playerList[this.id].childNodes[1].innerHTML = Math.floor(x / 16);
      playerList[this.id].childNodes[2].innerHTML = Math.floor(y / 16);
      playerListWindow.container.updateDisplay();
    }
    disconnect() {
      this.fx.delete();
      playerListTable.removeChild(playerList[this.id]);
      delete playerList[this.id];
      playerListWindow.container.updateDisplay();
    }
  };

  // neko client 0.5.1 - closed beta feature complete/src/js/World.js
  var lastPlace = 0;
  var Chunk = class {
    constructor(x, y, netdata, locked) {
      this.needsRedraw = false;
      this.x = x;
      this.y = y;
      this.tmpChunkBuf = netdata;
      this.view = null;
      this.locked = locked;
      this.lockedNeighbors = 0;
    }
    update(x, y, color) {
      x &= OldProtocol.chunkSize - 1;
      y &= OldProtocol.chunkSize - 1;
      this.view.set(x, y, 4278190080 | color);
      this.needsRedraw = true;
    }
    forEach(cb) {
      let s = OldProtocol.chunkSize;
      for (let i = 0; i < s; i++) {
        for (let j = 0; j < s; j++) {
          if (!cb(j, i, this.get(j, i))) {
            return false;
          }
        }
      }
      return true;
    }
    get(x, y) {
      x &= OldProtocol.chunkSize - 1;
      y &= OldProtocol.chunkSize - 1;
      return this.view.get(x, y);
    }
    set(data) {
      if (Number.isInteger(data)) {
        this.view.fill(4278190080 | data);
      } else {
        this.view.fillFromBuf(data);
      }
      this.needsRedraw = true;
    }
    remove() {
      eventSys.emit(EVENTS.net.chunk.unload, this);
    }
  };
  Chunk.dir = {
    UP: 8,
    RIGHT: 4,
    DOWN: 2,
    LEFT: 1
  };
  var World = class {
    constructor(worldName) {
      this.name = worldName;
      this.chunks = {};
      this.protectedChunks = {};
      this.players = {};
      this.undoHistory = [];
      this.pathUpdaterTimeout = -1;
      this.pathFx = new Fx((fx, ctx, time2) => {
        let retval = 1;
        if (fx.extra.path && !options.noUi) {
          ctx.strokeStyle = "#525252";
          let l = ctx.lineWidth;
          ctx.lineWidth = 3 / camera.zoom;
          ctx.setTransform(camera.zoom, 0, 0, camera.zoom, -camera.x * camera.zoom, -camera.y * camera.zoom);
          if (time2 - fx.extra.placeTime < 1500) {
            ctx.globalAlpha = (1 - (time2 - fx.extra.placeTime) / 1500) * 0.5;
            ctx.fillStyle = renderer.patterns.unloaded;
            ctx.fill(fx.extra.path);
            retval = 0;
          }
          ctx.globalAlpha = 0.75;
          if (options.showProtectionOutlines) {
            ctx.stroke(fx.extra.path);
          }
          ctx.setTransform(1, 0, 0, 1, 0, 0);
          ctx.lineWidth = l;
        }
        return retval;
      });
      const loadCFunc = (chunk) => this.chunkLoaded(chunk);
      const unloadCFunc = (chunk) => this.chunkUnloaded(chunk);
      const setCFunc = (x, y, data) => this.chunkPasted(x, y, data);
      const lockCFunc = (x, y, newState) => this.chunkLocked(x, y, newState);
      const disconnectedFunc = () => eventSys.emit(EVENTS.net.world.leave);
      const updateTileFunc = (t) => this.tilesUpdated(t);
      const updatePlayerFunc = (p) => this.playersMoved(p);
      const destroyPlayerFunc = (p) => this.playersLeft(p);
      const leaveWFunc = () => {
        this.pathFx.delete();
        this.unloadAllChunks();
        this.playersLeft(Object.keys(this.players));
        eventSys.removeListener(EVENTS.net.chunk.load, loadCFunc);
        eventSys.removeListener(EVENTS.net.chunk.unload, unloadCFunc);
        eventSys.removeListener(EVENTS.net.chunk.set, setCFunc);
        eventSys.removeListener(EVENTS.net.chunk.lock, lockCFunc);
        eventSys.removeListener(EVENTS.net.disconnected, disconnectedFunc);
        eventSys.removeListener(EVENTS.net.world.tilesUpdated, updateTileFunc);
        eventSys.removeListener(EVENTS.net.world.playersMoved, updatePlayerFunc);
        eventSys.removeListener(EVENTS.net.world.playersLeft, destroyPlayerFunc);
      };
      eventSys.on(EVENTS.net.chunk.load, loadCFunc);
      eventSys.on(EVENTS.net.chunk.unload, unloadCFunc);
      eventSys.on(EVENTS.net.chunk.set, setCFunc);
      eventSys.on(EVENTS.net.chunk.lock, lockCFunc);
      eventSys.on(EVENTS.net.world.tilesUpdated, updateTileFunc);
      eventSys.on(EVENTS.net.world.playersMoved, updatePlayerFunc);
      eventSys.on(EVENTS.net.world.playersLeft, destroyPlayerFunc);
      eventSys.once(EVENTS.net.world.leave, leaveWFunc);
      eventSys.once(EVENTS.net.disconnected, disconnectedFunc);
    }
    makeLockedChunksPath() {
      const d = Chunk.dir;
      let mainPath = new Path2D();
      let vpoints = {};
      let hpoints = {};
      const addPoint = (fx, fy, tx, ty, points) => {
        const fkey = `${fx},${fy}`;
        const tkey = `${tx},${ty}`;
        if (tkey in points && fkey in points) {
          points[points[fkey]] = points[tkey];
          points[points[tkey]] = points[fkey];
          delete points[tkey];
          delete points[fkey];
        } else if (tkey in points) {
          let newTo = points[tkey];
          points[newTo] = fkey;
          delete points[tkey];
          points[fkey] = newTo;
        } else if (fkey in points) {
          let newFrom = points[fkey];
          points[newFrom] = tkey;
          delete points[fkey];
          points[tkey] = newFrom;
        } else {
          points[fkey] = tkey;
          points[tkey] = fkey;
        }
      };
      for (let k in this.protectedChunks) {
        const chunk = this.protectedChunks[k];
        const ln = chunk.lockedNeighbors;
        if (ln === (d.LEFT | d.DOWN | d.UP | d.RIGHT)) {
          continue;
        }
        if (!(ln & d.UP)) {
          addPoint(chunk.x + 1, chunk.y, chunk.x, chunk.y, hpoints);
        }
        if (!(ln & d.DOWN)) {
          addPoint(chunk.x, chunk.y + 1, chunk.x + 1, chunk.y + 1, hpoints);
        }
        if (!(ln & d.LEFT)) {
          addPoint(chunk.x, chunk.y + 1, chunk.x, chunk.y, vpoints);
        }
        if (!(ln & d.RIGHT)) {
          addPoint(chunk.x + 1, chunk.y + 1, chunk.x + 1, chunk.y, vpoints);
        }
      }
      let polys = 0;
      let pointobjs = [vpoints, hpoints];
      for (let p in vpoints) {
        let a = p.split(",");
        mainPath.moveTo(a[0] * 16, a[1] * 16);
        delete vpoints[vpoints[p]];
        delete vpoints[p];
        p = hpoints[p];
        for (let i = 0; p && (a = p.split(",")); i++) {
          let prev = pointobjs[i + 1 & 1];
          let next = pointobjs[i & 1];
          mainPath.lineTo(a[0] * 16, a[1] * 16);
          delete prev[prev[p]];
          delete prev[p];
          p = next[p];
        }
        mainPath.closePath();
        ++polys;
      }
      return polys === 0 ? null : mainPath;
    }
    findNeighborLockedChunks(chunk, newState) {
      const d = Chunk.dir;
      const checkSide = (x, y, to, from) => {
        let sidec = this.getChunkAt(chunk.x + x, chunk.y + y);
        if (sidec && sidec.locked) {
          if (newState) {
            chunk.lockedNeighbors |= to;
            sidec.lockedNeighbors |= from;
          } else {
            chunk.lockedNeighbors &= ~to;
            sidec.lockedNeighbors &= ~from;
          }
        }
      };
      checkSide(0, -1, d.UP, d.DOWN);
      checkSide(1, 0, d.RIGHT, d.LEFT);
      checkSide(-1, 0, d.LEFT, d.RIGHT);
      checkSide(0, 1, d.DOWN, d.UP);
      clearTimeout(this.pathUpdaterTimeout);
      this.pathUpdaterTimeout = setTimeout(() => {
        this.pathFx.update({ path: this.makeLockedChunksPath() });
        renderer.render(renderer.rendertype.FX);
      }, 100);
    }
    loadChunk(x, y) {
      let key = `${x},${y}`;
      if (!this.chunks[key] && net.isConnected()) {
        net.protocol.requestChunk(x, y);
      }
    }
    allChunksLoaded() {
      return net.protocol.allChunksLoaded();
    }
    tilesUpdated(tiles) {
      let chunksUpdated = {};
      let chunkSize = OldProtocol.chunkSize;
      for (let i = 0; i < tiles.length; i++) {
        let t = tiles[i];
        let key = `${Math.floor(t.x / chunkSize)},${Math.floor(t.y / chunkSize)}`;
        let chunk = this.chunks[key];
        if (chunk) {
          chunksUpdated[key] = chunk;
          chunk.update(t.x, t.y, t.rgb);
        }
      }
      for (let c in chunksUpdated) {
        eventSys.emit(EVENTS.renderer.updateChunk, chunksUpdated[c]);
      }
    }
    playersMoved(players) {
      var rendered = false;
      for (let id in players) {
        var p = this.players[id];
        var u = players[id];
        if (p) p.update(u.x, u.y, u.rgb, u.tool);
        else p = this.players[id] = new Player(u.x, u.y, u.rgb, u.tool, id);
        if (!rendered && (isVisible(p.endX / 16, p.endY / 16, 4, 4) || isVisible(p.x / 16, p.y / 16, 4, 4))) {
          rendered = true;
          renderer.render(renderer.rendertype.FX);
        }
      }
    }
    playersLeft(ids) {
      let rendered = false;
      for (let i = 0; i < ids.length; i++) {
        let id = ids[i];
        let p = this.players[id];
        if (p) {
          p.disconnect();
          if (!rendered && isVisible(p.x / 16, p.y / 16, 4, 4)) {
            rendered = true;
            renderer.render(renderer.rendertype.FX);
          }
        }
        delete this.players[id];
      }
    }
    setPixel(x, y, color, noUndo) {
      let time2 = Date.now();
      let chunkSize = OldProtocol.chunkSize;
      let chunk = this.chunks[`${Math.floor(x / chunkSize)},${Math.floor(y / chunkSize)}`];
      if (chunk && (!chunk.locked || player.rank >= RANK.MODERATOR)) {
        let oldPixel = this.getPixel(x, y, chunk);
        if (!oldPixel || oldPixel[0] === color[0] && oldPixel[1] === color[1] && oldPixel[2] === color[2] || !net.protocol.updatePixel(x, y, color, () => {
          chunk.update(x, y, colorUtils.u24_888(oldPixel[0], oldPixel[1], oldPixel[2]));
          eventSys.emit(EVENTS.renderer.updateChunk, chunk);
        })) {
          return false;
        }
        if (!noUndo) {
          oldPixel.push(x, y, time2);
          this.undoHistory.push(oldPixel);
        }
        chunk.update(x, y, colorUtils.u24_888(color[0], color[1], color[2]));
        eventSys.emit(EVENTS.renderer.updateChunk, chunk);
        if (time2 - lastPlace > 30) {
          soundSys.place();
          lastPlace = time2;
        }
        return true;
      } else if (chunk && chunk.locked) {
        this.pathFx.extra.placeTime = time2;
        renderer.render(renderer.rendertype.FX);
      }
      return false;
    }
    undo(bulkUndo) {
      const eq = (a, b) => a[0] == b[0] && a[1] == b[1] && a[2] == b[2];
      if (this.undoHistory.length === 0) {
        return false;
      }
      let changeTime = null;
      for (let i = this.undoHistory.length; --i >= 0; ) {
        let undo = this.undoHistory[i];
        if (!changeTime) {
          changeTime = undo[5];
        }
        let px = this.getPixel(undo[3], undo[4]);
        if (px) {
          let shouldContinue = !bulkUndo || changeTime - undo[5] < 500;
          let unchanged = eq(px, undo);
          if (!shouldContinue) {
            break;
          }
          if (unchanged || this.setPixel(undo[3], undo[4], undo, true)) {
            this.undoHistory.splice(i, 1);
            if (!bulkUndo) {
              break;
            }
          }
        }
      }
    }
    getChunkAt(x, y) {
      return this.chunks[`${x},${y}`];
    }
    getPixel(x, y, chunk) {
      if (!chunk) {
        let chunkSize = OldProtocol.chunkSize;
        chunk = this.chunks[`${Math.floor(x / chunkSize)},${Math.floor(y / chunkSize)}`];
      }
      if (chunk) {
        let clr = chunk.get(x, y);
        return [clr & 255, clr >> 8 & 255, clr >> 16 & 255];
      }
      return null;
    }
    validMousePos(tileX, tileY) {
      return this.getPixel(tileX, tileY) !== null;
    }
    chunkLocked(x, y, newState) {
      const key = `${x},${y}`;
      let chunk = this.getChunkAt(x, y);
      if (chunk) {
        if (newState) {
          this.protectedChunks[key] = chunk;
          chunk.locked = true;
        } else {
          delete this.protectedChunks[key];
          chunk.locked = false;
        }
        this.findNeighborLockedChunks(chunk, newState);
      }
    }
    chunkLoaded(chunk) {
      const key = `${chunk.x},${chunk.y}`;
      this.chunks[key] = chunk;
      if (chunk.locked) {
        this.protectedChunks[key] = chunk;
        this.findNeighborLockedChunks(chunk, chunk.locked);
      }
      eventSys.emit(EVENTS.renderer.addChunk, chunk);
    }
    chunkUnloaded(chunk) {
      const key = `${chunk.x},${chunk.y}`;
      delete this.chunks[key];
      if (chunk.locked) {
        delete this.protectedChunks[key];
        chunk.locked = false;
        this.findNeighborLockedChunks(chunk, chunk.locked);
      }
      eventSys.emit(EVENTS.renderer.rmChunk, chunk);
    }
    chunkPasted(x, y, data) {
      let chunk = this.chunks[`${x},${y}`];
      if (chunk) {
        chunk.set(data);
        eventSys.emit(EVENTS.renderer.updateChunk, chunk);
      }
    }
    unloadAllChunks() {
      for (const c in this.chunks) {
        this.chunks[c].remove();
      }
    }
  };

  // neko client 0.5.1 - closed beta feature complete/src/js/Bucket.js
  var Bucket = class {
    constructor(rate, time2) {
      this.lastCheck = Date.now();
      this.allowance = rate;
      this.rate = rate;
      this.time = time2;
      this.infinite = false;
    }
    canSpend(count) {
      if (this.infinite) return true;
      this.allowance += (Date.now() - this.lastCheck) / 1e3 * (this.rate / this.time);
      this.lastCheck = Date.now();
      if (this.allowance > this.rate) this.allowance = this.rate;
      if (this.allowance < count) return false;
      this.allowance -= count;
      return true;
    }
    update() {
      if (this.infinite) return this.allowance = Infinity;
      this.allowance += (Date.now() - this.lastCheck) / 1e3 * (this.rate / this.time);
      this.lastCheck = Date.now();
      if (this.allowance > this.rate) this.allowance = this.rate;
    }
  };

  // neko client 0.5.1 - closed beta feature complete/src/js/captcha.js
  var SITEKEY = "6LcgvScUAAAAAARUXtwrM8MP0A0N70z4DHNJh-KI";
  function loadCaptcha(onload) {
    if (!window.grecaptcha) {
      if (window.callback) {
        window.callback = function() {
          onload();
          this();
        }.bind(window.callback);
      } else {
        window.callback = function() {
          delete window.callback;
          onload();
        };
        eventSys.emit(EVENTS.misc.loadingCaptcha);
        loadScript("https://www.google.com/recaptcha/api.js?onload=callback&render=explicit");
      }
    } else {
      onload();
    }
  }
  function requestVerification() {
    windowSys.addWindow(new GUIWindow("Verification needed", {
      centered: true
    }, (wdow) => {
      let id = grecaptcha.render(wdow.addObj(mkHTML("div", {
        id: "captchawdow"
      })), {
        theme: "light",
        sitekey: SITEKEY,
        callback: (token) => {
          eventSys.emit(EVENTS.misc.captchaToken, token);
          wdow.close();
        }
      });
      wdow.frame.style.cssText = "";
      wdow.container.style.cssText = "overflow: hidden; background-color: #F9F9F9";
    }));
  }
  function loadAndRequestCaptcha() {
    if ("owopcaptcha" in localStorage) {
      setTimeout(() => {
        eventSys.emit(EVENTS.misc.captchaToken, "LETMEINPLZ" + localStorage.owopcaptcha);
      }, 0);
    } else {
      loadCaptcha(requestVerification);
    }
  }

  // neko client 0.5.1 - closed beta feature complete/src/js/networking.js
  var net = {
    connection: null,
    currentServer: null,
    protocol: null,
    isConnected,
    connect
  };
  function isConnected() {
    return net.protocol !== null && net.protocol.isConnected();
  }
  function connect(server, worldName, captcha) {
    eventSys.emit(EVENTS.net.connecting, server);
    net.connection = new WebSocket(server.url);
    net.connection.binaryType = "arraybuffer";
    net.protocol = new OldProtocolImpl(net.connection, worldName, captcha);
  }
  var OldProtocol = {
    class: OldProtocolImpl,
    chunkSize: 16,
    netUpdateSpeed: 20,
    clusterChunkAmount: 64,
    maxWorldNameLength: 24,
    worldBorder: 1048575,
    chatBucket: [4, 6],
    placeBucket: {
      [RANK.NONE]: [0, 1],
      [RANK.USER]: [32, 4],
      [RANK.MODERATOR]: [32, 2],
      [RANK.ADMIN]: [32, 0]
    },
    maxMessageLength: {
      [RANK.NONE]: 128,
      [RANK.USER]: 128,
      [RANK.MODERATOR]: 512,
      [RANK.ADMIN]: 16384
    },
    tools: {
      id: {},
      /* Generated automatically */
      0: "cursor",
      1: "move",
      2: "pipette",
      3: "eraser",
      4: "zoom",
      5: "fill",
      6: "paste",
      7: "export",
      8: "line",
      9: "protect",
      10: "copy"
    },
    misc: {
      worldVerification: 25565,
      chatVerification: String.fromCharCode(10),
      tokenVerification: "CaptchA"
    },
    opCode: {
      client: {},
      server: {
        setId: 0,
        worldUpdate: 1,
        chunkLoad: 2,
        teleport: 3,
        setRank: 4,
        captcha: 5,
        setPQuota: 6,
        chunkProtected: 7,
        maxCount: 8,
        donUntil: 9
      }
    }
  };
  var Protocol = class {
    constructor(ws) {
      this.ws = ws;
      this.lasterr = null;
    }
    hookEvents(subClass) {
      this.ws.addEventListener("message", subClass.messageHandler.bind(subClass));
      this.ws.addEventListener("open", subClass.openHandler.bind(subClass));
      this.ws.addEventListener("close", subClass.closeHandler.bind(subClass));
      this.ws.addEventListener("error", subClass.errorHandler.bind(subClass));
    }
    isConnected() {
      return this.ws.readyState === WebSocket.OPEN;
    }
    openHandler() {
      eventSys.emit(EVENTS.net.connected);
    }
    errorHandler(err) {
      this.lasterr = err;
    }
    closeHandler() {
      eventSys.emit(EVENTS.net.disconnected);
    }
    messageHandler(message) {
    }
    joinWorld(name) {
    }
    requestChunk(x, y) {
    }
    updatePixel(x, y, rgb) {
    }
    sendUpdates() {
    }
    sendMessage(str) {
    }
  };
  var captchaState = {
    CA_WAITING: 0,
    CA_VERIFYING: 1,
    CA_VERIFIED: 2,
    CA_OK: 3,
    CA_INVALID: 4
  };
  for (const id in OldProtocol.tools) {
    if (+id >= 0) {
      OldProtocol.tools.id[OldProtocol.tools[id]] = +id;
    }
  }
  function stoi(string, max) {
    let ints = [];
    let fstring = "";
    string = string.toLowerCase();
    for (let i = 0; i < string.length && i < max; i++) {
      let charCode = string.charCodeAt(i);
      if (charCode < 123 && charCode > 96 || charCode < 58 && charCode > 47 || charCode == 95 || charCode == 46) {
        fstring += String.fromCharCode(charCode);
        ints.push(charCode);
      }
    }
    return [ints, fstring];
  }
  var OldProtocolImpl = class extends Protocol {
    constructor(ws, worldName, captcha) {
      super(ws);
      super.hookEvents(this);
      this.lastSentX = 0;
      this.lastSentY = 0;
      this.playercount = 1;
      this.worldName = worldName ? worldName : options.defaultWorld;
      this.players = {};
      this.chunksLoading = {};
      this.waitingForChunks = 0;
      this.pendingEdits = {};
      this.id = null;
      this.captcha = captcha;
      let params = OldProtocol.chatBucket;
      this.chatBucket = new Bucket(params[0], params[1]);
      params = OldProtocol.placeBucket[player.rank];
      this.placeBucket = new Bucket(params[0], params[1]);
      this.placeBucketMult = 1;
      this.donUntilTs = 0;
      this.interval = null;
      this.clet = null;
      this.joinFunc = () => {
        this.placeBucket.lastCheck = Date.now();
        this.placeBucket.allowance = 0;
        this.interval = setInterval(() => this.sendUpdates(), 1e3 / OldProtocol.netUpdateSpeed);
      };
      const rankChanged = (rank2) => {
        this.placeBucket.infinite = rank2 === RANK.ADMIN;
        elements.chatInput.maxLength = OldProtocol.maxMessageLength[rank2];
      };
      this.leaveFunc = () => {
        eventSys.removeListener(EVENTS.net.sec.rank, rankChanged);
        eventSys.emit(EVENTS.net.donUntil, 0, 1);
      };
      eventSys.once(EVENTS.net.world.join, this.joinFunc);
      eventSys.on(EVENTS.net.sec.rank, rankChanged);
    }
    errorHandler(err) {
      super.errorHandler(err);
    }
    closeHandler() {
      super.closeHandler();
      clearInterval(this.interval);
      eventSys.emit(EVENTS.net.sec.rank, RANK.NONE);
      eventSys.removeListener(EVENTS.net.world.join, this.joinFunc);
      this.leaveFunc();
    }
    messageHandler(message) {
      message = message.data;
      if (typeof message === "string") {
        if (message.indexOf("DEV") == 0) {
        } else {
          eventSys.emit(EVENTS.net.chat, message);
        }
        return;
      }
      let dv = new DataView(message);
      let oc = OldProtocol.opCode.server;
      switch (dv.getUint8(0)) {
        case oc.setId:
          let id = dv.getUint32(1, true);
          this.id = id;
          eventSys.emit(EVENTS.net.world.join, this.worldName);
          eventSys.emit(EVENTS.net.world.setId, id);
          eventSys.emit(EVENTS.net.playerCount, this.playercount);
          eventSys.emit(EVENTS.net.chat, JSON.stringify({
            sender: "server",
            type: "info",
            data: {
              message: '[Server] Joined world: "' + this.worldName + '", your ID is: ' + id + "!"
            }
          }));
          break;
        case oc.worldUpdate:
          let shouldrender = 0;
          let updated = false;
          let updates = {};
          for (let i = dv.getUint8(1); i--; ) {
            updated = true;
            let pid = dv.getUint32(2 + i * 16, true);
            if (pid === this.id) {
              continue;
            }
            let pmx = dv.getInt32(2 + i * 16 + 4, true);
            let pmy = dv.getInt32(2 + i * 16 + 8, true);
            let pr = dv.getUint8(2 + i * 16 + 12);
            let pg = dv.getUint8(2 + i * 16 + 13);
            let pb = dv.getUint8(2 + i * 16 + 14);
            let ptool = dv.getUint8(2 + i * 16 + 15);
            updates[pid] = {
              x: pmx,
              y: pmy,
              rgb: [pr, pg, pb],
              tool: OldProtocol.tools[ptool]
            };
            if (!this.players[pid]) {
              ++this.playercount;
              eventSys.emit(EVENTS.net.playerCount, this.playercount);
              this.players[pid] = true;
            }
          }
          if (updated) {
            eventSys.emit(EVENTS.net.world.playersMoved, updates);
          }
          let off = 2 + dv.getUint8(1) * 16;
          updated = false;
          updates = [];
          for (let i = dv.getUint16(off, true), j = 0; j < i; j++) {
            updated = true;
            let bid = dv.getUint32(2 + off + j * 15, true);
            let bpx = dv.getInt32(2 + off + j * 15 + 4, true);
            let bpy = dv.getInt32(2 + off + j * 15 + 8, true);
            let br = dv.getUint8(2 + off + j * 15 + 12);
            let bg = dv.getUint8(2 + off + j * 15 + 13);
            let bb = dv.getUint8(2 + off + j * 15 + 14);
            let bbgr = bb << 16 | bg << 8 | br;
            updates.push({
              x: bpx,
              y: bpy,
              rgb: bbgr,
              id: bid
            });
            let edkey = `${bpx},${bpy}`;
            let edtmoid = this.pendingEdits[edkey];
            if (edtmoid) {
              clearTimeout(edtmoid);
              delete this.pendingEdits[edkey];
            }
          }
          if (updated) {
            eventSys.emit(EVENTS.net.world.tilesUpdated, updates);
          }
          off += dv.getUint16(off, true) * 15 + 2;
          let decreased = false;
          updated = false;
          updates = [];
          for (let k = dv.getUint8(off); k--; ) {
            updated = true;
            let dpid = dv.getUint32(1 + off + k * 4, true);
            updates.push(dpid);
            if (this.players[dpid] && this.playercount > 1) {
              decreased = true;
              --this.playercount;
              delete this.players[dpid];
            }
          }
          if (updated) {
            eventSys.emit(EVENTS.net.world.playersLeft, updates);
            if (decreased) {
              eventSys.emit(EVENTS.net.playerCount, this.playercount);
            }
          }
          break;
        case oc.chunkLoad:
          let chunkX = dv.getInt32(1, true);
          let chunkY = dv.getInt32(5, true);
          let locked = dv.getUint8(9);
          let u8data = new Uint8Array(message, 10, message.byteLength - 10);
          u8data = decompress(u8data);
          let key = `${chunkX},${chunkY}`;
          let u32data = new Uint32Array(OldProtocol.chunkSize * OldProtocol.chunkSize);
          for (let i = 0, u = 0; i < u8data.length; i += 3) {
            let color = u8data[i + 2] << 16 | u8data[i + 1] << 8 | u8data[i];
            u32data[u++] = 4278190080 | color;
          }
          if (!this.chunksLoading[key]) {
            eventSys.emit(EVENTS.net.chunk.set, chunkX, chunkY, u32data);
          } else {
            delete this.chunksLoading[key];
            if (--this.waitingForChunks == 0) {
              clearTimeout(this.clet);
              this.clet = setTimeout(() => {
                eventSys.emit(EVENTS.net.chunk.allLoaded);
              }, 100);
            }
            let chunk = new Chunk(chunkX, chunkY, u32data, locked);
            eventSys.emit(EVENTS.net.chunk.load, chunk);
          }
          break;
        case oc.teleport:
          let x = dv.getInt32(1, true);
          let y = dv.getInt32(5, true);
          eventSys.emit(EVENTS.net.world.teleported, x, y);
          break;
        case oc.setRank:
          networkRankVerification[0] = dv.getUint8(1);
          eventSys.emit(EVENTS.net.sec.rank, dv.getUint8(1));
          break;
        case oc.captcha:
          switch (dv.getUint8(1)) {
            case captchaState.CA_WAITING:
              if (this.captcha) {
                let message2 = OldProtocol.misc.tokenVerification + this.captcha;
                this.ws.send(message2);
              } else {
                loadAndRequestCaptcha();
                eventSys.once(EVENTS.misc.captchaToken, (token) => {
                  let message2 = OldProtocol.misc.tokenVerification + token;
                  if (this.ws.readyState != WebSocket.OPEN) {
                    setTimeout(function() {
                      retryingConnect(() => options.serverAddress[0], this.worldName, token);
                    }, 125);
                  } else {
                    this.ws.send(message2);
                  }
                });
              }
              break;
            case captchaState.CA_OK:
              this.worldName = this.joinWorld(this.worldName);
              break;
          }
          break;
        case oc.setPQuota:
          let rate = dv.getUint16(1, true);
          let per = dv.getUint16(3, true);
          let oallownc = this.placeBucket.allowance;
          let pmult = dv.byteLength >= 6 ? dv.getUint8(5) / 10 : 1;
          this.placeBucket = new Bucket(rate, per);
          this.placeBucket.allowance = oallownc;
          this.placeBucketMult = pmult;
          eventSys.emit(EVENTS.net.donUntil, this.donUntilTs, this.placeBucketMult);
          break;
        case oc.chunkProtected:
          let cx = dv.getInt32(1, true);
          let cy = dv.getInt32(5, true);
          let newState = dv.getUint8(9);
          eventSys.emit(EVENTS.net.chunk.lock, cx, cy, newState);
          break;
        case oc.maxCount:
          eventSys.emit(EVENTS.net.maxCount, dv.getUint16(1, true));
          break;
        case oc.donUntil:
          this.donUntilTs = dv.getUint32(5, true) * Math.pow(2, 32) + dv.getUint32(1, true);
          eventSys.emit(EVENTS.net.donUntil, this.donUntilTs, this.placeBucketMult);
          break;
      }
    }
    joinWorld(name) {
      let nstr = stoi(name, OldProtocol.maxWorldNameLength);
      eventSys.emit(EVENTS.net.world.joining, name);
      let array = new ArrayBuffer(nstr[0].length + 2);
      let dv = new DataView(array);
      for (let i = nstr[0].length; i--; ) {
        dv.setUint8(i, nstr[0][i]);
      }
      dv.setUint16(nstr[0].length, OldProtocol.misc.worldVerification, true);
      this.ws.send(array);
      return nstr[1];
    }
    requestChunk(x, y) {
      let wb = OldProtocol.worldBorder;
      let key = `${x},${y}`;
      if (x > wb || y > wb || x < ~wb || y < ~wb || this.chunksLoading[key]) {
        return;
      }
      this.chunksLoading[key] = true;
      this.waitingForChunks++;
      let array = new ArrayBuffer(8);
      let dv = new DataView(array);
      dv.setInt32(0, x, true);
      dv.setInt32(4, y, true);
      this.ws.send(array);
    }
    allChunksLoaded() {
      return this.waitingForChunks === 0;
    }
    updatePixel(x, y, rgb, undocb) {
      let distx = Math.floor(x / OldProtocol.chunkSize) - Math.floor(this.lastSentX / (OldProtocol.chunkSize * 16));
      distx *= distx;
      let disty = Math.floor(y / OldProtocol.chunkSize) - Math.floor(this.lastSentY / (OldProtocol.chunkSize * 16));
      disty *= disty;
      let dist = Math.sqrt(distx + disty);
      if (this.isConnected() && (dist < 4 || player.rank == RANK.ADMIN) && this.placeBucket.canSpend(1)) {
        let array = new ArrayBuffer(11);
        let dv = new DataView(array);
        dv.setInt32(0, x, true);
        dv.setInt32(4, y, true);
        dv.setUint8(8, rgb[0]);
        dv.setUint8(9, rgb[1]);
        dv.setUint8(10, rgb[2]);
        this.ws.send(array);
        let key = `${x},${y}`;
        if (this.pendingEdits[key]) {
          clearTimeout(this.pendingEdits[key]);
        }
        this.pendingEdits[key] = setTimeout(undocb, 2e3);
        return true;
      }
      return false;
    }
    sendUpdates() {
      let worldx = mouse.worldX;
      let worldy = mouse.worldY;
      let lastx = this.lastSentX;
      let lasty = this.lastSentY;
      if (this.isConnected() && shouldUpdate() || (worldx != lastx || worldy != lasty)) {
        let selrgb = player.selectedColor;
        this.lastSentX = worldx;
        this.lastSentY = worldy;
        let array = new ArrayBuffer(12);
        let dv = new DataView(array);
        dv.setInt32(0, worldx, true);
        dv.setInt32(4, worldy, true);
        dv.setUint8(8, selrgb[0]);
        dv.setUint8(9, selrgb[1]);
        dv.setUint8(10, selrgb[2]);
        let tool = player.tool;
        let toolId = tool !== null ? +OldProtocol.tools.id[tool.id] : 0;
        dv.setUint8(11, toolId);
        this.ws.send(array);
      }
    }
    sendMessage(str) {
      if (str.length && this.id !== null) {
        if (player.rank == RANK.ADMIN || this.chatBucket.canSpend(1)) {
          this.ws.send(str + OldProtocol.misc.chatVerification);
          return true;
        } else {
          eventSys.emit(EVENTS.net.chat, JSON.stringify({
            sender: "server",
            type: "error",
            data: {
              message: "Slow down! You're talking too fast!"
            }
          }));
          return false;
        }
      }
    }
    protectChunk(x, y, newState) {
      if (this.isConnected() && player.rank > RANK.USER) {
        let array = new ArrayBuffer(10);
        let dv = new DataView(array);
        dv.setInt32(0, x, true);
        dv.setInt32(4, y, true);
        dv.setUint8(8, newState);
        this.ws.send(array);
        eventSys.emit(EVENTS.net.chunk.lock, x, y, newState, true);
      }
    }
    setChunk(x, y, data) {
      if (!(player.rank == RANK.ADMIN || player.rank == RANK.MODERATOR && this.placeBucket.canSpend(1.25))) {
        return false;
      }
      let buf = new Uint8Array(8 + OldProtocol.chunkSize * OldProtocol.chunkSize * 3);
      let dv = new DataView(buf.buffer);
      dv.setInt32(0, x, true);
      dv.setInt32(4, y, true);
      for (let i = 0, b = 8; i < data.length; i++, b += 3) {
        buf[b] = data[i] & 255;
        buf[b + 1] = data[i] >> 8 & 255;
        buf[b + 2] = data[i] >> 16 & 255;
      }
      this.ws.send(buf.buffer);
      return true;
    }
    clearChunk(x, y, rgb) {
      if (player.rank == RANK.ADMIN || player.rank == RANK.MODERATOR && this.placeBucket.canSpend(1)) {
        let array = new ArrayBuffer(13);
        let dv = new DataView(array);
        dv.setInt32(0, x, true);
        dv.setInt32(4, y, true);
        dv.setUint8(8, rgb[0]);
        dv.setUint8(9, rgb[1]);
        dv.setUint8(10, rgb[2]);
        this.ws.send(array);
        return true;
      }
      return false;
    }
  };

  // neko client 0.5.1 - closed beta feature complete/src/js/Fx.js
  var PLAYERFX = {
    NONE: null,
    RECT_SELECT_ALIGNED: (pixelSize, htmlColor) => (fx, ctx, time2) => {
      let x = fx.extra.player.x;
      let y = fx.extra.player.y;
      let fxx = (Math.floor(x / (16 * pixelSize)) * pixelSize - camera.x) * camera.zoom;
      let fxy = (Math.floor(y / (16 * pixelSize)) * pixelSize - camera.y) * camera.zoom;
      ctx.globalAlpha = 0.8;
      ctx.strokeStyle = htmlColor || fx.extra.player.htmlRgb;
      ctx.strokeRect(fxx, fxy, camera.zoom * pixelSize, camera.zoom * pixelSize);
      return 1;
    }
  };
  var WORLDFX = {
    NONE: null,
    RECT_FADE_ALIGNED: (size, x, y, startTime = getTime()) => (fx, ctx, time2) => {
      let alpha = 1 - (time2 - startTime) / 1e3;
      if (alpha <= 0) {
        fx.delete();
        return 2;
      }
      let fxx = (x * size - camera.x) * camera.zoom;
      let fxy = (y * size - camera.y) * camera.zoom;
      let s = camera.zoom * size;
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = fx.extra.htmlRgb || "#000000";
      ctx.strokeRect(fxx, fxy, s, s);
      if (options.enableIdView && player.rank >= RANK.MODERATOR && camera.zoom >= 8 && fx.extra.tag) {
        fxx += s;
        let str = fx.extra.tag;
        let ts = ctx.measureText(str).width;
        ctx.fillStyle = "#FFFFFF";
        ctx.strokeStyle = "#000000";
        ctx.strokeText(str, fxx, fxy);
        ctx.fillText(str, fxx, fxy);
      }
      return 0;
    }
  };
  var activeFx = [];
  var Fx = class {
    constructor(renderFunc, extra) {
      this.visible = true;
      this.renderFunc = renderFunc;
      this.extra = extra || {};
      activeFx.push(this);
    }
    render(ctx, time2) {
      if (this.renderFunc && this.visible) {
        return this.renderFunc(this, ctx, time2);
      }
      return 1;
    }
    setVisibleFunc(func) {
      Object.defineProperty(this, "visible", {
        get: func
      });
    }
    setVisible(bool) {
      this.visible = bool;
    }
    setRenderer(func) {
      this.renderFunc = func;
    }
    update(extra) {
      this.extra = extra;
    }
    delete() {
      let i = activeFx.indexOf(this);
      if (i !== -1) {
        activeFx.splice(i, 1);
      }
    }
  };
  eventSys.on(EVENTS.net.world.tilesUpdated, (tiles) => {
    let time2 = getTime(true);
    let made = false;
    for (let i = 0; i < tiles.length; i++) {
      let t = tiles[i];
      if (camera.isVisible(t.x, t.y, 1, 1)) {
        new Fx(WORLDFX.RECT_FADE_ALIGNED(1, t.x, t.y), { htmlRgb: colorUtils.toHTML(t.rgb ^ 16777215), tag: "" + t.id });
        made = true;
      }
    }
    if (made) {
      renderer.render(renderer.rendertype.FX);
    }
  });
  eventSys.on(EVENTS.net.chunk.set, (chunkX, chunkY, data) => {
    let wX = chunkX * OldProtocol.chunkSize;
    let wY = chunkY * OldProtocol.chunkSize;
    if (camera.isVisible(wX, wY, OldProtocol.chunkSize, OldProtocol.chunkSize)) {
      new Fx(WORLDFX.RECT_FADE_ALIGNED(16, chunkX, chunkY));
      renderer.render(renderer.rendertype.FX);
    }
  });
  eventSys.on(EVENTS.net.chunk.lock, (chunkX, chunkY, state, local) => {
    let wX = chunkX * OldProtocol.chunkSize;
    let wY = chunkY * OldProtocol.chunkSize;
    if (!local && camera.isVisible(wX, wY, OldProtocol.chunkSize, OldProtocol.chunkSize)) {
      new Fx(WORLDFX.RECT_FADE_ALIGNED(16, chunkX, chunkY), {
        htmlRgb: state ? "#00FF00" : "#FF0000"
      });
      renderer.render(renderer.rendertype.FX);
    }
  });

  // neko client 0.5.1 - closed beta feature complete/src/js/canvas_renderer.js
  var cameraValues = {
    x: 0,
    y: 0,
    zoom: -1
  };
  var camera = {
    get x() {
      return cameraValues.x;
    },
    get y() {
      return cameraValues.y;
    },
    get zoom() {
      return cameraValues.zoom;
    },
    set zoom(z) {
      z = Math.min(options.zoomLimitMax, Math.max(options.zoomLimitMin, z));
      if (z !== cameraValues.zoom) {
        let center = getCenterPixel();
        cameraValues.zoom = z;
        centerCameraTo(center[0], center[1]);
        eventSys.emit(EVENTS.camera.zoom, z);
      }
    },
    isVisible,
    centerCameraTo,
    moveCameraBy,
    moveCameraTo,
    alignCamera
  };
  var mouse = {
    x: 0,
    y: 0,
    lastX: 0,
    lastY: 0,
    get worldX() {
      return camera.x * 16 + this.x / (camera.zoom / 16);
    },
    get worldY() {
      return camera.y * 16 + this.y / (camera.zoom / 16);
    },
    mouseDownWorldX: 0,
    mouseDownWorldY: 0,
    get tileX() {
      return Math.floor(this.worldX / 16);
    },
    get tileY() {
      return Math.floor(this.worldY / 16);
    },
    buttons: 0,
    validTile: false,
    insideViewport: false,
    touches: [],
    cancelMouseDown: function() {
      this.buttons = 0;
    }
  };
  var rendererValues = {
    updateRequired: 3,
    animContext: null,
    gridShown: true,
    gridPattern: null,
    /* Rendered each time the zoom changes */
    unloadedPattern: null,
    worldBackground: null,
    minGridZoom: options.minGridZoom,
    updatedClusters: [],
    /* Clusters to render in the next frame */
    clusters: {},
    visibleClusters: [],
    currentFontSize: -1
  };
  var renderer = {
    rendertype: {
      ALL: 3,
      FX: 1,
      WORLD: 2
    },
    patterns: {
      get unloaded() {
        return rendererValues.unloadedPattern;
      }
    },
    render: requestRender,
    showGrid: setGridVisibility,
    get gridShown() {
      return rendererValues.gridShown;
    },
    updateCamera: onCameraMove,
    unloadFarClusters,
    drawText,
    renderPlayer,
    renderPlayerId,
    replaceRenderPlayerId: null
  };
  var BufView = class {
    constructor(u32data, x, y, w, h, realw) {
      this.data = u32data;
      if (options.chunkBugWorkaround) {
        this.changes = [];
      }
      this.offx = x;
      this.offy = y;
      this.realwidth = realw;
      this.width = w;
      this.height = h;
    }
    get(x, y) {
      return this.data[this.offx + x + (this.offy + y) * this.realwidth];
    }
    set(x, y, data) {
      this.data[this.offx + x + (this.offy + y) * this.realwidth] = data;
      if (options.chunkBugWorkaround) {
        this.changes.push([0, x, y, data]);
      }
    }
    fill(data) {
      for (let i = 0; i < this.height; i++) {
        for (let j = 0; j < this.width; j++) {
          this.data[this.offx + j + (this.offy + i) * this.realwidth] = data;
        }
      }
      if (options.chunkBugWorkaround) {
        this.changes.push([1, 0, 0, data]);
      }
    }
    fillFromBuf(u32buf) {
      for (let i = 0; i < this.height; i++) {
        for (let j = 0; j < this.width; j++) {
          this.data[this.offx + j + (this.offy + i) * this.realwidth] = u32buf[j + i * this.width];
          if (options.chunkBugWorkaround) {
            this.changes.push([0, j, i, u32buf[j + i * this.width]]);
          }
        }
      }
    }
  };
  var ChunkCluster = class {
    constructor(x, y) {
      this.removed = false;
      this.toUpdate = false;
      this.shown = false;
      this.x = x;
      this.y = y;
      this.canvas = document.createElement("canvas");
      this.canvas.width = OldProtocol.chunkSize * OldProtocol.clusterChunkAmount;
      this.canvas.height = OldProtocol.chunkSize * OldProtocol.clusterChunkAmount;
      this.ctx = this.canvas.getContext("2d");
      this.data = this.ctx.createImageData(this.canvas.width, this.canvas.height);
      this.u32data = new Uint32Array(this.data.data.buffer);
      this.chunks = [];
      if (options.chunkBugWorkaround) {
        this.currentColor = 0;
      }
    }
    render() {
      this.toUpdate = false;
      for (let i = this.chunks.length; i--; ) {
        let c = this.chunks[i];
        if (c.needsRedraw) {
          c.needsRedraw = false;
          if (options.chunkBugWorkaround) {
            let arr = c.view.changes;
            let s = OldProtocol.chunkSize;
            for (let j = 0; j < arr.length; j++) {
              let current = arr[j];
              if (this.currentColor !== current[3]) {
                this.currentColor = current[3];
                this.ctx.fillStyle = colorUtils.toHTML(current[3]);
              }
              switch (current[0]) {
                case 0:
                  this.ctx.fillRect(c.view.offx + current[1], c.view.offy + current[2], 1, 1);
                  break;
                case 1:
                  this.ctx.fillRect(c.view.offx, c.view.offy, s, s);
                  break;
              }
            }
            c.view.changes = [];
          } else {
            this.ctx.putImageData(
              this.data,
              0,
              0,
              c.view.offx,
              c.view.offy,
              c.view.width,
              c.view.height
            );
          }
        }
      }
    }
    remove() {
      this.removed = true;
      if (this.shown) {
        let visiblecl = rendererValues.visibleClusters;
        visiblecl.splice(visiblecl.indexOf(this), 1);
        this.shown = false;
      }
      this.canvas.width = 0;
      this.u32data = this.data = null;
      delete rendererValues.clusters[`${this.x},${this.y}`];
      for (let i = 0; i < this.chunks.length; i++) {
        this.chunks[i].view = null;
        this.chunks[i].remove();
      }
      this.chunks = [];
    }
    addChunk(chunk) {
      let x = chunk.x & OldProtocol.clusterChunkAmount - 1;
      let y = chunk.y & OldProtocol.clusterChunkAmount - 1;
      let s = OldProtocol.chunkSize;
      let view = new BufView(this.u32data, x * s, y * s, s, s, OldProtocol.clusterChunkAmount * s);
      if (chunk.tmpChunkBuf) {
        view.fillFromBuf(chunk.tmpChunkBuf);
        chunk.tmpChunkBuf = null;
      }
      chunk.view = view;
      this.chunks.push(chunk);
      chunk.needsRedraw = true;
    }
    delChunk(chunk) {
      chunk.view = null;
      let i = this.chunks.indexOf(chunk);
      if (i !== -1) {
        this.chunks.splice(i, 1);
      }
      if (!this.chunks.length) {
        this.remove();
      }
    }
  };
  function drawText(ctx, str, x, y, centered) {
    ctx.strokeStyle = "#000000", ctx.fillStyle = "#FFFFFF", ctx.lineWidth = 2.5, ctx.globalAlpha = 0.5;
    if (centered) {
      x -= ctx.measureText(str).width >> 1;
    }
    ctx.strokeText(str, x, y);
    ctx.globalAlpha = 1;
    ctx.fillText(str, x, y);
  }
  function isVisible(x, y, w, h) {
    if (document.visibilityState === "hidden") return;
    let cx = camera.x;
    let cy = camera.y;
    let czoom = camera.zoom;
    let cw = window.innerWidth;
    let ch = window.innerHeight;
    return x + w > cx && y + h > cy && x <= cx + cw / czoom && y <= cy + ch / czoom;
  }
  function unloadFarClusters() {
    let camx = camera.x;
    let camy = camera.y;
    let zoom = camera.zoom;
    let camw = window.innerWidth / zoom | 0;
    let camh = window.innerHeight / zoom | 0;
    let ctrx = camx + camw / 2;
    let ctry = camy + camh / 2;
    let s = OldProtocol.clusterChunkAmount * OldProtocol.chunkSize;
    for (let c in rendererValues.clusters) {
      c = rendererValues.clusters[c];
      if (!isVisible(c.x * s, c.y * s, s, s)) {
        let dx = Math.abs(ctrx / s - c.x) | 0;
        let dy = Math.abs(ctry / s - c.y) | 0;
        let dist = dx + dy;
        if (dist > options.unloadDistance) {
          c.remove();
        }
      }
    }
  }
  function render(type) {
    let time2 = getTime(true);
    let camx = camera.x;
    let camy = camera.y;
    let zoom = camera.zoom;
    let needsRender = 0;
    if (type & renderer.rendertype.WORLD) {
      let uClusters = rendererValues.updatedClusters;
      for (let i = 0; i < uClusters.length; i++) {
        let c = uClusters[i];
        c.render();
      }
      rendererValues.updatedClusters = [];
    }
    if (type & renderer.rendertype.FX && misc.world !== null) {
      let ctx = rendererValues.animContext;
      let visible = rendererValues.visibleClusters;
      let clusterCanvasSize = OldProtocol.chunkSize * OldProtocol.clusterChunkAmount;
      let cwidth = window.innerWidth;
      let cheight = window.innerHeight;
      let background = rendererValues.worldBackground;
      let allChunksLoaded = misc.world.allChunksLoaded();
      let bggx = -(camx * zoom) % (16 * zoom);
      let bggy = -(camy * zoom) % (16 * zoom);
      if (!allChunksLoaded) {
        if (rendererValues.unloadedPattern == null) {
          ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        } else {
          ctx.translate(bggx, bggy);
          ctx.fillStyle = rendererValues.unloadedPattern;
          ctx.fillRect(-bggx, -bggy, ctx.canvas.width, ctx.canvas.height);
          ctx.translate(-bggx, -bggy);
        }
      }
      ctx.lineWidth = 2.5 / 16 * zoom;
      ctx.scale(zoom, zoom);
      for (let i = 0; i < visible.length; i++) {
        let cluster = visible[i];
        let gx = -(camx - cluster.x * clusterCanvasSize);
        let gy = -(camy - cluster.y * clusterCanvasSize);
        let clipx = gx < 0 ? -gx : 0;
        let clipy = gy < 0 ? -gy : 0;
        let x = gx < 0 ? 0 : gx;
        let y = gy < 0 ? 0 : gy;
        let clipw = clusterCanvasSize - clipx;
        let cliph = clusterCanvasSize - clipy;
        clipw = clipw + x < cwidth / zoom ? clipw : cwidth / zoom - x;
        cliph = cliph + y < cheight / zoom ? cliph : cheight / zoom - y;
        if (clipw > 0 && cliph > 0) {
          ctx.drawImage(cluster.canvas, clipx, clipy, clipw, cliph, x, y, clipw, cliph);
        }
      }
      ctx.scale(1 / zoom, 1 / zoom);
      if (rendererValues.gridShown && rendererValues.gridPattern) {
        ctx.translate(bggx, bggy);
        ctx.fillStyle = rendererValues.gridPattern;
        ctx.fillRect(-bggx, -bggy, ctx.canvas.width, ctx.canvas.height);
        ctx.translate(-bggx, -bggy);
      }
      for (let i = 0; i < activeFx.length; i++) {
        switch (activeFx[i].render(ctx, time2)) {
          case 0:
            needsRender |= renderer.rendertype.FX;
            break;
          case 2:
            --i;
            break;
        }
      }
      ctx.globalAlpha = 1;
      let players = misc.world.players;
      let fontsize = 10 / 16 * zoom | 0;
      if (rendererValues.currentFontSize != fontsize) {
        ctx.font = fontsize + "px sans-serif";
        rendererValues.currentFontSize = fontsize;
      }
      if (options.showPlayers) {
        for (let p in players) {
          let player2 = players[p];
          if (!renderPlayer(player2, fontsize)) {
            needsRender |= renderer.rendertype.FX;
          }
        }
      }
    }
    requestRender(needsRender);
  }
  function renderPlayer(targetPlayer, fontsize) {
    let camx = camera.x * 16;
    let camy = camera.y * 16;
    let zoom = camera.zoom;
    let ctx = rendererValues.animContext;
    let cnvs = ctx.canvas;
    let tool = targetPlayer.tool;
    if (!tool) {
      tool = tools["cursor"];
    }
    let toolwidth = tool.cursor.width / 16 * zoom;
    let toolheight = tool.cursor.height / 16 * zoom;
    let x = targetPlayer.x;
    let y = targetPlayer.y;
    let cx = (x - camx - tool.offset[0]) * (zoom / 16) | 0;
    let cy = (y - camy - tool.offset[1]) * (zoom / 16) | 0;
    if (cx < -toolwidth || cy < -toolheight || cx > cnvs.width || cy > cnvs.height) {
      return true;
    }
    if (fontsize > 3) {
      if (renderer.replaceRenderPlayerId) renderer.replaceRenderPlayerId(ctx, fontsize, zoom, cx, cy + toolheight, targetPlayer.id, targetPlayer.clr, targetPlayer);
      else renderPlayerId(ctx, fontsize, zoom, cx, cy + toolheight, targetPlayer.id, targetPlayer.clr, targetPlayer);
    }
    ctx.drawImage(tool.cursor, cx, cy, toolwidth, toolheight);
    return x === targetPlayer.endX && y === targetPlayer.endY;
  }
  function renderPlayerId(ctx, fontsize, zoom, x, y, id, color) {
    let idstr = id;
    let textw = ctx.measureText(idstr).width + zoom / 2;
    ctx.globalAlpha = 1;
    ctx.fillStyle = color;
    ctx.fillRect(x, y, textw, zoom);
    ctx.globalAlpha = 0.2;
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#000000";
    ctx.strokeRect(x, y, textw, zoom);
    ctx.globalAlpha = 1;
    drawText(ctx, idstr, x + zoom / 4, y + fontsize + zoom / 8);
  }
  function requestRender(type) {
    rendererValues.updateRequired |= type;
  }
  function setGridVisibility(enabled) {
    rendererValues.gridShown = enabled;
    requestRender(renderer.rendertype.FX);
  }
  function renderGrid(zoom) {
    let tmpcanvas = document.createElement("canvas");
    let ctx = tmpcanvas.getContext("2d");
    let size = tmpcanvas.width = tmpcanvas.height = Math.round(16 * zoom);
    if (options.experimentalGrid) {
      ctx.globalAlpha = 0.1;
      if (zoom >= 4) {
        let fadeMult = Math.min(1, zoom - 4);
        if (fadeMult < 1) {
          ctx.globalAlpha = 0.2 * fadeMult;
        }
        ctx.beginPath();
        ctx.setLineDash([]);
        for (let i = 16; --i; ) {
          ctx.moveTo(i * zoom + 0.5, 0);
          ctx.lineTo(i * zoom + 0.5, size);
          ctx.moveTo(0, i * zoom + 0.5);
          ctx.lineTo(size, i * zoom + 0.5);
        }
        ctx.strokeStyle = "#000000";
        ctx.stroke();
        ctx.setLineDash([1]);
        ctx.strokeStyle = "#FFFFFF";
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.globalAlpha = Math.max(0.2, 1 * fadeMult);
      }
      ctx.beginPath();
      ctx.setLineDash([]);
      ctx.moveTo(0, 0);
      ctx.lineTo(0, size);
      ctx.lineTo(size, size);
      ctx.strokeStyle = "#FFFFFF";
      ctx.stroke();
      ctx.setLineDash([1]);
      ctx.strokeStyle = "#000000";
      ctx.stroke();
      ctx.setLineDash([]);
    } else {
      ctx.setLineDash([1]);
      ctx.globalAlpha = 0.2;
      if (zoom >= 4) {
        let fadeMult = Math.min(1, zoom - 4);
        if (fadeMult < 1) {
          ctx.globalAlpha = 0.2 * fadeMult;
        }
        ctx.beginPath();
        for (let i = 16; --i; ) {
          ctx.moveTo(i * zoom + 0.5, 0);
          ctx.lineTo(i * zoom + 0.5, size);
          ctx.moveTo(0, i * zoom + 0.5);
          ctx.lineTo(size, i * zoom + 0.5);
        }
        ctx.stroke();
        ctx.globalAlpha = Math.max(0.2, 1 * fadeMult);
      }
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, size);
      ctx.lineTo(size, size);
      ctx.stroke();
    }
    return ctx.createPattern(tmpcanvas, "repeat");
  }
  function setGridZoom(zoom) {
    if (zoom >= rendererValues.minGridZoom) {
      rendererValues.gridPattern = renderGrid(zoom);
    } else {
      rendererValues.gridPattern = null;
    }
  }
  function updateVisible() {
    let clusters = rendererValues.clusters;
    let visiblecl = rendererValues.visibleClusters;
    for (let c in clusters) {
      c = clusters[c];
      let size = OldProtocol.chunkSize * OldProtocol.clusterChunkAmount;
      let visible = isVisible(c.x * size, c.y * size, size, size);
      if (!visible && c.shown) {
        c.shown = false;
        visiblecl.splice(visiblecl.indexOf(c), 1);
      } else if (visible && !c.shown) {
        c.shown = true;
        visiblecl.push(c);
        requestRender(renderer.rendertype.WORLD);
      }
    }
  }
  function onResize() {
    elements.animCanvas.width = window.innerWidth;
    elements.animCanvas.height = window.innerHeight;
    let ctx = rendererValues.animContext;
    ctx.imageSmoothingEnabled = false;
    ctx.webkitImageSmoothingEnabled = false;
    ctx.mozImageSmoothingEnabled = false;
    ctx.msImageSmoothingEnabled = false;
    ctx.oImageSmoothingEnabled = false;
    rendererValues.currentFontSize = -1;
    onCameraMove();
  }
  function alignCamera() {
    let zoom = cameraValues.zoom;
    let alignedX = Math.round(cameraValues.x * zoom) / zoom;
    let alignedY = Math.round(cameraValues.y * zoom) / zoom;
    cameraValues.x = alignedX;
    cameraValues.y = alignedY;
  }
  function requestMissingChunks() {
    let x = camera.x / OldProtocol.chunkSize - 2 | 0;
    let mx = camera.x / OldProtocol.chunkSize + window.innerWidth / camera.zoom / OldProtocol.chunkSize | 0;
    let cy = camera.y / OldProtocol.chunkSize - 2 | 0;
    let my = camera.y / OldProtocol.chunkSize + window.innerHeight / camera.zoom / OldProtocol.chunkSize | 0;
    while (++x <= mx) {
      let y = cy;
      while (++y <= my) {
        misc.world.loadChunk(x, y);
      }
    }
  }
  function onCameraMove() {
    eventSys.emit(EVENTS.camera.moved, camera);
    alignCamera();
    updateVisible();
    if (misc.world !== null) {
      requestMissingChunks();
    }
    requestRender(renderer.rendertype.FX);
  }
  function getCenterPixel() {
    let x = Math.round(cameraValues.x + window.innerWidth / camera.zoom / 2);
    let y = Math.round(cameraValues.y + window.innerHeight / camera.zoom / 2);
    return [x, y];
  }
  function centerCameraTo(x, y) {
    if (typeof x == "number" && !isNaN(x)) {
      cameraValues.x = -(window.innerWidth / camera.zoom / 2) + x;
    }
    if (typeof y == "number" && !isNaN(y)) {
      cameraValues.y = -(window.innerHeight / camera.zoom / 2) + y;
    }
    onCameraMove();
  }
  function moveCameraBy(x, y) {
    cameraValues.x += x;
    cameraValues.y += y;
    onCameraMove();
  }
  function moveCameraTo(x, y) {
    cameraValues.x = x;
    cameraValues.y = y;
    onCameraMove();
  }
  eventSys.on(EVENTS.net.world.teleported, (x, y) => {
    centerCameraTo(x, y);
  });
  eventSys.on(EVENTS.camera.zoom, (z) => {
    setGridZoom(z);
    requestRender(renderer.rendertype.FX);
  });
  eventSys.on(EVENTS.renderer.addChunk, (chunk) => {
    let clusterX = Math.floor(chunk.x / OldProtocol.clusterChunkAmount);
    let clusterY = Math.floor(chunk.y / OldProtocol.clusterChunkAmount);
    let key = `${clusterX},${clusterY}`;
    let clusters = rendererValues.clusters;
    let cluster = clusters[key];
    if (!cluster) {
      cluster = clusters[key] = new ChunkCluster(clusterX, clusterY);
      updateVisible();
    }
    cluster.addChunk(chunk);
    if (!cluster.toUpdate) {
      cluster.toUpdate = true;
      rendererValues.updatedClusters.push(cluster);
    }
    let size = OldProtocol.chunkSize;
    if (cluster.toUpdate || isVisible(chunk.x * size, chunk.y * size, size, size)) {
      requestRender(renderer.rendertype.WORLD | renderer.rendertype.FX);
    }
  });
  eventSys.on(EVENTS.renderer.rmChunk, (chunk) => {
    let clusterX = Math.floor(chunk.x / OldProtocol.clusterChunkAmount);
    let clusterY = Math.floor(chunk.y / OldProtocol.clusterChunkAmount);
    let key = `${clusterX},${clusterY}`;
    let clusters = rendererValues.clusters;
    let cluster = clusters[key];
    if (cluster) {
      cluster.delChunk(chunk);
      if (!cluster.removed && !cluster.toUpdate) {
        cluster.toUpdate = true;
        rendererValues.updatedClusters.push(cluster);
      }
    }
  });
  eventSys.on(EVENTS.renderer.updateChunk, (chunk) => {
    let clusterX = Math.floor(chunk.x / OldProtocol.clusterChunkAmount);
    let clusterY = Math.floor(chunk.y / OldProtocol.clusterChunkAmount);
    let key = `${clusterX},${clusterY}`;
    let cluster = rendererValues.clusters[key];
    if (cluster && !cluster.toUpdate) {
      cluster.toUpdate = true;
      rendererValues.updatedClusters.push(cluster);
    }
    let size = OldProtocol.chunkSize;
    if (isVisible(chunk.x * size, chunk.y * size, size, size)) {
      requestRender(renderer.rendertype.WORLD | renderer.rendertype.FX);
    }
  });
  eventSys.on(EVENTS.misc.worldInitialized, () => {
    requestMissingChunks();
  });
  eventSys.once(EVENTS.init, () => {
    rendererValues.animContext = elements.animCanvas.getContext("2d", { alpha: false });
    window.addEventListener("resize", onResize);
    onResize();
    camera.zoom = options.defaultZoom;
    centerCameraTo(0, 0);
    const mkPatternFromUrl = (url, cb) => {
      let patImg = new Image();
      patImg.onload = () => {
        let pat = rendererValues.animContext.createPattern(patImg, "repeat");
        pat.width = patImg.width;
        pat.height = patImg.height;
        cb(pat);
      };
      patImg.src = url;
    };
    mkPatternFromUrl(options.unloadedPatternUrl, (pat) => {
      rendererValues.unloadedPattern = pat;
    });
    if (options.backgroundUrl != null) {
      mkPatternFromUrl(options.backgroundUrl, (pat) => {
        rendererValues.worldBackground = pat;
      });
    }
    function frameLoop() {
      let type;
      if ((type = rendererValues.updateRequired) !== 0) {
        rendererValues.updateRequired = 0;
        render(type);
      }
      window.requestAnimationFrame(frameLoop);
    }
    eventSys.once(EVENTS.misc.toolsInitialized, frameLoop);
  });

  // neko client 0.5.1 - closed beta feature complete/src/js/local_player.js
  var toolSelected = null;
  var palette = [
    [228, 166, 114],
    [184, 111, 80],
    [116, 63, 57],
    [63, 40, 50],
    [158, 40, 53],
    [229, 59, 68],
    [251, 146, 43],
    [255, 231, 98],
    [99, 198, 77],
    [50, 115, 69],
    [25, 61, 63],
    [79, 103, 129],
    [175, 191, 210],
    [255, 255, 255],
    [44, 232, 244],
    [4, 132, 209]
  ];
  var paletteIndex = 0;
  var clientFx = new Fx(PLAYERFX.NONE, {
    isLocalPlayer: true,
    player: {
      get tileX() {
        return mouse.tileX;
      },
      get tileY() {
        return mouse.tileY;
      },
      get x() {
        return mouse.worldX;
      },
      get y() {
        return mouse.worldY;
      },
      get htmlRgb() {
        return player.htmlRgb;
      },
      get tool() {
        return player.tool;
      }
    }
  });
  clientFx.setVisibleFunc(() => {
    return mouse.insideViewport && mouse.validTile;
  });
  var networkRankVerification = [RANK.NONE];
  var rank = RANK.NONE;
  var somethingChanged = false;
  var cachedHtmlRgb = [null, ""];
  var player = {
    get paletteIndex() {
      return paletteIndex;
    },
    set paletteIndex(i) {
      paletteIndex = absMod(i, palette.length);
      updatePalette();
    },
    get htmlRgb() {
      let selClr = player.selectedColor;
      if (cachedHtmlRgb[0] === selClr) return cachedHtmlRgb[1];
      let str = colorUtils.toHTML(colorUtils.u24_888(selClr[0], selClr[1], selClr[2]));
      cachedHtmlRgb[0] = selClr;
      cachedHtmlRgb[1] = str;
      return str;
    },
    get selectedColor() {
      return palette[paletteIndex];
    },
    set selectedColor(c) {
      addPaletteColor(c);
    },
    get palette() {
      return palette;
    },
    set palette(p) {
      this.clearPalette();
      palette.push(...p);
      updatePalette();
    },
    get rank() {
      return rank;
    },
    get tool() {
      return toolSelected;
    },
    set tool(name) {
      selectTool(name);
    },
    /* TODO: Clear confusion between netid and tool id */
    get toolId() {
      return OldProtocol.tools.id[toolSelected.id];
    },
    get tools() {
      return tools;
    },
    get id() {
      return net.protocol.id;
    },
    clearPalette() {
      palette.length = 0;
      updatePalette();
    }
  };
  function shouldUpdate() {
    return somethingChanged ? !(somethingChanged = false) : somethingChanged;
  }
  function changedColor() {
    updateClientFx();
    updatePaletteIndex();
    somethingChanged = true;
  }
  function updatePalette() {
    let paletteColors = elements.paletteColors;
    paletteColors.innerHTML = "";
    let colorClick = (index) => () => {
      paletteIndex = index;
      changedColor();
    };
    let colorDelete = (index) => () => {
      if (palette.length > 1) {
        palette.splice(index, 1);
        if (paletteIndex > index || paletteIndex === palette.length) {
          --paletteIndex;
        }
        updatePalette();
        changedColor();
        forceHideTooltip();
      }
    };
    for (let i = 0; i < palette.length; i++) {
      let element = document.createElement("div");
      let clr = palette[i];
      element.style.backgroundColor = "rgb(" + clr[0] + "," + clr[1] + "," + clr[2] + ")";
      setTooltip(element, colorUtils.toHTML(colorUtils.u24_888(clr[0], clr[1], clr[2])));
      element.onmouseup = function(e) {
        switch (e.button) {
          case 0:
            this.sel();
            break;
          case 2:
            this.del();
            break;
        }
        return false;
      }.bind({
        sel: colorClick(i),
        del: colorDelete(i)
      });
      element.oncontextmenu = () => false;
      paletteColors.appendChild(element);
    }
    changedColor();
  }
  function updatePaletteIndex() {
    elements.paletteColors.style.transform = "translateX(" + -paletteIndex * 40 + "px)";
  }
  function addPaletteColor(color) {
    for (let i = 0; i < palette.length; i++) {
      if (palette[i][0] === color[0] && palette[i][1] === color[1] && palette[i][2] === color[2]) {
        paletteIndex = i;
        changedColor();
        return;
      }
    }
    paletteIndex = palette.length;
    palette.push(color);
    updatePalette();
  }
  function getDefaultTool() {
    for (let toolName in tools) {
      if (tools[toolName].rankRequired <= player.rank) {
        return toolName;
      }
    }
    return null;
  }
  function selectTool(name) {
    let tool = tools[name];
    if (!tool || tool === toolSelected || tool.rankRequired > player.rank) return false;
    if (toolSelected) toolSelected.call("deselect");
    toolSelected = tool;
    mouse.cancelMouseDown();
    tool.call("select");
    updateToolWindow(name);
    mouse.validClick = false;
    clientFx.setRenderer(tool.fxRenderer);
    somethingChanged = true;
    updateClientFx();
    return true;
  }
  function updateClientFx() {
    renderer.render(renderer.rendertype.FX);
  }
  eventSys.once(EVENTS.misc.toolsInitialized, () => {
    player.tool = getDefaultTool();
  });
  eventSys.on(EVENTS.net.sec.rank, (newRank) => {
    if (networkRankVerification[0] < newRank) {
      return;
    }
    rank = newRank;
    console.log("Got rank:", newRank);
    if (net.isConnected()) {
      net.protocol.ws.send(new Uint8Array([newRank]).buffer);
    }
    switch (newRank) {
      case RANK.NONE:
        showPlayerList(false);
        break;
      case RANK.USER:
      case RANK.MODERATOR:
      case RANK.ADMIN:
      case RANK.DEVELOPER:
      case RANK.OWNER:
        showPlayerList(localStorage.showPlayerList === "true" ? true : false);
        break;
    }
    updateToolbar();
  });
  eventSys.once(EVENTS.init, () => {
    elements.paletteInput.onclick = function() {
      let c = player.selectedColor;
      this.value = colorUtils.toHTML(colorUtils.u24_888(c[0], c[1], c[2]));
    };
    elements.paletteInput.onchange = function() {
      let value = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(this.value);
      addPaletteColor([parseInt(value[1], 16), parseInt(value[2], 16), parseInt(value[3], 16)]);
    };
    elements.paletteCreate.onclick = () => elements.paletteInput.click();
    setTooltip(elements.paletteCreate, "Add color");
    updatePalette();
  });

  // neko client 0.5.1 - closed beta feature complete/src/js/context.js
  var shown = false;
  var contextMenu = document.createElement("div");
  contextMenu.className = "context-menu";
  function removeMenu(event) {
    document.body.removeChild(contextMenu);
    document.removeEventListener("click", removeMenu);
    shown = false;
  }
  function createContextMenu(x, y, buttons) {
    if (shown) removeMenu();
    contextMenu.innerHTML = "";
    for (let i = 0; i < buttons.length; i++) {
      var button = document.createElement("button");
      button.textContent = buttons[i][0];
      button.addEventListener("click", buttons[i][1]);
      contextMenu.appendChild(button);
    }
    document.body.appendChild(contextMenu);
    shown = true;
    var height = contextMenu.offsetHeight;
    if (y + height > window.innerHeight - 20) contextMenu.style.top = y - height + "px";
    else contextMenu.style.top = y + "px";
    contextMenu.style.left = x + "px";
    document.addEventListener("click", removeMenu);
  }

  // neko client 0.5.1 - closed beta feature complete/src/js/packagemanager.js
  var installedPackages = {};
  var packagesInstalled = false;
  async function installPackage(packageName) {
    if (!installedPackages[packageName]) {
      if (!OWOP.packages[packageName]) return console.error("either you are missing the package " + packageName + " in your packages\nor someone forgot to remove a false dependency"), new Promise((resolve) => resolve());
      if (OWOP.packages[packageName].dependencies.length) {
        let dependents = [];
        for (let dependencyPackageName of OWOP.packages[packageName].dependencies) {
          if (!installedPackages[dependencyPackageName]) {
            dependents.push(installPackage(dependencyPackageName));
          } else {
            dependents.push(installedPackages[packageName]);
          }
        }
        return new Promise(async function(resolve, reject) {
          await Promise.all(dependents);
          console.log("waiting on " + packageName);
          installedPackages[packageName] = new Promise(function(resolve2, reject2) {
            var script = document.createElement("script");
            script.onload = resolve2;
            script.onerror = reject2;
            document.head.appendChild(script);
            script.src = "../packages/" + packageName + "/" + OWOP.packages[packageName].entry;
          }).then(() => {
            resolve();
            console.log(packageName + " installed.");
          }).catch(reject);
        });
      } else {
        console.log("waiting on " + packageName);
        let promise = new Promise((resolve, reject) => {
          var script = document.createElement("script");
          script.onload = resolve;
          script.onerror = reject;
          document.head.appendChild(script);
          script.src = "../packages/" + packageName + "/" + OWOP.packages[packageName].entry;
        }).then(() => {
          console.log(packageName + " installed.");
        });
        installedPackages[packageName] = promise;
        return promise;
      }
    }
  }
  function packagesPopulator() {
    if (packagesInstalled) return;
    var container = document.getElementById("packages-container");
    var packagesList = JSON.parse(localStorage.packages || "{}");
    for (let packageName of OWOP.packages.packages) {
      if (!OWOP.packages[packageName]) continue;
      var packageContent = document.createElement("div");
      packageContent.className = "package-box";
      var packageIcon = document.createElement("img");
      var packageText = document.createElement("div");
      var packageInstallButton = document.createElement("button");
      packageIcon.src = `../packages/${packageName}/icon.png`;
      packageIcon.onerror = function(event) {
        event.target.src = "./img/owop.png";
      };
      packageText.innerHTML = `${OWOP.packages[packageName].displayName}<br>${OWOP.packages[packageName].description}`;
      if (packagesList[packageName]) {
        packageInstallButton.textContent = "Uninstall";
        installPackage(packageName);
      } else {
        packageInstallButton.textContent = "Install";
      }
      packageInstallButton.onclick = function(event) {
        packagesList[packageName] = !packagesList[packageName];
        if (packagesList[packageName]) {
          event.target.textContent = "Uninstall";
          installPackage(packageName);
        } else {
          event.target.textContent = "Install";
        }
        localStorage.packages = JSON.stringify(packagesList);
      };
      packageContent.appendChild(packageIcon);
      packageContent.appendChild(packageText);
      packageContent.appendChild(packageInstallButton);
      container.appendChild(packageContent);
    }
    packagesInstalled = true;
  }
  new Promise(function(resolve, reject) {
    var script = document.createElement("script");
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
    script.src = "../packages/packagelist.js";
  }).then(function() {
    for (let packageName of OWOP.packages.packages) {
      new Promise(function(resolve, reject) {
        var script = document.createElement("script");
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
        script.src = "../packages/" + packageName + "/manifest.js";
      }).then(function() {
        console.log(packageName + " added to package list");
      }).catch(function(err) {
        console.log(packageName + " package not found");
      });
    }
  }).catch(function(err) {
    console.log("packagelist.js doesnt exist in /packages/packagelist.js");
  });

  // neko client 0.5.1 - closed beta feature complete/src/js/api.js
  var PublicAPI = {
    client: {
      elements: null,
      camera,
      RANK,
      EVENTS,
      options,
      Tool,
      addTool,
      updateToolbar,
      updateToolWindow,
      tools,
      toolsWindow,
      player,
      eventSys,
      cursors,
      World,
      windowSys,
      GUIWindow,
      installedPackages
    },
    utils: {
      getTime,
      cookiesEnabled,
      storageEnabled,
      absMod,
      mkHTML,
      setTooltip,
      waitFrames,
      line,
      loadScript,
      setCookie,
      getCookie,
      propertyDefaults,
      htmlToElement,
      decompress,
      KeyCode,
      KeyName,
      colorUtils,
      installPackage,
      showPlayerList,
      retryingConnect: null,
      playerList,
      playerListTable,
      playerListWindow
    },
    network: {
      protocol: OldProtocol,
      net,
      OldProtocolImpl,
      OldProtocol,
      captchaState
    },
    canvas: {
      activeFx,
      renderer,
      WORLDFX,
      PLAYERFX,
      Fx
    },
    packages: {},
    soundSys,
    chat: null,
    muted: null,
    misc,
    statusMsg: null,
    createContextMenu: null
  };
  window.OWOP = PublicAPI;

  // neko client 0.5.1 - closed beta feature complete/src/js/htmlsanitizer.js
  var HtmlSanitizer = new function() {
    const _tagWhitelist = {
      "A": true,
      "ABBR": true,
      "B": true,
      "BLOCKQUOTE": true,
      "BODY": true,
      "BR": true,
      "CENTER": true,
      "CODE": true,
      "DD": true,
      "DIV": true,
      "DL": true,
      "DT": true,
      "EM": true,
      "FONT": true,
      "H1": true,
      "H2": true,
      "H3": true,
      "H4": true,
      "H5": true,
      "H6": true,
      "HR": true,
      "I": true,
      "IMG": true,
      "LABEL": true,
      "LI": true,
      "OL": true,
      "P": true,
      "PRE": true,
      "SMALL": true,
      "SOURCE": true,
      "SPAN": true,
      "STRONG": true,
      "SUB": true,
      "SUP": true,
      "TABLE": true,
      "TBODY": true,
      "TR": true,
      "TD": true,
      "TH": true,
      "THEAD": true,
      "UL": true,
      "U": true,
      "VIDEO": true
    };
    const _contentTagWhiteList = { "FORM": true, "GOOGLE-SHEETS-HTML-ORIGIN": true };
    const _attributeWhitelist = { "align": true, "color": true, "controls": true, "height": true, "href": true, "id": true, "src": true, "style": true, "target": true, "title": true, "type": true, "width": true };
    const _cssWhitelist = { "background-color": true, "color": true, "font-size": true, "font-weight": true, "text-align": true, "text-decoration": true, "width": true };
    const _schemaWhiteList = ["http:", "https:", "data:", "m-files:", "file:", "ftp:", "mailto:", "pw:"];
    const _uriAttributes = { "href": true, "action": true };
    const _parser = new DOMParser();
    this.SanitizeHtml = function(input, extraSelector) {
      input = input.trim();
      if (input == "") return "";
      if (input == "<br>") return "";
      if (input.indexOf("<body") == -1) input = "<body>" + input + "</body>";
      let doc = _parser.parseFromString(input, "text/html");
      if (doc.body.tagName !== "BODY")
        doc.body.remove();
      if (typeof doc.createElement !== "function")
        doc.createElement.remove();
      function makeSanitizedCopy(node) {
        let newNode;
        if (node.nodeType == Node.TEXT_NODE) {
          newNode = node.cloneNode(true);
        } else if (node.nodeType == Node.ELEMENT_NODE && (_tagWhitelist[node.tagName] || _contentTagWhiteList[node.tagName] || extraSelector && node.matches(extraSelector))) {
          if (_contentTagWhiteList[node.tagName])
            newNode = doc.createElement("DIV");
          else
            newNode = doc.createElement(node.tagName);
          for (let i = 0; i < node.attributes.length; i++) {
            let attr = node.attributes[i];
            if (_attributeWhitelist[attr.name]) {
              if (attr.name == "style") {
                for (let s = 0; s < node.style.length; s++) {
                  let styleName = node.style[s];
                  if (_cssWhitelist[styleName])
                    newNode.style.setProperty(styleName, node.style.getPropertyValue(styleName));
                }
              } else {
                if (_uriAttributes[attr.name]) {
                  if (attr.value.indexOf(":") > -1 && !startsWithAny(attr.value, _schemaWhiteList))
                    continue;
                }
                newNode.setAttribute(attr.name, attr.value);
              }
            }
          }
          for (let i = 0; i < node.childNodes.length; i++) {
            let subCopy = makeSanitizedCopy(node.childNodes[i]);
            newNode.appendChild(subCopy, false);
          }
          if ((newNode.tagName == "SPAN" || newNode.tagName == "B" || newNode.tagName == "I" || newNode.tagName == "U") && newNode.innerHTML.trim() == "") {
            return doc.createDocumentFragment();
          }
        } else {
          newNode = doc.createDocumentFragment();
        }
        return newNode;
      }
      ;
      let resultElement = makeSanitizedCopy(doc.body);
      return resultElement.innerHTML.replace(/div><div/g, "div>\n<div");
    };
    function startsWithAny(str, substrings) {
      for (let i = 0; i < substrings.length; i++) {
        if (str.indexOf(substrings[i]) == 0) {
          return true;
        }
      }
      return false;
    }
    this.AllowedTags = _tagWhitelist;
    this.AllowedAttributes = _attributeWhitelist;
    this.AllowedCssStyles = _cssWhitelist;
    this.AllowedSchemas = _schemaWhiteList;
  }();

  // neko client 0.5.1 - closed beta feature complete/src/js/main.js
  var auth;
  var sdk;
  var keysDown = {};
  function receiveMessage(rawText) {
    rawText = misc.chatRecvModifier(rawText);
    if (!rawText) return;
    let addContext = (el, nick, id) => {
      el.addEventListener("click", function(event) {
        createContextMenu(event.clientX, event.clientY, [
          ["Mute " + nick, function() {
            PublicAPI.muted.push(id);
            receiveMessage({
              sender: "server",
              type: "info",
              data: {
                allowHTML: true,
                message: '<span style="color: #ffa71f">Muted ' + id + "</span>"
              }
            });
          }]
        ]);
        event.stopPropagation();
      });
    };
    let message = document.createElement("li");
    let parsedJson = JSON.parse(rawText);
    let text = parsedJson.data.message;
    let sender = parsedJson.sender;
    let type = parsedJson.type;
    let data = parsedJson.data;
    if (!data) return;
    if (data.senderID && data.nick && misc.world.players && misc.world.players[data.senderID]) {
      misc.world.players[data.senderID].nick = data.nick;
    }
    if (!!data.action) {
      switch (data.action) {
        case "invalidatePassword": {
          if (!misc.storageEnabled) break;
          let passwordType = data.passwordType;
          switch (passwordType) {
            case "adminlogin":
            case "modlogin": {
              delete misc.localStorage[passwordType];
              misc.attemptedPassword = null;
              break;
            }
            case "worldpass":
            default: {
              delete misc.worldPasswords[net.protocol.worldName];
              misc.attemptedPassword = null;
              break;
            }
          }
          saveWorldPasswords();
          net.protocol.ws.close();
          break;
        }
        case "savePassword": {
          if (!misc.storageEnabled) break;
          let passwordType = data.passwordType;
          switch (passwordType) {
            case "adminlogin":
            case "modlogin": {
              misc.localStorage[passwordType] = misc.attemptedPassword;
              misc.attemptedPassword = null;
              break;
            }
            case "worldpass":
            default: {
              misc.worldPasswords[net.protocol.worldName] = misc.attemptedPassword;
              misc.attemptedPassword = null;
              break;
            }
          }
          saveWorldPasswords();
          break;
        }
        case "updateNick": {
          if (!misc.storageEnabled) break;
          if (data.nick !== void 0 && data.nick !== null) misc.localStorage.nick = data.nick;
          else delete misc.localStorage.nick;
          break;
        }
      }
    }
    if (!text) return;
    let allowHTML = false;
    let adminMessage = false;
    if (sender === "server") {
      allowHTML = data.allowHTML || false;
      if (type === "info") message.className = "serverInfo";
      if (type === "error") message.className = "serverError";
      if (type === "raw") {
        if (data.message.startsWith("[D]")) {
          allowHTML = false;
          message.className = "discord";
          let nick = document.createElement("span");
          nick.className = "nick";
          let nickname = data.message.split(": ")[0] + ": ";
          nick.innerText = nickname;
          message.appendChild(nick);
          text = data.message.slice(nickname.length);
        } else {
          allowHTML = true;
          message.className = "serverRaw";
        }
      }
      if (type === "whisperSent") {
        if (PublicAPI.muted.includes(data.senderID)) return;
        let nick = document.createElement("span");
        nick.className = "whisper";
        nick.innerText = `-> You tell ${data.targetID}: `;
        addContext(nick, data.nick, data.senderID);
        message.appendChild(nick);
      }
    } else if (sender === "player") {
      if (type === "whisperReceived") {
        let nick = document.createElement("span");
        nick.className = "whisper";
        nick.innerText = `-> ${data.senderID} tells you: `;
        message.appendChild(nick);
      }
      if (type === "message") {
        if (PublicAPI.muted.includes(data.senderID) && data.rank < RANK.MODERATOR) return;
        if (data.rank >= RANK.ADMIN || data.allowHTML) allowHTML = true;
        if (data.rank === RANK.ADMIN) {
          message.className = "adminMessage";
          adminMessage = true;
        } else {
          if (data.rank === RANK.MODERATOR) message.className = "modMessage";
          else if (data.rank === RANK.USER) message.className = "userMessage";
          else message.className = "playerMessage";
          let nick = document.createElement("span");
          nick.className = "nick";
          message.style.display = "block";
          nick.innerText = `${data.nick}: `;
          message.appendChild(nick);
        }
      }
    }
    let msg = misc.lastMessage ? misc.lastMessage.text : "";
    if (msg.endsWith("\n")) msg = msg.slice(0, -1);
    {
      let lastCharacter = ".";
      let newlinePrivilage = 4;
      text = text.split("").reduce(function(a, b) {
        if (b === "\n" && newlinePrivilage === 0) return a + " ";
        if (b === "\n") newlinePrivilage--;
        if (lastCharacter === "\n" && b === "\n") return a;
        lastCharacter = b;
        return a + b;
      });
    }
    if (msg === `${data.nick}: ${text}` && misc.lastMessage && !misc.lastMessage.ignore) misc.lastMessage.incCount();
    else {
      if (adminMessage) text = `${data.nick}: ${text}`;
      let span = document.createElement("span");
      allowHTML = false;
      misc.lastMessage = {
        get text() {
          return `${data.nick}: ${text}`;
        },
        incCount: () => {
          let times = span.recvTimes || 1;
          if (!allowHTML) span.innerText = text;
          else span.innerHTML = HtmlSanitizer.SanitizeHtml(text);
          ;
          span.recvTimes = times;
          message.style.animation = "none";
          message.offsetHeight;
          message.style.animation = null;
        },
        ignore: type === "whisperReceived"
      };
      let textByNls = text.split("\n");
      let firstNl = textByNls.shift();
      firstNl = firstNl.replace(/(?:&lt;|<)a:(.+?):([0-9]{8,32})(?:&gt;|>)/g, '<img class="emote" src="https://cdn.discordapp.com/emojis/$2.gif?v=1">');
      firstNl = firstNl.replace(/(?:&lt;|<):(.+?):([0-9]{8,32})(?:&gt;|>)/g, '<img class="emote" src="https://cdn.discordapp.com/emojis/$2.png?v=1">');
      text = firstNl + "\n" + textByNls.join("\n");
      text = misc.chatPostFormatRecvModifier(text);
      span.innerHTML = HtmlSanitizer.SanitizeHtml(text);
      message.appendChild(span);
      scrollChatToBottom(() => {
        elements.chatMessages.appendChild(message);
        let children = elements.chatMessages.children;
        if (children.length > options.maxChatBuffer) children[0].remove();
      }, true);
    }
  }
  function scrollChatToBottom(callback, dontScrollIfNotTop = false) {
    let shouldScroll = !dontScrollIfNotTop || elements.chatMessages.scrollHeight - elements.chatMessages.scrollTop - elements.chatMessages.clientHeight <= 0.1;
    if (callback)
      callback();
    if (shouldScroll)
      elements.chatMessages.scrollTop = elements.chatMessages.scrollHeight;
  }
  function clearChat() {
    elements.chatMessages.innerHTML = "";
  }
  function tick() {
    let tickNum = ++misc.tick;
    let speed = Math.max(Math.min(options.movementSpeed, 64), 0);
    let offX = 0;
    let offY = 0;
    if (keysDown[38] || keysDown[87]) {
      offY -= speed;
    }
    if (keysDown[37] || keysDown[65]) {
      offX -= speed;
    }
    if (keysDown[40] || keysDown[83]) {
      offY += speed;
    }
    if (keysDown[39] || keysDown[68]) {
      offX += speed;
    }
    if (offX !== 0 || offY !== 0) {
      moveCameraBy(offX, offY);
      updateMouse({}, "mousemove", mouse.x, mouse.y);
    }
    eventSys.emit(EVENTS.tick, tickNum);
    if (player.tool !== null && misc.world !== null) {
      player.tool.call("tick", mouse);
    }
  }
  function updateMouse(event, eventName, mouseX, mouseY) {
    mouse.x = mouseX;
    mouse.y = mouseY;
    let cancelled = 0;
    if (misc.world !== null) {
      mouse.validTile = misc.world.validMousePos(mouse.tileX, mouse.tileY);
      if (player.tool !== null) {
        cancelled = player.tool.call(eventName, [mouse, event]);
      }
      if (updateXYDisplay(mouse.tileX, mouse.tileY)) {
        updateClientFx();
      }
    }
    return cancelled;
  }
  function openChat() {
    elements.chat.className = "active selectable";
    elements.chatMessages.className = "active";
    scrollChatToBottom();
  }
  function closeChat() {
    elements.chat.className = "";
    elements.chatMessages.className = "";
    elements.chatInput.blur();
    scrollChatToBottom();
  }
  function updateXYDisplay(x, y) {
    if (misc.lastXYDisplay[0] !== x || misc.lastXYDisplay[1] !== y) {
      misc.lastXYDisplay = [x, y];
      if (!options.hexCoords) {
        elements.xyDisplay.innerHTML = "X: " + x + ", Y: " + y;
      } else {
        let hexify = (i) => `${i < 0 ? "-" : ""}0x${Math.abs(i).toString(16)}`;
        elements.xyDisplay.innerHTML = `X: ${hexify(x)}, Y: ${hexify(y)}`;
      }
      return true;
    }
    return false;
  }
  function updatePlayerCount() {
    let text = " cursor" + (misc.playerCount !== 1 ? "s online" : " online");
    let countStr = "" + misc.playerCount;
    if (misc.world && "maxCount" in misc.world) {
      countStr += "/" + misc.world.maxCount;
    }
    let final = countStr + text;
    elements.playerCountDisplay.innerHTML = final;
    let title = "World of Pixels";
    if (misc.world) {
      title = "(" + countStr + "/" + misc.world.name + ") " + title;
    }
    document.title = title;
  }
  function logoMakeRoom(bool) {
    elements.loadUl.style.transform = bool ? "translateY(-75%) scale(0.5)" : "";
  }
  function dismissNotice() {
    misc.localStorage.dismissedId = elements.noticeDisplay.noticeId;
    elements.noticeDisplay.style.transform = "translateY(-100%)";
    elements.noticeDisplay.style.pointerEvents = "none";
    setTimeout(() => elements.noticeDisplay.style.display = "none", 750);
  }
  function showWorldUI(bool) {
    misc.guiShown = bool;
    elements.xyDisplay.style.transform = bool ? "initial" : "";
    elements.pBucketDisplay.style.transform = bool ? "initial" : "";
    elements.playerCountDisplay.style.transform = bool ? "initial" : "";
    elements.palette.style.transform = bool ? "translateY(-50%)" : "";
    elements.chat.style.transform = bool ? "initial" : "";
    elements.chatInput.disabled = !bool;
    elements.chatInput.style.display = "initial";
    elements.topRightDisplays.classList[bool ? "remove" : "add"]("hideui");
    elements.topLeftDisplays.classList[bool ? "remove" : "add"]("hideui");
    elements.helpButton.style.transform = bool ? "" : "translateY(120%) translateX(-120%)";
    elements.packagesButton.style.transform = bool ? "" : "translateY(120%) translateX(-120%)";
    //elements.paletteBg.style.transform = bool ? "" : "translateX(100%)";
    elements.noticeDisplay.style.transform = bool ? "inherit" : `translateY(-${elements.topLeftDisplays.getBoundingClientRect().height}px)`;
    elements.pBucketDisplay.innerText = `Place bucket: ${net.protocol.placeBucket.allowance.toFixed(1)} (${net.protocol.placeBucket.rate}/${net.protocol.placeBucket.time}s).`;
  }
  function showLoadScr(bool, showOptions) {
    elements.loadOptions.className = showOptions ? "framed" : "hide";
    if (!bool) {
      elements.loadScr.style.transform = "translateY(-110%)";
      eventOnce(
        elements.loadScr,
        "transitionend webkitTransitionEnd oTransitionEnd msTransitionEnd",
        () => {
          if (net.isConnected()) {
            elements.loadScr.className = "hide";
          }
        }
      );
    } else {
      elements.loadScr.className = "";
      elements.loadScr.style.transform = "";
    }
  }
  function statusMsg(showSpinner, message) {
    const statusShown = elements.status.isConnected;
    if (message === null) {
      elements.status.style.display = "none";
      return;
    } else {
      elements.status.style.display = "";
    }
    elements.statusMsg.innerText = message;
    elements.spinner.style.display = showSpinner ? "" : "none";
  }
  function inGameDisconnected() {
    showWorldUI(false);
    showLoadScr(true, true);
    statusMsg(false, "Lost connection with the server.");
    misc.world = null;
    elements.chat.style.transform = "initial";
    elements.chatInput.style.display = "";
  }
  function retryingConnect(server, worldName, token) {
    if (misc.connecting && !net.isConnected()) {
      return;
    }
    misc.connecting = true;
    const tryConnect = (tryN) => {
      if (tryN >= (server.maxRetries || 3)) {
        let ncs = serverGetter(true);
        if (ncs != server) {
          server = ncs;
          tryN = 0;
        }
      }
      eventSys.once(EVENTS.net.connecting, () => {
        console.debug(`Trying '${server.title}'...`);
        statusMsg(true, `Connecting to '${server.title}'...`);
        showLoadScr(true, false);
      });
      net.connect(server, worldName, token);
      const disconnected = () => {
        ++tryN;
        statusMsg(true, `Couldn't connect to server${tryN >= 5 ? ". Your IP may have been flagged as a proxy (or banned). Proxies are disallowed on OWOP due to bot abuse, sorry. R" : ", r"}etrying... (${tryN})`);
        setTimeout(tryConnect, Math.min(tryN * 2e3, 1e4), tryN);
        eventSys.removeListener(EVENTS.net.connected, connected);
      };
      const connected = () => {
        statusMsg(false, "Connected!");
        eventSys.removeListener(EVENTS.net.disconnected, disconnected);
        eventSys.once(EVENTS.net.disconnected, inGameDisconnected);
        misc.connecting = false;
      };
      eventSys.once(EVENTS.net.connected, connected);
      eventSys.once(EVENTS.net.disconnected, disconnected);
    };
    tryConnect(0);
  }
  function saveWorldPasswords() {
    if (misc.storageEnabled) misc.localStorage.worldPasswords = JSON.stringify(misc.worldPasswords);
  }
  function checkFunctionality(callback) {
    window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || function(f) {
      setTimeout(f, 1e3 / options.fallbackFps);
    };
    Number.isInteger = Number.isInteger || ((n) => Math.floor(n) === n && Math.abs(n) !== Infinity);
    Math.trunc = Math.trunc || ((n) => n | 0);
    callback();
  }
  function toggleMuteSounds() {
    options.enableSounds = !elements.soundToggle.checked;
    eventSys.emit(EVENTS.net.chat, options.enableSounds ? "Sounds enabled" : "Sounds disabled");
  }
  var activeKeybindListener = null;
  var currentKeybindName = null;
  function getNewBind(tname, self) {
    const hc = document.getElementById("help-close");
    const kbd = document.getElementById("keybind-settings");
    const endBind = () => {
      document.removeEventListener("keydown", listener);
      hc.removeEventListener("click", endBind);
      kbd.removeEventListener("click", oncancel);
      activeKeybindListener = null;
      currentKeybindName = null;
      self.innerText = "rebind";
    };
    if (activeKeybindListener) endBind();
    currentKeybindName = tname;
    const oncancel = (e) => {
      if (e.target !== self && e.target.tagName === "BUTTON") endBind();
    };
    const listener = (event) => {
      event.stopPropagation();
      let code = event.which || event.keyCode;
      if (code == KeyCode.ESCAPE) return endBind();
      if ([
        KeyCode.SHIFT,
        KeyCode.BACKTICK,
        KeyCode.TILDE,
        KeyCode.G,
        KeyCode.H,
        KeyCode.F1,
        KeyCode.F2,
        KeyCode.PLUS,
        KeyCode.NUMPAD_ADD,
        KeyCode.SUBTRACT,
        KeyCode.NUMPAD_SUBTRACT,
        KeyCode.EQUALS,
        KeyCode.UNDERSCORE
      ].includes(code)) {
        const textElements = document.querySelectorAll('[class^="kb-"]');
        for (const el of textElements) {
          if (el.classList[0].includes(KeyName[code])) {
            el.style.color = "#f00";
            setTimeout(() => {
              el.style.transition = "color 0.3s ease-in-out";
              el.style.color = "";
              setTimeout(() => {
                el.style.transition = "";
              }, 300);
            }, 100);
            break;
          }
        }
        return endBind();
      }
      if (code == KeyCode.DELETE) {
        delete misc.keybinds[tname];
        console.log("deleted keybind");
      } else {
        misc.keybinds[tname] = code;
        console.log(`added keybind for ${tname}: ${KeyName[code]} (${code})`);
      }
      endBind();
      updateBindDisplay();
      saveKeybinds();
    };
    activeKeybindListener = listener;
    document.addEventListener("keydown", listener);
    hc.addEventListener("click", endBind);
    kbd.addEventListener("click", oncancel);
    self.innerText = "Listening for input... Press ESC or click again to cancel.";
  }
  function saveKeybinds() {
    if (misc.storageEnabled) misc.localStorage.keybinds = JSON.stringify(misc.keybinds);
  }
  function loadDefaultBindings(name) {
    switch (name) {
      case "new":
        misc.keybinds = {
          //probably sane defaults
          "cursor": KeyCode.B,
          "move": KeyCode.V,
          "pipette": KeyCode.Q,
          "eraser": KeyCode.S,
          "zoom": KeyCode.A,
          "export": KeyCode.E,
          "fill": KeyCode.F,
          "line": KeyCode.W,
          "protect": KeyCode.D,
          "area protect": KeyCode.R,
          "paste": KeyCode.X,
          "copy": KeyCode.C
        };
        updateBindDisplay();
        saveKeybinds();
        break;
      case "og":
      default:
        misc.keybinds = {
          //probably sane defaults
          "cursor": KeyCode.O,
          "move": KeyCode.M,
          "pipette": KeyCode.P,
          "eraser": KeyCode.C,
          "zoom": KeyCode.Z,
          "export": KeyCode.E,
          "fill": KeyCode.F,
          "line": KeyCode.L,
          "protect": KeyCode.P,
          "area protect": KeyCode.A,
          "paste": KeyCode.W,
          "copy": KeyCode.Q
        };
        updateBindDisplay();
        saveKeybinds();
        break;
    }
  }
  function init() {
    console.log(
      "%c _ _ _         _   _    _____ ___    _____ _         _     \n| | | |___ ___| |_| |  |     |  _|  |  _  |_|_ _ ___| |___ \n| | | | . |  _| | . |  |  |  |  _|  |   __| |_'_| -_| |_ -|\n|_____|___|_| |_|___|  |_____|_|    |__|  |_|_,_|___|_|___|",
      "font-size: 10px; font-weight: bold;"
    );
    console.log("%cWelcome to the developer console!", "font-size: 20px; font-weight: bold; color: #F0F;");
    let viewport = elements.viewport;
    let chatInput = elements.chatInput;
    initializeTooltips();
    if (misc.storageEnabled) {
      if (misc.localStorage.worldPasswords) {
        try {
          misc.worldPasswords = JSON.parse(misc.localStorage.worldPasswords);
        } catch (e) {
        }
      }
      if (misc.localStorage.keybinds) {
        try {
          misc.keybinds = JSON.parse(misc.localStorage.keybinds);
        } catch (e) {
        }
        ;
      } else {
        loadDefaultBindings("og");
        console.log("No keybinds found, using original defaults");
      }
      if (misc.localStorage.palettes) {
        try {
          misc.palettes = JSON.parse(misc.localStorage.palettes);
        } catch (e) {
        }
        ;
      }
    }
    updateBindDisplay();
    misc.lastCleanup = 0;
    viewport.oncontextmenu = () => false;
    viewport.addEventListener("mouseenter", () => {
      mouse.insideViewport = true;
      updateClientFx();
    });
    viewport.addEventListener("mouseleave", () => {
      mouse.insideViewport = false;
      updateClientFx();
    });
    let chatHistory = [];
    let historyIndex = 0;
    chatInput.addEventListener("keydown", (event) => {
      event.stopPropagation();
      let keyCode = event.which || event.keyCode;
      if (historyIndex === 0 || keyCode == 13 && !event.shiftKey) {
        chatHistory[0] = chatInput.value;
      }
      switch (keyCode) {
        case KeyCode.ESCAPE:
          closeChat();
          break;
        case KeyCode.ENTER:
          if (!event.shiftKey) {
            event.preventDefault();
            let text = chatInput.value;
            if (text.startsWith("/")) {
              var [commandName, ...args] = text.slice(1).trim().split(/\s+/);
              if (OWOP.chat.commandList[commandName]) OWOP.chat.commandList[commandName].callback(...args);
            }
            historyIndex = 0;
            chatHistory.unshift(text);
            if (misc.storageEnabled) {
              if (text.startsWith("/adminlogin ") || text.startsWith("/modlogin ") || text.startsWith("/pass "))
                misc.attemptedPassword = text.split(" ").slice(1).join(" ");
            }
            text = misc.chatSendModifier(text);
            net.protocol.sendMessage(text);
            chatInput.value = "";
            chatInput.style.height = "16px";
            event.stopPropagation();
          }
          break;
        case KeyCode.ARROW_UP:
          if (event.shiftKey && historyIndex < chatHistory.length - 1) {
            historyIndex++;
            chatInput.value = chatHistory[historyIndex];
            chatInput.style.height = 0;
            chatInput.style.height = Math.min(chatInput.scrollHeight - 8, 16 * 4) + "px";
          }
          break;
        case KeyCode.ARROW_DOWN:
          if (event.shiftKey && historyIndex > 0) {
            historyIndex--;
            chatInput.value = chatHistory[historyIndex];
            chatInput.style.height = 0;
            chatInput.style.height = Math.min(chatInput.scrollHeight - 8, 16 * 4) + "px";
          }
          break;
      }
    });
    chatInput.addEventListener("keyup", (event) => {
      event.stopPropagation();
      let keyCode = event.which || event.keyCode;
      if (keyCode == 13 && !event.shiftKey) {
        closeChat();
      }
    });
    chatInput.addEventListener("input", (event) => {
      chatInput.style.height = 0;
      chatInput.style.height = Math.min(chatInput.scrollHeight - 8, 16 * 4) + "px";
    });
    chatInput.addEventListener("focus", (event) => {
      if (!mouse.buttons) {
        openChat();
      } else {
        chatInput.blur();
      }
    });
    window.addEventListener("keydown", (event) => {
      let keyCode = event.which || event.keyCode;
      if (document.activeElement.tagName !== "INPUT" && misc.world !== null) {
        keysDown[keyCode] = true;
        let tool = player.tool;
        if (tool !== null && misc.world !== null && tool.isEventDefined("keydown")) {
          if (tool.call("keydown", [keysDown, event])) {
            return false;
          }
        }
        for (let tname in misc.keybinds) {
          if (misc.keybinds[tname] == event.keyCode) {
            player.tool = tname;
          }
        }
        ;
        switch (keyCode) {
          /*case KeyCode.Q:
          					player.tool = "pipette";
          					break;
          
          				case KeyCode.D:
          					player.tool = "cursor";
          					break;
          
          				case KeyCode.X:
          				case KeyCode.SHIFT:
          					player.tool = "move";
          					break;
          
          				case KeyCode.F:
          					player.tool = "fill";
          					break;
          
          				case KeyCode.W:
          					player.tool = "line";
          					break;
          
          				case KeyCode.E:
          					player.tool = "export";
          					break;
          
          				case KeyCode.A:
          					player.tool = "eraser";
          					break;
          
          				case KeyCode.ONE:
          					player.tool = "paste";
          					break;
          
          				case KeyCode.TWO:
          					player.tool = "copy";
          					break;
          
          				case KeyCode.THREE:
          					player.tool = "protect";
          					break;
          
          				case KeyCode.R:
          					player.tool = "area protect";
          					break;*/
          case KeyCode.SHIFT:
            player.tool = "move";
            break;
          //added back here because of the weird little temp move thing
          case KeyCode.Z:
            if (!misc.world || !event.ctrlKey) break;
            misc.world.undo(event.shiftKey);
            event.preventDefault();
            break;
          case KeyCode.BACKTICK:
          case KeyCode.TILDE:
            let parseClr = (clr) => {
              let tmp = clr.split(",");
              let nrgb = null;
              if (tmp.length == 3) {
                nrgb = tmp;
                for (let i = 0; i < tmp.length; i++) {
                  tmp[i] = +tmp[i];
                  if (!(tmp[i] >= 0 && tmp[i] < 256)) {
                    return null;
                  }
                }
              } else if (clr[0] == "#" && clr.length == 7) {
                let colr = parseInt(clr.replace("#", "0x"));
                nrgb = [colr >> 16 & 255, colr >> 8 & 255, colr & 255];
              }
              return nrgb;
            };
            let input = prompt("Custom color\nType three values separated by a comma: r,g,b\n(...or the hex string: #RRGGBB)\nYou can add multiple colors at a time separating them with a space.");
            if (!input) {
              break;
            }
            input = input.split(" ");
            for (let j = 0; j < input.length; j++) {
              let rgb = parseClr(input[j]);
              if (rgb) {
                player.selectedColor = rgb;
              }
            }
            break;
          case KeyCode.G:
            renderer.showGrid(!renderer.gridShown);
            break;
          case KeyCode.H:
            options.showProtectionOutlines = !options.showProtectionOutlines;
            renderer.render(renderer.rendertype.FX);
            break;
          /*case KeyCode.M:
          	elements.soundToggle.checked = !elements.soundToggle.checked;
          	toggleMuteSounds();
          	break;
          */
          case KeyCode.F1:
            showWorldUI(!misc.guiShown);
            event.preventDefault();
            break;
          case KeyCode.F2:
            options.showPlayers = !options.showPlayers;
            renderer.render(renderer.rendertype.FX);
            break;
          case KeyCode.PLUS:
          case KeyCode.NUMPAD_ADD:
            ++camera.zoom;
            break;
          case KeyCode.MINUS:
          case KeyCode.NUMPAD_SUBTRACT:
            --camera.zoom;
            break;
          default:
            return true;
            break;
        }
        return false;
      }
    });
    window.addEventListener("keyup", (event) => {
      let keyCode = event.which || event.keyCode;
      delete keysDown[keyCode];
      if (document.activeElement.tagName !== "INPUT") {
        let tool = player.tool;
        if (tool !== null && misc.world !== null && tool.isEventDefined("keyup")) {
          if (tool.call("keyup", [keysDown, event])) {
            return false;
          }
        }
        if (keyCode == KeyCode.ENTER) {
          elements.chatInput.focus();
        } else if (keyCode == KeyCode.SHIFT) {
          player.tool = "cursor";
        }
      }
    });
    viewport.addEventListener("mousedown", (event) => {
      closeChat();
      mouse.lastX = mouse.x;
      mouse.lastY = mouse.y;
      mouse.x = event.pageX;
      mouse.y = event.pageY;
      mouse.mouseDownWorldX = mouse.worldX;
      mouse.mouseDownWorldY = mouse.worldY;
      if ("buttons" in event) {
        mouse.buttons = event.buttons;
      } else {
        let realBtn = event.button;
        if (realBtn === 2) {
          realBtn = 1;
        } else if (realBtn === 1) {
          realBtn = 2;
        }
        mouse.buttons |= 1 << realBtn;
      }
      let tool = player.tool;
      if (tool !== null && misc.world !== null) {
        player.tool.call("mousedown", [mouse, event]);
      }
    });
    window.addEventListener("mouseup", (event) => {
      if ("buttons" in event && !misc.usingFirefox) {
        mouse.buttons = event.buttons;
      } else {
        let realBtn = event.button;
        if (realBtn === 2) {
          realBtn = 1;
        } else if (realBtn === 1) {
          realBtn = 2;
        }
        mouse.buttons &= ~(1 << realBtn);
      }
      let tool = player.tool;
      if (tool !== null && misc.world !== null) {
        player.tool.call("mouseup", [mouse, event]);
      }
    });
    window.addEventListener("mousemove", (event) => {
      let cancelledButtons = updateMouse(event, "mousemove", event.pageX, event.pageY);
      let remainingButtons = mouse.buttons & ~cancelledButtons;
      if (remainingButtons & 4) {
        moveCameraBy((mouse.mouseDownWorldX - mouse.worldX) / 16, (mouse.mouseDownWorldY - mouse.worldY) / 16);
      }
    });
    function zoom(type) {
      let lzoom = camera.zoom;
      let nzoom = camera.zoom;
      let offX = 0;
      let offY = 0;
      let w = window.innerWidth;
      let h = window.innerHeight;
      if (type === 1) {
        nzoom *= 1 + options.zoomStrength;
        offX = (mouse.x - w / 2) / nzoom;
        offY = (mouse.y - h / 2) / nzoom;
      } else if (type === -1) {
        nzoom /= 1 + options.zoomStrength;
        offX = (mouse.x - w / 2) * (3 / lzoom - 2 / nzoom);
        offY = (mouse.y - h / 2) * (3 / lzoom - 2 / nzoom);
      } else if (type === 3) {
      }
      nzoom = Math.round(nzoom);
      camera.zoom = nzoom;
      if (camera.zoom !== lzoom) moveCameraBy(offX, offY);
    }
    var wheelEventName = "onwheel" in document ? "wheel" : "onmousewheel" in document ? "mousewheel" : "DOMMouseScroll";
    viewport.addEventListener(wheelEventName, function mousewheel(event) {
      if (misc.world !== null && player.tool.events["scroll"]) return player.tool.call("scroll", [mouse, event]);
      zoom(Math.sign(-event.deltaY));
    }, { passive: true });
    viewport.addEventListener(wheelEventName, function(e) {
      e.preventDefault();
      return false;
    }, { passive: false });
    const touchEventNoUpdate = (evtName) => (event) => {
      let tool = player.tool;
      mouse.buttons = 0;
      if (tool !== null && misc.world !== null) {
        player.tool.call(evtName, [mouse, event]);
      }
    };
    viewport.addEventListener("touchstart", (event) => {
      let moved = event.changedTouches[0];
      mouse.buttons = 1;
      if (moved) {
        updateMouse(event, "touchstart", moved.pageX, moved.pageY);
        mouse.mouseDownWorldX = mouse.worldX;
        mouse.mouseDownWorldY = mouse.worldY;
      }
    }, { passive: true });
    viewport.addEventListener("touchmove", (event) => {
      let moved = event.changedTouches[0];
      if (moved) {
        updateMouse(event, "touchmove", moved.pageX, moved.pageY);
      }
    }, { passive: true });
    viewport.addEventListener("touchend", touchEventNoUpdate("touchend"), { passive: true });
    viewport.addEventListener("touchcancel", touchEventNoUpdate("touchcancel"), { passive: true });
    elements.soundToggle.addEventListener("change", toggleMuteSounds);
    options.enableSounds = !elements.soundToggle.checked;
    elements.experimentalGridToggle.addEventListener("change", function() {
      options.experimentalGrid = !!elements.experimentalGridToggle.checked;
    });
    elements.hexToggle.addEventListener("change", (e) => options.hexCoords = elements.hexToggle.checked);
    options.hexCoords = elements.hexToggle.checked;
    eventSys.emit(EVENTS.init);
    updateXYDisplay(0, 0);
  }
  function connect2(url, world) {
    const server = { title: "OWOP", url };
    retryingConnect(server, world);
    elements.reconnectBtn.onclick = () => retryingConnect(server, world);
    misc.tickInterval = setInterval(tick, 1e3 / options.tickSpeed);
  }
  eventSys.once(EVENTS.loaded, () => statusMsg(true, "Initializing..."));
  eventSys.once(EVENTS.misc.loadingCaptcha, () => statusMsg(true, "Trying to load captcha..."));
  eventSys.once(EVENTS.misc.logoMakeRoom, () => {
    statusMsg(false, null);
    logoMakeRoom();
  });
  function serverSelector() {
    logoMakeRoom(true);
    document.getElementById("server-selector").classList.remove("hidden");
    serverSelectorPopulator();
  }
  function serverSelectorPopulator() {
    var owopServersContainer = document.getElementById("ss-owop-servers");
    owopServersContainer.innerHTML = "";
    var lanServersContainer = document.getElementById("ss-lan-servers");
    lanServersContainer.innerHTML = "";
    var serverSelectorList = JSON.parse(localStorage.serverSelector);
    for (let serverName in serverSelectorList.owop) {
      var wsURL = serverSelectorList.owop[serverName];
      var serverListing = document.createElement("div");
      var nameElement = document.createElement("div");
      nameElement.innerHTML = serverName;
      var joinButton = document.createElement("button");
      joinButton.innerHTML = "Join";
      joinButton.addEventListener("click", function() {
        document.getElementById("server-selector").classList.add("hidden");
        connect2(wsURL, serverName);
      });
      var deleteButton = document.createElement("button");
      deleteButton.innerHTML = "Delete";
      deleteButton.addEventListener("click", function() {
        delete serverSelectorList.owop[serverName];
        localStorage.serverSelector = JSON.stringify(serverSelectorList);
        serverSelectorPopulator();
      });
      var stylizingDiv = document.createElement("div");
      serverListing.appendChild(nameElement);
      stylizingDiv.appendChild(deleteButton);
      stylizingDiv.appendChild(joinButton);
      serverListing.appendChild(stylizingDiv);
      owopServersContainer.appendChild(serverListing);
    }
  }
  eventSys.once(EVENTS.loaded, function() {
    init();
    if (misc.showEUCookieNag && false) {
      windowSys.addWindow(new UtilDialog("Cookie notice", `This box alerts you that we're going to use cookies! If you don't accept their usage, disable cookies and reload the page.`, false, () => {
        setCookie("nagAccepted", "true");
        misc.showEUCookieNag = false;
        serverSelector();
      }));
    } else {
      serverSelector();
    }
  });
  eventSys.on(EVENTS.net.maxCount, (count) => {
    misc.world.maxCount = count;
    updatePlayerCount();
  });
  eventSys.on(EVENTS.net.playerCount, (count) => {
    misc.playerCount = count;
    updatePlayerCount();
  });
  eventSys.on(EVENTS.net.donUntil, (ts, pmult) => {
    const updTimer = () => {
      const now = Date.now();
      const secs = Math.floor(Math.max(0, ts - now) / 1e3);
      const mins = Math.floor(secs / 60);
      const hours = Math.floor(mins / 60);
      let tmer = (hours > 0 ? hours + ":" : "") + (mins % 60 < 10 ? "0" : "") + mins % 60 + ":" + (secs % 60 < 10 ? "0" : "") + secs % 60;
      elements.dInfoDisplay.setAttribute("data-tmo", tmer);
    };
    clearInterval(misc.donTimer);
    elements.dInfoDisplay.setAttribute("data-pm", "" + pmult);
    elements.dInfoDisplay.setAttribute("data-ts", "" + ts);
    updTimer();
    if (ts > Date.now()) {
      misc.donTimer = setInterval(updTimer, 1e3);
    }
  });
  eventSys.on(EVENTS.net.chat, receiveMessage);
  eventSys.on(EVENTS.net.world.setId, (id) => {
    if (!misc.storageEnabled) return;
    function autoNick() {
      if (auth) net.protocol.sendMessage(`/nick ${auth.user.global_name ? auth.user.global_name : auth.user.username}`);
      else if (misc.localStorage.nick) net.protocol.sendMessage("/nick " + misc.localStorage.nick);
    }
    let desiredRank = misc.localStorage.adminlogin ? RANK.ADMIN : misc.localStorage.modlogin ? RANK.MODERATOR : net.protocol.worldName in misc.worldPasswords ? RANK.USER : RANK.NONE;
    if (desiredRank > RANK.NONE) {
      let mightBeMod = false;
      let onCorrect = function(newrank) {
        if (newrank == desiredRank || mightBeMod && newrank == RANK.MODERATOR) {
          eventSys.removeListener(EVENTS.net.sec.rank, onCorrect);
          autoNick();
        }
      };
      eventSys.on(EVENTS.net.sec.rank, onCorrect);
      let msg;
      if (desiredRank == RANK.ADMIN) {
        misc.attemptedPassword = misc.localStorage.adminlogin;
        msg = "/adminlogin " + misc.attemptedPassword;
      } else if (desiredRank == RANK.MODERATOR) {
        misc.attemptedPassword = misc.localStorage.modlogin;
        msg = "/modlogin " + misc.localStorage.modlogin;
      } else if (desiredRank == RANK.USER) {
        misc.attemptedPassword = misc.worldPasswords[net.protocol.worldName];
        msg = "/pass " + misc.worldPasswords[net.protocol.worldName];
        mightBeMod = true;
      }
      net.protocol.sendMessage(msg);
    } else {
      autoNick();
    }
  });
  eventSys.on(EVENTS.misc.windowAdded, (window2) => {
    if (misc.world === null) {
      statusMsg(false, null);
      logoMakeRoom(true);
    }
  });
  eventSys.on(EVENTS.net.world.joining, (name) => {
    logoMakeRoom(false);
    console.log(`Joining world: ${name}`);
  });
  eventSys.on(EVENTS.net.world.join, (world) => {
    showLoadScr(false, false);
    showWorldUI(!options.noUi);
    renderer.showGrid(!options.noUi);
    soundSys.launch();
    packagesPopulator();
    misc.world = new World(world);
    eventSys.emit(EVENTS.misc.worldInitialized);
  });
  eventSys.on(EVENTS.camera.moved, (camera2) => {
    let time2 = getTime();
    if (misc.world !== null && time2 - misc.lastCleanup > 1e3) {
      misc.lastCleanup = time2;
      renderer.unloadFarClusters();
    }
    if (updateXYDisplay(mouse.tileX, mouse.tileY)) {
      updateClientFx();
    }
  });
  eventSys.on(EVENTS.camera.zoom, (camera2) => {
    if (updateXYDisplay(mouse.tileX, mouse.tileY)) {
      updateClientFx();
    }
  });
  window.addEventListener("load", () => {
    elements.loadScr = document.getElementById("load-scr");
    elements.loadUl = document.getElementById("load-ul");
    elements.loadOptions = document.getElementById("load-options");
    elements.reconnectBtn = document.getElementById("reconnect-btn");
    elements.spinner = document.getElementById("spinner");
    elements.statusMsg = document.getElementById("status-msg");
    elements.status = document.getElementById("status");
    elements.logo = document.getElementById("logo");
    elements.noticeDisplay = document.getElementById("notice-display");
    elements.noticeDisplay.noticeId = elements.noticeDisplay.getAttribute("notice-id") || 1;
    if (misc.localStorage.dismissedId != elements.noticeDisplay.noticeId) elements.noticeDisplay.addEventListener("click", dismissNotice);
    else elements.noticeDisplay.style.display = "none";
    elements.xyDisplay = document.getElementById("xy-display");
    elements.pBucketDisplay = document.getElementById("pbucket-display");
    elements.chat = document.getElementById("chat");
    elements.chatMessages = document.getElementById("chat-messages");
    elements.playerCountDisplay = document.getElementById("playercount-display");
    elements.topLeftDisplays = document.getElementById("topleft-displays");
    elements.topRightDisplays = document.getElementById("topright-displays");
    elements.dInfoDisplay = document.getElementById("dinfo-display");
    elements.palette = document.getElementById("palette");
    elements.paletteColors = document.getElementById("palette-colors");
    elements.paletteCreate = document.getElementById("palette-create");
    elements.pickerAnchor = document.getElementById("picker-anchor");
    elements.paletteLoad = document.getElementById("palette-load");
    elements.paletteSave = document.getElementById("palette-save");
    elements.paletteOpts = document.getElementById("palette-opts");
    elements.paletteInput = document.getElementById("palette-input");
    elements.paletteBg = document.getElementById("palette-bg");
    elements.animCanvas = document.getElementById("animations");
    elements.viewport = document.getElementById("viewport");
    elements.windows = document.getElementById("windows");
    elements.chatInput = document.getElementById("chat-input");
    elements.keybindSelection = document.getElementById("keybinddiv");
    elements.soundToggle = document.getElementById("no-sound");
    elements.hexToggle = document.getElementById("hex-coords");
    elements.experimentalGridToggle = document.getElementById("experimental-grid");
    elements.serverSelector = document.getElementById("server-selector");
    document.getElementById("kb-og").addEventListener("click", () => loadDefaultBindings("og"));
    document.getElementById("kb-new").addEventListener("click", () => loadDefaultBindings("new"));
    elements.helpButton = document.getElementById("help-button");
    elements.helpButton.addEventListener("click", function() {
      var classname = document.getElementById("help").className;
      document.getElementById("help").className = classname === "" ? "hidden" : "";
    });
    document.getElementById("help-close").addEventListener("click", function() {
      document.getElementById("help").className = "hidden";
    });
    elements.packagesButton = document.getElementById("packages-button");
    elements.packages = document.getElementById("packages");
    elements.packagesButton.addEventListener("click", function() {
      var classname = document.getElementById("packages").className;
      document.getElementById("packages").className = classname === "" ? "hidden" : "";
    });
    document.getElementById("packages-close").addEventListener("click", function() {
      document.getElementById("packages").className = "hidden";
    });
    if (!localStorage.serverSelector) localStorage.serverSelector = JSON.stringify({ owop: {}, lan: {} });
    (function() {
      var worldNameTextInput = document.getElementById("ss-owop-input");
      var owopJoinButton = document.getElementById("ss-owop-input-join");
      owopJoinButton.addEventListener("click", function() {
        let worldName = worldNameTextInput.value;
        if (worldName[0] === "/") worldName = worldName.slice(1);
        elements.serverSelector.classList.add("hidden");
        connect2(`wss://ourworldofpixels.com/?chat=v2`, worldName);
      });
      var owopAddButton = document.getElementById("ss-owop-input-add");
      owopAddButton.addEventListener("click", function() {
        var serverSelectorList = JSON.parse(localStorage.serverSelector);
        let worldName = worldNameTextInput.value;
        if (worldName[0] === "/") worldName = worldName.slice(1);
        if (worldName === "") worldName = "main";
        if (serverSelectorList.owop[worldName]) return;
        serverSelectorList.owop[worldName] = `wss://ourworldofpixels.com/?chat=v2`;
        localStorage.serverSelector = JSON.stringify(serverSelectorList);
        serverSelectorPopulator();
      });
    })();
    elements.paletteSave.addEventListener("click", () => {
      windowSys.addWindow(new GUIWindow("save palette", { centerOnce: true, closeable: true }, function(t) {
        var top = document.createElement("div");
        var btm = document.createElement("div");
        var label = document.createElement("text");
        var input = document.createElement("input");
        var savebtn = document.createElement("button");
        label.innerHTML = "palette name";
        label.className = "whitetext";
        input.type = "text";
        savebtn.innerHTML = "save";
        function submit() {
          if (!input.value || input.value.length < 1) return;
          if (!!misc.palettes[input.value]) {
            windowSys.addWindow(new GUIWindow("overwrite palette", { centered: true, closeable: false }, function(w2) {
              var warning = document.createElement("div");
              var yes = document.createElement("button");
              var no = document.createElement("button");
              var btm2 = document.createElement("div");
              w2.container.classList.add("whitetext");
              warning.innerText = "This palette already exists. Overwrite?";
              yes.addEventListener("click", () => {
                misc.palettes[input.value] = player.palette.map((c) => [...c]);
                savePalettes();
                w2.close();
                t.close();
                const p = windowSys.getWindow("load palette");
                if (p) {
                  if (p.regen) p.regen();
                }
              });
              no.addEventListener("click", w2.close);
              yes.innerText = "Yes";
              no.innerText = "No";
              btm2.style.display = "flex";
              btm2.style.flexDirection = "row";
              btm2.style.alignItems = "center";
              btm2.style.justifyContent = "center";
              btm2.appendChild(yes);
              btm2.appendChild(no);
              w2.container.appendChild(warning);
              w2.container.appendChild(btm2);
            }));
            return;
          }
          misc.palettes[input.value] = player.palette.map((c) => [...c]);
          savePalettes();
          var w = windowSys.getWindow("load palette");
          if (w && w.regen) w.regen();
          t.close();
        }
        savebtn.addEventListener("click", submit);
        input.addEventListener("keydown", (e) => {
          e.stopPropagation();
          let code = e.which || e.keyCode;
          if (code == KeyCode.ENTER) submit();
        });
        top.appendChild(label);
        btm.appendChild(input);
        btm.appendChild(savebtn);
        t.container.appendChild(top);
        t.container.appendChild(btm);
      }));
    });
    elements.paletteLoad.addEventListener("click", function() {
      var selectedPalette = null;
      windowSys.addWindow(new GUIWindow("load palette", { centerOnce: true, closeable: true }, function(t) {
        var top = document.createElement("div");
        var paletteContainer = document.createElement("div");
        var btm = document.createElement("div");
        var selectionContainer = document.createElement("div");
        var preview = document.createElement("div");
        var label = document.createElement("text");
        var btnContainer = document.createElement("div");
        var loadbtn = document.createElement("button");
        var deletebtn = document.createElement("button");
        var clearbtn = document.createElement("button");
        var resetbtn = document.createElement("button");
        var pcanvas = document.createElement("canvas");
        var ctx = pcanvas.getContext("2d");
        t.container.appendChild(top);
        t.container.appendChild(btm);
        t.container.classList.add("whitetext");
        t.container.classList.add("palette-load");
        top.appendChild(paletteContainer);
        paletteContainer.classList.add("palette-load-palette-container");
        top.classList.add("palette-load-top");
        btm.appendChild(selectionContainer);
        btm.classList.add("palette-load-bottom");
        btm.appendChild(btnContainer);
        selectionContainer.appendChild(label);
        selectionContainer.appendChild(preview);
        preview.appendChild(pcanvas);
        selectionContainer.classList.add("palette-load-selection-container");
        btnContainer.appendChild(loadbtn);
        btnContainer.appendChild(deletebtn);
        btnContainer.appendChild(clearbtn);
        btnContainer.appendChild(resetbtn);
        btnContainer.classList.add("palette-load-button-contianer");
        loadbtn.innerText = "load";
        deletebtn.innerText = "delete";
        clearbtn.innerText = "clear";
        resetbtn.innerText = "reset";
        function createRow() {
          var row = document.createElement("div");
          row.classList.add("palette-button-row");
          return row;
        }
        function genRows() {
          var measure = document.createElement("div");
          var currentRow = createRow();
          var rw = 0;
          var mw = 400;
          paletteContainer.innerHTML = "";
          paletteContainer.appendChild(currentRow);
          measure.style.visibility = "hidden";
          measure.style.position = "absolute";
          measure.style.left = "-999999999px";
          document.body.appendChild(measure);
          for (let paletteName of Object.keys(misc.palettes)) {
            var palette2 = document.createElement("button");
            var bw = palette2.offsetWidth + 4;
            palette2.innerText = paletteName;
            measure.appendChild(palette2);
            measure.removeChild(palette2);
            if (rw + bw > mw) {
              currentRow = createRow();
              paletteContainer.appendChild(currentRow);
              rw = 0;
            }
            currentRow.appendChild(palette2);
            rw += bw;
            palette2.addEventListener("click", function() {
              selectedPalette = paletteName;
              updateSelection();
            });
          }
          measure.remove();
          windowSys.centerWindow(t);
        }
        loadbtn.addEventListener("click", function() {
          if (!selectedPalette) return;
          player.clearPalette();
          player.palette = misc.palettes[selectedPalette];
          player.paletteIndex = 0;
          t.close();
        });
        deletebtn.addEventListener("click", function() {
          if (!selectedPalette) return;
          windowSys.addWindow(new GUIWindow("delete palette", { centered: true, closeable: false }, function(w) {
            var warning = document.createElement("div");
            var yes = document.createElement("button");
            var no = document.createElement("button");
            var btm2 = document.createElement("div");
            w.container.classList.add("whitetext");
            w.container.style.textAlign = "center";
            warning.innerText = "Are you sure?";
            yes.addEventListener("click", function() {
              delete misc.palettes[selectedPalette];
              savePalettes();
              selectedPalette = null;
              updateSelection();
              w.close();
              t.regen();
            });
            no.addEventListener("click", w.close);
            yes.innerText = "Yes";
            no.innerText = "No";
            btm2.style.display = "flex";
            btm2.style.flexDirection = "row";
            btm2.style.alignItems = "center";
            btm2.style.justifyContent = "center";
            btm2.appendChild(yes);
            btm2.appendChild(no);
            w.container.appendChild(warning);
            w.container.appendChild(btm2);
          }));
        });
        clearbtn.addEventListener("click", function() {
          windowSys.addWindow(new GUIWindow("clear palette", { centered: true, closeable: false }, function(w) {
            var warning = document.createElement("div");
            var yes = document.createElement("button");
            var no = document.createElement("button");
            var btm2 = document.createElement("div");
            w.container.classList.add("whitetext");
            warning.innerText = "Do you want to clear your current palette?";
            yes.addEventListener("click", function() {
              player.clearPalette();
              player.palette = [[0, 0, 0]];
              player.paletteIndex = 0;
              w.close();
            });
            no.addEventListener("click", w.close);
            yes.innerText = "Yes";
            no.innerText = "No";
            btm2.style.display = "flex";
            btm2.style.flexDirection = "row";
            btm2.style.alignItems = "center";
            btm2.style.justifyContent = "center";
            btm2.appendChild(yes);
            btm2.appendChild(no);
            w.container.appendChild(warning);
            w.container.appendChild(btm2);
          }));
        });
        resetbtn.addEventListener("click", function() {
          windowSys.addWindow(new GUIWindow("reset palettes", { centered: true, closeable: false }, function(w) {
            var warning = document.createElement("div");
            var yes = document.createElement("button");
            var no = document.createElement("button");
            var btm2 = document.createElement("div");
            w.container.classList.add("whitetext");
            w.container.style.textAlign = "center";
            warning.innerText = "Are you sure you want to erase all palettes?";
            yes.addEventListener("click", function() {
              misc.palettes = {};
              savePalettes();
              selectedPalette = null;
              updateSelection();
              w.close();
              t.regen();
            });
            no.addEventListener("click", w.close);
            yes.innerText = "Yes";
            no.innerText = "No";
            btm2.style.display = "flex";
            btm2.style.flexDirection = "row";
            btm2.style.alignItems = "center";
            btm2.style.justifyContent = "center";
            btm2.appendChild(yes);
            btm2.appendChild(no);
            w.container.appendChild(warning);
            w.container.appendChild(btm2);
          }));
        });
        function updateSelection() {
          if (!selectedPalette) {
            label.innerText = "No palette selected";
            preview.style.display = "none";
            loadbtn.style.display = "none";
            deletebtn.style.display = "none";
            windowSys.centerWindow(t);
            return;
          }
          var total = misc.palettes[selectedPalette].length;
          var pxIndex = 0;
          var pyIndex = 0;
          var tilesize = 16;
          label.innerText = `Selected palette: ${selectedPalette}`;
          preview.style.display = "";
          loadbtn.style.display = "";
          deletebtn.style.display = "";
          pcanvas.width = 448;
          pcanvas.height = 224;
          while (Math.floor(pcanvas.width / tilesize) * Math.floor(pcanvas.height / tilesize) < total && tilesize > 1 && tilesize > 1) tilesize /= 2;
          for (let color of misc.palettes[selectedPalette]) {
            ctx.fillStyle = colorUtils.toHTML(colorUtils.u24_888(color[0], color[1], color[2]));
            ctx.fillRect(pxIndex * tilesize, pyIndex * tilesize, tilesize, tilesize);
            pxIndex++;
            if (pxIndex * tilesize >= pcanvas.width) {
              pxIndex = 0;
              pyIndex++;
            }
          }
          windowSys.centerWindow(t);
        }
        genRows();
        updateSelection();
        t.regen = genRows;
      }));
    });
    checkFunctionality(() => sdk ? initSdk() : eventSys.emit(EVENTS.loaded));
    setInterval(() => {
      let pb = net.protocol?.placeBucket;
      pb?.update();
      elements.pBucketDisplay.innerText = `Place bucket: ${pb?.allowance?.toFixed(1)} (${pb?.rate}/${pb?.time}s).`;
    }, 100);
  });
  function savePalettes() {
    if (misc.storageEnabled) {
      misc.localStorage.palettes = JSON.stringify(misc.palettes);
    }
  }
  PublicAPI.client.elements = elements;
  PublicAPI.client.mouse = mouse;
  PublicAPI.chat = {
    send: (msg) => net.protocol && net.protocol.sendMessage(msg),
    clear: clearChat,
    receiveMessage,
    local: (msg) => receiveMessage(JSON.stringify({
      sender: "server",
      type: "info",
      data: {
        allowHTML: true,
        message: misc.chatSendModifier(msg)
      }
    })),
    registerCommand: function(name, callback, desc = "", aliases = []) {
      if (OWOP.chat.commandList[name]) return console.error(`${name} already exists`);
      aliases.unshift(name);
      aliases.forEach((alias) => {
        OWOP.chat.commandList[alias] = {
          "name": alias,
          "callback": callback,
          "desc": desc,
          "aliases": aliases
        };
      });
    },
    commandList: {}
  };
  PublicAPI.muted = [];
  PublicAPI.utils.retryingConnect = retryingConnect;
  PublicAPI.statusMsg = statusMsg;
  PublicAPI.createContextMenu = createContextMenu;
  window.addEventListener("mousemove", function(e) {
    window.clientX = e.clientX;
    window.clientY = e.clientY;
  });
})();
