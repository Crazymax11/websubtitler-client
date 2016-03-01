var fileView = Backbone.View.extend({
  initialize: function(){
      this.state = "read";
      this.render();
    },
  templateElements: [
  'file-template-id-input',
  'file-template-name-input',
  'file-template-organization_id-input',
  'file-template-description-input',
  'file-template-edit-button',
  'file-template-delete-button',
  'file-template-save-button'
  ],
  model: fileModel,
  events: {
    "click .file-template-save-button": "updateData",
    "click .file-template-edit-button": "changeStateToUpdate",
    "click .file-template-delete-button": "deleteData"
  },

  updateData: function() {
    var newName = this.$(".file-template-name-input").val(); 
    var newDescription = this.$(".file-template-description-input").val(); 
    this.model.credentials = credentials;
    this.model.set({"name" : newName});
    this.model.set({"description" : newDescription});
    // update or create;
    var method = this.state === "update"? "update": "create";
    this.model.save();//(method, this.model);
    this.state = "read";
  },
  deleteData: function(){
    var that = this;
    this.model.credentials = credentials;
    this.model.destroy({success: function(model, response) {
        that.remove();
    }});
  },
  changeStateToUpdate: function(){
    this.state = "update";
    this.render();
  },
  render: function(){
    
    var that = this;
    // Compile the template using underscore
    var template = _.template( $("#file-template").html(), {} );
    this.$el.html(template(this.model.toJSON()));
    this.$el.addClass("file-template-element");
    this.templateElements.forEach(function(baseClass){
      that.$("."+baseClass).addClass(baseClass+'-'+that.state);
    });
    // switch (this.state){
    //   case "read":

    //   this.$(".file-template-id-input").removeClass("file-template-id-input").addClass("file-template-id-input-read").prop('readonly', true);
    //   this.$(".file-template-organization_id-input").removeClass("file-template-organization_id-input").addClass("file-template-organization_id-input-read").prop('readonly', true);
    //   this.$(".file-template-save-button").removeClass("file-template-save-button").addClass("file-template-save-button-read");
    //   this.$(".file-template-name-input").removeClass("file-template-name-input").addClass("file-template-name-input-read");
    //   this.$(".file-template-description-input").removeClass("file-template-description-input").addClass("file-template-description-input-read").prop('readonly', true);
    //   //template.$(".file-template-id-input").css( "border", "13px solid red" );
    //   break;
    //   case "create":

    //   break;
    //   case "update":
    //   this.$(".file-template-id-input").removeClass("file-template-id-input").addClass("file-template-id-input-update");
    //   this.$(".file-template-organization_id-input").removeClass("file-template-organization_id-input").addClass("file-template-organization_id-input-update");
    //   this.$(".file-template-save-button").removeClass("file-template-save-button").addClass("file-template-save-button-update");
    //   this.$(".file-template-name-input").removeClass("file-template-name-input").addClass("file-template-name-input-update");
    //   this.$(".file-template-description-input").removeClass("file-template-description-input").addClass("file-template-description-input-update");
    //   break;
    // }
    // Load the compiled HTML into the Backbone "el"
    
    return this;
  }
});