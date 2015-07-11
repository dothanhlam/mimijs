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

    it("should able to navigate with default controller", function() {
       // should be e2e test
    });
});