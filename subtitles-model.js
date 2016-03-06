var subtitlesModel = Backbone.Model.extend({
   defaults: {
        id: undefined,
        name: undefined,
        file_id: undefined
    },
    initialize: function(){
    },
    //заменить
    urlRoot: siteRoot + '/subtitles/',
    downloadSrt: function(){
        var that = this;
        var credentials = {};
        if ("credentials" in this)
            credentials = this.credentials;
        else
            credentials = this.collection.credentials;
        $.ajax({
            url: that.urlRoot + that.get("id") + '/download',
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", "Basic "
                    + btoa(credentials.username + ":" + credentials.password));
            },
            success: function(data){that.trigger("srtIsReady", data)},
            error: function() {console.log("err")}
        });
    }
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