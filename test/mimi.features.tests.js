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

    it("should call module function when accessing to module ", function() {
        spyOn(app, 'module');
        app.module("test", function() {});
        expect(app.module).toHaveBeenCalled();
    })
});