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

    it("has module to be defined", function() {
        expect(app.module).toBeDefined();
        expect(app.module).toBeTruthy();
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

    it("has factory to be defined", function () {
        expect(app.factory).toBeDefined();
        expect(app.factory).toBeTruthy();
    });

    it("has filters to be defined", function () {
        expect(app.filters).toBeDefined();
        expect(app.filters).toBeTruthy();
    });

    it("has resolve dependencies to be defined", function() {
        expect(app.resolve).toBeDefined();
        expect(app.resolve).toBeTruthy();
    });

    it("should instantise MimiCherry if jQuery does not available", function() {
        expect(window.$).toBeDefined();
        expect(typeof window.$).toEqual("function");
    });

    it("should call module function when accessing to module", function() {
        spyOn(app, 'module');
        app.module("mi.test", function() {
        });
        expect(app.module).toHaveBeenCalled();
    });

    it("factory object injection", function() {
        app.factory("BaseFactory", function() {
            return {"value":"baseValue"};
        });
        app.factory("test", ["$mi","BaseFactory", function(mi, BaseFactory) {
            expect(mi).toEqual({});
            expect(BaseFactory).not.toBeNull();
            expect(BaseFactory.value).toEqual("baseValue");
        }])
    });

    it("factory function injection", function() {
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

    it("constants injection test", function() {
        app.constants("HTTP_ENDPOINT", function() {
            return {};
        });

        app.factory("test", ["HTTP_ENDPOINT", function(HTTP_ENDPOINT) {
            expect(HTTP_ENDPOINT).toBeDefined();
            expect(HTTP_ENDPOINT).toEqual({});
        }]);
    });

    it("controller injection test", function() {
        app.controller("AuthenticationController", function() {
            return {
                auth: function(username, password, callback) {}
            }
        });

        app.resolve(["AuthenticationController"], function() {
            var controller = this.AuthenticationController;
            expect(controller).toBeDefined();
            expect(controller().auth).toBeDefined();
            expect(controller().auth).toBeTruthy();
            expect(typeof controller().auth).toEqual("function");
        })();
    });

    it("resolves factory", function() {
        app.factory("TestFactory", function() {return {}});
        app.resolve(["TestFactory"], function() {
            var f = this.TestFactory;
            expect(f).toBeDefined();
        })();
    });

    it("resolves multiple dependencies", function() {
        app.module("mi.Module1", function() {return {}});
        app.module("mi.Module2", function() {return {}});
        app.factory("TestFactory1", function() {return {}});
        app.factory("TestFactory2", function() {return {}});
        app.constants("Constant1", function() {return {}});
        app.constants("Constant2", function() {return {}});
        app.controller("Controller1", function() {return {}});
        app.controller("Controller2", function() {return {}});

        app.resolve(["Module1","Module2",
                     "TestFactory1", "TestFactory2",
                     "Constant1", "Constant2",
                     "Controller1", "Controller2"], function() {
            var m1 = this.Module1;
            var m2 = this.Module2;
            var f1 = this.TestFactory1;
            var f2 = this.TestFactory2;
            var c1 = this.Constant1;
            var c2 = this.Constant2;
            var ctrl1 = this.Controller1;
            var ctrl2 = this.Controller2;

            expect(f1).toBeDefined();
            expect(f2).toBeDefined();
            expect(c1).toBeDefined();
            expect(c2).toBeDefined();
            expect(ctrl1).toBeDefined();
            expect(ctrl2).toBeDefined();
            expect(m1).toBeDefined();
            expect(m2).toBeDefined();

        })();
    });

    it("should not allow overriding constants", function() {
        app.constants("TrollConstant", function(){return{}});
        expect(function(){  app.constants("TrollConstant", function(){return{}});}).toThrow("Error: TrollConstant already existed.");
    });
});