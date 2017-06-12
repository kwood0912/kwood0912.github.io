function wysiwye(preview) {
	this.nextId = 0;
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
			html: '<table class="module" module="image" style="width: 100%; background: #FFFFFF; padding: 10px;"><tbody><tr><td align="center"><img style="width: auto;max-width: 100%;" src="" /></td></tr></tbody></table>'
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
			html: '<table class="module" module="text" style="width: 100%; background: #FFFFFF; padding: 10px;"><tbody><tr><td><div style="width:100%;color: #000000;" contenteditable="true">Type something</div></td></tr></tbody></table>'
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
			html: '<table class="module" module="button" style="width: 100%; background: #FFFFFF; text-align: center; padding: 10px;"><tbody><tr><td><a href="" target="_blank" style="background: #1188E6;border: 1px solid #1288E5;color: #FFFFFF;padding: 12px 24px; border-radius: 6px; font-size: 16px; text-decoration: none;text-align: center;">Your Call-to-action</a></td></tr><tbody></table>'
		};
	};
	this.getDefaultSpace = function() {
		return {
			type: 'space',
			backgroundColor: 'FFFFFF',
			height: '25',
			html: '<table class="module" module="space" style="width: 100%; background: #FFFFFF;"><tbody><tr><td style="height: 25px;"></td></tr></tbody></table>'
		};
	};
	this.getDefaultDivider = function() {
		return {
			type: 'divider',
			backgroundColor: 'FFFFFF',
			height: '4',
			color: '000000',
			containerPadding: '10',
			html: '<table class="module" module="divider" style="width: 100%; background: #FFFFFF; padding: 10px"><tbody><tr><td><div style="width: 100%; height: 4px; background: #000;"></div></td></tr></tbody></table>'
		};
	};
	this.getDefaultColumns = function() {
		return {
			type: 'columns',
			backgroundColor: 'FFFFFF',
			alignment: 'left',
			containerPadding: '10',
			columns: [
				[],
				[]
			],
			html: '<table class="module" module="columns" style="width: 100%; background: #FFFFFF; padding: 10px"><tbody><tr><td class="module-column" style="width: 50%;vertical-align: top;"></td><td class="module-column" style="width: 50%;vertical-align: top;"></td></tr></tbody></table>'
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
	newModule.id = ++this.nextId;
	var element = $(newModule.html);
	$(element).attr('id', newModule.id);
	newModule.parentId = null;
	newModule.html = $(element).prop('outerHTML');
	//add to the preview
	$(this.moduleContainer).append(newModule.html);
	this.modules.push(newModule);
	this.focusedModule = newModule.id;
	return $('#' + newModule.id);
}

wysiwye.prototype.addColumnModule = function(module, parentId) {
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
		default:
			return null;
	}
	newModule.id = ++this.nextId;
	var parentModule = this.getModuleById(parentId);
	var parentElement = $('#' + parentId + ' tbody tr td.module-column[selected]');
	var column = parentElement.index();
	var element = $(newModule.html);
	$(element).attr('id', newModule.id);
	$(element).attr('parent-id', parentId);
	$(element).attr('col', column);
	newModule.parentId = parentId;
	newModule.column = column;
	newModule.html = $(element).prop('outerHTML');
	$(parentElement).append(newModule.html);
	this.modules[this.getModuleIndexById(parentId)].columns[column].push(newModule);
	this.focusedModule = newModule.id;
	return $('#' + newModule.id);
}

wysiwye.prototype.getModuleById = function(id) {
	for (var i = 0; i < this.modules.length; i++) {
		var m = this.modules[i];
		if (m.id == id) {
			return m;
		} else if (m.columns && m.columns.length) {
			for (var j = 0; j < m.columns.length; j++) {
				var col = m.columns[j];
				for (var k = 0; k < col.length; k++) {
					if (col[k].id == id) {
						return col[k];
					}
				}
			}
		}
	}
	return null;
}

wysiwye.prototype.getModuleIndexById = function(id) {
	for (var i = 0; i < this.modules.length; i++) {
		var m = this.modules[i];
		if (m.id == id) {
			return i;
		} else if (m.columns && m.columns.length) {
			for (var j = 0; j < m.columns.length; j++) {
				var col = m.columns[j];
				for (var k = 0; k < col.length; k++) {
					if (col[k].id == id) {
						return k;
					}
				}
			}
		}
	}
	return -1;
}

wysiwye.prototype.setFocusedModule = function(id) {
	if (id > -1) {
		this.focusedModule = id;
		return this.getModuleById(this.focusedModule);
	} else {
		return null;
	}
}

wysiwye.prototype.getFocusedId = function() {
	return this.focusedModule;
};

wysiwye.prototype.getFocusedModule = function() {
	return this.getModuleById(this.focusedModule);
}

wysiwye.prototype.getFocusedIndex = function() {
	return this.getModuleIndexById(this.focusedModule);
}

wysiwye.prototype.getModuleCount = function() {
	return this.modules.length;
}

wysiwye.prototype.removeModule = function(id) {
	var mod = this.getModuleById(id);
	var index = this.getModuleIndexById(id);
	if (mod.parentId) {
		this.getModuleById(mod.parentId).columns[mod.column].splice(index, 1);
	} else {
		this.modules.splice(index, 1);
	}
	$('#' + id).remove();
}

wysiwye.prototype.removeFocusedModule = function() {
	if (this.focusedModule != null) {
		this.removeModule(this.focusedModule);
		this.focusedModule = null;
	}
}

wysiwye.prototype.updateFocusedModule = function(property, value) {
	this.getModuleById(this.focusedModule)[property] = value;
}

wysiwye.prototype.updateGlobalSetting = function(property, value) {
	this.globals[property] = value;
}

wysiwye.prototype.moveFocusedModuleUp = function() {
	var mod = this.getModuleById(this.focusedModule);
	var oi = this.getModuleIndexById(this.focusedModule);
	var ni = oi - 1;
	if (mod.parentId) {
		var parent = this.getModuleById(mod.parentId);
		this.moduleMove(parent.columns[mod.column], oi, ni);
	} else {
		this.moduleMove(this.modules, oi, ni);
	}
	
}

wysiwye.prototype.moveFocusedModuleDown = function() {
	var mod = this.getModuleById(this.focusedModule);
	var oi = this.getModuleIndexById(this.focusedModule);
	var ni = oi + 1;
	if (mod.parentId) {
		var parent = this.getModuleById(mod.parentId);
		this.moduleMove(parent.columns[mod.column], oi, ni);
	} else {
		this.moduleMove(this.modules, oi, ni);
	}
}

wysiwye.prototype.moduleMove = function(collection, oldIndex, newIndex) {
	while (oldIndex < 0) {
        oldIndex += collection.length;
    }
    while (newIndex < 0) {
        newIndex += collection.length;
    }
    if (newIndex >= collection.length) {
        var k = newIndex - collection.length;
        while ((k--) + 1) {
            collection.push(undefined);
        }
    }
    collection.splice(newIndex, 0, collection.splice(oldIndex, 1)[0]);
}

wysiwye.prototype.generateModuleMarkup = function (mod, modElem) {
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
		case 'space':
			$(modElem).css('background', '#' + mod.backgroundColor);
			$('tr td', modElem).css('height', mod.height + 'px');
			break;
		case 'divider':
			$(modElem).css({
				'background': '#' + mod.backgroundColor,
				'padding': mod.containerPadding + 'px'
			});
			$('tr td div', modElem).css({
				'background': '#' + mod.color,
				'height': mod.height + 'px'
			});
			break;
		case 'columns':
			$(modElem).css({
				'background': '#' + mod.backgroundColor,
				'padding': mod.containerPadding + 'px'
			});
			$('> tbody > tr', modElem).empty();
			var cw = 100 / mod.columns.length;
			for (var c = 0; c < mod.columns.length; c++) {
				var col = mod.columns[c];
				var colElem = $('td.module-column', modElem).get(c);
				if (!colElem) {
					colElem = $('<td class="module-column" style="vertical-align: top;"></td>');
					colElem.attr('align', mod.alignment);
					colElem.css('width', cw + '%');
				}
				for (var sm = 0; sm < col.length; sm++) {
					var subMod = col[sm];
					var subModElem = $(subMod.html);
					subModElem = this.generateModuleMarkup(subMod, subModElem);
					$(colElem).append($(subModElem).prop('outerHTML'));
				}
				$('> tbody > tr', modElem).append($(colElem).prop('outerHTML'));
			}
			break;
	}
	return modElem;
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
		modElem = this.generateModuleMarkup(mod, modElem);
		$('center table#contentContainer > tbody > tr > td', doc).append($(modElem).prop('outerHTML'));
	}
	var docStart = '<!DOCTYPE html><html style="width: 100%;height: 100%;margin: 0px;"><head><meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1" /></head><body style="width: 100%;height: 100%;margin: 0px;">';
	var docEnd = '</body></html>';
	var final = docStart + $(doc).prop('outerHTML') + docEnd;
	if (callback) {
		callback(final);	
	}
}

wysiwye.prototype.loadModule = function(module, collection, container) {
	var type = $(module).attr('module');
	var newModule = null;
	var newElem = null;
	switch (type) {
		case 'image':
			newModule = this.getDefaultImage();
			newElem = $(newModule.html);

			newModule.backgroundColor = $(module).css('background').replace('#', '');
			newElem.css('background', $(module).css('background'))

			newModule.containerPadding = $(module).css('padding').replace('px', '');
			newElem.css('padding', $(module).css('padding'));

			newModule.alignment = $('tbody > tr > td', module).attr('align');
			$('tbody > tr > td', newElem).attr('align', newModule.alignment);

			newModule.width = $('tbody > tr > td > img', module).css('width').replace('px', '');
			$('tbody > tr > td > img', newElem).css('width', $('tbody > tr > td > img', module).css('width'));

			newModule.src = $('tbody > tr > td > img', module).attr('src');
			$('tbody > tr > td > img', newElem).attr('src', newModule.src);
			break;
		case 'text':
			newModule = this.getDefaultText();
			newElem = $(newModule.html);

			newModule.backgroundColor = $(module).css('background').replace('#', '');
			newElem.css('background', $(module).css('background'))

			newModule.containerPadding = $(module).css('padding').replace('px', '');
			newElem.css('padding', $(module).css('padding'));

			newModule.alignment = $('tbody > tr > td > div', module).css('text-align');
			$('tbody > tr > td > div', newElem).css('text-align', newModule.alignment);

			newModule.fontColor = $('tbody > tr > td > div', module).css('color').replace('#', '');
			$('tbody > tr > td > div', newElem).css('color', $('tbody > tr > td > div', module).css('color'));

			newModule.fontSize = $('tbody > tr > td > div', module).css('font-size').replace('px', '');
			$('tbody > tr > td > div', newElem).css('font-size', $('tbody > tr > td > div', module).css('font-size'));
			break;
		case 'button':
			newModule = this.getDefaultButton();
			newElem = $(newModule.html);

			newModule.backgroundColor = $(module).css('background').replace('#', '');
			newElem.css('background', $(module).css('background'));

			newModule.containerPadding = $(module).css('padding').replace('px', '');
			newElem.css('padding', $(module).css('padding'));

			newModule.alignment = $('tbody > tr > td', module).css('text-align');
			$('tbody > tr > td', newElem).css('text-align', newModule.alignment);

			newModule.fontColor = $('tbody > tr > td > a', module).css('color').replace('#', '');
			$('tbody > tr > td > a', newElem).css('color', $('tbody > tr > td > div', module).css('color'));

			newModule.fontSize = $('tbody > tr > td > a', module).css('font-size').replace('px', '');
			$('tbody > tr > td > a', newElem).css('font-size', $('tbody > tr > td > div', module).css('font-size'));

			newModule.borderColor = $('tbody > tr > td > a', module).css('border-color').replace('#', '');
			$('tbody > tr > td > a', newElem).css('border-color', $('tbody > tr > td > a', module).css('border-color'));

			newModule.buttonColor = $('tbody > tr > td > a', module).css('background').replace('#', '');
			$('tbody > tr > td > a', newElem).css('background', $('tbody > tr > td > a', module).css('background'));

			newModule.borderRadius = $('tbody > tr > td > a', module).css('border-radius').replace('px', '');
			$('tbody > tr > td > a', newElem).css('border-radius', $('tbody > tr > td > a', module).css('border-radius'));

			newModule.paddingTB = $('tbody > tr > td > a', module).css('padding-top').replace('px', '');
			$('tbody > tr > td > a', newElem).css({
				'padding-top': $('tbody > tr > td > a', module).css('padding-top'),
				'padding-bottom': $('tbody > tr > td > a', module).css('padding-bottom')
			});

			newModule.paddingLR = $('tbody > tr > td > a', module).css('padding-left').replace('px', '');
			$('tbody > tr > td > a', newElem).css({
				'padding-left': $('tbody > tr > td > a', module).css('padding-left'),
				'padding-right': $('tbody > tr > td > a', module).css('padding-right')
			});

			newModule.buttonText = $('tbody > tr > td > a', module).text();
			$('tbody > tr > td > a', newElem).text(newModule.buttonText);

			newModule.href = $('tbody > tr > td > a', module).attr('href');
			$('tbody > tr > td > a', newElem).attr('href', newModule.href);
			break;
		case 'space':
			newModule = this.getDefaultSpace();
			newElem = $(newModule.html);

			newModule.backgroundColor = $(module).css('background').replace('#', '');
			newElem.css('background', $(module).css('background'));

			newModule.height = $('tbody > tr > td', module).css('height').replace('px', '');
			$('tbody > tr > td', newElem).css('height', $('tbody > tr > td', module).css('height'));
			break;
		case 'divider':
			newModule = this.getDefaultSpace();
			newElem = $(newModule.html);

			newModule.containerPadding = $(module).css('padding').replace('px', '');
			newElem.css('padding', $(module).css('padding'));

			newModule.backgroundColor = $(module).css('background').replace('#', '');
			newElem.css('background', $(module).css('background'));

			newModule.height = $('tbody > tr > td > div', module).css('height').replace('px', '');
			$('tbody > tr > td > div', newElem).css('height', $('tbody > tr > td > div', module).css('height'));

			newModule.color = $('tbody > tr > td > div', module).css('background').replace('#', '');
			$('tbody > tr > td > div', newElem).css('background', $('tbody > tr > td > div', module).css('background'));
			break;
		case 'columns':
			newModule = this.getDefaultSpace();
			newElem = $(newModule.html);
			newModule.columns = [];
			$('> tbody > tr', newElem).empty(); //remove default columns
			newModule.backgroundColor = $(module).css('background').replace('#', '');
			newElem.css('background', $(module).css('background'));

			newModule.containerPadding = $(module).css('padding').replace('px', '');
			newElem.css('padding', $(module).css('padding'));
			//loop through columns
			var columns = $('> tbody > tr > td', module);
			for (var i = 0; i < columns.length; i++) {
				var c = columns[i];
				newModule.columns.push([]); //push a new module array for each column
				var mods = $('table.module', c);
				var col = $('<td class="module-column" align="' + $(this).attr('align') + '"></td>');
				for (var j = 0; j < mods.length; j++) {
					var mod = mods[j];
					this.loadModule($(mod), newModule.columns[i], c);
				}
				$('> tbody > tr', newElem).append(col);
			}
			break;
	}
	newModule.id = ++this.nextId;
	newElem.attr('id', newModule.id);
	container.append(newElem);
	collection.push(newModule);
}

wysiwye.prototype.loadTemplate = function(html) {
	var doc = $(html)[1];
	doc = $(doc);
	var bg = $('#body').css('background-color');
	this.updateGlobalSetting('bodyBackground', $('#body', doc).css('background').replace('#', ''));
	$(this.body).css('background', $('#body', doc).css('background'));

	this.updateGlobalSetting('bodyTextColor', $('#body', doc).css('color').replace('#', ''));
	$(this.body).css('color', $('#body', doc).css('color'));

	this.updateGlobalSetting('bodyLinkColor', $('#body a', doc).css('color').replace('#', ''));
	$('a', this.body).css('color', $('#body a', doc).css('color'));

	this.updateGlobalSetting('bodyFontSize', $('#body', doc).css('font-size').replace('px', ''));
	$(this.body).css('font-size', $('#body', doc).css('font-size'));

	this.updateGlobalSetting('contentContainerBackground', $('#contentContainer', doc).css('background').replace('#', ''));
	$('#contentContainer', this.body).css('background', $('#contentContainer', doc).css('background'));

	this.updateGlobalSetting('contentContainerWidth', $('#contentContainer', doc).css('width').replace('px', ''));
	$('#contentContainer', this.body).css('width', $('#contentContainer', doc).css('width'));

	this.updateGlobalSetting('contentContainerPadding', $('#contentContainer', doc).css('padding').replace('px', ''));
	$('#contentContainer', this.body).css('padding', $('#contentContainer', doc).css('padding'));

	this.updateGlobalSetting('contentContainerShadow', $('#contentContainer', doc).css('box-shadow') != 'none');
	$('#contentContainer', this.body).css('box-shadow', $('#contentContainer', doc).css('box-shadow'));

	var mods = $('center table#contentContainer > tbody > tr > td > table.module', doc);
	for (var i = 0; i < mods.length; i++) {
		var e = mods[i];
		this.loadModule($(e), this.modules, this.moduleContainer);
	}
}