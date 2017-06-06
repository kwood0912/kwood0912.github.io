function wysiwye(preview) {
	this.focusedModule = null;
	this.modules = [];
	this.globals = {
		bodyBackground: '429AFF',
		bodyTextColor: '000000',
		bodyLinkColor: '1188e6',
		bodyFontSize: '14',
		contentContainerBackground: 'FFFFFF',
		contentContainerWidth: '600',
		contentContainerPadding: '8',
		contentContainerShadow: true
	};
	this. getDefaultImage = function() {
		return {
			type: 'image',
			src: '',
			alignment: 'center',
			width: 'auto',
			backgroundColor: 'FFFFFF',
			containerPadding: '10',
			html: '<table class="module" style="width: 100%; background: #FFFFFF; padding: 10px;"><tbody><tr><td align="center"><img style="width: auto;max-width: 100%;" src="" /></td></tr></tbody></table>'
		};
	};
	this.getDefaultText = function() {
		return {
			type: 'text',
			text: 'Type something',
			fontSize: '16',
			fontColor: '000000',
			alignment: 'left',
			backgroundColor: 'FFFFFF',
			containerPadding: '10',
			html: '<table class="module" style="width: 100%; background: #FFFFFF; padding: 10px;"><tbody><tr><td><div style="width:100%;color: #000000;" contenteditable="true">Type something</div></td></tr></tbody></table>'
		};
	};
	this.getDefaultButton = function() {
		return {
			type: 'button',
			buttonColor: '1188E6',
			borderColor: '1288E5',
			fontColor: 'FFFFFF',
			borderRadius: '6',
			fontSize: '16',
			paddingTB: '12',
			paddingLR: '24',
			buttonText: 'Your Call-to-action',
			href: '',
			alignment: 'center',
			backgroundColor: 'FFFFFF',
			containerPadding: '10',
			html: '<table class="module" style="width: 100%; background: #FFFFFF; text-align: center; padding: 10px;"><tbody><tr><td><a href="" target="_blank" style="background: #1188E6;border: 1px solid #1288E5;color: #FFFFFF;padding: 12px 24px; border-radius: 6px; font-size: 16px; text-decoration: none;text-align: center;">Your Call-to-action</a></td></tr><tbody></table>'
		};
	};
	this.getDefaultSpace = function() {
		return {
			type: 'space',
			backgroundColor: 'FFFFFF',
			height: '25',
			html: '<table class="module" style="width: 100%; background: #FFFFFF;"><tbody><tr><td style="height: 25px;"></td></tr></tbody></table>'
		};
	};
	this.getDefaultDivider = function() {
		return {
			type: 'divider',
			backgroundColor: 'FFFFFF',
			height: '4',
			color: '000000',
			containerPadding: '10',
			html: '<table class="module" style="width: 100%; background: #FFFFFF; padding: 10px"><tbody><tr><td><div style="width: 100%; height: 4px; background: #000;"></div></td></tr></tbody></table>'
		};
	};
	this.getDefaultColumns = function() {
		return {
			type: 'columns',
			backgroundColor: 'FFFFFF',
			columnCount: '2',
			alignment: 'left',
			containerPadding: '10',
			html: '<table class="module" style="width: 100%; background: #FFFFFF; padding: 10px"><tbody><tr><td class="module-column" style="width: 50%;"></td><td class="module-column" style="width: 50%;"></td></tr></tbody></table>'
		};
	};

	this.body = preview; 
	this.docHTML = '<div id="body"><center><table id="contentContainer" cellpadding="0" cellspacing="0" border="0" width="100%" style="width: 100%;max-width: 600px;min-height: 400px;box-shadow: 2px 2px 3px rgba(0,0,0,0.6)" align="center"><tbody><tr valign="top"><td></td></tr></tbody></table></center></div>';
	this.ccHTML = '<center><table id="contentContainer" cellpadding="0" cellspacing="0" border="0" width="100%" style="width: 100%;max-width: 600px;min-height: 400px;box-shadow: 2px 2px 3px rgba(0,0,0,0.6)" align="center"><tbody><tr valign="top"><td></td></tr></tbody></table></center>';
	$(this.body).html(this.ccHTML);
	this.contentContainer = $('center table#contentContainer', this.body);
	this.moduleContainer = $('center table#contentContainer tr td', this.body);

	$(this.body).css('background', '#' + this.globals.bodyBackground);
	$(this.body).css('color', '#' + this.globals.bodyTextColor);
	$('a', this.body).css('color', '#' + this.globals.bodyLinkColor);
	$(this.body).css('font-size', this.globals.bodyFontSize + 'px');
	$(this.contentContainer).css('background', '#' + this.globals.contentContainerBackground);
	$(this.contentContainer).css('max-width', this.globals.contentContainerWidth + 'px');
	$(this.contentContainer).css('padding', this.globals.contentContainerPadding + 'px');
};

wysiwye.prototype.addModule = function(module) {
	var newModule = null;
	switch (module) {
		case 'image': 
			newModule = this.getDefaultImage();
			break;
		case 'text':
			newModule = this.getDefaultText();
			break;
		case 'button':
			newModule = this.getDefaultButton();
			break;
		case 'space':
			newModule = this.getDefaultSpace();
			break;
		case 'divider':
			newModule = this.getDefaultDivider();
			break;
		case 'columns':
			newModule = this.getDefaultColumns();
			break;
	}
	var index = this.modules.length;
	var element = $(newModule.html);
	$(element).attr('index', index);
	newModule.html = $(element).prop('outerHTML');
	//add to the preview
	$(this.moduleContainer).append(newModule.html);
	this.modules.push(newModule);
	this.focusedModule = index;
	return $('table.module[index="' + index + '"]', this.moduleContainer);
}

wysiwye.prototype.getModule = function(index) {
	return this.modules[index];
}

wysiwye.prototype.setFocusedModule = function(index) {
	this.focusedModule = index;
	return this.modules[this.focusedModule];
}

wysiwye.prototype.getFocusedModule = function() {
	return this.modules[this.focusedModule];
}

wysiwye.prototype.getFocusedIndex = function() {
	return this.focusedModule;
}

wysiwye.prototype.removeModule = function(index) {
	this.modules.splice(index, 1);
	$('.module[index="' + this.focusedModule + '"]', this.moduleContainer).remove();
}

wysiwye.prototype.removeFocusedModule = function() {
	if (this.focusedModule != null) {
		this.modules.splice(this.focusedModule, 1);
		$('.module[index="' + this.focusedModule + '"]', this.moduleContainer).remove();
		this.focusedModule = null;
		$('.module').each(function(i) {
			$(this).attr('index', i);
		});
	}
}

wysiwye.prototype.updateFocusedModule = function(property, value) {
	this.modules[this.focusedModule][property] = value;
}

wysiwye.prototype.updateGlobalSetting = function(property, value) {
	this.globals[property] = value;
}

wysiwye.prototype.moveFocusedModuleUp = function() {
	var oi = this.focusedModule;
	var ni = oi - 1;
	this.moduleMove(oi, ni);
	this.focusedModule = ni;
}

wysiwye.prototype.moveFocusedModuleDown = function() {
	var oi = this.focusedModule;
	var ni = oi + 1;
	this.moduleMove(oi, ni);
	this.focusedModule = ni;
}

wysiwye.prototype.moduleMove = function(old_index, new_index) {
	while (old_index < 0) {
        old_index += this.modules.length;
    }
    while (new_index < 0) {
        new_index += this.modules.length;
    }
    if (new_index >= this.modules.length) {
        var k = new_index - this.modules.length;
        while ((k--) + 1) {
            this.modules.push(undefined);
        }
    }
    this.modules.splice(new_index, 0, this.modules.splice(old_index, 1)[0]);
}

wysiwye.prototype.saveTemplate = function(callback) {
	var doc = $(this.docHTML);
	//set style rules for body
	$(doc).css({
		'width': '100%',
		'height': '100%',
		'background': '#' + this.globals.bodyBackground,
		'color': '#' + this.globals.bodyTextColor,
		'font-size': this.globals.bodyFontSize + 'px',
		'padding': '50px 0px'
	});
	//set style rules for container
	$('center table#contentContainer', doc).css({
		'width': this.globals.contentContainerWidth + 'px',
		'padding': this.globals.contentContainerPadding + 'px',
		'background': '#' + this.globals.contentContainerBackground,
		'box-shadow': this.globals.contentContainerShadow ? '2px 2px 3px rgba(0,0,0,0.6)' : '0px 0px 0px rgba(0,0,0,0)'
	});
	//append modules and set style rules
	for (var i = 0; i < this.modules.length; i++) {
		var mod = this.modules[i];
		var modElem = $(mod.html);
		switch (mod.type) {
			case 'image':
				$(modElem).css({
					'background': '#' + mod.backgroundColor,
					'padding': mod.containerPadding + 'px'
				});
				$('tr td img', modElem).attr('src', mod.src);
				var w = mod.width;
				if (w != 'auto' && w.indexOf('%') < 0) {
					w += 'px';
				}
				$('tr td img', modElem).css('width', w);
				$('tr td', modElem).attr('align', mod.alignment); 
				break;
			case 'text':
				$(modElem).css({
					'color': '#' + mod.fontColor,
					'font-size': mod.fontSize + 'px',
					'background': '#' + mod.backgroundColor,
					'padding': mod.containerPadding + 'px' 
				});
				$('tr td div', modElem).html(mod.text);
				$('tr td div', modElem).removeAttr('contenteditable');
				break;
			case 'button':
				$(modElem).css({
					'text-align': mod.alignment,
					'background': '#' + mod.backgroundColor,
					'padding': mod.containerPadding + 'px' 
				});
				$('tr td a', modElem).css({
					'background': '#' + mod.buttonColor,
					'border': '1px solid #' + mod.borderColor,
					'border-radius': mod.borderRadius + 'px',
					'color': '#' + mod.fontColor,
					'font-size': mod.fontSize + 'px',
					'padding-top': mod.paddingTB + 'px',
					'padding-bottom': mod.paddingTB + 'px',
					'padding-left': mod.paddingLR + 'px',
					'padding-right': mod.paddingLR + 'px'
				});
				$('tr td a', modElem).html(mod.buttonText);
				$('tr td a', modElem).attr('href', mod.href);
				break;
		}
		$('center table#contentContainer > tbody > tr > td', doc).append($(modElem).prop('outerHTML'));
	}
	var docStart = '<!DOCTYPE html><html style="width: 100%;height: 100%;margin: 0px;"><head><meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1" /></head><body style="width: 100%;height: 100%;margin: 0px;">';
	var docEnd = '</body></html>';
	var final = docStart + $(doc).prop('outerHTML') + docEnd;
	if (callback) {
		callback(final);	
	}
}