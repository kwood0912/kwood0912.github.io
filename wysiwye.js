function wysiwye(preview) {
	this.focusedModule = {};
	this.modules = [];
	this.globals = {
		bodyBackground: '429AFF',
		bodyTextColor: '000000',
		bodyLinkColor: '1188e6',
		bodyFontSize: '14',
		contentContainerBackground: 'FFFFFF',
		contentContainerWidth: '600',
		contentContainerPadding: '8'
	};
	this. getDefaultImage = function() {
		return {
			type: 'image',
			src: '',
			backgroundColor: '#FFFFFF',
			containerPadding: '10',
			html: '<table class="module" style="width: 100%; background: #FFFFFF; padding: 10px;"><tr><td><img style="width: 100%;max-width: 100%;" src="" /></td></tr></table>'
		};
	};
	this.getDefaultText = function() {
		return {
			type: 'text',
			text: 'Type something',
			backgroundColor: 'FFFFFF',
			containerPadding: '10',
			html: '<table class="module" style="width: 100%; background: #FFFFFF; padding: 10px;"><tr><td><div style="width:100%" contenteditable="true">Type something</div></td></tr></table>'
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
	this.html = '<!DOCTYPE html><html><head><meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1" /></head><body></body></html>';
	$(this.body).html('<center><table id="contentContainer" cellpadding="0" cellspacing="0" border="0" width="100%" style="width: 100%;max-width: 600px;min-height: 400px;" align="center"><tr valign="top"><td></td></tr></table></center>');
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
}

wysiwye.prototype.updateFocusedModule = function(property, value) {
	this.modules[this.focusedModule][property] = value;
}