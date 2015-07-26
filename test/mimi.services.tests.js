/**
 * Created by LamDo on 7/14/15.
 */
describe("Mimi services test suite", function() {
    var app = MimiJS();

    beforeEach(function () {
    });

    afterEach(function () {
    });

    it("should have $controller to be available", function () {
        app.factory("test", ["$controller", function () {
            expect(arguments.length).toEqual(1);
            expect(arguments[0].extend).toBeDefined();
            expect(arguments[0].mixin).toBeDefined();
        }]);
    });

    it("controller service extend an object", function() {
        app.factory("test", ["$controller", function () {
            var controller = arguments[0];
            var base = {"basedProperty" : "based"};
            var extending = {};
            extending = controller.extend(extending, base);
            expect(extending.basedProperty).toBeDefined();
            expect(extending.basedProperty).toEqual("based");
        }]);
    });

    it("controller service mixin an object", function() {
        app.factory("test", ["$controller", function () {
            var controller = arguments[0];
            var base = {
                baseFunc : function() {},
                helperFunc: function() {}
            };
            var extending = {extendFunc: function() {}};

            controller.mixin(extending, base, "helperFunc");
            expect(extending["helperFunc"]).toBeDefined();
            expect(typeof extending.helperFunc).toEqual("function");
        }]);
    });

    it("should have $observer to be available", function() {
        app.factory("test", ["$observer", function() {
            var o = arguments[0];
            expect(o).toBeDefined();
            expect(o.subscribe).toBeDefined();
            expect(o.unsubscribe).toBeDefined();
            expect(o.fire).toBeDefined();
        }]);
    });

    it("should have $http to be implemented", function() {
        app.resolve(["$http"], function() {
            expect(this.$http).toBeDefined();
            expect(this.$http).toBeTruthy();
            expect(this.$http.get).toBeDefined();
            expect(this.$http.post).toBeDefined();

         //   var onLoad = jasmine.createSpy("onLoad");
         //   var onError = jasmine.createSpy("onError");

            var onLoad = function() {
                console.log("onLoad")
            };

            var onError = function() {
                console.log("onError")
            }
            this.$http.get({url:"/foo/bar"}, onLoad, onError);
           // expect(onLoad).toHaveBeenCalled();
        })();
    });
});