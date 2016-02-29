var fileModel = Backbone.Model.extend({
   defaults: {
        id: undefined,
        name: "unknown",
        organization_id: undefined,
        description: "unknown"
    },
    initialize: function(){
    },
    //заменить
    urlRoot: siteRoot + '/files'
});

var fileCollection = Backbone.Collection.extend({
    model: fileModel,
    url: siteRoot + '/files'
});