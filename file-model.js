var fileModel = Backbone.Model.extend({
   defaults: {
        id: undefined,
        name: "unknown",
        organization_id: undefined,
        description: "unknown"
    },
    initialize: function(){
        var that = this;
        this.set({'subtitlesCount' : 0});
        if (that.id!= undefined){
            this.subtitles = new subtitlesCollection();
            this.subtitles.credentials = this.collection.credentials;
            this.subtitles.fetch({ data: $.param({ file_id: that.id})})
            this.listenTo(this.subtitles, "change reset add remove", this.countSubtitles);
        }
    },
    countSubtitles: function(){
        this.set( {'subtitlesCount' : this.subtitles.length});
    },
    //заменить
    urlRoot: siteRoot + '/files'
});

var fileCollection = Backbone.Collection.extend({
    model: fileModel,
    url: siteRoot + '/files'
});