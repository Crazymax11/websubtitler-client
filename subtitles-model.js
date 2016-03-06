var subtitlesModel = Backbone.Model.extend({
   defaults: {
        id: undefined,
        name: undefined,
        file_id: undefined
    },
    initialize: function(){
    },
    //заменить
    urlRoot: siteRoot + '/subtitles/'
});

var subtitlesCollection = Backbone.Collection.extend({
    model: subtitlesModel,
    url: siteRoot + '/subtitles/',
    createNew: function(obj){
        if (obj === undefined)
            obj = {};
        if (this.file_id)
            obj.file_id = this.file_id;
        this.create(obj);
    },
    fetch: function(options) {
        var that = this;
        options = options || {};
        //do specific pre-processing
        //Call Backbone's fetch
        options.data = {file_id: that.file_id};
        return Backbone.Collection.prototype.fetch.call(this, options);
    }
});