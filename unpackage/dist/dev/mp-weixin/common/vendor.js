(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(n);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.then(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  } };


var SYNC_API_RE =
/^\$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      return 1;
    } else {
      return 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}
var protocols = {
  previewImage: previewImage,
  getSystemInfo: {
    returnValue: addSafeAreaInsets },

  getSystemInfoSync: {
    returnValue: addSafeAreaInsets } };


var todos = [
'vibrate'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F ".concat(methodName, "\u6682\u4E0D\u652F\u6301").concat(key));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F \u6682\u4E0D\u652F\u6301".concat(methodName));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      var returnValue = wx[options.name || methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail:\u6682\u4E0D\u652F\u6301 ").concat(name, " \u65B9\u6CD5") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail:服务[' + service + ']不存在' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  if (typeof getUniEmitter === 'function') {
    /* eslint-disable no-undef */
    return getUniEmitter;
  }
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}

Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('onLoad', options);
  return MPPage(options);
};

Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('created', options);
  return MPComponent(options);
};

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
    vueOptions = VueComponent.extendOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail') || !event.detail) {
    event.detail = {};
  }

  if (!('markerId' in event.detail) && 'markerId' in event) {
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor = dataPath ? vm.__get_value(dataPath, context) : context;

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (
          handlerCtx.$options.generic &&
          handlerCtx.$parent &&
          handlerCtx.$parent.$parent)
          {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = handlerCtx.$parent.$parent;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          ret.push(handler.apply(handlerCtx, processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName)));

        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound'];


function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;

      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (!wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      var components = mpInstance.selectAllComponents('.vue-ref');
      components.forEach(function (component) {
        var ref = component.dataset.ref;
        $refs[ref] = component.$vm || component;
      });
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };



  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (args) {
    this.$vm.$mp.query = args; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', args);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (target[name]) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),

/***/ 114:
/*!***********************************************************************!*\
  !*** F:/Projects/vue-dome/维度小程序/weidu/static/images/icon/company.png ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 12:
/*!********************************************!*\
  !*** ./node_modules/vuex/dist/vuex.esm.js ***!
  \********************************************/
/*! exports provided: Store, install, mapState, mapMutations, mapGetters, mapActions, createNamespacedHelpers, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Store", function() { return Store; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "install", function() { return install; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapState", function() { return mapState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapMutations", function() { return mapMutations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapGetters", function() { return mapGetters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapActions", function() { return mapActions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createNamespacedHelpers", function() { return createNamespacedHelpers; });
/**
 * vuex v3.0.1
 * (c) 2017 Evan You
 * @license MIT
 */
var applyMixin = function (Vue) {
  var version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit });
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    var _init = Vue.prototype._init;
    Vue.prototype._init = function (options) {
      if ( options === void 0 ) options = {};

      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit;
      _init.call(this, options);
    };
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit () {
    var options = this.$options;
    // store injection
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
};

var devtoolHook =
  typeof window !== 'undefined' &&
  window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

function devtoolPlugin (store) {
  if (!devtoolHook) { return }

  store._devtoolHook = devtoolHook;

  devtoolHook.emit('vuex:init', store);

  devtoolHook.on('vuex:travel-to-state', function (targetState) {
    store.replaceState(targetState);
  });

  store.subscribe(function (mutation, state) {
    devtoolHook.emit('vuex:mutation', mutation, state);
  });
}

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */
/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */


/**
 * forEach for object
 */
function forEachValue (obj, fn) {
  Object.keys(obj).forEach(function (key) { return fn(obj[key], key); });
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

function isPromise (val) {
  return val && typeof val.then === 'function'
}

function assert (condition, msg) {
  if (!condition) { throw new Error(("[vuex] " + msg)) }
}

var Module = function Module (rawModule, runtime) {
  this.runtime = runtime;
  this._children = Object.create(null);
  this._rawModule = rawModule;
  var rawState = rawModule.state;
  this.state = (typeof rawState === 'function' ? rawState() : rawState) || {};
};

var prototypeAccessors$1 = { namespaced: { configurable: true } };

prototypeAccessors$1.namespaced.get = function () {
  return !!this._rawModule.namespaced
};

Module.prototype.addChild = function addChild (key, module) {
  this._children[key] = module;
};

Module.prototype.removeChild = function removeChild (key) {
  delete this._children[key];
};

Module.prototype.getChild = function getChild (key) {
  return this._children[key]
};

Module.prototype.update = function update (rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;
  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }
  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }
  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};

Module.prototype.forEachChild = function forEachChild (fn) {
  forEachValue(this._children, fn);
};

Module.prototype.forEachGetter = function forEachGetter (fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};

Module.prototype.forEachAction = function forEachAction (fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};

Module.prototype.forEachMutation = function forEachMutation (fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};

Object.defineProperties( Module.prototype, prototypeAccessors$1 );

var ModuleCollection = function ModuleCollection (rawRootModule) {
  // register root module (Vuex.Store options)
  this.register([], rawRootModule, false);
};

ModuleCollection.prototype.get = function get (path) {
  return path.reduce(function (module, key) {
    return module.getChild(key)
  }, this.root)
};

ModuleCollection.prototype.getNamespace = function getNamespace (path) {
  var module = this.root;
  return path.reduce(function (namespace, key) {
    module = module.getChild(key);
    return namespace + (module.namespaced ? key + '/' : '')
  }, '')
};

ModuleCollection.prototype.update = function update$1 (rawRootModule) {
  update([], this.root, rawRootModule);
};

ModuleCollection.prototype.register = function register (path, rawModule, runtime) {
    var this$1 = this;
    if ( runtime === void 0 ) runtime = true;

  if (true) {
    assertRawModule(path, rawModule);
  }

  var newModule = new Module(rawModule, runtime);
  if (path.length === 0) {
    this.root = newModule;
  } else {
    var parent = this.get(path.slice(0, -1));
    parent.addChild(path[path.length - 1], newModule);
  }

  // register nested modules
  if (rawModule.modules) {
    forEachValue(rawModule.modules, function (rawChildModule, key) {
      this$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};

ModuleCollection.prototype.unregister = function unregister (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  if (!parent.getChild(key).runtime) { return }

  parent.removeChild(key);
};

function update (path, targetModule, newModule) {
  if (true) {
    assertRawModule(path, newModule);
  }

  // update target module
  targetModule.update(newModule);

  // update nested modules
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        if (true) {
          console.warn(
            "[vuex] trying to add a new module '" + key + "' on hot reloading, " +
            'manual reload is needed'
          );
        }
        return
      }
      update(
        path.concat(key),
        targetModule.getChild(key),
        newModule.modules[key]
      );
    }
  }
}

var functionAssert = {
  assert: function (value) { return typeof value === 'function'; },
  expected: 'function'
};

var objectAssert = {
  assert: function (value) { return typeof value === 'function' ||
    (typeof value === 'object' && typeof value.handler === 'function'); },
  expected: 'function or object with "handler" function'
};

var assertTypes = {
  getters: functionAssert,
  mutations: functionAssert,
  actions: objectAssert
};

function assertRawModule (path, rawModule) {
  Object.keys(assertTypes).forEach(function (key) {
    if (!rawModule[key]) { return }

    var assertOptions = assertTypes[key];

    forEachValue(rawModule[key], function (value, type) {
      assert(
        assertOptions.assert(value),
        makeAssertionMessage(path, key, type, value, assertOptions.expected)
      );
    });
  });
}

function makeAssertionMessage (path, key, type, value, expected) {
  var buf = key + " should be " + expected + " but \"" + key + "." + type + "\"";
  if (path.length > 0) {
    buf += " in module \"" + (path.join('.')) + "\"";
  }
  buf += " is " + (JSON.stringify(value)) + ".";
  return buf
}

var Vue; // bind on install

var Store = function Store (options) {
  var this$1 = this;
  if ( options === void 0 ) options = {};

  // Auto install if it is not done yet and `window` has `Vue`.
  // To allow users to avoid auto-installation in some cases,
  // this code should be placed here. See #731
  if (!Vue && typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }

  if (true) {
    assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
    assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");
    assert(this instanceof Store, "Store must be called with the new operator.");
  }

  var plugins = options.plugins; if ( plugins === void 0 ) plugins = [];
  var strict = options.strict; if ( strict === void 0 ) strict = false;

  var state = options.state; if ( state === void 0 ) state = {};
  if (typeof state === 'function') {
    state = state() || {};
  }

  // store internal state
  this._committing = false;
  this._actions = Object.create(null);
  this._actionSubscribers = [];
  this._mutations = Object.create(null);
  this._wrappedGetters = Object.create(null);
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = Object.create(null);
  this._subscribers = [];
  this._watcherVM = new Vue();

  // bind commit and dispatch to self
  var store = this;
  var ref = this;
  var dispatch = ref.dispatch;
  var commit = ref.commit;
  this.dispatch = function boundDispatch (type, payload) {
    return dispatch.call(store, type, payload)
  };
  this.commit = function boundCommit (type, payload, options) {
    return commit.call(store, type, payload, options)
  };

  // strict mode
  this.strict = strict;

  // init root module.
  // this also recursively registers all sub-modules
  // and collects all module getters inside this._wrappedGetters
  installModule(this, state, [], this._modules.root);

  // initialize the store vm, which is responsible for the reactivity
  // (also registers _wrappedGetters as computed properties)
  resetStoreVM(this, state);

  // apply plugins
  plugins.forEach(function (plugin) { return plugin(this$1); });

  if (Vue.config.devtools) {
    devtoolPlugin(this);
  }
};

var prototypeAccessors = { state: { configurable: true } };

prototypeAccessors.state.get = function () {
  return this._vm._data.$$state
};

prototypeAccessors.state.set = function (v) {
  if (true) {
    assert(false, "Use store.replaceState() to explicit replace store state.");
  }
};

Store.prototype.commit = function commit (_type, _payload, _options) {
    var this$1 = this;

  // check object-style commit
  var ref = unifyObjectStyle(_type, _payload, _options);
    var type = ref.type;
    var payload = ref.payload;
    var options = ref.options;

  var mutation = { type: type, payload: payload };
  var entry = this._mutations[type];
  if (!entry) {
    if (true) {
      console.error(("[vuex] unknown mutation type: " + type));
    }
    return
  }
  this._withCommit(function () {
    entry.forEach(function commitIterator (handler) {
      handler(payload);
    });
  });
  this._subscribers.forEach(function (sub) { return sub(mutation, this$1.state); });

  if (
     true &&
    options && options.silent
  ) {
    console.warn(
      "[vuex] mutation type: " + type + ". Silent option has been removed. " +
      'Use the filter functionality in the vue-devtools'
    );
  }
};

Store.prototype.dispatch = function dispatch (_type, _payload) {
    var this$1 = this;

  // check object-style dispatch
  var ref = unifyObjectStyle(_type, _payload);
    var type = ref.type;
    var payload = ref.payload;

  var action = { type: type, payload: payload };
  var entry = this._actions[type];
  if (!entry) {
    if (true) {
      console.error(("[vuex] unknown action type: " + type));
    }
    return
  }

  this._actionSubscribers.forEach(function (sub) { return sub(action, this$1.state); });

  return entry.length > 1
    ? Promise.all(entry.map(function (handler) { return handler(payload); }))
    : entry[0](payload)
};

Store.prototype.subscribe = function subscribe (fn) {
  return genericSubscribe(fn, this._subscribers)
};

Store.prototype.subscribeAction = function subscribeAction (fn) {
  return genericSubscribe(fn, this._actionSubscribers)
};

Store.prototype.watch = function watch (getter, cb, options) {
    var this$1 = this;

  if (true) {
    assert(typeof getter === 'function', "store.watch only accepts a function.");
  }
  return this._watcherVM.$watch(function () { return getter(this$1.state, this$1.getters); }, cb, options)
};

Store.prototype.replaceState = function replaceState (state) {
    var this$1 = this;

  this._withCommit(function () {
    this$1._vm._data.$$state = state;
  });
};

Store.prototype.registerModule = function registerModule (path, rawModule, options) {
    if ( options === void 0 ) options = {};

  if (typeof path === 'string') { path = [path]; }

  if (true) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
    assert(path.length > 0, 'cannot register the root module by using registerModule.');
  }

  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path), options.preserveState);
  // reset store to update getters...
  resetStoreVM(this, this.state);
};

Store.prototype.unregisterModule = function unregisterModule (path) {
    var this$1 = this;

  if (typeof path === 'string') { path = [path]; }

  if (true) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  this._modules.unregister(path);
  this._withCommit(function () {
    var parentState = getNestedState(this$1.state, path.slice(0, -1));
    Vue.delete(parentState, path[path.length - 1]);
  });
  resetStore(this);
};

Store.prototype.hotUpdate = function hotUpdate (newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
};

Store.prototype._withCommit = function _withCommit (fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};

Object.defineProperties( Store.prototype, prototypeAccessors );

function genericSubscribe (fn, subs) {
  if (subs.indexOf(fn) < 0) {
    subs.push(fn);
  }
  return function () {
    var i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  }
}

function resetStore (store, hot) {
  store._actions = Object.create(null);
  store._mutations = Object.create(null);
  store._wrappedGetters = Object.create(null);
  store._modulesNamespaceMap = Object.create(null);
  var state = store.state;
  // init all modules
  installModule(store, state, [], store._modules.root, true);
  // reset vm
  resetStoreVM(store, state, hot);
}

function resetStoreVM (store, state, hot) {
  var oldVm = store._vm;

  // bind store public getters
  store.getters = {};
  var wrappedGetters = store._wrappedGetters;
  var computed = {};
  forEachValue(wrappedGetters, function (fn, key) {
    // use computed to leverage its lazy-caching mechanism
    computed[key] = function () { return fn(store); };
    Object.defineProperty(store.getters, key, {
      get: function () { return store._vm[key]; },
      enumerable: true // for local getters
    });
  });

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  var silent = Vue.config.silent;
  Vue.config.silent = true;
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed: computed
  });
  Vue.config.silent = silent;

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(function () {
        oldVm._data.$$state = null;
      });
    }
    Vue.nextTick(function () { return oldVm.$destroy(); });
  }
}

function installModule (store, rootState, path, module, hot) {
  var isRoot = !path.length;
  var namespace = store._modules.getNamespace(path);

  // register in namespace map
  if (module.namespaced) {
    store._modulesNamespaceMap[namespace] = module;
  }

  // set state
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];
    store._withCommit(function () {
      Vue.set(parentState, moduleName, module.state);
    });
  }

  var local = module.context = makeLocalContext(store, namespace, path);

  module.forEachMutation(function (mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });

  module.forEachAction(function (action, key) {
    var type = action.root ? key : namespace + key;
    var handler = action.handler || action;
    registerAction(store, type, handler, local);
  });

  module.forEachGetter(function (getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });

  module.forEachChild(function (child, key) {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}

/**
 * make localized dispatch, commit, getters and state
 * if there is no namespace, just use root ones
 */
function makeLocalContext (store, namespace, path) {
  var noNamespace = namespace === '';

  var local = {
    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if ( true && !store._actions[type]) {
          console.error(("[vuex] unknown local action type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      return store.dispatch(type, payload)
    },

    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if ( true && !store._mutations[type]) {
          console.error(("[vuex] unknown local mutation type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      store.commit(type, payload, options);
    }
  };

  // getters and state object must be gotten lazily
  // because they will be changed by vm update
  Object.defineProperties(local, {
    getters: {
      get: noNamespace
        ? function () { return store.getters; }
        : function () { return makeLocalGetters(store, namespace); }
    },
    state: {
      get: function () { return getNestedState(store.state, path); }
    }
  });

  return local
}

function makeLocalGetters (store, namespace) {
  var gettersProxy = {};

  var splitPos = namespace.length;
  Object.keys(store.getters).forEach(function (type) {
    // skip if the target getter is not match this namespace
    if (type.slice(0, splitPos) !== namespace) { return }

    // extract local getter type
    var localType = type.slice(splitPos);

    // Add a port to the getters proxy.
    // Define as getter property because
    // we do not want to evaluate the getters in this time.
    Object.defineProperty(gettersProxy, localType, {
      get: function () { return store.getters[type]; },
      enumerable: true
    });
  });

  return gettersProxy
}

function registerMutation (store, type, handler, local) {
  var entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler (payload) {
    handler.call(store, local.state, payload);
  });
}

function registerAction (store, type, handler, local) {
  var entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler (payload, cb) {
    var res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload, cb);
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    if (store._devtoolHook) {
      return res.catch(function (err) {
        store._devtoolHook.emit('vuex:error', err);
        throw err
      })
    } else {
      return res
    }
  });
}

function registerGetter (store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    if (true) {
      console.error(("[vuex] duplicate getter key: " + type));
    }
    return
  }
  store._wrappedGetters[type] = function wrappedGetter (store) {
    return rawGetter(
      local.state, // local state
      local.getters, // local getters
      store.state, // root state
      store.getters // root getters
    )
  };
}

function enableStrictMode (store) {
  store._vm.$watch(function () { return this._data.$$state }, function () {
    if (true) {
      assert(store._committing, "Do not mutate vuex store state outside mutation handlers.");
    }
  }, { deep: true, sync: true });
}

function getNestedState (state, path) {
  return path.length
    ? path.reduce(function (state, key) { return state[key]; }, state)
    : state
}

function unifyObjectStyle (type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }

  if (true) {
    assert(typeof type === 'string', ("Expects string as the type, but found " + (typeof type) + "."));
  }

  return { type: type, payload: payload, options: options }
}

function install (_Vue) {
  if (Vue && _Vue === Vue) {
    if (true) {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      );
    }
    return
  }
  Vue = _Vue;
  applyMixin(Vue);
}

var mapState = normalizeNamespace(function (namespace, states) {
  var res = {};
  normalizeMap(states).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedState () {
      var state = this.$store.state;
      var getters = this.$store.getters;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapState', namespace);
        if (!module) {
          return
        }
        state = module.context.state;
        getters = module.context.getters;
      }
      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

var mapMutations = normalizeNamespace(function (namespace, mutations) {
  var res = {};
  normalizeMap(mutations).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedMutation () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      var commit = this.$store.commit;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapMutations', namespace);
        if (!module) {
          return
        }
        commit = module.context.commit;
      }
      return typeof val === 'function'
        ? val.apply(this, [commit].concat(args))
        : commit.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

var mapGetters = normalizeNamespace(function (namespace, getters) {
  var res = {};
  normalizeMap(getters).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    val = namespace + val;
    res[key] = function mappedGetter () {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return
      }
      if ( true && !(val in this.$store.getters)) {
        console.error(("[vuex] unknown getter: " + val));
        return
      }
      return this.$store.getters[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

var mapActions = normalizeNamespace(function (namespace, actions) {
  var res = {};
  normalizeMap(actions).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedAction () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      var dispatch = this.$store.dispatch;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapActions', namespace);
        if (!module) {
          return
        }
        dispatch = module.context.dispatch;
      }
      return typeof val === 'function'
        ? val.apply(this, [dispatch].concat(args))
        : dispatch.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

var createNamespacedHelpers = function (namespace) { return ({
  mapState: mapState.bind(null, namespace),
  mapGetters: mapGetters.bind(null, namespace),
  mapMutations: mapMutations.bind(null, namespace),
  mapActions: mapActions.bind(null, namespace)
}); };

function normalizeMap (map) {
  return Array.isArray(map)
    ? map.map(function (key) { return ({ key: key, val: key }); })
    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
}

function normalizeNamespace (fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map)
  }
}

function getModuleByNamespace (store, helper, namespace) {
  var module = store._modulesNamespaceMap[namespace];
  if ( true && !module) {
    console.error(("[vuex] module namespace not found in " + helper + "(): " + namespace));
  }
  return module
}

var index_esm = {
  Store: Store,
  install: install,
  version: '3.0.1',
  mapState: mapState,
  mapMutations: mapMutations,
  mapGetters: mapGetters,
  mapActions: mapActions,
  createNamespacedHelpers: createNamespacedHelpers
};


/* harmony default export */ __webpack_exports__["default"] = (index_esm);


/***/ }),

/***/ 15:
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 16:
/*!*******************************************************!*\
  !*** F:/Projects/vue-dome/维度小程序/weidu/store/store.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@vue/babel-preset-app/node_modules/@babel/runtime/regenerator */ 17));var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _vuex = _interopRequireDefault(__webpack_require__(/*! vuex */ 12));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}
// import urls from '../static/urls'
// let { addWxuser,create_combo_order,pay_recharge } = urls

_vue.default.use(_vuex.default);var _default =

new _vuex.default.Store({
  state: {
    img_http: 'http://img.youxiniao.net/',
    // img_http:'http://img.youxiniao.net/yxn_1586599337975.jpg',
    img_end: '?imageView2/0/w/450',
    open_id: null,
    userInfo: null, //微信个人信息
    info: null,
    body_style: '',
    body2_style: '',
    nav_top: '',
    header: {},
    name: '',
    order: {},
    call: null //客服信息
  },
  // 同步更改值
  mutations: {
    //查看大图
    onImg: function onImg(state, url) {
      url = url.includes('https') ? url : state.img_http + url;
      console.log(url);
      uni.previewImage({
        urls: [url] });

    },
    //打电话
    onPhone: function onPhone(state, data) {
      uni.makePhoneCall({
        phoneNumber: data //仅为示例
      });
    },
    order_data: function order_data(state, obj) {
      var order = state.order;
      order = _objectSpread({}, order, {}, obj);
      state.order = order;
      console.log('要创建的订单的数据', order);
    },
    init: function init(state, _state) {
      state = Object.assign(state, _state);
      console.log(state);
    },
    openWin: function openWin(state, _ref) {var _state$info;var name = _ref.name,url = _ref.url;
      var id = (_state$info = state.info) === null || _state$info === void 0 ? void 0 : _state$info.id;
      console.log('用户目前的id', id);
      if (!id) {
        uni.switchTab({
          url: '/pages/mine/mine',
          complete: function complete() {
            uni.showToast({
              title: '请先登录',
              icon: 'none' });

          } });

        return;
      }
      state.name = name;
      uni.navigateTo({
        url: url });

    } },

  //异步
  actions: {
    //统一下单
    place_pay: function place_pay(_ref2, data) {return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee() {var state, dispatch, res, _data, timeStamp, nonceStr, prepay_id, paySign;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:state = _ref2.state, dispatch = _ref2.dispatch;
                // data = { uiid:1,open_id:'oAZBL5AQCde90AOebwa-ux84HSAQ',order_id:'35' }
                console.log(data);
                uni.showLoading({
                  title: '支付中' });_context.next = 5;return (

                  dispatch('onRequest', { url: pay_recharge, data: data }));case 5:res = _context.sent;
                console.log(res.data);
                if (res.data.status == 1) {
                  _data = res.data.data;
                  timeStamp = _data.timeStamp, nonceStr = _data.nonce_str, prepay_id = _data.prepay_id, paySign = _data.sign;
                  uni.requestPayment({
                    provider: 'wxpay',
                    timeStamp: timeStamp,
                    nonceStr: nonceStr,
                    package: "prepay_id=".concat(prepay_id),
                    signType: 'HMAC-SHA256',
                    paySign: paySign,
                    success: function success(res) {
                      console.log('success:' + JSON.stringify(res));
                      uni.navigateBack({
                        delta: 4,
                        complete: function complete() {
                          uni.showToast({
                            title: '支付成功' });

                        } });

                    },
                    fail: function fail(err) {
                      console.log('fail:' + JSON.stringify(err));
                      uni.showToast({
                        title: '支付失败',
                        icon: 'none' });

                    } });

                } else {
                  uni.showToast({
                    title: res.data.msg,
                    icon: 'none' });

                }case 8:case "end":return _context.stop();}}}, _callee);}))();
    },
    //创建订单
    onOrder: function onOrder(_ref3) {return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee2() {var state, dispatch, data, res;return _regenerator.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:state = _ref3.state, dispatch = _ref3.dispatch;
                data = state.order;
                data.u_id = state.info.id;

                // data = { u_id:1,nickname:'方洪斌',school_id:1,course_id:2,dorm_id:1,phone:'13717438766',code:'1',start_date:1587696103100,week:'w_4',mail:'1170323376@qq.com' };

                console.log(data);_context2.next = 6;return (
                  dispatch('onRequest', { url: create_combo_order, data: data }));case 6:res = _context2.sent;if (!(
                res.data.status == 1)) {_context2.next = 10;break;}
                console.log('创建订单成功', res.data.data);return _context2.abrupt("return",
                res.data.data);case 10:case "end":return _context2.stop();}}}, _callee2);}))();

    },
    onRequest: function onRequest(_ref4, obj) {var state = _ref4.state;var
      url = obj.url,data = obj.data,method = obj.method;
      return new Promise(function (resolve, reject) {
        uni.request({
          url: url,
          data: data,
          method: method ? method : 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded' },

          success: function success(res) {
            // console.log(res)
            // if(res.data.status != 1){
            // 	uni.showToast({title:'请检查网络是否正常',icon:'none'})
            // }
            resolve(res);
          },
          fail: function fail(err) {
            console.log(err);
            uni.showToast({ title: '请检查网络是否正常', icon: 'none' });
          } });

      });
    },
    //获取openid和微信个人信息后注册并获取保存到后台的个人信息
    onLogin: function onLogin(_ref5, _ref6) {return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee3() {var state, dispatch, open_id, userInfo, nickname, avatar, sex, city, data, res;return _regenerator.default.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:state = _ref5.state, dispatch = _ref5.dispatch;open_id = _ref6.open_id, userInfo = _ref6.userInfo;
                uni.showLoading({ title: '加载中' });
                state.userInfo = userInfo;
                nickname = userInfo.nickName, avatar = userInfo.avatarUrl, sex = userInfo.gender, city = userInfo.city;
                data = { open_id: open_id, nickname: nickname, avatar: avatar, sex: sex, city: city };_context3.next = 8;return (
                  dispatch('onRequest', { url: addWxuser, data: data }));case 8:res = _context3.sent;
                if (res.data.status == 1) {
                  console.log('注册后的个人信息:', res.data.data);
                  state.info = res.data.data;
                  uni.hideLoading();
                }case 10:case "end":return _context3.stop();}}}, _callee3);}))();
    },
    getOpenId: function getOpenId(_ref7) {var state = _ref7.state;
      return new Promise(function (resolve) {
        //云开发初始化
        wx.cloud.init({ raceUser: true });
        //获取openid
        wx.cloud.callFunction({
          name: 'login',
          data: {},
          success: function success(res) {
            var open_id = res.result.openid;
            console.log('openid:', open_id);
            state.open_id = open_id;
            resolve(open_id);
          } });

      });
    },
    getUserInfo: function getUserInfo(_ref8) {var state = _ref8.state;
      return new Promise(function (resolve) {
        uni.getUserInfo({
          success: function success(res) {
            console.log('微信个人信息：', res.userInfo);
            state.userInfo = res.userInfo;
            resolve(res.userInfo);
          } });

      });
    } } });exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 17:
/*!*********************************************************************************************!*\
  !*** ./node_modules/@vue/babel-preset-app/node_modules/@babel/runtime/regenerator/index.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ 18);

/***/ }),

/***/ 18:
/*!************************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime-module.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() {
  return this || (typeof self === "object" && self);
})() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(/*! ./runtime */ 19);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),

/***/ 19:
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() {
    return this || (typeof self === "object" && self);
  })() || Function("return this")()
);


/***/ }),

/***/ 2:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2020 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    {
      if(vm.$scope && vm.$scope.is){
        return vm.$scope.is
      }
    }
    if (vm.$root === vm) {
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  // fixed by xxxxxx (nvue vuex)
  /* eslint-disable no-undef */
  if(typeof SharedObject !== 'undefined'){
    this.id = SharedObject.uid++;
  } else {
    this.id = uid++;
  }
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = typeof SharedObject !== 'undefined' ? SharedObject : {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i++, i)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
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
Watcher.prototype.cleanupDeps = function cleanupDeps () {
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
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);
  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err) {
    console.error(err);
    /* eslint-disable no-undef */
    var app = getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string,number
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onError',
    //Page
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 24:
/*!**********************************************************************!*\
  !*** F:/Projects/vue-dome/维度小程序/weidu/static/images/icon/click2.png ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABHNCSVQICAgIfAhkiAAAAZxJREFUaEPtmLFOwzAQhs9S2XkEZjrxOpAAkSqRTFCJwXkC2Ggn2NoKBK/DBDNPACOdDlmiqKqSXuO7s4nkLh3c8/3f/1/jyAZ6/jE91w8JIHaCKYGUANOBNELOwNnsbt99F8X4i2lo53J2Ao8PtxMDcPnbeZKVdtxZBaOABfB0fzMHY842+s+z0hYMTZ1KvQHc2Owtl58t3YJBaAE4riAQ3gBO4cb8N4WhDsECcIpb/gfrMKoQbIDYECIAMSHEAGJBiALEgBAHCA2hAkBBIACggefTC3vS6dht+LEaQBuEE//XFPEtq+ohB0IVgErCrSPAa17aI18IdYBdIL4Hg4PR6PrDByIBUK5Rrxr/eoRI8YjveVUfUiZsW1cboR3Ev+RVfcwR72pVACjxgLjIqvqcK14FIKR4cYDQ4kUBYogXA4glXgQgpng2QGzxLADiXggkH5UqB9lWAMHnPHVWsA6yxnuhgOJZI7RyZh0CAaZ5aa8o1yTXWQmshPT6el3STZ+9RBLwaSxVkwCknPTdJyXg65xUXUpAyknffX4AfQTKMasMdpQAAAAASUVORK5CYII="

/***/ }),

/***/ 25:
/*!******************************************************************!*\
  !*** F:/Projects/vue-dome/维度小程序/weidu/static/images/site_le.png ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 26:
/*!******************************************************************!*\
  !*** F:/Projects/vue-dome/维度小程序/weidu/static/images/site_ri.png ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 3:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 35:
/*!*******************************************************************!*\
  !*** F:/Projects/vue-dome/维度小程序/weidu/static/images/radian_1.png ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 4:
/*!***************************************************!*\
  !*** F:/Projects/vue-dome/维度小程序/weidu/pages.json ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ 5:
/*!*******************************************************!*\
  !*** ./node_modules/@dcloudio/uni-stat/dist/index.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {var _package = __webpack_require__(/*! ../package.json */ 6);function _createSuper(Derived) {return function () {var Super = _getPrototypeOf(Derived),result;if (_isNativeReflectConstruct()) {var NewTarget = _getPrototypeOf(this).constructor;result = Reflect.construct(Super, arguments, NewTarget);} else {result = Super.apply(this, arguments);}return _possibleConstructorReturn(this, result);};}function _possibleConstructorReturn(self, call) {if (call && (typeof call === "object" || typeof call === "function")) {return call;}return _assertThisInitialized(self);}function _assertThisInitialized(self) {if (self === void 0) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return self;}function _isNativeReflectConstruct() {if (typeof Reflect === "undefined" || !Reflect.construct) return false;if (Reflect.construct.sham) return false;if (typeof Proxy === "function") return true;try {Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));return true;} catch (e) {return false;}}function _getPrototypeOf(o) {_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {return o.__proto__ || Object.getPrototypeOf(o);};return _getPrototypeOf(o);}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function");}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });if (superClass) _setPrototypeOf(subClass, superClass);}function _setPrototypeOf(o, p) {_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {o.__proto__ = p;return o;};return _setPrototypeOf(o, p);}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}

var STAT_VERSION = _package.version;
var STAT_URL = 'https://tongji.dcloud.io/uni/stat';
var STAT_H5_URL = 'https://tongji.dcloud.io/uni/stat.gif';
var PAGE_PVER_TIME = 1800;
var APP_PVER_TIME = 300;
var OPERATING_TIME = 10;

var UUID_KEY = '__DC_STAT_UUID';
var UUID_VALUE = '__DC_UUID_VALUE';

function getUuid() {
  var uuid = '';
  if (getPlatformName() === 'n') {
    try {
      uuid = plus.runtime.getDCloudId();
    } catch (e) {
      uuid = '';
    }
    return uuid;
  }

  try {
    uuid = uni.getStorageSync(UUID_KEY);
  } catch (e) {
    uuid = UUID_VALUE;
  }

  if (!uuid) {
    uuid = Date.now() + '' + Math.floor(Math.random() * 1e7);
    try {
      uni.setStorageSync(UUID_KEY, uuid);
    } catch (e) {
      uni.setStorageSync(UUID_KEY, UUID_VALUE);
    }
  }
  return uuid;
}

var getSgin = function getSgin(statData) {
  var arr = Object.keys(statData);
  var sortArr = arr.sort();
  var sgin = {};
  var sginStr = '';
  for (var i in sortArr) {
    sgin[sortArr[i]] = statData[sortArr[i]];
    sginStr += sortArr[i] + '=' + statData[sortArr[i]] + '&';
  }
  // const options = sginStr.substr(0, sginStr.length - 1)
  // sginStr = sginStr.substr(0, sginStr.length - 1) + '&key=' + STAT_KEY;
  // const si = crypto.createHash('md5').update(sginStr).digest('hex');
  return {
    sign: '',
    options: sginStr.substr(0, sginStr.length - 1) };

};

var getSplicing = function getSplicing(data) {
  var str = '';
  for (var i in data) {
    str += i + '=' + data[i] + '&';
  }
  return str.substr(0, str.length - 1);
};

var getTime = function getTime() {
  return parseInt(new Date().getTime() / 1000);
};

var getPlatformName = function getPlatformName() {
  var platformList = {
    'app-plus': 'n',
    'h5': 'h5',
    'mp-weixin': 'wx',
    'mp-alipay': 'ali',
    'mp-baidu': 'bd',
    'mp-toutiao': 'tt',
    'mp-qq': 'qq' };

  return platformList["mp-weixin"];
};

var getPackName = function getPackName() {
  var packName = '';
  if (getPlatformName() === 'wx' || getPlatformName() === 'qq') {
    // 兼容微信小程序低版本基础库
    if (uni.canIUse('getAccountInfoSync')) {
      packName = uni.getAccountInfoSync().miniProgram.appId || '';
    }
  }
  return packName;
};

var getVersion = function getVersion() {
  return getPlatformName() === 'n' ? plus.runtime.version : '';
};

var getChannel = function getChannel() {
  var platformName = getPlatformName();
  var channel = '';
  if (platformName === 'n') {
    channel = plus.runtime.channel;
  }
  return channel;
};

var getScene = function getScene(options) {
  var platformName = getPlatformName();
  var scene = '';
  if (options) {
    return options;
  }
  if (platformName === 'wx') {
    scene = uni.getLaunchOptionsSync().scene;
  }
  return scene;
};
var First__Visit__Time__KEY = 'First__Visit__Time';
var Last__Visit__Time__KEY = 'Last__Visit__Time';

var getFirstVisitTime = function getFirstVisitTime() {
  var timeStorge = uni.getStorageSync(First__Visit__Time__KEY);
  var time = 0;
  if (timeStorge) {
    time = timeStorge;
  } else {
    time = getTime();
    uni.setStorageSync(First__Visit__Time__KEY, time);
    uni.removeStorageSync(Last__Visit__Time__KEY);
  }
  return time;
};

var getLastVisitTime = function getLastVisitTime() {
  var timeStorge = uni.getStorageSync(Last__Visit__Time__KEY);
  var time = 0;
  if (timeStorge) {
    time = timeStorge;
  } else {
    time = '';
  }
  uni.setStorageSync(Last__Visit__Time__KEY, getTime());
  return time;
};


var PAGE_RESIDENCE_TIME = '__page__residence__time';
var First_Page_residence_time = 0;
var Last_Page_residence_time = 0;


var setPageResidenceTime = function setPageResidenceTime() {
  First_Page_residence_time = getTime();
  if (getPlatformName() === 'n') {
    uni.setStorageSync(PAGE_RESIDENCE_TIME, getTime());
  }
  return First_Page_residence_time;
};

var getPageResidenceTime = function getPageResidenceTime() {
  Last_Page_residence_time = getTime();
  if (getPlatformName() === 'n') {
    First_Page_residence_time = uni.getStorageSync(PAGE_RESIDENCE_TIME);
  }
  return Last_Page_residence_time - First_Page_residence_time;
};
var TOTAL__VISIT__COUNT = 'Total__Visit__Count';
var getTotalVisitCount = function getTotalVisitCount() {
  var timeStorge = uni.getStorageSync(TOTAL__VISIT__COUNT);
  var count = 1;
  if (timeStorge) {
    count = timeStorge;
    count++;
  }
  uni.setStorageSync(TOTAL__VISIT__COUNT, count);
  return count;
};

var GetEncodeURIComponentOptions = function GetEncodeURIComponentOptions(statData) {
  var data = {};
  for (var prop in statData) {
    data[prop] = encodeURIComponent(statData[prop]);
  }
  return data;
};

var Set__First__Time = 0;
var Set__Last__Time = 0;

var getFirstTime = function getFirstTime() {
  var time = new Date().getTime();
  Set__First__Time = time;
  Set__Last__Time = 0;
  return time;
};


var getLastTime = function getLastTime() {
  var time = new Date().getTime();
  Set__Last__Time = time;
  return time;
};


var getResidenceTime = function getResidenceTime(type) {
  var residenceTime = 0;
  if (Set__First__Time !== 0) {
    residenceTime = Set__Last__Time - Set__First__Time;
  }

  residenceTime = parseInt(residenceTime / 1000);
  residenceTime = residenceTime < 1 ? 1 : residenceTime;
  if (type === 'app') {
    var overtime = residenceTime > APP_PVER_TIME ? true : false;
    return {
      residenceTime: residenceTime,
      overtime: overtime };

  }
  if (type === 'page') {
    var _overtime = residenceTime > PAGE_PVER_TIME ? true : false;
    return {
      residenceTime: residenceTime,
      overtime: _overtime };

  }

  return {
    residenceTime: residenceTime };


};

var getRoute = function getRoute() {
  var pages = getCurrentPages();
  var page = pages[pages.length - 1];
  var _self = page.$vm;

  if (getPlatformName() === 'bd') {
    return _self.$mp && _self.$mp.page.is;
  } else {
    return _self.$scope && _self.$scope.route || _self.$mp && _self.$mp.page.route;
  }
};

var getPageRoute = function getPageRoute(self) {
  var pages = getCurrentPages();
  var page = pages[pages.length - 1];
  var _self = page.$vm;
  var query = self._query;
  var str = query && JSON.stringify(query) !== '{}' ? '?' + JSON.stringify(query) : '';
  // clear
  self._query = '';
  if (getPlatformName() === 'bd') {
    return _self.$mp && _self.$mp.page.is + str;
  } else {
    return _self.$scope && _self.$scope.route + str || _self.$mp && _self.$mp.page.route + str;
  }
};

var getPageTypes = function getPageTypes(self) {
  if (self.mpType === 'page' || self.$mp && self.$mp.mpType === 'page' || self.$options.mpType === 'page') {
    return true;
  }
  return false;
};

var calibration = function calibration(eventName, options) {
  //  login 、 share 、pay_success 、pay_fail 、register 、title
  if (!eventName) {
    console.error("uni.report \u7F3A\u5C11 [eventName] \u53C2\u6570");
    return true;
  }
  if (typeof eventName !== 'string') {
    console.error("uni.report [eventName] \u53C2\u6570\u7C7B\u578B\u9519\u8BEF,\u53EA\u80FD\u4E3A String \u7C7B\u578B");
    return true;
  }
  if (eventName.length > 255) {
    console.error("uni.report [eventName] \u53C2\u6570\u957F\u5EA6\u4E0D\u80FD\u5927\u4E8E 255");
    return true;
  }

  if (typeof options !== 'string' && typeof options !== 'object') {
    console.error("uni.report [options] \u53C2\u6570\u7C7B\u578B\u9519\u8BEF,\u53EA\u80FD\u4E3A String \u6216 Object \u7C7B\u578B");
    return true;
  }

  if (typeof options === 'string' && options.length > 255) {
    console.error("uni.report [options] \u53C2\u6570\u957F\u5EA6\u4E0D\u80FD\u5927\u4E8E 255");
    return true;
  }

  if (eventName === 'title' && typeof options !== 'string') {
    console.error('uni.report [eventName] 参数为 title 时，[options] 参数只能为 String 类型');
    return true;
  }
};

var PagesJson = __webpack_require__(/*! uni-pages?{"type":"style"} */ 7).default;
var statConfig = __webpack_require__(/*! uni-stat-config */ 8).default || __webpack_require__(/*! uni-stat-config */ 8);

var resultOptions = uni.getSystemInfoSync();var

Util = /*#__PURE__*/function () {
  function Util() {_classCallCheck(this, Util);
    this.self = '';
    this._retry = 0;
    this._platform = '';
    this._query = {};
    this._navigationBarTitle = {
      config: '',
      page: '',
      report: '',
      lt: '' };

    this._operatingTime = 0;
    this._reportingRequestData = {
      '1': [],
      '11': [] };

    this.__prevent_triggering = false;

    this.__licationHide = false;
    this.__licationShow = false;
    this._lastPageRoute = '';
    this.statData = {
      uuid: getUuid(),
      ut: getPlatformName(),
      mpn: getPackName(),
      ak: statConfig.appid,
      usv: STAT_VERSION,
      v: getVersion(),
      ch: getChannel(),
      cn: '',
      pn: '',
      ct: '',
      t: getTime(),
      tt: '',
      p: resultOptions.platform === 'android' ? 'a' : 'i',
      brand: resultOptions.brand || '',
      md: resultOptions.model,
      sv: resultOptions.system.replace(/(Android|iOS)\s/, ''),
      mpsdk: resultOptions.SDKVersion || '',
      mpv: resultOptions.version || '',
      lang: resultOptions.language,
      pr: resultOptions.pixelRatio,
      ww: resultOptions.windowWidth,
      wh: resultOptions.windowHeight,
      sw: resultOptions.screenWidth,
      sh: resultOptions.screenHeight };


  }_createClass(Util, [{ key: "_applicationShow", value: function _applicationShow()

    {
      if (this.__licationHide) {
        getLastTime();
        var time = getResidenceTime('app');
        if (time.overtime) {
          var options = {
            path: this._lastPageRoute,
            scene: this.statData.sc };

          this._sendReportRequest(options);
        }
        this.__licationHide = false;
      }
    } }, { key: "_applicationHide", value: function _applicationHide(

    self, type) {

      this.__licationHide = true;
      getLastTime();
      var time = getResidenceTime();
      getFirstTime();
      var route = getPageRoute(this);
      this._sendHideRequest({
        urlref: route,
        urlref_ts: time.residenceTime },
      type);
    } }, { key: "_pageShow", value: function _pageShow()

    {
      var route = getPageRoute(this);
      var routepath = getRoute();
      this._navigationBarTitle.config = PagesJson &&
      PagesJson.pages[routepath] &&
      PagesJson.pages[routepath].titleNView &&
      PagesJson.pages[routepath].titleNView.titleText ||
      PagesJson &&
      PagesJson.pages[routepath] &&
      PagesJson.pages[routepath].navigationBarTitleText || '';

      if (this.__licationShow) {
        getFirstTime();
        this.__licationShow = false;
        // console.log('这是 onLauch 之后执行的第一次 pageShow ，为下次记录时间做准备');
        this._lastPageRoute = route;
        return;
      }

      getLastTime();
      this._lastPageRoute = route;
      var time = getResidenceTime('page');
      if (time.overtime) {
        var options = {
          path: this._lastPageRoute,
          scene: this.statData.sc };

        this._sendReportRequest(options);
      }
      getFirstTime();
    } }, { key: "_pageHide", value: function _pageHide()

    {
      if (!this.__licationHide) {
        getLastTime();
        var time = getResidenceTime('page');
        this._sendPageRequest({
          url: this._lastPageRoute,
          urlref: this._lastPageRoute,
          urlref_ts: time.residenceTime });

        this._navigationBarTitle = {
          config: '',
          page: '',
          report: '',
          lt: '' };

        return;
      }
    } }, { key: "_login", value: function _login()

    {
      this._sendEventRequest({
        key: 'login' },
      0);
    } }, { key: "_share", value: function _share()

    {
      this._sendEventRequest({
        key: 'share' },
      0);
    } }, { key: "_payment", value: function _payment(
    key) {
      this._sendEventRequest({
        key: key },
      0);
    } }, { key: "_sendReportRequest", value: function _sendReportRequest(
    options) {

      this._navigationBarTitle.lt = '1';
      var query = options.query && JSON.stringify(options.query) !== '{}' ? '?' + JSON.stringify(options.query) : '';
      this.statData.lt = '1';
      this.statData.url = options.path + query || '';
      this.statData.t = getTime();
      this.statData.sc = getScene(options.scene);
      this.statData.fvts = getFirstVisitTime();
      this.statData.lvts = getLastVisitTime();
      this.statData.tvc = getTotalVisitCount();
      if (getPlatformName() === 'n') {
        this.getProperty();
      } else {
        this.getNetworkInfo();
      }
    } }, { key: "_sendPageRequest", value: function _sendPageRequest(

    opt) {var

      url =


      opt.url,urlref = opt.urlref,urlref_ts = opt.urlref_ts;
      this._navigationBarTitle.lt = '11';
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '11',
        ut: this.statData.ut,
        url: url,
        tt: this.statData.tt,
        urlref: urlref,
        urlref_ts: urlref_ts,
        ch: this.statData.ch,
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p };

      this.request(options);
    } }, { key: "_sendHideRequest", value: function _sendHideRequest(

    opt, type) {var

      urlref =

      opt.urlref,urlref_ts = opt.urlref_ts;
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '3',
        ut: this.statData.ut,
        urlref: urlref,
        urlref_ts: urlref_ts,
        ch: this.statData.ch,
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p };

      this.request(options, type);
    } }, { key: "_sendEventRequest", value: function _sendEventRequest()



    {var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},_ref$key = _ref.key,key = _ref$key === void 0 ? '' : _ref$key,_ref$value = _ref.value,value = _ref$value === void 0 ? "" : _ref$value;
      var route = this._lastPageRoute;
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '21',
        ut: this.statData.ut,
        url: route,
        ch: this.statData.ch,
        e_n: key,
        e_v: typeof value === 'object' ? JSON.stringify(value) : value.toString(),
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p };

      this.request(options);
    } }, { key: "getNetworkInfo", value: function getNetworkInfo()

    {var _this = this;
      uni.getNetworkType({
        success: function success(result) {
          _this.statData.net = result.networkType;
          _this.getLocation();
        } });

    } }, { key: "getProperty", value: function getProperty()

    {var _this2 = this;
      plus.runtime.getProperty(plus.runtime.appid, function (wgtinfo) {
        _this2.statData.v = wgtinfo.version || '';
        _this2.getNetworkInfo();
      });
    } }, { key: "getLocation", value: function getLocation()

    {var _this3 = this;
      if (statConfig.getLocation) {
        uni.getLocation({
          type: 'wgs84',
          geocode: true,
          success: function success(result) {
            if (result.address) {
              _this3.statData.cn = result.address.country;
              _this3.statData.pn = result.address.province;
              _this3.statData.ct = result.address.city;
            }

            _this3.statData.lat = result.latitude;
            _this3.statData.lng = result.longitude;
            _this3.request(_this3.statData);
          } });

      } else {
        this.statData.lat = 0;
        this.statData.lng = 0;
        this.request(this.statData);
      }
    } }, { key: "request", value: function request(

    data, type) {var _this4 = this;
      var time = getTime();
      var title = this._navigationBarTitle;
      data.ttn = title.page;
      data.ttpj = title.config;
      data.ttc = title.report;

      var requestData = this._reportingRequestData;
      if (getPlatformName() === 'n') {
        requestData = uni.getStorageSync('__UNI__STAT__DATA') || {};
      }
      if (!requestData[data.lt]) {
        requestData[data.lt] = [];
      }
      requestData[data.lt].push(data);

      if (getPlatformName() === 'n') {
        uni.setStorageSync('__UNI__STAT__DATA', requestData);
      }
      if (getPageResidenceTime() < OPERATING_TIME && !type) {
        return;
      }
      var uniStatData = this._reportingRequestData;
      if (getPlatformName() === 'n') {
        uniStatData = uni.getStorageSync('__UNI__STAT__DATA');
      }
      // 时间超过，重新获取时间戳
      setPageResidenceTime();
      var firstArr = [];
      var contentArr = [];
      var lastArr = [];var _loop = function _loop(

      i) {
        var rd = uniStatData[i];
        rd.forEach(function (elm) {
          var newData = getSplicing(elm);
          if (i === 0) {
            firstArr.push(newData);
          } else if (i === 3) {
            lastArr.push(newData);
          } else {
            contentArr.push(newData);
          }
        });};for (var i in uniStatData) {_loop(i);
      }

      firstArr.push.apply(firstArr, contentArr.concat(lastArr));
      var optionsData = {
        usv: STAT_VERSION, //统计 SDK 版本号
        t: time, //发送请求时的时间戮
        requests: JSON.stringify(firstArr) };


      this._reportingRequestData = {};
      if (getPlatformName() === 'n') {
        uni.removeStorageSync('__UNI__STAT__DATA');
      }

      if (data.ut === 'h5') {
        this.imageRequest(optionsData);
        return;
      }

      if (getPlatformName() === 'n' && this.statData.p === 'a') {
        setTimeout(function () {
          _this4._sendRequest(optionsData);
        }, 200);
        return;
      }
      this._sendRequest(optionsData);
    } }, { key: "_sendRequest", value: function _sendRequest(
    optionsData) {var _this5 = this;
      uni.request({
        url: STAT_URL,
        method: 'POST',
        // header: {
        //   'content-type': 'application/json' // 默认值
        // },
        data: optionsData,
        success: function success() {
          // if (process.env.NODE_ENV === 'development') {
          //   console.log('stat request success');
          // }
        },
        fail: function fail(e) {
          if (++_this5._retry < 3) {
            setTimeout(function () {
              _this5._sendRequest(optionsData);
            }, 1000);
          }
        } });

    }
    /**
       * h5 请求
       */ }, { key: "imageRequest", value: function imageRequest(
    data) {
      var image = new Image();
      var options = getSgin(GetEncodeURIComponentOptions(data)).options;
      image.src = STAT_H5_URL + '?' + options;
    } }, { key: "sendEvent", value: function sendEvent(

    key, value) {
      // 校验 type 参数
      if (calibration(key, value)) return;

      if (key === 'title') {
        this._navigationBarTitle.report = value;
        return;
      }
      this._sendEventRequest({
        key: key,
        value: typeof value === 'object' ? JSON.stringify(value) : value },
      1);
    } }]);return Util;}();var



Stat = /*#__PURE__*/function (_Util) {_inherits(Stat, _Util);var _super = _createSuper(Stat);_createClass(Stat, null, [{ key: "getInstance", value: function getInstance()
    {
      if (!this.instance) {
        this.instance = new Stat();
      }
      return this.instance;
    } }]);
  function Stat() {var _this6;_classCallCheck(this, Stat);
    _this6 = _super.call(this);
    _this6.instance = null;
    // 注册拦截器
    if (typeof uni.addInterceptor === 'function' && "development" !== 'development') {
      _this6.addInterceptorInit();
      _this6.interceptLogin();
      _this6.interceptShare(true);
      _this6.interceptRequestPayment();
    }return _this6;
  }_createClass(Stat, [{ key: "addInterceptorInit", value: function addInterceptorInit()

    {
      var self = this;
      uni.addInterceptor('setNavigationBarTitle', {
        invoke: function invoke(args) {
          self._navigationBarTitle.page = args.title;
        } });

    } }, { key: "interceptLogin", value: function interceptLogin()

    {
      var self = this;
      uni.addInterceptor('login', {
        complete: function complete() {
          self._login();
        } });

    } }, { key: "interceptShare", value: function interceptShare(

    type) {
      var self = this;
      if (!type) {
        self._share();
        return;
      }
      uni.addInterceptor('share', {
        success: function success() {
          self._share();
        },
        fail: function fail() {
          self._share();
        } });

    } }, { key: "interceptRequestPayment", value: function interceptRequestPayment()

    {
      var self = this;
      uni.addInterceptor('requestPayment', {
        success: function success() {
          self._payment('pay_success');
        },
        fail: function fail() {
          self._payment('pay_fail');
        } });

    } }, { key: "report", value: function report(

    options, self) {
      this.self = self;
      // if (process.env.NODE_ENV === 'development') {
      //   console.log('report init');
      // }
      setPageResidenceTime();
      this.__licationShow = true;
      this._sendReportRequest(options, true);
    } }, { key: "load", value: function load(

    options, self) {
      if (!self.$scope && !self.$mp) {
        var page = getCurrentPages();
        self.$scope = page[page.length - 1];
      }
      this.self = self;
      this._query = options;
    } }, { key: "show", value: function show(

    self) {
      this.self = self;
      if (getPageTypes(self)) {
        this._pageShow(self);
      } else {
        this._applicationShow(self);
      }
    } }, { key: "ready", value: function ready(

    self) {
      // this.self = self;
      // if (getPageTypes(self)) {
      //   this._pageShow(self);
      // }
    } }, { key: "hide", value: function hide(
    self) {
      this.self = self;
      if (getPageTypes(self)) {
        this._pageHide(self);
      } else {
        this._applicationHide(self, true);
      }
    } }, { key: "error", value: function error(
    em) {
      if (this._platform === 'devtools') {
        if (true) {
          console.info('当前运行环境为开发者工具，不上报数据。');
        }
        // return;
      }
      var emVal = '';
      if (!em.message) {
        emVal = JSON.stringify(em);
      } else {
        emVal = em.stack;
      }
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '31',
        ut: this.statData.ut,
        ch: this.statData.ch,
        mpsdk: this.statData.mpsdk,
        mpv: this.statData.mpv,
        v: this.statData.v,
        em: emVal,
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p };

      this.request(options);
    } }]);return Stat;}(Util);


var stat = Stat.getInstance();
var isHide = false;
var lifecycle = {
  onLaunch: function onLaunch(options) {
    stat.report(options, this);
  },
  onReady: function onReady() {
    stat.ready(this);
  },
  onLoad: function onLoad(options) {
    stat.load(options, this);
    // 重写分享，获取分享上报事件
    if (this.$scope && this.$scope.onShareAppMessage) {
      var oldShareAppMessage = this.$scope.onShareAppMessage;
      this.$scope.onShareAppMessage = function (options) {
        stat.interceptShare(false);
        return oldShareAppMessage.call(this, options);
      };
    }
  },
  onShow: function onShow() {
    isHide = false;
    stat.show(this);
  },
  onHide: function onHide() {
    isHide = true;
    stat.hide(this);
  },
  onUnload: function onUnload() {
    if (isHide) {
      isHide = false;
      return;
    }
    stat.hide(this);
  },
  onError: function onError(e) {
    stat.error(e);
  } };


function main() {
  if (true) {
    uni.report = function (type, options) {};
  } else { var Vue; }
}

main();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 52:
/*!*******************************************************************!*\
  !*** F:/Projects/vue-dome/维度小程序/weidu/static/images/head_img.png ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 53:
/*!*********************************************************************!*\
  !*** F:/Projects/vue-dome/维度小程序/weidu/static/images/icon/wedoo.png ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 54:
/*!******************************************************************!*\
  !*** F:/Projects/vue-dome/维度小程序/weidu/static/images/show_le.png ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/static/images/show_le.png";

/***/ }),

/***/ 55:
/*!******************************************************************!*\
  !*** F:/Projects/vue-dome/维度小程序/weidu/static/images/show_ri.png ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/static/images/show_ri.png";

/***/ }),

/***/ 56:
/*!****************************************************************!*\
  !*** F:/Projects/vue-dome/维度小程序/weidu/static/images/refer.png ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 57:
/*!************************************************************************!*\
  !*** F:/Projects/vue-dome/维度小程序/weidu/static/images/icon/VIP_icon.png ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 6:
/*!******************************************************!*\
  !*** ./node_modules/@dcloudio/uni-stat/package.json ***!
  \******************************************************/
/*! exports provided: _from, _id, _inBundle, _integrity, _location, _phantomChildren, _requested, _requiredBy, _resolved, _shasum, _spec, _where, author, bugs, bundleDependencies, deprecated, description, devDependencies, files, gitHead, homepage, license, main, name, repository, scripts, version, default */
/***/ (function(module) {

module.exports = {"_from":"@dcloudio/uni-stat@next","_id":"@dcloudio/uni-stat@2.0.0-26920200421003","_inBundle":false,"_integrity":"sha512-Aa6R66ZF2pIK9XB+Y7QbSW2GficyNTcdT7fnxFw5gY1eeY+u8oT7rTpZrL1W2qKbqf2FbsNPDjZrg1nRj6RxkQ==","_location":"/@dcloudio/uni-stat","_phantomChildren":{},"_requested":{"type":"tag","registry":true,"raw":"@dcloudio/uni-stat@next","name":"@dcloudio/uni-stat","escapedName":"@dcloudio%2funi-stat","scope":"@dcloudio","rawSpec":"next","saveSpec":null,"fetchSpec":"next"},"_requiredBy":["#USER","/","/@dcloudio/vue-cli-plugin-uni"],"_resolved":"https://registry.npmjs.org/@dcloudio/uni-stat/-/uni-stat-2.0.0-26920200421003.tgz","_shasum":"c08ebc00afa71edd9ed388fc4bf411e42d458ac5","_spec":"@dcloudio/uni-stat@next","_where":"/Users/guoshengqiang/Documents/dcloud-plugins/release/uniapp-cli","author":"","bugs":{"url":"https://github.com/dcloudio/uni-app/issues"},"bundleDependencies":false,"deprecated":false,"description":"","devDependencies":{"@babel/core":"^7.5.5","@babel/preset-env":"^7.5.5","eslint":"^6.1.0","rollup":"^1.19.3","rollup-plugin-babel":"^4.3.3","rollup-plugin-clear":"^2.0.7","rollup-plugin-commonjs":"^10.0.2","rollup-plugin-copy":"^3.1.0","rollup-plugin-eslint":"^7.0.0","rollup-plugin-json":"^4.0.0","rollup-plugin-node-resolve":"^5.2.0","rollup-plugin-replace":"^2.2.0","rollup-plugin-uglify":"^6.0.2"},"files":["dist","package.json","LICENSE"],"gitHead":"a7035ab7f2a83dbc2c75090de34f68e5a01224a7","homepage":"https://github.com/dcloudio/uni-app#readme","license":"Apache-2.0","main":"dist/index.js","name":"@dcloudio/uni-stat","repository":{"type":"git","url":"git+https://github.com/dcloudio/uni-app.git","directory":"packages/uni-stat"},"scripts":{"build":"NODE_ENV=production rollup -c rollup.config.js","dev":"NODE_ENV=development rollup -w -c rollup.config.js"},"version":"2.0.0-26920200421003"};

/***/ }),

/***/ 7:
/*!********************************************************************!*\
  !*** F:/Projects/vue-dome/维度小程序/weidu/pages.json?{"type":"style"} ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = { "pages": { "pages/index/index": { "navigationStyle": "custom" }, "pages/course_list/course_list": { "navigationBarTitleText": "课程列表" }, "pages/show/show": { "navigationBarTitleText": "优秀作品" }, "pages/mine/mine": { "navigationBarTitleText": "我的首页" }, "pages/index/index_details/index_details": { "navigationBarTitleText": "活动详情" }, "pages/reservation/reservation": { "navigationBarTitleText": "预约报名" }, "pages/index/shop/shop": { "navigationBarTitleText": "店面介绍" }, "pages/course_list/Details_course/Details_course": { "navigationBarTitleText": "课程详情" }, "pages/show/details/details": { "navigationBarTitleText": "作品详情" } }, "globalStyle": { "navigationBarTextStyle": "white", "navigationBarBackgroundColor": "#7f8971", "backgroundColor": "#F8F8F8" } };exports.default = _default;

/***/ }),

/***/ 8:
/*!*******************************************************************!*\
  !*** F:/Projects/vue-dome/维度小程序/weidu/pages.json?{"type":"stat"} ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = { "appid": "" };exports.default = _default;

/***/ }),

/***/ 98:
/*!*****************************************************************!*\
  !*** F:/Projects/vue-dome/维度小程序/weidu/static/images/string.png ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 99:
/*!********************************************************************!*\
  !*** F:/Projects/vue-dome/维度小程序/weidu/static/images/recommend.png ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map