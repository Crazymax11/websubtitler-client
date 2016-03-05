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
});

var router = Backbone.Router.extend({
  routes: {
    "login":                "login",   // #login
    "files(/:file_id)":         "files",  // #files/file_id
    "subtitles?file_id=:file_id" : "subtitlesForFile",
    "subtitles_lines/:subtitles_id" : "subtitlesLines"
  },

  login: function() {
  	console.log("login router");
  	this.app.view = new loginView({model: this.app.credentials, el : $("#content-block")}); 
		this.app.view.render();
		this.app.listenTo(this.app.view, "LoginClicked", this.app.tryLogin);
  },

  files: function(query, page) {
  	this.app.view.remove();
    this.app.view = new fileCollectionView({collection: this.app.fc, el : $("#content-block")});
    this.app.view.render();
    this.app.listenTo(this.app.view, "subtitlesClicked", this.app.showSubtitlesOfFile);
  },
  subtitlesForFile: function (file_id){
  	file_id = parseInt(file_id);
  	this.app.view.remove();
  	var subtColl = new subtitlesCollection();
	subtColl.file_id = file_id;
	subtColl.credentials = {username: this.app.credentials.get("login"), password: this.app.credentials.get("pass")};
  	this.app.view = new subtitleCollectionView({collection: subtColl, el : $("#content-block") });
	subtColl.fetch();
  	this.app.view.render();
  	this.app.listenTo(this.app.view, "subtitlesClicked", this.app.showSubtitlesLines);
  },
  subtitlesLines: function(subtitles_id){
  	subtitles_id = parseInt(subtitles_id);
  	this.app.view.remove();
  	this.app.view = new subtitleLineCollectionView({collection: new subtitlesLineCollection(), el : $("#content-block") });
  	this.app.view.collection.credentials = {username: this.app.credentials.get("login"), password: this.app.credentials.get("pass")};
  	this.app.view.collection.fetch({data: $.param({subtitles_id: subtitles_id})});
  	this.app.view.collection.subtitles_id = subtitles_id;
  	this.app.view.subtitles_id = subtitles_id;
  	this.app.view.render();
  }

});

function webSubtitlerApp(){
	_.extend(this, Backbone.Events);
	this.router = new router();
	this.router.app = this;
	Backbone.history.start({pushState: true});
	this.credentials = new credentialsModel();
	
 	this.tryLogin = function(){
 		var that = this;
 		this.fc = new fileCollection();
 		this.fc.credentials = {username: that.credentials.get("login"), password: that.credentials.get("pass")};
 		this.fc.fetch({success: function(){console.log('сукес'); that.router.navigate("#files", {trigger: true});}, error: function(){console.log('ерр')}});
	};
	this.showSubtitlesOfFile = function(obj){
		var that = this;
		this.router.navigate('subtitles?file_id=' + obj.file_id, {trigger: true});
 		// this.fc = new fileCollection();
 		// this.fc.credentials = {username: that.credentials.get("login"), password: that.credentials.get("pass")};
 		// this.fc.fetch({success: function(){console.log('сукес'); that.router.navigate("#files", {trigger: true});}, error: function(){console.log('ерр')}});
	};
	this.showSubtitlesLines = function(id){
		var that = this;
		this.router.navigate('subtitles_lines/' + id, {trigger: true});
	}
}