//определим модель юзеров 

var User = Backbone.Model.extend({
   defaults: {
        ID: "",
        name: "",
        organization_id: "",
        type: ""
    },
    initialize: function(){
        console.log('Book has been intialized');
    }
    urlRoot: 'http://localhost:51377/users';
});


var UsersCollection = Backbone.Collection.extend({
    model: User,
 
    url: "http://localhost:51377/users",
});


var usersInDb = new UsersCollection();
usersInDb.fetch();