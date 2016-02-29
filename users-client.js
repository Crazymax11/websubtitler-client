//определим модель юзеров 
var User = Backbone.Model.extend({
   defaults: {
        ID: "",
        name: "",
        organization_id: "",
        type: ""
    },
    credentials : {
    username: 'testadmin',
    password: 'testadmin'
	},
    initialize: function(){
        console.log('User');
    },
    urlRoot: 'http://localhost:3000/users'
});
User.credentials = {
    username: 'testadmin',
    password: 'testadmin'
};

var UsersCollection = Backbone.Collection.extend({
    model: User,
    url: "http://localhost:3000/users",
});


var usersInDb = new UsersCollection();
usersInDb.credentials = {
    username: 'testadmin',
    password: 'testadmin'
};
usersInDb.fetch();

// var newUser = usersInDb.create(
// 	{name: "newuser", 
// 	 login: "newuser",
// 	 pass: "newuser",
//      organization_id: "1",
//      type: 0});
//usersInDb.sync("create", usersInDb, {});
console.log(usersInDb.length);

//UsersCollection.model.on('sync', UsersCollection.render, UsersCollection);


var UserView = Backbone.View.extend({
  initialize: function(){
      this.render();
    },
    render: function(){
      // Compile the template using underscore
      var template = _.template( $("#user-template").html(), {} );
      // Load the compiled HTML into the Backbone "el"
      this.$el.html( template(this.model.toJSON()));
      return this;
    }
});

var UsersCollectionView = Backbone.View.extend({
  initialize : function() {
    var that = this;
    this.listenTo(this.collection, "change reset add remove", this.render);
  },
 
  render : function() {
  	this.el = $(this.elName);
    var that = this;
    this._userViews = [];
	this.collection.each(function(user) {
      that._userViews.push(new UserView({
        model : user
      }));
    });
    // Clear out this element.
    $(this.el).empty();
 
    // Render each sub-view and append it to the parent view's element.
    _(this._userViews).each(function(dv) {
    	dv.render();
      $(that.el).append(dv.el);
    });
  }
});
var colView = new UsersCollectionView({collection: usersInDb, model: User, el : $("#users-container"), elName : "#users-container"});
colView.elName = "#users-container";

//colView.render();