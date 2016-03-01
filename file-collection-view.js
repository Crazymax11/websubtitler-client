var fileCollectionView = Backbone.View.extend({
  initialize : function() {
    var that = this;
    this.listenTo(this.collection, "change reset add remove", this.render);
  },
  events: {
    "click .create-file-button": "createNewFile"
  },
  render : function() {
  	//this.el = $(this.elName);
    var that = this;
    //clear old
    _(this._fileViews).each(function(dv) {
      $(dv.el).empty();
    });
    this._fileViews = [];
    this.collection.each(function(file) {
      that._fileViews.push(new fileView({
        model : file
      }));
    });
    // Clear out this element.
    //$(this.el).empty();
 
    // Render each sub-view and append it to the parent view's element.
    _(this._fileViews).each(function(dv) {
    	dv.render();
      $(that.el).append(dv.el);
      // не забудем слушать события от вьюх
      that.listenTo(dv, "subtitlesClicked", that.subtitlesClicked)
    });
    if (that.$(".create-file-button").length == 0){
      $(that.el).append("<button class=\"create-file-button round-button-circle\"> + </button>");
    }

  },
  subtitlesClicked: function(file_id){
    this.trigger("subtitlesClicked", file_id);
  },
  createNewFile: function(){
    this.collection.create({});
  },
  remove: function() {
    this.undelegateEvents();
    this.$el.empty();
    this.stopListening();
    return this;
  }
});