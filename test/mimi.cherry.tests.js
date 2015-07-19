/**
 * Created by LamDo on 7/10/15.
 */
describe("MimiCherry features test suite", function() {
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
    });

    afterEach(function() {

    });

    it("should be instantised", function() {
        expect($).not.toBeNull();
        expect($).toBeTruthy();
    });

    it("should have implementation as jquery lite", function() {
        var d = document.createElement("div");
        d.appendChild(document.createTextNode("1"));
        d.setAttribute("id", "foo");
        document.body.appendChild(d);
        methodsShouldBeImplemented.forEach(function(item){
           expect(typeof $("#foo")[item]).toEqual("function");
           expect($("#foo")).toBeDefined();
        });
    });

    it("able to add plugin like jQuery", function() {
        $.fn.red = function() {
            return this;
        }

        var d = document.createElement("div");
        d.appendChild(document.createTextNode("1"));
        d.setAttribute("id", "foo");
        document.body.appendChild(d);
        expect($("#foo").red).toBeDefined();
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

   it("should have addClass function to be implemented", function() {
        var d = document.createElement("div");
        d.appendChild(document.createTextNode("1"));
        d.setAttribute("class", "bar");
        document.body.appendChild(d);
        var b = $(".bar");
        b.addClass("foo");
        b.addClass("foobar");

        expect(b.hasClass("bar")).toEqual(true);
        expect(b.hasClass("foo")).toEqual(true);
        expect(b.hasClass("foobar")).toEqual(true);
    });

    it("should have removeClass function to be implemented", function() {
        var d = document.createElement("div");
        d.appendChild(document.createTextNode("1"));
        d.setAttribute("class", "bar");
        document.body.appendChild(d);
        var b = $(".bar");
        expect(b.hasClass("bar")).toEqual(true);
        expect(b.addClass("foo").removeClass("bar").hasClass("bar")).toEqual(false);
    });
    
    it("should have toggleClass function to be implemented", function () {
        var d = document.createElement("div");
        d.appendChild(document.createTextNode("1"));
        d.setAttribute("class", "foobar");
        document.body.appendChild(d);
        var b = $(".foobar");
        expect(b.hasClass("foobar")).toEqual(true);
        b.toggleClass("foobar");
        expect(b.hasClass("foobar")).toEqual(false);
        b.toggleClass("foobar");
        expect(b.hasClass("foobar")).toEqual(true);
    });

    it("should have remove function to be implemented", function() {
        var d = document.createElement("div");
        var p = document.createElement("p");
        p.appendChild(document.createTextNode("1"));
        p.setAttribute("class", "foobar-child");
        d.appendChild(p);
        d.setAttribute("class", "foobar");
        document.body.appendChild(d);
        expect($(".foobar").remove).toBeDefined();
        expect($(".foobar-child").remove).toBeDefined();
        $(".foobar-child").remove();
        expect($(".foobar-child").hasClass("foobar-child")).toEqual(false);
    });

    it("should have getJSON to be implemented", function() {
        expect($("").getJSON).toBeDefined();
        var cherry = $("");
        var callback = function() {};
        var options = {url: "/foo"};
        spyOn(cherry, "getJSON");
        cherry.getJSON(options, callback);
        expect(cherry.getJSON).toHaveBeenCalledWith(options, callback);
    });
});