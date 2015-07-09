/**
 * Created by LamDo on 7/3/15.
 */

MimiJS = (function (config) {
    'use strict';
    var resources = {
        filters: {},
        constants: {},
        provider: {},
        service: {},
        factory: {},
        controller: {},
        controllerDependencies: {},
        mode: null,
        root: '/',
        routes: [],
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
            var match, routeParams;
            for (var i = 0, max = resources.routes.length; i < max; i++) {
                routeParams = {}
                match = f.match(new RegExp(resources.clearSlashes(resources.routes[i].path).replace(/:([^\/]+)/g, "([^\/]*)")));
                if (match) {
                    match.shift();
                    match.forEach(function (value, i) {
                        routeParams[match[i].replace(":", "")] = value;
                    });
                    if (typeof resources.routes[i].handler === "string") {
                        var dependencies = api.loadDependencies(resources.controllerDependencies[resources.routes[i].handler]);
                        dependencies.push(routeParams);
                        resources.controller[resources.routes[i].handler].apply(this, dependencies);
                    }
                    else if (typeof resources.routes[i].handler === "function") {
                        resources.routes[i].handler.apply(this, {});
                    }
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
    };

    var api = {
        filters: function (key, val) {
            resources.filters[key] = val;
        },

        provider: function(name, provider) {

        },

        factory: function (key, arrayArg) {
            arrayArg = arrayArg instanceof  Array ? arrayArg : [arrayArg];
            var lastIndex = arrayArg.length - 1;
            var dependencies = arrayArg.slice(0, -1);
            if (typeof arrayArg[lastIndex] === "function") {
                resources.factory[key] = arrayArg[lastIndex].apply(this, api.loadDependencies(dependencies)); // arrayArg[last_index];
            }
            else {
                throw "Error: argument is not function";
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
                throw "Error: argument is not function";
            }
        },

        constants: function (key, val) {
            resources.constants[key] = val();
        },

        module: function (key, arrayArg) {
            if (key.indexOf('mi.') == 0) {
                arrayArg = arrayArg instanceof Array ? arrayArg : [arrayArg];
                var lastIndex = arrayArg.length - 1;
                var dependencies = arrayArg.slice(0, -1);
                if (typeof arrayArg[lastIndex] === "function") {
                    resources[key.substring(3, key.length)] = arrayArg[lastIndex].apply(this, api.loadDependencies(dependencies)); // arrayArg[last_index];
                }
                else {
                    throw "Error: Argument is not function";
                }
            }
            else {
                throw "Error: Module " + key + ": should starts with mi.";
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
                                //if it is $mi scope - most likely angular $scope
                                if (args[i] === "$mi") {
                                    dependency.push({});
                                }
                                else {
                                    throw "Error: " + args[i] + " is not found in Constants and Factories";
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
        }
    };


    function filters() {
        api.filters(arguments[0], arguments[1]);
        return this;
    }

    function factory() {
        api.factory(arguments[0], arguments[1]);
        return this;
    }

    function service() {
        return this;
    }

    function provider() {
        api.provider(arguments[0], arguments[1]);
        return this;
    }

    function constants() {
        api.constants(arguments[0], arguments[1]);
        return this;
    }

    function routes() {
        api.routes(arguments[0], arguments[1]);
        return this;
    }

    function controller() {
        api.controller(arguments[0], arguments[1]);
        return this;
    }

    function module() {
        api.module(arguments[0], arguments[1]);
        return this;
    }

    function initiate(config) {
        config = config || {mode: 'hash'};
        resources.config(config);
        resources.listen();

        factory("$controller", function() {

            function ControllerService() {

            }

            ControllerService.prototype  = {
                extend: function(base) {
                    return this;
                },

                get: function(name) {

                }
            }

            return new ControllerService();
        });


        factory("$observer", function() {
            function Observer() {
                this.fns = [];
            }

            Observer.prototype = {
                subscribe : function(fn) {
                    this.fns.push(fn);
                    return this;
                },

                unsubscribe : function(fn) {
                    this.fns = this.fns.filter(
                        function(el) {
                            if ( el !== fn ) {
                                return el;
                            }
                        }
                    );
                    return this;
                },

                fire : function(o, thisObj) {
                    var scope = thisObj || window;
                    this.fns.forEach(
                        function(el) {
                            el.call(scope, o);
                        }
                    );
                    return this;
                }
            };

            return new Observer();
        });
    }


    

    var publicAPIs = {
        'filters': filters,
        'factory': factory,
        'service': service,
        'provider': provider,
        'routes': routes,
        'controller': controller,
        'constants': constants,
        'module': module
    }
    if (typeof jQuery === 'undefined') {
        console.warn("jQuery is not available, CherryMimi APIs loaded with very limited features!");
        window.$ = function(selector) {
            return new CherryMimi(selector)
        };

    }
    else {
        // jQuery is available
    }

    initiate();

    return publicAPIs;
});

var CherryMimi = function (selector) {
    // $(), $(null), $(undefined), $(false)
    if (!selector) return this;

    var nodes;
    if (selector.indexOf("#") == 0) {
        nodes = document.getElementById(selector.slice(1))
    }
    else if (selector.indexOf(".") == 0) {
        nodes = document.getElementsByClassName(selector.slice(1))
    }
    else {
        nodes = document.getElementsByTagName(selector);
    }

    if (nodes === null) {
        return this;
    }

    if (nodes instanceof Array) {
        for (var i = 0; i < nodes.length; i++) {
            this[i] = nodes[i];
        }
        this.length = nodes.length;
    }
    else {
        this[0] = nodes;
        this.length = 1;
    }
    return this;
}

// CherryMimi decoration
CherryMimi.prototype = {
    // API Methods
    hide: function() {
        for (var i = 0; i < this.length; i++) {
            this[i].style.display = 'none';
        }
        return this;
    },
    remove: function() {
        for (var i = 0; i < this.length; i++) {
            this[i].parentNode.removeChild(this[i]);
        }
        return this;
    }
    // More methods here, each using 'return this', to enable chaining
};