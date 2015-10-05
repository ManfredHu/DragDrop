//封装拖放
var DragDrop = function() {
	var dragdrop = new EventTarget(),
		dragging = null,
		diffX = 0,
		diffY = 0;

	function handleEvent(event) {

		//获取事件和目标
		event = EventUtil.getEvent(event);
		var target = EventUtil.getTarget(event);

		switch (event.type) {
			case "mousedown":
				if (target.className.indexOf("draggable") > -1) {
					dragging = target;
					diffX = event.clientX - target.offsetLeft;
					diffY = event.clientY - target.offsetTop;
					//触发dragstart类型事件
					dragdrop.fire({
						type: "dragstart",
						target: dragging,
						x: event.clientX,
						y: event.clientY
					});

				}
				break;

			case "mousemove":
				if (dragging !== null) {
					dragging.style.left = (event.clientX - diffX) + "px";
					dragging.style.top = (event.clientY - diffY) + "px";
					//触发drag类型事件
					dragdrop.fire({
						type: "drag",
						target: dragging,
						x: event.clientX,
						y: event.clientY
					});
				}
				break;

			case "mouseup":
				//触发dragend类型事件
				dragdrop.fire({
					type: "dragend",
					target: dragging,
					x: event.clientX,
					y: event.clientY
				});
				dragging = null;
				break;
		}
	}

	dragdrop.enable = function() {
		EventUtil.addHandler(document, "mousedown", handleEvent);
		EventUtil.addHandler(document, "mousemove", handleEvent);
		EventUtil.addHandler(document, "mouseup", handleEvent);
	};

	dragdrop.disable = function() {
		EventUtil.removeHandler(document, "mousedown", handleEvent);
		EventUtil.removeHandler(document, "mousemove", handleEvent);
		EventUtil.removeHandler(document, "mouseup", handleEvent);
	};

	//dragdrop对象是EventTarget的实例
	//拥有addHandler,fire,removeHandler方法
	return dragdrop;
}();

//---------------------------------------------------------------
//绑定事件
//---------------------------------------------------------------
DragDrop.enable();

DragDrop.addHandler("dragstart", function() {
	var status = document.getElementById('status');
	status.innerHTML = "Started dragging " + event.target.id;
});

DragDrop.addHandler("drag", function() {
	var status = document.getElementById('status2');
	status.innerHTML = "<br/> Dragged " + event.target.id + " to (" + event.x + "," + event.y + ")";
});

DragDrop.addHandler("dragend", function() {
	var status = document.getElementById('status3');
	status.innerHTML = "<br/> Dragged " + event.target.id + " at (" + event.x + "," + event.y + ")";
});