var credentialsModel = Backbone.Model.extend({
   defaults: {
   		login: undefined,
   		pass: undefined
    },
    initialize: function(){
    }
});


var loginView = Backbone.View.extend({
	initialize: function(){
  },
  model: credentialsModel,
	events: {
  	"click .login-template-login-button": "loginClicked"
	},
	loginClicked: function(){
		this.model.set({login: this.$(".login-template-login").val(), pass: this.$(".login-template-password").val()})
		this.trigger("LoginClicked");
	},
	render: function(){
    var that = this;
    // Compile the template using underscore
    var template = _.template( $("#login-template").html(), {} );

    this.$el.html(template(this.model.toJSON()));
    return this;
	},
	remove: function() {
    this.undelegateEvents();
    this.$el.empty();
    this.stopListening();
    return this;
	}
})

var router = Backbone.Router.extend({
  routes: {
    "login":                "login",   // #login
    "files(/:file_id)":         "files"  // #files/file_id
    //"subtitles/?query:query/p:page": "search"   // #search/kiwis/p7
  },

  login: function() {
  	
  },

  files: function(query, page) {
  	this.app.view.remove();
    this.app.view = new fileCollectionView({collection: this.app.fc, el : $("#content-block")});
    this.app.view.render();
  }

});

function webSubtitlerApp(){
	_.extend(this, Backbone.Events);
	Backbone.history.start({pushState: true});
	this.credentials = new credentialsModel();
	this.router = new router();
	this.router.app = this;
 	this.tryLogin = function(){
 		var that = this;
 		this.fc = new fileCollection();
 		this.fc.credentials = {username: that.credentials.get("login"), password: that.credentials.get("pass")};
 		this.fc.fetch({success: function(){console.log('сукес'); that.router.navigate("#files", {trigger: true});}, error: function(){console.log('ерр')}});
	}
	
	this.view = new loginView({model: this.credentials, el : $("#content-block")}); 
	this.view.render();
	this.listenTo(this.view, "LoginClicked", this.tryLogin);
}