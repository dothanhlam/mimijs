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

    it("render method should render simple logical block", function() {
        var template =
            '<%if(this.showSkills) {%>' +
            '<%for(var index in this.skills) {%>' +
            '<a href="#"><%this.skills[index]%></a>' +
            '<%}%>' +
            '<%} else {%>' +
            '<p>none</p>' +
            '<%}%>';
        expect(MimiCloak.render(template,{
            skills: ["js", "html", "css"],
            showSkills: false
        })).toEqual("<p>none</p>");
        expect(MimiCloak.render(template,{
            skills: ["js", "html", "css"],
            showSkills: true
        })).toEqual('<a href="#">js</a><a href="#">html</a><a href="#">css</a>');
    });
});