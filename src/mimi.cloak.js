/**
 * Created by LamDo on 7/12/15.
 * The origin taken from TemplateEngine by Krasimir - http://krasimirtsonev.com/
 */
MimiCloak = (function () {
    var render = function (html, options) {
        var re = /<%([^%>]+)?%>/g;
        var reExp = /(^( )?(if|for|else|switch|case|break|{|}))(.*)?/g;
        var code = 'var r=[];\n';
        var cursor = 0;
        var match;

        var add = function (line, js) {
            js ? (code += line.match(reExp) ? line + '\n' : 'r.push(' + line + ');\n') :
                (code += line != '' ? 'r.push("' + line.replace(/"/g, '\\"') + '");\n' : '');
            return add;
        };

        while (match = re.exec(html)) {
            add(html.slice(cursor, match.index))(match[1], true);
            cursor = match.index + match[0].length;
        };

        add(html.substr(cursor, html.length - cursor));
        code += 'return r.join("");';
        return new Function(code.replace(/[\r\t\n]/g, '')).apply(options);
    };


    var renderExternalTemplate = function(params, options) {
        var callback = params.callback || function() { throw new Error("Error: callback required.")};
        var url = params.url || location.href;

        var xhttp = function() {
            var instance = new XMLHttpRequest();
            return instance;
        }();

        options.data = options.data || null;
        options.type = options.type || 'json';

        xhttp.open('GET', url, true);
        xhttp.onreadystatechange = function() {
            if (xhttp.status == 200 && xhttp.readyState == 4) {
                callback(render(xhttp.responseText, options.data));
            }
        };
    };

    return {
        'render': render,
        'renderExternalTemplate': renderExternalTemplate
    }
})();