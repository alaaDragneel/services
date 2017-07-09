(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/define-property"), __esModule: true };
},{"core-js/library/fn/object/define-property":3}],2:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _defineProperty = require("../core-js/object/define-property");

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (obj, key, value) {
  if (key in obj) {
    (0, _defineProperty2.default)(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};
},{"../core-js/object/define-property":1}],3:[function(require,module,exports){
require('../../modules/es6.object.define-property');
var $Object = require('../../modules/_core').Object;
module.exports = function defineProperty(it, key, desc){
  return $Object.defineProperty(it, key, desc);
};
},{"../../modules/_core":6,"../../modules/es6.object.define-property":19}],4:[function(require,module,exports){
module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};
},{}],5:[function(require,module,exports){
var isObject = require('./_is-object');
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};
},{"./_is-object":15}],6:[function(require,module,exports){
var core = module.exports = {version: '2.4.0'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef
},{}],7:[function(require,module,exports){
// optional / simple context binding
var aFunction = require('./_a-function');
module.exports = function(fn, that, length){
  aFunction(fn);
  if(that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  }
  return function(/* ...args */){
    return fn.apply(that, arguments);
  };
};
},{"./_a-function":4}],8:[function(require,module,exports){
// Thank's IE8 for his funny defineProperty
module.exports = !require('./_fails')(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});
},{"./_fails":11}],9:[function(require,module,exports){
var isObject = require('./_is-object')
  , document = require('./_global').document
  // in old IE typeof document.createElement is 'object'
  , is = isObject(document) && isObject(document.createElement);
module.exports = function(it){
  return is ? document.createElement(it) : {};
};
},{"./_global":12,"./_is-object":15}],10:[function(require,module,exports){
var global    = require('./_global')
  , core      = require('./_core')
  , ctx       = require('./_ctx')
  , hide      = require('./_hide')
  , PROTOTYPE = 'prototype';

var $export = function(type, name, source){
  var IS_FORCED = type & $export.F
    , IS_GLOBAL = type & $export.G
    , IS_STATIC = type & $export.S
    , IS_PROTO  = type & $export.P
    , IS_BIND   = type & $export.B
    , IS_WRAP   = type & $export.W
    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
    , expProto  = exports[PROTOTYPE]
    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
    , key, own, out;
  if(IS_GLOBAL)source = name;
  for(key in source){
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if(own && key in exports)continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function(C){
      var F = function(a, b, c){
        if(this instanceof C){
          switch(arguments.length){
            case 0: return new C;
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if(IS_PROTO){
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library` 
module.exports = $export;
},{"./_core":6,"./_ctx":7,"./_global":12,"./_hide":13}],11:[function(require,module,exports){
module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};
},{}],12:[function(require,module,exports){
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef
},{}],13:[function(require,module,exports){
var dP         = require('./_object-dp')
  , createDesc = require('./_property-desc');
module.exports = require('./_descriptors') ? function(object, key, value){
  return dP.f(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};
},{"./_descriptors":8,"./_object-dp":16,"./_property-desc":17}],14:[function(require,module,exports){
module.exports = !require('./_descriptors') && !require('./_fails')(function(){
  return Object.defineProperty(require('./_dom-create')('div'), 'a', {get: function(){ return 7; }}).a != 7;
});
},{"./_descriptors":8,"./_dom-create":9,"./_fails":11}],15:[function(require,module,exports){
module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};
},{}],16:[function(require,module,exports){
var anObject       = require('./_an-object')
  , IE8_DOM_DEFINE = require('./_ie8-dom-define')
  , toPrimitive    = require('./_to-primitive')
  , dP             = Object.defineProperty;

exports.f = require('./_descriptors') ? Object.defineProperty : function defineProperty(O, P, Attributes){
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if(IE8_DOM_DEFINE)try {
    return dP(O, P, Attributes);
  } catch(e){ /* empty */ }
  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
  if('value' in Attributes)O[P] = Attributes.value;
  return O;
};
},{"./_an-object":5,"./_descriptors":8,"./_ie8-dom-define":14,"./_to-primitive":18}],17:[function(require,module,exports){
module.exports = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};
},{}],18:[function(require,module,exports){
// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = require('./_is-object');
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function(it, S){
  if(!isObject(it))return it;
  var fn, val;
  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  throw TypeError("Can't convert object to primitive value");
};
},{"./_is-object":15}],19:[function(require,module,exports){
var $export = require('./_export');
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !require('./_descriptors'), 'Object', {defineProperty: require('./_object-dp').f});
},{"./_descriptors":8,"./_export":10,"./_object-dp":16}],20:[function(require,module,exports){
//! moment.js
//! version : 2.18.1
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com

;(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    global.moment = factory()
}(this, (function () { 'use strict';

var hookCallback;

function hooks () {
    return hookCallback.apply(null, arguments);
}

// This is done to register the method called with moment()
// without creating circular dependencies.
function setHookCallback (callback) {
    hookCallback = callback;
}

function isArray(input) {
    return input instanceof Array || Object.prototype.toString.call(input) === '[object Array]';
}

function isObject(input) {
    // IE8 will treat undefined and null as object if it wasn't for
    // input != null
    return input != null && Object.prototype.toString.call(input) === '[object Object]';
}

function isObjectEmpty(obj) {
    var k;
    for (k in obj) {
        // even if its not own property I'd still call it non-empty
        return false;
    }
    return true;
}

function isUndefined(input) {
    return input === void 0;
}

function isNumber(input) {
    return typeof input === 'number' || Object.prototype.toString.call(input) === '[object Number]';
}

function isDate(input) {
    return input instanceof Date || Object.prototype.toString.call(input) === '[object Date]';
}

function map(arr, fn) {
    var res = [], i;
    for (i = 0; i < arr.length; ++i) {
        res.push(fn(arr[i], i));
    }
    return res;
}

function hasOwnProp(a, b) {
    return Object.prototype.hasOwnProperty.call(a, b);
}

function extend(a, b) {
    for (var i in b) {
        if (hasOwnProp(b, i)) {
            a[i] = b[i];
        }
    }

    if (hasOwnProp(b, 'toString')) {
        a.toString = b.toString;
    }

    if (hasOwnProp(b, 'valueOf')) {
        a.valueOf = b.valueOf;
    }

    return a;
}

function createUTC (input, format, locale, strict) {
    return createLocalOrUTC(input, format, locale, strict, true).utc();
}

function defaultParsingFlags() {
    // We need to deep clone this object.
    return {
        empty           : false,
        unusedTokens    : [],
        unusedInput     : [],
        overflow        : -2,
        charsLeftOver   : 0,
        nullInput       : false,
        invalidMonth    : null,
        invalidFormat   : false,
        userInvalidated : false,
        iso             : false,
        parsedDateParts : [],
        meridiem        : null,
        rfc2822         : false,
        weekdayMismatch : false
    };
}

function getParsingFlags(m) {
    if (m._pf == null) {
        m._pf = defaultParsingFlags();
    }
    return m._pf;
}

var some;
if (Array.prototype.some) {
    some = Array.prototype.some;
} else {
    some = function (fun) {
        var t = Object(this);
        var len = t.length >>> 0;

        for (var i = 0; i < len; i++) {
            if (i in t && fun.call(this, t[i], i, t)) {
                return true;
            }
        }

        return false;
    };
}

var some$1 = some;

function isValid(m) {
    if (m._isValid == null) {
        var flags = getParsingFlags(m);
        var parsedParts = some$1.call(flags.parsedDateParts, function (i) {
            return i != null;
        });
        var isNowValid = !isNaN(m._d.getTime()) &&
            flags.overflow < 0 &&
            !flags.empty &&
            !flags.invalidMonth &&
            !flags.invalidWeekday &&
            !flags.nullInput &&
            !flags.invalidFormat &&
            !flags.userInvalidated &&
            (!flags.meridiem || (flags.meridiem && parsedParts));

        if (m._strict) {
            isNowValid = isNowValid &&
                flags.charsLeftOver === 0 &&
                flags.unusedTokens.length === 0 &&
                flags.bigHour === undefined;
        }

        if (Object.isFrozen == null || !Object.isFrozen(m)) {
            m._isValid = isNowValid;
        }
        else {
            return isNowValid;
        }
    }
    return m._isValid;
}

function createInvalid (flags) {
    var m = createUTC(NaN);
    if (flags != null) {
        extend(getParsingFlags(m), flags);
    }
    else {
        getParsingFlags(m).userInvalidated = true;
    }

    return m;
}

// Plugins that add properties should also add the key here (null value),
// so we can properly clone ourselves.
var momentProperties = hooks.momentProperties = [];

function copyConfig(to, from) {
    var i, prop, val;

    if (!isUndefined(from._isAMomentObject)) {
        to._isAMomentObject = from._isAMomentObject;
    }
    if (!isUndefined(from._i)) {
        to._i = from._i;
    }
    if (!isUndefined(from._f)) {
        to._f = from._f;
    }
    if (!isUndefined(from._l)) {
        to._l = from._l;
    }
    if (!isUndefined(from._strict)) {
        to._strict = from._strict;
    }
    if (!isUndefined(from._tzm)) {
        to._tzm = from._tzm;
    }
    if (!isUndefined(from._isUTC)) {
        to._isUTC = from._isUTC;
    }
    if (!isUndefined(from._offset)) {
        to._offset = from._offset;
    }
    if (!isUndefined(from._pf)) {
        to._pf = getParsingFlags(from);
    }
    if (!isUndefined(from._locale)) {
        to._locale = from._locale;
    }

    if (momentProperties.length > 0) {
        for (i = 0; i < momentProperties.length; i++) {
            prop = momentProperties[i];
            val = from[prop];
            if (!isUndefined(val)) {
                to[prop] = val;
            }
        }
    }

    return to;
}

var updateInProgress = false;

// Moment prototype object
function Moment(config) {
    copyConfig(this, config);
    this._d = new Date(config._d != null ? config._d.getTime() : NaN);
    if (!this.isValid()) {
        this._d = new Date(NaN);
    }
    // Prevent infinite loop in case updateOffset creates new moment
    // objects.
    if (updateInProgress === false) {
        updateInProgress = true;
        hooks.updateOffset(this);
        updateInProgress = false;
    }
}

function isMoment (obj) {
    return obj instanceof Moment || (obj != null && obj._isAMomentObject != null);
}

function absFloor (number) {
    if (number < 0) {
        // -0 -> 0
        return Math.ceil(number) || 0;
    } else {
        return Math.floor(number);
    }
}

function toInt(argumentForCoercion) {
    var coercedNumber = +argumentForCoercion,
        value = 0;

    if (coercedNumber !== 0 && isFinite(coercedNumber)) {
        value = absFloor(coercedNumber);
    }

    return value;
}

// compare two arrays, return the number of differences
function compareArrays(array1, array2, dontConvert) {
    var len = Math.min(array1.length, array2.length),
        lengthDiff = Math.abs(array1.length - array2.length),
        diffs = 0,
        i;
    for (i = 0; i < len; i++) {
        if ((dontConvert && array1[i] !== array2[i]) ||
            (!dontConvert && toInt(array1[i]) !== toInt(array2[i]))) {
            diffs++;
        }
    }
    return diffs + lengthDiff;
}

function warn(msg) {
    if (hooks.suppressDeprecationWarnings === false &&
            (typeof console !==  'undefined') && console.warn) {
        console.warn('Deprecation warning: ' + msg);
    }
}

function deprecate(msg, fn) {
    var firstTime = true;

    return extend(function () {
        if (hooks.deprecationHandler != null) {
            hooks.deprecationHandler(null, msg);
        }
        if (firstTime) {
            var args = [];
            var arg;
            for (var i = 0; i < arguments.length; i++) {
                arg = '';
                if (typeof arguments[i] === 'object') {
                    arg += '\n[' + i + '] ';
                    for (var key in arguments[0]) {
                        arg += key + ': ' + arguments[0][key] + ', ';
                    }
                    arg = arg.slice(0, -2); // Remove trailing comma and space
                } else {
                    arg = arguments[i];
                }
                args.push(arg);
            }
            warn(msg + '\nArguments: ' + Array.prototype.slice.call(args).join('') + '\n' + (new Error()).stack);
            firstTime = false;
        }
        return fn.apply(this, arguments);
    }, fn);
}

var deprecations = {};

function deprecateSimple(name, msg) {
    if (hooks.deprecationHandler != null) {
        hooks.deprecationHandler(name, msg);
    }
    if (!deprecations[name]) {
        warn(msg);
        deprecations[name] = true;
    }
}

hooks.suppressDeprecationWarnings = false;
hooks.deprecationHandler = null;

function isFunction(input) {
    return input instanceof Function || Object.prototype.toString.call(input) === '[object Function]';
}

function set (config) {
    var prop, i;
    for (i in config) {
        prop = config[i];
        if (isFunction(prop)) {
            this[i] = prop;
        } else {
            this['_' + i] = prop;
        }
    }
    this._config = config;
    // Lenient ordinal parsing accepts just a number in addition to
    // number + (possibly) stuff coming from _dayOfMonthOrdinalParse.
    // TODO: Remove "ordinalParse" fallback in next major release.
    this._dayOfMonthOrdinalParseLenient = new RegExp(
        (this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) +
            '|' + (/\d{1,2}/).source);
}

function mergeConfigs(parentConfig, childConfig) {
    var res = extend({}, parentConfig), prop;
    for (prop in childConfig) {
        if (hasOwnProp(childConfig, prop)) {
            if (isObject(parentConfig[prop]) && isObject(childConfig[prop])) {
                res[prop] = {};
                extend(res[prop], parentConfig[prop]);
                extend(res[prop], childConfig[prop]);
            } else if (childConfig[prop] != null) {
                res[prop] = childConfig[prop];
            } else {
                delete res[prop];
            }
        }
    }
    for (prop in parentConfig) {
        if (hasOwnProp(parentConfig, prop) &&
                !hasOwnProp(childConfig, prop) &&
                isObject(parentConfig[prop])) {
            // make sure changes to properties don't modify parent config
            res[prop] = extend({}, res[prop]);
        }
    }
    return res;
}

function Locale(config) {
    if (config != null) {
        this.set(config);
    }
}

var keys;

if (Object.keys) {
    keys = Object.keys;
} else {
    keys = function (obj) {
        var i, res = [];
        for (i in obj) {
            if (hasOwnProp(obj, i)) {
                res.push(i);
            }
        }
        return res;
    };
}

var keys$1 = keys;

var defaultCalendar = {
    sameDay : '[Today at] LT',
    nextDay : '[Tomorrow at] LT',
    nextWeek : 'dddd [at] LT',
    lastDay : '[Yesterday at] LT',
    lastWeek : '[Last] dddd [at] LT',
    sameElse : 'L'
};

function calendar (key, mom, now) {
    var output = this._calendar[key] || this._calendar['sameElse'];
    return isFunction(output) ? output.call(mom, now) : output;
}

var defaultLongDateFormat = {
    LTS  : 'h:mm:ss A',
    LT   : 'h:mm A',
    L    : 'MM/DD/YYYY',
    LL   : 'MMMM D, YYYY',
    LLL  : 'MMMM D, YYYY h:mm A',
    LLLL : 'dddd, MMMM D, YYYY h:mm A'
};

function longDateFormat (key) {
    var format = this._longDateFormat[key],
        formatUpper = this._longDateFormat[key.toUpperCase()];

    if (format || !formatUpper) {
        return format;
    }

    this._longDateFormat[key] = formatUpper.replace(/MMMM|MM|DD|dddd/g, function (val) {
        return val.slice(1);
    });

    return this._longDateFormat[key];
}

var defaultInvalidDate = 'Invalid date';

function invalidDate () {
    return this._invalidDate;
}

var defaultOrdinal = '%d';
var defaultDayOfMonthOrdinalParse = /\d{1,2}/;

function ordinal (number) {
    return this._ordinal.replace('%d', number);
}

var defaultRelativeTime = {
    future : 'in %s',
    past   : '%s ago',
    s  : 'a few seconds',
    ss : '%d seconds',
    m  : 'a minute',
    mm : '%d minutes',
    h  : 'an hour',
    hh : '%d hours',
    d  : 'a day',
    dd : '%d days',
    M  : 'a month',
    MM : '%d months',
    y  : 'a year',
    yy : '%d years'
};

function relativeTime (number, withoutSuffix, string, isFuture) {
    var output = this._relativeTime[string];
    return (isFunction(output)) ?
        output(number, withoutSuffix, string, isFuture) :
        output.replace(/%d/i, number);
}

function pastFuture (diff, output) {
    var format = this._relativeTime[diff > 0 ? 'future' : 'past'];
    return isFunction(format) ? format(output) : format.replace(/%s/i, output);
}

var aliases = {};

function addUnitAlias (unit, shorthand) {
    var lowerCase = unit.toLowerCase();
    aliases[lowerCase] = aliases[lowerCase + 's'] = aliases[shorthand] = unit;
}

function normalizeUnits(units) {
    return typeof units === 'string' ? aliases[units] || aliases[units.toLowerCase()] : undefined;
}

function normalizeObjectUnits(inputObject) {
    var normalizedInput = {},
        normalizedProp,
        prop;

    for (prop in inputObject) {
        if (hasOwnProp(inputObject, prop)) {
            normalizedProp = normalizeUnits(prop);
            if (normalizedProp) {
                normalizedInput[normalizedProp] = inputObject[prop];
            }
        }
    }

    return normalizedInput;
}

var priorities = {};

function addUnitPriority(unit, priority) {
    priorities[unit] = priority;
}

function getPrioritizedUnits(unitsObj) {
    var units = [];
    for (var u in unitsObj) {
        units.push({unit: u, priority: priorities[u]});
    }
    units.sort(function (a, b) {
        return a.priority - b.priority;
    });
    return units;
}

function makeGetSet (unit, keepTime) {
    return function (value) {
        if (value != null) {
            set$1(this, unit, value);
            hooks.updateOffset(this, keepTime);
            return this;
        } else {
            return get(this, unit);
        }
    };
}

function get (mom, unit) {
    return mom.isValid() ?
        mom._d['get' + (mom._isUTC ? 'UTC' : '') + unit]() : NaN;
}

function set$1 (mom, unit, value) {
    if (mom.isValid()) {
        mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value);
    }
}

// MOMENTS

function stringGet (units) {
    units = normalizeUnits(units);
    if (isFunction(this[units])) {
        return this[units]();
    }
    return this;
}


function stringSet (units, value) {
    if (typeof units === 'object') {
        units = normalizeObjectUnits(units);
        var prioritized = getPrioritizedUnits(units);
        for (var i = 0; i < prioritized.length; i++) {
            this[prioritized[i].unit](units[prioritized[i].unit]);
        }
    } else {
        units = normalizeUnits(units);
        if (isFunction(this[units])) {
            return this[units](value);
        }
    }
    return this;
}

function zeroFill(number, targetLength, forceSign) {
    var absNumber = '' + Math.abs(number),
        zerosToFill = targetLength - absNumber.length,
        sign = number >= 0;
    return (sign ? (forceSign ? '+' : '') : '-') +
        Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) + absNumber;
}

var formattingTokens = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g;

var localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g;

var formatFunctions = {};

var formatTokenFunctions = {};

// token:    'M'
// padded:   ['MM', 2]
// ordinal:  'Mo'
// callback: function () { this.month() + 1 }
function addFormatToken (token, padded, ordinal, callback) {
    var func = callback;
    if (typeof callback === 'string') {
        func = function () {
            return this[callback]();
        };
    }
    if (token) {
        formatTokenFunctions[token] = func;
    }
    if (padded) {
        formatTokenFunctions[padded[0]] = function () {
            return zeroFill(func.apply(this, arguments), padded[1], padded[2]);
        };
    }
    if (ordinal) {
        formatTokenFunctions[ordinal] = function () {
            return this.localeData().ordinal(func.apply(this, arguments), token);
        };
    }
}

function removeFormattingTokens(input) {
    if (input.match(/\[[\s\S]/)) {
        return input.replace(/^\[|\]$/g, '');
    }
    return input.replace(/\\/g, '');
}

function makeFormatFunction(format) {
    var array = format.match(formattingTokens), i, length;

    for (i = 0, length = array.length; i < length; i++) {
        if (formatTokenFunctions[array[i]]) {
            array[i] = formatTokenFunctions[array[i]];
        } else {
            array[i] = removeFormattingTokens(array[i]);
        }
    }

    return function (mom) {
        var output = '', i;
        for (i = 0; i < length; i++) {
            output += isFunction(array[i]) ? array[i].call(mom, format) : array[i];
        }
        return output;
    };
}

// format date using native date object
function formatMoment(m, format) {
    if (!m.isValid()) {
        return m.localeData().invalidDate();
    }

    format = expandFormat(format, m.localeData());
    formatFunctions[format] = formatFunctions[format] || makeFormatFunction(format);

    return formatFunctions[format](m);
}

function expandFormat(format, locale) {
    var i = 5;

    function replaceLongDateFormatTokens(input) {
        return locale.longDateFormat(input) || input;
    }

    localFormattingTokens.lastIndex = 0;
    while (i >= 0 && localFormattingTokens.test(format)) {
        format = format.replace(localFormattingTokens, replaceLongDateFormatTokens);
        localFormattingTokens.lastIndex = 0;
        i -= 1;
    }

    return format;
}

var match1         = /\d/;            //       0 - 9
var match2         = /\d\d/;          //      00 - 99
var match3         = /\d{3}/;         //     000 - 999
var match4         = /\d{4}/;         //    0000 - 9999
var match6         = /[+-]?\d{6}/;    // -999999 - 999999
var match1to2      = /\d\d?/;         //       0 - 99
var match3to4      = /\d\d\d\d?/;     //     999 - 9999
var match5to6      = /\d\d\d\d\d\d?/; //   99999 - 999999
var match1to3      = /\d{1,3}/;       //       0 - 999
var match1to4      = /\d{1,4}/;       //       0 - 9999
var match1to6      = /[+-]?\d{1,6}/;  // -999999 - 999999

var matchUnsigned  = /\d+/;           //       0 - inf
var matchSigned    = /[+-]?\d+/;      //    -inf - inf

var matchOffset    = /Z|[+-]\d\d:?\d\d/gi; // +00:00 -00:00 +0000 -0000 or Z
var matchShortOffset = /Z|[+-]\d\d(?::?\d\d)?/gi; // +00 -00 +00:00 -00:00 +0000 -0000 or Z

var matchTimestamp = /[+-]?\d+(\.\d{1,3})?/; // 123456789 123456789.123

// any word (or two) characters or numbers including two/three word month in arabic.
// includes scottish gaelic two word and hyphenated months
var matchWord = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i;


var regexes = {};

function addRegexToken (token, regex, strictRegex) {
    regexes[token] = isFunction(regex) ? regex : function (isStrict, localeData) {
        return (isStrict && strictRegex) ? strictRegex : regex;
    };
}

function getParseRegexForToken (token, config) {
    if (!hasOwnProp(regexes, token)) {
        return new RegExp(unescapeFormat(token));
    }

    return regexes[token](config._strict, config._locale);
}

// Code from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
function unescapeFormat(s) {
    return regexEscape(s.replace('\\', '').replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (matched, p1, p2, p3, p4) {
        return p1 || p2 || p3 || p4;
    }));
}

function regexEscape(s) {
    return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

var tokens = {};

function addParseToken (token, callback) {
    var i, func = callback;
    if (typeof token === 'string') {
        token = [token];
    }
    if (isNumber(callback)) {
        func = function (input, array) {
            array[callback] = toInt(input);
        };
    }
    for (i = 0; i < token.length; i++) {
        tokens[token[i]] = func;
    }
}

function addWeekParseToken (token, callback) {
    addParseToken(token, function (input, array, config, token) {
        config._w = config._w || {};
        callback(input, config._w, config, token);
    });
}

function addTimeToArrayFromToken(token, input, config) {
    if (input != null && hasOwnProp(tokens, token)) {
        tokens[token](input, config._a, config, token);
    }
}

var YEAR = 0;
var MONTH = 1;
var DATE = 2;
var HOUR = 3;
var MINUTE = 4;
var SECOND = 5;
var MILLISECOND = 6;
var WEEK = 7;
var WEEKDAY = 8;

var indexOf;

if (Array.prototype.indexOf) {
    indexOf = Array.prototype.indexOf;
} else {
    indexOf = function (o) {
        // I know
        var i;
        for (i = 0; i < this.length; ++i) {
            if (this[i] === o) {
                return i;
            }
        }
        return -1;
    };
}

var indexOf$1 = indexOf;

function daysInMonth(year, month) {
    return new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
}

// FORMATTING

addFormatToken('M', ['MM', 2], 'Mo', function () {
    return this.month() + 1;
});

addFormatToken('MMM', 0, 0, function (format) {
    return this.localeData().monthsShort(this, format);
});

addFormatToken('MMMM', 0, 0, function (format) {
    return this.localeData().months(this, format);
});

// ALIASES

addUnitAlias('month', 'M');

// PRIORITY

addUnitPriority('month', 8);

// PARSING

addRegexToken('M',    match1to2);
addRegexToken('MM',   match1to2, match2);
addRegexToken('MMM',  function (isStrict, locale) {
    return locale.monthsShortRegex(isStrict);
});
addRegexToken('MMMM', function (isStrict, locale) {
    return locale.monthsRegex(isStrict);
});

addParseToken(['M', 'MM'], function (input, array) {
    array[MONTH] = toInt(input) - 1;
});

addParseToken(['MMM', 'MMMM'], function (input, array, config, token) {
    var month = config._locale.monthsParse(input, token, config._strict);
    // if we didn't find a month name, mark the date as invalid.
    if (month != null) {
        array[MONTH] = month;
    } else {
        getParsingFlags(config).invalidMonth = input;
    }
});

// LOCALES

var MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/;
var defaultLocaleMonths = 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_');
function localeMonths (m, format) {
    if (!m) {
        return isArray(this._months) ? this._months :
            this._months['standalone'];
    }
    return isArray(this._months) ? this._months[m.month()] :
        this._months[(this._months.isFormat || MONTHS_IN_FORMAT).test(format) ? 'format' : 'standalone'][m.month()];
}

var defaultLocaleMonthsShort = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_');
function localeMonthsShort (m, format) {
    if (!m) {
        return isArray(this._monthsShort) ? this._monthsShort :
            this._monthsShort['standalone'];
    }
    return isArray(this._monthsShort) ? this._monthsShort[m.month()] :
        this._monthsShort[MONTHS_IN_FORMAT.test(format) ? 'format' : 'standalone'][m.month()];
}

function handleStrictParse(monthName, format, strict) {
    var i, ii, mom, llc = monthName.toLocaleLowerCase();
    if (!this._monthsParse) {
        // this is not used
        this._monthsParse = [];
        this._longMonthsParse = [];
        this._shortMonthsParse = [];
        for (i = 0; i < 12; ++i) {
            mom = createUTC([2000, i]);
            this._shortMonthsParse[i] = this.monthsShort(mom, '').toLocaleLowerCase();
            this._longMonthsParse[i] = this.months(mom, '').toLocaleLowerCase();
        }
    }

    if (strict) {
        if (format === 'MMM') {
            ii = indexOf$1.call(this._shortMonthsParse, llc);
            return ii !== -1 ? ii : null;
        } else {
            ii = indexOf$1.call(this._longMonthsParse, llc);
            return ii !== -1 ? ii : null;
        }
    } else {
        if (format === 'MMM') {
            ii = indexOf$1.call(this._shortMonthsParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = indexOf$1.call(this._longMonthsParse, llc);
            return ii !== -1 ? ii : null;
        } else {
            ii = indexOf$1.call(this._longMonthsParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = indexOf$1.call(this._shortMonthsParse, llc);
            return ii !== -1 ? ii : null;
        }
    }
}

function localeMonthsParse (monthName, format, strict) {
    var i, mom, regex;

    if (this._monthsParseExact) {
        return handleStrictParse.call(this, monthName, format, strict);
    }

    if (!this._monthsParse) {
        this._monthsParse = [];
        this._longMonthsParse = [];
        this._shortMonthsParse = [];
    }

    // TODO: add sorting
    // Sorting makes sure if one month (or abbr) is a prefix of another
    // see sorting in computeMonthsParse
    for (i = 0; i < 12; i++) {
        // make the regex if we don't have it already
        mom = createUTC([2000, i]);
        if (strict && !this._longMonthsParse[i]) {
            this._longMonthsParse[i] = new RegExp('^' + this.months(mom, '').replace('.', '') + '$', 'i');
            this._shortMonthsParse[i] = new RegExp('^' + this.monthsShort(mom, '').replace('.', '') + '$', 'i');
        }
        if (!strict && !this._monthsParse[i]) {
            regex = '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');
            this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');
        }
        // test the regex
        if (strict && format === 'MMMM' && this._longMonthsParse[i].test(monthName)) {
            return i;
        } else if (strict && format === 'MMM' && this._shortMonthsParse[i].test(monthName)) {
            return i;
        } else if (!strict && this._monthsParse[i].test(monthName)) {
            return i;
        }
    }
}

// MOMENTS

function setMonth (mom, value) {
    var dayOfMonth;

    if (!mom.isValid()) {
        // No op
        return mom;
    }

    if (typeof value === 'string') {
        if (/^\d+$/.test(value)) {
            value = toInt(value);
        } else {
            value = mom.localeData().monthsParse(value);
            // TODO: Another silent failure?
            if (!isNumber(value)) {
                return mom;
            }
        }
    }

    dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value));
    mom._d['set' + (mom._isUTC ? 'UTC' : '') + 'Month'](value, dayOfMonth);
    return mom;
}

function getSetMonth (value) {
    if (value != null) {
        setMonth(this, value);
        hooks.updateOffset(this, true);
        return this;
    } else {
        return get(this, 'Month');
    }
}

function getDaysInMonth () {
    return daysInMonth(this.year(), this.month());
}

var defaultMonthsShortRegex = matchWord;
function monthsShortRegex (isStrict) {
    if (this._monthsParseExact) {
        if (!hasOwnProp(this, '_monthsRegex')) {
            computeMonthsParse.call(this);
        }
        if (isStrict) {
            return this._monthsShortStrictRegex;
        } else {
            return this._monthsShortRegex;
        }
    } else {
        if (!hasOwnProp(this, '_monthsShortRegex')) {
            this._monthsShortRegex = defaultMonthsShortRegex;
        }
        return this._monthsShortStrictRegex && isStrict ?
            this._monthsShortStrictRegex : this._monthsShortRegex;
    }
}

var defaultMonthsRegex = matchWord;
function monthsRegex (isStrict) {
    if (this._monthsParseExact) {
        if (!hasOwnProp(this, '_monthsRegex')) {
            computeMonthsParse.call(this);
        }
        if (isStrict) {
            return this._monthsStrictRegex;
        } else {
            return this._monthsRegex;
        }
    } else {
        if (!hasOwnProp(this, '_monthsRegex')) {
            this._monthsRegex = defaultMonthsRegex;
        }
        return this._monthsStrictRegex && isStrict ?
            this._monthsStrictRegex : this._monthsRegex;
    }
}

function computeMonthsParse () {
    function cmpLenRev(a, b) {
        return b.length - a.length;
    }

    var shortPieces = [], longPieces = [], mixedPieces = [],
        i, mom;
    for (i = 0; i < 12; i++) {
        // make the regex if we don't have it already
        mom = createUTC([2000, i]);
        shortPieces.push(this.monthsShort(mom, ''));
        longPieces.push(this.months(mom, ''));
        mixedPieces.push(this.months(mom, ''));
        mixedPieces.push(this.monthsShort(mom, ''));
    }
    // Sorting makes sure if one month (or abbr) is a prefix of another it
    // will match the longer piece.
    shortPieces.sort(cmpLenRev);
    longPieces.sort(cmpLenRev);
    mixedPieces.sort(cmpLenRev);
    for (i = 0; i < 12; i++) {
        shortPieces[i] = regexEscape(shortPieces[i]);
        longPieces[i] = regexEscape(longPieces[i]);
    }
    for (i = 0; i < 24; i++) {
        mixedPieces[i] = regexEscape(mixedPieces[i]);
    }

    this._monthsRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
    this._monthsShortRegex = this._monthsRegex;
    this._monthsStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
    this._monthsShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
}

// FORMATTING

addFormatToken('Y', 0, 0, function () {
    var y = this.year();
    return y <= 9999 ? '' + y : '+' + y;
});

addFormatToken(0, ['YY', 2], 0, function () {
    return this.year() % 100;
});

addFormatToken(0, ['YYYY',   4],       0, 'year');
addFormatToken(0, ['YYYYY',  5],       0, 'year');
addFormatToken(0, ['YYYYYY', 6, true], 0, 'year');

// ALIASES

addUnitAlias('year', 'y');

// PRIORITIES

addUnitPriority('year', 1);

// PARSING

addRegexToken('Y',      matchSigned);
addRegexToken('YY',     match1to2, match2);
addRegexToken('YYYY',   match1to4, match4);
addRegexToken('YYYYY',  match1to6, match6);
addRegexToken('YYYYYY', match1to6, match6);

addParseToken(['YYYYY', 'YYYYYY'], YEAR);
addParseToken('YYYY', function (input, array) {
    array[YEAR] = input.length === 2 ? hooks.parseTwoDigitYear(input) : toInt(input);
});
addParseToken('YY', function (input, array) {
    array[YEAR] = hooks.parseTwoDigitYear(input);
});
addParseToken('Y', function (input, array) {
    array[YEAR] = parseInt(input, 10);
});

// HELPERS

function daysInYear(year) {
    return isLeapYear(year) ? 366 : 365;
}

function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

// HOOKS

hooks.parseTwoDigitYear = function (input) {
    return toInt(input) + (toInt(input) > 68 ? 1900 : 2000);
};

// MOMENTS

var getSetYear = makeGetSet('FullYear', true);

function getIsLeapYear () {
    return isLeapYear(this.year());
}

function createDate (y, m, d, h, M, s, ms) {
    // can't just apply() to create a date:
    // https://stackoverflow.com/q/181348
    var date = new Date(y, m, d, h, M, s, ms);

    // the date constructor remaps years 0-99 to 1900-1999
    if (y < 100 && y >= 0 && isFinite(date.getFullYear())) {
        date.setFullYear(y);
    }
    return date;
}

function createUTCDate (y) {
    var date = new Date(Date.UTC.apply(null, arguments));

    // the Date.UTC function remaps years 0-99 to 1900-1999
    if (y < 100 && y >= 0 && isFinite(date.getUTCFullYear())) {
        date.setUTCFullYear(y);
    }
    return date;
}

// start-of-first-week - start-of-year
function firstWeekOffset(year, dow, doy) {
    var // first-week day -- which january is always in the first week (4 for iso, 1 for other)
        fwd = 7 + dow - doy,
        // first-week day local weekday -- which local weekday is fwd
        fwdlw = (7 + createUTCDate(year, 0, fwd).getUTCDay() - dow) % 7;

    return -fwdlw + fwd - 1;
}

// https://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday
function dayOfYearFromWeeks(year, week, weekday, dow, doy) {
    var localWeekday = (7 + weekday - dow) % 7,
        weekOffset = firstWeekOffset(year, dow, doy),
        dayOfYear = 1 + 7 * (week - 1) + localWeekday + weekOffset,
        resYear, resDayOfYear;

    if (dayOfYear <= 0) {
        resYear = year - 1;
        resDayOfYear = daysInYear(resYear) + dayOfYear;
    } else if (dayOfYear > daysInYear(year)) {
        resYear = year + 1;
        resDayOfYear = dayOfYear - daysInYear(year);
    } else {
        resYear = year;
        resDayOfYear = dayOfYear;
    }

    return {
        year: resYear,
        dayOfYear: resDayOfYear
    };
}

function weekOfYear(mom, dow, doy) {
    var weekOffset = firstWeekOffset(mom.year(), dow, doy),
        week = Math.floor((mom.dayOfYear() - weekOffset - 1) / 7) + 1,
        resWeek, resYear;

    if (week < 1) {
        resYear = mom.year() - 1;
        resWeek = week + weeksInYear(resYear, dow, doy);
    } else if (week > weeksInYear(mom.year(), dow, doy)) {
        resWeek = week - weeksInYear(mom.year(), dow, doy);
        resYear = mom.year() + 1;
    } else {
        resYear = mom.year();
        resWeek = week;
    }

    return {
        week: resWeek,
        year: resYear
    };
}

function weeksInYear(year, dow, doy) {
    var weekOffset = firstWeekOffset(year, dow, doy),
        weekOffsetNext = firstWeekOffset(year + 1, dow, doy);
    return (daysInYear(year) - weekOffset + weekOffsetNext) / 7;
}

// FORMATTING

addFormatToken('w', ['ww', 2], 'wo', 'week');
addFormatToken('W', ['WW', 2], 'Wo', 'isoWeek');

// ALIASES

addUnitAlias('week', 'w');
addUnitAlias('isoWeek', 'W');

// PRIORITIES

addUnitPriority('week', 5);
addUnitPriority('isoWeek', 5);

// PARSING

addRegexToken('w',  match1to2);
addRegexToken('ww', match1to2, match2);
addRegexToken('W',  match1to2);
addRegexToken('WW', match1to2, match2);

addWeekParseToken(['w', 'ww', 'W', 'WW'], function (input, week, config, token) {
    week[token.substr(0, 1)] = toInt(input);
});

// HELPERS

// LOCALES

function localeWeek (mom) {
    return weekOfYear(mom, this._week.dow, this._week.doy).week;
}

var defaultLocaleWeek = {
    dow : 0, // Sunday is the first day of the week.
    doy : 6  // The week that contains Jan 1st is the first week of the year.
};

function localeFirstDayOfWeek () {
    return this._week.dow;
}

function localeFirstDayOfYear () {
    return this._week.doy;
}

// MOMENTS

function getSetWeek (input) {
    var week = this.localeData().week(this);
    return input == null ? week : this.add((input - week) * 7, 'd');
}

function getSetISOWeek (input) {
    var week = weekOfYear(this, 1, 4).week;
    return input == null ? week : this.add((input - week) * 7, 'd');
}

// FORMATTING

addFormatToken('d', 0, 'do', 'day');

addFormatToken('dd', 0, 0, function (format) {
    return this.localeData().weekdaysMin(this, format);
});

addFormatToken('ddd', 0, 0, function (format) {
    return this.localeData().weekdaysShort(this, format);
});

addFormatToken('dddd', 0, 0, function (format) {
    return this.localeData().weekdays(this, format);
});

addFormatToken('e', 0, 0, 'weekday');
addFormatToken('E', 0, 0, 'isoWeekday');

// ALIASES

addUnitAlias('day', 'd');
addUnitAlias('weekday', 'e');
addUnitAlias('isoWeekday', 'E');

// PRIORITY
addUnitPriority('day', 11);
addUnitPriority('weekday', 11);
addUnitPriority('isoWeekday', 11);

// PARSING

addRegexToken('d',    match1to2);
addRegexToken('e',    match1to2);
addRegexToken('E',    match1to2);
addRegexToken('dd',   function (isStrict, locale) {
    return locale.weekdaysMinRegex(isStrict);
});
addRegexToken('ddd',   function (isStrict, locale) {
    return locale.weekdaysShortRegex(isStrict);
});
addRegexToken('dddd',   function (isStrict, locale) {
    return locale.weekdaysRegex(isStrict);
});

addWeekParseToken(['dd', 'ddd', 'dddd'], function (input, week, config, token) {
    var weekday = config._locale.weekdaysParse(input, token, config._strict);
    // if we didn't get a weekday name, mark the date as invalid
    if (weekday != null) {
        week.d = weekday;
    } else {
        getParsingFlags(config).invalidWeekday = input;
    }
});

addWeekParseToken(['d', 'e', 'E'], function (input, week, config, token) {
    week[token] = toInt(input);
});

// HELPERS

function parseWeekday(input, locale) {
    if (typeof input !== 'string') {
        return input;
    }

    if (!isNaN(input)) {
        return parseInt(input, 10);
    }

    input = locale.weekdaysParse(input);
    if (typeof input === 'number') {
        return input;
    }

    return null;
}

function parseIsoWeekday(input, locale) {
    if (typeof input === 'string') {
        return locale.weekdaysParse(input) % 7 || 7;
    }
    return isNaN(input) ? null : input;
}

// LOCALES

var defaultLocaleWeekdays = 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_');
function localeWeekdays (m, format) {
    if (!m) {
        return isArray(this._weekdays) ? this._weekdays :
            this._weekdays['standalone'];
    }
    return isArray(this._weekdays) ? this._weekdays[m.day()] :
        this._weekdays[this._weekdays.isFormat.test(format) ? 'format' : 'standalone'][m.day()];
}

var defaultLocaleWeekdaysShort = 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_');
function localeWeekdaysShort (m) {
    return (m) ? this._weekdaysShort[m.day()] : this._weekdaysShort;
}

var defaultLocaleWeekdaysMin = 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_');
function localeWeekdaysMin (m) {
    return (m) ? this._weekdaysMin[m.day()] : this._weekdaysMin;
}

function handleStrictParse$1(weekdayName, format, strict) {
    var i, ii, mom, llc = weekdayName.toLocaleLowerCase();
    if (!this._weekdaysParse) {
        this._weekdaysParse = [];
        this._shortWeekdaysParse = [];
        this._minWeekdaysParse = [];

        for (i = 0; i < 7; ++i) {
            mom = createUTC([2000, 1]).day(i);
            this._minWeekdaysParse[i] = this.weekdaysMin(mom, '').toLocaleLowerCase();
            this._shortWeekdaysParse[i] = this.weekdaysShort(mom, '').toLocaleLowerCase();
            this._weekdaysParse[i] = this.weekdays(mom, '').toLocaleLowerCase();
        }
    }

    if (strict) {
        if (format === 'dddd') {
            ii = indexOf$1.call(this._weekdaysParse, llc);
            return ii !== -1 ? ii : null;
        } else if (format === 'ddd') {
            ii = indexOf$1.call(this._shortWeekdaysParse, llc);
            return ii !== -1 ? ii : null;
        } else {
            ii = indexOf$1.call(this._minWeekdaysParse, llc);
            return ii !== -1 ? ii : null;
        }
    } else {
        if (format === 'dddd') {
            ii = indexOf$1.call(this._weekdaysParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = indexOf$1.call(this._shortWeekdaysParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = indexOf$1.call(this._minWeekdaysParse, llc);
            return ii !== -1 ? ii : null;
        } else if (format === 'ddd') {
            ii = indexOf$1.call(this._shortWeekdaysParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = indexOf$1.call(this._weekdaysParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = indexOf$1.call(this._minWeekdaysParse, llc);
            return ii !== -1 ? ii : null;
        } else {
            ii = indexOf$1.call(this._minWeekdaysParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = indexOf$1.call(this._weekdaysParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = indexOf$1.call(this._shortWeekdaysParse, llc);
            return ii !== -1 ? ii : null;
        }
    }
}

function localeWeekdaysParse (weekdayName, format, strict) {
    var i, mom, regex;

    if (this._weekdaysParseExact) {
        return handleStrictParse$1.call(this, weekdayName, format, strict);
    }

    if (!this._weekdaysParse) {
        this._weekdaysParse = [];
        this._minWeekdaysParse = [];
        this._shortWeekdaysParse = [];
        this._fullWeekdaysParse = [];
    }

    for (i = 0; i < 7; i++) {
        // make the regex if we don't have it already

        mom = createUTC([2000, 1]).day(i);
        if (strict && !this._fullWeekdaysParse[i]) {
            this._fullWeekdaysParse[i] = new RegExp('^' + this.weekdays(mom, '').replace('.', '\.?') + '$', 'i');
            this._shortWeekdaysParse[i] = new RegExp('^' + this.weekdaysShort(mom, '').replace('.', '\.?') + '$', 'i');
            this._minWeekdaysParse[i] = new RegExp('^' + this.weekdaysMin(mom, '').replace('.', '\.?') + '$', 'i');
        }
        if (!this._weekdaysParse[i]) {
            regex = '^' + this.weekdays(mom, '') + '|^' + this.weekdaysShort(mom, '') + '|^' + this.weekdaysMin(mom, '');
            this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');
        }
        // test the regex
        if (strict && format === 'dddd' && this._fullWeekdaysParse[i].test(weekdayName)) {
            return i;
        } else if (strict && format === 'ddd' && this._shortWeekdaysParse[i].test(weekdayName)) {
            return i;
        } else if (strict && format === 'dd' && this._minWeekdaysParse[i].test(weekdayName)) {
            return i;
        } else if (!strict && this._weekdaysParse[i].test(weekdayName)) {
            return i;
        }
    }
}

// MOMENTS

function getSetDayOfWeek (input) {
    if (!this.isValid()) {
        return input != null ? this : NaN;
    }
    var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
    if (input != null) {
        input = parseWeekday(input, this.localeData());
        return this.add(input - day, 'd');
    } else {
        return day;
    }
}

function getSetLocaleDayOfWeek (input) {
    if (!this.isValid()) {
        return input != null ? this : NaN;
    }
    var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
    return input == null ? weekday : this.add(input - weekday, 'd');
}

function getSetISODayOfWeek (input) {
    if (!this.isValid()) {
        return input != null ? this : NaN;
    }

    // behaves the same as moment#day except
    // as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)
    // as a setter, sunday should belong to the previous week.

    if (input != null) {
        var weekday = parseIsoWeekday(input, this.localeData());
        return this.day(this.day() % 7 ? weekday : weekday - 7);
    } else {
        return this.day() || 7;
    }
}

var defaultWeekdaysRegex = matchWord;
function weekdaysRegex (isStrict) {
    if (this._weekdaysParseExact) {
        if (!hasOwnProp(this, '_weekdaysRegex')) {
            computeWeekdaysParse.call(this);
        }
        if (isStrict) {
            return this._weekdaysStrictRegex;
        } else {
            return this._weekdaysRegex;
        }
    } else {
        if (!hasOwnProp(this, '_weekdaysRegex')) {
            this._weekdaysRegex = defaultWeekdaysRegex;
        }
        return this._weekdaysStrictRegex && isStrict ?
            this._weekdaysStrictRegex : this._weekdaysRegex;
    }
}

var defaultWeekdaysShortRegex = matchWord;
function weekdaysShortRegex (isStrict) {
    if (this._weekdaysParseExact) {
        if (!hasOwnProp(this, '_weekdaysRegex')) {
            computeWeekdaysParse.call(this);
        }
        if (isStrict) {
            return this._weekdaysShortStrictRegex;
        } else {
            return this._weekdaysShortRegex;
        }
    } else {
        if (!hasOwnProp(this, '_weekdaysShortRegex')) {
            this._weekdaysShortRegex = defaultWeekdaysShortRegex;
        }
        return this._weekdaysShortStrictRegex && isStrict ?
            this._weekdaysShortStrictRegex : this._weekdaysShortRegex;
    }
}

var defaultWeekdaysMinRegex = matchWord;
function weekdaysMinRegex (isStrict) {
    if (this._weekdaysParseExact) {
        if (!hasOwnProp(this, '_weekdaysRegex')) {
            computeWeekdaysParse.call(this);
        }
        if (isStrict) {
            return this._weekdaysMinStrictRegex;
        } else {
            return this._weekdaysMinRegex;
        }
    } else {
        if (!hasOwnProp(this, '_weekdaysMinRegex')) {
            this._weekdaysMinRegex = defaultWeekdaysMinRegex;
        }
        return this._weekdaysMinStrictRegex && isStrict ?
            this._weekdaysMinStrictRegex : this._weekdaysMinRegex;
    }
}


function computeWeekdaysParse () {
    function cmpLenRev(a, b) {
        return b.length - a.length;
    }

    var minPieces = [], shortPieces = [], longPieces = [], mixedPieces = [],
        i, mom, minp, shortp, longp;
    for (i = 0; i < 7; i++) {
        // make the regex if we don't have it already
        mom = createUTC([2000, 1]).day(i);
        minp = this.weekdaysMin(mom, '');
        shortp = this.weekdaysShort(mom, '');
        longp = this.weekdays(mom, '');
        minPieces.push(minp);
        shortPieces.push(shortp);
        longPieces.push(longp);
        mixedPieces.push(minp);
        mixedPieces.push(shortp);
        mixedPieces.push(longp);
    }
    // Sorting makes sure if one weekday (or abbr) is a prefix of another it
    // will match the longer piece.
    minPieces.sort(cmpLenRev);
    shortPieces.sort(cmpLenRev);
    longPieces.sort(cmpLenRev);
    mixedPieces.sort(cmpLenRev);
    for (i = 0; i < 7; i++) {
        shortPieces[i] = regexEscape(shortPieces[i]);
        longPieces[i] = regexEscape(longPieces[i]);
        mixedPieces[i] = regexEscape(mixedPieces[i]);
    }

    this._weekdaysRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
    this._weekdaysShortRegex = this._weekdaysRegex;
    this._weekdaysMinRegex = this._weekdaysRegex;

    this._weekdaysStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
    this._weekdaysShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
    this._weekdaysMinStrictRegex = new RegExp('^(' + minPieces.join('|') + ')', 'i');
}

// FORMATTING

function hFormat() {
    return this.hours() % 12 || 12;
}

function kFormat() {
    return this.hours() || 24;
}

addFormatToken('H', ['HH', 2], 0, 'hour');
addFormatToken('h', ['hh', 2], 0, hFormat);
addFormatToken('k', ['kk', 2], 0, kFormat);

addFormatToken('hmm', 0, 0, function () {
    return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2);
});

addFormatToken('hmmss', 0, 0, function () {
    return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2) +
        zeroFill(this.seconds(), 2);
});

addFormatToken('Hmm', 0, 0, function () {
    return '' + this.hours() + zeroFill(this.minutes(), 2);
});

addFormatToken('Hmmss', 0, 0, function () {
    return '' + this.hours() + zeroFill(this.minutes(), 2) +
        zeroFill(this.seconds(), 2);
});

function meridiem (token, lowercase) {
    addFormatToken(token, 0, 0, function () {
        return this.localeData().meridiem(this.hours(), this.minutes(), lowercase);
    });
}

meridiem('a', true);
meridiem('A', false);

// ALIASES

addUnitAlias('hour', 'h');

// PRIORITY
addUnitPriority('hour', 13);

// PARSING

function matchMeridiem (isStrict, locale) {
    return locale._meridiemParse;
}

addRegexToken('a',  matchMeridiem);
addRegexToken('A',  matchMeridiem);
addRegexToken('H',  match1to2);
addRegexToken('h',  match1to2);
addRegexToken('k',  match1to2);
addRegexToken('HH', match1to2, match2);
addRegexToken('hh', match1to2, match2);
addRegexToken('kk', match1to2, match2);

addRegexToken('hmm', match3to4);
addRegexToken('hmmss', match5to6);
addRegexToken('Hmm', match3to4);
addRegexToken('Hmmss', match5to6);

addParseToken(['H', 'HH'], HOUR);
addParseToken(['k', 'kk'], function (input, array, config) {
    var kInput = toInt(input);
    array[HOUR] = kInput === 24 ? 0 : kInput;
});
addParseToken(['a', 'A'], function (input, array, config) {
    config._isPm = config._locale.isPM(input);
    config._meridiem = input;
});
addParseToken(['h', 'hh'], function (input, array, config) {
    array[HOUR] = toInt(input);
    getParsingFlags(config).bigHour = true;
});
addParseToken('hmm', function (input, array, config) {
    var pos = input.length - 2;
    array[HOUR] = toInt(input.substr(0, pos));
    array[MINUTE] = toInt(input.substr(pos));
    getParsingFlags(config).bigHour = true;
});
addParseToken('hmmss', function (input, array, config) {
    var pos1 = input.length - 4;
    var pos2 = input.length - 2;
    array[HOUR] = toInt(input.substr(0, pos1));
    array[MINUTE] = toInt(input.substr(pos1, 2));
    array[SECOND] = toInt(input.substr(pos2));
    getParsingFlags(config).bigHour = true;
});
addParseToken('Hmm', function (input, array, config) {
    var pos = input.length - 2;
    array[HOUR] = toInt(input.substr(0, pos));
    array[MINUTE] = toInt(input.substr(pos));
});
addParseToken('Hmmss', function (input, array, config) {
    var pos1 = input.length - 4;
    var pos2 = input.length - 2;
    array[HOUR] = toInt(input.substr(0, pos1));
    array[MINUTE] = toInt(input.substr(pos1, 2));
    array[SECOND] = toInt(input.substr(pos2));
});

// LOCALES

function localeIsPM (input) {
    // IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays
    // Using charAt should be more compatible.
    return ((input + '').toLowerCase().charAt(0) === 'p');
}

var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i;
function localeMeridiem (hours, minutes, isLower) {
    if (hours > 11) {
        return isLower ? 'pm' : 'PM';
    } else {
        return isLower ? 'am' : 'AM';
    }
}


// MOMENTS

// Setting the hour should keep the time, because the user explicitly
// specified which hour he wants. So trying to maintain the same hour (in
// a new timezone) makes sense. Adding/subtracting hours does not follow
// this rule.
var getSetHour = makeGetSet('Hours', true);

// months
// week
// weekdays
// meridiem
var baseConfig = {
    calendar: defaultCalendar,
    longDateFormat: defaultLongDateFormat,
    invalidDate: defaultInvalidDate,
    ordinal: defaultOrdinal,
    dayOfMonthOrdinalParse: defaultDayOfMonthOrdinalParse,
    relativeTime: defaultRelativeTime,

    months: defaultLocaleMonths,
    monthsShort: defaultLocaleMonthsShort,

    week: defaultLocaleWeek,

    weekdays: defaultLocaleWeekdays,
    weekdaysMin: defaultLocaleWeekdaysMin,
    weekdaysShort: defaultLocaleWeekdaysShort,

    meridiemParse: defaultLocaleMeridiemParse
};

// internal storage for locale config files
var locales = {};
var localeFamilies = {};
var globalLocale;

function normalizeLocale(key) {
    return key ? key.toLowerCase().replace('_', '-') : key;
}

// pick the locale from the array
// try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each
// substring from most specific to least, but move to the next array item if it's a more specific variant than the current root
function chooseLocale(names) {
    var i = 0, j, next, locale, split;

    while (i < names.length) {
        split = normalizeLocale(names[i]).split('-');
        j = split.length;
        next = normalizeLocale(names[i + 1]);
        next = next ? next.split('-') : null;
        while (j > 0) {
            locale = loadLocale(split.slice(0, j).join('-'));
            if (locale) {
                return locale;
            }
            if (next && next.length >= j && compareArrays(split, next, true) >= j - 1) {
                //the next array item is better than a shallower substring of this one
                break;
            }
            j--;
        }
        i++;
    }
    return null;
}

function loadLocale(name) {
    var oldLocale = null;
    // TODO: Find a better way to register and load all the locales in Node
    if (!locales[name] && (typeof module !== 'undefined') &&
            module && module.exports) {
        try {
            oldLocale = globalLocale._abbr;
            require('./locale/' + name);
            // because defineLocale currently also sets the global locale, we
            // want to undo that for lazy loaded locales
            getSetGlobalLocale(oldLocale);
        } catch (e) { }
    }
    return locales[name];
}

// This function will load locale and then set the global locale.  If
// no arguments are passed in, it will simply return the current global
// locale key.
function getSetGlobalLocale (key, values) {
    var data;
    if (key) {
        if (isUndefined(values)) {
            data = getLocale(key);
        }
        else {
            data = defineLocale(key, values);
        }

        if (data) {
            // moment.duration._locale = moment._locale = data;
            globalLocale = data;
        }
    }

    return globalLocale._abbr;
}

function defineLocale (name, config) {
    if (config !== null) {
        var parentConfig = baseConfig;
        config.abbr = name;
        if (locales[name] != null) {
            deprecateSimple('defineLocaleOverride',
                    'use moment.updateLocale(localeName, config) to change ' +
                    'an existing locale. moment.defineLocale(localeName, ' +
                    'config) should only be used for creating a new locale ' +
                    'See http://momentjs.com/guides/#/warnings/define-locale/ for more info.');
            parentConfig = locales[name]._config;
        } else if (config.parentLocale != null) {
            if (locales[config.parentLocale] != null) {
                parentConfig = locales[config.parentLocale]._config;
            } else {
                if (!localeFamilies[config.parentLocale]) {
                    localeFamilies[config.parentLocale] = [];
                }
                localeFamilies[config.parentLocale].push({
                    name: name,
                    config: config
                });
                return null;
            }
        }
        locales[name] = new Locale(mergeConfigs(parentConfig, config));

        if (localeFamilies[name]) {
            localeFamilies[name].forEach(function (x) {
                defineLocale(x.name, x.config);
            });
        }

        // backwards compat for now: also set the locale
        // make sure we set the locale AFTER all child locales have been
        // created, so we won't end up with the child locale set.
        getSetGlobalLocale(name);


        return locales[name];
    } else {
        // useful for testing
        delete locales[name];
        return null;
    }
}

function updateLocale(name, config) {
    if (config != null) {
        var locale, parentConfig = baseConfig;
        // MERGE
        if (locales[name] != null) {
            parentConfig = locales[name]._config;
        }
        config = mergeConfigs(parentConfig, config);
        locale = new Locale(config);
        locale.parentLocale = locales[name];
        locales[name] = locale;

        // backwards compat for now: also set the locale
        getSetGlobalLocale(name);
    } else {
        // pass null for config to unupdate, useful for tests
        if (locales[name] != null) {
            if (locales[name].parentLocale != null) {
                locales[name] = locales[name].parentLocale;
            } else if (locales[name] != null) {
                delete locales[name];
            }
        }
    }
    return locales[name];
}

// returns locale data
function getLocale (key) {
    var locale;

    if (key && key._locale && key._locale._abbr) {
        key = key._locale._abbr;
    }

    if (!key) {
        return globalLocale;
    }

    if (!isArray(key)) {
        //short-circuit everything else
        locale = loadLocale(key);
        if (locale) {
            return locale;
        }
        key = [key];
    }

    return chooseLocale(key);
}

function listLocales() {
    return keys$1(locales);
}

function checkOverflow (m) {
    var overflow;
    var a = m._a;

    if (a && getParsingFlags(m).overflow === -2) {
        overflow =
            a[MONTH]       < 0 || a[MONTH]       > 11  ? MONTH :
            a[DATE]        < 1 || a[DATE]        > daysInMonth(a[YEAR], a[MONTH]) ? DATE :
            a[HOUR]        < 0 || a[HOUR]        > 24 || (a[HOUR] === 24 && (a[MINUTE] !== 0 || a[SECOND] !== 0 || a[MILLISECOND] !== 0)) ? HOUR :
            a[MINUTE]      < 0 || a[MINUTE]      > 59  ? MINUTE :
            a[SECOND]      < 0 || a[SECOND]      > 59  ? SECOND :
            a[MILLISECOND] < 0 || a[MILLISECOND] > 999 ? MILLISECOND :
            -1;

        if (getParsingFlags(m)._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) {
            overflow = DATE;
        }
        if (getParsingFlags(m)._overflowWeeks && overflow === -1) {
            overflow = WEEK;
        }
        if (getParsingFlags(m)._overflowWeekday && overflow === -1) {
            overflow = WEEKDAY;
        }

        getParsingFlags(m).overflow = overflow;
    }

    return m;
}

// iso 8601 regex
// 0000-00-00 0000-W00 or 0000-W00-0 + T + 00 or 00:00 or 00:00:00 or 00:00:00.000 + +00:00 or +0000 or +00)
var extendedIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/;
var basicIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/;

var tzRegex = /Z|[+-]\d\d(?::?\d\d)?/;

var isoDates = [
    ['YYYYYY-MM-DD', /[+-]\d{6}-\d\d-\d\d/],
    ['YYYY-MM-DD', /\d{4}-\d\d-\d\d/],
    ['GGGG-[W]WW-E', /\d{4}-W\d\d-\d/],
    ['GGGG-[W]WW', /\d{4}-W\d\d/, false],
    ['YYYY-DDD', /\d{4}-\d{3}/],
    ['YYYY-MM', /\d{4}-\d\d/, false],
    ['YYYYYYMMDD', /[+-]\d{10}/],
    ['YYYYMMDD', /\d{8}/],
    // YYYYMM is NOT allowed by the standard
    ['GGGG[W]WWE', /\d{4}W\d{3}/],
    ['GGGG[W]WW', /\d{4}W\d{2}/, false],
    ['YYYYDDD', /\d{7}/]
];

// iso time formats and regexes
var isoTimes = [
    ['HH:mm:ss.SSSS', /\d\d:\d\d:\d\d\.\d+/],
    ['HH:mm:ss,SSSS', /\d\d:\d\d:\d\d,\d+/],
    ['HH:mm:ss', /\d\d:\d\d:\d\d/],
    ['HH:mm', /\d\d:\d\d/],
    ['HHmmss.SSSS', /\d\d\d\d\d\d\.\d+/],
    ['HHmmss,SSSS', /\d\d\d\d\d\d,\d+/],
    ['HHmmss', /\d\d\d\d\d\d/],
    ['HHmm', /\d\d\d\d/],
    ['HH', /\d\d/]
];

var aspNetJsonRegex = /^\/?Date\((\-?\d+)/i;

// date from iso format
function configFromISO(config) {
    var i, l,
        string = config._i,
        match = extendedIsoRegex.exec(string) || basicIsoRegex.exec(string),
        allowTime, dateFormat, timeFormat, tzFormat;

    if (match) {
        getParsingFlags(config).iso = true;

        for (i = 0, l = isoDates.length; i < l; i++) {
            if (isoDates[i][1].exec(match[1])) {
                dateFormat = isoDates[i][0];
                allowTime = isoDates[i][2] !== false;
                break;
            }
        }
        if (dateFormat == null) {
            config._isValid = false;
            return;
        }
        if (match[3]) {
            for (i = 0, l = isoTimes.length; i < l; i++) {
                if (isoTimes[i][1].exec(match[3])) {
                    // match[2] should be 'T' or space
                    timeFormat = (match[2] || ' ') + isoTimes[i][0];
                    break;
                }
            }
            if (timeFormat == null) {
                config._isValid = false;
                return;
            }
        }
        if (!allowTime && timeFormat != null) {
            config._isValid = false;
            return;
        }
        if (match[4]) {
            if (tzRegex.exec(match[4])) {
                tzFormat = 'Z';
            } else {
                config._isValid = false;
                return;
            }
        }
        config._f = dateFormat + (timeFormat || '') + (tzFormat || '');
        configFromStringAndFormat(config);
    } else {
        config._isValid = false;
    }
}

// RFC 2822 regex: For details see https://tools.ietf.org/html/rfc2822#section-3.3
var basicRfcRegex = /^((?:Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d?\d\s(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(?:\d\d)?\d\d\s)(\d\d:\d\d)(\:\d\d)?(\s(?:UT|GMT|[ECMP][SD]T|[A-IK-Za-ik-z]|[+-]\d{4}))$/;

// date and time from ref 2822 format
function configFromRFC2822(config) {
    var string, match, dayFormat,
        dateFormat, timeFormat, tzFormat;
    var timezones = {
        ' GMT': ' +0000',
        ' EDT': ' -0400',
        ' EST': ' -0500',
        ' CDT': ' -0500',
        ' CST': ' -0600',
        ' MDT': ' -0600',
        ' MST': ' -0700',
        ' PDT': ' -0700',
        ' PST': ' -0800'
    };
    var military = 'YXWVUTSRQPONZABCDEFGHIKLM';
    var timezone, timezoneIndex;

    string = config._i
        .replace(/\([^\)]*\)|[\n\t]/g, ' ') // Remove comments and folding whitespace
        .replace(/(\s\s+)/g, ' ') // Replace multiple-spaces with a single space
        .replace(/^\s|\s$/g, ''); // Remove leading and trailing spaces
    match = basicRfcRegex.exec(string);

    if (match) {
        dayFormat = match[1] ? 'ddd' + ((match[1].length === 5) ? ', ' : ' ') : '';
        dateFormat = 'D MMM ' + ((match[2].length > 10) ? 'YYYY ' : 'YY ');
        timeFormat = 'HH:mm' + (match[4] ? ':ss' : '');

        // TODO: Replace the vanilla JS Date object with an indepentent day-of-week check.
        if (match[1]) { // day of week given
            var momentDate = new Date(match[2]);
            var momentDay = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][momentDate.getDay()];

            if (match[1].substr(0,3) !== momentDay) {
                getParsingFlags(config).weekdayMismatch = true;
                config._isValid = false;
                return;
            }
        }

        switch (match[5].length) {
            case 2: // military
                if (timezoneIndex === 0) {
                    timezone = ' +0000';
                } else {
                    timezoneIndex = military.indexOf(match[5][1].toUpperCase()) - 12;
                    timezone = ((timezoneIndex < 0) ? ' -' : ' +') +
                        (('' + timezoneIndex).replace(/^-?/, '0')).match(/..$/)[0] + '00';
                }
                break;
            case 4: // Zone
                timezone = timezones[match[5]];
                break;
            default: // UT or +/-9999
                timezone = timezones[' GMT'];
        }
        match[5] = timezone;
        config._i = match.splice(1).join('');
        tzFormat = ' ZZ';
        config._f = dayFormat + dateFormat + timeFormat + tzFormat;
        configFromStringAndFormat(config);
        getParsingFlags(config).rfc2822 = true;
    } else {
        config._isValid = false;
    }
}

// date from iso format or fallback
function configFromString(config) {
    var matched = aspNetJsonRegex.exec(config._i);

    if (matched !== null) {
        config._d = new Date(+matched[1]);
        return;
    }

    configFromISO(config);
    if (config._isValid === false) {
        delete config._isValid;
    } else {
        return;
    }

    configFromRFC2822(config);
    if (config._isValid === false) {
        delete config._isValid;
    } else {
        return;
    }

    // Final attempt, use Input Fallback
    hooks.createFromInputFallback(config);
}

hooks.createFromInputFallback = deprecate(
    'value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), ' +
    'which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are ' +
    'discouraged and will be removed in an upcoming major release. Please refer to ' +
    'http://momentjs.com/guides/#/warnings/js-date/ for more info.',
    function (config) {
        config._d = new Date(config._i + (config._useUTC ? ' UTC' : ''));
    }
);

// Pick the first defined of two or three arguments.
function defaults(a, b, c) {
    if (a != null) {
        return a;
    }
    if (b != null) {
        return b;
    }
    return c;
}

function currentDateArray(config) {
    // hooks is actually the exported moment object
    var nowValue = new Date(hooks.now());
    if (config._useUTC) {
        return [nowValue.getUTCFullYear(), nowValue.getUTCMonth(), nowValue.getUTCDate()];
    }
    return [nowValue.getFullYear(), nowValue.getMonth(), nowValue.getDate()];
}

// convert an array to a date.
// the array should mirror the parameters below
// note: all values past the year are optional and will default to the lowest possible value.
// [year, month, day , hour, minute, second, millisecond]
function configFromArray (config) {
    var i, date, input = [], currentDate, yearToUse;

    if (config._d) {
        return;
    }

    currentDate = currentDateArray(config);

    //compute day of the year from weeks and weekdays
    if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
        dayOfYearFromWeekInfo(config);
    }

    //if the day of the year is set, figure out what it is
    if (config._dayOfYear != null) {
        yearToUse = defaults(config._a[YEAR], currentDate[YEAR]);

        if (config._dayOfYear > daysInYear(yearToUse) || config._dayOfYear === 0) {
            getParsingFlags(config)._overflowDayOfYear = true;
        }

        date = createUTCDate(yearToUse, 0, config._dayOfYear);
        config._a[MONTH] = date.getUTCMonth();
        config._a[DATE] = date.getUTCDate();
    }

    // Default to current date.
    // * if no year, month, day of month are given, default to today
    // * if day of month is given, default month and year
    // * if month is given, default only year
    // * if year is given, don't default anything
    for (i = 0; i < 3 && config._a[i] == null; ++i) {
        config._a[i] = input[i] = currentDate[i];
    }

    // Zero out whatever was not defaulted, including time
    for (; i < 7; i++) {
        config._a[i] = input[i] = (config._a[i] == null) ? (i === 2 ? 1 : 0) : config._a[i];
    }

    // Check for 24:00:00.000
    if (config._a[HOUR] === 24 &&
            config._a[MINUTE] === 0 &&
            config._a[SECOND] === 0 &&
            config._a[MILLISECOND] === 0) {
        config._nextDay = true;
        config._a[HOUR] = 0;
    }

    config._d = (config._useUTC ? createUTCDate : createDate).apply(null, input);
    // Apply timezone offset from input. The actual utcOffset can be changed
    // with parseZone.
    if (config._tzm != null) {
        config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
    }

    if (config._nextDay) {
        config._a[HOUR] = 24;
    }
}

function dayOfYearFromWeekInfo(config) {
    var w, weekYear, week, weekday, dow, doy, temp, weekdayOverflow;

    w = config._w;
    if (w.GG != null || w.W != null || w.E != null) {
        dow = 1;
        doy = 4;

        // TODO: We need to take the current isoWeekYear, but that depends on
        // how we interpret now (local, utc, fixed offset). So create
        // a now version of current config (take local/utc/offset flags, and
        // create now).
        weekYear = defaults(w.GG, config._a[YEAR], weekOfYear(createLocal(), 1, 4).year);
        week = defaults(w.W, 1);
        weekday = defaults(w.E, 1);
        if (weekday < 1 || weekday > 7) {
            weekdayOverflow = true;
        }
    } else {
        dow = config._locale._week.dow;
        doy = config._locale._week.doy;

        var curWeek = weekOfYear(createLocal(), dow, doy);

        weekYear = defaults(w.gg, config._a[YEAR], curWeek.year);

        // Default to current week.
        week = defaults(w.w, curWeek.week);

        if (w.d != null) {
            // weekday -- low day numbers are considered next week
            weekday = w.d;
            if (weekday < 0 || weekday > 6) {
                weekdayOverflow = true;
            }
        } else if (w.e != null) {
            // local weekday -- counting starts from begining of week
            weekday = w.e + dow;
            if (w.e < 0 || w.e > 6) {
                weekdayOverflow = true;
            }
        } else {
            // default to begining of week
            weekday = dow;
        }
    }
    if (week < 1 || week > weeksInYear(weekYear, dow, doy)) {
        getParsingFlags(config)._overflowWeeks = true;
    } else if (weekdayOverflow != null) {
        getParsingFlags(config)._overflowWeekday = true;
    } else {
        temp = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy);
        config._a[YEAR] = temp.year;
        config._dayOfYear = temp.dayOfYear;
    }
}

// constant that refers to the ISO standard
hooks.ISO_8601 = function () {};

// constant that refers to the RFC 2822 form
hooks.RFC_2822 = function () {};

// date from string and format string
function configFromStringAndFormat(config) {
    // TODO: Move this to another part of the creation flow to prevent circular deps
    if (config._f === hooks.ISO_8601) {
        configFromISO(config);
        return;
    }
    if (config._f === hooks.RFC_2822) {
        configFromRFC2822(config);
        return;
    }
    config._a = [];
    getParsingFlags(config).empty = true;

    // This array is used to make a Date, either with `new Date` or `Date.UTC`
    var string = '' + config._i,
        i, parsedInput, tokens, token, skipped,
        stringLength = string.length,
        totalParsedInputLength = 0;

    tokens = expandFormat(config._f, config._locale).match(formattingTokens) || [];

    for (i = 0; i < tokens.length; i++) {
        token = tokens[i];
        parsedInput = (string.match(getParseRegexForToken(token, config)) || [])[0];
        // console.log('token', token, 'parsedInput', parsedInput,
        //         'regex', getParseRegexForToken(token, config));
        if (parsedInput) {
            skipped = string.substr(0, string.indexOf(parsedInput));
            if (skipped.length > 0) {
                getParsingFlags(config).unusedInput.push(skipped);
            }
            string = string.slice(string.indexOf(parsedInput) + parsedInput.length);
            totalParsedInputLength += parsedInput.length;
        }
        // don't parse if it's not a known token
        if (formatTokenFunctions[token]) {
            if (parsedInput) {
                getParsingFlags(config).empty = false;
            }
            else {
                getParsingFlags(config).unusedTokens.push(token);
            }
            addTimeToArrayFromToken(token, parsedInput, config);
        }
        else if (config._strict && !parsedInput) {
            getParsingFlags(config).unusedTokens.push(token);
        }
    }

    // add remaining unparsed input length to the string
    getParsingFlags(config).charsLeftOver = stringLength - totalParsedInputLength;
    if (string.length > 0) {
        getParsingFlags(config).unusedInput.push(string);
    }

    // clear _12h flag if hour is <= 12
    if (config._a[HOUR] <= 12 &&
        getParsingFlags(config).bigHour === true &&
        config._a[HOUR] > 0) {
        getParsingFlags(config).bigHour = undefined;
    }

    getParsingFlags(config).parsedDateParts = config._a.slice(0);
    getParsingFlags(config).meridiem = config._meridiem;
    // handle meridiem
    config._a[HOUR] = meridiemFixWrap(config._locale, config._a[HOUR], config._meridiem);

    configFromArray(config);
    checkOverflow(config);
}


function meridiemFixWrap (locale, hour, meridiem) {
    var isPm;

    if (meridiem == null) {
        // nothing to do
        return hour;
    }
    if (locale.meridiemHour != null) {
        return locale.meridiemHour(hour, meridiem);
    } else if (locale.isPM != null) {
        // Fallback
        isPm = locale.isPM(meridiem);
        if (isPm && hour < 12) {
            hour += 12;
        }
        if (!isPm && hour === 12) {
            hour = 0;
        }
        return hour;
    } else {
        // this is not supposed to happen
        return hour;
    }
}

// date from string and array of format strings
function configFromStringAndArray(config) {
    var tempConfig,
        bestMoment,

        scoreToBeat,
        i,
        currentScore;

    if (config._f.length === 0) {
        getParsingFlags(config).invalidFormat = true;
        config._d = new Date(NaN);
        return;
    }

    for (i = 0; i < config._f.length; i++) {
        currentScore = 0;
        tempConfig = copyConfig({}, config);
        if (config._useUTC != null) {
            tempConfig._useUTC = config._useUTC;
        }
        tempConfig._f = config._f[i];
        configFromStringAndFormat(tempConfig);

        if (!isValid(tempConfig)) {
            continue;
        }

        // if there is any input that was not parsed add a penalty for that format
        currentScore += getParsingFlags(tempConfig).charsLeftOver;

        //or tokens
        currentScore += getParsingFlags(tempConfig).unusedTokens.length * 10;

        getParsingFlags(tempConfig).score = currentScore;

        if (scoreToBeat == null || currentScore < scoreToBeat) {
            scoreToBeat = currentScore;
            bestMoment = tempConfig;
        }
    }

    extend(config, bestMoment || tempConfig);
}

function configFromObject(config) {
    if (config._d) {
        return;
    }

    var i = normalizeObjectUnits(config._i);
    config._a = map([i.year, i.month, i.day || i.date, i.hour, i.minute, i.second, i.millisecond], function (obj) {
        return obj && parseInt(obj, 10);
    });

    configFromArray(config);
}

function createFromConfig (config) {
    var res = new Moment(checkOverflow(prepareConfig(config)));
    if (res._nextDay) {
        // Adding is smart enough around DST
        res.add(1, 'd');
        res._nextDay = undefined;
    }

    return res;
}

function prepareConfig (config) {
    var input = config._i,
        format = config._f;

    config._locale = config._locale || getLocale(config._l);

    if (input === null || (format === undefined && input === '')) {
        return createInvalid({nullInput: true});
    }

    if (typeof input === 'string') {
        config._i = input = config._locale.preparse(input);
    }

    if (isMoment(input)) {
        return new Moment(checkOverflow(input));
    } else if (isDate(input)) {
        config._d = input;
    } else if (isArray(format)) {
        configFromStringAndArray(config);
    } else if (format) {
        configFromStringAndFormat(config);
    }  else {
        configFromInput(config);
    }

    if (!isValid(config)) {
        config._d = null;
    }

    return config;
}

function configFromInput(config) {
    var input = config._i;
    if (isUndefined(input)) {
        config._d = new Date(hooks.now());
    } else if (isDate(input)) {
        config._d = new Date(input.valueOf());
    } else if (typeof input === 'string') {
        configFromString(config);
    } else if (isArray(input)) {
        config._a = map(input.slice(0), function (obj) {
            return parseInt(obj, 10);
        });
        configFromArray(config);
    } else if (isObject(input)) {
        configFromObject(config);
    } else if (isNumber(input)) {
        // from milliseconds
        config._d = new Date(input);
    } else {
        hooks.createFromInputFallback(config);
    }
}

function createLocalOrUTC (input, format, locale, strict, isUTC) {
    var c = {};

    if (locale === true || locale === false) {
        strict = locale;
        locale = undefined;
    }

    if ((isObject(input) && isObjectEmpty(input)) ||
            (isArray(input) && input.length === 0)) {
        input = undefined;
    }
    // object construction must be done this way.
    // https://github.com/moment/moment/issues/1423
    c._isAMomentObject = true;
    c._useUTC = c._isUTC = isUTC;
    c._l = locale;
    c._i = input;
    c._f = format;
    c._strict = strict;

    return createFromConfig(c);
}

function createLocal (input, format, locale, strict) {
    return createLocalOrUTC(input, format, locale, strict, false);
}

var prototypeMin = deprecate(
    'moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/',
    function () {
        var other = createLocal.apply(null, arguments);
        if (this.isValid() && other.isValid()) {
            return other < this ? this : other;
        } else {
            return createInvalid();
        }
    }
);

var prototypeMax = deprecate(
    'moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/',
    function () {
        var other = createLocal.apply(null, arguments);
        if (this.isValid() && other.isValid()) {
            return other > this ? this : other;
        } else {
            return createInvalid();
        }
    }
);

// Pick a moment m from moments so that m[fn](other) is true for all
// other. This relies on the function fn to be transitive.
//
// moments should either be an array of moment objects or an array, whose
// first element is an array of moment objects.
function pickBy(fn, moments) {
    var res, i;
    if (moments.length === 1 && isArray(moments[0])) {
        moments = moments[0];
    }
    if (!moments.length) {
        return createLocal();
    }
    res = moments[0];
    for (i = 1; i < moments.length; ++i) {
        if (!moments[i].isValid() || moments[i][fn](res)) {
            res = moments[i];
        }
    }
    return res;
}

// TODO: Use [].sort instead?
function min () {
    var args = [].slice.call(arguments, 0);

    return pickBy('isBefore', args);
}

function max () {
    var args = [].slice.call(arguments, 0);

    return pickBy('isAfter', args);
}

var now = function () {
    return Date.now ? Date.now() : +(new Date());
};

var ordering = ['year', 'quarter', 'month', 'week', 'day', 'hour', 'minute', 'second', 'millisecond'];

function isDurationValid(m) {
    for (var key in m) {
        if (!(ordering.indexOf(key) !== -1 && (m[key] == null || !isNaN(m[key])))) {
            return false;
        }
    }

    var unitHasDecimal = false;
    for (var i = 0; i < ordering.length; ++i) {
        if (m[ordering[i]]) {
            if (unitHasDecimal) {
                return false; // only allow non-integers for smallest unit
            }
            if (parseFloat(m[ordering[i]]) !== toInt(m[ordering[i]])) {
                unitHasDecimal = true;
            }
        }
    }

    return true;
}

function isValid$1() {
    return this._isValid;
}

function createInvalid$1() {
    return createDuration(NaN);
}

function Duration (duration) {
    var normalizedInput = normalizeObjectUnits(duration),
        years = normalizedInput.year || 0,
        quarters = normalizedInput.quarter || 0,
        months = normalizedInput.month || 0,
        weeks = normalizedInput.week || 0,
        days = normalizedInput.day || 0,
        hours = normalizedInput.hour || 0,
        minutes = normalizedInput.minute || 0,
        seconds = normalizedInput.second || 0,
        milliseconds = normalizedInput.millisecond || 0;

    this._isValid = isDurationValid(normalizedInput);

    // representation for dateAddRemove
    this._milliseconds = +milliseconds +
        seconds * 1e3 + // 1000
        minutes * 6e4 + // 1000 * 60
        hours * 1000 * 60 * 60; //using 1000 * 60 * 60 instead of 36e5 to avoid floating point rounding errors https://github.com/moment/moment/issues/2978
    // Because of dateAddRemove treats 24 hours as different from a
    // day when working around DST, we need to store them separately
    this._days = +days +
        weeks * 7;
    // It is impossible translate months into days without knowing
    // which months you are are talking about, so we have to store
    // it separately.
    this._months = +months +
        quarters * 3 +
        years * 12;

    this._data = {};

    this._locale = getLocale();

    this._bubble();
}

function isDuration (obj) {
    return obj instanceof Duration;
}

function absRound (number) {
    if (number < 0) {
        return Math.round(-1 * number) * -1;
    } else {
        return Math.round(number);
    }
}

// FORMATTING

function offset (token, separator) {
    addFormatToken(token, 0, 0, function () {
        var offset = this.utcOffset();
        var sign = '+';
        if (offset < 0) {
            offset = -offset;
            sign = '-';
        }
        return sign + zeroFill(~~(offset / 60), 2) + separator + zeroFill(~~(offset) % 60, 2);
    });
}

offset('Z', ':');
offset('ZZ', '');

// PARSING

addRegexToken('Z',  matchShortOffset);
addRegexToken('ZZ', matchShortOffset);
addParseToken(['Z', 'ZZ'], function (input, array, config) {
    config._useUTC = true;
    config._tzm = offsetFromString(matchShortOffset, input);
});

// HELPERS

// timezone chunker
// '+10:00' > ['10',  '00']
// '-1530'  > ['-15', '30']
var chunkOffset = /([\+\-]|\d\d)/gi;

function offsetFromString(matcher, string) {
    var matches = (string || '').match(matcher);

    if (matches === null) {
        return null;
    }

    var chunk   = matches[matches.length - 1] || [];
    var parts   = (chunk + '').match(chunkOffset) || ['-', 0, 0];
    var minutes = +(parts[1] * 60) + toInt(parts[2]);

    return minutes === 0 ?
      0 :
      parts[0] === '+' ? minutes : -minutes;
}

// Return a moment from input, that is local/utc/zone equivalent to model.
function cloneWithOffset(input, model) {
    var res, diff;
    if (model._isUTC) {
        res = model.clone();
        diff = (isMoment(input) || isDate(input) ? input.valueOf() : createLocal(input).valueOf()) - res.valueOf();
        // Use low-level api, because this fn is low-level api.
        res._d.setTime(res._d.valueOf() + diff);
        hooks.updateOffset(res, false);
        return res;
    } else {
        return createLocal(input).local();
    }
}

function getDateOffset (m) {
    // On Firefox.24 Date#getTimezoneOffset returns a floating point.
    // https://github.com/moment/moment/pull/1871
    return -Math.round(m._d.getTimezoneOffset() / 15) * 15;
}

// HOOKS

// This function will be called whenever a moment is mutated.
// It is intended to keep the offset in sync with the timezone.
hooks.updateOffset = function () {};

// MOMENTS

// keepLocalTime = true means only change the timezone, without
// affecting the local hour. So 5:31:26 +0300 --[utcOffset(2, true)]-->
// 5:31:26 +0200 It is possible that 5:31:26 doesn't exist with offset
// +0200, so we adjust the time as needed, to be valid.
//
// Keeping the time actually adds/subtracts (one hour)
// from the actual represented time. That is why we call updateOffset
// a second time. In case it wants us to change the offset again
// _changeInProgress == true case, then we have to adjust, because
// there is no such time in the given timezone.
function getSetOffset (input, keepLocalTime, keepMinutes) {
    var offset = this._offset || 0,
        localAdjust;
    if (!this.isValid()) {
        return input != null ? this : NaN;
    }
    if (input != null) {
        if (typeof input === 'string') {
            input = offsetFromString(matchShortOffset, input);
            if (input === null) {
                return this;
            }
        } else if (Math.abs(input) < 16 && !keepMinutes) {
            input = input * 60;
        }
        if (!this._isUTC && keepLocalTime) {
            localAdjust = getDateOffset(this);
        }
        this._offset = input;
        this._isUTC = true;
        if (localAdjust != null) {
            this.add(localAdjust, 'm');
        }
        if (offset !== input) {
            if (!keepLocalTime || this._changeInProgress) {
                addSubtract(this, createDuration(input - offset, 'm'), 1, false);
            } else if (!this._changeInProgress) {
                this._changeInProgress = true;
                hooks.updateOffset(this, true);
                this._changeInProgress = null;
            }
        }
        return this;
    } else {
        return this._isUTC ? offset : getDateOffset(this);
    }
}

function getSetZone (input, keepLocalTime) {
    if (input != null) {
        if (typeof input !== 'string') {
            input = -input;
        }

        this.utcOffset(input, keepLocalTime);

        return this;
    } else {
        return -this.utcOffset();
    }
}

function setOffsetToUTC (keepLocalTime) {
    return this.utcOffset(0, keepLocalTime);
}

function setOffsetToLocal (keepLocalTime) {
    if (this._isUTC) {
        this.utcOffset(0, keepLocalTime);
        this._isUTC = false;

        if (keepLocalTime) {
            this.subtract(getDateOffset(this), 'm');
        }
    }
    return this;
}

function setOffsetToParsedOffset () {
    if (this._tzm != null) {
        this.utcOffset(this._tzm, false, true);
    } else if (typeof this._i === 'string') {
        var tZone = offsetFromString(matchOffset, this._i);
        if (tZone != null) {
            this.utcOffset(tZone);
        }
        else {
            this.utcOffset(0, true);
        }
    }
    return this;
}

function hasAlignedHourOffset (input) {
    if (!this.isValid()) {
        return false;
    }
    input = input ? createLocal(input).utcOffset() : 0;

    return (this.utcOffset() - input) % 60 === 0;
}

function isDaylightSavingTime () {
    return (
        this.utcOffset() > this.clone().month(0).utcOffset() ||
        this.utcOffset() > this.clone().month(5).utcOffset()
    );
}

function isDaylightSavingTimeShifted () {
    if (!isUndefined(this._isDSTShifted)) {
        return this._isDSTShifted;
    }

    var c = {};

    copyConfig(c, this);
    c = prepareConfig(c);

    if (c._a) {
        var other = c._isUTC ? createUTC(c._a) : createLocal(c._a);
        this._isDSTShifted = this.isValid() &&
            compareArrays(c._a, other.toArray()) > 0;
    } else {
        this._isDSTShifted = false;
    }

    return this._isDSTShifted;
}

function isLocal () {
    return this.isValid() ? !this._isUTC : false;
}

function isUtcOffset () {
    return this.isValid() ? this._isUTC : false;
}

function isUtc () {
    return this.isValid() ? this._isUTC && this._offset === 0 : false;
}

// ASP.NET json date format regex
var aspNetRegex = /^(\-)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)(\.\d*)?)?$/;

// from http://docs.closure-library.googlecode.com/git/closure_goog_date_date.js.source.html
// somewhat more in line with 4.4.3.2 2004 spec, but allows decimal anywhere
// and further modified to allow for strings containing both week and day
var isoRegex = /^(-)?P(?:(-?[0-9,.]*)Y)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)W)?(?:(-?[0-9,.]*)D)?(?:T(?:(-?[0-9,.]*)H)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)S)?)?$/;

function createDuration (input, key) {
    var duration = input,
        // matching against regexp is expensive, do it on demand
        match = null,
        sign,
        ret,
        diffRes;

    if (isDuration(input)) {
        duration = {
            ms : input._milliseconds,
            d  : input._days,
            M  : input._months
        };
    } else if (isNumber(input)) {
        duration = {};
        if (key) {
            duration[key] = input;
        } else {
            duration.milliseconds = input;
        }
    } else if (!!(match = aspNetRegex.exec(input))) {
        sign = (match[1] === '-') ? -1 : 1;
        duration = {
            y  : 0,
            d  : toInt(match[DATE])                         * sign,
            h  : toInt(match[HOUR])                         * sign,
            m  : toInt(match[MINUTE])                       * sign,
            s  : toInt(match[SECOND])                       * sign,
            ms : toInt(absRound(match[MILLISECOND] * 1000)) * sign // the millisecond decimal point is included in the match
        };
    } else if (!!(match = isoRegex.exec(input))) {
        sign = (match[1] === '-') ? -1 : 1;
        duration = {
            y : parseIso(match[2], sign),
            M : parseIso(match[3], sign),
            w : parseIso(match[4], sign),
            d : parseIso(match[5], sign),
            h : parseIso(match[6], sign),
            m : parseIso(match[7], sign),
            s : parseIso(match[8], sign)
        };
    } else if (duration == null) {// checks for null or undefined
        duration = {};
    } else if (typeof duration === 'object' && ('from' in duration || 'to' in duration)) {
        diffRes = momentsDifference(createLocal(duration.from), createLocal(duration.to));

        duration = {};
        duration.ms = diffRes.milliseconds;
        duration.M = diffRes.months;
    }

    ret = new Duration(duration);

    if (isDuration(input) && hasOwnProp(input, '_locale')) {
        ret._locale = input._locale;
    }

    return ret;
}

createDuration.fn = Duration.prototype;
createDuration.invalid = createInvalid$1;

function parseIso (inp, sign) {
    // We'd normally use ~~inp for this, but unfortunately it also
    // converts floats to ints.
    // inp may be undefined, so careful calling replace on it.
    var res = inp && parseFloat(inp.replace(',', '.'));
    // apply sign while we're at it
    return (isNaN(res) ? 0 : res) * sign;
}

function positiveMomentsDifference(base, other) {
    var res = {milliseconds: 0, months: 0};

    res.months = other.month() - base.month() +
        (other.year() - base.year()) * 12;
    if (base.clone().add(res.months, 'M').isAfter(other)) {
        --res.months;
    }

    res.milliseconds = +other - +(base.clone().add(res.months, 'M'));

    return res;
}

function momentsDifference(base, other) {
    var res;
    if (!(base.isValid() && other.isValid())) {
        return {milliseconds: 0, months: 0};
    }

    other = cloneWithOffset(other, base);
    if (base.isBefore(other)) {
        res = positiveMomentsDifference(base, other);
    } else {
        res = positiveMomentsDifference(other, base);
        res.milliseconds = -res.milliseconds;
        res.months = -res.months;
    }

    return res;
}

// TODO: remove 'name' arg after deprecation is removed
function createAdder(direction, name) {
    return function (val, period) {
        var dur, tmp;
        //invert the arguments, but complain about it
        if (period !== null && !isNaN(+period)) {
            deprecateSimple(name, 'moment().' + name  + '(period, number) is deprecated. Please use moment().' + name + '(number, period). ' +
            'See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info.');
            tmp = val; val = period; period = tmp;
        }

        val = typeof val === 'string' ? +val : val;
        dur = createDuration(val, period);
        addSubtract(this, dur, direction);
        return this;
    };
}

function addSubtract (mom, duration, isAdding, updateOffset) {
    var milliseconds = duration._milliseconds,
        days = absRound(duration._days),
        months = absRound(duration._months);

    if (!mom.isValid()) {
        // No op
        return;
    }

    updateOffset = updateOffset == null ? true : updateOffset;

    if (milliseconds) {
        mom._d.setTime(mom._d.valueOf() + milliseconds * isAdding);
    }
    if (days) {
        set$1(mom, 'Date', get(mom, 'Date') + days * isAdding);
    }
    if (months) {
        setMonth(mom, get(mom, 'Month') + months * isAdding);
    }
    if (updateOffset) {
        hooks.updateOffset(mom, days || months);
    }
}

var add      = createAdder(1, 'add');
var subtract = createAdder(-1, 'subtract');

function getCalendarFormat(myMoment, now) {
    var diff = myMoment.diff(now, 'days', true);
    return diff < -6 ? 'sameElse' :
            diff < -1 ? 'lastWeek' :
            diff < 0 ? 'lastDay' :
            diff < 1 ? 'sameDay' :
            diff < 2 ? 'nextDay' :
            diff < 7 ? 'nextWeek' : 'sameElse';
}

function calendar$1 (time, formats) {
    // We want to compare the start of today, vs this.
    // Getting start-of-today depends on whether we're local/utc/offset or not.
    var now = time || createLocal(),
        sod = cloneWithOffset(now, this).startOf('day'),
        format = hooks.calendarFormat(this, sod) || 'sameElse';

    var output = formats && (isFunction(formats[format]) ? formats[format].call(this, now) : formats[format]);

    return this.format(output || this.localeData().calendar(format, this, createLocal(now)));
}

function clone () {
    return new Moment(this);
}

function isAfter (input, units) {
    var localInput = isMoment(input) ? input : createLocal(input);
    if (!(this.isValid() && localInput.isValid())) {
        return false;
    }
    units = normalizeUnits(!isUndefined(units) ? units : 'millisecond');
    if (units === 'millisecond') {
        return this.valueOf() > localInput.valueOf();
    } else {
        return localInput.valueOf() < this.clone().startOf(units).valueOf();
    }
}

function isBefore (input, units) {
    var localInput = isMoment(input) ? input : createLocal(input);
    if (!(this.isValid() && localInput.isValid())) {
        return false;
    }
    units = normalizeUnits(!isUndefined(units) ? units : 'millisecond');
    if (units === 'millisecond') {
        return this.valueOf() < localInput.valueOf();
    } else {
        return this.clone().endOf(units).valueOf() < localInput.valueOf();
    }
}

function isBetween (from, to, units, inclusivity) {
    inclusivity = inclusivity || '()';
    return (inclusivity[0] === '(' ? this.isAfter(from, units) : !this.isBefore(from, units)) &&
        (inclusivity[1] === ')' ? this.isBefore(to, units) : !this.isAfter(to, units));
}

function isSame (input, units) {
    var localInput = isMoment(input) ? input : createLocal(input),
        inputMs;
    if (!(this.isValid() && localInput.isValid())) {
        return false;
    }
    units = normalizeUnits(units || 'millisecond');
    if (units === 'millisecond') {
        return this.valueOf() === localInput.valueOf();
    } else {
        inputMs = localInput.valueOf();
        return this.clone().startOf(units).valueOf() <= inputMs && inputMs <= this.clone().endOf(units).valueOf();
    }
}

function isSameOrAfter (input, units) {
    return this.isSame(input, units) || this.isAfter(input,units);
}

function isSameOrBefore (input, units) {
    return this.isSame(input, units) || this.isBefore(input,units);
}

function diff (input, units, asFloat) {
    var that,
        zoneDelta,
        delta, output;

    if (!this.isValid()) {
        return NaN;
    }

    that = cloneWithOffset(input, this);

    if (!that.isValid()) {
        return NaN;
    }

    zoneDelta = (that.utcOffset() - this.utcOffset()) * 6e4;

    units = normalizeUnits(units);

    if (units === 'year' || units === 'month' || units === 'quarter') {
        output = monthDiff(this, that);
        if (units === 'quarter') {
            output = output / 3;
        } else if (units === 'year') {
            output = output / 12;
        }
    } else {
        delta = this - that;
        output = units === 'second' ? delta / 1e3 : // 1000
            units === 'minute' ? delta / 6e4 : // 1000 * 60
            units === 'hour' ? delta / 36e5 : // 1000 * 60 * 60
            units === 'day' ? (delta - zoneDelta) / 864e5 : // 1000 * 60 * 60 * 24, negate dst
            units === 'week' ? (delta - zoneDelta) / 6048e5 : // 1000 * 60 * 60 * 24 * 7, negate dst
            delta;
    }
    return asFloat ? output : absFloor(output);
}

function monthDiff (a, b) {
    // difference in months
    var wholeMonthDiff = ((b.year() - a.year()) * 12) + (b.month() - a.month()),
        // b is in (anchor - 1 month, anchor + 1 month)
        anchor = a.clone().add(wholeMonthDiff, 'months'),
        anchor2, adjust;

    if (b - anchor < 0) {
        anchor2 = a.clone().add(wholeMonthDiff - 1, 'months');
        // linear across the month
        adjust = (b - anchor) / (anchor - anchor2);
    } else {
        anchor2 = a.clone().add(wholeMonthDiff + 1, 'months');
        // linear across the month
        adjust = (b - anchor) / (anchor2 - anchor);
    }

    //check for negative zero, return zero if negative zero
    return -(wholeMonthDiff + adjust) || 0;
}

hooks.defaultFormat = 'YYYY-MM-DDTHH:mm:ssZ';
hooks.defaultFormatUtc = 'YYYY-MM-DDTHH:mm:ss[Z]';

function toString () {
    return this.clone().locale('en').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
}

function toISOString() {
    if (!this.isValid()) {
        return null;
    }
    var m = this.clone().utc();
    if (m.year() < 0 || m.year() > 9999) {
        return formatMoment(m, 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
    }
    if (isFunction(Date.prototype.toISOString)) {
        // native implementation is ~50x faster, use it when we can
        return this.toDate().toISOString();
    }
    return formatMoment(m, 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
}

/**
 * Return a human readable representation of a moment that can
 * also be evaluated to get a new moment which is the same
 *
 * @link https://nodejs.org/dist/latest/docs/api/util.html#util_custom_inspect_function_on_objects
 */
function inspect () {
    if (!this.isValid()) {
        return 'moment.invalid(/* ' + this._i + ' */)';
    }
    var func = 'moment';
    var zone = '';
    if (!this.isLocal()) {
        func = this.utcOffset() === 0 ? 'moment.utc' : 'moment.parseZone';
        zone = 'Z';
    }
    var prefix = '[' + func + '("]';
    var year = (0 <= this.year() && this.year() <= 9999) ? 'YYYY' : 'YYYYYY';
    var datetime = '-MM-DD[T]HH:mm:ss.SSS';
    var suffix = zone + '[")]';

    return this.format(prefix + year + datetime + suffix);
}

function format (inputString) {
    if (!inputString) {
        inputString = this.isUtc() ? hooks.defaultFormatUtc : hooks.defaultFormat;
    }
    var output = formatMoment(this, inputString);
    return this.localeData().postformat(output);
}

function from (time, withoutSuffix) {
    if (this.isValid() &&
            ((isMoment(time) && time.isValid()) ||
             createLocal(time).isValid())) {
        return createDuration({to: this, from: time}).locale(this.locale()).humanize(!withoutSuffix);
    } else {
        return this.localeData().invalidDate();
    }
}

function fromNow (withoutSuffix) {
    return this.from(createLocal(), withoutSuffix);
}

function to (time, withoutSuffix) {
    if (this.isValid() &&
            ((isMoment(time) && time.isValid()) ||
             createLocal(time).isValid())) {
        return createDuration({from: this, to: time}).locale(this.locale()).humanize(!withoutSuffix);
    } else {
        return this.localeData().invalidDate();
    }
}

function toNow (withoutSuffix) {
    return this.to(createLocal(), withoutSuffix);
}

// If passed a locale key, it will set the locale for this
// instance.  Otherwise, it will return the locale configuration
// variables for this instance.
function locale (key) {
    var newLocaleData;

    if (key === undefined) {
        return this._locale._abbr;
    } else {
        newLocaleData = getLocale(key);
        if (newLocaleData != null) {
            this._locale = newLocaleData;
        }
        return this;
    }
}

var lang = deprecate(
    'moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.',
    function (key) {
        if (key === undefined) {
            return this.localeData();
        } else {
            return this.locale(key);
        }
    }
);

function localeData () {
    return this._locale;
}

function startOf (units) {
    units = normalizeUnits(units);
    // the following switch intentionally omits break keywords
    // to utilize falling through the cases.
    switch (units) {
        case 'year':
            this.month(0);
            /* falls through */
        case 'quarter':
        case 'month':
            this.date(1);
            /* falls through */
        case 'week':
        case 'isoWeek':
        case 'day':
        case 'date':
            this.hours(0);
            /* falls through */
        case 'hour':
            this.minutes(0);
            /* falls through */
        case 'minute':
            this.seconds(0);
            /* falls through */
        case 'second':
            this.milliseconds(0);
    }

    // weeks are a special case
    if (units === 'week') {
        this.weekday(0);
    }
    if (units === 'isoWeek') {
        this.isoWeekday(1);
    }

    // quarters are also special
    if (units === 'quarter') {
        this.month(Math.floor(this.month() / 3) * 3);
    }

    return this;
}

function endOf (units) {
    units = normalizeUnits(units);
    if (units === undefined || units === 'millisecond') {
        return this;
    }

    // 'date' is an alias for 'day', so it should be considered as such.
    if (units === 'date') {
        units = 'day';
    }

    return this.startOf(units).add(1, (units === 'isoWeek' ? 'week' : units)).subtract(1, 'ms');
}

function valueOf () {
    return this._d.valueOf() - ((this._offset || 0) * 60000);
}

function unix () {
    return Math.floor(this.valueOf() / 1000);
}

function toDate () {
    return new Date(this.valueOf());
}

function toArray () {
    var m = this;
    return [m.year(), m.month(), m.date(), m.hour(), m.minute(), m.second(), m.millisecond()];
}

function toObject () {
    var m = this;
    return {
        years: m.year(),
        months: m.month(),
        date: m.date(),
        hours: m.hours(),
        minutes: m.minutes(),
        seconds: m.seconds(),
        milliseconds: m.milliseconds()
    };
}

function toJSON () {
    // new Date(NaN).toJSON() === null
    return this.isValid() ? this.toISOString() : null;
}

function isValid$2 () {
    return isValid(this);
}

function parsingFlags () {
    return extend({}, getParsingFlags(this));
}

function invalidAt () {
    return getParsingFlags(this).overflow;
}

function creationData() {
    return {
        input: this._i,
        format: this._f,
        locale: this._locale,
        isUTC: this._isUTC,
        strict: this._strict
    };
}

// FORMATTING

addFormatToken(0, ['gg', 2], 0, function () {
    return this.weekYear() % 100;
});

addFormatToken(0, ['GG', 2], 0, function () {
    return this.isoWeekYear() % 100;
});

function addWeekYearFormatToken (token, getter) {
    addFormatToken(0, [token, token.length], 0, getter);
}

addWeekYearFormatToken('gggg',     'weekYear');
addWeekYearFormatToken('ggggg',    'weekYear');
addWeekYearFormatToken('GGGG',  'isoWeekYear');
addWeekYearFormatToken('GGGGG', 'isoWeekYear');

// ALIASES

addUnitAlias('weekYear', 'gg');
addUnitAlias('isoWeekYear', 'GG');

// PRIORITY

addUnitPriority('weekYear', 1);
addUnitPriority('isoWeekYear', 1);


// PARSING

addRegexToken('G',      matchSigned);
addRegexToken('g',      matchSigned);
addRegexToken('GG',     match1to2, match2);
addRegexToken('gg',     match1to2, match2);
addRegexToken('GGGG',   match1to4, match4);
addRegexToken('gggg',   match1to4, match4);
addRegexToken('GGGGG',  match1to6, match6);
addRegexToken('ggggg',  match1to6, match6);

addWeekParseToken(['gggg', 'ggggg', 'GGGG', 'GGGGG'], function (input, week, config, token) {
    week[token.substr(0, 2)] = toInt(input);
});

addWeekParseToken(['gg', 'GG'], function (input, week, config, token) {
    week[token] = hooks.parseTwoDigitYear(input);
});

// MOMENTS

function getSetWeekYear (input) {
    return getSetWeekYearHelper.call(this,
            input,
            this.week(),
            this.weekday(),
            this.localeData()._week.dow,
            this.localeData()._week.doy);
}

function getSetISOWeekYear (input) {
    return getSetWeekYearHelper.call(this,
            input, this.isoWeek(), this.isoWeekday(), 1, 4);
}

function getISOWeeksInYear () {
    return weeksInYear(this.year(), 1, 4);
}

function getWeeksInYear () {
    var weekInfo = this.localeData()._week;
    return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
}

function getSetWeekYearHelper(input, week, weekday, dow, doy) {
    var weeksTarget;
    if (input == null) {
        return weekOfYear(this, dow, doy).year;
    } else {
        weeksTarget = weeksInYear(input, dow, doy);
        if (week > weeksTarget) {
            week = weeksTarget;
        }
        return setWeekAll.call(this, input, week, weekday, dow, doy);
    }
}

function setWeekAll(weekYear, week, weekday, dow, doy) {
    var dayOfYearData = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy),
        date = createUTCDate(dayOfYearData.year, 0, dayOfYearData.dayOfYear);

    this.year(date.getUTCFullYear());
    this.month(date.getUTCMonth());
    this.date(date.getUTCDate());
    return this;
}

// FORMATTING

addFormatToken('Q', 0, 'Qo', 'quarter');

// ALIASES

addUnitAlias('quarter', 'Q');

// PRIORITY

addUnitPriority('quarter', 7);

// PARSING

addRegexToken('Q', match1);
addParseToken('Q', function (input, array) {
    array[MONTH] = (toInt(input) - 1) * 3;
});

// MOMENTS

function getSetQuarter (input) {
    return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3);
}

// FORMATTING

addFormatToken('D', ['DD', 2], 'Do', 'date');

// ALIASES

addUnitAlias('date', 'D');

// PRIOROITY
addUnitPriority('date', 9);

// PARSING

addRegexToken('D',  match1to2);
addRegexToken('DD', match1to2, match2);
addRegexToken('Do', function (isStrict, locale) {
    // TODO: Remove "ordinalParse" fallback in next major release.
    return isStrict ?
      (locale._dayOfMonthOrdinalParse || locale._ordinalParse) :
      locale._dayOfMonthOrdinalParseLenient;
});

addParseToken(['D', 'DD'], DATE);
addParseToken('Do', function (input, array) {
    array[DATE] = toInt(input.match(match1to2)[0], 10);
});

// MOMENTS

var getSetDayOfMonth = makeGetSet('Date', true);

// FORMATTING

addFormatToken('DDD', ['DDDD', 3], 'DDDo', 'dayOfYear');

// ALIASES

addUnitAlias('dayOfYear', 'DDD');

// PRIORITY
addUnitPriority('dayOfYear', 4);

// PARSING

addRegexToken('DDD',  match1to3);
addRegexToken('DDDD', match3);
addParseToken(['DDD', 'DDDD'], function (input, array, config) {
    config._dayOfYear = toInt(input);
});

// HELPERS

// MOMENTS

function getSetDayOfYear (input) {
    var dayOfYear = Math.round((this.clone().startOf('day') - this.clone().startOf('year')) / 864e5) + 1;
    return input == null ? dayOfYear : this.add((input - dayOfYear), 'd');
}

// FORMATTING

addFormatToken('m', ['mm', 2], 0, 'minute');

// ALIASES

addUnitAlias('minute', 'm');

// PRIORITY

addUnitPriority('minute', 14);

// PARSING

addRegexToken('m',  match1to2);
addRegexToken('mm', match1to2, match2);
addParseToken(['m', 'mm'], MINUTE);

// MOMENTS

var getSetMinute = makeGetSet('Minutes', false);

// FORMATTING

addFormatToken('s', ['ss', 2], 0, 'second');

// ALIASES

addUnitAlias('second', 's');

// PRIORITY

addUnitPriority('second', 15);

// PARSING

addRegexToken('s',  match1to2);
addRegexToken('ss', match1to2, match2);
addParseToken(['s', 'ss'], SECOND);

// MOMENTS

var getSetSecond = makeGetSet('Seconds', false);

// FORMATTING

addFormatToken('S', 0, 0, function () {
    return ~~(this.millisecond() / 100);
});

addFormatToken(0, ['SS', 2], 0, function () {
    return ~~(this.millisecond() / 10);
});

addFormatToken(0, ['SSS', 3], 0, 'millisecond');
addFormatToken(0, ['SSSS', 4], 0, function () {
    return this.millisecond() * 10;
});
addFormatToken(0, ['SSSSS', 5], 0, function () {
    return this.millisecond() * 100;
});
addFormatToken(0, ['SSSSSS', 6], 0, function () {
    return this.millisecond() * 1000;
});
addFormatToken(0, ['SSSSSSS', 7], 0, function () {
    return this.millisecond() * 10000;
});
addFormatToken(0, ['SSSSSSSS', 8], 0, function () {
    return this.millisecond() * 100000;
});
addFormatToken(0, ['SSSSSSSSS', 9], 0, function () {
    return this.millisecond() * 1000000;
});


// ALIASES

addUnitAlias('millisecond', 'ms');

// PRIORITY

addUnitPriority('millisecond', 16);

// PARSING

addRegexToken('S',    match1to3, match1);
addRegexToken('SS',   match1to3, match2);
addRegexToken('SSS',  match1to3, match3);

var token;
for (token = 'SSSS'; token.length <= 9; token += 'S') {
    addRegexToken(token, matchUnsigned);
}

function parseMs(input, array) {
    array[MILLISECOND] = toInt(('0.' + input) * 1000);
}

for (token = 'S'; token.length <= 9; token += 'S') {
    addParseToken(token, parseMs);
}
// MOMENTS

var getSetMillisecond = makeGetSet('Milliseconds', false);

// FORMATTING

addFormatToken('z',  0, 0, 'zoneAbbr');
addFormatToken('zz', 0, 0, 'zoneName');

// MOMENTS

function getZoneAbbr () {
    return this._isUTC ? 'UTC' : '';
}

function getZoneName () {
    return this._isUTC ? 'Coordinated Universal Time' : '';
}

var proto = Moment.prototype;

proto.add               = add;
proto.calendar          = calendar$1;
proto.clone             = clone;
proto.diff              = diff;
proto.endOf             = endOf;
proto.format            = format;
proto.from              = from;
proto.fromNow           = fromNow;
proto.to                = to;
proto.toNow             = toNow;
proto.get               = stringGet;
proto.invalidAt         = invalidAt;
proto.isAfter           = isAfter;
proto.isBefore          = isBefore;
proto.isBetween         = isBetween;
proto.isSame            = isSame;
proto.isSameOrAfter     = isSameOrAfter;
proto.isSameOrBefore    = isSameOrBefore;
proto.isValid           = isValid$2;
proto.lang              = lang;
proto.locale            = locale;
proto.localeData        = localeData;
proto.max               = prototypeMax;
proto.min               = prototypeMin;
proto.parsingFlags      = parsingFlags;
proto.set               = stringSet;
proto.startOf           = startOf;
proto.subtract          = subtract;
proto.toArray           = toArray;
proto.toObject          = toObject;
proto.toDate            = toDate;
proto.toISOString       = toISOString;
proto.inspect           = inspect;
proto.toJSON            = toJSON;
proto.toString          = toString;
proto.unix              = unix;
proto.valueOf           = valueOf;
proto.creationData      = creationData;

// Year
proto.year       = getSetYear;
proto.isLeapYear = getIsLeapYear;

// Week Year
proto.weekYear    = getSetWeekYear;
proto.isoWeekYear = getSetISOWeekYear;

// Quarter
proto.quarter = proto.quarters = getSetQuarter;

// Month
proto.month       = getSetMonth;
proto.daysInMonth = getDaysInMonth;

// Week
proto.week           = proto.weeks        = getSetWeek;
proto.isoWeek        = proto.isoWeeks     = getSetISOWeek;
proto.weeksInYear    = getWeeksInYear;
proto.isoWeeksInYear = getISOWeeksInYear;

// Day
proto.date       = getSetDayOfMonth;
proto.day        = proto.days             = getSetDayOfWeek;
proto.weekday    = getSetLocaleDayOfWeek;
proto.isoWeekday = getSetISODayOfWeek;
proto.dayOfYear  = getSetDayOfYear;

// Hour
proto.hour = proto.hours = getSetHour;

// Minute
proto.minute = proto.minutes = getSetMinute;

// Second
proto.second = proto.seconds = getSetSecond;

// Millisecond
proto.millisecond = proto.milliseconds = getSetMillisecond;

// Offset
proto.utcOffset            = getSetOffset;
proto.utc                  = setOffsetToUTC;
proto.local                = setOffsetToLocal;
proto.parseZone            = setOffsetToParsedOffset;
proto.hasAlignedHourOffset = hasAlignedHourOffset;
proto.isDST                = isDaylightSavingTime;
proto.isLocal              = isLocal;
proto.isUtcOffset          = isUtcOffset;
proto.isUtc                = isUtc;
proto.isUTC                = isUtc;

// Timezone
proto.zoneAbbr = getZoneAbbr;
proto.zoneName = getZoneName;

// Deprecations
proto.dates  = deprecate('dates accessor is deprecated. Use date instead.', getSetDayOfMonth);
proto.months = deprecate('months accessor is deprecated. Use month instead', getSetMonth);
proto.years  = deprecate('years accessor is deprecated. Use year instead', getSetYear);
proto.zone   = deprecate('moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/', getSetZone);
proto.isDSTShifted = deprecate('isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information', isDaylightSavingTimeShifted);

function createUnix (input) {
    return createLocal(input * 1000);
}

function createInZone () {
    return createLocal.apply(null, arguments).parseZone();
}

function preParsePostFormat (string) {
    return string;
}

var proto$1 = Locale.prototype;

proto$1.calendar        = calendar;
proto$1.longDateFormat  = longDateFormat;
proto$1.invalidDate     = invalidDate;
proto$1.ordinal         = ordinal;
proto$1.preparse        = preParsePostFormat;
proto$1.postformat      = preParsePostFormat;
proto$1.relativeTime    = relativeTime;
proto$1.pastFuture      = pastFuture;
proto$1.set             = set;

// Month
proto$1.months            =        localeMonths;
proto$1.monthsShort       =        localeMonthsShort;
proto$1.monthsParse       =        localeMonthsParse;
proto$1.monthsRegex       = monthsRegex;
proto$1.monthsShortRegex  = monthsShortRegex;

// Week
proto$1.week = localeWeek;
proto$1.firstDayOfYear = localeFirstDayOfYear;
proto$1.firstDayOfWeek = localeFirstDayOfWeek;

// Day of Week
proto$1.weekdays       =        localeWeekdays;
proto$1.weekdaysMin    =        localeWeekdaysMin;
proto$1.weekdaysShort  =        localeWeekdaysShort;
proto$1.weekdaysParse  =        localeWeekdaysParse;

proto$1.weekdaysRegex       =        weekdaysRegex;
proto$1.weekdaysShortRegex  =        weekdaysShortRegex;
proto$1.weekdaysMinRegex    =        weekdaysMinRegex;

// Hours
proto$1.isPM = localeIsPM;
proto$1.meridiem = localeMeridiem;

function get$1 (format, index, field, setter) {
    var locale = getLocale();
    var utc = createUTC().set(setter, index);
    return locale[field](utc, format);
}

function listMonthsImpl (format, index, field) {
    if (isNumber(format)) {
        index = format;
        format = undefined;
    }

    format = format || '';

    if (index != null) {
        return get$1(format, index, field, 'month');
    }

    var i;
    var out = [];
    for (i = 0; i < 12; i++) {
        out[i] = get$1(format, i, field, 'month');
    }
    return out;
}

// ()
// (5)
// (fmt, 5)
// (fmt)
// (true)
// (true, 5)
// (true, fmt, 5)
// (true, fmt)
function listWeekdaysImpl (localeSorted, format, index, field) {
    if (typeof localeSorted === 'boolean') {
        if (isNumber(format)) {
            index = format;
            format = undefined;
        }

        format = format || '';
    } else {
        format = localeSorted;
        index = format;
        localeSorted = false;

        if (isNumber(format)) {
            index = format;
            format = undefined;
        }

        format = format || '';
    }

    var locale = getLocale(),
        shift = localeSorted ? locale._week.dow : 0;

    if (index != null) {
        return get$1(format, (index + shift) % 7, field, 'day');
    }

    var i;
    var out = [];
    for (i = 0; i < 7; i++) {
        out[i] = get$1(format, (i + shift) % 7, field, 'day');
    }
    return out;
}

function listMonths (format, index) {
    return listMonthsImpl(format, index, 'months');
}

function listMonthsShort (format, index) {
    return listMonthsImpl(format, index, 'monthsShort');
}

function listWeekdays (localeSorted, format, index) {
    return listWeekdaysImpl(localeSorted, format, index, 'weekdays');
}

function listWeekdaysShort (localeSorted, format, index) {
    return listWeekdaysImpl(localeSorted, format, index, 'weekdaysShort');
}

function listWeekdaysMin (localeSorted, format, index) {
    return listWeekdaysImpl(localeSorted, format, index, 'weekdaysMin');
}

getSetGlobalLocale('en', {
    dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
    ordinal : function (number) {
        var b = number % 10,
            output = (toInt(number % 100 / 10) === 1) ? 'th' :
            (b === 1) ? 'st' :
            (b === 2) ? 'nd' :
            (b === 3) ? 'rd' : 'th';
        return number + output;
    }
});

// Side effect imports
hooks.lang = deprecate('moment.lang is deprecated. Use moment.locale instead.', getSetGlobalLocale);
hooks.langData = deprecate('moment.langData is deprecated. Use moment.localeData instead.', getLocale);

var mathAbs = Math.abs;

function abs () {
    var data           = this._data;

    this._milliseconds = mathAbs(this._milliseconds);
    this._days         = mathAbs(this._days);
    this._months       = mathAbs(this._months);

    data.milliseconds  = mathAbs(data.milliseconds);
    data.seconds       = mathAbs(data.seconds);
    data.minutes       = mathAbs(data.minutes);
    data.hours         = mathAbs(data.hours);
    data.months        = mathAbs(data.months);
    data.years         = mathAbs(data.years);

    return this;
}

function addSubtract$1 (duration, input, value, direction) {
    var other = createDuration(input, value);

    duration._milliseconds += direction * other._milliseconds;
    duration._days         += direction * other._days;
    duration._months       += direction * other._months;

    return duration._bubble();
}

// supports only 2.0-style add(1, 's') or add(duration)
function add$1 (input, value) {
    return addSubtract$1(this, input, value, 1);
}

// supports only 2.0-style subtract(1, 's') or subtract(duration)
function subtract$1 (input, value) {
    return addSubtract$1(this, input, value, -1);
}

function absCeil (number) {
    if (number < 0) {
        return Math.floor(number);
    } else {
        return Math.ceil(number);
    }
}

function bubble () {
    var milliseconds = this._milliseconds;
    var days         = this._days;
    var months       = this._months;
    var data         = this._data;
    var seconds, minutes, hours, years, monthsFromDays;

    // if we have a mix of positive and negative values, bubble down first
    // check: https://github.com/moment/moment/issues/2166
    if (!((milliseconds >= 0 && days >= 0 && months >= 0) ||
            (milliseconds <= 0 && days <= 0 && months <= 0))) {
        milliseconds += absCeil(monthsToDays(months) + days) * 864e5;
        days = 0;
        months = 0;
    }

    // The following code bubbles up values, see the tests for
    // examples of what that means.
    data.milliseconds = milliseconds % 1000;

    seconds           = absFloor(milliseconds / 1000);
    data.seconds      = seconds % 60;

    minutes           = absFloor(seconds / 60);
    data.minutes      = minutes % 60;

    hours             = absFloor(minutes / 60);
    data.hours        = hours % 24;

    days += absFloor(hours / 24);

    // convert days to months
    monthsFromDays = absFloor(daysToMonths(days));
    months += monthsFromDays;
    days -= absCeil(monthsToDays(monthsFromDays));

    // 12 months -> 1 year
    years = absFloor(months / 12);
    months %= 12;

    data.days   = days;
    data.months = months;
    data.years  = years;

    return this;
}

function daysToMonths (days) {
    // 400 years have 146097 days (taking into account leap year rules)
    // 400 years have 12 months === 4800
    return days * 4800 / 146097;
}

function monthsToDays (months) {
    // the reverse of daysToMonths
    return months * 146097 / 4800;
}

function as (units) {
    if (!this.isValid()) {
        return NaN;
    }
    var days;
    var months;
    var milliseconds = this._milliseconds;

    units = normalizeUnits(units);

    if (units === 'month' || units === 'year') {
        days   = this._days   + milliseconds / 864e5;
        months = this._months + daysToMonths(days);
        return units === 'month' ? months : months / 12;
    } else {
        // handle milliseconds separately because of floating point math errors (issue #1867)
        days = this._days + Math.round(monthsToDays(this._months));
        switch (units) {
            case 'week'   : return days / 7     + milliseconds / 6048e5;
            case 'day'    : return days         + milliseconds / 864e5;
            case 'hour'   : return days * 24    + milliseconds / 36e5;
            case 'minute' : return days * 1440  + milliseconds / 6e4;
            case 'second' : return days * 86400 + milliseconds / 1000;
            // Math.floor prevents floating point math errors here
            case 'millisecond': return Math.floor(days * 864e5) + milliseconds;
            default: throw new Error('Unknown unit ' + units);
        }
    }
}

// TODO: Use this.as('ms')?
function valueOf$1 () {
    if (!this.isValid()) {
        return NaN;
    }
    return (
        this._milliseconds +
        this._days * 864e5 +
        (this._months % 12) * 2592e6 +
        toInt(this._months / 12) * 31536e6
    );
}

function makeAs (alias) {
    return function () {
        return this.as(alias);
    };
}

var asMilliseconds = makeAs('ms');
var asSeconds      = makeAs('s');
var asMinutes      = makeAs('m');
var asHours        = makeAs('h');
var asDays         = makeAs('d');
var asWeeks        = makeAs('w');
var asMonths       = makeAs('M');
var asYears        = makeAs('y');

function get$2 (units) {
    units = normalizeUnits(units);
    return this.isValid() ? this[units + 's']() : NaN;
}

function makeGetter(name) {
    return function () {
        return this.isValid() ? this._data[name] : NaN;
    };
}

var milliseconds = makeGetter('milliseconds');
var seconds      = makeGetter('seconds');
var minutes      = makeGetter('minutes');
var hours        = makeGetter('hours');
var days         = makeGetter('days');
var months       = makeGetter('months');
var years        = makeGetter('years');

function weeks () {
    return absFloor(this.days() / 7);
}

var round = Math.round;
var thresholds = {
    ss: 44,         // a few seconds to seconds
    s : 45,         // seconds to minute
    m : 45,         // minutes to hour
    h : 22,         // hours to day
    d : 26,         // days to month
    M : 11          // months to year
};

// helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize
function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {
    return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
}

function relativeTime$1 (posNegDuration, withoutSuffix, locale) {
    var duration = createDuration(posNegDuration).abs();
    var seconds  = round(duration.as('s'));
    var minutes  = round(duration.as('m'));
    var hours    = round(duration.as('h'));
    var days     = round(duration.as('d'));
    var months   = round(duration.as('M'));
    var years    = round(duration.as('y'));

    var a = seconds <= thresholds.ss && ['s', seconds]  ||
            seconds < thresholds.s   && ['ss', seconds] ||
            minutes <= 1             && ['m']           ||
            minutes < thresholds.m   && ['mm', minutes] ||
            hours   <= 1             && ['h']           ||
            hours   < thresholds.h   && ['hh', hours]   ||
            days    <= 1             && ['d']           ||
            days    < thresholds.d   && ['dd', days]    ||
            months  <= 1             && ['M']           ||
            months  < thresholds.M   && ['MM', months]  ||
            years   <= 1             && ['y']           || ['yy', years];

    a[2] = withoutSuffix;
    a[3] = +posNegDuration > 0;
    a[4] = locale;
    return substituteTimeAgo.apply(null, a);
}

// This function allows you to set the rounding function for relative time strings
function getSetRelativeTimeRounding (roundingFunction) {
    if (roundingFunction === undefined) {
        return round;
    }
    if (typeof(roundingFunction) === 'function') {
        round = roundingFunction;
        return true;
    }
    return false;
}

// This function allows you to set a threshold for relative time strings
function getSetRelativeTimeThreshold (threshold, limit) {
    if (thresholds[threshold] === undefined) {
        return false;
    }
    if (limit === undefined) {
        return thresholds[threshold];
    }
    thresholds[threshold] = limit;
    if (threshold === 's') {
        thresholds.ss = limit - 1;
    }
    return true;
}

function humanize (withSuffix) {
    if (!this.isValid()) {
        return this.localeData().invalidDate();
    }

    var locale = this.localeData();
    var output = relativeTime$1(this, !withSuffix, locale);

    if (withSuffix) {
        output = locale.pastFuture(+this, output);
    }

    return locale.postformat(output);
}

var abs$1 = Math.abs;

function toISOString$1() {
    // for ISO strings we do not use the normal bubbling rules:
    //  * milliseconds bubble up until they become hours
    //  * days do not bubble at all
    //  * months bubble up until they become years
    // This is because there is no context-free conversion between hours and days
    // (think of clock changes)
    // and also not between days and months (28-31 days per month)
    if (!this.isValid()) {
        return this.localeData().invalidDate();
    }

    var seconds = abs$1(this._milliseconds) / 1000;
    var days         = abs$1(this._days);
    var months       = abs$1(this._months);
    var minutes, hours, years;

    // 3600 seconds -> 60 minutes -> 1 hour
    minutes           = absFloor(seconds / 60);
    hours             = absFloor(minutes / 60);
    seconds %= 60;
    minutes %= 60;

    // 12 months -> 1 year
    years  = absFloor(months / 12);
    months %= 12;


    // inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js
    var Y = years;
    var M = months;
    var D = days;
    var h = hours;
    var m = minutes;
    var s = seconds;
    var total = this.asSeconds();

    if (!total) {
        // this is the same as C#'s (Noda) and python (isodate)...
        // but not other JS (goog.date)
        return 'P0D';
    }

    return (total < 0 ? '-' : '') +
        'P' +
        (Y ? Y + 'Y' : '') +
        (M ? M + 'M' : '') +
        (D ? D + 'D' : '') +
        ((h || m || s) ? 'T' : '') +
        (h ? h + 'H' : '') +
        (m ? m + 'M' : '') +
        (s ? s + 'S' : '');
}

var proto$2 = Duration.prototype;

proto$2.isValid        = isValid$1;
proto$2.abs            = abs;
proto$2.add            = add$1;
proto$2.subtract       = subtract$1;
proto$2.as             = as;
proto$2.asMilliseconds = asMilliseconds;
proto$2.asSeconds      = asSeconds;
proto$2.asMinutes      = asMinutes;
proto$2.asHours        = asHours;
proto$2.asDays         = asDays;
proto$2.asWeeks        = asWeeks;
proto$2.asMonths       = asMonths;
proto$2.asYears        = asYears;
proto$2.valueOf        = valueOf$1;
proto$2._bubble        = bubble;
proto$2.get            = get$2;
proto$2.milliseconds   = milliseconds;
proto$2.seconds        = seconds;
proto$2.minutes        = minutes;
proto$2.hours          = hours;
proto$2.days           = days;
proto$2.weeks          = weeks;
proto$2.months         = months;
proto$2.years          = years;
proto$2.humanize       = humanize;
proto$2.toISOString    = toISOString$1;
proto$2.toString       = toISOString$1;
proto$2.toJSON         = toISOString$1;
proto$2.locale         = locale;
proto$2.localeData     = localeData;

// Deprecations
proto$2.toIsoString = deprecate('toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)', toISOString$1);
proto$2.lang = lang;

// Side effect imports

// FORMATTING

addFormatToken('X', 0, 0, 'unix');
addFormatToken('x', 0, 0, 'valueOf');

// PARSING

addRegexToken('x', matchSigned);
addRegexToken('X', matchTimestamp);
addParseToken('X', function (input, array, config) {
    config._d = new Date(parseFloat(input, 10) * 1000);
});
addParseToken('x', function (input, array, config) {
    config._d = new Date(toInt(input));
});

// Side effect imports


hooks.version = '2.18.1';

setHookCallback(createLocal);

hooks.fn                    = proto;
hooks.min                   = min;
hooks.max                   = max;
hooks.now                   = now;
hooks.utc                   = createUTC;
hooks.unix                  = createUnix;
hooks.months                = listMonths;
hooks.isDate                = isDate;
hooks.locale                = getSetGlobalLocale;
hooks.invalid               = createInvalid;
hooks.duration              = createDuration;
hooks.isMoment              = isMoment;
hooks.weekdays              = listWeekdays;
hooks.parseZone             = createInZone;
hooks.localeData            = getLocale;
hooks.isDuration            = isDuration;
hooks.monthsShort           = listMonthsShort;
hooks.weekdaysMin           = listWeekdaysMin;
hooks.defineLocale          = defineLocale;
hooks.updateLocale          = updateLocale;
hooks.locales               = listLocales;
hooks.weekdaysShort         = listWeekdaysShort;
hooks.normalizeUnits        = normalizeUnits;
hooks.relativeTimeRounding = getSetRelativeTimeRounding;
hooks.relativeTimeThreshold = getSetRelativeTimeThreshold;
hooks.calendarFormat        = getCalendarFormat;
hooks.prototype             = proto;

return hooks;

})));

},{}],21:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],22:[function(require,module,exports){
var Vue // late bind
var map = Object.create(null)
var shimmed = false
var isBrowserify = false

/**
 * Determine compatibility and apply patch.
 *
 * @param {Function} vue
 * @param {Boolean} browserify
 */

exports.install = function (vue, browserify) {
  if (shimmed) return
  shimmed = true

  Vue = vue
  isBrowserify = browserify

  exports.compatible = !!Vue.internalDirectives
  if (!exports.compatible) {
    console.warn(
      '[HMR] vue-loader hot reload is only compatible with ' +
      'Vue.js 1.0.0+.'
    )
    return
  }

  // patch view directive
  patchView(Vue.internalDirectives.component)
  console.log('[HMR] Vue component hot reload shim applied.')
  // shim router-view if present
  var routerView = Vue.elementDirective('router-view')
  if (routerView) {
    patchView(routerView)
    console.log('[HMR] vue-router <router-view> hot reload shim applied.')
  }
}

/**
 * Shim the view directive (component or router-view).
 *
 * @param {Object} View
 */

function patchView (View) {
  var unbuild = View.unbuild
  View.unbuild = function (defer) {
    if (!this.hotUpdating) {
      var prevComponent = this.childVM && this.childVM.constructor
      removeView(prevComponent, this)
      // defer = true means we are transitioning to a new
      // Component. Register this new component to the list.
      if (defer) {
        addView(this.Component, this)
      }
    }
    // call original
    return unbuild.call(this, defer)
  }
}

/**
 * Add a component view to a Component's hot list
 *
 * @param {Function} Component
 * @param {Directive} view - view directive instance
 */

function addView (Component, view) {
  var id = Component && Component.options.hotID
  if (id) {
    if (!map[id]) {
      map[id] = {
        Component: Component,
        views: [],
        instances: []
      }
    }
    map[id].views.push(view)
  }
}

/**
 * Remove a component view from a Component's hot list
 *
 * @param {Function} Component
 * @param {Directive} view - view directive instance
 */

function removeView (Component, view) {
  var id = Component && Component.options.hotID
  if (id) {
    map[id].views.$remove(view)
  }
}

/**
 * Create a record for a hot module, which keeps track of its construcotr,
 * instnaces and views (component directives or router-views).
 *
 * @param {String} id
 * @param {Object} options
 */

exports.createRecord = function (id, options) {
  if (typeof options === 'function') {
    options = options.options
  }
  if (typeof options.el !== 'string' && typeof options.data !== 'object') {
    makeOptionsHot(id, options)
    map[id] = {
      Component: null,
      views: [],
      instances: []
    }
  }
}

/**
 * Make a Component options object hot.
 *
 * @param {String} id
 * @param {Object} options
 */

function makeOptionsHot (id, options) {
  options.hotID = id
  injectHook(options, 'created', function () {
    var record = map[id]
    if (!record.Component) {
      record.Component = this.constructor
    }
    record.instances.push(this)
  })
  injectHook(options, 'beforeDestroy', function () {
    map[id].instances.$remove(this)
  })
}

/**
 * Inject a hook to a hot reloadable component so that
 * we can keep track of it.
 *
 * @param {Object} options
 * @param {String} name
 * @param {Function} hook
 */

function injectHook (options, name, hook) {
  var existing = options[name]
  options[name] = existing
    ? Array.isArray(existing)
      ? existing.concat(hook)
      : [existing, hook]
    : [hook]
}

/**
 * Update a hot component.
 *
 * @param {String} id
 * @param {Object|null} newOptions
 * @param {String|null} newTemplate
 */

exports.update = function (id, newOptions, newTemplate) {
  var record = map[id]
  // force full-reload if an instance of the component is active but is not
  // managed by a view
  if (!record || (record.instances.length && !record.views.length)) {
    console.log('[HMR] Root or manually-mounted instance modified. Full reload may be required.')
    if (!isBrowserify) {
      window.location.reload()
    } else {
      // browserify-hmr somehow sends incomplete bundle if we reload here
      return
    }
  }
  if (!isBrowserify) {
    // browserify-hmr already logs this
    console.log('[HMR] Updating component: ' + format(id))
  }
  var Component = record.Component
  // update constructor
  if (newOptions) {
    // in case the user exports a constructor
    Component = record.Component = typeof newOptions === 'function'
      ? newOptions
      : Vue.extend(newOptions)
    makeOptionsHot(id, Component.options)
  }
  if (newTemplate) {
    Component.options.template = newTemplate
  }
  // handle recursive lookup
  if (Component.options.name) {
    Component.options.components[Component.options.name] = Component
  }
  // reset constructor cached linker
  Component.linker = null
  // reload all views
  record.views.forEach(function (view) {
    updateView(view, Component)
  })
  // flush devtools
  if (window.__VUE_DEVTOOLS_GLOBAL_HOOK__) {
    window.__VUE_DEVTOOLS_GLOBAL_HOOK__.emit('flush')
  }
}

/**
 * Update a component view instance
 *
 * @param {Directive} view
 * @param {Function} Component
 */

function updateView (view, Component) {
  if (!view._bound) {
    return
  }
  view.Component = Component
  view.hotUpdating = true
  // disable transitions
  view.vm._isCompiled = false
  // save state
  var state = extractState(view.childVM)
  // remount, make sure to disable keep-alive
  var keepAlive = view.keepAlive
  view.keepAlive = false
  view.mountComponent()
  view.keepAlive = keepAlive
  // restore state
  restoreState(view.childVM, state, true)
  // re-eanble transitions
  view.vm._isCompiled = true
  view.hotUpdating = false
}

/**
 * Extract state from a Vue instance.
 *
 * @param {Vue} vm
 * @return {Object}
 */

function extractState (vm) {
  return {
    cid: vm.constructor.cid,
    data: vm.$data,
    children: vm.$children.map(extractState)
  }
}

/**
 * Restore state to a reloaded Vue instance.
 *
 * @param {Vue} vm
 * @param {Object} state
 */

function restoreState (vm, state, isRoot) {
  var oldAsyncConfig
  if (isRoot) {
    // set Vue into sync mode during state rehydration
    oldAsyncConfig = Vue.config.async
    Vue.config.async = false
  }
  // actual restore
  if (isRoot || !vm._props) {
    vm.$data = state.data
  } else {
    Object.keys(state.data).forEach(function (key) {
      if (!vm._props[key]) {
        // for non-root, only restore non-props fields
        vm.$data[key] = state.data[key]
      }
    })
  }
  // verify child consistency
  var hasSameChildren = vm.$children.every(function (c, i) {
    return state.children[i] && state.children[i].cid === c.constructor.cid
  })
  if (hasSameChildren) {
    // rehydrate children
    vm.$children.forEach(function (c, i) {
      restoreState(c, state.children[i])
    })
  }
  if (isRoot) {
    Vue.config.async = oldAsyncConfig
  }
}

function format (id) {
  var match = id.match(/[^\/]+\.vue$/)
  return match ? match[0] : id
}

},{}],23:[function(require,module,exports){
var moment = require('moment');

module.exports = {
	install: function (Vue, options) {
		Object.defineProperties(Vue.prototype, {
			$moment: {
				get: function() {
					return Vue.moment.bind(this);
				},
			},
		});

		if (options && options.moment) {
			moment = options.moment
		}

		Vue.moment = function(data) {
			return moment(data);
		}

		Vue.filter('moment', function() {
			var args = Array.prototype.slice.call(arguments),
				input = args.shift(),
				date;

			if (Array.isArray(input) && typeof input[0] === 'string') {
				// If input is array, assume we're being passed a format pattern to parse against.
				// Format pattern will accept an array of potential formats to parse against.
				// Date string should be at [0], format pattern(s) should be at [1]
				date = moment(string = input[0], formats = input[1], true);
			} else {
				// Otherwise, throw the input at moment and see what happens...
				date = moment(input);
			}

			if (!date.isValid()) {
				// Log a warning if moment couldn't reconcile the input. Better than throwing an error?
				console.warn('Could not build a valid `moment` object from input.');
				return input;
			}

			function parse() {
				var args = Array.prototype.slice.call(arguments),
					method = args.shift();

				switch (method) {
					case 'add':

						// Mutates the original moment by adding time.
						// http://momentjs.com/docs/#/manipulating/add/

						var addends = args.shift()
										  .split(',')
										  .map(Function.prototype.call, String.prototype.trim);
						obj = {};
						for (var n = 0; n < addends.length; n++) {
							var addend = addends[n].split(' ');
							obj[addend[1]] = addend[0];
						}
						date = date.add(obj);
						break;

					case 'subtract':

						// Mutates the original moment by subtracting time.
						// http://momentjs.com/docs/#/manipulating/subtract/

						var subtrahends = args.shift()
										  .split(',')
										  .map(Function.prototype.call, String.prototype.trim);
						obj = {};
						for (var n = 0; n < subtrahends.length; n++) {
							var subtrahend = subtrahends[n].split(' ');
							obj[subtrahend[1]] = subtrahend[0];
						}
						date = date.subtract(obj);
						break;

					case 'from':

						// Display a moment in relative time, either from now or from a specified date.
						// http://momentjs.com/docs/#/displaying/fromnow/

						var from = 'now';
						if (args[0] == 'now') args.shift();

						if (moment(args[0]).isValid()) {
							// If valid, assume it is a date we want the output computed against.
							from = moment(args.shift());
						}

						var removeSuffix = false;
						if (args[0] === true) {
							args.shift();
							var removeSuffix = true;
						}

						if (from != 'now') {
							date = date.from(from, removeSuffix);
							break;
						}

						date = date.fromNow(removeSuffix);
						break;

					case 'calendar':

						// Formats a date with different strings depending on how close to a certain date (today by default) the date is.
						// http://momentjs.com/docs/#/displaying/calendar-time/

						var referenceTime = moment();

						if (moment(args[0]).isValid()) {
							// If valid, assume it is a date we want the output computed against.
							referenceTime = moment(args.shift());
						}

						date = date.calendar(referenceTime);
						break;

					default:
						// Format
						// Formats a date by taking a string of tokens and replacing them with their corresponding values.
						// http://momentjs.com/docs/#/displaying/format/

						var format = method;
						date = date.format(format);
				}

				if (args.length) parse.apply(parse, args);
			}

			parse.apply(parse, args);


			return date;
		});
	},
};

},{"moment":20}],24:[function(require,module,exports){
/*!
 * vue-resource v1.0.2
 * https://github.com/vuejs/vue-resource
 * Released under the MIT License.
 */

'use strict';

/**
 * Promises/A+ polyfill v1.1.4 (https://github.com/bramstein/promis)
 */

var RESOLVED = 0;
var REJECTED = 1;
var PENDING = 2;

function Promise$1(executor) {

    this.state = PENDING;
    this.value = undefined;
    this.deferred = [];

    var promise = this;

    try {
        executor(function (x) {
            promise.resolve(x);
        }, function (r) {
            promise.reject(r);
        });
    } catch (e) {
        promise.reject(e);
    }
}

Promise$1.reject = function (r) {
    return new Promise$1(function (resolve, reject) {
        reject(r);
    });
};

Promise$1.resolve = function (x) {
    return new Promise$1(function (resolve, reject) {
        resolve(x);
    });
};

Promise$1.all = function all(iterable) {
    return new Promise$1(function (resolve, reject) {
        var count = 0,
            result = [];

        if (iterable.length === 0) {
            resolve(result);
        }

        function resolver(i) {
            return function (x) {
                result[i] = x;
                count += 1;

                if (count === iterable.length) {
                    resolve(result);
                }
            };
        }

        for (var i = 0; i < iterable.length; i += 1) {
            Promise$1.resolve(iterable[i]).then(resolver(i), reject);
        }
    });
};

Promise$1.race = function race(iterable) {
    return new Promise$1(function (resolve, reject) {
        for (var i = 0; i < iterable.length; i += 1) {
            Promise$1.resolve(iterable[i]).then(resolve, reject);
        }
    });
};

var p$1 = Promise$1.prototype;

p$1.resolve = function resolve(x) {
    var promise = this;

    if (promise.state === PENDING) {
        if (x === promise) {
            throw new TypeError('Promise settled with itself.');
        }

        var called = false;

        try {
            var then = x && x['then'];

            if (x !== null && typeof x === 'object' && typeof then === 'function') {
                then.call(x, function (x) {
                    if (!called) {
                        promise.resolve(x);
                    }
                    called = true;
                }, function (r) {
                    if (!called) {
                        promise.reject(r);
                    }
                    called = true;
                });
                return;
            }
        } catch (e) {
            if (!called) {
                promise.reject(e);
            }
            return;
        }

        promise.state = RESOLVED;
        promise.value = x;
        promise.notify();
    }
};

p$1.reject = function reject(reason) {
    var promise = this;

    if (promise.state === PENDING) {
        if (reason === promise) {
            throw new TypeError('Promise settled with itself.');
        }

        promise.state = REJECTED;
        promise.value = reason;
        promise.notify();
    }
};

p$1.notify = function notify() {
    var promise = this;

    nextTick(function () {
        if (promise.state !== PENDING) {
            while (promise.deferred.length) {
                var deferred = promise.deferred.shift(),
                    onResolved = deferred[0],
                    onRejected = deferred[1],
                    resolve = deferred[2],
                    reject = deferred[3];

                try {
                    if (promise.state === RESOLVED) {
                        if (typeof onResolved === 'function') {
                            resolve(onResolved.call(undefined, promise.value));
                        } else {
                            resolve(promise.value);
                        }
                    } else if (promise.state === REJECTED) {
                        if (typeof onRejected === 'function') {
                            resolve(onRejected.call(undefined, promise.value));
                        } else {
                            reject(promise.value);
                        }
                    }
                } catch (e) {
                    reject(e);
                }
            }
        }
    });
};

p$1.then = function then(onResolved, onRejected) {
    var promise = this;

    return new Promise$1(function (resolve, reject) {
        promise.deferred.push([onResolved, onRejected, resolve, reject]);
        promise.notify();
    });
};

p$1.catch = function (onRejected) {
    return this.then(undefined, onRejected);
};

/**
 * Promise adapter.
 */

if (typeof Promise === 'undefined') {
    window.Promise = Promise$1;
}

function PromiseObj(executor, context) {

    if (executor instanceof Promise) {
        this.promise = executor;
    } else {
        this.promise = new Promise(executor.bind(context));
    }

    this.context = context;
}

PromiseObj.all = function (iterable, context) {
    return new PromiseObj(Promise.all(iterable), context);
};

PromiseObj.resolve = function (value, context) {
    return new PromiseObj(Promise.resolve(value), context);
};

PromiseObj.reject = function (reason, context) {
    return new PromiseObj(Promise.reject(reason), context);
};

PromiseObj.race = function (iterable, context) {
    return new PromiseObj(Promise.race(iterable), context);
};

var p = PromiseObj.prototype;

p.bind = function (context) {
    this.context = context;
    return this;
};

p.then = function (fulfilled, rejected) {

    if (fulfilled && fulfilled.bind && this.context) {
        fulfilled = fulfilled.bind(this.context);
    }

    if (rejected && rejected.bind && this.context) {
        rejected = rejected.bind(this.context);
    }

    return new PromiseObj(this.promise.then(fulfilled, rejected), this.context);
};

p.catch = function (rejected) {

    if (rejected && rejected.bind && this.context) {
        rejected = rejected.bind(this.context);
    }

    return new PromiseObj(this.promise.catch(rejected), this.context);
};

p.finally = function (callback) {

    return this.then(function (value) {
        callback.call(this);
        return value;
    }, function (reason) {
        callback.call(this);
        return Promise.reject(reason);
    });
};

/**
 * Utility functions.
 */

var debug = false;var util = {};var slice = [].slice;


function Util (Vue) {
    util = Vue.util;
    debug = Vue.config.debug || !Vue.config.silent;
}

function warn(msg) {
    if (typeof console !== 'undefined' && debug) {
        console.warn('[VueResource warn]: ' + msg);
    }
}

function error(msg) {
    if (typeof console !== 'undefined') {
        console.error(msg);
    }
}

function nextTick(cb, ctx) {
    return util.nextTick(cb, ctx);
}

function trim(str) {
    return str.replace(/^\s*|\s*$/g, '');
}

function toLower(str) {
    return str ? str.toLowerCase() : '';
}

function toUpper(str) {
    return str ? str.toUpperCase() : '';
}

var isArray = Array.isArray;

function isString(val) {
    return typeof val === 'string';
}

function isBoolean(val) {
    return val === true || val === false;
}

function isFunction(val) {
    return typeof val === 'function';
}

function isObject(obj) {
    return obj !== null && typeof obj === 'object';
}

function isPlainObject(obj) {
    return isObject(obj) && Object.getPrototypeOf(obj) == Object.prototype;
}

function isBlob(obj) {
    return typeof Blob !== 'undefined' && obj instanceof Blob;
}

function isFormData(obj) {
    return typeof FormData !== 'undefined' && obj instanceof FormData;
}

function when(value, fulfilled, rejected) {

    var promise = PromiseObj.resolve(value);

    if (arguments.length < 2) {
        return promise;
    }

    return promise.then(fulfilled, rejected);
}

function options(fn, obj, opts) {

    opts = opts || {};

    if (isFunction(opts)) {
        opts = opts.call(obj);
    }

    return merge(fn.bind({ $vm: obj, $options: opts }), fn, { $options: opts });
}

function each(obj, iterator) {

    var i, key;

    if (obj && typeof obj.length == 'number') {
        for (i = 0; i < obj.length; i++) {
            iterator.call(obj[i], obj[i], i);
        }
    } else if (isObject(obj)) {
        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                iterator.call(obj[key], obj[key], key);
            }
        }
    }

    return obj;
}

var assign = Object.assign || _assign;

function merge(target) {

    var args = slice.call(arguments, 1);

    args.forEach(function (source) {
        _merge(target, source, true);
    });

    return target;
}

function defaults(target) {

    var args = slice.call(arguments, 1);

    args.forEach(function (source) {

        for (var key in source) {
            if (target[key] === undefined) {
                target[key] = source[key];
            }
        }
    });

    return target;
}

function _assign(target) {

    var args = slice.call(arguments, 1);

    args.forEach(function (source) {
        _merge(target, source);
    });

    return target;
}

function _merge(target, source, deep) {
    for (var key in source) {
        if (deep && (isPlainObject(source[key]) || isArray(source[key]))) {
            if (isPlainObject(source[key]) && !isPlainObject(target[key])) {
                target[key] = {};
            }
            if (isArray(source[key]) && !isArray(target[key])) {
                target[key] = [];
            }
            _merge(target[key], source[key], deep);
        } else if (source[key] !== undefined) {
            target[key] = source[key];
        }
    }
}

/**
 * Root Prefix Transform.
 */

function root (options, next) {

    var url = next(options);

    if (isString(options.root) && !url.match(/^(https?:)?\//)) {
        url = options.root + '/' + url;
    }

    return url;
}

/**
 * Query Parameter Transform.
 */

function query (options, next) {

    var urlParams = Object.keys(Url.options.params),
        query = {},
        url = next(options);

    each(options.params, function (value, key) {
        if (urlParams.indexOf(key) === -1) {
            query[key] = value;
        }
    });

    query = Url.params(query);

    if (query) {
        url += (url.indexOf('?') == -1 ? '?' : '&') + query;
    }

    return url;
}

/**
 * URL Template v2.0.6 (https://github.com/bramstein/url-template)
 */

function expand(url, params, variables) {

    var tmpl = parse(url),
        expanded = tmpl.expand(params);

    if (variables) {
        variables.push.apply(variables, tmpl.vars);
    }

    return expanded;
}

function parse(template) {

    var operators = ['+', '#', '.', '/', ';', '?', '&'],
        variables = [];

    return {
        vars: variables,
        expand: function (context) {
            return template.replace(/\{([^\{\}]+)\}|([^\{\}]+)/g, function (_, expression, literal) {
                if (expression) {

                    var operator = null,
                        values = [];

                    if (operators.indexOf(expression.charAt(0)) !== -1) {
                        operator = expression.charAt(0);
                        expression = expression.substr(1);
                    }

                    expression.split(/,/g).forEach(function (variable) {
                        var tmp = /([^:\*]*)(?::(\d+)|(\*))?/.exec(variable);
                        values.push.apply(values, getValues(context, operator, tmp[1], tmp[2] || tmp[3]));
                        variables.push(tmp[1]);
                    });

                    if (operator && operator !== '+') {

                        var separator = ',';

                        if (operator === '?') {
                            separator = '&';
                        } else if (operator !== '#') {
                            separator = operator;
                        }

                        return (values.length !== 0 ? operator : '') + values.join(separator);
                    } else {
                        return values.join(',');
                    }
                } else {
                    return encodeReserved(literal);
                }
            });
        }
    };
}

function getValues(context, operator, key, modifier) {

    var value = context[key],
        result = [];

    if (isDefined(value) && value !== '') {
        if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
            value = value.toString();

            if (modifier && modifier !== '*') {
                value = value.substring(0, parseInt(modifier, 10));
            }

            result.push(encodeValue(operator, value, isKeyOperator(operator) ? key : null));
        } else {
            if (modifier === '*') {
                if (Array.isArray(value)) {
                    value.filter(isDefined).forEach(function (value) {
                        result.push(encodeValue(operator, value, isKeyOperator(operator) ? key : null));
                    });
                } else {
                    Object.keys(value).forEach(function (k) {
                        if (isDefined(value[k])) {
                            result.push(encodeValue(operator, value[k], k));
                        }
                    });
                }
            } else {
                var tmp = [];

                if (Array.isArray(value)) {
                    value.filter(isDefined).forEach(function (value) {
                        tmp.push(encodeValue(operator, value));
                    });
                } else {
                    Object.keys(value).forEach(function (k) {
                        if (isDefined(value[k])) {
                            tmp.push(encodeURIComponent(k));
                            tmp.push(encodeValue(operator, value[k].toString()));
                        }
                    });
                }

                if (isKeyOperator(operator)) {
                    result.push(encodeURIComponent(key) + '=' + tmp.join(','));
                } else if (tmp.length !== 0) {
                    result.push(tmp.join(','));
                }
            }
        }
    } else {
        if (operator === ';') {
            result.push(encodeURIComponent(key));
        } else if (value === '' && (operator === '&' || operator === '?')) {
            result.push(encodeURIComponent(key) + '=');
        } else if (value === '') {
            result.push('');
        }
    }

    return result;
}

function isDefined(value) {
    return value !== undefined && value !== null;
}

function isKeyOperator(operator) {
    return operator === ';' || operator === '&' || operator === '?';
}

function encodeValue(operator, value, key) {

    value = operator === '+' || operator === '#' ? encodeReserved(value) : encodeURIComponent(value);

    if (key) {
        return encodeURIComponent(key) + '=' + value;
    } else {
        return value;
    }
}

function encodeReserved(str) {
    return str.split(/(%[0-9A-Fa-f]{2})/g).map(function (part) {
        if (!/%[0-9A-Fa-f]/.test(part)) {
            part = encodeURI(part);
        }
        return part;
    }).join('');
}

/**
 * URL Template (RFC 6570) Transform.
 */

function template (options) {

    var variables = [],
        url = expand(options.url, options.params, variables);

    variables.forEach(function (key) {
        delete options.params[key];
    });

    return url;
}

/**
 * Service for URL templating.
 */

var ie = document.documentMode;
var el = document.createElement('a');

function Url(url, params) {

    var self = this || {},
        options = url,
        transform;

    if (isString(url)) {
        options = { url: url, params: params };
    }

    options = merge({}, Url.options, self.$options, options);

    Url.transforms.forEach(function (handler) {
        transform = factory(handler, transform, self.$vm);
    });

    return transform(options);
}

/**
 * Url options.
 */

Url.options = {
    url: '',
    root: null,
    params: {}
};

/**
 * Url transforms.
 */

Url.transforms = [template, query, root];

/**
 * Encodes a Url parameter string.
 *
 * @param {Object} obj
 */

Url.params = function (obj) {

    var params = [],
        escape = encodeURIComponent;

    params.add = function (key, value) {

        if (isFunction(value)) {
            value = value();
        }

        if (value === null) {
            value = '';
        }

        this.push(escape(key) + '=' + escape(value));
    };

    serialize(params, obj);

    return params.join('&').replace(/%20/g, '+');
};

/**
 * Parse a URL and return its components.
 *
 * @param {String} url
 */

Url.parse = function (url) {

    if (ie) {
        el.href = url;
        url = el.href;
    }

    el.href = url;

    return {
        href: el.href,
        protocol: el.protocol ? el.protocol.replace(/:$/, '') : '',
        port: el.port,
        host: el.host,
        hostname: el.hostname,
        pathname: el.pathname.charAt(0) === '/' ? el.pathname : '/' + el.pathname,
        search: el.search ? el.search.replace(/^\?/, '') : '',
        hash: el.hash ? el.hash.replace(/^#/, '') : ''
    };
};

function factory(handler, next, vm) {
    return function (options) {
        return handler.call(vm, options, next);
    };
}

function serialize(params, obj, scope) {

    var array = isArray(obj),
        plain = isPlainObject(obj),
        hash;

    each(obj, function (value, key) {

        hash = isObject(value) || isArray(value);

        if (scope) {
            key = scope + '[' + (plain || hash ? key : '') + ']';
        }

        if (!scope && array) {
            params.add(value.name, value.value);
        } else if (hash) {
            serialize(params, value, key);
        } else {
            params.add(key, value);
        }
    });
}

/**
 * XDomain client (Internet Explorer).
 */

function xdrClient (request) {
    return new PromiseObj(function (resolve) {

        var xdr = new XDomainRequest(),
            handler = function (event) {

            var response = request.respondWith(xdr.responseText, {
                status: xdr.status,
                statusText: xdr.statusText
            });

            resolve(response);
        };

        request.abort = function () {
            return xdr.abort();
        };

        xdr.open(request.method, request.getUrl(), true);
        xdr.timeout = 0;
        xdr.onload = handler;
        xdr.onerror = handler;
        xdr.ontimeout = function () {};
        xdr.onprogress = function () {};
        xdr.send(request.getBody());
    });
}

/**
 * CORS Interceptor.
 */

var ORIGIN_URL = Url.parse(location.href);
var SUPPORTS_CORS = 'withCredentials' in new XMLHttpRequest();

function cors (request, next) {

    if (!isBoolean(request.crossOrigin) && crossOrigin(request)) {
        request.crossOrigin = true;
    }

    if (request.crossOrigin) {

        if (!SUPPORTS_CORS) {
            request.client = xdrClient;
        }

        delete request.emulateHTTP;
    }

    next();
}

function crossOrigin(request) {

    var requestUrl = Url.parse(Url(request));

    return requestUrl.protocol !== ORIGIN_URL.protocol || requestUrl.host !== ORIGIN_URL.host;
}

/**
 * Body Interceptor.
 */

function body (request, next) {

    if (isFormData(request.body)) {

        request.headers.delete('Content-Type');
    } else if (isObject(request.body) || isArray(request.body)) {

        if (request.emulateJSON) {
            request.body = Url.params(request.body);
            request.headers.set('Content-Type', 'application/x-www-form-urlencoded');
        } else {
            request.body = JSON.stringify(request.body);
        }
    }

    next(function (response) {

        Object.defineProperty(response, 'data', {
            get: function () {
                return this.body;
            },
            set: function (body) {
                this.body = body;
            }
        });

        return response.bodyText ? when(response.text(), function (text) {

            var type = response.headers.get('Content-Type');

            if (isString(type) && type.indexOf('application/json') === 0) {

                try {
                    response.body = JSON.parse(text);
                } catch (e) {
                    response.body = null;
                }
            } else {
                response.body = text;
            }

            return response;
        }) : response;
    });
}

/**
 * JSONP client.
 */

function jsonpClient (request) {
    return new PromiseObj(function (resolve) {

        var name = request.jsonp || 'callback',
            callback = '_jsonp' + Math.random().toString(36).substr(2),
            body = null,
            handler,
            script;

        handler = function (event) {

            var status = 0;

            if (event.type === 'load' && body !== null) {
                status = 200;
            } else if (event.type === 'error') {
                status = 404;
            }

            resolve(request.respondWith(body, { status: status }));

            delete window[callback];
            document.body.removeChild(script);
        };

        request.params[name] = callback;

        window[callback] = function (result) {
            body = JSON.stringify(result);
        };

        script = document.createElement('script');
        script.src = request.getUrl();
        script.type = 'text/javascript';
        script.async = true;
        script.onload = handler;
        script.onerror = handler;

        document.body.appendChild(script);
    });
}

/**
 * JSONP Interceptor.
 */

function jsonp (request, next) {

    if (request.method == 'JSONP') {
        request.client = jsonpClient;
    }

    next(function (response) {

        if (request.method == 'JSONP') {

            return when(response.json(), function (json) {

                response.body = json;

                return response;
            });
        }
    });
}

/**
 * Before Interceptor.
 */

function before (request, next) {

    if (isFunction(request.before)) {
        request.before.call(this, request);
    }

    next();
}

/**
 * HTTP method override Interceptor.
 */

function method (request, next) {

    if (request.emulateHTTP && /^(PUT|PATCH|DELETE)$/i.test(request.method)) {
        request.headers.set('X-HTTP-Method-Override', request.method);
        request.method = 'POST';
    }

    next();
}

/**
 * Header Interceptor.
 */

function header (request, next) {

    var headers = assign({}, Http.headers.common, !request.crossOrigin ? Http.headers.custom : {}, Http.headers[toLower(request.method)]);

    each(headers, function (value, name) {
        if (!request.headers.has(name)) {
            request.headers.set(name, value);
        }
    });

    next();
}

/**
 * Timeout Interceptor.
 */

function timeout (request, next) {

    var timeout;

    if (request.timeout) {
        timeout = setTimeout(function () {
            request.abort();
        }, request.timeout);
    }

    next(function (response) {

        clearTimeout(timeout);
    });
}

/**
 * XMLHttp client.
 */

function xhrClient (request) {
    return new PromiseObj(function (resolve) {

        var xhr = new XMLHttpRequest(),
            handler = function (event) {

            var response = request.respondWith('response' in xhr ? xhr.response : xhr.responseText, {
                status: xhr.status === 1223 ? 204 : xhr.status, // IE9 status bug
                statusText: xhr.status === 1223 ? 'No Content' : trim(xhr.statusText)
            });

            each(trim(xhr.getAllResponseHeaders()).split('\n'), function (row) {
                response.headers.append(row.slice(0, row.indexOf(':')), row.slice(row.indexOf(':') + 1));
            });

            resolve(response);
        };

        request.abort = function () {
            return xhr.abort();
        };

        if (request.progress) {
            if (request.method === 'GET') {
                xhr.addEventListener('progress', request.progress);
            } else if (/^(POST|PUT)$/i.test(request.method)) {
                xhr.upload.addEventListener('progress', request.progress);
            }
        }

        xhr.open(request.method, request.getUrl(), true);

        if ('responseType' in xhr) {
            xhr.responseType = 'blob';
        }

        if (request.credentials === true) {
            xhr.withCredentials = true;
        }

        request.headers.forEach(function (value, name) {
            xhr.setRequestHeader(name, value);
        });

        xhr.timeout = 0;
        xhr.onload = handler;
        xhr.onerror = handler;
        xhr.send(request.getBody());
    });
}

/**
 * Base client.
 */

function Client (context) {

    var reqHandlers = [sendRequest],
        resHandlers = [],
        handler;

    if (!isObject(context)) {
        context = null;
    }

    function Client(request) {
        return new PromiseObj(function (resolve) {

            function exec() {

                handler = reqHandlers.pop();

                if (isFunction(handler)) {
                    handler.call(context, request, next);
                } else {
                    warn('Invalid interceptor of type ' + typeof handler + ', must be a function');
                    next();
                }
            }

            function next(response) {

                if (isFunction(response)) {

                    resHandlers.unshift(response);
                } else if (isObject(response)) {

                    resHandlers.forEach(function (handler) {
                        response = when(response, function (response) {
                            return handler.call(context, response) || response;
                        });
                    });

                    when(response, resolve);

                    return;
                }

                exec();
            }

            exec();
        }, context);
    }

    Client.use = function (handler) {
        reqHandlers.push(handler);
    };

    return Client;
}

function sendRequest(request, resolve) {

    var client = request.client || xhrClient;

    resolve(client(request));
}

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/**
 * HTTP Headers.
 */

var Headers = function () {
    function Headers(headers) {
        var _this = this;

        classCallCheck(this, Headers);


        this.map = {};

        each(headers, function (value, name) {
            return _this.append(name, value);
        });
    }

    Headers.prototype.has = function has(name) {
        return getName(this.map, name) !== null;
    };

    Headers.prototype.get = function get(name) {

        var list = this.map[getName(this.map, name)];

        return list ? list[0] : null;
    };

    Headers.prototype.getAll = function getAll(name) {
        return this.map[getName(this.map, name)] || [];
    };

    Headers.prototype.set = function set(name, value) {
        this.map[normalizeName(getName(this.map, name) || name)] = [trim(value)];
    };

    Headers.prototype.append = function append(name, value) {

        var list = this.getAll(name);

        if (list.length) {
            list.push(trim(value));
        } else {
            this.set(name, value);
        }
    };

    Headers.prototype.delete = function _delete(name) {
        delete this.map[getName(this.map, name)];
    };

    Headers.prototype.forEach = function forEach(callback, thisArg) {
        var _this2 = this;

        each(this.map, function (list, name) {
            each(list, function (value) {
                return callback.call(thisArg, value, name, _this2);
            });
        });
    };

    return Headers;
}();

function getName(map, name) {
    return Object.keys(map).reduce(function (prev, curr) {
        return toLower(name) === toLower(curr) ? curr : prev;
    }, null);
}

function normalizeName(name) {

    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
        throw new TypeError('Invalid character in header field name');
    }

    return trim(name);
}

/**
 * HTTP Response.
 */

var Response = function () {
    function Response(body, _ref) {
        var url = _ref.url;
        var headers = _ref.headers;
        var status = _ref.status;
        var statusText = _ref.statusText;
        classCallCheck(this, Response);


        this.url = url;
        this.ok = status >= 200 && status < 300;
        this.status = status || 0;
        this.statusText = statusText || '';
        this.headers = new Headers(headers);
        this.body = body;

        if (isString(body)) {

            this.bodyText = body;
        } else if (isBlob(body)) {

            this.bodyBlob = body;

            if (isBlobText(body)) {
                this.bodyText = blobText(body);
            }
        }
    }

    Response.prototype.blob = function blob() {
        return when(this.bodyBlob);
    };

    Response.prototype.text = function text() {
        return when(this.bodyText);
    };

    Response.prototype.json = function json() {
        return when(this.text(), function (text) {
            return JSON.parse(text);
        });
    };

    return Response;
}();

function blobText(body) {
    return new PromiseObj(function (resolve) {

        var reader = new FileReader();

        reader.readAsText(body);
        reader.onload = function () {
            resolve(reader.result);
        };
    });
}

function isBlobText(body) {
    return body.type.indexOf('text') === 0 || body.type.indexOf('json') !== -1;
}

/**
 * HTTP Request.
 */

var Request = function () {
    function Request(options) {
        classCallCheck(this, Request);


        this.body = null;
        this.params = {};

        assign(this, options, {
            method: toUpper(options.method || 'GET')
        });

        if (!(this.headers instanceof Headers)) {
            this.headers = new Headers(this.headers);
        }
    }

    Request.prototype.getUrl = function getUrl() {
        return Url(this);
    };

    Request.prototype.getBody = function getBody() {
        return this.body;
    };

    Request.prototype.respondWith = function respondWith(body, options) {
        return new Response(body, assign(options || {}, { url: this.getUrl() }));
    };

    return Request;
}();

/**
 * Service for sending network requests.
 */

var CUSTOM_HEADERS = { 'X-Requested-With': 'XMLHttpRequest' };
var COMMON_HEADERS = { 'Accept': 'application/json, text/plain, */*' };
var JSON_CONTENT_TYPE = { 'Content-Type': 'application/json;charset=utf-8' };

function Http(options) {

    var self = this || {},
        client = Client(self.$vm);

    defaults(options || {}, self.$options, Http.options);

    Http.interceptors.forEach(function (handler) {
        client.use(handler);
    });

    return client(new Request(options)).then(function (response) {

        return response.ok ? response : PromiseObj.reject(response);
    }, function (response) {

        if (response instanceof Error) {
            error(response);
        }

        return PromiseObj.reject(response);
    });
}

Http.options = {};

Http.headers = {
    put: JSON_CONTENT_TYPE,
    post: JSON_CONTENT_TYPE,
    patch: JSON_CONTENT_TYPE,
    delete: JSON_CONTENT_TYPE,
    custom: CUSTOM_HEADERS,
    common: COMMON_HEADERS
};

Http.interceptors = [before, timeout, method, body, jsonp, header, cors];

['get', 'delete', 'head', 'jsonp'].forEach(function (method) {

    Http[method] = function (url, options) {
        return this(assign(options || {}, { url: url, method: method }));
    };
});

['post', 'put', 'patch'].forEach(function (method) {

    Http[method] = function (url, body, options) {
        return this(assign(options || {}, { url: url, method: method, body: body }));
    };
});

/**
 * Service for interacting with RESTful services.
 */

function Resource(url, params, actions, options) {

    var self = this || {},
        resource = {};

    actions = assign({}, Resource.actions, actions);

    each(actions, function (action, name) {

        action = merge({ url: url, params: assign({}, params) }, options, action);

        resource[name] = function () {
            return (self.$http || Http)(opts(action, arguments));
        };
    });

    return resource;
}

function opts(action, args) {

    var options = assign({}, action),
        params = {},
        body;

    switch (args.length) {

        case 2:

            params = args[0];
            body = args[1];

            break;

        case 1:

            if (/^(POST|PUT|PATCH)$/i.test(options.method)) {
                body = args[0];
            } else {
                params = args[0];
            }

            break;

        case 0:

            break;

        default:

            throw 'Expected up to 4 arguments [params, body], got ' + args.length + ' arguments';
    }

    options.body = body;
    options.params = assign({}, options.params, params);

    return options;
}

Resource.actions = {

    get: { method: 'GET' },
    save: { method: 'POST' },
    query: { method: 'GET' },
    update: { method: 'PUT' },
    remove: { method: 'DELETE' },
    delete: { method: 'DELETE' }

};

/**
 * Install plugin.
 */

function plugin(Vue) {

    if (plugin.installed) {
        return;
    }

    Util(Vue);

    Vue.url = Url;
    Vue.http = Http;
    Vue.resource = Resource;
    Vue.Promise = PromiseObj;

    Object.defineProperties(Vue.prototype, {

        $url: {
            get: function () {
                return options(Vue.url, this, this.$options.url);
            }
        },

        $http: {
            get: function () {
                return options(Vue.http, this, this.$options.http);
            }
        },

        $resource: {
            get: function () {
                return Vue.resource.bind(this);
            }
        },

        $promise: {
            get: function () {
                var _this = this;

                return function (executor) {
                    return new Vue.Promise(executor, _this);
                };
            }
        }

    });
}

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(plugin);
}

module.exports = plugin;
},{}],25:[function(require,module,exports){
/*!
 * vue-router v0.7.10
 * (c) 2016 Evan You
 * Released under the MIT License.
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  global.VueRouter = factory();
}(this, function () { 'use strict';

  var babelHelpers = {};

  babelHelpers.classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };
  function Target(path, matcher, delegate) {
    this.path = path;
    this.matcher = matcher;
    this.delegate = delegate;
  }

  Target.prototype = {
    to: function to(target, callback) {
      var delegate = this.delegate;

      if (delegate && delegate.willAddRoute) {
        target = delegate.willAddRoute(this.matcher.target, target);
      }

      this.matcher.add(this.path, target);

      if (callback) {
        if (callback.length === 0) {
          throw new Error("You must have an argument in the function passed to `to`");
        }
        this.matcher.addChild(this.path, target, callback, this.delegate);
      }
      return this;
    }
  };

  function Matcher(target) {
    this.routes = {};
    this.children = {};
    this.target = target;
  }

  Matcher.prototype = {
    add: function add(path, handler) {
      this.routes[path] = handler;
    },

    addChild: function addChild(path, target, callback, delegate) {
      var matcher = new Matcher(target);
      this.children[path] = matcher;

      var match = generateMatch(path, matcher, delegate);

      if (delegate && delegate.contextEntered) {
        delegate.contextEntered(target, match);
      }

      callback(match);
    }
  };

  function generateMatch(startingPath, matcher, delegate) {
    return function (path, nestedCallback) {
      var fullPath = startingPath + path;

      if (nestedCallback) {
        nestedCallback(generateMatch(fullPath, matcher, delegate));
      } else {
        return new Target(startingPath + path, matcher, delegate);
      }
    };
  }

  function addRoute(routeArray, path, handler) {
    var len = 0;
    for (var i = 0, l = routeArray.length; i < l; i++) {
      len += routeArray[i].path.length;
    }

    path = path.substr(len);
    var route = { path: path, handler: handler };
    routeArray.push(route);
  }

  function eachRoute(baseRoute, matcher, callback, binding) {
    var routes = matcher.routes;

    for (var path in routes) {
      if (routes.hasOwnProperty(path)) {
        var routeArray = baseRoute.slice();
        addRoute(routeArray, path, routes[path]);

        if (matcher.children[path]) {
          eachRoute(routeArray, matcher.children[path], callback, binding);
        } else {
          callback.call(binding, routeArray);
        }
      }
    }
  }

  function map (callback, addRouteCallback) {
    var matcher = new Matcher();

    callback(generateMatch("", matcher, this.delegate));

    eachRoute([], matcher, function (route) {
      if (addRouteCallback) {
        addRouteCallback(this, route);
      } else {
        this.add(route);
      }
    }, this);
  }

  var specials = ['/', '.', '*', '+', '?', '|', '(', ')', '[', ']', '{', '}', '\\'];

  var escapeRegex = new RegExp('(\\' + specials.join('|\\') + ')', 'g');

  function isArray(test) {
    return Object.prototype.toString.call(test) === "[object Array]";
  }

  // A Segment represents a segment in the original route description.
  // Each Segment type provides an `eachChar` and `regex` method.
  //
  // The `eachChar` method invokes the callback with one or more character
  // specifications. A character specification consumes one or more input
  // characters.
  //
  // The `regex` method returns a regex fragment for the segment. If the
  // segment is a dynamic of star segment, the regex fragment also includes
  // a capture.
  //
  // A character specification contains:
  //
  // * `validChars`: a String with a list of all valid characters, or
  // * `invalidChars`: a String with a list of all invalid characters
  // * `repeat`: true if the character specification can repeat

  function StaticSegment(string) {
    this.string = string;
  }
  StaticSegment.prototype = {
    eachChar: function eachChar(callback) {
      var string = this.string,
          ch;

      for (var i = 0, l = string.length; i < l; i++) {
        ch = string.charAt(i);
        callback({ validChars: ch });
      }
    },

    regex: function regex() {
      return this.string.replace(escapeRegex, '\\$1');
    },

    generate: function generate() {
      return this.string;
    }
  };

  function DynamicSegment(name) {
    this.name = name;
  }
  DynamicSegment.prototype = {
    eachChar: function eachChar(callback) {
      callback({ invalidChars: "/", repeat: true });
    },

    regex: function regex() {
      return "([^/]+)";
    },

    generate: function generate(params) {
      var val = params[this.name];
      return val == null ? ":" + this.name : val;
    }
  };

  function StarSegment(name) {
    this.name = name;
  }
  StarSegment.prototype = {
    eachChar: function eachChar(callback) {
      callback({ invalidChars: "", repeat: true });
    },

    regex: function regex() {
      return "(.+)";
    },

    generate: function generate(params) {
      var val = params[this.name];
      return val == null ? ":" + this.name : val;
    }
  };

  function EpsilonSegment() {}
  EpsilonSegment.prototype = {
    eachChar: function eachChar() {},
    regex: function regex() {
      return "";
    },
    generate: function generate() {
      return "";
    }
  };

  function parse(route, names, specificity) {
    // normalize route as not starting with a "/". Recognition will
    // also normalize.
    if (route.charAt(0) === "/") {
      route = route.substr(1);
    }

    var segments = route.split("/"),
        results = [];

    // A routes has specificity determined by the order that its different segments
    // appear in. This system mirrors how the magnitude of numbers written as strings
    // works.
    // Consider a number written as: "abc". An example would be "200". Any other number written
    // "xyz" will be smaller than "abc" so long as `a > z`. For instance, "199" is smaller
    // then "200", even though "y" and "z" (which are both 9) are larger than "0" (the value
    // of (`b` and `c`). This is because the leading symbol, "2", is larger than the other
    // leading symbol, "1".
    // The rule is that symbols to the left carry more weight than symbols to the right
    // when a number is written out as a string. In the above strings, the leading digit
    // represents how many 100's are in the number, and it carries more weight than the middle
    // number which represents how many 10's are in the number.
    // This system of number magnitude works well for route specificity, too. A route written as
    // `a/b/c` will be more specific than `x/y/z` as long as `a` is more specific than
    // `x`, irrespective of the other parts.
    // Because of this similarity, we assign each type of segment a number value written as a
    // string. We can find the specificity of compound routes by concatenating these strings
    // together, from left to right. After we have looped through all of the segments,
    // we convert the string to a number.
    specificity.val = '';

    for (var i = 0, l = segments.length; i < l; i++) {
      var segment = segments[i],
          match;

      if (match = segment.match(/^:([^\/]+)$/)) {
        results.push(new DynamicSegment(match[1]));
        names.push(match[1]);
        specificity.val += '3';
      } else if (match = segment.match(/^\*([^\/]+)$/)) {
        results.push(new StarSegment(match[1]));
        specificity.val += '2';
        names.push(match[1]);
      } else if (segment === "") {
        results.push(new EpsilonSegment());
        specificity.val += '1';
      } else {
        results.push(new StaticSegment(segment));
        specificity.val += '4';
      }
    }

    specificity.val = +specificity.val;

    return results;
  }

  // A State has a character specification and (`charSpec`) and a list of possible
  // subsequent states (`nextStates`).
  //
  // If a State is an accepting state, it will also have several additional
  // properties:
  //
  // * `regex`: A regular expression that is used to extract parameters from paths
  //   that reached this accepting state.
  // * `handlers`: Information on how to convert the list of captures into calls
  //   to registered handlers with the specified parameters
  // * `types`: How many static, dynamic or star segments in this route. Used to
  //   decide which route to use if multiple registered routes match a path.
  //
  // Currently, State is implemented naively by looping over `nextStates` and
  // comparing a character specification against a character. A more efficient
  // implementation would use a hash of keys pointing at one or more next states.

  function State(charSpec) {
    this.charSpec = charSpec;
    this.nextStates = [];
  }

  State.prototype = {
    get: function get(charSpec) {
      var nextStates = this.nextStates;

      for (var i = 0, l = nextStates.length; i < l; i++) {
        var child = nextStates[i];

        var isEqual = child.charSpec.validChars === charSpec.validChars;
        isEqual = isEqual && child.charSpec.invalidChars === charSpec.invalidChars;

        if (isEqual) {
          return child;
        }
      }
    },

    put: function put(charSpec) {
      var state;

      // If the character specification already exists in a child of the current
      // state, just return that state.
      if (state = this.get(charSpec)) {
        return state;
      }

      // Make a new state for the character spec
      state = new State(charSpec);

      // Insert the new state as a child of the current state
      this.nextStates.push(state);

      // If this character specification repeats, insert the new state as a child
      // of itself. Note that this will not trigger an infinite loop because each
      // transition during recognition consumes a character.
      if (charSpec.repeat) {
        state.nextStates.push(state);
      }

      // Return the new state
      return state;
    },

    // Find a list of child states matching the next character
    match: function match(ch) {
      // DEBUG "Processing `" + ch + "`:"
      var nextStates = this.nextStates,
          child,
          charSpec,
          chars;

      // DEBUG "  " + debugState(this)
      var returned = [];

      for (var i = 0, l = nextStates.length; i < l; i++) {
        child = nextStates[i];

        charSpec = child.charSpec;

        if (typeof (chars = charSpec.validChars) !== 'undefined') {
          if (chars.indexOf(ch) !== -1) {
            returned.push(child);
          }
        } else if (typeof (chars = charSpec.invalidChars) !== 'undefined') {
          if (chars.indexOf(ch) === -1) {
            returned.push(child);
          }
        }
      }

      return returned;
    }

    /** IF DEBUG
    , debug: function() {
      var charSpec = this.charSpec,
          debug = "[",
          chars = charSpec.validChars || charSpec.invalidChars;
       if (charSpec.invalidChars) { debug += "^"; }
      debug += chars;
      debug += "]";
       if (charSpec.repeat) { debug += "+"; }
       return debug;
    }
    END IF **/
  };

  /** IF DEBUG
  function debug(log) {
    console.log(log);
  }

  function debugState(state) {
    return state.nextStates.map(function(n) {
      if (n.nextStates.length === 0) { return "( " + n.debug() + " [accepting] )"; }
      return "( " + n.debug() + " <then> " + n.nextStates.map(function(s) { return s.debug() }).join(" or ") + " )";
    }).join(", ")
  }
  END IF **/

  // Sort the routes by specificity
  function sortSolutions(states) {
    return states.sort(function (a, b) {
      return b.specificity.val - a.specificity.val;
    });
  }

  function recognizeChar(states, ch) {
    var nextStates = [];

    for (var i = 0, l = states.length; i < l; i++) {
      var state = states[i];

      nextStates = nextStates.concat(state.match(ch));
    }

    return nextStates;
  }

  var oCreate = Object.create || function (proto) {
    function F() {}
    F.prototype = proto;
    return new F();
  };

  function RecognizeResults(queryParams) {
    this.queryParams = queryParams || {};
  }
  RecognizeResults.prototype = oCreate({
    splice: Array.prototype.splice,
    slice: Array.prototype.slice,
    push: Array.prototype.push,
    length: 0,
    queryParams: null
  });

  function findHandler(state, path, queryParams) {
    var handlers = state.handlers,
        regex = state.regex;
    var captures = path.match(regex),
        currentCapture = 1;
    var result = new RecognizeResults(queryParams);

    for (var i = 0, l = handlers.length; i < l; i++) {
      var handler = handlers[i],
          names = handler.names,
          params = {};

      for (var j = 0, m = names.length; j < m; j++) {
        params[names[j]] = captures[currentCapture++];
      }

      result.push({ handler: handler.handler, params: params, isDynamic: !!names.length });
    }

    return result;
  }

  function addSegment(currentState, segment) {
    segment.eachChar(function (ch) {
      var state;

      currentState = currentState.put(ch);
    });

    return currentState;
  }

  function decodeQueryParamPart(part) {
    // http://www.w3.org/TR/html401/interact/forms.html#h-17.13.4.1
    part = part.replace(/\+/gm, '%20');
    return decodeURIComponent(part);
  }

  // The main interface

  var RouteRecognizer = function RouteRecognizer() {
    this.rootState = new State();
    this.names = {};
  };

  RouteRecognizer.prototype = {
    add: function add(routes, options) {
      var currentState = this.rootState,
          regex = "^",
          specificity = {},
          handlers = [],
          allSegments = [],
          name;

      var isEmpty = true;

      for (var i = 0, l = routes.length; i < l; i++) {
        var route = routes[i],
            names = [];

        var segments = parse(route.path, names, specificity);

        allSegments = allSegments.concat(segments);

        for (var j = 0, m = segments.length; j < m; j++) {
          var segment = segments[j];

          if (segment instanceof EpsilonSegment) {
            continue;
          }

          isEmpty = false;

          // Add a "/" for the new segment
          currentState = currentState.put({ validChars: "/" });
          regex += "/";

          // Add a representation of the segment to the NFA and regex
          currentState = addSegment(currentState, segment);
          regex += segment.regex();
        }

        var handler = { handler: route.handler, names: names };
        handlers.push(handler);
      }

      if (isEmpty) {
        currentState = currentState.put({ validChars: "/" });
        regex += "/";
      }

      currentState.handlers = handlers;
      currentState.regex = new RegExp(regex + "$");
      currentState.specificity = specificity;

      if (name = options && options.as) {
        this.names[name] = {
          segments: allSegments,
          handlers: handlers
        };
      }
    },

    handlersFor: function handlersFor(name) {
      var route = this.names[name],
          result = [];
      if (!route) {
        throw new Error("There is no route named " + name);
      }

      for (var i = 0, l = route.handlers.length; i < l; i++) {
        result.push(route.handlers[i]);
      }

      return result;
    },

    hasRoute: function hasRoute(name) {
      return !!this.names[name];
    },

    generate: function generate(name, params) {
      var route = this.names[name],
          output = "";
      if (!route) {
        throw new Error("There is no route named " + name);
      }

      var segments = route.segments;

      for (var i = 0, l = segments.length; i < l; i++) {
        var segment = segments[i];

        if (segment instanceof EpsilonSegment) {
          continue;
        }

        output += "/";
        output += segment.generate(params);
      }

      if (output.charAt(0) !== '/') {
        output = '/' + output;
      }

      if (params && params.queryParams) {
        output += this.generateQueryString(params.queryParams);
      }

      return output;
    },

    generateQueryString: function generateQueryString(params) {
      var pairs = [];
      var keys = [];
      for (var key in params) {
        if (params.hasOwnProperty(key)) {
          keys.push(key);
        }
      }
      keys.sort();
      for (var i = 0, len = keys.length; i < len; i++) {
        key = keys[i];
        var value = params[key];
        if (value == null) {
          continue;
        }
        var pair = encodeURIComponent(key);
        if (isArray(value)) {
          for (var j = 0, l = value.length; j < l; j++) {
            var arrayPair = key + '[]' + '=' + encodeURIComponent(value[j]);
            pairs.push(arrayPair);
          }
        } else {
          pair += "=" + encodeURIComponent(value);
          pairs.push(pair);
        }
      }

      if (pairs.length === 0) {
        return '';
      }

      return "?" + pairs.join("&");
    },

    parseQueryString: function parseQueryString(queryString) {
      var pairs = queryString.split("&"),
          queryParams = {};
      for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i].split('='),
            key = decodeQueryParamPart(pair[0]),
            keyLength = key.length,
            isArray = false,
            value;
        if (pair.length === 1) {
          value = 'true';
        } else {
          //Handle arrays
          if (keyLength > 2 && key.slice(keyLength - 2) === '[]') {
            isArray = true;
            key = key.slice(0, keyLength - 2);
            if (!queryParams[key]) {
              queryParams[key] = [];
            }
          }
          value = pair[1] ? decodeQueryParamPart(pair[1]) : '';
        }
        if (isArray) {
          queryParams[key].push(value);
        } else {
          queryParams[key] = value;
        }
      }
      return queryParams;
    },

    recognize: function recognize(path) {
      var states = [this.rootState],
          pathLen,
          i,
          l,
          queryStart,
          queryParams = {},
          isSlashDropped = false;

      queryStart = path.indexOf('?');
      if (queryStart !== -1) {
        var queryString = path.substr(queryStart + 1, path.length);
        path = path.substr(0, queryStart);
        queryParams = this.parseQueryString(queryString);
      }

      path = decodeURI(path);

      // DEBUG GROUP path

      if (path.charAt(0) !== "/") {
        path = "/" + path;
      }

      pathLen = path.length;
      if (pathLen > 1 && path.charAt(pathLen - 1) === "/") {
        path = path.substr(0, pathLen - 1);
        isSlashDropped = true;
      }

      for (i = 0, l = path.length; i < l; i++) {
        states = recognizeChar(states, path.charAt(i));
        if (!states.length) {
          break;
        }
      }

      // END DEBUG GROUP

      var solutions = [];
      for (i = 0, l = states.length; i < l; i++) {
        if (states[i].handlers) {
          solutions.push(states[i]);
        }
      }

      states = sortSolutions(solutions);

      var state = solutions[0];

      if (state && state.handlers) {
        // if a trailing slash was dropped and a star segment is the last segment
        // specified, put the trailing slash back
        if (isSlashDropped && state.regex.source.slice(-5) === "(.+)$") {
          path = path + "/";
        }
        return findHandler(state, path, queryParams);
      }
    }
  };

  RouteRecognizer.prototype.map = map;

  RouteRecognizer.VERSION = '0.1.9';

  var genQuery = RouteRecognizer.prototype.generateQueryString;

  // export default for holding the Vue reference
  var exports$1 = {};
  /**
   * Warn stuff.
   *
   * @param {String} msg
   */

  function warn(msg) {
    /* istanbul ignore next */
    if (window.console) {
      console.warn('[vue-router] ' + msg);
      if (!exports$1.Vue || exports$1.Vue.config.debug) {
        console.warn(new Error('warning stack trace:').stack);
      }
    }
  }

  /**
   * Resolve a relative path.
   *
   * @param {String} base
   * @param {String} relative
   * @param {Boolean} append
   * @return {String}
   */

  function resolvePath(base, relative, append) {
    var query = base.match(/(\?.*)$/);
    if (query) {
      query = query[1];
      base = base.slice(0, -query.length);
    }
    // a query!
    if (relative.charAt(0) === '?') {
      return base + relative;
    }
    var stack = base.split('/');
    // remove trailing segment if:
    // - not appending
    // - appending to trailing slash (last segment is empty)
    if (!append || !stack[stack.length - 1]) {
      stack.pop();
    }
    // resolve relative path
    var segments = relative.replace(/^\//, '').split('/');
    for (var i = 0; i < segments.length; i++) {
      var segment = segments[i];
      if (segment === '.') {
        continue;
      } else if (segment === '..') {
        stack.pop();
      } else {
        stack.push(segment);
      }
    }
    // ensure leading slash
    if (stack[0] !== '') {
      stack.unshift('');
    }
    return stack.join('/');
  }

  /**
   * Forgiving check for a promise
   *
   * @param {Object} p
   * @return {Boolean}
   */

  function isPromise(p) {
    return p && typeof p.then === 'function';
  }

  /**
   * Retrive a route config field from a component instance
   * OR a component contructor.
   *
   * @param {Function|Vue} component
   * @param {String} name
   * @return {*}
   */

  function getRouteConfig(component, name) {
    var options = component && (component.$options || component.options);
    return options && options.route && options.route[name];
  }

  /**
   * Resolve an async component factory. Have to do a dirty
   * mock here because of Vue core's internal API depends on
   * an ID check.
   *
   * @param {Object} handler
   * @param {Function} cb
   */

  var resolver = undefined;

  function resolveAsyncComponent(handler, cb) {
    if (!resolver) {
      resolver = {
        resolve: exports$1.Vue.prototype._resolveComponent,
        $options: {
          components: {
            _: handler.component
          }
        }
      };
    } else {
      resolver.$options.components._ = handler.component;
    }
    resolver.resolve('_', function (Component) {
      handler.component = Component;
      cb(Component);
    });
  }

  /**
   * Map the dynamic segments in a path to params.
   *
   * @param {String} path
   * @param {Object} params
   * @param {Object} query
   */

  function mapParams(path, params, query) {
    if (params === undefined) params = {};

    path = path.replace(/:([^\/]+)/g, function (_, key) {
      var val = params[key];
      /* istanbul ignore if */
      if (!val) {
        warn('param "' + key + '" not found when generating ' + 'path for "' + path + '" with params ' + JSON.stringify(params));
      }
      return val || '';
    });
    if (query) {
      path += genQuery(query);
    }
    return path;
  }

  var hashRE = /#.*$/;

  var HTML5History = (function () {
    function HTML5History(_ref) {
      var root = _ref.root;
      var onChange = _ref.onChange;
      babelHelpers.classCallCheck(this, HTML5History);

      if (root) {
        // make sure there's the starting slash
        if (root.charAt(0) !== '/') {
          root = '/' + root;
        }
        // remove trailing slash
        this.root = root.replace(/\/$/, '');
        this.rootRE = new RegExp('^\\' + this.root);
      } else {
        this.root = null;
      }
      this.onChange = onChange;
      // check base tag
      var baseEl = document.querySelector('base');
      this.base = baseEl && baseEl.getAttribute('href');
    }

    HTML5History.prototype.start = function start() {
      var _this = this;

      this.listener = function (e) {
        var url = decodeURI(location.pathname + location.search);
        if (_this.root) {
          url = url.replace(_this.rootRE, '');
        }
        _this.onChange(url, e && e.state, location.hash);
      };
      window.addEventListener('popstate', this.listener);
      this.listener();
    };

    HTML5History.prototype.stop = function stop() {
      window.removeEventListener('popstate', this.listener);
    };

    HTML5History.prototype.go = function go(path, replace, append) {
      var url = this.formatPath(path, append);
      if (replace) {
        history.replaceState({}, '', url);
      } else {
        // record scroll position by replacing current state
        history.replaceState({
          pos: {
            x: window.pageXOffset,
            y: window.pageYOffset
          }
        }, '');
        // then push new state
        history.pushState({}, '', url);
      }
      var hashMatch = path.match(hashRE);
      var hash = hashMatch && hashMatch[0];
      path = url
      // strip hash so it doesn't mess up params
      .replace(hashRE, '')
      // remove root before matching
      .replace(this.rootRE, '');
      this.onChange(path, null, hash);
    };

    HTML5History.prototype.formatPath = function formatPath(path, append) {
      return path.charAt(0) === '/'
      // absolute path
      ? this.root ? this.root + '/' + path.replace(/^\//, '') : path : resolvePath(this.base || location.pathname, path, append);
    };

    return HTML5History;
  })();

  var HashHistory = (function () {
    function HashHistory(_ref) {
      var hashbang = _ref.hashbang;
      var onChange = _ref.onChange;
      babelHelpers.classCallCheck(this, HashHistory);

      this.hashbang = hashbang;
      this.onChange = onChange;
    }

    HashHistory.prototype.start = function start() {
      var self = this;
      this.listener = function () {
        var path = location.hash;
        var raw = path.replace(/^#!?/, '');
        // always
        if (raw.charAt(0) !== '/') {
          raw = '/' + raw;
        }
        var formattedPath = self.formatPath(raw);
        if (formattedPath !== path) {
          location.replace(formattedPath);
          return;
        }
        // determine query
        // note it's possible to have queries in both the actual URL
        // and the hash fragment itself.
        var query = location.search && path.indexOf('?') > -1 ? '&' + location.search.slice(1) : location.search;
        self.onChange(decodeURI(path.replace(/^#!?/, '') + query));
      };
      window.addEventListener('hashchange', this.listener);
      this.listener();
    };

    HashHistory.prototype.stop = function stop() {
      window.removeEventListener('hashchange', this.listener);
    };

    HashHistory.prototype.go = function go(path, replace, append) {
      path = this.formatPath(path, append);
      if (replace) {
        location.replace(path);
      } else {
        location.hash = path;
      }
    };

    HashHistory.prototype.formatPath = function formatPath(path, append) {
      var isAbsoloute = path.charAt(0) === '/';
      var prefix = '#' + (this.hashbang ? '!' : '');
      return isAbsoloute ? prefix + path : prefix + resolvePath(location.hash.replace(/^#!?/, ''), path, append);
    };

    return HashHistory;
  })();

  var AbstractHistory = (function () {
    function AbstractHistory(_ref) {
      var onChange = _ref.onChange;
      babelHelpers.classCallCheck(this, AbstractHistory);

      this.onChange = onChange;
      this.currentPath = '/';
    }

    AbstractHistory.prototype.start = function start() {
      this.onChange('/');
    };

    AbstractHistory.prototype.stop = function stop() {
      // noop
    };

    AbstractHistory.prototype.go = function go(path, replace, append) {
      path = this.currentPath = this.formatPath(path, append);
      this.onChange(path);
    };

    AbstractHistory.prototype.formatPath = function formatPath(path, append) {
      return path.charAt(0) === '/' ? path : resolvePath(this.currentPath, path, append);
    };

    return AbstractHistory;
  })();

  /**
   * Determine the reusability of an existing router view.
   *
   * @param {Directive} view
   * @param {Object} handler
   * @param {Transition} transition
   */

  function canReuse(view, handler, transition) {
    var component = view.childVM;
    if (!component || !handler) {
      return false;
    }
    // important: check view.Component here because it may
    // have been changed in activate hook
    if (view.Component !== handler.component) {
      return false;
    }
    var canReuseFn = getRouteConfig(component, 'canReuse');
    return typeof canReuseFn === 'boolean' ? canReuseFn : canReuseFn ? canReuseFn.call(component, {
      to: transition.to,
      from: transition.from
    }) : true; // defaults to true
  }

  /**
   * Check if a component can deactivate.
   *
   * @param {Directive} view
   * @param {Transition} transition
   * @param {Function} next
   */

  function canDeactivate(view, transition, next) {
    var fromComponent = view.childVM;
    var hook = getRouteConfig(fromComponent, 'canDeactivate');
    if (!hook) {
      next();
    } else {
      transition.callHook(hook, fromComponent, next, {
        expectBoolean: true
      });
    }
  }

  /**
   * Check if a component can activate.
   *
   * @param {Object} handler
   * @param {Transition} transition
   * @param {Function} next
   */

  function canActivate(handler, transition, next) {
    resolveAsyncComponent(handler, function (Component) {
      // have to check due to async-ness
      if (transition.aborted) {
        return;
      }
      // determine if this component can be activated
      var hook = getRouteConfig(Component, 'canActivate');
      if (!hook) {
        next();
      } else {
        transition.callHook(hook, null, next, {
          expectBoolean: true
        });
      }
    });
  }

  /**
   * Call deactivate hooks for existing router-views.
   *
   * @param {Directive} view
   * @param {Transition} transition
   * @param {Function} next
   */

  function deactivate(view, transition, next) {
    var component = view.childVM;
    var hook = getRouteConfig(component, 'deactivate');
    if (!hook) {
      next();
    } else {
      transition.callHooks(hook, component, next);
    }
  }

  /**
   * Activate / switch component for a router-view.
   *
   * @param {Directive} view
   * @param {Transition} transition
   * @param {Number} depth
   * @param {Function} [cb]
   */

  function activate(view, transition, depth, cb, reuse) {
    var handler = transition.activateQueue[depth];
    if (!handler) {
      saveChildView(view);
      if (view._bound) {
        view.setComponent(null);
      }
      cb && cb();
      return;
    }

    var Component = view.Component = handler.component;
    var activateHook = getRouteConfig(Component, 'activate');
    var dataHook = getRouteConfig(Component, 'data');
    var waitForData = getRouteConfig(Component, 'waitForData');

    view.depth = depth;
    view.activated = false;

    var component = undefined;
    var loading = !!(dataHook && !waitForData);

    // "reuse" is a flag passed down when the parent view is
    // either reused via keep-alive or as a child of a kept-alive view.
    // of course we can only reuse if the current kept-alive instance
    // is of the correct type.
    reuse = reuse && view.childVM && view.childVM.constructor === Component;

    if (reuse) {
      // just reuse
      component = view.childVM;
      component.$loadingRouteData = loading;
    } else {
      saveChildView(view);

      // unbuild current component. this step also destroys
      // and removes all nested child views.
      view.unbuild(true);

      // build the new component. this will also create the
      // direct child view of the current one. it will register
      // itself as view.childView.
      component = view.build({
        _meta: {
          $loadingRouteData: loading
        },
        created: function created() {
          this._routerView = view;
        }
      });

      // handle keep-alive.
      // when a kept-alive child vm is restored, we need to
      // add its cached child views into the router's view list,
      // and also properly update current view's child view.
      if (view.keepAlive) {
        component.$loadingRouteData = loading;
        var cachedChildView = component._keepAliveRouterView;
        if (cachedChildView) {
          view.childView = cachedChildView;
          component._keepAliveRouterView = null;
        }
      }
    }

    // cleanup the component in case the transition is aborted
    // before the component is ever inserted.
    var cleanup = function cleanup() {
      component.$destroy();
    };

    // actually insert the component and trigger transition
    var insert = function insert() {
      if (reuse) {
        cb && cb();
        return;
      }
      var router = transition.router;
      if (router._rendered || router._transitionOnLoad) {
        view.transition(component);
      } else {
        // no transition on first render, manual transition
        /* istanbul ignore if */
        if (view.setCurrent) {
          // 0.12 compat
          view.setCurrent(component);
        } else {
          // 1.0
          view.childVM = component;
        }
        component.$before(view.anchor, null, false);
      }
      cb && cb();
    };

    var afterData = function afterData() {
      // activate the child view
      if (view.childView) {
        activate(view.childView, transition, depth + 1, null, reuse || view.keepAlive);
      }
      insert();
    };

    // called after activation hook is resolved
    var afterActivate = function afterActivate() {
      view.activated = true;
      if (dataHook && waitForData) {
        // wait until data loaded to insert
        loadData(component, transition, dataHook, afterData, cleanup);
      } else {
        // load data and insert at the same time
        if (dataHook) {
          loadData(component, transition, dataHook);
        }
        afterData();
      }
    };

    if (activateHook) {
      transition.callHooks(activateHook, component, afterActivate, { cleanup: cleanup });
    } else {
      afterActivate();
    }
  }

  /**
   * Reuse a view, just reload data if necessary.
   *
   * @param {Directive} view
   * @param {Transition} transition
   */

  function reuse(view, transition) {
    var component = view.childVM;
    var dataHook = getRouteConfig(component, 'data');
    if (dataHook) {
      loadData(component, transition, dataHook);
    }
  }

  /**
   * Asynchronously load and apply data to component.
   *
   * @param {Vue} component
   * @param {Transition} transition
   * @param {Function} hook
   * @param {Function} cb
   * @param {Function} cleanup
   */

  function loadData(component, transition, hook, cb, cleanup) {
    component.$loadingRouteData = true;
    transition.callHooks(hook, component, function (data, onError) {
      // merge data from multiple data hooks
      if (Array.isArray(data) && data._needMerge) {
        data = data.reduce(function (res, obj) {
          if (isPlainObject(obj)) {
            Object.keys(obj).forEach(function (key) {
              res[key] = obj[key];
            });
          }
          return res;
        }, Object.create(null));
      }
      // handle promise sugar syntax
      var promises = [];
      if (isPlainObject(data)) {
        Object.keys(data).forEach(function (key) {
          var val = data[key];
          if (isPromise(val)) {
            promises.push(val.then(function (resolvedVal) {
              component.$set(key, resolvedVal);
            }));
          } else {
            component.$set(key, val);
          }
        });
      }
      if (!promises.length) {
        component.$loadingRouteData = false;
        component.$emit('route-data-loaded', component);
        cb && cb();
      } else {
        promises[0].constructor.all(promises).then(function () {
          component.$loadingRouteData = false;
          component.$emit('route-data-loaded', component);
          cb && cb();
        }, onError);
      }
    }, {
      cleanup: cleanup,
      expectData: true
    });
  }

  /**
   * Save the child view for a kept-alive view so that
   * we can restore it when it is switched back to.
   *
   * @param {Directive} view
   */

  function saveChildView(view) {
    if (view.keepAlive && view.childVM && view.childView) {
      view.childVM._keepAliveRouterView = view.childView;
    }
    view.childView = null;
  }

  /**
   * Check plain object.
   *
   * @param {*} val
   */

  function isPlainObject(val) {
    return Object.prototype.toString.call(val) === '[object Object]';
  }

  /**
   * A RouteTransition object manages the pipeline of a
   * router-view switching process. This is also the object
   * passed into user route hooks.
   *
   * @param {Router} router
   * @param {Route} to
   * @param {Route} from
   */

  var RouteTransition = (function () {
    function RouteTransition(router, to, from) {
      babelHelpers.classCallCheck(this, RouteTransition);

      this.router = router;
      this.to = to;
      this.from = from;
      this.next = null;
      this.aborted = false;
      this.done = false;
    }

    /**
     * Abort current transition and return to previous location.
     */

    RouteTransition.prototype.abort = function abort() {
      if (!this.aborted) {
        this.aborted = true;
        // if the root path throws an error during validation
        // on initial load, it gets caught in an infinite loop.
        var abortingOnLoad = !this.from.path && this.to.path === '/';
        if (!abortingOnLoad) {
          this.router.replace(this.from.path || '/');
        }
      }
    };

    /**
     * Abort current transition and redirect to a new location.
     *
     * @param {String} path
     */

    RouteTransition.prototype.redirect = function redirect(path) {
      if (!this.aborted) {
        this.aborted = true;
        if (typeof path === 'string') {
          path = mapParams(path, this.to.params, this.to.query);
        } else {
          path.params = path.params || this.to.params;
          path.query = path.query || this.to.query;
        }
        this.router.replace(path);
      }
    };

    /**
     * A router view transition's pipeline can be described as
     * follows, assuming we are transitioning from an existing
     * <router-view> chain [Component A, Component B] to a new
     * chain [Component A, Component C]:
     *
     *  A    A
     *  | => |
     *  B    C
     *
     * 1. Reusablity phase:
     *   -> canReuse(A, A)
     *   -> canReuse(B, C)
     *   -> determine new queues:
     *      - deactivation: [B]
     *      - activation: [C]
     *
     * 2. Validation phase:
     *   -> canDeactivate(B)
     *   -> canActivate(C)
     *
     * 3. Activation phase:
     *   -> deactivate(B)
     *   -> activate(C)
     *
     * Each of these steps can be asynchronous, and any
     * step can potentially abort the transition.
     *
     * @param {Function} cb
     */

    RouteTransition.prototype.start = function start(cb) {
      var transition = this;

      // determine the queue of views to deactivate
      var deactivateQueue = [];
      var view = this.router._rootView;
      while (view) {
        deactivateQueue.unshift(view);
        view = view.childView;
      }
      var reverseDeactivateQueue = deactivateQueue.slice().reverse();

      // determine the queue of route handlers to activate
      var activateQueue = this.activateQueue = toArray(this.to.matched).map(function (match) {
        return match.handler;
      });

      // 1. Reusability phase
      var i = undefined,
          reuseQueue = undefined;
      for (i = 0; i < reverseDeactivateQueue.length; i++) {
        if (!canReuse(reverseDeactivateQueue[i], activateQueue[i], transition)) {
          break;
        }
      }
      if (i > 0) {
        reuseQueue = reverseDeactivateQueue.slice(0, i);
        deactivateQueue = reverseDeactivateQueue.slice(i).reverse();
        activateQueue = activateQueue.slice(i);
      }

      // 2. Validation phase
      transition.runQueue(deactivateQueue, canDeactivate, function () {
        transition.runQueue(activateQueue, canActivate, function () {
          transition.runQueue(deactivateQueue, deactivate, function () {
            // 3. Activation phase

            // Update router current route
            transition.router._onTransitionValidated(transition);

            // trigger reuse for all reused views
            reuseQueue && reuseQueue.forEach(function (view) {
              return reuse(view, transition);
            });

            // the root of the chain that needs to be replaced
            // is the top-most non-reusable view.
            if (deactivateQueue.length) {
              var _view = deactivateQueue[deactivateQueue.length - 1];
              var depth = reuseQueue ? reuseQueue.length : 0;
              activate(_view, transition, depth, cb);
            } else {
              cb();
            }
          });
        });
      });
    };

    /**
     * Asynchronously and sequentially apply a function to a
     * queue.
     *
     * @param {Array} queue
     * @param {Function} fn
     * @param {Function} cb
     */

    RouteTransition.prototype.runQueue = function runQueue(queue, fn, cb) {
      var transition = this;
      step(0);
      function step(index) {
        if (index >= queue.length) {
          cb();
        } else {
          fn(queue[index], transition, function () {
            step(index + 1);
          });
        }
      }
    };

    /**
     * Call a user provided route transition hook and handle
     * the response (e.g. if the user returns a promise).
     *
     * If the user neither expects an argument nor returns a
     * promise, the hook is assumed to be synchronous.
     *
     * @param {Function} hook
     * @param {*} [context]
     * @param {Function} [cb]
     * @param {Object} [options]
     *                 - {Boolean} expectBoolean
     *                 - {Boolean} expectData
     *                 - {Function} cleanup
     */

    RouteTransition.prototype.callHook = function callHook(hook, context, cb) {
      var _ref = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

      var _ref$expectBoolean = _ref.expectBoolean;
      var expectBoolean = _ref$expectBoolean === undefined ? false : _ref$expectBoolean;
      var _ref$expectData = _ref.expectData;
      var expectData = _ref$expectData === undefined ? false : _ref$expectData;
      var cleanup = _ref.cleanup;

      var transition = this;
      var nextCalled = false;

      // abort the transition
      var abort = function abort() {
        cleanup && cleanup();
        transition.abort();
      };

      // handle errors
      var onError = function onError(err) {
        // cleanup indicates an after-activation hook,
        // so instead of aborting we just let the transition
        // finish.
        cleanup ? next() : abort();
        if (err && !transition.router._suppress) {
          warn('Uncaught error during transition: ');
          throw err instanceof Error ? err : new Error(err);
        }
      };

      // advance the transition to the next step
      var next = function next(data) {
        if (nextCalled) {
          warn('transition.next() should be called only once.');
          return;
        }
        nextCalled = true;
        if (transition.aborted) {
          cleanup && cleanup();
          return;
        }
        cb && cb(data, onError);
      };

      // expose a clone of the transition object, so that each
      // hook gets a clean copy and prevent the user from
      // messing with the internals.
      var exposed = {
        to: transition.to,
        from: transition.from,
        abort: abort,
        next: next,
        redirect: function redirect() {
          transition.redirect.apply(transition, arguments);
        }
      };

      // actually call the hook
      var res = undefined;
      try {
        res = hook.call(context, exposed);
      } catch (err) {
        return onError(err);
      }

      // handle boolean/promise return values
      var resIsPromise = isPromise(res);
      if (expectBoolean) {
        if (typeof res === 'boolean') {
          res ? next() : abort();
        } else if (resIsPromise) {
          res.then(function (ok) {
            ok ? next() : abort();
          }, onError);
        } else if (!hook.length) {
          next(res);
        }
      } else if (resIsPromise) {
        res.then(next, onError);
      } else if (expectData && isPlainOjbect(res) || !hook.length) {
        next(res);
      }
    };

    /**
     * Call a single hook or an array of async hooks in series.
     *
     * @param {Array} hooks
     * @param {*} context
     * @param {Function} cb
     * @param {Object} [options]
     */

    RouteTransition.prototype.callHooks = function callHooks(hooks, context, cb, options) {
      var _this = this;

      if (Array.isArray(hooks)) {
        (function () {
          var res = [];
          res._needMerge = true;
          var onError = undefined;
          _this.runQueue(hooks, function (hook, _, next) {
            if (!_this.aborted) {
              _this.callHook(hook, context, function (r, onError) {
                if (r) res.push(r);
                onError = onError;
                next();
              }, options);
            }
          }, function () {
            cb(res, onError);
          });
        })();
      } else {
        this.callHook(hooks, context, cb, options);
      }
    };

    return RouteTransition;
  })();

  function isPlainOjbect(val) {
    return Object.prototype.toString.call(val) === '[object Object]';
  }

  function toArray(val) {
    return val ? Array.prototype.slice.call(val) : [];
  }

  var internalKeysRE = /^(component|subRoutes)$/;

  /**
   * Route Context Object
   *
   * @param {String} path
   * @param {Router} router
   */

  var Route = function Route(path, router) {
    var _this = this;

    babelHelpers.classCallCheck(this, Route);

    var matched = router._recognizer.recognize(path);
    if (matched) {
      // copy all custom fields from route configs
      [].forEach.call(matched, function (match) {
        for (var key in match.handler) {
          if (!internalKeysRE.test(key)) {
            _this[key] = match.handler[key];
          }
        }
      });
      // set query and params
      this.query = matched.queryParams;
      this.params = [].reduce.call(matched, function (prev, cur) {
        if (cur.params) {
          for (var key in cur.params) {
            prev[key] = cur.params[key];
          }
        }
        return prev;
      }, {});
    }
    // expose path and router
    this.path = path;
    this.router = router;
    // for internal use
    this.matched = matched || router._notFoundHandler;
    // Important: freeze self to prevent observation
    Object.freeze(this);
  };

  function applyOverride (Vue) {
    var _Vue$util = Vue.util;
    var extend = _Vue$util.extend;
    var isArray = _Vue$util.isArray;
    var defineReactive = _Vue$util.defineReactive;

    // override Vue's init and destroy process to keep track of router instances
    var init = Vue.prototype._init;
    Vue.prototype._init = function (options) {
      options = options || {};
      var root = options._parent || options.parent || this;
      var router = root.$router;
      var route = root.$route;
      if (router) {
        // expose router
        this.$router = router;
        router._children.push(this);
        /* istanbul ignore if */
        if (this._defineMeta) {
          // 0.12
          this._defineMeta('$route', route);
        } else {
          // 1.0
          defineReactive(this, '$route', route);
        }
      }
      init.call(this, options);
    };

    var destroy = Vue.prototype._destroy;
    Vue.prototype._destroy = function () {
      if (!this._isBeingDestroyed && this.$router) {
        this.$router._children.$remove(this);
      }
      destroy.apply(this, arguments);
    };

    // 1.0 only: enable route mixins
    var strats = Vue.config.optionMergeStrategies;
    var hooksToMergeRE = /^(data|activate|deactivate)$/;

    if (strats) {
      strats.route = function (parentVal, childVal) {
        if (!childVal) return parentVal;
        if (!parentVal) return childVal;
        var ret = {};
        extend(ret, parentVal);
        for (var key in childVal) {
          var a = ret[key];
          var b = childVal[key];
          // for data, activate and deactivate, we need to merge them into
          // arrays similar to lifecycle hooks.
          if (a && hooksToMergeRE.test(key)) {
            ret[key] = (isArray(a) ? a : [a]).concat(b);
          } else {
            ret[key] = b;
          }
        }
        return ret;
      };
    }
  }

  function View (Vue) {

    var _ = Vue.util;
    var componentDef =
    // 0.12
    Vue.directive('_component') ||
    // 1.0
    Vue.internalDirectives.component;
    // <router-view> extends the internal component directive
    var viewDef = _.extend({}, componentDef);

    // with some overrides
    _.extend(viewDef, {

      _isRouterView: true,

      bind: function bind() {
        var route = this.vm.$route;
        /* istanbul ignore if */
        if (!route) {
          warn('<router-view> can only be used inside a ' + 'router-enabled app.');
          return;
        }
        // force dynamic directive so v-component doesn't
        // attempt to build right now
        this._isDynamicLiteral = true;
        // finally, init by delegating to v-component
        componentDef.bind.call(this);

        // locate the parent view
        var parentView = undefined;
        var parent = this.vm;
        while (parent) {
          if (parent._routerView) {
            parentView = parent._routerView;
            break;
          }
          parent = parent.$parent;
        }
        if (parentView) {
          // register self as a child of the parent view,
          // instead of activating now. This is so that the
          // child's activate hook is called after the
          // parent's has resolved.
          this.parentView = parentView;
          parentView.childView = this;
        } else {
          // this is the root view!
          var router = route.router;
          router._rootView = this;
        }

        // handle late-rendered view
        // two possibilities:
        // 1. root view rendered after transition has been
        //    validated;
        // 2. child view rendered after parent view has been
        //    activated.
        var transition = route.router._currentTransition;
        if (!parentView && transition.done || parentView && parentView.activated) {
          var depth = parentView ? parentView.depth + 1 : 0;
          activate(this, transition, depth);
        }
      },

      unbind: function unbind() {
        if (this.parentView) {
          this.parentView.childView = null;
        }
        componentDef.unbind.call(this);
      }
    });

    Vue.elementDirective('router-view', viewDef);
  }

  var trailingSlashRE = /\/$/;
  var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g;
  var queryStringRE = /\?.*$/;

  // install v-link, which provides navigation support for
  // HTML5 history mode
  function Link (Vue) {
    var _Vue$util = Vue.util;
    var _bind = _Vue$util.bind;
    var isObject = _Vue$util.isObject;
    var addClass = _Vue$util.addClass;
    var removeClass = _Vue$util.removeClass;

    Vue.directive('link-active', {
      priority: 1001,
      bind: function bind() {
        this.el.__v_link_active = true;
      }
    });

    Vue.directive('link', {
      priority: 1000,

      bind: function bind() {
        var vm = this.vm;
        /* istanbul ignore if */
        if (!vm.$route) {
          warn('v-link can only be used inside a router-enabled app.');
          return;
        }
        this.router = vm.$route.router;
        // update things when the route changes
        this.unwatch = vm.$watch('$route', _bind(this.onRouteUpdate, this));
        // check if active classes should be applied to a different element
        this.activeEl = this.el;
        var parent = this.el.parentNode;
        while (parent) {
          if (parent.__v_link_active) {
            this.activeEl = parent;
            break;
          }
          parent = parent.parentNode;
        }
        // no need to handle click if link expects to be opened
        // in a new window/tab.
        /* istanbul ignore if */
        if (this.el.tagName === 'A' && this.el.getAttribute('target') === '_blank') {
          return;
        }
        // handle click
        this.el.addEventListener('click', _bind(this.onClick, this));
      },

      update: function update(target) {
        this.target = target;
        if (isObject(target)) {
          this.append = target.append;
          this.exact = target.exact;
          this.prevActiveClass = this.activeClass;
          this.activeClass = target.activeClass;
        }
        this.onRouteUpdate(this.vm.$route);
      },

      onClick: function onClick(e) {
        // don't redirect with control keys
        /* istanbul ignore if */
        if (e.metaKey || e.ctrlKey || e.shiftKey) return;
        // don't redirect when preventDefault called
        /* istanbul ignore if */
        if (e.defaultPrevented) return;
        // don't redirect on right click
        /* istanbul ignore if */
        if (e.button !== 0) return;

        var target = this.target;
        if (target) {
          // v-link with expression, just go
          e.preventDefault();
          this.router.go(target);
        } else {
          // no expression, delegate for an <a> inside
          var el = e.target;
          while (el.tagName !== 'A' && el !== this.el) {
            el = el.parentNode;
          }
          if (el.tagName === 'A' && sameOrigin(el)) {
            e.preventDefault();
            this.router.go({
              path: el.pathname,
              replace: target && target.replace,
              append: target && target.append
            });
          }
        }
      },

      onRouteUpdate: function onRouteUpdate(route) {
        // router._stringifyPath is dependent on current route
        // and needs to be called again whenver route changes.
        var newPath = this.router._stringifyPath(this.target);
        if (this.path !== newPath) {
          this.path = newPath;
          this.updateActiveMatch();
          this.updateHref();
        }
        this.updateClasses(route.path);
      },

      updateActiveMatch: function updateActiveMatch() {
        this.activeRE = this.path && !this.exact ? new RegExp('^' + this.path.replace(/\/$/, '').replace(queryStringRE, '').replace(regexEscapeRE, '\\$&') + '(\\/|$)') : null;
      },

      updateHref: function updateHref() {
        if (this.el.tagName !== 'A') {
          return;
        }
        var path = this.path;
        var router = this.router;
        var isAbsolute = path.charAt(0) === '/';
        // do not format non-hash relative paths
        var href = path && (router.mode === 'hash' || isAbsolute) ? router.history.formatPath(path, this.append) : path;
        if (href) {
          this.el.href = href;
        } else {
          this.el.removeAttribute('href');
        }
      },

      updateClasses: function updateClasses(path) {
        var el = this.activeEl;
        var activeClass = this.activeClass || this.router._linkActiveClass;
        // clear old class
        if (this.prevActiveClass !== activeClass) {
          removeClass(el, this.prevActiveClass);
        }
        // remove query string before matching
        var dest = this.path.replace(queryStringRE, '');
        path = path.replace(queryStringRE, '');
        // add new class
        if (this.exact) {
          if (dest === path ||
          // also allow additional trailing slash
          dest.charAt(dest.length - 1) !== '/' && dest === path.replace(trailingSlashRE, '')) {
            addClass(el, activeClass);
          } else {
            removeClass(el, activeClass);
          }
        } else {
          if (this.activeRE && this.activeRE.test(path)) {
            addClass(el, activeClass);
          } else {
            removeClass(el, activeClass);
          }
        }
      },

      unbind: function unbind() {
        this.el.removeEventListener('click', this.handler);
        this.unwatch && this.unwatch();
      }
    });

    function sameOrigin(link) {
      return link.protocol === location.protocol && link.hostname === location.hostname && link.port === location.port;
    }
  }

  var historyBackends = {
    abstract: AbstractHistory,
    hash: HashHistory,
    html5: HTML5History
  };

  // late bind during install
  var Vue = undefined;

  /**
   * Router constructor
   *
   * @param {Object} [options]
   */

  var Router = (function () {
    function Router() {
      var _this = this;

      var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      var _ref$hashbang = _ref.hashbang;
      var hashbang = _ref$hashbang === undefined ? true : _ref$hashbang;
      var _ref$abstract = _ref.abstract;
      var abstract = _ref$abstract === undefined ? false : _ref$abstract;
      var _ref$history = _ref.history;
      var history = _ref$history === undefined ? false : _ref$history;
      var _ref$saveScrollPosition = _ref.saveScrollPosition;
      var saveScrollPosition = _ref$saveScrollPosition === undefined ? false : _ref$saveScrollPosition;
      var _ref$transitionOnLoad = _ref.transitionOnLoad;
      var transitionOnLoad = _ref$transitionOnLoad === undefined ? false : _ref$transitionOnLoad;
      var _ref$suppressTransitionError = _ref.suppressTransitionError;
      var suppressTransitionError = _ref$suppressTransitionError === undefined ? false : _ref$suppressTransitionError;
      var _ref$root = _ref.root;
      var root = _ref$root === undefined ? null : _ref$root;
      var _ref$linkActiveClass = _ref.linkActiveClass;
      var linkActiveClass = _ref$linkActiveClass === undefined ? 'v-link-active' : _ref$linkActiveClass;
      babelHelpers.classCallCheck(this, Router);

      /* istanbul ignore if */
      if (!Router.installed) {
        throw new Error('Please install the Router with Vue.use() before ' + 'creating an instance.');
      }

      // Vue instances
      this.app = null;
      this._children = [];

      // route recognizer
      this._recognizer = new RouteRecognizer();
      this._guardRecognizer = new RouteRecognizer();

      // state
      this._started = false;
      this._startCb = null;
      this._currentRoute = {};
      this._currentTransition = null;
      this._previousTransition = null;
      this._notFoundHandler = null;
      this._notFoundRedirect = null;
      this._beforeEachHooks = [];
      this._afterEachHooks = [];

      // trigger transition on initial render?
      this._rendered = false;
      this._transitionOnLoad = transitionOnLoad;

      // history mode
      this._root = root;
      this._abstract = abstract;
      this._hashbang = hashbang;

      // check if HTML5 history is available
      var hasPushState = typeof window !== 'undefined' && window.history && window.history.pushState;
      this._history = history && hasPushState;
      this._historyFallback = history && !hasPushState;

      // create history object
      var inBrowser = Vue.util.inBrowser;
      this.mode = !inBrowser || this._abstract ? 'abstract' : this._history ? 'html5' : 'hash';

      var History = historyBackends[this.mode];
      this.history = new History({
        root: root,
        hashbang: this._hashbang,
        onChange: function onChange(path, state, anchor) {
          _this._match(path, state, anchor);
        }
      });

      // other options
      this._saveScrollPosition = saveScrollPosition;
      this._linkActiveClass = linkActiveClass;
      this._suppress = suppressTransitionError;
    }

    /**
     * Allow directly passing components to a route
     * definition.
     *
     * @param {String} path
     * @param {Object} handler
     */

    // API ===================================================

    /**
    * Register a map of top-level paths.
    *
    * @param {Object} map
    */

    Router.prototype.map = function map(_map) {
      for (var route in _map) {
        this.on(route, _map[route]);
      }
      return this;
    };

    /**
     * Register a single root-level path
     *
     * @param {String} rootPath
     * @param {Object} handler
     *                 - {String} component
     *                 - {Object} [subRoutes]
     *                 - {Boolean} [forceRefresh]
     *                 - {Function} [before]
     *                 - {Function} [after]
     */

    Router.prototype.on = function on(rootPath, handler) {
      if (rootPath === '*') {
        this._notFound(handler);
      } else {
        this._addRoute(rootPath, handler, []);
      }
      return this;
    };

    /**
     * Set redirects.
     *
     * @param {Object} map
     */

    Router.prototype.redirect = function redirect(map) {
      for (var path in map) {
        this._addRedirect(path, map[path]);
      }
      return this;
    };

    /**
     * Set aliases.
     *
     * @param {Object} map
     */

    Router.prototype.alias = function alias(map) {
      for (var path in map) {
        this._addAlias(path, map[path]);
      }
      return this;
    };

    /**
     * Set global before hook.
     *
     * @param {Function} fn
     */

    Router.prototype.beforeEach = function beforeEach(fn) {
      this._beforeEachHooks.push(fn);
      return this;
    };

    /**
     * Set global after hook.
     *
     * @param {Function} fn
     */

    Router.prototype.afterEach = function afterEach(fn) {
      this._afterEachHooks.push(fn);
      return this;
    };

    /**
     * Navigate to a given path.
     * The path can be an object describing a named path in
     * the format of { name: '...', params: {}, query: {}}
     * The path is assumed to be already decoded, and will
     * be resolved against root (if provided)
     *
     * @param {String|Object} path
     * @param {Boolean} [replace]
     */

    Router.prototype.go = function go(path) {
      var replace = false;
      var append = false;
      if (Vue.util.isObject(path)) {
        replace = path.replace;
        append = path.append;
      }
      path = this._stringifyPath(path);
      if (path) {
        this.history.go(path, replace, append);
      }
    };

    /**
     * Short hand for replacing current path
     *
     * @param {String} path
     */

    Router.prototype.replace = function replace(path) {
      if (typeof path === 'string') {
        path = { path: path };
      }
      path.replace = true;
      this.go(path);
    };

    /**
     * Start the router.
     *
     * @param {VueConstructor} App
     * @param {String|Element} container
     * @param {Function} [cb]
     */

    Router.prototype.start = function start(App, container, cb) {
      /* istanbul ignore if */
      if (this._started) {
        warn('already started.');
        return;
      }
      this._started = true;
      this._startCb = cb;
      if (!this.app) {
        /* istanbul ignore if */
        if (!App || !container) {
          throw new Error('Must start vue-router with a component and a ' + 'root container.');
        }
        /* istanbul ignore if */
        if (App instanceof Vue) {
          throw new Error('Must start vue-router with a component, not a ' + 'Vue instance.');
        }
        this._appContainer = container;
        var Ctor = this._appConstructor = typeof App === 'function' ? App : Vue.extend(App);
        // give it a name for better debugging
        Ctor.options.name = Ctor.options.name || 'RouterApp';
      }

      // handle history fallback in browsers that do not
      // support HTML5 history API
      if (this._historyFallback) {
        var _location = window.location;
        var _history = new HTML5History({ root: this._root });
        var path = _history.root ? _location.pathname.replace(_history.rootRE, '') : _location.pathname;
        if (path && path !== '/') {
          _location.assign((_history.root || '') + '/' + this.history.formatPath(path) + _location.search);
          return;
        }
      }

      this.history.start();
    };

    /**
     * Stop listening to route changes.
     */

    Router.prototype.stop = function stop() {
      this.history.stop();
      this._started = false;
    };

    // Internal methods ======================================

    /**
    * Add a route containing a list of segments to the internal
    * route recognizer. Will be called recursively to add all
    * possible sub-routes.
    *
    * @param {String} path
    * @param {Object} handler
    * @param {Array} segments
    */

    Router.prototype._addRoute = function _addRoute(path, handler, segments) {
      guardComponent(path, handler);
      handler.path = path;
      handler.fullPath = (segments.reduce(function (path, segment) {
        return path + segment.path;
      }, '') + path).replace('//', '/');
      segments.push({
        path: path,
        handler: handler
      });
      this._recognizer.add(segments, {
        as: handler.name
      });
      // add sub routes
      if (handler.subRoutes) {
        for (var subPath in handler.subRoutes) {
          // recursively walk all sub routes
          this._addRoute(subPath, handler.subRoutes[subPath],
          // pass a copy in recursion to avoid mutating
          // across branches
          segments.slice());
        }
      }
    };

    /**
     * Set the notFound route handler.
     *
     * @param {Object} handler
     */

    Router.prototype._notFound = function _notFound(handler) {
      guardComponent('*', handler);
      this._notFoundHandler = [{ handler: handler }];
    };

    /**
     * Add a redirect record.
     *
     * @param {String} path
     * @param {String} redirectPath
     */

    Router.prototype._addRedirect = function _addRedirect(path, redirectPath) {
      if (path === '*') {
        this._notFoundRedirect = redirectPath;
      } else {
        this._addGuard(path, redirectPath, this.replace);
      }
    };

    /**
     * Add an alias record.
     *
     * @param {String} path
     * @param {String} aliasPath
     */

    Router.prototype._addAlias = function _addAlias(path, aliasPath) {
      this._addGuard(path, aliasPath, this._match);
    };

    /**
     * Add a path guard.
     *
     * @param {String} path
     * @param {String} mappedPath
     * @param {Function} handler
     */

    Router.prototype._addGuard = function _addGuard(path, mappedPath, _handler) {
      var _this2 = this;

      this._guardRecognizer.add([{
        path: path,
        handler: function handler(match, query) {
          var realPath = mapParams(mappedPath, match.params, query);
          _handler.call(_this2, realPath);
        }
      }]);
    };

    /**
     * Check if a path matches any redirect records.
     *
     * @param {String} path
     * @return {Boolean} - if true, will skip normal match.
     */

    Router.prototype._checkGuard = function _checkGuard(path) {
      var matched = this._guardRecognizer.recognize(path);
      if (matched) {
        matched[0].handler(matched[0], matched.queryParams);
        return true;
      } else if (this._notFoundRedirect) {
        matched = this._recognizer.recognize(path);
        if (!matched) {
          this.replace(this._notFoundRedirect);
          return true;
        }
      }
    };

    /**
     * Match a URL path and set the route context on vm,
     * triggering view updates.
     *
     * @param {String} path
     * @param {Object} [state]
     * @param {String} [anchor]
     */

    Router.prototype._match = function _match(path, state, anchor) {
      var _this3 = this;

      if (this._checkGuard(path)) {
        return;
      }

      var currentRoute = this._currentRoute;
      var currentTransition = this._currentTransition;

      if (currentTransition) {
        if (currentTransition.to.path === path) {
          // do nothing if we have an active transition going to the same path
          return;
        } else if (currentRoute.path === path) {
          // We are going to the same path, but we also have an ongoing but
          // not-yet-validated transition. Abort that transition and reset to
          // prev transition.
          currentTransition.aborted = true;
          this._currentTransition = this._prevTransition;
          return;
        } else {
          // going to a totally different path. abort ongoing transition.
          currentTransition.aborted = true;
        }
      }

      // construct new route and transition context
      var route = new Route(path, this);
      var transition = new RouteTransition(this, route, currentRoute);

      // current transition is updated right now.
      // however, current route will only be updated after the transition has
      // been validated.
      this._prevTransition = currentTransition;
      this._currentTransition = transition;

      if (!this.app) {
        (function () {
          // initial render
          var router = _this3;
          _this3.app = new _this3._appConstructor({
            el: _this3._appContainer,
            created: function created() {
              this.$router = router;
            },
            _meta: {
              $route: route
            }
          });
        })();
      }

      // check global before hook
      var beforeHooks = this._beforeEachHooks;
      var startTransition = function startTransition() {
        transition.start(function () {
          _this3._postTransition(route, state, anchor);
        });
      };

      if (beforeHooks.length) {
        transition.runQueue(beforeHooks, function (hook, _, next) {
          if (transition === _this3._currentTransition) {
            transition.callHook(hook, null, next, {
              expectBoolean: true
            });
          }
        }, startTransition);
      } else {
        startTransition();
      }

      if (!this._rendered && this._startCb) {
        this._startCb.call(null);
      }

      // HACK:
      // set rendered to true after the transition start, so
      // that components that are acitvated synchronously know
      // whether it is the initial render.
      this._rendered = true;
    };

    /**
     * Set current to the new transition.
     * This is called by the transition object when the
     * validation of a route has succeeded.
     *
     * @param {Transition} transition
     */

    Router.prototype._onTransitionValidated = function _onTransitionValidated(transition) {
      // set current route
      var route = this._currentRoute = transition.to;
      // update route context for all children
      if (this.app.$route !== route) {
        this.app.$route = route;
        this._children.forEach(function (child) {
          child.$route = route;
        });
      }
      // call global after hook
      if (this._afterEachHooks.length) {
        this._afterEachHooks.forEach(function (hook) {
          return hook.call(null, {
            to: transition.to,
            from: transition.from
          });
        });
      }
      this._currentTransition.done = true;
    };

    /**
     * Handle stuff after the transition.
     *
     * @param {Route} route
     * @param {Object} [state]
     * @param {String} [anchor]
     */

    Router.prototype._postTransition = function _postTransition(route, state, anchor) {
      // handle scroll positions
      // saved scroll positions take priority
      // then we check if the path has an anchor
      var pos = state && state.pos;
      if (pos && this._saveScrollPosition) {
        Vue.nextTick(function () {
          window.scrollTo(pos.x, pos.y);
        });
      } else if (anchor) {
        Vue.nextTick(function () {
          var el = document.getElementById(anchor.slice(1));
          if (el) {
            window.scrollTo(window.scrollX, el.offsetTop);
          }
        });
      }
    };

    /**
     * Normalize named route object / string paths into
     * a string.
     *
     * @param {Object|String|Number} path
     * @return {String}
     */

    Router.prototype._stringifyPath = function _stringifyPath(path) {
      var fullPath = '';
      if (path && typeof path === 'object') {
        if (path.name) {
          var extend = Vue.util.extend;
          var currentParams = this._currentTransition && this._currentTransition.to.params;
          var targetParams = path.params || {};
          var params = currentParams ? extend(extend({}, currentParams), targetParams) : targetParams;
          if (path.query) {
            params.queryParams = path.query;
          }
          fullPath = this._recognizer.generate(path.name, params);
        } else if (path.path) {
          fullPath = path.path;
          if (path.query) {
            var query = this._recognizer.generateQueryString(path.query);
            if (fullPath.indexOf('?') > -1) {
              fullPath += '&' + query.slice(1);
            } else {
              fullPath += query;
            }
          }
        }
      } else {
        fullPath = path ? path + '' : '';
      }
      return encodeURI(fullPath);
    };

    return Router;
  })();

  function guardComponent(path, handler) {
    var comp = handler.component;
    if (Vue.util.isPlainObject(comp)) {
      comp = handler.component = Vue.extend(comp);
    }
    /* istanbul ignore if */
    if (typeof comp !== 'function') {
      handler.component = null;
      warn('invalid component for route "' + path + '".');
    }
  }

  /* Installation */

  Router.installed = false;

  /**
   * Installation interface.
   * Install the necessary directives.
   */

  Router.install = function (externalVue) {
    /* istanbul ignore if */
    if (Router.installed) {
      warn('already installed.');
      return;
    }
    Vue = externalVue;
    applyOverride(Vue);
    View(Vue);
    Link(Vue);
    exports$1.Vue = Vue;
    Router.installed = true;
  };

  // auto install
  /* istanbul ignore if */
  if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(Router);
  }

  return Router;

}));
},{}],26:[function(require,module,exports){
!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.VueSpinner=e():t.VueSpinner=e()}(this,function(){return function(t){function e(n){if(i[n])return i[n].exports;var a=i[n]={exports:{},id:n,loaded:!1};return t[n].call(a.exports,a,a.exports,e),a.loaded=!0,a.exports}var i={};return e.m=t,e.c=i,e.p="",e(0)}([function(t,e,i){"use strict";function n(t){return t&&t.__esModule?t:{"default":t}}var a=i(91),r=n(a),o=i(88),s=n(o),l=i(85),d=n(l),p=i(93),f=n(p),c=i(83),u=n(c),v=i(98),m=n(v),y=i(94),b=n(y),h=i(87),g=n(h),x=i(90),S=n(x),k=i(97),w=n(k),D=i(95),Y=n(D),z=i(96),_=n(z),R=i(89),L=n(R),M=i(92),X=n(M),B=i(84),C=n(B),j=i(86),O=n(j),F={PulseLoader:r["default"],GridLoader:s["default"],ClipLoader:d["default"],RiseLoader:f["default"],BeatLoader:u["default"],SyncLoader:m["default"],RotateLoader:b["default"],FadeLoader:g["default"],PacmanLoader:S["default"],SquareLoader:w["default"],ScaleLoader:Y["default"],SkewLoader:_["default"],MoonLoader:L["default"],RingLoader:X["default"],BounceLoader:C["default"],DotLoader:O["default"]};t.exports=F},function(t,e){t.exports=function(){var t=[];return t.toString=function(){for(var t=[],e=0;e<this.length;e++){var i=this[e];i[2]?t.push("@media "+i[2]+"{"+i[1]+"}"):t.push(i[1])}return t.join("")},t.i=function(e,i){"string"==typeof e&&(e=[[null,e,""]]);for(var n={},a=0;a<this.length;a++){var r=this[a][0];"number"==typeof r&&(n[r]=!0)}for(a=0;a<e.length;a++){var o=e[a];"number"==typeof o[0]&&n[o[0]]||(i&&!o[2]?o[2]=i:i&&(o[2]="("+o[2]+") and ("+i+")"),t.push(o))}},t}},function(t,e,i){function n(t,e){for(var i=0;i<t.length;i++){var n=t[i],a=u[n.id];if(a){a.refs++;for(var r=0;r<a.parts.length;r++)a.parts[r](n.parts[r]);for(;r<n.parts.length;r++)a.parts.push(d(n.parts[r],e))}else{for(var o=[],r=0;r<n.parts.length;r++)o.push(d(n.parts[r],e));u[n.id]={id:n.id,refs:1,parts:o}}}}function a(t){for(var e=[],i={},n=0;n<t.length;n++){var a=t[n],r=a[0],o=a[1],s=a[2],l=a[3],d={css:o,media:s,sourceMap:l};i[r]?i[r].parts.push(d):e.push(i[r]={id:r,parts:[d]})}return e}function r(t,e){var i=y(),n=g[g.length-1];if("top"===t.insertAt)n?n.nextSibling?i.insertBefore(e,n.nextSibling):i.appendChild(e):i.insertBefore(e,i.firstChild),g.push(e);else{if("bottom"!==t.insertAt)throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");i.appendChild(e)}}function o(t){t.parentNode.removeChild(t);var e=g.indexOf(t);e>=0&&g.splice(e,1)}function s(t){var e=document.createElement("style");return e.type="text/css",r(t,e),e}function l(t){var e=document.createElement("link");return e.rel="stylesheet",r(t,e),e}function d(t,e){var i,n,a;if(e.singleton){var r=h++;i=b||(b=s(e)),n=p.bind(null,i,r,!1),a=p.bind(null,i,r,!0)}else t.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(i=l(e),n=c.bind(null,i),a=function(){o(i),i.href&&URL.revokeObjectURL(i.href)}):(i=s(e),n=f.bind(null,i),a=function(){o(i)});return n(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap)return;n(t=e)}else a()}}function p(t,e,i,n){var a=i?"":n.css;if(t.styleSheet)t.styleSheet.cssText=x(e,a);else{var r=document.createTextNode(a),o=t.childNodes;o[e]&&t.removeChild(o[e]),o.length?t.insertBefore(r,o[e]):t.appendChild(r)}}function f(t,e){var i=e.css,n=e.media;e.sourceMap;if(n&&t.setAttribute("media",n),t.styleSheet)t.styleSheet.cssText=i;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(i))}}function c(t,e){var i=e.css,n=(e.media,e.sourceMap);n&&(i+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(n))))+" */");var a=new Blob([i],{type:"text/css"}),r=t.href;t.href=URL.createObjectURL(a),r&&URL.revokeObjectURL(r)}var u={},v=function(t){var e;return function(){return"undefined"==typeof e&&(e=t.apply(this,arguments)),e}},m=v(function(){return/msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase())}),y=v(function(){return document.head||document.getElementsByTagName("head")[0]}),b=null,h=0,g=[];t.exports=function(t,e){e=e||{},"undefined"==typeof e.singleton&&(e.singleton=m()),"undefined"==typeof e.insertAt&&(e.insertAt="bottom");var i=a(t);return n(i,e),function(t){for(var r=[],o=0;o<i.length;o++){var s=i[o],l=u[s.id];l.refs--,r.push(l)}if(t){var d=a(t);n(d,e)}for(var o=0;o<r.length;o++){var l=r[o];if(0===l.refs){for(var p=0;p<l.parts.length;p++)l.parts[p]();delete u[l.id]}}}};var x=function(){var t=[];return function(e,i){return t[e]=i,t.filter(Boolean).join("\n")}}()},,,,,,,,,,,,,,,,,function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e["default"]={name:"BeatLoader",props:{loading:{type:Boolean,"default":!0},color:{type:String,"default":"#5dc596"},size:{type:String,"default":"15px"},margin:{type:String,"default":"2px"},radius:{type:String,"default":"100%"}},data:function(){return{spinnerStyle:{backgroundColor:this.color,height:this.size,width:this.size,margin:this.margin,borderRadius:this.radius}}}}},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e["default"]={name:"BounceLoader",props:{loading:{type:Boolean,"default":!0},color:{type:String,"default":"#5dc596"},size:{type:String,"default":"60px"},margin:{type:String,"default":"2px"},radius:{type:String,"default":"100%"}},data:function(){return{spinnerStyle:{backgroundColor:this.color,height:this.size,width:this.size,borderRadius:this.radius,opacity:.6,position:"absolute",top:0,left:0}}},computed:{spinnerBasicStyle:function(){return{height:this.size,width:this.size,position:"relative"}}}}},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e["default"]={name:"ClipLoader",props:{loading:{type:Boolean,"default":!0},color:{type:String,"default":"#5dc596"},size:{type:String,"default":"35px"},radius:{type:String,"default":"100%"}},computed:{spinnerStyle:function(){return{height:this.size,width:this.size,borderWidth:"2px",borderStyle:"solid",borderColor:this.color+" "+this.color+" transparent",borderRadius:this.radius,background:"transparent !important"}}}}},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e["default"]={name:"DotLoader",props:{loading:{type:Boolean,"default":!0},color:{type:String,"default":"#5dc596"},size:{type:String,"default":"60px"},margin:{type:String,"default":"2px"},radius:{type:String,"default":"100%"}},computed:{spinnerStyle:function(){return{backgroundColor:this.color,height:parseFloat(this.size)/2+"px",width:parseFloat(this.size)/2+"px",borderRadius:this.radius}},spinnerBasicStyle:function(){return{height:this.size,width:this.size,position:"relative"}}}}},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e["default"]={name:"FadeLoader",props:{loading:{type:Boolean,"default":!0},color:{type:String,"default":"#5dc596"},height:{type:String,"default":"15px"},width:{type:String,"default":"5px"},margin:{type:String,"default":"2px"},radius:{type:String,"default":"2px"}},data:function(){return{spinnerStyle:{backgroundColor:this.color,height:this.height,width:this.width,margin:this.margin,borderRadius:this.radius},radius:"20px"}},computed:{ngRadius:function(){return"-"+this.radius},quarter:function(){return parseFloat(this.radius)/2+parseFloat(this.radius)/5.5+"px"},ngQuarter:function(){return"-"+this.quarter},animationStyle1:function(){return{top:this.radius,left:0,animationDelay:"0.12s"}},animationStyle2:function(){return{top:this.quarter,left:this.quarter,animationDelay:"0.24s",transform:"rotate(-45deg)"}},animationStyle3:function(){return{top:0,left:this.radius,animationDelay:"0.36s",transform:"rotate(90deg)"}},animationStyle4:function(){return{top:this.ngQuarter,left:this.quarter,animationDelay:"0.48s",transform:"rotate(45deg)"}},animationStyle5:function(){return{top:this.ngRadius,left:0,animationDelay:"0.60s"}},animationStyle6:function(){return{top:this.ngQuarter,left:this.ngQuarter,animationDelay:"0.72s",transform:"rotate(-45deg)"}},animationStyle7:function(){return{top:0,left:this.ngRadius,animationDelay:"0.84s",transform:"rotate(90deg)"}},animationStyle8:function(){return{top:this.quarter,left:this.ngQuarter,animationDelay:"0.96s",transform:"rotate(45deg)"}}}}},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e["default"]={name:"GridLoader",props:{loading:{type:Boolean,"default":!0},color:{type:String,"default":"#5dc596"},size:{type:String,"default":"15px"},margin:{type:String,"default":"2px"},radius:{type:String,"default":"100%"}},data:function(){return{spinnerStyle:{backgroundColor:this.color,width:this.size,height:this.size,margin:this.margin,borderRadius:this.radius}}},computed:{animationStyle:function(){return{animationName:"v-gridStretchDelay",animationIterationCount:"infinite",animationTimingFunction:"ease",animationFillMode:"both",display:"inline-block"}},animationStyle1:function(){return{animationDelay:this.delay(),animationDuration:this.duration()}},animationStyle2:function(){return{animationDelay:this.delay(),animationDuration:this.duration()}},animationStyle3:function(){return{animationDelay:this.delay(),animationDuration:this.duration()}},animationStyle4:function(){return{animationDelay:this.delay(),animationDuration:this.duration()}},animationStyle5:function(){return{animationDelay:this.delay(),animationDuration:this.duration()}},animationStyle6:function(){return{animationDelay:this.delay(),animationDuration:this.duration()}},animationStyle7:function(){return{animationDelay:this.delay(),animationDuration:this.duration()}},animationStyle8:function(){return{animationDelay:this.delay(),animationDuration:this.duration()}},animationStyle9:function(){return{animationDelay:this.delay(),animationDuration:this.duration()}},containerStyle:function(){return{width:3*parseFloat(this.size)+6*parseFloat(this.margin)+"px",fontSize:0}}},methods:{random:function(t){return Math.random()*t},delay:function(){return this.random(100)/100-.2+"s"},duration:function(){return this.random(100)/100+.6+"s"}}}},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e["default"]={name:"MoonLoader",props:{loading:{type:Boolean,"default":!0},color:{type:String,"default":"#5dc596"},size:{type:String,"default":"60px"},margin:{type:String,"default":"2px"},radius:{type:String,"default":"100%"}},data:function(){return{spinnerStyle:{height:this.size,width:this.size,borderRadius:this.radius}}},computed:{moonSize:function(){return parseFloat(this.size)/7},spinnerMoonStyle:function(){return{height:this.moonSize+"px",width:this.moonSize+"px",borderRadius:this.radius}},animationStyle2:function(){return{top:parseFloat(this.size)/2-this.moonSize/2+"px",backgroundColor:this.color}},animationStyle3:function(){return{border:this.moonSize+"px solid "+this.color}}}}},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e["default"]={name:"PacmanLoader",props:{loading:{type:Boolean,"default":!0},color:{type:String,"default":"#5dc596"},size:{type:String,"default":"25px"},margin:{type:String,"default":"2px"},radius:{type:String,"default":"100%"}},data:function(){return{spinnerDelay2:{animationDelay:"0.25s"},spinnerDelay3:{animationDelay:"0.50s"},spinnerDelay4:{animationDelay:"0.75s"},spinnerDelay5:{animationDelay:"1s"}}},computed:{spinnerStyle:function(){return{backgroundColor:this.color,width:this.size,height:this.size,margin:this.margin,borderRadius:this.radius}},border1:function(){return this.size+" solid transparent"},border2:function(){return this.size+" solid "+this.color},spinnerStyle1:function(){return{width:0,height:0,borderTop:this.border2,borderRight:this.border1,borderBottom:this.border2,borderLeft:this.border2,borderRadius:this.size}},animationStyle:function(){return{width:"10px",height:"10px",transform:"translate(0, "+-parseFloat(this.size)/4+"px)",position:"absolute",top:"25px",left:"100px",animationName:"v-pacmanStretchDelay",animationDuration:"1s",animationIterationCount:"infinite",animationTimingFunction:"linear",animationFillMode:"both"}}}}},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e["default"]={name:"PulseLoader",props:{loading:{type:Boolean,"default":!0},color:{type:String,"default":"#5dc596"},size:{type:String,"default":"15px"},margin:{type:String,"default":"2px"},radius:{type:String,"default":"100%"}},data:function(){return{spinnerStyle:{backgroundColor:this.color,width:this.size,height:this.size,margin:this.margin,borderRadius:this.radius,display:"inline-block",animationName:"v-pulseStretchDelay",animationDuration:"0.75s",animationIterationCount:"infinite",animationTimingFunction:"cubic-bezier(.2,.68,.18,1.08)",animationFillMode:"both"},spinnerDelay1:{animationDelay:"0.12s"},spinnerDelay2:{animationDelay:"0.24s"},spinnerDelay3:{animationDelay:"0.36s"}}}}},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e["default"]={name:"RingLoader",props:{loading:{type:Boolean,"default":!0},color:{type:String,"default":"#5dc596"},size:{type:String,"default":"60px"},margin:{type:String,"default":"2px"},radius:{type:String,"default":"100%"}},computed:{spinnerStyle:function(){return{height:this.size,width:this.size,border:parseFloat(this.size)/10+"px solid"+this.color,opacity:.4,borderRadius:this.radius}},spinnerBasicStyle:function(){return{height:this.size,width:this.size,position:"relative"}}}}},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e["default"]={name:"RiseLoader",props:{loading:{type:Boolean,"default":!0},color:{type:String,"default":"#5dc596"},size:{type:String,"default":"15px"},margin:{type:String,"default":"2px"},radius:{type:String,"default":"100%"}},data:function(){return{spinnerStyle:{backgroundColor:this.color,height:this.size,width:this.size,margin:this.margin,borderRadius:this.radius}}}}},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e["default"]={name:"RotateLoader",props:{loading:{type:Boolean,"default":!0},color:{type:String,"default":"#5dc596"},size:{type:String,"default":"15px"},margin:{type:String,"default":"2px"},radius:{type:String,"default":"100%"}},data:function(){return{spinnerStyle:{backgroundColor:this.color,height:this.size,width:this.size,margin:this.margin,borderRadius:this.radius}}}}},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e["default"]={name:"ScaleLoader",props:{loading:{type:Boolean,"default":!0},color:{type:String,"default":"#5dc596"},height:{type:String,"default":"35px"},width:{type:String,"default":"4px"},margin:{type:String,"default":"2px"},radius:{type:String,"default":"2px"}},data:function(){return{spinnerStyle:{backgroundColor:this.color,height:this.height,width:this.width,margin:this.margin,borderRadius:this.radius,display:"inline-block",animationName:"v-scaleStretchDelay",animationDuration:"1s",animationIterationCount:"infinite",animationTimingFunction:"cubic-bezier(.2,.68,.18,1.08)",animationFillMode:"both"},spinnerDelay1:{animationDelay:"0.1s"},spinnerDelay2:{animationDelay:"0.2s"},spinnerDelay3:{animationDelay:"0.3s"},spinnerDelay4:{animationDelay:"0.4s"},spinnerDelay5:{animationDelay:"0.5s"}}}}},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e["default"]={name:"SkewLoader",props:{loading:{type:Boolean,"default":!0},color:{type:String,"default":"#5dc596"},size:{type:String,"default":"20px"}},data:function(){return{spinnerStyle:{height:0,width:0,borderLeft:this.size+" solid transparent",borderRight:this.size+" solid transparent",borderBottom:this.size+" solid "+this.color}}}}},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e["default"]={name:"SquareLoader",props:{loading:{type:Boolean,"default":!0},color:{type:String,"default":"#5dc596"},size:{type:String,"default":"50px"}},data:function(){return{spinnerStyle:{backgroundColor:this.color,height:this.size,width:this.size}}}}},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e["default"]={name:"SyncLoader",props:{loading:{type:Boolean,"default":!0},color:{type:String,"default":"#5dc596"},size:{type:String,"default":"15px"},margin:{type:String,"default":"2px"},radius:{type:String,"default":"100%"}},data:function(){return{spinnerStyle:{backgroundColor:this.color,height:this.size,width:this.size,margin:this.margin,borderRadius:this.radius,display:"inline-block",animationName:"v-syncStretchDelay",animationDuration:"0.6s",animationIterationCount:"infinite",animationTimingFunction:"ease-in-out",animationFillMode:"both"},spinnerDelay1:{animationDelay:"0.07s"},spinnerDelay2:{animationDelay:"0.14s"},spinnerDelay3:{animationDelay:"0.21s"}}}}},function(t,e,i){e=t.exports=i(1)(),e.push([t.id,"@-webkit-keyframes v-syncStretchDelay{33%{-webkit-transform:translateY(10px);transform:translateY(10px)}66%{-webkit-transform:translateY(-10px);transform:translateY(-10px)}to{-webkit-transform:translateY(0);transform:translateY(0)}}@keyframes v-syncStretchDelay{33%{-webkit-transform:translateY(10px);transform:translateY(10px)}66%{-webkit-transform:translateY(-10px);transform:translateY(-10px)}to{-webkit-transform:translateY(0);transform:translateY(0)}}",""])},function(t,e,i){e=t.exports=i(1)(),e.push([t.id,".v-spinner .v-fade{-webkit-animation:v-fadeStretchDelay 1.2s infinite ease-in-out;animation:v-fadeStretchDelay 1.2s infinite ease-in-out;-webkit-animation-fill-mode:both;animation-fill-mode:both;position:absolute}@-webkit-keyframes v-fadeStretchDelay{50%{-webkit-opacity:.3;opacity:.3}to{-webkit-opacity:1;opacity:1}}@keyframes v-fadeStretchDelay{50%{-webkit-opacity:.3;opacity:.3}to{-webkit-opacity:1;opacity:1}}",""])},function(t,e,i){e=t.exports=i(1)(),e.push([t.id,".v-spinner{text-align:center}.v-spinner .v-clip{-webkit-animation:v-clipDelay .75s 0s infinite linear;animation:v-clipDelay .75s 0s infinite linear;-webkit-animation-fill-mode:both;animation-fill-mode:both;display:inline-block}@-webkit-keyframes v-clipDelay{0%{-webkit-transform:rotate(0deg) scale(1);transform:rotate(0deg) scale(1)}50%{-webkit-transform:rotate(180deg) scale(.8);transform:rotate(180deg) scale(.8)}to{-webkit-transform:rotate(1turn) scale(1);transform:rotate(1turn) scale(1)}}@keyframes v-clipDelay{0%{-webkit-transform:rotate(0deg) scale(1);transform:rotate(0deg) scale(1)}50%{-webkit-transform:rotate(180deg) scale(.8);transform:rotate(180deg) scale(.8)}to{-webkit-transform:rotate(1turn) scale(1);transform:rotate(1turn) scale(1)}}",""])},function(t,e,i){e=t.exports=i(1)(),e.push([t.id,".v-spinner .v-beat{-webkit-animation:v-beatStretchDelay .7s infinite linear;animation:v-beatStretchDelay .7s infinite linear;-webkit-animation-fill-mode:both;animation-fill-mode:both;display:inline-block}.v-spinner .v-beat-odd{-webkit-animation-delay:0s;animation-delay:0s}.v-spinner .v-beat-even{-webkit-animation-delay:.35s;animation-delay:.35s}@-webkit-keyframes v-beatStretchDelay{50%{-webkit-transform:scale(.75);transform:scale(.75);-webkit-opacity:.2;opacity:.2}to{-webkit-transform:scale(1);transform:scale(1);-webkit-opacity:1;opacity:1}}@keyframes v-beatStretchDelay{50%{-webkit-transform:scale(.75);transform:scale(.75);-webkit-opacity:.2;opacity:.2}to{-webkit-transform:scale(1);transform:scale(1);-webkit-opacity:1;opacity:1}}",""])},function(t,e,i){e=t.exports=i(1)(),e.push([t.id,".v-spinner{text-align:center}.v-spinner .v-skew{-webkit-animation:v-skewDelay 3s 0s infinite cubic-bezier(.09,.57,.49,.9);animation:v-skewDelay 3s 0s infinite cubic-bezier(.09,.57,.49,.9);-webkit-animation-fill-mode:both;animation-fill-mode:both;display:inline-block}@-webkit-keyframes v-skewDelay{25%{-webkit-transform:perspective(100px) rotateX(180deg) rotateY(0);transform:perspective(100px) rotateX(180deg) rotateY(0)}50%{-webkit-transform:perspective(100px) rotateX(180deg) rotateY(180deg);transform:perspective(100px) rotateX(180deg) rotateY(180deg)}75%{-webkit-transform:perspective(100px) rotateX(0) rotateY(180deg);transform:perspective(100px) rotateX(0) rotateY(180deg)}to{-webkit-transform:perspective(100px) rotateX(0) rotateY(0);transform:perspective(100px) rotateX(0) rotateY(0)}}@keyframes v-skewDelay{25%{-webkit-transform:perspective(100px) rotateX(180deg) rotateY(0);transform:perspective(100px) rotateX(180deg) rotateY(0)}50%{-webkit-transform:perspective(100px) rotateX(180deg) rotateY(180deg);transform:perspective(100px) rotateX(180deg) rotateY(180deg)}75%{-webkit-transform:perspective(100px) rotateX(0) rotateY(180deg);transform:perspective(100px) rotateX(0) rotateY(180deg)}to{-webkit-transform:perspective(100px) rotateX(0) rotateY(0);transform:perspective(100px) rotateX(0) rotateY(0)}}",""])},function(t,e,i){e=t.exports=i(1)(),e.push([t.id,"@-webkit-keyframes v-gridStretchDelay{0%{-webkit-transform:scale(1);transform:scale(1)}50%{-webkit-transform:scale(.5);transform:scale(.5);-webkit-opacity:.7;opacity:.7}to{-webkit-transform:scale(1);transform:scale(1);-webkit-opacity:1;opacity:1}}@keyframes v-gridStretchDelay{0%{-webkit-transform:scale(1);transform:scale(1)}50%{-webkit-transform:scale(.5);transform:scale(.5);-webkit-opacity:.7;opacity:.7}to{-webkit-transform:scale(1);transform:scale(1);-webkit-opacity:1;opacity:1}}",""])},function(t,e,i){e=t.exports=i(1)(),e.push([t.id,".v-spinner .v-rotate1{-webkit-animation:v-rotateStretchDelay 1s 0s infinite cubic-bezier(.7,-.13,.22,.86);animation:v-rotateStretchDelay 1s 0s infinite cubic-bezier(.7,-.13,.22,.86);-webkit-animation-fill-mode:both;animation-fill-mode:both;display:inline-block;position:relative}.v-spinner .v-rotate2{opacity:.8;position:absolute;top:0;left:-28px}.v-spinner .v-rotate3{opacity:.8;position:absolute;top:0;left:25px}@-webkit-keyframes v-rotateStretchDelay{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}50%{-webkit-transform:rotate(180deg);transform:rotate(180deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}@keyframes v-rotateStretchDelay{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}50%{-webkit-transform:rotate(180deg);transform:rotate(180deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}",""])},function(t,e,i){e=t.exports=i(1)(),e.push([t.id,".v-spinner .v-moon1{position:relative}.v-spinner .v-moon1,.v-spinner .v-moon2{-webkit-animation:v-moonStretchDelay .6s 0s infinite linear;animation:v-moonStretchDelay .6s 0s infinite linear;-webkit-animation-fill-mode:forwards;animation-fill-mode:forwards}.v-spinner .v-moon2{opacity:.8;position:absolute}.v-spinner .v-moon3{opacity:.1}@-webkit-keyframes v-moonStretchDelay{to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}@keyframes v-moonStretchDelay{to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}",""])},function(t,e,i){e=t.exports=i(1)(),e.push([t.id,"@-webkit-keyframes v-pulseStretchDelay{0%,80%{-webkit-transform:scale(1);transform:scale(1);-webkit-opacity:1;opacity:1}45%{-webkit-transform:scale(.1);transform:scale(.1);-webkit-opacity:.7;opacity:.7}}@keyframes v-pulseStretchDelay{0%,80%{-webkit-transform:scale(1);transform:scale(1);-webkit-opacity:1;opacity:1}45%{-webkit-transform:scale(.1);transform:scale(.1);-webkit-opacity:.7;opacity:.7}}",""])},function(t,e,i){e=t.exports=i(1)(),e.push([t.id,".v-spinner{text-align:center}.v-spinner .v-square{-webkit-animation:v-squareDelay 3s 0s infinite cubic-bezier(.09,.57,.49,.9);animation:v-squareDelay 3s 0s infinite cubic-bezier(.09,.57,.49,.9);-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-perspective:100px;perspective:100px;display:inline-block}@-webkit-keyframes v-squareDelay{25%{-webkit-transform:rotateX(180deg) rotateY(0);transform:rotateX(180deg) rotateY(0)}50%{-webkit-transform:rotateX(180deg) rotateY(180deg);transform:rotateX(180deg) rotateY(180deg)}75%{-webkit-transform:rotateX(0) rotateY(180deg);transform:rotateX(0) rotateY(180deg)}to{-webkit-transform:rotateX(0) rotateY(0);transform:rotateX(0) rotateY(0)}}@keyframes v-squareDelay{25%{-webkit-transform:rotateX(180deg) rotateY(0);transform:rotateX(180deg) rotateY(0)}50%{-webkit-transform:rotateX(180deg) rotateY(180deg);transform:rotateX(180deg) rotateY(180deg)}75%{-webkit-transform:rotateX(0) rotateY(180deg);transform:rotateX(0) rotateY(180deg)}to{-webkit-transform:rotateX(0) rotateY(0);transform:rotateX(0) rotateY(0)}}",""])},function(t,e,i){e=t.exports=i(1)(),e.push([t.id,".v-spinner .v-bounce2{-webkit-animation:v-bounceStretchDelay 2s 1s infinite ease-in-out;animation:v-bounceStretchDelay 2s 1s infinite ease-in-out;-webkit-animation-fill-mode:both;animation-fill-mode:both}.v-spinner .v-bounce3{-webkit-animation:v-bounceStretchDelay 2s 0s infinite ease-in-out;animation:v-bounceStretchDelay 2s 0s infinite ease-in-out;-webkit-animation-fill-mode:both;animation-fill-mode:both}@-webkit-keyframes v-bounceStretchDelay{0%,to{-webkit-transform:scale(0);transform:scale(0)}50%{-webkit-transform:scale(1);transform:scale(1)}}@keyframes v-bounceStretchDelay{0%,to{-webkit-transform:scale(0);transform:scale(0)}50%{-webkit-transform:scale(1);transform:scale(1)}}",""])},function(t,e,i){e=t.exports=i(1)(),e.push([t.id,".v-spinner .v-dot1{-webkit-animation:v-dotRotate 2s 0s infinite linear;animation:v-dotRotate 2s 0s infinite linear;-webkit-animation-fill-mode:forwards;animation-fill-mode:forwards}.v-spinner .v-dot2{-webkit-animation:v-dotBounce 2s 0s infinite linear;animation:v-dotBounce 2s 0s infinite linear;animation-fill-mode:forwards;top:0;bottom:auto}.v-spinner .v-dot2,.v-spinner .v-dot3{-webkit-animation-fill-mode:forwards;position:'absolute'}.v-spinner .v-dot3{-webkit-animation:v-dotBounce 2s -1s infinite linear;animation:v-dotBounce 2s -1s infinite linear;animation-fill-mode:forwards;top:auto;bottom:0}@-webkit-keyframes v-dotRotate{to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}@keyframes v-dotRotate{to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}@-webkit-keyframes v-dotBounce{0%,to{-webkit-transform:scale(0);transform:scale(0)}50%{-webkit-transform:scale(1);transform:scale(1)}}@keyframes v-dotBounce{0%,to{-webkit-transform:scale(0);transform:scale(0)}50%{-webkit-transform:scale(1);transform:scale(1)}}",""])},function(t,e,i){e=t.exports=i(1)(),e.push([t.id,".v-spinner .v-ring2{-webkit-animation:v-ringRightRotate 2s 0s infinite linear;animation:v-ringRightRotate 2s 0s infinite linear;animation-fill-mode:forwards}.v-spinner .v-ring2,.v-spinner .v-ring3{-webkit-animation-fill-mode:forwards;-webkit-perspective:800px;perspective:800px;position:absolute;top:0;left:0}.v-spinner .v-ring3{-webkit-animation:v-ringLeftRotate 2s 0s infinite linear;animation:v-ringLeftRotate 2s 0s infinite linear;animation-fill-mode:forwards}@-webkit-keyframes v-ringRightRotate{0%{-webkit-transform:rotateX(0deg) rotateY(0deg) rotate(0deg);transform:rotateX(0deg) rotateY(0deg) rotate(0deg)}to{-webkit-transform:rotateX(180deg) rotateY(1turn) rotate(1turn);transform:rotateX(180deg) rotateY(1turn) rotate(1turn)}}@keyframes v-ringRightRotate{0%{-webkit-transform:rotateX(0deg) rotateY(0deg) rotate(0deg);transform:rotateX(0deg) rotateY(0deg) rotate(0deg)}to{-webkit-transform:rotateX(180deg) rotateY(1turn) rotate(1turn);transform:rotateX(180deg) rotateY(1turn) rotate(1turn)}}@-webkit-keyframes v-ringLeftRotate{0%{-webkit-transform:rotateX(0deg) rotateY(0deg) rotate(0deg);transform:rotateX(0deg) rotateY(0deg) rotate(0deg)}to{-webkit-transform:rotateX(1turn) rotateY(180deg) rotate(1turn);transform:rotateX(1turn) rotateY(180deg) rotate(1turn)}}@keyframes v-ringLeftRotate{0%{-webkit-transform:rotateX(0deg) rotateY(0deg) rotate(0deg);transform:rotateX(0deg) rotateY(0deg) rotate(0deg)}to{-webkit-transform:rotateX(1turn) rotateY(180deg) rotate(1turn);transform:rotateX(1turn) rotateY(180deg) rotate(1turn)}}",""])},function(t,e,i){e=t.exports=i(1)(),e.push([t.id,".v-spinner{text-align:center}@-webkit-keyframes v-scaleStretchDelay{0%,to{-webkit-transform:scaleY(1);transform:scaleY(1)}50%{-webkit-transform:scaleY(.4);transform:scaleY(.4)}}@keyframes v-scaleStretchDelay{0%,to{-webkit-transform:scaleY(1);transform:scaleY(1)}50%{-webkit-transform:scaleY(.4);transform:scaleY(.4)}}",""])},function(t,e,i){e=t.exports=i(1)(),e.push([t.id,".v-spinner{text-align:center}.v-spinner .v-rise-odd{-webkit-animation:v-riseOddDelay 1s 0s infinite cubic-bezier(.15,.46,.9,.6);animation:v-riseOddDelay 1s 0s infinite cubic-bezier(.15,.46,.9,.6);animation-fill-mode:both}.v-spinner .v-rise-even,.v-spinner .v-rise-odd{-webkit-animation-fill-mode:both;display:inline-block}.v-spinner .v-rise-even{-webkit-animation:v-riseEvenDelay 1s 0s infinite cubic-bezier(.15,.46,.9,.6);animation:v-riseEvenDelay 1s 0s infinite cubic-bezier(.15,.46,.9,.6);animation-fill-mode:both}@-webkit-keyframes v-riseOddDelay{25{-webkit-transform:translateY(30px);transform:translateY(30px)}0%{-webkit-transform:scale(.4);transform:scale(.4)}50%{-webkit-transform:scale(1.1);transform:scale(1.1)}75%{-webkit-transform:translateY(-30px);transform:translateY(-30px)}to{-webkit-transform:translateY(0) scale(.75);transform:translateY(0) scale(.75)}}@keyframes v-riseOddDelay{25{-webkit-transform:translateY(30px);transform:translateY(30px)}0%{-webkit-transform:scale(.4);transform:scale(.4)}50%{-webkit-transform:scale(1.1);transform:scale(1.1)}75%{-webkit-transform:translateY(-30px);transform:translateY(-30px)}to{-webkit-transform:translateY(0) scale(.75);transform:translateY(0) scale(.75)}}@-webkit-keyframes v-riseEvenDelay{25{-webkit-transform:translateY(-30px);transform:translateY(-30px)}0%{-webkit-transform:scale(1.1);transform:scale(1.1)}50%{-webkit-transform:scale(.4);transform:scale(.4)}75%{-webkit-transform:translateY(30px);transform:translateY(30px)}to{-webkit-transform:translateY(0) scale(1);transform:translateY(0) scale(1)}}@keyframes v-riseEvenDelay{25{-webkit-transform:translateY(-30px);transform:translateY(-30px)}0%{-webkit-transform:scale(1.1);transform:scale(1.1)}50%{-webkit-transform:scale(.4);transform:scale(.4)}75%{-webkit-transform:translateY(30px);transform:translateY(30px)}to{-webkit-transform:translateY(0) scale(1);transform:translateY(0) scale(1)}}",""])},function(t,e,i){e=t.exports=i(1)(),e.push([t.id,".v-spinner{text-align:center}@-webkit-keyframes v-pacmanStretchDelay{75%{-webkit-opacity:.7;opacity:.7}to{-webkit-transform:translate(-100px,-6.25px);transform:translate(-100px,-6.25px)}}@keyframes v-pacmanStretchDelay{75%{-webkit-opacity:.7;opacity:.7}to{-webkit-transform:translate(-100px,-6.25px);transform:translate(-100px,-6.25px)}}",""])},function(t,e,i){var n=i(35);"string"==typeof n&&(n=[[t.id,n,""]]);i(2)(n,{});n.locals&&(t.exports=n.locals)},function(t,e,i){var n=i(36);"string"==typeof n&&(n=[[t.id,n,""]]);i(2)(n,{});n.locals&&(t.exports=n.locals)},function(t,e,i){var n=i(37);"string"==typeof n&&(n=[[t.id,n,""]]);i(2)(n,{});n.locals&&(t.exports=n.locals)},function(t,e,i){var n=i(38);"string"==typeof n&&(n=[[t.id,n,""]]);i(2)(n,{});n.locals&&(t.exports=n.locals)},function(t,e,i){var n=i(39);"string"==typeof n&&(n=[[t.id,n,""]]);i(2)(n,{});n.locals&&(t.exports=n.locals)},function(t,e,i){var n=i(40);"string"==typeof n&&(n=[[t.id,n,""]]);i(2)(n,{});n.locals&&(t.exports=n.locals)},function(t,e,i){var n=i(41);"string"==typeof n&&(n=[[t.id,n,""]]);i(2)(n,{});n.locals&&(t.exports=n.locals)},function(t,e,i){var n=i(42);"string"==typeof n&&(n=[[t.id,n,""]]);i(2)(n,{});n.locals&&(t.exports=n.locals)},function(t,e,i){var n=i(43);"string"==typeof n&&(n=[[t.id,n,""]]);i(2)(n,{});n.locals&&(t.exports=n.locals)},function(t,e,i){var n=i(44);"string"==typeof n&&(n=[[t.id,n,""]]);i(2)(n,{});n.locals&&(t.exports=n.locals)},function(t,e,i){var n=i(45);"string"==typeof n&&(n=[[t.id,n,""]]);i(2)(n,{});n.locals&&(t.exports=n.locals)},function(t,e,i){var n=i(46);"string"==typeof n&&(n=[[t.id,n,""]]);i(2)(n,{});n.locals&&(t.exports=n.locals)},function(t,e,i){var n=i(47);"string"==typeof n&&(n=[[t.id,n,""]]);i(2)(n,{});n.locals&&(t.exports=n.locals)},function(t,e,i){var n=i(48);"string"==typeof n&&(n=[[t.id,n,""]]);i(2)(n,{});n.locals&&(t.exports=n.locals)},function(t,e,i){
var n=i(49);"string"==typeof n&&(n=[[t.id,n,""]]);i(2)(n,{});n.locals&&(t.exports=n.locals)},function(t,e,i){var n=i(50);"string"==typeof n&&(n=[[t.id,n,""]]);i(2)(n,{});n.locals&&(t.exports=n.locals)},function(t,e){t.exports='<div class=v-spinner v-show=loading><div class="v-beat v-beat-odd" v-bind:style=spinnerStyle></div><div class="v-beat v-beat-even" v-bind:style=spinnerStyle></div><div class="v-beat v-beat-odd" v-bind:style=spinnerStyle></div></div>'},function(t,e){t.exports='<div class=v-spinner v-show=loading><div class="v-bounce v-bounce1" v-bind:style=spinnerBasicStyle><div class="v-bounce v-bounce2" v-bind:style=spinnerStyle></div><div class="v-bounce v-bounce3" v-bind:style=spinnerStyle></div></div></div>'},function(t,e){t.exports="<div class=v-spinner v-show=loading><div class=v-clip v-bind:style=spinnerStyle></div></div>"},function(t,e){t.exports='<div class=v-spinner v-show=loading><div class="v-dot v-dot1" v-bind:style=spinnerBasicStyle><div class="v-dot v-dot2" v-bind:style=spinnerStyle></div><div class="v-dot v-dot3" v-bind:style=spinnerStyle></div></div></div>'},function(t,e){t.exports='<div class=v-spinner v-bind:style="{position: \'relative\', fontSize: 0}" v-show=loading><div class="v-fade v-fade1" v-bind:style=[spinnerStyle,animationStyle1]></div><div class="v-fade v-fade2" v-bind:style=[spinnerStyle,animationStyle2]></div><div class="v-fade v-fade3" v-bind:style=[spinnerStyle,animationStyle3]></div><div class="v-fade v-fade4" v-bind:style=[spinnerStyle,animationStyle4]></div><div class="v-fade v-fade5" v-bind:style=[spinnerStyle,animationStyle5]></div><div class="v-fade v-fade6" v-bind:style=[spinnerStyle,animationStyle6]></div><div class="v-fade v-fade7" v-bind:style=[spinnerStyle,animationStyle7]></div><div class="v-fade v-fade8" v-bind:style=[spinnerStyle,animationStyle8]></div></div>'},function(t,e){t.exports='<div class=v-spinner v-bind:style=containerStyle v-show=loading><div class="v-grid v-grid1" v-bind:style=[spinnerStyle,animationStyle,animationStyle1]></div><div class="v-grid v-grid2" v-bind:style=[spinnerStyle,animationStyle,animationStyle2]></div><div class="v-grid v-grid3" v-bind:style=[spinnerStyle,animationStyle,animationStyle3]></div><div class="v-grid v-grid4" v-bind:style=[spinnerStyle,animationStyle,animationStyle4]></div><div class="v-grid v-grid5" v-bind:style=[spinnerStyle,animationStyle,animationStyle5]></div><div class="v-grid v-grid6" v-bind:style=[spinnerStyle,animationStyle,animationStyle6]></div><div class="v-grid v-grid7" v-bind:style=[spinnerStyle,animationStyle,animationStyle7]></div><div class="v-grid v-grid8" v-bind:style=[spinnerStyle,animationStyle,animationStyle8]></div><div class="v-grid v-grid9" v-bind:style=[spinnerStyle,animationStyle,animationStyle9]></div></div>'},function(t,e){t.exports='<div class=v-spinner v-show=loading><div class="v-moon v-moon1" v-bind:style=spinnerStyle><div class="v-moon v-moon2" v-bind:style=[spinnerMoonStyle,animationStyle2]></div><div class="v-moon v-moon3" v-bind:style=[spinnerStyle,animationStyle3]></div></div></div>'},function(t,e){t.exports='<div class=v-spinner v-bind:style="{position: \'relative\', fontSize: 0}" v-show=loading><div class="v-pacman v-pacman1" v-bind:style=spinnerStyle1></div><div class="v-pacman v-pacman2" v-bind:style=[spinnerStyle,animationStyle,spinnerDelay2]></div><div class="v-pacman v-pacman3" v-bind:style=[spinnerStyle,animationStyle,spinnerDelay3]></div><div class="v-pacman v-pacman4" v-bind:style=[spinnerStyle,animationStyle,spinnerDelay4]></div><div class="v-pacman v-pacman5" v-bind:style=[spinnerStyle,animationStyle,spinnerDelay5]></div></div>'},function(t,e){t.exports='<div class=v-spinner v-show=loading><div class="v-pulse v-pulse1" v-bind:style=[spinnerStyle,spinnerDelay1]></div><div class="v-pulse v-pulse2" v-bind:style=[spinnerStyle,spinnerDelay2]></div><div class="v-pulse v-pulse3" v-bind:style=[spinnerStyle,spinnerDelay3]></div></div>'},function(t,e){t.exports='<div class=v-spinner v-show=loading><div class="v-ring v-ring1" v-bind:style=spinnerBasicStyle><div class="v-ring v-ring2" v-bind:style=spinnerStyle></div><div class="v-ring v-ring3" v-bind:style=spinnerStyle></div></div></div>'},function(t,e){t.exports='<div class=v-spinner v-show=loading><div class="v-rise v-rise-odd" v-bind:style=spinnerStyle></div><div class="v-rise v-rise-even" v-bind:style=spinnerStyle></div><div class="v-rise v-rise-odd" v-bind:style=spinnerStyle></div><div class="v-rise v-rise-even" v-bind:style=spinnerStyle></div><div class="v-rise v-rise-odd" v-bind:style=spinnerStyle></div></div>'},function(t,e){t.exports='<div class=v-spinner v-show=loading><div class="v-rotate v-rotate1" v-bind:style=spinnerStyle><div class="v-rotate v-rotate2" v-bind:style=spinnerStyle></div><div class="v-rotate v-rotate3" v-bind:style=spinnerStyle></div></div></div>'},function(t,e){t.exports='<div class=v-spinner v-show=loading><div class="v-scale v-scale1" v-bind:style=[spinnerStyle,spinnerDelay1]></div><div class="v-scale v-scale2" v-bind:style=[spinnerStyle,spinnerDelay2]></div><div class="v-scale v-scale3" v-bind:style=[spinnerStyle,spinnerDelay3]></div><div class="v-scale v-scale4" v-bind:style=[spinnerStyle,spinnerDelay4]></div><div class="v-scale v-scale5" v-bind:style=[spinnerStyle,spinnerDelay5]></div></div>'},function(t,e){t.exports="<div class=v-spinner v-show=loading><div class=v-skew v-bind:style=spinnerStyle></div></div>"},function(t,e){t.exports="<div class=v-spinner v-show=loading><div class=v-square v-bind:style=spinnerStyle></div></div>"},function(t,e){t.exports='<div class=v-spinner v-show=loading><div class="v-sync v-sync1" v-bind:style=[spinnerStyle,spinnerDelay1]></div><div class="v-sync v-sync2" v-bind:style=[spinnerStyle,spinnerDelay2]></div><div class="v-sync v-sync3" v-bind:style=[spinnerStyle,spinnerDelay3]></div></div>'},function(t,e,i){var n,a;i(54),n=i(19),a=i(67),t.exports=n||{},t.exports.__esModule&&(t.exports=t.exports["default"]),a&&(("function"==typeof t.exports?t.exports.options:t.exports).template=a)},function(t,e,i){var n,a;i(61),n=i(20),a=i(68),t.exports=n||{},t.exports.__esModule&&(t.exports=t.exports["default"]),a&&(("function"==typeof t.exports?t.exports.options:t.exports).template=a)},function(t,e,i){var n,a;i(53),n=i(21),a=i(69),t.exports=n||{},t.exports.__esModule&&(t.exports=t.exports["default"]),a&&(("function"==typeof t.exports?t.exports.options:t.exports).template=a)},function(t,e,i){var n,a;i(62),n=i(22),a=i(70),t.exports=n||{},t.exports.__esModule&&(t.exports=t.exports["default"]),a&&(("function"==typeof t.exports?t.exports.options:t.exports).template=a)},function(t,e,i){var n,a;i(52),n=i(23),a=i(71),t.exports=n||{},t.exports.__esModule&&(t.exports=t.exports["default"]),a&&(("function"==typeof t.exports?t.exports.options:t.exports).template=a)},function(t,e,i){var n,a;i(56),n=i(24),a=i(72),t.exports=n||{},t.exports.__esModule&&(t.exports=t.exports["default"]),a&&(("function"==typeof t.exports?t.exports.options:t.exports).template=a)},function(t,e,i){var n,a;i(58),n=i(25),a=i(73),t.exports=n||{},t.exports.__esModule&&(t.exports=t.exports["default"]),a&&(("function"==typeof t.exports?t.exports.options:t.exports).template=a)},function(t,e,i){var n,a;i(66),n=i(26),a=i(74),t.exports=n||{},t.exports.__esModule&&(t.exports=t.exports["default"]),a&&(("function"==typeof t.exports?t.exports.options:t.exports).template=a)},function(t,e,i){var n,a;i(59),n=i(27),a=i(75),t.exports=n||{},t.exports.__esModule&&(t.exports=t.exports["default"]),a&&(("function"==typeof t.exports?t.exports.options:t.exports).template=a)},function(t,e,i){var n,a;i(63),n=i(28),a=i(76),t.exports=n||{},t.exports.__esModule&&(t.exports=t.exports["default"]),a&&(("function"==typeof t.exports?t.exports.options:t.exports).template=a)},function(t,e,i){var n,a;i(65),n=i(29),a=i(77),t.exports=n||{},t.exports.__esModule&&(t.exports=t.exports["default"]),a&&(("function"==typeof t.exports?t.exports.options:t.exports).template=a)},function(t,e,i){var n,a;i(57),n=i(30),a=i(78),t.exports=n||{},t.exports.__esModule&&(t.exports=t.exports["default"]),a&&(("function"==typeof t.exports?t.exports.options:t.exports).template=a)},function(t,e,i){var n,a;i(64),n=i(31),a=i(79),t.exports=n||{},t.exports.__esModule&&(t.exports=t.exports["default"]),a&&(("function"==typeof t.exports?t.exports.options:t.exports).template=a)},function(t,e,i){var n,a;i(55),n=i(32),a=i(80),t.exports=n||{},t.exports.__esModule&&(t.exports=t.exports["default"]),a&&(("function"==typeof t.exports?t.exports.options:t.exports).template=a)},function(t,e,i){var n,a;i(60),n=i(33),a=i(81),t.exports=n||{},t.exports.__esModule&&(t.exports=t.exports["default"]),a&&(("function"==typeof t.exports?t.exports.options:t.exports).template=a)},function(t,e,i){var n,a;i(51),n=i(34),a=i(82),t.exports=n||{},t.exports.__esModule&&(t.exports=t.exports["default"]),a&&(("function"==typeof t.exports?t.exports.options:t.exports).template=a)}])});
},{}],27:[function(require,module,exports){
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

!function (e, t) {
  "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) && "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) ? exports.VueStrap = t() : e.VueStrap = t();
}(undefined, function () {
  return function (e) {
    function t(o) {
      if (n[o]) return n[o].exports;var i = n[o] = { exports: {}, id: o, loaded: !1 };return e[o].call(i.exports, i, i.exports, t), i.loaded = !0, i.exports;
    }var n = {};return t.m = e, t.c = n, t.p = "", t(0);
  }([function (e, t, n) {
    "use strict";
    function o(e) {
      return e && e.__esModule ? e : { "default": e };
    }var i = n(27),
        r = o(i),
        a = n(95),
        s = o(a),
        l = n(99),
        c = o(l),
        u = n(102),
        d = o(u),
        p = n(109),
        f = o(p),
        h = n(114),
        v = o(h),
        y = n(117),
        b = o(y),
        m = n(122),
        g = o(m),
        x = n(127),
        w = o(x),
        _ = n(132),
        k = o(_),
        S = n(137),
        M = o(S),
        O = n(140),
        $ = o(O),
        D = n(145),
        j = o(D),
        C = n(154),
        N = o(C),
        B = n(157),
        L = o(B),
        A = n(160),
        P = o(A),
        T = n(165),
        E = o(T),
        R = n(171),
        z = o(R),
        I = n(174),
        V = o(I),
        W = n(179),
        F = o(W),
        Y = n(199),
        X = o(Y),
        H = n(202),
        G = o(H),
        q = n(207),
        U = o(q),
        J = n(210),
        Z = o(J),
        K = n(215),
        Q = o(K),
        ee = n(220),
        te = o(ee),
        ne = n(225),
        oe = o(ne),
        ie = { $: r["default"], accordion: s["default"], affix: c["default"], alert: d["default"], aside: f["default"], buttonGroup: v["default"], carousel: b["default"], checkbox: g["default"], datepicker: w["default"], dropdown: k["default"], formGroup: M["default"], input: $["default"], modal: j["default"], navbar: N["default"], option: L["default"], panel: P["default"], popover: E["default"], progressbar: z["default"], radio: V["default"], select: F["default"], slider: X["default"], spinner: G["default"], tab: U["default"], tabGroup: Z["default"], tabset: Q["default"], tooltip: te["default"], typeahead: oe["default"] };e.exports = ie;
  },,,,,,,,,,,,,,,,,,,,,,,,,,, function (e, t, n) {
    "use strict";
    function o(e) {
      return e && e.__esModule ? e : { "default": e };
    }function i(e, t) {
      var n = [],
          o = !0,
          i = !1,
          r = void 0;try {
        for (var a, s = (0, h["default"])(e); !(o = (a = s.next()).done); o = !0) {
          var l = a.value;if (l instanceof Node || null === l) ~n.indexOf(l) || n.push(l);else {
            if (!(l instanceof window.NodeList || l instanceof S || l instanceof HTMLCollection || l instanceof Array)) return e.get = M.get, e.set = M.set, e.call = M.call, e.owner = t, e;var c = !0,
                u = !1,
                d = void 0;try {
              for (var p, f = (0, h["default"])(l); !(c = (p = f.next()).done); c = !0) {
                var v = p.value;n.push(v);
              }
            } catch (y) {
              u = !0, d = y;
            } finally {
              try {
                !c && f["return"] && f["return"]();
              } finally {
                if (u) throw d;
              }
            }
          }
        }
      } catch (y) {
        i = !0, r = y;
      } finally {
        try {
          !o && s["return"] && s["return"]();
        } finally {
          if (i) throw r;
        }
      }return new S([n, t]);
    }function r(e) {
      var t = this,
          n = arguments;O[e] instanceof Function ? M[e] = function () {
        var o = [],
            r = !0,
            a = !0,
            s = !1,
            l = void 0;try {
          for (var c, u = (0, h["default"])(M); !(a = (c = u.next()).done); a = !0) {
            var d = c.value;d && d[e] instanceof Function ? (d = d[e].apply(d, n), o.push(d), r && void 0 !== d && (r = !1)) : o.push(void 0);
          }
        } catch (p) {
          s = !0, l = p;
        } finally {
          try {
            !a && u["return"] && u["return"]();
          } finally {
            if (s) throw l;
          }
        }return r ? t : i(o, t);
      } : (0, l["default"])(M, e, { get: function get() {
          var t = [],
              n = !0,
              o = !1,
              r = void 0;try {
            for (var a, s = (0, h["default"])(this); !(n = (a = s.next()).done); n = !0) {
              var l = a.value;null !== l && (l = l[e]), t.push(l);
            }
          } catch (c) {
            o = !0, r = c;
          } finally {
            try {
              !n && s["return"] && s["return"]();
            } finally {
              if (o) throw r;
            }
          }return i(t, this);
        }, set: function set(t) {
          var n = !0,
              o = !1,
              i = void 0;try {
            for (var r, a = (0, h["default"])(this); !(n = (r = a.next()).done); n = !0) {
              var s = r.value;s && e in s && (s[e] = t);
            }
          } catch (l) {
            o = !0, i = l;
          } finally {
            try {
              !n && a["return"] && a["return"]();
            } finally {
              if (o) throw i;
            }
          }
        } });
    }function a() {
      return new S(arguments);
    }Object.defineProperty(t, "__esModule", { value: !0 });var s = n(28),
        l = o(s),
        c = n(46),
        u = o(c),
        d = n(82),
        p = o(d),
        f = n(88),
        h = o(f),
        v = n(93),
        y = o(v),
        b = n(94),
        m = o(b),
        g = Array.prototype,
        x = new Error("Passed arguments must be of Node"),
        w = void 0,
        _ = [],
        k = [],
        S = function () {
      function e(t) {
        (0, y["default"])(this, e);var n = t;if (t[0] === window ? n = [window] : "string" == typeof t[0] ? (n = (t[1] || document).querySelectorAll(t[0]), t[1] && (this.owner = t[1])) : 0 in t && !(t[0] instanceof Node) && t[0] && "length" in t[0] && (n = t[0], t[1] && (this.owner = t[1])), n) {
          for (var o in n) {
            this[o] = n[o];
          }this.length = n.length;
        } else this.length = 0;
      }return (0, m["default"])(e, [{ key: "concat", value: function value() {
          function t(e) {
            var o = !0,
                i = !1,
                r = void 0;try {
              for (var a, s = (0, h["default"])(e); !(o = (a = s.next()).done); o = !0) {
                var l = a.value;l instanceof Node ? ~n.indexOf(l) || n.push(l) : l && t(l);
              }
            } catch (c) {
              i = !0, r = c;
            } finally {
              try {
                !o && s["return"] && s["return"]();
              } finally {
                if (i) throw r;
              }
            }
          }var n = g.slice.call(this),
              o = !0,
              i = !1,
              r = void 0;try {
            for (var a, s = (0, h["default"])(arguments); !(o = (a = s.next()).done); o = !0) {
              var l = a.value;if (l instanceof Node) ~n.indexOf(l) || n.push(l);else {
                if (!(l instanceof window.NodeList || l instanceof e || l instanceof HTMLCollection || l instanceof Array)) throw Error("Concat arguments must be of a Node, NodeList, HTMLCollection, or Array of (Node, NodeList, HTMLCollection, Array)");t(l);
              }
            }
          } catch (c) {
            i = !0, r = c;
          } finally {
            try {
              !o && s["return"] && s["return"]();
            } finally {
              if (i) throw r;
            }
          }return new e([n, this]);
        } }, { key: "each", value: function value() {
          return g.forEach.apply(this, arguments), this;
        } }, { key: "parent", value: function value() {
          return this.map(function (e) {
            return e.parentNode;
          });
        } }, { key: "filter", value: function value() {
          return new e([g.filter.apply(this, arguments), this]);
        } }, { key: "find", value: function value(e) {
          var t = [],
              n = !0,
              o = !1,
              r = void 0;try {
            for (var a, s = (0, h["default"])(i(this)); !(n = (a = s.next()).done); n = !0) {
              var l = a.value,
                  c = l.querySelectorAll(e);c && c.length && t.push(c);
            }
          } catch (u) {
            o = !0, r = u;
          } finally {
            try {
              !n && s["return"] && s["return"]();
            } finally {
              if (o) throw r;
            }
          }return i(t, this.owner);
        } }, { key: "findChildren", value: function value(e) {
          var t = this;return this.find(e).filter(function (e) {
            return t.includes(e.parentElement);
          });
        } }, { key: "forEach", value: function value() {
          return g.forEach.apply(this, arguments), this;
        } }, { key: "includes", value: function value(e, t) {
          return ~this.indexOf(e, t);
        } }, { key: "map", value: function value() {
          for (var e = arguments.length, t = Array(e), n = 0; n < e; n++) {
            t[n] = arguments[n];
          }return i(g.map.apply(this, t), this);
        } }, { key: "pop", value: function t(n) {
          "number" != typeof n && (n = 1);for (var o = [], t = g.pop.bind(this); n--;) {
            o.push(t());
          }return new e([o, this]);
        } }, { key: "push", value: function value() {
          var e = !0,
              t = !1,
              n = void 0;try {
            for (var o, i = (0, h["default"])(arguments); !(e = (o = i.next()).done); e = !0) {
              var r = o.value;if (!(r instanceof Node)) throw x;~this.indexOf(r) || g.push.call(this, r);
            }
          } catch (a) {
            t = !0, n = a;
          } finally {
            try {
              !e && i["return"] && i["return"]();
            } finally {
              if (t) throw n;
            }
          }return this;
        } }, { key: "delete", value: function value() {
          for (var t = (new e([[], this.owner]), this.length - 1), n = this[t]; n; n = this[--t]) {
            n.remove ? (n.remove(), g.splice.call(this, t, 1)) : n.parentNode && (n.parentNode.removeChild(n), g.splice.call(this, t, 1));
          }return this;
        } }, { key: "shift", value: function n(t) {
          "number" != typeof t && (t = 1);for (var o = [], n = g.shift.bind(this); t--;) {
            o.push(n());
          }return new e([o, this]);
        } }, { key: "slice", value: function value() {
          return new e([g.slice.apply(this, arguments), this]);
        } }, { key: "splice", value: function value() {
          for (var t = 2, n = arguments.length; t < n; t++) {
            if (!(arguments[t] instanceof Node)) throw x;
          }return new e([g.splice.apply(this, arguments), this]);
        } }, { key: "unshift", value: function o() {
          var o = g.unshift.bind(this),
              e = !0,
              t = !1,
              n = void 0;try {
            for (var i, r = (0, h["default"])(arguments); !(e = (i = r.next()).done); e = !0) {
              var a = i.value;if (!(a instanceof Node)) throw x;~this.indexOf(a) || o(a);
            }
          } catch (s) {
            t = !0, n = s;
          } finally {
            try {
              !e && r["return"] && r["return"]();
            } finally {
              if (t) throw n;
            }
          }return this;
        } }, { key: "addClass", value: function value(e) {
          return this.toggleClass(e, !0);
        } }, { key: "removeClass", value: function value(e) {
          return this.toggleClass(e, !1);
        } }, { key: "toggleClass", value: function value(e, t) {
          var n = this,
              o = void 0 === t || null === t ? "toggle" : t ? "add" : "remove";return "string" == typeof e && (e = e.trim().replace(/\s+/, " ").split(" ")), e.forEach(function (e) {
            return n.each(function (t) {
              return t.classList[o](e);
            });
          }), this;
        } }, { key: "get", value: function value(e) {
          var t = [],
              n = !0,
              o = !1,
              r = void 0;try {
            for (var a, s = (0, h["default"])(this); !(n = (a = s.next()).done); n = !0) {
              var l = a.value;null !== l && (l = l[e]), t.push(l);
            }
          } catch (c) {
            o = !0, r = c;
          } finally {
            try {
              !n && s["return"] && s["return"]();
            } finally {
              if (o) throw r;
            }
          }return i(t, this);
        } }, { key: "set", value: function value(e, t) {
          if (e.constructor === Object) {
            var n = !0,
                o = !1,
                i = void 0;try {
              for (var r, a = (0, h["default"])(this); !(n = (r = a.next()).done); n = !0) {
                var s = r.value;if (s) for (key in e) {
                  key in s && (s[key] = e[key]);
                }
              }
            } catch (l) {
              o = !0, i = l;
            } finally {
              try {
                !n && a["return"] && a["return"]();
              } finally {
                if (o) throw i;
              }
            }
          } else {
            var c = !0,
                u = !1,
                d = void 0;try {
              for (var p, f = (0, h["default"])(this); !(c = (p = f.next()).done); c = !0) {
                var v = p.value;e in v && (v[e] = t);
              }
            } catch (l) {
              u = !0, d = l;
            } finally {
              try {
                !c && f["return"] && f["return"]();
              } finally {
                if (u) throw d;
              }
            }
          }return this;
        } }, { key: "call", value: function value() {
          for (var e = arguments.length, t = Array(e), n = 0; n < e; n++) {
            t[n] = arguments[n];
          }var o = g.shift.call(t),
              r = [],
              a = !0,
              s = !0,
              l = !1,
              c = void 0;try {
            for (var u, d = (0, h["default"])(this); !(s = (u = d.next()).done); s = !0) {
              var p = u.value;p && p[o] instanceof Function ? (p = p[o].apply(p, t), r.push(p), a && void 0 !== p && (a = !1)) : r.push(void 0);
            }
          } catch (f) {
            l = !0, c = f;
          } finally {
            try {
              !s && d["return"] && d["return"]();
            } finally {
              if (l) throw c;
            }
          }return a ? this : i(r, this);
        } }, { key: "item", value: function value(t) {
          return new e([[this[t]], this]);
        } }, { key: "on", value: function value(t, n, o) {
          if ("string" == typeof t && (t = t.trim().replace(/\s+/, " ").split(" ")), !this || !this.length) return this;if (void 0 === o && (o = n, n = null), !o) return this;var i = o;o = n ? function (t) {
            var o = new e([n, this]);o.length && o.some(function (e) {
              var n = e.contains(t.target);return n && i.call(e, t, e), n;
            });
          } : function (e) {
            i.apply(this, [e, this]);
          };var r = !0,
              a = !1,
              s = void 0;try {
            for (var l, c = (0, h["default"])(t); !(r = (l = c.next()).done); r = !0) {
              var u = l.value,
                  d = !0,
                  p = !1,
                  f = void 0;try {
                for (var v, y = (0, h["default"])(this); !(d = (v = y.next()).done); d = !0) {
                  var b = v.value;b.addEventListener(u, o, !1), k.push({ el: b, event: u, callback: o });
                }
              } catch (m) {
                p = !0, f = m;
              } finally {
                try {
                  !d && y["return"] && y["return"]();
                } finally {
                  if (p) throw f;
                }
              }
            }
          } catch (m) {
            a = !0, s = m;
          } finally {
            try {
              !r && c["return"] && c["return"]();
            } finally {
              if (a) throw s;
            }
          }return this;
        } }, { key: "off", value: function value(e, t) {
          if (e instanceof Function && (t = e, e = null), "string" == typeof e && t instanceof Function) {
            var n = !0,
                o = !1,
                i = void 0;try {
              for (var r, a = (0, h["default"])(this); !(n = (r = a.next()).done); n = !0) {
                var s = r.value;for (var l in k) {
                  var c = !0,
                      u = !1,
                      d = void 0;try {
                    for (var p, f = (0, h["default"])(e.split(" ")); !(c = (p = f.next()).done); c = !0) {
                      var v = p.value;k[l] && k[l].el === s && k[l].event === v && k[l].callback === t && (k[l].el.removeEventListener(k[l].event, k[l].callback), delete k[l]);
                    }
                  } catch (y) {
                    u = !0, d = y;
                  } finally {
                    try {
                      !c && f["return"] && f["return"]();
                    } finally {
                      if (u) throw d;
                    }
                  }
                }
              }
            } catch (y) {
              o = !0, i = y;
            } finally {
              try {
                !n && a["return"] && a["return"]();
              } finally {
                if (o) throw i;
              }
            }
          } else if ("string" == typeof e) {
            var b = !0,
                m = !1,
                g = void 0;try {
              for (var x, w = (0, h["default"])(this); !(b = (x = w.next()).done); b = !0) {
                var _ = x.value;for (var S in k) {
                  var M = !0,
                      O = !1,
                      $ = void 0;try {
                    for (var D, j = (0, h["default"])(e.split(" ")); !(M = (D = j.next()).done); M = !0) {
                      var C = D.value;k[S] && k[S].el === _ && k[S].event === C && (k[S].el.removeEventListener(k[S].event, k[S].callback), delete k[S]);
                    }
                  } catch (y) {
                    O = !0, $ = y;
                  } finally {
                    try {
                      !M && j["return"] && j["return"]();
                    } finally {
                      if (O) throw $;
                    }
                  }
                }
              }
            } catch (y) {
              m = !0, g = y;
            } finally {
              try {
                !b && w["return"] && w["return"]();
              } finally {
                if (m) throw g;
              }
            }
          } else if (t instanceof Function) {
            var N = !0,
                B = !1,
                L = void 0;try {
              for (var A, P = (0, h["default"])(this); !(N = (A = P.next()).done); N = !0) {
                var T = A.value;for (var E in k) {
                  k[E] && k[E].el === T && k[E].callback === t && (k[E].el.removeEventListener(k[E].event, k[E].callback), delete k[E]);
                }
              }
            } catch (y) {
              B = !0, L = y;
            } finally {
              try {
                !N && P["return"] && P["return"]();
              } finally {
                if (B) throw L;
              }
            }
          } else {
            var R = !0,
                z = !1,
                I = void 0;try {
              for (var V, W = (0, h["default"])(this); !(R = (V = W.next()).done); R = !0) {
                var F = V.value;for (var Y in k) {
                  k[Y] && k[Y].el === F && (k[Y].el.removeEventListener(k[Y].event, k[Y].callback), delete k[Y]);
                }
              }
            } catch (y) {
              z = !0, I = y;
            } finally {
              try {
                !R && W["return"] && W["return"]();
              } finally {
                if (z) throw I;
              }
            }
          }return k = k.filter(function (e) {
            return void 0 !== e;
          }), this;
        } }, { key: "onBlur", value: function value(e) {
          return this && this.length && e ? (this.each(function (t) {
            _.push({ el: t, callback: e });
          }), w || (w = function w(e) {
            var t = !0,
                n = !1,
                o = void 0;try {
              for (var i, r = (0, h["default"])(_); !(t = (i = r.next()).done); t = !0) {
                var a = i.value,
                    s = a.el.contains(e.target) || a.el === e.target;s || a.callback.call(a.el, e, a.el);
              }
            } catch (l) {
              n = !0, o = l;
            } finally {
              try {
                !t && r["return"] && r["return"]();
              } finally {
                if (n) throw o;
              }
            }
          }, document.addEventListener("click", w, !1), document.addEventListener("touchstart", w, !1)), this) : this;
        } }, { key: "offBlur", value: function value(e) {
          return this.each(function (t) {
            for (var n in _) {
              !_[n] || _[n].el !== t || e && _[n].callback !== e || delete _[n];
            }
          }), _ = _.filter(function (e) {
            return void 0 !== e;
          }), this;
        } }, { key: "asArray", get: function get() {
          return g.slice.call(this);
        } }]), e;
    }(),
        M = S.prototype;(0, p["default"])(g).forEach(function (e) {
      "join" !== e && "copyWithin" !== e && "fill" !== e && void 0 === M[e] && (M[e] = g[e]);
    }), window.Symbol && u["default"] && (M[u["default"]] = M.values = g[u["default"]]);var O = document.createElement("div");for (var $ in O) {
      r($);
    }window.NL = a, t["default"] = a;
  }, function (e, t, n) {
    e.exports = { "default": n(29), __esModule: !0 };
  }, function (e, t, n) {
    n(30);var o = n(33).Object;e.exports = function (e, t, n) {
      return o.defineProperty(e, t, n);
    };
  }, function (e, t, n) {
    var o = n(31);o(o.S + o.F * !n(41), "Object", { defineProperty: n(37).f });
  }, function (e, t, n) {
    var o = n(32),
        i = n(33),
        r = n(34),
        a = n(36),
        s = "prototype",
        l = function l(e, t, n) {
      var c,
          u,
          d,
          p = e & l.F,
          f = e & l.G,
          h = e & l.S,
          v = e & l.P,
          y = e & l.B,
          b = e & l.W,
          m = f ? i : i[t] || (i[t] = {}),
          g = m[s],
          x = f ? o : h ? o[t] : (o[t] || {})[s];f && (n = t);for (c in n) {
        u = !p && x && void 0 !== x[c], u && c in m || (d = u ? x[c] : n[c], m[c] = f && "function" != typeof x[c] ? n[c] : y && u ? r(d, o) : b && x[c] == d ? function (e) {
          var t = function t(_t, n, o) {
            if (this instanceof e) {
              switch (arguments.length) {case 0:
                  return new e();case 1:
                  return new e(_t);case 2:
                  return new e(_t, n);}return new e(_t, n, o);
            }return e.apply(this, arguments);
          };return t[s] = e[s], t;
        }(d) : v && "function" == typeof d ? r(Function.call, d) : d, v && ((m.virtual || (m.virtual = {}))[c] = d, e & l.R && g && !g[c] && a(g, c, d)));
      }
    };l.F = 1, l.G = 2, l.S = 4, l.P = 8, l.B = 16, l.W = 32, l.U = 64, l.R = 128, e.exports = l;
  }, function (e, t) {
    var n = e.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")();"number" == typeof __g && (__g = n);
  }, function (e, t) {
    var n = e.exports = { version: "2.4.0" };"number" == typeof __e && (__e = n);
  }, function (e, t, n) {
    var o = n(35);e.exports = function (e, t, n) {
      if (o(e), void 0 === t) return e;switch (n) {case 1:
          return function (n) {
            return e.call(t, n);
          };case 2:
          return function (n, o) {
            return e.call(t, n, o);
          };case 3:
          return function (n, o, i) {
            return e.call(t, n, o, i);
          };}return function () {
        return e.apply(t, arguments);
      };
    };
  }, function (e, t) {
    e.exports = function (e) {
      if ("function" != typeof e) throw TypeError(e + " is not a function!");return e;
    };
  }, function (e, t, n) {
    var o = n(37),
        i = n(45);e.exports = n(41) ? function (e, t, n) {
      return o.f(e, t, i(1, n));
    } : function (e, t, n) {
      return e[t] = n, e;
    };
  }, function (e, t, n) {
    var o = n(38),
        i = n(40),
        r = n(44),
        a = Object.defineProperty;t.f = n(41) ? Object.defineProperty : function (e, t, n) {
      if (o(e), t = r(t, !0), o(n), i) try {
        return a(e, t, n);
      } catch (s) {}if ("get" in n || "set" in n) throw TypeError("Accessors not supported!");return "value" in n && (e[t] = n.value), e;
    };
  }, function (e, t, n) {
    var o = n(39);e.exports = function (e) {
      if (!o(e)) throw TypeError(e + " is not an object!");return e;
    };
  }, function (e, t) {
    e.exports = function (e) {
      return "object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) ? null !== e : "function" == typeof e;
    };
  }, function (e, t, n) {
    e.exports = !n(41) && !n(42)(function () {
      return 7 != Object.defineProperty(n(43)("div"), "a", { get: function get() {
          return 7;
        } }).a;
    });
  }, function (e, t, n) {
    e.exports = !n(42)(function () {
      return 7 != Object.defineProperty({}, "a", { get: function get() {
          return 7;
        } }).a;
    });
  }, function (e, t) {
    e.exports = function (e) {
      try {
        return !!e();
      } catch (t) {
        return !0;
      }
    };
  }, function (e, t, n) {
    var o = n(39),
        i = n(32).document,
        r = o(i) && o(i.createElement);e.exports = function (e) {
      return r ? i.createElement(e) : {};
    };
  }, function (e, t, n) {
    var o = n(39);e.exports = function (e, t) {
      if (!o(e)) return e;var n, i;if (t && "function" == typeof (n = e.toString) && !o(i = n.call(e))) return i;if ("function" == typeof (n = e.valueOf) && !o(i = n.call(e))) return i;if (!t && "function" == typeof (n = e.toString) && !o(i = n.call(e))) return i;throw TypeError("Can't convert object to primitive value");
    };
  }, function (e, t) {
    e.exports = function (e, t) {
      return { enumerable: !(1 & e), configurable: !(2 & e), writable: !(4 & e), value: t };
    };
  }, function (e, t, n) {
    e.exports = { "default": n(47), __esModule: !0 };
  }, function (e, t, n) {
    n(48), n(77), e.exports = n(81).f("iterator");
  }, function (e, t, n) {
    "use strict";
    var o = n(49)(!0);n(52)(String, "String", function (e) {
      this._t = String(e), this._i = 0;
    }, function () {
      var e,
          t = this._t,
          n = this._i;return n >= t.length ? { value: void 0, done: !0 } : (e = o(t, n), this._i += e.length, { value: e, done: !1 });
    });
  }, function (e, t, n) {
    var o = n(50),
        i = n(51);e.exports = function (e) {
      return function (t, n) {
        var r,
            a,
            s = String(i(t)),
            l = o(n),
            c = s.length;return l < 0 || l >= c ? e ? "" : void 0 : (r = s.charCodeAt(l), r < 55296 || r > 56319 || l + 1 === c || (a = s.charCodeAt(l + 1)) < 56320 || a > 57343 ? e ? s.charAt(l) : r : e ? s.slice(l, l + 2) : (r - 55296 << 10) + (a - 56320) + 65536);
      };
    };
  }, function (e, t) {
    var n = Math.ceil,
        o = Math.floor;e.exports = function (e) {
      return isNaN(e = +e) ? 0 : (e > 0 ? o : n)(e);
    };
  }, function (e, t) {
    e.exports = function (e) {
      if (void 0 == e) throw TypeError("Can't call method on  " + e);return e;
    };
  }, function (e, t, n) {
    "use strict";
    var o = n(53),
        i = n(31),
        r = n(54),
        a = n(36),
        s = n(55),
        l = n(56),
        c = n(57),
        u = n(73),
        d = n(75),
        p = n(74)("iterator"),
        f = !([].keys && "next" in [].keys()),
        h = "@@iterator",
        v = "keys",
        y = "values",
        b = function b() {
      return this;
    };e.exports = function (e, t, n, m, g, x, w) {
      c(n, t, m);var _,
          k,
          S,
          M = function M(e) {
        if (!f && e in j) return j[e];switch (e) {case v:
            return function () {
              return new n(this, e);
            };case y:
            return function () {
              return new n(this, e);
            };}return function () {
          return new n(this, e);
        };
      },
          O = t + " Iterator",
          $ = g == y,
          D = !1,
          j = e.prototype,
          C = j[p] || j[h] || g && j[g],
          N = C || M(g),
          B = g ? $ ? M("entries") : N : void 0,
          L = "Array" == t ? j.entries || C : C;if (L && (S = d(L.call(new e())), S !== Object.prototype && (u(S, O, !0), o || s(S, p) || a(S, p, b))), $ && C && C.name !== y && (D = !0, N = function N() {
        return C.call(this);
      }), o && !w || !f && !D && j[p] || a(j, p, N), l[t] = N, l[O] = b, g) if (_ = { values: $ ? N : M(y), keys: x ? N : M(v), entries: B }, w) for (k in _) {
        k in j || r(j, k, _[k]);
      } else i(i.P + i.F * (f || D), t, _);return _;
    };
  }, function (e, t) {
    e.exports = !0;
  }, function (e, t, n) {
    e.exports = n(36);
  }, function (e, t) {
    var n = {}.hasOwnProperty;e.exports = function (e, t) {
      return n.call(e, t);
    };
  }, function (e, t) {
    e.exports = {};
  }, function (e, t, n) {
    "use strict";
    var o = n(58),
        i = n(45),
        r = n(73),
        a = {};n(36)(a, n(74)("iterator"), function () {
      return this;
    }), e.exports = function (e, t, n) {
      e.prototype = o(a, { next: i(1, n) }), r(e, t + " Iterator");
    };
  }, function (e, t, n) {
    var o = n(38),
        i = n(59),
        r = n(71),
        a = n(68)("IE_PROTO"),
        s = function s() {},
        l = "prototype",
        _c = function c() {
      var e,
          t = n(43)("iframe"),
          o = r.length,
          i = "<",
          a = ">";for (t.style.display = "none", n(72).appendChild(t), t.src = "javascript:", e = t.contentWindow.document, e.open(), e.write(i + "script" + a + "document.F=Object" + i + "/script" + a), e.close(), _c = e.F; o--;) {
        delete _c[l][r[o]];
      }return _c();
    };e.exports = Object.create || function (e, t) {
      var n;return null !== e ? (s[l] = o(e), n = new s(), s[l] = null, n[a] = e) : n = _c(), void 0 === t ? n : i(n, t);
    };
  }, function (e, t, n) {
    var o = n(37),
        i = n(38),
        r = n(60);e.exports = n(41) ? Object.defineProperties : function (e, t) {
      i(e);for (var n, a = r(t), s = a.length, l = 0; s > l;) {
        o.f(e, n = a[l++], t[n]);
      }return e;
    };
  }, function (e, t, n) {
    var o = n(61),
        i = n(71);e.exports = Object.keys || function (e) {
      return o(e, i);
    };
  }, function (e, t, n) {
    var o = n(55),
        i = n(62),
        r = n(65)(!1),
        a = n(68)("IE_PROTO");e.exports = function (e, t) {
      var n,
          s = i(e),
          l = 0,
          c = [];for (n in s) {
        n != a && o(s, n) && c.push(n);
      }for (; t.length > l;) {
        o(s, n = t[l++]) && (~r(c, n) || c.push(n));
      }return c;
    };
  }, function (e, t, n) {
    var o = n(63),
        i = n(51);e.exports = function (e) {
      return o(i(e));
    };
  }, function (e, t, n) {
    var o = n(64);e.exports = Object("z").propertyIsEnumerable(0) ? Object : function (e) {
      return "String" == o(e) ? e.split("") : Object(e);
    };
  }, function (e, t) {
    var n = {}.toString;e.exports = function (e) {
      return n.call(e).slice(8, -1);
    };
  }, function (e, t, n) {
    var o = n(62),
        i = n(66),
        r = n(67);e.exports = function (e) {
      return function (t, n, a) {
        var s,
            l = o(t),
            c = i(l.length),
            u = r(a, c);if (e && n != n) {
          for (; c > u;) {
            if (s = l[u++], s != s) return !0;
          }
        } else for (; c > u; u++) {
          if ((e || u in l) && l[u] === n) return e || u || 0;
        }return !e && -1;
      };
    };
  }, function (e, t, n) {
    var o = n(50),
        i = Math.min;e.exports = function (e) {
      return e > 0 ? i(o(e), 9007199254740991) : 0;
    };
  }, function (e, t, n) {
    var o = n(50),
        i = Math.max,
        r = Math.min;e.exports = function (e, t) {
      return e = o(e), e < 0 ? i(e + t, 0) : r(e, t);
    };
  }, function (e, t, n) {
    var o = n(69)("keys"),
        i = n(70);e.exports = function (e) {
      return o[e] || (o[e] = i(e));
    };
  }, function (e, t, n) {
    var o = n(32),
        i = "__core-js_shared__",
        r = o[i] || (o[i] = {});e.exports = function (e) {
      return r[e] || (r[e] = {});
    };
  }, function (e, t) {
    var n = 0,
        o = Math.random();e.exports = function (e) {
      return "Symbol(".concat(void 0 === e ? "" : e, ")_", (++n + o).toString(36));
    };
  }, function (e, t) {
    e.exports = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",");
  }, function (e, t, n) {
    e.exports = n(32).document && document.documentElement;
  }, function (e, t, n) {
    var o = n(37).f,
        i = n(55),
        r = n(74)("toStringTag");e.exports = function (e, t, n) {
      e && !i(e = n ? e : e.prototype, r) && o(e, r, { configurable: !0, value: t });
    };
  }, function (e, t, n) {
    var o = n(69)("wks"),
        i = n(70),
        r = n(32).Symbol,
        a = "function" == typeof r,
        s = e.exports = function (e) {
      return o[e] || (o[e] = a && r[e] || (a ? r : i)("Symbol." + e));
    };s.store = o;
  }, function (e, t, n) {
    var o = n(55),
        i = n(76),
        r = n(68)("IE_PROTO"),
        a = Object.prototype;e.exports = Object.getPrototypeOf || function (e) {
      return e = i(e), o(e, r) ? e[r] : "function" == typeof e.constructor && e instanceof e.constructor ? e.constructor.prototype : e instanceof Object ? a : null;
    };
  }, function (e, t, n) {
    var o = n(51);e.exports = function (e) {
      return Object(o(e));
    };
  }, function (e, t, n) {
    n(78);for (var o = n(32), i = n(36), r = n(56), a = n(74)("toStringTag"), s = ["NodeList", "DOMTokenList", "MediaList", "StyleSheetList", "CSSRuleList"], l = 0; l < 5; l++) {
      var c = s[l],
          u = o[c],
          d = u && u.prototype;d && !d[a] && i(d, a, c), r[c] = r.Array;
    }
  }, function (e, t, n) {
    "use strict";
    var o = n(79),
        i = n(80),
        r = n(56),
        a = n(62);e.exports = n(52)(Array, "Array", function (e, t) {
      this._t = a(e), this._i = 0, this._k = t;
    }, function () {
      var e = this._t,
          t = this._k,
          n = this._i++;return !e || n >= e.length ? (this._t = void 0, i(1)) : "keys" == t ? i(0, n) : "values" == t ? i(0, e[n]) : i(0, [n, e[n]]);
    }, "values"), r.Arguments = r.Array, o("keys"), o("values"), o("entries");
  }, function (e, t) {
    e.exports = function () {};
  }, function (e, t) {
    e.exports = function (e, t) {
      return { value: t, done: !!e };
    };
  }, function (e, t, n) {
    t.f = n(74);
  }, function (e, t, n) {
    e.exports = { "default": n(83), __esModule: !0 };
  }, function (e, t, n) {
    n(84);var o = n(33).Object;e.exports = function (e) {
      return o.getOwnPropertyNames(e);
    };
  }, function (e, t, n) {
    n(85)("getOwnPropertyNames", function () {
      return n(86).f;
    });
  }, function (e, t, n) {
    var o = n(31),
        i = n(33),
        r = n(42);e.exports = function (e, t) {
      var n = (i.Object || {})[e] || Object[e],
          a = {};a[e] = t(n), o(o.S + o.F * r(function () {
        n(1);
      }), "Object", a);
    };
  }, function (e, t, n) {
    var o = n(62),
        i = n(87).f,
        r = {}.toString,
        a = "object" == (typeof window === "undefined" ? "undefined" : _typeof(window)) && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [],
        s = function s(e) {
      try {
        return i(e);
      } catch (t) {
        return a.slice();
      }
    };e.exports.f = function (e) {
      return a && "[object Window]" == r.call(e) ? s(e) : i(o(e));
    };
  }, function (e, t, n) {
    var o = n(61),
        i = n(71).concat("length", "prototype");t.f = Object.getOwnPropertyNames || function (e) {
      return o(e, i);
    };
  }, function (e, t, n) {
    e.exports = { "default": n(89), __esModule: !0 };
  }, function (e, t, n) {
    n(77), n(48), e.exports = n(90);
  }, function (e, t, n) {
    var o = n(38),
        i = n(91);e.exports = n(33).getIterator = function (e) {
      var t = i(e);if ("function" != typeof t) throw TypeError(e + " is not iterable!");return o(t.call(e));
    };
  }, function (e, t, n) {
    var o = n(92),
        i = n(74)("iterator"),
        r = n(56);e.exports = n(33).getIteratorMethod = function (e) {
      if (void 0 != e) return e[i] || e["@@iterator"] || r[o(e)];
    };
  }, function (e, t, n) {
    var o = n(64),
        i = n(74)("toStringTag"),
        r = "Arguments" == o(function () {
      return arguments;
    }()),
        a = function a(e, t) {
      try {
        return e[t];
      } catch (n) {}
    };e.exports = function (e) {
      var t, n, s;return void 0 === e ? "Undefined" : null === e ? "Null" : "string" == typeof (n = a(t = Object(e), i)) ? n : r ? o(t) : "Object" == (s = o(t)) && "function" == typeof t.callee ? "Arguments" : s;
    };
  }, function (e, t) {
    "use strict";
    t.__esModule = !0, t["default"] = function (e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
    };
  }, function (e, t, n) {
    "use strict";
    function o(e) {
      return e && e.__esModule ? e : { "default": e };
    }t.__esModule = !0;var i = n(28),
        r = o(i);t["default"] = function () {
      function e(e, t) {
        for (var n = 0; n < t.length; n++) {
          var o = t[n];o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), (0, r["default"])(e, o.key, o);
        }
      }return function (t, n, o) {
        return n && e(t.prototype, n), o && e(t, o), t;
      };
    }();
  }, function (e, t, n) {
    e.exports = n(96), e.exports.__esModule && (e.exports = e.exports["default"]), ("function" == typeof e.exports ? e.exports.options : e.exports).template = n(98);
  }, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });var o = n(97);t["default"] = { props: { type: { type: String, "default": null }, oneAtAtime: { type: Boolean, coerce: o.coerce["boolean"], "default": !1 } }, created: function created() {
        var e = this;this._isAccordion = !0, this.$on("isOpenEvent", function (t) {
          e.oneAtAtime && e.$children.forEach(function (e) {
            t !== e && (e.isOpen = !1);
          });
        });
      } };
  }, function (e, t, n) {
    "use strict";
    function o(e) {
      return e && e.__esModule ? e : { "default": e };
    }function i(e) {
      for (var t = new window.XMLHttpRequest(), n = {}, o = { then: function then(e, t) {
          return o.done(e).fail(t);
        }, "catch": function _catch(e) {
          return o.fail(e);
        }, always: function always(e) {
          return o.done(e).fail(e);
        } }, i = ["done", "fail"], r = function r() {
        var e = i[a];n[e] = [], o[e] = function (t) {
          return t instanceof Function && n[e].push(t), o;
        };
      }, a = 0; a < i.length; a++) {
        r();
      }return o.done(JSON.parse), t.onreadystatechange = function () {
        if (4 === t.readyState) {
          var e = { status: t.status };if (200 === t.status) try {
            var o = void 0,
                i = t.responseText,
                r = !0,
                a = !1,
                s = void 0;try {
              for (var c, u = (0, l["default"])(n.done); !(r = (c = u.next()).done); r = !0) {
                var d = c.value;void 0 !== (o = d(i)) && (i = o);
              }
            } catch (p) {
              a = !0, s = p;
            } finally {
              try {
                !r && u["return"] && u["return"]();
              } finally {
                if (a) throw s;
              }
            }
          } catch (e) {
            var f = !0,
                h = !1,
                v = void 0;try {
              for (var y, b = (0, l["default"])(n.fail); !(f = (y = b.next()).done); f = !0) {
                var m = y.value;m(e);
              }
            } catch (p) {
              h = !0, v = p;
            } finally {
              try {
                !f && b["return"] && b["return"]();
              } finally {
                if (h) throw v;
              }
            }
          } else {
            var g = !0,
                x = !1,
                w = void 0;try {
              for (var _, k = (0, l["default"])(n.fail); !(g = (_ = k.next()).done); g = !0) {
                var S = _.value;S(e);
              }
            } catch (p) {
              x = !0, w = p;
            } finally {
              try {
                !g && k["return"] && k["return"]();
              } finally {
                if (x) throw w;
              }
            }
          }
        }
      }, t.open("GET", e), t.setRequestHeader("Accept", "application/json"), t.send(), o;
    }function r() {
      if (document.documentElement.scrollHeight <= document.documentElement.clientHeight) return 0;var e = document.createElement("p");e.style.width = "100%", e.style.height = "200px";var t = document.createElement("div");t.style.position = "absolute", t.style.top = "0px", t.style.left = "0px", t.style.visibility = "hidden", t.style.width = "200px", t.style.height = "150px", t.style.overflow = "hidden", t.appendChild(e), document.body.appendChild(t);var n = e.offsetWidth;t.style.overflow = "scroll";var o = e.offsetWidth;return n === o && (o = t.clientWidth), document.body.removeChild(t), n - o;
    }function a(e) {
      e = e || "en";var t = { daysOfWeek: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"], limit: "Limit reached ({{limit}} items max).", loading: "Loading...", minLength: "Min. Length", months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], notSelected: "Nothing Selected", required: "Required", search: "Search" };return window.VueStrapLang ? window.VueStrapLang(e) : t;
    }Object.defineProperty(t, "__esModule", { value: !0 }), t.coerce = void 0;var s = n(88),
        l = o(s);t.getJSON = i, t.getScrollBarWidth = r, t.translations = a;t.coerce = { "boolean": function boolean(e) {
        return "string" != typeof e ? e : "true" === e || "false" !== e && "null" !== e && "undefined" !== e && e;
      }, number: function number(e) {
        var t = arguments.length <= 1 || void 0 === arguments[1] ? null : arguments[1];return "number" == typeof e ? e : void 0 === e || null === e || isNaN(Number(e)) ? t : Number(e);
      } };
  }, function (e, t) {
    e.exports = "<div class=panel-group> <slot></slot> </div>";
  }, function (e, t, n) {
    e.exports = n(100), e.exports.__esModule && (e.exports = e.exports["default"]), ("function" == typeof e.exports ? e.exports.options : e.exports).template = n(101);
  }, function (e, t, n) {
    "use strict";
    function o(e) {
      return e && e.__esModule ? e : { "default": e };
    }Object.defineProperty(t, "__esModule", { value: !0 });var i = n(97),
        r = n(27),
        a = o(r);t["default"] = { props: { offset: { type: Number, coerce: i.coerce.number, "default": 0 } }, data: function data() {
        return { affixed: !1 };
      }, computed: { top: function top() {
          return this.offset > 0 ? this.offset + "px" : null;
        } }, methods: { checkScroll: function checkScroll() {
          if (this.$el.offsetWidth || this.$el.offsetHeight || this.$el.getClientRects().length) {
            for (var e = {}, t = {}, n = this.$el.getBoundingClientRect(), o = document.body, i = ["Top", "Left"], r = 0; r < i.length; r++) {
              var a = i[r],
                  s = a.toLowerCase(),
                  l = window["page" + ("Top" === a ? "Y" : "X") + "Offset"],
                  c = "scroll" + a;"number" != typeof l && (l = document.documentElement[c], "number" != typeof l && (l = document.body[c])), e[s] = l, t[s] = e[s] + n[s] - (this.$el["client" + a] || o["client" + a] || 0);
            }var u = e.top > t.top - this.offset;this.affixed !== u && (this.affixed = u);
          }
        } }, ready: function ready() {
        var e = this;this.checkScroll(), (0, a["default"])(window).on("scroll resize", function () {
          return e.checkScroll();
        });
      }, beforeDestroy: function beforeDestroy() {
        var e = this;(0, a["default"])(window).off("scroll resize", function () {
          return e.checkScroll();
        });
      } };
  }, function (e, t) {
    e.exports = '<div class="hidden-print hidden-xs hidden-sm"> <nav class=bs-docs-sidebar :class={affix:affixed} :style={marginTop:top}> <slot></slot> </nav> </div>';
  }, function (e, t, n) {
    n(103), e.exports = n(107), e.exports.__esModule && (e.exports = e.exports["default"]), ("function" == typeof e.exports ? e.exports.options : e.exports).template = n(108);
  }, function (e, t, n) {
    var o = n(104);"string" == typeof o && (o = [[e.id, o, ""]]);n(106)(o, {});o.locals && (e.exports = o.locals);
  }, function (e, t, n) {
    t = e.exports = n(105)(), t.push([e.id, ".fade-transition{-webkit-transition:opacity .3s ease;transition:opacity .3s ease}.fade-enter,.fade-leave{height:0;opacity:0}.alert.top{margin:0 auto;left:0;right:0}.alert.top,.alert.top-right{position:fixed;top:30px;z-index:1050}.alert.top-right{right:50px}", ""]);
  }, function (e, t) {
    e.exports = function () {
      var e = [];return e.toString = function () {
        for (var e = [], t = 0; t < this.length; t++) {
          var n = this[t];n[2] ? e.push("@media " + n[2] + "{" + n[1] + "}") : e.push(n[1]);
        }return e.join("");
      }, e.i = function (t, n) {
        "string" == typeof t && (t = [[null, t, ""]]);for (var o = {}, i = 0; i < this.length; i++) {
          var r = this[i][0];"number" == typeof r && (o[r] = !0);
        }for (i = 0; i < t.length; i++) {
          var a = t[i];"number" == typeof a[0] && o[a[0]] || (n && !a[2] ? a[2] = n : n && (a[2] = "(" + a[2] + ") and (" + n + ")"), e.push(a));
        }
      }, e;
    };
  }, function (e, t, n) {
    function o(e, t) {
      for (var n = 0; n < e.length; n++) {
        var o = e[n],
            i = f[o.id];if (i) {
          i.refs++;for (var r = 0; r < i.parts.length; r++) {
            i.parts[r](o.parts[r]);
          }for (; r < o.parts.length; r++) {
            i.parts.push(c(o.parts[r], t));
          }
        } else {
          for (var a = [], r = 0; r < o.parts.length; r++) {
            a.push(c(o.parts[r], t));
          }f[o.id] = { id: o.id, refs: 1, parts: a };
        }
      }
    }function i(e) {
      for (var t = [], n = {}, o = 0; o < e.length; o++) {
        var i = e[o],
            r = i[0],
            a = i[1],
            s = i[2],
            l = i[3],
            c = { css: a, media: s, sourceMap: l };n[r] ? n[r].parts.push(c) : t.push(n[r] = { id: r, parts: [c] });
      }return t;
    }function r(e, t) {
      var n = y(),
          o = g[g.length - 1];if ("top" === e.insertAt) o ? o.nextSibling ? n.insertBefore(t, o.nextSibling) : n.appendChild(t) : n.insertBefore(t, n.firstChild), g.push(t);else {
        if ("bottom" !== e.insertAt) throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");n.appendChild(t);
      }
    }function a(e) {
      e.parentNode.removeChild(e);var t = g.indexOf(e);t >= 0 && g.splice(t, 1);
    }function s(e) {
      var t = document.createElement("style");return t.type = "text/css", r(e, t), t;
    }function l(e) {
      var t = document.createElement("link");return t.rel = "stylesheet", r(e, t), t;
    }function c(e, t) {
      var n, o, i;if (t.singleton) {
        var r = m++;n = b || (b = s(t)), o = u.bind(null, n, r, !1), i = u.bind(null, n, r, !0);
      } else e.sourceMap && "function" == typeof URL && "function" == typeof URL.createObjectURL && "function" == typeof URL.revokeObjectURL && "function" == typeof Blob && "function" == typeof btoa ? (n = l(t), o = p.bind(null, n), i = function i() {
        a(n), n.href && URL.revokeObjectURL(n.href);
      }) : (n = s(t), o = d.bind(null, n), i = function i() {
        a(n);
      });return o(e), function (t) {
        if (t) {
          if (t.css === e.css && t.media === e.media && t.sourceMap === e.sourceMap) return;o(e = t);
        } else i();
      };
    }function u(e, t, n, o) {
      var i = n ? "" : o.css;if (e.styleSheet) e.styleSheet.cssText = x(t, i);else {
        var r = document.createTextNode(i),
            a = e.childNodes;a[t] && e.removeChild(a[t]), a.length ? e.insertBefore(r, a[t]) : e.appendChild(r);
      }
    }function d(e, t) {
      var n = t.css,
          o = t.media;if (o && e.setAttribute("media", o), e.styleSheet) e.styleSheet.cssText = n;else {
        for (; e.firstChild;) {
          e.removeChild(e.firstChild);
        }e.appendChild(document.createTextNode(n));
      }
    }function p(e, t) {
      var n = t.css,
          o = t.sourceMap;o && (n += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(o)))) + " */");var i = new Blob([n], { type: "text/css" }),
          r = e.href;e.href = URL.createObjectURL(i), r && URL.revokeObjectURL(r);
    }var f = {},
        h = function h(e) {
      var t;return function () {
        return "undefined" == typeof t && (t = e.apply(this, arguments)), t;
      };
    },
        v = h(function () {
      return (/msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase())
      );
    }),
        y = h(function () {
      return document.head || document.getElementsByTagName("head")[0];
    }),
        b = null,
        m = 0,
        g = [];e.exports = function (e, t) {
      t = t || {}, "undefined" == typeof t.singleton && (t.singleton = v()), "undefined" == typeof t.insertAt && (t.insertAt = "bottom");var n = i(e);return o(n, t), function (e) {
        for (var r = [], a = 0; a < n.length; a++) {
          var s = n[a],
              l = f[s.id];l.refs--, r.push(l);
        }if (e) {
          var c = i(e);o(c, t);
        }for (var a = 0; a < r.length; a++) {
          var l = r[a];if (0 === l.refs) {
            for (var u = 0; u < l.parts.length; u++) {
              l.parts[u]();
            }delete f[l.id];
          }
        }
      };
    };var x = function () {
      var e = [];return function (t, n) {
        return e[t] = n, e.filter(Boolean).join("\n");
      };
    }();
  }, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });var o = n(97);t["default"] = { props: { type: { type: String }, dismissable: { type: Boolean, coerce: o.coerce["boolean"], "default": !1 }, show: { type: Boolean, coerce: o.coerce["boolean"], "default": !0, twoWay: !0 }, duration: { type: Number, coerce: o.coerce.number, "default": 0 }, width: { type: String }, placement: { type: String } }, watch: { show: function show(e) {
          var t = this;this._timeout && clearTimeout(this._timeout), e && Boolean(this.duration) && (this._timeout = setTimeout(function () {
            t.show = !1;
          }, this.duration));
        } } };
  }, function (e, t) {
    e.exports = "<div v-show=show v-bind:class=\"{\r\n      'alert':\t\ttrue,\r\n      'alert-success':(type == 'success'),\r\n      'alert-warning':(type == 'warning'),\r\n      'alert-info':\t(type == 'info'),\r\n      'alert-danger':\t(type == 'danger'),\r\n      'top': \t\t\t(placement === 'top'),\r\n      'top-right': \t(placement === 'top-right')\r\n    }\" transition=fade v-bind:style={width:width} role=alert> <button v-show=dismissable type=button class=close @click=\"show = false\"> <span>&times;</span> </button> <slot></slot> </div>";
  }, function (e, t, n) {
    n(110), e.exports = n(112), e.exports.__esModule && (e.exports = e.exports["default"]), ("function" == typeof e.exports ? e.exports.options : e.exports).template = n(113);
  }, function (e, t, n) {
    var o = n(111);"string" == typeof o && (o = [[e.id, o, ""]]);n(106)(o, {});o.locals && (e.exports = o.locals);
  }, function (e, t, n) {
    t = e.exports = n(105)(), t.push([e.id, ".aside-open{-webkit-transition:-webkit-transform .3s;transition:-webkit-transform .3s;transition:transform .3s;transition:transform .3s,-webkit-transform .3s}.aside-open.has-push-right{-webkit-transform:translateX(-300px);transform:translateX(-300px)}.aside{position:fixed;top:0;bottom:0;z-index:1049;overflow:auto;background:#fff}.aside.left{left:0;right:auto}.aside.right{left:auto;right:0}.slideleft-enter{-webkit-animation:slideleft-in .3s;animation:slideleft-in .3s}.slideleft-leave{-webkit-animation:slideleft-out .3s;animation:slideleft-out .3s}@-webkit-keyframes slideleft-in{0%{-webkit-transform:translateX(-100%);transform:translateX(-100%);opacity:0}to{-webkit-transform:translateX(0);transform:translateX(0);opacity:1}}@keyframes slideleft-in{0%{-webkit-transform:translateX(-100%);transform:translateX(-100%);opacity:0}to{-webkit-transform:translateX(0);transform:translateX(0);opacity:1}}@-webkit-keyframes slideleft-out{0%{-webkit-transform:translateX(0);transform:translateX(0);opacity:1}to{-webkit-transform:translateX(-100%);transform:translateX(-100%);opacity:0}}@keyframes slideleft-out{0%{-webkit-transform:translateX(0);transform:translateX(0);opacity:1}to{-webkit-transform:translateX(-100%);transform:translateX(-100%);opacity:0}}.slideright-enter{-webkit-animation:slideright-in .3s;animation:slideright-in .3s}.slideright-leave{-webkit-animation:slideright-out .3s;animation:slideright-out .3s}@-webkit-keyframes slideright-in{0%{-webkit-transform:translateX(100%);transform:translateX(100%);opacity:0}to{-webkit-transform:translateX(0);transform:translateX(0);opacity:1}}@keyframes slideright-in{0%{-webkit-transform:translateX(100%);transform:translateX(100%);opacity:0}to{-webkit-transform:translateX(0);transform:translateX(0);opacity:1}}@-webkit-keyframes slideright-out{0%{-webkit-transform:translateX(0);transform:translateX(0);opacity:1}to{-webkit-transform:translateX(100%);transform:translateX(100%);opacity:0}}@keyframes slideright-out{0%{-webkit-transform:translateX(0);transform:translateX(0);opacity:1}to{-webkit-transform:translateX(100%);transform:translateX(100%);opacity:0}}.aside:focus{outline:0}@media (max-width:991px){.aside{min-width:240px}}.aside.left{right:auto;left:0}.aside.right{right:0;left:auto}.aside .aside-dialog .aside-header{border-bottom:1px solid #e5e5e5;min-height:16.43px;padding:6px 15px;background:#337ab7;color:#fff}.aside .aside-dialog .aside-header .close{margin-right:-8px;padding:4px 8px;color:#fff;font-size:25px;opacity:.8}.aside .aside-dialog .aside-body{position:relative;padding:15px}.aside .aside-dialog .aside-footer{padding:15px;text-align:right;border-top:1px solid #e5e5e5}.aside .aside-dialog .aside-footer .btn+.btn{margin-left:5px;margin-bottom:0}.aside .aside-dialog .aside-footer .btn-group .btn+.btn{margin-left:-1px}.aside .aside-dialog .aside-footer .btn-block+.btn-block{margin-left:0}.aside-backdrop{position:fixed;top:0;right:0;bottom:0;left:0;z-index:1040;opacity:0;-webkit-transition:opacity .3s ease;transition:opacity .3s ease;background-color:#000}.aside-backdrop.in{opacity:.5;filter:alpha(opacity=50)}", ""]);
  }, function (e, t, n) {
    "use strict";
    function o(e) {
      return e && e.__esModule ? e : { "default": e };
    }Object.defineProperty(t, "__esModule", { value: !0 });var i = n(97),
        r = n(27),
        a = o(r);t["default"] = { props: { show: { type: Boolean, coerce: i.coerce["boolean"], required: !0, twoWay: !0 }, placement: { type: String, "default": "right" }, header: { type: String }, width: { type: Number, coerce: i.coerce.number, "default": 320 } }, watch: { show: function show(e) {
          var t = this,
              n = document.body,
              o = (0, i.getScrollBarWidth)();if (e) {
            this._backdrop || (this._backdrop = document.createElement("div")), this._backdrop.className = "aside-backdrop", n.appendChild(this._backdrop), n.classList.add("modal-open"), 0 !== o && (n.style.paddingRight = o + "px");this._backdrop.clientHeight;this._backdrop.classList.add("in"), (0, a["default"])(this._backdrop).on("click", function () {
              return t.close();
            });
          } else (0, a["default"])(this._backdrop).on("transitionend", function () {
            (0, a["default"])(t._backdrop).off();try {
              n.classList.remove("modal-open"), n.style.paddingRight = "0", n.removeChild(t._backdrop), t._backdrop = null;
            } catch (e) {}
          }), this._backdrop.className = "aside-backdrop";
        } }, methods: { close: function close() {
          this.show = !1;
        } } };
  }, function (e, t) {
    e.exports = "<div class=aside v-bind:style=\"{width:width + 'px'}\" v-bind:class=\"{\r\n    left:placement === 'left',\r\n    right:placement === 'right'\r\n    }\" v-show=show :transition=\"(this.placement === 'left') ? 'slideleft' : 'slideright'\"> <div class=aside-dialog> <div class=aside-content> <div class=aside-header> <button type=button class=close @click=close><span>&times;</span></button> <h4 class=aside-title> <slot name=header> {{ header }} </slot> </h4> </div> <div class=aside-body> <slot></slot> </div> </div> </div> </div>";
  }, function (e, t, n) {
    e.exports = n(115), e.exports.__esModule && (e.exports = e.exports["default"]), ("function" == typeof e.exports ? e.exports.options : e.exports).template = n(116);
  }, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });var o = n(97);t["default"] = { props: { value: null, buttons: { type: Boolean, coerce: o.coerce["boolean"], "default": !0 }, type: { type: String, "default": "default" } }, watch: { value: { deep: !0, handler: function handler(e) {
            this.$children.forEach(function (e) {
              e.group && e.eval && e.eval();
            });
          } } }, created: function created() {
        this._btnGroup = !0;
      } };
  }, function (e, t) {
    e.exports = "<div :class=\"{'btn-group':buttons}\" :data-toggle=\"buttons&&'buttons'\"> <slot></slot> </div>";
  }, function (e, t, n) {
    n(118), e.exports = n(120), e.exports.__esModule && (e.exports = e.exports["default"]), ("function" == typeof e.exports ? e.exports.options : e.exports).template = n(121);
  }, function (e, t, n) {
    var o = n(119);"string" == typeof o && (o = [[e.id, o, ""]]);n(106)(o, {});o.locals && (e.exports = o.locals);
  }, function (e, t, n) {
    t = e.exports = n(105)(), t.push([e.id, ".carousel-control[_v-322dee41]{cursor:pointer}", ""]);
  }, function (e, t, n) {
    "use strict";
    function o(e) {
      return e && e.__esModule ? e : { "default": e };
    }Object.defineProperty(t, "__esModule", { value: !0 });var i = n(97),
        r = n(27),
        a = o(r);t["default"] = { props: { indicators: { type: Boolean, coerce: i.coerce["boolean"], "default": !0 }, controls: { type: Boolean, coerce: i.coerce["boolean"], "default": !0 }, interval: { type: Number, coerce: i.coerce.number, "default": 5e3 } }, data: function data() {
        return { indicator: [], index: 0, isAnimating: !1 };
      }, watch: { index: function index(e, t) {
          this.slide(e > t ? "left" : "right", e, t);
        } }, methods: { indicatorClick: function indicatorClick(e) {
          return !this.isAnimating && this.index !== e && (this.isAnimating = !0, void (this.index = e));
        }, slide: function slide(e, t, n) {
          var o = this;if (this.$el) {
            var i = (0, a["default"])(".item", this.$el);if (i.length) {
              var r = i[t] || i[0];(0, a["default"])(r).addClass("left" === e ? "next" : "prev");r.clientHeight;(0, a["default"])([i[n], r]).addClass(e).on("transitionend", function () {
                i.off("transitionend").className = "item", (0, a["default"])(r).addClass("active"), o.isAnimating = !1;
              });
            }
          }
        }, next: function next() {
          return !(!this.$el || this.isAnimating) && (this.isAnimating = !0, void (this.index + 1 < (0, a["default"])(".item", this.$el).length ? this.index += 1 : this.index = 0));
        }, prev: function prev() {
          return !(!this.$el || this.isAnimating) && (this.isAnimating = !0, void (0 === this.index ? this.index = (0, a["default"])(".item", this.$el).length - 1 : this.index -= 1));
        }, toggleInterval: function toggleInterval(e) {
          void 0 === e && (e = this._intervalID), this._intervalID && (clearInterval(this._intervalID), delete this._intervalID), e && this.interval > 0 && (this._intervalID = setInterval(this.next, this.interval));
        } }, ready: function ready() {
        var e = this;this.toggleInterval(!0), (0, a["default"])(this.$el).on("mouseenter", function () {
          return e.toggleInterval(!1);
        }).on("mouseleave", function () {
          return e.toggleInterval(!0);
        });
      }, beforeDestroy: function beforeDestroy() {
        this.toggleInterval(!1), (0, a["default"])(this.$el).off("mouseenter mouseleave");
      } };
  }, function (e, t) {
    e.exports = '<div class="carousel slide" data-ride=carousel _v-322dee41=""> <ol class=carousel-indicators v-show=indicators _v-322dee41=""> <li v-for="i in indicator" @click=indicatorClick($index) v-bind:class="{active:$index === index}" _v-322dee41=""><span _v-322dee41=""></span></li> </ol> <div class=carousel-inner role=listbox _v-322dee41=""> <slot _v-322dee41=""></slot> </div> <div v-show=controls class="carousel-controls hidden-xs" _v-322dee41=""> <a class="left carousel-control" role=button @click=prev _v-322dee41=""> <span class="glyphicon glyphicon-chevron-left" aria-hidden=true _v-322dee41=""></span> </a> <a class="right carousel-control" role=button @click=next _v-322dee41=""> <span class="glyphicon glyphicon-chevron-right" aria-hidden=true _v-322dee41=""></span> </a> </div> </div>';
  }, function (e, t, n) {
    n(123), e.exports = n(125), e.exports.__esModule && (e.exports = e.exports["default"]), ("function" == typeof e.exports ? e.exports.options : e.exports).template = n(126);
  }, function (e, t, n) {
    var o = n(124);"string" == typeof o && (o = [[e.id, o, ""]]);n(106)(o, {});o.locals && (e.exports = o.locals);
  }, function (e, t, n) {
    t = e.exports = n(105)(), t.push([e.id, ".checkbox[_v-6922bf24]{position:relative}.checkbox>label>input[_v-6922bf24]{box-sizing:border-box;position:absolute;z-index:-1;padding:0;opacity:0;margin:0}.checkbox>label>.icon[_v-6922bf24]{position:absolute;top:.2rem;left:0;display:block;width:1.4rem;height:1.4rem;line-height:1rem;text-align:center;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;border-radius:.35rem;background-repeat:no-repeat;background-position:50%;background-size:50% 50%}.checkbox:not(.active)>label>.icon[_v-6922bf24]{background-color:#ddd;border:1px solid #bbb}.checkbox>label>input:focus~.icon[_v-6922bf24]{outline:0;border:1px solid #66afe9;box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6)}.checkbox.active>label>.icon[_v-6922bf24]{background-size:1rem 1rem;background-image:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iNyIgaGVpZ2h0PSI3Ij48cGF0aCBmaWxsPSIjZmZmIiBkPSJtNS43MywwLjUybC0zLjEyNDIyLDMuMzQxNjFsLTEuMzM4OTUsLTEuNDMyMTJsLTEuMjQ5NjksMS4zMzY2NWwyLjU4ODYzLDIuNzY4NzZsNC4zNzM5LC00LjY3ODI2bC0xLjI0OTY5LC0xLjMzNjY1bDAsMGwwLjAwMDAyLDAuMDAwMDF6Ii8+PC9zdmc+)}.checkbox.active .btn-default[_v-6922bf24]{-webkit-filter:brightness(75%);filter:brightness(75%)}.btn.readonly[_v-6922bf24],.checkbox.disabled>label>.icon[_v-6922bf24],.checkbox.readonly>label>.icon[_v-6922bf24]{filter:alpha(opacity=65);box-shadow:none;opacity:.65}label.btn>input[type=checkbox][_v-6922bf24]{position:absolute;clip:rect(0,0,0,0);pointer-events:none}", ""]);
  }, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });var o = n(97);t["default"] = { props: { value: { "default": !0 }, checked: { twoWay: !0 }, button: { type: Boolean, coerce: o.coerce["boolean"], "default": !1 }, disabled: { type: Boolean, coerce: o.coerce["boolean"], "default": !1 }, name: { type: String, "default": null }, readonly: { type: Boolean, coerce: o.coerce["boolean"], "default": !1 }, type: { type: String, "default": null } }, computed: { active: function active() {
          return "boolean" != typeof this.value && this.group ? ~this.$parent.value.indexOf(this.value) : this.checked === this.value;
        }, buttonStyle: function buttonStyle() {
          return this.button || this.group && this.$parent.buttons;
        }, group: function group() {
          return this.$parent && this.$parent._checkboxGroup;
        }, typeColor: function typeColor() {
          return this.type || this.$parent && this.$parent.type || "default";
        } }, watch: { checked: function checked(e) {
          "boolean" != typeof this.value && this.group && (this.checked && !~this.$parent.value.indexOf(this.value) && this.$parent.value.push(this.value), !this.checked && ~this.$parent.value.indexOf(this.value) && this.$parent.value.$remove(this.value));
        } }, created: function created() {
        if ("boolean" != typeof this.value) {
          var e = this.$parent;e && e._btnGroup && !e._radioGroup && (e._checkboxGroup = !0, e.value instanceof Array || (e.value = []));
        }
      }, ready: function ready() {
        this.$parent._checkboxGroup && "boolean" != typeof this.value && (this.$parent.value.length ? this.checked = ~this.$parent.value.indexOf(this.value) : this.checked && this.$parent.value.push(this.value));
      }, methods: { eval: function _eval() {
          "boolean" != typeof this.value && this.group && (this.checked = ~this.$parent.value.indexOf(this.value));
        }, focus: function focus() {
          this.$els.input.focus();
        }, toggle: function toggle() {
          if (!this.disabled && (this.focus(), !this.readonly && (this.checked = this.checked ? null : this.value, this.group && "boolean" != typeof this.value))) {
            var e = this.$parent.value.indexOf(this.value);this.$parent.value[~e ? "$remove" : "push"](this.value);
          }return !1;
        } } };
  }, function (e, t) {
    e.exports = '<label v-if=buttonStyle :class="[\'btn btn-\'+typeColor,{active:checked,disabled:disabled,readonly:readonly}]" @click.prevent=toggle _v-6922bf24=""> <input type=checkbox autocomplete=off v-el:input="" v-show=!readonly :checked=active :value=value :name=name :readonly=readonly :disabled=disabled _v-6922bf24=""> <slot _v-6922bf24=""></slot> </label> <div v-else="" :class="[\'checkbox\',typeColor,{active:checked,disabled:disabled,readonly:readonly}]" @click.prevent=toggle _v-6922bf24=""> <label class=open _v-6922bf24=""> <input type=checkbox autocomplete=off v-el:input="" :checked=active :value=value :name=name :readonly=readonly :disabled=disabled _v-6922bf24=""> <span class="icon dropdown-toggle" :class="[active?\'btn-\'+typeColor:\'\',{bg:typeColor===\'default\'}]" _v-6922bf24=""></span> <span v-if="active&amp;&amp;typeColor===\'default\'" class=icon _v-6922bf24=""></span> <slot _v-6922bf24=""></slot> </label> </div>';
  }, function (e, t, n) {
    n(128), e.exports = n(130), e.exports.__esModule && (e.exports = e.exports["default"]), ("function" == typeof e.exports ? e.exports.options : e.exports).template = n(131);
  }, function (e, t, n) {
    var o = n(129);"string" == typeof o && (o = [[e.id, o, ""]]);n(106)(o, {});o.locals && (e.exports = o.locals);
  }, function (e, t, n) {
    t = e.exports = n(105)(), t.push([e.id, ".datepicker{position:relative;display:inline-block}input.datepicker-input.with-reset-button{padding-right:25px}.datepicker>button.close{position:absolute;top:0;right:0;outline:none;z-index:2;display:block;width:34px;height:34px;line-height:34px;text-align:center}.datepicker>button.close:focus{opacity:.2}.datepicker-popup{position:absolute;border:1px solid #ccc;border-radius:5px;background:#fff;margin-top:2px;z-index:1000;box-shadow:0 6px 12px rgba(0,0,0,.175)}.datepicker-inner{width:218px}.datepicker-body{padding:10px}.datepicker-body span,.datepicker-ctrl p,.datepicker-ctrl span{display:inline-block;width:28px;line-height:28px;height:28px;border-radius:4px}.datepicker-ctrl p{width:65%}.datepicker-ctrl span{position:absolute}.datepicker-body span{text-align:center}.datepicker-monthRange span{width:48px;height:50px;line-height:45px}.datepicker-item-disable{background-color:#fff!important;cursor:not-allowed!important}.datepicker-item-disable,.datepicker-item-gray,.decadeRange span:first-child,.decadeRange span:last-child{color:#999}.datepicker-dateRange-item-active,.datepicker-dateRange-item-active:hover{background:#3276b1!important;color:#fff!important}.datepicker-monthRange{margin-top:10px}.datepicker-ctrl p,.datepicker-ctrl span,.datepicker-dateRange span,.datepicker-monthRange span{cursor:pointer}.datepicker-ctrl i:hover,.datepicker-ctrl p:hover,.datepicker-dateRange-item-hover,.datepicker-dateRange span:hover,.datepicker-monthRange span:hover{background-color:#eee}.datepicker-weekRange span{font-weight:700}.datepicker-label{background-color:#f8f8f8;font-weight:700;padding:7px 0;text-align:center}.datepicker-ctrl{position:relative;height:30px;line-height:30px;font-weight:700;text-align:center}.month-btn{font-weight:700;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.datepicker-preBtn{left:2px}.datepicker-nextBtn{right:2px}", ""]);
  }, function (e, t, n) {
    "use strict";
    function o(e) {
      return e && e.__esModule ? e : { "default": e };
    }Object.defineProperty(t, "__esModule", { value: !0 });var i = n(97),
        r = n(27),
        a = o(r);t["default"] = { props: { value: { type: String, twoWay: !0 }, format: { "default": "MM/dd/yyyy" }, disabledDaysOfWeek: { type: Array, "default": function _default() {
            return [];
          } }, width: { type: String, "default": "200px" }, clearButton: { type: Boolean, "default": !1 }, lang: { type: String, "default": navigator.language }, placeholder: { type: String } }, ready: function ready() {
        var e = this;this._blur = function (t) {
          e.$el.contains(t.target) || e.close();
        }, this.$dispatch("child-created", this), this.currDate = this.parse(this.value) || this.parse(new Date()), (0, a["default"])(window).on("click", this._blur);
      }, beforeDestroy: function beforeDestroy() {
        (0, a["default"])(window).off("click", this._blur);
      }, data: function data() {
        return { currDate: new Date(), dateRange: [], decadeRange: [], displayDayView: !1, displayMonthView: !1, displayYearView: !1 };
      }, watch: { currDate: function currDate() {
          this.getDateRange();
        } }, computed: { text: function text() {
          return (0, i.translations)(this.lang);
        } }, methods: { close: function close() {
          this.displayDayView = this.displayMonthView = this.displayYearView = !1;
        }, inputClick: function inputClick() {
          this.currDate = this.parse(this.value) || this.parse(new Date()), this.displayMonthView || this.displayYearView ? this.displayDayView = !1 : this.displayDayView = !this.displayDayView;
        }, preNextDecadeClick: function preNextDecadeClick(e) {
          var t = this.currDate.getFullYear(),
              n = this.currDate.getMonth(),
              o = this.currDate.getDate();0 === e ? this.currDate = new Date(t - 10, n, o) : this.currDate = new Date(t + 10, n, o);
        }, preNextMonthClick: function preNextMonthClick(e) {
          var t = this.currDate.getFullYear(),
              n = this.currDate.getMonth(),
              o = this.currDate.getDate();if (0 === e) {
            var i = this.getYearMonth(t, n - 1);this.currDate = new Date(i.year, i.month, o);
          } else {
            var r = this.getYearMonth(t, n + 1);this.currDate = new Date(r.year, r.month, o);
          }
        }, preNextYearClick: function preNextYearClick(e) {
          var t = this.currDate.getFullYear(),
              n = this.currDate.getMonth(),
              o = this.currDate.getDate();0 === e ? this.currDate = new Date(t - 1, n, o) : this.currDate = new Date(t + 1, n, o);
        }, yearSelect: function yearSelect(e) {
          this.displayYearView = !1, this.displayMonthView = !0, this.currDate = new Date(e, this.currDate.getMonth(), this.currDate.getDate());
        }, daySelect: function daySelect(e, t) {
          return "datepicker-item-disable" !== t.$el.classList[0] && (this.currDate = e, this.value = this.stringify(this.currDate), this.displayDayView = !1, void 0);
        }, switchMonthView: function switchMonthView() {
          this.displayDayView = !1, this.displayMonthView = !0;
        }, switchDecadeView: function switchDecadeView() {
          this.displayMonthView = !1, this.displayYearView = !0;
        }, monthSelect: function monthSelect(e) {
          this.displayMonthView = !1, this.displayDayView = !0, this.currDate = new Date(this.currDate.getFullYear(), e, this.currDate.getDate());
        }, getYearMonth: function getYearMonth(e, t) {
          return t > 11 ? (e++, t = 0) : t < 0 && (e--, t = 11), { year: e, month: t };
        }, stringifyDecadeHeader: function stringifyDecadeHeader(e) {
          var t = e.getFullYear().toString(),
              n = t.substring(0, t.length - 1) + 0,
              o = parseInt(n, 10) + 10;return n + "-" + o;
        }, stringifyDayHeader: function stringifyDayHeader(e) {
          return this.text.months[e.getMonth()] + " " + e.getFullYear();
        }, parseMonth: function parseMonth(e) {
          return this.text.months[e.getMonth()];
        }, stringifyYearHeader: function stringifyYearHeader(e) {
          return e.getFullYear();
        }, stringify: function stringify(e) {
          var t = arguments.length <= 1 || void 0 === arguments[1] ? this.format : arguments[1];if (e || (e = this.parse()), !e) return "";var n = e.getFullYear(),
              o = e.getMonth() + 1,
              i = e.getDate(),
              r = this.parseMonth(e);return t.replace(/yyyy/g, n).replace(/MMMM/g, r).replace(/MMM/g, r.substring(0, 3)).replace(/MM/g, ("0" + o).slice(-2)).replace(/dd/g, ("0" + i).slice(-2)).replace(/yy/g, n).replace(/M(?!a)/g, o).replace(/d/g, i);
        }, parse: function parse() {
          var e = arguments.length <= 0 || void 0 === arguments[0] ? this.value : arguments[0],
              t = void 0;return t = 10 !== e.length || "dd-MM-yyyy" !== this.format && "dd/MM/yyyy" !== this.format ? new Date(e) : new Date(e.substring(6, 10), e.substring(3, 5), e.substring(0, 2)), isNaN(t.getFullYear()) ? new Date(null) : t;
        }, getDayCount: function getDayCount(e, t) {
          var n = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];return 1 === t && (e % 400 === 0 || e % 4 === 0 && e % 100 !== 0) ? 29 : n[t];
        }, getDateRange: function getDateRange() {
          var e = this;this.dateRange = [], this.decadeRange = [];for (var t = { year: this.currDate.getFullYear(), month: this.currDate.getMonth(), day: this.currDate.getDate() }, n = t.year.toString(), o = n.substring(0, n.length - 1) + 0 - 1, i = 0; i < 12; i++) {
            this.decadeRange.push({ text: o + i });
          }var r = new Date(t.year, t.month, 1),
              a = r.getDay() + 1;0 === a && (a = 7);var s = this.getDayCount(t.year, t.month);if (a > 1) for (var l = this.getYearMonth(t.year, t.month - 1), c = this.getDayCount(l.year, l.month), u = 1; u < a; u++) {
            var d = c - a + u + 1;this.dateRange.push({ text: d, date: new Date(l.year, l.month, d), sclass: "datepicker-item-gray" });
          }for (var p = function p(n) {
            var o = new Date(t.year, t.month, n),
                i = o.getDay(),
                r = "";if (e.disabledDaysOfWeek.forEach(function (e) {
              i === parseInt(e, 10) && (r = "datepicker-item-disable");
            }), n === t.day && e.value) {
              var a = e.parse(e.value);a && a.getFullYear() === t.year && a.getMonth() === t.month && (r = "datepicker-dateRange-item-active");
            }e.dateRange.push({ text: n, date: o, sclass: r });
          }, f = 1; f <= s; f++) {
            p(f);
          }if (this.dateRange.length < 42) for (var h = 42 - this.dateRange.length, v = this.getYearMonth(t.year, t.month + 1), y = 1; y <= h; y++) {
            this.dateRange.push({ text: y, date: new Date(v.year, v.month, y), sclass: "datepicker-item-gray" });
          }
        } } };
  }, function (e, t) {
    e.exports = '<div class=datepicker> <input class="form-control datepicker-input" :class="{\'with-reset-button\': clearButton}" type=text :placeholder=placeholder :style={width:width} @click=inputClick v-model=value /> <button v-if="clearButton && value" type=button class=close @click="value = \'\'"> <span>&times;</span> </button> <div class=datepicker-popup v-show=displayDayView> <div class=datepicker-inner> <div class=datepicker-body> <div class=datepicker-ctrl> <span class="datepicker-preBtn glyphicon glyphicon-chevron-left" aria-hidden=true @click=preNextMonthClick(0)></span> <span class="datepicker-nextBtn glyphicon glyphicon-chevron-right" aria-hidden=true @click=preNextMonthClick(1)></span> <p @click=switchMonthView>{{stringifyDayHeader(currDate)}}</p> </div> <div class=datepicker-weekRange> <span v-for="w in text.daysOfWeek">{{w}}</span> </div> <div class=datepicker-dateRange> <span v-for="d in dateRange" :class=d.sclass @click=daySelect(d.date,this)>{{d.text}}</span> </div> </div> </div> </div> <div class=datepicker-popup v-show=displayMonthView> <div class=datepicker-inner> <div class=datepicker-body> <div class=datepicker-ctrl> <span class="datepicker-preBtn glyphicon glyphicon-chevron-left" aria-hidden=true @click=preNextYearClick(0)></span> <span class="datepicker-nextBtn glyphicon glyphicon-chevron-right" aria-hidden=true @click=preNextYearClick(1)></span> <p @click=switchDecadeView>{{stringifyYearHeader(currDate)}}</p> </div> <div class=datepicker-monthRange> <template v-for="m in text.months"> <span :class="{\'datepicker-dateRange-item-active\':\r\n                  (text.months[parse(value).getMonth()]  === m) &&\r\n                  currDate.getFullYear() === parse(value).getFullYear()}" @click=monthSelect($index)>{{m.substr(0,3)}}</span> </template> </div> </div> </div> </div> <div class=datepicker-popup v-show=displayYearView> <div class=datepicker-inner> <div class=datepicker-body> <div class=datepicker-ctrl> <span class="datepicker-preBtn glyphicon glyphicon-chevron-left" aria-hidden=true @click=preNextDecadeClick(0)></span> <span class="datepicker-nextBtn glyphicon glyphicon-chevron-right" aria-hidden=true @click=preNextDecadeClick(1)></span> <p>{{stringifyDecadeHeader(currDate)}}</p> </div> <div class="datepicker-monthRange decadeRange"> <template v-for="decade in decadeRange"> <span :class="{\'datepicker-dateRange-item-active\':\r\n                  parse(this.value).getFullYear() === decade.text}" @click.stop=yearSelect(decade.text)>{{decade.text}}</span> </template> </div> </div> </div> </div> </div>';
  }, function (e, t, n) {
    n(133), e.exports = n(135), e.exports.__esModule && (e.exports = e.exports["default"]), ("function" == typeof e.exports ? e.exports.options : e.exports).template = n(136);
  }, function (e, t, n) {
    var o = n(134);"string" == typeof o && (o = [[e.id, o, ""]]);n(106)(o, {});o.locals && (e.exports = o.locals);
  }, function (e, t, n) {
    t = e.exports = n(105)(), t.push([e.id, ".secret[_v-39be1072]{position:absolute;clip:rect(0 0 0 0);overflow:hidden;margin:-1px;height:1px;width:1px;padding:0;border:0}", ""]);
  }, function (e, t, n) {
    "use strict";
    function o(e) {
      return e && e.__esModule ? e : { "default": e };
    }Object.defineProperty(t, "__esModule", { value: !0 });var i = n(97),
        r = n(27),
        a = o(r);t["default"] = { props: { show: { twoWay: !0, type: Boolean, coerce: i.coerce["boolean"], "default": !1 }, "class": null, disabled: { type: Boolean, coerce: i.coerce["boolean"], "default": !1 }, text: { type: String, "default": null }, type: { type: String, "default": null } }, computed: { classes: function classes() {
          return [{ open: this.show, disabled: this.disabled }, this["class"]];
        }, menu: function menu() {
          return !this.$parent || this.$parent.navbar;
        }, submenu: function submenu() {
          return this.$parent && (this.$parent.menu || this.$parent.submenu);
        }, slots: function slots() {
          return this._slotContents;
        } }, methods: { blur: function blur() {
          var e = this;this.unblur(), this._hide = setTimeout(function () {
            e._hide = null, e.show = !1;
          }, 100);
        }, unblur: function unblur() {
          this._hide && (clearTimeout(this._hide), this._hide = null);
        } }, ready: function ready() {
        var e = this,
            t = (0, a["default"])(this.$els.dropdown);t.onBlur(function (t) {
          e.show = !1;
        }), t.findChildren("a,button").on("click", function (t) {
          return t.preventDefault(), !e.disabled && (e.show = !e.show, !1);
        }), t.findChildren("ul").on("click", "li>a", function (t) {
          e.show = !1;
        });
      }, beforeDestroy: function beforeDestroy() {
        var e = (0, a["default"])(this.$els.dropdown);e.offBlur(), e.findChildren("a,button").off(), e.findChildren("ul").off();
      } };
  }, function (e, t) {
    e.exports = '<li v-if=$parent._navbar||$parent.menu||$parent._tabset v-el:dropdown="" class=dropdown :class=classes _v-39be1072=""> <a v-if=text class=dropdown-toggle role=button :class="{disabled: disabled}" @keyup.esc="show = false" _v-39be1072=""> {{ text }} <span class=caret _v-39be1072=""></span> </a> <slot v-else="" name=button _v-39be1072=""></slot> <slot v-if="slots[\'dropdown-menu\']" name=dropdown-menu _v-39be1072=""></slot> <ul v-else="" class=dropdown-menu _v-39be1072=""> <slot _v-39be1072=""></slot> </ul> </li> <div v-else="" v-el:dropdown="" class=btn-group :class=classes _v-39be1072=""> <button v-if=text type=button class="btn btn-{{type||\'default\'}} dropdown-toggle" @keyup.esc="show = false" :disabled=disabled _v-39be1072=""> {{ text }} <span class=caret _v-39be1072=""></span> </button> <slot v-else="" name=button _v-39be1072=""></slot> <slot v-if="slots[\'dropdown-menu\']" name=dropdown-menu _v-39be1072=""></slot> <ul v-else="" class=dropdown-menu _v-39be1072=""> <slot _v-39be1072=""></slot> </ul> </div>';
  }, function (e, t, n) {
    e.exports = n(138), e.exports.__esModule && (e.exports = e.exports["default"]), ("function" == typeof e.exports ? e.exports.options : e.exports).template = n(139);
  }, function (e, t, n) {
    "use strict";
    function o(e) {
      return e && e.__esModule ? e : { "default": e };
    }Object.defineProperty(t, "__esModule", { value: !0 });var i = n(97),
        r = n(27);o(r);t["default"] = { props: { valid: { twoWay: !0, "default": null }, enterSubmit: { type: Boolean, coerce: i.coerce["boolean"], "default": !1 }, icon: { type: Boolean, coerce: i.coerce["boolean"], "default": !1 }, lang: { type: String, "default": navigator.language } }, data: function data() {
        return { children: [], timeout: null };
      }, watch: { valid: function valid(e, t) {
          e !== t && this._parent && this._parent.validate();
        } }, methods: { focus: function focus() {
          this.$els.input.focus();
        }, validate: function validate() {
          var e = !0;return this.children.some(function (t) {
            var n = t.validate ? t.validate() : void 0 !== t.valid ? t.valid : t.required && !~["", null, void 0].indexOf(t.value);return n || (e = !1), !e;
          }), this.valid = e, e === !0;
        } }, created: function created() {
        this._formGroup = !0;for (var e = this.$parent; e && !e._formGroup;) {
          e = e.$parent;
        }e && e._formGroup && (e.children.push(this), this._parent = e);
      }, ready: function ready() {
        this.validate();
      }, beforeDestroy: function beforeDestroy() {
        this._parent && this._parent.children.$remove(this);
      } };
  }, function (e, t) {
    e.exports = "<slot></slot>";
  }, function (e, t, n) {
    n(141), e.exports = n(143), e.exports.__esModule && (e.exports = e.exports["default"]), ("function" == typeof e.exports ? e.exports.options : e.exports).template = n(144);
  }, function (e, t, n) {
    var o = n(142);"string" == typeof o && (o = [[e.id, o, ""]]);n(106)(o, {});o.locals && (e.exports = o.locals);
  }, function (e, t, n) {
    t = e.exports = n(105)(), t.push([e.id, ".form-group[_v-652ad7b9]{position:relative}label~.close[_v-652ad7b9]{top:25px}.close[_v-652ad7b9]{position:absolute;top:0;right:0;z-index:2;display:block;width:34px;height:34px;line-height:34px;text-align:center}.has-feedback.has-error button.close[_v-652ad7b9],.has-feedback.has-success button.close[_v-652ad7b9]{right:20px}", ""]);
  }, function (e, t, n) {
    "use strict";
    function o(e) {
      return e && e.__esModule ? e : { "default": e };
    }Object.defineProperty(t, "__esModule", { value: !0 });var i = n(97),
        r = n(27),
        a = o(r);t["default"] = { props: { value: { twoWay: !0, "default": null }, match: { type: String, "default": null }, clearButton: { type: Boolean, coerce: i.coerce["boolean"], "default": !1 }, disabled: { type: Boolean, coerce: i.coerce["boolean"], "default": !1 }, enterSubmit: { type: Boolean, coerce: i.coerce["boolean"], "default": !1 }, error: { type: String, "default": null }, help: { type: String, "default": null }, hideHelp: { type: Boolean, coerce: i.coerce["boolean"], "default": !0 }, icon: { type: Boolean, coerce: i.coerce["boolean"], "default": !1 }, label: { type: String, "default": null }, lang: { type: String, "default": navigator.language }, mask: null, maxlength: { type: Number, coerce: i.coerce.number, "default": null }, minlength: { type: Number, coerce: i.coerce.number, "default": 0 }, name: { type: String, "default": null }, noValidate: { type: Boolean, coerce: i.coerce["boolean"], "default": !1 }, pattern: null, placeholder: { type: String, "default": null }, readonly: { type: Boolean, coerce: i.coerce["boolean"], "default": !1 }, required: { type: Boolean, coerce: i.coerce["boolean"], "default": !1 }, rows: { type: Number, coerce: i.coerce.number, "default": 3 }, type: { type: String, "default": "text" }, validationDelay: { type: Number, coerce: i.coerce.number, "default": 250 } }, data: function data() {
        return { valid: null, timeout: null };
      }, computed: { slots: function slots() {
          return this._slotContents || {};
        }, bsForm: function bsForm() {
          return !0;
        }, input: function input() {
          return !0;
        }, text: function text() {
          return (0, i.translations)(this.lang);
        }, showHelp: function showHelp() {
          return this.help && (!this.showError || !this.hideHelp);
        }, showError: function showError() {
          return this.error && this.valid === !1;
        }, errorText: function errorText() {
          var e = this.value,
              t = [this.error];return !e && this.required && t.push("(" + this.text.required.toLowerCase() + ")"), e && e.length < this.minlength && t.push("(" + this.text.minLength.toLowerCase() + ": " + this.minlength + ")"), t.join(" ");
        }, textPattern: function textPattern() {
          return "string" == typeof this.pattern ? this.pattern : null;
        }, title: function title() {
          return this.errorText || this.help || "";
        } }, watch: { match: function match(e) {
          this.eval();
        }, noValidate: { immediate: !0, handler: function handler(e) {
            this.$parent._formGroup && (e && !~this.$parent.children.indexOf(this) && this.$parent.children.push(this), !e && ~this.$parent.children.indexOf(this) && this.$parent.children.$remove(this));
          } }, valid: function valid(e, t) {
          e !== t && this._parent && this._parent.validate();
        } }, methods: { focus: function focus() {
          this.$els.input.focus();
        }, eval: function _eval() {
          var e = this,
              t = this.value || "";this.mask instanceof Function && (t = this.mask(t)), this.value !== t && (this.value = t), this.timeout && clearTimeout(this.timeout), this.noValidate ? null !== this.valid && (this.valid = null) : this.timeout = setTimeout(function () {
            e.valid = e.validate(), e.timeout = null;
          }, this.validationDelay);
        }, submit: function submit() {
          if (this.$parent._formGroup) return this.$parent.validate();if (this.$els.input.form) {
            var e = (0, a["default"])(".form-group.validate:not(.has-success)", this.$els.input.form);
            e.length ? e.find("input,textarea,select")[0].focus() : this.$els.input.form.submit();
          }
        }, validate: function validate() {
          var e = (this.value || "").trim();if (!e) return !this.required;if (null !== this.match && this.match !== e) return !1;if (e.length < this.minlength) return !1;var t = !0;if (this.$els.input.checkValidity && !this.$els.input.checkValidity()) return !1;if (this.pattern instanceof Function && (t = this.pattern(this.value)), "string" == typeof this.pattern) {
            var n = new RegExp(this.pattern);t = n.test(this.value);
          }return t;
        } }, created: function created() {
        for (var e = this.$parent; e && !e._formGroup;) {
          e = e.$parent;
        }e && e._formGroup && (e.children.push(this), this._parent = e);
      }, ready: function ready() {
        var e = this;(0, a["default"])(this.$els.input).on("change keypress keydown keyup", function () {
          return e.eval();
        }).on("focus", function (t) {
          return e.$emit("focus", t);
        }).on("blur", function (t) {
          e.noValidate || (e.valid = e.validate()), e.$emit("blur", t);
        });
      }, beforeDestroy: function beforeDestroy() {
        this._parent && this._parent.children.$remove(this), (0, a["default"])(this.$els.input).off();
      } };
  }, function (e, t) {
    e.exports = '<div class=form-group @click=focus() :class="{\'has-feedback\':icon,\'has-error\':valid===false,\'has-success\':valid===true,validate:!noValidate}" _v-652ad7b9=""> <slot name=label _v-652ad7b9=""><label v-if=label class=control-label _v-652ad7b9="">{{label}}</label></slot> <textarea v-if="type==\'textarea\'" class=form-control v-el:input="" v-model=value :cols=cols :rows=rows :name=name :readonly=readonly :required=required :disabled=disabled :maxlength=maxlength :placeholder=placeholder _v-652ad7b9=""></textarea> <template v-else="" _v-652ad7b9=""> <div v-if=slots.before||slots.after class=input-group _v-652ad7b9=""> <slot name=before _v-652ad7b9=""></slot> <input class=form-control v-el:input="" v-model=value :name=name :type=type :pattern=textPattern :title=title :readonly=readonly :required=required :disabled=disabled :maxlength=maxlength :placeholder=placeholder @keyup.enter=enterSubmit&amp;&amp;submit() _v-652ad7b9=""> <slot name=after _v-652ad7b9=""></slot> </div> <input v-else="" class=form-control v-el:input="" v-model=value :name=name :type=type :pattern=textPattern :title=title :readonly=readonly :required=required :disabled=disabled :maxlength=maxlength :placeholder=placeholder @keyup.enter=enterSubmit&amp;&amp;submit() _v-652ad7b9=""> </template> <span v-if="clearButton &amp;&amp; value" class=close @click="value = \'\'" _v-652ad7b9="">×</span> <span v-if="icon&amp;&amp;valid!==null" class="glyphicon glyphicon-{{valid?\'ok\':\'remove\'}} form-control-feedback" aria-hidden=true _v-652ad7b9=""></span> <div v-if=showHelp class=help-block _v-652ad7b9="">{{help}}</div> <div v-if=showError class="help-block with-errors" _v-652ad7b9="">{{errorText}}</div> </div>';
  }, function (e, t, n) {
    n(146), e.exports = n(148), e.exports.__esModule && (e.exports = e.exports["default"]), ("function" == typeof e.exports ? e.exports.options : e.exports).template = n(153);
  }, function (e, t, n) {
    var o = n(147);"string" == typeof o && (o = [[e.id, o, ""]]);n(106)(o, {});o.locals && (e.exports = o.locals);
  }, function (e, t, n) {
    t = e.exports = n(105)(), t.push([e.id, ".modal{-webkit-transition:all .3s ease;transition:all .3s ease}.modal.in{background-color:rgba(0,0,0,.5)}.modal.zoom .modal-dialog{-webkit-transform:scale(.1);transform:scale(.1);top:300px;opacity:0;-webkit-transition:all .3s;transition:all .3s}.modal.zoom.in .modal-dialog{-webkit-transform:scale(1);transform:scale(1);-webkit-transform:translate3d(0,-300px,0);transform:translate3d(0,-300px,0);opacity:1}", ""]);
  }, function (e, t, n) {
    "use strict";
    function o(e) {
      return e && e.__esModule ? e : { "default": e };
    }Object.defineProperty(t, "__esModule", { value: !0 });var i = n(149),
        r = o(i),
        a = n(97),
        s = n(27),
        l = o(s);t["default"] = { props: { okText: { type: String, "default": "Save changes" }, cancelText: { type: String, "default": "Close" }, title: { type: String, "default": "" }, show: { required: !0, type: Boolean, coerce: a.coerce["boolean"], twoWay: !0 }, width: { "default": null }, callback: { type: Function, "default": function _default() {} }, effect: { type: String, "default": null }, backdrop: { type: Boolean, coerce: a.coerce["boolean"], "default": !0 }, large: { type: Boolean, coerce: a.coerce["boolean"], "default": !1 }, small: { type: Boolean, coerce: a.coerce["boolean"], "default": !1 } }, computed: { optionalWidth: function optionalWidth() {
          return null === this.width ? null : (0, r["default"])(this.width) ? this.width + "px" : this.width;
        } }, watch: { show: function show(e) {
          var t = this,
              n = this.$el,
              o = document.body,
              i = (0, a.getScrollBarWidth)();e ? ((0, l["default"])(n).find(".modal-content").focus(), n.style.display = "block", setTimeout(function () {
            return (0, l["default"])(n).addClass("in");
          }, 0), (0, l["default"])(o).addClass("modal-open"), 0 !== i && (o.style.paddingRight = i + "px"), this.backdrop && (0, l["default"])(n).on("click", function (e) {
            e.target === n && (t.show = !1);
          })) : ((0, l["default"])(n).on("transitionend", function () {
            (0, l["default"])(n).off("click transitionend"), n.style.display = "none", o.style.paddingRight = "0";
          }).removeClass("in"), (0, l["default"])(o).removeClass("modal-open"));
        } }, methods: { close: function close() {
          this.show = !1;
        } } };
  }, function (e, t, n) {
    e.exports = { "default": n(150), __esModule: !0 };
  }, function (e, t, n) {
    n(151), e.exports = n(33).Number.isInteger;
  }, function (e, t, n) {
    var o = n(31);o(o.S, "Number", { isInteger: n(152) });
  }, function (e, t, n) {
    var o = n(39),
        i = Math.floor;e.exports = function (e) {
      return !o(e) && isFinite(e) && i(e) === e;
    };
  }, function (e, t) {
    e.exports = "<div role=dialog v-bind:class=\"{\r\n    'modal':true,\r\n    'fade':effect === 'fade',\r\n    'zoom':effect === 'zoom'\r\n    }\"> <div v-bind:class=\"{'modal-dialog':true,'modal-lg':large,'modal-sm':small}\" role=document v-bind:style=\"{width: optionalWidth}\"> <div class=modal-content> <slot name=modal-header> <div class=modal-header> <button type=button class=close @click=close><span>&times;</span></button> <h4 class=modal-title> <slot name=title> {{title}} </slot> </h4> </div> </slot> <slot name=modal-body> <div class=modal-body></div> </slot> <slot name=modal-footer> <div class=modal-footer> <button type=button class=\"btn btn-default\" @click=close>{{ cancelText }}</button> <button type=button class=\"btn btn-primary\" @click=callback>{{ okText }}</button> </div> </slot> </div> </div> </div>";
  }, function (e, t, n) {
    e.exports = n(155), e.exports.__esModule && (e.exports = e.exports["default"]), ("function" == typeof e.exports ? e.exports.options : e.exports).template = n(156);
  }, function (e, t, n) {
    "use strict";
    function o(e) {
      return e && e.__esModule ? e : { "default": e };
    }Object.defineProperty(t, "__esModule", { value: !0 });var i = n(27),
        r = o(i);t["default"] = { props: { type: { type: String, "default": "default" }, placement: { type: String, "default": "" } }, data: function data() {
        return { id: "bs-example-navbar-collapse-1", collapsed: !0, styles: {} };
      }, computed: { slots: function slots() {
          return this._slotContents;
        } }, methods: { toggleCollapse: function toggleCollapse(e) {
          e && e.preventDefault(), this.collapsed = !this.collapsed;
        } }, created: function created() {
        this._navbar = !0;
      }, ready: function ready() {
        var e = this,
            t = (0, r["default"])('.dropdown>[data-toggle="dropdown"]', this.$el).parent();t.on("click", ".dropdown-toggle", function (e) {
          e.preventDefault(), t.each(function (t) {
            t.contains(e.target) && t.classList.toggle("open");
          });
        }).on("click", ".dropdown-menu>li>a", function (e) {
          t.each(function (t) {
            t.contains(e.target) && t.classList.remove("open");
          });
        }).onBlur(function (e) {
          t.each(function (t) {
            t.contains(e.target) || t.classList.remove("open");
          });
        }), (0, r["default"])(this.$el).on("click touchstart", "li:not(.dropdown)>a", function (t) {
          setTimeout(function () {
            e.collapsed = !0;
          }, 200);
        }).onBlur(function (t) {
          e.$el.contains(t.target) || (e.collapsed = !0);
        });var n = this.$el.offsetHeight;"top" === this.placement && (document.body.style.paddingTop = n + "px"), "bottom" === this.placement && (document.body.style.paddingBottom = n + "px"), this.slots.collapse && (0, r["default"])('[data-toggle="collapse"]', this.$el).on("click", function (t) {
          return e.toggleCollapse(t);
        });
      }, beforeDestroy: function beforeDestroy() {
        (0, r["default"])(".dropdown", this.$el).off("click").offBlur(), this.slots.collapse && (0, r["default"])('[data-toggle="collapse"]', this.$el).off("click");
      } };
  }, function (e, t) {
    e.exports = "<nav v-el:navbar :class=\"['navbar',{\r\n    'navbar-inverse':(type == 'inverse'),\r\n    'navbar-default':(type == 'default'),\r\n    'navbar-fixed-top':(placement === 'top'),\r\n    'navbar-fixed-bottom':(placement === 'bottom'),\r\n    'navbar-static-top':(placement === 'static')\r\n  }]\"> <div class=container-fluid> <div class=navbar-header> <button v-if=!slots.collapse type=button class=\"navbar-toggle collapsed\" aria-expanded=false @click=toggleCollapse> <span class=sr-only>Toggle navigation</span> <span class=icon-bar></span> <span class=icon-bar></span> <span class=icon-bar></span> </button> <slot name=collapse></slot> <slot name=brand></slot> </div> <div :class=\"['navbar-collapse',{collapse:collapsed}]\"> <ul class=\"nav navbar-nav\"> <slot></slot> </ul> <ul v-if=slots.right class=\"nav navbar-nav navbar-right\"> <slot name=right></slot> </ul> </div> </div> </nav>";
  }, function (e, t, n) {
    e.exports = n(158), e.exports.__esModule && (e.exports = e.exports["default"]), ("function" == typeof e.exports ? e.exports.options : e.exports).template = n(159);
  }, function (e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 }), t["default"] = { props: { value: null }, data: function data() {
        return { loading: !0 };
      }, ready: function ready() {
        this.$parent._select ? (this.$parent.options || (this.$parent.options = []), this.$parent.options.push({ value: this.value, label: this.$els.v.innerHTML }), this.loading = !1) : console.warn("options only work inside a select component");
      } };
  }, function (e, t) {
    e.exports = "<li v-el:v v-if=loading><slot></slot></li>";
  }, function (e, t, n) {
    n(161), e.exports = n(163), e.exports.__esModule && (e.exports = e.exports["default"]), ("function" == typeof e.exports ? e.exports.options : e.exports).template = n(164);
  }, function (e, t, n) {
    var o = n(162);"string" == typeof o && (o = [[e.id, o, ""]]);n(106)(o, {});o.locals && (e.exports = o.locals);
  }, function (e, t, n) {
    t = e.exports = n(105)(), t.push([e.id, ".accordion-toggle{cursor:pointer}.collapse-transition{-webkit-transition:max-height .5s ease;transition:max-height .5s ease}.collapse-enter,.collapse-leave{max-height:0!important}", ""]);
  }, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });var o = n(97);t["default"] = { props: { header: { type: String }, isOpen: { type: Boolean, coerce: o.coerce["boolean"], "default": null }, type: { type: String, "default": null } }, computed: { inAccordion: function inAccordion() {
          return this.$parent && this.$parent._isAccordion;
        }, panelType: function panelType() {
          return "panel-" + (this.type || this.$parent && this.$parent.type || "default");
        } }, methods: { toggle: function toggle() {
          this.isOpen = !this.isOpen, this.$dispatch("isOpenEvent", this);
        } }, transitions: { collapse: { afterEnter: function afterEnter(e) {
            e.style.maxHeight = "", e.style.overflow = "";
          }, beforeLeave: function beforeLeave(e) {
            return e.style.maxHeight = e.offsetHeight + "px", e.style.overflow = "hidden", e.offsetHeight;
          } } }, created: function created() {
        null === this.isOpen && (this.isOpen = !this.inAccordion);
      } };
  }, function (e, t) {
    e.exports = "<div class=\"panel {{panelType}}\"> <div :class=\"['panel-heading',{'accordion-toggle':inAccordion}]\" @click.prevent=inAccordion&&toggle()> <slot name=header> <h4 class=panel-title>{{ header }}</h4> </slot> </div> <div class=panel-collapse v-el:panel v-show=isOpen transition=collapse> <div class=panel-body> <slot></slot> </div> </div> </div>";
  }, function (e, t, n) {
    n(166), e.exports = n(168), e.exports.__esModule && (e.exports = e.exports["default"]), ("function" == typeof e.exports ? e.exports.options : e.exports).template = n(170);
  }, function (e, t, n) {
    var o = n(167);"string" == typeof o && (o = [[e.id, o, ""]]);n(106)(o, {});o.locals && (e.exports = o.locals);
  }, function (e, t, n) {
    t = e.exports = n(105)(), t.push([e.id, ".fade-transition,.scale-transition{display:block}.scale-enter{-webkit-animation:scale-in .15s ease-in;animation:scale-in .15s ease-in}.scale-leave{-webkit-animation:scale-out .15s ease-out;animation:scale-out .15s ease-out}@-webkit-keyframes scale-in{0%{-webkit-transform:scale(0);transform:scale(0);opacity:0}to{-webkit-transform:scale(1);transform:scale(1);opacity:1}}@keyframes scale-in{0%{-webkit-transform:scale(0);transform:scale(0);opacity:0}to{-webkit-transform:scale(1);transform:scale(1);opacity:1}}@-webkit-keyframes scale-out{0%{-webkit-transform:scale(1);transform:scale(1);opacity:1}to{-webkit-transform:scale(0);transform:scale(0);opacity:0}}@keyframes scale-out{0%{-webkit-transform:scale(1);transform:scale(1);opacity:1}to{-webkit-transform:scale(0);transform:scale(0);opacity:0}}", ""]);
  }, function (e, t, n) {
    "use strict";
    function o(e) {
      return e && e.__esModule ? e : { "default": e };
    }Object.defineProperty(t, "__esModule", { value: !0 });var i = n(169),
        r = o(i);t["default"] = { mixins: [r["default"]], props: { trigger: { type: String, "default": "click" } } };
  }, function (e, t, n) {
    "use strict";
    function o(e) {
      return e && e.__esModule ? e : { "default": e };
    }Object.defineProperty(t, "__esModule", { value: !0 });var i = n(97),
        r = n(27),
        a = o(r);t["default"] = { props: { trigger: { type: String }, effect: { type: String, "default": "fade" }, title: { type: String }, content: { type: String }, header: { type: Boolean, coerce: i.coerce["boolean"], "default": !0 }, placement: { type: String } }, data: function data() {
        return { position: { top: 0, left: 0 }, show: !0 };
      }, methods: { toggle: function toggle(e) {
          this.show = !this.show, e && "contextmenu" === this.trigger && e.preventDefault();
        } }, ready: function ready() {
        var e = this.$els.popover;if (!e) return console.error("Could not find popover v-el in your component that uses popoverMixin.");var t = this.$els.trigger.children[0];switch (this.placement) {case "top":
            this.position.left = t.offsetLeft - e.offsetWidth / 2 + t.offsetWidth / 2, this.position.top = t.offsetTop - e.offsetHeight;break;case "left":
            this.position.left = t.offsetLeft - e.offsetWidth, this.position.top = t.offsetTop + t.offsetHeight / 2 - e.offsetHeight / 2;break;case "right":
            this.position.left = t.offsetLeft + t.offsetWidth, this.position.top = t.offsetTop + t.offsetHeight / 2 - e.offsetHeight / 2;break;case "bottom":
            this.position.left = t.offsetLeft - e.offsetWidth / 2 + t.offsetWidth / 2, this.position.top = t.offsetTop + t.offsetHeight;break;default:
            console.warn("Wrong placement prop");}e.style.top = this.position.top + "px", e.style.left = this.position.left + "px", e.style.display = "none", this.show = !this.show;var n = "contextmenu" === this.trigger ? "contextmenu" : "hover" === this.trigger ? "mouseleave mouseenter" : "focus" === this.trigger ? "blur focus" : "click";"focus" !== this.trigger || ~t.tabIndex || (t = (0, a["default"])("a,input,select,textarea,button", t), t.length || (t = null)), t && ((0, a["default"])(t).on(n, this.toggle), this._trigger = t);
      }, beforeDestroy: function beforeDestroy() {
        this._trigger && (0, a["default"])(this._trigger).off();
      } };
  }, function (e, t) {
    e.exports = "<span v-el:trigger> <slot></slot> </span> <div v-el:popover v-show=show :class=\"['popover',placement]\" :transition=effect> <div class=arrow></div> <h3 class=popover-title v-if=title> <slot name=title>{{title}}</slot> </h3> <div class=popover-content> <slot name=content>{{{content}}}</slot> </div> </div>";
  }, function (e, t, n) {
    e.exports = n(172), e.exports.__esModule && (e.exports = e.exports["default"]), ("function" == typeof e.exports ? e.exports.options : e.exports).template = n(173);
  }, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });var o = n(97);t["default"] = { props: { now: { type: Number, coerce: o.coerce.number, required: !0 }, label: { type: Boolean, coerce: o.coerce["boolean"], "default": !1 }, type: { type: String }, striped: { type: Boolean, coerce: o.coerce["boolean"], "default": !1 }, animated: { type: Boolean, coerce: o.coerce["boolean"], "default": !1 } } };
  }, function (e, t) {
    e.exports = "<div role=progressbar :class=\"['progress-bar',{\r\n      'progress-bar-success':type == 'success',\r\n      'progress-bar-warning':type == 'warning',\r\n      'progress-bar-info':type == 'info',\r\n      'progress-bar-danger':type == 'danger',\r\n      'progress-bar-striped':striped,\r\n      'active':animated\r\n    }]\" :style=\"{width: now + '%'}\"> {{label ? now + '%' : ''}} </div>";
  }, function (e, t, n) {
    n(175), e.exports = n(177), e.exports.__esModule && (e.exports = e.exports["default"]), ("function" == typeof e.exports ? e.exports.options : e.exports).template = n(178);
  }, function (e, t, n) {
    var o = n(176);"string" == typeof o && (o = [[e.id, o, ""]]);n(106)(o, {});o.locals && (e.exports = o.locals);
  }, function (e, t, n) {
    t = e.exports = n(105)(), t.push([e.id, ".radio{position:relative}.radio>label>input{position:absolute;margin:0;padding:0;opacity:0;z-index:-1;box-sizing:border-box}.radio>label>.icon{position:absolute;top:.15rem;left:0;display:block;width:1.4rem;height:1.4rem;text-align:center;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;border-radius:.7rem;background-repeat:no-repeat;background-position:50%;background-size:50% 50%}.radio:not(.active)>label>.icon{background-color:#ddd;border:1px solid #bbb}.radio>label>input:focus~.icon{outline:0;border:1px solid #66afe9;box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6)}.radio.active>label>.icon{background-size:1rem 1rem;background-image:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjxzdmcgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxjaXJjbGUgY3g9IjUiIGN5PSI1IiByPSI0IiBmaWxsPSIjZmZmIi8+PC9zdmc+)}.radio.active .btn-default{-webkit-filter:brightness(75%);filter:brightness(75%)}.btn.readonly,.radio.disabled>label>.icon,.radio.readonly>label>.icon{filter:alpha(opacity=65);box-shadow:none;opacity:.65}label.btn>input[type=radio]{position:absolute;clip:rect(0,0,0,0);pointer-events:none}", ""]);
  }, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });var o = n(97);t["default"] = { props: { value: { "default": !0 }, checked: { twoWay: !0 }, button: { type: Boolean, coerce: o.coerce["boolean"], "default": !1 }, disabled: { type: Boolean, coerce: o.coerce["boolean"], "default": !1 }, name: { type: String, "default": null }, readonly: { type: Boolean, coerce: o.coerce["boolean"], "default": !1 }, type: { type: String, "default": null } }, computed: { active: function active() {
          return this.group ? this.$parent.value === this.value : this.value === this.checked;
        }, buttonStyle: function buttonStyle() {
          return this.button || this.group && this.$parent.buttons;
        }, group: function group() {
          return this.$parent && this.$parent._radioGroup;
        }, typeColor: function typeColor() {
          return this.type || this.$parent && this.$parent.type || "default";
        } }, created: function created() {
        var e = this.$parent;e && e._btnGroup && !e._checkboxGroup && (e._radioGroup = !0);
      }, ready: function ready() {
        this.$parent._radioGroup && (this.$parent.value ? this.checked = this.$parent.value === this.value : this.checked && (this.$parent.value = this.value));
      }, methods: { focus: function focus() {
          this.$els.input.focus();
        }, toggle: function toggle() {
          this.disabled || (this.focus(), this.readonly || (this.checked = this.value, this.group && (this.$parent.value = this.value)));
        } } };
  }, function (e, t) {
    e.exports = "<label v-if=buttonStyle :class=\"['btn btn-'+typeColor,{active:active,disabled:disabled,readonly:readonly}]\" @click.prevent=toggle> <input type=radio autocomplete=off v-el:input v-show=!readonly :checked=active :value=value :name=name :readonly=readonly :disabled=disabled /> <slot></slot> </label> <div v-else :class=\"['radio',typeColor,{active:active,disabled:disabled,readonly:readonly}]\" @click.prevent=toggle> <label class=open> <input type=radio autocomplete=off v-el:input :checked=active :value=value :name=name :readonly=readonly :disabled=disabled /> <span class=\"icon dropdown-toggle\" :class=\"[active?'btn-'+typeColor:'',{bg:typeColor==='default'}]\"></span> <span v-if=\"active&&typeColor==='default'\" class=icon></span> <slot></slot> </label> </div>";
  }, function (e, t, n) {
    n(180), e.exports = n(182), e.exports.__esModule && (e.exports = e.exports["default"]), ("function" == typeof e.exports ? e.exports.options : e.exports).template = n(198);
  }, function (e, t, n) {
    var o = n(181);"string" == typeof o && (o = [[e.id, o, ""]]);n(106)(o, {});o.locals && (e.exports = o.locals);
  }, function (e, t, n) {
    t = e.exports = n(105)(), t.push([e.id, ".btn-select[_v-e514dbc6]{display:inline-block}.btn-select>.btn-group>.dropdown-menu>li[_v-e514dbc6]{position:relative}.btn-select>.btn-group>.dropdown-menu>li>a[_v-e514dbc6]{cursor:pointer}.bs-searchbox[_v-e514dbc6]{position:relative;margin:4px 8px}.bs-searchbox .close[_v-e514dbc6]{position:absolute;top:0;right:0;z-index:2;display:block;width:34px;height:34px;line-height:34px;text-align:center}button>.close[_v-e514dbc6]{margin-left:5px}.notify.out[_v-e514dbc6]{position:relative}.notify.in[_v-e514dbc6],.notify>div[_v-e514dbc6]{position:absolute;width:96%;margin:0 2%;min-height:26px;padding:3px 5px;background:#f5f5f5;border:1px solid #e3e3e3;box-shadow:inset 0 1px 1px rgba(0,0,0,.05);pointer-events:none}.notify>div[_v-e514dbc6]{top:5px;z-index:1}.notify.in[_v-e514dbc6]{opacity:.9;bottom:5px}.btn-group.btn-group-justified .dropdown-menu[_v-e514dbc6]{width:100%}span.caret[_v-e514dbc6]{float:right;margin-top:9px;margin-left:5px}.secret[_v-e514dbc6]{border:0;clip:rect(0 0 0 0);height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;width:1px}.bs-searchbox input[_v-e514dbc6]:focus,.secret:focus+button[_v-e514dbc6]{outline:0;border-color:#66afe9!important;box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6)}", ""]);
  }, function (e, t, n) {
    "use strict";
    function o(e) {
      return e && e.__esModule ? e : { "default": e };
    }Object.defineProperty(t, "__esModule", { value: !0 });var i = n(183),
        r = o(i),
        a = n(88),
        s = o(a),
        l = n(97),
        c = n(27),
        u = o(c),
        d = {};t["default"] = { props: { value: { twoWay: !0 }, options: { type: Array, "default": function _default() {
            return [];
          } }, multiple: { type: Boolean, coerce: l.coerce["boolean"], "default": !1 }, clearButton: { type: Boolean, coerce: l.coerce["boolean"], "default": !1 }, closeOnSelect: { type: Boolean, coerce: l.coerce["boolean"], "default": !1 }, disabled: { type: Boolean, coerce: l.coerce["boolean"], "default": !1 }, justified: { type: Boolean, coerce: l.coerce["boolean"], "default": !1 }, lang: { type: String, "default": navigator.language }, limit: { type: Number, coerce: l.coerce.number, "default": 1024 }, name: { type: String, "default": null }, parent: { "default": !0 }, placeholder: { type: String, "default": null }, readonly: { type: Boolean, coerce: l.coerce["boolean"], "default": null }, required: { type: Boolean, coerce: l.coerce["boolean"], "default": null }, minSearch: { type: Number, coerce: l.coerce.number, "default": 0 }, search: { type: Boolean, coerce: l.coerce["boolean"], "default": !1 }, searchText: { type: String, "default": null }, url: { type: String, "default": null } }, data: function data() {
        return { loading: null, searchValue: null, show: !1, showNotify: !1, valid: null };
      }, computed: { selectedItems: function selectedItems() {
          if (0 === this.options.length) return "";var e = [],
              t = !0,
              n = !1,
              o = void 0;try {
            for (var i, a = (0, s["default"])(this.values); !(t = (i = a.next()).done); t = !0) {
              var l = i.value;if (~["number", "string"].indexOf("undefined" == typeof l ? "undefined" : (0, r["default"])(l))) {
                var c = null;this.options.some(function (e) {
                  if (e instanceof Object ? e.value === l : e === l) return c = e, !0;
                }) && e.push(c.label || c);
              }
            }
          } catch (u) {
            n = !0, o = u;
          } finally {
            try {
              !t && a["return"] && a["return"]();
            } finally {
              if (n) throw o;
            }
          }return e.join(", ");
        }, canSearch: function canSearch() {
          return this.minSearch ? this.options.length >= this.minSearch : this.search;
        }, limitText: function limitText() {
          return this.text.limit.replace("{{limit}}", this.limit);
        }, showPlaceholder: function showPlaceholder() {
          return 0 !== this.values.length && this.hasParent ? null : this.placeholder || this.text.notSelected;
        }, text: function text() {
          return (0, l.translations)(this.lang);
        }, hasParent: function hasParent() {
          return this.parent instanceof Array ? this.parent.length : this.parent;
        }, values: function values() {
          return this.value instanceof Array ? this.value : null !== this.value && void 0 !== this.value ? [this.value] : [];
        } }, watch: { options: function options(e) {
          var t = !1;if (e instanceof Array && e.length) for (var n in e) {
            e[n] instanceof Object || (e[n] = { label: e[n], value: e[n] }, t = !0);
          }t && (this.options = e);
        }, show: function show(e) {
          e && (this.$els.sel.focus(), this.$els.search && this.$els.search.focus());
        }, url: function url() {
          this.update();
        }, value: function value(e) {
          var t = this;this.value instanceof Array && e.length > this.limit && (this.showNotify = !0, d.limit && clearTimeout(d.limit), d.limit = setTimeout(function () {
            d.limit = !1, t.showNotify = !1;
          }, 1500)), this.checkValue(), this.valid = this.validate();
        }, valid: function valid(e, t) {
          e !== t && this._parent && this._parent.validate();
        } }, methods: { blur: function blur() {
          this.show = !1;
        }, clear: function clear() {
          this.disabled || this.readonly || (this.value = this.value instanceof Array ? [] : null, this.toggle());
        }, clearSearch: function clearSearch() {
          this.searchValue = "", this.$els.search.focus();
        }, checkValue: function checkValue() {
          !this.multiple || this.value instanceof Array || (this.value = null === this.value || void 0 === this.value ? [] : [this.value]), !this.multiple && this.value instanceof Array && (this.value = this.value.length ? this.value.pop() : null), this.limit < 1 && (this.limit = 1), this.values.length > this.limit && (this.value = this.value.slice(0, this.limit));
        }, isSelected: function isSelected(e) {
          return this.values.indexOf(e) > -1;
        }, select: function select(e) {
          this.value instanceof Array ? (~this.value.indexOf(e) ? this.value.$remove(e) : this.value.push(e), this.closeOnSelect && this.toggle()) : (this.value = e, this.toggle());
        }, toggle: function toggle() {
          this.show = !this.show;
        }, update: function update() {
          var e = this;this.url && (this.loading = !0, (0, l.getJSON)(this.url).then(function (t) {
            var n = [],
                o = !0,
                i = !1,
                r = void 0;try {
              for (var a, l = (0, s["default"])(t); !(o = (a = l.next()).done); o = !0) {
                var c = a.value;void 0 !== c.value && void 0 !== c.label && n.push(c);
              }
            } catch (u) {
              i = !0, r = u;
            } finally {
              try {
                !o && l["return"] && l["return"]();
              } finally {
                if (i) throw r;
              }
            }e.options = n, n.length || (e.value = e.value instanceof Array ? [] : null);
          }).always(function () {
            e.loading = !1, e.checkValue();
          }));
        }, validate: function validate() {
          return !this.required || (this.value instanceof Array ? this.value.length > 0 : null !== this.value);
        } }, created: function created() {
        this._select = !0, void 0 !== this.value && this.parent || (this.value = null), !this.multiple && this.value instanceof Array && (this.value = this.value.shift()), this.checkValue(), this.url && this.update();for (var e = this.$parent; e && !e._formGroup;) {
          e = e.$parent;
        }e && e._formGroup && (e.children.push(this), this._parent = e);
      }, ready: function ready() {
        var e = this;(0, u["default"])(this.$els.select).onBlur(function (t) {
          e.show = !1;
        });
      }, beforeDestroy: function beforeDestroy() {
        this._parent && this._parent.children.$remove(this), (0, u["default"])(this.$els.select).offBlur();
      } };
  }, function (e, t, n) {
    "use strict";
    function o(e) {
      return e && e.__esModule ? e : { "default": e };
    }t.__esModule = !0;var i = n(46),
        r = o(i),
        a = n(184),
        s = o(a),
        l = "function" == typeof s["default"] && "symbol" == _typeof(r["default"]) ? function (e) {
      return typeof e === "undefined" ? "undefined" : _typeof(e);
    } : function (e) {
      return e && "function" == typeof s["default"] && e.constructor === s["default"] ? "symbol" : typeof e === "undefined" ? "undefined" : _typeof(e);
    };t["default"] = "function" == typeof s["default"] && "symbol" === l(r["default"]) ? function (e) {
      return "undefined" == typeof e ? "undefined" : l(e);
    } : function (e) {
      return e && "function" == typeof s["default"] && e.constructor === s["default"] ? "symbol" : "undefined" == typeof e ? "undefined" : l(e);
    };
  }, function (e, t, n) {
    e.exports = { "default": n(185), __esModule: !0 };
  }, function (e, t, n) {
    n(186), n(195), n(196), n(197), e.exports = n(33).Symbol;
  }, function (e, t, n) {
    "use strict";
    var o = n(32),
        i = n(55),
        r = n(41),
        a = n(31),
        s = n(54),
        l = n(187).KEY,
        c = n(42),
        u = n(69),
        d = n(73),
        p = n(70),
        f = n(74),
        h = n(81),
        v = n(188),
        y = n(189),
        b = n(190),
        m = n(193),
        g = n(38),
        x = n(62),
        w = n(44),
        _ = n(45),
        k = n(58),
        S = n(86),
        M = n(194),
        O = n(37),
        $ = n(60),
        D = M.f,
        j = O.f,
        C = S.f,
        _N = o.Symbol,
        B = o.JSON,
        L = B && B.stringify,
        A = "prototype",
        P = f("_hidden"),
        T = f("toPrimitive"),
        E = {}.propertyIsEnumerable,
        R = u("symbol-registry"),
        z = u("symbols"),
        I = u("op-symbols"),
        V = Object[A],
        W = "function" == typeof _N,
        F = o.QObject,
        Y = !F || !F[A] || !F[A].findChild,
        X = r && c(function () {
      return 7 != k(j({}, "a", { get: function get() {
          return j(this, "a", { value: 7 }).a;
        } })).a;
    }) ? function (e, t, n) {
      var o = D(V, t);o && delete V[t], j(e, t, n), o && e !== V && j(V, t, o);
    } : j,
        H = function H(e) {
      var t = z[e] = k(_N[A]);return t._k = e, t;
    },
        G = W && "symbol" == _typeof(_N.iterator) ? function (e) {
      return "symbol" == (typeof e === "undefined" ? "undefined" : _typeof(e));
    } : function (e) {
      return e instanceof _N;
    },
        q = function q(e, t, n) {
      return e === V && q(I, t, n), g(e), t = w(t, !0), g(n), i(z, t) ? (n.enumerable ? (i(e, P) && e[P][t] && (e[P][t] = !1), n = k(n, { enumerable: _(0, !1) })) : (i(e, P) || j(e, P, _(1, {})), e[P][t] = !0), X(e, t, n)) : j(e, t, n);
    },
        U = function U(e, t) {
      g(e);for (var n, o = b(t = x(t)), i = 0, r = o.length; r > i;) {
        q(e, n = o[i++], t[n]);
      }return e;
    },
        J = function J(e, t) {
      return void 0 === t ? k(e) : U(k(e), t);
    },
        Z = function Z(e) {
      var t = E.call(this, e = w(e, !0));return !(this === V && i(z, e) && !i(I, e)) && (!(t || !i(this, e) || !i(z, e) || i(this, P) && this[P][e]) || t);
    },
        K = function K(e, t) {
      if (e = x(e), t = w(t, !0), e !== V || !i(z, t) || i(I, t)) {
        var n = D(e, t);return !n || !i(z, t) || i(e, P) && e[P][t] || (n.enumerable = !0), n;
      }
    },
        Q = function Q(e) {
      for (var t, n = C(x(e)), o = [], r = 0; n.length > r;) {
        i(z, t = n[r++]) || t == P || t == l || o.push(t);
      }return o;
    },
        ee = function ee(e) {
      for (var t, n = e === V, o = C(n ? I : x(e)), r = [], a = 0; o.length > a;) {
        !i(z, t = o[a++]) || n && !i(V, t) || r.push(z[t]);
      }return r;
    };W || (_N = function N() {
      if (this instanceof _N) throw TypeError("Symbol is not a constructor!");var e = p(arguments.length > 0 ? arguments[0] : void 0),
          t = function t(n) {
        this === V && t.call(I, n), i(this, P) && i(this[P], e) && (this[P][e] = !1), X(this, e, _(1, n));
      };return r && Y && X(V, e, { configurable: !0, set: t }), H(e);
    }, s(_N[A], "toString", function () {
      return this._k;
    }), M.f = K, O.f = q, n(87).f = S.f = Q, n(192).f = Z, n(191).f = ee, r && !n(53) && s(V, "propertyIsEnumerable", Z, !0), h.f = function (e) {
      return H(f(e));
    }), a(a.G + a.W + a.F * !W, { Symbol: _N });for (var te = "hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","), ne = 0; te.length > ne;) {
      f(te[ne++]);
    }for (var te = $(f.store), ne = 0; te.length > ne;) {
      v(te[ne++]);
    }a(a.S + a.F * !W, "Symbol", { "for": function _for(e) {
        return i(R, e += "") ? R[e] : R[e] = _N(e);
      }, keyFor: function keyFor(e) {
        if (G(e)) return y(R, e);throw TypeError(e + " is not a symbol!");
      }, useSetter: function useSetter() {
        Y = !0;
      }, useSimple: function useSimple() {
        Y = !1;
      } }), a(a.S + a.F * !W, "Object", { create: J, defineProperty: q, defineProperties: U, getOwnPropertyDescriptor: K, getOwnPropertyNames: Q, getOwnPropertySymbols: ee }), B && a(a.S + a.F * (!W || c(function () {
      var e = _N();return "[null]" != L([e]) || "{}" != L({ a: e }) || "{}" != L(Object(e));
    })), "JSON", { stringify: function stringify(e) {
        if (void 0 !== e && !G(e)) {
          for (var t, n, o = [e], i = 1; arguments.length > i;) {
            o.push(arguments[i++]);
          }return t = o[1], "function" == typeof t && (n = t), !n && m(t) || (t = function t(e, _t2) {
            if (n && (_t2 = n.call(this, e, _t2)), !G(_t2)) return _t2;
          }), o[1] = t, L.apply(B, o);
        }
      } }), _N[A][T] || n(36)(_N[A], T, _N[A].valueOf), d(_N, "Symbol"), d(Math, "Math", !0), d(o.JSON, "JSON", !0);
  }, function (e, t, n) {
    var o = n(70)("meta"),
        i = n(39),
        r = n(55),
        a = n(37).f,
        s = 0,
        l = Object.isExtensible || function () {
      return !0;
    },
        c = !n(42)(function () {
      return l(Object.preventExtensions({}));
    }),
        u = function u(e) {
      a(e, o, { value: { i: "O" + ++s, w: {} } });
    },
        d = function d(e, t) {
      if (!i(e)) return "symbol" == (typeof e === "undefined" ? "undefined" : _typeof(e)) ? e : ("string" == typeof e ? "S" : "P") + e;if (!r(e, o)) {
        if (!l(e)) return "F";if (!t) return "E";u(e);
      }return e[o].i;
    },
        p = function p(e, t) {
      if (!r(e, o)) {
        if (!l(e)) return !0;if (!t) return !1;u(e);
      }return e[o].w;
    },
        f = function f(e) {
      return c && h.NEED && l(e) && !r(e, o) && u(e), e;
    },
        h = e.exports = { KEY: o, NEED: !1, fastKey: d, getWeak: p, onFreeze: f };
  }, function (e, t, n) {
    var o = n(32),
        i = n(33),
        r = n(53),
        a = n(81),
        s = n(37).f;e.exports = function (e) {
      var t = i.Symbol || (i.Symbol = r ? {} : o.Symbol || {});"_" == e.charAt(0) || e in t || s(t, e, { value: a.f(e) });
    };
  }, function (e, t, n) {
    var o = n(60),
        i = n(62);e.exports = function (e, t) {
      for (var n, r = i(e), a = o(r), s = a.length, l = 0; s > l;) {
        if (r[n = a[l++]] === t) return n;
      }
    };
  }, function (e, t, n) {
    var o = n(60),
        i = n(191),
        r = n(192);e.exports = function (e) {
      var t = o(e),
          n = i.f;if (n) for (var a, s = n(e), l = r.f, c = 0; s.length > c;) {
        l.call(e, a = s[c++]) && t.push(a);
      }return t;
    };
  }, function (e, t) {
    t.f = Object.getOwnPropertySymbols;
  }, function (e, t) {
    t.f = {}.propertyIsEnumerable;
  }, function (e, t, n) {
    var o = n(64);e.exports = Array.isArray || function (e) {
      return "Array" == o(e);
    };
  }, function (e, t, n) {
    var o = n(192),
        i = n(45),
        r = n(62),
        a = n(44),
        s = n(55),
        l = n(40),
        c = Object.getOwnPropertyDescriptor;t.f = n(41) ? c : function (e, t) {
      if (e = r(e), t = a(t, !0), l) try {
        return c(e, t);
      } catch (n) {}if (s(e, t)) return i(!o.f.call(e, t), e[t]);
    };
  }, function (e, t) {}, function (e, t, n) {
    n(188)("asyncIterator");
  }, function (e, t, n) {
    n(188)("observable");
  }, function (e, t) {
    e.exports = '<div v-el:select="" :class="{\'btn-group btn-group-justified\': justified, \'btn-select\': !justified}" _v-e514dbc6=""> <slot name=before _v-e514dbc6=""></slot> <div :class={open:show,dropdown:!justified} _v-e514dbc6=""> <select v-el:sel="" v-model=value v-show=show name={{name}} class=secret :multiple=multiple :required=required :readonly=readonly :disabled=disabled _v-e514dbc6=""> <option v-if=required value="" _v-e514dbc6=""></option> <option v-for="option in options" :value=option.value||option _v-e514dbc6="">{{ option.label||option }}</option> </select> <button type=button class="form-control dropdown-toggle" :disabled="disabled || !hasParent" :readonly=readonly @click=toggle() @keyup.esc="show = false" _v-e514dbc6=""> <span class=btn-content _v-e514dbc6="">{{ loading ? text.loading : showPlaceholder || selectedItems }}</span> <span class=caret _v-e514dbc6=""></span> <span v-if=clearButton&amp;&amp;values.length class=close @click=clear() _v-e514dbc6="">×</span> </button> <ul class=dropdown-menu _v-e514dbc6=""> <template v-if=options.length _v-e514dbc6=""> <li v-if=canSearch class=bs-searchbox _v-e514dbc6=""> <input type=text placeholder={{searchText||text.search}} class=form-control autocomplete=off v-el:search="" v-model=searchValue @keyup.esc="show = false" _v-e514dbc6=""> <span v-show=searchValue class=close @click=clearSearch _v-e514dbc6="">×</span> </li> <li v-if=required&amp;&amp;!clearButton _v-e514dbc6=""><a @mousedown.prevent="clear() &amp;&amp; blur()" _v-e514dbc6="">{{ placeholder || text.notSelected }}</a></li> <li v-for="option in options | filterBy searchValue" :id=option.value||option _v-e514dbc6=""> <a @mousedown.prevent=select(option.value||option) _v-e514dbc6=""> <span v-html=option.label||option _v-e514dbc6=""></span> <span class="glyphicon glyphicon-ok check-mark" v-show=isSelected(option.value||option) _v-e514dbc6=""></span> </a> </li> </template> <slot _v-e514dbc6=""></slot> <div v-if="showNotify &amp;&amp; !closeOnSelect" class="notify in" transition=fadein _v-e514dbc6="">{{limitText}}</div> </ul> <div v-if="showNotify &amp;&amp; closeOnSelect" class="notify out" transition=fadein _v-e514dbc6=""><div _v-e514dbc6="">{{limitText}}</div></div> </div> <slot name=after _v-e514dbc6=""></slot> </div>';
  }, function (e, t, n) {
    e.exports = n(200), e.exports.__esModule && (e.exports = e.exports["default"]), ("function" == typeof e.exports ? e.exports.options : e.exports).template = n(201);
  }, function (e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 }), t["default"] = { data: function data() {
        return { index: 0, show: !1 };
      }, computed: { show: function show() {
          return this.$parent.index === this.index;
        } }, ready: function ready() {
        for (var e in this.$parent.$children) {
          if (this.$parent.$children[e] === this) {
            this.index = parseInt(e, 10);break;
          }
        }this.$parent.indicator.push(this.index), 0 === this.index && this.$el.classList.add("active");
      } };
  }, function (e, t) {
    e.exports = "<div class=item> <slot></slot> </div>";
  }, function (e, t, n) {
    e.exports = n(203), e.exports.__esModule && (e.exports = e.exports["default"]), ("function" == typeof e.exports ? e.exports.options : e.exports).template = n(206);
  }, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 }), n(204);var o = n(97),
        i = 500;t["default"] = { props: { size: { type: String, "default": "md" }, text: { type: String, "default": "" }, fixed: { type: Boolean, coerce: o.coerce["boolean"], "default": !1 } }, data: function data() {
        return { active: !1 };
      }, computed: { spinnerSize: function spinnerSize() {
          return this.size ? "spinner-" + this.size : "spinner-sm";
        } }, ready: function ready() {
        this._body = document.querySelector("body"), this._bodyOverflow = this._body.style.overflowY || "";
      }, methods: { getMinWait: function getMinWait(e) {
          return e = e || 0, new Date().getTime() - this._started.getTime() < i ? i - parseInt(new Date().getTime() - this._started.getTime(), 10) + e : 0 + e;
        }, show: function show(e) {
          e && e.text && (this.text = e.text), e && e.size && (this.size = e.size), e && e.fixed && (this.fixed = e.fixed), this._body.style.overflowY = "hidden", this._started = new Date(), this.active = !0, this.$root.$broadcast("shown::spinner");
        }, hide: function hide() {
          var e = this,
              t = 0;this._spinnerAnimation = setTimeout(function () {
            e.active = !1, e._body.style.overflowY = e._bodyOverflow, e.$root.$broadcast("hidden::spinner");
          }, this.getMinWait(t));
        } }, events: { "show::spinner": function showSpinner(e) {
          this.show(e);
        }, "hide::spinner": function hideSpinner() {
          this.hide();
        }, "start::ajax": function startAjax(e) {
          this.show(e);
        }, "end::ajax": function endAjax() {
          this.hide();
        } }, beforeDestroy: function beforeDestroy() {
        clearTimeout(this._spinnerAnimation), this._body.style.overflowY = this._bodyOverflow;
      } };
  }, function (e, t, n) {
    var o = n(205);"string" == typeof o && (o = [[e.id, o, ""]]);n(106)(o, {});o.locals && (e.exports = o.locals);
  }, function (e, t, n) {
    t = e.exports = n(105)(), t.push([e.id, '/*!\r\n *\r\n * Spinner\r\n * With fallback to IE9\r\n *\r\n */@keyframes spin{to{transform:rotate(1turn)}}.spinner-gritcode{top:0;left:0;bottom:0;right:0;z-index:9998;position:absolute;width:100%;text-align:center;background:hsla(0,0%,100%,.9)}.spinner-gritcode.spinner-fixed{position:fixed}.spinner-gritcode .spinner-wrapper{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);-ms-transform:translate(-50%,-50%)}.spinner-gritcode .spinner-circle{position:relative;border:4px solid #ccc;border-right-color:#337ab7;border-radius:50%;display:inline-block;animation:spin .6s linear;animation-iteration-count:infinite;width:3em;height:3em;z-index:2}.spinner-gritcode .spinner-text{position:relative;text-align:center;margin-top:.5em;z-index:2;width:100%;font-size:95%;color:#337ab7}.spinner-gritcode.spinner-sm .spinner-circle{width:1.5em;height:1.5em}.spinner-gritcode.spinner-md .spinner-circle{width:2em;height:2em}.spinner-gritcode.spinner-lg .spinner-circle{width:2.5em;height:2.5em}.spinner-gritcode.spinner-xl .spinner-circle{width:3.5em;height:3.5em}.ie9 .spinner-gritcode .spinner-circle,.lt-ie10 .spinner-gritcode .spinner-circle,.no-csstransforms3d .spinner-gritcode .spinner-circle,.no-csstransitions .spinner-gritcode .spinner-circle,.oldie .spinner-gritcode .spinner-circle{background:url("http://i2.wp.com/www.thegreatnovelingadventure.com/wp-content/plugins/wp-polls/images/loading.gif") 50% no-repeat;animation:none;margin-left:0;margin-top:5px;border:none;width:32px;height:32px}', ""]);
  }, function (e, t) {
    e.exports = "<div :class=\"['spinner spinner-gritcode',spinnerSize,{'spinner-fixed':fixed}]\" v-show=active> <div class=spinner-wrapper> <div class=spinner-circle></div> <div class=spinner-text>{{text}}</div> </div> </div>";
  }, function (e, t, n) {
    e.exports = n(208), e.exports.__esModule && (e.exports = e.exports["default"]), ("function" == typeof e.exports ? e.exports.options : e.exports).template = n(209);
  }, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });var o = n(97);t["default"] = { props: { header: { type: String }, disabled: { type: Boolean, coerce: o.coerce["boolean"], "default": !1 } }, computed: { active: function active() {
          return this._tabset.show === this;
        }, index: function index() {
          return this._tabset.tabs.indexOf(this);
        }, show: function show() {
          return this._tabset && this._tabset.show === this;
        }, transition: function transition() {
          return this._tabset ? this._tabset.effect : null;
        } }, created: function created() {
        this._ingroup = this.$parent && this.$parent._tabgroup;for (var e = this; e && e._tabset !== !0 && e.$parent;) {
          e = e.$parent;
        }e._tabset ? (e.tabs.push(this), this._ingroup ? ~e.headers.indexOf(this.$parent) || e.headers.push(this.$parent) : e.headers.push(this), this._tabset = e) : (this._tabset = {}, console.warn('Warning: "tab" depend on "tabset" to work properly.')), this._ingroup && this.$parent.tabs.push(this);
      }, beforeDestroy: function beforeDestroy() {
        this._tabset.active === this.index && (this._tabset.active = 0), this._tabset.tabs.$remove(this);
      } };
  }, function (e, t) {
    e.exports = '<div role=tabpanel class="tab-pane active" v-show=show :class={hide:!show} :transition=transition> <slot></slot> </div>';
  }, function (e, t, n) {
    n(211), e.exports = n(213), e.exports.__esModule && (e.exports = e.exports["default"]), ("function" == typeof e.exports ? e.exports.options : e.exports).template = n(214);
  }, function (e, t, n) {
    var o = n(212);"string" == typeof o && (o = [[e.id, o, ""]]);n(106)(o, {});o.locals && (e.exports = o.locals);
  }, function (e, t, n) {
    t = e.exports = n(105)(), t.push([e.id, ".nav-tabs[_v-55faf3cb]{margin-bottom:15px}", ""]);
  }, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });var o = n(97);t["default"] = { props: { disabled: { type: Boolean, coerce: o.coerce["boolean"], "default": !1 }, header: { type: String } }, data: function data() {
        return { tabs: [], show: !1 };
      }, computed: { active: function active() {
          return ~this.tabs.indexOf(this._tabset.show);
        } }, created: function created() {
        this._tabgroup = !0;var e = this.$parent && this.$parent._tabset === !0 ? this.$parent : {};for (this.$parent && this.$parent._tabgroup && console.error("Can't nest tabgroups."); e && !e._tabset && e.$parent;) {
          e = e.$parent;
        }e._tabset ? this._tabset = e : (this._tabset = {}, this.show = !0, console.warn("Warning: tabgroup depend on tabset to work properly."));
      }, methods: { blur: function blur() {
          this.show = !1;
        }, toggle: function toggle() {
          this.show = !this.show;
        } } };
  }, function (e, t) {
    e.exports = '<slot _v-55faf3cb=""></slot>';
  }, function (e, t, n) {
    n(216), e.exports = n(218), e.exports.__esModule && (e.exports = e.exports["default"]), ("function" == typeof e.exports ? e.exports.options : e.exports).template = n(219);
  }, function (e, t, n) {
    var o = n(217);"string" == typeof o && (o = [[e.id, o, ""]]);n(106)(o, {});o.locals && (e.exports = o.locals);
  }, function (e, t, n) {
    t = e.exports = n(105)(), t.push([e.id, ".nav-tabs[_v-09e2754e]{margin-bottom:15px}", ""]);
  }, function (e, t, n) {
    "use strict";
    function o(e) {
      return e && e.__esModule ? e : { "default": e };
    }Object.defineProperty(t, "__esModule", { value: !0 });var i = n(97),
        r = n(132),
        a = o(r);t["default"] = { components: { dropdown: a["default"] }, props: { navStyle: { type: String, "default": "tabs" }, effect: { type: String, "default": "fadein" }, active: { twoWay: !0, type: Number, coerce: i.coerce.number, "default": 0 } }, data: function data() {
        return { show: null, headers: [], tabs: [] };
      }, created: function created() {
        this._tabset = !0;
      }, watch: { active: function active(e) {
          this.show = this.tabs[e];
        } }, ready: function ready() {
        this.show = this.tabs[this.active];
      }, methods: { select: function select(e) {
          e.disabled || (this.active = e.index);
        } } };
  }, function (e, t) {
    e.exports = ' <ul class="nav nav-{{navStyle}}" role=tablist _v-09e2754e=""> <template v-for="t in headers" _v-09e2754e=""> <li v-if=!t._tabgroup :class="{active:t.active, disabled:t.disabled}" @click.prevent=select(t) _v-09e2754e=""> <a href=# _v-09e2754e=""><slot name=header _v-09e2754e="">{{{t.header}}}</slot></a> </li> <dropdown v-else="" :text=t.header :class={active:t.active} :disabled=t.disabled _v-09e2754e=""> <li v-for="tab in t.tabs" :class={disabled:tab.disabled} _v-09e2754e=""><a href=# @click.prevent=select(tab) _v-09e2754e="">{{tab.header}}</a></li> </dropdown> </template> </ul> <div class=tab-content v-el:tab-content="" _v-09e2754e=""> <slot _v-09e2754e=""></slot> </div>';
  }, function (e, t, n) {
    n(221), e.exports = n(223), e.exports.__esModule && (e.exports = e.exports["default"]), ("function" == typeof e.exports ? e.exports.options : e.exports).template = n(224);
  }, function (e, t, n) {
    var o = n(222);"string" == typeof o && (o = [[e.id, o, ""]]);n(106)(o, {});o.locals && (e.exports = o.locals);
  }, function (e, t, n) {
    t = e.exports = n(105)(), t.push([e.id, ".tooltip{opacity:.9}.fadein-enter{-webkit-animation:fadein-in .3s ease-in;animation:fadein-in .3s ease-in}.fadein-leave{-webkit-animation:fadein-out .3s ease-out;animation:fadein-out .3s ease-out}@-webkit-keyframes fadein-in{0%{opacity:0}to{opacity:.9}}@keyframes fadein-in{0%{opacity:0}to{opacity:.9}}@-webkit-keyframes fadein-out{0%{opacity:.9}to{opacity:0}}@keyframes fadein-out{0%{opacity:.9}to{opacity:0}}", ""]);
  }, function (e, t, n) {
    "use strict";
    function o(e) {
      return e && e.__esModule ? e : { "default": e };
    }Object.defineProperty(t, "__esModule", { value: !0 });var i = n(169),
        r = o(i);t["default"] = { mixins: [r["default"]], props: { trigger: { type: String, "default": "hover" }, effect: { type: String, "default": "scale" } } };
  }, function (e, t) {
    e.exports = "<span v-el:trigger> <slot></slot> </span> <div v-el:popover v-show=show role=tooltip :class=\"['tooltip',placement]\" :transition=effect> <div class=tooltip-arrow></div> <div class=tooltip-inner> <slot name=content>{{{content}}}</slot> </div> </div>";
  }, function (e, t, n) {
    n(226), e.exports = n(228), e.exports.__esModule && (e.exports = e.exports["default"]), ("function" == typeof e.exports ? e.exports.options : e.exports).template = n(229);
  }, function (e, t, n) {
    var o = n(227);"string" == typeof o && (o = [[e.id, o, ""]]);n(106)(o, {});o.locals && (e.exports = o.locals);
  }, function (e, t, n) {
    t = e.exports = n(105)(), t.push([e.id, ".dropdown-menu>li>a{cursor:pointer}", ""]);
  }, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });var o = n(97),
        i = window.Vue;t["default"] = { created: function created() {
        this.items = this.primitiveData;
      }, partials: { "default": '<span v-html="item | highlight query"></span>' }, props: { value: { twoWay: !0, type: String, "default": "" }, data: { type: Array }, limit: { type: Number, "default": 8 }, async: { type: String }, template: { type: String }, templateName: { type: String, "default": "default" }, key: { type: String, "default": null }, matchCase: { type: Boolean, coerce: o.coerce["boolean"], "default": !1 }, matchStart: { type: Boolean, coerce: o.coerce["boolean"], "default": !1 }, onHit: { type: Function, "default": function _default(e) {
            this.reset(), this.value = e;
          } }, placeholder: { type: String } }, data: function data() {
        return { showDropdown: !1, noResults: !0, current: 0, items: [] };
      }, computed: { primitiveData: function primitiveData() {
          var e = this;if (this.data) return this.data.filter(function (t) {
            t = e.matchCase ? t : t.toLowerCase();var n = e.matchCase ? e.value : e.value.toLowerCase();return e.matchStart ? 0 === t.indexOf(n) : t.indexOf(n) !== -1;
          }).slice(0, this.limit);
        } }, ready: function ready() {
        this.templateName && "default" !== this.templateName && i.partial(this.templateName, this.template);
      }, methods: { update: function update() {
          var e = this;return this.value ? (this.data && (this.items = this.primitiveData, this.showDropdown = this.items.length > 0), void (this.async && (0, o.getJSON)(this.async + this.value).then(function (t) {
            e.items = (e.key ? t[e.key] : t).slice(0, e.limit), e.showDropdown = e.items.length > 0;
          }))) : (this.reset(), !1);
        }, reset: function reset() {
          this.items = [], this.value = "", this.loading = !1, this.showDropdown = !1;
        }, setActive: function setActive(e) {
          this.current = e;
        }, isActive: function isActive(e) {
          return this.current === e;
        }, hit: function hit(e) {
          e.preventDefault(), this.onHit(this.items[this.current], this);
        }, up: function up() {
          this.current > 0 && this.current--;
        }, down: function down() {
          this.current < this.items.length - 1 && this.current++;
        } }, filters: { highlight: function highlight(e, t) {
          return e.replace(new RegExp("(" + t + ")", "gi"), "<strong>$1</strong>");
        } } };
  }, function (e, t) {
    e.exports = '<div style="position: relative" v-bind:class="{\'open\':showDropdown}"> <input type=text class=form-control :placeholder=placeholder autocomplete=off v-model=value @input=update @keydown.up=up @keydown.down=down @keydown.enter=hit @keydown.esc=reset @blur="showDropdown = false"/> <ul class=dropdown-menu v-el:dropdown> <li v-for="item in items" v-bind:class="{\'active\': isActive($index)}"> <a @mousedown.prevent=hit @mousemove=setActive($index)> <partial :name=templateName></partial> </a> </li> </ul> </div>';
  }]);
});

},{}],28:[function(require,module,exports){
(function (process){
/*!
 * vue-validator v2.1.7
 * (c) 2016 kazuya kawaguchi
 * Released under the MIT License.
 */
'use strict';

var babelHelpers = {};
babelHelpers.typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
};

babelHelpers.classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

babelHelpers.createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

babelHelpers.inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

babelHelpers.possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

babelHelpers;
/**
 * Utilties
 */

// export default for holding the Vue reference
var exports$1 = {};
/**
 * warn
 *
 * @param {String} msg
 * @param {Error} [err]
 *
 */

function warn(msg, err) {
  if (window.console) {
    console.warn('[vue-validator] ' + msg);
    if (err) {
      console.warn(err.stack);
    }
  }
}

/**
 * empty
 *
 * @param {Array|Object} target
 * @return {Boolean}
 */

function empty(target) {
  if (target === null || target === undefined) {
    return true;
  }

  if (Array.isArray(target)) {
    if (target.length > 0) {
      return false;
    }
    if (target.length === 0) {
      return true;
    }
  } else if (exports$1.Vue.util.isPlainObject(target)) {
    for (var key in target) {
      if (exports$1.Vue.util.hasOwn(target, key)) {
        return false;
      }
    }
  }

  return true;
}

/**
 * each
 *
 * @param {Array|Object} target
 * @param {Function} iterator
 * @param {Object} [context]
 */

function each(target, iterator, context) {
  if (Array.isArray(target)) {
    for (var i = 0; i < target.length; i++) {
      iterator.call(context || target[i], target[i], i);
    }
  } else if (exports$1.Vue.util.isPlainObject(target)) {
    var hasOwn = exports$1.Vue.util.hasOwn;
    for (var key in target) {
      if (hasOwn(target, key)) {
        iterator.call(context || target[key], target[key], key);
      }
    }
  }
}

/**
 * pull
 *
 * @param {Array} arr
 * @param {Object} item
 * @return {Object|null}
 */

function pull(arr, item) {
  var index = exports$1.Vue.util.indexOf(arr, item);
  return ~index ? arr.splice(index, 1) : null;
}

/**
 * trigger
 *
 * @param {Element} el
 * @param {String} event
 * @param {Object} [args]
 */

function trigger(el, event, args) {
  var e = document.createEvent('HTMLEvents');
  e.initEvent(event, true, false);

  if (args) {
    for (var prop in args) {
      e[prop] = args[prop];
    }
  }

  // Due to Firefox bug, events fired on disabled
  // non-attached form controls can throw errors
  try {
    el.dispatchEvent(e);
  } catch (e) {}
}

/**
 * Forgiving check for a promise
 *
 * @param {Object} p
 * @return {Boolean}
 */

function isPromise(p) {
  return p && typeof p.then === 'function';
}

/**
 * Togging classes
 *
 * @param {Element} el
 * @param {String} key
 * @param {Function} fn
 */

function toggleClasses(el, key, fn) {
  key = key.trim();
  if (key.indexOf(' ') === -1) {
    fn(el, key);
    return;
  }

  var keys = key.split(/\s+/);
  for (var i = 0, l = keys.length; i < l; i++) {
    fn(el, keys[i]);
  }
}

/**
 * Fundamental validate functions
 */

/**
 * required
 *
 * This function validate whether the value has been filled out.
 *
 * @param {*} val
 * @return {Boolean}
 */

function required(val) {
  if (Array.isArray(val)) {
    if (val.length !== 0) {
      var valid = true;
      for (var i = 0, l = val.length; i < l; i++) {
        valid = required(val[i]);
        if (!valid) {
          break;
        }
      }
      return valid;
    } else {
      return false;
    }
  } else if (typeof val === 'number' || typeof val === 'function') {
    return true;
  } else if (typeof val === 'boolean') {
    return val;
  } else if (typeof val === 'string') {
    return val.length > 0;
  } else if (val !== null && (typeof val === 'undefined' ? 'undefined' : babelHelpers.typeof(val)) === 'object') {
    return Object.keys(val).length > 0;
  } else if (val === null || val === undefined) {
    return false;
  }
}

/**
 * pattern
 *
 * This function validate whether the value matches the regex pattern
 *
 * @param val
 * @param {String} pat
 * @return {Boolean}
 */

function pattern(val, pat) {
  if (typeof pat !== 'string') {
    return false;
  }

  var match = pat.match(new RegExp('^/(.*?)/([gimy]*)$'));
  if (!match) {
    return false;
  }

  return new RegExp(match[1], match[2]).test(val);
}

/**
 * minlength
 *
 * This function validate whether the minimum length.
 *
 * @param {String|Array} val
 * @param {String|Number} min
 * @return {Boolean}
 */

function minlength(val, min) {
  if (typeof val === 'string') {
    return isInteger(min, 10) && val.length >= parseInt(min, 10);
  } else if (Array.isArray(val)) {
    return val.length >= parseInt(min, 10);
  } else {
    return false;
  }
}

/**
 * maxlength
 *
 * This function validate whether the maximum length.
 *
 * @param {String|Array} val
 * @param {String|Number} max
 * @return {Boolean}
 */

function maxlength(val, max) {
  if (typeof val === 'string') {
    return isInteger(max, 10) && val.length <= parseInt(max, 10);
  } else if (Array.isArray(val)) {
    return val.length <= parseInt(max, 10);
  } else {
    return false;
  }
}

/**
 * min
 *
 * This function validate whether the minimum value of the numberable value.
 *
 * @param {*} val
 * @param {*} arg minimum
 * @return {Boolean}
 */

function min(val, arg) {
  return !isNaN(+val) && !isNaN(+arg) && +val >= +arg;
}

/**
 * max
 *
 * This function validate whether the maximum value of the numberable value.
 *
 * @param {*} val
 * @param {*} arg maximum
 * @return {Boolean}
 */

function max(val, arg) {
  return !isNaN(+val) && !isNaN(+arg) && +val <= +arg;
}

/**
 * isInteger
 *
 * This function check whether the value of the string is integer.
 *
 * @param {String} val
 * @return {Boolean}
 * @private
 */

function isInteger(val) {
  return (/^(-?[1-9]\d*|0)$/.test(val)
  );
}

var validators = Object.freeze({
  required: required,
  pattern: pattern,
  minlength: minlength,
  maxlength: maxlength,
  min: min,
  max: max
});

function Asset (Vue) {
  var extend = Vue.util.extend;

  // set global validators asset
  var assets = Object.create(null);
  extend(assets, validators);
  Vue.options.validators = assets;

  // set option merge strategy
  var strats = Vue.config.optionMergeStrategies;
  if (strats) {
    strats.validators = function (parent, child) {
      if (!child) {
        return parent;
      }
      if (!parent) {
        return child;
      }
      var ret = Object.create(null);
      extend(ret, parent);
      for (var key in child) {
        ret[key] = child[key];
      }
      return ret;
    };
  }

  /**
   * Register or retrieve a global validator definition.
   *
   * @param {String} id
   * @param {Function} definition
   */

  Vue.validator = function (id, definition) {
    if (!definition) {
      return Vue.options['validators'][id];
    } else {
      Vue.options['validators'][id] = definition;
    }
  };
}

function Override (Vue) {
  // override _init
  var init = Vue.prototype._init;
  Vue.prototype._init = function (options) {
    if (!this._validatorMaps) {
      this._validatorMaps = Object.create(null);
    }
    init.call(this, options);
  };

  // override _destroy
  var destroy = Vue.prototype._destroy;
  Vue.prototype._destroy = function () {
    destroy.apply(this, arguments);
    this._validatorMaps = null;
  };
}

var VALIDATE_UPDATE = '__vue-validator-validate-update__';
var PRIORITY_VALIDATE = 4096;
var PRIORITY_VALIDATE_CLASS = 32;
var REGEX_FILTER = /[^|]\|[^|]/;
var REGEX_VALIDATE_DIRECTIVE = /^v-validate(?:$|:(.*)$)/;
var REGEX_EVENT = /^v-on:|^@/;

var classId = 0; // ID for validation class


function ValidateClass (Vue) {
  var vIf = Vue.directive('if');
  var FragmentFactory = Vue.FragmentFactory;
  var _Vue$util = Vue.util;
  var toArray = _Vue$util.toArray;
  var replace = _Vue$util.replace;
  var createAnchor = _Vue$util.createAnchor;

  /**
   * `v-validate-class` directive
   */

  Vue.directive('validate-class', {
    terminal: true,
    priority: vIf.priority + PRIORITY_VALIDATE_CLASS,

    bind: function bind() {
      var _this = this;

      var id = String(classId++);
      this.setClassIds(this.el, id);

      this.vm.$on(VALIDATE_UPDATE, this.cb = function (classIds, validation, results) {
        if (classIds.indexOf(id) > -1) {
          validation.updateClasses(results, _this.frag.node);
        }
      });

      this.setupFragment();
    },
    unbind: function unbind() {
      this.vm.$off(VALIDATE_UPDATE, this.cb);
      this.teardownFragment();
    },
    setClassIds: function setClassIds(el, id) {
      var childNodes = toArray(el.childNodes);
      for (var i = 0, l = childNodes.length; i < l; i++) {
        var element = childNodes[i];
        if (element.nodeType === 1) {
          var hasAttrs = element.hasAttributes();
          var attrs = hasAttrs && toArray(element.attributes);
          for (var k = 0, _l = attrs.length; k < _l; k++) {
            var attr = attrs[k];
            if (attr.name.match(REGEX_VALIDATE_DIRECTIVE)) {
              var existingId = element.getAttribute(VALIDATE_UPDATE);
              var value = existingId ? existingId + ',' + id : id;
              element.setAttribute(VALIDATE_UPDATE, value);
            }
          }
        }

        if (element.hasChildNodes()) {
          this.setClassIds(element, id);
        }
      }
    },
    setupFragment: function setupFragment() {
      this.anchor = createAnchor('v-validate-class');
      replace(this.el, this.anchor);

      this.factory = new FragmentFactory(this.vm, this.el);
      this.frag = this.factory.create(this._host, this._scope, this._frag);
      this.frag.before(this.anchor);
    },
    teardownFragment: function teardownFragment() {
      if (this.frag) {
        this.frag.remove();
        this.frag = null;
        this.factory = null;
      }

      replace(this.anchor, this.el);
      this.anchor = null;
    }
  });
}

function Validate (Vue) {
  var FragmentFactory = Vue.FragmentFactory;
  var parseDirective = Vue.parsers.directive.parseDirective;
  var _Vue$util = Vue.util;
  var inBrowser = _Vue$util.inBrowser;
  var bind = _Vue$util.bind;
  var on = _Vue$util.on;
  var off = _Vue$util.off;
  var createAnchor = _Vue$util.createAnchor;
  var replace = _Vue$util.replace;
  var camelize = _Vue$util.camelize;
  var isPlainObject = _Vue$util.isPlainObject;

  // Test for IE10/11 textarea placeholder clone bug

  function checkTextareaCloneBug() {
    if (inBrowser) {
      var t = document.createElement('textarea');
      t.placeholder = 't';
      return t.cloneNode(true).value === 't';
    } else {
      return false;
    }
  }
  var hasTextareaCloneBug = checkTextareaCloneBug();

  /**
   * `v-validate` directive
   */

  Vue.directive('validate', {
    deep: true,
    terminal: true,
    priority: PRIORITY_VALIDATE,
    params: ['group', 'field', 'detect-blur', 'detect-change', 'initial', 'classes'],

    paramWatchers: {
      detectBlur: function detectBlur(val, old) {
        if (this._invalid) {
          return;
        }
        this.validation.detectBlur = this.isDetectBlur(val);
        this.validator.validate(this.field);
      },
      detectChange: function detectChange(val, old) {
        if (this._invalid) {
          return;
        }
        this.validation.detectChange = this.isDetectChange(val);
        this.validator.validate(this.field);
      }
    },

    bind: function bind() {
      var el = this.el;

      if (process.env.NODE_ENV !== 'production' && el.__vue__) {
        warn('v-validate="' + this.expression + '" cannot be used on an instance root element.');
        this._invalid = true;
        return;
      }

      if (process.env.NODE_ENV !== 'production' && (el.hasAttribute('v-if') || el.hasAttribute('v-for'))) {
        warn('v-validate cannot be used `v-if` or `v-for` build-in terminal directive ' + 'on an element. these is wrapped with `<template>` or other tags: ' + '(e.g. <validator name="validator">' + '<template v-if="hidden">' + '<input type="text" v-validate:field1="[\'required\']">' + '</template>' + '</validator>).');
        this._invalid = true;
        return;
      }

      if (process.env.NODE_ENV !== 'production' && !(this.arg || this.params.field)) {
        warn('you need specify field name for v-validate directive.');
        this._invalid = true;
        return;
      }

      var validatorName = this.vm.$options._validator;
      if (process.env.NODE_ENV !== 'production' && !validatorName) {
        warn('you need to wrap the elements to be validated in a <validator> element: ' + '(e.g. <validator name="validator">' + '<input type="text" v-validate:field1="[\'required\']">' + '</validator>).');
        this._invalid = true;
        return;
      }

      var raw = el.getAttribute('v-model');

      var _parseModelRaw = this.parseModelRaw(raw);

      var model = _parseModelRaw.model;
      var filters = _parseModelRaw.filters;

      this.model = model;

      this.setupFragment();
      this.setupValidate(validatorName, model, filters);
      this.listen();
    },
    update: function update(value, old) {
      if (!value || this._invalid) {
        return;
      }

      if (isPlainObject(value) || old && isPlainObject(old)) {
        this.handleObject(value, old, this.params.initial);
      } else if (Array.isArray(value) || old && Array.isArray(old)) {
        this.handleArray(value, old, this.params.initial);
      }

      var options = { field: this.field };
      if (this.frag) {
        options.el = this.frag.node;
      }
      this.validator.validate(options);
    },
    unbind: function unbind() {
      if (this._invalid) {
        return;
      }

      this.unlisten();
      this.teardownValidate();
      this.teardownFragment();

      this.model = null;
    },
    parseModelRaw: function parseModelRaw(raw) {
      if (REGEX_FILTER.test(raw)) {
        var parsed = parseDirective(raw);
        return { model: parsed.expression, filters: parsed.filters };
      } else {
        return { model: raw };
      }
    },
    setupValidate: function setupValidate(name, model, filters) {
      var params = this.params;
      var validator = this.validator = this.vm._validatorMaps[name];

      this.field = camelize(this.arg ? this.arg : params.field);

      this.validation = validator.manageValidation(this.field, model, this.vm, this.getElementFrom(this.frag), this._scope, filters, params.initial, this.isDetectBlur(params.detectBlur), this.isDetectChange(params.detectChange));

      isPlainObject(params.classes) && this.validation.setValidationClasses(params.classes);

      params.group && validator.addGroupValidation(params.group, this.field);
    },
    listen: function listen() {
      var model = this.model;
      var validation = this.validation;
      var el = this.getElementFrom(this.frag);

      this.onBlur = bind(validation.listener, validation);
      on(el, 'blur', this.onBlur);
      if ((el.type === 'radio' || el.tagName === 'SELECT') && !model) {
        this.onChange = bind(validation.listener, validation);
        on(el, 'change', this.onChange);
      } else if (el.type === 'checkbox') {
        if (!model) {
          this.onChange = bind(validation.listener, validation);
          on(el, 'change', this.onChange);
        } else {
          this.onClick = bind(validation.listener, validation);
          on(el, 'click', this.onClick);
        }
      } else {
        if (!model) {
          this.onInput = bind(validation.listener, validation);
          on(el, 'input', this.onInput);
        }
      }
    },
    unlisten: function unlisten() {
      var el = this.getElementFrom(this.frag);

      if (this.onInput) {
        off(el, 'input', this.onInput);
        this.onInput = null;
      }

      if (this.onClick) {
        off(el, 'click', this.onClick);
        this.onClick = null;
      }

      if (this.onChange) {
        off(el, 'change', this.onChange);
        this.onChange = null;
      }

      if (this.onBlur) {
        off(el, 'blur', this.onBlur);
        this.onBlur = null;
      }
    },
    teardownValidate: function teardownValidate() {
      if (this.validator && this.validation) {
        var el = this.getElementFrom(this.frag);

        this.params.group && this.validator.removeGroupValidation(this.params.group, this.field);

        this.validator.unmanageValidation(this.field, el);

        this.validator = null;
        this.validation = null;
        this.field = null;
      }
    },
    setupFragment: function setupFragment() {
      this.anchor = createAnchor('v-validate');
      replace(this.el, this.anchor);

      this.factory = new FragmentFactory(this.vm, this.shimNode(this.el));
      this.frag = this.factory.create(this._host, this._scope, this._frag);
      this.frag.before(this.anchor);
    },
    teardownFragment: function teardownFragment() {
      if (this.frag) {
        this.frag.remove();
        this.frag = null;
        this.factory = null;
      }

      replace(this.anchor, this.el);
      this.anchor = null;
    },
    handleArray: function handleArray(value, old, initial) {
      var _this = this;

      old && this.validation.resetValidation();

      each(value, function (val) {
        _this.validation.setValidation(val, undefined, undefined, initial);
      });
    },
    handleObject: function handleObject(value, old, initial) {
      var _this2 = this;

      old && this.validation.resetValidation();

      each(value, function (val, key) {
        if (isPlainObject(val)) {
          if ('rule' in val) {
            var msg = 'message' in val ? val.message : null;
            var init = 'initial' in val ? val.initial : null;
            _this2.validation.setValidation(key, val.rule, msg, init || initial);
          }
        } else {
          _this2.validation.setValidation(key, val, undefined, initial);
        }
      });
    },
    isDetectBlur: function isDetectBlur(detectBlur) {
      return detectBlur === undefined || detectBlur === 'on' || detectBlur === true;
    },
    isDetectChange: function isDetectChange(detectChange) {
      return detectChange === undefined || detectChange === 'on' || detectChange === true;
    },
    isInitialNoopValidation: function isInitialNoopValidation(initial) {
      return initial === 'off' || initial === false;
    },
    shimNode: function shimNode(node) {
      var ret = node;
      if (hasTextareaCloneBug) {
        if (node.tagName === 'TEXTAREA') {
          ret = node.cloneNode(true);
          ret.value = node.value;
          var i = ret.childNodes.length;
          while (i--) {
            ret.removeChild(ret.childNodes[i]);
          }
        }
      }
      return ret;
    },
    getElementFrom: function getElementFrom(frag) {
      return frag.single ? frag.node : frag.node.nextSibling;
    }
  });
}

/**
 * BaseValidation class
 */

var BaseValidation = function () {
  function BaseValidation(field, model, vm, el, scope, validator, filters, detectBlur, detectChange) {
    babelHelpers.classCallCheck(this, BaseValidation);

    this.field = field;
    this.touched = false;
    this.dirty = false;
    this.modified = false;

    this._modified = false;
    this._model = model;
    this._filters = filters;
    this._validator = validator;
    this._vm = vm;
    this._el = el;
    this._forScope = scope;
    this._init = this._getValue(el);
    this._validators = {};
    this._detectBlur = detectBlur;
    this._detectChange = detectChange;
    this._classes = {};
  }

  BaseValidation.prototype.manageElement = function manageElement(el, initial) {
    var _this = this;

    var scope = this._getScope();
    var model = this._model;

    this._initial = initial;

    var classIds = el.getAttribute(VALIDATE_UPDATE);
    if (classIds) {
      el.removeAttribute(VALIDATE_UPDATE);
      this._classIds = classIds.split(',');
    }

    if (model) {
      el.value = this._evalModel(model, this._filters);
      this._unwatch = scope.$watch(model, function (val, old) {
        if (val !== old) {
          if (_this.guardValidate(el, 'input')) {
            return;
          }

          _this.handleValidate(el, { noopable: _this._initial });
          if (_this._initial) {
            _this._initial = null;
          }
        }
      }, { deep: true });
    }
  };

  BaseValidation.prototype.unmanageElement = function unmanageElement(el) {
    this._unwatch && this._unwatch();
  };

  BaseValidation.prototype.resetValidation = function resetValidation() {
    var _this2 = this;

    var keys = Object.keys(this._validators);
    each(keys, function (key, index) {
      _this2._validators[key] = null;
      delete _this2._validators[key];
    });
  };

  BaseValidation.prototype.resetValidationNoopable = function resetValidationNoopable() {
    each(this._validators, function (descriptor, key) {
      if (descriptor.initial && !descriptor._isNoopable) {
        descriptor._isNoopable = true;
      }
    });
  };

  BaseValidation.prototype.setValidation = function setValidation(name, arg, msg, initial) {
    var validator = this._validators[name];
    if (!validator) {
      validator = this._validators[name] = {};
      validator.name = name;
    }

    validator.arg = arg;
    if (msg) {
      validator.msg = msg;
    }

    if (initial) {
      validator.initial = initial;
      validator._isNoopable = true;
    }
  };

  BaseValidation.prototype.setValidationClasses = function setValidationClasses(classes) {
    var _this3 = this;

    each(classes, function (value, key) {
      _this3._classes[key] = value;
    });
  };

  BaseValidation.prototype.willUpdateFlags = function willUpdateFlags() {
    var touched = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

    touched && this.willUpdateTouched(this._el, 'blur');
    this.willUpdateDirty(this._el);
    this.willUpdateModified(this._el);
  };

  BaseValidation.prototype.willUpdateTouched = function willUpdateTouched(el, type) {
    if (type && type === 'blur') {
      this.touched = true;
      this._fireEvent(el, 'touched');
    }
  };

  BaseValidation.prototype.willUpdateDirty = function willUpdateDirty(el) {
    if (!this.dirty && this._checkModified(el)) {
      this.dirty = true;
      this._fireEvent(el, 'dirty');
    }
  };

  BaseValidation.prototype.willUpdateModified = function willUpdateModified(el) {
    this.modified = this._checkModified(el);
    if (this._modified !== this.modified) {
      this._fireEvent(el, 'modified', { modified: this.modified });
      this._modified = this.modified;
    }
  };

  BaseValidation.prototype.listener = function listener(e) {
    if (this.guardValidate(e.target, e.type)) {
      return;
    }

    this.handleValidate(e.target, { type: e.type });
  };

  BaseValidation.prototype.handleValidate = function handleValidate(el) {
    var _ref = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var _ref$type = _ref.type;
    var type = _ref$type === undefined ? null : _ref$type;
    var _ref$noopable = _ref.noopable;
    var noopable = _ref$noopable === undefined ? false : _ref$noopable;

    this.willUpdateTouched(el, type);
    this.willUpdateDirty(el);
    this.willUpdateModified(el);

    this._validator.validate({ field: this.field, el: el, noopable: noopable });
  };

  BaseValidation.prototype.validate = function validate(cb) {
    var _this4 = this;

    var noopable = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
    var el = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

    var _ = exports$1.Vue.util;

    var results = {};
    var errors = [];
    var valid = true;

    this._runValidators(function (descriptor, name, done) {
      var asset = _this4._resolveValidator(name);
      var validator = null;
      var msg = null;

      if (_.isPlainObject(asset)) {
        if (asset.check && typeof asset.check === 'function') {
          validator = asset.check;
        }
        if (asset.message) {
          msg = asset.message;
        }
      } else if (typeof asset === 'function') {
        validator = asset;
      }

      if (descriptor.msg) {
        msg = descriptor.msg;
      }

      if (noopable) {
        results[name] = false;
        return done();
      }

      if (descriptor._isNoopable) {
        results[name] = false;
        descriptor._isNoopable = null;
        return done();
      }

      if (validator) {
        var value = _this4._getValue(_this4._el);
        _this4._invokeValidator(_this4._vm, validator, value, descriptor.arg, function (ret, err) {
          if (!ret) {
            valid = false;
            if (err) {
              // async error message
              errors.push({ validator: name, message: err });
              results[name] = err;
            } else if (msg) {
              var error = { validator: name };
              error.message = typeof msg === 'function' ? msg.call(_this4._vm, _this4.field, descriptor.arg) : msg;
              errors.push(error);
              results[name] = error.message;
            } else {
              results[name] = !ret;
            }
          } else {
            results[name] = !ret;
          }

          done();
        });
      } else {
        done();
      }
    }, function () {
      // finished
      _this4._fireEvent(_this4._el, valid ? 'valid' : 'invalid');

      var props = {
        valid: valid,
        invalid: !valid,
        touched: _this4.touched,
        untouched: !_this4.touched,
        dirty: _this4.dirty,
        pristine: !_this4.dirty,
        modified: _this4.modified
      };
      if (!empty(errors)) {
        props.errors = errors;
      }
      _.extend(results, props);

      _this4.willUpdateClasses(results, el);

      cb(results);
    });
  };

  BaseValidation.prototype.resetFlags = function resetFlags() {
    this.touched = false;
    this.dirty = false;
    this.modified = false;
    this._modified = false;
  };

  BaseValidation.prototype.reset = function reset() {
    this.resetValidationNoopable();
    this.resetFlags();
    this._init = this._getValue(this._el);
  };

  BaseValidation.prototype.willUpdateClasses = function willUpdateClasses(results) {
    var _this5 = this;

    var el = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

    if (this._checkClassIds(el)) {
      (function () {
        var classIds = _this5._getClassIds(el);
        _this5.vm.$nextTick(function () {
          _this5.vm.$emit(VALIDATE_UPDATE, classIds, _this5, results);
        });
      })();
    } else {
      this.updateClasses(results);
    }
  };

  BaseValidation.prototype.updateClasses = function updateClasses(results) {
    var el = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

    this._updateClasses(el || this._el, results);
  };

  BaseValidation.prototype.guardValidate = function guardValidate(el, type) {
    if (type && type === 'blur' && !this.detectBlur) {
      return true;
    }

    if (type && type === 'input' && !this.detectChange) {
      return true;
    }

    if (type && type === 'change' && !this.detectChange) {
      return true;
    }

    if (type && type === 'click' && !this.detectChange) {
      return true;
    }

    return false;
  };

  BaseValidation.prototype._getValue = function _getValue(el) {
    return el.value;
  };

  BaseValidation.prototype._getScope = function _getScope() {
    return this._forScope || this._vm;
  };

  BaseValidation.prototype._getClassIds = function _getClassIds(el) {
    return this._classIds;
  };

  BaseValidation.prototype._checkModified = function _checkModified(target) {
    return this._init !== this._getValue(target);
  };

  BaseValidation.prototype._checkClassIds = function _checkClassIds(el) {
    return this._getClassIds(el);
  };

  BaseValidation.prototype._fireEvent = function _fireEvent(el, type, args) {
    trigger(el, type, args);
  };

  BaseValidation.prototype._evalModel = function _evalModel(model, filters) {
    var scope = this._getScope();

    var val = null;
    if (filters) {
      val = scope.$get(model);
      return filters ? this._applyFilters(val, null, filters) : val;
    } else {
      val = scope.$get(model);
      return val === undefined || val === null ? '' : val;
    }
  };

  BaseValidation.prototype._updateClasses = function _updateClasses(el, results) {
    this._toggleValid(el, results.valid);
    this._toggleTouched(el, results.touched);
    this._togglePristine(el, results.pristine);
    this._toggleModfied(el, results.modified);
  };

  BaseValidation.prototype._toggleValid = function _toggleValid(el, valid) {
    var _util$Vue$util = exports$1.Vue.util;
    var addClass = _util$Vue$util.addClass;
    var removeClass = _util$Vue$util.removeClass;

    var validClass = this._classes.valid || 'valid';
    var invalidClass = this._classes.invalid || 'invalid';

    if (valid) {
      toggleClasses(el, validClass, addClass);
      toggleClasses(el, invalidClass, removeClass);
    } else {
      toggleClasses(el, validClass, removeClass);
      toggleClasses(el, invalidClass, addClass);
    }
  };

  BaseValidation.prototype._toggleTouched = function _toggleTouched(el, touched) {
    var _util$Vue$util2 = exports$1.Vue.util;
    var addClass = _util$Vue$util2.addClass;
    var removeClass = _util$Vue$util2.removeClass;

    var touchedClass = this._classes.touched || 'touched';
    var untouchedClass = this._classes.untouched || 'untouched';

    if (touched) {
      toggleClasses(el, touchedClass, addClass);
      toggleClasses(el, untouchedClass, removeClass);
    } else {
      toggleClasses(el, touchedClass, removeClass);
      toggleClasses(el, untouchedClass, addClass);
    }
  };

  BaseValidation.prototype._togglePristine = function _togglePristine(el, pristine) {
    var _util$Vue$util3 = exports$1.Vue.util;
    var addClass = _util$Vue$util3.addClass;
    var removeClass = _util$Vue$util3.removeClass;

    var pristineClass = this._classes.pristine || 'pristine';
    var dirtyClass = this._classes.dirty || 'dirty';

    if (pristine) {
      toggleClasses(el, pristineClass, addClass);
      toggleClasses(el, dirtyClass, removeClass);
    } else {
      toggleClasses(el, pristineClass, removeClass);
      toggleClasses(el, dirtyClass, addClass);
    }
  };

  BaseValidation.prototype._toggleModfied = function _toggleModfied(el, modified) {
    var _util$Vue$util4 = exports$1.Vue.util;
    var addClass = _util$Vue$util4.addClass;
    var removeClass = _util$Vue$util4.removeClass;

    var modifiedClass = this._classes.modified || 'modified';

    if (modified) {
      toggleClasses(el, modifiedClass, addClass);
    } else {
      toggleClasses(el, modifiedClass, removeClass);
    }
  };

  BaseValidation.prototype._applyFilters = function _applyFilters(value, oldValue, filters, write) {
    var resolveAsset = exports$1.Vue.util.resolveAsset;
    var scope = this._getScope();

    var filter = void 0,
        fn = void 0,
        args = void 0,
        arg = void 0,
        offset = void 0,
        i = void 0,
        l = void 0,
        j = void 0,
        k = void 0;
    for (i = 0, l = filters.length; i < l; i++) {
      filter = filters[i];
      fn = resolveAsset(this._vm.$options, 'filters', filter.name);
      if (!fn) {
        continue;
      }

      fn = write ? fn.write : fn.read || fn;
      if (typeof fn !== 'function') {
        continue;
      }

      args = write ? [value, oldValue] : [value];
      offset = write ? 2 : 1;
      if (filter.args) {
        for (j = 0, k = filter.args.length; j < k; j++) {
          arg = filter.args[j];
          args[j + offset] = arg.dynamic ? scope.$get(arg.value) : arg.value;
        }
      }

      value = fn.apply(this._vm, args);
    }

    return value;
  };

  BaseValidation.prototype._runValidators = function _runValidators(fn, cb) {
    var validators = this._validators;
    var length = Object.keys(validators).length;

    var count = 0;
    each(validators, function (descriptor, name) {
      fn(descriptor, name, function () {
        ++count;
        count >= length && cb();
      });
    });
  };

  BaseValidation.prototype._invokeValidator = function _invokeValidator(vm, validator, val, arg, cb) {
    var future = validator.call(this, val, arg);
    if (typeof future === 'function') {
      // function 
      future(function () {
        // resolve
        cb(true);
      }, function (msg) {
        // reject
        cb(false, msg);
      });
    } else if (isPromise(future)) {
      // promise
      future.then(function () {
        // resolve
        cb(true);
      }, function (msg) {
        // reject
        cb(false, msg);
      }).catch(function (err) {
        cb(false, err.message);
      });
    } else {
      // sync
      cb(future);
    }
  };

  BaseValidation.prototype._resolveValidator = function _resolveValidator(name) {
    var resolveAsset = exports$1.Vue.util.resolveAsset;
    return resolveAsset(this._vm.$options, 'validators', name);
  };

  babelHelpers.createClass(BaseValidation, [{
    key: 'vm',
    get: function get() {
      return this._vm;
    }
  }, {
    key: 'el',
    get: function get() {
      return this._el;
    }
  }, {
    key: 'detectChange',
    get: function get() {
      return this._detectChange;
    },
    set: function set(val) {
      this._detectChange = val;
    }
  }, {
    key: 'detectBlur',
    get: function get() {
      return this._detectBlur;
    },
    set: function set(val) {
      this._detectBlur = val;
    }
  }]);
  return BaseValidation;
}();

/**
 * CheckboxValidation class
 */

var CheckboxValidation = function (_BaseValidation) {
  babelHelpers.inherits(CheckboxValidation, _BaseValidation);

  function CheckboxValidation(field, model, vm, el, scope, validator, filters, detectBlur, detectChange) {
    babelHelpers.classCallCheck(this, CheckboxValidation);

    var _this = babelHelpers.possibleConstructorReturn(this, _BaseValidation.call(this, field, model, vm, el, scope, validator, filters, detectBlur, detectChange));

    _this._inits = [];
    return _this;
  }

  CheckboxValidation.prototype.manageElement = function manageElement(el, initial) {
    var _this2 = this;

    var scope = this._getScope();
    var item = this._addItem(el, initial);

    var model = item.model = this._model;
    if (model) {
      var value = this._evalModel(model, this._filters);
      if (Array.isArray(value)) {
        this._setChecked(value, item.el);
        item.unwatch = scope.$watch(model, function (val, old) {
          if (val !== old) {
            if (_this2.guardValidate(item.el, 'change')) {
              return;
            }

            _this2.handleValidate(item.el, { noopable: item.initial });
            if (item.initial) {
              item.initial = null;
            }
          }
        });
      } else {
        el.checked = value || false;
        this._init = el.checked;
        item.init = el.checked;
        item.value = el.value;
        item.unwatch = scope.$watch(model, function (val, old) {
          if (val !== old) {
            if (_this2.guardValidate(el, 'change')) {
              return;
            }

            _this2.handleValidate(el, { noopable: item.initial });
            if (item.initial) {
              item.initial = null;
            }
          }
        });
      }
    } else {
      var options = { field: this.field, noopable: initial };
      if (this._checkClassIds(el)) {
        options.el = el;
      }
      this._validator.validate(options);
    }
  };

  CheckboxValidation.prototype.unmanageElement = function unmanageElement(el) {
    var found = -1;
    each(this._inits, function (item, index) {
      if (item.el === el) {
        found = index;
        if (item.unwatch && item.model) {
          item.unwatch();
          item.unwatch = null;
          item.model = null;
        }
      }
    });
    if (found === -1) {
      return;
    }

    this._inits.splice(found, 1);
    this._validator.validate({ field: this.field });
  };

  CheckboxValidation.prototype.willUpdateFlags = function willUpdateFlags() {
    var _this3 = this;

    var touched = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

    each(this._inits, function (item, index) {
      touched && _this3.willUpdateTouched(item.el, 'blur');
      _this3.willUpdateDirty(item.el);
      _this3.willUpdateModified(item.el);
    });
  };

  CheckboxValidation.prototype.reset = function reset() {
    this.resetValidationNoopable();
    this.resetFlags();
    each(this._inits, function (item, index) {
      item.init = item.el.checked;
      item.value = item.el.value;
    });
  };

  CheckboxValidation.prototype.updateClasses = function updateClasses(results) {
    var _this4 = this;

    var el = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

    if (el) {
      // for another element
      this._updateClasses(el, results);
    } else {
      each(this._inits, function (item, index) {
        _this4._updateClasses(item.el, results);
      });
    }
  };

  CheckboxValidation.prototype._addItem = function _addItem(el, initial) {
    var item = {
      el: el,
      init: el.checked,
      value: el.value,
      initial: initial
    };

    var classIds = el.getAttribute(VALIDATE_UPDATE);
    if (classIds) {
      el.removeAttribute(VALIDATE_UPDATE);
      item.classIds = classIds.split(',');
    }

    this._inits.push(item);
    return item;
  };

  CheckboxValidation.prototype._setChecked = function _setChecked(values, el) {
    for (var i = 0, l = values.length; i < l; i++) {
      var value = values[i];
      if (!el.disabled && el.value === value && !el.checked) {
        el.checked = true;
      }
    }
  };

  CheckboxValidation.prototype._getValue = function _getValue(el) {
    var _this5 = this;

    if (!this._inits || this._inits.length === 0) {
      return el.checked;
    } else {
      var _ret = function () {
        var vals = [];
        each(_this5._inits, function (item, index) {
          item.el.checked && vals.push(item.el.value);
        });
        return {
          v: vals
        };
      }();

      if ((typeof _ret === 'undefined' ? 'undefined' : babelHelpers.typeof(_ret)) === "object") return _ret.v;
    }
  };

  CheckboxValidation.prototype._getClassIds = function _getClassIds(el) {
    var classIds = void 0;
    each(this._inits, function (item, index) {
      if (item.el === el) {
        classIds = item.classIds;
      }
    });
    return classIds;
  };

  CheckboxValidation.prototype._checkModified = function _checkModified(target) {
    var _this6 = this;

    if (this._inits.length === 0) {
      return this._init !== target.checked;
    } else {
      var _ret2 = function () {
        var modified = false;
        each(_this6._inits, function (item, index) {
          if (!modified) {
            modified = item.init !== item.el.checked;
          }
        });
        return {
          v: modified
        };
      }();

      if ((typeof _ret2 === 'undefined' ? 'undefined' : babelHelpers.typeof(_ret2)) === "object") return _ret2.v;
    }
  };

  return CheckboxValidation;
}(BaseValidation);

/**
 * RadioValidation class
 */

var RadioValidation = function (_BaseValidation) {
  babelHelpers.inherits(RadioValidation, _BaseValidation);

  function RadioValidation(field, model, vm, el, scope, validator, filters, detectBlur, detectChange) {
    babelHelpers.classCallCheck(this, RadioValidation);

    var _this = babelHelpers.possibleConstructorReturn(this, _BaseValidation.call(this, field, model, vm, el, scope, validator, filters, detectBlur, detectChange));

    _this._inits = [];
    return _this;
  }

  RadioValidation.prototype.manageElement = function manageElement(el, initial) {
    var _this2 = this;

    var scope = this._getScope();
    var item = this._addItem(el, initial);

    var model = item.model = this._model;
    if (model) {
      var value = this._evalModel(model, this._filters);
      this._setChecked(value, el, item);
      item.unwatch = scope.$watch(model, function (val, old) {
        if (val !== old) {
          if (_this2.guardValidate(item.el, 'change')) {
            return;
          }

          _this2.handleValidate(el, { noopable: item.initial });
          if (item.initial) {
            item.initial = null;
          }
        }
      });
    } else {
      var options = { field: this.field, noopable: initial };
      if (this._checkClassIds(el)) {
        options.el = el;
      }
      this._validator.validate(options);
    }
  };

  RadioValidation.prototype.unmanageElement = function unmanageElement(el) {
    var found = -1;
    each(this._inits, function (item, index) {
      if (item.el === el) {
        found = index;
      }
    });
    if (found === -1) {
      return;
    }

    this._inits.splice(found, 1);
    this._validator.validate({ field: this.field });
  };

  RadioValidation.prototype.willUpdateFlags = function willUpdateFlags() {
    var _this3 = this;

    var touched = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

    each(this._inits, function (item, index) {
      touched && _this3.willUpdateTouched(item.el, 'blur');
      _this3.willUpdateDirty(item.el);
      _this3.willUpdateModified(item.el);
    });
  };

  RadioValidation.prototype.reset = function reset() {
    this.resetValidationNoopable();
    this.resetFlags();
    each(this._inits, function (item, index) {
      item.init = item.el.checked;
      item.value = item.el.value;
    });
  };

  RadioValidation.prototype.updateClasses = function updateClasses(results) {
    var _this4 = this;

    var el = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

    if (el) {
      // for another element
      this._updateClasses(el, results);
    } else {
      each(this._inits, function (item, index) {
        _this4._updateClasses(item.el, results);
      });
    }
  };

  RadioValidation.prototype._addItem = function _addItem(el, initial) {
    var item = {
      el: el,
      init: el.checked,
      value: el.value,
      initial: initial
    };

    var classIds = el.getAttribute(VALIDATE_UPDATE);
    if (classIds) {
      el.removeAttribute(VALIDATE_UPDATE);
      item.classIds = classIds.split(',');
    }

    this._inits.push(item);
    return item;
  };

  RadioValidation.prototype._setChecked = function _setChecked(value, el, item) {
    if (el.value === value) {
      el.checked = true;
      this._init = el.checked;
      item.init = el.checked;
      item.value = value;
    }
  };

  RadioValidation.prototype._getValue = function _getValue(el) {
    var _this5 = this;

    if (!this._inits || this._inits.length === 0) {
      return el.checked;
    } else {
      var _ret = function () {
        var vals = [];
        each(_this5._inits, function (item, index) {
          item.el.checked && vals.push(item.el.value);
        });
        return {
          v: vals
        };
      }();

      if ((typeof _ret === 'undefined' ? 'undefined' : babelHelpers.typeof(_ret)) === "object") return _ret.v;
    }
  };

  RadioValidation.prototype._getClassIds = function _getClassIds(el) {
    var classIds = void 0;
    each(this._inits, function (item, index) {
      if (item.el === el) {
        classIds = item.classIds;
      }
    });
    return classIds;
  };

  RadioValidation.prototype._checkModified = function _checkModified(target) {
    var _this6 = this;

    if (this._inits.length === 0) {
      return this._init !== target.checked;
    } else {
      var _ret2 = function () {
        var modified = false;
        each(_this6._inits, function (item, index) {
          if (!modified) {
            modified = item.init !== item.el.checked;
          }
        });
        return {
          v: modified
        };
      }();

      if ((typeof _ret2 === 'undefined' ? 'undefined' : babelHelpers.typeof(_ret2)) === "object") return _ret2.v;
    }
  };

  return RadioValidation;
}(BaseValidation);

/**
 * SelectValidation class
 */

var SelectValidation = function (_BaseValidation) {
  babelHelpers.inherits(SelectValidation, _BaseValidation);

  function SelectValidation(field, model, vm, el, scope, validator, filters, detectBlur, detectChange) {
    babelHelpers.classCallCheck(this, SelectValidation);

    var _this = babelHelpers.possibleConstructorReturn(this, _BaseValidation.call(this, field, model, vm, el, scope, validator, filters, detectBlur, detectChange));

    _this._multiple = _this._el.hasAttribute('multiple');
    return _this;
  }

  SelectValidation.prototype.manageElement = function manageElement(el, initial) {
    var _this2 = this;

    var scope = this._getScope();
    var model = this._model;

    this._initial = initial;

    var classIds = el.getAttribute(VALIDATE_UPDATE);
    if (classIds) {
      el.removeAttribute(VALIDATE_UPDATE);
      this._classIds = classIds.split(',');
    }

    if (model) {
      var value = this._evalModel(model, this._filters);
      var values = !Array.isArray(value) ? [value] : value;
      this._setOption(values, el);
      this._unwatch = scope.$watch(model, function (val, old) {
        var values1 = !Array.isArray(val) ? [val] : val;
        var values2 = !Array.isArray(old) ? [old] : old;
        if (values1.slice().sort().toString() !== values2.slice().sort().toString()) {
          if (_this2.guardValidate(el, 'change')) {
            return;
          }

          _this2.handleValidate(el, { noopable: _this2._initial });
          if (_this2._initial) {
            _this2._initial = null;
          }
        }
      });
    }
  };

  SelectValidation.prototype.unmanageElement = function unmanageElement(el) {
    this._unwatch && this._unwatch();
  };

  SelectValidation.prototype._getValue = function _getValue(el) {
    var ret = [];

    for (var i = 0, l = el.options.length; i < l; i++) {
      var option = el.options[i];
      if (!option.disabled && option.selected) {
        ret.push(option.value);
      }
    }

    return ret;
  };

  SelectValidation.prototype._setOption = function _setOption(values, el) {
    for (var i = 0, l = values.length; i < l; i++) {
      var value = values[i];
      for (var j = 0, m = el.options.length; j < m; j++) {
        var option = el.options[j];
        if (!option.disabled && option.value === value && (!option.hasAttribute('selected') || !option.selected)) {
          option.selected = true;
        }
      }
    }
  };

  SelectValidation.prototype._checkModified = function _checkModified(target) {
    var values = this._getValue(target).slice().sort();
    if (this._init.length !== values.length) {
      return true;
    } else {
      var inits = this._init.slice().sort();
      return inits.toString() !== values.toString();
    }
  };

  return SelectValidation;
}(BaseValidation);

/**
 * Validator class
 */

var Validator$1 = function () {
  function Validator(name, dir, groups, classes) {
    var _this = this;

    babelHelpers.classCallCheck(this, Validator);

    this.name = name;

    this._scope = {};
    this._dir = dir;
    this._validations = {};
    this._checkboxValidations = {};
    this._radioValidations = {};
    this._groups = groups;
    this._groupValidations = {};
    this._events = {};
    this._modified = false;
    this._classes = classes;

    each(groups, function (group) {
      _this._groupValidations[group] = [];
    });
  }

  Validator.prototype.enableReactive = function enableReactive() {
    var vm = this._dir.vm;

    // define the validation scope
    exports$1.Vue.util.defineReactive(vm, this.name, this._scope);
    vm._validatorMaps[this.name] = this;

    // define the validation resetting meta method to vue instance
    this._defineResetValidation();

    // define the validate manually meta method to vue instance
    this._defineValidate();

    // define manually the validation errors
    this._defineSetValidationErrors();
  };

  Validator.prototype.disableReactive = function disableReactive() {
    var vm = this._dir.vm;
    vm.$setValidationErrors = null;
    delete vm['$setValidationErrors'];
    vm.$validate = null;
    delete vm['$validate'];
    vm.$resetValidation = null;
    delete vm['$resetValidation'];
    vm._validatorMaps[this.name] = null;
    delete vm._validatorMaps[this.name];
    vm[this.name] = null;
    delete vm[this.name];
  };

  Validator.prototype.registerEvents = function registerEvents() {
    var isSimplePath = exports$1.Vue.parsers.expression.isSimplePath;

    var attrs = this._dir.el.attributes;
    for (var i = 0, l = attrs.length; i < l; i++) {
      var event = attrs[i].name;
      if (REGEX_EVENT.test(event)) {
        var value = attrs[i].value;
        if (isSimplePath(value)) {
          value += '.apply(this, $arguments)';
        }
        event = event.replace(REGEX_EVENT, '');
        this._events[this._getEventName(event)] = this._dir.vm.$eval(value, true);
      }
    }
  };

  Validator.prototype.unregisterEvents = function unregisterEvents() {
    var _this2 = this;

    each(this._events, function (handler, event) {
      _this2._events[event] = null;
      delete _this2._events[event];
    });
  };

  Validator.prototype.manageValidation = function manageValidation(field, model, vm, el, scope, filters, initial, detectBlur, detectChange) {
    var validation = null;

    if (el.tagName === 'SELECT') {
      validation = this._manageSelectValidation(field, model, vm, el, scope, filters, initial, detectBlur, detectChange);
    } else if (el.type === 'checkbox') {
      validation = this._manageCheckboxValidation(field, model, vm, el, scope, filters, initial, detectBlur, detectChange);
    } else if (el.type === 'radio') {
      validation = this._manageRadioValidation(field, model, vm, el, scope, filters, initial, detectBlur, detectChange);
    } else {
      validation = this._manageBaseValidation(field, model, vm, el, scope, filters, initial, detectBlur, detectChange);
    }

    validation.setValidationClasses(this._classes);

    return validation;
  };

  Validator.prototype.unmanageValidation = function unmanageValidation(field, el) {
    if (el.type === 'checkbox') {
      this._unmanageCheckboxValidation(field, el);
    } else if (el.type === 'radio') {
      this._unmanageRadioValidation(field, el);
    } else if (el.tagName === 'SELECT') {
      this._unmanageSelectValidation(field, el);
    } else {
      this._unmanageBaseValidation(field, el);
    }
  };

  Validator.prototype.addGroupValidation = function addGroupValidation(group, field) {
    var indexOf = exports$1.Vue.util.indexOf;

    var validation = this._getValidationFrom(field);
    var validations = this._groupValidations[group];

    validations && !~indexOf(validations, validation) && validations.push(validation);
  };

  Validator.prototype.removeGroupValidation = function removeGroupValidation(group, field) {
    var validation = this._getValidationFrom(field);
    var validations = this._groupValidations[group];

    validations && pull(validations, validation);
  };

  Validator.prototype.validate = function validate() {
    var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    var _ref$el = _ref.el;
    var el = _ref$el === undefined ? null : _ref$el;
    var _ref$field = _ref.field;
    var field = _ref$field === undefined ? null : _ref$field;
    var _ref$touched = _ref.touched;
    var touched = _ref$touched === undefined ? false : _ref$touched;
    var _ref$noopable = _ref.noopable;
    var noopable = _ref$noopable === undefined ? false : _ref$noopable;
    var _ref$cb = _ref.cb;
    var cb = _ref$cb === undefined ? null : _ref$cb;

    if (!field) {
      // all
      each(this.validations, function (validation, key) {
        validation.willUpdateFlags(touched);
      });
      this._validates(cb);
    } else {
      // each field
      this._validate(field, touched, noopable, el, cb);
    }
  };

  Validator.prototype.setupScope = function setupScope() {
    var _this3 = this;

    this._defineProperties(function () {
      return _this3.validations;
    }, function () {
      return _this3._scope;
    });

    each(this._groups, function (name) {
      var validations = _this3._groupValidations[name];
      var group = {};
      exports$1.Vue.set(_this3._scope, name, group);
      _this3._defineProperties(function () {
        return validations;
      }, function () {
        return group;
      });
    });
  };

  Validator.prototype.waitFor = function waitFor(cb) {
    var method = '$activateValidator';
    var vm = this._dir.vm;

    vm[method] = function () {
      cb();
      vm[method] = null;
    };
  };

  Validator.prototype._defineResetValidation = function _defineResetValidation() {
    var _this4 = this;

    this._dir.vm.$resetValidation = function (cb) {
      _this4._resetValidation(cb);
    };
  };

  Validator.prototype._defineValidate = function _defineValidate() {
    var _this5 = this;

    this._dir.vm.$validate = function () {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var field = null;
      var touched = false;
      var cb = null;

      each(args, function (arg, index) {
        if (typeof arg === 'string') {
          field = arg;
        } else if (typeof arg === 'boolean') {
          touched = arg;
        } else if (typeof arg === 'function') {
          cb = arg;
        }
      });

      _this5.validate({ field: field, touched: touched, cb: cb });
    };
  };

  Validator.prototype._defineSetValidationErrors = function _defineSetValidationErrors() {
    var _this6 = this;

    this._dir.vm.$setValidationErrors = function (errors) {
      _this6._setValidationErrors(errors);
    };
  };

  Validator.prototype._validate = function _validate(field) {
    var touched = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
    var noopable = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

    var _this7 = this;

    var el = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];
    var cb = arguments.length <= 4 || arguments[4] === undefined ? null : arguments[4];

    var scope = this._scope;

    var validation = this._getValidationFrom(field);
    if (validation) {
      validation.willUpdateFlags(touched);
      validation.validate(function (results) {
        exports$1.Vue.set(scope, field, results);
        _this7._fireEvents();
        cb && cb();
      }, noopable, el);
    }
  };

  Validator.prototype._validates = function _validates(cb) {
    var _this8 = this;

    var scope = this._scope;

    this._runValidates(function (validation, key, done) {
      validation.validate(function (results) {
        exports$1.Vue.set(scope, key, results);
        done();
      });
    }, function () {
      // finished
      _this8._fireEvents();
      cb && cb();
    });
  };

  Validator.prototype._getValidationFrom = function _getValidationFrom(field) {
    return this._validations[field] || this._checkboxValidations[field] && this._checkboxValidations[field].validation || this._radioValidations[field] && this._radioValidations[field].validation;
  };

  Validator.prototype._resetValidation = function _resetValidation(cb) {
    each(this.validations, function (validation, key) {
      validation.reset();
    });
    this._validates(cb);
  };

  Validator.prototype._setValidationErrors = function _setValidationErrors(errors) {
    var _this9 = this;

    var extend = exports$1.Vue.util.extend;

    // make tempolaly errors

    var temp = {};
    each(errors, function (error, index) {
      if (!temp[error.field]) {
        temp[error.field] = [];
      }
      temp[error.field].push(error);
    });

    // set errors
    each(temp, function (values, field) {
      var results = _this9._scope[field];
      var newResults = {};

      each(values, function (error) {
        if (error.validator) {
          results[error.validator] = error.message;
        }
      });

      results.valid = false;
      results.invalid = true;
      results.errors = values;
      extend(newResults, results);

      var validation = _this9._getValidationFrom(field);
      validation.willUpdateClasses(newResults, validation.el);

      exports$1.Vue.set(_this9._scope, field, newResults);
    });
  };

  Validator.prototype._manageBaseValidation = function _manageBaseValidation(field, model, vm, el, scope, filters, initial, detectBlur, detectChange) {
    var validation = this._validations[field] = new BaseValidation(field, model, vm, el, scope, this, filters, detectBlur, detectChange);
    validation.manageElement(el, initial);
    return validation;
  };

  Validator.prototype._unmanageBaseValidation = function _unmanageBaseValidation(field, el) {
    var validation = this._validations[field];
    if (validation) {
      validation.unmanageElement(el);
      exports$1.Vue.delete(this._scope, field);
      this._validations[field] = null;
      delete this._validations[field];
    }
  };

  Validator.prototype._manageCheckboxValidation = function _manageCheckboxValidation(field, model, vm, el, scope, filters, initial, detectBlur, detectChange) {
    var validationSet = this._checkboxValidations[field];
    if (!validationSet) {
      var validation = new CheckboxValidation(field, model, vm, el, scope, this, filters, detectBlur, detectChange);
      validationSet = { validation: validation, elements: 0 };
      this._checkboxValidations[field] = validationSet;
    }

    validationSet.elements++;
    validationSet.validation.manageElement(el, initial);
    return validationSet.validation;
  };

  Validator.prototype._unmanageCheckboxValidation = function _unmanageCheckboxValidation(field, el) {
    var validationSet = this._checkboxValidations[field];
    if (validationSet) {
      validationSet.elements--;
      validationSet.validation.unmanageElement(el);
      if (validationSet.elements === 0) {
        exports$1.Vue.delete(this._scope, field);
        this._checkboxValidations[field] = null;
        delete this._checkboxValidations[field];
      }
    }
  };

  Validator.prototype._manageRadioValidation = function _manageRadioValidation(field, model, vm, el, scope, filters, initial, detectBlur, detectChange) {
    var validationSet = this._radioValidations[field];
    if (!validationSet) {
      var validation = new RadioValidation(field, model, vm, el, scope, this, filters, detectBlur, detectChange);
      validationSet = { validation: validation, elements: 0 };
      this._radioValidations[field] = validationSet;
    }

    validationSet.elements++;
    validationSet.validation.manageElement(el, initial);
    return validationSet.validation;
  };

  Validator.prototype._unmanageRadioValidation = function _unmanageRadioValidation(field, el) {
    var validationSet = this._radioValidations[field];
    if (validationSet) {
      validationSet.elements--;
      validationSet.validation.unmanageElement(el);
      if (validationSet.elements === 0) {
        exports$1.Vue.delete(this._scope, field);
        this._radioValidations[field] = null;
        delete this._radioValidations[field];
      }
    }
  };

  Validator.prototype._manageSelectValidation = function _manageSelectValidation(field, model, vm, el, scope, filters, initial, detectBlur, detectChange) {
    var validation = this._validations[field] = new SelectValidation(field, model, vm, el, scope, this, filters, detectBlur, detectChange);
    validation.manageElement(el, initial);
    return validation;
  };

  Validator.prototype._unmanageSelectValidation = function _unmanageSelectValidation(field, el) {
    var validation = this._validations[field];
    if (validation) {
      validation.unmanageElement(el);
      exports$1.Vue.delete(this._scope, field);
      this._validations[field] = null;
      delete this._validations[field];
    }
  };

  Validator.prototype._fireEvent = function _fireEvent(type) {
    for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }

    var handler = this._events[this._getEventName(type)];
    handler && this._dir.vm.$nextTick(function () {
      handler.apply(null, args);
    });
  };

  Validator.prototype._fireEvents = function _fireEvents() {
    var scope = this._scope;

    scope.touched && this._fireEvent('touched');
    scope.dirty && this._fireEvent('dirty');

    if (this._modified !== scope.modified) {
      this._fireEvent('modified', scope.modified);
      this._modified = scope.modified;
    }

    var valid = scope.valid;
    this._fireEvent(valid ? 'valid' : 'invalid');
  };

  Validator.prototype._getEventName = function _getEventName(type) {
    return this.name + ':' + type;
  };

  Validator.prototype._defineProperties = function _defineProperties(validationsGetter, targetGetter) {
    var _this10 = this;

    var bind = exports$1.Vue.util.bind;

    each({
      valid: { fn: this._defineValid, arg: validationsGetter },
      invalid: { fn: this._defineInvalid, arg: targetGetter },
      touched: { fn: this._defineTouched, arg: validationsGetter },
      untouched: { fn: this._defineUntouched, arg: targetGetter },
      modified: { fn: this._defineModified, arg: validationsGetter },
      dirty: { fn: this._defineDirty, arg: validationsGetter },
      pristine: { fn: this._definePristine, arg: targetGetter },
      errors: { fn: this._defineErrors, arg: validationsGetter }
    }, function (descriptor, name) {
      Object.defineProperty(targetGetter(), name, {
        enumerable: true,
        configurable: true,
        get: function get() {
          return bind(descriptor.fn, _this10)(descriptor.arg);
        }
      });
    });
  };

  Validator.prototype._runValidates = function _runValidates(fn, cb) {
    var length = Object.keys(this.validations).length;

    var count = 0;
    each(this.validations, function (validation, key) {
      fn(validation, key, function () {
        ++count;
        count >= length && cb();
      });
    });
  };

  Validator.prototype._walkValidations = function _walkValidations(validations, property, condition) {
    var _this11 = this;

    var hasOwn = exports$1.Vue.util.hasOwn;
    var ret = condition;

    each(validations, function (validation, key) {
      if (ret === !condition) {
        return;
      }
      if (hasOwn(_this11._scope, validation.field)) {
        var target = _this11._scope[validation.field];
        if (target && target[property] === !condition) {
          ret = !condition;
        }
      }
    });

    return ret;
  };

  Validator.prototype._defineValid = function _defineValid(validationsGetter) {
    return this._walkValidations(validationsGetter(), 'valid', true);
  };

  Validator.prototype._defineInvalid = function _defineInvalid(scopeGetter) {
    return !scopeGetter().valid;
  };

  Validator.prototype._defineTouched = function _defineTouched(validationsGetter) {
    return this._walkValidations(validationsGetter(), 'touched', false);
  };

  Validator.prototype._defineUntouched = function _defineUntouched(scopeGetter) {
    return !scopeGetter().touched;
  };

  Validator.prototype._defineModified = function _defineModified(validationsGetter) {
    return this._walkValidations(validationsGetter(), 'modified', false);
  };

  Validator.prototype._defineDirty = function _defineDirty(validationsGetter) {
    return this._walkValidations(validationsGetter(), 'dirty', false);
  };

  Validator.prototype._definePristine = function _definePristine(scopeGetter) {
    return !scopeGetter().dirty;
  };

  Validator.prototype._defineErrors = function _defineErrors(validationsGetter) {
    var _this12 = this;

    var hasOwn = exports$1.Vue.util.hasOwn;
    var isPlainObject = exports$1.Vue.util.isPlainObject;
    var errors = [];

    each(validationsGetter(), function (validation, key) {
      if (hasOwn(_this12._scope, validation.field)) {
        var target = _this12._scope[validation.field];
        if (target && !empty(target.errors)) {
          each(target.errors, function (err, index) {
            var error = { field: validation.field };
            if (isPlainObject(err)) {
              if (err.validator) {
                error.validator = err.validator;
              }
              error.message = err.message;
            } else if (typeof err === 'string') {
              error.message = err;
            }
            errors.push(error);
          });
        }
      }
    });

    return empty(errors) ? undefined : errors.sort(function (a, b) {
      return a.field < b.field ? -1 : 1;
    });
  };

  babelHelpers.createClass(Validator, [{
    key: 'validations',
    get: function get() {
      var extend = exports$1.Vue.util.extend;

      var ret = {};
      extend(ret, this._validations);

      each(this._checkboxValidations, function (dataset, key) {
        ret[key] = dataset.validation;
      });

      each(this._radioValidations, function (dataset, key) {
        ret[key] = dataset.validation;
      });

      return ret;
    }
  }]);
  return Validator;
}();

function Validator (Vue) {
  var FragmentFactory = Vue.FragmentFactory;
  var vIf = Vue.directive('if');
  var _Vue$util = Vue.util;
  var isArray = _Vue$util.isArray;
  var isPlainObject = _Vue$util.isPlainObject;
  var createAnchor = _Vue$util.createAnchor;
  var replace = _Vue$util.replace;
  var extend = _Vue$util.extend;
  var camelize = _Vue$util.camelize;

  /**
   * `validator` element directive
   */

  Vue.elementDirective('validator', {
    params: ['name', 'groups', 'lazy', 'classes'],

    bind: function bind() {
      var params = this.params;

      if (process.env.NODE_ENV !== 'production' && !params.name) {
        warn('validator element requires a \'name\' attribute: ' + '(e.g. <validator name="validator1">...</validator>)');
        return;
      }

      this.validatorName = '$' + camelize(params.name);
      if (!this.vm._validatorMaps) {
        throw new Error('Invalid validator management error');
      }

      var classes = {};
      if (isPlainObject(this.params.classes)) {
        classes = this.params.classes;
      }

      this.setupValidator(classes);
      this.setupFragment(params.lazy);
    },
    unbind: function unbind() {
      this.teardownFragment();
      this.teardownValidator();
    },
    getGroups: function getGroups() {
      var params = this.params;
      var groups = [];

      if (params.groups) {
        if (isArray(params.groups)) {
          groups = params.groups;
        } else if (!isPlainObject(params.groups) && typeof params.groups === 'string') {
          groups.push(params.groups);
        }
      }

      return groups;
    },
    setupValidator: function setupValidator(classes) {
      var validator = this.validator = new Validator$1(this.validatorName, this, this.getGroups(), classes);
      validator.enableReactive();
      validator.setupScope();
      validator.registerEvents();
    },
    teardownValidator: function teardownValidator() {
      this.validator.unregisterEvents();
      this.validator.disableReactive();

      if (this.validatorName) {
        this.validatorName = null;
        this.validator = null;
      }
    },
    setupFragment: function setupFragment(lazy) {
      var _this = this;

      var vm = this.vm;

      this.validator.waitFor(function () {
        _this.anchor = createAnchor('vue-validator');
        replace(_this.el, _this.anchor);
        extend(vm.$options, { _validator: _this.validatorName });
        _this.factory = new FragmentFactory(vm, _this.el.innerHTML);
        vIf.insert.call(_this);
      });

      !lazy && vm.$activateValidator();
    },
    teardownFragment: function teardownFragment() {
      vIf.unbind.call(this);
    }
  });
}

function ValidatorError (Vue) {
  /**
   * ValidatorError component
   */

  var error = {
    name: 'validator-error',

    props: {
      field: {
        type: String,
        required: true
      },
      validator: {
        type: String
      },
      message: {
        type: String,
        required: true
      },
      partial: {
        type: String,
        default: 'validator-error-default'
      }
    },

    template: '<div><partial :name="partial"></partial></div>',

    partials: {}
  };

  // only use ValidatorError component
  error.partials['validator-error-default'] = '<p>{{field}}: {{message}}</p>';

  return error;
}

function Errors (Vue) {
  var _ = Vue.util;
  var error = ValidatorError(Vue); // import ValidatorError component

  /**
   * ValidatorErrors component
   */

  var errors = {
    name: 'validator-errors',

    props: {
      validation: {
        type: Object,
        required: true
      },
      group: {
        type: String,
        default: null
      },
      field: {
        type: String,
        default: null
      },
      component: {
        type: String,
        default: 'validator-error'
      }
    },

    computed: {
      errors: function errors() {
        var _this = this;

        if (this.group !== null) {
          return this.validation[this.group].errors;
        } else if (this.field !== null) {
          var target = this.validation[this.field];
          if (!target.errors) {
            return;
          }

          return target.errors.map(function (error) {
            var err = { field: _this.field };
            if (_.isPlainObject(error)) {
              if (error.validator) {
                err.validator = error.validator;
              }
              err.message = error.message;
            } else if (typeof error === 'string') {
              err.message = error;
            }
            return err;
          });
        } else {
          return this.validation.errors;
        }
      }
    },

    template: '<template v-for="error in errors">' + '<component :is="component" :partial="partial" :field="error.field" :validator="error.validator" :message="error.message">' + '</component>' + '</template>',

    components: {}
  };

  // define 'partial' prop
  errors.props['partial'] = error.props['partial'];

  // only use ValidatorErrors component
  errors.components[error.name] = error;

  // install ValidatorErrors component
  Vue.component(errors.name, errors);

  return errors;
}

/**
 * plugin
 *
 * @param {Function} Vue
 * @param {Object} options
 */

function plugin(Vue) {
  var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  if (plugin.installed) {
    warn('already installed.');
    return;
  }

  exports$1.Vue = Vue;
  Asset(Vue);
  Errors(Vue);

  Override(Vue);
  Validator(Vue);
  ValidateClass(Vue);
  Validate(Vue);
}

plugin.version = '2.1.7';

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin);
}

module.exports = plugin;
}).call(this,require('_process'))
},{"_process":21}],29:[function(require,module,exports){
(function (process,global){
/*!
 * Vue.js v1.0.26
 * (c) 2016 Evan You
 * Released under the MIT License.
 */
'use strict';

function set(obj, key, val) {
  if (hasOwn(obj, key)) {
    obj[key] = val;
    return;
  }
  if (obj._isVue) {
    set(obj._data, key, val);
    return;
  }
  var ob = obj.__ob__;
  if (!ob) {
    obj[key] = val;
    return;
  }
  ob.convert(key, val);
  ob.dep.notify();
  if (ob.vms) {
    var i = ob.vms.length;
    while (i--) {
      var vm = ob.vms[i];
      vm._proxy(key);
      vm._digest();
    }
  }
  return val;
}

/**
 * Delete a property and trigger change if necessary.
 *
 * @param {Object} obj
 * @param {String} key
 */

function del(obj, key) {
  if (!hasOwn(obj, key)) {
    return;
  }
  delete obj[key];
  var ob = obj.__ob__;
  if (!ob) {
    if (obj._isVue) {
      delete obj._data[key];
      obj._digest();
    }
    return;
  }
  ob.dep.notify();
  if (ob.vms) {
    var i = ob.vms.length;
    while (i--) {
      var vm = ob.vms[i];
      vm._unproxy(key);
      vm._digest();
    }
  }
}

var hasOwnProperty = Object.prototype.hasOwnProperty;
/**
 * Check whether the object has the property.
 *
 * @param {Object} obj
 * @param {String} key
 * @return {Boolean}
 */

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

/**
 * Check if an expression is a literal value.
 *
 * @param {String} exp
 * @return {Boolean}
 */

var literalValueRE = /^\s?(true|false|-?[\d\.]+|'[^']*'|"[^"]*")\s?$/;

function isLiteral(exp) {
  return literalValueRE.test(exp);
}

/**
 * Check if a string starts with $ or _
 *
 * @param {String} str
 * @return {Boolean}
 */

function isReserved(str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F;
}

/**
 * Guard text output, make sure undefined outputs
 * empty string
 *
 * @param {*} value
 * @return {String}
 */

function _toString(value) {
  return value == null ? '' : value.toString();
}

/**
 * Check and convert possible numeric strings to numbers
 * before setting back to data
 *
 * @param {*} value
 * @return {*|Number}
 */

function toNumber(value) {
  if (typeof value !== 'string') {
    return value;
  } else {
    var parsed = Number(value);
    return isNaN(parsed) ? value : parsed;
  }
}

/**
 * Convert string boolean literals into real booleans.
 *
 * @param {*} value
 * @return {*|Boolean}
 */

function toBoolean(value) {
  return value === 'true' ? true : value === 'false' ? false : value;
}

/**
 * Strip quotes from a string
 *
 * @param {String} str
 * @return {String | false}
 */

function stripQuotes(str) {
  var a = str.charCodeAt(0);
  var b = str.charCodeAt(str.length - 1);
  return a === b && (a === 0x22 || a === 0x27) ? str.slice(1, -1) : str;
}

/**
 * Camelize a hyphen-delmited string.
 *
 * @param {String} str
 * @return {String}
 */

var camelizeRE = /-(\w)/g;

function camelize(str) {
  return str.replace(camelizeRE, toUpper);
}

function toUpper(_, c) {
  return c ? c.toUpperCase() : '';
}

/**
 * Hyphenate a camelCase string.
 *
 * @param {String} str
 * @return {String}
 */

var hyphenateRE = /([a-z\d])([A-Z])/g;

function hyphenate(str) {
  return str.replace(hyphenateRE, '$1-$2').toLowerCase();
}

/**
 * Converts hyphen/underscore/slash delimitered names into
 * camelized classNames.
 *
 * e.g. my-component => MyComponent
 *      some_else    => SomeElse
 *      some/comp    => SomeComp
 *
 * @param {String} str
 * @return {String}
 */

var classifyRE = /(?:^|[-_\/])(\w)/g;

function classify(str) {
  return str.replace(classifyRE, toUpper);
}

/**
 * Simple bind, faster than native
 *
 * @param {Function} fn
 * @param {Object} ctx
 * @return {Function}
 */

function bind(fn, ctx) {
  return function (a) {
    var l = arguments.length;
    return l ? l > 1 ? fn.apply(ctx, arguments) : fn.call(ctx, a) : fn.call(ctx);
  };
}

/**
 * Convert an Array-like object to a real Array.
 *
 * @param {Array-like} list
 * @param {Number} [start] - start index
 * @return {Array}
 */

function toArray(list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret;
}

/**
 * Mix properties into target object.
 *
 * @param {Object} to
 * @param {Object} from
 */

function extend(to, from) {
  var keys = Object.keys(from);
  var i = keys.length;
  while (i--) {
    to[keys[i]] = from[keys[i]];
  }
  return to;
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 *
 * @param {*} obj
 * @return {Boolean}
 */

function isObject(obj) {
  return obj !== null && typeof obj === 'object';
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 *
 * @param {*} obj
 * @return {Boolean}
 */

var toString = Object.prototype.toString;
var OBJECT_STRING = '[object Object]';

function isPlainObject(obj) {
  return toString.call(obj) === OBJECT_STRING;
}

/**
 * Array type check.
 *
 * @param {*} obj
 * @return {Boolean}
 */

var isArray = Array.isArray;

/**
 * Define a property.
 *
 * @param {Object} obj
 * @param {String} key
 * @param {*} val
 * @param {Boolean} [enumerable]
 */

function def(obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Debounce a function so it only gets called after the
 * input stops arriving after the given wait period.
 *
 * @param {Function} func
 * @param {Number} wait
 * @return {Function} - the debounced function
 */

function _debounce(func, wait) {
  var timeout, args, context, timestamp, result;
  var later = function later() {
    var last = Date.now() - timestamp;
    if (last < wait && last >= 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    }
  };
  return function () {
    context = this;
    args = arguments;
    timestamp = Date.now();
    if (!timeout) {
      timeout = setTimeout(later, wait);
    }
    return result;
  };
}

/**
 * Manual indexOf because it's slightly faster than
 * native.
 *
 * @param {Array} arr
 * @param {*} obj
 */

function indexOf(arr, obj) {
  var i = arr.length;
  while (i--) {
    if (arr[i] === obj) return i;
  }
  return -1;
}

/**
 * Make a cancellable version of an async callback.
 *
 * @param {Function} fn
 * @return {Function}
 */

function cancellable(fn) {
  var cb = function cb() {
    if (!cb.cancelled) {
      return fn.apply(this, arguments);
    }
  };
  cb.cancel = function () {
    cb.cancelled = true;
  };
  return cb;
}

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 *
 * @param {*} a
 * @param {*} b
 * @return {Boolean}
 */

function looseEqual(a, b) {
  /* eslint-disable eqeqeq */
  return a == b || (isObject(a) && isObject(b) ? JSON.stringify(a) === JSON.stringify(b) : false);
  /* eslint-enable eqeqeq */
}

var hasProto = ('__proto__' in {});

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined' && Object.prototype.toString.call(window) !== '[object Object]';

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

// UA sniffing for working around browser-specific quirks
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && UA.indexOf('trident') > 0;
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isAndroid = UA && UA.indexOf('android') > 0;
var isIos = UA && /(iphone|ipad|ipod|ios)/i.test(UA);
var iosVersionMatch = isIos && UA.match(/os ([\d_]+)/);
var iosVersion = iosVersionMatch && iosVersionMatch[1].split('_');

// detecting iOS UIWebView by indexedDB
var hasMutationObserverBug = iosVersion && Number(iosVersion[0]) >= 9 && Number(iosVersion[1]) >= 3 && !window.indexedDB;

var transitionProp = undefined;
var transitionEndEvent = undefined;
var animationProp = undefined;
var animationEndEvent = undefined;

// Transition property/event sniffing
if (inBrowser && !isIE9) {
  var isWebkitTrans = window.ontransitionend === undefined && window.onwebkittransitionend !== undefined;
  var isWebkitAnim = window.onanimationend === undefined && window.onwebkitanimationend !== undefined;
  transitionProp = isWebkitTrans ? 'WebkitTransition' : 'transition';
  transitionEndEvent = isWebkitTrans ? 'webkitTransitionEnd' : 'transitionend';
  animationProp = isWebkitAnim ? 'WebkitAnimation' : 'animation';
  animationEndEvent = isWebkitAnim ? 'webkitAnimationEnd' : 'animationend';
}

/**
 * Defer a task to execute it asynchronously. Ideally this
 * should be executed as a microtask, so we leverage
 * MutationObserver if it's available, and fallback to
 * setTimeout(0).
 *
 * @param {Function} cb
 * @param {Object} ctx
 */

var nextTick = (function () {
  var callbacks = [];
  var pending = false;
  var timerFunc;
  function nextTickHandler() {
    pending = false;
    var copies = callbacks.slice(0);
    callbacks = [];
    for (var i = 0; i < copies.length; i++) {
      copies[i]();
    }
  }

  /* istanbul ignore if */
  if (typeof MutationObserver !== 'undefined' && !hasMutationObserverBug) {
    var counter = 1;
    var observer = new MutationObserver(nextTickHandler);
    var textNode = document.createTextNode(counter);
    observer.observe(textNode, {
      characterData: true
    });
    timerFunc = function () {
      counter = (counter + 1) % 2;
      textNode.data = counter;
    };
  } else {
    // webpack attempts to inject a shim for setImmediate
    // if it is used as a global, so we have to work around that to
    // avoid bundling unnecessary code.
    var context = inBrowser ? window : typeof global !== 'undefined' ? global : {};
    timerFunc = context.setImmediate || setTimeout;
  }
  return function (cb, ctx) {
    var func = ctx ? function () {
      cb.call(ctx);
    } : cb;
    callbacks.push(func);
    if (pending) return;
    pending = true;
    timerFunc(nextTickHandler, 0);
  };
})();

var _Set = undefined;
/* istanbul ignore if */
if (typeof Set !== 'undefined' && Set.toString().match(/native code/)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = function () {
    this.set = Object.create(null);
  };
  _Set.prototype.has = function (key) {
    return this.set[key] !== undefined;
  };
  _Set.prototype.add = function (key) {
    this.set[key] = 1;
  };
  _Set.prototype.clear = function () {
    this.set = Object.create(null);
  };
}

function Cache(limit) {
  this.size = 0;
  this.limit = limit;
  this.head = this.tail = undefined;
  this._keymap = Object.create(null);
}

var p = Cache.prototype;

/**
 * Put <value> into the cache associated with <key>.
 * Returns the entry which was removed to make room for
 * the new entry. Otherwise undefined is returned.
 * (i.e. if there was enough room already).
 *
 * @param {String} key
 * @param {*} value
 * @return {Entry|undefined}
 */

p.put = function (key, value) {
  var removed;

  var entry = this.get(key, true);
  if (!entry) {
    if (this.size === this.limit) {
      removed = this.shift();
    }
    entry = {
      key: key
    };
    this._keymap[key] = entry;
    if (this.tail) {
      this.tail.newer = entry;
      entry.older = this.tail;
    } else {
      this.head = entry;
    }
    this.tail = entry;
    this.size++;
  }
  entry.value = value;

  return removed;
};

/**
 * Purge the least recently used (oldest) entry from the
 * cache. Returns the removed entry or undefined if the
 * cache was empty.
 */

p.shift = function () {
  var entry = this.head;
  if (entry) {
    this.head = this.head.newer;
    this.head.older = undefined;
    entry.newer = entry.older = undefined;
    this._keymap[entry.key] = undefined;
    this.size--;
  }
  return entry;
};

/**
 * Get and register recent use of <key>. Returns the value
 * associated with <key> or undefined if not in cache.
 *
 * @param {String} key
 * @param {Boolean} returnEntry
 * @return {Entry|*}
 */

p.get = function (key, returnEntry) {
  var entry = this._keymap[key];
  if (entry === undefined) return;
  if (entry === this.tail) {
    return returnEntry ? entry : entry.value;
  }
  // HEAD--------------TAIL
  //   <.older   .newer>
  //  <--- add direction --
  //   A  B  C  <D>  E
  if (entry.newer) {
    if (entry === this.head) {
      this.head = entry.newer;
    }
    entry.newer.older = entry.older; // C <-- E.
  }
  if (entry.older) {
    entry.older.newer = entry.newer; // C. --> E
  }
  entry.newer = undefined; // D --x
  entry.older = this.tail; // D. --> E
  if (this.tail) {
    this.tail.newer = entry; // E. <-- D
  }
  this.tail = entry;
  return returnEntry ? entry : entry.value;
};

var cache$1 = new Cache(1000);
var filterTokenRE = /[^\s'"]+|'[^']*'|"[^"]*"/g;
var reservedArgRE = /^in$|^-?\d+/;

/**
 * Parser state
 */

var str;
var dir;
var c;
var prev;
var i;
var l;
var lastFilterIndex;
var inSingle;
var inDouble;
var curly;
var square;
var paren;
/**
 * Push a filter to the current directive object
 */

function pushFilter() {
  var exp = str.slice(lastFilterIndex, i).trim();
  var filter;
  if (exp) {
    filter = {};
    var tokens = exp.match(filterTokenRE);
    filter.name = tokens[0];
    if (tokens.length > 1) {
      filter.args = tokens.slice(1).map(processFilterArg);
    }
  }
  if (filter) {
    (dir.filters = dir.filters || []).push(filter);
  }
  lastFilterIndex = i + 1;
}

/**
 * Check if an argument is dynamic and strip quotes.
 *
 * @param {String} arg
 * @return {Object}
 */

function processFilterArg(arg) {
  if (reservedArgRE.test(arg)) {
    return {
      value: toNumber(arg),
      dynamic: false
    };
  } else {
    var stripped = stripQuotes(arg);
    var dynamic = stripped === arg;
    return {
      value: dynamic ? arg : stripped,
      dynamic: dynamic
    };
  }
}

/**
 * Parse a directive value and extract the expression
 * and its filters into a descriptor.
 *
 * Example:
 *
 * "a + 1 | uppercase" will yield:
 * {
 *   expression: 'a + 1',
 *   filters: [
 *     { name: 'uppercase', args: null }
 *   ]
 * }
 *
 * @param {String} s
 * @return {Object}
 */

function parseDirective(s) {
  var hit = cache$1.get(s);
  if (hit) {
    return hit;
  }

  // reset parser state
  str = s;
  inSingle = inDouble = false;
  curly = square = paren = 0;
  lastFilterIndex = 0;
  dir = {};

  for (i = 0, l = str.length; i < l; i++) {
    prev = c;
    c = str.charCodeAt(i);
    if (inSingle) {
      // check single quote
      if (c === 0x27 && prev !== 0x5C) inSingle = !inSingle;
    } else if (inDouble) {
      // check double quote
      if (c === 0x22 && prev !== 0x5C) inDouble = !inDouble;
    } else if (c === 0x7C && // pipe
    str.charCodeAt(i + 1) !== 0x7C && str.charCodeAt(i - 1) !== 0x7C) {
      if (dir.expression == null) {
        // first filter, end of expression
        lastFilterIndex = i + 1;
        dir.expression = str.slice(0, i).trim();
      } else {
        // already has filter
        pushFilter();
      }
    } else {
      switch (c) {
        case 0x22:
          inDouble = true;break; // "
        case 0x27:
          inSingle = true;break; // '
        case 0x28:
          paren++;break; // (
        case 0x29:
          paren--;break; // )
        case 0x5B:
          square++;break; // [
        case 0x5D:
          square--;break; // ]
        case 0x7B:
          curly++;break; // {
        case 0x7D:
          curly--;break; // }
      }
    }
  }

  if (dir.expression == null) {
    dir.expression = str.slice(0, i).trim();
  } else if (lastFilterIndex !== 0) {
    pushFilter();
  }

  cache$1.put(s, dir);
  return dir;
}

var directive = Object.freeze({
  parseDirective: parseDirective
});

var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g;
var cache = undefined;
var tagRE = undefined;
var htmlRE = undefined;
/**
 * Escape a string so it can be used in a RegExp
 * constructor.
 *
 * @param {String} str
 */

function escapeRegex(str) {
  return str.replace(regexEscapeRE, '\\$&');
}

function compileRegex() {
  var open = escapeRegex(config.delimiters[0]);
  var close = escapeRegex(config.delimiters[1]);
  var unsafeOpen = escapeRegex(config.unsafeDelimiters[0]);
  var unsafeClose = escapeRegex(config.unsafeDelimiters[1]);
  tagRE = new RegExp(unsafeOpen + '((?:.|\\n)+?)' + unsafeClose + '|' + open + '((?:.|\\n)+?)' + close, 'g');
  htmlRE = new RegExp('^' + unsafeOpen + '((?:.|\\n)+?)' + unsafeClose + '$');
  // reset cache
  cache = new Cache(1000);
}

/**
 * Parse a template text string into an array of tokens.
 *
 * @param {String} text
 * @return {Array<Object> | null}
 *               - {String} type
 *               - {String} value
 *               - {Boolean} [html]
 *               - {Boolean} [oneTime]
 */

function parseText(text) {
  if (!cache) {
    compileRegex();
  }
  var hit = cache.get(text);
  if (hit) {
    return hit;
  }
  if (!tagRE.test(text)) {
    return null;
  }
  var tokens = [];
  var lastIndex = tagRE.lastIndex = 0;
  var match, index, html, value, first, oneTime;
  /* eslint-disable no-cond-assign */
  while (match = tagRE.exec(text)) {
    /* eslint-enable no-cond-assign */
    index = match.index;
    // push text token
    if (index > lastIndex) {
      tokens.push({
        value: text.slice(lastIndex, index)
      });
    }
    // tag token
    html = htmlRE.test(match[0]);
    value = html ? match[1] : match[2];
    first = value.charCodeAt(0);
    oneTime = first === 42; // *
    value = oneTime ? value.slice(1) : value;
    tokens.push({
      tag: true,
      value: value.trim(),
      html: html,
      oneTime: oneTime
    });
    lastIndex = index + match[0].length;
  }
  if (lastIndex < text.length) {
    tokens.push({
      value: text.slice(lastIndex)
    });
  }
  cache.put(text, tokens);
  return tokens;
}

/**
 * Format a list of tokens into an expression.
 * e.g. tokens parsed from 'a {{b}} c' can be serialized
 * into one single expression as '"a " + b + " c"'.
 *
 * @param {Array} tokens
 * @param {Vue} [vm]
 * @return {String}
 */

function tokensToExp(tokens, vm) {
  if (tokens.length > 1) {
    return tokens.map(function (token) {
      return formatToken(token, vm);
    }).join('+');
  } else {
    return formatToken(tokens[0], vm, true);
  }
}

/**
 * Format a single token.
 *
 * @param {Object} token
 * @param {Vue} [vm]
 * @param {Boolean} [single]
 * @return {String}
 */

function formatToken(token, vm, single) {
  return token.tag ? token.oneTime && vm ? '"' + vm.$eval(token.value) + '"' : inlineFilters(token.value, single) : '"' + token.value + '"';
}

/**
 * For an attribute with multiple interpolation tags,
 * e.g. attr="some-{{thing | filter}}", in order to combine
 * the whole thing into a single watchable expression, we
 * have to inline those filters. This function does exactly
 * that. This is a bit hacky but it avoids heavy changes
 * to directive parser and watcher mechanism.
 *
 * @param {String} exp
 * @param {Boolean} single
 * @return {String}
 */

var filterRE = /[^|]\|[^|]/;
function inlineFilters(exp, single) {
  if (!filterRE.test(exp)) {
    return single ? exp : '(' + exp + ')';
  } else {
    var dir = parseDirective(exp);
    if (!dir.filters) {
      return '(' + exp + ')';
    } else {
      return 'this._applyFilters(' + dir.expression + // value
      ',null,' + // oldValue (null for read)
      JSON.stringify(dir.filters) + // filter descriptors
      ',false)'; // write?
    }
  }
}

var text = Object.freeze({
  compileRegex: compileRegex,
  parseText: parseText,
  tokensToExp: tokensToExp
});

var delimiters = ['{{', '}}'];
var unsafeDelimiters = ['{{{', '}}}'];

var config = Object.defineProperties({

  /**
   * Whether to print debug messages.
   * Also enables stack trace for warnings.
   *
   * @type {Boolean}
   */

  debug: false,

  /**
   * Whether to suppress warnings.
   *
   * @type {Boolean}
   */

  silent: false,

  /**
   * Whether to use async rendering.
   */

  async: true,

  /**
   * Whether to warn against errors caught when evaluating
   * expressions.
   */

  warnExpressionErrors: true,

  /**
   * Whether to allow devtools inspection.
   * Disabled by default in production builds.
   */

  devtools: process.env.NODE_ENV !== 'production',

  /**
   * Internal flag to indicate the delimiters have been
   * changed.
   *
   * @type {Boolean}
   */

  _delimitersChanged: true,

  /**
   * List of asset types that a component can own.
   *
   * @type {Array}
   */

  _assetTypes: ['component', 'directive', 'elementDirective', 'filter', 'transition', 'partial'],

  /**
   * prop binding modes
   */

  _propBindingModes: {
    ONE_WAY: 0,
    TWO_WAY: 1,
    ONE_TIME: 2
  },

  /**
   * Max circular updates allowed in a batcher flush cycle.
   */

  _maxUpdateCount: 100

}, {
  delimiters: { /**
                 * Interpolation delimiters. Changing these would trigger
                 * the text parser to re-compile the regular expressions.
                 *
                 * @type {Array<String>}
                 */

    get: function get() {
      return delimiters;
    },
    set: function set(val) {
      delimiters = val;
      compileRegex();
    },
    configurable: true,
    enumerable: true
  },
  unsafeDelimiters: {
    get: function get() {
      return unsafeDelimiters;
    },
    set: function set(val) {
      unsafeDelimiters = val;
      compileRegex();
    },
    configurable: true,
    enumerable: true
  }
});

var warn = undefined;
var formatComponentName = undefined;

if (process.env.NODE_ENV !== 'production') {
  (function () {
    var hasConsole = typeof console !== 'undefined';

    warn = function (msg, vm) {
      if (hasConsole && !config.silent) {
        console.error('[Vue warn]: ' + msg + (vm ? formatComponentName(vm) : ''));
      }
    };

    formatComponentName = function (vm) {
      var name = vm._isVue ? vm.$options.name : vm.name;
      return name ? ' (found in component: <' + hyphenate(name) + '>)' : '';
    };
  })();
}

/**
 * Append with transition.
 *
 * @param {Element} el
 * @param {Element} target
 * @param {Vue} vm
 * @param {Function} [cb]
 */

function appendWithTransition(el, target, vm, cb) {
  applyTransition(el, 1, function () {
    target.appendChild(el);
  }, vm, cb);
}

/**
 * InsertBefore with transition.
 *
 * @param {Element} el
 * @param {Element} target
 * @param {Vue} vm
 * @param {Function} [cb]
 */

function beforeWithTransition(el, target, vm, cb) {
  applyTransition(el, 1, function () {
    before(el, target);
  }, vm, cb);
}

/**
 * Remove with transition.
 *
 * @param {Element} el
 * @param {Vue} vm
 * @param {Function} [cb]
 */

function removeWithTransition(el, vm, cb) {
  applyTransition(el, -1, function () {
    remove(el);
  }, vm, cb);
}

/**
 * Apply transitions with an operation callback.
 *
 * @param {Element} el
 * @param {Number} direction
 *                  1: enter
 *                 -1: leave
 * @param {Function} op - the actual DOM operation
 * @param {Vue} vm
 * @param {Function} [cb]
 */

function applyTransition(el, direction, op, vm, cb) {
  var transition = el.__v_trans;
  if (!transition ||
  // skip if there are no js hooks and CSS transition is
  // not supported
  !transition.hooks && !transitionEndEvent ||
  // skip transitions for initial compile
  !vm._isCompiled ||
  // if the vm is being manipulated by a parent directive
  // during the parent's compilation phase, skip the
  // animation.
  vm.$parent && !vm.$parent._isCompiled) {
    op();
    if (cb) cb();
    return;
  }
  var action = direction > 0 ? 'enter' : 'leave';
  transition[action](op, cb);
}

var transition = Object.freeze({
  appendWithTransition: appendWithTransition,
  beforeWithTransition: beforeWithTransition,
  removeWithTransition: removeWithTransition,
  applyTransition: applyTransition
});

/**
 * Query an element selector if it's not an element already.
 *
 * @param {String|Element} el
 * @return {Element}
 */

function query(el) {
  if (typeof el === 'string') {
    var selector = el;
    el = document.querySelector(el);
    if (!el) {
      process.env.NODE_ENV !== 'production' && warn('Cannot find element: ' + selector);
    }
  }
  return el;
}

/**
 * Check if a node is in the document.
 * Note: document.documentElement.contains should work here
 * but always returns false for comment nodes in phantomjs,
 * making unit tests difficult. This is fixed by doing the
 * contains() check on the node's parentNode instead of
 * the node itself.
 *
 * @param {Node} node
 * @return {Boolean}
 */

function inDoc(node) {
  if (!node) return false;
  var doc = node.ownerDocument.documentElement;
  var parent = node.parentNode;
  return doc === node || doc === parent || !!(parent && parent.nodeType === 1 && doc.contains(parent));
}

/**
 * Get and remove an attribute from a node.
 *
 * @param {Node} node
 * @param {String} _attr
 */

function getAttr(node, _attr) {
  var val = node.getAttribute(_attr);
  if (val !== null) {
    node.removeAttribute(_attr);
  }
  return val;
}

/**
 * Get an attribute with colon or v-bind: prefix.
 *
 * @param {Node} node
 * @param {String} name
 * @return {String|null}
 */

function getBindAttr(node, name) {
  var val = getAttr(node, ':' + name);
  if (val === null) {
    val = getAttr(node, 'v-bind:' + name);
  }
  return val;
}

/**
 * Check the presence of a bind attribute.
 *
 * @param {Node} node
 * @param {String} name
 * @return {Boolean}
 */

function hasBindAttr(node, name) {
  return node.hasAttribute(name) || node.hasAttribute(':' + name) || node.hasAttribute('v-bind:' + name);
}

/**
 * Insert el before target
 *
 * @param {Element} el
 * @param {Element} target
 */

function before(el, target) {
  target.parentNode.insertBefore(el, target);
}

/**
 * Insert el after target
 *
 * @param {Element} el
 * @param {Element} target
 */

function after(el, target) {
  if (target.nextSibling) {
    before(el, target.nextSibling);
  } else {
    target.parentNode.appendChild(el);
  }
}

/**
 * Remove el from DOM
 *
 * @param {Element} el
 */

function remove(el) {
  el.parentNode.removeChild(el);
}

/**
 * Prepend el to target
 *
 * @param {Element} el
 * @param {Element} target
 */

function prepend(el, target) {
  if (target.firstChild) {
    before(el, target.firstChild);
  } else {
    target.appendChild(el);
  }
}

/**
 * Replace target with el
 *
 * @param {Element} target
 * @param {Element} el
 */

function replace(target, el) {
  var parent = target.parentNode;
  if (parent) {
    parent.replaceChild(el, target);
  }
}

/**
 * Add event listener shorthand.
 *
 * @param {Element} el
 * @param {String} event
 * @param {Function} cb
 * @param {Boolean} [useCapture]
 */

function on(el, event, cb, useCapture) {
  el.addEventListener(event, cb, useCapture);
}

/**
 * Remove event listener shorthand.
 *
 * @param {Element} el
 * @param {String} event
 * @param {Function} cb
 */

function off(el, event, cb) {
  el.removeEventListener(event, cb);
}

/**
 * For IE9 compat: when both class and :class are present
 * getAttribute('class') returns wrong value...
 *
 * @param {Element} el
 * @return {String}
 */

function getClass(el) {
  var classname = el.className;
  if (typeof classname === 'object') {
    classname = classname.baseVal || '';
  }
  return classname;
}

/**
 * In IE9, setAttribute('class') will result in empty class
 * if the element also has the :class attribute; However in
 * PhantomJS, setting `className` does not work on SVG elements...
 * So we have to do a conditional check here.
 *
 * @param {Element} el
 * @param {String} cls
 */

function setClass(el, cls) {
  /* istanbul ignore if */
  if (isIE9 && !/svg$/.test(el.namespaceURI)) {
    el.className = cls;
  } else {
    el.setAttribute('class', cls);
  }
}

/**
 * Add class with compatibility for IE & SVG
 *
 * @param {Element} el
 * @param {String} cls
 */

function addClass(el, cls) {
  if (el.classList) {
    el.classList.add(cls);
  } else {
    var cur = ' ' + getClass(el) + ' ';
    if (cur.indexOf(' ' + cls + ' ') < 0) {
      setClass(el, (cur + cls).trim());
    }
  }
}

/**
 * Remove class with compatibility for IE & SVG
 *
 * @param {Element} el
 * @param {String} cls
 */

function removeClass(el, cls) {
  if (el.classList) {
    el.classList.remove(cls);
  } else {
    var cur = ' ' + getClass(el) + ' ';
    var tar = ' ' + cls + ' ';
    while (cur.indexOf(tar) >= 0) {
      cur = cur.replace(tar, ' ');
    }
    setClass(el, cur.trim());
  }
  if (!el.className) {
    el.removeAttribute('class');
  }
}

/**
 * Extract raw content inside an element into a temporary
 * container div
 *
 * @param {Element} el
 * @param {Boolean} asFragment
 * @return {Element|DocumentFragment}
 */

function extractContent(el, asFragment) {
  var child;
  var rawContent;
  /* istanbul ignore if */
  if (isTemplate(el) && isFragment(el.content)) {
    el = el.content;
  }
  if (el.hasChildNodes()) {
    trimNode(el);
    rawContent = asFragment ? document.createDocumentFragment() : document.createElement('div');
    /* eslint-disable no-cond-assign */
    while (child = el.firstChild) {
      /* eslint-enable no-cond-assign */
      rawContent.appendChild(child);
    }
  }
  return rawContent;
}

/**
 * Trim possible empty head/tail text and comment
 * nodes inside a parent.
 *
 * @param {Node} node
 */

function trimNode(node) {
  var child;
  /* eslint-disable no-sequences */
  while ((child = node.firstChild, isTrimmable(child))) {
    node.removeChild(child);
  }
  while ((child = node.lastChild, isTrimmable(child))) {
    node.removeChild(child);
  }
  /* eslint-enable no-sequences */
}

function isTrimmable(node) {
  return node && (node.nodeType === 3 && !node.data.trim() || node.nodeType === 8);
}

/**
 * Check if an element is a template tag.
 * Note if the template appears inside an SVG its tagName
 * will be in lowercase.
 *
 * @param {Element} el
 */

function isTemplate(el) {
  return el.tagName && el.tagName.toLowerCase() === 'template';
}

/**
 * Create an "anchor" for performing dom insertion/removals.
 * This is used in a number of scenarios:
 * - fragment instance
 * - v-html
 * - v-if
 * - v-for
 * - component
 *
 * @param {String} content
 * @param {Boolean} persist - IE trashes empty textNodes on
 *                            cloneNode(true), so in certain
 *                            cases the anchor needs to be
 *                            non-empty to be persisted in
 *                            templates.
 * @return {Comment|Text}
 */

function createAnchor(content, persist) {
  var anchor = config.debug ? document.createComment(content) : document.createTextNode(persist ? ' ' : '');
  anchor.__v_anchor = true;
  return anchor;
}

/**
 * Find a component ref attribute that starts with $.
 *
 * @param {Element} node
 * @return {String|undefined}
 */

var refRE = /^v-ref:/;

function findRef(node) {
  if (node.hasAttributes()) {
    var attrs = node.attributes;
    for (var i = 0, l = attrs.length; i < l; i++) {
      var name = attrs[i].name;
      if (refRE.test(name)) {
        return camelize(name.replace(refRE, ''));
      }
    }
  }
}

/**
 * Map a function to a range of nodes .
 *
 * @param {Node} node
 * @param {Node} end
 * @param {Function} op
 */

function mapNodeRange(node, end, op) {
  var next;
  while (node !== end) {
    next = node.nextSibling;
    op(node);
    node = next;
  }
  op(end);
}

/**
 * Remove a range of nodes with transition, store
 * the nodes in a fragment with correct ordering,
 * and call callback when done.
 *
 * @param {Node} start
 * @param {Node} end
 * @param {Vue} vm
 * @param {DocumentFragment} frag
 * @param {Function} cb
 */

function removeNodeRange(start, end, vm, frag, cb) {
  var done = false;
  var removed = 0;
  var nodes = [];
  mapNodeRange(start, end, function (node) {
    if (node === end) done = true;
    nodes.push(node);
    removeWithTransition(node, vm, onRemoved);
  });
  function onRemoved() {
    removed++;
    if (done && removed >= nodes.length) {
      for (var i = 0; i < nodes.length; i++) {
        frag.appendChild(nodes[i]);
      }
      cb && cb();
    }
  }
}

/**
 * Check if a node is a DocumentFragment.
 *
 * @param {Node} node
 * @return {Boolean}
 */

function isFragment(node) {
  return node && node.nodeType === 11;
}

/**
 * Get outerHTML of elements, taking care
 * of SVG elements in IE as well.
 *
 * @param {Element} el
 * @return {String}
 */

function getOuterHTML(el) {
  if (el.outerHTML) {
    return el.outerHTML;
  } else {
    var container = document.createElement('div');
    container.appendChild(el.cloneNode(true));
    return container.innerHTML;
  }
}

var commonTagRE = /^(div|p|span|img|a|b|i|br|ul|ol|li|h1|h2|h3|h4|h5|h6|code|pre|table|th|td|tr|form|label|input|select|option|nav|article|section|header|footer)$/i;
var reservedTagRE = /^(slot|partial|component)$/i;

var isUnknownElement = undefined;
if (process.env.NODE_ENV !== 'production') {
  isUnknownElement = function (el, tag) {
    if (tag.indexOf('-') > -1) {
      // http://stackoverflow.com/a/28210364/1070244
      return el.constructor === window.HTMLUnknownElement || el.constructor === window.HTMLElement;
    } else {
      return (/HTMLUnknownElement/.test(el.toString()) &&
        // Chrome returns unknown for several HTML5 elements.
        // https://code.google.com/p/chromium/issues/detail?id=540526
        // Firefox returns unknown for some "Interactive elements."
        !/^(data|time|rtc|rb|details|dialog|summary)$/.test(tag)
      );
    }
  };
}

/**
 * Check if an element is a component, if yes return its
 * component id.
 *
 * @param {Element} el
 * @param {Object} options
 * @return {Object|undefined}
 */

function checkComponentAttr(el, options) {
  var tag = el.tagName.toLowerCase();
  var hasAttrs = el.hasAttributes();
  if (!commonTagRE.test(tag) && !reservedTagRE.test(tag)) {
    if (resolveAsset(options, 'components', tag)) {
      return { id: tag };
    } else {
      var is = hasAttrs && getIsBinding(el, options);
      if (is) {
        return is;
      } else if (process.env.NODE_ENV !== 'production') {
        var expectedTag = options._componentNameMap && options._componentNameMap[tag];
        if (expectedTag) {
          warn('Unknown custom element: <' + tag + '> - ' + 'did you mean <' + expectedTag + '>? ' + 'HTML is case-insensitive, remember to use kebab-case in templates.');
        } else if (isUnknownElement(el, tag)) {
          warn('Unknown custom element: <' + tag + '> - did you ' + 'register the component correctly? For recursive components, ' + 'make sure to provide the "name" option.');
        }
      }
    }
  } else if (hasAttrs) {
    return getIsBinding(el, options);
  }
}

/**
 * Get "is" binding from an element.
 *
 * @param {Element} el
 * @param {Object} options
 * @return {Object|undefined}
 */

function getIsBinding(el, options) {
  // dynamic syntax
  var exp = el.getAttribute('is');
  if (exp != null) {
    if (resolveAsset(options, 'components', exp)) {
      el.removeAttribute('is');
      return { id: exp };
    }
  } else {
    exp = getBindAttr(el, 'is');
    if (exp != null) {
      return { id: exp, dynamic: true };
    }
  }
}

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 *
 * All strategy functions follow the same signature:
 *
 * @param {*} parentVal
 * @param {*} childVal
 * @param {Vue} [vm]
 */

var strats = config.optionMergeStrategies = Object.create(null);

/**
 * Helper that recursively merges two data objects together.
 */

function mergeData(to, from) {
  var key, toVal, fromVal;
  for (key in from) {
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (isObject(toVal) && isObject(fromVal)) {
      mergeData(toVal, fromVal);
    }
  }
  return to;
}

/**
 * Data
 */

strats.data = function (parentVal, childVal, vm) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal;
    }
    if (typeof childVal !== 'function') {
      process.env.NODE_ENV !== 'production' && warn('The "data" option should be a function ' + 'that returns a per-instance value in component ' + 'definitions.', vm);
      return parentVal;
    }
    if (!parentVal) {
      return childVal;
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn() {
      return mergeData(childVal.call(this), parentVal.call(this));
    };
  } else if (parentVal || childVal) {
    return function mergedInstanceDataFn() {
      // instance merge
      var instanceData = typeof childVal === 'function' ? childVal.call(vm) : childVal;
      var defaultData = typeof parentVal === 'function' ? parentVal.call(vm) : undefined;
      if (instanceData) {
        return mergeData(instanceData, defaultData);
      } else {
        return defaultData;
      }
    };
  }
};

/**
 * El
 */

strats.el = function (parentVal, childVal, vm) {
  if (!vm && childVal && typeof childVal !== 'function') {
    process.env.NODE_ENV !== 'production' && warn('The "el" option should be a function ' + 'that returns a per-instance value in component ' + 'definitions.', vm);
    return;
  }
  var ret = childVal || parentVal;
  // invoke the element factory if this is instance merge
  return vm && typeof ret === 'function' ? ret.call(vm) : ret;
};

/**
 * Hooks and param attributes are merged as arrays.
 */

strats.init = strats.created = strats.ready = strats.attached = strats.detached = strats.beforeCompile = strats.compiled = strats.beforeDestroy = strats.destroyed = strats.activate = function (parentVal, childVal) {
  return childVal ? parentVal ? parentVal.concat(childVal) : isArray(childVal) ? childVal : [childVal] : parentVal;
};

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */

function mergeAssets(parentVal, childVal) {
  var res = Object.create(parentVal || null);
  return childVal ? extend(res, guardArrayAssets(childVal)) : res;
}

config._assetTypes.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Events & Watchers.
 *
 * Events & watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */

strats.watch = strats.events = function (parentVal, childVal) {
  if (!childVal) return parentVal;
  if (!parentVal) return childVal;
  var ret = {};
  extend(ret, parentVal);
  for (var key in childVal) {
    var parent = ret[key];
    var child = childVal[key];
    if (parent && !isArray(parent)) {
      parent = [parent];
    }
    ret[key] = parent ? parent.concat(child) : [child];
  }
  return ret;
};

/**
 * Other object hashes.
 */

strats.props = strats.methods = strats.computed = function (parentVal, childVal) {
  if (!childVal) return parentVal;
  if (!parentVal) return childVal;
  var ret = Object.create(null);
  extend(ret, parentVal);
  extend(ret, childVal);
  return ret;
};

/**
 * Default strategy.
 */

var defaultStrat = function defaultStrat(parentVal, childVal) {
  return childVal === undefined ? parentVal : childVal;
};

/**
 * Make sure component options get converted to actual
 * constructors.
 *
 * @param {Object} options
 */

function guardComponents(options) {
  if (options.components) {
    var components = options.components = guardArrayAssets(options.components);
    var ids = Object.keys(components);
    var def;
    if (process.env.NODE_ENV !== 'production') {
      var map = options._componentNameMap = {};
    }
    for (var i = 0, l = ids.length; i < l; i++) {
      var key = ids[i];
      if (commonTagRE.test(key) || reservedTagRE.test(key)) {
        process.env.NODE_ENV !== 'production' && warn('Do not use built-in or reserved HTML elements as component ' + 'id: ' + key);
        continue;
      }
      // record a all lowercase <-> kebab-case mapping for
      // possible custom element case error warning
      if (process.env.NODE_ENV !== 'production') {
        map[key.replace(/-/g, '').toLowerCase()] = hyphenate(key);
      }
      def = components[key];
      if (isPlainObject(def)) {
        components[key] = Vue.extend(def);
      }
    }
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 *
 * @param {Object} options
 */

function guardProps(options) {
  var props = options.props;
  var i, val;
  if (isArray(props)) {
    options.props = {};
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        options.props[val] = null;
      } else if (val.name) {
        options.props[val.name] = val;
      }
    }
  } else if (isPlainObject(props)) {
    var keys = Object.keys(props);
    i = keys.length;
    while (i--) {
      val = props[keys[i]];
      if (typeof val === 'function') {
        props[keys[i]] = { type: val };
      }
    }
  }
}

/**
 * Guard an Array-format assets option and converted it
 * into the key-value Object format.
 *
 * @param {Object|Array} assets
 * @return {Object}
 */

function guardArrayAssets(assets) {
  if (isArray(assets)) {
    var res = {};
    var i = assets.length;
    var asset;
    while (i--) {
      asset = assets[i];
      var id = typeof asset === 'function' ? asset.options && asset.options.name || asset.id : asset.name || asset.id;
      if (!id) {
        process.env.NODE_ENV !== 'production' && warn('Array-syntax assets must provide a "name" or "id" field.');
      } else {
        res[id] = asset;
      }
    }
    return res;
  }
  return assets;
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 *
 * @param {Object} parent
 * @param {Object} child
 * @param {Vue} [vm] - if vm is present, indicates this is
 *                     an instantiation merge.
 */

function mergeOptions(parent, child, vm) {
  guardComponents(child);
  guardProps(child);
  if (process.env.NODE_ENV !== 'production') {
    if (child.propsData && !vm) {
      warn('propsData can only be used as an instantiation option.');
    }
  }
  var options = {};
  var key;
  if (child['extends']) {
    parent = typeof child['extends'] === 'function' ? mergeOptions(parent, child['extends'].options, vm) : mergeOptions(parent, child['extends'], vm);
  }
  if (child.mixins) {
    for (var i = 0, l = child.mixins.length; i < l; i++) {
      var mixin = child.mixins[i];
      var mixinOptions = mixin.prototype instanceof Vue ? mixin.options : mixin;
      parent = mergeOptions(parent, mixinOptions, vm);
    }
  }
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField(key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options;
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 *
 * @param {Object} options
 * @param {String} type
 * @param {String} id
 * @param {Boolean} warnMissing
 * @return {Object|Function}
 */

function resolveAsset(options, type, id, warnMissing) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return;
  }
  var assets = options[type];
  var camelizedId;
  var res = assets[id] ||
  // camelCase ID
  assets[camelizedId = camelize(id)] ||
  // Pascal Case ID
  assets[camelizedId.charAt(0).toUpperCase() + camelizedId.slice(1)];
  if (process.env.NODE_ENV !== 'production' && warnMissing && !res) {
    warn('Failed to resolve ' + type.slice(0, -1) + ': ' + id, options);
  }
  return res;
}

var uid$1 = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 *
 * @constructor
 */
function Dep() {
  this.id = uid$1++;
  this.subs = [];
}

// the current target watcher being evaluated.
// this is globally unique because there could be only one
// watcher being evaluated at any time.
Dep.target = null;

/**
 * Add a directive subscriber.
 *
 * @param {Directive} sub
 */

Dep.prototype.addSub = function (sub) {
  this.subs.push(sub);
};

/**
 * Remove a directive subscriber.
 *
 * @param {Directive} sub
 */

Dep.prototype.removeSub = function (sub) {
  this.subs.$remove(sub);
};

/**
 * Add self as a dependency to the target watcher.
 */

Dep.prototype.depend = function () {
  Dep.target.addDep(this);
};

/**
 * Notify all subscribers of a new value.
 */

Dep.prototype.notify = function () {
  // stablize the subscriber list first
  var subs = toArray(this.subs);
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto)

/**
 * Intercept mutating methods and emit events
 */

;['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'].forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator() {
    // avoid leaking arguments:
    // http://jsperf.com/closure-with-arguments
    var i = arguments.length;
    var args = new Array(i);
    while (i--) {
      args[i] = arguments[i];
    }
    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
        inserted = args;
        break;
      case 'unshift':
        inserted = args;
        break;
      case 'splice':
        inserted = args.slice(2);
        break;
    }
    if (inserted) ob.observeArray(inserted);
    // notify change
    ob.dep.notify();
    return result;
  });
});

/**
 * Swap the element at the given index with a new value
 * and emits corresponding event.
 *
 * @param {Number} index
 * @param {*} val
 * @return {*} - replaced element
 */

def(arrayProto, '$set', function $set(index, val) {
  if (index >= this.length) {
    this.length = Number(index) + 1;
  }
  return this.splice(index, 1, val)[0];
});

/**
 * Convenience method to remove the element at given index or target element reference.
 *
 * @param {*} item
 */

def(arrayProto, '$remove', function $remove(item) {
  /* istanbul ignore if */
  if (!this.length) return;
  var index = indexOf(this, item);
  if (index > -1) {
    return this.splice(index, 1);
  }
});

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * By default, when a reactive property is set, the new value is
 * also converted to become reactive. However in certain cases, e.g.
 * v-for scope alias and props, we don't want to force conversion
 * because the value may be a nested value under a frozen data structure.
 *
 * So whenever we want to set a reactive property without forcing
 * conversion on the new value, we wrap that call inside this function.
 */

var shouldConvert = true;

function withoutConversion(fn) {
  shouldConvert = false;
  fn();
  shouldConvert = true;
}

/**
 * Observer class that are attached to each observed
 * object. Once attached, the observer converts target
 * object's property keys into getter/setters that
 * collect dependencies and dispatches updates.
 *
 * @param {Array|Object} value
 * @constructor
 */

function Observer(value) {
  this.value = value;
  this.dep = new Dep();
  def(value, '__ob__', this);
  if (isArray(value)) {
    var augment = hasProto ? protoAugment : copyAugment;
    augment(value, arrayMethods, arrayKeys);
    this.observeArray(value);
  } else {
    this.walk(value);
  }
}

// Instance methods

/**
 * Walk through each property and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 *
 * @param {Object} obj
 */

Observer.prototype.walk = function (obj) {
  var keys = Object.keys(obj);
  for (var i = 0, l = keys.length; i < l; i++) {
    this.convert(keys[i], obj[keys[i]]);
  }
};

/**
 * Observe a list of Array items.
 *
 * @param {Array} items
 */

Observer.prototype.observeArray = function (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

/**
 * Convert a property into getter/setter so we can emit
 * the events when the property is accessed/changed.
 *
 * @param {String} key
 * @param {*} val
 */

Observer.prototype.convert = function (key, val) {
  defineReactive(this.value, key, val);
};

/**
 * Add an owner vm, so that when $set/$delete mutations
 * happen we can notify owner vms to proxy the keys and
 * digest the watchers. This is only called when the object
 * is observed as an instance's root $data.
 *
 * @param {Vue} vm
 */

Observer.prototype.addVm = function (vm) {
  (this.vms || (this.vms = [])).push(vm);
};

/**
 * Remove an owner vm. This is called when the object is
 * swapped out as an instance's $data object.
 *
 * @param {Vue} vm
 */

Observer.prototype.removeVm = function (vm) {
  this.vms.$remove(vm);
};

// helpers

/**
 * Augment an target Object or Array by intercepting
 * the prototype chain using __proto__
 *
 * @param {Object|Array} target
 * @param {Object} src
 */

function protoAugment(target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment an target Object or Array by defining
 * hidden properties.
 *
 * @param {Object|Array} target
 * @param {Object} proto
 */

function copyAugment(target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 *
 * @param {*} value
 * @param {Vue} [vm]
 * @return {Observer|undefined}
 * @static
 */

function observe(value, vm) {
  if (!value || typeof value !== 'object') {
    return;
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (shouldConvert && (isArray(value) || isPlainObject(value)) && Object.isExtensible(value) && !value._isVue) {
    ob = new Observer(value);
  }
  if (ob && vm) {
    ob.addVm(vm);
  }
  return ob;
}

/**
 * Define a reactive property on an Object.
 *
 * @param {Object} obj
 * @param {String} key
 * @param {*} val
 */

function defineReactive(obj, key, val) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return;
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;

  var childOb = observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter() {
      var value = getter ? getter.call(obj) : val;
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
        }
        if (isArray(value)) {
          for (var e, i = 0, l = value.length; i < l; i++) {
            e = value[i];
            e && e.__ob__ && e.__ob__.dep.depend();
          }
        }
      }
      return value;
    },
    set: function reactiveSetter(newVal) {
      var value = getter ? getter.call(obj) : val;
      if (newVal === value) {
        return;
      }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = observe(newVal);
      dep.notify();
    }
  });
}



var util = Object.freeze({
	defineReactive: defineReactive,
	set: set,
	del: del,
	hasOwn: hasOwn,
	isLiteral: isLiteral,
	isReserved: isReserved,
	_toString: _toString,
	toNumber: toNumber,
	toBoolean: toBoolean,
	stripQuotes: stripQuotes,
	camelize: camelize,
	hyphenate: hyphenate,
	classify: classify,
	bind: bind,
	toArray: toArray,
	extend: extend,
	isObject: isObject,
	isPlainObject: isPlainObject,
	def: def,
	debounce: _debounce,
	indexOf: indexOf,
	cancellable: cancellable,
	looseEqual: looseEqual,
	isArray: isArray,
	hasProto: hasProto,
	inBrowser: inBrowser,
	devtools: devtools,
	isIE: isIE,
	isIE9: isIE9,
	isAndroid: isAndroid,
	isIos: isIos,
	iosVersionMatch: iosVersionMatch,
	iosVersion: iosVersion,
	hasMutationObserverBug: hasMutationObserverBug,
	get transitionProp () { return transitionProp; },
	get transitionEndEvent () { return transitionEndEvent; },
	get animationProp () { return animationProp; },
	get animationEndEvent () { return animationEndEvent; },
	nextTick: nextTick,
	get _Set () { return _Set; },
	query: query,
	inDoc: inDoc,
	getAttr: getAttr,
	getBindAttr: getBindAttr,
	hasBindAttr: hasBindAttr,
	before: before,
	after: after,
	remove: remove,
	prepend: prepend,
	replace: replace,
	on: on,
	off: off,
	setClass: setClass,
	addClass: addClass,
	removeClass: removeClass,
	extractContent: extractContent,
	trimNode: trimNode,
	isTemplate: isTemplate,
	createAnchor: createAnchor,
	findRef: findRef,
	mapNodeRange: mapNodeRange,
	removeNodeRange: removeNodeRange,
	isFragment: isFragment,
	getOuterHTML: getOuterHTML,
	mergeOptions: mergeOptions,
	resolveAsset: resolveAsset,
	checkComponentAttr: checkComponentAttr,
	commonTagRE: commonTagRE,
	reservedTagRE: reservedTagRE,
	get warn () { return warn; }
});

var uid = 0;

function initMixin (Vue) {
  /**
   * The main init sequence. This is called for every
   * instance, including ones that are created from extended
   * constructors.
   *
   * @param {Object} options - this options object should be
   *                           the result of merging class
   *                           options and the options passed
   *                           in to the constructor.
   */

  Vue.prototype._init = function (options) {
    options = options || {};

    this.$el = null;
    this.$parent = options.parent;
    this.$root = this.$parent ? this.$parent.$root : this;
    this.$children = [];
    this.$refs = {}; // child vm references
    this.$els = {}; // element references
    this._watchers = []; // all watchers as an array
    this._directives = []; // all directives

    // a uid
    this._uid = uid++;

    // a flag to avoid this being observed
    this._isVue = true;

    // events bookkeeping
    this._events = {}; // registered callbacks
    this._eventsCount = {}; // for $broadcast optimization

    // fragment instance properties
    this._isFragment = false;
    this._fragment = // @type {DocumentFragment}
    this._fragmentStart = // @type {Text|Comment}
    this._fragmentEnd = null; // @type {Text|Comment}

    // lifecycle state
    this._isCompiled = this._isDestroyed = this._isReady = this._isAttached = this._isBeingDestroyed = this._vForRemoving = false;
    this._unlinkFn = null;

    // context:
    // if this is a transcluded component, context
    // will be the common parent vm of this instance
    // and its host.
    this._context = options._context || this.$parent;

    // scope:
    // if this is inside an inline v-for, the scope
    // will be the intermediate scope created for this
    // repeat fragment. this is used for linking props
    // and container directives.
    this._scope = options._scope;

    // fragment:
    // if this instance is compiled inside a Fragment, it
    // needs to reigster itself as a child of that fragment
    // for attach/detach to work properly.
    this._frag = options._frag;
    if (this._frag) {
      this._frag.children.push(this);
    }

    // push self into parent / transclusion host
    if (this.$parent) {
      this.$parent.$children.push(this);
    }

    // merge options.
    options = this.$options = mergeOptions(this.constructor.options, options, this);

    // set ref
    this._updateRef();

    // initialize data as empty object.
    // it will be filled up in _initData().
    this._data = {};

    // call init hook
    this._callHook('init');

    // initialize data observation and scope inheritance.
    this._initState();

    // setup event system and option events.
    this._initEvents();

    // call created hook
    this._callHook('created');

    // if `el` option is passed, start compilation.
    if (options.el) {
      this.$mount(options.el);
    }
  };
}

var pathCache = new Cache(1000);

// actions
var APPEND = 0;
var PUSH = 1;
var INC_SUB_PATH_DEPTH = 2;
var PUSH_SUB_PATH = 3;

// states
var BEFORE_PATH = 0;
var IN_PATH = 1;
var BEFORE_IDENT = 2;
var IN_IDENT = 3;
var IN_SUB_PATH = 4;
var IN_SINGLE_QUOTE = 5;
var IN_DOUBLE_QUOTE = 6;
var AFTER_PATH = 7;
var ERROR = 8;

var pathStateMachine = [];

pathStateMachine[BEFORE_PATH] = {
  'ws': [BEFORE_PATH],
  'ident': [IN_IDENT, APPEND],
  '[': [IN_SUB_PATH],
  'eof': [AFTER_PATH]
};

pathStateMachine[IN_PATH] = {
  'ws': [IN_PATH],
  '.': [BEFORE_IDENT],
  '[': [IN_SUB_PATH],
  'eof': [AFTER_PATH]
};

pathStateMachine[BEFORE_IDENT] = {
  'ws': [BEFORE_IDENT],
  'ident': [IN_IDENT, APPEND]
};

pathStateMachine[IN_IDENT] = {
  'ident': [IN_IDENT, APPEND],
  '0': [IN_IDENT, APPEND],
  'number': [IN_IDENT, APPEND],
  'ws': [IN_PATH, PUSH],
  '.': [BEFORE_IDENT, PUSH],
  '[': [IN_SUB_PATH, PUSH],
  'eof': [AFTER_PATH, PUSH]
};

pathStateMachine[IN_SUB_PATH] = {
  "'": [IN_SINGLE_QUOTE, APPEND],
  '"': [IN_DOUBLE_QUOTE, APPEND],
  '[': [IN_SUB_PATH, INC_SUB_PATH_DEPTH],
  ']': [IN_PATH, PUSH_SUB_PATH],
  'eof': ERROR,
  'else': [IN_SUB_PATH, APPEND]
};

pathStateMachine[IN_SINGLE_QUOTE] = {
  "'": [IN_SUB_PATH, APPEND],
  'eof': ERROR,
  'else': [IN_SINGLE_QUOTE, APPEND]
};

pathStateMachine[IN_DOUBLE_QUOTE] = {
  '"': [IN_SUB_PATH, APPEND],
  'eof': ERROR,
  'else': [IN_DOUBLE_QUOTE, APPEND]
};

/**
 * Determine the type of a character in a keypath.
 *
 * @param {Char} ch
 * @return {String} type
 */

function getPathCharType(ch) {
  if (ch === undefined) {
    return 'eof';
  }

  var code = ch.charCodeAt(0);

  switch (code) {
    case 0x5B: // [
    case 0x5D: // ]
    case 0x2E: // .
    case 0x22: // "
    case 0x27: // '
    case 0x30:
      // 0
      return ch;

    case 0x5F: // _
    case 0x24:
      // $
      return 'ident';

    case 0x20: // Space
    case 0x09: // Tab
    case 0x0A: // Newline
    case 0x0D: // Return
    case 0xA0: // No-break space
    case 0xFEFF: // Byte Order Mark
    case 0x2028: // Line Separator
    case 0x2029:
      // Paragraph Separator
      return 'ws';
  }

  // a-z, A-Z
  if (code >= 0x61 && code <= 0x7A || code >= 0x41 && code <= 0x5A) {
    return 'ident';
  }

  // 1-9
  if (code >= 0x31 && code <= 0x39) {
    return 'number';
  }

  return 'else';
}

/**
 * Format a subPath, return its plain form if it is
 * a literal string or number. Otherwise prepend the
 * dynamic indicator (*).
 *
 * @param {String} path
 * @return {String}
 */

function formatSubPath(path) {
  var trimmed = path.trim();
  // invalid leading 0
  if (path.charAt(0) === '0' && isNaN(path)) {
    return false;
  }
  return isLiteral(trimmed) ? stripQuotes(trimmed) : '*' + trimmed;
}

/**
 * Parse a string path into an array of segments
 *
 * @param {String} path
 * @return {Array|undefined}
 */

function parse(path) {
  var keys = [];
  var index = -1;
  var mode = BEFORE_PATH;
  var subPathDepth = 0;
  var c, newChar, key, type, transition, action, typeMap;

  var actions = [];

  actions[PUSH] = function () {
    if (key !== undefined) {
      keys.push(key);
      key = undefined;
    }
  };

  actions[APPEND] = function () {
    if (key === undefined) {
      key = newChar;
    } else {
      key += newChar;
    }
  };

  actions[INC_SUB_PATH_DEPTH] = function () {
    actions[APPEND]();
    subPathDepth++;
  };

  actions[PUSH_SUB_PATH] = function () {
    if (subPathDepth > 0) {
      subPathDepth--;
      mode = IN_SUB_PATH;
      actions[APPEND]();
    } else {
      subPathDepth = 0;
      key = formatSubPath(key);
      if (key === false) {
        return false;
      } else {
        actions[PUSH]();
      }
    }
  };

  function maybeUnescapeQuote() {
    var nextChar = path[index + 1];
    if (mode === IN_SINGLE_QUOTE && nextChar === "'" || mode === IN_DOUBLE_QUOTE && nextChar === '"') {
      index++;
      newChar = '\\' + nextChar;
      actions[APPEND]();
      return true;
    }
  }

  while (mode != null) {
    index++;
    c = path[index];

    if (c === '\\' && maybeUnescapeQuote()) {
      continue;
    }

    type = getPathCharType(c);
    typeMap = pathStateMachine[mode];
    transition = typeMap[type] || typeMap['else'] || ERROR;

    if (transition === ERROR) {
      return; // parse error
    }

    mode = transition[0];
    action = actions[transition[1]];
    if (action) {
      newChar = transition[2];
      newChar = newChar === undefined ? c : newChar;
      if (action() === false) {
        return;
      }
    }

    if (mode === AFTER_PATH) {
      keys.raw = path;
      return keys;
    }
  }
}

/**
 * External parse that check for a cache hit first
 *
 * @param {String} path
 * @return {Array|undefined}
 */

function parsePath(path) {
  var hit = pathCache.get(path);
  if (!hit) {
    hit = parse(path);
    if (hit) {
      pathCache.put(path, hit);
    }
  }
  return hit;
}

/**
 * Get from an object from a path string
 *
 * @param {Object} obj
 * @param {String} path
 */

function getPath(obj, path) {
  return parseExpression(path).get(obj);
}

/**
 * Warn against setting non-existent root path on a vm.
 */

var warnNonExistent;
if (process.env.NODE_ENV !== 'production') {
  warnNonExistent = function (path, vm) {
    warn('You are setting a non-existent path "' + path.raw + '" ' + 'on a vm instance. Consider pre-initializing the property ' + 'with the "data" option for more reliable reactivity ' + 'and better performance.', vm);
  };
}

/**
 * Set on an object from a path
 *
 * @param {Object} obj
 * @param {String | Array} path
 * @param {*} val
 */

function setPath(obj, path, val) {
  var original = obj;
  if (typeof path === 'string') {
    path = parse(path);
  }
  if (!path || !isObject(obj)) {
    return false;
  }
  var last, key;
  for (var i = 0, l = path.length; i < l; i++) {
    last = obj;
    key = path[i];
    if (key.charAt(0) === '*') {
      key = parseExpression(key.slice(1)).get.call(original, original);
    }
    if (i < l - 1) {
      obj = obj[key];
      if (!isObject(obj)) {
        obj = {};
        if (process.env.NODE_ENV !== 'production' && last._isVue) {
          warnNonExistent(path, last);
        }
        set(last, key, obj);
      }
    } else {
      if (isArray(obj)) {
        obj.$set(key, val);
      } else if (key in obj) {
        obj[key] = val;
      } else {
        if (process.env.NODE_ENV !== 'production' && obj._isVue) {
          warnNonExistent(path, obj);
        }
        set(obj, key, val);
      }
    }
  }
  return true;
}

var path = Object.freeze({
  parsePath: parsePath,
  getPath: getPath,
  setPath: setPath
});

var expressionCache = new Cache(1000);

var allowedKeywords = 'Math,Date,this,true,false,null,undefined,Infinity,NaN,' + 'isNaN,isFinite,decodeURI,decodeURIComponent,encodeURI,' + 'encodeURIComponent,parseInt,parseFloat';
var allowedKeywordsRE = new RegExp('^(' + allowedKeywords.replace(/,/g, '\\b|') + '\\b)');

// keywords that don't make sense inside expressions
var improperKeywords = 'break,case,class,catch,const,continue,debugger,default,' + 'delete,do,else,export,extends,finally,for,function,if,' + 'import,in,instanceof,let,return,super,switch,throw,try,' + 'var,while,with,yield,enum,await,implements,package,' + 'protected,static,interface,private,public';
var improperKeywordsRE = new RegExp('^(' + improperKeywords.replace(/,/g, '\\b|') + '\\b)');

var wsRE = /\s/g;
var newlineRE = /\n/g;
var saveRE = /[\{,]\s*[\w\$_]+\s*:|('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*\$\{|\}(?:[^`\\]|\\.)*`|`(?:[^`\\]|\\.)*`)|new |typeof |void /g;
var restoreRE = /"(\d+)"/g;
var pathTestRE = /^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['.*?'\]|\[".*?"\]|\[\d+\]|\[[A-Za-z_$][\w$]*\])*$/;
var identRE = /[^\w$\.](?:[A-Za-z_$][\w$]*)/g;
var literalValueRE$1 = /^(?:true|false|null|undefined|Infinity|NaN)$/;

function noop() {}

/**
 * Save / Rewrite / Restore
 *
 * When rewriting paths found in an expression, it is
 * possible for the same letter sequences to be found in
 * strings and Object literal property keys. Therefore we
 * remove and store these parts in a temporary array, and
 * restore them after the path rewrite.
 */

var saved = [];

/**
 * Save replacer
 *
 * The save regex can match two possible cases:
 * 1. An opening object literal
 * 2. A string
 * If matched as a plain string, we need to escape its
 * newlines, since the string needs to be preserved when
 * generating the function body.
 *
 * @param {String} str
 * @param {String} isString - str if matched as a string
 * @return {String} - placeholder with index
 */

function save(str, isString) {
  var i = saved.length;
  saved[i] = isString ? str.replace(newlineRE, '\\n') : str;
  return '"' + i + '"';
}

/**
 * Path rewrite replacer
 *
 * @param {String} raw
 * @return {String}
 */

function rewrite(raw) {
  var c = raw.charAt(0);
  var path = raw.slice(1);
  if (allowedKeywordsRE.test(path)) {
    return raw;
  } else {
    path = path.indexOf('"') > -1 ? path.replace(restoreRE, restore) : path;
    return c + 'scope.' + path;
  }
}

/**
 * Restore replacer
 *
 * @param {String} str
 * @param {String} i - matched save index
 * @return {String}
 */

function restore(str, i) {
  return saved[i];
}

/**
 * Rewrite an expression, prefixing all path accessors with
 * `scope.` and generate getter/setter functions.
 *
 * @param {String} exp
 * @return {Function}
 */

function compileGetter(exp) {
  if (improperKeywordsRE.test(exp)) {
    process.env.NODE_ENV !== 'production' && warn('Avoid using reserved keywords in expression: ' + exp);
  }
  // reset state
  saved.length = 0;
  // save strings and object literal keys
  var body = exp.replace(saveRE, save).replace(wsRE, '');
  // rewrite all paths
  // pad 1 space here because the regex matches 1 extra char
  body = (' ' + body).replace(identRE, rewrite).replace(restoreRE, restore);
  return makeGetterFn(body);
}

/**
 * Build a getter function. Requires eval.
 *
 * We isolate the try/catch so it doesn't affect the
 * optimization of the parse function when it is not called.
 *
 * @param {String} body
 * @return {Function|undefined}
 */

function makeGetterFn(body) {
  try {
    /* eslint-disable no-new-func */
    return new Function('scope', 'return ' + body + ';');
    /* eslint-enable no-new-func */
  } catch (e) {
    if (process.env.NODE_ENV !== 'production') {
      /* istanbul ignore if */
      if (e.toString().match(/unsafe-eval|CSP/)) {
        warn('It seems you are using the default build of Vue.js in an environment ' + 'with Content Security Policy that prohibits unsafe-eval. ' + 'Use the CSP-compliant build instead: ' + 'http://vuejs.org/guide/installation.html#CSP-compliant-build');
      } else {
        warn('Invalid expression. ' + 'Generated function body: ' + body);
      }
    }
    return noop;
  }
}

/**
 * Compile a setter function for the expression.
 *
 * @param {String} exp
 * @return {Function|undefined}
 */

function compileSetter(exp) {
  var path = parsePath(exp);
  if (path) {
    return function (scope, val) {
      setPath(scope, path, val);
    };
  } else {
    process.env.NODE_ENV !== 'production' && warn('Invalid setter expression: ' + exp);
  }
}

/**
 * Parse an expression into re-written getter/setters.
 *
 * @param {String} exp
 * @param {Boolean} needSet
 * @return {Function}
 */

function parseExpression(exp, needSet) {
  exp = exp.trim();
  // try cache
  var hit = expressionCache.get(exp);
  if (hit) {
    if (needSet && !hit.set) {
      hit.set = compileSetter(hit.exp);
    }
    return hit;
  }
  var res = { exp: exp };
  res.get = isSimplePath(exp) && exp.indexOf('[') < 0
  // optimized super simple getter
  ? makeGetterFn('scope.' + exp)
  // dynamic getter
  : compileGetter(exp);
  if (needSet) {
    res.set = compileSetter(exp);
  }
  expressionCache.put(exp, res);
  return res;
}

/**
 * Check if an expression is a simple path.
 *
 * @param {String} exp
 * @return {Boolean}
 */

function isSimplePath(exp) {
  return pathTestRE.test(exp) &&
  // don't treat literal values as paths
  !literalValueRE$1.test(exp) &&
  // Math constants e.g. Math.PI, Math.E etc.
  exp.slice(0, 5) !== 'Math.';
}

var expression = Object.freeze({
  parseExpression: parseExpression,
  isSimplePath: isSimplePath
});

// we have two separate queues: one for directive updates
// and one for user watcher registered via $watch().
// we want to guarantee directive updates to be called
// before user watchers so that when user watchers are
// triggered, the DOM would have already been in updated
// state.

var queue = [];
var userQueue = [];
var has = {};
var circular = {};
var waiting = false;

/**
 * Reset the batcher's state.
 */

function resetBatcherState() {
  queue.length = 0;
  userQueue.length = 0;
  has = {};
  circular = {};
  waiting = false;
}

/**
 * Flush both queues and run the watchers.
 */

function flushBatcherQueue() {
  var _again = true;

  _function: while (_again) {
    _again = false;

    runBatcherQueue(queue);
    runBatcherQueue(userQueue);
    // user watchers triggered more watchers,
    // keep flushing until it depletes
    if (queue.length) {
      _again = true;
      continue _function;
    }
    // dev tool hook
    /* istanbul ignore if */
    if (devtools && config.devtools) {
      devtools.emit('flush');
    }
    resetBatcherState();
  }
}

/**
 * Run the watchers in a single queue.
 *
 * @param {Array} queue
 */

function runBatcherQueue(queue) {
  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (var i = 0; i < queue.length; i++) {
    var watcher = queue[i];
    var id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if (process.env.NODE_ENV !== 'production' && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > config._maxUpdateCount) {
        warn('You may have an infinite update loop for watcher ' + 'with expression "' + watcher.expression + '"', watcher.vm);
        break;
      }
    }
  }
  queue.length = 0;
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 *
 * @param {Watcher} watcher
 *   properties:
 *   - {Number} id
 *   - {Function} run
 */

function pushWatcher(watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    // push watcher into appropriate queue
    var q = watcher.user ? userQueue : queue;
    has[id] = q.length;
    q.push(watcher);
    // queue the flush
    if (!waiting) {
      waiting = true;
      nextTick(flushBatcherQueue);
    }
  }
}

var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 *
 * @param {Vue} vm
 * @param {String|Function} expOrFn
 * @param {Function} cb
 * @param {Object} options
 *                 - {Array} filters
 *                 - {Boolean} twoWay
 *                 - {Boolean} deep
 *                 - {Boolean} user
 *                 - {Boolean} sync
 *                 - {Boolean} lazy
 *                 - {Function} [preProcess]
 *                 - {Function} [postProcess]
 * @constructor
 */
function Watcher(vm, expOrFn, cb, options) {
  // mix in options
  if (options) {
    extend(this, options);
  }
  var isFn = typeof expOrFn === 'function';
  this.vm = vm;
  vm._watchers.push(this);
  this.expression = expOrFn;
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.prevError = null; // for async error stacks
  // parse expression for getter/setter
  if (isFn) {
    this.getter = expOrFn;
    this.setter = undefined;
  } else {
    var res = parseExpression(expOrFn, this.twoWay);
    this.getter = res.get;
    this.setter = res.set;
  }
  this.value = this.lazy ? undefined : this.get();
  // state for avoiding false triggers for deep and Array
  // watchers during vm._digest()
  this.queued = this.shallow = false;
}

/**
 * Evaluate the getter, and re-collect dependencies.
 */

Watcher.prototype.get = function () {
  this.beforeGet();
  var scope = this.scope || this.vm;
  var value;
  try {
    value = this.getter.call(scope, scope);
  } catch (e) {
    if (process.env.NODE_ENV !== 'production' && config.warnExpressionErrors) {
      warn('Error when evaluating expression ' + '"' + this.expression + '": ' + e.toString(), this.vm);
    }
  }
  // "touch" every property so they are all tracked as
  // dependencies for deep watching
  if (this.deep) {
    traverse(value);
  }
  if (this.preProcess) {
    value = this.preProcess(value);
  }
  if (this.filters) {
    value = scope._applyFilters(value, null, this.filters, false);
  }
  if (this.postProcess) {
    value = this.postProcess(value);
  }
  this.afterGet();
  return value;
};

/**
 * Set the corresponding value with the setter.
 *
 * @param {*} value
 */

Watcher.prototype.set = function (value) {
  var scope = this.scope || this.vm;
  if (this.filters) {
    value = scope._applyFilters(value, this.value, this.filters, true);
  }
  try {
    this.setter.call(scope, scope, value);
  } catch (e) {
    if (process.env.NODE_ENV !== 'production' && config.warnExpressionErrors) {
      warn('Error when evaluating setter ' + '"' + this.expression + '": ' + e.toString(), this.vm);
    }
  }
  // two-way sync for v-for alias
  var forContext = scope.$forContext;
  if (forContext && forContext.alias === this.expression) {
    if (forContext.filters) {
      process.env.NODE_ENV !== 'production' && warn('It seems you are using two-way binding on ' + 'a v-for alias (' + this.expression + '), and the ' + 'v-for has filters. This will not work properly. ' + 'Either remove the filters or use an array of ' + 'objects and bind to object properties instead.', this.vm);
      return;
    }
    forContext._withLock(function () {
      if (scope.$key) {
        // original is an object
        forContext.rawValue[scope.$key] = value;
      } else {
        forContext.rawValue.$set(scope.$index, value);
      }
    });
  }
};

/**
 * Prepare for dependency collection.
 */

Watcher.prototype.beforeGet = function () {
  Dep.target = this;
};

/**
 * Add a dependency to this directive.
 *
 * @param {Dep} dep
 */

Watcher.prototype.addDep = function (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */

Watcher.prototype.afterGet = function () {
  Dep.target = null;
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 *
 * @param {Boolean} shallow
 */

Watcher.prototype.update = function (shallow) {
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync || !config.async) {
    this.run();
  } else {
    // if queued, only overwrite shallow with non-shallow,
    // but not the other way around.
    this.shallow = this.queued ? shallow ? this.shallow : false : !!shallow;
    this.queued = true;
    // record before-push error stack in debug mode
    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && config.debug) {
      this.prevError = new Error('[vue] async stack trace');
    }
    pushWatcher(this);
  }
};

/**
 * Batcher job interface.
 * Will be called by the batcher.
 */

Watcher.prototype.run = function () {
  if (this.active) {
    var value = this.get();
    if (value !== this.value ||
    // Deep watchers and watchers on Object/Arrays should fire even
    // when the value is the same, because the value may
    // have mutated; but only do so if this is a
    // non-shallow update (caused by a vm digest).
    (isObject(value) || this.deep) && !this.shallow) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      // in debug + async mode, when a watcher callbacks
      // throws, we also throw the saved before-push error
      // so the full cross-tick stack trace is available.
      var prevError = this.prevError;
      /* istanbul ignore if */
      if (process.env.NODE_ENV !== 'production' && config.debug && prevError) {
        this.prevError = null;
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          nextTick(function () {
            throw prevError;
          }, 0);
          throw e;
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
    this.queued = this.shallow = false;
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */

Watcher.prototype.evaluate = function () {
  // avoid overwriting another watcher that is being
  // collected.
  var current = Dep.target;
  this.value = this.get();
  this.dirty = false;
  Dep.target = current;
};

/**
 * Depend on all deps collected by this watcher.
 */

Watcher.prototype.depend = function () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subcriber list.
 */

Watcher.prototype.teardown = function () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed or is performing a v-for
    // re-render (the watcher list is then filtered by v-for).
    if (!this.vm._isBeingDestroyed && !this.vm._vForRemoving) {
      this.vm._watchers.$remove(this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
    this.vm = this.cb = this.value = null;
  }
};

/**
 * Recrusively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 *
 * @param {*} val
 */

var seenObjects = new _Set();
function traverse(val, seen) {
  var i = undefined,
      keys = undefined;
  if (!seen) {
    seen = seenObjects;
    seen.clear();
  }
  var isA = isArray(val);
  var isO = isObject(val);
  if ((isA || isO) && Object.isExtensible(val)) {
    if (val.__ob__) {
      var depId = val.__ob__.dep.id;
      if (seen.has(depId)) {
        return;
      } else {
        seen.add(depId);
      }
    }
    if (isA) {
      i = val.length;
      while (i--) traverse(val[i], seen);
    } else if (isO) {
      keys = Object.keys(val);
      i = keys.length;
      while (i--) traverse(val[keys[i]], seen);
    }
  }
}

var text$1 = {

  bind: function bind() {
    this.attr = this.el.nodeType === 3 ? 'data' : 'textContent';
  },

  update: function update(value) {
    this.el[this.attr] = _toString(value);
  }
};

var templateCache = new Cache(1000);
var idSelectorCache = new Cache(1000);

var map = {
  efault: [0, '', ''],
  legend: [1, '<fieldset>', '</fieldset>'],
  tr: [2, '<table><tbody>', '</tbody></table>'],
  col: [2, '<table><tbody></tbody><colgroup>', '</colgroup></table>']
};

map.td = map.th = [3, '<table><tbody><tr>', '</tr></tbody></table>'];

map.option = map.optgroup = [1, '<select multiple="multiple">', '</select>'];

map.thead = map.tbody = map.colgroup = map.caption = map.tfoot = [1, '<table>', '</table>'];

map.g = map.defs = map.symbol = map.use = map.image = map.text = map.circle = map.ellipse = map.line = map.path = map.polygon = map.polyline = map.rect = [1, '<svg ' + 'xmlns="http://www.w3.org/2000/svg" ' + 'xmlns:xlink="http://www.w3.org/1999/xlink" ' + 'xmlns:ev="http://www.w3.org/2001/xml-events"' + 'version="1.1">', '</svg>'];

/**
 * Check if a node is a supported template node with a
 * DocumentFragment content.
 *
 * @param {Node} node
 * @return {Boolean}
 */

function isRealTemplate(node) {
  return isTemplate(node) && isFragment(node.content);
}

var tagRE$1 = /<([\w:-]+)/;
var entityRE = /&#?\w+?;/;
var commentRE = /<!--/;

/**
 * Convert a string template to a DocumentFragment.
 * Determines correct wrapping by tag types. Wrapping
 * strategy found in jQuery & component/domify.
 *
 * @param {String} templateString
 * @param {Boolean} raw
 * @return {DocumentFragment}
 */

function stringToFragment(templateString, raw) {
  // try a cache hit first
  var cacheKey = raw ? templateString : templateString.trim();
  var hit = templateCache.get(cacheKey);
  if (hit) {
    return hit;
  }

  var frag = document.createDocumentFragment();
  var tagMatch = templateString.match(tagRE$1);
  var entityMatch = entityRE.test(templateString);
  var commentMatch = commentRE.test(templateString);

  if (!tagMatch && !entityMatch && !commentMatch) {
    // text only, return a single text node.
    frag.appendChild(document.createTextNode(templateString));
  } else {
    var tag = tagMatch && tagMatch[1];
    var wrap = map[tag] || map.efault;
    var depth = wrap[0];
    var prefix = wrap[1];
    var suffix = wrap[2];
    var node = document.createElement('div');

    node.innerHTML = prefix + templateString + suffix;
    while (depth--) {
      node = node.lastChild;
    }

    var child;
    /* eslint-disable no-cond-assign */
    while (child = node.firstChild) {
      /* eslint-enable no-cond-assign */
      frag.appendChild(child);
    }
  }
  if (!raw) {
    trimNode(frag);
  }
  templateCache.put(cacheKey, frag);
  return frag;
}

/**
 * Convert a template node to a DocumentFragment.
 *
 * @param {Node} node
 * @return {DocumentFragment}
 */

function nodeToFragment(node) {
  // if its a template tag and the browser supports it,
  // its content is already a document fragment. However, iOS Safari has
  // bug when using directly cloned template content with touch
  // events and can cause crashes when the nodes are removed from DOM, so we
  // have to treat template elements as string templates. (#2805)
  /* istanbul ignore if */
  if (isRealTemplate(node)) {
    return stringToFragment(node.innerHTML);
  }
  // script template
  if (node.tagName === 'SCRIPT') {
    return stringToFragment(node.textContent);
  }
  // normal node, clone it to avoid mutating the original
  var clonedNode = cloneNode(node);
  var frag = document.createDocumentFragment();
  var child;
  /* eslint-disable no-cond-assign */
  while (child = clonedNode.firstChild) {
    /* eslint-enable no-cond-assign */
    frag.appendChild(child);
  }
  trimNode(frag);
  return frag;
}

// Test for the presence of the Safari template cloning bug
// https://bugs.webkit.org/showug.cgi?id=137755
var hasBrokenTemplate = (function () {
  /* istanbul ignore else */
  if (inBrowser) {
    var a = document.createElement('div');
    a.innerHTML = '<template>1</template>';
    return !a.cloneNode(true).firstChild.innerHTML;
  } else {
    return false;
  }
})();

// Test for IE10/11 textarea placeholder clone bug
var hasTextareaCloneBug = (function () {
  /* istanbul ignore else */
  if (inBrowser) {
    var t = document.createElement('textarea');
    t.placeholder = 't';
    return t.cloneNode(true).value === 't';
  } else {
    return false;
  }
})();

/**
 * 1. Deal with Safari cloning nested <template> bug by
 *    manually cloning all template instances.
 * 2. Deal with IE10/11 textarea placeholder bug by setting
 *    the correct value after cloning.
 *
 * @param {Element|DocumentFragment} node
 * @return {Element|DocumentFragment}
 */

function cloneNode(node) {
  /* istanbul ignore if */
  if (!node.querySelectorAll) {
    return node.cloneNode();
  }
  var res = node.cloneNode(true);
  var i, original, cloned;
  /* istanbul ignore if */
  if (hasBrokenTemplate) {
    var tempClone = res;
    if (isRealTemplate(node)) {
      node = node.content;
      tempClone = res.content;
    }
    original = node.querySelectorAll('template');
    if (original.length) {
      cloned = tempClone.querySelectorAll('template');
      i = cloned.length;
      while (i--) {
        cloned[i].parentNode.replaceChild(cloneNode(original[i]), cloned[i]);
      }
    }
  }
  /* istanbul ignore if */
  if (hasTextareaCloneBug) {
    if (node.tagName === 'TEXTAREA') {
      res.value = node.value;
    } else {
      original = node.querySelectorAll('textarea');
      if (original.length) {
        cloned = res.querySelectorAll('textarea');
        i = cloned.length;
        while (i--) {
          cloned[i].value = original[i].value;
        }
      }
    }
  }
  return res;
}

/**
 * Process the template option and normalizes it into a
 * a DocumentFragment that can be used as a partial or a
 * instance template.
 *
 * @param {*} template
 *        Possible values include:
 *        - DocumentFragment object
 *        - Node object of type Template
 *        - id selector: '#some-template-id'
 *        - template string: '<div><span>{{msg}}</span></div>'
 * @param {Boolean} shouldClone
 * @param {Boolean} raw
 *        inline HTML interpolation. Do not check for id
 *        selector and keep whitespace in the string.
 * @return {DocumentFragment|undefined}
 */

function parseTemplate(template, shouldClone, raw) {
  var node, frag;

  // if the template is already a document fragment,
  // do nothing
  if (isFragment(template)) {
    trimNode(template);
    return shouldClone ? cloneNode(template) : template;
  }

  if (typeof template === 'string') {
    // id selector
    if (!raw && template.charAt(0) === '#') {
      // id selector can be cached too
      frag = idSelectorCache.get(template);
      if (!frag) {
        node = document.getElementById(template.slice(1));
        if (node) {
          frag = nodeToFragment(node);
          // save selector to cache
          idSelectorCache.put(template, frag);
        }
      }
    } else {
      // normal string template
      frag = stringToFragment(template, raw);
    }
  } else if (template.nodeType) {
    // a direct node
    frag = nodeToFragment(template);
  }

  return frag && shouldClone ? cloneNode(frag) : frag;
}

var template = Object.freeze({
  cloneNode: cloneNode,
  parseTemplate: parseTemplate
});

var html = {

  bind: function bind() {
    // a comment node means this is a binding for
    // {{{ inline unescaped html }}}
    if (this.el.nodeType === 8) {
      // hold nodes
      this.nodes = [];
      // replace the placeholder with proper anchor
      this.anchor = createAnchor('v-html');
      replace(this.el, this.anchor);
    }
  },

  update: function update(value) {
    value = _toString(value);
    if (this.nodes) {
      this.swap(value);
    } else {
      this.el.innerHTML = value;
    }
  },

  swap: function swap(value) {
    // remove old nodes
    var i = this.nodes.length;
    while (i--) {
      remove(this.nodes[i]);
    }
    // convert new value to a fragment
    // do not attempt to retrieve from id selector
    var frag = parseTemplate(value, true, true);
    // save a reference to these nodes so we can remove later
    this.nodes = toArray(frag.childNodes);
    before(frag, this.anchor);
  }
};

/**
 * Abstraction for a partially-compiled fragment.
 * Can optionally compile content with a child scope.
 *
 * @param {Function} linker
 * @param {Vue} vm
 * @param {DocumentFragment} frag
 * @param {Vue} [host]
 * @param {Object} [scope]
 * @param {Fragment} [parentFrag]
 */
function Fragment(linker, vm, frag, host, scope, parentFrag) {
  this.children = [];
  this.childFrags = [];
  this.vm = vm;
  this.scope = scope;
  this.inserted = false;
  this.parentFrag = parentFrag;
  if (parentFrag) {
    parentFrag.childFrags.push(this);
  }
  this.unlink = linker(vm, frag, host, scope, this);
  var single = this.single = frag.childNodes.length === 1 &&
  // do not go single mode if the only node is an anchor
  !frag.childNodes[0].__v_anchor;
  if (single) {
    this.node = frag.childNodes[0];
    this.before = singleBefore;
    this.remove = singleRemove;
  } else {
    this.node = createAnchor('fragment-start');
    this.end = createAnchor('fragment-end');
    this.frag = frag;
    prepend(this.node, frag);
    frag.appendChild(this.end);
    this.before = multiBefore;
    this.remove = multiRemove;
  }
  this.node.__v_frag = this;
}

/**
 * Call attach/detach for all components contained within
 * this fragment. Also do so recursively for all child
 * fragments.
 *
 * @param {Function} hook
 */

Fragment.prototype.callHook = function (hook) {
  var i, l;
  for (i = 0, l = this.childFrags.length; i < l; i++) {
    this.childFrags[i].callHook(hook);
  }
  for (i = 0, l = this.children.length; i < l; i++) {
    hook(this.children[i]);
  }
};

/**
 * Insert fragment before target, single node version
 *
 * @param {Node} target
 * @param {Boolean} withTransition
 */

function singleBefore(target, withTransition) {
  this.inserted = true;
  var method = withTransition !== false ? beforeWithTransition : before;
  method(this.node, target, this.vm);
  if (inDoc(this.node)) {
    this.callHook(attach);
  }
}

/**
 * Remove fragment, single node version
 */

function singleRemove() {
  this.inserted = false;
  var shouldCallRemove = inDoc(this.node);
  var self = this;
  this.beforeRemove();
  removeWithTransition(this.node, this.vm, function () {
    if (shouldCallRemove) {
      self.callHook(detach);
    }
    self.destroy();
  });
}

/**
 * Insert fragment before target, multi-nodes version
 *
 * @param {Node} target
 * @param {Boolean} withTransition
 */

function multiBefore(target, withTransition) {
  this.inserted = true;
  var vm = this.vm;
  var method = withTransition !== false ? beforeWithTransition : before;
  mapNodeRange(this.node, this.end, function (node) {
    method(node, target, vm);
  });
  if (inDoc(this.node)) {
    this.callHook(attach);
  }
}

/**
 * Remove fragment, multi-nodes version
 */

function multiRemove() {
  this.inserted = false;
  var self = this;
  var shouldCallRemove = inDoc(this.node);
  this.beforeRemove();
  removeNodeRange(this.node, this.end, this.vm, this.frag, function () {
    if (shouldCallRemove) {
      self.callHook(detach);
    }
    self.destroy();
  });
}

/**
 * Prepare the fragment for removal.
 */

Fragment.prototype.beforeRemove = function () {
  var i, l;
  for (i = 0, l = this.childFrags.length; i < l; i++) {
    // call the same method recursively on child
    // fragments, depth-first
    this.childFrags[i].beforeRemove(false);
  }
  for (i = 0, l = this.children.length; i < l; i++) {
    // Call destroy for all contained instances,
    // with remove:false and defer:true.
    // Defer is necessary because we need to
    // keep the children to call detach hooks
    // on them.
    this.children[i].$destroy(false, true);
  }
  var dirs = this.unlink.dirs;
  for (i = 0, l = dirs.length; i < l; i++) {
    // disable the watchers on all the directives
    // so that the rendered content stays the same
    // during removal.
    dirs[i]._watcher && dirs[i]._watcher.teardown();
  }
};

/**
 * Destroy the fragment.
 */

Fragment.prototype.destroy = function () {
  if (this.parentFrag) {
    this.parentFrag.childFrags.$remove(this);
  }
  this.node.__v_frag = null;
  this.unlink();
};

/**
 * Call attach hook for a Vue instance.
 *
 * @param {Vue} child
 */

function attach(child) {
  if (!child._isAttached && inDoc(child.$el)) {
    child._callHook('attached');
  }
}

/**
 * Call detach hook for a Vue instance.
 *
 * @param {Vue} child
 */

function detach(child) {
  if (child._isAttached && !inDoc(child.$el)) {
    child._callHook('detached');
  }
}

var linkerCache = new Cache(5000);

/**
 * A factory that can be used to create instances of a
 * fragment. Caches the compiled linker if possible.
 *
 * @param {Vue} vm
 * @param {Element|String} el
 */
function FragmentFactory(vm, el) {
  this.vm = vm;
  var template;
  var isString = typeof el === 'string';
  if (isString || isTemplate(el) && !el.hasAttribute('v-if')) {
    template = parseTemplate(el, true);
  } else {
    template = document.createDocumentFragment();
    template.appendChild(el);
  }
  this.template = template;
  // linker can be cached, but only for components
  var linker;
  var cid = vm.constructor.cid;
  if (cid > 0) {
    var cacheId = cid + (isString ? el : getOuterHTML(el));
    linker = linkerCache.get(cacheId);
    if (!linker) {
      linker = compile(template, vm.$options, true);
      linkerCache.put(cacheId, linker);
    }
  } else {
    linker = compile(template, vm.$options, true);
  }
  this.linker = linker;
}

/**
 * Create a fragment instance with given host and scope.
 *
 * @param {Vue} host
 * @param {Object} scope
 * @param {Fragment} parentFrag
 */

FragmentFactory.prototype.create = function (host, scope, parentFrag) {
  var frag = cloneNode(this.template);
  return new Fragment(this.linker, this.vm, frag, host, scope, parentFrag);
};

var ON = 700;
var MODEL = 800;
var BIND = 850;
var TRANSITION = 1100;
var EL = 1500;
var COMPONENT = 1500;
var PARTIAL = 1750;
var IF = 2100;
var FOR = 2200;
var SLOT = 2300;

var uid$3 = 0;

var vFor = {

  priority: FOR,
  terminal: true,

  params: ['track-by', 'stagger', 'enter-stagger', 'leave-stagger'],

  bind: function bind() {
    // support "item in/of items" syntax
    var inMatch = this.expression.match(/(.*) (?:in|of) (.*)/);
    if (inMatch) {
      var itMatch = inMatch[1].match(/\((.*),(.*)\)/);
      if (itMatch) {
        this.iterator = itMatch[1].trim();
        this.alias = itMatch[2].trim();
      } else {
        this.alias = inMatch[1].trim();
      }
      this.expression = inMatch[2];
    }

    if (!this.alias) {
      process.env.NODE_ENV !== 'production' && warn('Invalid v-for expression "' + this.descriptor.raw + '": ' + 'alias is required.', this.vm);
      return;
    }

    // uid as a cache identifier
    this.id = '__v-for__' + ++uid$3;

    // check if this is an option list,
    // so that we know if we need to update the <select>'s
    // v-model when the option list has changed.
    // because v-model has a lower priority than v-for,
    // the v-model is not bound here yet, so we have to
    // retrive it in the actual updateModel() function.
    var tag = this.el.tagName;
    this.isOption = (tag === 'OPTION' || tag === 'OPTGROUP') && this.el.parentNode.tagName === 'SELECT';

    // setup anchor nodes
    this.start = createAnchor('v-for-start');
    this.end = createAnchor('v-for-end');
    replace(this.el, this.end);
    before(this.start, this.end);

    // cache
    this.cache = Object.create(null);

    // fragment factory
    this.factory = new FragmentFactory(this.vm, this.el);
  },

  update: function update(data) {
    this.diff(data);
    this.updateRef();
    this.updateModel();
  },

  /**
   * Diff, based on new data and old data, determine the
   * minimum amount of DOM manipulations needed to make the
   * DOM reflect the new data Array.
   *
   * The algorithm diffs the new data Array by storing a
   * hidden reference to an owner vm instance on previously
   * seen data. This allows us to achieve O(n) which is
   * better than a levenshtein distance based algorithm,
   * which is O(m * n).
   *
   * @param {Array} data
   */

  diff: function diff(data) {
    // check if the Array was converted from an Object
    var item = data[0];
    var convertedFromObject = this.fromObject = isObject(item) && hasOwn(item, '$key') && hasOwn(item, '$value');

    var trackByKey = this.params.trackBy;
    var oldFrags = this.frags;
    var frags = this.frags = new Array(data.length);
    var alias = this.alias;
    var iterator = this.iterator;
    var start = this.start;
    var end = this.end;
    var inDocument = inDoc(start);
    var init = !oldFrags;
    var i, l, frag, key, value, primitive;

    // First pass, go through the new Array and fill up
    // the new frags array. If a piece of data has a cached
    // instance for it, we reuse it. Otherwise build a new
    // instance.
    for (i = 0, l = data.length; i < l; i++) {
      item = data[i];
      key = convertedFromObject ? item.$key : null;
      value = convertedFromObject ? item.$value : item;
      primitive = !isObject(value);
      frag = !init && this.getCachedFrag(value, i, key);
      if (frag) {
        // reusable fragment
        frag.reused = true;
        // update $index
        frag.scope.$index = i;
        // update $key
        if (key) {
          frag.scope.$key = key;
        }
        // update iterator
        if (iterator) {
          frag.scope[iterator] = key !== null ? key : i;
        }
        // update data for track-by, object repeat &
        // primitive values.
        if (trackByKey || convertedFromObject || primitive) {
          withoutConversion(function () {
            frag.scope[alias] = value;
          });
        }
      } else {
        // new isntance
        frag = this.create(value, alias, i, key);
        frag.fresh = !init;
      }
      frags[i] = frag;
      if (init) {
        frag.before(end);
      }
    }

    // we're done for the initial render.
    if (init) {
      return;
    }

    // Second pass, go through the old fragments and
    // destroy those who are not reused (and remove them
    // from cache)
    var removalIndex = 0;
    var totalRemoved = oldFrags.length - frags.length;
    // when removing a large number of fragments, watcher removal
    // turns out to be a perf bottleneck, so we batch the watcher
    // removals into a single filter call!
    this.vm._vForRemoving = true;
    for (i = 0, l = oldFrags.length; i < l; i++) {
      frag = oldFrags[i];
      if (!frag.reused) {
        this.deleteCachedFrag(frag);
        this.remove(frag, removalIndex++, totalRemoved, inDocument);
      }
    }
    this.vm._vForRemoving = false;
    if (removalIndex) {
      this.vm._watchers = this.vm._watchers.filter(function (w) {
        return w.active;
      });
    }

    // Final pass, move/insert new fragments into the
    // right place.
    var targetPrev, prevEl, currentPrev;
    var insertionIndex = 0;
    for (i = 0, l = frags.length; i < l; i++) {
      frag = frags[i];
      // this is the frag that we should be after
      targetPrev = frags[i - 1];
      prevEl = targetPrev ? targetPrev.staggerCb ? targetPrev.staggerAnchor : targetPrev.end || targetPrev.node : start;
      if (frag.reused && !frag.staggerCb) {
        currentPrev = findPrevFrag(frag, start, this.id);
        if (currentPrev !== targetPrev && (!currentPrev ||
        // optimization for moving a single item.
        // thanks to suggestions by @livoras in #1807
        findPrevFrag(currentPrev, start, this.id) !== targetPrev)) {
          this.move(frag, prevEl);
        }
      } else {
        // new instance, or still in stagger.
        // insert with updated stagger index.
        this.insert(frag, insertionIndex++, prevEl, inDocument);
      }
      frag.reused = frag.fresh = false;
    }
  },

  /**
   * Create a new fragment instance.
   *
   * @param {*} value
   * @param {String} alias
   * @param {Number} index
   * @param {String} [key]
   * @return {Fragment}
   */

  create: function create(value, alias, index, key) {
    var host = this._host;
    // create iteration scope
    var parentScope = this._scope || this.vm;
    var scope = Object.create(parentScope);
    // ref holder for the scope
    scope.$refs = Object.create(parentScope.$refs);
    scope.$els = Object.create(parentScope.$els);
    // make sure point $parent to parent scope
    scope.$parent = parentScope;
    // for two-way binding on alias
    scope.$forContext = this;
    // define scope properties
    // important: define the scope alias without forced conversion
    // so that frozen data structures remain non-reactive.
    withoutConversion(function () {
      defineReactive(scope, alias, value);
    });
    defineReactive(scope, '$index', index);
    if (key) {
      defineReactive(scope, '$key', key);
    } else if (scope.$key) {
      // avoid accidental fallback
      def(scope, '$key', null);
    }
    if (this.iterator) {
      defineReactive(scope, this.iterator, key !== null ? key : index);
    }
    var frag = this.factory.create(host, scope, this._frag);
    frag.forId = this.id;
    this.cacheFrag(value, frag, index, key);
    return frag;
  },

  /**
   * Update the v-ref on owner vm.
   */

  updateRef: function updateRef() {
    var ref = this.descriptor.ref;
    if (!ref) return;
    var hash = (this._scope || this.vm).$refs;
    var refs;
    if (!this.fromObject) {
      refs = this.frags.map(findVmFromFrag);
    } else {
      refs = {};
      this.frags.forEach(function (frag) {
        refs[frag.scope.$key] = findVmFromFrag(frag);
      });
    }
    hash[ref] = refs;
  },

  /**
   * For option lists, update the containing v-model on
   * parent <select>.
   */

  updateModel: function updateModel() {
    if (this.isOption) {
      var parent = this.start.parentNode;
      var model = parent && parent.__v_model;
      if (model) {
        model.forceUpdate();
      }
    }
  },

  /**
   * Insert a fragment. Handles staggering.
   *
   * @param {Fragment} frag
   * @param {Number} index
   * @param {Node} prevEl
   * @param {Boolean} inDocument
   */

  insert: function insert(frag, index, prevEl, inDocument) {
    if (frag.staggerCb) {
      frag.staggerCb.cancel();
      frag.staggerCb = null;
    }
    var staggerAmount = this.getStagger(frag, index, null, 'enter');
    if (inDocument && staggerAmount) {
      // create an anchor and insert it synchronously,
      // so that we can resolve the correct order without
      // worrying about some elements not inserted yet
      var anchor = frag.staggerAnchor;
      if (!anchor) {
        anchor = frag.staggerAnchor = createAnchor('stagger-anchor');
        anchor.__v_frag = frag;
      }
      after(anchor, prevEl);
      var op = frag.staggerCb = cancellable(function () {
        frag.staggerCb = null;
        frag.before(anchor);
        remove(anchor);
      });
      setTimeout(op, staggerAmount);
    } else {
      var target = prevEl.nextSibling;
      /* istanbul ignore if */
      if (!target) {
        // reset end anchor position in case the position was messed up
        // by an external drag-n-drop library.
        after(this.end, prevEl);
        target = this.end;
      }
      frag.before(target);
    }
  },

  /**
   * Remove a fragment. Handles staggering.
   *
   * @param {Fragment} frag
   * @param {Number} index
   * @param {Number} total
   * @param {Boolean} inDocument
   */

  remove: function remove(frag, index, total, inDocument) {
    if (frag.staggerCb) {
      frag.staggerCb.cancel();
      frag.staggerCb = null;
      // it's not possible for the same frag to be removed
      // twice, so if we have a pending stagger callback,
      // it means this frag is queued for enter but removed
      // before its transition started. Since it is already
      // destroyed, we can just leave it in detached state.
      return;
    }
    var staggerAmount = this.getStagger(frag, index, total, 'leave');
    if (inDocument && staggerAmount) {
      var op = frag.staggerCb = cancellable(function () {
        frag.staggerCb = null;
        frag.remove();
      });
      setTimeout(op, staggerAmount);
    } else {
      frag.remove();
    }
  },

  /**
   * Move a fragment to a new position.
   * Force no transition.
   *
   * @param {Fragment} frag
   * @param {Node} prevEl
   */

  move: function move(frag, prevEl) {
    // fix a common issue with Sortable:
    // if prevEl doesn't have nextSibling, this means it's
    // been dragged after the end anchor. Just re-position
    // the end anchor to the end of the container.
    /* istanbul ignore if */
    if (!prevEl.nextSibling) {
      this.end.parentNode.appendChild(this.end);
    }
    frag.before(prevEl.nextSibling, false);
  },

  /**
   * Cache a fragment using track-by or the object key.
   *
   * @param {*} value
   * @param {Fragment} frag
   * @param {Number} index
   * @param {String} [key]
   */

  cacheFrag: function cacheFrag(value, frag, index, key) {
    var trackByKey = this.params.trackBy;
    var cache = this.cache;
    var primitive = !isObject(value);
    var id;
    if (key || trackByKey || primitive) {
      id = getTrackByKey(index, key, value, trackByKey);
      if (!cache[id]) {
        cache[id] = frag;
      } else if (trackByKey !== '$index') {
        process.env.NODE_ENV !== 'production' && this.warnDuplicate(value);
      }
    } else {
      id = this.id;
      if (hasOwn(value, id)) {
        if (value[id] === null) {
          value[id] = frag;
        } else {
          process.env.NODE_ENV !== 'production' && this.warnDuplicate(value);
        }
      } else if (Object.isExtensible(value)) {
        def(value, id, frag);
      } else if (process.env.NODE_ENV !== 'production') {
        warn('Frozen v-for objects cannot be automatically tracked, make sure to ' + 'provide a track-by key.');
      }
    }
    frag.raw = value;
  },

  /**
   * Get a cached fragment from the value/index/key
   *
   * @param {*} value
   * @param {Number} index
   * @param {String} key
   * @return {Fragment}
   */

  getCachedFrag: function getCachedFrag(value, index, key) {
    var trackByKey = this.params.trackBy;
    var primitive = !isObject(value);
    var frag;
    if (key || trackByKey || primitive) {
      var id = getTrackByKey(index, key, value, trackByKey);
      frag = this.cache[id];
    } else {
      frag = value[this.id];
    }
    if (frag && (frag.reused || frag.fresh)) {
      process.env.NODE_ENV !== 'production' && this.warnDuplicate(value);
    }
    return frag;
  },

  /**
   * Delete a fragment from cache.
   *
   * @param {Fragment} frag
   */

  deleteCachedFrag: function deleteCachedFrag(frag) {
    var value = frag.raw;
    var trackByKey = this.params.trackBy;
    var scope = frag.scope;
    var index = scope.$index;
    // fix #948: avoid accidentally fall through to
    // a parent repeater which happens to have $key.
    var key = hasOwn(scope, '$key') && scope.$key;
    var primitive = !isObject(value);
    if (trackByKey || key || primitive) {
      var id = getTrackByKey(index, key, value, trackByKey);
      this.cache[id] = null;
    } else {
      value[this.id] = null;
      frag.raw = null;
    }
  },

  /**
   * Get the stagger amount for an insertion/removal.
   *
   * @param {Fragment} frag
   * @param {Number} index
   * @param {Number} total
   * @param {String} type
   */

  getStagger: function getStagger(frag, index, total, type) {
    type = type + 'Stagger';
    var trans = frag.node.__v_trans;
    var hooks = trans && trans.hooks;
    var hook = hooks && (hooks[type] || hooks.stagger);
    return hook ? hook.call(frag, index, total) : index * parseInt(this.params[type] || this.params.stagger, 10);
  },

  /**
   * Pre-process the value before piping it through the
   * filters. This is passed to and called by the watcher.
   */

  _preProcess: function _preProcess(value) {
    // regardless of type, store the un-filtered raw value.
    this.rawValue = value;
    return value;
  },

  /**
   * Post-process the value after it has been piped through
   * the filters. This is passed to and called by the watcher.
   *
   * It is necessary for this to be called during the
   * watcher's dependency collection phase because we want
   * the v-for to update when the source Object is mutated.
   */

  _postProcess: function _postProcess(value) {
    if (isArray(value)) {
      return value;
    } else if (isPlainObject(value)) {
      // convert plain object to array.
      var keys = Object.keys(value);
      var i = keys.length;
      var res = new Array(i);
      var key;
      while (i--) {
        key = keys[i];
        res[i] = {
          $key: key,
          $value: value[key]
        };
      }
      return res;
    } else {
      if (typeof value === 'number' && !isNaN(value)) {
        value = range(value);
      }
      return value || [];
    }
  },

  unbind: function unbind() {
    if (this.descriptor.ref) {
      (this._scope || this.vm).$refs[this.descriptor.ref] = null;
    }
    if (this.frags) {
      var i = this.frags.length;
      var frag;
      while (i--) {
        frag = this.frags[i];
        this.deleteCachedFrag(frag);
        frag.destroy();
      }
    }
  }
};

/**
 * Helper to find the previous element that is a fragment
 * anchor. This is necessary because a destroyed frag's
 * element could still be lingering in the DOM before its
 * leaving transition finishes, but its inserted flag
 * should have been set to false so we can skip them.
 *
 * If this is a block repeat, we want to make sure we only
 * return frag that is bound to this v-for. (see #929)
 *
 * @param {Fragment} frag
 * @param {Comment|Text} anchor
 * @param {String} id
 * @return {Fragment}
 */

function findPrevFrag(frag, anchor, id) {
  var el = frag.node.previousSibling;
  /* istanbul ignore if */
  if (!el) return;
  frag = el.__v_frag;
  while ((!frag || frag.forId !== id || !frag.inserted) && el !== anchor) {
    el = el.previousSibling;
    /* istanbul ignore if */
    if (!el) return;
    frag = el.__v_frag;
  }
  return frag;
}

/**
 * Find a vm from a fragment.
 *
 * @param {Fragment} frag
 * @return {Vue|undefined}
 */

function findVmFromFrag(frag) {
  var node = frag.node;
  // handle multi-node frag
  if (frag.end) {
    while (!node.__vue__ && node !== frag.end && node.nextSibling) {
      node = node.nextSibling;
    }
  }
  return node.__vue__;
}

/**
 * Create a range array from given number.
 *
 * @param {Number} n
 * @return {Array}
 */

function range(n) {
  var i = -1;
  var ret = new Array(Math.floor(n));
  while (++i < n) {
    ret[i] = i;
  }
  return ret;
}

/**
 * Get the track by key for an item.
 *
 * @param {Number} index
 * @param {String} key
 * @param {*} value
 * @param {String} [trackByKey]
 */

function getTrackByKey(index, key, value, trackByKey) {
  return trackByKey ? trackByKey === '$index' ? index : trackByKey.charAt(0).match(/\w/) ? getPath(value, trackByKey) : value[trackByKey] : key || value;
}

if (process.env.NODE_ENV !== 'production') {
  vFor.warnDuplicate = function (value) {
    warn('Duplicate value found in v-for="' + this.descriptor.raw + '": ' + JSON.stringify(value) + '. Use track-by="$index" if ' + 'you are expecting duplicate values.', this.vm);
  };
}

var vIf = {

  priority: IF,
  terminal: true,

  bind: function bind() {
    var el = this.el;
    if (!el.__vue__) {
      // check else block
      var next = el.nextElementSibling;
      if (next && getAttr(next, 'v-else') !== null) {
        remove(next);
        this.elseEl = next;
      }
      // check main block
      this.anchor = createAnchor('v-if');
      replace(el, this.anchor);
    } else {
      process.env.NODE_ENV !== 'production' && warn('v-if="' + this.expression + '" cannot be ' + 'used on an instance root element.', this.vm);
      this.invalid = true;
    }
  },

  update: function update(value) {
    if (this.invalid) return;
    if (value) {
      if (!this.frag) {
        this.insert();
      }
    } else {
      this.remove();
    }
  },

  insert: function insert() {
    if (this.elseFrag) {
      this.elseFrag.remove();
      this.elseFrag = null;
    }
    // lazy init factory
    if (!this.factory) {
      this.factory = new FragmentFactory(this.vm, this.el);
    }
    this.frag = this.factory.create(this._host, this._scope, this._frag);
    this.frag.before(this.anchor);
  },

  remove: function remove() {
    if (this.frag) {
      this.frag.remove();
      this.frag = null;
    }
    if (this.elseEl && !this.elseFrag) {
      if (!this.elseFactory) {
        this.elseFactory = new FragmentFactory(this.elseEl._context || this.vm, this.elseEl);
      }
      this.elseFrag = this.elseFactory.create(this._host, this._scope, this._frag);
      this.elseFrag.before(this.anchor);
    }
  },

  unbind: function unbind() {
    if (this.frag) {
      this.frag.destroy();
    }
    if (this.elseFrag) {
      this.elseFrag.destroy();
    }
  }
};

var show = {

  bind: function bind() {
    // check else block
    var next = this.el.nextElementSibling;
    if (next && getAttr(next, 'v-else') !== null) {
      this.elseEl = next;
    }
  },

  update: function update(value) {
    this.apply(this.el, value);
    if (this.elseEl) {
      this.apply(this.elseEl, !value);
    }
  },

  apply: function apply(el, value) {
    if (inDoc(el)) {
      applyTransition(el, value ? 1 : -1, toggle, this.vm);
    } else {
      toggle();
    }
    function toggle() {
      el.style.display = value ? '' : 'none';
    }
  }
};

var text$2 = {

  bind: function bind() {
    var self = this;
    var el = this.el;
    var isRange = el.type === 'range';
    var lazy = this.params.lazy;
    var number = this.params.number;
    var debounce = this.params.debounce;

    // handle composition events.
    //   http://blog.evanyou.me/2014/01/03/composition-event/
    // skip this for Android because it handles composition
    // events quite differently. Android doesn't trigger
    // composition events for language input methods e.g.
    // Chinese, but instead triggers them for spelling
    // suggestions... (see Discussion/#162)
    var composing = false;
    if (!isAndroid && !isRange) {
      this.on('compositionstart', function () {
        composing = true;
      });
      this.on('compositionend', function () {
        composing = false;
        // in IE11 the "compositionend" event fires AFTER
        // the "input" event, so the input handler is blocked
        // at the end... have to call it here.
        //
        // #1327: in lazy mode this is unecessary.
        if (!lazy) {
          self.listener();
        }
      });
    }

    // prevent messing with the input when user is typing,
    // and force update on blur.
    this.focused = false;
    if (!isRange && !lazy) {
      this.on('focus', function () {
        self.focused = true;
      });
      this.on('blur', function () {
        self.focused = false;
        // do not sync value after fragment removal (#2017)
        if (!self._frag || self._frag.inserted) {
          self.rawListener();
        }
      });
    }

    // Now attach the main listener
    this.listener = this.rawListener = function () {
      if (composing || !self._bound) {
        return;
      }
      var val = number || isRange ? toNumber(el.value) : el.value;
      self.set(val);
      // force update on next tick to avoid lock & same value
      // also only update when user is not typing
      nextTick(function () {
        if (self._bound && !self.focused) {
          self.update(self._watcher.value);
        }
      });
    };

    // apply debounce
    if (debounce) {
      this.listener = _debounce(this.listener, debounce);
    }

    // Support jQuery events, since jQuery.trigger() doesn't
    // trigger native events in some cases and some plugins
    // rely on $.trigger()
    //
    // We want to make sure if a listener is attached using
    // jQuery, it is also removed with jQuery, that's why
    // we do the check for each directive instance and
    // store that check result on itself. This also allows
    // easier test coverage control by unsetting the global
    // jQuery variable in tests.
    this.hasjQuery = typeof jQuery === 'function';
    if (this.hasjQuery) {
      var method = jQuery.fn.on ? 'on' : 'bind';
      jQuery(el)[method]('change', this.rawListener);
      if (!lazy) {
        jQuery(el)[method]('input', this.listener);
      }
    } else {
      this.on('change', this.rawListener);
      if (!lazy) {
        this.on('input', this.listener);
      }
    }

    // IE9 doesn't fire input event on backspace/del/cut
    if (!lazy && isIE9) {
      this.on('cut', function () {
        nextTick(self.listener);
      });
      this.on('keyup', function (e) {
        if (e.keyCode === 46 || e.keyCode === 8) {
          self.listener();
        }
      });
    }

    // set initial value if present
    if (el.hasAttribute('value') || el.tagName === 'TEXTAREA' && el.value.trim()) {
      this.afterBind = this.listener;
    }
  },

  update: function update(value) {
    // #3029 only update when the value changes. This prevent
    // browsers from overwriting values like selectionStart
    value = _toString(value);
    if (value !== this.el.value) this.el.value = value;
  },

  unbind: function unbind() {
    var el = this.el;
    if (this.hasjQuery) {
      var method = jQuery.fn.off ? 'off' : 'unbind';
      jQuery(el)[method]('change', this.listener);
      jQuery(el)[method]('input', this.listener);
    }
  }
};

var radio = {

  bind: function bind() {
    var self = this;
    var el = this.el;

    this.getValue = function () {
      // value overwrite via v-bind:value
      if (el.hasOwnProperty('_value')) {
        return el._value;
      }
      var val = el.value;
      if (self.params.number) {
        val = toNumber(val);
      }
      return val;
    };

    this.listener = function () {
      self.set(self.getValue());
    };
    this.on('change', this.listener);

    if (el.hasAttribute('checked')) {
      this.afterBind = this.listener;
    }
  },

  update: function update(value) {
    this.el.checked = looseEqual(value, this.getValue());
  }
};

var select = {

  bind: function bind() {
    var _this = this;

    var self = this;
    var el = this.el;

    // method to force update DOM using latest value.
    this.forceUpdate = function () {
      if (self._watcher) {
        self.update(self._watcher.get());
      }
    };

    // check if this is a multiple select
    var multiple = this.multiple = el.hasAttribute('multiple');

    // attach listener
    this.listener = function () {
      var value = getValue(el, multiple);
      value = self.params.number ? isArray(value) ? value.map(toNumber) : toNumber(value) : value;
      self.set(value);
    };
    this.on('change', this.listener);

    // if has initial value, set afterBind
    var initValue = getValue(el, multiple, true);
    if (multiple && initValue.length || !multiple && initValue !== null) {
      this.afterBind = this.listener;
    }

    // All major browsers except Firefox resets
    // selectedIndex with value -1 to 0 when the element
    // is appended to a new parent, therefore we have to
    // force a DOM update whenever that happens...
    this.vm.$on('hook:attached', function () {
      nextTick(_this.forceUpdate);
    });
    if (!inDoc(el)) {
      nextTick(this.forceUpdate);
    }
  },

  update: function update(value) {
    var el = this.el;
    el.selectedIndex = -1;
    var multi = this.multiple && isArray(value);
    var options = el.options;
    var i = options.length;
    var op, val;
    while (i--) {
      op = options[i];
      val = op.hasOwnProperty('_value') ? op._value : op.value;
      /* eslint-disable eqeqeq */
      op.selected = multi ? indexOf$1(value, val) > -1 : looseEqual(value, val);
      /* eslint-enable eqeqeq */
    }
  },

  unbind: function unbind() {
    /* istanbul ignore next */
    this.vm.$off('hook:attached', this.forceUpdate);
  }
};

/**
 * Get select value
 *
 * @param {SelectElement} el
 * @param {Boolean} multi
 * @param {Boolean} init
 * @return {Array|*}
 */

function getValue(el, multi, init) {
  var res = multi ? [] : null;
  var op, val, selected;
  for (var i = 0, l = el.options.length; i < l; i++) {
    op = el.options[i];
    selected = init ? op.hasAttribute('selected') : op.selected;
    if (selected) {
      val = op.hasOwnProperty('_value') ? op._value : op.value;
      if (multi) {
        res.push(val);
      } else {
        return val;
      }
    }
  }
  return res;
}

/**
 * Native Array.indexOf uses strict equal, but in this
 * case we need to match string/numbers with custom equal.
 *
 * @param {Array} arr
 * @param {*} val
 */

function indexOf$1(arr, val) {
  var i = arr.length;
  while (i--) {
    if (looseEqual(arr[i], val)) {
      return i;
    }
  }
  return -1;
}

var checkbox = {

  bind: function bind() {
    var self = this;
    var el = this.el;

    this.getValue = function () {
      return el.hasOwnProperty('_value') ? el._value : self.params.number ? toNumber(el.value) : el.value;
    };

    function getBooleanValue() {
      var val = el.checked;
      if (val && el.hasOwnProperty('_trueValue')) {
        return el._trueValue;
      }
      if (!val && el.hasOwnProperty('_falseValue')) {
        return el._falseValue;
      }
      return val;
    }

    this.listener = function () {
      var model = self._watcher.value;
      if (isArray(model)) {
        var val = self.getValue();
        if (el.checked) {
          if (indexOf(model, val) < 0) {
            model.push(val);
          }
        } else {
          model.$remove(val);
        }
      } else {
        self.set(getBooleanValue());
      }
    };

    this.on('change', this.listener);
    if (el.hasAttribute('checked')) {
      this.afterBind = this.listener;
    }
  },

  update: function update(value) {
    var el = this.el;
    if (isArray(value)) {
      el.checked = indexOf(value, this.getValue()) > -1;
    } else {
      if (el.hasOwnProperty('_trueValue')) {
        el.checked = looseEqual(value, el._trueValue);
      } else {
        el.checked = !!value;
      }
    }
  }
};

var handlers = {
  text: text$2,
  radio: radio,
  select: select,
  checkbox: checkbox
};

var model = {

  priority: MODEL,
  twoWay: true,
  handlers: handlers,
  params: ['lazy', 'number', 'debounce'],

  /**
   * Possible elements:
   *   <select>
   *   <textarea>
   *   <input type="*">
   *     - text
   *     - checkbox
   *     - radio
   *     - number
   */

  bind: function bind() {
    // friendly warning...
    this.checkFilters();
    if (this.hasRead && !this.hasWrite) {
      process.env.NODE_ENV !== 'production' && warn('It seems you are using a read-only filter with ' + 'v-model="' + this.descriptor.raw + '". ' + 'You might want to use a two-way filter to ensure correct behavior.', this.vm);
    }
    var el = this.el;
    var tag = el.tagName;
    var handler;
    if (tag === 'INPUT') {
      handler = handlers[el.type] || handlers.text;
    } else if (tag === 'SELECT') {
      handler = handlers.select;
    } else if (tag === 'TEXTAREA') {
      handler = handlers.text;
    } else {
      process.env.NODE_ENV !== 'production' && warn('v-model does not support element type: ' + tag, this.vm);
      return;
    }
    el.__v_model = this;
    handler.bind.call(this);
    this.update = handler.update;
    this._unbind = handler.unbind;
  },

  /**
   * Check read/write filter stats.
   */

  checkFilters: function checkFilters() {
    var filters = this.filters;
    if (!filters) return;
    var i = filters.length;
    while (i--) {
      var filter = resolveAsset(this.vm.$options, 'filters', filters[i].name);
      if (typeof filter === 'function' || filter.read) {
        this.hasRead = true;
      }
      if (filter.write) {
        this.hasWrite = true;
      }
    }
  },

  unbind: function unbind() {
    this.el.__v_model = null;
    this._unbind && this._unbind();
  }
};

// keyCode aliases
var keyCodes = {
  esc: 27,
  tab: 9,
  enter: 13,
  space: 32,
  'delete': [8, 46],
  up: 38,
  left: 37,
  right: 39,
  down: 40
};

function keyFilter(handler, keys) {
  var codes = keys.map(function (key) {
    var charCode = key.charCodeAt(0);
    if (charCode > 47 && charCode < 58) {
      return parseInt(key, 10);
    }
    if (key.length === 1) {
      charCode = key.toUpperCase().charCodeAt(0);
      if (charCode > 64 && charCode < 91) {
        return charCode;
      }
    }
    return keyCodes[key];
  });
  codes = [].concat.apply([], codes);
  return function keyHandler(e) {
    if (codes.indexOf(e.keyCode) > -1) {
      return handler.call(this, e);
    }
  };
}

function stopFilter(handler) {
  return function stopHandler(e) {
    e.stopPropagation();
    return handler.call(this, e);
  };
}

function preventFilter(handler) {
  return function preventHandler(e) {
    e.preventDefault();
    return handler.call(this, e);
  };
}

function selfFilter(handler) {
  return function selfHandler(e) {
    if (e.target === e.currentTarget) {
      return handler.call(this, e);
    }
  };
}

var on$1 = {

  priority: ON,
  acceptStatement: true,
  keyCodes: keyCodes,

  bind: function bind() {
    // deal with iframes
    if (this.el.tagName === 'IFRAME' && this.arg !== 'load') {
      var self = this;
      this.iframeBind = function () {
        on(self.el.contentWindow, self.arg, self.handler, self.modifiers.capture);
      };
      this.on('load', this.iframeBind);
    }
  },

  update: function update(handler) {
    // stub a noop for v-on with no value,
    // e.g. @mousedown.prevent
    if (!this.descriptor.raw) {
      handler = function () {};
    }

    if (typeof handler !== 'function') {
      process.env.NODE_ENV !== 'production' && warn('v-on:' + this.arg + '="' + this.expression + '" expects a function value, ' + 'got ' + handler, this.vm);
      return;
    }

    // apply modifiers
    if (this.modifiers.stop) {
      handler = stopFilter(handler);
    }
    if (this.modifiers.prevent) {
      handler = preventFilter(handler);
    }
    if (this.modifiers.self) {
      handler = selfFilter(handler);
    }
    // key filter
    var keys = Object.keys(this.modifiers).filter(function (key) {
      return key !== 'stop' && key !== 'prevent' && key !== 'self' && key !== 'capture';
    });
    if (keys.length) {
      handler = keyFilter(handler, keys);
    }

    this.reset();
    this.handler = handler;

    if (this.iframeBind) {
      this.iframeBind();
    } else {
      on(this.el, this.arg, this.handler, this.modifiers.capture);
    }
  },

  reset: function reset() {
    var el = this.iframeBind ? this.el.contentWindow : this.el;
    if (this.handler) {
      off(el, this.arg, this.handler);
    }
  },

  unbind: function unbind() {
    this.reset();
  }
};

var prefixes = ['-webkit-', '-moz-', '-ms-'];
var camelPrefixes = ['Webkit', 'Moz', 'ms'];
var importantRE = /!important;?$/;
var propCache = Object.create(null);

var testEl = null;

var style = {

  deep: true,

  update: function update(value) {
    if (typeof value === 'string') {
      this.el.style.cssText = value;
    } else if (isArray(value)) {
      this.handleObject(value.reduce(extend, {}));
    } else {
      this.handleObject(value || {});
    }
  },

  handleObject: function handleObject(value) {
    // cache object styles so that only changed props
    // are actually updated.
    var cache = this.cache || (this.cache = {});
    var name, val;
    for (name in cache) {
      if (!(name in value)) {
        this.handleSingle(name, null);
        delete cache[name];
      }
    }
    for (name in value) {
      val = value[name];
      if (val !== cache[name]) {
        cache[name] = val;
        this.handleSingle(name, val);
      }
    }
  },

  handleSingle: function handleSingle(prop, value) {
    prop = normalize(prop);
    if (!prop) return; // unsupported prop
    // cast possible numbers/booleans into strings
    if (value != null) value += '';
    if (value) {
      var isImportant = importantRE.test(value) ? 'important' : '';
      if (isImportant) {
        /* istanbul ignore if */
        if (process.env.NODE_ENV !== 'production') {
          warn('It\'s probably a bad idea to use !important with inline rules. ' + 'This feature will be deprecated in a future version of Vue.');
        }
        value = value.replace(importantRE, '').trim();
        this.el.style.setProperty(prop.kebab, value, isImportant);
      } else {
        this.el.style[prop.camel] = value;
      }
    } else {
      this.el.style[prop.camel] = '';
    }
  }

};

/**
 * Normalize a CSS property name.
 * - cache result
 * - auto prefix
 * - camelCase -> dash-case
 *
 * @param {String} prop
 * @return {String}
 */

function normalize(prop) {
  if (propCache[prop]) {
    return propCache[prop];
  }
  var res = prefix(prop);
  propCache[prop] = propCache[res] = res;
  return res;
}

/**
 * Auto detect the appropriate prefix for a CSS property.
 * https://gist.github.com/paulirish/523692
 *
 * @param {String} prop
 * @return {String}
 */

function prefix(prop) {
  prop = hyphenate(prop);
  var camel = camelize(prop);
  var upper = camel.charAt(0).toUpperCase() + camel.slice(1);
  if (!testEl) {
    testEl = document.createElement('div');
  }
  var i = prefixes.length;
  var prefixed;
  if (camel !== 'filter' && camel in testEl.style) {
    return {
      kebab: prop,
      camel: camel
    };
  }
  while (i--) {
    prefixed = camelPrefixes[i] + upper;
    if (prefixed in testEl.style) {
      return {
        kebab: prefixes[i] + prop,
        camel: prefixed
      };
    }
  }
}

// xlink
var xlinkNS = 'http://www.w3.org/1999/xlink';
var xlinkRE = /^xlink:/;

// check for attributes that prohibit interpolations
var disallowedInterpAttrRE = /^v-|^:|^@|^(?:is|transition|transition-mode|debounce|track-by|stagger|enter-stagger|leave-stagger)$/;
// these attributes should also set their corresponding properties
// because they only affect the initial state of the element
var attrWithPropsRE = /^(?:value|checked|selected|muted)$/;
// these attributes expect enumrated values of "true" or "false"
// but are not boolean attributes
var enumeratedAttrRE = /^(?:draggable|contenteditable|spellcheck)$/;

// these attributes should set a hidden property for
// binding v-model to object values
var modelProps = {
  value: '_value',
  'true-value': '_trueValue',
  'false-value': '_falseValue'
};

var bind$1 = {

  priority: BIND,

  bind: function bind() {
    var attr = this.arg;
    var tag = this.el.tagName;
    // should be deep watch on object mode
    if (!attr) {
      this.deep = true;
    }
    // handle interpolation bindings
    var descriptor = this.descriptor;
    var tokens = descriptor.interp;
    if (tokens) {
      // handle interpolations with one-time tokens
      if (descriptor.hasOneTime) {
        this.expression = tokensToExp(tokens, this._scope || this.vm);
      }

      // only allow binding on native attributes
      if (disallowedInterpAttrRE.test(attr) || attr === 'name' && (tag === 'PARTIAL' || tag === 'SLOT')) {
        process.env.NODE_ENV !== 'production' && warn(attr + '="' + descriptor.raw + '": ' + 'attribute interpolation is not allowed in Vue.js ' + 'directives and special attributes.', this.vm);
        this.el.removeAttribute(attr);
        this.invalid = true;
      }

      /* istanbul ignore if */
      if (process.env.NODE_ENV !== 'production') {
        var raw = attr + '="' + descriptor.raw + '": ';
        // warn src
        if (attr === 'src') {
          warn(raw + 'interpolation in "src" attribute will cause ' + 'a 404 request. Use v-bind:src instead.', this.vm);
        }

        // warn style
        if (attr === 'style') {
          warn(raw + 'interpolation in "style" attribute will cause ' + 'the attribute to be discarded in Internet Explorer. ' + 'Use v-bind:style instead.', this.vm);
        }
      }
    }
  },

  update: function update(value) {
    if (this.invalid) {
      return;
    }
    var attr = this.arg;
    if (this.arg) {
      this.handleSingle(attr, value);
    } else {
      this.handleObject(value || {});
    }
  },

  // share object handler with v-bind:class
  handleObject: style.handleObject,

  handleSingle: function handleSingle(attr, value) {
    var el = this.el;
    var interp = this.descriptor.interp;
    if (this.modifiers.camel) {
      attr = camelize(attr);
    }
    if (!interp && attrWithPropsRE.test(attr) && attr in el) {
      var attrValue = attr === 'value' ? value == null // IE9 will set input.value to "null" for null...
      ? '' : value : value;

      if (el[attr] !== attrValue) {
        el[attr] = attrValue;
      }
    }
    // set model props
    var modelProp = modelProps[attr];
    if (!interp && modelProp) {
      el[modelProp] = value;
      // update v-model if present
      var model = el.__v_model;
      if (model) {
        model.listener();
      }
    }
    // do not set value attribute for textarea
    if (attr === 'value' && el.tagName === 'TEXTAREA') {
      el.removeAttribute(attr);
      return;
    }
    // update attribute
    if (enumeratedAttrRE.test(attr)) {
      el.setAttribute(attr, value ? 'true' : 'false');
    } else if (value != null && value !== false) {
      if (attr === 'class') {
        // handle edge case #1960:
        // class interpolation should not overwrite Vue transition class
        if (el.__v_trans) {
          value += ' ' + el.__v_trans.id + '-transition';
        }
        setClass(el, value);
      } else if (xlinkRE.test(attr)) {
        el.setAttributeNS(xlinkNS, attr, value === true ? '' : value);
      } else {
        el.setAttribute(attr, value === true ? '' : value);
      }
    } else {
      el.removeAttribute(attr);
    }
  }
};

var el = {

  priority: EL,

  bind: function bind() {
    /* istanbul ignore if */
    if (!this.arg) {
      return;
    }
    var id = this.id = camelize(this.arg);
    var refs = (this._scope || this.vm).$els;
    if (hasOwn(refs, id)) {
      refs[id] = this.el;
    } else {
      defineReactive(refs, id, this.el);
    }
  },

  unbind: function unbind() {
    var refs = (this._scope || this.vm).$els;
    if (refs[this.id] === this.el) {
      refs[this.id] = null;
    }
  }
};

var ref = {
  bind: function bind() {
    process.env.NODE_ENV !== 'production' && warn('v-ref:' + this.arg + ' must be used on a child ' + 'component. Found on <' + this.el.tagName.toLowerCase() + '>.', this.vm);
  }
};

var cloak = {
  bind: function bind() {
    var el = this.el;
    this.vm.$once('pre-hook:compiled', function () {
      el.removeAttribute('v-cloak');
    });
  }
};

// must export plain object
var directives = {
  text: text$1,
  html: html,
  'for': vFor,
  'if': vIf,
  show: show,
  model: model,
  on: on$1,
  bind: bind$1,
  el: el,
  ref: ref,
  cloak: cloak
};

var vClass = {

  deep: true,

  update: function update(value) {
    if (!value) {
      this.cleanup();
    } else if (typeof value === 'string') {
      this.setClass(value.trim().split(/\s+/));
    } else {
      this.setClass(normalize$1(value));
    }
  },

  setClass: function setClass(value) {
    this.cleanup(value);
    for (var i = 0, l = value.length; i < l; i++) {
      var val = value[i];
      if (val) {
        apply(this.el, val, addClass);
      }
    }
    this.prevKeys = value;
  },

  cleanup: function cleanup(value) {
    var prevKeys = this.prevKeys;
    if (!prevKeys) return;
    var i = prevKeys.length;
    while (i--) {
      var key = prevKeys[i];
      if (!value || value.indexOf(key) < 0) {
        apply(this.el, key, removeClass);
      }
    }
  }
};

/**
 * Normalize objects and arrays (potentially containing objects)
 * into array of strings.
 *
 * @param {Object|Array<String|Object>} value
 * @return {Array<String>}
 */

function normalize$1(value) {
  var res = [];
  if (isArray(value)) {
    for (var i = 0, l = value.length; i < l; i++) {
      var _key = value[i];
      if (_key) {
        if (typeof _key === 'string') {
          res.push(_key);
        } else {
          for (var k in _key) {
            if (_key[k]) res.push(k);
          }
        }
      }
    }
  } else if (isObject(value)) {
    for (var key in value) {
      if (value[key]) res.push(key);
    }
  }
  return res;
}

/**
 * Add or remove a class/classes on an element
 *
 * @param {Element} el
 * @param {String} key The class name. This may or may not
 *                     contain a space character, in such a
 *                     case we'll deal with multiple class
 *                     names at once.
 * @param {Function} fn
 */

function apply(el, key, fn) {
  key = key.trim();
  if (key.indexOf(' ') === -1) {
    fn(el, key);
    return;
  }
  // The key contains one or more space characters.
  // Since a class name doesn't accept such characters, we
  // treat it as multiple classes.
  var keys = key.split(/\s+/);
  for (var i = 0, l = keys.length; i < l; i++) {
    fn(el, keys[i]);
  }
}

var component = {

  priority: COMPONENT,

  params: ['keep-alive', 'transition-mode', 'inline-template'],

  /**
   * Setup. Two possible usages:
   *
   * - static:
   *   <comp> or <div v-component="comp">
   *
   * - dynamic:
   *   <component :is="view">
   */

  bind: function bind() {
    if (!this.el.__vue__) {
      // keep-alive cache
      this.keepAlive = this.params.keepAlive;
      if (this.keepAlive) {
        this.cache = {};
      }
      // check inline-template
      if (this.params.inlineTemplate) {
        // extract inline template as a DocumentFragment
        this.inlineTemplate = extractContent(this.el, true);
      }
      // component resolution related state
      this.pendingComponentCb = this.Component = null;
      // transition related state
      this.pendingRemovals = 0;
      this.pendingRemovalCb = null;
      // create a ref anchor
      this.anchor = createAnchor('v-component');
      replace(this.el, this.anchor);
      // remove is attribute.
      // this is removed during compilation, but because compilation is
      // cached, when the component is used elsewhere this attribute
      // will remain at link time.
      this.el.removeAttribute('is');
      this.el.removeAttribute(':is');
      // remove ref, same as above
      if (this.descriptor.ref) {
        this.el.removeAttribute('v-ref:' + hyphenate(this.descriptor.ref));
      }
      // if static, build right now.
      if (this.literal) {
        this.setComponent(this.expression);
      }
    } else {
      process.env.NODE_ENV !== 'production' && warn('cannot mount component "' + this.expression + '" ' + 'on already mounted element: ' + this.el);
    }
  },

  /**
   * Public update, called by the watcher in the dynamic
   * literal scenario, e.g. <component :is="view">
   */

  update: function update(value) {
    if (!this.literal) {
      this.setComponent(value);
    }
  },

  /**
   * Switch dynamic components. May resolve the component
   * asynchronously, and perform transition based on
   * specified transition mode. Accepts a few additional
   * arguments specifically for vue-router.
   *
   * The callback is called when the full transition is
   * finished.
   *
   * @param {String} value
   * @param {Function} [cb]
   */

  setComponent: function setComponent(value, cb) {
    this.invalidatePending();
    if (!value) {
      // just remove current
      this.unbuild(true);
      this.remove(this.childVM, cb);
      this.childVM = null;
    } else {
      var self = this;
      this.resolveComponent(value, function () {
        self.mountComponent(cb);
      });
    }
  },

  /**
   * Resolve the component constructor to use when creating
   * the child vm.
   *
   * @param {String|Function} value
   * @param {Function} cb
   */

  resolveComponent: function resolveComponent(value, cb) {
    var self = this;
    this.pendingComponentCb = cancellable(function (Component) {
      self.ComponentName = Component.options.name || (typeof value === 'string' ? value : null);
      self.Component = Component;
      cb();
    });
    this.vm._resolveComponent(value, this.pendingComponentCb);
  },

  /**
   * Create a new instance using the current constructor and
   * replace the existing instance. This method doesn't care
   * whether the new component and the old one are actually
   * the same.
   *
   * @param {Function} [cb]
   */

  mountComponent: function mountComponent(cb) {
    // actual mount
    this.unbuild(true);
    var self = this;
    var activateHooks = this.Component.options.activate;
    var cached = this.getCached();
    var newComponent = this.build();
    if (activateHooks && !cached) {
      this.waitingFor = newComponent;
      callActivateHooks(activateHooks, newComponent, function () {
        if (self.waitingFor !== newComponent) {
          return;
        }
        self.waitingFor = null;
        self.transition(newComponent, cb);
      });
    } else {
      // update ref for kept-alive component
      if (cached) {
        newComponent._updateRef();
      }
      this.transition(newComponent, cb);
    }
  },

  /**
   * When the component changes or unbinds before an async
   * constructor is resolved, we need to invalidate its
   * pending callback.
   */

  invalidatePending: function invalidatePending() {
    if (this.pendingComponentCb) {
      this.pendingComponentCb.cancel();
      this.pendingComponentCb = null;
    }
  },

  /**
   * Instantiate/insert a new child vm.
   * If keep alive and has cached instance, insert that
   * instance; otherwise build a new one and cache it.
   *
   * @param {Object} [extraOptions]
   * @return {Vue} - the created instance
   */

  build: function build(extraOptions) {
    var cached = this.getCached();
    if (cached) {
      return cached;
    }
    if (this.Component) {
      // default options
      var options = {
        name: this.ComponentName,
        el: cloneNode(this.el),
        template: this.inlineTemplate,
        // make sure to add the child with correct parent
        // if this is a transcluded component, its parent
        // should be the transclusion host.
        parent: this._host || this.vm,
        // if no inline-template, then the compiled
        // linker can be cached for better performance.
        _linkerCachable: !this.inlineTemplate,
        _ref: this.descriptor.ref,
        _asComponent: true,
        _isRouterView: this._isRouterView,
        // if this is a transcluded component, context
        // will be the common parent vm of this instance
        // and its host.
        _context: this.vm,
        // if this is inside an inline v-for, the scope
        // will be the intermediate scope created for this
        // repeat fragment. this is used for linking props
        // and container directives.
        _scope: this._scope,
        // pass in the owner fragment of this component.
        // this is necessary so that the fragment can keep
        // track of its contained components in order to
        // call attach/detach hooks for them.
        _frag: this._frag
      };
      // extra options
      // in 1.0.0 this is used by vue-router only
      /* istanbul ignore if */
      if (extraOptions) {
        extend(options, extraOptions);
      }
      var child = new this.Component(options);
      if (this.keepAlive) {
        this.cache[this.Component.cid] = child;
      }
      /* istanbul ignore if */
      if (process.env.NODE_ENV !== 'production' && this.el.hasAttribute('transition') && child._isFragment) {
        warn('Transitions will not work on a fragment instance. ' + 'Template: ' + child.$options.template, child);
      }
      return child;
    }
  },

  /**
   * Try to get a cached instance of the current component.
   *
   * @return {Vue|undefined}
   */

  getCached: function getCached() {
    return this.keepAlive && this.cache[this.Component.cid];
  },

  /**
   * Teardown the current child, but defers cleanup so
   * that we can separate the destroy and removal steps.
   *
   * @param {Boolean} defer
   */

  unbuild: function unbuild(defer) {
    if (this.waitingFor) {
      if (!this.keepAlive) {
        this.waitingFor.$destroy();
      }
      this.waitingFor = null;
    }
    var child = this.childVM;
    if (!child || this.keepAlive) {
      if (child) {
        // remove ref
        child._inactive = true;
        child._updateRef(true);
      }
      return;
    }
    // the sole purpose of `deferCleanup` is so that we can
    // "deactivate" the vm right now and perform DOM removal
    // later.
    child.$destroy(false, defer);
  },

  /**
   * Remove current destroyed child and manually do
   * the cleanup after removal.
   *
   * @param {Function} cb
   */

  remove: function remove(child, cb) {
    var keepAlive = this.keepAlive;
    if (child) {
      // we may have a component switch when a previous
      // component is still being transitioned out.
      // we want to trigger only one lastest insertion cb
      // when the existing transition finishes. (#1119)
      this.pendingRemovals++;
      this.pendingRemovalCb = cb;
      var self = this;
      child.$remove(function () {
        self.pendingRemovals--;
        if (!keepAlive) child._cleanup();
        if (!self.pendingRemovals && self.pendingRemovalCb) {
          self.pendingRemovalCb();
          self.pendingRemovalCb = null;
        }
      });
    } else if (cb) {
      cb();
    }
  },

  /**
   * Actually swap the components, depending on the
   * transition mode. Defaults to simultaneous.
   *
   * @param {Vue} target
   * @param {Function} [cb]
   */

  transition: function transition(target, cb) {
    var self = this;
    var current = this.childVM;
    // for devtool inspection
    if (current) current._inactive = true;
    target._inactive = false;
    this.childVM = target;
    switch (self.params.transitionMode) {
      case 'in-out':
        target.$before(self.anchor, function () {
          self.remove(current, cb);
        });
        break;
      case 'out-in':
        self.remove(current, function () {
          target.$before(self.anchor, cb);
        });
        break;
      default:
        self.remove(current);
        target.$before(self.anchor, cb);
    }
  },

  /**
   * Unbind.
   */

  unbind: function unbind() {
    this.invalidatePending();
    // Do not defer cleanup when unbinding
    this.unbuild();
    // destroy all keep-alive cached instances
    if (this.cache) {
      for (var key in this.cache) {
        this.cache[key].$destroy();
      }
      this.cache = null;
    }
  }
};

/**
 * Call activate hooks in order (asynchronous)
 *
 * @param {Array} hooks
 * @param {Vue} vm
 * @param {Function} cb
 */

function callActivateHooks(hooks, vm, cb) {
  var total = hooks.length;
  var called = 0;
  hooks[0].call(vm, next);
  function next() {
    if (++called >= total) {
      cb();
    } else {
      hooks[called].call(vm, next);
    }
  }
}

var propBindingModes = config._propBindingModes;
var empty = {};

// regexes
var identRE$1 = /^[$_a-zA-Z]+[\w$]*$/;
var settablePathRE = /^[A-Za-z_$][\w$]*(\.[A-Za-z_$][\w$]*|\[[^\[\]]+\])*$/;

/**
 * Compile props on a root element and return
 * a props link function.
 *
 * @param {Element|DocumentFragment} el
 * @param {Array} propOptions
 * @param {Vue} vm
 * @return {Function} propsLinkFn
 */

function compileProps(el, propOptions, vm) {
  var props = [];
  var names = Object.keys(propOptions);
  var i = names.length;
  var options, name, attr, value, path, parsed, prop;
  while (i--) {
    name = names[i];
    options = propOptions[name] || empty;

    if (process.env.NODE_ENV !== 'production' && name === '$data') {
      warn('Do not use $data as prop.', vm);
      continue;
    }

    // props could contain dashes, which will be
    // interpreted as minus calculations by the parser
    // so we need to camelize the path here
    path = camelize(name);
    if (!identRE$1.test(path)) {
      process.env.NODE_ENV !== 'production' && warn('Invalid prop key: "' + name + '". Prop keys ' + 'must be valid identifiers.', vm);
      continue;
    }

    prop = {
      name: name,
      path: path,
      options: options,
      mode: propBindingModes.ONE_WAY,
      raw: null
    };

    attr = hyphenate(name);
    // first check dynamic version
    if ((value = getBindAttr(el, attr)) === null) {
      if ((value = getBindAttr(el, attr + '.sync')) !== null) {
        prop.mode = propBindingModes.TWO_WAY;
      } else if ((value = getBindAttr(el, attr + '.once')) !== null) {
        prop.mode = propBindingModes.ONE_TIME;
      }
    }
    if (value !== null) {
      // has dynamic binding!
      prop.raw = value;
      parsed = parseDirective(value);
      value = parsed.expression;
      prop.filters = parsed.filters;
      // check binding type
      if (isLiteral(value) && !parsed.filters) {
        // for expressions containing literal numbers and
        // booleans, there's no need to setup a prop binding,
        // so we can optimize them as a one-time set.
        prop.optimizedLiteral = true;
      } else {
        prop.dynamic = true;
        // check non-settable path for two-way bindings
        if (process.env.NODE_ENV !== 'production' && prop.mode === propBindingModes.TWO_WAY && !settablePathRE.test(value)) {
          prop.mode = propBindingModes.ONE_WAY;
          warn('Cannot bind two-way prop with non-settable ' + 'parent path: ' + value, vm);
        }
      }
      prop.parentPath = value;

      // warn required two-way
      if (process.env.NODE_ENV !== 'production' && options.twoWay && prop.mode !== propBindingModes.TWO_WAY) {
        warn('Prop "' + name + '" expects a two-way binding type.', vm);
      }
    } else if ((value = getAttr(el, attr)) !== null) {
      // has literal binding!
      prop.raw = value;
    } else if (process.env.NODE_ENV !== 'production') {
      // check possible camelCase prop usage
      var lowerCaseName = path.toLowerCase();
      value = /[A-Z\-]/.test(name) && (el.getAttribute(lowerCaseName) || el.getAttribute(':' + lowerCaseName) || el.getAttribute('v-bind:' + lowerCaseName) || el.getAttribute(':' + lowerCaseName + '.once') || el.getAttribute('v-bind:' + lowerCaseName + '.once') || el.getAttribute(':' + lowerCaseName + '.sync') || el.getAttribute('v-bind:' + lowerCaseName + '.sync'));
      if (value) {
        warn('Possible usage error for prop `' + lowerCaseName + '` - ' + 'did you mean `' + attr + '`? HTML is case-insensitive, remember to use ' + 'kebab-case for props in templates.', vm);
      } else if (options.required) {
        // warn missing required
        warn('Missing required prop: ' + name, vm);
      }
    }
    // push prop
    props.push(prop);
  }
  return makePropsLinkFn(props);
}

/**
 * Build a function that applies props to a vm.
 *
 * @param {Array} props
 * @return {Function} propsLinkFn
 */

function makePropsLinkFn(props) {
  return function propsLinkFn(vm, scope) {
    // store resolved props info
    vm._props = {};
    var inlineProps = vm.$options.propsData;
    var i = props.length;
    var prop, path, options, value, raw;
    while (i--) {
      prop = props[i];
      raw = prop.raw;
      path = prop.path;
      options = prop.options;
      vm._props[path] = prop;
      if (inlineProps && hasOwn(inlineProps, path)) {
        initProp(vm, prop, inlineProps[path]);
      }if (raw === null) {
        // initialize absent prop
        initProp(vm, prop, undefined);
      } else if (prop.dynamic) {
        // dynamic prop
        if (prop.mode === propBindingModes.ONE_TIME) {
          // one time binding
          value = (scope || vm._context || vm).$get(prop.parentPath);
          initProp(vm, prop, value);
        } else {
          if (vm._context) {
            // dynamic binding
            vm._bindDir({
              name: 'prop',
              def: propDef,
              prop: prop
            }, null, null, scope); // el, host, scope
          } else {
              // root instance
              initProp(vm, prop, vm.$get(prop.parentPath));
            }
        }
      } else if (prop.optimizedLiteral) {
        // optimized literal, cast it and just set once
        var stripped = stripQuotes(raw);
        value = stripped === raw ? toBoolean(toNumber(raw)) : stripped;
        initProp(vm, prop, value);
      } else {
        // string literal, but we need to cater for
        // Boolean props with no value, or with same
        // literal value (e.g. disabled="disabled")
        // see https://github.com/vuejs/vue-loader/issues/182
        value = options.type === Boolean && (raw === '' || raw === hyphenate(prop.name)) ? true : raw;
        initProp(vm, prop, value);
      }
    }
  };
}

/**
 * Process a prop with a rawValue, applying necessary coersions,
 * default values & assertions and call the given callback with
 * processed value.
 *
 * @param {Vue} vm
 * @param {Object} prop
 * @param {*} rawValue
 * @param {Function} fn
 */

function processPropValue(vm, prop, rawValue, fn) {
  var isSimple = prop.dynamic && isSimplePath(prop.parentPath);
  var value = rawValue;
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop);
  }
  value = coerceProp(prop, value, vm);
  var coerced = value !== rawValue;
  if (!assertProp(prop, value, vm)) {
    value = undefined;
  }
  if (isSimple && !coerced) {
    withoutConversion(function () {
      fn(value);
    });
  } else {
    fn(value);
  }
}

/**
 * Set a prop's initial value on a vm and its data object.
 *
 * @param {Vue} vm
 * @param {Object} prop
 * @param {*} value
 */

function initProp(vm, prop, value) {
  processPropValue(vm, prop, value, function (value) {
    defineReactive(vm, prop.path, value);
  });
}

/**
 * Update a prop's value on a vm.
 *
 * @param {Vue} vm
 * @param {Object} prop
 * @param {*} value
 */

function updateProp(vm, prop, value) {
  processPropValue(vm, prop, value, function (value) {
    vm[prop.path] = value;
  });
}

/**
 * Get the default value of a prop.
 *
 * @param {Vue} vm
 * @param {Object} prop
 * @return {*}
 */

function getPropDefaultValue(vm, prop) {
  // no default, return undefined
  var options = prop.options;
  if (!hasOwn(options, 'default')) {
    // absent boolean value defaults to false
    return options.type === Boolean ? false : undefined;
  }
  var def = options['default'];
  // warn against non-factory defaults for Object & Array
  if (isObject(def)) {
    process.env.NODE_ENV !== 'production' && warn('Invalid default value for prop "' + prop.name + '": ' + 'Props with type Object/Array must use a factory function ' + 'to return the default value.', vm);
  }
  // call factory function for non-Function types
  return typeof def === 'function' && options.type !== Function ? def.call(vm) : def;
}

/**
 * Assert whether a prop is valid.
 *
 * @param {Object} prop
 * @param {*} value
 * @param {Vue} vm
 */

function assertProp(prop, value, vm) {
  if (!prop.options.required && ( // non-required
  prop.raw === null || // abscent
  value == null) // null or undefined
  ) {
      return true;
    }
  var options = prop.options;
  var type = options.type;
  var valid = !type;
  var expectedTypes = [];
  if (type) {
    if (!isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType);
      valid = assertedType.valid;
    }
  }
  if (!valid) {
    if (process.env.NODE_ENV !== 'production') {
      warn('Invalid prop: type check failed for prop "' + prop.name + '".' + ' Expected ' + expectedTypes.map(formatType).join(', ') + ', got ' + formatValue(value) + '.', vm);
    }
    return false;
  }
  var validator = options.validator;
  if (validator) {
    if (!validator(value)) {
      process.env.NODE_ENV !== 'production' && warn('Invalid prop: custom validator check failed for prop "' + prop.name + '".', vm);
      return false;
    }
  }
  return true;
}

/**
 * Force parsing value with coerce option.
 *
 * @param {*} value
 * @param {Object} options
 * @return {*}
 */

function coerceProp(prop, value, vm) {
  var coerce = prop.options.coerce;
  if (!coerce) {
    return value;
  }
  if (typeof coerce === 'function') {
    return coerce(value);
  } else {
    process.env.NODE_ENV !== 'production' && warn('Invalid coerce for prop "' + prop.name + '": expected function, got ' + typeof coerce + '.', vm);
    return value;
  }
}

/**
 * Assert the type of a value
 *
 * @param {*} value
 * @param {Function} type
 * @return {Object}
 */

function assertType(value, type) {
  var valid;
  var expectedType;
  if (type === String) {
    expectedType = 'string';
    valid = typeof value === expectedType;
  } else if (type === Number) {
    expectedType = 'number';
    valid = typeof value === expectedType;
  } else if (type === Boolean) {
    expectedType = 'boolean';
    valid = typeof value === expectedType;
  } else if (type === Function) {
    expectedType = 'function';
    valid = typeof value === expectedType;
  } else if (type === Object) {
    expectedType = 'object';
    valid = isPlainObject(value);
  } else if (type === Array) {
    expectedType = 'array';
    valid = isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  };
}

/**
 * Format type for output
 *
 * @param {String} type
 * @return {String}
 */

function formatType(type) {
  return type ? type.charAt(0).toUpperCase() + type.slice(1) : 'custom type';
}

/**
 * Format value
 *
 * @param {*} value
 * @return {String}
 */

function formatValue(val) {
  return Object.prototype.toString.call(val).slice(8, -1);
}

var bindingModes = config._propBindingModes;

var propDef = {

  bind: function bind() {
    var child = this.vm;
    var parent = child._context;
    // passed in from compiler directly
    var prop = this.descriptor.prop;
    var childKey = prop.path;
    var parentKey = prop.parentPath;
    var twoWay = prop.mode === bindingModes.TWO_WAY;

    var parentWatcher = this.parentWatcher = new Watcher(parent, parentKey, function (val) {
      updateProp(child, prop, val);
    }, {
      twoWay: twoWay,
      filters: prop.filters,
      // important: props need to be observed on the
      // v-for scope if present
      scope: this._scope
    });

    // set the child initial value.
    initProp(child, prop, parentWatcher.value);

    // setup two-way binding
    if (twoWay) {
      // important: defer the child watcher creation until
      // the created hook (after data observation)
      var self = this;
      child.$once('pre-hook:created', function () {
        self.childWatcher = new Watcher(child, childKey, function (val) {
          parentWatcher.set(val);
        }, {
          // ensure sync upward before parent sync down.
          // this is necessary in cases e.g. the child
          // mutates a prop array, then replaces it. (#1683)
          sync: true
        });
      });
    }
  },

  unbind: function unbind() {
    this.parentWatcher.teardown();
    if (this.childWatcher) {
      this.childWatcher.teardown();
    }
  }
};

var queue$1 = [];
var queued = false;

/**
 * Push a job into the queue.
 *
 * @param {Function} job
 */

function pushJob(job) {
  queue$1.push(job);
  if (!queued) {
    queued = true;
    nextTick(flush);
  }
}

/**
 * Flush the queue, and do one forced reflow before
 * triggering transitions.
 */

function flush() {
  // Force layout
  var f = document.documentElement.offsetHeight;
  for (var i = 0; i < queue$1.length; i++) {
    queue$1[i]();
  }
  queue$1 = [];
  queued = false;
  // dummy return, so js linters don't complain about
  // unused variable f
  return f;
}

var TYPE_TRANSITION = 'transition';
var TYPE_ANIMATION = 'animation';
var transDurationProp = transitionProp + 'Duration';
var animDurationProp = animationProp + 'Duration';

/**
 * If a just-entered element is applied the
 * leave class while its enter transition hasn't started yet,
 * and the transitioned property has the same value for both
 * enter/leave, then the leave transition will be skipped and
 * the transitionend event never fires. This function ensures
 * its callback to be called after a transition has started
 * by waiting for double raf.
 *
 * It falls back to setTimeout on devices that support CSS
 * transitions but not raf (e.g. Android 4.2 browser) - since
 * these environments are usually slow, we are giving it a
 * relatively large timeout.
 */

var raf = inBrowser && window.requestAnimationFrame;
var waitForTransitionStart = raf
/* istanbul ignore next */
? function (fn) {
  raf(function () {
    raf(fn);
  });
} : function (fn) {
  setTimeout(fn, 50);
};

/**
 * A Transition object that encapsulates the state and logic
 * of the transition.
 *
 * @param {Element} el
 * @param {String} id
 * @param {Object} hooks
 * @param {Vue} vm
 */
function Transition(el, id, hooks, vm) {
  this.id = id;
  this.el = el;
  this.enterClass = hooks && hooks.enterClass || id + '-enter';
  this.leaveClass = hooks && hooks.leaveClass || id + '-leave';
  this.hooks = hooks;
  this.vm = vm;
  // async state
  this.pendingCssEvent = this.pendingCssCb = this.cancel = this.pendingJsCb = this.op = this.cb = null;
  this.justEntered = false;
  this.entered = this.left = false;
  this.typeCache = {};
  // check css transition type
  this.type = hooks && hooks.type;
  /* istanbul ignore if */
  if (process.env.NODE_ENV !== 'production') {
    if (this.type && this.type !== TYPE_TRANSITION && this.type !== TYPE_ANIMATION) {
      warn('invalid CSS transition type for transition="' + this.id + '": ' + this.type, vm);
    }
  }
  // bind
  var self = this;['enterNextTick', 'enterDone', 'leaveNextTick', 'leaveDone'].forEach(function (m) {
    self[m] = bind(self[m], self);
  });
}

var p$1 = Transition.prototype;

/**
 * Start an entering transition.
 *
 * 1. enter transition triggered
 * 2. call beforeEnter hook
 * 3. add enter class
 * 4. insert/show element
 * 5. call enter hook (with possible explicit js callback)
 * 6. reflow
 * 7. based on transition type:
 *    - transition:
 *        remove class now, wait for transitionend,
 *        then done if there's no explicit js callback.
 *    - animation:
 *        wait for animationend, remove class,
 *        then done if there's no explicit js callback.
 *    - no css transition:
 *        done now if there's no explicit js callback.
 * 8. wait for either done or js callback, then call
 *    afterEnter hook.
 *
 * @param {Function} op - insert/show the element
 * @param {Function} [cb]
 */

p$1.enter = function (op, cb) {
  this.cancelPending();
  this.callHook('beforeEnter');
  this.cb = cb;
  addClass(this.el, this.enterClass);
  op();
  this.entered = false;
  this.callHookWithCb('enter');
  if (this.entered) {
    return; // user called done synchronously.
  }
  this.cancel = this.hooks && this.hooks.enterCancelled;
  pushJob(this.enterNextTick);
};

/**
 * The "nextTick" phase of an entering transition, which is
 * to be pushed into a queue and executed after a reflow so
 * that removing the class can trigger a CSS transition.
 */

p$1.enterNextTick = function () {
  var _this = this;

  // prevent transition skipping
  this.justEntered = true;
  waitForTransitionStart(function () {
    _this.justEntered = false;
  });
  var enterDone = this.enterDone;
  var type = this.getCssTransitionType(this.enterClass);
  if (!this.pendingJsCb) {
    if (type === TYPE_TRANSITION) {
      // trigger transition by removing enter class now
      removeClass(this.el, this.enterClass);
      this.setupCssCb(transitionEndEvent, enterDone);
    } else if (type === TYPE_ANIMATION) {
      this.setupCssCb(animationEndEvent, enterDone);
    } else {
      enterDone();
    }
  } else if (type === TYPE_TRANSITION) {
    removeClass(this.el, this.enterClass);
  }
};

/**
 * The "cleanup" phase of an entering transition.
 */

p$1.enterDone = function () {
  this.entered = true;
  this.cancel = this.pendingJsCb = null;
  removeClass(this.el, this.enterClass);
  this.callHook('afterEnter');
  if (this.cb) this.cb();
};

/**
 * Start a leaving transition.
 *
 * 1. leave transition triggered.
 * 2. call beforeLeave hook
 * 3. add leave class (trigger css transition)
 * 4. call leave hook (with possible explicit js callback)
 * 5. reflow if no explicit js callback is provided
 * 6. based on transition type:
 *    - transition or animation:
 *        wait for end event, remove class, then done if
 *        there's no explicit js callback.
 *    - no css transition:
 *        done if there's no explicit js callback.
 * 7. wait for either done or js callback, then call
 *    afterLeave hook.
 *
 * @param {Function} op - remove/hide the element
 * @param {Function} [cb]
 */

p$1.leave = function (op, cb) {
  this.cancelPending();
  this.callHook('beforeLeave');
  this.op = op;
  this.cb = cb;
  addClass(this.el, this.leaveClass);
  this.left = false;
  this.callHookWithCb('leave');
  if (this.left) {
    return; // user called done synchronously.
  }
  this.cancel = this.hooks && this.hooks.leaveCancelled;
  // only need to handle leaveDone if
  // 1. the transition is already done (synchronously called
  //    by the user, which causes this.op set to null)
  // 2. there's no explicit js callback
  if (this.op && !this.pendingJsCb) {
    // if a CSS transition leaves immediately after enter,
    // the transitionend event never fires. therefore we
    // detect such cases and end the leave immediately.
    if (this.justEntered) {
      this.leaveDone();
    } else {
      pushJob(this.leaveNextTick);
    }
  }
};

/**
 * The "nextTick" phase of a leaving transition.
 */

p$1.leaveNextTick = function () {
  var type = this.getCssTransitionType(this.leaveClass);
  if (type) {
    var event = type === TYPE_TRANSITION ? transitionEndEvent : animationEndEvent;
    this.setupCssCb(event, this.leaveDone);
  } else {
    this.leaveDone();
  }
};

/**
 * The "cleanup" phase of a leaving transition.
 */

p$1.leaveDone = function () {
  this.left = true;
  this.cancel = this.pendingJsCb = null;
  this.op();
  removeClass(this.el, this.leaveClass);
  this.callHook('afterLeave');
  if (this.cb) this.cb();
  this.op = null;
};

/**
 * Cancel any pending callbacks from a previously running
 * but not finished transition.
 */

p$1.cancelPending = function () {
  this.op = this.cb = null;
  var hasPending = false;
  if (this.pendingCssCb) {
    hasPending = true;
    off(this.el, this.pendingCssEvent, this.pendingCssCb);
    this.pendingCssEvent = this.pendingCssCb = null;
  }
  if (this.pendingJsCb) {
    hasPending = true;
    this.pendingJsCb.cancel();
    this.pendingJsCb = null;
  }
  if (hasPending) {
    removeClass(this.el, this.enterClass);
    removeClass(this.el, this.leaveClass);
  }
  if (this.cancel) {
    this.cancel.call(this.vm, this.el);
    this.cancel = null;
  }
};

/**
 * Call a user-provided synchronous hook function.
 *
 * @param {String} type
 */

p$1.callHook = function (type) {
  if (this.hooks && this.hooks[type]) {
    this.hooks[type].call(this.vm, this.el);
  }
};

/**
 * Call a user-provided, potentially-async hook function.
 * We check for the length of arguments to see if the hook
 * expects a `done` callback. If true, the transition's end
 * will be determined by when the user calls that callback;
 * otherwise, the end is determined by the CSS transition or
 * animation.
 *
 * @param {String} type
 */

p$1.callHookWithCb = function (type) {
  var hook = this.hooks && this.hooks[type];
  if (hook) {
    if (hook.length > 1) {
      this.pendingJsCb = cancellable(this[type + 'Done']);
    }
    hook.call(this.vm, this.el, this.pendingJsCb);
  }
};

/**
 * Get an element's transition type based on the
 * calculated styles.
 *
 * @param {String} className
 * @return {Number}
 */

p$1.getCssTransitionType = function (className) {
  /* istanbul ignore if */
  if (!transitionEndEvent ||
  // skip CSS transitions if page is not visible -
  // this solves the issue of transitionend events not
  // firing until the page is visible again.
  // pageVisibility API is supported in IE10+, same as
  // CSS transitions.
  document.hidden ||
  // explicit js-only transition
  this.hooks && this.hooks.css === false ||
  // element is hidden
  isHidden(this.el)) {
    return;
  }
  var type = this.type || this.typeCache[className];
  if (type) return type;
  var inlineStyles = this.el.style;
  var computedStyles = window.getComputedStyle(this.el);
  var transDuration = inlineStyles[transDurationProp] || computedStyles[transDurationProp];
  if (transDuration && transDuration !== '0s') {
    type = TYPE_TRANSITION;
  } else {
    var animDuration = inlineStyles[animDurationProp] || computedStyles[animDurationProp];
    if (animDuration && animDuration !== '0s') {
      type = TYPE_ANIMATION;
    }
  }
  if (type) {
    this.typeCache[className] = type;
  }
  return type;
};

/**
 * Setup a CSS transitionend/animationend callback.
 *
 * @param {String} event
 * @param {Function} cb
 */

p$1.setupCssCb = function (event, cb) {
  this.pendingCssEvent = event;
  var self = this;
  var el = this.el;
  var onEnd = this.pendingCssCb = function (e) {
    if (e.target === el) {
      off(el, event, onEnd);
      self.pendingCssEvent = self.pendingCssCb = null;
      if (!self.pendingJsCb && cb) {
        cb();
      }
    }
  };
  on(el, event, onEnd);
};

/**
 * Check if an element is hidden - in that case we can just
 * skip the transition alltogether.
 *
 * @param {Element} el
 * @return {Boolean}
 */

function isHidden(el) {
  if (/svg$/.test(el.namespaceURI)) {
    // SVG elements do not have offset(Width|Height)
    // so we need to check the client rect
    var rect = el.getBoundingClientRect();
    return !(rect.width || rect.height);
  } else {
    return !(el.offsetWidth || el.offsetHeight || el.getClientRects().length);
  }
}

var transition$1 = {

  priority: TRANSITION,

  update: function update(id, oldId) {
    var el = this.el;
    // resolve on owner vm
    var hooks = resolveAsset(this.vm.$options, 'transitions', id);
    id = id || 'v';
    oldId = oldId || 'v';
    el.__v_trans = new Transition(el, id, hooks, this.vm);
    removeClass(el, oldId + '-transition');
    addClass(el, id + '-transition');
  }
};

var internalDirectives = {
  style: style,
  'class': vClass,
  component: component,
  prop: propDef,
  transition: transition$1
};

// special binding prefixes
var bindRE = /^v-bind:|^:/;
var onRE = /^v-on:|^@/;
var dirAttrRE = /^v-([^:]+)(?:$|:(.*)$)/;
var modifierRE = /\.[^\.]+/g;
var transitionRE = /^(v-bind:|:)?transition$/;

// default directive priority
var DEFAULT_PRIORITY = 1000;
var DEFAULT_TERMINAL_PRIORITY = 2000;

/**
 * Compile a template and return a reusable composite link
 * function, which recursively contains more link functions
 * inside. This top level compile function would normally
 * be called on instance root nodes, but can also be used
 * for partial compilation if the partial argument is true.
 *
 * The returned composite link function, when called, will
 * return an unlink function that tearsdown all directives
 * created during the linking phase.
 *
 * @param {Element|DocumentFragment} el
 * @param {Object} options
 * @param {Boolean} partial
 * @return {Function}
 */

function compile(el, options, partial) {
  // link function for the node itself.
  var nodeLinkFn = partial || !options._asComponent ? compileNode(el, options) : null;
  // link function for the childNodes
  var childLinkFn = !(nodeLinkFn && nodeLinkFn.terminal) && !isScript(el) && el.hasChildNodes() ? compileNodeList(el.childNodes, options) : null;

  /**
   * A composite linker function to be called on a already
   * compiled piece of DOM, which instantiates all directive
   * instances.
   *
   * @param {Vue} vm
   * @param {Element|DocumentFragment} el
   * @param {Vue} [host] - host vm of transcluded content
   * @param {Object} [scope] - v-for scope
   * @param {Fragment} [frag] - link context fragment
   * @return {Function|undefined}
   */

  return function compositeLinkFn(vm, el, host, scope, frag) {
    // cache childNodes before linking parent, fix #657
    var childNodes = toArray(el.childNodes);
    // link
    var dirs = linkAndCapture(function compositeLinkCapturer() {
      if (nodeLinkFn) nodeLinkFn(vm, el, host, scope, frag);
      if (childLinkFn) childLinkFn(vm, childNodes, host, scope, frag);
    }, vm);
    return makeUnlinkFn(vm, dirs);
  };
}

/**
 * Apply a linker to a vm/element pair and capture the
 * directives created during the process.
 *
 * @param {Function} linker
 * @param {Vue} vm
 */

function linkAndCapture(linker, vm) {
  /* istanbul ignore if */
  if (process.env.NODE_ENV === 'production') {
    // reset directives before every capture in production
    // mode, so that when unlinking we don't need to splice
    // them out (which turns out to be a perf hit).
    // they are kept in development mode because they are
    // useful for Vue's own tests.
    vm._directives = [];
  }
  var originalDirCount = vm._directives.length;
  linker();
  var dirs = vm._directives.slice(originalDirCount);
  dirs.sort(directiveComparator);
  for (var i = 0, l = dirs.length; i < l; i++) {
    dirs[i]._bind();
  }
  return dirs;
}

/**
 * Directive priority sort comparator
 *
 * @param {Object} a
 * @param {Object} b
 */

function directiveComparator(a, b) {
  a = a.descriptor.def.priority || DEFAULT_PRIORITY;
  b = b.descriptor.def.priority || DEFAULT_PRIORITY;
  return a > b ? -1 : a === b ? 0 : 1;
}

/**
 * Linker functions return an unlink function that
 * tearsdown all directives instances generated during
 * the process.
 *
 * We create unlink functions with only the necessary
 * information to avoid retaining additional closures.
 *
 * @param {Vue} vm
 * @param {Array} dirs
 * @param {Vue} [context]
 * @param {Array} [contextDirs]
 * @return {Function}
 */

function makeUnlinkFn(vm, dirs, context, contextDirs) {
  function unlink(destroying) {
    teardownDirs(vm, dirs, destroying);
    if (context && contextDirs) {
      teardownDirs(context, contextDirs);
    }
  }
  // expose linked directives
  unlink.dirs = dirs;
  return unlink;
}

/**
 * Teardown partial linked directives.
 *
 * @param {Vue} vm
 * @param {Array} dirs
 * @param {Boolean} destroying
 */

function teardownDirs(vm, dirs, destroying) {
  var i = dirs.length;
  while (i--) {
    dirs[i]._teardown();
    if (process.env.NODE_ENV !== 'production' && !destroying) {
      vm._directives.$remove(dirs[i]);
    }
  }
}

/**
 * Compile link props on an instance.
 *
 * @param {Vue} vm
 * @param {Element} el
 * @param {Object} props
 * @param {Object} [scope]
 * @return {Function}
 */

function compileAndLinkProps(vm, el, props, scope) {
  var propsLinkFn = compileProps(el, props, vm);
  var propDirs = linkAndCapture(function () {
    propsLinkFn(vm, scope);
  }, vm);
  return makeUnlinkFn(vm, propDirs);
}

/**
 * Compile the root element of an instance.
 *
 * 1. attrs on context container (context scope)
 * 2. attrs on the component template root node, if
 *    replace:true (child scope)
 *
 * If this is a fragment instance, we only need to compile 1.
 *
 * @param {Element} el
 * @param {Object} options
 * @param {Object} contextOptions
 * @return {Function}
 */

function compileRoot(el, options, contextOptions) {
  var containerAttrs = options._containerAttrs;
  var replacerAttrs = options._replacerAttrs;
  var contextLinkFn, replacerLinkFn;

  // only need to compile other attributes for
  // non-fragment instances
  if (el.nodeType !== 11) {
    // for components, container and replacer need to be
    // compiled separately and linked in different scopes.
    if (options._asComponent) {
      // 2. container attributes
      if (containerAttrs && contextOptions) {
        contextLinkFn = compileDirectives(containerAttrs, contextOptions);
      }
      if (replacerAttrs) {
        // 3. replacer attributes
        replacerLinkFn = compileDirectives(replacerAttrs, options);
      }
    } else {
      // non-component, just compile as a normal element.
      replacerLinkFn = compileDirectives(el.attributes, options);
    }
  } else if (process.env.NODE_ENV !== 'production' && containerAttrs) {
    // warn container directives for fragment instances
    var names = containerAttrs.filter(function (attr) {
      // allow vue-loader/vueify scoped css attributes
      return attr.name.indexOf('_v-') < 0 &&
      // allow event listeners
      !onRE.test(attr.name) &&
      // allow slots
      attr.name !== 'slot';
    }).map(function (attr) {
      return '"' + attr.name + '"';
    });
    if (names.length) {
      var plural = names.length > 1;
      warn('Attribute' + (plural ? 's ' : ' ') + names.join(', ') + (plural ? ' are' : ' is') + ' ignored on component ' + '<' + options.el.tagName.toLowerCase() + '> because ' + 'the component is a fragment instance: ' + 'http://vuejs.org/guide/components.html#Fragment-Instance');
    }
  }

  options._containerAttrs = options._replacerAttrs = null;
  return function rootLinkFn(vm, el, scope) {
    // link context scope dirs
    var context = vm._context;
    var contextDirs;
    if (context && contextLinkFn) {
      contextDirs = linkAndCapture(function () {
        contextLinkFn(context, el, null, scope);
      }, context);
    }

    // link self
    var selfDirs = linkAndCapture(function () {
      if (replacerLinkFn) replacerLinkFn(vm, el);
    }, vm);

    // return the unlink function that tearsdown context
    // container directives.
    return makeUnlinkFn(vm, selfDirs, context, contextDirs);
  };
}

/**
 * Compile a node and return a nodeLinkFn based on the
 * node type.
 *
 * @param {Node} node
 * @param {Object} options
 * @return {Function|null}
 */

function compileNode(node, options) {
  var type = node.nodeType;
  if (type === 1 && !isScript(node)) {
    return compileElement(node, options);
  } else if (type === 3 && node.data.trim()) {
    return compileTextNode(node, options);
  } else {
    return null;
  }
}

/**
 * Compile an element and return a nodeLinkFn.
 *
 * @param {Element} el
 * @param {Object} options
 * @return {Function|null}
 */

function compileElement(el, options) {
  // preprocess textareas.
  // textarea treats its text content as the initial value.
  // just bind it as an attr directive for value.
  if (el.tagName === 'TEXTAREA') {
    var tokens = parseText(el.value);
    if (tokens) {
      el.setAttribute(':value', tokensToExp(tokens));
      el.value = '';
    }
  }
  var linkFn;
  var hasAttrs = el.hasAttributes();
  var attrs = hasAttrs && toArray(el.attributes);
  // check terminal directives (for & if)
  if (hasAttrs) {
    linkFn = checkTerminalDirectives(el, attrs, options);
  }
  // check element directives
  if (!linkFn) {
    linkFn = checkElementDirectives(el, options);
  }
  // check component
  if (!linkFn) {
    linkFn = checkComponent(el, options);
  }
  // normal directives
  if (!linkFn && hasAttrs) {
    linkFn = compileDirectives(attrs, options);
  }
  return linkFn;
}

/**
 * Compile a textNode and return a nodeLinkFn.
 *
 * @param {TextNode} node
 * @param {Object} options
 * @return {Function|null} textNodeLinkFn
 */

function compileTextNode(node, options) {
  // skip marked text nodes
  if (node._skip) {
    return removeText;
  }

  var tokens = parseText(node.wholeText);
  if (!tokens) {
    return null;
  }

  // mark adjacent text nodes as skipped,
  // because we are using node.wholeText to compile
  // all adjacent text nodes together. This fixes
  // issues in IE where sometimes it splits up a single
  // text node into multiple ones.
  var next = node.nextSibling;
  while (next && next.nodeType === 3) {
    next._skip = true;
    next = next.nextSibling;
  }

  var frag = document.createDocumentFragment();
  var el, token;
  for (var i = 0, l = tokens.length; i < l; i++) {
    token = tokens[i];
    el = token.tag ? processTextToken(token, options) : document.createTextNode(token.value);
    frag.appendChild(el);
  }
  return makeTextNodeLinkFn(tokens, frag, options);
}

/**
 * Linker for an skipped text node.
 *
 * @param {Vue} vm
 * @param {Text} node
 */

function removeText(vm, node) {
  remove(node);
}

/**
 * Process a single text token.
 *
 * @param {Object} token
 * @param {Object} options
 * @return {Node}
 */

function processTextToken(token, options) {
  var el;
  if (token.oneTime) {
    el = document.createTextNode(token.value);
  } else {
    if (token.html) {
      el = document.createComment('v-html');
      setTokenType('html');
    } else {
      // IE will clean up empty textNodes during
      // frag.cloneNode(true), so we have to give it
      // something here...
      el = document.createTextNode(' ');
      setTokenType('text');
    }
  }
  function setTokenType(type) {
    if (token.descriptor) return;
    var parsed = parseDirective(token.value);
    token.descriptor = {
      name: type,
      def: directives[type],
      expression: parsed.expression,
      filters: parsed.filters
    };
  }
  return el;
}

/**
 * Build a function that processes a textNode.
 *
 * @param {Array<Object>} tokens
 * @param {DocumentFragment} frag
 */

function makeTextNodeLinkFn(tokens, frag) {
  return function textNodeLinkFn(vm, el, host, scope) {
    var fragClone = frag.cloneNode(true);
    var childNodes = toArray(fragClone.childNodes);
    var token, value, node;
    for (var i = 0, l = tokens.length; i < l; i++) {
      token = tokens[i];
      value = token.value;
      if (token.tag) {
        node = childNodes[i];
        if (token.oneTime) {
          value = (scope || vm).$eval(value);
          if (token.html) {
            replace(node, parseTemplate(value, true));
          } else {
            node.data = _toString(value);
          }
        } else {
          vm._bindDir(token.descriptor, node, host, scope);
        }
      }
    }
    replace(el, fragClone);
  };
}

/**
 * Compile a node list and return a childLinkFn.
 *
 * @param {NodeList} nodeList
 * @param {Object} options
 * @return {Function|undefined}
 */

function compileNodeList(nodeList, options) {
  var linkFns = [];
  var nodeLinkFn, childLinkFn, node;
  for (var i = 0, l = nodeList.length; i < l; i++) {
    node = nodeList[i];
    nodeLinkFn = compileNode(node, options);
    childLinkFn = !(nodeLinkFn && nodeLinkFn.terminal) && node.tagName !== 'SCRIPT' && node.hasChildNodes() ? compileNodeList(node.childNodes, options) : null;
    linkFns.push(nodeLinkFn, childLinkFn);
  }
  return linkFns.length ? makeChildLinkFn(linkFns) : null;
}

/**
 * Make a child link function for a node's childNodes.
 *
 * @param {Array<Function>} linkFns
 * @return {Function} childLinkFn
 */

function makeChildLinkFn(linkFns) {
  return function childLinkFn(vm, nodes, host, scope, frag) {
    var node, nodeLinkFn, childrenLinkFn;
    for (var i = 0, n = 0, l = linkFns.length; i < l; n++) {
      node = nodes[n];
      nodeLinkFn = linkFns[i++];
      childrenLinkFn = linkFns[i++];
      // cache childNodes before linking parent, fix #657
      var childNodes = toArray(node.childNodes);
      if (nodeLinkFn) {
        nodeLinkFn(vm, node, host, scope, frag);
      }
      if (childrenLinkFn) {
        childrenLinkFn(vm, childNodes, host, scope, frag);
      }
    }
  };
}

/**
 * Check for element directives (custom elements that should
 * be resovled as terminal directives).
 *
 * @param {Element} el
 * @param {Object} options
 */

function checkElementDirectives(el, options) {
  var tag = el.tagName.toLowerCase();
  if (commonTagRE.test(tag)) {
    return;
  }
  var def = resolveAsset(options, 'elementDirectives', tag);
  if (def) {
    return makeTerminalNodeLinkFn(el, tag, '', options, def);
  }
}

/**
 * Check if an element is a component. If yes, return
 * a component link function.
 *
 * @param {Element} el
 * @param {Object} options
 * @return {Function|undefined}
 */

function checkComponent(el, options) {
  var component = checkComponentAttr(el, options);
  if (component) {
    var ref = findRef(el);
    var descriptor = {
      name: 'component',
      ref: ref,
      expression: component.id,
      def: internalDirectives.component,
      modifiers: {
        literal: !component.dynamic
      }
    };
    var componentLinkFn = function componentLinkFn(vm, el, host, scope, frag) {
      if (ref) {
        defineReactive((scope || vm).$refs, ref, null);
      }
      vm._bindDir(descriptor, el, host, scope, frag);
    };
    componentLinkFn.terminal = true;
    return componentLinkFn;
  }
}

/**
 * Check an element for terminal directives in fixed order.
 * If it finds one, return a terminal link function.
 *
 * @param {Element} el
 * @param {Array} attrs
 * @param {Object} options
 * @return {Function} terminalLinkFn
 */

function checkTerminalDirectives(el, attrs, options) {
  // skip v-pre
  if (getAttr(el, 'v-pre') !== null) {
    return skip;
  }
  // skip v-else block, but only if following v-if
  if (el.hasAttribute('v-else')) {
    var prev = el.previousElementSibling;
    if (prev && prev.hasAttribute('v-if')) {
      return skip;
    }
  }

  var attr, name, value, modifiers, matched, dirName, rawName, arg, def, termDef;
  for (var i = 0, j = attrs.length; i < j; i++) {
    attr = attrs[i];
    name = attr.name.replace(modifierRE, '');
    if (matched = name.match(dirAttrRE)) {
      def = resolveAsset(options, 'directives', matched[1]);
      if (def && def.terminal) {
        if (!termDef || (def.priority || DEFAULT_TERMINAL_PRIORITY) > termDef.priority) {
          termDef = def;
          rawName = attr.name;
          modifiers = parseModifiers(attr.name);
          value = attr.value;
          dirName = matched[1];
          arg = matched[2];
        }
      }
    }
  }

  if (termDef) {
    return makeTerminalNodeLinkFn(el, dirName, value, options, termDef, rawName, arg, modifiers);
  }
}

function skip() {}
skip.terminal = true;

/**
 * Build a node link function for a terminal directive.
 * A terminal link function terminates the current
 * compilation recursion and handles compilation of the
 * subtree in the directive.
 *
 * @param {Element} el
 * @param {String} dirName
 * @param {String} value
 * @param {Object} options
 * @param {Object} def
 * @param {String} [rawName]
 * @param {String} [arg]
 * @param {Object} [modifiers]
 * @return {Function} terminalLinkFn
 */

function makeTerminalNodeLinkFn(el, dirName, value, options, def, rawName, arg, modifiers) {
  var parsed = parseDirective(value);
  var descriptor = {
    name: dirName,
    arg: arg,
    expression: parsed.expression,
    filters: parsed.filters,
    raw: value,
    attr: rawName,
    modifiers: modifiers,
    def: def
  };
  // check ref for v-for and router-view
  if (dirName === 'for' || dirName === 'router-view') {
    descriptor.ref = findRef(el);
  }
  var fn = function terminalNodeLinkFn(vm, el, host, scope, frag) {
    if (descriptor.ref) {
      defineReactive((scope || vm).$refs, descriptor.ref, null);
    }
    vm._bindDir(descriptor, el, host, scope, frag);
  };
  fn.terminal = true;
  return fn;
}

/**
 * Compile the directives on an element and return a linker.
 *
 * @param {Array|NamedNodeMap} attrs
 * @param {Object} options
 * @return {Function}
 */

function compileDirectives(attrs, options) {
  var i = attrs.length;
  var dirs = [];
  var attr, name, value, rawName, rawValue, dirName, arg, modifiers, dirDef, tokens, matched;
  while (i--) {
    attr = attrs[i];
    name = rawName = attr.name;
    value = rawValue = attr.value;
    tokens = parseText(value);
    // reset arg
    arg = null;
    // check modifiers
    modifiers = parseModifiers(name);
    name = name.replace(modifierRE, '');

    // attribute interpolations
    if (tokens) {
      value = tokensToExp(tokens);
      arg = name;
      pushDir('bind', directives.bind, tokens);
      // warn against mixing mustaches with v-bind
      if (process.env.NODE_ENV !== 'production') {
        if (name === 'class' && Array.prototype.some.call(attrs, function (attr) {
          return attr.name === ':class' || attr.name === 'v-bind:class';
        })) {
          warn('class="' + rawValue + '": Do not mix mustache interpolation ' + 'and v-bind for "class" on the same element. Use one or the other.', options);
        }
      }
    } else

      // special attribute: transition
      if (transitionRE.test(name)) {
        modifiers.literal = !bindRE.test(name);
        pushDir('transition', internalDirectives.transition);
      } else

        // event handlers
        if (onRE.test(name)) {
          arg = name.replace(onRE, '');
          pushDir('on', directives.on);
        } else

          // attribute bindings
          if (bindRE.test(name)) {
            dirName = name.replace(bindRE, '');
            if (dirName === 'style' || dirName === 'class') {
              pushDir(dirName, internalDirectives[dirName]);
            } else {
              arg = dirName;
              pushDir('bind', directives.bind);
            }
          } else

            // normal directives
            if (matched = name.match(dirAttrRE)) {
              dirName = matched[1];
              arg = matched[2];

              // skip v-else (when used with v-show)
              if (dirName === 'else') {
                continue;
              }

              dirDef = resolveAsset(options, 'directives', dirName, true);
              if (dirDef) {
                pushDir(dirName, dirDef);
              }
            }
  }

  /**
   * Push a directive.
   *
   * @param {String} dirName
   * @param {Object|Function} def
   * @param {Array} [interpTokens]
   */

  function pushDir(dirName, def, interpTokens) {
    var hasOneTimeToken = interpTokens && hasOneTime(interpTokens);
    var parsed = !hasOneTimeToken && parseDirective(value);
    dirs.push({
      name: dirName,
      attr: rawName,
      raw: rawValue,
      def: def,
      arg: arg,
      modifiers: modifiers,
      // conversion from interpolation strings with one-time token
      // to expression is differed until directive bind time so that we
      // have access to the actual vm context for one-time bindings.
      expression: parsed && parsed.expression,
      filters: parsed && parsed.filters,
      interp: interpTokens,
      hasOneTime: hasOneTimeToken
    });
  }

  if (dirs.length) {
    return makeNodeLinkFn(dirs);
  }
}

/**
 * Parse modifiers from directive attribute name.
 *
 * @param {String} name
 * @return {Object}
 */

function parseModifiers(name) {
  var res = Object.create(null);
  var match = name.match(modifierRE);
  if (match) {
    var i = match.length;
    while (i--) {
      res[match[i].slice(1)] = true;
    }
  }
  return res;
}

/**
 * Build a link function for all directives on a single node.
 *
 * @param {Array} directives
 * @return {Function} directivesLinkFn
 */

function makeNodeLinkFn(directives) {
  return function nodeLinkFn(vm, el, host, scope, frag) {
    // reverse apply because it's sorted low to high
    var i = directives.length;
    while (i--) {
      vm._bindDir(directives[i], el, host, scope, frag);
    }
  };
}

/**
 * Check if an interpolation string contains one-time tokens.
 *
 * @param {Array} tokens
 * @return {Boolean}
 */

function hasOneTime(tokens) {
  var i = tokens.length;
  while (i--) {
    if (tokens[i].oneTime) return true;
  }
}

function isScript(el) {
  return el.tagName === 'SCRIPT' && (!el.hasAttribute('type') || el.getAttribute('type') === 'text/javascript');
}

var specialCharRE = /[^\w\-:\.]/;

/**
 * Process an element or a DocumentFragment based on a
 * instance option object. This allows us to transclude
 * a template node/fragment before the instance is created,
 * so the processed fragment can then be cloned and reused
 * in v-for.
 *
 * @param {Element} el
 * @param {Object} options
 * @return {Element|DocumentFragment}
 */

function transclude(el, options) {
  // extract container attributes to pass them down
  // to compiler, because they need to be compiled in
  // parent scope. we are mutating the options object here
  // assuming the same object will be used for compile
  // right after this.
  if (options) {
    options._containerAttrs = extractAttrs(el);
  }
  // for template tags, what we want is its content as
  // a documentFragment (for fragment instances)
  if (isTemplate(el)) {
    el = parseTemplate(el);
  }
  if (options) {
    if (options._asComponent && !options.template) {
      options.template = '<slot></slot>';
    }
    if (options.template) {
      options._content = extractContent(el);
      el = transcludeTemplate(el, options);
    }
  }
  if (isFragment(el)) {
    // anchors for fragment instance
    // passing in `persist: true` to avoid them being
    // discarded by IE during template cloning
    prepend(createAnchor('v-start', true), el);
    el.appendChild(createAnchor('v-end', true));
  }
  return el;
}

/**
 * Process the template option.
 * If the replace option is true this will swap the $el.
 *
 * @param {Element} el
 * @param {Object} options
 * @return {Element|DocumentFragment}
 */

function transcludeTemplate(el, options) {
  var template = options.template;
  var frag = parseTemplate(template, true);
  if (frag) {
    var replacer = frag.firstChild;
    var tag = replacer.tagName && replacer.tagName.toLowerCase();
    if (options.replace) {
      /* istanbul ignore if */
      if (el === document.body) {
        process.env.NODE_ENV !== 'production' && warn('You are mounting an instance with a template to ' + '<body>. This will replace <body> entirely. You ' + 'should probably use `replace: false` here.');
      }
      // there are many cases where the instance must
      // become a fragment instance: basically anything that
      // can create more than 1 root nodes.
      if (
      // multi-children template
      frag.childNodes.length > 1 ||
      // non-element template
      replacer.nodeType !== 1 ||
      // single nested component
      tag === 'component' || resolveAsset(options, 'components', tag) || hasBindAttr(replacer, 'is') ||
      // element directive
      resolveAsset(options, 'elementDirectives', tag) ||
      // for block
      replacer.hasAttribute('v-for') ||
      // if block
      replacer.hasAttribute('v-if')) {
        return frag;
      } else {
        options._replacerAttrs = extractAttrs(replacer);
        mergeAttrs(el, replacer);
        return replacer;
      }
    } else {
      el.appendChild(frag);
      return el;
    }
  } else {
    process.env.NODE_ENV !== 'production' && warn('Invalid template option: ' + template);
  }
}

/**
 * Helper to extract a component container's attributes
 * into a plain object array.
 *
 * @param {Element} el
 * @return {Array}
 */

function extractAttrs(el) {
  if (el.nodeType === 1 && el.hasAttributes()) {
    return toArray(el.attributes);
  }
}

/**
 * Merge the attributes of two elements, and make sure
 * the class names are merged properly.
 *
 * @param {Element} from
 * @param {Element} to
 */

function mergeAttrs(from, to) {
  var attrs = from.attributes;
  var i = attrs.length;
  var name, value;
  while (i--) {
    name = attrs[i].name;
    value = attrs[i].value;
    if (!to.hasAttribute(name) && !specialCharRE.test(name)) {
      to.setAttribute(name, value);
    } else if (name === 'class' && !parseText(value) && (value = value.trim())) {
      value.split(/\s+/).forEach(function (cls) {
        addClass(to, cls);
      });
    }
  }
}

/**
 * Scan and determine slot content distribution.
 * We do this during transclusion instead at compile time so that
 * the distribution is decoupled from the compilation order of
 * the slots.
 *
 * @param {Element|DocumentFragment} template
 * @param {Element} content
 * @param {Vue} vm
 */

function resolveSlots(vm, content) {
  if (!content) {
    return;
  }
  var contents = vm._slotContents = Object.create(null);
  var el, name;
  for (var i = 0, l = content.children.length; i < l; i++) {
    el = content.children[i];
    /* eslint-disable no-cond-assign */
    if (name = el.getAttribute('slot')) {
      (contents[name] || (contents[name] = [])).push(el);
    }
    /* eslint-enable no-cond-assign */
    if (process.env.NODE_ENV !== 'production' && getBindAttr(el, 'slot')) {
      warn('The "slot" attribute must be static.', vm.$parent);
    }
  }
  for (name in contents) {
    contents[name] = extractFragment(contents[name], content);
  }
  if (content.hasChildNodes()) {
    var nodes = content.childNodes;
    if (nodes.length === 1 && nodes[0].nodeType === 3 && !nodes[0].data.trim()) {
      return;
    }
    contents['default'] = extractFragment(content.childNodes, content);
  }
}

/**
 * Extract qualified content nodes from a node list.
 *
 * @param {NodeList} nodes
 * @return {DocumentFragment}
 */

function extractFragment(nodes, parent) {
  var frag = document.createDocumentFragment();
  nodes = toArray(nodes);
  for (var i = 0, l = nodes.length; i < l; i++) {
    var node = nodes[i];
    if (isTemplate(node) && !node.hasAttribute('v-if') && !node.hasAttribute('v-for')) {
      parent.removeChild(node);
      node = parseTemplate(node, true);
    }
    frag.appendChild(node);
  }
  return frag;
}



var compiler = Object.freeze({
	compile: compile,
	compileAndLinkProps: compileAndLinkProps,
	compileRoot: compileRoot,
	transclude: transclude,
	resolveSlots: resolveSlots
});

function stateMixin (Vue) {
  /**
   * Accessor for `$data` property, since setting $data
   * requires observing the new object and updating
   * proxied properties.
   */

  Object.defineProperty(Vue.prototype, '$data', {
    get: function get() {
      return this._data;
    },
    set: function set(newData) {
      if (newData !== this._data) {
        this._setData(newData);
      }
    }
  });

  /**
   * Setup the scope of an instance, which contains:
   * - observed data
   * - computed properties
   * - user methods
   * - meta properties
   */

  Vue.prototype._initState = function () {
    this._initProps();
    this._initMeta();
    this._initMethods();
    this._initData();
    this._initComputed();
  };

  /**
   * Initialize props.
   */

  Vue.prototype._initProps = function () {
    var options = this.$options;
    var el = options.el;
    var props = options.props;
    if (props && !el) {
      process.env.NODE_ENV !== 'production' && warn('Props will not be compiled if no `el` option is ' + 'provided at instantiation.', this);
    }
    // make sure to convert string selectors into element now
    el = options.el = query(el);
    this._propsUnlinkFn = el && el.nodeType === 1 && props
    // props must be linked in proper scope if inside v-for
    ? compileAndLinkProps(this, el, props, this._scope) : null;
  };

  /**
   * Initialize the data.
   */

  Vue.prototype._initData = function () {
    var dataFn = this.$options.data;
    var data = this._data = dataFn ? dataFn() : {};
    if (!isPlainObject(data)) {
      data = {};
      process.env.NODE_ENV !== 'production' && warn('data functions should return an object.', this);
    }
    var props = this._props;
    // proxy data on instance
    var keys = Object.keys(data);
    var i, key;
    i = keys.length;
    while (i--) {
      key = keys[i];
      // there are two scenarios where we can proxy a data key:
      // 1. it's not already defined as a prop
      // 2. it's provided via a instantiation option AND there are no
      //    template prop present
      if (!props || !hasOwn(props, key)) {
        this._proxy(key);
      } else if (process.env.NODE_ENV !== 'production') {
        warn('Data field "' + key + '" is already defined ' + 'as a prop. To provide default value for a prop, use the "default" ' + 'prop option; if you want to pass prop values to an instantiation ' + 'call, use the "propsData" option.', this);
      }
    }
    // observe data
    observe(data, this);
  };

  /**
   * Swap the instance's $data. Called in $data's setter.
   *
   * @param {Object} newData
   */

  Vue.prototype._setData = function (newData) {
    newData = newData || {};
    var oldData = this._data;
    this._data = newData;
    var keys, key, i;
    // unproxy keys not present in new data
    keys = Object.keys(oldData);
    i = keys.length;
    while (i--) {
      key = keys[i];
      if (!(key in newData)) {
        this._unproxy(key);
      }
    }
    // proxy keys not already proxied,
    // and trigger change for changed values
    keys = Object.keys(newData);
    i = keys.length;
    while (i--) {
      key = keys[i];
      if (!hasOwn(this, key)) {
        // new property
        this._proxy(key);
      }
    }
    oldData.__ob__.removeVm(this);
    observe(newData, this);
    this._digest();
  };

  /**
   * Proxy a property, so that
   * vm.prop === vm._data.prop
   *
   * @param {String} key
   */

  Vue.prototype._proxy = function (key) {
    if (!isReserved(key)) {
      // need to store ref to self here
      // because these getter/setters might
      // be called by child scopes via
      // prototype inheritance.
      var self = this;
      Object.defineProperty(self, key, {
        configurable: true,
        enumerable: true,
        get: function proxyGetter() {
          return self._data[key];
        },
        set: function proxySetter(val) {
          self._data[key] = val;
        }
      });
    }
  };

  /**
   * Unproxy a property.
   *
   * @param {String} key
   */

  Vue.prototype._unproxy = function (key) {
    if (!isReserved(key)) {
      delete this[key];
    }
  };

  /**
   * Force update on every watcher in scope.
   */

  Vue.prototype._digest = function () {
    for (var i = 0, l = this._watchers.length; i < l; i++) {
      this._watchers[i].update(true); // shallow updates
    }
  };

  /**
   * Setup computed properties. They are essentially
   * special getter/setters
   */

  function noop() {}
  Vue.prototype._initComputed = function () {
    var computed = this.$options.computed;
    if (computed) {
      for (var key in computed) {
        var userDef = computed[key];
        var def = {
          enumerable: true,
          configurable: true
        };
        if (typeof userDef === 'function') {
          def.get = makeComputedGetter(userDef, this);
          def.set = noop;
        } else {
          def.get = userDef.get ? userDef.cache !== false ? makeComputedGetter(userDef.get, this) : bind(userDef.get, this) : noop;
          def.set = userDef.set ? bind(userDef.set, this) : noop;
        }
        Object.defineProperty(this, key, def);
      }
    }
  };

  function makeComputedGetter(getter, owner) {
    var watcher = new Watcher(owner, getter, null, {
      lazy: true
    });
    return function computedGetter() {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.target) {
        watcher.depend();
      }
      return watcher.value;
    };
  }

  /**
   * Setup instance methods. Methods must be bound to the
   * instance since they might be passed down as a prop to
   * child components.
   */

  Vue.prototype._initMethods = function () {
    var methods = this.$options.methods;
    if (methods) {
      for (var key in methods) {
        this[key] = bind(methods[key], this);
      }
    }
  };

  /**
   * Initialize meta information like $index, $key & $value.
   */

  Vue.prototype._initMeta = function () {
    var metas = this.$options._meta;
    if (metas) {
      for (var key in metas) {
        defineReactive(this, key, metas[key]);
      }
    }
  };
}

var eventRE = /^v-on:|^@/;

function eventsMixin (Vue) {
  /**
   * Setup the instance's option events & watchers.
   * If the value is a string, we pull it from the
   * instance's methods by name.
   */

  Vue.prototype._initEvents = function () {
    var options = this.$options;
    if (options._asComponent) {
      registerComponentEvents(this, options.el);
    }
    registerCallbacks(this, '$on', options.events);
    registerCallbacks(this, '$watch', options.watch);
  };

  /**
   * Register v-on events on a child component
   *
   * @param {Vue} vm
   * @param {Element} el
   */

  function registerComponentEvents(vm, el) {
    var attrs = el.attributes;
    var name, value, handler;
    for (var i = 0, l = attrs.length; i < l; i++) {
      name = attrs[i].name;
      if (eventRE.test(name)) {
        name = name.replace(eventRE, '');
        // force the expression into a statement so that
        // it always dynamically resolves the method to call (#2670)
        // kinda ugly hack, but does the job.
        value = attrs[i].value;
        if (isSimplePath(value)) {
          value += '.apply(this, $arguments)';
        }
        handler = (vm._scope || vm._context).$eval(value, true);
        handler._fromParent = true;
        vm.$on(name.replace(eventRE), handler);
      }
    }
  }

  /**
   * Register callbacks for option events and watchers.
   *
   * @param {Vue} vm
   * @param {String} action
   * @param {Object} hash
   */

  function registerCallbacks(vm, action, hash) {
    if (!hash) return;
    var handlers, key, i, j;
    for (key in hash) {
      handlers = hash[key];
      if (isArray(handlers)) {
        for (i = 0, j = handlers.length; i < j; i++) {
          register(vm, action, key, handlers[i]);
        }
      } else {
        register(vm, action, key, handlers);
      }
    }
  }

  /**
   * Helper to register an event/watch callback.
   *
   * @param {Vue} vm
   * @param {String} action
   * @param {String} key
   * @param {Function|String|Object} handler
   * @param {Object} [options]
   */

  function register(vm, action, key, handler, options) {
    var type = typeof handler;
    if (type === 'function') {
      vm[action](key, handler, options);
    } else if (type === 'string') {
      var methods = vm.$options.methods;
      var method = methods && methods[handler];
      if (method) {
        vm[action](key, method, options);
      } else {
        process.env.NODE_ENV !== 'production' && warn('Unknown method: "' + handler + '" when ' + 'registering callback for ' + action + ': "' + key + '".', vm);
      }
    } else if (handler && type === 'object') {
      register(vm, action, key, handler.handler, handler);
    }
  }

  /**
   * Setup recursive attached/detached calls
   */

  Vue.prototype._initDOMHooks = function () {
    this.$on('hook:attached', onAttached);
    this.$on('hook:detached', onDetached);
  };

  /**
   * Callback to recursively call attached hook on children
   */

  function onAttached() {
    if (!this._isAttached) {
      this._isAttached = true;
      this.$children.forEach(callAttach);
    }
  }

  /**
   * Iterator to call attached hook
   *
   * @param {Vue} child
   */

  function callAttach(child) {
    if (!child._isAttached && inDoc(child.$el)) {
      child._callHook('attached');
    }
  }

  /**
   * Callback to recursively call detached hook on children
   */

  function onDetached() {
    if (this._isAttached) {
      this._isAttached = false;
      this.$children.forEach(callDetach);
    }
  }

  /**
   * Iterator to call detached hook
   *
   * @param {Vue} child
   */

  function callDetach(child) {
    if (child._isAttached && !inDoc(child.$el)) {
      child._callHook('detached');
    }
  }

  /**
   * Trigger all handlers for a hook
   *
   * @param {String} hook
   */

  Vue.prototype._callHook = function (hook) {
    this.$emit('pre-hook:' + hook);
    var handlers = this.$options[hook];
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        handlers[i].call(this);
      }
    }
    this.$emit('hook:' + hook);
  };
}

function noop$1() {}

/**
 * A directive links a DOM element with a piece of data,
 * which is the result of evaluating an expression.
 * It registers a watcher with the expression and calls
 * the DOM update function when a change is triggered.
 *
 * @param {Object} descriptor
 *                 - {String} name
 *                 - {Object} def
 *                 - {String} expression
 *                 - {Array<Object>} [filters]
 *                 - {Object} [modifiers]
 *                 - {Boolean} literal
 *                 - {String} attr
 *                 - {String} arg
 *                 - {String} raw
 *                 - {String} [ref]
 *                 - {Array<Object>} [interp]
 *                 - {Boolean} [hasOneTime]
 * @param {Vue} vm
 * @param {Node} el
 * @param {Vue} [host] - transclusion host component
 * @param {Object} [scope] - v-for scope
 * @param {Fragment} [frag] - owner fragment
 * @constructor
 */
function Directive(descriptor, vm, el, host, scope, frag) {
  this.vm = vm;
  this.el = el;
  // copy descriptor properties
  this.descriptor = descriptor;
  this.name = descriptor.name;
  this.expression = descriptor.expression;
  this.arg = descriptor.arg;
  this.modifiers = descriptor.modifiers;
  this.filters = descriptor.filters;
  this.literal = this.modifiers && this.modifiers.literal;
  // private
  this._locked = false;
  this._bound = false;
  this._listeners = null;
  // link context
  this._host = host;
  this._scope = scope;
  this._frag = frag;
  // store directives on node in dev mode
  if (process.env.NODE_ENV !== 'production' && this.el) {
    this.el._vue_directives = this.el._vue_directives || [];
    this.el._vue_directives.push(this);
  }
}

/**
 * Initialize the directive, mixin definition properties,
 * setup the watcher, call definition bind() and update()
 * if present.
 */

Directive.prototype._bind = function () {
  var name = this.name;
  var descriptor = this.descriptor;

  // remove attribute
  if ((name !== 'cloak' || this.vm._isCompiled) && this.el && this.el.removeAttribute) {
    var attr = descriptor.attr || 'v-' + name;
    this.el.removeAttribute(attr);
  }

  // copy def properties
  var def = descriptor.def;
  if (typeof def === 'function') {
    this.update = def;
  } else {
    extend(this, def);
  }

  // setup directive params
  this._setupParams();

  // initial bind
  if (this.bind) {
    this.bind();
  }
  this._bound = true;

  if (this.literal) {
    this.update && this.update(descriptor.raw);
  } else if ((this.expression || this.modifiers) && (this.update || this.twoWay) && !this._checkStatement()) {
    // wrapped updater for context
    var dir = this;
    if (this.update) {
      this._update = function (val, oldVal) {
        if (!dir._locked) {
          dir.update(val, oldVal);
        }
      };
    } else {
      this._update = noop$1;
    }
    var preProcess = this._preProcess ? bind(this._preProcess, this) : null;
    var postProcess = this._postProcess ? bind(this._postProcess, this) : null;
    var watcher = this._watcher = new Watcher(this.vm, this.expression, this._update, // callback
    {
      filters: this.filters,
      twoWay: this.twoWay,
      deep: this.deep,
      preProcess: preProcess,
      postProcess: postProcess,
      scope: this._scope
    });
    // v-model with inital inline value need to sync back to
    // model instead of update to DOM on init. They would
    // set the afterBind hook to indicate that.
    if (this.afterBind) {
      this.afterBind();
    } else if (this.update) {
      this.update(watcher.value);
    }
  }
};

/**
 * Setup all param attributes, e.g. track-by,
 * transition-mode, etc...
 */

Directive.prototype._setupParams = function () {
  if (!this.params) {
    return;
  }
  var params = this.params;
  // swap the params array with a fresh object.
  this.params = Object.create(null);
  var i = params.length;
  var key, val, mappedKey;
  while (i--) {
    key = hyphenate(params[i]);
    mappedKey = camelize(key);
    val = getBindAttr(this.el, key);
    if (val != null) {
      // dynamic
      this._setupParamWatcher(mappedKey, val);
    } else {
      // static
      val = getAttr(this.el, key);
      if (val != null) {
        this.params[mappedKey] = val === '' ? true : val;
      }
    }
  }
};

/**
 * Setup a watcher for a dynamic param.
 *
 * @param {String} key
 * @param {String} expression
 */

Directive.prototype._setupParamWatcher = function (key, expression) {
  var self = this;
  var called = false;
  var unwatch = (this._scope || this.vm).$watch(expression, function (val, oldVal) {
    self.params[key] = val;
    // since we are in immediate mode,
    // only call the param change callbacks if this is not the first update.
    if (called) {
      var cb = self.paramWatchers && self.paramWatchers[key];
      if (cb) {
        cb.call(self, val, oldVal);
      }
    } else {
      called = true;
    }
  }, {
    immediate: true,
    user: false
  });(this._paramUnwatchFns || (this._paramUnwatchFns = [])).push(unwatch);
};

/**
 * Check if the directive is a function caller
 * and if the expression is a callable one. If both true,
 * we wrap up the expression and use it as the event
 * handler.
 *
 * e.g. on-click="a++"
 *
 * @return {Boolean}
 */

Directive.prototype._checkStatement = function () {
  var expression = this.expression;
  if (expression && this.acceptStatement && !isSimplePath(expression)) {
    var fn = parseExpression(expression).get;
    var scope = this._scope || this.vm;
    var handler = function handler(e) {
      scope.$event = e;
      fn.call(scope, scope);
      scope.$event = null;
    };
    if (this.filters) {
      handler = scope._applyFilters(handler, null, this.filters);
    }
    this.update(handler);
    return true;
  }
};

/**
 * Set the corresponding value with the setter.
 * This should only be used in two-way directives
 * e.g. v-model.
 *
 * @param {*} value
 * @public
 */

Directive.prototype.set = function (value) {
  /* istanbul ignore else */
  if (this.twoWay) {
    this._withLock(function () {
      this._watcher.set(value);
    });
  } else if (process.env.NODE_ENV !== 'production') {
    warn('Directive.set() can only be used inside twoWay' + 'directives.');
  }
};

/**
 * Execute a function while preventing that function from
 * triggering updates on this directive instance.
 *
 * @param {Function} fn
 */

Directive.prototype._withLock = function (fn) {
  var self = this;
  self._locked = true;
  fn.call(self);
  nextTick(function () {
    self._locked = false;
  });
};

/**
 * Convenience method that attaches a DOM event listener
 * to the directive element and autometically tears it down
 * during unbind.
 *
 * @param {String} event
 * @param {Function} handler
 * @param {Boolean} [useCapture]
 */

Directive.prototype.on = function (event, handler, useCapture) {
  on(this.el, event, handler, useCapture);(this._listeners || (this._listeners = [])).push([event, handler]);
};

/**
 * Teardown the watcher and call unbind.
 */

Directive.prototype._teardown = function () {
  if (this._bound) {
    this._bound = false;
    if (this.unbind) {
      this.unbind();
    }
    if (this._watcher) {
      this._watcher.teardown();
    }
    var listeners = this._listeners;
    var i;
    if (listeners) {
      i = listeners.length;
      while (i--) {
        off(this.el, listeners[i][0], listeners[i][1]);
      }
    }
    var unwatchFns = this._paramUnwatchFns;
    if (unwatchFns) {
      i = unwatchFns.length;
      while (i--) {
        unwatchFns[i]();
      }
    }
    if (process.env.NODE_ENV !== 'production' && this.el) {
      this.el._vue_directives.$remove(this);
    }
    this.vm = this.el = this._watcher = this._listeners = null;
  }
};

function lifecycleMixin (Vue) {
  /**
   * Update v-ref for component.
   *
   * @param {Boolean} remove
   */

  Vue.prototype._updateRef = function (remove) {
    var ref = this.$options._ref;
    if (ref) {
      var refs = (this._scope || this._context).$refs;
      if (remove) {
        if (refs[ref] === this) {
          refs[ref] = null;
        }
      } else {
        refs[ref] = this;
      }
    }
  };

  /**
   * Transclude, compile and link element.
   *
   * If a pre-compiled linker is available, that means the
   * passed in element will be pre-transcluded and compiled
   * as well - all we need to do is to call the linker.
   *
   * Otherwise we need to call transclude/compile/link here.
   *
   * @param {Element} el
   */

  Vue.prototype._compile = function (el) {
    var options = this.$options;

    // transclude and init element
    // transclude can potentially replace original
    // so we need to keep reference; this step also injects
    // the template and caches the original attributes
    // on the container node and replacer node.
    var original = el;
    el = transclude(el, options);
    this._initElement(el);

    // handle v-pre on root node (#2026)
    if (el.nodeType === 1 && getAttr(el, 'v-pre') !== null) {
      return;
    }

    // root is always compiled per-instance, because
    // container attrs and props can be different every time.
    var contextOptions = this._context && this._context.$options;
    var rootLinker = compileRoot(el, options, contextOptions);

    // resolve slot distribution
    resolveSlots(this, options._content);

    // compile and link the rest
    var contentLinkFn;
    var ctor = this.constructor;
    // component compilation can be cached
    // as long as it's not using inline-template
    if (options._linkerCachable) {
      contentLinkFn = ctor.linker;
      if (!contentLinkFn) {
        contentLinkFn = ctor.linker = compile(el, options);
      }
    }

    // link phase
    // make sure to link root with prop scope!
    var rootUnlinkFn = rootLinker(this, el, this._scope);
    var contentUnlinkFn = contentLinkFn ? contentLinkFn(this, el) : compile(el, options)(this, el);

    // register composite unlink function
    // to be called during instance destruction
    this._unlinkFn = function () {
      rootUnlinkFn();
      // passing destroying: true to avoid searching and
      // splicing the directives
      contentUnlinkFn(true);
    };

    // finally replace original
    if (options.replace) {
      replace(original, el);
    }

    this._isCompiled = true;
    this._callHook('compiled');
  };

  /**
   * Initialize instance element. Called in the public
   * $mount() method.
   *
   * @param {Element} el
   */

  Vue.prototype._initElement = function (el) {
    if (isFragment(el)) {
      this._isFragment = true;
      this.$el = this._fragmentStart = el.firstChild;
      this._fragmentEnd = el.lastChild;
      // set persisted text anchors to empty
      if (this._fragmentStart.nodeType === 3) {
        this._fragmentStart.data = this._fragmentEnd.data = '';
      }
      this._fragment = el;
    } else {
      this.$el = el;
    }
    this.$el.__vue__ = this;
    this._callHook('beforeCompile');
  };

  /**
   * Create and bind a directive to an element.
   *
   * @param {Object} descriptor - parsed directive descriptor
   * @param {Node} node   - target node
   * @param {Vue} [host] - transclusion host component
   * @param {Object} [scope] - v-for scope
   * @param {Fragment} [frag] - owner fragment
   */

  Vue.prototype._bindDir = function (descriptor, node, host, scope, frag) {
    this._directives.push(new Directive(descriptor, this, node, host, scope, frag));
  };

  /**
   * Teardown an instance, unobserves the data, unbind all the
   * directives, turn off all the event listeners, etc.
   *
   * @param {Boolean} remove - whether to remove the DOM node.
   * @param {Boolean} deferCleanup - if true, defer cleanup to
   *                                 be called later
   */

  Vue.prototype._destroy = function (remove, deferCleanup) {
    if (this._isBeingDestroyed) {
      if (!deferCleanup) {
        this._cleanup();
      }
      return;
    }

    var destroyReady;
    var pendingRemoval;

    var self = this;
    // Cleanup should be called either synchronously or asynchronoysly as
    // callback of this.$remove(), or if remove and deferCleanup are false.
    // In any case it should be called after all other removing, unbinding and
    // turning of is done
    var cleanupIfPossible = function cleanupIfPossible() {
      if (destroyReady && !pendingRemoval && !deferCleanup) {
        self._cleanup();
      }
    };

    // remove DOM element
    if (remove && this.$el) {
      pendingRemoval = true;
      this.$remove(function () {
        pendingRemoval = false;
        cleanupIfPossible();
      });
    }

    this._callHook('beforeDestroy');
    this._isBeingDestroyed = true;
    var i;
    // remove self from parent. only necessary
    // if parent is not being destroyed as well.
    var parent = this.$parent;
    if (parent && !parent._isBeingDestroyed) {
      parent.$children.$remove(this);
      // unregister ref (remove: true)
      this._updateRef(true);
    }
    // destroy all children.
    i = this.$children.length;
    while (i--) {
      this.$children[i].$destroy();
    }
    // teardown props
    if (this._propsUnlinkFn) {
      this._propsUnlinkFn();
    }
    // teardown all directives. this also tearsdown all
    // directive-owned watchers.
    if (this._unlinkFn) {
      this._unlinkFn();
    }
    i = this._watchers.length;
    while (i--) {
      this._watchers[i].teardown();
    }
    // remove reference to self on $el
    if (this.$el) {
      this.$el.__vue__ = null;
    }

    destroyReady = true;
    cleanupIfPossible();
  };

  /**
   * Clean up to ensure garbage collection.
   * This is called after the leave transition if there
   * is any.
   */

  Vue.prototype._cleanup = function () {
    if (this._isDestroyed) {
      return;
    }
    // remove self from owner fragment
    // do it in cleanup so that we can call $destroy with
    // defer right when a fragment is about to be removed.
    if (this._frag) {
      this._frag.children.$remove(this);
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (this._data && this._data.__ob__) {
      this._data.__ob__.removeVm(this);
    }
    // Clean up references to private properties and other
    // instances. preserve reference to _data so that proxy
    // accessors still work. The only potential side effect
    // here is that mutating the instance after it's destroyed
    // may affect the state of other components that are still
    // observing the same object, but that seems to be a
    // reasonable responsibility for the user rather than
    // always throwing an error on them.
    this.$el = this.$parent = this.$root = this.$children = this._watchers = this._context = this._scope = this._directives = null;
    // call the last hook...
    this._isDestroyed = true;
    this._callHook('destroyed');
    // turn off all instance listeners.
    this.$off();
  };
}

function miscMixin (Vue) {
  /**
   * Apply a list of filter (descriptors) to a value.
   * Using plain for loops here because this will be called in
   * the getter of any watcher with filters so it is very
   * performance sensitive.
   *
   * @param {*} value
   * @param {*} [oldValue]
   * @param {Array} filters
   * @param {Boolean} write
   * @return {*}
   */

  Vue.prototype._applyFilters = function (value, oldValue, filters, write) {
    var filter, fn, args, arg, offset, i, l, j, k;
    for (i = 0, l = filters.length; i < l; i++) {
      filter = filters[write ? l - i - 1 : i];
      fn = resolveAsset(this.$options, 'filters', filter.name, true);
      if (!fn) continue;
      fn = write ? fn.write : fn.read || fn;
      if (typeof fn !== 'function') continue;
      args = write ? [value, oldValue] : [value];
      offset = write ? 2 : 1;
      if (filter.args) {
        for (j = 0, k = filter.args.length; j < k; j++) {
          arg = filter.args[j];
          args[j + offset] = arg.dynamic ? this.$get(arg.value) : arg.value;
        }
      }
      value = fn.apply(this, args);
    }
    return value;
  };

  /**
   * Resolve a component, depending on whether the component
   * is defined normally or using an async factory function.
   * Resolves synchronously if already resolved, otherwise
   * resolves asynchronously and caches the resolved
   * constructor on the factory.
   *
   * @param {String|Function} value
   * @param {Function} cb
   */

  Vue.prototype._resolveComponent = function (value, cb) {
    var factory;
    if (typeof value === 'function') {
      factory = value;
    } else {
      factory = resolveAsset(this.$options, 'components', value, true);
    }
    /* istanbul ignore if */
    if (!factory) {
      return;
    }
    // async component factory
    if (!factory.options) {
      if (factory.resolved) {
        // cached
        cb(factory.resolved);
      } else if (factory.requested) {
        // pool callbacks
        factory.pendingCallbacks.push(cb);
      } else {
        factory.requested = true;
        var cbs = factory.pendingCallbacks = [cb];
        factory.call(this, function resolve(res) {
          if (isPlainObject(res)) {
            res = Vue.extend(res);
          }
          // cache resolved
          factory.resolved = res;
          // invoke callbacks
          for (var i = 0, l = cbs.length; i < l; i++) {
            cbs[i](res);
          }
        }, function reject(reason) {
          process.env.NODE_ENV !== 'production' && warn('Failed to resolve async component' + (typeof value === 'string' ? ': ' + value : '') + '. ' + (reason ? '\nReason: ' + reason : ''));
        });
      }
    } else {
      // normal component
      cb(factory);
    }
  };
}

var filterRE$1 = /[^|]\|[^|]/;

function dataAPI (Vue) {
  /**
   * Get the value from an expression on this vm.
   *
   * @param {String} exp
   * @param {Boolean} [asStatement]
   * @return {*}
   */

  Vue.prototype.$get = function (exp, asStatement) {
    var res = parseExpression(exp);
    if (res) {
      if (asStatement) {
        var self = this;
        return function statementHandler() {
          self.$arguments = toArray(arguments);
          var result = res.get.call(self, self);
          self.$arguments = null;
          return result;
        };
      } else {
        try {
          return res.get.call(this, this);
        } catch (e) {}
      }
    }
  };

  /**
   * Set the value from an expression on this vm.
   * The expression must be a valid left-hand
   * expression in an assignment.
   *
   * @param {String} exp
   * @param {*} val
   */

  Vue.prototype.$set = function (exp, val) {
    var res = parseExpression(exp, true);
    if (res && res.set) {
      res.set.call(this, this, val);
    }
  };

  /**
   * Delete a property on the VM
   *
   * @param {String} key
   */

  Vue.prototype.$delete = function (key) {
    del(this._data, key);
  };

  /**
   * Watch an expression, trigger callback when its
   * value changes.
   *
   * @param {String|Function} expOrFn
   * @param {Function} cb
   * @param {Object} [options]
   *                 - {Boolean} deep
   *                 - {Boolean} immediate
   * @return {Function} - unwatchFn
   */

  Vue.prototype.$watch = function (expOrFn, cb, options) {
    var vm = this;
    var parsed;
    if (typeof expOrFn === 'string') {
      parsed = parseDirective(expOrFn);
      expOrFn = parsed.expression;
    }
    var watcher = new Watcher(vm, expOrFn, cb, {
      deep: options && options.deep,
      sync: options && options.sync,
      filters: parsed && parsed.filters,
      user: !options || options.user !== false
    });
    if (options && options.immediate) {
      cb.call(vm, watcher.value);
    }
    return function unwatchFn() {
      watcher.teardown();
    };
  };

  /**
   * Evaluate a text directive, including filters.
   *
   * @param {String} text
   * @param {Boolean} [asStatement]
   * @return {String}
   */

  Vue.prototype.$eval = function (text, asStatement) {
    // check for filters.
    if (filterRE$1.test(text)) {
      var dir = parseDirective(text);
      // the filter regex check might give false positive
      // for pipes inside strings, so it's possible that
      // we don't get any filters here
      var val = this.$get(dir.expression, asStatement);
      return dir.filters ? this._applyFilters(val, null, dir.filters) : val;
    } else {
      // no filter
      return this.$get(text, asStatement);
    }
  };

  /**
   * Interpolate a piece of template text.
   *
   * @param {String} text
   * @return {String}
   */

  Vue.prototype.$interpolate = function (text) {
    var tokens = parseText(text);
    var vm = this;
    if (tokens) {
      if (tokens.length === 1) {
        return vm.$eval(tokens[0].value) + '';
      } else {
        return tokens.map(function (token) {
          return token.tag ? vm.$eval(token.value) : token.value;
        }).join('');
      }
    } else {
      return text;
    }
  };

  /**
   * Log instance data as a plain JS object
   * so that it is easier to inspect in console.
   * This method assumes console is available.
   *
   * @param {String} [path]
   */

  Vue.prototype.$log = function (path) {
    var data = path ? getPath(this._data, path) : this._data;
    if (data) {
      data = clean(data);
    }
    // include computed fields
    if (!path) {
      var key;
      for (key in this.$options.computed) {
        data[key] = clean(this[key]);
      }
      if (this._props) {
        for (key in this._props) {
          data[key] = clean(this[key]);
        }
      }
    }
    console.log(data);
  };

  /**
   * "clean" a getter/setter converted object into a plain
   * object copy.
   *
   * @param {Object} - obj
   * @return {Object}
   */

  function clean(obj) {
    return JSON.parse(JSON.stringify(obj));
  }
}

function domAPI (Vue) {
  /**
   * Convenience on-instance nextTick. The callback is
   * auto-bound to the instance, and this avoids component
   * modules having to rely on the global Vue.
   *
   * @param {Function} fn
   */

  Vue.prototype.$nextTick = function (fn) {
    nextTick(fn, this);
  };

  /**
   * Append instance to target
   *
   * @param {Node} target
   * @param {Function} [cb]
   * @param {Boolean} [withTransition] - defaults to true
   */

  Vue.prototype.$appendTo = function (target, cb, withTransition) {
    return insert(this, target, cb, withTransition, append, appendWithTransition);
  };

  /**
   * Prepend instance to target
   *
   * @param {Node} target
   * @param {Function} [cb]
   * @param {Boolean} [withTransition] - defaults to true
   */

  Vue.prototype.$prependTo = function (target, cb, withTransition) {
    target = query(target);
    if (target.hasChildNodes()) {
      this.$before(target.firstChild, cb, withTransition);
    } else {
      this.$appendTo(target, cb, withTransition);
    }
    return this;
  };

  /**
   * Insert instance before target
   *
   * @param {Node} target
   * @param {Function} [cb]
   * @param {Boolean} [withTransition] - defaults to true
   */

  Vue.prototype.$before = function (target, cb, withTransition) {
    return insert(this, target, cb, withTransition, beforeWithCb, beforeWithTransition);
  };

  /**
   * Insert instance after target
   *
   * @param {Node} target
   * @param {Function} [cb]
   * @param {Boolean} [withTransition] - defaults to true
   */

  Vue.prototype.$after = function (target, cb, withTransition) {
    target = query(target);
    if (target.nextSibling) {
      this.$before(target.nextSibling, cb, withTransition);
    } else {
      this.$appendTo(target.parentNode, cb, withTransition);
    }
    return this;
  };

  /**
   * Remove instance from DOM
   *
   * @param {Function} [cb]
   * @param {Boolean} [withTransition] - defaults to true
   */

  Vue.prototype.$remove = function (cb, withTransition) {
    if (!this.$el.parentNode) {
      return cb && cb();
    }
    var inDocument = this._isAttached && inDoc(this.$el);
    // if we are not in document, no need to check
    // for transitions
    if (!inDocument) withTransition = false;
    var self = this;
    var realCb = function realCb() {
      if (inDocument) self._callHook('detached');
      if (cb) cb();
    };
    if (this._isFragment) {
      removeNodeRange(this._fragmentStart, this._fragmentEnd, this, this._fragment, realCb);
    } else {
      var op = withTransition === false ? removeWithCb : removeWithTransition;
      op(this.$el, this, realCb);
    }
    return this;
  };

  /**
   * Shared DOM insertion function.
   *
   * @param {Vue} vm
   * @param {Element} target
   * @param {Function} [cb]
   * @param {Boolean} [withTransition]
   * @param {Function} op1 - op for non-transition insert
   * @param {Function} op2 - op for transition insert
   * @return vm
   */

  function insert(vm, target, cb, withTransition, op1, op2) {
    target = query(target);
    var targetIsDetached = !inDoc(target);
    var op = withTransition === false || targetIsDetached ? op1 : op2;
    var shouldCallHook = !targetIsDetached && !vm._isAttached && !inDoc(vm.$el);
    if (vm._isFragment) {
      mapNodeRange(vm._fragmentStart, vm._fragmentEnd, function (node) {
        op(node, target, vm);
      });
      cb && cb();
    } else {
      op(vm.$el, target, vm, cb);
    }
    if (shouldCallHook) {
      vm._callHook('attached');
    }
    return vm;
  }

  /**
   * Check for selectors
   *
   * @param {String|Element} el
   */

  function query(el) {
    return typeof el === 'string' ? document.querySelector(el) : el;
  }

  /**
   * Append operation that takes a callback.
   *
   * @param {Node} el
   * @param {Node} target
   * @param {Vue} vm - unused
   * @param {Function} [cb]
   */

  function append(el, target, vm, cb) {
    target.appendChild(el);
    if (cb) cb();
  }

  /**
   * InsertBefore operation that takes a callback.
   *
   * @param {Node} el
   * @param {Node} target
   * @param {Vue} vm - unused
   * @param {Function} [cb]
   */

  function beforeWithCb(el, target, vm, cb) {
    before(el, target);
    if (cb) cb();
  }

  /**
   * Remove operation that takes a callback.
   *
   * @param {Node} el
   * @param {Vue} vm - unused
   * @param {Function} [cb]
   */

  function removeWithCb(el, vm, cb) {
    remove(el);
    if (cb) cb();
  }
}

function eventsAPI (Vue) {
  /**
   * Listen on the given `event` with `fn`.
   *
   * @param {String} event
   * @param {Function} fn
   */

  Vue.prototype.$on = function (event, fn) {
    (this._events[event] || (this._events[event] = [])).push(fn);
    modifyListenerCount(this, event, 1);
    return this;
  };

  /**
   * Adds an `event` listener that will be invoked a single
   * time then automatically removed.
   *
   * @param {String} event
   * @param {Function} fn
   */

  Vue.prototype.$once = function (event, fn) {
    var self = this;
    function on() {
      self.$off(event, on);
      fn.apply(this, arguments);
    }
    on.fn = fn;
    this.$on(event, on);
    return this;
  };

  /**
   * Remove the given callback for `event` or all
   * registered callbacks.
   *
   * @param {String} event
   * @param {Function} fn
   */

  Vue.prototype.$off = function (event, fn) {
    var cbs;
    // all
    if (!arguments.length) {
      if (this.$parent) {
        for (event in this._events) {
          cbs = this._events[event];
          if (cbs) {
            modifyListenerCount(this, event, -cbs.length);
          }
        }
      }
      this._events = {};
      return this;
    }
    // specific event
    cbs = this._events[event];
    if (!cbs) {
      return this;
    }
    if (arguments.length === 1) {
      modifyListenerCount(this, event, -cbs.length);
      this._events[event] = null;
      return this;
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        modifyListenerCount(this, event, -1);
        cbs.splice(i, 1);
        break;
      }
    }
    return this;
  };

  /**
   * Trigger an event on self.
   *
   * @param {String|Object} event
   * @return {Boolean} shouldPropagate
   */

  Vue.prototype.$emit = function (event) {
    var isSource = typeof event === 'string';
    event = isSource ? event : event.name;
    var cbs = this._events[event];
    var shouldPropagate = isSource || !cbs;
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      // this is a somewhat hacky solution to the question raised
      // in #2102: for an inline component listener like <comp @test="doThis">,
      // the propagation handling is somewhat broken. Therefore we
      // need to treat these inline callbacks differently.
      var hasParentCbs = isSource && cbs.some(function (cb) {
        return cb._fromParent;
      });
      if (hasParentCbs) {
        shouldPropagate = false;
      }
      var args = toArray(arguments, 1);
      for (var i = 0, l = cbs.length; i < l; i++) {
        var cb = cbs[i];
        var res = cb.apply(this, args);
        if (res === true && (!hasParentCbs || cb._fromParent)) {
          shouldPropagate = true;
        }
      }
    }
    return shouldPropagate;
  };

  /**
   * Recursively broadcast an event to all children instances.
   *
   * @param {String|Object} event
   * @param {...*} additional arguments
   */

  Vue.prototype.$broadcast = function (event) {
    var isSource = typeof event === 'string';
    event = isSource ? event : event.name;
    // if no child has registered for this event,
    // then there's no need to broadcast.
    if (!this._eventsCount[event]) return;
    var children = this.$children;
    var args = toArray(arguments);
    if (isSource) {
      // use object event to indicate non-source emit
      // on children
      args[0] = { name: event, source: this };
    }
    for (var i = 0, l = children.length; i < l; i++) {
      var child = children[i];
      var shouldPropagate = child.$emit.apply(child, args);
      if (shouldPropagate) {
        child.$broadcast.apply(child, args);
      }
    }
    return this;
  };

  /**
   * Recursively propagate an event up the parent chain.
   *
   * @param {String} event
   * @param {...*} additional arguments
   */

  Vue.prototype.$dispatch = function (event) {
    var shouldPropagate = this.$emit.apply(this, arguments);
    if (!shouldPropagate) return;
    var parent = this.$parent;
    var args = toArray(arguments);
    // use object event to indicate non-source emit
    // on parents
    args[0] = { name: event, source: this };
    while (parent) {
      shouldPropagate = parent.$emit.apply(parent, args);
      parent = shouldPropagate ? parent.$parent : null;
    }
    return this;
  };

  /**
   * Modify the listener counts on all parents.
   * This bookkeeping allows $broadcast to return early when
   * no child has listened to a certain event.
   *
   * @param {Vue} vm
   * @param {String} event
   * @param {Number} count
   */

  var hookRE = /^hook:/;
  function modifyListenerCount(vm, event, count) {
    var parent = vm.$parent;
    // hooks do not get broadcasted so no need
    // to do bookkeeping for them
    if (!parent || !count || hookRE.test(event)) return;
    while (parent) {
      parent._eventsCount[event] = (parent._eventsCount[event] || 0) + count;
      parent = parent.$parent;
    }
  }
}

function lifecycleAPI (Vue) {
  /**
   * Set instance target element and kick off the compilation
   * process. The passed in `el` can be a selector string, an
   * existing Element, or a DocumentFragment (for block
   * instances).
   *
   * @param {Element|DocumentFragment|string} el
   * @public
   */

  Vue.prototype.$mount = function (el) {
    if (this._isCompiled) {
      process.env.NODE_ENV !== 'production' && warn('$mount() should be called only once.', this);
      return;
    }
    el = query(el);
    if (!el) {
      el = document.createElement('div');
    }
    this._compile(el);
    this._initDOMHooks();
    if (inDoc(this.$el)) {
      this._callHook('attached');
      ready.call(this);
    } else {
      this.$once('hook:attached', ready);
    }
    return this;
  };

  /**
   * Mark an instance as ready.
   */

  function ready() {
    this._isAttached = true;
    this._isReady = true;
    this._callHook('ready');
  }

  /**
   * Teardown the instance, simply delegate to the internal
   * _destroy.
   *
   * @param {Boolean} remove
   * @param {Boolean} deferCleanup
   */

  Vue.prototype.$destroy = function (remove, deferCleanup) {
    this._destroy(remove, deferCleanup);
  };

  /**
   * Partially compile a piece of DOM and return a
   * decompile function.
   *
   * @param {Element|DocumentFragment} el
   * @param {Vue} [host]
   * @param {Object} [scope]
   * @param {Fragment} [frag]
   * @return {Function}
   */

  Vue.prototype.$compile = function (el, host, scope, frag) {
    return compile(el, this.$options, true)(this, el, host, scope, frag);
  };
}

/**
 * The exposed Vue constructor.
 *
 * API conventions:
 * - public API methods/properties are prefixed with `$`
 * - internal methods/properties are prefixed with `_`
 * - non-prefixed properties are assumed to be proxied user
 *   data.
 *
 * @constructor
 * @param {Object} [options]
 * @public
 */

function Vue(options) {
  this._init(options);
}

// install internals
initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
miscMixin(Vue);

// install instance APIs
dataAPI(Vue);
domAPI(Vue);
eventsAPI(Vue);
lifecycleAPI(Vue);

var slot = {

  priority: SLOT,
  params: ['name'],

  bind: function bind() {
    // this was resolved during component transclusion
    var name = this.params.name || 'default';
    var content = this.vm._slotContents && this.vm._slotContents[name];
    if (!content || !content.hasChildNodes()) {
      this.fallback();
    } else {
      this.compile(content.cloneNode(true), this.vm._context, this.vm);
    }
  },

  compile: function compile(content, context, host) {
    if (content && context) {
      if (this.el.hasChildNodes() && content.childNodes.length === 1 && content.childNodes[0].nodeType === 1 && content.childNodes[0].hasAttribute('v-if')) {
        // if the inserted slot has v-if
        // inject fallback content as the v-else
        var elseBlock = document.createElement('template');
        elseBlock.setAttribute('v-else', '');
        elseBlock.innerHTML = this.el.innerHTML;
        // the else block should be compiled in child scope
        elseBlock._context = this.vm;
        content.appendChild(elseBlock);
      }
      var scope = host ? host._scope : this._scope;
      this.unlink = context.$compile(content, host, scope, this._frag);
    }
    if (content) {
      replace(this.el, content);
    } else {
      remove(this.el);
    }
  },

  fallback: function fallback() {
    this.compile(extractContent(this.el, true), this.vm);
  },

  unbind: function unbind() {
    if (this.unlink) {
      this.unlink();
    }
  }
};

var partial = {

  priority: PARTIAL,

  params: ['name'],

  // watch changes to name for dynamic partials
  paramWatchers: {
    name: function name(value) {
      vIf.remove.call(this);
      if (value) {
        this.insert(value);
      }
    }
  },

  bind: function bind() {
    this.anchor = createAnchor('v-partial');
    replace(this.el, this.anchor);
    this.insert(this.params.name);
  },

  insert: function insert(id) {
    var partial = resolveAsset(this.vm.$options, 'partials', id, true);
    if (partial) {
      this.factory = new FragmentFactory(this.vm, partial);
      vIf.insert.call(this);
    }
  },

  unbind: function unbind() {
    if (this.frag) {
      this.frag.destroy();
    }
  }
};

var elementDirectives = {
  slot: slot,
  partial: partial
};

var convertArray = vFor._postProcess;

/**
 * Limit filter for arrays
 *
 * @param {Number} n
 * @param {Number} offset (Decimal expected)
 */

function limitBy(arr, n, offset) {
  offset = offset ? parseInt(offset, 10) : 0;
  n = toNumber(n);
  return typeof n === 'number' ? arr.slice(offset, offset + n) : arr;
}

/**
 * Filter filter for arrays
 *
 * @param {String} search
 * @param {String} [delimiter]
 * @param {String} ...dataKeys
 */

function filterBy(arr, search, delimiter) {
  arr = convertArray(arr);
  if (search == null) {
    return arr;
  }
  if (typeof search === 'function') {
    return arr.filter(search);
  }
  // cast to lowercase string
  search = ('' + search).toLowerCase();
  // allow optional `in` delimiter
  // because why not
  var n = delimiter === 'in' ? 3 : 2;
  // extract and flatten keys
  var keys = Array.prototype.concat.apply([], toArray(arguments, n));
  var res = [];
  var item, key, val, j;
  for (var i = 0, l = arr.length; i < l; i++) {
    item = arr[i];
    val = item && item.$value || item;
    j = keys.length;
    if (j) {
      while (j--) {
        key = keys[j];
        if (key === '$key' && contains(item.$key, search) || contains(getPath(val, key), search)) {
          res.push(item);
          break;
        }
      }
    } else if (contains(item, search)) {
      res.push(item);
    }
  }
  return res;
}

/**
 * Filter filter for arrays
 *
 * @param {String|Array<String>|Function} ...sortKeys
 * @param {Number} [order]
 */

function orderBy(arr) {
  var comparator = null;
  var sortKeys = undefined;
  arr = convertArray(arr);

  // determine order (last argument)
  var args = toArray(arguments, 1);
  var order = args[args.length - 1];
  if (typeof order === 'number') {
    order = order < 0 ? -1 : 1;
    args = args.length > 1 ? args.slice(0, -1) : args;
  } else {
    order = 1;
  }

  // determine sortKeys & comparator
  var firstArg = args[0];
  if (!firstArg) {
    return arr;
  } else if (typeof firstArg === 'function') {
    // custom comparator
    comparator = function (a, b) {
      return firstArg(a, b) * order;
    };
  } else {
    // string keys. flatten first
    sortKeys = Array.prototype.concat.apply([], args);
    comparator = function (a, b, i) {
      i = i || 0;
      return i >= sortKeys.length - 1 ? baseCompare(a, b, i) : baseCompare(a, b, i) || comparator(a, b, i + 1);
    };
  }

  function baseCompare(a, b, sortKeyIndex) {
    var sortKey = sortKeys[sortKeyIndex];
    if (sortKey) {
      if (sortKey !== '$key') {
        if (isObject(a) && '$value' in a) a = a.$value;
        if (isObject(b) && '$value' in b) b = b.$value;
      }
      a = isObject(a) ? getPath(a, sortKey) : a;
      b = isObject(b) ? getPath(b, sortKey) : b;
    }
    return a === b ? 0 : a > b ? order : -order;
  }

  // sort on a copy to avoid mutating original array
  return arr.slice().sort(comparator);
}

/**
 * String contain helper
 *
 * @param {*} val
 * @param {String} search
 */

function contains(val, search) {
  var i;
  if (isPlainObject(val)) {
    var keys = Object.keys(val);
    i = keys.length;
    while (i--) {
      if (contains(val[keys[i]], search)) {
        return true;
      }
    }
  } else if (isArray(val)) {
    i = val.length;
    while (i--) {
      if (contains(val[i], search)) {
        return true;
      }
    }
  } else if (val != null) {
    return val.toString().toLowerCase().indexOf(search) > -1;
  }
}

var digitsRE = /(\d{3})(?=\d)/g;

// asset collections must be a plain object.
var filters = {

  orderBy: orderBy,
  filterBy: filterBy,
  limitBy: limitBy,

  /**
   * Stringify value.
   *
   * @param {Number} indent
   */

  json: {
    read: function read(value, indent) {
      return typeof value === 'string' ? value : JSON.stringify(value, null, arguments.length > 1 ? indent : 2);
    },
    write: function write(value) {
      try {
        return JSON.parse(value);
      } catch (e) {
        return value;
      }
    }
  },

  /**
   * 'abc' => 'Abc'
   */

  capitalize: function capitalize(value) {
    if (!value && value !== 0) return '';
    value = value.toString();
    return value.charAt(0).toUpperCase() + value.slice(1);
  },

  /**
   * 'abc' => 'ABC'
   */

  uppercase: function uppercase(value) {
    return value || value === 0 ? value.toString().toUpperCase() : '';
  },

  /**
   * 'AbC' => 'abc'
   */

  lowercase: function lowercase(value) {
    return value || value === 0 ? value.toString().toLowerCase() : '';
  },

  /**
   * 12345 => $12,345.00
   *
   * @param {String} sign
   * @param {Number} decimals Decimal places
   */

  currency: function currency(value, _currency, decimals) {
    value = parseFloat(value);
    if (!isFinite(value) || !value && value !== 0) return '';
    _currency = _currency != null ? _currency : '$';
    decimals = decimals != null ? decimals : 2;
    var stringified = Math.abs(value).toFixed(decimals);
    var _int = decimals ? stringified.slice(0, -1 - decimals) : stringified;
    var i = _int.length % 3;
    var head = i > 0 ? _int.slice(0, i) + (_int.length > 3 ? ',' : '') : '';
    var _float = decimals ? stringified.slice(-1 - decimals) : '';
    var sign = value < 0 ? '-' : '';
    return sign + _currency + head + _int.slice(i).replace(digitsRE, '$1,') + _float;
  },

  /**
   * 'item' => 'items'
   *
   * @params
   *  an array of strings corresponding to
   *  the single, double, triple ... forms of the word to
   *  be pluralized. When the number to be pluralized
   *  exceeds the length of the args, it will use the last
   *  entry in the array.
   *
   *  e.g. ['single', 'double', 'triple', 'multiple']
   */

  pluralize: function pluralize(value) {
    var args = toArray(arguments, 1);
    var length = args.length;
    if (length > 1) {
      var index = value % 10 - 1;
      return index in args ? args[index] : args[length - 1];
    } else {
      return args[0] + (value === 1 ? '' : 's');
    }
  },

  /**
   * Debounce a handler function.
   *
   * @param {Function} handler
   * @param {Number} delay = 300
   * @return {Function}
   */

  debounce: function debounce(handler, delay) {
    if (!handler) return;
    if (!delay) {
      delay = 300;
    }
    return _debounce(handler, delay);
  }
};

function installGlobalAPI (Vue) {
  /**
   * Vue and every constructor that extends Vue has an
   * associated options object, which can be accessed during
   * compilation steps as `this.constructor.options`.
   *
   * These can be seen as the default options of every
   * Vue instance.
   */

  Vue.options = {
    directives: directives,
    elementDirectives: elementDirectives,
    filters: filters,
    transitions: {},
    components: {},
    partials: {},
    replace: true
  };

  /**
   * Expose useful internals
   */

  Vue.util = util;
  Vue.config = config;
  Vue.set = set;
  Vue['delete'] = del;
  Vue.nextTick = nextTick;

  /**
   * The following are exposed for advanced usage / plugins
   */

  Vue.compiler = compiler;
  Vue.FragmentFactory = FragmentFactory;
  Vue.internalDirectives = internalDirectives;
  Vue.parsers = {
    path: path,
    text: text,
    template: template,
    directive: directive,
    expression: expression
  };

  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */

  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   *
   * @param {Object} extendOptions
   */

  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var isFirstExtend = Super.cid === 0;
    if (isFirstExtend && extendOptions._Ctor) {
      return extendOptions._Ctor;
    }
    var name = extendOptions.name || Super.options.name;
    if (process.env.NODE_ENV !== 'production') {
      if (!/^[a-zA-Z][\w-]*$/.test(name)) {
        warn('Invalid component name: "' + name + '". Component names ' + 'can only contain alphanumeric characaters and the hyphen.');
        name = null;
      }
    }
    var Sub = createClass(name || 'VueComponent');
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(Super.options, extendOptions);
    Sub['super'] = Super;
    // allow further extension
    Sub.extend = Super.extend;
    // create asset registers, so extended classes
    // can have their private assets too.
    config._assetTypes.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }
    // cache constructor
    if (isFirstExtend) {
      extendOptions._Ctor = Sub;
    }
    return Sub;
  };

  /**
   * A function that returns a sub-class constructor with the
   * given name. This gives us much nicer output when
   * logging instances in the console.
   *
   * @param {String} name
   * @return {Function}
   */

  function createClass(name) {
    /* eslint-disable no-new-func */
    return new Function('return function ' + classify(name) + ' (options) { this._init(options) }')();
    /* eslint-enable no-new-func */
  }

  /**
   * Plugin system
   *
   * @param {Object} plugin
   */

  Vue.use = function (plugin) {
    /* istanbul ignore if */
    if (plugin.installed) {
      return;
    }
    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else {
      plugin.apply(null, args);
    }
    plugin.installed = true;
    return this;
  };

  /**
   * Apply a global mixin by merging it into the default
   * options.
   */

  Vue.mixin = function (mixin) {
    Vue.options = mergeOptions(Vue.options, mixin);
  };

  /**
   * Create asset registration methods with the following
   * signature:
   *
   * @param {String} id
   * @param {*} definition
   */

  config._assetTypes.forEach(function (type) {
    Vue[type] = function (id, definition) {
      if (!definition) {
        return this.options[type + 's'][id];
      } else {
        /* istanbul ignore if */
        if (process.env.NODE_ENV !== 'production') {
          if (type === 'component' && (commonTagRE.test(id) || reservedTagRE.test(id))) {
            warn('Do not use built-in or reserved HTML elements as component ' + 'id: ' + id);
          }
        }
        if (type === 'component' && isPlainObject(definition)) {
          if (!definition.name) {
            definition.name = id;
          }
          definition = Vue.extend(definition);
        }
        this.options[type + 's'][id] = definition;
        return definition;
      }
    };
  });

  // expose internal transition API
  extend(Vue.transition, transition);
}

installGlobalAPI(Vue);

Vue.version = '1.0.26';

// devtools global hook
/* istanbul ignore next */
setTimeout(function () {
  if (config.devtools) {
    if (devtools) {
      devtools.emit('init', Vue);
    } else if (process.env.NODE_ENV !== 'production' && inBrowser && /Chrome\/\d+/.test(window.navigator.userAgent)) {
      console.log('Download the Vue Devtools for a better development experience:\n' + 'https://github.com/vuejs/vue-devtools');
    }
  }
}, 0);

module.exports = Vue;
}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"_process":21}],30:[function(require,module,exports){
'use strict';

var Vue = require('vue');
// Vue Recource
var VueResource = require('vue-resource');
Vue.use(VueResource);
// Vue Router
var VueRouter = require('vue-router');
Vue.use(VueRouter);
// Vue Mement
var VueMoment = require('vue-moment');
Vue.use(VueMoment);
// Vue validator
var VueValidator = require('vue-validator');
Vue.use(VueValidator);
//  Spinner
var PulseLoader = require('vue-spinner/dist/vue-spinner.min').SyncLoader;
// Register the component globally
Vue.component('pulse-loader', PulseLoader);
// Vue Star Rating
var StarRating = require('./components/btns/rating.vue');
// Register the component globally
Vue.component('star-rating', StarRating);
// Vue navbar
var navbar = require('./components/header/navbar.vue');
// Register the component globally
Vue.component('navbar', navbar);

// Vue Recource init Headers With laravel csrf_token
Vue.http.headers.common['X-CSRF-TOKEN'] = document.getElementById('_token').getAttribute('value');

// Vue Router init

// Define some Components.
var MainPage = require('./components/pages/mainPage.vue');
var AddServices = require('./components/services/addServices.vue');
var MyServices = require('./components/services/myServices.vue');
var ServicesDetails = require('./components/services/service_details.vue');
var IncomingOrders = require('./components/orders/incomingOrders.vue');
var singleOrder = require('./components/orders/singleOrder.vue');
var PurchaseOrders = require('./components/orders/purchaseOrders.vue');
var UserServices = require('./components/users/UserServices.vue');
var SendMessage = require('./components/messages/send.vue');
var MySendMessages = require('./components/messages/sendMessage.vue');
var MyRecivedMessages = require('./components/messages/incomingMessage.vue');
var messageDetails = require('./components/messages/messageDetails.vue');
var unReadMessages = require('./components/messages/newMessage.vue');
var ReadMessages = require('./components/messages/oldMessage.vue');
var favorite = require('./components/favorite/favorite.vue');
var category = require('./components/category/category.vue');
var addCredit = require('./components/credit/add.vue');
var ShowAllCharge = require('./components/credit/allCharge.vue');
var ShowAllPayment = require('./components/credit/allPayment.vue');
var ShowAllProfit = require('./components/credit/allProfit.vue');
var ShowAllBalance = require('./components/credit/allBalance.vue');
var ShowAllNotification = require('./components/notification/allNotifications.vue');
var ShowAllUnReadNotification = require('./components/notification/unReadNotifications.vue');

// The router needs a root component to render.
// For demo purposes, we will just use an empty one
// because we are using the HTML as the app template.
// !! Note that the App is not a Vue instance.
var App = Vue.extend({});

// Create a router instance.
// You can pass in additional options here, but let's
// keep it simple for now.
var route = new VueRouter();

// Define some routes.
// Each route should map to a component. The "component" can
// either be an actual component constructor created via
// Vue.extend(), or just a component options object.
// We'll talk about nested routes later.
route.map({
    '/': {
        component: MainPage
    },
    '/AddServices': {
        component: AddServices
    },
    '/MyServices': {
        component: MyServices
    },
    '/IncomingOrders': {
        component: IncomingOrders
    },
    '/PurchaseOrders': {
        component: PurchaseOrders
    },
    '/ServicesDetails/:serviceId/:serviceName': {
        name: '/ServicesDetails',
        component: ServicesDetails
    },
    '/User/:userId/:userName': {
        name: '/User',
        component: UserServices
    },
    '/Order/:orderId': {
        name: '/Order',
        component: singleOrder
    },
    '/SendMessage/:userId': {
        name: '/SendMessage',
        component: SendMessage
    },
    '/GetMySendMessages': {
        component: MySendMessages
    },
    '/GetMyRecivedMessages': {
        component: MyRecivedMessages
    },
    '/GetUnReadMessages': {
        component: unReadMessages
    },
    '/GetReadMessages': {
        component: ReadMessages
    },
    '/messageDetails/:message_id/:viewType': {
        name: '/messageDetails',
        component: messageDetails
    },
    '/GetMyFavorites': {
        component: favorite
    },
    '/Category/:catId/:catName': {
        name: '/Category',
        component: category
    },
    '/AddCredit': {
        component: addCredit
    },
    '/AllCharge': {
        component: ShowAllCharge
    },
    '/AllPayment': {
        component: ShowAllPayment
    },
    '/AllProfit': {
        component: ShowAllProfit
    },
    '/AllBalance': {
        component: ShowAllBalance
    },
    '/Notification': {
        component: ShowAllNotification
    },
    '/UnReadNotification': {
        component: ShowAllUnReadNotification
    }
});

// Now we can start the app!
// The router will create an instance of App and mount to
// the element matching the selector body.
route.start(App, 'body');

},{"./components/btns/rating.vue":33,"./components/category/category.vue":35,"./components/credit/add.vue":38,"./components/credit/allBalance.vue":39,"./components/credit/allCharge.vue":40,"./components/credit/allPayment.vue":41,"./components/credit/allProfit.vue":42,"./components/favorite/favorite.vue":44,"./components/header/navbar.vue":45,"./components/messages/incomingMessage.vue":46,"./components/messages/messageDetails.vue":47,"./components/messages/newMessage.vue":50,"./components/messages/oldMessage.vue":51,"./components/messages/send.vue":52,"./components/messages/sendMessage.vue":53,"./components/notification/allNotifications.vue":54,"./components/notification/unReadNotifications.vue":56,"./components/orders/incomingOrders.vue":57,"./components/orders/purchaseOrders.vue":59,"./components/orders/singleOrder.vue":60,"./components/pages/mainPage.vue":62,"./components/services/addServices.vue":65,"./components/services/myServices.vue":66,"./components/services/service_details.vue":67,"./components/users/UserServices.vue":70,"vue":29,"vue-moment":23,"vue-resource":24,"vue-router":25,"vue-spinner/dist/vue-spinner.min":26,"vue-validator":28}],31:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


var Alert = require('vue-strap/dist/vue-strap.min').alert;

exports.default = {
    props: ['service'],
    components: {
        success_message: Alert,
        error_message: Alert
    },
    data: function data() {
        return {
            disabled: false,
            error: ''
        };
    },
    methods: {
        addOrder: function addOrder() {
            this.disabled = true;
            this.$http.get('Orders/' + this.service.id).then(function (res) {
                alertify.success('The Service Added Successfully Waiting The Approvment!');
            }, function (res) {
                this.error = "Something Goes Wrong You can't order this Service For The Next Resons!\
                <p>\
                    1 - This Service Added By You\
                    <br>\
                    2 - This Service You Order It Before\
                    <br>\
                    3 - This Service not Found\
                    <br>\
                    4 - You Have No Enough Money\
                </p>";
                alertify.error(this.error);
            });
            this.disabled = false;
        }
    }
};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\n<a @click.prevent=\"addOrder()\" v-bind:disabled=\"disabled\" class=\"btn btn-success btn-sm buyBtn\">\n    <i class=\"fa fa-shopping-cart\"></i> Buy\n</a>\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  if (!module.hot.data) {
    hotAPI.createRecord("_v-5cc9747a", module.exports)
  } else {
    hotAPI.update("_v-5cc9747a", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}
},{"vue":29,"vue-hot-reload-api":22,"vue-strap/dist/vue-strap.min":27}],32:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    props: ['service'],
    data: function data() {
        return {};
    },

    methods: {
        addFavorite: function addFavorite() {
            this.$http.get('Addfavorite/' + this.service.id).then(function (res) {
                swal('Success', 'The Service Added TO Fivorite Sucessfully', 'success');
            }, function (res) {

                alertify.error('Error: Some Problems occure Maybe because the Following Resons');
                alertify.error('The Service Is Your Service');
                alertify.error('The Service Already Favorited');
                alertify.error('The Service Not Found');
            });
        }
    }

};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\n<button @click.prevent=\"addFavorite\" type=\"button\" class=\"btn btn-danger btn-sm\">\n    <i class=\"fa fa-heart\"></i> Add to Favorites\n</button>\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  if (!module.hot.data) {
    hotAPI.createRecord("_v-0e172e8f", module.exports)
  } else {
    hotAPI.update("_v-0e172e8f", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}
},{"vue":29,"vue-hot-reload-api":22}],33:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    props: ['service'],
    data: function data() {
        return {
            rating: true,
            ratingValue: ''
        };
    },

    methods: {
        AddRate: function AddRate(vote) {
            var formData = new FormData();
            formData.append('vote', vote);
            formData.append('serviceId', this.service.id);

            this.$http.post('addNewVote', formData).then(function (res) {
                this.rating = false;
                this.ratingValue = vote;
                /*
                | NOTE use $dispatch From Childeren To Parent
                | NOTE use $broadcast From Parent To Childeren
                */
                this.$dispatch('AddNewRate', vote);
                alertify.success("Service Has Been Rated By " + vote + " Star/s");
            }, function (res) {
                alertify.error('Error: Some Problems occure Try Again Later');
            });
        }
    }
};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\n<div class=\"rating\" v-if=\"rating\">\n    <input type=\"radio\" id=\"star5\" name=\"rating\" value=\"5\" @click.prevent=\"AddRate(5)\"/>\n    <label for=\"star5\" title=\"Rocks!\">5 stars</label>\n    <input type=\"radio\" id=\"star4\" name=\"rating\" value=\"4\" @click.prevent=\"AddRate(4)\"/>\n    <label for=\"star4\" title=\"Pretty good\">4 stars</label>\n    <input type=\"radio\" id=\"star3\" name=\"rating\" value=\"3\" @click.prevent=\"AddRate(3)\"/>\n    <label for=\"star3\" title=\"Meh\">3 stars</label>\n    <input type=\"radio\" id=\"star2\" name=\"rating\" value=\"2\" @click.prevent=\"AddRate(2)\"/>\n    <label for=\"star2\" title=\"Kinda bad\">2 stars</label>\n    <input type=\"radio\" id=\"star1\" name=\"rating\" value=\"1\" @click.prevent=\"AddRate(1)\"/>\n    <label for=\"star1\" title=\"Sucks big time\">1 star</label>\n</div>\n<div class=\"rating\" v-if=\"!rating\">\n    <label v-for=\"rate in ratingValue\" class=\"fa fa-star ratingStyleActive\"></label>\n</div>\n\n\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  if (!module.hot.data) {
    hotAPI.createRecord("_v-fc232c4e", module.exports)
  } else {
    hotAPI.update("_v-fc232c4e", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}
},{"vue":29,"vue-hot-reload-api":22}],34:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    props: ['status']
};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\n<span v-if=\"status == 0\">\n    <span class=\"label label-info\">New Order</span>\n</span>\n<span v-if=\"status == 1\">\n    <span class=\"label label-warning\">Old Order</span>\n</span>\n<span v-if=\"status == 2\">\n    <span class=\"label label-primary\">In Prograss Order</span>\n</span>\n<span v-if=\"status == 3\">\n    <span class=\"label label-danger\">Cancelled</span>\n</span>\n<span v-if=\"status == 4\">\n    <span class=\"label label-success\">Finished</span>\n</span>\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  if (!module.hot.data) {
    hotAPI.createRecord("_v-141555ae", module.exports)
  } else {
    hotAPI.update("_v-141555ae", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}
},{"vue":29,"vue-hot-reload-api":22}],35:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _SingleServices = require('../users/SingleServices.vue');

var _SingleServices2 = _interopRequireDefault(_SingleServices);

var _sidebar = require('../pages/sidebar.vue');

var _sidebar2 = _interopRequireDefault(_sidebar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Spinner = require('vue-strap/dist/vue-strap.min').spinner;

exports.default = {
    components: {
        single_services: _SingleServices2.default,
        spinner: Spinner,
        side_bar: _sidebar2.default
    },
    data: function data() {
        var _ref;

        return _ref = {
            isLoading: false,
            services: [],
            cat: [],
            sortKey: '',
            reverse: 1,
            serviceName: ''
        }, (0, _defineProperty3.default)(_ref, 'cat', []), (0, _defineProperty3.default)(_ref, 'singleCat', []), (0, _defineProperty3.default)(_ref, 'section1', []), (0, _defineProperty3.default)(_ref, 'section2', []), (0, _defineProperty3.default)(_ref, 'section3', []), (0, _defineProperty3.default)(_ref, 'moreServices', true), _ref;
    },
    ready: function ready() {
        this.$refs.spinner.show();
        this.getUserServices();
    },
    methods: {
        getUserServices: function getUserServices(length) {
            if (length !== undefined) {
                var sendLen = '/' + length;
            } else {
                sendLen = '';
            }
            var url = '/getServicesByCategoryId/' + this.$route.params.catId + sendLen;
            this.$http.get(url).then(function (res) {

                if (length !== undefined) {
                    if (res.body['services'].length > 0) {
                        // use push if the result to add object in the array
                        // use concat because res.body['services'] return as array
                        this.services = this.services.concat(res.body['services']);
                    } else {
                        this.moreServices = false;
                        alertify.error('No More Services Found In This Category');
                    }
                    this.$refs.spinner.hide();
                    this.isLoading = true;
                } else {
                    this.services = res.body['services'];
                    this.singleCat = res.body['singleCat'];
                    this.cat = res.body['cat'];
                    this.section1 = res.body['sidebarSection1'];
                    this.section2 = res.body['sidebarSection2'];
                    this.section3 = res.body['sidebarSection3'];
                    this.$refs.spinner.hide();
                    this.isLoading = true;
                }
            }, function (res) {

                alertify.error('There are Some Erros Try Again later');
            });
        },
        sort: function sort(_sort) {
            this.reverse = this.sortKey == _sort ? this.reverse * -1 : 1;
            this.sortKey = _sort;
        },
        showMore: function showMore() {
            this.$refs.spinner.show();
            var length = this.services.length;
            this.getUserServices(length);
        }
    },
    route: {
        canReuse: false // Force reload data
    }
};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\n<navbar></navbar>\n<div class=\"container\">\n    <div class=\"row\">\n        <div class=\"col-md-12\">\n            <span v-if=\"isLoading\">\n                <div class=\"col-md-12\">\n                    <h2 class=\"text-center\">\n                        <i class=\"fa fa-folder-open\"></i> {{ singleCat.name }} Section\n                        <br>\n                        <small class=\"text-danger\"><strong> {{ singleCat.description }} </strong></small>\n                        <br>\n                        <small class=\"text-primary\"><strong> <i class=\"fa fa-cart-plus\"></i> {{ services.length }} service/s</strong></small>\n                    </h2>\n                    <hr>\n                </div>\n                <div class=\"col-lg-3 col-md-3 col-sm-12 col-xs-12\">\n                    <side_bar :category=\"cat\" :section1=\"section1\" :section2=\"section2\" :section3=\"section3\"></side_bar>\n                </div>\n                <div class=\"col-lg-9 col-md-9 col-sm-12 col-xs-12\">\n                    <div class=\"row\">\n                        <div class=\"col-md-6\">\n                            <div class=\"col-md-11\">\n                                <form class=\"form-horizontal\">\n                                    <div class=\"form-group\">\n                                        <label for=\"serviceName\"></label>\n                                        <input type=\"text\" class=\"form-control\" id=\"serviceName\" placeholder=\"Search By  Service name or Service Price\" v-model=\"serviceName\">\n                                    </div>\n                                </form>\n                            </div>\n                        </div>\n                        <div class=\"col-md-6 text-right \">\n                            <div class=\"btn-group\">\n                                <button type=\"button\" class=\"btn btn-primary\" @click=\"sort('price')\"><i class=\"fa fa-dollar\"></i>  Price</button>\n                                <button type=\"button\" class=\"btn btn-success\" @click=\"sort('name')\"><i class=\"fa fa-sort-alpha-asc\"></i> Name</button>\n                                <button type=\"button\" class=\"btn btn-info\" @click=\"sort('votes_sum')\"><i class=\"fa fa-clock-o\"></i>  Most Rating</button>\n                                <button type=\"button\" class=\"btn btn-danger\" @click=\"sort('id')\"><i class=\"fa fa-sort-numeric-desc\"></i>  Order</button>\n                            </div>\n                        </div>\n\n                    </div>\n                    <hr>\n                    <div class=\"row\">\n                        <span v-if=\"services.length > 0\">\n                            <div class=\"col-sm-4 col-md-4\" v-for=\"service in services | orderBy sortKey reverse | filterBy serviceName in 'name' 'price'\" track-by=\"$index\">\n                                <single_services :service=\"service\"></single_services>\n                            </div>\n                            <div v-if=\"services.length >= 6\">\n                                <div class=\"col-lg-12 btn btn-info\" v-if=\"moreServices\" @click=\"showMore()\">Show More</div>\n                                <div class=\"col-lg-12 alert alert-danger text-center\" v-if=\"!moreServices\">NO More Services In This Category</div>\n                                <div class=\"clearfix\"></div>\n                                <br>\n                            </div>\n                        </span>\n                        <span v-else>\n                            <div class=\"alert alert-warning\">\n                                {{ cat.name }} Category Doesn't have Any Services Currently\n                            </div>\n                        </span>\n                    </div>\n                </div>\n            </span>\n            <spinner v-ref:spinner size=\"lg\" fixed text=\"Loading....\"></spinner>\n        </div>\n    </div>\n</div>\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  if (!module.hot.data) {
    hotAPI.createRecord("_v-a0ac849a", module.exports)
  } else {
    hotAPI.update("_v-a0ac849a", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}
},{"../pages/sidebar.vue":63,"../users/SingleServices.vue":69,"babel-runtime/helpers/defineProperty":2,"vue":29,"vue-hot-reload-api":22,"vue-strap/dist/vue-strap.min":27}],36:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    props: ['order'],
    data: function data() {
        return {
            comment: '',
            disabled: true

        };
    },

    methods: {
        valid: function valid() {
            this.disabled = false;
        },
        invalid: function invalid() {
            this.disabled = true;
        },
        addComment: function addComment() {

            var formData = new FormData();
            formData.append('orderId', this.order.id);
            formData.append('comment', this.comment);

            this.$http.post('Comments', formData).then(function (res) {
                alertify.success('Success: your Comment has been added');
                this.comment = '';
                this.$dispatch('AddNewComment', res.body);
            }, function (res) {
                this.comment = '';
                for (var key in res.body) {
                    alertify.error(res.body[key][0]);
                }
                alertify.error('Try Again Later');
            });
        }
    }

};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\n<validator name=\"validation1\">\n    <form novalidate>\n        <div class=\"form-group\">\n          <textarea class=\"form-control\" rows=\"3\" placeholder=\"Write Your Comment\" v-model=\"comment\" @valid=\"valid\" @invalid=\"invalid\" v-validate:message=\"{ required: true, minlength: 20, maxlength: 1000 }\"></textarea>\n        </div>\n        <div class=\"form-group\">\n            <button type=\"button\" class=\"btn btn-success btn-block\" v-bind:disabled=\"disabled\" @click.prevent=\"addComment\">\n                <i class=\"fa fa-comment\"></i> Add Comment\n            </button>\n        </div>\n        <div class=\"form-group alert alert-danger text-center\" v-if=\"disabled\">\n            <p v-if=\"$validation1.message.required\">This Viled Is Requires</p>\n            <p v-if=\"$validation1.message.minlength\">Your Comment Must Be More Than 20 Charachters</p>\n            <p v-if=\"$validation1.message.maxlength\">Your Comment Must Be Less Than 1000 Charachters</p>\n        </div>\n    </form>\n</validator>\n\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  if (!module.hot.data) {
    hotAPI.createRecord("_v-2810c83d", module.exports)
  } else {
    hotAPI.update("_v-2810c83d", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}
},{"vue":29,"vue-hot-reload-api":22}],37:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _addComment = require('../comments/addComment.vue');

var _addComment2 = _interopRequireDefault(_addComment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    props: ['order'],
    components: {
        add_comment: _addComment2.default
    },
    data: function data() {
        return {
            comments: [],
            sortKey: '',
            reverse: 1,
            userName: '',
            showCommentSection: true
        };
    },

    ready: function ready() {
        this.getAllComments();
    },
    methods: {
        getAllComments: function getAllComments() {
            this.$http.get('Comments/' + this.order.id).then(function (res) {
                this.comments = res.body;
            }, function (res) {

                alertify.error('Try Again Later');
            });
        },
        sort: function sort(_sort) {
            this.reverse = this.sortKey == _sort ? this.reverse * -1 : 1;
            this.sortKey = _sort;
        }
    },
    events: {
        AddNewComment: function AddNewComment(val) {
            this.comments.unshift(val);
        },
        DisabledAdCommentSection: function DisabledAdCommentSection(val) {
            alert('here');
            if (val == 'true') {
                this.showCommentSection = false;
            }
        }
    }
};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\n<span v-if=\"showCommentSection\">\n    <add_comment :order=\"order\"></add_comment>\n</span>\n\n<div class=\"container\">\n    <div class=\"row\">\n        <div class=\"col-md-12\">\n            <h2 class=\"page-header\">\n                <span class=\"pull-left\">Comments</span>\n                <small class=\"pull-right text-primary\"><strong><i class=\"fa fa-comments\"></i> {{ comments.length }} comment/s</strong></small>\n                <div class=\"clearfix\"></div>\n            </h2>\n            <div class=\"row\">\n                <div class=\"col-md-6\">\n                    <div class=\"col-md-11\">\n                        <form class=\"form-horizontal\">\n                            <div class=\"form-group\">\n                                <label for=\"serviceName\"></label>\n                                <input type=\"text\" class=\"form-control\" id=\"serviceName\" placeholder=\"Search By Member name\" v-model=\"userName\">\n                            </div>\n                        </form>\n                    </div>\n                </div>\n                <div class=\"col-md-6 text-right \">\n                    <div class=\"btn-group\">\n                        <button type=\"button\" class=\"btn btn-primary\" @click=\"sort('id')\">\n                            <i class=\"fa fa-sort-numeric-desc\"></i>  By Order\n                        </button>\n                        <button type=\"button\" class=\"btn btn-success\" @click=\"sort('created_at')\">\n                            <i class=\"fa fa-calendar\"></i> By Date\n                        </button>\n\n                    </div>\n                </div>\n\n            </div>\n            <hr>\n            <div v-if=\"comments.length > 0\">\n                <section v-for=\"comment in comments | orderBy sortKey reverse | | filterBy userName in 'user.name'\" track-by=\"$index\" class=\"comment-list\">\n                    <article class=\"row\">\n                        <div class=\"col-md-2 col-sm-2 col-xs-2\">\n                            <figure>\n                                <img class=\"img-responsive img-circle\" src=\"http://www.keita-gaming.com/assets/profile/default-avatar-c5d8ec086224cb6fc4e395f4ba3018c2.jpg\" />\n                            </figure>\n                        </div>\n                        <div class=\"col-md-10 col-sm-10 col-xs-10\">\n                            <div class=\"panel panel-default arrow left\">\n                                <div class=\"panel-body\">\n                                    <header class=\"text-left\">\n                                        <div class=\"comment-user pull-left\">\n                                            <a v-link=\"{name: '/User', params: {userId: comment.user.id, userName: comment.user.name}}\">\n                                                <i class=\"fa fa-user\"></i>\n                                                {{ comment.user.name }}\n                                            </a>\n                                        </div>\n                                        <time class=\"comment-date pull-right\" datetime=\"{{ comment.created_at }}\">\n                                            <i class=\"fa fa-clock-o\"></i>\n                                            {{ comment.created_at | moment 'calendar' }}\n                                        </time>\n                                        <div class=\"clearfix\"></div>\n                                    </header>\n                                    <div class=\"comment-post\">\n                                        <p>\n                                            {{ comment.comment }}\n                                        </p>\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                    </article>\n                </section>\n            </div>\n            <div v-else>\n                <div class=\"alert alert-info text-center\">No Comments On This Service Yet!</div>\n            </div>\n        </div>\n    </div>\n</div>\n\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  if (!module.hot.data) {
    hotAPI.createRecord("_v-60ba6186", module.exports)
  } else {
    hotAPI.update("_v-60ba6186", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}
},{"../comments/addComment.vue":36,"vue":29,"vue-hot-reload-api":22}],38:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


var Spinner = require('vue-strap/dist/vue-strap.min').spinner;

exports.default = {
    components: {
        spinner: Spinner
    },
    data: function data() {
        return {
            isLoading: false,
            user: '',
            price: '',
            err: false,
            message: '',
            disable: true
        };
    },

    ready: function ready() {
        this.$refs.spinner.show();
        this.GetAuthUser();
    },
    methods: {
        GetAuthUser: function GetAuthUser() {
            this.$http.get('/GetAuthUser').then(function (res) {
                this.user = res.body;
                this.$refs.spinner.hide();
                this.isLoading = true;
            }, function (res) {
                alertify.error('Some Thing Goes Wrong Check YOur Internet Or Contact With Adminstrator');
            });
        },
        AddCredit: function AddCredit() {
            this.$refs.spinner.show();
            this.disable = true;
            var formData = new FormData();
            formData.append('price', this.price);
            this.$http.post('/AddCredit', formData).then(function (res) {
                swal('Success', 'You Charges Successfully Now See It in The All Charges Operations', 'success');
                this.$refs.spinner.hide();
                this.isLoading = true;
                this.$router.go({
                    path: '/AllCharge'
                });
            }, function (res) {
                alertify.error('Some Thing Goes Wrong Check YOur Internet Or Contact With Adminstrator');
            });
        }
    },
    route: {
        canReuse: false // Force reload data
    },
    computed: {
        disable: function disable() {
            if (this.price == '') {
                this.err = true;
                this.message = 'The Price Value Must Not Be Empty Choose Your Mount';
                return true;
            } else if (this.price == 5 || this.price == 10 || this.price == 20 || this.price == 30 || this.price == 40 || this.price == 50 || this.price == 60 || this.price == 70 || this.price == 80 || this.price == 90 || this.price == 100) {
                this.err = false;
                this.message = '';
                return false;
            } else {
                this.err = true;
                this.message = 'Don\'t miss With The Price Value';
                return true;
            }
        }
    }
};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\n<navbar></navbar>\n<div class=\"container\">\n    <div class=\"row\">\n        <div class=\"col-md-12\">\n            <span v-if=\"isLoading\">\n                <h2 class=\"text-center\">\n                    <i class=\"fa fa-plus\"></i> {{ user.name }} Add Credit Section\n                    <br>\n                    <small class=\"text-danger\">\n                        <strong>\n                            Now You Add Credit To Member {{ user.name }}\n                        </strong>\n                    </small>\n                </h2>\n                <div class=\"row\">\n                    <div class=\"col-md-10 col-md-offset-1\">\n                        <div class=\"panel panel-primary\">\n                            <div class=\"panel-heading\">\n                                <h3 class=\"panel-title\"><i class=\"fa fa-plus\"></i> Add Credit</h3>\n                            </div>\n                            <div class=\"panel-body\">\n                                <form>\n                                    <div class=\"form-group\">\n                                        <label for=\"price\">Credite</label>\n                                        <select class=\"form-control\" id=\"price\" name=\"price\" v-model=\"price\">\n                                            <option value=\"\" selected disabled>Choose Mount</option>\n                                            <option value=\"5\">5</option>\n                                            <option value=\"10\">10</option>\n                                            <option value=\"20\">20</option>\n                                            <option value=\"30\">30</option>\n                                            <option value=\"40\">40</option>\n                                            <option value=\"50\">50</option>\n                                            <option value=\"60\">60</option>\n                                            <option value=\"70\">70</option>\n                                            <option value=\"80\">80</option>\n                                            <option value=\"90\">90</option>\n                                            <option value=\"100\">100</option>\n                                        </select>\n                                        <p class=\"help-block alert alert-danger text-center\" v-if=\"err\">{{ message }}</p>\n                                    </div>\n\n                                    <div class=\"form-group\">\n                                        <button type=\"button\" class=\"btn btn-primary\" v-bind:disabled=\"disable\" @click=\"AddCredit\">\n                                            <i class=\"fa fa-plus\"></i> Add Credit\n                                        </button>\n                                    </div>\n\n                                </form>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </span>\n        </div>\n    </div>\n</div>\n<spinner v-ref:spinner size=\"lg\" fixed text=\"Loading....\"></spinner>\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  if (!module.hot.data) {
    hotAPI.createRecord("_v-19c45f77", module.exports)
  } else {
    hotAPI.update("_v-19c45f77", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}
},{"vue":29,"vue-hot-reload-api":22,"vue-strap/dist/vue-strap.min":27}],39:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


var Spinner = require('vue-strap/dist/vue-strap.min').spinner;

exports.default = {
    components: {
        spinner: Spinner
    },
    data: function data() {
        return {
            isLoading: false,
            user: '',
            userCharge: 0,
            userPays: 0,
            userProfits: 0

        };
    },

    ready: function ready() {
        this.$refs.spinner.show();
        this.GetAllBalance();
    },
    methods: {
        GetAllBalance: function GetAllBalance() {
            this.$http.get('/GetAllBalanceOperation').then(function (res) {
                this.user = res.body['user'];
                this.userCharge = res.body['userCharge'] == null ? 0 : res.body['userCharge'];
                this.userPays = res.body['userPays'] == null ? 0 : res.body['userPays'];
                this.userProfits = res.body['userProfits'] == null ? 0 : res.body['userProfits'];
                this.$refs.spinner.hide();
                this.isLoading = true;
            }, function (res) {
                alertify.error('Some Thing Goes Wrong Check YOur Internet Or Contact With Adminstrator');
            });
        }
    },
    route: {
        canReuse: false // Force reload data
    }
};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\n<navbar></navbar>\n<div class=\"container\">\n    <div class=\"row\">\n        <div class=\"col-md-12\">\n            <span v-if=\"isLoading\">\n                <h2 class=\"text-center\">\n                    <div class=\"row\">\n                        <div class=\"col-md-12\">\n                            <i class=\"fa fa-money\"></i> {{ user.name }} Balances Section\n                        </div>\n                        <div class=\"col-md-12\">\n                            <small class=\"text-info\"><strong>Here All Balances Of Member {{ user.name }} Will Appear</strong></small>\n                        </div>\n                    </div>\n                </h2>\n                <div class=\"row\">\n                    <div class=\"col-lg-3 col-xs-6\">\n                        <!-- small box -->\n                        <div class=\"small-box bg-blue\">\n                            <div class=\"inner\">\n                                <h3>${{ userCharge - userPays }}</h3>\n\n                                <p>Balance</p>\n                            </div>\n                            <div class=\"icon\">\n                                <i class=\"fa fa-money\"></i>\n                            </div>\n                            <a @click.prevent class=\"small-box-footer\">More info <i class=\"fa fa-arrow-circle-right\"></i></a>\n                        </div>\n                    </div>\n                    <!-- ./col -->\n                    <div class=\"col-lg-3 col-xs-6\">\n                        <!-- small box -->\n                        <div class=\"small-box bg-red\">\n                            <div class=\"inner\">\n                                <h3>${{ userCharge }}</h3>\n\n                                <p>Charges</p>\n                            </div>\n                            <div class=\"icon\">\n                                <i class=\"fa fa-btn fa-gear fa-spin\"></i>\n                            </div>\n                            <a v-link=\"{path: '/AllCharge'}\" class=\"small-box-footer\">More info <i class=\"fa fa-arrow-circle-right\"></i></a>\n                        </div>\n                    </div>\n                    <!-- ./col -->\n                    <div class=\"col-lg-3 col-xs-6\">\n                        <!-- small box -->\n                        <div class=\"small-box bg-yellow\">\n                            <div class=\"inner\">\n                                <h3>${{ userPays }}</h3>\n\n                                <p>Payments</p>\n                            </div>\n                            <div class=\"icon\">\n                                <i class=\"fa fa-minus-circle\"></i>\n                            </div>\n                            <a v-link=\"{path: '/AllPayment'}\" class=\"small-box-footer\">More info <i class=\"fa fa-arrow-circle-right\"></i></a>\n                        </div>\n                    </div>\n                    <!-- ./col -->\n                    <div class=\"col-lg-3 col-xs-6\">\n                        <!-- small box -->\n                        <div class=\"small-box bg-green\">\n                            <div class=\"inner\">\n                                <h3>${{ userProfits }}</h3>\n\n                                <p>Profits</p>\n                            </div>\n                            <div class=\"icon\">\n                                <i class=\"fa fa-briefcase\"></i>\n                            </div>\n                            <a v-link=\"{path: '/AllProfit'}\" class=\"small-box-footer\">More info <i class=\"fa fa-arrow-circle-right\"></i></a>\n                        </div>\n                    </div>\n                    <!-- ./col -->\n                </div>\n            </span>\n        </div>\n    </div>\n</div>\n<spinner v-ref:spinner size=\"lg\" fixed text=\"Loading....\"></spinner>\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  if (!module.hot.data) {
    hotAPI.createRecord("_v-4fbb76d6", module.exports)
  } else {
    hotAPI.update("_v-4fbb76d6", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}
},{"vue":29,"vue-hot-reload-api":22,"vue-strap/dist/vue-strap.min":27}],40:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


var Spinner = require('vue-strap/dist/vue-strap.min').spinner;

exports.default = {
    components: {
        spinner: Spinner
    },
    data: function data() {
        return {
            isLoading: false,
            user: '',
            pays: '',
            sumPrice: 0

        };
    },

    ready: function ready() {
        this.$refs.spinner.show();
        this.GetAllCharge();
    },
    methods: {
        GetAllCharge: function GetAllCharge() {
            this.$http.get('/GetAllChargeOperation').then(function (res) {
                this.user = res.body['user'];
                this.pays = res.body['pays'];
                this.sumPrice = res.body['sumPrice'] == null ? 0 : res.body['sumPrice'];
                this.$refs.spinner.hide();
                this.isLoading = true;
            }, function (res) {
                alertify.error('Some Thing Goes Wrong Check YOur Internet Or Contact With Adminstrator');
            });
        }
    },
    route: {
        canReuse: false // Force reload data
    }
};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\n<navbar></navbar>\n<div class=\"container\">\n    <div class=\"row\">\n        <div class=\"col-md-12\">        \n            <span v-if=\"isLoading\">\n                <h2 class=\"text-center\">\n                    <div class=\"row\">\n                        <div class=\"col-md-12\">\n                            <i class=\"fa fa-btn fa-gear fa-spin\"></i> {{ user.name }} Charge Section\n                        </div>\n                        <div class=\"col-md-12\">\n                            <small class=\"text-danger\"><strong>Here All Charge Of Member {{ user.name }} Will Appear</strong></small>\n                        </div>\n                        <div class=\"col-md-6 col-sm-12\">\n                            <small class=\"text-primary\"><strong><i class=\"fa fa-gear fa-spin\"></i> {{ pays.length }} Charge/s</strong></small>\n                        </div>\n                        <div class=\"col-md-6 col-sm-12\">\n                            <small class=\"text-success\"><strong><i class=\"fa fa-money\"></i> {{ sumPrice }} Total Charges </strong></small>\n                        </div>\n                    </div>\n                </h2>\n                <div class=\"row\">\n                    <table class=\"table table-bordered table-hover table-responsive table-striped\">\n                        <thead>\n                            <th>Charge Number</th>\n                            <th>Charge Method</th>\n                            <th>Charge State</th>\n                            <th>Charge Value</th>\n                            <th>Charge Date</th>\n                        </thead>\n                        <tbody v-if=\"pays.length > 0\">\n                            <tr v-for=\"pay in pays\" track-by=\"$index\">\n                                <td>{{ pay.id }}</td>\n                                <td>{{ pay.payment_method }}</td>\n                                <td>{{ pay.state }}</td>\n                                <td>${{ pay.price }}</td>\n                                <td>{{ pay.created_at | moment \"calendar\" }}</td>\n                            </tr>\n                        </tbody>\n                        <tbody v-else>\n                            <tr>\n                                <td colspan=\"6\"><div class=\"alert alert-danger text-center\">No Charge  Happend!</div></td>\n                            </tr>\n                        </tbody>\n                    </table>\n                </div>\n            </span>\n        </div>\n    </div>\n</div>\n<spinner v-ref:spinner size=\"lg\" fixed text=\"Loading....\"></spinner>\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  if (!module.hot.data) {
    hotAPI.createRecord("_v-4f777bea", module.exports)
  } else {
    hotAPI.update("_v-4f777bea", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}
},{"vue":29,"vue-hot-reload-api":22,"vue-strap/dist/vue-strap.min":27}],41:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


var Spinner = require('vue-strap/dist/vue-strap.min').spinner;

exports.default = {
    components: {
        spinner: Spinner
    },
    data: function data() {
        return {
            isLoading: false,
            user: '',
            buys: '',
            sumPrice: 0

        };
    },

    ready: function ready() {
        this.$refs.spinner.show();
        this.GetAllPayment();
    },
    methods: {
        GetAllPayment: function GetAllPayment() {
            this.$http.get('/GetAllPaymentOperation').then(function (res) {
                this.user = res.body['user'];
                this.buys = res.body['buys'];
                this.sumPrice = res.body['sumPrice'] == null ? 0 : res.body['sumPrice'];
                this.$refs.spinner.hide();
                this.isLoading = true;
            }, function (res) {
                alertify.error('Some Thing Goes Wrong Check YOur Internet Or Contact With Adminstrator');
            });
        }
    },
    route: {
        canReuse: false // Force reload data
    }
};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\n<navbar></navbar>\n<div class=\"container\">\n    <div class=\"row\">\n        <div class=\"col-md-12\">\n            <span v-if=\"isLoading\">\n                <h2 class=\"text-center\">\n                    <div class=\"row\">\n                        <div class=\"col-md-12\">\n\n                            <i class=\"fa fa-minus-circle\"></i> {{ user.name }} Payment Section\n                        </div>\n                        <div class=\"col-md-12\">\n                            <small class=\"text-danger\"><strong>Here All Payments Of Member {{ user.name }} Will Appear</strong></small>\n                        </div>\n                        <div class=\"col-md-6 col-sm-12\">\n                            <small class=\"text-primary\"><strong><i class=\"fa fa-gear fa-spin\"></i> {{ buys.length }} Payment/s</strong></small>\n                        </div>\n                        <div class=\"col-md-6 col-sm-12\">\n                            <small class=\"text-success\"><strong><i class=\"fa fa-money\"></i> {{ sumPrice }} Total Payments</strong></small>\n                        </div>\n                    </div>\n                </h2>\n                <div class=\"row\">\n                    <table class=\"table table-bordered table-hover table-responsive table-striped\">\n                        <thead>\n                            <th>Payment Number</th>\n                            <th>Payment Order</th>\n                            <th>Payment State</th>\n                            <th>payment Value</th>\n                            <th>Payment Date</th>\n                        </thead>\n                        <tbody v-if=\"buys.length > 0\">\n                            <tr v-for=\"buy in buys\" track-by=\"$index\">\n                                <td>{{ buy.id }}</td>\n                                <td><a v-link=\"{name: '/Order', params:{orderId: buy.order_id}}\">Order Number #{{ buy.order_id }}</a></td>\n                                <td>\n                                    <span class=\"label label-primary\" v-if=\"buy.finish == 0\">UnPayed Yet</span>\n                                    <span class=\"label label-success\" v-if=\"buy.finish == 1\">Payed</span>\n                                    <span class=\"label label-danger\" v-if=\"buy.finish == 2\">Rejected</span>\n                                </td>\n                                <td>${{ buy.buy_price }}</td>\n                                <td>{{ buy.created_at | moment \"calendar\" }}</td>\n                            </tr>\n                        </tbody>\n                        <tbody v-else>\n                            <tr>\n                                <td colspan=\"6\"><div class=\"alert alert-danger text-center\">No Payment Operations Happend!</div></td>\n                            </tr>\n                        </tbody>\n                    </table>\n                </div>\n            </span>\n        </div>\n    </div>\n</div>\n<spinner v-ref:spinner size=\"lg\" fixed text=\"Loading....\"></spinner>\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  if (!module.hot.data) {
    hotAPI.createRecord("_v-cba73a82", module.exports)
  } else {
    hotAPI.update("_v-cba73a82", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}
},{"vue":29,"vue-hot-reload-api":22,"vue-strap/dist/vue-strap.min":27}],42:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


var Spinner = require('vue-strap/dist/vue-strap.min').spinner;

exports.default = {
    components: {
        spinner: Spinner
    },
    data: function data() {
        return {
            isLoading: false,
            user: '',
            profits: '',
            sumPrice: 0

        };
    },

    ready: function ready() {
        this.$refs.spinner.show();
        this.GetAllProfit();
    },
    methods: {
        GetAllProfit: function GetAllProfit() {
            this.$http.get('/GetAllProfitOperation').then(function (res) {
                this.user = res.body['user'];
                this.profits = res.body['profits'];
                this.sumPrice = res.body['sumPrice'] == null ? 0 : res.body['sumPrice'];
                this.$refs.spinner.hide();
                this.isLoading = true;
            }, function (res) {
                alertify.error('Some Thing Goes Wrong Check YOur Internet Or Contact With Adminstrator');
            });
        }
    },
    route: {
        canReuse: false // Force reload data
    }
};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\n<navbar></navbar>\n<div class=\"container\">\n    <div class=\"row\">\n        <div class=\"col-md-12\">\n            <span v-if=\"isLoading\">\n                <h2 class=\"text-center\">\n                    <div class=\"row\">\n                        <div class=\"col-md-12\">\n\n                            <i class=\"fa fa-briefcase\"></i> {{ user.name }} Profits Section\n                        </div>\n                        <div class=\"col-md-12\">\n                            <small class=\"text-danger\"><strong>Here All Profits Of Member {{ user.name }} Will Appear</strong></small>\n                        </div>\n                        <div class=\"col-md-6 col-sm-12\">\n                            <small class=\"text-primary\"><strong><i class=\"fa fa-gear fa-spin\"></i> {{ profits.length }} Profit/s</strong></small>\n                        </div>\n                        <div class=\"col-md-6 col-sm-12\">\n                            <small class=\"text-success\"><strong><i class=\"fa fa-money\"></i> {{ sumPrice }} Total Profit</strong></small>\n                        </div>\n                    </div>\n                </h2>\n                <div class=\"row\">\n                    <table class=\"table table-bordered table-hover table-responsive table-striped\">\n                        <thead>\n                            <th>Profit Number</th>\n                            <th>Profit Order</th>\n                            <th>Profit State</th>\n                            <th>Profit Value</th>\n                            <th>Profit Date</th>\n                        </thead>\n                        <tbody v-if=\"profits.length > 0\">\n                            <tr v-for=\"profit in profits\" track-by=\"$index\">\n                                <td>{{ profit.id }}</td>\n                                <td><a v-link=\"{name: '/Order', params:{orderId: profit.order_id}}\">Order Number #{{ profit.order_id }}</a></td>\n                                <td>\n                                    <span class=\"label label-success\">Payed</span>\n                                </td>\n                                <td>${{ profit.buy_price }}</td>\n                                <td>{{ profit.created_at | moment \"calendar\" }}</td>\n                            </tr>\n                        </tbody>\n                        <tbody v-else>\n                            <tr>\n                                <td colspan=\"6\"><div class=\"alert alert-danger text-center\">No Profit Operations Happend!</div></td>\n                            </tr>\n                        </tbody>\n                    </table>\n                </div>\n            </span>\n        </div>\n    </div>\n</div>\n<spinner v-ref:spinner size=\"lg\" fixed text=\"Loading....\"></spinner>\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  if (!module.hot.data) {
    hotAPI.createRecord("_v-426e159b", module.exports)
  } else {
    hotAPI.update("_v-426e159b", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}
},{"vue":29,"vue-hot-reload-api":22,"vue-strap/dist/vue-strap.min":27}],43:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


var Spinner = require('vue-strap/dist/vue-strap.min').spinner;
exports.default = {
    props: ['favorites'],
    components: {

        spinner: Spinner
    },
    data: function data() {
        return {
            pathUrl: '',
            sortKey: '',
            reverse: 1,
            title: ''
        };
    },

    ready: function ready() {
        this.pathUrl = this.$route.path;
    },
    methods: {
        sort: function sort(_sort) {
            this.reverse = this.sortKey == _sort ? this.reverse * -1 : 1;
            this.sortKey = _sort;
        },
        deleteFav: function deleteFav(id, index) {
            this.$refs.spinner.show();
            this.$http.delete('deleteFav/' + id).then(function (res) {
                this.favorites.splice(index, 1);
                this.$refs.spinner.hide();
                this.isLoading = true;
            }, function (res) {
                alertify.error('Error Happend Try Again Later');
            });
        }
    }
};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\n<ol class=\"breadcrumb\">\n    <li>\n        <a v-link=\"{path: '/GetMyFavorites'}\"> <i class=\"fa fa-heart\"></i> My Favorite</a>\n\n    </li>\n    <li>\n        Favorites ({{ favorites.length }})\n    </li>\n\n</ol>\n<div class=\"row\">\n    <div class=\"col-md-6\">\n        <div class=\"col-md-11\">\n            <form class=\"form-horizontal\">\n                <div class=\"form-group\">\n                    <label for=\"serviceName\"></label>\n                    <input type=\"text\" class=\"form-control\" id=\"serviceName\" placeholder=\"Search By Service name And Price\" v-model=\"title\">\n                </div>\n            </form>\n        </div>\n    </div>\n    <div class=\"col-md-6 text-right \">\n        <div class=\"btn-group\">\n            <button type=\"button\" class=\"btn btn-primary\" @click=\"sort('created_at')\"><i class=\"fa fa-sort-numeric-desc\"></i>  By Adding Time </button>\n        </div>\n    </div>\n\n</div>\n<table class=\"table table-bordered table-hover table-responsive table-striped\">\n    <thead>\n        <th>Service Provider</th>\n        <th>Service Name</th>\n        <th>Service Price</th>\n        <th>On</th>\n        <th>Delete</th>\n\n    </thead>\n    <tbody v-if=\"favorites.length > 0\">\n        <tr v-for=\"favorite in favorites | orderBy sortKey reverse | filterBy title in 'service.name' 'service.price'\" track-by=\"$index\">\n            <td>\n\n                <a v-link=\"{name: '/User', params:{userId:favorite.get_own_user_service.id, userName: favorite.get_own_user_service.name}}\">\n\n                    {{ favorite.get_own_user_service.name }}\n                </a>\n\n            </td>\n            <td style=\"width: 20%;\">\n                <a v-link=\"{name: '/ServicesDetails', params: {serviceId: favorite.service.id, serviceName: favorite.service.name}}\">\n                    {{ favorite.service.name }}\n                </a>\n            </td>\n            <td style=\"width: 20%;\">\n                {{ favorite.service.price }}\n            </td>\n            <td>{{ favorite.created_at | moment 'calendar' }}</td>\n\n            <td>\n                <a @click.prevent=\"deleteFav(favorite.id, $index)\" class=\"btn btn-danger btn-block\" v-link=\"\">\n                    <i class=\"fa fa-trash\"></i>\n                </a>\n            </td>\n        </tr>\n    </tbody>\n    <tbody v-else>\n        <tr>\n            <td colspan=\"6\"><div class=\"alert alert-danger text-center\">No Favorite Services!</div></td>\n        </tr>\n    </tbody>\n</table>\n<div  class=\"list-group\">\n\n</div>\n<spinner v-ref:spinner size=\"lg\" fixed text=\"Loading....\"></spinner>\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  if (!module.hot.data) {
    hotAPI.createRecord("_v-35c20352", module.exports)
  } else {
    hotAPI.update("_v-35c20352", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}
},{"vue":29,"vue-hot-reload-api":22,"vue-strap/dist/vue-strap.min":27}],44:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _messageMenu = require('../messages/messageMenu.vue');

var _messageMenu2 = _interopRequireDefault(_messageMenu);

var _favList = require('./favList.vue');

var _favList2 = _interopRequireDefault(_favList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Spinner = require('vue-strap/dist/vue-strap.min').spinner;
exports.default = {
    components: {
        message_menu: _messageMenu2.default,
        fav_list: _favList2.default,
        spinner: Spinner
    },
    ready: function ready() {
        this.$refs.spinner.show();
        this.userFavorites();
    },
    data: function data() {
        return {
            fav_list: [],
            isLoading: false,
            income: 'income'
        };
    },

    methods: {
        userFavorites: function userFavorites() {
            this.$http.get('userFavorites').then(function (res) {
                this.fav_list = res.body;
                this.$refs.spinner.hide();
                this.isLoading = true;
            }, function (res) {
                alertify.error('Error Happend Try Again Later');
            });
        }
    },
    route: {
        canReuse: false // Force reload data
    }

};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\n    <navbar></navbar>\n    <div class=\"container\">\n        <div class=\"row\">\n            <div class=\"col-md-12\">            \n                <span v-if=\"isLoading\">\n                    <div class=\"container\">\n                        <div class=\"row\">\n                            <div class=\"col-sm-3 col-md-2\">\n                                <message_menu></message_menu>\n                            </div>\n                            <div class=\"col-sm-9 col-md-10\">\n                                <fav_list :favorites=\"fav_list\"></fav_list>\n\n                            </div>\n                        </div>\n                    </div>\n                </span>\n            </div>\n        </div>\n    </div>\n<spinner v-ref:spinner size=\"lg\" fixed text=\"Loading....\"></spinner>\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  if (!module.hot.data) {
    hotAPI.createRecord("_v-60ac2f73", module.exports)
  } else {
    hotAPI.update("_v-60ac2f73", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}
},{"../messages/messageMenu.vue":48,"./favList.vue":43,"vue":29,"vue-hot-reload-api":22,"vue-strap/dist/vue-strap.min":27}],45:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\n<!-- Nav Bar -->\n<nav class=\"navbar navbar-inverse\">\n    <div class=\"navbar-header\">\n        <button class=\"navbar-toggle\" type=\"button\" data-toggle=\"collapse\" data-target=\".js-navbar-collapse\">\n            <span class=\"sr-only\">Toggle navigation</span>\n            <span class=\"icon-bar\"></span>\n            <span class=\"icon-bar\"></span>\n            <span class=\"icon-bar\"></span>\n        </button>\n        <a class=\"navbar-brand\" v-link=\"{path: '/'}\">My Services Site</a>\n    </div>\n\n    <div class=\"collapse navbar-collapse js-navbar-collapse\">\n        <ul class=\"nav navbar-nav\">\n            <!-- Left Side Of Navbar -->\n            <li class=\"dropdown mega-dropdown\">\n                <a href=\"#\" class=\"dropdown-toggle catFolder\" data-toggle=\"dropdown\">\n                    <i class=\"fa fa-folder\"></i> Categories <span class=\"caret\"></span>\n                </a>\n                <ul class=\"dropdown-menu mega-dropdown-menu\">\n                    <!--NOTE @foreach (\\App\\Category::get(['id', 'name'])->chunk(6) as $category) -->\n                        <li class=\"col-sm-3\">\n                            <ul>\n                                <!--NOTE @foreach ($category as $cat) -->\n                                    <li class=\"dropdown-header\">\n                                        <a v-link=\"{name: '/Category', params:{catId: 9, catName: 'web design' }}\">\n                                            Web Design\n                                        </a>\n                                    </li>\n                                <!--NOTE @endforeach -->\n                            </ul>\n                        </li>\n                    <!--NOTE @endforeach -->\n                </ul>\n            </li>\n            <!--NOTE @if (Auth::check()) -->\n                <!-- Orders Section -->\n                <li class=\"dropdown\">\n                    <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" role=\"button\" aria-expanded=\"false\">\n                        <i class=\"fa fa-first-order\"></i>\n                        <span class=\"hidden-lg hidden-md\">Orders</span>\n                        <span class=\"caret\"></span>\n                    </a>\n\n                    <ul class=\"dropdown-menu\" role=\"menu\">\n                        <li>\n                            <a v-link=\"{path: '/IncomingOrders'}\">\n                                <i class=\"fa fa-truck\"></i>\n                                Incoming Orders\n                            </a>\n                        </li>\n                        <li>\n                            <a v-link=\"{path: '/PurchaseOrders'}\">\n                                <i class=\"fa fa-cart-plus\"></i>\n                                Purchase Orders\n                            </a>\n                        </li>\n                    </ul>\n                </li>\n                <!-- Services Section -->\n                <li class=\"dropdown\">\n                    <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" role=\"button\" aria-expanded=\"false\">\n                        <i class=\"fa fa-server\"></i>\n                        <span class=\"hidden-lg hidden-md\">Services</span>\n                        <span class=\"caret\"></span>\n                    </a>\n\n                    <ul class=\"dropdown-menu\" role=\"menu\">\n                        <li>\n                            <a v-link=\"{path: '/AddServices'}\">\n                                <i class=\"fa fa-plus\"></i>\n                                Add Service\n                            </a>\n                        </li>\n                        <li>\n                            <a v-link=\"{path: '/MyServices'}\">\n                                <i class=\"fa fa-user\"></i>\n                                My Services\n                            </a>\n                        </li>\n                    </ul>\n                </li>\n            <!--NOTE @endif -->\n        </ul>\n        <ul class=\"nav navbar-nav navbar-right\">\n            <!-- Authentication Links -->\n                <div class=\"navbar-custom-menu\">\n                    <ul class=\"nav navbar-nav\">\n                        <!-- Credit Section -->\n                        <li class=\"dropdown\">\n                            <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" role=\"button\" aria-expanded=\"false\">\n                                <i class=\"fa fa-money\"></i> <span class=\"hidden-lg hidden-md\">Payments</span> <span class=\"caret\"></span>\n                            </a>\n\n                            <ul class=\"dropdown-menu\" role=\"menu\">\n                                <li><a v-link=\"{path: '/AddCredit'}\"><i class=\"fa fa-btn fa-plus\"></i> Add Credit</a></li>\n                                <li><a v-link=\"{path: '/AllCharge'}\"><i class=\"fa fa-btn fa-gear fa-spin\"></i> Charge</a></li>\n                                <li><a v-link=\"{path: '/AllPayment'}\"><i class=\"fa fa-btn fa-minus-circle\"></i> Payment</a></li>\n                                <li><a v-link=\"{path: '/AllProfit'}\"><i class=\"fa fa-btn fa-briefcase\"></i> Profit</a></li>\n                                <li><a v-link=\"{path: '/AllBalance'}\"><i class=\"fa fa-btn fa-money\"></i> Balance</a></li>\n                            </ul>\n                        </li>\n\n                        <!-- Messages Section -->\n                        <li class=\"dropdown\">\n                            <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" role=\"button\" aria-expanded=\"false\">\n                                <i class=\"fa fa-envelope\"></i> <span class=\"hidden-lg hidden-md\">Messages</span> <span class=\"caret\"></span>\n                            </a>\n                            <ul class=\"dropdown-menu\" role=\"menu\">\n                                <li>\n                                    <a v-link=\"{path: '/GetMyRecivedMessages'}\">\n                                        <i class=\"fa fa-inbox\"></i>\n                                        Incoming Messages\n                                    </a>\n                                </li>\n                                <li>\n                                    <a v-link=\"{path: '/GetMySendMessages'}\">\n                                        <i class=\"fa fa-send\"></i>\n                                        Send Messages\n                                    </a>\n                                </li>\n                                <li>\n                                    <a v-link=\"{path: '/GetUnReadMessages'}\">\n                                        <i class=\"fa fa-eye-slash\"></i>\n                                        UnRead Messages\n                                    </a>\n                                </li>\n                                <li>\n                                    <a v-link=\"{path: '/GetReadMessages'}\">\n                                        <i class=\"fa fa-eye\"></i>\n                                        Read Messages\n                                    </a>\n                                </li>\n                            </ul>\n                        </li>\n                        <!-- Notification -->\n                        <li class=\"dropdown notifications-menu\" id=\"notifications-menu\">\n                            <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" aria-expanded=\"false\">\n                                <i class=\"fa fa-bell\"></i>\n                                <span id=\"counter\" class=\"label label-warning\"></span>\n                                <span class=\"caret\"></span>\n                            </a>\n                            <ul class=\"dropdown-menu\">\n                                <li class=\"header\">You have <span id=\"counter-header\"></span> notifications</li>\n                                <li>\n                                    <!-- inner menu: contains the actual data -->\n                                    <ul class=\"menu\" style=\"overflow: hidden; width: 100%; height: 200px;\">\n                                        <li id=\"loading\" style=\"position: absolute; top: 50%; left: 44%; font-size: 30px; color: #999;\"><i class=\"fa fa-spinner fa-spin\"></i></li>\n                                    </ul>\n                                </li>\n                                <li class=\"footer\"><a v-link=\"{path: '/Notification'}\">View all</a></li>\n                            </ul>\n                        </li>\n                        <!-- Favorite -->\n                        <li class=\"dropdown\">\n                            <a v-link=\"{path: '/GetMyFavorites'}\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" role=\"button\" aria-expanded=\"false\">\n                                <span class=\"fa fa-heart\"></span>\n                                <span class=\"hidden-lg hidden-md\">Favorite</span>\n                                <!-- @php $favorite = getFavCounter(Auth::user()->id); @endphp -->\n                                <!-- @if ($favorite > 0) -->\n                                    <span class=\"label label-danger\"><span id=\"favoriteCount\">5</span></span>\n                                <!-- @endif -->\n                            </a>\n                        </li>\n                        <!-- Purchase Orders -->\n                        <li class=\"dropdown\">\n                            <a v-link=\"{path: '/PurchaseOrders'}\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" role=\"button\" aria-expanded=\"false\">\n                                <i class=\"fa fa-cart-plus\"></i>\n                                <span class=\"hidden-lg hidden-md\">Purchase Orders</span>\n                                <!-- @php $purchaseOrders = getAllPurchesOrderCounter(Auth::user()->id); @endphp -->\n                                <!-- @if ($purchaseOrders > 0) -->\n                                    <span class=\"label label-primary\" > <span id=\"orderCount\">2</span></span>\n                                <!-- @endif -->\n                            </a>\n                        </li>\n                        <!-- unReadMessages -->\n                        <li class=\"dropdown\">\n                            <a v-link=\"{path: '/GetUnReadMessages'}\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" role=\"button\" aria-expanded=\"false\">\n                                <i class=\"fa fa-eye-slash\"></i>\n                                <span class=\"hidden-lg hidden-md\">Unread Messages</span>\n                                <!-- @php $unreadMessages = getUnReadMessages(Auth::user()->id); @endphp -->\n                                <!-- @if ($unreadMessages > 0) -->\n                                    <span class=\"label label-info\" ><span id=\"messageCount\">9</span></span>\n                                <!-- @endif -->\n                            </a>\n                        </li>\n                        <!-- User Section -->\n                        <li class=\"dropdown\">\n                            <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" role=\"button\" aria-expanded=\"false\">\n                                <i class=\"fa fa-user\"></i> <span class=\"hidden-lg hidden-md\">Alaa</span> <span class=\"caret\"></span>\n                            </a>\n\n                            <ul class=\"dropdown-menu\" role=\"menu\">\n                                <li><a href=\"logout\"><i class=\"fa fa-btn fa-edit\"></i> My Information</a></li>\n                                <li><a href=\"logout\"><i class=\"fa fa-btn fa-sign-out\"></i> Logout</a></li>\n                            </ul>\n                        </li>\n                    </ul>\n                </div>\n            <!--NOTE @endif -->\n        </ul>\n        <form class=\"navbar-form navbar-left\">\n            <input type=\"text\" class=\"form-control\" placeholder=\"Search...\">\n            <button type=\"button\" class=\"btn btn-primary\">\n                <i class=\"fa fa-search\"></i>\n            </button>\n        </form>\n\n\n    </div><!-- /.nav-collapse -->\n</nav>\n<!-- Nav Bar -->\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  if (!module.hot.data) {
    hotAPI.createRecord("_v-0c9cbd16", module.exports)
  } else {
    hotAPI.update("_v-0c9cbd16", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}
},{"vue":29,"vue-hot-reload-api":22}],46:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _messageMenu = require('./messageMenu.vue');

var _messageMenu2 = _interopRequireDefault(_messageMenu);

var _messagesList = require('./messagesList.vue');

var _messagesList2 = _interopRequireDefault(_messagesList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Spinner = require('vue-strap/dist/vue-strap.min').spinner;
exports.default = {
    components: {
        message_menu: _messageMenu2.default,
        message_list: _messagesList2.default,
        spinner: Spinner
    },
    ready: function ready() {
        this.$refs.spinner.show();
        this.GetMySendMessage();
    },
    data: function data() {
        return {
            messages: [],
            isLoading: false,
            income: 'income'
        };
    },

    methods: {
        GetMySendMessage: function GetMySendMessage() {
            this.$http.get('GetRecivedMessages').then(function (res) {
                this.messages = res.body;
                this.$refs.spinner.hide();
                this.isLoading = true;
            }, function (res) {
                alertify.error('Error Happend Try Again Later');
            });
        }
    },
    route: {
        canReuse: false // Force reload data
    }

};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\n    <navbar></navbar>\n    <div class=\"container\">\n        <div class=\"row\">\n            <div class=\"col-md-12\">        \n                <span v-if=\"isLoading\">\n                    <div class=\"container\">\n                        <div class=\"row\">\n                            <div class=\"col-sm-3 col-md-2\">\n                                <message_menu></message_menu>\n                            </div>\n                            <div class=\"col-sm-9 col-md-10\">\n                                <message_list :messages=\"messages\" :type=\"income\"></message_list>\n\n                            </div>\n                        </div>\n                    </div>\n                </span>\n            </div>\n        </div>\n    </div>\n<spinner v-ref:spinner size=\"lg\" fixed text=\"Loading....\"></spinner>\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  if (!module.hot.data) {
    hotAPI.createRecord("_v-00f5c6ac", module.exports)
  } else {
    hotAPI.update("_v-00f5c6ac", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}
},{"./messageMenu.vue":48,"./messagesList.vue":49,"vue":29,"vue-hot-reload-api":22,"vue-strap/dist/vue-strap.min":27}],47:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _messageMenu = require('./messageMenu.vue');

var _messageMenu2 = _interopRequireDefault(_messageMenu);

var _messagesList = require('./messagesList.vue');

var _messagesList2 = _interopRequireDefault(_messagesList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Spinner = require('vue-strap/dist/vue-strap.min').spinner;
exports.default = {
    components: {
        message_menu: _messageMenu2.default,
        message_list: _messagesList2.default,
        spinner: Spinner
    },
    data: function data() {
        return {
            message: [],
            isLoading: false,
            viewType: ''
        };
    },

    ready: function ready() {
        this.viewType = this.$route.params.viewType;
        this.$refs.spinner.show();
        this.GetMySendMessage();
    },
    methods: {
        GetMySendMessage: function GetMySendMessage() {
            this.$http.get('Messages/' + this.$route.params.message_id).then(function (res) {
                this.message = res.body;
                this.$refs.spinner.hide();
                this.isLoading = true;
            }, function (res) {
                alertify.error('Error Happend Try Again Later');
            });
        }
    },
    route: {
        canReuse: false // force relode the data
    }

};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\n    <navbar></navbar>\n    <div class=\"container\">\n        <div class=\"row\">\n            <div class=\"col-md-12\">        \n                <span v-if=\"isLoading\">\n                    <div class=\"container\">\n                        <div class=\"row\">\n                            <div class=\"col-sm-3 col-md-2\">\n                                <message_menu></message_menu>\n                            </div>\n                            <div class=\"col-sm-9 col-md-10\">\n                                <ol class=\"breadcrumb\">\n                                    <li v-if=\"viewType == 'income'\">\n                                        <a v-link=\"{path: '/GetMyRecivedMessages'}\">Inbox Messages</a>\n                                    </li>\n                                    <li v-else><a v-link=\"{path: '/GetMySendMessages'}\">Send  Messages</a></li>\n                                    <li class=\"active\">{{ message.title }}</li>\n                                </ol>\n                                <h2>Message Details</h2>\n                                <table class=\"table table-bordered table-hover table-responsive table-striped\">\n                                    <thead>\n                                        <tr>\n                                            <th>Message Title</th>\n                                            <th>Message Description</th>\n                                            <th>Send On</th>\n                                        </tr>\n                                    </thead>\n                                    <tbody>\n                                        <tr>\n                                            <td>{{ message.title }}</td>\n                                            <td>{{ message.message }}</td>\n                                            <td>{{ message.created_at | moment 'calendar' }}</td>\n                                        </tr>\n                                    </tbody>\n                                </table>\n                                <hr>\n                                <div v-if=\"viewType == 'send'\">\n                                    <h2>Sender Information</h2>\n\n                                    <table class=\"table table-bordered table-hover table-responsive table-striped\">\n                                        <thead>\n                                            <tr>\n                                                <th>Name</th>\n                                                <th>Send On</th>\n                                                <th>Replay</th>\n                                            </tr>\n                                        </thead>\n                                        <tbody>\n                                            <tr>\n                                                <td>\n                                                    <a v-link=\"{name: '/User', params: {userId: message.get_received_user.id, userName: message.get_received_user.name}}\">\n                                                        {{ message.get_received_user.name }}\n                                                    </a>\n\n                                                </td>\n                                                <td>{{ message.created_at | moment 'calendar' }}</td>\n                                                <td>\n                                                    <a v-link=\"{name: '/SendMessage', params: {userId: message.get_received_user.id}}\" class=\"btn btn-primary btn-block\">\n                                                        <i class=\"fa fa-reply\"></i> Reply\n                                                    </a>\n                                                </td>\n                                            </tr>\n                                        </tbody>\n                                    </table>\n                                </div>\n                                <div v-else>\n                                    <h2>Recived Information</h2>\n\n                                    <table class=\"table table-bordered table-hover table-responsive table-striped\">\n                                        <thead>\n                                            <tr>\n                                                <th>Name</th>\n                                                <th>Recived On</th>\n                                                <th>Replay</th>\n                                            </tr>\n                                        </thead>\n                                        <tbody>\n                                            <tr>\n                                                <td>\n                                                    <a v-link=\"{name: '/User', params: {userId: message.get_send_user.id, userName: message.get_send_user.name}}\">\n                                                        {{ message.get_send_user.name }}\n                                                    </a>\n                                                </td>\n                                                <td>{{ message.created_at | moment 'calendar' }}</td>\n                                                <td>\n                                                    <a v-link=\"{name: '/SendMessage', params: {userId: message.get_send_user.id}}\" class=\"btn btn-primary btn-block\">\n                                                        <i class=\"fa fa-reply\"></i> Reply\n                                                    </a>\n                                                </td>\n                                            </tr>\n                                        </tbody>\n                                    </table>\n                                </div>\n\n                            </div>\n                        </div>\n                    </div>\n                </span>\n            </div>\n        </div>\n    </div>\n<spinner v-ref:spinner size=\"lg\" fixed text=\"Loading....\"></spinner>\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  if (!module.hot.data) {
    hotAPI.createRecord("_v-59713cbc", module.exports)
  } else {
    hotAPI.update("_v-59713cbc", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}
},{"./messageMenu.vue":48,"./messagesList.vue":49,"vue":29,"vue-hot-reload-api":22,"vue-strap/dist/vue-strap.min":27}],48:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    methods: {
        checkRoute: function checkRoute(value) {
            return this.$route.path == value;
        }
    }
};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\n<ul class=\"list-group\" style=\"padding:0px;\" id=\"menuSide\">\n    <li class=\"list-group-item\">\n        <h5>\n            <i class=\"fa fa-envelope\"></i>\n            Messages\n        </h5>\n    </li>\n    <li v-bind:class=\"['list-group-item', {'active': checkRoute('/GetMyRecivedMessages')}]\">\n        <a v-link=\"{path: '/GetMyRecivedMessages'}\"><i class=\"fa fa-inbox\"></i> Inbox Messages</a>\n    </li>\n    <li v-bind:class=\"['list-group-item', {'active': checkRoute('/GetMySendMessages')}]\">\n        <i class=\"fa fa-send\"></i>\n        <a v-link=\"{path: '/GetMySendMessages'}\">Send Messages </a>\n    </li>\n    <li v-bind:class=\"['list-group-item', {'active': checkRoute('/GetUnReadMessages')}]\">\n        <i class=\"fa fa-eye-slash\"></i>\n        <a  v-link=\"{path: '/GetUnReadMessages'}\">UnRead Messages </a>\n    </li>\n    <li v-bind:class=\"['list-group-item', {'active': checkRoute('/GetReadMessages')}]\">\n        <i class=\"fa fa-eye\"></i>\n        <a  v-link=\"{path: '/GetReadMessages'}\">Read Messages </a>\n    </li>\n    <li v-bind:class=\"['list-group-item', {'active': checkRoute('/GetMyFavorites')}]\">\n        <i class=\"fa fa-heart\"></i>\n        <a  v-link=\"{path: '/GetMyFavorites'}\">Favorites </a>\n    </li>\n    <li v-bind:class=\"['list-group-item', {'active': checkRoute('/Notification')}]\">\n        <i class=\"fa fa-bell\"></i>\n        <a  v-link=\"{path: '/Notification'}\">Notification </a>\n    </li>\n    <li v-bind:class=\"['list-group-item', {'active': checkRoute('/UnReadNotification')}]\">\n        <i class=\"fa fa-bell-o\"></i>\n        <a  v-link=\"{path: '/UnReadNotification'}\">UnRead Notification </a>\n    </li>\n</ul>\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  if (!module.hot.data) {
    hotAPI.createRecord("_v-418130a2", module.exports)
  } else {
    hotAPI.update("_v-418130a2", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}
},{"vue":29,"vue-hot-reload-api":22}],49:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    props: ['messages', 'type'],
    data: function data() {
        return {
            pathUrl: '',
            sortKey: '',
            reverse: 1,
            title: ''
        };
    },

    ready: function ready() {
        this.pathUrl = this.$route.path;
    },
    methods: {
        sort: function sort(_sort) {
            this.reverse = this.sortKey == _sort ? this.reverse * -1 : 1;
            this.sortKey = _sort;
        }
    }
};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\n    <ol class=\"breadcrumb\">\n      <li v-if=\"pathUrl == '/GetMyRecivedMessages'\">\n          <a v-link=\"{path: '/GetMyRecivedMessages'}\"><i class=\"fa fa-inbox\"></i> Inbox Messages</a>\n      </li>\n\n      <li v-if=\"pathUrl == '/GetMySendMessages'\">\n          <a v-link=\"{path: '/GetMySendMessages'}\"><i class=\"fa fa-send\"></i> Send Messages</a>\n      </li>\n\n      <li v-if=\"pathUrl == '/GetUnReadMessages'\">\n          <a v-link=\"{path: '/GetUnReadMessages'}\"><i class=\"fa fa-eye-slash\"></i> UnRead Messages</a>\n      </li>\n      <li v-if=\"pathUrl == '/GetReadMessages'\">\n          <a v-link=\"{path: '/GetReadMessages'}\"><i class=\"fa fa-eye\"></i> Read Messages</a>\n      </li>\n\n      <li v-if=\"pathUrl == '/GetMyRecivedMessages'\">\n          Inbox Messages ({{ messages.length }})\n      </li>\n\n      <li v-if=\"pathUrl == '/GetMySendMessages'\">\n          Send Messages ({{ messages.length }})\n      </li>\n\n      <li v-if=\"pathUrl == '/GetUnReadMessages'\">\n          UnRead Messages ({{ messages.length }})\n      </li>\n      <li v-if=\"pathUrl == '/GetReadMessages'\">\n          Read Messages ({{ messages.length }})\n      </li>\n\n\n    </ol>\n    <div class=\"row\">\n        <div class=\"col-md-6\">\n            <div class=\"col-md-11\">\n                <form class=\"form-horizontal\">\n                    <div class=\"form-group\">\n                        <label for=\"serviceName\"></label>\n                        <input type=\"text\" class=\"form-control\" id=\"serviceName\" placeholder=\"Search By Message title\" v-model=\"title\">\n                    </div>\n                </form>\n            </div>\n        </div>\n        <div class=\"col-md-6 text-right \">\n            <div class=\"btn-group\">\n                <button type=\"button\" class=\"btn btn-success\" @click=\"sort('seen')\"><i class=\"fa fa-eye\"></i>  Seen</button>\n                <button type=\"button\" class=\"btn btn-primary\" @click=\"sort('created_at')\"><i class=\"fa fa-sort-numeric-desc\"></i>  By Adding Time </button>\n            </div>\n        </div>\n\n    </div>\n<table class=\"table table-bordered table-hover table-responsive table-striped\">\n<thead>\n    <th>\n        <span v-if=\"type == 'income'\">\n            Recived From\n        </span>\n        <span v-else>\n            Send To\n        </span>\n    </th>\n    <th>Title</th>\n    <th>Message</th>\n    <th>On</th>\n    <th>Status</th>\n    <th>See</th>\n    <th>Reply</th>\n</thead>\n<tbody v-if=\"messages.length > 0\">\n    <tr v-for=\"message in messages | orderBy sortKey reverse | filterBy title in 'title'\" track-by=\"$index\">\n        <td>\n            <span class=\"name\" style=\"min-width: 120px; display: inline-block;\">\n                <span v-if=\"message.get_received_user\">\n                    <a v-link=\"{name: '/User', params:{userId:message.get_received_user.id, userName: message.get_received_user.name}}\">\n\n                        {{ message.get_received_user.name }}\n                    </a>\n                </span>\n                <span v-else>\n                    <a v-link=\"{name: '/User', params:{userId:message.get_send_user.id, userName: message.get_send_user.name}}\">\n\n                        {{ message.get_send_user.name }}\n                    </a>\n                </span>\n\n            </span>\n        </td>\n        <td style=\"width: 20%;\">\n            <a v-link=\"{name: '/messageDetails', params: {message_id: message.id, viewType: type}}\">\n                {{ message.title }}\n            </a>\n        </td>\n        <td style=\"width: 30%; word-break: break-word;\">{{ message.message }}</td>\n        <td>{{ message.created_at | moment 'calendar' }}</td>\n        <td>\n            <span v-if=\"message.seen == 1\">\n                <span class=\"badge badge-success\">seen</span>\n            </span>\n            <span v-else>\n                <span class=\"badge\">New</span>\n            </span>\n        </td>\n        <td>\n            <a class=\"btn btn-info\" v-link=\"{name: '/messageDetails', params: {message_id: message.id, viewType: type}}\">\n                <i class=\"fa fa-eye\"></i>\n            </a>\n        </td>\n        <td>\n            <span v-if=\"message.get_received_user\">\n                <a v-link=\"{name: '/SendMessage', params: {userId: message.get_received_user.id}}\" class=\"btn btn-primary btn-block\">\n                    <i class=\"fa fa-reply\"></i>\n                </a>\n            </span>\n            <span v-else>\n                <a v-link=\"{name: '/SendMessage', params: {userId: message.get_send_user.id}}\" class=\"btn btn-primary btn-block\">\n                    <i class=\"fa fa-reply\"></i>\n                </a>\n            </span>\n        </td>\n    </tr>\n</tbody>\n<tbody v-else>\n    <tr>\n        <td colspan=\"7\"><div class=\"alert alert-info text-center\">No Messages Right No!</div></td>\n    </tr>\n</tbody>\n</table>\n    <div  class=\"list-group\">\n\n    </div>\n\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  if (!module.hot.data) {
    hotAPI.createRecord("_v-44acf49e", module.exports)
  } else {
    hotAPI.update("_v-44acf49e", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}
},{"vue":29,"vue-hot-reload-api":22}],50:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _messageMenu = require('./messageMenu.vue');

var _messageMenu2 = _interopRequireDefault(_messageMenu);

var _messagesList = require('./messagesList.vue');

var _messagesList2 = _interopRequireDefault(_messagesList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Spinner = require('vue-strap/dist/vue-strap.min').spinner;
exports.default = {
    components: {
        message_menu: _messageMenu2.default,
        message_list: _messagesList2.default,
        spinner: Spinner
    },
    ready: function ready() {
        this.$refs.spinner.show();
        this.GetMySendMessage();
    },
    data: function data() {
        return {
            messages: [],
            isLoading: false,
            income: 'income'
        };
    },

    methods: {
        GetMySendMessage: function GetMySendMessage() {
            this.$http.get('GetUnReadMessages').then(function (res) {
                this.messages = res.body;
                this.$refs.spinner.hide();
                this.isLoading = true;
            }, function (res) {
                alertify.error('Error Happend Try Again Later');
            });
        }
    },
    route: {
        canReuse: false // Force reload data
    }

};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\n    <navbar></navbar>\n    <div class=\"container\">\n        <div class=\"row\">\n            <div class=\"col-md-12\">            \n                <span v-if=\"isLoading\">\n                    <div class=\"container\">\n                        <div class=\"row\">\n                            <div class=\"col-sm-3 col-md-2\">\n                                <message_menu></message_menu>\n                            </div>\n                            <div class=\"col-sm-9 col-md-10\">\n                                <message_list :messages=\"messages\" :type=\"income\"></message_list>\n                            </div>\n                        </div>\n                    </div>\n                </span>\n            </div>\n        </div>\n    </div>\n<spinner v-ref:spinner size=\"lg\" fixed text=\"Loading....\"></spinner>\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  if (!module.hot.data) {
    hotAPI.createRecord("_v-7d17112e", module.exports)
  } else {
    hotAPI.update("_v-7d17112e", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}
},{"./messageMenu.vue":48,"./messagesList.vue":49,"vue":29,"vue-hot-reload-api":22,"vue-strap/dist/vue-strap.min":27}],51:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _messageMenu = require('./messageMenu.vue');

var _messageMenu2 = _interopRequireDefault(_messageMenu);

var _messagesList = require('./messagesList.vue');

var _messagesList2 = _interopRequireDefault(_messagesList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Spinner = require('vue-strap/dist/vue-strap.min').spinner;
exports.default = {
    components: {
        message_menu: _messageMenu2.default,
        message_list: _messagesList2.default,
        spinner: Spinner
    },
    ready: function ready() {
        this.$refs.spinner.show();
        this.GetMySendMessage();
    },
    data: function data() {
        return {
            messages: [],
            isLoading: false,
            income: 'income'
        };
    },

    methods: {
        GetMySendMessage: function GetMySendMessage() {
            this.$http.get('GetReadMessages').then(function (res) {
                this.messages = res.body;
                this.$refs.spinner.hide();
                this.isLoading = true;
            }, function (res) {
                alertify.error('Error Happend Try Again Later');
            });
        }
    },
    route: {
        canReuse: false // Force reload data
    }

};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\n    <navbar></navbar>\n    <div class=\"container\">\n        <div class=\"row\">\n            <div class=\"col-md-12\">        \n                <span v-if=\"isLoading\">\n                    <div class=\"container\">\n                        <div class=\"row\">\n                            <div class=\"col-sm-3 col-md-2\">\n                                <message_menu></message_menu>\n                            </div>\n                            <div class=\"col-sm-9 col-md-10\">\n                                <message_list :messages=\"messages\" :type=\"income\"></message_list>\n                            </div>\n                        </div>\n                    </div>\n                </span>\n            </div>\n        </div>\n    </div>\n<spinner v-ref:spinner size=\"lg\" fixed text=\"Loading....\"></spinner>\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  if (!module.hot.data) {
    hotAPI.createRecord("_v-525ac247", module.exports)
  } else {
    hotAPI.update("_v-525ac247", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}
},{"./messageMenu.vue":48,"./messagesList.vue":49,"vue":29,"vue-hot-reload-api":22,"vue-strap/dist/vue-strap.min":27}],52:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _messageMenu = require('./messageMenu.vue');

var _messageMenu2 = _interopRequireDefault(_messageMenu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Spinner = require('vue-strap/dist/vue-strap.min').spinner;
exports.default = {
    components: {
        message_menu: _messageMenu2.default,
        spinner: Spinner
    },
    data: function data() {
        return {
            comment: '',
            showTitle: true,
            showMessage: true,
            title: '',
            message: '',
            disabled: true
        };
    },

    computed: {
        disabled: function disabled() {
            if (this.showTitle == false && this.showMessage == false) {
                return false;
            } else {
                return true;
            }
        }
    },
    methods: {
        sendMessage: function sendMessage() {
            this.$refs.spinner.show();
            var formData = new FormData();
            formData.append('userId', this.$route.params.userId);
            formData.append('title', this.title);
            formData.append('message', this.message);

            this.$http.post('Messages', formData).then(function (res) {
                this.$refs.spinner.hide();
                this.isLoading = true;
                swal('Success', 'your Message has been Send', 'success');
                this.title = '';
                this.message = '';
            }, function (res) {
                for (var key in res.body) {
                    alertify.error(res.body[key][0]);
                }
                alertify.error('Try Again Later');
            });
        }
    }

};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\n    <navbar></navbar>\n    <div class=\"container\">\n        <div class=\"row\">\n            <div class=\"col-md-12\">            \n                <div class=\"container\">\n                    <div class=\"row\">\n\n                    </div>\n                    <hr />\n                    <div class=\"row\">\n                        <div class=\"col-sm-3 col-md-2\">\n                            <message_menu></message_menu>\n                        </div>\n                        <div class=\"col-sm-9 col-md-10\">\n                            <!-- Tab panes -->\n                            <validator name=\"validation1\">\n                                <form novalidate>\n\n                                    <div class=\"form-group\">\n                                        <label for=\"title\">Message Title</label>\n                                        <input type=\"text\" class=\"form-control\" id=\"title\" placeholder=\"Write Message Title\" v-model=\"title\" @valid=\"showTitle = false\" @invalid=\"showTitle = true\" v-validate:title=\"{ required: true, minlength: 10, maxlength: 50 }\">\n                                    </div>\n                                    <div class=\"form-group alert alert-danger text-center\" v-if=\"showTitle\">\n                                        <p v-if=\"$validation1.title.required\">This Viled Is Requires</p>\n                                        <p v-if=\"$validation1.title.minlength\">Your Message Must Be More Than 10 Charachters</p>\n                                        <p v-if=\"$validation1.title.maxlength\">Your Message Must Be Less Than 50 Charachters</p>\n                                    </div>\n                                    <div class=\"form-group\">\n                                        <label for=\"message\">Message</label>\n                                        <textarea class=\"form-control\" id=\"message\" rows=\"3\" placeholder=\"Write Your Message\" v-model=\"message\" @valid=\"showMessage = false\" @invalid=\"showMessage = true\" v-validate:message=\"{ required: true, minlength: 20, maxlength: 500 }\"></textarea>\n                                    </div>\n                                    <div class=\"form-group alert alert-danger text-center\" v-if=\"showMessage\">\n                                        <p v-if=\"$validation1.message.required\">This Viled Is Requires</p>\n                                        <p v-if=\"$validation1.message.minlength\">Your Message Must Be More Than 20 Charachters</p>\n                                        <p v-if=\"$validation1.message.maxlength\">Your Message Must Be Less Than 500 Charachters</p>\n                                    </div>\n                                    <div class=\"form-group\">\n                                        <button type=\"button\" class=\"btn btn-success btn-block\" v-bind:disabled=\"disabled\" @click.prevent=\"sendMessage\">\n                                            <i class=\"fa fa-send\"></i> Send Message\n                                        </button>\n                                    </div>\n                                </form>\n                            </validator>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n<spinner v-ref:spinner size=\"lg\" fixed text=\"Loading....\"></spinner>\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  if (!module.hot.data) {
    hotAPI.createRecord("_v-591775a2", module.exports)
  } else {
    hotAPI.update("_v-591775a2", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}
},{"./messageMenu.vue":48,"vue":29,"vue-hot-reload-api":22,"vue-strap/dist/vue-strap.min":27}],53:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _messageMenu = require('./messageMenu.vue');

var _messageMenu2 = _interopRequireDefault(_messageMenu);

var _messagesList = require('./messagesList.vue');

var _messagesList2 = _interopRequireDefault(_messagesList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Spinner = require('vue-strap/dist/vue-strap.min').spinner;
exports.default = {
    components: {
        message_menu: _messageMenu2.default,
        message_list: _messagesList2.default,
        spinner: Spinner
    },
    ready: function ready() {
        this.$refs.spinner.show();
        this.GetMySendMessage();
    },
    data: function data() {
        return {
            messages: [],
            isLoading: false,
            send: 'send'
        };
    },

    methods: {
        GetMySendMessage: function GetMySendMessage() {
            this.$http.get('Messages').then(function (res) {
                this.messages = res.body;
                this.$refs.spinner.hide();
                this.isLoading = true;
            }, function (res) {
                alertify.error('Error Happend Try Again Later');
            });
        }
    },
    route: {
        canReuse: false // Force reload data
    }

};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\n    <navbar></navbar>\n    <div class=\"container\">\n        <div class=\"row\">\n            <div class=\"col-md-12\">\n                <span v-if=\"isLoading\">\n                    <div class=\"container\">\n                        <div class=\"row\">\n                            <div class=\"col-sm-3 col-md-2\">\n                                <message_menu></message_menu>\n                            </div>\n                            <div class=\"col-sm-9 col-md-10\">\n                                <message_list :messages=\"messages\" :type=\"send\"></message_list>\n\n                            </div>\n                        </div>\n                    </div>\n                </span>\n            </div>\n        </div>\n    </div>\n<spinner v-ref:spinner size=\"lg\" fixed text=\"Loading....\"></spinner>\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  if (!module.hot.data) {
    hotAPI.createRecord("_v-0a8cb6f0", module.exports)
  } else {
    hotAPI.update("_v-0a8cb6f0", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}
},{"./messageMenu.vue":48,"./messagesList.vue":49,"vue":29,"vue-hot-reload-api":22,"vue-strap/dist/vue-strap.min":27}],54:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _messageMenu = require('../messages/messageMenu.vue');

var _messageMenu2 = _interopRequireDefault(_messageMenu);

var _notificationList = require('./notificationList.vue');

var _notificationList2 = _interopRequireDefault(_notificationList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Spinner = require('vue-strap/dist/vue-strap.min').spinner;
exports.default = {
    components: {
        notification_menu: _messageMenu2.default,
        notification_list: _notificationList2.default,
        spinner: Spinner
    },
    ready: function ready() {
        this.$refs.spinner.show();
        this.GetMyNotifications();
    },
    data: function data() {
        return {
            notifications: [],
            isLoading: false,
            user: [],
            moreOrders: true
        };
    },

    methods: {
        GetMyNotifications: function GetMyNotifications(length) {
            if (length !== undefined) {
                var sendLen = '/' + length;
            } else {
                sendLen = '';
            }

            this.$http.get('/GetMyNotifications' + sendLen).then(function (res) {
                if (length !== undefined) {
                    if (res.body['notify'].length > 0) {
                        // use push if the result to add object in the array
                        // use concat because res.body['notify'] return as array
                        this.notifications = this.notifications.concat(res.body['notify']);
                    } else {
                        this.moreOrders = false;
                        alertify.error('No More Notifications');
                    }
                    this.$refs.spinner.hide();
                    this.isLoading = true;
                } else {

                    this.user = res.body['user'];
                    this.notifications = res.body['notify'];
                    this.$refs.spinner.hide();
                    this.isLoading = true;
                }
            }, function (res) {
                alertify.error('Error Happend Try Again Later');
            });
        },
        showMore: function showMore() {
            this.$refs.spinner.show();
            var length = this.notifications.length;
            this.GetMyNotifications(length);
        }
    },
    route: {
        canReuse: false // Force reload data
    }

};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\n<navbar></navbar>\n<div class=\"container\">\n    <div class=\"row\">\n        <div class=\"col-md-12\">\n            <span v-if=\"isLoading\">\n                <div class=\"container\">\n                    <div class=\"row\">\n                        <div class=\"col-sm-3 col-md-2\">\n                            <notification_menu></notification_menu>\n                        </div>\n                        <div class=\"col-sm-9 col-md-10\">\n                            <notification_list :notifications=\"notifications\"></notification_list>\n                            <div v-if=\"notifications.length >= 6\">\n                                <div class=\"col-lg-12 btn btn-info\" v-if=\"moreOrders\" @click=\"showMore()\">Show More</div>\n                                <div class=\"col-lg-12 alert alert-danger text-center\" v-if=\"!moreOrders\">NO More Notifications</div>\n                                <div class=\"clearfix\"></div>\n                                <br>\n                            </div>\n                            <div v-else>\n                                <div class=\"alert alert-danger text-center\">You Have No Notifications!</div>\n                            </div>\n\n                        </div>\n                    </div>\n                </div>\n            </span>\n        </div>\n    </div>\n</div>\n<spinner v-ref:spinner size=\"lg\" fixed text=\"Loading....\"></spinner>\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  if (!module.hot.data) {
    hotAPI.createRecord("_v-014537a2", module.exports)
  } else {
    hotAPI.update("_v-014537a2", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}
},{"../messages/messageMenu.vue":48,"./notificationList.vue":55,"vue":29,"vue-hot-reload-api":22,"vue-strap/dist/vue-strap.min":27}],55:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    props: ['notifications'],
    data: function data() {
        return {
            pathUrl: '',
            sortKey: '',
            reverse: 1,
            title: ''
        };
    },

    ready: function ready() {
        this.pathUrl = this.$route.path;
    },
    methods: {
        sort: function sort(_sort) {
            this.reverse = this.sortKey == _sort ? this.reverse * -1 : 1;
            this.sortKey = _sort;
        }
    }
};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\n    <ol class=\"breadcrumb\">\n\n      <li v-if=\"pathUrl == '/Notification'\">\n          <a v-link=\"{path: '/Notification'}\"><i class=\"fa fa-bell\"></i> Notification</a>\n      </li>\n\n      <li v-if=\"pathUrl == '/Notification'\">\n          Notification ({{ notifications.length }})\n      </li>\n\n      <li v-if=\"pathUrl == '/UnReadNotification'\">\n          <a v-link=\"{path: '/UnReadNotification'}\"><i class=\"fa fa-bell\"></i> UnReadNotification</a>\n      </li>\n\n      <li v-if=\"pathUrl == '/UnReadNotification'\">\n          UnNotification ({{ notifications.length }})\n      </li>\n\n\n    </ol>\n    <div class=\"row\">\n        <div class=\"col-md-6\">\n            <div class=\"col-md-11\">\n                <form class=\"form-horizontal\">\n                    <div class=\"form-group\">\n                        <label for=\"serviceName\"></label>\n                        <input type=\"text\" class=\"form-control\" id=\"serviceName\" placeholder=\"Search By Message title\" v-model=\"title\">\n                    </div>\n                </form>\n            </div>\n        </div>\n        <div class=\"col-md-6 text-right \">\n            <div class=\"btn-group\">\n                <button type=\"button\" class=\"btn btn-success\" @click=\"sort('seen')\"><i class=\"fa fa-eye\"></i>  Seen</button>\n                <button type=\"button\" class=\"btn btn-primary\" @click=\"sort('created_at')\"><i class=\"fa fa-sort-numeric-desc\"></i>  By Adding Time </button>\n            </div>\n        </div>\n\n    </div>\n<table class=\"table table-bordered table-hover table-responsive table-striped\">\n<thead>\n    <th>Recived From</th>\n    <th>Notification</th>\n    <th>On</th>\n    <th>See</th>\n</thead>\n<tbody v-if=\"notifications.length > 0\">\n    <tr v-for=\"notification in notifications | orderBy sortKey reverse\" track-by=\"$index\">\n\n        <td>\n            <span class=\"name\" style=\"min-width: 120px; display: inline-block;\">\n                    <a v-link=\"{name: '/User', params:{userId:notification.user_who_send_notification.id, userName: notification.user_who_send_notification.name}}\">\n                        {{ notification.user_who_send_notification.name }}\n                    </a>\n            </span>\n        </td>\n        <td v-if=\"notification.type == 'ReviceOrders'\">\n            <a v-link=\"{name: '/Order', params:{orderId: notification.notify_id}}\"\n                title=\"New Buying Order From {{ notification.user_who_send_notification.name }}\n            Order #{{notification.notify_id}}\">\n                    New Buying Order From {{ notification.user_who_send_notification.name }}\n                    Order #{{notification.notify_id}}\n            </a>\n        </td>\n        <td v-if=\"notification.type == 'ReviceMessage'\">\n            <a v-link=\"{name: '/messageDetails', params:{message_id: notification.notify_id, viewType: 'income'}}\"\n                title=\"New Message From {{ notification.user_who_send_notification.name }}\">\n                New Message From {{ notification.user_who_send_notification.name }}\n            </a>\n        </td>\n        <td v-if=\"notification.type == 'AcceptedOrder'\">\n            <a v-link=\"{name: '/Order', params:{orderId: notification.notify_id}}\"\n                title=\"{{ notification.user_who_send_notification.name }} Accepted Your Order #{{notification.notify_id}}!\">\n                {{ notification.user_who_send_notification.name }} Accepted Your Order #{{notification.notify_id}}!\n            </a>\n        </td>\n        <td v-if=\"notification.type == 'RejectedOrder'\">\n            <a v-link=\"{name: '/Order', params:{orderId: notification.notify_id}}\"\n                title=\"{{ notification.user_who_send_notification.name }} Rejected Your Order #{{notification.notify_id}}!\">\n                {{ notification.user_who_send_notification.name }} Rejected Your Order #{{notification.notify_id}}!\n            </a>\n        </td>\n        <td v-if=\"notification.type == 'CompeleteOrder'\">\n            <a v-link=\"{name: '/Order', params:{orderId: notification.notify_id}}\"\n                title=\"{{ notification.user_who_send_notification.name }} Finished Order #{{notification.notify_id}} Check Your Profit!\">\n                {{ notification.user_who_send_notification.name }} Finished Order #{{notification.notify_id}} Check Your Profit!\n            </a>\n        </td>\n        <td v-if=\"notification.type == 'RecivedComment'\">\n            <a v-link=\"{name: '/Order', params:{orderId: notification.notify_id}}\"\n                title=\"{{ notification.user_who_send_notification.name }} Commented On Order #{{notification.notify_id}}!\">\n                {{ notification.user_who_send_notification.name }} Commented On Order #{{notification.notify_id}}!\n            </a>\n        </td>\n        <td>{{ notification.created_at | moment 'calendar' }}</td>\n        <td>\n            <span v-if=\"notification.seen == 1\">\n                <span class=\"badge badge-success\">seen</span>\n            </span>\n            <span v-else>\n                <span class=\"badge\">New</span>\n            </span>\n        </td>\n    </tr>\n</tbody>\n</table>\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  if (!module.hot.data) {
    hotAPI.createRecord("_v-62572ade", module.exports)
  } else {
    hotAPI.update("_v-62572ade", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}
},{"vue":29,"vue-hot-reload-api":22}],56:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _messageMenu = require('../messages/messageMenu.vue');

var _messageMenu2 = _interopRequireDefault(_messageMenu);

var _notificationList = require('./notificationList.vue');

var _notificationList2 = _interopRequireDefault(_notificationList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Spinner = require('vue-strap/dist/vue-strap.min').spinner;
exports.default = {
    components: {
        notification_menu: _messageMenu2.default,
        notification_list: _notificationList2.default,
        spinner: Spinner
    },
    ready: function ready() {
        this.$refs.spinner.show();
        this.GetMyUnReadNotifications();
    },
    data: function data() {
        return {
            notifications: [],
            isLoading: false,
            user: [],
            moreOrders: true
        };
    },

    methods: {
        GetMyUnReadNotifications: function GetMyUnReadNotifications(length) {
            if (length !== undefined) {
                var sendLen = '/' + length;
            } else {
                sendLen = '';
            }

            this.$http.get('/GetMyUnReadNotifications' + sendLen).then(function (res) {
                if (length !== undefined) {
                    if (res.body['notify'].length > 0) {
                        // use push if the result to add object in the array
                        // use concat because res.body['notify'] return as array
                        this.notifications = this.notifications.concat(res.body['notify']);
                    } else {
                        this.moreOrders = false;
                        alertify.error('No More Notifications');
                    }
                    this.$refs.spinner.hide();
                    this.isLoading = true;
                } else {

                    this.user = res.body['user'];
                    this.notifications = res.body['notify'];
                    this.$refs.spinner.hide();
                    this.isLoading = true;
                }
            }, function (res) {
                alertify.error('Error Happend Try Again Later');
            });
        },
        showMore: function showMore() {
            this.$refs.spinner.show();
            var length = this.notifications.length;
            this.GetMyUnReadNotifications(length);
        }
    },
    route: {
        canReuse: false // Force reload data
    }

};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\n    <navbar></navbar>\n    <div class=\"container\">\n        <div class=\"row\">\n            <div class=\"col-md-12\">        \n                <span v-if=\"isLoading\">\n                    <div class=\"container\">\n                        <div class=\"row\">\n                            <div class=\"col-sm-3 col-md-2\">\n                                <notification_menu></notification_menu>\n                            </div>\n                            <div class=\"col-sm-9 col-md-10\">\n                                <notification_list :notifications=\"notifications\"></notification_list>\n                                <div v-if=\"notifications.length >= 6\">\n                                    <div class=\"col-lg-12 btn btn-info\" v-if=\"moreOrders\" @click=\"showMore()\">Show More</div>\n                                    <div class=\"col-lg-12 alert alert-danger text-center\" v-if=\"!moreOrders\">NO More Notifications</div>\n                                    <div class=\"clearfix\"></div>\n                                    <br>\n                                </div>\n                                <div v-else>\n                                    <div class=\"alert alert-danger text-center\">You Have No Notifications!</div>\n                                </div>\n\n                            </div>\n                        </div>\n                    </div>\n                </span>\n            </div>\n        </div>\n    </div>\n<spinner v-ref:spinner size=\"lg\" fixed text=\"Loading....\"></spinner>\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  if (!module.hot.data) {
    hotAPI.createRecord("_v-715065be", module.exports)
  } else {
    hotAPI.update("_v-715065be", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}
},{"../messages/messageMenu.vue":48,"./notificationList.vue":55,"vue":29,"vue-hot-reload-api":22,"vue-strap/dist/vue-strap.min":27}],57:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _orderStructure = require('./orderStructure.vue');

var _orderStructure2 = _interopRequireDefault(_orderStructure);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Spinner = require('vue-strap/dist/vue-strap.min').spinner;
exports.default = {
    components: {
        purchase_orders: _orderStructure2.default,
        spinner: Spinner
    },
    data: function data() {
        return {
            isLoading: false,
            orders: [],
            user: '',
            filterData: '',
            serviceName: '',
            moreOrders: true
        };
    },
    ready: function ready() {
        this.$refs.spinner.show();
        this.getMyPurchaseOrders();
    },
    methods: {
        getMyPurchaseOrders: function getMyPurchaseOrders(length) {
            if (length !== undefined) {
                var sendLen = '/' + length;
            } else {
                sendLen = '';
            }
            this.$http.get('incomingOrders' + sendLen).then(function (res) {

                if (length !== undefined) {
                    if (res.body['orders'].length > 0) {
                        // use push if the result to add object in the array
                        // use concat because res.body['orders'] return as array
                        this.orders = this.orders.concat(res.body['orders']);
                    } else {
                        this.moreOrders = false;
                        alertify.error('No More Services Found In This Category');
                    }
                    this.$refs.spinner.hide();
                    this.isLoading = true;
                } else {

                    this.orders = res.body['orders'];
                    this.user = res.body['user'];
                    this.$refs.spinner.hide();
                    this.isLoading = true;
                }
            }, function (res) {
                swal('Error', 'Something Wrong Happend Contact With the Adminstratore Please', 'error');
            });
        },
        filter: function filter(status) {
            this.filterData = status;
        },
        showMore: function showMore() {
            this.$refs.spinner.show();
            var length = this.orders.length;
            this.getMyPurchaseOrders(length);
        }
    }
};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\n    <navbar></navbar>\n    <div class=\"container\">\n        <div class=\"row\">\n            <div class=\"col-md-12\">\n                <span v-if=\"isLoading\">\n                    <h2 class=\"text-center\"><i class=\"fa fa-truck\"></i> {{ user.name }} Incoming Orders Section\n                        <br>\n                        <small class=\"text-danger\"><i class=\"fa fa-clock-o\"></i> {{ user.created_at | moment \"calendar\" }}</small>\n                        <br>\n                        <small class=\"text-primary\"><strong><i class=\"fa fa-cart-plus\"></i> {{ orders.length }} Incoming Order/s</strong></small>\n                    </h2>\n                    <hr>\n                    <div class=\"row\">\n                        <div class=\"col-md-4\">\n                            <div class=\"col-md-11\">\n                                <form class=\"form-horizontal\">\n                                    <div class=\"form-group\">\n                                        <label for=\"serviceName\"></label>\n                                        <input type=\"text\" class=\"form-control\" id=\"serviceName\" placeholder=\"Search By  Service name or Service provider\" v-model=\"serviceName\">\n                                    </div>\n                                </form>\n                            </div>\n                        </div>\n                        <div class=\"col-md-8 text-right \">\n                            <div class=\"btn-group\">\n                                <button type=\"button\" class=\"btn btn-default\" @click=\"filter('')\"><i class=\"fa fa-list-ol\"></i>  All Order</button>\n                                <button type=\"button\" class=\"btn btn-info\" @click=\"filter('0')\"><i class=\"fa fa-pagelines\"></i>  New Order</button>\n                                <button type=\"button\" class=\"btn btn-warning\" @click=\"filter('1')\"><i class=\"fa fa-history\"></i> Old Order</button>\n                                <button type=\"button\" class=\"btn btn-primary\" @click=\"filter('2')\"><i class=\"fa fa-spinner fa-spin\"></i>  In Prograss Order</button>\n                                <button type=\"button\" class=\"btn btn-danger\" @click=\"filter('3')\"><i class=\"fa fa-close\"></i>  Cancelled</button>\n                                <button type=\"button\" class=\"btn btn-success\" @click=\"filter('4')\"><i class=\"fa fa-check\"></i>  Finished</button>\n                            </div>\n                        </div>\n\n                    </div>\n                    <hr>\n                    <div class=\"container\">\n                        <div class=\"row\" id=\"head\">\n                            <div class=\"col-lg-1 col-md-1 col-sm-1 col-xs-1\">#</div>\n                            <div class=\"col-lg-5 col-md-5 col-sm-2 col-xs-2\">Service Number</div>\n                            <div  class=\"col-lg-2 col-md-2 col-sm-2 col-xs-2\">Service Requester</div>\n                            <div class=\"col-lg-2 col-md-2 col-sm-2 col-xs-2\">Ordered On</div>\n                            <div class=\"col-lg-2 col-md-2 col-sm-2 col-xs-2\">Order Status</div>\n                        </div>\n                        <hr>\n\n                        <div v-if=\"orders.length > 0\">\n                            <div v-for=\"order in orders | filterBy filterData in 'status' | filterBy serviceName in 'services.name' 'get_my_orders.name'\" track-by=\"$index\">\n                                <purchase_orders :order=\"order\" :user_to_show=\"order.get_my_orders\"></purchase_orders>\n                            </div>\n                            <div v-if=\"orders.length >= 6\">\n                                <div class=\"col-lg-12 btn btn-info\" v-if=\"moreOrders\" @click=\"showMore()\">Show More</div>\n                                <div class=\"col-lg-12 alert alert-danger text-center\" v-if=\"!moreOrders\">NO More Incoming Orders</div>\n                                <div class=\"clearfix\"></div>\n                                <br>\n                            </div>\n\n                        </div>\n                        <div v-else>\n                            <div class=\"alert alert-info\">You Have No Orders!</div>\n                        </div>\n                    </div>\n                </span>\n            </div>\n        </div>\n    </div>\n<spinner v-ref:spinner size=\"lg\" fixed text=\"Loading....\"></spinner>\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  if (!module.hot.data) {
    hotAPI.createRecord("_v-498ed0d9", module.exports)
  } else {
    hotAPI.update("_v-498ed0d9", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}
},{"./orderStructure.vue":58,"vue":29,"vue-hot-reload-api":22,"vue-strap/dist/vue-strap.min":27}],58:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _status = require('../btns/status.vue');

var _status2 = _interopRequireDefault(_status);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    props: ['order', 'user_to_show'],
    components: {
        status: _status2.default
    }
};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\r\n<div class=\"row\" id=\"items\">\r\n    <div class=\"col-lg-1 col-md-1 col-sm-1 col-xs-1\">{{ order.id }}</div>\r\n    <div  class=\"col-lg-5 col-md-5 col-sm-2 col-xs-2\">\r\n        <a v-link=\"{name: '/Order', params: {orderId: order.id}}\">\r\n            {{ order.services.name }}\r\n        </a>\r\n    </div>\r\n    <div  class=\"col-lg-2 col-md-2 col-sm-2 col-xs-2\">\r\n        <a v-link=\"{name: '/User', params: {userId: user_to_show.id, userName: user_to_show.name}}\">\r\n            {{ user_to_show.name }}\r\n        </a>\r\n    </div>\r\n    <div class=\"col-lg-2 col-md-2 col-sm-2 col-xs-2\">{{ order.created_at | moment \"calendar\"}}</div>\r\n    <div class=\"col-lg-2 col-md-2 col-sm-2 col-xs-2\">\r\n        <status :status=\"order.status\"></status>\r\n    </div>\r\n</div>\r\n<hr>\r\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  if (!module.hot.data) {
    hotAPI.createRecord("_v-6346bef3", module.exports)
  } else {
    hotAPI.update("_v-6346bef3", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}
},{"../btns/status.vue":34,"vue":29,"vue-hot-reload-api":22}],59:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _orderStructure = require('./orderStructure.vue');

var _orderStructure2 = _interopRequireDefault(_orderStructure);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Spinner = require('vue-strap/dist/vue-strap.min').spinner;
exports.default = {
    components: {
        purchase_orders: _orderStructure2.default,
        spinner: Spinner
    },
    data: function data() {
        return {
            isLoading: false,
            orders: [],
            user: '',
            filterData: '',
            serviceName: '',
            moreOrders: true
        };
    },
    ready: function ready() {
        this.$refs.spinner.show();
        this.getMyPurchaseOrders();
    },
    methods: {
        getMyPurchaseOrders: function getMyPurchaseOrders(length) {
            if (length !== undefined) {
                var sendLen = '/' + length;
            } else {
                sendLen = '';
            }
            this.$http.get('purchaseOrders' + sendLen).then(function (res) {
                if (length !== undefined) {
                    if (res.body['orders'].length > 0) {
                        // use push if the result to add object in the array
                        // use concat because res.body['orders'] return as array
                        this.orders = this.orders.concat(res.body['orders']);
                    } else {
                        this.moreOrders = false;
                        alertify.error('No More Services Found In This Category');
                    }
                    this.$refs.spinner.hide();
                    this.isLoading = true;
                } else {

                    this.orders = res.body['orders'];
                    this.user = res.body['user'];
                    this.$refs.spinner.hide();
                    this.isLoading = true;
                }
            }, function (res) {
                swal('Error', 'Something Wrong Happend Contact With the Adminstratore Please', 'error');
            });
        },
        filter: function filter(status) {
            this.filterData = status;
        },
        showMore: function showMore() {
            this.$refs.spinner.show();
            var length = this.orders.length;
            this.getMyPurchaseOrders(length);
        }
    }
};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\n    <navbar></navbar>\n    <div class=\"container\">\n        <div class=\"row\">\n            <div class=\"col-md-12\">\n                <span v-if=\"isLoading\">\n\n                    <h2 class=\"text-center\"><i class=\"fa fa-cart-plus\"></i> {{ user.name }} Purchase Orders Section\n                        <br>\n                        <small class=\"text-danger\"><i class=\"fa fa-clock-o\"></i> {{ user.created_at | moment \"calendar\" }}</small>\n                        <br>\n                        <small class=\"text-primary\"><strong><i class=\"fa fa-cart-plus\"></i> {{ orders.length }} Purchase Order/s</strong></small>\n                    </h2>\n                    <hr>\n                    <div class=\"row\">\n                        <div class=\"col-md-4\">\n                            <div class=\"col-md-11\">\n                                <form class=\"form-horizontal\">\n                                    <div class=\"form-group\">\n                                        <label for=\"serviceName\"></label>\n                                        <input type=\"text\" class=\"form-control\" id=\"serviceName\" placeholder=\"Search By  Service name or Service provider\" v-model=\"serviceName\">\n                                    </div>\n                                </form>\n                            </div>\n                        </div>\n                        <div class=\"col-md-8 text-right \">\n                            <div class=\"btn-group\">\n                                <button type=\"button\" class=\"btn btn-default\" @click=\"filter('')\"><i class=\"fa fa-list-ol\"></i>  All Order</button>\n                                <button type=\"button\" class=\"btn btn-info\" @click=\"filter('0')\"><i class=\"fa fa-pagelines\"></i>  New Order</button>\n                                <button type=\"button\" class=\"btn btn-warning\" @click=\"filter('1')\"><i class=\"fa fa-history\"></i> Old Order</button>\n                                <button type=\"button\" class=\"btn btn-primary\" @click=\"filter('2')\"><i class=\"fa fa-spinner fa-spin\"></i>  In Prograss Order</button>\n                                <button type=\"button\" class=\"btn btn-danger\" @click=\"filter('3')\"><i class=\"fa fa-close\"></i>  Cancelled</button>\n                                <button type=\"button\" class=\"btn btn-success\" @click=\"filter('4')\"><i class=\"fa fa-check\"></i>  Finished</button>\n                            </div>\n                        </div>\n\n                    </div>\n                    <hr>\n                    <div class=\"container\">\n                        <div class=\"row\" id=\"head\">\n                            <div class=\"col-lg-1 col-md-1 col-sm-1 col-xs-1\">#</div>\n                            <div class=\"col-lg-5 col-md-5 col-sm-2 col-xs-2\">Service Number</div>\n                            <div  class=\"col-lg-2 col-md-2 col-sm-2 col-xs-2\">Service Provider</div>\n                            <div class=\"col-lg-2 col-md-2 col-sm-2 col-xs-2\">Ordered On</div>\n                            <div class=\"col-lg-2 col-md-2 col-sm-2 col-xs-2\">Order Status</div>\n                        </div>\n                        <hr>\n\n                        <div v-if=\"orders.length > 0\">\n                            <div v-for=\"order in orders | filterBy filterData in 'status' | filterBy serviceName in 'services.name' 'get_user_add_service.name'\" track-by=\"$index\">\n                                <purchase_orders :order=\"order\" :user_to_show=\"order.get_user_add_service\"></purchase_orders>\n                            </div>\n                            <div v-if=\"orders.length >= 6\">\n                                <div class=\"col-lg-12 btn btn-info\" v-if=\"moreOrders\" @click=\"showMore()\">Show More</div>\n                                <div class=\"col-lg-12 alert alert-danger text-center\" v-if=\"!moreOrders\">NO More Purchase Orders</div>\n                                <div class=\"clearfix\"></div>\n                                <br>\n                            </div>\n\n                        </div>\n                        <div v-else>\n                            <div class=\"alert alert-info\">You Have No Orders!</div>\n                        </div>\n                    </div>\n                </span>\n            </div>\n        </div>\n    </div>\n<spinner v-ref:spinner size=\"lg\" fixed text=\"Loading....\"></spinner>\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  if (!module.hot.data) {
    hotAPI.createRecord("_v-02947018", module.exports)
  } else {
    hotAPI.update("_v-02947018", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}
},{"./orderStructure.vue":58,"vue":29,"vue-hot-reload-api":22,"vue-strap/dist/vue-strap.min":27}],60:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _usersidebar = require('./usersidebar.vue');

var _usersidebar2 = _interopRequireDefault(_usersidebar);

var _status = require('../btns/status.vue');

var _status2 = _interopRequireDefault(_status);

var _allComments = require('../comments/allComments.vue');

var _allComments2 = _interopRequireDefault(_allComments);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Spinner = require('vue-strap/dist/vue-strap.min').spinner;
exports.default = {
    components: {
        spinner: Spinner,
        user_id: _usersidebar2.default,
        status: _status2.default,
        all_comments: _allComments2.default
    },
    data: function data() {
        return {
            order: '',
            user_id: '',
            user_order: '',
            isLoading: false,
            ordersCount: '',
            authUser: [],
            showControll: false

        };
    },

    ready: function ready() {
        this.$refs.spinner.show();
        this.GetServicesById();
    },
    methods: {
        GetServicesById: function GetServicesById() {
            this.$http.get('getOrderById/' + this.$route.params.orderId).then(function (res) {
                this.order = res.body['order'];
                this.user_id = res.body['user_id'];
                this.user_order = res.body['order_user'];
                this.ordersCount = res.body['ordersCount'];
                this.authUser = res.body['authUser'];
                if (this.order.status != 3 && this.order.status != 4) {
                    this.showControll = true;
                }
                if (this.order.status == 3) {
                    this.$dispatch('DisabledAdCommentSection', 'true');
                }
                this.$refs.spinner.hide();
                this.isLoading = true;
            }, function (res) {
                alertify.error('There are Some Erros Try Again later');
                this.$router.go({
                    path: '/'
                });
            });
        },
        changeStatus: function changeStatus(status) {
            this.$refs.spinner.show();
            this.$http.get('changeStatus/' + this.$route.params.orderId + '/' + status).then(function (res) {
                if (status == 3) {
                    this.$dispatch('DisabledAdCommentSection', 'true');
                }
                this.showControll = false;
                this.$refs.spinner.hide();
                alertify.success('Order Status Has been Changed Successfully');
            }, function (res) {
                this.$refs.spinner.hide();
                alertify.error('There are Some Erros Try Again later');
            });
        },
        finishOrder: function finishOrder() {
            this.$refs.spinner.show();
            this.$http.get('finishOrder/' + this.$route.params.orderId).then(function (res) {

                this.$dispatch('DisabledAdCommentSection', 'true');

                this.showControll = false;
                this.$refs.spinner.hide();
                alertify.success('Order Status Has been Finished Successfully');
            }, function (res) {
                this.$refs.spinner.hide();
                alertify.error('There are Some Erros Try Again later');
            });
        }
    },
    route: {
        canReuse: false // force relode the data
    }
};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\n    <navbar></navbar>\n    <div class=\"container\">\n        <div class=\"row\">\n            <div class=\"col-md-12\">\n                <span v-if=\"isLoading\">\n                    <div class=\"container-fluid\">\n                        <div class=\"row\">\n                            <div class=\"col-md-9\">\n                                <div class=\"col-md-12 col-md-12 col-sm-12 col-xs-12\">\n\n                                    <div class=\"container-fluid\">\n                                        <div class=\"content-wrapper\">\n                                            <div class=\"item-container\">\n                                                <div class=\"container\">\n                                                    <div class=\"col-md-12\">\n                                                        <h3 class=\"product-title\">{{ order.services.name }} <span class=\"small\"><strong><i class=\"fa fa-clock-o\"></i> {{ order.services.created_at | moment \"calendar\" }}</strong></span> </h3>\n                                                        <span class=\"small\">\n                                                            <strong>\n                                                                <status :status=\"order.status\"></status>\n                                                            </strong>\n                                                        </span>\n                                                        <div class=\"product-rating\">\n                                                            <i class=\"fa fa-star gold\"></i>\n                                                            <i class=\"fa fa-star gold\"></i>\n                                                            <i class=\"fa fa-star gold\"></i>\n                                                            <i class=\"fa fa-star gold\"></i>\n                                                            <i class=\"fa fa-star-o\"></i>\n                                                        </div>\n                                                    </div>\n                                                    <hr>\n                                                    <div class=\"col-md-12\">\n                                                        <div class=\"text-center\">\n                                                            <div class=\"mdl-card__media\">\n                                                                <div class=\"over\">\n                                                                    <div class=\"container\">\n                                                                        <div class=\"row\">\n                                                                            <div class=\"col-md-12 col-sm-6 col-xs-6\">\n                                                                                <div class=\"col-md-6 col-sm-6 col-xs-6\" style=\"margin-top: 7px;\">\n                                                                                    <div class=\"label label-info\">Price: $ {{ order.services.price }}</div>\n                                                                                </div>\n                                                                                <div class=\"col-md-6 col-sm-6 col-xs-6\">\n                                                                                    <div class=\"product-stock\">{{ ordersCount }} Order/s</div>\n                                                                                </div>\n                                                                            </div>\n                                                                            <div class=\"col-md-12 col-sm-6 col-xs-6\" style=\"margin-top: 8px;\">\n                                                                                <!-- buy Order -->\n                                                                                <!-- <buy_btn :service=\"service\"></buy_btn> -->\n                                                                                <!-- Favorite -->\n                                                                                <!-- <fav_btn :service=\"service\"></fav_btn> -->\n                                                                            </div>\n                                                                        </div>\n                                                                    </div>\n                                                                </div>\n                                                                <img class=\"img-responsive\" id=\"item-display\" v-bind:src=\"order.services.image\" alt=\"{{order.services.name}}\">\n                                                            </div>\n                                                        </div>\n                                                    </div>\n\n                                                    <div class=\"col-md-12 product-info\">\n                                                        <ul id=\"myTab\" class=\"nav nav-tabs nav_tabs\">\n                                                            <li class=\"active\"><a href=\"#service-one\" data-toggle=\"tab\">Details</a></li>\n                                                        </ul>\n                                                        <div id=\"myTabContent\" class=\"tab-content\">\n                                                            <div class=\"tab-pane fade in active\" id=\"service-one\">\n                                                                <br>\n                                                                <p class=\"product-desc\">\n                                                                    {{ order.services.description }}\n                                                                </p>\n                                                            </div>\n                                                        </div>\n                                                        <hr>\n                                                    </div>\n                                                </div>\n                                            </div>\n                                        </div>\n                                    </div>\n                                </div>\n                                <div class=\"col-md-12 col-md-12 col-sm-12 col-xs-12\">\n                                    <all_comments :order=\"order\"></all_comments>\n                                </div>\n                            </div>\n                            <div class=\"col-lg-3 col-md-3 col-sm-12 col-xs-12\">\n                                <div class=\"container\">\n                                    <ul class=\"list-group\" style=\"padding:0px;\" v-if=\"showControll\">\n                                        <!--\n                                        authUser => User who Login\n                                        user_order => User Who Order the Service\n                                        user_id => User Who Add the Service\n                                    -->\n\n                                    <li class=\"list-group-item active\" v-if=\"authUser.id == user_id.id && order.status == 1\">\n                                        <h5>\n                                            <i class=\"fa fa-user\"></i>\n                                            Accept Or Reject The Order\n                                        </h5>\n                                    </li>\n\n                                    <li class=\"list-group-item active\" v-if=\"authUser.id == user_order.id && order.status == 2\">\n                                        <h5>\n                                            <i class=\"fa fa-user\"></i>\n                                            Finish The Order\n                                        </h5>\n                                    </li>\n                                    <li class=\"list-group-item \" v-if=\"authUser.id == user_id.id && order.status == 1\">\n                                        <!-- 2 => accept -->\n                                        <button @click=\"changeStatus(2)\" type=\"button\" class=\"btn btn-success btn-block\">\n                                            <i class=\"fa fa-check\"></i> Accept\n                                        </button>\n\n                                    </li>\n                                    <li class=\"list-group-item \" v-if=\"authUser.id == user_id.id && order.status == 1\">\n\n                                        <!-- 3 => desline -->\n                                        <button @click=\"changeStatus(3)\" type=\"button\" class=\"btn btn-danger btn-block\">\n                                            <i class=\"fa fa-close\"></i> Decline\n                                        </button>\n                                    </li>\n                                    <li class=\"list-group-item \" v-if=\"authUser.id == user_order.id && order.status == 2\">\n                                        <!-- 4 => accept -->\n                                        <button @click=\"finishOrder()\" type=\"button\" class=\"btn btn-info btn-block\">\n                                            <i class=\"fa fa-check\"></i> Finish\n                                        </button>\n                                    </li>\n                                </ul>\n                                <user_id :user=\"user_id\"></user_id>\n                                <user_id :user=\"user_order\"></user_id>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </span>\n        </div>\n    </div>\n</div>\n    <spinner v-ref:spinner size=\"lg\" fixed text=\"Loading....\"></spinner>\n\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  if (!module.hot.data) {
    hotAPI.createRecord("_v-7d0803b0", module.exports)
  } else {
    hotAPI.update("_v-7d0803b0", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}
},{"../btns/status.vue":34,"../comments/allComments.vue":37,"./usersidebar.vue":61,"vue":29,"vue-hot-reload-api":22,"vue-strap/dist/vue-strap.min":27}],61:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    props: ['user']
};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\n\n<ul class=\"list-group\" style=\"padding:0px;\">\n      <li class=\"list-group-item active\">\n          <h5>\n              <a v-link=\"{name: '/User', params: {userId: user.id, userName: user.name}}\" style=\"color: #FFF;\">\n                  <i class=\"fa fa-user\"></i> {{ user.name }}\n              </a>\n          </h5>\n      </li>\n      <li class=\"list-group-item \" v-for=\"service in user.services\">\n          <a  v-link=\"{name: '/ServicesDetails', params: {serviceId: service.id, serviceName: service.name}}\">\n              {{ service.name }}\n          </a>\n      </li>\n</ul>\n\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  if (!module.hot.data) {
    hotAPI.createRecord("_v-e04f941a", module.exports)
  } else {
    hotAPI.update("_v-e04f941a", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}
},{"vue":29,"vue-hot-reload-api":22}],62:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _SingleServices = require('../users/SingleServices.vue');

var _SingleServices2 = _interopRequireDefault(_SingleServices);

var _sidebar = require('./sidebar.vue');

var _sidebar2 = _interopRequireDefault(_sidebar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Spinner = require('vue-strap/dist/vue-strap.min').spinner;

exports.default = {
    components: {
        single_services: _SingleServices2.default,
        main_side_bar: _sidebar2.default,
        spinner: Spinner
    },
    data: function data() {
        return {
            isLoading: false,
            user: '',
            services: [],
            sortKey: '',
            reverse: 1,
            serviceName: '',
            cat: [],
            section1: [],
            section2: [],
            section3: [],
            moreServices: true
        };
    },
    ready: function ready() {
        this.$refs.spinner.show();
        this.getUserServices();
    },
    methods: {
        getUserServices: function getUserServices(length) {
            if (length !== undefined) {
                var sendLen = '/' + length;
            } else {
                sendLen = '';
            }
            var url = '/getAllServices' + sendLen;
            this.$http.get(url).then(function (res) {
                if (length !== undefined) {
                    if (res.body['services'].length > 0) {
                        // use push if the result to add object in the array
                        // use concat because res.body['services'] return as array
                        this.services = this.services.concat(res.body['services']);
                    } else {
                        this.moreServices = false;
                        alertify.error('No More Services Found');
                    }
                    this.$refs.spinner.hide();
                    this.isLoading = true;
                } else {
                    this.services = res.body['services'];
                    this.cat = res.body['cat'];
                    this.section1 = res.body['sidebarSection1'];
                    this.section2 = res.body['sidebarSection2'];
                    this.section3 = res.body['sidebarSection3'];
                    this.$refs.spinner.hide();
                    this.isLoading = true;
                }
            }, function (res) {

                alertify.error('There are Some Erros Try Again later');
            });
        },
        sort: function sort(_sort) {
            this.reverse = this.sortKey == _sort ? this.reverse * -1 : 1;
            this.sortKey = _sort;
        },
        showMore: function showMore() {
            this.$refs.spinner.show();
            var length = this.services.length;
            this.getUserServices(length);
        }
    },
    route: {
        canReuse: false // Force reload data
    }
};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\n<navbar></navbar>\n<div class=\"container\">\n    <div class=\"row\">\n        <div class=\"col-md-12\">\n            <div class=\"col-md-12\">\n                <span v-if=\"isLoading\">\n                    <div class=\"row\">\n\n                        <div class=\"col-lg-3 col-md-3 col-sm-12 col-xs-12\">\n                            <main_side_bar :category=\"cat\" :section1=\"section1\" :section2=\"section2\" :section3=\"section3\"></main_side_bar>\n                        </div>\n\n                        <div class=\"col-lg-9 col-md-9 col-sm-12 col-xs-12\">\n                            <div class=\"row\">\n                                <div class=\"col-md-6\">\n                                    <div class=\"col-md-11\">\n                                        <form class=\"form-horizontal\">\n                                            <div class=\"form-group\">\n                                                <label for=\"serviceName\"></label>\n                                                <input type=\"text\" class=\"form-control\" id=\"serviceName\" placeholder=\"Search By  Service name or Service Price\" v-model=\"serviceName\">\n                                            </div>\n                                        </form>\n                                    </div>\n                                </div>\n                                <div class=\"col-md-6 text-right \">\n                                    <div class=\"btn-group\">\n                                        <button type=\"button\" class=\"btn btn-primary\" @click=\"sort('price')\"><i class=\"fa fa-dollar\"></i>  Price</button>\n                                        <button type=\"button\" class=\"btn btn-success\" @click=\"sort('name')\"><i class=\"fa fa-sort-alpha-asc\"></i> Name</button>\n                                        <button type=\"button\" class=\"btn btn-info\" @click=\"sort('votes_sum')\"><i class=\"fa fa-clock-o\"></i>  Most Rating</button>\n                                        <button type=\"button\" class=\"btn btn-danger\" @click=\"sort('id')\"><i class=\"fa fa-sort-numeric-desc\"></i>  Order</button>\n                                    </div>\n                                </div>\n\n                            </div>\n                            <hr>\n                            <div class=\"row\">\n                                <span v-if=\"services.length > 0\">\n                                    <div class=\"col-sm-4 col-md-4\" v-for=\"service in services | orderBy sortKey reverse | filterBy serviceName in 'name' 'price'\" track-by=\"$index\">\n                                        <single_services :service=\"service\"></single_services>\n                                    </div>\n                                    <div v-if=\"services.length >= 6\">\n                                        <div class=\"col-lg-12 btn btn-info\" v-if=\"moreServices\" @click=\"showMore()\">Show More</div>\n                                        <div class=\"clearfix\"></div>\n                                        <br>\n                                    </div>\n                                </span>\n                                <span v-else>\n                                    <div class=\"alert alert-danger\">\n                                        No Services Till Now in Our Site\n                                    </div>\n                                </span>\n                            </div>\n                        </div>\n                    </div>\n                </span>\n                <spinner v-ref:spinner size=\"lg\" fixed text=\"Loading....\"></spinner>\n            </div>\n        </div>\n    </div>\n</div>\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  if (!module.hot.data) {
    hotAPI.createRecord("_v-2c474a82", module.exports)
  } else {
    hotAPI.update("_v-2c474a82", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}
},{"../users/SingleServices.vue":69,"./sidebar.vue":63,"vue":29,"vue-hot-reload-api":22,"vue-strap/dist/vue-strap.min":27}],63:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    props: ['category', 'section1', 'section2', 'section3']
};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\n<div class=\"container\">\n    <ul v-if=\"section3\" class=\"list-group\" style=\"padding:0px;\">\n          <li class=\"list-group-item active\">\n              <h5>\n                  <i class=\"fa fa-shopping-cart\"></i>\n                  Best seller\n              </h5>\n          </li>\n          <li v-for=\"mostPurchased in section3\" track-by=\"$index\" class=\"list-group-item \">\n              <a v-link=\"{name: '/ServicesDetails', params:{serviceId: mostPurchased.id, serviceName: mostPurchased.name}}\">\n                  <span class=\"pull-left\">{{ mostPurchased.name }}</span>\n                  <span class=\"label label-danger pull-right\"><i class=\"fa fa-cart-plus\"></i> {{ mostPurchased.order_count }}</span>\n                  <div class=\"clearfix\"></div>\n              </a>\n          </li>\n    </ul>\n    <ul v-if=\"section2\" class=\"list-group\" style=\"padding:0px;\">\n          <li class=\"list-group-item active\">\n              <h5>\n                  <i class=\"fa fa-heart\"></i>\n                  Choosed For You\n              </h5>\n          </li>\n          <li v-for=\"choosed in section2\" track-by=\"$index\" class=\"list-group-item \">\n              <a v-link=\"{name: '/ServicesDetails', params:{serviceId: choosed.id, serviceName: choosed.name}}\">\n                  <span>{{ choosed.name }}</span>\n              </a>\n          </li>\n    </ul>\n    <ul class=\"list-group\" style=\"padding:0px;\">\n          <li class=\"list-group-item active\">\n              <h5>\n                  <i class=\"fa fa-folder\"></i>\n                  Categories\n              </h5>\n          </li>\n          <li v-for=\"cat in category\" track-by=\"$index\" class=\"list-group-item \">\n              <a v-link=\"{name: '/Category', params:{catId: cat.id, catName: cat.name}}\">\n                  {{ cat.name }}\n              </a>\n          </li>\n    </ul>\n    <ul v-if=\"section1\" class=\"list-group\" style=\"padding:0px;\">\n          <li class=\"list-group-item active\">\n              <h5>\n                  <i class=\"fa fa-eye-slash\"></i>\n                  Most Viewd\n              </h5>\n          </li>\n          <li v-for=\"view in section1\" track-by=\"$index\" class=\"list-group-item \">\n              <a v-link=\"{name: '/ServicesDetails', params:{serviceId: view.id, serviceName: view.name}}\">\n                  <span class=\"pull-left\">{{ view.name }}</span>\n                  <span class=\"label label-success pull-right\"><i class=\"fa fa-eye\"></i>{{ view.view_count }}</span>\n                  <div class=\"clearfix\"></div>\n              </a>\n          </li>\n    </ul>\n</div>\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  if (!module.hot.data) {
    hotAPI.createRecord("_v-a307b056", module.exports)
  } else {
    hotAPI.update("_v-a307b056", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}
},{"vue":29,"vue-hot-reload-api":22}],64:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    props: ['service'],
    filters: {
        limit: function limit(string, value) {
            return string.substring(0, value) + '...';
        }
    }
};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\n\n<div class=\"container\">\n    <div class=\"row\">\n        <div class=\"col-md-12\">\n            <div class=\"thumbnail\" >\n                <div class=\"row\">\n                    <div class=\"col-lg-9 col-md-9 col-sm-9 col-xs-9\">\n                        <a v-link=\"{name: '/ServicesDetails', params: { serviceId: service.id, serviceName: service.name }}\">\n                            <h4>{{ service.name }}</h4>\n                        </a>\n                    </div>\n                    <div class=\"col-lg-3 col-md-3 col-sm-3 col-xs-3\"style=\"margin-top: 8px; margin-left: -5px;\">\n                        <span class=\"badge\"><i class=\"fa fa-eye\"></i> {{ service.view_count }}</span>\n\n                    </div>\n                </div>\n                <div class=\"clearfix\"></div>\n                <div style=\"height: 7px;\"></div>\n                <img v-bind:src=\"service.image\" class=\"img-responsive\">\n                <div class=\"caption\">\n                    <div class=\"row\">\n                        <div class=\"col-md-12 col-xs-12\">\n                            <div class=\"col-md-6 col-xs-6\">\n                                <a v-link=\"{name: '/User', params: {userId: service.user.id, userName: service.user.name}}\">\n                                    <h4>{{ service.user.name }}</h4>\n                                </a>\n\n                            </div>\n                            <div class=\"col-md-6 col-xs-6 price text-right\" style=\"margin-top: -10px;\">\n                                <h3>\n                                    <label class=\"badge\">${{ service.price }}</label>\n                                </h3>\n                            </div>\n\n                        </div>\n                    </div>\n                    <div class=\"row\">\n\n                        <div class=\"col-md-12 col-sm-12\">\n\n                            <span v-if=\"service.status == 0\">\n\n                                <span class=\"btn btn-warning btn-product btn-block\"><i class=\"fa fa-clock-o\"></i> Waiting</span>\n                            </span>\n\n                            <span v-if=\"service.status == 1\">\n\n                                <span class=\"btn btn-info btn-product btn-block\"><i class=\"fa fa-check\"></i> Approved</span>\n                            </span>\n\n                            <span v-if=\"service.status == 2\">\n\n                                <span class=\"btn btn-danger btn-product btn-block\"><i class=\"fa fa-close\"></i> Rejected</span>\n                            </span>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  if (!module.hot.data) {
    hotAPI.createRecord("_v-f6be1f0a", module.exports)
  } else {
    hotAPI.update("_v-f6be1f0a", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}
},{"vue":29,"vue-hot-reload-api":22}],65:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    data: function data() {
        return {
            name: '',
            description: '',
            category_id: '',
            price: '',
            messages: []
        };
    },

    methods: {
        AddThisService: function AddThisService(e) {
            e.preventDefault();
            var formData = new FormData();
            formData.append('name', this.name);
            formData.append('description', this.description);
            formData.append('cat_id', this.category_id);
            formData.append('price', this.price);
            formData.append('image', this.$els.image.files[0]);
            this.sendData(formData);
        },
        sendData: function sendData(formData) {
            this.$http.post('/Services', formData).then(function (successResponse) {
                this.name = '';
                this.description = '';
                this.category_id = '';
                this.price = '';
                $('input[type=file]').val(null);
                if (successResponse.body == 'success') {
                    swal("Success", "your service has been added Please wait until admin approved!", "success");
                } else if (successResponse.body == 'error') {
                    alertify.error("error saving the service");
                } else if (successResponse.body == 'priceError') {
                    alertify.error("Don't Mess With the Price Values!");
                    setInterval(function () {
                        window.location.reload();
                    }, 1500);
                }
            }, function (errorResponse) {
                for (var key in errorResponse.body) {
                    alertify.error(errorResponse.body[key][0]);
                }
            });
        }
    }
};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\n<navbar></navbar>\n<div class=\"container\">\n    <div class=\"row\">\n        <div class=\"col-md-12\">\n            <h2 class=\"text-center\"><i class=\"fa fa-plus\"></i> Add Services Section</h2>\n            <hr>\n            <div class=\"row\">\n                <div class=\"col-md-10 col-md-offset-1\">\n                    <div class=\"panel panel-primary\">\n                        <div class=\"panel-heading\">\n                            <h3 class=\"panel-title\"><i class=\"fa fa-plus\"></i> Add Services</h3>\n                        </div>\n                        <div class=\"panel-body\">\n                            <form>\n                                <div class=\"form-group\">\n                                    <label for=\"name\">Service Name</label>\n                                    <input type=\"text\" class=\"form-control\" id=\"name\" name=\"name\" v-model=\"name\" placeholder=\"Enter the Service Name\">\n                                </div>\n\n                                <div class=\"form-group\">\n                                    <label for=\"description\">Service Description</label>\n                                    <textarea class=\"form-control\" id=\"description\" name=\"description\" v-model=\"description\" rows=\"10\" placeholder=\"Enter the Service description\"></textarea>\n                                </div>\n\n                                <div class=\"form-group\">\n                                    <label for=\"category_id\">Service Category</label>\n                                    <select class=\"form-control\" id=\"category_id\" name=\"category_id\" v-model=\"category_id\">\n                                        <option value=\"1\">Category 1</option>\n                                    </select>\n                                </div>\n\n                                <div class=\"form-group\">\n                                    <label for=\"price\">Service Price</label>\n                                    <select class=\"form-control\" id=\"price\" name=\"price\" v-model=\"price\">\n                                        <option value=\"5\">5</option>\n                                        <option value=\"10\">10</option>\n                                        <option value=\"15\">15</option>\n                                        <option value=\"20\">20</option>\n                                        <option value=\"25\">25</option>\n                                        <option value=\"30\">30</option>\n                                        <option value=\"35\">35</option>\n                                        <option value=\"40\">40</option>\n                                        <option value=\"45\">45</option>\n                                        <option value=\"50\">50</option>\n                                    </select>\n                                </div>\n\n                                <div class=\"form-group\">\n                                    <label for=\"image\">Service image</label>\n                                    <input type=\"file\" class=\"form-control\" v-el:image>\n                                    <p class=\"help-block\">The Image Must Be More Than 300px x 300px and less than 1000px x 1000px</p>\n                                </div>\n\n                                <div class=\"form-group\">\n                                    <button type=\"button\" class=\"btn btn-primary\" @click=\"AddThisService\">\n                                        <i class=\"fa fa-plus\"></i> Add Service\n                                    </button>\n                                </div>\n                            </form>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  if (!module.hot.data) {
    hotAPI.createRecord("_v-18e6274c", module.exports)
  } else {
    hotAPI.update("_v-18e6274c", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}
},{"vue":29,"vue-hot-reload-api":22}],66:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _SingleServices = require('./SingleServices.vue');

var _SingleServices2 = _interopRequireDefault(_SingleServices);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Spinner = require('vue-strap/dist/vue-strap.min').spinner;

exports.default = {
    components: {
        single_services: _SingleServices2.default,
        spinner: Spinner
    },
    data: function data() {
        return {
            services: [],
            user: '',
            sortKey: '',
            reverse: 1,
            isLoading: false,
            moreServices: true
        };
    },
    ready: function ready() {
        this.$refs.spinner.show();
        this.getMyServices();
    },
    methods: {
        getMyServices: function getMyServices(length) {
            if (length !== undefined) {
                var sendLen = '/' + length;
            } else {
                sendLen = '';
            }
            this.$http.get('/getMyServices' + sendLen).then(function (res) {

                if (length !== undefined) {
                    if (res.body['services'].length > 0) {
                        // use push if the result to add object in the array
                        // use concat because res.body['services'] return as array
                        this.services = this.services.concat(res.body['services']);
                    } else {
                        this.moreServices = false;
                        alertify.error('No More Services Found In This Category');
                    }
                    this.$refs.spinner.hide();
                    this.isLoading = true;
                } else {
                    this.services = res.body['services'];
                    this.user = res.body['user'];
                    this.$refs.spinner.hide();
                    this.isLoading = true;
                }
            }, function (res) {
                alertify.error('There are Some Erros Try Again later');
            });
        },
        sort: function sort(_sort) {
            this.reverse = this.sortKey == _sort ? this.reverse * -1 : 1;
            this.sortKey = _sort;
        },
        showMore: function showMore() {
            this.$refs.spinner.show();
            var length = this.services.length;
            this.getMyServices(length);
        }
    }

};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\n<navbar></navbar>\n<div class=\"container\">\n    <div class=\"row\">\n        <div class=\"col-md-12\">\n            <span v-if=\"isLoading\">\n                <h2 class=\"text-center\"><i class=\"fa fa-user\"></i> {{ user.name }} Services Section\n                    <br>\n                    <small class=\"text-danger\"><i class=\"fa fa-clock-o\"></i> {{ user.created_at | moment \"calendar\" }}</small>\n                    <br>\n                    <small class=\"text-primary\"><strong><i class=\"fa fa-cart-plus\"></i> {{ services.length }} Service/s</strong></small>\n                </h2>\n                <hr>\n                <div class=\"row\">\n                    <div class=\"col-md-6\">\n                        <div class=\"col-md-11\">\n                            <form class=\"form-horizontal\">\n                                <div class=\"form-group\">\n                                    <label for=\"serviceName\"></label>\n                                    <input type=\"text\" class=\"form-control\" id=\"serviceName\" placeholder=\"Search By  Service name or Service Price\" v-model=\"serviceName\">\n                                </div>\n                            </form>\n                        </div>\n                    </div>\n                    <div class=\"col-md-6 text-right \">\n                        <div class=\"btn-group\">\n                            <button type=\"button\" class=\"btn btn-primary\" @click=\"sort('price')\"><i class=\"fa fa-dollar\"></i>  By Price</button>\n                            <button type=\"button\" class=\"btn btn-success\" @click=\"sort('name')\"><i class=\"fa fa-sort-alpha-asc\"></i> By Name</button>\n                            <button type=\"button\" class=\"btn btn-info\" @click=\"sort('status')\"><i class=\"fa fa-clock-o\"></i>  waiting</button>\n                            <button type=\"button\" class=\"btn btn-danger\" @click=\"sort('id')\"><i class=\"fa fa-sort-numeric-desc\"></i>  By Add Order</button>\n                        </div>\n                    </div>\n\n                </div>\n                <hr>\n                <div class=\"row\">\n                    <span v-if=\"services.length > 0\">\n                        <div class=\"col-sm-4 col-md-3\" v-for=\"service in services | orderBy sortKey reverse | filterBy serviceName in 'name' 'price'\" track-by=\"$index\">\n                            <single_services :service=\"service\"></single_services>\n                        </div>\n                        <div v-if=\"services.length >= 6\">\n                            <div class=\"col-lg-12 btn btn-info\" v-if=\"moreServices\" @click=\"showMore()\">Show More</div>\n                            <div class=\"col-lg-12 alert alert-danger text-center\" v-if=\"!moreServices\">NO More Services</div>\n                            <div class=\"clearfix\"></div>\n                            <br>\n                        </div>\n                    </span>\n                    <span v-else>\n                        <div class=\"alert alert-warning\">\n                            You Do'nt Have Any Services Current Now Please Add One\n                            <a v-link=\"{path: '/AddServices'}\">\n                                <i class=\"fa fa-plus\"></i>\n                                Add Service\n                            </a>\n                        </div>\n                    </span>\n                </div>\n            </span>\n        </div>\n    </div>\n</div>\n<spinner v-ref:spinner size=\"lg\" fixed text=\"Loading....\"></spinner>\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  if (!module.hot.data) {
    hotAPI.createRecord("_v-5d514e3f", module.exports)
  } else {
    hotAPI.update("_v-5d514e3f", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}
},{"./SingleServices.vue":64,"vue":29,"vue-hot-reload-api":22,"vue-strap/dist/vue-strap.min":27}],67:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _SingleServices = require('./SingleServices.vue');

var _SingleServices2 = _interopRequireDefault(_SingleServices);

var _SingleServices3 = require('../users/SingleServices.vue');

var _SingleServices4 = _interopRequireDefault(_SingleServices3);

var _sidebar = require('./sidebar.vue');

var _sidebar2 = _interopRequireDefault(_sidebar);

var _buy = require('../btns/buy.vue');

var _buy2 = _interopRequireDefault(_buy);

var _fav = require('../btns/fav.vue');

var _fav2 = _interopRequireDefault(_fav);

var _rating = require('../btns/rating.vue');

var _rating2 = _interopRequireDefault(_rating);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Spinner = require('vue-strap/dist/vue-strap.min').spinner;

exports.default = {

    components: {
        my_own_services_in_same_cat: _SingleServices2.default,
        other_services_in_same_cat: _SingleServices4.default,
        sidebar: _sidebar2.default,
        buy_btn: _buy2.default,
        fav_btn: _fav2.default,
        rating: _rating2.default,
        spinner: Spinner
    },
    data: function data() {
        return {
            msg: "service datails",
            service: '',
            isLoading: false,
            myOwnServicesInSameCat: [],
            otherServicesInSameCat: [],
            ordersCount: 0,
            sumVotes: 0,
            mostVoted: [],
            mostViewd: [],
            section2: []
        };
    },

    ready: function ready() {
        this.$refs.spinner.show();
        this.GetServicesById();
    },
    methods: {
        GetServicesById: function GetServicesById() {
            this.$http.get('Services/' + this.$route.params.serviceId).then(function (res) {
                this.service = res.body['service'];
                this.myOwnServicesInSameCat = res.body['myOwnServicesInSameCat'];
                this.otherServicesInSameCat = res.body['otherServicesInSameCat'];
                this.ordersCount = res.body['ordersCount'];
                this.sumVotes = res.body['sumVotes'];
                this.mostVoted = res.body['mostVoted'];
                this.mostViewd = res.body['mostViewd'];
                this.section2 = res.body['sidebarSection2'];
                this.$refs.spinner.hide();
                this.isLoading = true;
            }, function (res) {
                alertify.error('There are Some Erros Try Again later');
                this.$router.go({
                    path: '/'
                });
            });
        }
    },
    events: {
        AddNewRate: function AddNewRate(val) {
            this.service.votes_count += 1; // users count
            this.sumVotes += val; // stars count
        }
    },
    route: {
        canReuse: false // force relode the data
    }
};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\n    <navbar></navbar>\n    <div class=\"container\">\n        <div class=\"row\">\n            <div class=\"col-md-12\">\n                <span v-if=\"isLoading\">\n                    <div class=\"col-lg-3 col-md-3 col-sm-12 col-xs-12\" >\n                        <sidebar :service=\"service\" :most_voted=\"mostVoted\" :most_viewd=\"mostViewd\" :section2=\"section2\"></sidebar>\n                    </div>\n                    <div class=\"col-lg-9 col-md-9 col-sm-12 col-xs-12\">\n                        <div class=\"container-fluid\">\n                            <div class=\"content-wrapper\">\n                                <div class=\"item-container\">\n                                    <div class=\"container\">\n                                        <div class=\"col-md-12\">\n                                            <h3 class=\"product-title\">\n                                                <span class=\"pull-left\">{{ service.name }}</span>\n                                                <span class=\"small pull-right\">\n                                                    <strong>\n                                                        <i class=\"fa fa-clock-o\"></i>\n                                                        {{ service.created_at | moment \"calendar\" }}\n                                                    </strong>\n                                                </span>\n                                            </h3>\n                                            <div class=\"clearfix\"></div>\n                                            <br>\n                                            <div class=\"product-rating\">\n                                                <!-- Rating run Here -->\n                                                <span class=\"pull-left\">\n                                                    <rating :service=\"service\"></rating>\n                                                </span>\n                                                <span v-if=\"service.votes_count > 0\">\n                                                    <!-- Number Of Users Whose Rate -->\n                                                    <span class=\"pull-right label label-danger\">\n                                                        <i class=\"fa fa-user\"></i>\n                                                        Number of voters\n                                                        {{ service.votes_count }}\n                                                    </span>\n                                                    <!-- The Service Rates -->\n                                                    <span class=\"pull-right label label-warning\" style=\"margin-right: 5px;\">\n                                                        <i class=\"fa fa-star\"></i>\n                                                        Number of stars\n                                                        {{ sumVotes }}\n                                                    </span>\n                                                    <span class=\"pull-right label label-success\" style=\"margin-right: 5px;\">\n                                                        <!--\n                                                        Percent =>\n                                                        [\n                                                        NOTE This Is The Service Score\n                                                        (total votes * 100)\n                                                        =============================================\n                                                        (number Of rated users * max rate value[ 5 ])\n                                                        NOTE this is the final score\n                                                        ]\n                                                        0/0 => NaN\n                                                    -->\n                                                    % {{ parseInt((sumVotes * 100) / (service.votes_count * 5)) }}\n                                                    percentage\n                                                </span>\n                                            </span>\n                                            <!-- Rating run Here -->\n                                        </div>\n                                        <div class=\"clearfix\"></div>\n                                        <hr>\n                                    </div>\n                                    <div class=\"col-md-12\">\n                                        <div class=\"text-center\">\n                                            <div class=\"mdl-card__media\">\n                                                <div class=\"over\">\n                                                    <div class=\"container\">\n                                                        <div class=\"row\">\n                                                            <div class=\"col-md-12 col-sm-6 col-xs-6\">\n                                                                <div class=\"col-md-6 col-sm-6 col-xs-6\" style=\"margin-top: 7px;\">\n                                                                    <div class=\"label label-info\">Price: $ {{ service.price }}</div>\n                                                                </div>\n                                                                <div class=\"col-md-6 col-sm-6 col-xs-6\">\n                                                                    <div class=\"product-stock\">{{ ordersCount }} Order/s</div>\n\n                                                                </div>\n                                                            </div>\n                                                            <div class=\"col-md-12 col-sm-6 col-xs-6\" style=\"margin-top: 8px;\">\n                                                                <!-- buy Order -->\n                                                                <buy_btn :service=\"service\"></buy_btn>\n                                                                <!-- Favorite -->\n                                                                <fav_btn :service=\"service\"></fav_btn>\n                                                            </div>\n                                                        </div>\n                                                    </div>\n                                                </div>\n                                                <img class=\"img-responsive\" id=\"item-display\" v-bind:src=\"service.image\" alt=\"{{service.name}}\">\n                                            </div>\n                                        </div>\n                                    </div>\n                                </div>\n                            </div>\n                            <div class=\"container-fluid\">\n                                <div class=\"col-md-12 product-info\">\n                                    <ul id=\"myTab\" class=\"nav nav-tabs nav_tabs\">\n\n                                        <li class=\"active\"><a href=\"#service-one\" data-toggle=\"tab\">Details</a></li>\n                                        <li><a href=\"#service-two\" data-toggle=\"tab\">My Services In Same Category</a></li>\n                                        <li><a href=\"#service-three\" data-toggle=\"tab\">Members Services In Same Category</a></li>\n\n                                    </ul>\n                                    <div id=\"myTabContent\" class=\"tab-content\">\n                                        <div class=\"tab-pane fade in active\" id=\"service-one\">\n                                            <br>\n                                            <p class=\"product-desc\">\n                                                {{ service.description }}\n                                            </p>\n\n                                        </div>\n                                        <div class=\"tab-pane fade\" id=\"service-two\">\n                                            <br>\n                                            <div class=\"row\">\n                                                <div v-id=\"myOwnServicesInSameCat.length > 0\">\n                                                    <div class=\"col-md-5 col-sm-4\" v-for=\"service in myOwnServicesInSameCat\" track-by=\"$index\">\n                                                        <my_own_services_in_same_cat :service=\"service\"></my_own_services_in_same_cat>\n                                                    </div>\n                                                </div>\n\n                                            </div>\n\n                                        </div>\n                                        <div class=\"tab-pane fade\" id=\"service-three\">\n                                            <br>\n                                            <div class=\"row\">\n                                                <div v-id=\"otherServicesInSameCat.length > 0\">\n                                                    <div class=\"col-md-5 col-sm-4\" v-for=\"service in otherServicesInSameCat\" track-by=\"$index\">\n                                                        <other_services_in_same_cat :service=\"service\"></other_services_in_same_cat>\n                                                    </div>\n                                                </div>\n                                            </div>\n                                        </div>\n                                    </div>\n                                    <hr>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </span>\n        </div>\n    </div>\n</div>\n<spinner v-ref:spinner size=\"lg\" fixed text=\"Loading....\"></spinner>\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  if (!module.hot.data) {
    hotAPI.createRecord("_v-20da661a", module.exports)
  } else {
    hotAPI.update("_v-20da661a", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}
},{"../btns/buy.vue":31,"../btns/fav.vue":32,"../btns/rating.vue":33,"../users/SingleServices.vue":69,"./SingleServices.vue":64,"./sidebar.vue":68,"vue":29,"vue-hot-reload-api":22,"vue-strap/dist/vue-strap.min":27}],68:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    props: ['service', 'most_voted', 'most_viewd', 'section2']
};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\n<div class=\"container\">\n    <ul class=\"list-group\" style=\"padding:0px;\">\n          <li class=\"list-group-item active\">\n              <h5>\n                  <i class=\"fa fa-user\"></i>\n                 View Or Contact The Provider\n              </h5>\n          </li>\n          <li class=\"list-group-item \">\n              <a class=\"btn btn-success btn-sm\" v-link=\"{name: '/User', params:{ userId: service.user.id, userName: service.user.name}}\">\n                  <i class=\"fa fa-user\"></i> {{ service.user.name }}\n              </a>\n          </li>\n          <li class=\"list-group-item \">\n              <a class=\"btn btn-danger btn-sm\" v-link=\"{name: '/SendMessage', params: {userId: service.user.id}}\" >\n                  <i class=\"fa fa-send\"></i> Send Message\n              </a>\n          </li>\n    </ul>\n    <!-- SIDEBAR MENU -->\n    <ul v-if=\"section2\" class=\"list-group\" style=\"padding:0px;\">\n          <li class=\"list-group-item active\">\n              <h5>\n                  <i class=\"fa fa-heart\"></i>\n                  Choosed For You\n              </h5>\n          </li>\n          <li v-for=\"choosed in section2\" track-by=\"$index\" class=\"list-group-item \">\n              <a v-link=\"{name: '/ServicesDetails', params:{serviceId: choosed.id, serviceName: choosed.name}}\">\n                  <span>{{ choosed.name }}</span>\n              </a>\n          </li>\n    </ul>\n    <ul v-if=\"most_voted.length > 0\" class=\"list-group\" style=\"padding:0px;\">\n          <li class=\"list-group-item active\">\n              <h5>\n                  <i class=\"fa fa-star-half-o\"></i>\n                  Most Rated\n              </h5>\n          </li>\n          <li v-for=\"vote in most_voted\" track-by=\"$index\" class=\"list-group-item \">\n              <a v-link=\"{name: '/ServicesDetails', params:{serviceId: vote.id, serviceName: vote.name}}\">\n                  <span class=\"pull-left\">{{ vote.name }}</span>\n                  <span class=\"label label-warning pull-right\"><i class=\"fa fa-star\"></i>{{ vote.vote_sum }}</span>\n                  <div class=\"clearfix\"></div>\n              </a>\n          </li>\n    </ul>\n    <ul v-if=\"most_voted.length > 0\" class=\"list-group\" style=\"padding:0px;\">\n          <li class=\"list-group-item active\">\n              <h5>\n                  <i class=\"fa fa-eye-slash\"></i>\n                  Most Viewd\n              </h5>\n          </li>\n          <li v-for=\"view in most_viewd\" track-by=\"$index\" class=\"list-group-item \">\n              <a v-link=\"{name: '/ServicesDetails', params:{serviceId: view.id, serviceName: view.name}}\">\n                  <span class=\"pull-left\">{{ view.name }}</span>\n                  <span class=\"label label-success pull-right\"><i class=\"fa fa-eye\"></i>{{ view.view_count }}</span>\n                  <div class=\"clearfix\"></div>\n              </a>\n          </li>\n    </ul>\n    <!-- END MENU -->\n</div>\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  if (!module.hot.data) {
    hotAPI.createRecord("_v-70de5e97", module.exports)
  } else {
    hotAPI.update("_v-70de5e97", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}
},{"vue":29,"vue-hot-reload-api":22}],69:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _buy = require('../btns/buy.vue');

var _buy2 = _interopRequireDefault(_buy);

var _fav = require('../btns/fav.vue');

var _fav2 = _interopRequireDefault(_fav);

var _rating = require('../btns/rating.vue');

var _rating2 = _interopRequireDefault(_rating);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    props: ['service'],
    components: {
        buy_btn: _buy2.default,
        rating: _rating2.default,
        fav_btn: _fav2.default
    },
    data: function data() {
        return {};
    },
    filters: {
        limit: function limit(string, value) {
            return string.substring(0, value) + '...';
        }
    }
};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\n<div class=\"thumbnail\">\n    <a v-link=\"{name: '/ServicesDetails', params: { serviceId: service.id, serviceName: service.name }}\">\n        <h4 class=\"text-center\">{{ service.name }}</h4>\n    </a>\n\n    <img v-bind:src=\"service.image\" class=\"img-responsive\">\n    <div class=\"caption\">\n        <div class=\"row\">\n            <div class=\"col-md-6 col-xs-6\">\n                <a v-link=\"{name: '/User', params: {userId: service.user.id, userName: service.user.name}}\">\n                    <h4>{{ service.user.name }}</h4>\n                </a>\n\n            </div>\n            <div class=\"col-md-6 col-xs-6 price text-right\" style=\"margin-top: -10px;\">\n                <h3>\n                    <label class=\"badge\">${{ service.price }}</label>\n                </h3>\n            </div>\n        </div>\n        <div class=\"product-rating\">\n            <!-- Rating run Here -->\n            <div class=\"col-md-12\" v-if=\"service.votes_count > 0\">\n                <div class=\"row\">\n                  <div class=\"col-md-4 col-sm-12 col-xs-12\">\n                      <!-- Number Of Users Whose Rate -->\n                      <span class=\"label label-primary\">\n                          <i class=\"fa fa-user\"></i>\n                          {{ service.votes_count }}\n                      </span>\n                  </div>\n                  <div class=\"col-md-4 col-sm-12 col-xs-12\">\n                      <!-- The Service Rates -->\n                      <span class=\"label label-warning\">\n                          <i class=\"fa fa-star\"></i>\n                          {{ parseInt(service.votes_sum) }}\n                      </span>\n                  </div>\n                  <div class=\"col-md-4 col-sm-12 col-xs-12\">\n\n                      <span class=\"label label-info\">\n                          <!--\n                              Percent =>\n                              [\n                              NOTE This Is The Service Score\n                              (total votes * 100)\n                              =============================================\n                              (number Of rated users * max rate value[ 5 ])\n                              NOTE this is the final score\n                              ]\n                              0/0 => NaN\n                          -->\n                          % {{ parseInt((service.votes_sum * 100) / (service.votes_count * 5)) }}\n                    </span>\n                  </div>\n                </div>\n            </div>\n            <!-- Rating run Here -->\n            <!-- Rating run Here -->\n            <div class=\"col-md-12\" v-else=\"\">\n                <div class=\"row\">\n                  <div class=\"col-md-4 col-sm-12 col-xs-12\">\n                      <!-- Number Of Users Whose Rate -->\n                      <span class=\"label label-primary\">\n                          <i class=\"fa fa-user\"></i>\n                          0\n                      </span>\n                  </div>\n                  <div class=\"col-md-4 col-sm-12 col-xs-12\">\n                      <!-- The Service Rates -->\n                      <span class=\"label label-warning\" style=\"margin-right: 5px;\">\n                          <i class=\"fa fa-star\"></i>\n                          0\n                      </span>\n                  </div>\n                  <div class=\"col-md-4 col-sm-12 col-xs-12\">\n\n                      <span class=\"label label-success\" style=\"margin-right: 5px;\">\n                          <!--\n                              Percent =>\n                              [\n                              NOTE This Is The Service Score\n                              (total votes * 100)\n                              =============================================\n                              (number Of rated users * max rate value[ 5 ])\n                              NOTE this is the final score\n                              ]\n                              0/0 => NaN\n                          -->\n                          % 0\n                    </span>\n                  </div>\n                </div>\n            </div>\n            <!-- Rating run Here -->\n        </div>\n        <br>\n        <div class=\"row\">\n            <div class=\"col-md-12\">\n                <!-- buy Order -->\n                <buy_btn :service=\"service\"></buy_btn>\n                <!-- Favorite -->\n                <fav_btn :service=\"service\"></fav_btn>\n            </div>\n        </div>\n    </div>\n</div>\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  if (!module.hot.data) {
    hotAPI.createRecord("_v-49350e8e", module.exports)
  } else {
    hotAPI.update("_v-49350e8e", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}
},{"../btns/buy.vue":31,"../btns/fav.vue":32,"../btns/rating.vue":33,"vue":29,"vue-hot-reload-api":22}],70:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _SingleServices = require('./SingleServices.vue');

var _SingleServices2 = _interopRequireDefault(_SingleServices);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Spinner = require('vue-strap/dist/vue-strap.min').spinner;

exports.default = {
    components: {
        single_services: _SingleServices2.default,
        spinner: Spinner
    },
    data: function data() {
        return {
            isLoading: false,
            user: '',
            services: [],
            sortKey: '',
            reverse: 1,
            serviceName: '',
            moreServices: true
        };
    },
    ready: function ready() {
        this.$refs.spinner.show();
        this.getUserServices();
    },
    methods: {
        getUserServices: function getUserServices(length) {
            if (length !== undefined) {
                var sendLen = '/' + length;
            } else {
                sendLen = '';
            }
            var url = '/getUserServices/' + this.$route.params.userId + sendLen;
            this.$http.get(url).then(function (res) {
                if (length !== undefined) {
                    if (res.body['services'].length > 0) {
                        // use push if the result to add object in the array
                        // use concat because res.body['services'] return as array
                        this.services = this.services.concat(res.body['services']);
                    } else {
                        this.moreServices = false;
                        alertify.error('No More Services Found');
                    }
                    this.$refs.spinner.hide();
                    this.isLoading = true;
                } else {
                    this.services = res.body['services'];
                    this.user = res.body['user'];
                    this.$refs.spinner.hide();
                    this.isLoading = true;
                }
            }, function (res) {

                alertify.error('There are Some Erros Try Again later');
            });
        },
        sort: function sort(_sort) {
            this.reverse = this.sortKey == _sort ? this.reverse * -1 : 1;
            this.sortKey = _sort;
        },
        showMore: function showMore() {
            this.$refs.spinner.show();
            var length = this.services.length;
            this.getUserServices(length);
        }
    },
    route: {
        canReuse: false // Force reload data
    }
};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\n<navbar></navbar>\n<div class=\"container\">\n    <div class=\"row\">\n        <div class=\"col-md-12\">\n\n            <span v-if=\"isLoading\">\n                <h2 class=\"text-center\">\n                    <i class=\"fa fa-user\"></i> {{ user.name }} Services Section\n                    <br>\n                    <small class=\"text-primary\"><strong><i class=\"fa fa-cart-plus\"></i> {{ services.length }} Service/s</strong></small>\n                </h2>\n                <hr>\n                <div class=\"row\">\n                    <div class=\"col-md-6\">\n                        <div class=\"col-md-11\">\n                            <form class=\"form-horizontal\">\n                                <div class=\"form-group\">\n                                    <label for=\"serviceName\"></label>\n                                    <input type=\"text\" class=\"form-control\" id=\"serviceName\" placeholder=\"Search By  Service name or Service Price\" v-model=\"serviceName\">\n                                </div>\n                            </form>\n                        </div>\n                    </div>\n                    <div class=\"col-md-6 text-right \">\n                        <div class=\"btn-group\">\n                            <button type=\"button\" class=\"btn btn-primary\" @click=\"sort('price')\"><i class=\"fa fa-dollar\"></i>  By Price</button>\n                            <button type=\"button\" class=\"btn btn-success\" @click=\"sort('name')\"><i class=\"fa fa-sort-alpha-asc\"></i> By Name</button>\n                            <button type=\"button\" class=\"btn btn-info\" @click=\"sort('status')\"><i class=\"fa fa-clock-o\"></i>  waiting</button>\n                            <button type=\"button\" class=\"btn btn-danger\" @click=\"sort('id')\"><i class=\"fa fa-sort-numeric-desc\"></i>  By Add Order</button>\n                        </div>\n                    </div>\n\n                </div>\n                <hr>\n                <div class=\"row\">\n                    <span v-if=\"services.length > 0\">\n                        <div class=\"col-sm-3 col-md-3\" v-for=\"service in services | orderBy sortKey reverse | filterBy serviceName in 'name' 'price'\" track-by=\"$index\">\n                            <single_services :service=\"service\"></single_services>\n                        </div>\n                        <div v-if=\"services.length >= 6\">\n                            <div class=\"col-lg-12 btn btn-info\" v-if=\"moreServices\" @click=\"showMore()\">Show More</div>\n                            <div class=\"col-lg-12 alert alert-danger text-center\" v-if=\"!moreServices\">NO More Services</div>\n                            <div class=\"clearfix\"></div>\n                            <br>\n                        </div>\n                    </span>\n                    <span v-else>\n                        <div class=\"alert alert-warning\">\n                            {{ user.name }} Don't have Any Servicess Currently\n                        </div>\n                    </span>\n                </div>\n            </span>\n        </div>\n    </div>\n</div>\n<spinner v-ref:spinner size=\"lg\" fixed text=\"Loading....\"></spinner>\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  if (!module.hot.data) {
    hotAPI.createRecord("_v-6b1be308", module.exports)
  } else {
    hotAPI.update("_v-6b1be308", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}
},{"./SingleServices.vue":69,"vue":29,"vue-hot-reload-api":22,"vue-strap/dist/vue-strap.min":27}]},{},[30]);

//# sourceMappingURL=app.js.map
