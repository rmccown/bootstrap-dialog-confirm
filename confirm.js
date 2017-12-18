//  Override the default Javascript data-confirm dialog
$.rails.allowAction = function(link){
  if (link.data("confirm") == undefined){
    return true;
  }
  $.rails.showConfirmationDialog(link);
  return false;
}
$.rails.confirmed = function(link){
  link.data("confirm", null);
  link.trigger("click.rails");
}
$.rails.showConfirmationDialog = function(link){
  var message = link.data("confirm") || "Are you sure?";
  var title = link.data("confirm-title") || "Confirm?";
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
        label: link.data("confirm-proceed") || "OK",
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
        label: link.data("confirm-cancel") || "Cancel",
        cssClass: link.data("confirm-cancel-class"),
        action: function(dialogItself)
        {
          dialogItself.close();
        }
      }
    ]    
  });
}
