var subtitleLineView = Backbone.View.extend({
  initialize: function(){
      this.render();
    },
  templateElements: [
  'subtitle-line-template-text-input',
  'subtitle-line-template-time-to-input',
  'subtitle-line-template-time-from-input',
  'subtitle-line-template-delete-button'
  ],
  model: subtitlesLineModel,
  events: {
    "click .subtitle-line-template-delete-button": "deleteData",
    "change .subtitle-line-template-text-input": "textChanged",
    "change .subtitle-line-template-time-to-input": "timeToChanged",
    "change .subtitle-line-template-time-from-input": "timeFromChanged"
  },
  textChanged: function() {
    var newText = this.$(".subtitle-line-template-text-input").val(); 
    this.model.set({"text" : newText});
    this.model.save();
  },
  deleteData: function(){
    var that = this;
    this.model.destroy({success: function(model, response) {
        that.remove();
    }});
  },
  timeFromChanged: function(){
    var newTime = this.$(".subtitle-line-template-time-from-input").val(); 
    this.model.set({"time_from" : newTime});
    this.model.save();
  },
  timeToChanged: function(){
    var newTime = this.$(".subtitle-line-template-time-to-input").val(); 
    this.model.set({"time_to" : newTime});
    this.model.save();
  },
  render: function(){
    var that = this;
    // Compile the template using underscore
    var template = _.template( $("#subtitle-line-template").html(), {} );
    this.$el.html(template(this.model.toJSON()));
    return this;
  }
});

var subtitleLineCollectionView = Backbone.View.extend({
  initialize : function() {
    var that = this;
    this.listenTo(this.collection, "change reset add remove", this.render);
  },
  events: {
    "click .subtitles-line-create-button": "createNewSubtitlesLine"
  },
  render : function() {
    var that = this;
    //clear old
    _(this._subtitlesViews).each(function(dv) {
      $(dv.el).empty();
    });

    this._subtitlesViews = [];
    this.collection.each(function(subtitles_line) {
      that._subtitlesViews.push(new subtitleLineView({
        model : subtitles_line
      }));
    });
    // Clear out this element.
 
    // Render each sub-view and append it to the parent view's element.
    _(this._subtitlesViews).each(function(dv) {
      dv.render();
      $(that.el).append(dv.el);
    });
    if (that.$(".subtitles-line-create-button").length == 0){
      $(that.el).append("<button class=\"subtitles-line-create-button\"> create new </button>");
    }
    return this;
  },
  createNewSubtitlesLine: function(){
    var that = this;
    var last = this.collection.last();
    var values = {};
    if (last != undefined){
      values.time_from = last.get("time_to");
      var date = timeStringToDate(values.time_from);
      date.setSeconds(date.getSeconds()+4);
      values.time_to = dateToTimeString(date);
    }
    else{
      values.time_from = "00:00:00";
      values.time_to = "00:00:04";
    }
    values.subtitles_id = that.subtitles_id;
    this.collection.create(values);
  },
  remove: function() {
    this.undelegateEvents();
    this.$el.empty();
    this.stopListening();
    return this;
  }
});