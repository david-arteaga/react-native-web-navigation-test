This project shows how react-native can work correctly in web.
The only problem I have found is that I get this error when running the web production build:
```
createNavigator.js:4 Uncaught TypeError: Cannot read property 'default' of undefined
    at new f (createNavigator.js:4)
    at lo (react-dom.production.min.js:2827)
    at Ci (react-dom.production.min.js:3759)
    at Li (react-dom.production.min.js:3960)
    at Ya (react-dom.production.min.js:5514)
    at Xa (react-dom.production.min.js:5536)
    at Rs (react-dom.production.min.js:5958)
    at ks (react-dom.production.min.js:5925)
    at Es (react-dom.production.min.js:5860)
    at Ja (react-dom.production.min.js:5787)
```


# Un-minified code
When I disable minification in the production build (`ret.optimization.minimize = false;` in `config-overrides.js`), this is the code that gets generated, specifically for the `createNavigator.js` file.

There is a variable, `_getPrototypeOf2`, that gets declared first with a correct value, but then gets redeclared `var _getPrototypeOf2;` and is not assigned a new value.

This causes the error further down in the function.
```js
(function(module, exports, __webpack_require__) {

    var _interopRequireDefault = __webpack_require__(3);
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = void 0;
    var _extends2 = _interopRequireDefault(__webpack_require__(23));
    var _classCallCheck2 = _interopRequireDefault(__webpack_require__(17));
    var _createClass2 = _interopRequireDefault(__webpack_require__(18));
    var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(19));

    // This is the original declaration of the variable
    // This declaration has a correct value that works without errors
    var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(20));

    var _inherits2 = _interopRequireDefault(__webpack_require__(21));
    var _react = _interopRequireDefault(__webpack_require__(1));
    var _invariant = _interopRequireDefault(__webpack_require__(46));
    var _jsxFileName = "/Users/brentvatne/coding/react-navigation-core/src/navigators/createNavigator.js";
    function createNavigator(NavigatorView, router, navigationConfig) {
        var Navigator = function(_React$Component) {
            (0,
            _inherits2.default)(Navigator, _React$Component);
            function Navigator() {
                // This is the re-declaration of the variable
                // If you remove this line in the generated js bundle, the app runs without errors
                // If you assign the value of the original _getPrototypeOf2 declaration the app also works (if you do this you have to rename the variable from the first declaration)
                var _getPrototypeOf2;
                var _this;
                (0,
                _classCallCheck2.default)(this, Navigator);
                for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                    args[_key] = arguments[_key];
                }

                // It fails on this line, when evaluating _getPrototypeOf2.default
                _this = (0,
                _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0,
                _getPrototypeOf2.default)(Navigator)).call.apply(_getPrototypeOf2, [this].concat(args)));
                _this.state = {
                    descriptors: {},
                    screenProps: _this.props.screenProps
                };
                return _this;
            }
// ...
```

# Minified code

When building the minified js bundle, a similar modification allows the app to work.
The first declaration of `var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(20));` is minified to `l = (r(n(20)), r(n(21)))`. (Since the value of that require is never user, the declaration is omitted, but the call to require is still executed).

The second declaration of the variable (`var _getPrototypeOf2;`) is converted to `var e, t;`, where `e` is used as `_getPrototypeOf2`;

If you modify `var e, t;` to `var e=any_var,t;` and `l = (r(n(20)), r(n(21)))` to `any_var = r(n(20)), l = r(n(21)),` the app works fine. What this does is basically give a value to the variable that was declared without a value.
