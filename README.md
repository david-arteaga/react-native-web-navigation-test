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

    "use strict";
    var _interopRequireDefault = __webpack_require__(3);
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = void 0;
    var _extends2 = _interopRequireDefault(__webpack_require__(22));
    var _classCallCheck2 = _interopRequireDefault(__webpack_require__(16));
    var _createClass2 = _interopRequireDefault(__webpack_require__(17));
    var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(18));

    // This is the original declaration of the variable
    // This declaration has a correct value that works without errors
    var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(19));

    var _inherits2 = _interopRequireDefault(__webpack_require__(20));
    var _react = _interopRequireDefault(__webpack_require__(1));
    var _invariant = _interopRequireDefault(__webpack_require__(45));
    var _jsxFileName = "/Users/brentvatne/coding/react-navigation-core/src/navigators/createNavigator.js";
    function createNavigator(NavigatorView, router, navigationConfig) {
        var Navigator = function(_React$Component) {
            (0,
            _inherits2.default)(Navigator, _React$Component);
            function Navigator() {
                // This is the re-declaration of the variable
                // If you remove this line in the generated js bundle, the app runs without errors
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
            (0,
            _createClass2.default)(Navigator, [{
                key: "render",
                value: function render() {
                    return _react.default.createElement(NavigatorView, (0,
                    _extends2.default)({}, this.props, {
                        screenProps: this.state.screenProps,
                        navigation: this.props.navigation,
                        navigationConfig: navigationConfig,
                        descriptors: this.state.descriptors,
                        __source: {
                            fileName: _jsxFileName,
                            lineNumber: 61
                        }
                    }));
                }
            }], [{
                key: "getDerivedStateFromProps",
                value: function getDerivedStateFromProps(nextProps, prevState) {
                    var prevDescriptors = prevState.descriptors;
                    var navigation = nextProps.navigation
                      , screenProps = nextProps.screenProps;
                    (0,
                    _invariant.default)(navigation != null, 'The navigation prop is missing for this navigator. In react-navigation 3 you must set up your app container directly. More info: https://reactnavigation.org/docs/en/app-containers.html');
                    var state = navigation.state;
                    var routes = state.routes;
                    if (typeof routes === 'undefined') {
                        throw new TypeError('No "routes" found in navigation state. Did you try to pass the navigation prop of a React component to a Navigator child? See https://reactnavigation.org/docs/en/custom-navigators.html#navigator-navigation-prop');
                    }
                    var descriptors = {};
                    routes.forEach(function(route) {
                        if (prevDescriptors && prevDescriptors[route.key] && route === prevDescriptors[route.key].state && screenProps === prevState.screenProps) {
                            descriptors[route.key] = prevDescriptors[route.key];
                            return;
                        }
                        var getComponent = router.getComponentForRouteName.bind(null, route.routeName);
                        var childNavigation = navigation.getChildNavigation(route.key);
                        var options = router.getScreenOptions(childNavigation, screenProps);
                        descriptors[route.key] = {
                            key: route.key,
                            getComponent: getComponent,
                            options: options,
                            state: route,
                            navigation: childNavigation
                        };
                    });
                    return {
                        descriptors: descriptors,
                        screenProps: screenProps
                    };
                }
            }]);
            return Navigator;
        }(_react.default.Component);
        Navigator.router = router;
        Navigator.navigationOptions = navigationConfig.navigationOptions;
        return Navigator;
    }
    var _default = createNavigator;
    exports.default = _default;

    /***/
}
```
