/**
 * Created by LamDo on 7/10/15.
 */
describe("Mimi features test suite", function() {
    var app = MimiJS();

    beforeEach(function() {
    });

    afterEach(function() {
    });

    it("has current version is 0.0.5", function() {
        expect(MimiJS.VERSION).toBeDefined();
        expect(MimiJS.VERSION).toEqual("0.0.5");
    });

    it("has routes to be defined", function() {
        expect(app.routes).toBeDefined();
        expect(app.routes).toBeTruthy();
    });

    it("has navigate to be defined", function() {
        expect(app.navigate).toBeDefined();
        expect(app.navigate).toBeTruthy();
    });

    it("has controller to be defined", function () {
        expect(app.controller).toBeDefined();
        expect(app.controller).toBeTruthy();
    });

    it("has constants to be defined", function () {
        expect(app.constants).toBeDefined();
        expect(app.constants).toBeTruthy();
    });

    it("has provider to be defined", function () {
        expect(app.provider).toBeDefined();
        expect(app.provider).toBeTruthy();
    });

    it("has service to be defined", function () {
        expect(app.service).toBeDefined();
        expect(app.service).toBeTruthy();
    });

    it("has factory to be defined", function () {
        expect(app.factory).toBeDefined();
        expect(app.factory).toBeTruthy();
    });

    it("has filters to be defined", function () {
        expect(app.filters).toBeDefined();
        expect(app.filters).toBeTruthy();
    });

    it("should instantise MimiCherry if jQuery does not available", function() {
        expect(window.$).toBeDefined();
        expect(typeof window.$).toEqual("function");
    });

    it("should call module function when accessing to module", function() {
        spyOn(app, 'module');
        app.module("test", function() {
        });
        expect(app.module).toHaveBeenCalled();
    });

    it("factory Object injection", function() {
        app.factory("BaseFactory", function() {
            return {"value":"baseValue"};
        });
        app.factory("test", ["$mi","BaseFactory", function(mi, BaseFactory) {
            expect(mi).toEqual({});
            expect(BaseFactory).not.toBeNull();
            expect(BaseFactory.value).toEqual("baseValue");
        }])
    });

    it("factory Function injection", function() {
        app.factory("BaseFactory", function() {
            var privateValue = 0;
            return {
                get: function() {
                    return privateValue;
                },
                set: function(val) {
                    privateValue = val;
                }
           }
        });
        app.factory("test", ["BaseFactory", function (BaseFactory) {
            expect(typeof BaseFactory).toEqual("object");
            expect(typeof BaseFactory.get).toEqual("function");
            var referenceOfBaseFactory = BaseFactory;
            spyOn(referenceOfBaseFactory, "get").and.callThrough();
            spyOn(referenceOfBaseFactory, "set").and.callThrough();
            expect(referenceOfBaseFactory.get()).toEqual(0);
            expect(referenceOfBaseFactory.set(1));
            expect(referenceOfBaseFactory.set).toHaveBeenCalledWith(1);
        }]);
    });

    it("should have $controller to be available", function() {
        app.factory("test", ["$controller", function() {
            expect(arguments.length).toEqual(1);
            expect(arguments[0].extend).toBeDefined();
        }]);
    });
});