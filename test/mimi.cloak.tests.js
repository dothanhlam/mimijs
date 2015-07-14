/**
 * Created by LamDo on 7/15/15.
 */
describe("MimiCloak features test suite", function() {
    it("should be instantised automatically", function() {
        expect(MimiCloak).toBeDefined();
        expect(MimiCloak).toBeTruthy();
    });

    it("should have render method", function() {
        expect(MimiCloak.render).toBeDefined();
        expect(MimiCloak.render).toBeTruthy();
    });
});