(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.components = factory());
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

function destroyDev(detach) {
	destroy.call(this, detach);
	this.destroy = function() {
		console.warn('Component was already destroyed');
	};
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

function setDev(newState) {
	if (typeof newState !== 'object') {
		throw new Error(
			this._debugName + '.set was called without an object of data key-values to update.'
		);
	}

	this._checkReadOnly(newState);
	set.call(this, newState);
}

function callAll(fns) {
	while (fns && fns.length) fns.shift()();
}

function _mount(target, anchor) {
	this._fragment[this._fragment.i ? 'i' : 'm'](target, anchor || null);
}

var protoDev = {
	destroy: destroyDev,
	get,
	fire,
	on,
	set: setDev,
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
		c: function create() {
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

		m: function mount(target, anchor) {
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

		p: function update(changed, ctx) {
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

		d: function destroy$$1(detach) {
			if (detach) {
				detachNode(a);
			}
		}
	};
}

class PostPreview extends HTMLElement {
	constructor(options = {}) {
		super();
		this._debugName = '<post-preview>';
		init(this, options);
		this._state = assign(data(), options.data);
		if (!('url' in this._state) && !('url' in this.attributes)) console.warn("<post-preview> was created without expected data property 'url'");
		if (!('pubDate' in this._state) && !('pubDate' in this.attributes)) console.warn("<post-preview> was created without expected data property 'pubDate'");
		if (!('thumbnailImgPath' in this._state) && !('thumbnailImgPath' in this.attributes)) console.warn("<post-preview> was created without expected data property 'thumbnailImgPath'");
		if (!('title' in this._state) && !('title' in this.attributes)) console.warn("<post-preview> was created without expected data property 'title'");
		if (!('description' in this._state) && !('description' in this.attributes)) console.warn("<post-preview> was created without expected data property 'description'");
		this._intro = true;

		this.attachShadow({ mode: 'open' });
		this.shadowRoot.innerHTML = `<style>.description h2,.description p{font-family:-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", Arial, sans-serif}.description h2{font-weight:700}.post-preview{text-decoration:none;overflow:hidden;display:block;border-bottom:1px solid rgba(0, 0, 0, 0.1);padding:24px 0}.post-preview:last-of-type{border-bottom:none}.post-preview h2{margin:0 0 6px 0;line-height:1.2em;font-style:normal;font-size:24px}.post-preview p{margin:0 0 12px 0;line-height:1.4em;font-size:16px}.post-preview .thumbnail{box-sizing:border-box;margin-bottom:24px;position:relative;max-width:500px}.post-preview img{width:100%;display:block}.metadata{font-size:12px;line-height:1.4em;margin-bottom:18px}.metadata>*{display:inline-block}.metadata .publishedDate{margin-right:1em}.metadata .tags{margin-top:1em}.tags .tag{color:rgba(0,0,0,0.67);padding:0.3em 0.5em;margin:0;font-size:80%;border:1px solid rgba(0,0,0,0.4);border-radius:3px;text-transform:uppercase;font-weight:500}@media(min-width: 768px){.post-preview h2{font-size:26px}.post-preview .thumbnail{float:right;width:35%;margin-bottom:0}.post-preview .description{float:left;width:40%}.post-preview .metadata{float:left;width:15%;margin-top:8px}.post-preview p{margin:0 0 12px 0;line-height:1.5em;font-size:16px}}
		/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUG9zdFByZXZpZXcuaHRtbCIsInNvdXJjZXMiOlsiUG9zdFByZXZpZXcuaHRtbCJdLCJzb3VyY2VzQ29udGVudCI6WyI8IS0tXG4vLyBDb3B5cmlnaHQgMjAxOCBUaGUgRGlzdGlsbCBUZW1wbGF0ZSBBdXRob3JzXG4vL1xuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbi8vIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbi8vIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuLy9cbi8vICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4vL1xuLy8gVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuLy8gZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuLy8gV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4vLyBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4vLyBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbi0tPlxuXG48YSBocmVmPVwieyB1cmwgfVwiIGNsYXNzPVwicG9zdC1wcmV2aWV3XCI+XG4gIDxkaXYgY2xhc3M9XCJtZXRhZGF0YVwiPlxuICAgIDxkaXYgY2xhc3M9XCJwdWJsaXNoZWREYXRlXCI+eyBwdWJEYXRlIH08L2Rpdj5cblxuICAgIDxkaXYgY2xhc3M9XCJ0YWdzXCI+XG4gICAgICA8IS0tIFRPRE8gbWFrZSB0aGlzIGR5bmFtaWMgLS0+XG4gICAgICA8c3BhbiBjbGFzcz1cInRhZ1wiPmNvbW1lbnRhcnk8L3NwYW4+XG4gICAgPC9kaXY+XG5cbiAgPC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJ0aHVtYm5haWxcIj48aW1nIHNyYz1cInsgdGh1bWJuYWlsSW1nUGF0aCB9XCIgYWx0PVwieyB0aXRsZSB9XCIgLz48L2Rpdj5cbiAgPGRpdiBjbGFzcz1cImRlc2NyaXB0aW9uXCI+XG4gICAgPGgyPnsgdGl0bGUgfTwvaDI+XG4gICAgPHA+eyBkZXNjcmlwdGlvbiB9PC9wPlxuICA8L2Rpdj5cbjwvYT5cblxuPHN0eWxlPlxuXG4uZGVzY3JpcHRpb24gaDIsXG4uZGVzY3JpcHRpb24gcCB7XG4gIGZvbnQtZmFtaWx5OiAtYXBwbGUtc3lzdGVtLCBCbGlua01hY1N5c3RlbUZvbnQsIFwiU2Vnb2UgVUlcIiwgUm9ib3RvLCBPeHlnZW4sIFVidW50dSwgQ2FudGFyZWxsLCBcIkZpcmEgU2Fuc1wiLCBcIkRyb2lkIFNhbnNcIiwgXCJIZWx2ZXRpY2EgTmV1ZVwiLCBBcmlhbCwgc2Fucy1zZXJpZjtcbn1cblxuLmRlc2NyaXB0aW9uIGgyIHtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbn1cblxuLnBvc3QtcHJldmlldyB7XG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgZGlzcGxheTogYmxvY2s7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCByZ2JhKDAsIDAsIDAsIDAuMSk7XG4gIHBhZGRpbmc6IDI0cHggMDtcbn1cbi5wb3N0LXByZXZpZXc6bGFzdC1vZi10eXBlIHtcbiAgYm9yZGVyLWJvdHRvbTogbm9uZTtcbn1cblxuLnBvc3QtcHJldmlldyBoMiB7XG4gIG1hcmdpbjogMCAwIDZweCAwO1xuICBsaW5lLWhlaWdodDogMS4yZW07XG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcbiAgZm9udC1zaXplOiAyNHB4O1xufVxuXG4ucG9zdC1wcmV2aWV3IHAge1xuICBtYXJnaW46IDAgMCAxMnB4IDA7XG4gIGxpbmUtaGVpZ2h0OiAxLjRlbTtcbiAgZm9udC1zaXplOiAxNnB4O1xufVxuXG4ucG9zdC1wcmV2aWV3IC50aHVtYm5haWwge1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICBtYXJnaW4tYm90dG9tOiAyNHB4O1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIG1heC13aWR0aDogNTAwcHg7XG59XG4ucG9zdC1wcmV2aWV3IGltZyB7XG4gIHdpZHRoOiAxMDAlO1xuICBkaXNwbGF5OiBibG9jaztcbn1cblxuLm1ldGFkYXRhIHtcbiAgZm9udC1zaXplOiAxMnB4O1xuICBsaW5lLWhlaWdodDogMS40ZW07XG4gIG1hcmdpbi1ib3R0b206IDE4cHg7XG59XG5cbi5tZXRhZGF0YSA+ICoge1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG59XG5cbi5tZXRhZGF0YSAucHVibGlzaGVkRGF0ZSB7XG4gIG1hcmdpbi1yaWdodDogMWVtO1xufVxuXG4ubWV0YWRhdGEgLnRhZ3Mge1xuICBtYXJnaW4tdG9wOiAxZW07XG59XG5cbi50YWdzIC50YWcge1xuICBjb2xvcjogcmdiYSgwLDAsMCwwLjY3KTtcbiAgcGFkZGluZzogMC4zZW0gMC41ZW07XG4gIG1hcmdpbjogMDtcbiAgZm9udC1zaXplOiA4MCU7XG4gIGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoMCwwLDAsMC40KTtcbiAgYm9yZGVyLXJhZGl1czogM3B4O1xuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuICBmb250LXdlaWdodDogNTAwO1xufVxuXG5AbWVkaWEobWluLXdpZHRoOiA3NjhweCkge1xuICAucG9zdC1wcmV2aWV3IGgyIHtcbiAgICBmb250LXNpemU6IDI2cHg7XG4gIH1cbiAgLnBvc3QtcHJldmlldyAudGh1bWJuYWlsIHtcbiAgICBmbG9hdDogcmlnaHQ7XG4gICAgd2lkdGg6IDM1JTtcbiAgICBtYXJnaW4tYm90dG9tOiAwO1xuICB9XG4gIC5wb3N0LXByZXZpZXcgLmRlc2NyaXB0aW9uIHtcbiAgICBmbG9hdDogbGVmdDtcbiAgICB3aWR0aDogNDAlO1xuICB9XG4gIC5wb3N0LXByZXZpZXcgLm1ldGFkYXRhIHtcbiAgICBmbG9hdDogbGVmdDtcbiAgICB3aWR0aDogMTUlO1xuICAgIG1hcmdpbi10b3A6IDhweDtcbiAgfVxuICAucG9zdC1wcmV2aWV3IHAge1xuICAgIG1hcmdpbjogMCAwIDEycHggMDtcbiAgICBsaW5lLWhlaWdodDogMS41ZW07XG4gICAgZm9udC1zaXplOiAxNnB4O1xuICB9XG59XG5cbjwvc3R5bGU+XG5cblxuPHNjcmlwdD5cbiAgICBleHBvcnQgZGVmYXVsdCB7XG4gICAgICAgIHRhZzogJ3Bvc3QtcHJldmlldycsXG4gICAgICAgIGRhdGEoKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHRpdGxlOiBcIkRlc2VydCBGcmllbmRzXCIsXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiQSBwc3ljaGFkZWxpYyBqb3VybmV5IHRocm91Z2ggdGltZSBhbmQgc3BhY2VcIixcbiAgICAgICAgICAgICAgICBwdWJEYXRlOiBcIk1heSAxMCwgMjAxN1wiLFxuICAgICAgICAgICAgICAgIHRodW1ibmFpbEltZ1BhdGg6IFwiLi9pbWFnZXMvZGVzZXJ0X2ZyaWVuZHMucG5nXCIsXG4gICAgICAgICAgICAgICAgdXJsOiBcImh0dHBzOi8vZGlzdGlsbC5wdWIvMjAxOC9idWlsZGluZy1ibG9ja3MvXCIsXG4gICAgICAgICAgICAgICAgdGFnczogW1wiYXJ0XCJdLFxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBvbmNyZWF0ZSgpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdTbG90UG9zdFByZXZpZXdbdGhpcy5vcHRpb25zXTogICcpO1xuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5vcHRpb25zKVxuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5vcHRpb25zLmRhdGEpO1xuICAgICAgICB9LFxuICAgIH07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 */</style>`;

		if (!options.root) {
			this._oncreate = [];
		}

		this._fragment = create_main_fragment(this, this._state);

		this.root._oncreate.push(() => {
			oncreate.call(this);
			this.fire("update", { changed: assignTrue({}, this._state), current: this._state });
		});

		this._fragment.c();
		this._fragment.m(this.shadowRoot, null);

		if (options.target) this._mount(options.target, options.anchor);
	}

	static get observedAttributes() {
		return ["url","pubDate","thumbnailImgPath","title","description"];
	}

	get url() {
		return this.get().url;
	}

	set url(value) {
		this.set({ url: value });
	}

	get pubDate() {
		return this.get().pubDate;
	}

	set pubDate(value) {
		this.set({ pubDate: value });
	}

	get thumbnailImgPath() {
		return this.get().thumbnailImgPath;
	}

	set thumbnailImgPath(value) {
		this.set({ thumbnailImgPath: value });
	}

	get title() {
		return this.get().title;
	}

	set title(value) {
		this.set({ title: value });
	}

	get description() {
		return this.get().description;
	}

	set description(value) {
		this.set({ description: value });
	}

	attributeChangedCallback(attr, oldValue, newValue) {
		this.set({ [attr]: newValue });
	}

	connectedCallback() {
		callAll(this._oncreate);
	}
}

assign(PostPreview.prototype, protoDev);
assign(PostPreview.prototype, {
	_mount(target, anchor) {
		target.insertBefore(this, anchor);
	}
});

customElements.define("post-preview", PostPreview);

PostPreview.prototype._checkReadOnly = function _checkReadOnly(newState) {
};

/* src/PostsList.html generated by Svelte v2.6.0 */
function create_main_fragment$1(component, ctx) {
	var div, slot, p;

	return {
		c: function create() {
			div = createElement("div");
			slot = createElement("slot");
			p = createElement("p");
			p.textContent = "placeholder";
			this.c = noop;
			div.className = "posts-list l-page";
		},

		m: function mount(target, anchor) {
			insertNode(div, target, anchor);
			appendNode(slot, div);
			appendNode(p, slot);
		},

		p: noop,

		d: function destroy$$1(detach) {
			if (detach) {
				detachNode(div);
			}
		}
	};
}

class PostsList extends HTMLElement {
	constructor(options = {}) {
		super();
		this._debugName = '<posts-list>';
		init(this, options);
		this._state = assign({}, options.data);
		this._intro = true;

		this._slotted = options.slots || {};

		this.attachShadow({ mode: 'open' });
		this.shadowRoot.innerHTML = `<style>.posts-list{margin-top:24px;margin-bottom:24px}@media(min-width: 768px){.posts-list{margin-top:60px}}
		/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUG9zdHNMaXN0Lmh0bWwiLCJzb3VyY2VzIjpbIlBvc3RzTGlzdC5odG1sIl0sInNvdXJjZXNDb250ZW50IjpbIjwhLS1cbi8vIENvcHlyaWdodCAyMDE4IFRoZSBEaXN0aWxsIFRlbXBsYXRlIEF1dGhvcnNcbi8vXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuLy8geW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuLy8gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4vL1xuLy8gICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbi8vXG4vLyBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4vLyBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4vLyBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbi8vIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbi8vIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuLS0+XG5cbjxkaXYgY2xhc3M9XCJwb3N0cy1saXN0IGwtcGFnZVwiPlxuICAgIDxzbG90PlxuICAgICAgICA8cD5wbGFjZWhvbGRlcjwvcD5cbiAgICA8L3Nsb3Q+XG48L2Rpdj5cblxuXG5cbjxzdHlsZT5cblxuLnBvc3RzLWxpc3Qge1xuICBtYXJnaW4tdG9wOiAyNHB4O1xuICBtYXJnaW4tYm90dG9tOiAyNHB4O1xufVxuXG5AbWVkaWEobWluLXdpZHRoOiA3NjhweCkge1xuICAucG9zdHMtbGlzdCB7XG4gICAgbWFyZ2luLXRvcDogNjBweDtcbiAgfVxufVxuXG48L3N0eWxlPlxuXG48c2NyaXB0PlxuZXhwb3J0IGRlZmF1bHQge1xuICAgIHRhZzogJ3Bvc3RzLWxpc3QnXG59XG48L3NjcmlwdD5cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUEwQkEsV0FBVyxBQUFDLENBQUMsQUFDWCxVQUFVLENBQUUsSUFBSSxDQUNoQixhQUFhLENBQUUsSUFBSSxBQUNyQixDQUFDLEFBRUQsTUFBTSxZQUFZLEtBQUssQ0FBQyxBQUFDLENBQUMsQUFDeEIsV0FBVyxBQUFDLENBQUMsQUFDWCxVQUFVLENBQUUsSUFBSSxBQUNsQixDQUFDLEFBQ0gsQ0FBQyJ9 */</style>`;

		this.slots = {};

		this._fragment = create_main_fragment$1(this, this._state);

		this._fragment.c();
		this._fragment.m(this.shadowRoot, null);

		if (options.target) this._mount(options.target, options.anchor);
	}

	static get observedAttributes() {
		return [];
	}



	connectedCallback() {
		Object.keys(this._slotted).forEach(key => {
			this.appendChild(this._slotted[key]);
		});
	}

	attributeChangedCallback(attr, oldValue, newValue) {
		this.set({ [attr]: newValue });
	}
}

assign(PostsList.prototype, protoDev);
assign(PostsList.prototype, {
	_mount(target, anchor) {
		target.insertBefore(this, anchor);
	}
});

customElements.define("posts-list", PostsList);

PostsList.prototype._checkReadOnly = function _checkReadOnly(newState) {
};

/* src/HeaderNav.html generated by Svelte v2.6.0 */
function create_main_fragment$2(component, ctx) {
	var div, slot, h1;

	return {
		c: function create() {
			div = createElement("div");
			slot = createElement("slot");
			h1 = createElement("h1");
			h1.textContent = "true";
			this.c = noop;
			div.className = "header-nav content";
		},

		m: function mount(target, anchor) {
			insertNode(div, target, anchor);
			appendNode(slot, div);
			appendNode(h1, slot);
		},

		p: noop,

		d: function destroy$$1(detach) {
			if (detach) {
				detachNode(div);
			}
		}
	};
}

class HeaderNav extends HTMLElement {
	constructor(options = {}) {
		super();
		this._debugName = '<header-nav>';
		init(this, options);
		this._state = assign({}, options.data);
		this._intro = true;

		this._slotted = options.slots || {};

		this.attachShadow({ mode: 'open' });
		this.shadowRoot.innerHTML = `<style>.header-nav{display:block;position:relative;height:60px;background-color:hsl(200, 60%, 15%);width:100%;box-sizing:border-box;z-index:2;color:rgba(0, 0, 0, 0.8);border-bottom:1px solid rgba(0, 0, 0, 0.08);box-shadow:0 1px 6px rgba(0, 0, 0, 0.05)}@media(min-width: 1080px){.header-nav{height:70px}}
		/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSGVhZGVyTmF2Lmh0bWwiLCJzb3VyY2VzIjpbIkhlYWRlck5hdi5odG1sIl0sInNvdXJjZXNDb250ZW50IjpbIjxkaXYgY2xhc3M9XCJoZWFkZXItbmF2IGNvbnRlbnRcIj5cbiAgICA8c2xvdD5cbiAgICAgICAgPGgxPnRydWU8L2gxPlxuICAgIDwvc2xvdD5cbjwvZGl2PlxuXG48c3R5bGU+XG4uaGVhZGVyLW5hdiB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGhlaWdodDogNjBweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogaHNsKDIwMCwgNjAlLCAxNSUpO1xuICB3aWR0aDogMTAwJTtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgei1pbmRleDogMjtcbiAgY29sb3I6IHJnYmEoMCwgMCwgMCwgMC44KTtcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIHJnYmEoMCwgMCwgMCwgMC4wOCk7XG4gIGJveC1zaGFkb3c6IDAgMXB4IDZweCByZ2JhKDAsIDAsIDAsIDAuMDUpO1xufVxuQG1lZGlhKG1pbi13aWR0aDogMTA4MHB4KSB7XG4gIC5oZWFkZXItbmF2IHtcbiAgICBoZWlnaHQ6IDcwcHg7XG4gIH1cbn1cbjwvc3R5bGU+XG5cblxuPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICB0YWc6ICdoZWFkZXItbmF2J1xufVxuPC9zY3JpcHQ+Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQU9BLFdBQVcsQUFBQyxDQUFDLEFBQ1gsT0FBTyxDQUFFLEtBQUssQ0FDZCxRQUFRLENBQUUsUUFBUSxDQUNsQixNQUFNLENBQUUsSUFBSSxDQUNaLGdCQUFnQixDQUFFLElBQUksR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQ3BDLEtBQUssQ0FBRSxJQUFJLENBQ1gsVUFBVSxDQUFFLFVBQVUsQ0FDdEIsT0FBTyxDQUFFLENBQUMsQ0FDVixLQUFLLENBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FDekIsYUFBYSxDQUFFLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FDNUMsVUFBVSxDQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEFBQzNDLENBQUMsQUFDRCxNQUFNLFlBQVksTUFBTSxDQUFDLEFBQUMsQ0FBQyxBQUN6QixXQUFXLEFBQUMsQ0FBQyxBQUNYLE1BQU0sQ0FBRSxJQUFJLEFBQ2QsQ0FBQyxBQUNILENBQUMifQ== */</style>`;

		this.slots = {};

		this._fragment = create_main_fragment$2(this, this._state);

		this._fragment.c();
		this._fragment.m(this.shadowRoot, null);

		if (options.target) this._mount(options.target, options.anchor);
	}

	static get observedAttributes() {
		return [];
	}



	connectedCallback() {
		Object.keys(this._slotted).forEach(key => {
			this.appendChild(this._slotted[key]);
		});
	}

	attributeChangedCallback(attr, oldValue, newValue) {
		this.set({ [attr]: newValue });
	}
}

assign(HeaderNav.prototype, protoDev);
assign(HeaderNav.prototype, {
	_mount(target, anchor) {
		target.insertBefore(this, anchor);
	}
});

customElements.define("header-nav", HeaderNav);

HeaderNav.prototype._checkReadOnly = function _checkReadOnly(newState) {
};

/* src/HeaderNavLinks.html generated by Svelte v2.6.0 */
function create_main_fragment$3(component, ctx) {
	var div, slot, a, text_1, a_1, text_3, a_2;

	return {
		c: function create() {
			div = createElement("div");
			slot = createElement("slot");
			a = createElement("a");
			a.textContent = "About";
			text_1 = createText("\n        ");
			a_1 = createElement("a");
			a_1.textContent = "Prize";
			text_3 = createText("\n        ");
			a_2 = createElement("a");
			a_2.textContent = "Submit";
			this.c = noop;
			a.href = "https://distill.pub/about/";
			a_1.href = "https://distill.pub/prize/";
			a_2.href = "https://distill.pub/journal/";
			div.className = "nav";
		},

		m: function mount(target, anchor) {
			insertNode(div, target, anchor);
			appendNode(slot, div);
			appendNode(a, slot);
			appendNode(text_1, slot);
			appendNode(a_1, slot);
			appendNode(text_3, slot);
			appendNode(a_2, slot);
		},

		p: noop,

		d: function destroy$$1(detach) {
			if (detach) {
				detachNode(div);
			}
		}
	};
}

class HeaderNavLinks extends HTMLElement {
	constructor(options = {}) {
		super();
		this._debugName = '<header-nav-links>';
		init(this, options);
		this._state = assign({}, options.data);
		this._intro = true;

		this._slotted = options.slots || {};

		this.attachShadow({ mode: 'open' });
		this.shadowRoot.innerHTML = `<style>a{font-size:16px;height:60px;line-height:60px;text-decoration:none;color:rgba(255, 255, 255, 0.8);padding:22px 0}a:hover{color:rgba(255, 255, 255, 1)}@media(min-width: 1080px){a{height:70px;line-height:70px;padding:28px 0}}.nav{float:right;font-weight:300}.nav a{font-size:12px;margin-left:24px;text-transform:uppercase}
		/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSGVhZGVyTmF2TGlua3MuaHRtbCIsInNvdXJjZXMiOlsiSGVhZGVyTmF2TGlua3MuaHRtbCJdLCJzb3VyY2VzQ29udGVudCI6WyI8ZGl2IGNsYXNzPVwibmF2XCI+XG4gICAgPHNsb3Q+XG4gICAgICAgIDxhIGhyZWY9XCJodHRwczovL2Rpc3RpbGwucHViL2Fib3V0L1wiPkFib3V0PC9hPlxuICAgICAgICA8YSBocmVmPVwiaHR0cHM6Ly9kaXN0aWxsLnB1Yi9wcml6ZS9cIj5Qcml6ZTwvYT5cbiAgICAgICAgPGEgaHJlZj1cImh0dHBzOi8vZGlzdGlsbC5wdWIvam91cm5hbC9cIj5TdWJtaXQ8L2E+XG4gICAgPC9zbG90PlxuPC9kaXY+XG5cbjxzdHlsZT5cbmEge1xuICBmb250LXNpemU6IDE2cHg7XG4gIGhlaWdodDogNjBweDtcbiAgbGluZS1oZWlnaHQ6IDYwcHg7XG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC44KTtcbiAgcGFkZGluZzogMjJweCAwO1xufVxuYTpob3ZlciB7XG4gIGNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDEpO1xufVxuQG1lZGlhKG1pbi13aWR0aDogMTA4MHB4KSB7XG4gIGEge1xuICAgIGhlaWdodDogNzBweDtcbiAgICBsaW5lLWhlaWdodDogNzBweDtcbiAgICBwYWRkaW5nOiAyOHB4IDA7XG4gIH1cbn1cbi5uYXYge1xuICBmbG9hdDogcmlnaHQ7XG4gIGZvbnQtd2VpZ2h0OiAzMDA7XG59XG4ubmF2IGEge1xuICBmb250LXNpemU6IDEycHg7XG4gIG1hcmdpbi1sZWZ0OiAyNHB4O1xuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xufVxuPC9zdHlsZT5cblxuXG48c2NyaXB0PlxuZXhwb3J0IGRlZmF1bHQge1xuICAgIHRhZzogJ2hlYWRlci1uYXYtbGlua3MnXG59XG48L3NjcmlwdD4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBU0EsQ0FBQyxBQUFDLENBQUMsQUFDRCxTQUFTLENBQUUsSUFBSSxDQUNmLE1BQU0sQ0FBRSxJQUFJLENBQ1osV0FBVyxDQUFFLElBQUksQ0FDakIsZUFBZSxDQUFFLElBQUksQ0FDckIsS0FBSyxDQUFFLEtBQUssR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQy9CLE9BQU8sQ0FBRSxJQUFJLENBQUMsQ0FBQyxBQUNqQixDQUFDLEFBQ0QsQ0FBQyxNQUFNLEFBQUMsQ0FBQyxBQUNQLEtBQUssQ0FBRSxLQUFLLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxBQUMvQixDQUFDLEFBQ0QsTUFBTSxZQUFZLE1BQU0sQ0FBQyxBQUFDLENBQUMsQUFDekIsQ0FBQyxBQUFDLENBQUMsQUFDRCxNQUFNLENBQUUsSUFBSSxDQUNaLFdBQVcsQ0FBRSxJQUFJLENBQ2pCLE9BQU8sQ0FBRSxJQUFJLENBQUMsQ0FBQyxBQUNqQixDQUFDLEFBQ0gsQ0FBQyxBQUNELElBQUksQUFBQyxDQUFDLEFBQ0osS0FBSyxDQUFFLEtBQUssQ0FDWixXQUFXLENBQUUsR0FBRyxBQUNsQixDQUFDLEFBQ0QsSUFBSSxDQUFDLENBQUMsQUFBQyxDQUFDLEFBQ04sU0FBUyxDQUFFLElBQUksQ0FDZixXQUFXLENBQUUsSUFBSSxDQUNqQixjQUFjLENBQUUsU0FBUyxBQUMzQixDQUFDIn0= */</style>`;

		this.slots = {};

		this._fragment = create_main_fragment$3(this, this._state);

		this._fragment.c();
		this._fragment.m(this.shadowRoot, null);

		if (options.target) this._mount(options.target, options.anchor);
	}

	static get observedAttributes() {
		return [];
	}



	connectedCallback() {
		Object.keys(this._slotted).forEach(key => {
			this.appendChild(this._slotted[key]);
		});
	}

	attributeChangedCallback(attr, oldValue, newValue) {
		this.set({ [attr]: newValue });
	}
}

assign(HeaderNavLinks.prototype, protoDev);
assign(HeaderNavLinks.prototype, {
	_mount(target, anchor) {
		target.insertBefore(this, anchor);
	}
});

customElements.define("header-nav-links", HeaderNavLinks);

HeaderNavLinks.prototype._checkReadOnly = function _checkReadOnly(newState) {
};

/* src/HeaderLogo.html generated by Svelte v2.6.0 */
function create_main_fragment$4(component, ctx) {
	var a;

	return {
		c: function create() {
			a = createElement("a");
			a.innerHTML = "<svg viewBox=\"-607 419 64 64\"><path d=\"M-573.4,478.9c-8,0-14.6-6.4-14.6-14.5s14.6-25.9,14.6-40.8c0,14.9,14.6,32.8,14.6,40.8S-565.4,478.9-573.4,478.9z\"></path>\n    </svg>\n\n    \n    Distill";
			this.c = noop;
			a.href = "https://distill.pub/";
			a.className = "logo";
		},

		m: function mount(target, anchor) {
			insertNode(a, target, anchor);
		},

		p: noop,

		d: function destroy$$1(detach) {
			if (detach) {
				detachNode(a);
			}
		}
	};
}

class HeaderLogo extends HTMLElement {
	constructor(options = {}) {
		super();
		this._debugName = '<header-logo>';
		init(this, options);
		this._state = assign({}, options.data);
		this._intro = true;

		this.attachShadow({ mode: 'open' });
		this.shadowRoot.innerHTML = `<style>a{font-size:16px;height:60px;line-height:60px;text-decoration:none;color:rgba(255, 255, 255, 0.8);padding:22px 0}a:hover{color:rgba(255, 255, 255, 1)}svg{width:24px;position:relative;top:4px;margin-right:2px}@media(min-width: 1080px){a{height:70px;line-height:70px;padding:28px 0}.logo{}}svg path{fill:none;stroke:rgba(255, 255, 255, 0.8);stroke-width:3px}.logo{font-size:17px;font-weight:200}
		/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSGVhZGVyTG9nby5odG1sIiwic291cmNlcyI6WyJIZWFkZXJMb2dvLmh0bWwiXSwic291cmNlc0NvbnRlbnQiOlsiPCEtLSBUT0RPIGV4dGVybmFsaXplIGhvbWVwYWdlIFVSTCAtLT5cbjxhIGhyZWY9XCJodHRwczovL2Rpc3RpbGwucHViL1wiIGNsYXNzPVwibG9nb1wiPlxuICAgIDwhLS0gVE9ETyBleHRlcm5hbGl6ZSBsb2dvIC0tPlxuICAgIDxzdmcgdmlld0JveD1cIi02MDcgNDE5IDY0IDY0XCI+XG4gICAgICAgIDxwYXRoIGQ9XCJNLTU3My40LDQ3OC45Yy04LDAtMTQuNi02LjQtMTQuNi0xNC41czE0LjYtMjUuOSwxNC42LTQwLjhjMCwxNC45LDE0LjYsMzIuOCwxNC42LDQwLjhTLTU2NS40LDQ3OC45LTU3My40LDQ3OC45elwiPjwvcGF0aD5cbiAgICA8L3N2Zz5cblxuICAgIDwhLS0gVE9ETyBleHRlcm5hbGl6ZSBsb2dvIG5hbWUgLS0+XG4gICAgRGlzdGlsbFxuPC9hPlxuXG5cbjxzdHlsZT5cbmEge1xuICBmb250LXNpemU6IDE2cHg7XG4gIGhlaWdodDogNjBweDtcbiAgbGluZS1oZWlnaHQ6IDYwcHg7XG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC44KTtcbiAgcGFkZGluZzogMjJweCAwO1xufVxuYTpob3ZlciB7XG4gIGNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDEpO1xufVxuc3ZnIHtcbiAgd2lkdGg6IDI0cHg7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgdG9wOiA0cHg7XG4gIG1hcmdpbi1yaWdodDogMnB4O1xufVxuQG1lZGlhKG1pbi13aWR0aDogMTA4MHB4KSB7XG4gIGEge1xuICAgIGhlaWdodDogNzBweDtcbiAgICBsaW5lLWhlaWdodDogNzBweDtcbiAgICBwYWRkaW5nOiAyOHB4IDA7XG4gIH1cbiAgLmxvZ28ge1xuICB9XG59XG5zdmcgcGF0aCB7XG4gIGZpbGw6IG5vbmU7XG4gIHN0cm9rZTogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjgpO1xuICBzdHJva2Utd2lkdGg6IDNweDtcbn1cbi5sb2dvIHtcbiAgZm9udC1zaXplOiAxN3B4O1xuICBmb250LXdlaWdodDogMjAwO1xufVxuPC9zdHlsZT5cblxuXG48c2NyaXB0PlxuZXhwb3J0IGRlZmF1bHQge1xuICAgIHRhZzogJ2hlYWRlci1sb2dvJ1xufVxuPC9zY3JpcHQ+Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQWFBLENBQUMsQUFBQyxDQUFDLEFBQ0QsU0FBUyxDQUFFLElBQUksQ0FDZixNQUFNLENBQUUsSUFBSSxDQUNaLFdBQVcsQ0FBRSxJQUFJLENBQ2pCLGVBQWUsQ0FBRSxJQUFJLENBQ3JCLEtBQUssQ0FBRSxLQUFLLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUMvQixPQUFPLENBQUUsSUFBSSxDQUFDLENBQUMsQUFDakIsQ0FBQyxBQUNELENBQUMsTUFBTSxBQUFDLENBQUMsQUFDUCxLQUFLLENBQUUsS0FBSyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQUFDL0IsQ0FBQyxBQUNELEdBQUcsQUFBQyxDQUFDLEFBQ0gsS0FBSyxDQUFFLElBQUksQ0FDWCxRQUFRLENBQUUsUUFBUSxDQUNsQixHQUFHLENBQUUsR0FBRyxDQUNSLFlBQVksQ0FBRSxHQUFHLEFBQ25CLENBQUMsQUFDRCxNQUFNLFlBQVksTUFBTSxDQUFDLEFBQUMsQ0FBQyxBQUN6QixDQUFDLEFBQUMsQ0FBQyxBQUNELE1BQU0sQ0FBRSxJQUFJLENBQ1osV0FBVyxDQUFFLElBQUksQ0FDakIsT0FBTyxDQUFFLElBQUksQ0FBQyxDQUFDLEFBQ2pCLENBQUMsQUFDRCxLQUFLLEFBQUMsQ0FBQyxBQUNQLENBQUMsQUFDSCxDQUFDLEFBQ0QsR0FBRyxDQUFDLElBQUksQUFBQyxDQUFDLEFBQ1IsSUFBSSxDQUFFLElBQUksQ0FDVixNQUFNLENBQUUsS0FBSyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FDaEMsWUFBWSxDQUFFLEdBQUcsQUFDbkIsQ0FBQyxBQUNELEtBQUssQUFBQyxDQUFDLEFBQ0wsU0FBUyxDQUFFLElBQUksQ0FDZixXQUFXLENBQUUsR0FBRyxBQUNsQixDQUFDIn0= */</style>`;

		this._fragment = create_main_fragment$4(this, this._state);

		this._fragment.c();
		this._fragment.m(this.shadowRoot, null);

		if (options.target) this._mount(options.target, options.anchor);
	}

	static get observedAttributes() {
		return [];
	}

	attributeChangedCallback(attr, oldValue, newValue) {
		this.set({ [attr]: newValue });
	}
}

assign(HeaderLogo.prototype, protoDev);
assign(HeaderLogo.prototype, {
	_mount(target, anchor) {
		target.insertBefore(this, anchor);
	}
});

customElements.define("header-logo", HeaderLogo);

HeaderLogo.prototype._checkReadOnly = function _checkReadOnly(newState) {
};

const components = [
    PostPreview,
    PostsList,
    HeaderNav,
    HeaderNavLinks,
    HeaderLogo,
];

return components;

})));
//# sourceMappingURL=components.es5.js.map
