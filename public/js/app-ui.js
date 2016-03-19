$(function() {
	Split(['.sidebar', '.page-content'], {
		sizes: [20, 80],
		minSize: 250
	});
});

$('.page-content').scroll(function (event) {
    var scroll = $('.page-content').scrollTop(),
    fabBtn = $('.fab-btn');
    if (scroll>100) {
        TweenMax.to(fabBtn, 0.5, {"right":-66});
    } else {
    	TweenMax.to(fabBtn, 0.5, {"right":30});
    }
});