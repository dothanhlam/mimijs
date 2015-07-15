/**
 * Created by LamDo on 7/12/15.
 */
    //mimi cherry
var MimiCherry = function (selector) {
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

    if (nodes.hasOwnProperty('length')) {
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
};

// MimiCherry decoration
MimiCherry.prototype = {
    hasClass: function(elem, className) {
        return new RegExp(' ' + className + ' ').test(' ' + elem.className + ' ');
    },

    addClass: function(elem, className) {
        if (!this.hasClass(elem, className)) {
            elem.className += ' ' + className;
        }
    },

    removeClass: function (elem, className) {
        var newClass = ' ' + elem.className.replace( /[\t\r\n]/g, ' ') + ' ';
        if (this.hasClass(elem, className)) {
            while (newClass.indexOf(' ' + className + ' ') >= 0 ) {
                newClass = newClass.replace(' ' + className + ' ', ' ');
            }
            elem.className = newClass.replace(/^\s+|\s+$/g, '');
        }
    },

    toggleClass: function (elem, className) {
        var newClass = ' ' + elem.className.replace( /[\t\r\n]/g, ' ' ) + ' ';
        if (this.hasClass(elem, className)) {
            while (newClass.indexOf(' ' + className + ' ') >= 0 ) {
                newClass = newClass.replace( ' ' + className + ' ' , ' ' );
            }
            elem.className = newClass.replace(/^\s+|\s+$/g, '');
        }
        else {
            elem.className += ' ' + className;
        }
    },

    after: function() {
      throw new Error("Error: method not supported.");
    },
    append: function() {
        throw new Error("Error: method not supported.");
    },
    attr: function() {
        throw new Error("Error: method not supported.");
    },
    bind: function() {
        throw new Error("Error: method not supported.");
    },
    children: function() {
        throw new Error("Error: method not supported.");
    },
    clone: function() {
        throw new Error("Error: method not supported.");
    },
    contents: function() {
        throw new Error("Error: method not supported.");
    },
    css: function() {
        throw new Error("Error: method not supported.");
    },
    data: function() {
        throw new Error("Error: method not supported.");
    },
    detach: function() {
        throw new Error("Error: method not supported.");
    },
    empty: function() {
        throw new Error("Error: method not supported.");
    },
    eq: function() {
        throw new Error("Error: method not supported.");
    },
    find: function() {
        throw new Error("Error: method not supported.");
    },
    html: function() {
        throw new Error("Error: method not supported.");
    },
    next: function() {
        throw new Error("Error: method not supported.");
    },
    on: function() {
        throw new Error("Error: method not supported.");
    },
    off: function() {
        throw new Error("Error: method not supported.");
    },
    one: function() {
        throw new Error("Error: method not supported.");
    },
    parent: function() {
        throw new Error("Error: method not supported.");
    },
    prepend: function() {
        throw new Error("Error: method not supported.");
    },
    prop: function() {
        throw new Error("Error: method not supported.");
    },
    ready: function() {
        throw new Error("Error: method not supported.");
    },
    remove: function() {
        throw new Error("Error: method not supported.");
    },
    removeAttr: function() {
        throw new Error("Error: method not supported.");
    },
    removeData: function() {
        throw new Error("Error: method not supported.");
    },
    replaceWith: function() {
        throw new Error("Error: method not supported.");
    },
    text: function() {
        throw new Error("Error: method not supported.");
    },
    toggleClass: function() {
        throw new Error("Error: method not supported.");
    },
    triggerHandler: function() {
        throw new Error("Error: method not supported.");
    },
    unbind: function() {
        throw new Error("Error: method not supported.");
    },
    val: function() {
        throw new Error("Error: method not supported.");
    },
    wrap: function() {
        throw new Error("Error: method not supported.");
    },

    getJSON: function(options, callback) {

        var xhttp = function() {
            var instance = new XMLHttpRequest();
            return instance;
        }();

        options.url = options.url || location.href;
        options.data = options.data || null;
        callback = callback || function() {};
        options.type = options.type || 'json';
        var url = options.url;

        if (options.type == 'jsonp') {
            window.jsonCallback = callback;
            var $url = url.replace('callback=?', 'callback=jsonCallback');
            var script = document.createElement('script');
            script.src = $url;
            document.body.appendChild(script);
        }

        xhttp.open('GET', options.url, true);
        xhttp.send(options.data);
        xhttp.onreadystatechange = function() {
            if (xhttp.status == 200 && xhttp.readyState == 4) {
                callback(xhttp.responseText);
            }
        };
        return this;
    }
};