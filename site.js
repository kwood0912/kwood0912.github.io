var bodyBackground, bodyTextColor, bodyLinkColor, bodyFontSize, body, contentContainer, ccBackground, ccWidth, ccPadding, ccShadow;
var imgSrc, imgBg, imgPadding;
var txtFntColor, txtFntSize, txtAlign, txtBg, txtPadding;
var btnColor, btnBdrColor, btnFntColor, btnRadius, btnFntSize, btnText, btnUrl, btnAlign, btnBg, btnPaddingTB, btnPaddingLR, btnContainerPadding;
var spaceColor, spaceHeight;
var divBg, divHeight, divColor, divContainerPadding;
var deleteBtn, saveBtn, upArrowBtn, downArrowBtn;
var template = null;

function changeSettingsView(module) {
	$('.module-settings').hide();
	if (module && module.type) {
		$('.module-settings[module="' + module.type + '"]').show();
		$(deleteBtn).show();
		switch (module.type) {
			case 'image':
				$(imgSrc).val(module.src);
				$(imgBg).val(module.backgroundColor);
				$(imgPadding).val(module.containerPadding);
				break;
			case 'text':
				$(txtFntColor).val(module.fontColor);
				$(txtFntSize).val(module.fontSize);
				$(txtAlign).val(module.alignment)
				$(txtBg).val(module.backgroundColor);
				$(txtPadding).val(module.containerPadding);
				break;
			case 'button':
				$(btnColor).val(module.buttonColor);
				$(btnBdrColor).val(module.borderColor);
				$(btnFntColor).val(module.fontColor);
				$(btnRadius).val(module.borderRadius);
				$(btnFntSize).val(module.fontSize);
				$(btnText).val(module.buttonText);
				$(btnUrl).val(module.href);
				$(btnAlign).val(module.alignment);
				$(btnBg).val(module.backgroundColor);
				$(btnPaddingTB).val(module.paddingTB);
				$(btnPaddingLR).val(module.paddingLR);
				$(btnContainerPadding).val(module.containerPadding);
				break;
			case 'space':
				$(spaceColor).val(module.backgroundColor);
				$(spaceHeight).val(module.height);
				break;
			case 'divider':
				$(divBg).val(module.backgroundColor);
				$(divHeight).val(module.height);
				$(divColor).val(module.color);
				$(divContainerPadding).val(module.containerPadding);
				break;
		}
	} else {
		$('.module-settings[module="none"]').show();
		$(deleteBtn).hide();
	}
}

function moveArrowButtons(element) {
	$('.arrow-btn').show();
	var box = element.getBoundingClientRect();
	$('#upArrowBtn').css({ top: box.top + 'px', left: box.right + 'px' });
	$('#downArrowBtn').css({ top: box.top + $('#upArrowBtn').height() + 'px', left: box.right + 'px' });
}

$(document).ready(function() {
	//initialize gui variables
	template = new wysiwye($('#body'));
	deleteBtn = $('#deleteBtn');
	saveBtn = $('#saveBtn');
	upArrowBtn = $('#upArrowBtn');
	downArrowBtn = $('#downArrowBtn');
	bodyBackground = $('#bodybg');
	bodyTextColor = $('#bodytxtc');
	bodyLinkColor = $('#bodyLinkColor');
	bodyFontSize = $('#bodyFontSize');
	body = $('#body');
	contentContainer = $('#contentContainer');
	ccBackground = $('#ccbg');
	ccWidth = $('#ccWidth');
	ccPadding = $('#ccPadding');
	ccShadow = $('#ccShadow');
	//image gui controls
	imgSrc = $('#imgSrc');
	imgBg = $('#imgBg');
	imgPadding = $('#imgPadding');
	imgAlign = $('#imgAlign');
	imgWidth = $('#imgWidth');
	//text gui controls
	txtFntColor = $('#txtFntColor');
	txtFntSize = $('#txtFntSize');
	txtAlign = $('#txtAlign');
	txtBg = $('#txtBg');
	txtPadding = $('#txtPadding');
	//button gui controls
	btnColor = $('#btnColor');
	btnBdrColor = $('#btnBdrColor');
	btnFntColor = $('#btnFntColor');
	btnWidth = $('#btnWidth');
	btnHeight = $('#btnHeight');
	btnRadius = $('#btnRadius');
	btnFntSize = $('#btnFntSize');
	btnText = $('#btnText');
	btnUrl = $('#btnUrl');
	btnAlign = $('#btnAlign');
	btnBg = $('#btnBg');
	btnPaddingTB = $('#btnPaddingTB');
	btnPaddingLR = $('#btnPaddingLR');
	btnContainerPadding = $('#btnContainerPadding');
	//space gui controls
	spaceColor = $('#spaceColor');
	spaceHeight = $('#spaceHeight');
	//divider gui controls
	divBg = $('#divBg');
	divHeight = $('#divHeight');
	divColor = $('#divColor');
	divContainerPadding = $('#divContainerPadding');

	//set variables
	$(bodyBackground).val(template.globals.bodyBackground);
	$(bodyTextColor).val(template.globals.bodyTextColor);
	$(bodyLinkColor).val(template.globals.bodyLinkColor);
	$(bodyFontSize).val(template.globals.bodyFontSize);
	$(ccBackground).val(template.globals.contentContainerBackground);
	$(ccWidth).val(template.globals.contentContainerWidth);
	$(ccPadding).val(template.globals.contentContainerPadding);
	if (template.globals.contentContainerShadow) {
		$(ccShadow).attr('checked', 'true');
	} else {
		$(ccShadow).removeAttr('checked');
	}

	$(window).resize(function() {
		var i = template.getFocusedIndex();
		var fe = $('.module[index="' + i + '"]').get(0);
		moveArrowButtons(fe);
	});

	//defint event handlers
	$('.ctrl-expando').click(function(){
		var arrow = $(this).find('.caret');
		var contentId = $(this).attr('expand-content');
		if ($(arrow).hasClass('arrow-right')) {
			//collapsed
			$(arrow).removeClass('arrow-right').addClass('arrow-down');
			$(contentId).show();
			$(contentId).animate({
				height: $(contentId).get(0).scrollHeight
			}, 500, function () {
				$(this).height('auto');
			});
		} else {
			//expanded
			$(arrow).removeClass('arrow-down').addClass('arrow-right');
			$(contentId).animate({
				height: 0
			}, 500, function() {
				$(this).hide();
			});
		}
	});

	$('.module-add').click(function() {
		var module = $(this).attr('module');
		var moduleElement = template.addModule(module);
		$('.module').removeAttr('selected');
		$(moduleElement).attr('selected', 'true');
		var newModule = template.getFocusedModule();
		changeSettingsView(newModule);
		if (template.modules.length > 1) {
			moveArrowButtons(moduleElement.get(0));
		}
		if (module == 'text') {
			$('tr td div[contenteditable]', moduleElement).keyup(function() {
				template.updateFocusedModule('text', $(this).text());
			});
		}
		$(moduleElement).click(function() {
			if (!$(this).attr('selected')) {
				$('.module').removeAttr('selected');
				$(this).attr('selected', 'true');
				//move the up/down buttons
				$('.arrow-btn').show();
				var box = this.getBoundingClientRect();
				$('#upArrowBtn').css({ top: box.top + 'px', left: box.right + 'px' });
				$('#downArrowBtn').css({ top: box.top + $('#upArrowBtn').height() + 'px', left: box.right + 'px' });
				//pull settings in the side pane
				var index = $(this).attr('index');
				var focusModule = template.setFocusedModule(parseInt(index));
				changeSettingsView(focusModule);
			}
		});
	});

	$(deleteBtn).click(function() {
		template.removeFocusedModule();
		changeSettingsView(null);
		$('.arrow-btn').hide();
	});
	$(saveBtn).click(function() {
		template.saveTemplate(function(html) {
			var tem = html;
		});
	});
	$(upArrowBtn).click(function() {
		var i = template.getFocusedIndex();
		if (i > 0) {
			var fe = $('.module[index="' + i + '"]');
			var pe = fe.prev();
			$(fe).attr('index', i - 1);
			$(pe).attr('index', i);
			fe.prev().insertAfter(fe);
			template.moveFocusedModuleUp();
			moveArrowButtons($(fe).get(0));
		}
	});
	$(downArrowBtn).click(function() {
		var i = template.getFocusedIndex();
		if (i < template.modules.length - 1) {
			var fe = $('.module[index="' + i + '"]');
			var ne = fe.next();
			$(fe).attr('index', i + 1);
			$(ne).attr('index', i);
			fe.next().insertBefore(fe);
			template.moveFocusedModuleDown();
			moveArrowButtons($(fe).get(0));
		}
	});
	$(bodyBackground).change(function() {
		template.updateGlobalSetting('bodyBackground', $(this).val());
		$(body).css('background', '#' + $(this).val());
	});
	$(bodyTextColor).change(function() {
		template.updateGlobalSetting('bodyTextColor', $(this).val());
		$(body).css('color', '#' + $(this).val());
	});
	$(bodyLinkColor).change(function() {
		template.updateGlobalSetting('bodyLinkColor', $(this).val());
		$('#body a').css('color', '#' + $(this).val());
	});
	$(bodyFontSize).change(function() {
		template.updateGlobalSetting('bodyFontSize', $(this).val());
		$(body).css('font-size', $(this).val() + 'px');
	});
	$(ccBackground).change(function() { 
		template.updateGlobalSetting('contentContainerBackground', $(this).val());
		$(contentContainer).css('background', '#' + $(this).val());
	});
	$(ccWidth).change(function() {
		template.updateGlobalSetting('contentContainerWidth', $(this).val());
		$(contentContainer).css('max-width', $(this).val() + 'px');
		moveArrowButtons($('.module[index="' + template.getFocusedIndex() + '"]').get(0));
	});
	$(ccPadding).change(function() {
		template.updateGlobalSetting('contentContainerPadding', $(this).val());
		$(contentContainer).css('padding', $(this).val() + 'px');
		moveArrowButtons($('.module[index="' + template.getFocusedIndex() + '"]').get(0));
	});
	$(ccShadow).change(function() {
		template.updateGlobalSetting('contentContainerShadow', this.checked);
		if (this.checked) {
			$(contentContainer).css('box-shadow', '2px 2px 3px rgba(0,0,0,0.6');
		} else {
			$(contentContainer).css('box-shadow', '0px 0px 0px rgba(0,0,0,0');
		}
		
	});

	//image parameter events
	$(imgSrc).change(function() {
		template.updateFocusedModule('src', $(this).val());
		$('.module[index="' + template.getFocusedIndex() + '"] tr td img').attr('src', $(this).val());
	});
	$(imgBg).change(function() {
		template.updateFocusedModule('backgroundColor', $(this).val());
		$('.module[index="' + template.getFocusedIndex() + '"]').css('background', '#' + $(this).val());
	});
	$(imgPadding).change(function() {
		template.updateFocusedModule('containerPadding', $(this).val());
		$('.module[index="' + template.getFocusedIndex() + '"]').css('padding', $(this).val() + 'px');
	});
	$(imgWidth).change(function() {
		template.updateFocusedModule('width', $(this).val());
		var value = $(this).val();
		if (value != 'auto' && value.indexOf('%') < 0) {
			value += 'px';
		}
		$('.module[index="' + template.getFocusedIndex() + '"] tr td img').css('width', value);
	});
	$(imgAlign).change(function() {
		template.updateFocusedModule('alignment', $(this).val());
		$('.module[index="' + template.getFocusedIndex() + '"] tr td').attr('align', $(this).val());
	});
	//text parameter events
	$(txtFntSize).change(function() {
		template.updateFocusedModule('fontSize', $(this).val());
		$('.module[index="' + template.getFocusedIndex() + '"] tr td div').css('font-size', $(this).val() + 'px');
	});
	$(txtFntColor).change(function() {
		template.updateFocusedModule('fontColor', $(this).val());
		$('.module[index="' + template.getFocusedIndex() + '"] tr td div').css('color', '#' + $(this).val());
	});
	$(txtAlign).change(function() {
		template.updateFocusedModule('alignment', $(this).val());
		$('.module[index="' + template.getFocusedIndex() + '"] tr td div').css('text-align', $(this).val());
	});
	$(txtBg).change(function() {
		template.updateFocusedModule('backgroundColor', $(this).val());
		$('.module[index="' + template.getFocusedIndex() + '"]').css('background', '#' + $(this).val());
	});
	$(txtPadding).change(function() {
		template.updateFocusedModule('containerPadding', $(this).val());
		$('.module[index="' + template.getFocusedIndex() + '"]').css('padding', $(this).val() + 'px');
	});

	//button parameter events
	$(btnColor).change(function() {
		template.updateFocusedModule('buttonColor', $(this).val());
		$('.module[index="' + template.getFocusedIndex() + '"] tr td a').css("background", '#' + $(this).val());
	});
	$(btnBdrColor).change(function() {
		template.updateFocusedModule('buttonColor', $(this).val());
		$('.module[index="' + template.getFocusedIndex() + '"] tr td a').css("border", '1px solid #' + $(this).val());
	});
	$(btnFntColor).change(function() {
		template.updateFocusedModule('fontColor', $(this).val());
		$('.module[index="' + template.getFocusedIndex() + '"] tr td a').css("color", '#' + $(this).val());
	});
	$(btnRadius).change(function() {
		template.updateFocusedModule('borderRadius', $(this).val());
		$('.module[index="' + template.getFocusedIndex() + '"] tr td a').css("border-radius", $(this).val() + 'px');
	});
	$(btnFntSize).change(function() {
		template.updateFocusedModule('fontSize', $(this).val());
		$('.module[index="' + template.getFocusedIndex() + '"] tr td a').css("fontSize", $(this).val() + 'px');
	});
	$(btnText).change(function() {
		template.updateFocusedModule('buttonText', $(this).val());
		$('.module[index="' + template.getFocusedIndex() + '"] tr td a').html($(this).val());
	});
	$(btnUrl).change(function() {
		template.updateFocusedModule('href', $(this).val());
		$('.module[index="' + template.getFocusedIndex() + '"] tr td a').attr("href", $(this).val());
	});
	$(btnAlign).change(function() {
		template.updateFocusedModule('alignment', $(this).val());
		$('.module[index="' + template.getFocusedIndex() + '"] tr td').css("text-align", $(this).val());
	});
	$(btnBg).change(function() {
		template.updateFocusedModule('backgroundColor', $(this).val());
		$('.module[index="' + template.getFocusedIndex() + '"]').css("background", '#' + $(this).val());
	});
	$(btnPaddingTB).change(function() {
		template.updateFocusedModule('paddingTB', $(this).val());
		$('.module[index="' + template.getFocusedIndex() + '"] tr td a').css('padding-bottom', $(this).val() + 'px').css('padding-top', $(this).val() + 'px');
	});
	$(btnPaddingLR).change(function() {
		template.updateFocusedModule('paddingLR', $(this).val());
		$('.module[index="' + template.getFocusedIndex() + '"] tr td a').css('padding-left', $(this).val() + 'px').css('padding-right', $(this).val() + 'px');
	});
	$(btnContainerPadding).change(function() {
		template.updateFocusedModule('containerPadding', $(this).val());
		$('.module[index="' + template.getFocusedIndex() + '"]').css('padding', $(this).val() + 'px');
	});

	//space parameter events
	$(spaceColor).change(function() {
		template.updateFocusedModule('backgroundColor', $(this).val());
		$('.module[index="' + template.getFocusedIndex() + '"]').css('background', '#' + $(this).val());
	});
	$(spaceHeight).change(function() {
		template.updateFocusedModule('height', $(this).val());
		$('.module[index="' + template.getFocusedIndex() + '"] tr td').css("height", $(this).val() + 'px');
	});

	//divider parameter events
	$(divBg).change(function() {
		template.updateFocusedModule('backgroundColor', $(this).val());
		$('.module[index="' + template.getFocusedIndex() + '"]').css('background', '#' + $(this).val());
	});
	$(divHeight).change(function() {
		
	});
});
