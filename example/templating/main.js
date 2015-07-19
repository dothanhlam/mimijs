/**
 * Created by LamDo on 7/19/15.
 */
app = MimiJS() || {};

app.factory("CloakView", function() {
    return {
        render: function(id, template, data) {
            $("#".concat(id))[0].innerHTML = "<p>aaaaa</p>"
        }
    }
});

app.controller("MainController", ["CloakView", function(view) {
    console.log("mimi templating");
    view.render("container", "", "");
}]);

// default route or main entry point
app.routes("/", "MainController");