/*EventTarget自定义动画对象*/

/*
 *定义一个事件对象，其下的handlers为多个类型的事件队列对象
 */
function EventTarget() {
	this.handlers = {};
}

/*重写EventTarget的原型*/
EventTarget.prototype = {
	constructor: EventTarget, //维护contructor属性

	/*添加事件的函数*/
	addHandler: function(type, handler) {
		/*如果没有这个类型的事件队列则创建一个*/
		if (typeof this.handlers[type] == "undefined") {
			this.handlers[type] = [];
		}
		/*添加事件到对应类型的事件队列里面*/
		this.handlers[type].push(handler);
	},

	/*执行函数*/
	fire: function(event) {
		if (!event.target) {
			event.target = this;
		}
		/*当handlers对象下面已经建立起对应类型的队列的时候*/
		if (this.handlers[event.type] instanceof Array) {
			var handlers = this.handlers[event.type];
			/*执行所有已经添加到事件队列的函数*/
			for (var i = 0, len = handlers.length; i < len; i++) {
				handlers[i](event);
			}
		}
	},

	/*删除事件的函数*/
	removeHandler: function(type, handler) {
		if (this.handlers[type] instanceof Array) {
			var handlers = this.handlers[type];
			for (var i = 0, len = handlers.length; i < len; i++) {
				if (handlers[i] === handler) {
					break;
				}
			}
			//删除第i个元素起的后面的1项
			handlers.splice(i, 1);
		}
	}
};