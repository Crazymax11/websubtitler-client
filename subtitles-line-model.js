var subtitlesLineModel = Backbone.Model.extend({
   defaults: {
        id: undefined,
        subtitles_id: undefined,
        text: undefined,
        time_to: undefined,
        time_from: undefined
    },
    initialize: function(){
    },
    //заменить
    urlRoot: siteRoot + '/subtitles-lines'
});

var subtitlesLineCollection = Backbone.Collection.extend({
    model: subtitlesLineModel,
    url: siteRoot + '/subtitles-lines'
});