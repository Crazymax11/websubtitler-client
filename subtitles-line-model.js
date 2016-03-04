var subtitlesLineModel = Backbone.Model.extend({
   defaults: {
        id: undefined,
        subtitles_id: undefined,
        text: "",
        time_to: undefined,
        time_from: undefined
    },
    initialize: function(){
    },
    validate: function(attrs, options) {
        var re = "(\\d\\d):(\\d\\d)\:(\\d\\d)";
        var matched = attrs.time_to.match(re);
        if (matched){
            var hh = matched[1];
            var mm = matched[2];
            var ss = matched[3];
            if ((parseInt(mm) > 59) || (parseInt(ss) > 59)){
                return "неверное время, возможно секунды или минуты больше 59";
            }
        }
        else{
            return "формат времени hh:mm:ss";
        }
    },
    //заменить
    urlRoot: siteRoot + '/subtitles-lines'
});

var subtitlesLineCollection = Backbone.Collection.extend({
    model: subtitlesLineModel,
    url: siteRoot + '/subtitles-lines'
});