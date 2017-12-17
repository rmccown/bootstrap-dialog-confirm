//Override the default confirm dialog by rails
$.rails.allowAction = function(link){
  if (link.data("confirm") == undefined){
    return true;
  }
  $.rails.showConfirmationDialog(link);
  return false;
}
//User click confirm button
$.rails.confirmed = function(link){
  link.data("confirm", null);
  link.trigger("click.rails");
}
//Display the confirmation dialog
$.rails.showConfirmationDialog = function(link){
  var message = link.data("confirm");
  var title = link.data("confirm-title");
  var type = link.data("confirm-modal-class");
  var url = link.attr("href");
  var method = link.data("method");
  var remote = link.data("remote");
  BootstrapDialog.show({
    title: title,
    message: message,
    type: type,
    buttons: [
      {
        label: link.data("confirm-proceed"),
        cssClass: link.data("confirm-proceed-class"),
        action: function(dialogItself)
        {
          $.ajax({
            url: url,
            type: method,
            success: $.noop,
            error: $.noop,
            dataType: "script"
          });
          dialogItself.close();
        }
      },
      {
        label: link.data("confirm-cancel"),
        cssClass: link.data("confirm-cancel-class"),
        action: function(dialogItself)
        {
          dialogItself.close();
        }
      }
    ]    
  });
}
