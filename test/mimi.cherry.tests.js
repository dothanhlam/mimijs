/**
 * Created by LamDo on 7/10/15.
 */
describe("MimiCherry features test suite", function() {
    var cherry = null;

    it("should be instantised", function() {
        cherry = new MimiCherry();
        expect(cherry).not.toBeNull();
        expect(cherry).toBeTruthy();
    });

    it("should work for none given selector", function() {
       cherry = new MimiCherry();
        expect(cherry.hide).toBeTruthy();
        expect(cherry.remove).toBeTruthy();
        expect(cherry.getJSON).toBeTruthy();
    });
});