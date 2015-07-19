```
|  |_|  ||   | |  |_|  ||   |     |   ||       |
|       ||   | |       ||   |     |   ||  _____|
|       ||   | |       ||   |     |   || |_____
|       ||   | |       ||   |  ___|   ||_____  |
| ||_|| ||   | | ||_|| ||   | |       | _____| |
|_|   |_||___| |_|   |_||___| |_______||_______|
```
#MimiJS - Micro MVC JavaScript Framework
[![Build Status](https://travis-ci.org/dothanhlam/mimijs.svg?branch=master)](https://travis-ci.org/dothanhlam/mimijs)
[![Coverage Status](https://coveralls.io/repos/dothanhlam/mimijs/badge.svg?branch=master&service=github)](https://coveralls.io/github/dothanhlam/mimijs?branch=master)
![Dependencies Status](https://david-dm.org/dothanhlam/mimijs.svg)
##Features - version 0.5.0
- DI and IoC
- Routes
- Single Page Architecture (SPA)
- Controller, Factory, Resolve
- Mimi Cherry: replacement for jQuery
- Mimi Cloak: HTML template binding
- Working with Mustache, RactiveJS, ReactJS, EJS ...

##Create build for experiment
MimiJS is under developing, please create your own build for experiment. The development process requires grunt-cli and
istanbul (code coverage), so if you have not installed before, please install them first.
```
npm install -g grunt-cli
npm install -g istanbul
```
Update all dependencies
```
npm install
```
Create build
```
grunt travis
```
##Usages
###Initial
```
var app = MimiJS();
```
###Create View provider
#### Mustache template
Mimi can use various HTML template engine
```
app.factory("ProductView", function() {
  return {
    render: function(id, data) {
      var output = Mustache.render("<ul> {{#stooges}} <li><a href='#/'>{{name}}</a></li>{{/stooges}}</ul> ", data);
      document.getElementById(id).innerHTML = output;
    }
  }
});
```
#### Mimi Cloak template
Support simple and fast rendering HTML with data binding
```
app.factory("CloakView", function() {
    return {
        render: function(id, data) {
            var template = '<%for(var index in this.data) {%>' +
                '<p><%this.data[index]%></p>' +
                '<%}%>';
            $("#".concat(id))[0].innerHTML = MimiCloak.render(template, {data:data});
        }
    }
})

```
###Service
```
app.factory("ProductService", function() {
  return {
    get: function() {
      return {
        "stooges": [
            { "name": "Moe" },
            { "name": "Larry" },
            { "name": "Curly" }
          ]
        };
      }
    }
});
```

###Controller
Defines scope and handles action when routes change
```
app.controller("HomeController", function(){
  console.log("this is home controller");
})
.controller("DefaultController", function() {
  console.log("this is default controller");
})
.controller("ProductController", ["ProductService", function(service, products) {
  service.get();
  console.log('products object', products);
}]);
```
###Route and Controller
```
app.routes("home/", "HomeController")
  .routes("products/:id/", "ProductController")
  .routes(function() {
    console.log("default routing")
  });

```
###Resolve - Dependency Injection
Resolve api supports for unit testing as well
```
it("resolves factory", function() {
    app.factory("TestFactory", function() {return {}});
        app.resolve(["TestFactory"], function() {
            var f = this.TestFactory;
            expect(f).toBeDefined();
        })();
});
```
##Note
Mimi Cherry will be default loaded if jQuery does not include in application