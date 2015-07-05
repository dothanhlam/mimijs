/**
 * Created by LamDo on 7/4/15.
 */
describe("routing", function() {
    var app = MimiJS();

    beforeEach(function() {

    });

    afterEach(function() {

    });

    it("has routes to be defined", function() {
        expect(app.routes).toBeDefined();
        expect(app.routes).toBeTruthy();
    });

    it("should return a reference to application", function() {
        var ref = app.routes(function() {});
        expect(ref).toEqual(app);
    });
});