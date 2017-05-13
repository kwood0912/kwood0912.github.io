var bodyBackground, bodyTextColor, bodyLinkColor, bodyFontSize, body, contentContainer, ccBackground, ccWidth, ccPadding;
var imgSrc, imgBg, imgPadding;
var txtBg, txtPadding;
var btnColor, btnBdrColor, btnFntColor, btnRadius, btnFntSize, btnText, btnUrl, btnAlign, btnBg, btnPaddingTB, btnPaddingLR, btnContainerPadding;
var template = null;

function changeSettingsView(module) {
	$('.module-settings').hide();
	if (module.type) {
		$('.module-settings[module="' + module.type + '"]').show();
		switch (module.type) {
			case 'image':
				$(imgSrc).val(module.src);
				$(imgBg).val(module.backgroundColor);
				$(imgPadding).val(module.containerPadding);
				break;
			case 'text':
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
		}
	} else {
		$('.module-settings[module="none"]').show();
	}
}

$(document).ready(function() {
	//initialize gui variables
	template = new wysiwye($('#body'));
	bodyBackground = $('#bodybg');
	bodyTextColor = $('#bodytxtc');
	bodyLinkColor = $('#bodyLinkColor');
	bodyFontSize = $('#bodyFontSize');
	body = $('#body');
	contentContainer = $('#contentContainer');
	ccBackground = $('#ccbg');
	ccWidth = $('#ccWidth');
	ccPadding = $('#ccPadding');
	imgSrc = $('#imgSrc');
	imgBg = $('#imgBg');
	imgPadding = $('#imgPadding');
	txtBg = $('#txtBg');
	txtPadding = $('#txtPadding');
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


	//set variables
	$(bodyBackground).val(template.globals.bodyBackground);
	$(bodyTextColor).val(template.globals.bodyTextColor);
	$(bodyLinkColor).val(template.globals.bodyLinkColor);
	$(bodyFontSize).val(template.globals.bodyFontSize);
	$(ccBackground).val(template.globals.contentContainerBackground);
	$(ccWidth).val(template.globals.contentContainerWidth);
	$(ccPadding).val(template.globals.contentContainerPadding);

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

	$(bodyBackground).change(function() {
		$(body).css('background', '#' + $(this).val());
	});
	$(bodyTextColor).change(function() {
		$(body).css('color', '#' + $(this).val());
	});
	$(bodyLinkColor).change(function() {
		$('#body a').css('color', '#' + $(this).val());
	});
	$(bodyFontSize).change(function() {
		$(body).css('font-size', $(this).val() + 'px');
	});
	$(ccBackground).change(function() { 
		$(contentContainer).css('background', '#' + $(this).val());
	});
	$(ccWidth).change(function() {
		$(contentContainer).css('max-width', $(this).val() + 'px');
	});
	$(ccPadding).change(function() {
		$(contentContainer).css('padding', $(this).val() + 'px');
	});

	//image parameter events
	$(imgSrc).change(function() {
		template.updateFocusedModule("src", $(this).val());
		$('.module[index="' + template.getFocusedIndex() + '"] tr td img').attr("src", $(this).val());
	});
	$(imgBg).change(function() {
		template.updateFocusedModule("backgroundColor", $(this).val());
		$('.module[index="' + template.getFocusedIndex() + '"]').css("background", '#' + $(this).val());
	});
	$(imgPadding).change(function() {
		template.updateFocusedModule("containerPadding", $(this).val());
		$('.module[index="' + template.getFocusedIndex() + '"]').css('padding', $(this).val() + 'px');
	});

	//text parameter events
	$(txtBg).change(function() {
		template.updateFocusedModule("backgroundColor", $(this).val());
		$('.module[index="' + template.getFocusedIndex() + '"]').css('background', '#' + $(this).val());
	});
	$(txtPadding).change(function() {
		template.updateFocusedModule("containerPadding", $(this).val());
		$('.module[index="' + template.getFocusedIndex() + '"]').css('padding', $(this).val() + 'px');
	});

	//button parameter events
	$(btnColor).change(function() {
		template.updateFocusedModule("buttonColor", $(this).val());
		$('.module[index="' + template.getFocusedIndex() + '"] tr td a').css("background", '#' + $(this).val());
	});
	$(btnBdrColor).change(function() {
		template.updateFocusedModule("buttonColor", $(this).val());
		$('.module[index="' + template.getFocusedIndex() + '"] tr td a').css("border", '1px solid #' + $(this).val());
	});
	$(btnFntColor).change(function() {
		template.updateFocusedModule("fontColor", $(this).val());
		$('.module[index="' + template.getFocusedIndex() + '"] tr td a').css("color", '#' + $(this).val());
	});
	$(btnRadius).change(function() {
		template.updateFocusedModule("borderRadius", $(this).val());
		$('.module[index="' + template.getFocusedIndex() + '"] tr td a').css("border-radius", $(this).val() + 'px');
	});
	$(btnFntSize).change(function() {
		template.updateFocusedModule("fontSize", $(this).val());
		$('.module[index="' + template.getFocusedIndex() + '"] tr td a').css("fontSize", $(this).val() + 'px');
	});
	$(btnText).change(function() {
		template.updateFocusedModule("buttonText", $(this).val());
		$('.module[index="' + template.getFocusedIndex() + '"] tr td a').html($(this).val());
	});
	$(btnUrl).change(function() {
		template.updateFocusedModule("href", $(this).val());
		$('.module[index="' + template.getFocusedIndex() + '"] tr td a').attr("href", $(this).val());
	});
	$(btnAlign).change(function() {
		template.updateFocusedModule("alignment", $(this).val());
		$('.module[index="' + template.getFocusedIndex() + '"] tr td').css("text-align", $(this).val());
	});
	$(btnBg).change(function() {
		template.updateFocusedModule("backgroundColor", $(this).val());
		$('.module[index="' + template.getFocusedIndex() + '"]').css("background", '#' + $(this).val());
	});
	$(btnPaddingTB).change(function() {
		template.updateFocusedModule("paddingTB", $(this).val());
		$('.module[index="' + template.getFocusedIndex() + '"] tr td a').css("padding-bottom", $(this).val() + 'px').css("padding-top", $(this).val() + 'px');
	});
	$(btnPaddingLR).change(function() {
		template.updateFocusedModule("paddingLR", $(this).val());
		$('.module[index="' + template.getFocusedIndex() + '"] tr td a').css("padding-left", $(this).val() + 'px').css("padding-right", $(this).val() + 'px');
	});
	$(btnContainerPadding).change(function() {
		template.updateFocusedModule("containerPadding", $(this).val());
		$('.module[index="' + template.getFocusedIndex() + '"]').css("padding", $(this).val() + 'px');
	});

	$('.module-add').click(function() {
		var module = $(this).attr('module');
		var moduleElement = template.addModule(module);
		$('.module').removeAttr('selected');
		$(moduleElement).attr('selected', 'true');
		var newModule = template.getFocusedModule();
		changeSettingsView(newModule);
		$(moduleElement).click(function() {
			if (!$(this).attr('selected')) {
				$('.module').removeAttr('selected');
				$(this).attr('selected', 'true');
				//pull settings in the side pane
				var index = $(this).attr('index');
				var focusModule = template.setFocusedModule(parseInt(index));
				changeSettingsView(focusModule);
			}
		});
	});
});
