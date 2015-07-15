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
        cherry = new MimiCherry();
    });

    afterEach(function() {
        cherry = null;
        delete  cherry;
    });

    it("should be instantised", function() {
        expect(cherry).not.toBeNull();
        expect(cherry).toBeTruthy();
    });

    it("should have implementation as jquery lite", function() {
       methodsShouldBeImplemented.forEach(function(item){
           expect(typeof cherry[item]).toEqual("function");
           expect(cherry[item]).toBeDefined();
        });
    });
});