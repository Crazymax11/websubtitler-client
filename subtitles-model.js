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
    url: siteRoot + '/subtitles/'
});