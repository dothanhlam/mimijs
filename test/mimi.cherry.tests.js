/**
 * Created by LamDo on 7/10/15.
 */
describe("MimiCherry features test suite", function() {
    var cherry = null;
    var methodsShouldBeImplemented = [
        "addClass",
        "after",
        "append",
        "attr",
        "bind",
        "children",
        "clone",
        "contents",
        "css",
        "data",
        "detach",
        "empty",
        "eq",
        "find",
        "hasClass",
        "html",
        "next",
        "on",
        "off",
        "one",
        "parent",
        "prepend",
        "prop",
        "ready",
        "remove",
        "removeAttr",
        "removeClass",
        "removeData",
        "replaceWith",
        "text",
        "toggleClass",
        "triggerHandler",
        "unbind",
        "val",
        "wrap"
    ];

    beforeEach(function() {
        window.$ = function(selector) {
            return new MimiCherry(selector);
        };
    });

    afterEach(function() {

    });

    it("should be instantised", function() {
        expect($).not.toBeNull();
        expect($).toBeTruthy();
    });

    it("should have implementation as jquery lite", function() {
        cherry = new MimiCherry();
        methodsShouldBeImplemented.forEach(function(item){
           expect(typeof cherry[item]).toEqual("function");
           expect(cherry[item]).toBeDefined();
        });
    });

    it("should query element via id, class and tag", function() {
        var d = document.createElement("div");
        d.appendChild(document.createTextNode("1"));
        d.setAttribute("id", "foo");
        d.setAttribute("class", "bar");
        document.body.appendChild(d);

        var a = $("#foo");
        var b = $(".bar");
        var c = $("div");
        expect(a).toBeDefined();
        expect(b).toBeDefined();
        expect(c).toBeDefined();
    });

    it("should have hasClass function to be implemented", function() {
        var d = document.createElement("div");
        d.appendChild(document.createTextNode("1"));
        d.setAttribute("class", "bar");
        document.body.appendChild(d);
        var b = $(".bar");
        expect(b).toBeDefined();
        expect(b.hasClass).toBeDefined();
        expect(b.hasClass).toBeTruthy();
        expect(b.hasClass("bar")).toEqual(true);
    });
});