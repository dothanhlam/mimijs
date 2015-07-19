/**
 * Created by LamDo on 7/19/15.
 */
app = MimiJS() || {};

app.factory("CloakView", function() {
    return {
        render: function(id, data) {
            console.log('data', data)
            var template = '<%for(var index in this.data) {%>' +
                '<p><%this.data[index]%></p>' +
                '<%}%>';
            $("#".concat(id))[0].innerHTML = MimiCloak.render(template, {data:data});
        }
    }
})

app.factory("PoemService", function() {
    return {
        get: function() {
            return ["Even though we are miles apart",
            "You are never far from my heart",
            "I loved you then",
            "I love you now",
            "It's always when and",
            "Never how",
            "Take me back to yesterday",
            "All the wonderful things you had to say",
            "I loved you then",
            "I love you now",
            "It's always when",
            "And never how",
            "I see your eyes",
            "I feel you near",
            "Although you're not",
            "Really here"];
        }
    }
})

app.controller("MainController", ["CloakView", "PoemService", function(view, service) {
    console.log("mimi templating");
    var poem = service.get();
    view.render("container", poem);
}]);

// default route or main entry point
app.routes("/", "MainController");