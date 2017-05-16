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
			backgroundColor: 'FFFFFF',
			containerPadding: '10',
			html: '<table class="module" style="width: 100%; background: #FFFFFF; padding: 10px;"><tr><td><img style="width: 100%;max-width: 100%;" src="" /></td></tr></table>'
		};
	};
	this.getDefaultText = function() {
		return {
			type: 'text',
			text: 'Type something',
			fontSize: '16',
			fontColor: '000000',
			backgroundColor: 'FFFFFF',
			containerPadding: '10',
			html: '<table class="module" style="width: 100%; background: #FFFFFF; padding: 10px;"><tr><td><div style="width:100%;color: #000000;" contenteditable="true">Type something</div></td></tr></table>'
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
			html: '<table class="module" style="width: 100%; background: #FFFFFF; text-align: center; padding: 10px;"><tr><td><a href="" target="_blank" style="background: #1188E6;border: 1px solid #1288E5;color: #FFFFFF;padding: 12px 24px; border-radius: 6px; font-size: 16px; text-decoration: none;text-align: center;">Your Call-to-action</a></td></tr></table>'
		};
	};
	this.body = preview; 
	this.docHTML = '<!DOCTYPE html><html><head><meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1" /></head><body><center><table id="contentContainer" cellpadding="0" cellspacing="0" border="0" width="100%" style="width: 100%;max-width: 600px;min-height: 400px;box-shadow: 2px 2px 3px rgba(0,0,0,0.6)" align="center"><tr valign="top"><td></td></tr></table></center></body></html>';
	this.ccHTML = '<center><table id="contentContainer" cellpadding="0" cellspacing="0" border="0" width="100%" style="width: 100%;max-width: 600px;min-height: 400px;box-shadow: 2px 2px 3px rgba(0,0,0,0.6)" align="center"><tr valign="top"><td></td></tr></table></center>';
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
	this.globals[propery] = value;
}

wysiwye.prototype.saveTemplate = function(callback) {
	var doc = $(this.docHTML);
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
		$('center table#contentContainer tr td', doc).append($(modElem).html());
	}
	callback($(doc).html());
}