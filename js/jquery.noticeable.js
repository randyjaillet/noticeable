$(
	function () {
		if (!$("#noticeable-container").length) {
			$('<div id="noticeable-container"></div>').appendTo("body");
		}
	}
)

var Noticeable = function (msg, options) {

	this.settings = $.extend(
		{
			type : null,
			autoDestroy : 5000,
			callbacks : {
				create : null,
				destroy : null
			},
			links : []
		},
		options
	);

	var
		context = this,
		classStr = this.settings.hasOwnProperty("type") ? " " + this.settings.type : null
	;

	this.msg = msg;
	this.type = this.settings.type;
	this.ele = $("<div>")
			.addClass("noticeable" + classStr)
			.on(
				"click",
				function () {
					context.destroy();
				}
			)
			.append(
				$("<span>")
						.addClass("inner")
						.append(
							$("<span>")
									.addClass("msg")	
									.text(msg)
						)
			)
			.appendTo("#noticeable-container")
			.find(".inner")
			.css(
				{
					"left" : 
					function () {
						return $(this).outerWidth();
					},
					"opacity" : 0
				}
			)
			.animate(
				{
					"left" : 0,
					"opacity" : 1
				},
				"fast"
			)
			.end()
			.trigger("noticeable.creation")
	;
	
	if (typeof this.settings.links !== 'undefined' && this.settings.links.length > 0) {
		$.each(
			this.settings.links,
			function (key, val) {
				var
					link = $("<a>")
							.attr("href", val.href || "#")
							.on(
								"click",
								val.onClick
							)
							.text(val.text)
							.appendTo($(".inner", context.ele))
				;
			}
		);
	}

	if (this.settings.autoDestroy) {
		this.timer = new Timer(
			function () {
				context.destroy(context.settings.callbacks.destroy);
			},
			this.settings.autoDestroy
		);
		this.ele.hover(
			function () {
				context.timer.pause();
			},
			function () {
				context.timer.resume();
			}
		)
	} else {
		this.ele.addClass("clickToDismiss");
	}

}

Noticeable.prototype.destroy = function (callback) {
	this.ele.fadeOut(
		"fast",
		function () {
			$(this)
					.trigger("noticeable.destruction")
					.remove()
			;
			if (callback) callback ();
		}
	);
}

function Timer(callback, delay) {
	var timerId, start;
	
	this.remaining = delay;
	
	this.pause = function() {
		window.clearTimeout(timerId);
		this.remaining -= new Date() - start;
	};
	
	this.resume = function() {
		start = new Date();
		window.clearTimeout(timerId);
		timerId = window.setTimeout(callback, this.remaining);
	};
	
	this.resume();
}