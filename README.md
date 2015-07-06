#MimiJS - Tiny JavaScript framework

##Features
- Routes and Controllers, supports SPA
- Factory
- Constants
- Template loading and binding
- Modules

##Usages
###Initial
```
var app = MimiJS();
```
###View (Testing with Mustache template)
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