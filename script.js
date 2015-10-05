//封装拖放
var DragDrop = function() {
	var dragging = null,
		//优化的，对拖放进行了优化
		diffX = 0,
		diffY = 0;
	//------

	function handleEvent(event) {

		//获取事件和目标
		event = EventUtil.getEvent(event);
		var target = EventUtil.getTarget(event);

		switch (event.type) {
			case "mousedown":
				if (target.className.indexOf("draggable") > -1) {
					dragging = target;
					//优化的，缓存点击时鼠标与元素边界的距离
					diffX = event.clientX - target.offsetLeft;
					diffY = event.clientY - target.offsetTop;
					//------
				}
				break;

			case "mousemove":
				if (dragging !== null) {
					//原来的
					// dragging.style.left = event.clientX- + "px";
					// dragging.style.top = event.clientY + "px";

					//优化的
					dragging.style.left = (event.clientX - diffX) + "px";
					dragging.style.top = (event.clientY - diffY) + "px";
					//------
				}
				break;

			case "mouseup":
				dragging = null;
				break;
		}
	}

	return {
		enable: function() {
			EventUtil.addHandler(document, "mousedown", handleEvent);
			EventUtil.addHandler(document, "mousemove", handleEvent);
			EventUtil.addHandler(document, "mouseup", handleEvent);
		},
		disable: function() {
			EventUtil.removeHandler(document, "mousedown", handleEvent);
			EventUtil.removeHandler(document, "mousemove", handleEvent);
			EventUtil.removeHandler(document, "mouseup", handleEvent);
		}
	}
}();

//启用拖放
DragDrop.enable();