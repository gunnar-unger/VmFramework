VmFramework.load_module=function(options){
	//------------------------------
	var pid	=options.pid;
	var slot	=options.slot;
	var input	=options.input;
	var url	=options.url;
	var base	=options.base;
	if($('#D'+pid).length==0) VmFramework.vm[pid]={};
	VmFramework.vm[pid].parent_uid=undefined;
	VmFramework.vm[pid].parent_name="";
	VmFramework.vm[pid].excel_dialog="";
	if(input!=undefined){
		for (var a in input){
			VmFramework.vm[pid][a]=input[a];
		};
	}
	jQuery.ajaxSetup({async:false});
	//------------------------------
	if($('#D'+pid).length==0){
		//------------------------------
		var content;
		//------------------------------
		$.get(url+'?ver='+VmFramework.ver, function(html){
			content=VmFramework.load_include({content:html});
			content=content.replace(/__ID__/g, pid);
			content=content.replace(/__ID/g, pid);
			content=content.replace(/__BASE__/g, base);
		});
		//-----------------
		content=content.replace(/<!--([\s\S]*?)-->/mig, '');
		//-----------------
		content="<div id=D"+pid+" class=vm_module>"+content+"</div>"
		$("#D"+pid).remove();
		$("#vm_park").append($(content));
		//-----------------
		if (typeof window['F'+pid] == 'function') { eval('F'+pid+"()");	}
		//-----------------------------------------
	}
	if(slot!="body") VmFramework.insert_module({pid:pid,slot:slot});
	$('#D'+pid).triggerHandler('load');
	jQuery.ajaxSetup({async:true});
};

VmFramework.load_include=function(options){
	var content=options.content;
	var lines=content.split('\n');
	for(var i=0;i<lines.length;i++){
		if(lines[i].length>10){
			if(lines[i].indexOf('VmAppInclude:')!==-1){
				var url=lines[i].replace('VmAppInclude:','');
				url=VmFramework.app_base+url;
				$.get(url+'?ver='+VmFramework.ver, function(txt){
					lines[i]=txt
				},'text');
			}
			else if(lines[i].indexOf('VmCommonInclude:')!==-1){
				var url=lines[i].replace('VmCommonInclude:','');
				url=VmFramework.common_base+url;
				$.get(url+'?ver='+VmFramework.ver, function(txt){
					lines[i]=txt
				},'text');
			}
		}
	}
	var new_content="";
	for(var i=0;i<lines.length;i++){
		new_content+=lines[i]+'\n';
	}
	return new_content;
}

VmFramework.insert_module=function(options){
	var pid		=options.pid;
	var slot	=options.slot;
	if(pid===undefined) return;
	if(slot===undefined || slot=="") return;

	var current=$('#'+slot).data("current");

	if(current!==undefined) VmFramework.push_back_to_park({div:current});
	VmFramework.push_to_slot({div:pid,slot:slot});
	$('#'+slot).data("current",pid);

	$('#D'+pid).data('back_module',current);
	$('#D'+pid).data('back_slot',slot);
};

VmFramework.push_back_to_park=function(options){
	var div=options.div;
	if( $('#D'+div).length>0) $('#D'+div).appendTo('#vm_park');
}

VmFramework.push_to_slot=function(options){
	var div	=options.div;
	var slot=options.slot;
	$('#'+slot).html('');
   	$('#D'+div).appendTo('#'+slot);
}
