/**
 * Created by LamDo on 7/3/15.
 */

MimiJS = (function () {
    'use strict';
    var resources = {
        controller: {},
        controllerDependencies: {},

        routes: [],
        mode: null,
        root: '/',
        config: function (options) {
            this.mode = options && options.mode && options.mode == 'history'
            && !!(history.pushState) ? 'history' : 'hash';
            this.root = options && options.root ? '/' + this.clearSlashes(options.root) + '/' : '/';
            return this;
        },
        getFragment: function () {
            var fragment = '';
            if (this.mode === 'history') {
                fragment = this.clearSlashes(decodeURI(location.pathname + location.search));
                fragment = fragment.replace(/\?(.*)$/, '');
                fragment = this.root != '/' ? fragment.replace(this.root, '') : fragment;
            }
            else {
                var match = window.location.href.match(/#(.*)$/);
                fragment = match ? match[1] : '';
            }
            return this.clearSlashes(fragment);
        },
        clearSlashes: function (path) {
            return path.toString().replace(/\/$/, '').replace(/^\//, '');
        },
        add: function (re, handler) {
            if (typeof re == 'function') {
                handler = re;
                re = '';
            }
            this.routes.push({re: re, handler: handler});
            return this;
        },
        remove: function (param) {
            for (var i = 0, r; i < this.routes.length, r = this.routes[i]; i++) {
                if (r.handler === param || r.re.toString() === param.toString()) {
                    this.routes.splice(i, 1);
                    return this;
                }
            }
            return this;
        },
        flush: function () {
            this.routes = [];
            this.mode = null;
            this.root = '/';
            return this;
        },

        check: function (hash) {
            var keys, match, routeParams;
            for (var i = 0, max = this.routes.length; i < max; i++) {
                routeParams = {}
                keys = this.routes[i].path.match(/:([^\/]+)/g);
                match = hash.match(new RegExp(this.routes[i].path.replace(/:([^\/]+)/g, "([^\/]*)")));
                if (match) {
                    match.shift();
                    match.forEach(function (value, i) {
                        routeParams[keys[i].replace(":", "")] = value;
                    });
                    this.routes[i].handler.call({}, routeParams);
                    return this;
                }
            }
            return this;
        },

        listen: function () {
            var self = this;
            var current = self.getFragment();
            var fn = function () {
                if (current !== self.getFragment()) {
                    current = self.getFragment();
                    self.check(current);
                }
            }
            clearInterval(this.interval);
            this.interval = setInterval(fn, 50);
            return this;
        },
        navigate: function (path) {
            path = path ? path : '';
            if (this.mode === 'history') {
                history.pushState(null, null, this.root + this.clearSlashes(path));
            }
            else {
                window.location.href.match(/#(.*)$/);
                window.location.href = window.location.href.replace(/#(.*)$/, '') + '#' + path;
            }
            return this;
        }
    };

    var api = {
        routes: function (route, controller) {
            resources.routes.push({'path': route, 'handler': controller});
        },

        controller: function (controller, handler) {
            var last_index = handler.length - 1;
            var dependencies = handler.slice(0, -1);
            if (typeof handler[last_index] === "function") {
                resources.controller[controller] = handler[last_index];
                resources.controllerDependencies[controller] = dependencies;
            }
            else {
                // throw exception here
                console.log("not a function");
            }
        },

        loadDependencies: function () {

        }
    }

    function routes() {
        api.routes(arguments[0], arguments[1]);
    }

    function controller() {
        api.controller(arguments[0], arguments[1]);
    }

    function initiate() {
        resources.config({mode: 'history'});
        resources.listen();

        if (typeof String.prototype.startsWith != 'function') {
            // see below for better implementation!
            String.prototype.startsWith = function (str) {
                return this.indexOf(str) == 0;
            };
        }
    }

    initiate();

    return {
        'routes': routes,
        'controller': controller
    };
});