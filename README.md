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

###Declaring Service
```
app.factory("ProductService", function() {
  return {
    get: function() {console.log("Product Service"); }
  }
});
```

###Declaring Controller
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