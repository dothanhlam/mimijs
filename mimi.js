/**
 * Created by LamDo on 7/3/15.
 */

MimiJS = (function () {
    'use strict';
    var resources = {
        filters: {},
        constants: {},
        factory: {},
        $me: {},
        mode: null,
        root: '/',
        routes: [],
        controller: {},
        controllerDependencies: {},
        config: function (options) {
            resources.mode = options && options.mode && options.mode == 'history'
            && !!(history.pushState) ? 'history' : 'hash';
            resources.root = options && options.root ? '/' + resources.clearSlashes(options.root) + '/' : '/';
        },

        getFragment: function () {
            var fragment = '';
            if (resources.mode === 'history') {
                fragment = resources.clearSlashes(decodeURI(location.pathname + location.search));
                fragment = fragment.replace(/\?(.*)$/, '');
                fragment = resources.root != '/' ? fragment.replace(resources.root, '') : fragment;
            }
            else {
                var match = window.location.href.match(/#(.*)$/);
                fragment = match ? match[1] : '';
            }
            return resources.clearSlashes(fragment);
        },

        clearSlashes: function (path) {
            return path.toString().replace(/\/$/, '').replace(/^\//, '');
        },

        check: function (f) {
            var keys, match, routeParams;
            for (var i = 0, max = resources.routes.length; i < max; i++) {
                routeParams = {}
                keys = resources.clearSlashes(resources.routes[i].path).match(/:([^\/]+)/g);
                match = f.match(new RegExp(resources.clearSlashes(resources.routes[i].path).replace(/:([^\/]+)/g, "([^\/]*)")));
                if (match) {
                    match.shift();
                    match.forEach(function (value, i) {
                        routeParams[keys[i].replace(":", "")] = value;
                    });
                    var dependencies = api.loadDependencies(resources.controllerDependencies[resources.routes[i].handler]);
                    dependencies.push(routeParams);
                    resources.controller[resources.routes[i].handler].apply(this, dependencies);
                    break;
                }
            }
        },

        listen: function () {
            var current = "/";
            var fn = function () {
                if (current !== resources.getFragment()) {
                    current = resources.getFragment();
                    resources.check(current);
                }
            }
            if (resources.mode == 'hash') {
                clearInterval(this.interval);
                this.interval = setInterval(fn, 50);
            }
            if (resources.mode == 'history') {
                this.interval = setTimeout(fn, 50);
            }
        }
    }

    var api = {
        filters: function (key, val) {
            resources.filters[key] = val;
        },

        factory: function (key, arrayArg) {
            var lastIndex = arrayArg.length - 1;
            var dependencies = arrayArg.slice(0, -1);
            if (typeof arrayArg[lastIndex] === "function") {
                console.log("-" + api.loadDependencies(dependencies));
                resources.factory[key] = arrayArg[lastIndex].apply(this, api.loadDependencies(dependencies)); // arrayArg[last_index];
            }
            else {
                console.log("Nan");
            }
        },

        routes: function (route, controller) {
            var temp = controller == null ? {'path': "", 'handler': route} : {'path': route, 'handler': controller};
            resources.routes.push(temp);
        },

        controller: function (controller, handler) {
            handler = handler instanceof Array ? handler : [handler];

            var lastIndex = handler.length - 1;
            var dependencies = handler.slice(0, -1);

            if (typeof handler[lastIndex] === "function") {
                resources.controller[controller] = handler[lastIndex];
                resources.controllerDependencies[controller] = dependencies;
            }
            else {
                console.log("Nan");
            }
        },

        loadDependencies: function (args) {
            var dependency = [];
            for (var i = 0; i < args.length; i++) {
                if (typeof args[i] === "string") {
                    //look in modules
                    if (resources.hasOwnProperty(args[i])) {
                        dependency.push(api.loadModule(args[i]));
                    }
                    else {
                        //look in factory
                        if (resources.factory.hasOwnProperty(args[i])) {
                            dependency.push(api.loadDependency(args[i]));
                        }
                        else {
                            //look in constants
                            if (resources.constants.hasOwnProperty(args[i])) {
                                dependency.push(api.loadConstant(args[i]));
                            }
                            else {
                                //if it is $me scope
                                if (args[i] === "$mi") {
                                    dependency.push({});
                                }
                                else {
                                    console.log("Error: " + args[i] + " is not Found in constants and Factories");
                                }
                            }
                        }
                    }
                }
            }
            return dependency;
        },

        loadModule: function (key) {
            return resources[key];
        },

        loadDependency: function (key) {
            return resources.factory[key];
        },

        loadConstant: function (key) {
            return resources.constants[key];
        },

        constants: function (key, val) {
            resources.constants[key] = val();
        },

        module: function (key, arrayArg) {
            if (key.startsWith('mi')) {
                var lastIndex = arrayArg.length - 1;
                var dependencies = arrayArg.slice(0, -1);
                if (typeof arrayArg[lastIndex] === "function") {
                    console.log("-" + api.loadDependencies(dependencies));
                    resources[key.substring(3, key.length)] = arrayArg[lastIndex].apply(this, api.loadDependencies(dependencies)); // arrayArg[last_index];
                }
                else {
                    console.log("Nan");
                }
            }
            else {
                console.log("Error in module " + key + ": should starts with mi");
            }
        }
    };


    function filters() {
        api.filters(arguments[0], arguments[1]);
    }

    function factory() {
        api.factory(arguments[0], arguments[1]);
    }

    function constants() {
        api.constants(arguments[0], arguments[1]);
    }

    function routes() {
        api.routes(arguments[0], arguments[1]);
    }

    function controller() {
        api.controller(arguments[0], arguments[1]);
    }

    function module() {
        api.module(arguments[0], arguments[1]);
    }

    function initiate() {
            resources.config({mode: 'hash'});
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
        'filters': filters,
        'factory': factory,
        'routes': routes,
        'controller': controller,
        'constants': constants,
        'module': module
    }
});