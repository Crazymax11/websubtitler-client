var subtitleView = Backbone.View.extend({
  initialize: function(){
      this.state = "read";
      this.render();
    },
  templateElements: [
  'subtitle-template-name-input',
  'subtitle-template-open-button',
  'subtitle-template-edit-button',
  'subtitle-template-delete-button',
  'subtitle-template-save-button'
  ],
  model: subtitlesModel,
  events: {
    "click .subtitle-template-save-button": "updateData",
    "click .subtitle-template-edit-button": "changeStateToUpdate",
    "click .subtitle-template-delete-button": "deleteData",
    "click .subtitle-template-open-button": "openSubtitles",
    "click .subtitle-template-save-as-srt-button": "saveToFile"
  },
  updateData: function() {
    var newName = this.$(".subtitle-template-name-input").val(); 
    this.model.set({name : newName});
    this.model.save();//(method, this.model);
    this.state = "read";
  },
  deleteData: function(){
    var that = this;
    this.model.destroy({success: function(model, response) {
        that.remove();
    }});
  },
  changeStateToUpdate: function(){
    this.state = "update";
    this.render();
  },
  openSubtitles: function(){
    console.log("open sub");
    this.trigger("subtitlesClicked", this.model.id);
  },
  saveToFile: function(){
    var that = this;
    $.ajax('subtitles/'+that.model.id+'/download', settings, settings);
  },
  render: function(){
    var that = this;
    // Compile the template using underscore
    var template = _.template( $("#subtitle-template").html(), {} );
    this.$el.html(template(this.model.toJSON()));
    this.$el.addClass("subtitle-template-element");
    this.templateElements.forEach(function(baseClass){
      that.$("."+baseClass).addClass(baseClass+'-'+that.state);
    });
    return this;
  }
});

var subtitleCollectionView = Backbone.View.extend({
  initialize : function() {
    var that = this;
    this.listenTo(this.collection, "change reset add remove", this.render);
  },
  events: {
    "click .subtitles-create-button": "createNewSubtitles"
  },
  render : function() {
    //this.el = $(this.elName);
    var that = this;
    //clear old
    _(this._subtitlesViews).each(function(dv) {
      $(dv.el).empty();
    });

    this._subtitlesViews = [];
    this.collection.each(function(subtitles) {
      that._subtitlesViews.push(new subtitleView({
        model : subtitles
      }));
    });
    // Clear out this element.
    //$(this.el).empty();
    // Render each sub-view and append it to the parent view's element.
    _(this._subtitlesViews).each(function(dv) {
      dv.render();
      $(that.el).append(dv.el);
      // не забудем слушать события от вьюх
      that.listenTo(dv, "subtitlesClicked", that.subtitlesClicked)
    });
    if (that.$(".subtitles-create-button").length == 0){
      $(that.el).append("<button class=\"subtitles-create-button\"> create new </button>");
    }
    return this;
  },
  createNewSubtitles: function(){
    this.collection.createNew();
  },
  subtitlesClicked: function(id){
    this.trigger("subtitlesClicked", id);
  },
  remove: function() {
    this.undelegateEvents();
    this.$el.empty();
    this.stopListening();
    return this;
  }
});