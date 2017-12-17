# bootstrap-dialog-confirm
Hook the Javascript confirm dialog and use BootstrapDialog

A quick-and-dirty way to grab the data-confirm action and put it in a Bootstrap-friendly dialog.  Uses BootstrapDialog, but just as easily could have used a standard Bootstrap modal.


Helpers might be good:  
```
def link_to_destroy(text, path, options = {})
    title = options.delete(:title) || 'Confirm Action'
    message = options.delete(:message) || 'Are you sure?'
    options[:type] ||= 'danger'
    options[:class] ||= "btn btn-#{options[:type]} btn-xs"
    options[:title] = options.delete(:hover) || ""

    options["data-confirm-cancel"] ||= "No"
    options["data-confirm-cancel-class"] ||= "btn-default"
    options["data-confirm-proceed"] ||= "Yes"
    options["data-confirm-proceed-class"] ||= "btn-success"

    link_to(path, bootstrap_delete_options(title, message, options[:type], options[:show_loading_wait]).merge(options)) do 
      content_tag(:i, "", class: "glyphicon glyphicon-remove").html_safe + " " + text
    end
  end
  ```
  
  Then in your HAML, you can call:
  
  ```
  = link_to_destroy('Remove Something', some_path(@something), :class => 'btn btn-xs btn-danger', :method => :delete, :remote => false, :title => "Delete this thing?", :message => "Are you sure?  This cannot be undone!", :type => 'danger', 'data-confirm-proceed-class' => 'btn-success')

  ```
  
  Which will give you a nice button with an icon.
