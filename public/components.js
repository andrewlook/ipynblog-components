(function () {
'use strict';

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
		/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUG9zdFByZXZpZXcuaHRtbCIsInNvdXJjZXMiOlsiUG9zdFByZXZpZXcuaHRtbCJdLCJzb3VyY2VzQ29udGVudCI6WyJcbjxhIGhyZWY9XCJ7IHVybCB9XCIgY2xhc3M9XCJwb3N0LXByZXZpZXdcIj5cbiAgPGRpdiBjbGFzcz1cIm1ldGFkYXRhXCI+XG4gICAgPGRpdiBjbGFzcz1cInB1Ymxpc2hlZERhdGVcIj57IHB1YkRhdGUgfTwvZGl2PlxuXG4gICAgPGRpdiBjbGFzcz1cInRhZ3NcIj5cbiAgICAgIDwhLS0gVE9ETyBtYWtlIHRoaXMgZHluYW1pYyAtLT5cbiAgICAgIDxzcGFuIGNsYXNzPVwidGFnXCI+Y29tbWVudGFyeTwvc3Bhbj5cbiAgICA8L2Rpdj5cblxuICA8L2Rpdj5cbiAgPGRpdiBjbGFzcz1cInRodW1ibmFpbFwiPjxpbWcgc3JjPVwieyB0aHVtYm5haWxJbWdQYXRoIH1cIiBhbHQ9XCJ7IHRpdGxlIH1cIiAvPjwvZGl2PlxuICA8ZGl2IGNsYXNzPVwiZGVzY3JpcHRpb25cIj5cbiAgICA8aDI+eyB0aXRsZSB9PC9oMj5cbiAgICA8cD57IGRlc2NyaXB0aW9uIH08L3A+XG4gIDwvZGl2PlxuPC9hPlxuXG48c3R5bGU+XG5cbi5kZXNjcmlwdGlvbiBoMixcbi5kZXNjcmlwdGlvbiBwIHtcbiAgZm9udC1mYW1pbHk6IC1hcHBsZS1zeXN0ZW0sIEJsaW5rTWFjU3lzdGVtRm9udCwgXCJTZWdvZSBVSVwiLCBSb2JvdG8sIE94eWdlbiwgVWJ1bnR1LCBDYW50YXJlbGwsIFwiRmlyYSBTYW5zXCIsIFwiRHJvaWQgU2Fuc1wiLCBcIkhlbHZldGljYSBOZXVlXCIsIEFyaWFsLCBzYW5zLXNlcmlmO1xufVxuXG4uZGVzY3JpcHRpb24gaDIge1xuICBmb250LXdlaWdodDogNzAwO1xufVxuXG4ucG9zdC1wcmV2aWV3IHtcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBkaXNwbGF5OiBibG9jaztcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIHJnYmEoMCwgMCwgMCwgMC4xKTtcbiAgcGFkZGluZzogMjRweCAwO1xufVxuLnBvc3QtcHJldmlldzpsYXN0LW9mLXR5cGUge1xuICBib3JkZXItYm90dG9tOiBub25lO1xufVxuXG4ucG9zdC1wcmV2aWV3IGgyIHtcbiAgbWFyZ2luOiAwIDAgNnB4IDA7XG4gIGxpbmUtaGVpZ2h0OiAxLjJlbTtcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xuICBmb250LXNpemU6IDI0cHg7XG59XG5cbi5wb3N0LXByZXZpZXcgcCB7XG4gIG1hcmdpbjogMCAwIDEycHggMDtcbiAgbGluZS1oZWlnaHQ6IDEuNGVtO1xuICBmb250LXNpemU6IDE2cHg7XG59XG5cbi5wb3N0LXByZXZpZXcgLnRodW1ibmFpbCB7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gIG1hcmdpbi1ib3R0b206IDI0cHg7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgbWF4LXdpZHRoOiA1MDBweDtcbn1cbi5wb3N0LXByZXZpZXcgaW1nIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGRpc3BsYXk6IGJsb2NrO1xufVxuXG4ubWV0YWRhdGEge1xuICBmb250LXNpemU6IDEycHg7XG4gIGxpbmUtaGVpZ2h0OiAxLjRlbTtcbiAgbWFyZ2luLWJvdHRvbTogMThweDtcbn1cblxuLm1ldGFkYXRhID4gKiB7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbn1cblxuLm1ldGFkYXRhIC5wdWJsaXNoZWREYXRlIHtcbiAgbWFyZ2luLXJpZ2h0OiAxZW07XG59XG5cbi5tZXRhZGF0YSAudGFncyB7XG4gIG1hcmdpbi10b3A6IDFlbTtcbn1cblxuLnRhZ3MgLnRhZyB7XG4gIGNvbG9yOiByZ2JhKDAsMCwwLDAuNjcpO1xuICBwYWRkaW5nOiAwLjNlbSAwLjVlbTtcbiAgbWFyZ2luOiAwO1xuICBmb250LXNpemU6IDgwJTtcbiAgYm9yZGVyOiAxcHggc29saWQgcmdiYSgwLDAsMCwwLjQpO1xuICBib3JkZXItcmFkaXVzOiAzcHg7XG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG4gIGZvbnQtd2VpZ2h0OiA1MDA7XG59XG5cbkBtZWRpYShtaW4td2lkdGg6IDc2OHB4KSB7XG4gIC5wb3N0LXByZXZpZXcgaDIge1xuICAgIGZvbnQtc2l6ZTogMjZweDtcbiAgfVxuICAucG9zdC1wcmV2aWV3IC50aHVtYm5haWwge1xuICAgIGZsb2F0OiByaWdodDtcbiAgICB3aWR0aDogMzUlO1xuICAgIG1hcmdpbi1ib3R0b206IDA7XG4gIH1cbiAgLnBvc3QtcHJldmlldyAuZGVzY3JpcHRpb24ge1xuICAgIGZsb2F0OiBsZWZ0O1xuICAgIHdpZHRoOiA0MCU7XG4gIH1cbiAgLnBvc3QtcHJldmlldyAubWV0YWRhdGEge1xuICAgIGZsb2F0OiBsZWZ0O1xuICAgIHdpZHRoOiAxNSU7XG4gICAgbWFyZ2luLXRvcDogOHB4O1xuICB9XG4gIC5wb3N0LXByZXZpZXcgcCB7XG4gICAgbWFyZ2luOiAwIDAgMTJweCAwO1xuICAgIGxpbmUtaGVpZ2h0OiAxLjVlbTtcbiAgICBmb250LXNpemU6IDE2cHg7XG4gIH1cbn1cblxuPC9zdHlsZT5cblxuXG48c2NyaXB0PlxuICAgIGV4cG9ydCBkZWZhdWx0IHtcbiAgICAgICAgdGFnOiAncG9zdC1wcmV2aWV3JyxcbiAgICAgICAgZGF0YSgpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgdGl0bGU6IFwiRGVzZXJ0IEZyaWVuZHNcIixcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJBIHBzeWNoYWRlbGljIGpvdXJuZXkgdGhyb3VnaCB0aW1lIGFuZCBzcGFjZVwiLFxuICAgICAgICAgICAgICAgIHB1YkRhdGU6IFwiTWF5IDEwLCAyMDE3XCIsXG4gICAgICAgICAgICAgICAgdGh1bWJuYWlsSW1nUGF0aDogXCIuL2ltYWdlcy9kZXNlcnRfZnJpZW5kcy5wbmdcIixcbiAgICAgICAgICAgICAgICB1cmw6IFwiaHR0cHM6Ly9kaXN0aWxsLnB1Yi8yMDE4L2J1aWxkaW5nLWJsb2Nrcy9cIixcbiAgICAgICAgICAgICAgICB0YWdzOiBbXCJhcnRcIl0sXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIG9uY3JlYXRlKCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ1Nsb3RQb3N0UHJldmlld1t0aGlzLm9wdGlvbnNdOiAgJyk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLm9wdGlvbnMpXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLm9wdGlvbnMuZGF0YSk7XG4gICAgICAgIH0sXG4gICAgfTtcbjwvc2NyaXB0PiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFvQkEsWUFBWSxDQUFDLEVBQUUsQ0FDZixZQUFZLENBQUMsQ0FBQyxBQUFDLENBQUMsQUFDZCxXQUFXLENBQUUsYUFBYSxDQUFDLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLFVBQVUsQUFDL0osQ0FBQyxBQUVELFlBQVksQ0FBQyxFQUFFLEFBQUMsQ0FBQyxBQUNmLFdBQVcsQ0FBRSxHQUFHLEFBQ2xCLENBQUMsQUFFRCxhQUFhLEFBQUMsQ0FBQyxBQUNiLGVBQWUsQ0FBRSxJQUFJLENBQ3JCLFFBQVEsQ0FBRSxNQUFNLENBQ2hCLE9BQU8sQ0FBRSxLQUFLLENBQ2QsYUFBYSxDQUFFLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FDM0MsT0FBTyxDQUFFLElBQUksQ0FBQyxDQUFDLEFBQ2pCLENBQUMsQUFDRCxhQUFhLGFBQWEsQUFBQyxDQUFDLEFBQzFCLGFBQWEsQ0FBRSxJQUFJLEFBQ3JCLENBQUMsQUFFRCxhQUFh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 */</style>`;

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
		/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUG9zdHNMaXN0Lmh0bWwiLCJzb3VyY2VzIjpbIlBvc3RzTGlzdC5odG1sIl0sInNvdXJjZXNDb250ZW50IjpbIjxkaXYgY2xhc3M9XCJwb3N0cy1saXN0IGwtcGFnZVwiPlxuICAgIDxzbG90PlxuICAgICAgICA8cD5wbGFjZWhvbGRlcjwvcD5cbiAgICA8L3Nsb3Q+XG48L2Rpdj5cblxuXG5cbjxzdHlsZT5cblxuLnBvc3RzLWxpc3Qge1xuICBtYXJnaW4tdG9wOiAyNHB4O1xuICBtYXJnaW4tYm90dG9tOiAyNHB4O1xufVxuXG5AbWVkaWEobWluLXdpZHRoOiA3NjhweCkge1xuICAucG9zdHMtbGlzdCB7XG4gICAgbWFyZ2luLXRvcDogNjBweDtcbiAgfVxufVxuXG48L3N0eWxlPlxuXG48c2NyaXB0PlxuZXhwb3J0IGRlZmF1bHQge1xuICAgIHRhZzogJ3Bvc3RzLWxpc3QnXG59XG48L3NjcmlwdD5cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFVQSxXQUFXLEFBQUMsQ0FBQyxBQUNYLFVBQVUsQ0FBRSxJQUFJLENBQ2hCLGFBQWEsQ0FBRSxJQUFJLEFBQ3JCLENBQUMsQUFFRCxNQUFNLFlBQVksS0FBSyxDQUFDLEFBQUMsQ0FBQyxBQUN4QixXQUFXLEFBQUMsQ0FBQyxBQUNYLFVBQVUsQ0FBRSxJQUFJLEFBQ2xCLENBQUMsQUFDSCxDQUFDIn0= */</style>`;

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

}());
//# sourceMappingURL=components.js.map