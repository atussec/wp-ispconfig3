/**
 * ISPConfig Admin class
 */
function ISPConfigAdminClass(){
    var $ = jQuery;
    var self = this;

    var init = function() {};

    /**
     * Update the due date of an invoice using ajax action
     */
    var ajax_update_due_date = function(id, due_date){
        var data = {'action': 'update_invoice_due_date', 'invoice_id': id,'due_date': due_date};
        return jQuery.post(ajaxurl, data, null, 'json');
    };

    /** 
     * confirm deletion
     */
    this.ConfirmDelete = function(obj){
        var invoice = $(obj).data('name');
        var ok = confirm("Really delete invoice " + invoice + "?");
        if(!ok) event.preventDefault();
    };

    /**
     * Edit due date through ajax
     */
    this.EditDueDate = function(obj){
        var d = $(obj).text();
        var invoice_id = parseInt($(obj).data('id'));

        var $c = $(obj).clone();
        var $td = $(obj).parent('td');

        var closeEdit = function(){
            $td.html('');
            $td.append($c);
        };


        var $input = $('<input type="text" style="width: 150px;" value="'+d+'" />');
        var $btnSave = $('<a />', {href: '#',text: 'Save'})
        var $btnCancel = $('<a />', {style:'margin-left: 1em;',href: '#',text: 'Cancel'})

        $td.html('');

        $btnSave.click(function(){
            ajax_update_due_date( invoice_id, $input.val()).done(function(resp){
                if(resp == "0") {
                    alert('Nothing updated');
                } else {
                    $c.text( $input.val() );
                }
                closeEdit();
            });
        });

        $btnCancel.click(closeEdit);

        $td.append($input);
        $td.append($btnSave);
        $td.append($btnCancel);
    }

    init();
}

jQuery(function(){
     var ISPConfigAdmin = window['ISPConfigAdmin'] = new ISPConfigAdminClass();
});