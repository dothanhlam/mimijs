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
}

// MimiCherry decoration
MimiCherry.prototype = {
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