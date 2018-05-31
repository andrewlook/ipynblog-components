(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.app = factory());
}(this, (function () { 'use strict';

function noop() {}

function assign(tar, src) {
	for (var k in src) tar[k] = src[k];
	return tar;
}

function assignTrue(tar, src) {
	for (var k in src) tar[k] = 1;
	return tar;
}

function appendNode(node, target) {
	target.appendChild(node);
}

function insertNode(node, target, anchor) {
	target.insertBefore(node, anchor);
}

function detachNode(node) {
	node.parentNode.removeChild(node);
}

function createElement(name) {
	return document.createElement(name);
}

function createText(data) {
	return document.createTextNode(data);
}

function blankObject() {
	return Object.create(null);
}

function destroy(detach) {
	this.destroy = noop;
	this.fire('destroy');
	this.set = noop;

	this._fragment.d(detach !== false);
	this._fragment = null;
	this._state = {};
}

function _differs(a, b) {
	return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
}

function fire(eventName, data) {
	var handlers =
		eventName in this._handlers && this._handlers[eventName].slice();
	if (!handlers) return;

	for (var i = 0; i < handlers.length; i += 1) {
		var handler = handlers[i];

		if (!handler.__calling) {
			handler.__calling = true;
			handler.call(this, data);
			handler.__calling = false;
		}
	}
}

function get() {
	return this._state;
}

function init(component, options) {
	component._handlers = blankObject();
	component._bind = options._bind;

	component.options = options;
	component.root = options.root || component;
	component.store = component.root.store || options.store;
}

function on(eventName, handler) {
	var handlers = this._handlers[eventName] || (this._handlers[eventName] = []);
	handlers.push(handler);

	return {
		cancel: function() {
			var index = handlers.indexOf(handler);
			if (~index) handlers.splice(index, 1);
		}
	};
}

function set(newState) {
	this._set(assign({}, newState));
	if (this.root._lock) return;
	this.root._lock = true;
	callAll(this.root._beforecreate);
	callAll(this.root._oncreate);
	callAll(this.root._aftercreate);
	this.root._lock = false;
}

function _set(newState) {
	var oldState = this._state,
		changed = {},
		dirty = false;

	for (var key in newState) {
		if (this._differs(newState[key], oldState[key])) changed[key] = dirty = true;
	}
	if (!dirty) return;

	this._state = assign(assign({}, oldState), newState);
	this._recompute(changed, this._state);
	if (this._bind) this._bind(changed, this._state);

	if (this._fragment) {
		this.fire("state", { changed: changed, current: this._state, previous: oldState });
		this._fragment.p(changed, this._state);
		this.fire("update", { changed: changed, current: this._state, previous: oldState });
	}
}

function callAll(fns) {
	while (fns && fns.length) fns.shift()();
}

function _mount(target, anchor) {
	this._fragment[this._fragment.i ? 'i' : 'm'](target, anchor || null);
}

var proto = {
	destroy,
	get,
	fire,
	on,
	set,
	_recompute: noop,
	_set,
	_mount,
	_differs
};

/* src/PostPreview.html generated by Svelte v2.6.0 */
function data() {
    return {
        title: "Desert Friends",
        description: "A psychadelic journey through time and space",
        pubDate: "May 10, 2017",
        thumbnailImgPath: "./images/desert_friends.png",
        url: "https://distill.pub/2018/building-blocks/",
        tags: ["art"],
    }
}

function oncreate() {
    console.log('SlotPostPreview[this.options]:  ');
    console.log(this.options);
    console.log(this.options.data);
}

function create_main_fragment(component, ctx) {
	var a, div, div_1, text, text_1, div_2, text_5, div_3, img, text_6, div_4, h2, text_7, text_8, p, text_9;

	return {
		c: function c() {
			a = createElement("a");
			div = createElement("div");
			div_1 = createElement("div");
			text = createText(ctx.pubDate);
			text_1 = createText("\n\n    ");
			div_2 = createElement("div");
			div_2.innerHTML = "<span class=\"tag\">commentary</span>";
			text_5 = createText("\n  ");
			div_3 = createElement("div");
			img = createElement("img");
			text_6 = createText("\n  ");
			div_4 = createElement("div");
			h2 = createElement("h2");
			text_7 = createText(ctx.title);
			text_8 = createText("\n    ");
			p = createElement("p");
			text_9 = createText(ctx.description);
			this.c = noop;
			div_1.className = "publishedDate";
			div_2.className = "tags";
			div.className = "metadata";
			img.src = ctx.thumbnailImgPath;
			img.alt = ctx.title;
			div_3.className = "thumbnail";
			div_4.className = "description";
			a.href = ctx.url;
			a.className = "post-preview";
		},

		m: function m(target, anchor) {
			insertNode(a, target, anchor);
			appendNode(div, a);
			appendNode(div_1, div);
			appendNode(text, div_1);
			appendNode(text_1, div);
			appendNode(div_2, div);
			appendNode(text_5, a);
			appendNode(div_3, a);
			appendNode(img, div_3);
			appendNode(text_6, a);
			appendNode(div_4, a);
			appendNode(h2, div_4);
			appendNode(text_7, h2);
			appendNode(text_8, div_4);
			appendNode(p, div_4);
			appendNode(text_9, p);
		},

		p: function p(changed, ctx) {
			if (changed.pubDate) {
				text.data = ctx.pubDate;
			}

			if (changed.thumbnailImgPath) {
				img.src = ctx.thumbnailImgPath;
			}

			if (changed.title) {
				img.alt = ctx.title;
				text_7.data = ctx.title;
			}

			if (changed.description) {
				text_9.data = ctx.description;
			}

			if (changed.url) {
				a.href = ctx.url;
			}
		},

		d: function d(detach) {
			if (detach) {
				detachNode(a);
			}
		}
	};
}

var PostPreview = (function (HTMLElement) {
	function PostPreview(options) {
		var this$1 = this;
		if ( options === void 0 ) options = {};

		HTMLElement.call(this);
		init(this, options);
		this._state = assign(data(), options.data);
		this._intro = true;

		this.attachShadow({ mode: 'open' });
		this.shadowRoot.innerHTML = "<style>.description h2,.description p{font-family:-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen, Ubuntu, Cantarell, \"Fira Sans\", \"Droid Sans\", \"Helvetica Neue\", Arial, sans-serif}.description h2{font-weight:700}.post-preview{text-decoration:none;overflow:hidden;display:block;border-bottom:1px solid rgba(0, 0, 0, 0.1);padding:24px 0}.post-preview:last-of-type{border-bottom:none}.post-preview h2{margin:0 0 6px 0;line-height:1.2em;font-style:normal;font-size:24px}.post-preview p{margin:0 0 12px 0;line-height:1.4em;font-size:16px}.post-preview .thumbnail{box-sizing:border-box;margin-bottom:24px;position:relative;max-width:500px}.post-preview img{width:100%;display:block}.metadata{font-size:12px;line-height:1.4em;margin-bottom:18px}.metadata>*{display:inline-block}.metadata .publishedDate{margin-right:1em}.metadata .tags{margin-top:1em}.tags .tag{color:rgba(0,0,0,0.67);padding:0.3em 0.5em;margin:0;font-size:80%;border:1px solid rgba(0,0,0,0.4);border-radius:3px;text-transform:uppercase;font-weight:500}@media(min-width: 768px){.post-preview h2{font-size:26px}.post-preview .thumbnail{float:right;width:35%;margin-bottom:0}.post-preview .description{float:left;width:40%}.post-preview .metadata{float:left;width:15%;margin-top:8px}.post-preview p{margin:0 0 12px 0;line-height:1.5em;font-size:16px}}</style>";

		if (!options.root) {
			this._oncreate = [];
		}

		this._fragment = create_main_fragment(this, this._state);

		this.root._oncreate.push(function () {
			oncreate.call(this$1);
			this$1.fire("update", { changed: assignTrue({}, this$1._state), current: this$1._state });
		});

		this._fragment.c();
		this._fragment.m(this.shadowRoot, null);

		if (options.target) { this._mount(options.target, options.anchor); }
	}

	if ( HTMLElement ) PostPreview.__proto__ = HTMLElement;
	PostPreview.prototype = Object.create( HTMLElement && HTMLElement.prototype );
	PostPreview.prototype.constructor = PostPreview;

	var prototypeAccessors = { url: { configurable: true },pubDate: { configurable: true },thumbnailImgPath: { configurable: true },title: { configurable: true },description: { configurable: true } };
	var staticAccessors = { observedAttributes: { configurable: true } };

	staticAccessors.observedAttributes.get = function () {
		return ["url","pubDate","thumbnailImgPath","title","description"];
	};

	prototypeAccessors.url.get = function () {
		return this.get().url;
	};

	prototypeAccessors.url.set = function (value) {
		this.set({ url: value });
	};

	prototypeAccessors.pubDate.get = function () {
		return this.get().pubDate;
	};

	prototypeAccessors.pubDate.set = function (value) {
		this.set({ pubDate: value });
	};

	prototypeAccessors.thumbnailImgPath.get = function () {
		return this.get().thumbnailImgPath;
	};

	prototypeAccessors.thumbnailImgPath.set = function (value) {
		this.set({ thumbnailImgPath: value });
	};

	prototypeAccessors.title.get = function () {
		return this.get().title;
	};

	prototypeAccessors.title.set = function (value) {
		this.set({ title: value });
	};

	prototypeAccessors.description.get = function () {
		return this.get().description;
	};

	prototypeAccessors.description.set = function (value) {
		this.set({ description: value });
	};

	PostPreview.prototype.attributeChangedCallback = function attributeChangedCallback (attr, oldValue, newValue) {
		var obj;

		this.set(( obj = {}, obj[attr] = newValue, obj));
	};

	PostPreview.prototype.connectedCallback = function connectedCallback () {
		callAll(this._oncreate);
	};

	Object.defineProperties( PostPreview.prototype, prototypeAccessors );
	Object.defineProperties( PostPreview, staticAccessors );

	return PostPreview;
}(HTMLElement));

assign(PostPreview.prototype, proto);
assign(PostPreview.prototype, {
	_mount: function _mount$$1(target, anchor) {
		target.insertBefore(this, anchor);
	}
});

customElements.define("post-preview", PostPreview);

/* src/PostsList.html generated by Svelte v2.6.0 */
function create_main_fragment$1(component, ctx) {
	var div, slot, p;

	return {
		c: function c() {
			div = createElement("div");
			slot = createElement("slot");
			p = createElement("p");
			p.textContent = "placeholder";
			this.c = noop;
			div.className = "posts-list l-page";
		},

		m: function m(target, anchor) {
			insertNode(div, target, anchor);
			appendNode(slot, div);
			appendNode(p, slot);
		},

		p: noop,

		d: function d(detach) {
			if (detach) {
				detachNode(div);
			}
		}
	};
}

var PostsList = (function (HTMLElement) {
	function PostsList(options) {
		if ( options === void 0 ) options = {};

		HTMLElement.call(this);
		init(this, options);
		this._state = assign({}, options.data);
		this._intro = true;

		this._slotted = options.slots || {};

		this.attachShadow({ mode: 'open' });
		this.shadowRoot.innerHTML = "<style>.posts-list{margin-top:24px;margin-bottom:24px}@media(min-width: 768px){.posts-list{margin-top:60px}}</style>";

		this.slots = {};

		this._fragment = create_main_fragment$1(this, this._state);

		this._fragment.c();
		this._fragment.m(this.shadowRoot, null);

		if (options.target) { this._mount(options.target, options.anchor); }
	}

	if ( HTMLElement ) PostsList.__proto__ = HTMLElement;
	PostsList.prototype = Object.create( HTMLElement && HTMLElement.prototype );
	PostsList.prototype.constructor = PostsList;

	var staticAccessors = { observedAttributes: { configurable: true } };

	staticAccessors.observedAttributes.get = function () {
		return [];
	};



	PostsList.prototype.connectedCallback = function connectedCallback () {
		var this$1 = this;

		Object.keys(this._slotted).forEach(function (key) {
			this$1.appendChild(this$1._slotted[key]);
		});
	};

	PostsList.prototype.attributeChangedCallback = function attributeChangedCallback (attr, oldValue, newValue) {
		var obj;

		this.set(( obj = {}, obj[attr] = newValue, obj));
	};

	Object.defineProperties( PostsList, staticAccessors );

	return PostsList;
}(HTMLElement));

assign(PostsList.prototype, proto);
assign(PostsList.prototype, {
	_mount: function _mount$$1(target, anchor) {
		target.insertBefore(this, anchor);
	}
});

customElements.define("posts-list", PostsList);

var components = [
    PostPreview,
    PostsList ];

return components;

})));
//# sourceMappingURL=components.js.map
