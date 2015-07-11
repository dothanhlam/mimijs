/**
 * Created by LamDo on 7/4/15.
 */
describe("routing", function() {
    var app = MimiJS();

    beforeEach(function() {

    });

    afterEach(function() {

    });


    it("should return a reference to MimiJS instance", function() {
        var ref = app.routes(function() {});
        expect(ref).toEqual(app);
    });

    it("should able to navigate", function() {
        spyOn(app, "controller");
        spyOn(app, "routes");
        app.controller("DefaultController", function() {});
        expect(app.controller).toHaveBeenCalled();
        app.routes("DefaultController");
        expect(app.routes).toHaveBeenCalled();
    });
})