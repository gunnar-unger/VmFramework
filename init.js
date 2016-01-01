//------------------------------------------------------------------
VmFramework.init=function(options){
	var callback=options.callback;
	VmFramework.itemuid="";
	VmFramework.appid="";
	VmFramework.idapp="";
	VmFramework.ticks="";
	VmFramework.appuid="";
	VmFramework.uidapp="";
	VmFramework.user='';
	VmFramework.guest=1;
	VmFramework.owner=1;
	VmFramework.current_module='';
	VmFramework.current_form='';
	VmFramework.current_grid='';
	VmFramework.current_main='';
	VmFramework.current_left='';
	VmFramework.comm=0;
	VmFramework.itemuid="";
	VmFramework.appid="";
	VmFramework.idapp="";
	VmFramework.ticks="";
	VmFramework.update_key='';
	VmFramework.submit_btn=""
	VmFramework.module_border="0";
	VmFramework.vm={};
	VmFramework.root_layout_content_slot='vm_content_slot';
	//VmFramework.path_app=location.href.substring(0, location.href.lastIndexOf("/")+1)
	//if(VmFramework.api_url!="") VmFramework.path_app=VmFramework.api_url.replace("api.aspx","");
	
	g_itemuid="";
	g_appid="";
	g_idapp="";
	g_ticks="";
	g_appuid="";
	g_uidapp="";
	g_user='';
	g_guest=1;
	g_owner=1;
	g_current_module='';
	g_current_form='';
	g_current_grid='';
	g_current_main='';
	g_current_left='';
	g_comm=0;
	g_itemuid="";
	g_appid="";
	g_idapp="";
	g_ticks="";
	g_update_key='';
	g_submit_btn=""
	g_module_border="0";
	if(typeof(g_vm)==='undefined') g_vm={};
	//-----------------------------------------------------
	$('body').html("<div id=vm_content_slot></div><div id=vm_park style='display:none'></div>");
	g_vm.root_layout_content_slot='vm_content_slot';
	//-----------------------------------------------------
	g_vm_path_app=location.href.substring(0, location.href.lastIndexOf("/")+1)
	if(g_vm_api_url!="") g_vm_path_app=g_vm_api_url.replace("api.aspx","");
	//-----------------------------------------------------
  	$("html").bind("ajaxStart", function(){  
     	$(this).addClass('busy');  
   	}).bind("ajaxStop", function(){  
     	$(this).removeClass('busy');  
   	});
	//-----------------------------------------------------
	var req={cmd:"data2", action:"user_name"};
    $(this).vm7('request',req, function(res){
        g_user=res.user_name;
        g_user_id=res.user_id;
        g_vm_ver=res.ver;
        
        g_user=res.user_name;
        g_user_id=res.user_id;
        g_vm_ver=res.ver;
		
        if(callback!==undefined) callback();
    });
	//-----------------------------------------------------
};
//------------------------------------------------------------------
VmFramework.jquery_validator_init=function(options){
	//--------------------------------
	$.validator.addMethod(
		'regex', 
		function(value, element, param) {
			var re = new RegExp(param[0]);
            return this.optional(element) || re.test(value);			
    	},
    	$.validator.format('{1}')
    );
    $.validator.setDefaults({ 
	    ignore: '' 
	    ,errorPlacement: function(error, element) { 
    		if (element.attr('type') == 'radio') {
	    		element.parent().append('<br>');
	    		error.appendTo(element.parent());
            }
            else {
                error.insertAfter(element);
            }
    	}
	});
	//--------------------------------
}
//------------------------------------------------------------------
