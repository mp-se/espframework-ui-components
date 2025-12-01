'use strict';

var vue = require('vue');

var _documentCurrentScript = typeof document !== 'undefined' ? document.currentScript : null;
const _hoisted_1$u = { class: "card-body" };
const _hoisted_2$e = { class: "card-title" };
const _hoisted_3$a = { class: "card-text" };


var script$x = /*@__PURE__*/Object.assign({
  inheritAttrs: false,
}, {
  __name: 'BsCard',
  props: {
    "header": {
  type: String,
  default: 'Card Header',
},
    "headerModifiers": {},
    "title": {
  type: String,
  default: 'Card Title',
},
    "titleModifiers": {},
    "icon": {
  type: [Object, String],
  default: undefined,
},
    "iconModifiers": {},
    "iserr": {
  type: Boolean,
  default: false,
},
    "iserrModifiers": {},
    "color": {
  type: String,
  default: 'primary',
  validator: value => {
    const validColors = [
      'primary',
      'secondary',
      'success',
      'danger',
      'warning',
      'info',
      'light',
      'dark',
    ];
    return validColors.includes(value);
  },
},
    "colorModifiers": {},
  },
  emits: ["update:header", "update:title", "update:icon", "update:iserr", "update:color"],
  setup(__props) {

/**
 * 2024-05-28 Bootstrap VueJS wrapper, Magnus Persson
 */
/**
 * Purpose: Show a card with header, title and content.
 */

/**
 * Text to be displayed in the header of the Card (required).
 */
const header = vue.useModel(__props, 'header');

/**
 * Title shown in the top of the card body (required).
 */
const title = vue.useModel(__props, 'title');

/**
 * If defined an icon will be shown left of the title (optional).
 */
const icon = vue.useModel(__props, 'icon');

/**
 * If set the header will be in red.
 */
const iserr = vue.useModel(__props, 'iserr');

/**
 * Color for the header (if not error).
 */
const headerColor = vue.useModel(__props, 'color');

const headerStyle = () => {
  if (iserr.value !== undefined && iserr.value) return 'card-header bg-danger-subtle';

  if (headerColor.value === undefined) return 'card-header bg-primary-subtle';

  return 'card-header bg-' + headerColor.value + '-subtle';
};

return (_ctx, _cache) => {
  return (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({ class: "card" }, _ctx.$attrs), [
    vue.createElementVNode("div", {
      class: vue.normalizeClass(headerStyle())
    }, vue.toDisplayString(header.value), 3 /* TEXT, CLASS */),
    vue.createElementVNode("div", _hoisted_1$u, [
      vue.createElementVNode("h5", _hoisted_2$e, [
        (icon.value !== undefined)
          ? (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(icon.value), {
              key: 0,
              width: "16",
              height: "16"
            }))
          : vue.createCommentVNode("v-if", true),
        vue.createTextVNode(" " + vue.toDisplayString(title.value), 1 /* TEXT */)
      ]),
      vue.createElementVNode("p", _hoisted_3$a, [
        vue.createCommentVNode(" @slot Content of the card is placed via the slot "),
        vue.renderSlot(_ctx.$slots, "default")
      ])
    ])
  ], 16 /* FULL_PROPS */))
}
}

});

script$x.__file = "src/components/BsCard.vue";

const _hoisted_1$t = { class: "dropdown" };
const _hoisted_2$d = ["disabled"];
const _hoisted_3$9 = { class: "dropdown-menu" };
const _hoisted_4$4 = ["onClick"];


var script$w = /*@__PURE__*/Object.assign({
  inheritAttrs: false,
}, {
  __name: 'BsDropdown',
  props: {
    "label": {
  type: String,
  default: undefined,
},
    "labelModifiers": {},
    "help": {
  type: String,
  default: undefined,
},
    "helpModifiers": {},
    "width": {
  type: [String, Number],
  default: undefined,
  validator: value => {
    if (value === undefined || value === null || value === '') return true;
    if (typeof value === 'number') return value > 0 && value <= 12;
    if (typeof value === 'string')
      return /^(\d|1[0-2])$|^(sm|md|lg|xl|xxl)-(\d|1[0-2])$/.test(value);
    return false;
  },
},
    "widthModifiers": {},
    "options": {
  type: Array,
  default: () => [],
  validator: options => {
    return options.every(
      option => option && typeof option === 'object' && 'label' in option && 'value' in option
    );
  },
},
    "optionsModifiers": {},
    "button": {
  type: String,
  default: 'Select',
  validator: value => {
    return typeof value === 'string' && value.trim().length > 0;
  },
},
    "buttonModifiers": {},
    "callback": {
  type: Function,
  default: () => {},
  validator: value => {
    return typeof value === 'function';
  },
},
    "callbackModifiers": {},
    "disabled": {
  type: Boolean,
  default: false,
},
    "disabledModifiers": {},
    "badge": {
  type: Number,
  default: 0,
},
    "badgeModifiers": {},
  },
  emits: ["update:label", "update:help", "update:width", "update:options", "update:button", "update:callback", "update:disabled", "update:badge"],
  setup(__props) {

/**
 * 2024-05-28 Bootstrap VueJS wrapper, Magnus Persson
 */

/**
 * Purpose: Show a drop down button with options
 */

/**
 * This text is shown above the form component (optional).
 */
const label = vue.useModel(__props, 'label');

/**
 * Help text is shown below the field to provide user help with input (optional).
 */
const help = vue.useModel(__props, 'help');

/**
 * Specify the width to force a specific size (optional).
 */
const width = vue.useModel(__props, 'width');

/**
 * Options for the dropdown in the format [ { label: "label", value: "value" } ]
 * Label is displayed in the list and value is stored in the bound ref (required).
 */
const options = vue.useModel(__props, 'options');

/**
 * Text on the drop down button (required).
 */
const button = vue.useModel(__props, 'button');

/**
 * Callback when the option is selected (optional).
 */
const callback = vue.useModel(__props, 'callback');

/**
 * Ref that steers if this component is enabled or not (required).
 */
const disabled = vue.useModel(__props, 'disabled');

/**
 * Specify the number to show in the badge to guide the user (optional).
 */
const badge = vue.useModel(__props, 'badge');

return (_ctx, _cache) => {
  const _component_BsInputBase = vue.resolveComponent("BsInputBase");

  return (vue.openBlock(), vue.createBlock(_component_BsInputBase, {
    width: width.value,
    label: label.value,
    help: help.value,
    badge: badge.value
  }, {
    default: vue.withCtx(() => [
      vue.createElementVNode("div", _hoisted_1$t, [
        vue.createElementVNode("button", {
          class: "btn btn-outline-secondary dropdown-toggle",
          type: "button",
          "data-bs-toggle": "dropdown",
          "aria-expanded": "false",
          disabled: disabled.value
        }, vue.toDisplayString(button.value), 9 /* TEXT, PROPS */, _hoisted_2$d),
        vue.createElementVNode("ul", _hoisted_3$9, [
          (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(options.value, (o) => {
            return (vue.openBlock(), vue.createElementBlock("li", {
              key: o.value
            }, [
              vue.createElementVNode("a", {
                class: "dropdown-item",
                onClick: $event => (callback.value(o.value))
              }, vue.toDisplayString(o.label), 9 /* TEXT, PROPS */, _hoisted_4$4)
            ]))
          }), 128 /* KEYED_FRAGMENT */))
        ])
      ])
    ]),
    _: 1 /* STABLE */
  }, 8 /* PROPS */, ["width", "label", "help", "badge"]))
}
}

});

script$w.__file = "src/components/BsDropdown.vue";

const _hoisted_1$s = ["width", "height"];


var script$v = /*@__PURE__*/Object.assign({
  inheritAttrs: false,
}, {
  __name: 'IconEyeSlash',
  props: {
    "width": {
  type: [String, Number],
  default: 16,
  validator: value => {
    // Accept CSS units like "1rem", "16px", etc. or numeric values
    if (typeof value === 'string') {
      return /^(\d+(\.\d+)?)(px|rem|em|%|vh|vw|pt|pc|in|cm|mm|ex|ch|lh)?$/.test(value.trim());
    }
    const num = Number(value);
    return !isNaN(num) && num > 0;
  },
},
    "widthModifiers": {},
    "height": {
  type: [String, Number],
  default: 16,
  validator: value => {
    // Accept CSS units like "1rem", "16px", etc. or numeric values
    if (typeof value === 'string') {
      return /^(\d+(\.\d+)?)(px|rem|em|%|vh|vw|pt|pc|in|cm|mm|ex|ch|lh)?$/.test(value.trim());
    }
    const num = Number(value);
    return !isNaN(num) && num > 0;
  },
},
    "heightModifiers": {},
  },
  emits: ["update:width", "update:height"],
  setup(__props) {

/**
 * 2024-05-28 Bootstrap VueJS wrapper, Magnus Persson
 */

/**
 * Purpose: Show an svg icon on the UI. Used embedded svg to avoid downloading data from internet.
 */


/**
 * Width of the icon (optional).
 */
const width = vue.useModel(__props, 'width');

/**
 * Height of the icon (optional).
 */
const height = vue.useModel(__props, 'height');

return (_ctx, _cache) => {
  return (vue.openBlock(), vue.createElementBlock("svg", vue.mergeProps(_ctx.$attrs, {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 16 16",
    fill: "currentColor",
    width: width.value,
    height: height.value
  }), [...(_cache[0] || (_cache[0] = [
    vue.createElementVNode("path", { d: "M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z" }, null, -1 /* CACHED */),
    vue.createElementVNode("path", { d: "M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829" }, null, -1 /* CACHED */),
    vue.createElementVNode("path", { d: "M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z" }, null, -1 /* CACHED */)
  ]))], 16 /* FULL_PROPS */, _hoisted_1$s))
}
}

});

script$v.__file = "src/components/IconEyeSlash.vue";

const _hoisted_1$r = ["width", "height"];


var script$u = /*@__PURE__*/Object.assign({
  inheritAttrs: false,
}, {
  __name: 'IconEye',
  props: {
    "width": {
  type: [String, Number],
  default: 16,
  validator: value => {
    // Accept CSS units like "1rem", "16px", etc. or numeric values
    if (typeof value === 'string') {
      return /^(\d+(\.\d+)?)(px|rem|em|%|vh|vw|pt|pc|in|cm|mm|ex|ch|lh)?$/.test(value.trim());
    }
    const num = Number(value);
    return !isNaN(num) && num > 0;
  },
},
    "widthModifiers": {},
    "height": {
  type: [String, Number],
  default: 16,
  validator: value => {
    // Accept CSS units like "1rem", "16px", etc. or numeric values
    if (typeof value === 'string') {
      return /^(\d+(\.\d+)?)(px|rem|em|%|vh|vw|pt|pc|in|cm|mm|ex|ch|lh)?$/.test(value.trim());
    }
    const num = Number(value);
    return !isNaN(num) && num > 0;
  },
},
    "heightModifiers": {},
  },
  emits: ["update:width", "update:height"],
  setup(__props) {

/**
 * 2024-05-28 Bootstrap VueJS wrapper, Magnus Persson
 */

/**
 * Purpose: Show an svg icon on the UI. Used embedded svg to avoid downloading data from internet.
 */


/**
 * Width of the icon (optional).
 */
const width = vue.useModel(__props, 'width');

/**
 * Height of the icon (optional).
 */
const height = vue.useModel(__props, 'height');

return (_ctx, _cache) => {
  return (vue.openBlock(), vue.createElementBlock("svg", vue.mergeProps(_ctx.$attrs, {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 16 16",
    fill: "currentColor",
    width: width.value,
    height: height.value
  }), [...(_cache[0] || (_cache[0] = [
    vue.createElementVNode("path", { d: "M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" }, null, -1 /* CACHED */),
    vue.createElementVNode("path", { d: "M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" }, null, -1 /* CACHED */)
  ]))], 16 /* FULL_PROPS */, _hoisted_1$r))
}
}

});

script$u.__file = "src/components/IconEye.vue";

const _hoisted_1$q = { class: "input-group" };
const _hoisted_2$c = ["type", "data-bs-title"];
const _hoisted_3$8 = {
  key: 0,
  class: "input-group-text"
};
/**
 * Purpose: Proviude an input field
 */

var script$t = /*@__PURE__*/Object.assign({
  inheritAttrs: false,
}, {
  __name: 'BsInputText',
  props: {
    "modelValue": {
  type: [String, Number],
  default: '',
},
    "modelModifiers": {},
    "label": {
  type: String,
  default: undefined,
},
    "labelModifiers": {},
    "help": {
  type: String,
  default: undefined,
},
    "helpModifiers": {},
    "width": {
  type: [String, Number],
  default: undefined,
  validator: value => {
    if (value === undefined || value === null || value === '') return true;
    if (typeof value === 'number') return value > 0 && value <= 12;
    if (typeof value === 'string')
      return /^(\d|1[0-2])$|^(sm|md|lg|xl|xxl)-(\d|1[0-2])$/.test(value);
    return false;
  },
},
    "widthModifiers": {},
    "type": {
  type: String,
  default: 'text',
  validator: value => ['text', 'password', 'email', 'url'].includes(value),
},
    "typeModifiers": {},
    "badge": {
  type: Number,
  default: 0,
},
    "badgeModifiers": {},
  },
  emits: ["update:modelValue", "update:label", "update:help", "update:width", "update:type", "update:badge"],
  setup(__props) {


/**
 * This is the v-model field that will be used to bind the component to (required).
 */
const model = vue.useModel(__props, "modelValue");

/**
 * This text is shown above the form component (optional).
 */
const label = vue.useModel(__props, 'label');

/**
 * Help text is shown below the field to provide user help with input (optional).
 */
const help = vue.useModel(__props, 'help');

/**
 * Specify the width to force a specific size (optional).
 */
const width = vue.useModel(__props, 'width');

/**
 * Type of the input field, defaults to 'text' (optional, 'password' or 'text').
 */
const type = vue.useModel(__props, 'type');

/**
 * Specify the number to show in the badge to guide the user (optional).
 */
const badge = vue.useModel(__props, 'badge');
/**
 * Used internally to toggle field visibility between text / password
 */
const flag = vue.ref(false);

const toggle = () => {
  flag.value = !flag.value;
};

return (_ctx, _cache) => {
  const _component_BsInputBase = vue.resolveComponent("BsInputBase");

  return (vue.openBlock(), vue.createBlock(_component_BsInputBase, {
    width: width.value,
    label: label.value,
    help: help.value,
    badge: badge.value
  }, {
    default: vue.withCtx(() => [
      vue.createElementVNode("div", _hoisted_1$q, [
        vue.withDirectives(vue.createElementVNode("input", vue.mergeProps({
          "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((model).value = $event)),
          class: "form-control",
          type: type.value === undefined || flag.value ? 'text' : type.value
        }, _ctx.$attrs, {
          "data-bs-toggle": "tooltip",
          "data-bs-custom-class": "custom-tooltip",
          "data-bs-title": help.value
        }), null, 16 /* FULL_PROPS */, _hoisted_2$c), [
          [vue.vModelDynamic, model.value]
        ]),
        (type.value === 'password')
          ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_3$8, [
              (!flag.value)
                ? (vue.openBlock(), vue.createBlock(script$u, {
                    key: 0,
                    width: "1rem",
                    height: "1rem",
                    onClick: toggle
                  }))
                : vue.createCommentVNode("v-if", true),
              (flag.value)
                ? (vue.openBlock(), vue.createBlock(script$v, {
                    key: 1,
                    width: "1rem",
                    height: "1rem",
                    onClick: toggle
                  }))
                : vue.createCommentVNode("v-if", true)
            ]))
          : vue.createCommentVNode("v-if", true)
      ])
    ]),
    _: 1 /* STABLE */
  }, 8 /* PROPS */, ["width", "label", "help", "badge"]))
}
}

});

script$t.__file = "src/components/BsInputText.vue";

const _hoisted_1$p = { class: "input-group" };
const _hoisted_2$b = ["data-bs-title", "disabled"];
const _hoisted_3$7 = {
  key: 0,
  class: "input-group-text"
};


var script$s = /*@__PURE__*/Object.assign({
  inheritAttrs: false,
}, {
  __name: 'BsInputNumber',
  props: {
    "modelValue": {
  type: [Number, String],
  default: 0,
},
    "modelModifiers": {},
    "label": {
  type: String,
  default: undefined,
},
    "labelModifiers": {},
    "help": {
  type: String,
  default: undefined,
},
    "helpModifiers": {},
    "width": {
  type: [String, Number],
  default: undefined,
  validator: value => {
    if (value === undefined || value === null || value === '') return true;
    if (typeof value === 'number') return value > 0 && value <= 12;
    if (typeof value === 'string')
      return /^(\d|1[0-2])$|^(sm|md|lg|xl|xxl)-(\d|1[0-2])$/.test(value);
    return false;
  },
},
    "widthModifiers": {},
    "unit": {
  type: String,
  default: undefined,
},
    "unitModifiers": {},
    "disabled": {
  type: Boolean,
  default: false,
},
    "disabledModifiers": {},
    "badge": {
  type: Number,
  default: 0,
},
    "badgeModifiers": {},
  },
  emits: ["update:modelValue", "update:label", "update:help", "update:width", "update:unit", "update:disabled", "update:badge"],
  setup(__props) {

/**
 * 2024-05-28 Bootstrap VueJS wrapper, Magnus Persson
 */

/**
 * Purpose: Provide an inputfield for numbers
 */

/**
 * This is the v-model field that will be used to bind the component to (required).
 */
const model = vue.useModel(__props, "modelValue");

/**
 * This text is shown above the form component (optional).
 */
const label = vue.useModel(__props, 'label');

/**
 * Help text is shown below the field to provide user help with input (optional).
 */
const help = vue.useModel(__props, 'help');

/**
 * Specify the width to force a specific size (optional).
 */
const width = vue.useModel(__props, 'width');

/**
 * Unit is displayed to the right of the input field to provide guidance (optional).
 */
const unit = vue.useModel(__props, 'unit');

/**
 * Ref that steers if this component is enabled or not (required).
 */
const disabled = vue.useModel(__props, 'disabled');

/**
 * Specify the number to show in the badge to guide the user (optional).
 */
const badge = vue.useModel(__props, 'badge');

return (_ctx, _cache) => {
  const _component_BsInputBase = vue.resolveComponent("BsInputBase");

  return (vue.openBlock(), vue.createBlock(_component_BsInputBase, {
    width: width.value,
    label: label.value,
    help: help.value,
    badge: badge.value
  }, {
    default: vue.withCtx(() => [
      vue.createElementVNode("div", _hoisted_1$p, [
        vue.withDirectives(vue.createElementVNode("input", vue.mergeProps({
          "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((model).value = $event)),
          class: "form-control",
          type: "number"
        }, _ctx.$attrs, {
          "data-bs-toggle": "tooltip",
          "data-bs-custom-class": "custom-tooltip",
          "data-bs-title": help.value,
          disabled: disabled.value
        }), null, 16 /* FULL_PROPS */, _hoisted_2$b), [
          [vue.vModelText, model.value]
        ]),
        (unit.value !== undefined)
          ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_3$7, vue.toDisplayString(unit.value), 1 /* TEXT */))
          : vue.createCommentVNode("v-if", true)
      ])
    ]),
    _: 1 /* STABLE */
  }, 8 /* PROPS */, ["width", "label", "help", "badge"]))
}
}

});

script$s.__file = "src/components/BsInputNumber.vue";

const _hoisted_1$o = { class: "form-check form-switch" };
const _hoisted_2$a = ["disabled", "data-bs-title"];


var script$r = /*@__PURE__*/Object.assign({
  inheritAttrs: false,
}, {
  __name: 'BsInputSwitch',
  props: {
    "modelValue": {
  type: Boolean,
  default: false,
},
    "modelModifiers": {},
    "label": {
  type: String,
  default: undefined,
},
    "labelModifiers": {},
    "help": {
  type: String,
  default: undefined,
},
    "helpModifiers": {},
    "width": {
  type: [String, Number],
  default: undefined,
  validator: value => {
    if (value === undefined || value === null || value === '') return true;
    if (typeof value === 'number') return value > 0 && value <= 12;
    if (typeof value === 'string')
      return /^(\d|1[0-2])$|^(sm|md|lg|xl|xxl)-(\d|1[0-2])$/.test(value);
    return false;
  },
},
    "widthModifiers": {},
    "disabled": {
  type: Boolean,
  default: false,
},
    "disabledModifiers": {},
    "badge": {
  type: Number,
  default: 0,
},
    "badgeModifiers": {},
  },
  emits: ["update:modelValue", "update:label", "update:help", "update:width", "update:disabled", "update:badge"],
  setup(__props) {

/**
 * 2024-05-28 Bootstrap VueJS wrapper, Magnus Persson
 */

/**
 * Purpose: Display a switch in for of a checkbox
 */

/**
 * This is the v-model field that will be used to bind the component to (required).
 */
const model = vue.useModel(__props, "modelValue");

/**
 * This text is shown above the form component (optional).
 */
const label = vue.useModel(__props, 'label');

/**
 * Help text is shown below the field to provide user help with input (optional).
 */
const help = vue.useModel(__props, 'help');

/**
 * Specify the width to force a specific size (optional).
 */
const width = vue.useModel(__props, 'width');

/**
 * Ref that steers if this component is enabled or not (required).
 */
const disabled = vue.useModel(__props, 'disabled');

/**
 * Specify the number to show in the badge to guide the user (optional).
 */
const badge = vue.useModel(__props, 'badge');

return (_ctx, _cache) => {
  const _component_BsInputBase = vue.resolveComponent("BsInputBase");

  return (vue.openBlock(), vue.createBlock(_component_BsInputBase, {
    width: width.value,
    label: label.value,
    help: help.value,
    badge: badge.value
  }, {
    default: vue.withCtx(() => [
      vue.createElementVNode("div", _hoisted_1$o, [
        vue.withDirectives(vue.createElementVNode("input", vue.mergeProps({
          "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((model).value = $event)),
          class: "form-check-input",
          type: "checkbox",
          role: "switch"
        }, _ctx.$attrs, {
          disabled: disabled.value,
          "data-bs-toggle": "tooltip",
          "data-bs-custom-class": "custom-tooltip",
          "data-bs-title": help.value,
          style: {"transform":"scale(1.5)","transform-origin":"left center","display":"inline-block"}
        }), null, 16 /* FULL_PROPS */, _hoisted_2$a), [
          [vue.vModelCheckbox, model.value]
        ])
      ])
    ]),
    _: 1 /* STABLE */
  }, 8 /* PROPS */, ["width", "label", "help", "badge"]))
}
}

});

script$r.__file = "src/components/BsInputSwitch.vue";

const _hoisted_1$n = ["data-bs-title"];


var script$q = /*@__PURE__*/Object.assign({
  inheritAttrs: false,
}, {
  __name: 'BsInputTextArea',
  props: {
    "modelValue": {
  type: String,
  default: '',
},
    "modelModifiers": {},
    "label": {
  type: String,
  default: undefined,
},
    "labelModifiers": {},
    "help": {
  type: String,
  default: undefined,
},
    "helpModifiers": {},
    "width": {
  type: [String, Number],
  default: undefined,
  validator: value => {
    if (value === undefined || value === null || value === '') return true;
    if (typeof value === 'number') return value > 0 && value <= 12;
    if (typeof value === 'string')
      return /^(\d|1[0-2])$|^(sm|md|lg|xl|xxl)-(\d|1[0-2])$/.test(value);
    return false;
  },
},
    "widthModifiers": {},
    "badge": {
  type: Number,
  default: 0,
},
    "badgeModifiers": {},
  },
  emits: ["update:modelValue", "update:label", "update:help", "update:width", "update:badge"],
  setup(__props) {

/**
 * 2024-05-28 Bootstrap VueJS wrapper, Magnus Persson
 */

/**
 * Purpose: Use as a building block for providing a text area that can allow for multiple lines of text.
 */

/**
 * This is the v-model field that will be used to bind the component to (required).
 */
const model = vue.useModel(__props, "modelValue");

/**
 * This text is shown above the form component (optional).
 */
const label = vue.useModel(__props, 'label');

/**
 * Help text is shown below the field to provide user help with input (optional).
 */
const help = vue.useModel(__props, 'help');

/**
 * Specify the width to force a specific size (optional).
 */
const width = vue.useModel(__props, 'width');

/**
 * Specify the number to show in the badge to guide the user (optional).
 */
const badge = vue.useModel(__props, 'badge');

return (_ctx, _cache) => {
  const _component_BsInputBase = vue.resolveComponent("BsInputBase");

  return (vue.openBlock(), vue.createBlock(_component_BsInputBase, {
    width: width.value,
    label: label.value,
    help: help.value,
    badge: badge.value
  }, {
    default: vue.withCtx(() => [
      vue.withDirectives(vue.createElementVNode("textarea", vue.mergeProps({
        "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((model).value = $event)),
        class: "form-control",
        type: "text"
      }, _ctx.$attrs, {
        "data-bs-toggle": "tooltip",
        "data-bs-custom-class": "custom-tooltip",
        "data-bs-title": help.value
      }), null, 16 /* FULL_PROPS */, _hoisted_1$n), [
        [vue.vModelText, model.value]
      ])
    ]),
    _: 1 /* STABLE */
  }, 8 /* PROPS */, ["width", "label", "help", "badge"]))
}
}

});

script$q.__file = "src/components/BsInputTextArea.vue";

const _hoisted_1$m = ["data-bs-title"];
const _hoisted_2$9 = ["onClick"];

/**
 * Purpose: Use as a building block for providing a text area that can allow for multiple lines of text.
 */

var script$p = /*@__PURE__*/Object.assign({
  inheritAttrs: false,
}, {
  __name: 'BsInputTextAreaFormat',
  props: {
    "modelValue": {
  type: String,
  default: '',
  validator: value => {
    return typeof value === 'string';
  },
},
    "modelModifiers": {},
    "label": {
  type: String,
  default: undefined,
},
    "labelModifiers": {},
    "help": {
  type: String,
  default: undefined,
},
    "helpModifiers": {},
    "width": {
  type: [String, Number],
  default: undefined,
  validator: value => {
    if (value === undefined || value === null || value === '') return true;
    if (typeof value === 'number') return value > 0 && value <= 12;
    if (typeof value === 'string')
      return /^(\d|1[0-2])$|^(sm|md|lg|xl|xxl)-(\d|1[0-2])$/.test(value);
    return false;
  },
},
    "widthModifiers": {},
    "badge": {
  type: Number,
  default: 0,
},
    "badgeModifiers": {},
  },
  emits: ["update:modelValue", "update:label", "update:help", "update:width", "update:badge"],
  setup(__props) {

/**
 * Note! Limitation is one of these components per page since hardcode ID's are used.
 */


const contextMenuOptions = vue.ref([
  { label: 'Cancel', value: '' },

  { label: 'Network name, ${mdns}', value: '${mdns}' },
  { label: 'Chip ID, ${id}', value: '${id}' },
  { label: 'Sleep interval, ${sleep-interval}', value: '${sleep-interval}' },
  { label: 'Token, ${token}', value: '${token}' },
  { label: 'Token 2, ${token2}', value: '${token2}' },

  { label: 'Current angle/tilt, ${angle}', value: '${angle}' },
  { label: 'Current angle/tilt, ${tilt}', value: '${tilt}' },

  { label: 'Temperature, ${temp}', value: '${temp}' },
  { label: 'Temperature (C), ${temp-c}', value: '${temp-c}' },
  { label: 'Temperature (F), ${temp-f}', value: '${temp-f}' },
  { label: 'Temperature Unit, ${temp-unit}', value: '${temp-unit}' },

  { label: 'Application version, ${app-ver}', value: '${app-ver}' },
  { label: 'Application build, ${app-build}', value: '${app-build}' },

  { label: 'Battery (V), ${battery}', value: '${battery}' },
  { label: 'Battery (%), ${battery-percent}', value: '${battery-percent}' },

  { label: 'Wifi signal strength, ${rssi}', value: '${rssi}' },
  { label: 'Time for measurement, ${run-time}', value: '${run-time}' },

  { label: 'Gravity, ${gravity}', value: '${gravity}' },
  { label: 'Gravity (SG), ${gravity-sg}', value: '${gravity-sg}' },
  { label: 'Gravity (Plato), ${gravity-plato}', value: '${gravity-plato}' },
  { label: 'Gravity unit, ${gravity-unit}', value: '${gravity-unit}' },

  { label: 'Corrected gravity, ${corr-gravity}', value: '${corr-gravity}' },
  {
    label: 'Corrected Gravity (SG), ${corr-gravity-sg}',
    value: '${corr-gravity-sg}',
  },
  {
    label: 'Corrected Gravity (Plato), ${corr-gravity-plato}',
    value: '${corr-gravity-plato}',
  },
  { label: 'Gravity Velocity, ${velocity}', value: '${velocity}' },
]);

const insertText = value => {
  if (value.length > 0) {
    const obj = document.getElementById('textArea');
    model.value =
      obj.value.substring(0, obj.selectionStart) +
      value +
      obj.value.substring(obj.selectionEnd, obj.value.length);
  }

  const menu = document.getElementById('contextMenu');
  menu.style.display = 'none';
};

const openContextMenu = event => {
  const menu = document.getElementById('contextMenu');
  menu.style.display = 'block';
  menu.style.left = event.pageX + 'px';
  menu.style.top = event.pageY + 'px';
};

/**
 * This is the v-model field that will be used to bind the component to (required).
 */
const model = vue.useModel(__props, "modelValue");

/**
 * This text is shown above the form component (optional).
 */
const label = vue.useModel(__props, 'label');

/**
 * Help text is shown below the field to provide user help with input (optional).
 */
const help = vue.useModel(__props, 'help');

/**
 * Specify the width to force a specific size (optional).
 */
const width = vue.useModel(__props, 'width');

/**
 * Specify the number to show in the badge to guide the user (optional).
 */
const badge = vue.useModel(__props, 'badge');

return (_ctx, _cache) => {
  const _component_BsInputBase = vue.resolveComponent("BsInputBase");

  return (vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
    vue.createVNode(_component_BsInputBase, {
      width: width.value,
      label: label.value,
      help: help.value,
      badge: badge.value
    }, {
      default: vue.withCtx(() => [
        vue.withDirectives(vue.createElementVNode("textarea", vue.mergeProps({
          id: "textArea",
          "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((model).value = $event)),
          class: "form-control",
          type: "text"
        }, _ctx.$attrs, {
          "data-bs-toggle": "tooltip",
          "data-bs-custom-class": "custom-tooltip",
          "data-bs-title": help.value,
          onContextmenu: vue.withModifiers(openContextMenu, ["right","prevent"])
        }), null, 16 /* FULL_PROPS */, _hoisted_1$m), [
          [vue.vModelText, model.value]
        ])
      ]),
      _: 1 /* STABLE */
    }, 8 /* PROPS */, ["width", "label", "help", "badge"]),
    vue.createElementVNode("div", {
      id: "contextMenu",
      class: "dropdown-menu",
      onClick: _cache[1] || (_cache[1] = (...args) => (_ctx.closeContextMenu && _ctx.closeContextMenu(...args)))
    }, [
      (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(contextMenuOptions.value, (o) => {
        return (vue.openBlock(), vue.createElementBlock("a", {
          key: o.value,
          class: "dropdown-item",
          onClick: $event => (insertText(o.value))
        }, vue.toDisplayString(o.label), 9 /* TEXT, PROPS */, _hoisted_2$9))
      }), 128 /* KEYED_FRAGMENT */))
    ])
  ], 64 /* STABLE_FRAGMENT */))
}
}

});

script$p.__file = "src/components/BsInputTextAreaFormat.vue";

const _hoisted_1$l = { class: "input-group" };
const _hoisted_2$8 = ["data-bs-title"];


var script$o = /*@__PURE__*/Object.assign({
  inheritAttrs: false,
}, {
  __name: 'BsInputReadonly',
  props: {
    "modelValue": {
  type: [String, Number],
  default: '',
},
    "modelModifiers": {},
    "label": {
  type: String,
  default: undefined,
},
    "labelModifiers": {},
    "help": {
  type: String,
  default: undefined,
},
    "helpModifiers": {},
    "width": {
  type: [String, Number],
  default: undefined,
  validator: value => {
    if (value === undefined || value === null || value === '') return true;
    if (typeof value === 'number') return value > 0 && value <= 12;
    if (typeof value === 'string')
      return /^(\d|1[0-2])$|^(sm|md|lg|xl|xxl)-(\d|1[0-2])$/.test(value);
    return false;
  },
},
    "widthModifiers": {},
  },
  emits: ["update:modelValue", "update:label", "update:help", "update:width"],
  setup(__props) {

/**
 * 2024-05-28 Bootstrap VueJS wrapper, Magnus Persson
 */

/**
 * Purpose: Proviude an input field
 */

/**
 * This is the v-model field that will be used to bind the component to (required).
 */
const model = vue.useModel(__props, "modelValue");

/**
 * This text is shown above the form component (optional).
 */
const label = vue.useModel(__props, 'label');

/**
 * Help text is shown below the field to provide user help with input (optional).
 */
const help = vue.useModel(__props, 'help');

/**
 * Specify the width to force a specific size (optional).
 */
const width = vue.useModel(__props, 'width');

return (_ctx, _cache) => {
  const _component_BsInputBase = vue.resolveComponent("BsInputBase");

  return (vue.openBlock(), vue.createBlock(_component_BsInputBase, {
    width: width.value,
    label: label.value,
    help: help.value
  }, {
    default: vue.withCtx(() => [
      vue.createElementVNode("div", _hoisted_1$l, [
        vue.withDirectives(vue.createElementVNode("input", vue.mergeProps({
          "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((model).value = $event)),
          class: "form-control-plaintext",
          readonly: "",
          type: "text"
        }, _ctx.$attrs, {
          "data-bs-toggle": "tooltip",
          "data-bs-custom-class": "custom-tooltip",
          "data-bs-title": help.value
        }), null, 16 /* FULL_PROPS */, _hoisted_2$8), [
          [vue.vModelText, model.value]
        ])
      ])
    ]),
    _: 1 /* STABLE */
  }, 8 /* PROPS */, ["width", "label", "help"]))
}
}

});

script$o.__file = "src/components/BsInputReadonly.vue";

const _hoisted_1$k = {
  class: "btn-group",
  role: "group"
};
const _hoisted_2$7 = ["id", "value", "name", "disabled"];
const _hoisted_3$6 = ["for"];


var script$n = /*@__PURE__*/Object.assign({
  inheritAttrs: false,
}, {
  __name: 'BsInputRadio',
  props: {
    "modelValue": {
  type: [String, Number, Boolean],
  default: null,
},
    "modelModifiers": {},
    "options": {
  type: Array,
  default: () => [],
  validator: options => {
    return options.every(
      option => option && typeof option === 'object' && 'label' in option && 'value' in option
    );
  },
},
    "optionsModifiers": {},
    "label": {
  type: String,
  default: undefined,
},
    "labelModifiers": {},
    "help": {
  type: String,
  default: undefined,
},
    "helpModifiers": {},
    "width": {
  type: [String, Number],
  default: undefined,
  validator: value => {
    if (value === undefined || value === null || value === '') return true;
    if (typeof value === 'number') return value > 0 && value <= 12;
    if (typeof value === 'string')
      return /^(\d|1[0-2])$|^(sm|md|lg|xl|xxl)-(\d|1[0-2])$/.test(value);
    return false;
  },
},
    "widthModifiers": {},
    "disabled": {
  type: Boolean,
  default: false,
},
    "disabledModifiers": {},
    "badge": {
  type: Number,
  default: 0,
},
    "badgeModifiers": {},
  },
  emits: ["update:modelValue", "update:options", "update:label", "update:help", "update:width", "update:disabled", "update:badge"],
  setup(__props) {

/**
 * 2024-05-28 Bootstrap VueJS wrapper, Magnus Persson
 */

/**
 * Purpose: Show a selector with a number of options.
 */

/**
 * This is the v-model field that will be used to bind the component to (required).
 */
const model = vue.useModel(__props, "modelValue");

/**
 * Options for the dropdown in the format [ { label: "label", value: "value" } ]
 * Label is displayed in the list and value is stored in the bound ref (required).
 */
const options = vue.useModel(__props, 'options');

/**
 * This text is shown above the form component (optional).
 */
const label = vue.useModel(__props, 'label');

/**
 * Help text is shown below the field to provide user help with input (optional).
 */
const help = vue.useModel(__props, 'help');

/**
 * Specify the width to force a specific size (optional).
 */
const width = vue.useModel(__props, 'width');

/**
 * Ref that steers if this component is enabled or not (required).
 */
const disabled = vue.useModel(__props, 'disabled');

/**
 * Specify the number to show in the badge to guide the user (optional).
 */
const badge = vue.useModel(__props, 'badge');

return (_ctx, _cache) => {
  const _component_BsInputBase = vue.resolveComponent("BsInputBase");

  return (vue.openBlock(), vue.createBlock(_component_BsInputBase, {
    width: width.value,
    label: label.value,
    help: help.value,
    badge: badge.value
  }, {
    default: vue.withCtx(() => [
      vue.createElementVNode("div", _hoisted_1$k, [
        (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(options.value, (o) => {
          return (vue.openBlock(), vue.createElementBlock(vue.Fragment, {
            key: o.value
          }, [
            vue.withDirectives(vue.createElementVNode("input", {
              id: 'radio' + _ctx.$.uid + o.value,
              "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((model).value = $event)),
              type: "radio",
              class: "btn-check",
              value: o.value,
              name: 'radio' + _ctx.$.uid,
              disabled: disabled.value
            }, null, 8 /* PROPS */, _hoisted_2$7), [
              [vue.vModelRadio, model.value]
            ]),
            vue.createElementVNode("label", {
              class: "btn btn-outline-primary",
              for: 'radio' + _ctx.$.uid + o.value
            }, vue.toDisplayString(o.label), 9 /* TEXT, PROPS */, _hoisted_3$6)
          ], 64 /* STABLE_FRAGMENT */))
        }), 128 /* KEYED_FRAGMENT */))
      ])
    ]),
    _: 1 /* STABLE */
  }, 8 /* PROPS */, ["width", "label", "help", "badge"]))
}
}

});

script$n.__file = "src/components/BsInputRadio.vue";

const _hoisted_1$j = ["width", "height"];


var script$m = /*@__PURE__*/Object.assign({
  inheritAttrs: false,
}, {
  __name: 'IconWifi',
  props: {
    "width": {
  type: [String, Number],
  default: 16,
  validator: value => {
    // Accept CSS units like "1rem", "16px", etc. or numeric values
    if (typeof value === 'string') {
      return /^(\d+(\.\d+)?)(px|rem|em|%|vh|vw|pt|pc|in|cm|mm|ex|ch|lh)?$/.test(value.trim());
    }
    const num = Number(value);
    return !isNaN(num) && num > 0;
  },
},
    "widthModifiers": {},
    "height": {
  type: [String, Number],
  default: 16,
  validator: value => {
    // Accept CSS units like "1rem", "16px", etc. or numeric values
    if (typeof value === 'string') {
      return /^(\d+(\.\d+)?)(px|rem|em|%|vh|vw|pt|pc|in|cm|mm|ex|ch|lh)?$/.test(value.trim());
    }
    const num = Number(value);
    return !isNaN(num) && num > 0;
  },
},
    "heightModifiers": {},
  },
  emits: ["update:width", "update:height"],
  setup(__props) {

/**
 * 2024-05-28 Bootstrap VueJS wrapper, Magnus Persson
 */

/**
 * Purpose: Show an svg icon on the UI. Used embedded svg to avoid downloading data from internet.
 */


/**
 * Width of the icon (optional).
 */
const width = vue.useModel(__props, 'width');

/**
 * Height of the icon (optional).
 */
const height = vue.useModel(__props, 'height');

return (_ctx, _cache) => {
  return (vue.openBlock(), vue.createElementBlock("svg", vue.mergeProps(_ctx.$attrs, {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 16 16",
    fill: "currentColor",
    width: width.value,
    height: height.value
  }), [...(_cache[0] || (_cache[0] = [
    vue.createElementVNode("path", { d: "M15.384 6.115a.485.485 0 0 0-.047-.736A12.44 12.44 0 0 0 8 3C5.259 3 2.723 3.882.663 5.379a.485.485 0 0 0-.048.736.52.52 0 0 0 .668.05A11.45 11.45 0 0 1 8 4c2.507 0 4.827.802 6.716 2.164.205.148.49.13.668-.049" }, null, -1 /* CACHED */),
    vue.createElementVNode("path", { d: "M13.229 8.271a.482.482 0 0 0-.063-.745A9.46 9.46 0 0 0 8 6c-1.905 0-3.68.56-5.166 1.526a.48.48 0 0 0-.063.745.525.525 0 0 0 .652.065A8.46 8.46 0 0 1 8 7a8.46 8.46 0 0 1 4.576 1.336c.206.132.48.108.653-.065m-2.183 2.183c.226-.226.185-.605-.1-.75A6.5 6.5 0 0 0 8 9c-1.06 0-2.062.254-2.946.704-.285.145-.326.524-.1.75l.015.015c.16.16.407.19.611.09A5.5 5.5 0 0 1 8 10c.868 0 1.69.201 2.42.56.203.1.45.07.61-.091zM9.06 12.44c.196-.196.198-.52-.04-.66A2 2 0 0 0 8 11.5a2 2 0 0 0-1.02.28c-.238.14-.236.464-.04.66l.706.706a.5.5 0 0 0 .707 0l.707-.707z" }, null, -1 /* CACHED */)
  ]))], 16 /* FULL_PROPS */, _hoisted_1$j))
}
}

});

script$m.__file = "src/components/IconWifi.vue";

const _hoisted_1$i = ["disabled"];
const _hoisted_2$6 = ["value"];
const _hoisted_3$5 = ["value"];
/**
 * 2024-05-28 Bootstrap VueJS wrapper, Magnus Persson
 */

/**
 * Purpose: Provide a select option
 */

var script$l = /*@__PURE__*/Object.assign({
  inheritAttrs: false,
}, {
  __name: 'BsSelect',
  props: {
    "modelValue": {
  type: [String, Number, Boolean],
  default: null,
},
    "modelModifiers": {},
    "label": {
  type: String,
  default: undefined,
},
    "labelModifiers": {},
    "help": {
  type: String,
  default: undefined,
},
    "helpModifiers": {},
    "width": {
  type: [String, Number],
  default: undefined,
  validator: value => {
    if (value === undefined || value === null || value === '') return true;
    if (typeof value === 'number') return value > 0 && value <= 12;
    if (typeof value === 'string')
      return /^(\d|1[0-2])$|^(sm|md|lg|xl|xxl)-(\d|1[0-2])$/.test(value);
    return false;
  },
},
    "widthModifiers": {},
    "options": {
  type: Array,
  default: () => [],
  validator: options => {
    return options.every(
      option => option && typeof option === 'object' && 'label' in option && 'value' in option
    );
  },
},
    "optionsModifiers": {},
    "disabled": {
  type: Boolean,
  default: false,
},
    "disabledModifiers": {},
    "badge": {
  type: Number,
  default: 0,
},
    "badgeModifiers": {},
  },
  emits: ["update:modelValue", "update:label", "update:help", "update:width", "update:options", "update:disabled", "update:badge"],
  setup(__props) {


/**
 * Ref to bind value to (required).
 */
const model = vue.useModel(__props, "modelValue");

/**
 * This text is shown above the form component (optional).
 */
const label = vue.useModel(__props, 'label');

/**
 * Help text is shown below the field to provide user help with input (optional).
 */
const help = vue.useModel(__props, 'help');

/**
 * Specify the width to force a specific size (optional).
 */
const width = vue.useModel(__props, 'width');

/**
 * Options for the dropdown in the format [ { label: "label", value: "value" } ]
 * Label is displayed in the list and value is stored in the bound ref (required).
 */
const options = vue.useModel(__props, 'options');

/**
 * Ref that steers if this component is enabled or not (optional).
 */
const disabled = vue.useModel(__props, 'disabled');

/**
 * Specify the number to show in the badge to guide the user (optional).
 */
const badge = vue.useModel(__props, 'badge');

return (_ctx, _cache) => {
  const _component_BsInputBase = vue.resolveComponent("BsInputBase");

  return (vue.openBlock(), vue.createBlock(_component_BsInputBase, {
    width: width.value,
    label: label.value,
    help: help.value,
    badge: badge.value
  }, {
    default: vue.withCtx(() => [
      vue.withDirectives(vue.createElementVNode("select", vue.mergeProps({
        "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((model).value = $event)),
        class: "form-select",
        disabled: disabled.value
      }, _ctx.$attrs), [
        (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(options.value, (o) => {
          return (vue.openBlock(), vue.createElementBlock(vue.Fragment, {
            key: o.value
          }, [
            (o.value === model.value)
              ? (vue.openBlock(), vue.createElementBlock("option", {
                  key: 0,
                  selected: "",
                  value: o.value
                }, [
                  vue.createVNode(script$m),
                  vue.createTextVNode(vue.toDisplayString(o.label), 1 /* TEXT */)
                ], 8 /* PROPS */, _hoisted_2$6))
              : (vue.openBlock(), vue.createElementBlock("option", {
                  key: 1,
                  value: o.value
                }, vue.toDisplayString(o.label), 9 /* TEXT, PROPS */, _hoisted_3$5))
          ], 64 /* STABLE_FRAGMENT */))
        }), 128 /* KEYED_FRAGMENT */))
      ], 16 /* FULL_PROPS */, _hoisted_1$i), [
        [vue.vModelSelect, model.value]
      ])
    ]),
    _: 1 /* STABLE */
  }, 8 /* PROPS */, ["width", "label", "help", "badge"]))
}
}

});

script$l.__file = "src/components/BsSelect.vue";

const _hoisted_1$h = ["width", "height"];


var script$k = /*@__PURE__*/Object.assign({
  inheritAttrs: false,
}, {
  __name: 'IconXCircle',
  props: {
    "width": {
  type: [String, Number],
  default: 16,
  validator: value => {
    // Accept CSS units like "1rem", "16px", etc. or numeric values
    if (typeof value === 'string') {
      return /^(\d+(\.\d+)?)(px|rem|em|%|vh|vw|pt|pc|in|cm|mm|ex|ch|lh)?$/.test(value.trim());
    }
    const num = Number(value);
    return !isNaN(num) && num > 0;
  },
},
    "widthModifiers": {},
    "height": {
  type: [String, Number],
  default: 16,
  validator: value => {
    // Accept CSS units like "1rem", "16px", etc. or numeric values
    if (typeof value === 'string') {
      return /^(\d+(\.\d+)?)(px|rem|em|%|vh|vw|pt|pc|in|cm|mm|ex|ch|lh)?$/.test(value.trim());
    }
    const num = Number(value);
    return !isNaN(num) && num > 0;
  },
},
    "heightModifiers": {},
  },
  emits: ["update:width", "update:height"],
  setup(__props) {

/**
 * 2024-05-28 Bootstrap VueJS wrapper, Magnus Persson
 */

/**
 * Purpose: Show an svg icon on the UI. Used embedded svg to avoid downloading data from internet.
 */


/**
 * Width of the icon (optional).
 */
const width = vue.useModel(__props, 'width');

/**
 * Height of the icon (optional).
 */
const height = vue.useModel(__props, 'height');

return (_ctx, _cache) => {
  return (vue.openBlock(), vue.createElementBlock("svg", vue.mergeProps(_ctx.$attrs, {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 16 16",
    fill: "currentColor",
    width: width.value,
    height: height.value
  }), [...(_cache[0] || (_cache[0] = [
    vue.createElementVNode("path", { d: "M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" }, null, -1 /* CACHED */),
    vue.createElementVNode("path", { d: "M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" }, null, -1 /* CACHED */)
  ]))], 16 /* FULL_PROPS */, _hoisted_1$h))
}
}

});

script$k.__file = "src/components/IconXCircle.vue";

const _hoisted_1$g = ["width", "height"];


var script$j = /*@__PURE__*/Object.assign({
  inheritAttrs: false,
}, {
  __name: 'IconCheckCircle',
  props: {
    "width": {
  type: [String, Number],
  default: 16,
  validator: value => {
    // Accept CSS units like "1rem", "16px", etc. or numeric values
    if (typeof value === 'string') {
      return /^(\d+(\.\d+)?)(px|rem|em|%|vh|vw|pt|pc|in|cm|mm|ex|ch|lh)?$/.test(value.trim());
    }
    const num = Number(value);
    return !isNaN(num) && num > 0;
  },
},
    "widthModifiers": {},
    "height": {
  type: [String, Number],
  default: 16,
  validator: value => {
    // Accept CSS units like "1rem", "16px", etc. or numeric values
    if (typeof value === 'string') {
      return /^(\d+(\.\d+)?)(px|rem|em|%|vh|vw|pt|pc|in|cm|mm|ex|ch|lh)?$/.test(value.trim());
    }
    const num = Number(value);
    return !isNaN(num) && num > 0;
  },
},
    "heightModifiers": {},
  },
  emits: ["update:width", "update:height"],
  setup(__props) {

/**
 * 2024-05-28 Bootstrap VueJS wrapper, Magnus Persson
 */

/**
 * Purpose: Show an svg icon on the UI. Used embedded svg to avoid downloading data from internet.
 */


/**
 * Width of the icon (optional).
 */
const width = vue.useModel(__props, 'width');

/**
 * Height of the icon (optional).
 */
const height = vue.useModel(__props, 'height');

return (_ctx, _cache) => {
  return (vue.openBlock(), vue.createElementBlock("svg", vue.mergeProps(_ctx.$attrs, {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 16 16",
    fill: "currentColor",
    width: width.value,
    height: height.value
  }), [...(_cache[0] || (_cache[0] = [
    vue.createElementVNode("path", { d: "M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" }, null, -1 /* CACHED */),
    vue.createElementVNode("path", { d: "m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05" }, null, -1 /* CACHED */)
  ]))], 16 /* FULL_PROPS */, _hoisted_1$g))
}
}

});

script$j.__file = "src/components/IconCheckCircle.vue";

const _hoisted_1$f = ["width", "height"];


var script$i = /*@__PURE__*/Object.assign({
  inheritAttrs: false,
}, {
  __name: 'IconInfoCircle',
  props: {
    "width": {
  type: [String, Number],
  default: 16,
  validator: value => {
    // Accept CSS units like "1rem", "16px", etc. or numeric values
    if (typeof value === 'string') {
      return /^(\d+(\.\d+)?)(px|rem|em|%|vh|vw|pt|pc|in|cm|mm|ex|ch|lh)?$/.test(value.trim());
    }
    const num = Number(value);
    return !isNaN(num) && num > 0;
  },
},
    "widthModifiers": {},
    "height": {
  type: [String, Number],
  default: 16,
  validator: value => {
    // Accept CSS units like "1rem", "16px", etc. or numeric values
    if (typeof value === 'string') {
      return /^(\d+(\.\d+)?)(px|rem|em|%|vh|vw|pt|pc|in|cm|mm|ex|ch|lh)?$/.test(value.trim());
    }
    const num = Number(value);
    return !isNaN(num) && num > 0;
  },
},
    "heightModifiers": {},
  },
  emits: ["update:width", "update:height"],
  setup(__props) {

/**
 * 2024-05-28 Bootstrap VueJS wrapper, Magnus Persson
 */

/**
 * Purpose: Show an svg icon on the UI. Used embedded svg to avoid downloading data from internet.
 */


/**
 * Width of the icon (optional).
 */
const width = vue.useModel(__props, 'width');

/**
 * Height of the icon (optional).
 */
const height = vue.useModel(__props, 'height');

return (_ctx, _cache) => {
  return (vue.openBlock(), vue.createElementBlock("svg", vue.mergeProps(_ctx.$attrs, {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 16 16",
    fill: "currentColor",
    width: width.value,
    height: height.value
  }), [...(_cache[0] || (_cache[0] = [
    vue.createElementVNode("path", { d: "M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" }, null, -1 /* CACHED */),
    vue.createElementVNode("path", { d: "m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" }, null, -1 /* CACHED */)
  ]))], 16 /* FULL_PROPS */, _hoisted_1$f))
}
}

});

script$i.__file = "src/components/IconInfoCircle.vue";

const _hoisted_1$e = ["width", "height"];


var script$h = /*@__PURE__*/Object.assign({
  inheritAttrs: false,
}, {
  __name: 'IconExclamationTriangle',
  props: {
    "width": {
  type: [String, Number],
  default: 16,
  validator: value => {
    // Accept CSS units like "1rem", "16px", etc. or numeric values
    if (typeof value === 'string') {
      return /^(\d+(\.\d+)?)(px|rem|em|%|vh|vw|pt|pc|in|cm|mm|ex|ch|lh)?$/.test(value.trim());
    }
    const num = Number(value);
    return !isNaN(num) && num > 0;
  },
},
    "widthModifiers": {},
    "height": {
  type: [String, Number],
  default: 16,
  validator: value => {
    // Accept CSS units like "1rem", "16px", etc. or numeric values
    if (typeof value === 'string') {
      return /^(\d+(\.\d+)?)(px|rem|em|%|vh|vw|pt|pc|in|cm|mm|ex|ch|lh)?$/.test(value.trim());
    }
    const num = Number(value);
    return !isNaN(num) && num > 0;
  },
},
    "heightModifiers": {},
  },
  emits: ["update:width", "update:height"],
  setup(__props) {

/**
 * 2024-05-28 Bootstrap VueJS wrapper, Magnus Persson
 */

/**
 * Purpose: Show an svg icon on the UI. Used embedded svg to avoid downloading data from internet.
 */


/**
 * Width of the icon (optional).
 */
const width = vue.useModel(__props, 'width');

/**
 * Height of the icon (optional).
 */
const height = vue.useModel(__props, 'height');

return (_ctx, _cache) => {
  return (vue.openBlock(), vue.createElementBlock("svg", vue.mergeProps(_ctx.$attrs, {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 16 16",
    fill: "currentColor",
    width: width.value,
    height: height.value
  }), [...(_cache[0] || (_cache[0] = [
    vue.createElementVNode("path", { d: "M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.15.15 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.2.2 0 0 1-.054.06.1.1 0 0 1-.066.017H1.146a.1.1 0 0 1-.066-.017.2.2 0 0 1-.054-.06.18.18 0 0 1 .002-.183L7.884 2.073a.15.15 0 0 1 .054-.057m1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767z" }, null, -1 /* CACHED */),
    vue.createElementVNode("path", { d: "M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z" }, null, -1 /* CACHED */)
  ]))], 16 /* FULL_PROPS */, _hoisted_1$e))
}
}

});

script$h.__file = "src/components/IconExclamationTriangle.vue";

const _hoisted_1$d = {
  key: 5,
  type: "button",
  class: "btn-close",
  "data-bs-dismiss": "alert",
  "aria-label": "Close"
};

/**
 * 2024-05-28 Bootstrap VueJS wrapper, Magnus Persson
 */

/**
 * Purpose: Show a alert with a message
 */

var script$g = /*@__PURE__*/Object.assign({
  inheritAttrs: false,
}, {
  __name: 'BsMessage',
  props: {
    "message": {
  type: String,
  default: 'Message',
  validator: value => {
    return typeof value === 'string';
  },
},
    "messageModifiers": {},
    "dismissable": {
  type: [Boolean, String],
  default: false,
  validator: value => {
    if (typeof value === 'boolean') return true;
    if (typeof value === 'string') return ['true', 'false'].includes(value.toLowerCase());
    return false;
  },
},
    "dismissableModifiers": {},
    "alert": {
  type: String,
  default: 'info',
  validator: value => ['danger', 'success', 'warning', 'info'].includes(value.toLowerCase()),
},
    "alertModifiers": {},
    "close": {
  type: Function,
  default: () => {},
  validator: value => {
    return typeof value === 'function';
  },
},
    "closeModifiers": {},
  },
  emits: ["update:message", "update:dismissable", "update:alert", "update:close"],
  setup(__props) {


/**
 * Text message to show in alert (required).
 */
const message = vue.useModel(__props, 'message');

/**
 * If set to 'true' then the message can be closed by the user (optional).
 */
const dismissable = vue.useModel(__props, 'dismissable');

/**
 * The type of the alert (Danger|Success|Warning|Info) (required).
 */
const alert = vue.useModel(__props, 'alert');

/**
 * Function to call when close button is used (optional).
 */
const close = vue.useModel(__props, 'close');

const classNames = () => {
  const cn = dismissable.value
    ? 'alert alert-' + alert.value + ' align-items-center alert-dismissible fade show'
    : 'alert alert-' + alert.value + ' align-items-center';
  return cn;
};

return (_ctx, _cache) => {
  return (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
    class: classNames(),
    role: "alert"
  }, _ctx.$attrs), [
    (alert.value === 'danger')
      ? (vue.openBlock(), vue.createBlock(script$k, {
          key: 0,
          height: "20",
          width: "20"
        }))
      : vue.createCommentVNode("v-if", true),
    (alert.value === 'warning')
      ? (vue.openBlock(), vue.createBlock(script$h, {
          key: 1,
          height: "20",
          width: "20"
        }))
      : vue.createCommentVNode("v-if", true),
    (alert.value === 'info')
      ? (vue.openBlock(), vue.createBlock(script$i, {
          key: 2,
          height: "20",
          width: "20"
        }))
      : vue.createCommentVNode("v-if", true),
    (alert.value === 'success')
      ? (vue.openBlock(), vue.createBlock(script$j, {
          key: 3,
          height: "20",
          width: "20"
        }))
      : vue.createCommentVNode("v-if", true),
    vue.createTextVNode("  " + vue.toDisplayString(message.value) + " ", 1 /* TEXT */),
    vue.createCommentVNode(" @slot mesage can be provided using a slot or message attribute "),
    vue.renderSlot(_ctx.$slots, "default"),
    (dismissable.value && close.value !== undefined)
      ? (vue.openBlock(), vue.createElementBlock("button", {
          key: 4,
          type: "button",
          class: "btn-close",
          "aria-label": "Close",
          onClick: _cache[0] || (_cache[0] = $event => (close.value(alert.value)))
        }))
      : vue.createCommentVNode("v-if", true),
    (dismissable.value && close.value === undefined)
      ? (vue.openBlock(), vue.createElementBlock("button", _hoisted_1$d))
      : vue.createCommentVNode("v-if", true)
  ], 16 /* FULL_PROPS */))
}
}

});

script$g.__file = "src/components/BsMessage.vue";

function readEnvVar(name) {
  // 1) Check a runtime-injected global shim (useful for demos or non-Vite runtimes)
  try {
    if (globalThis && globalThis.__ENV__ && typeof globalThis.__ENV__[name] !== 'undefined') {
      return globalThis.__ENV__[name];
    }
  } catch (e) {
    // ignore
  }

  // 2) Check Node-style process.env when running in Node
  try {
    if (typeof process !== 'undefined' && process.env && typeof process.env[name] !== 'undefined') {
      return process.env[name];
    }
  } catch (e) {
    // ignore
  }

  // 3) Try import.meta.env (works when bundlers inject it). Access inside try/catch to avoid
  // syntax/runtime errors in environments where import.meta is not present.
  try {
    if (({ url: (typeof document === 'undefined' ? require('u' + 'rl').pathToFileURL(__filename).href : (_documentCurrentScript && _documentCurrentScript.tagName.toUpperCase() === 'SCRIPT' && _documentCurrentScript.src || new URL('index.js', document.baseURI).href)) }) && undefined && typeof undefined[name] !== 'undefined') {
      return undefined[name];
    }
  } catch (e) {
    // import.meta may not be available in some runtimes; ignore errors
  }

  return undefined;
}

function logDebug(...args) {
  const debugVal = readEnvVar('VITE_APP_DEBUG');
  // Treat '0', 'false', '', undefined as falsy; anything else truthy
  if (!debugVal) return;
  console.log('Debug', ...args);
}

function logInfo(...args) {
  // if(process.env.VUE_APP_INFO === undefined)
  //  return

  console.log('Info', ...args);
}

function logError(...args) {
  console.log('Error', ...args);
}

/**
 * Round a numeric value to specified decimal places
 * @param {number} val - Value to round
 * @param {number} decimals - Number of decimal places
 * @returns {number} Rounded value
 */
function roundVal(val, decimals) {
  return parseFloat(Number(val).toFixed(decimals));
}

/**
 * Convert specific gravity to Plato degrees
 * @param {number} sg - Specific gravity value
 * @returns {number} Plato degrees
 */
function gravityToPlato(sg) {
  return 135.997 * sg * sg * sg - 630.272 * sg * sg + 1111.14 * sg - 616.868;
}

/**
 * Convert Plato degrees to specific gravity
 * @param {number} p - Plato degrees
 * @returns {number} Specific gravity
 */
function gravityToSG(p) {
  return 1 + p / (258.6 - 227.1 * (p / 258.2));
}

/**
 * Convert Celsius to Fahrenheit
 * @param {number} c - Temperature in Celsius
 * @returns {number} Temperature in Fahrenheit
 */
function tempToF(c) {
  return c * 1.8 + 32.0;
}

/**
 * Convert Fahrenheit to Celsius
 * @param {number} f - Temperature in Fahrenheit
 * @returns {number} Temperature in Celsius
 */
function tempToC(f) {
  return (f - 32.0) / 1.8;
}

/**
 * Convert PSI (Pounds per Square Inch) to Bar
 * @param {number} p - Pressure in PSI
 * @returns {number} Pressure in Bar
 */
function psiToBar(p) {
  return p * 0.0689475729;
}

/**
 * Convert PSI (Pounds per Square Inch) to kPa (Kilopascals)
 * @param {number} p - Pressure in PSI
 * @returns {number} Pressure in kPa
 */
function psiToKPa(p) {
  return p * 6.89475729;
}

/**
 * Convert Bar to PSI (Pounds per Square Inch)
 * @param {number} p - Pressure in Bar
 * @returns {number} Pressure in PSI
 */
function barToPsi(p) {
  return p / 0.0689475729;
}

/**
 * Convert kPa (Kilopascals) to PSI (Pounds per Square Inch)
 * @param {number} p - Pressure in kPa
 * @returns {number} Pressure in PSI
 */
function kpaToPsi(p) {
  return p / 6.89475729;
}

/**
 * Validate if string is valid JSON
 * @param {string} s - String to validate
 * @returns {boolean} True if valid JSON
 */
function isValidJson(s) {
  try {
    JSON.stringify(JSON.parse(s));
    return true;
  } catch (e) {
    logDebug('utils.isValidJson()', e);
  }
  return false;
}

/**
 * Validate if string is valid form data (starts with ?)
 * @param {string} s - String to validate
 * @returns {boolean} True if valid form data
 */
function isValidFormData(s) {
  if (s.startsWith('?')) return true;
  return false;
}

/**
 * Validate if string is valid MQTT data (contains |)
 * @param {string} s - String to validate
 * @returns {boolean} True if valid MQTT data
 */
function isValidMqttData(s) {
  if (s.indexOf('|') >= 0) return true;
  return false;
}

/**
 * Validate all forms with the `.needs-validation` class and apply Bootstrap styles.
 *
 * Behavior:
 * - Finds all forms matching `.needs-validation` in the document.
 * - Calls the native HTML5 `checkValidity()` on each form.
 * - Adds the `was-validated` class to show Bootstrap validation UI.
 * - Returns true if all forms are valid, false otherwise.
 *
 * Note: This function is safe to call in non-browser contexts (Node) — it will
 * short-circuit and return true if `document` is not available.
 *
 * @returns {boolean} true if all matching forms are valid
 */
function validateCurrentForm() {
  // If there's no DOM (e.g. running in Node), short-circuit and return true
  if (typeof document === 'undefined' || !document.querySelectorAll) {
    try {
      logDebug('validateCurrentForm: document not available, skipping validation');
    } catch (e) {
      // ignore logging failures
    }
    return true;
  }

  let valid = true;
  const forms = document.querySelectorAll('.needs-validation');

  Array.from(forms).forEach(form => {
    if (!form.checkValidity()) valid = false;

    form.classList.add('was-validated');
  });

  return valid;
}
/**
 * Format a time duration into a human-readable string.
 *
 * By default the input value `t` is treated as seconds. Set options.input = 'ms'
 * to treat the value as milliseconds.
 *
 * Options:
 * - input: 's' | 'ms' (default 's') - unit of the provided value
 * - compact: boolean (default false) - if true, return only the largest non-zero unit (e.g. "2h")
 * - decimals: number (default 0) - decimal places for seconds when needed
 *
 * Examples:
 * formatTime(3661) -> "1h 1m 1s"
 * formatTime(3661, { compact: true }) -> "1h"
 * formatTime(1500, { input: 'ms' }) -> "1s 500ms" (milliseconds are converted to seconds fraction)
 *
 * @param {number} t - duration (seconds by default, milliseconds if options.input === 'ms')
 * @param {Object} [options]
 * @param {'s'|'ms'} [options.input='s']
 * @param {boolean} [options.compact=false]
 * @param {number} [options.decimals=0]
 * @returns {string} Human readable duration
 */
function formatTime(t, options = {}) {
  const { input = 's', compact = false, decimals = 0 } = options || {};

  if (t == null || Number.isNaN(Number(t))) return '';

  // Convert to seconds (may be fractional)
  let totalSeconds = Number(t);
  if (input === 'ms') totalSeconds = totalSeconds / 1000;

  const sign = totalSeconds < 0 ? '-' : '';
  totalSeconds = Math.abs(totalSeconds);

  const days = Math.floor(totalSeconds / 86400);
  totalSeconds -= days * 86400;

  const hours = Math.floor(totalSeconds / 3600);
  totalSeconds -= hours * 3600;

  const minutes = Math.floor(totalSeconds / 60);
  totalSeconds -= minutes * 60;

  // seconds may be fractional
  const seconds = totalSeconds;

  const parts = [];
  if (days > 0) parts.push(days + 'd');
  if (hours > 0) parts.push(hours + 'h');
  if (minutes > 0) parts.push(minutes + 'm');

  // Format seconds with decimals when appropriate
  const formatSeconds = s => {
    if (decimals > 0) return s.toFixed(decimals) + 's';
    // show integer seconds when fractional is effectively zero
    const intSec = Math.floor(s);
    if (Math.abs(s - intSec) < 1e-9) return intSec + 's';
    return s + 's';
  };

  // When there are no day/hour/minute parts, always include seconds (even 0s)
  if (parts.length === 0) {
    parts.push(formatSeconds(seconds));
  } else if (seconds >= 1) {
    // include seconds when >= 1s
    parts.push(formatSeconds(seconds));
  }

  // If compact requested, return only the largest non-zero unit
  if (compact) {
    const first = parts.find(p => !p.startsWith('0'));
    return sign + (first || '0s');
  }

  // Trim trailing zero-value parts (e.g., omit "0s" unless it's the only part)
  const trimmed = parts.filter(p => {
    if (p.startsWith('0') && parts.length > 1) return false;
    return true;
  });

  return sign + trimmed.join(' ');
}

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

const INDENT = Symbol.for('indent');
const NEWLINE = Symbol.for('newline');

const DEFAULT_NEWLINE = '\n';
const DEFAULT_INDENT = '  ';
const BOM = /^\uFEFF/;

// only respect indentation if we got a line break, otherwise squash it
// things other than objects and arrays aren't indented, so ignore those
// Important: in both of these regexps, the $1 capture group is the newline
// or undefined, and the $2 capture group is the indent, or undefined.
const FORMAT = /^\s*[{[]((?:\r?\n)+)([\s\t]*)/;
const EMPTY = /^(?:\{\}|\[\])((?:\r?\n)+)?$/;

// Node 20 puts single quotes around the token and a comma after it
const UNEXPECTED_TOKEN = /^Unexpected token '?(.)'?(,)? /i;

const hexify = (char) => {
  const h = char.charCodeAt(0).toString(16).toUpperCase();
  return `0x${h.length % 2 ? '0' : ''}${h}`
};

// Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
// because the buffer-to-string conversion in `fs.readFileSync()`
// translates it to FEFF, the UTF-16 BOM.
const stripBOM = (txt) => String(txt).replace(BOM, '');

const makeParsedError = (msg, parsing, position = 0) => ({
  message: `${msg} while parsing ${parsing}`,
  position,
});

const parseError = (e, txt, context = 20) => {
  let msg = e.message;

  if (!txt) {
    return makeParsedError(msg, 'empty string')
  }

  const badTokenMatch = msg.match(UNEXPECTED_TOKEN);
  const badIndexMatch = msg.match(/ position\s+(\d+)/i);

  if (badTokenMatch) {
    msg = msg.replace(
      UNEXPECTED_TOKEN,
      `Unexpected token ${JSON.stringify(badTokenMatch[1])} (${hexify(badTokenMatch[1])})$2 `
    );
  }

  let errIdx;
  if (badIndexMatch) {
    errIdx = +badIndexMatch[1];
  } else /* istanbul ignore next - doesnt happen in Node 22 */ if (
    msg.match(/^Unexpected end of JSON.*/i)
  ) {
    errIdx = txt.length - 1;
  }

  if (errIdx == null) {
    return makeParsedError(msg, `'${txt.slice(0, context * 2)}'`)
  }

  const start = errIdx <= context ? 0 : errIdx - context;
  const end = errIdx + context >= txt.length ? txt.length : errIdx + context;
  const slice = `${start ? '...' : ''}${txt.slice(start, end)}${end === txt.length ? '' : '...'}`;

  return makeParsedError(
    msg,
    `${txt === slice ? '' : 'near '}${JSON.stringify(slice)}`,
    errIdx
  )
};

class JSONParseError extends SyntaxError {
  constructor (er, txt, context, caller) {
    const metadata = parseError(er, txt, context);
    super(metadata.message);
    Object.assign(this, metadata);
    this.code = 'EJSONPARSE';
    this.systemError = er;
    Error.captureStackTrace(this, caller || this.constructor);
  }

  get name () {
    return this.constructor.name
  }

  set name (n) {}

  get [Symbol.toStringTag] () {
    return this.constructor.name
  }
}

const parseJson = (txt, reviver) => {
  const result = JSON.parse(txt, reviver);
  if (result && typeof result === 'object') {
    // get the indentation so that we can save it back nicely
    // if the file starts with {" then we have an indent of '', ie, none
    // otherwise, pick the indentation of the next line after the first \n If the
    // pattern doesn't match, then it means no indentation. JSON.stringify ignores
    // symbols, so this is reasonably safe. if the string is '{}' or '[]', then
    // use the default 2-space indent.
    const match = txt.match(EMPTY) || txt.match(FORMAT) || [null, '', ''];
    result[NEWLINE] = match[1] ?? DEFAULT_NEWLINE;
    result[INDENT] = match[2] ?? DEFAULT_INDENT;
  }
  return result
};

const parseJsonError = (raw, reviver, context) => {
  const txt = stripBOM(raw);
  try {
    return parseJson(txt, reviver)
  } catch (e) {
    if (typeof raw !== 'string' && !Buffer.isBuffer(raw)) {
      const msg = Array.isArray(raw) && raw.length === 0 ? 'an empty array' : String(raw);
      throw Object.assign(
        new TypeError(`Cannot parse ${msg}`),
        { code: 'EJSONPARSE', systemError: e }
      )
    }
    throw new JSONParseError(e, txt, context, parseJsonError)
  }
};

var lib = parseJsonError;
parseJsonError.JSONParseError = JSONParseError;
parseJsonError.noExceptions = (raw, reviver) => {
  try {
    return parseJson(stripBOM(raw), reviver)
  } catch {
    // no exceptions
  }
};

var parseJson$1 = /*@__PURE__*/getDefaultExportFromCjs(lib);

const _hoisted_1$c = ["data-bs-target"];
const _hoisted_2$5 = ["id"];
const _hoisted_3$4 = { class: "modal-dialog" };
const _hoisted_4$3 = { class: "modal-content p-4" };
const _hoisted_5$3 = { class: "modal-header" };
const _hoisted_6$3 = { class: "modal-title fs-5" };
const _hoisted_7$2 = { class: "modal-body" };
const _hoisted_8$2 = { key: 0 };
const _hoisted_9$1 = { key: 2 };
const _hoisted_10$1 = { class: "text-danger" };


var script$f = /*@__PURE__*/Object.assign({
  inheritAttrs: false,
}, {
  __name: 'BsModal',
  props: {
    "modelValue": {
  type: [String, Object, Array],
  default: '',
},
    "modelModifiers": {},
    "button": {
  type: String,
  default: 'Open Modal',
},
    "buttonModifiers": {},
    "title": {
  type: String,
  default: 'Modal',
},
    "titleModifiers": {},
    "json": {
  type: Boolean,
  default: false,
},
    "jsonModifiers": {},
    "mqtt": {
  type: Boolean,
  default: false,
},
    "mqttModifiers": {},
  },
  emits: ["update:modelValue", "update:button", "update:title", "update:json", "update:mqtt"],
  setup(__props) {

const jsonError = vue.ref('');

/**
 * Purpose: Show a button that activates a modal with close button, title and content. Support json pretty.
 */


/**
 * Ref to fetch data from (required).
 */
const model = vue.useModel(__props, "modelValue");

/**
 * Text on button that activates the modal (required).
 */
const button = vue.useModel(__props, 'button');

/**
 * Modal title (required).
 */
const title = vue.useModel(__props, 'title');

/**
 * If json errors should be detected (optional).
 */
const json = vue.useModel(__props, 'json');

/**
 * Force mqtt format (optional).
 */
const mqtt = vue.useModel(__props, 'mqtt');

const format = s => {
  if (mqtt.value) return s;

  if (isValidJson(model.value)) return JSON.stringify(JSON.parse(s), null, 2);
  if (isValidFormData(model.value)) return s.replaceAll('&', '&\n\r');
  return s;
};

const checkCode = () => {
  jsonError.value = '';

  if (mqtt.value) {
    if (json.value) {
      const input = model.value;
      const arr = input.replaceAll('\n', '').split('|');

      arr.forEach(value => {
        const data = value.substring(value.indexOf(':') + 1);

        if (data.indexOf('{') >= 0 && data.indexOf('}') > 0) {
          try {
            // Will show additional json parse errors if enabled
            JSON.parse(data);
          } catch (e) {
            jsonError.value = e.message;
          }
        }
      });
    }

    return true;
  }

  if (isValidFormData(model.value)) return true;

  if (isValidJson(model.value)) {
    return true;
  } else if (json.value) {
    try {
      // Will show additional json parse errors if enabled
      parseJson$1(model.value);
    } catch (e) {
      jsonError.value = e.message;
    }
  }

  return false;
};

return (_ctx, _cache) => {
  return (vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
    vue.createElementVNode("button", vue.mergeProps(_ctx.$attrs, {
      type: "button",
      class: "btn btn-secondary",
      "data-bs-toggle": "modal",
      "data-bs-target": '#modal' + _ctx.$.uid
    }), vue.toDisplayString(button.value), 17 /* TEXT, FULL_PROPS */, _hoisted_1$c),
    vue.createElementVNode("div", {
      id: 'modal' + _ctx.$.uid,
      class: "modal fade modal-lg",
      tabindex: "-1",
      "aria-hidden": "true"
    }, [
      vue.createElementVNode("div", _hoisted_3$4, [
        vue.createElementVNode("div", _hoisted_4$3, [
          vue.createElementVNode("div", _hoisted_5$3, [
            vue.createElementVNode("h1", _hoisted_6$3, vue.toDisplayString(title.value), 1 /* TEXT */),
            _cache[0] || (_cache[0] = vue.createElementVNode("button", {
              type: "button",
              class: "btn-close",
              "data-bs-dismiss": "modal",
              "aria-label": "Close"
            }, null, -1 /* CACHED */))
          ]),
          vue.createElementVNode("div", _hoisted_7$2, [
            (checkCode())
              ? (vue.openBlock(), vue.createElementBlock("pre", _hoisted_8$2, vue.toDisplayString(format(model.value)), 1 /* TEXT */))
              : (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 1 }, [
                  vue.createTextVNode(vue.toDisplayString(model.value), 1 /* TEXT */)
                ], 64 /* STABLE_FRAGMENT */)),
            (jsonError.value != '')
              ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_9$1, [
                  _cache[1] || (_cache[1] = vue.createElementVNode("hr", null, null, -1 /* CACHED */)),
                  vue.createElementVNode("p", _hoisted_10$1, vue.toDisplayString(jsonError.value), 1 /* TEXT */)
                ]))
              : vue.createCommentVNode("v-if", true)
          ]),
          _cache[2] || (_cache[2] = vue.createElementVNode("div", { class: "modal-footer" }, [
            vue.createElementVNode("button", {
              type: "button",
              class: "btn btn-secondary",
              "data-bs-dismiss": "modal"
            }, "Close")
          ], -1 /* CACHED */))
        ])
      ])
    ], 8 /* PROPS */, _hoisted_2$5)
  ], 64 /* STABLE_FRAGMENT */))
}
}

});

script$f.__file = "src/components/BsModal.vue";

const _hoisted_1$b = ["id", "data-bs-target"];
const _hoisted_2$4 = ["id"];
const _hoisted_3$3 = { class: "modal-dialog" };
const _hoisted_4$2 = { class: "modal-content p-4" };
const _hoisted_5$2 = { class: "modal-header" };
const _hoisted_6$2 = { class: "modal-title fs-5" };
const _hoisted_7$1 = { class: "modal-body" };
const _hoisted_8$1 = { class: "modal-footer" };


var script$e = /*@__PURE__*/Object.assign({
  inheritAttrs: false,
}, {
  __name: 'BsModalConfirm',
  props: {
    "callback": {
  type: Function,
  default: undefined,
  validator: value => {
    return value === undefined || typeof value === 'function';
  },
},
    "callbackModifiers": {},
    "message": {
  type: String,
  default: 'Are you sure?',
  validator: value => {
    return typeof value === 'string' && value.trim().length > 0;
  },
},
    "messageModifiers": {},
    "id": {
  type: String,
  default: 'confirm-modal',
  validator: value => {
    return typeof value === 'string' && /^[a-zA-Z][a-zA-Z0-9-_]*$/.test(value);
  },
},
    "idModifiers": {},
    "title": {
  type: String,
  default: 'Confirm Action',
  validator: value => {
    return typeof value === 'string' && value.trim().length > 0;
  },
},
    "titleModifiers": {},
    "hidden": {
  type: Boolean,
  default: true,
},
    "hiddenModifiers": {},
  },
  emits: ["update:callback", "update:message", "update:id", "update:title", "update:hidden"],
  setup(__props) {

/**
 * Purpose: Show a yes/no dialog to confirm an action
 */


/**
 * Ref to callback where true/false will be a parameter (required).
 */
const callback = vue.useModel(__props, 'callback');

/**
 * Ref to dialog message (required).
 */
const message = vue.useModel(__props, 'message');

/**
 * Ref to dialog id (required).
 */
const id = vue.useModel(__props, 'id');

/**
 * Modal title (required).
 */
const title = vue.useModel(__props, 'title');

/**
 * Whether the button should be hidden (optional).
 */
const hidden = vue.useModel(__props, 'hidden');

return (_ctx, _cache) => {
  return (vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
    vue.createElementVNode("button", vue.mergeProps({
      id: id.value,
      type: "button",
      class: "btn btn-secondary",
      style: { display: hidden.value ? 'none' : 'inline-block' },
      "data-bs-toggle": "modal",
      "data-bs-target": '#modal' + _ctx.$.uid
    }, _ctx.$attrs), " This should hidden ", 16 /* FULL_PROPS */, _hoisted_1$b),
    vue.createElementVNode("div", {
      id: 'modal' + _ctx.$.uid,
      class: "modal fade modal-lg",
      tabindex: "-1",
      "aria-hidden": "true"
    }, [
      vue.createElementVNode("div", _hoisted_3$3, [
        vue.createElementVNode("div", _hoisted_4$2, [
          vue.createElementVNode("div", _hoisted_5$2, [
            vue.createElementVNode("h1", _hoisted_6$2, vue.toDisplayString(title.value), 1 /* TEXT */)
          ]),
          vue.createElementVNode("div", _hoisted_7$1, vue.toDisplayString(message.value), 1 /* TEXT */),
          vue.createElementVNode("div", _hoisted_8$1, [
            vue.createElementVNode("button", {
              type: "button",
              class: "btn btn-primary",
              "data-bs-dismiss": "modal",
              onClick: _cache[0] || (_cache[0] = $event => (callback.value(true)))
            }, " Confirm "),
            vue.createElementVNode("button", {
              type: "button",
              class: "btn btn-secondary",
              "data-bs-dismiss": "modal",
              onClick: _cache[1] || (_cache[1] = $event => (callback.value(false)))
            }, " Cancel ")
          ])
        ])
      ])
    ], 8 /* PROPS */, _hoisted_2$4)
  ], 64 /* STABLE_FRAGMENT */))
}
}

});

script$e.__file = "src/components/BsModalConfirm.vue";

const _hoisted_1$a = ["id"];
const _hoisted_2$3 = {
  id: "modalLogin",
  class: "modal fade modal-lg",
  tabindex: "-1",
  "aria-hidden": "true"
};
const _hoisted_3$2 = { class: "modal-dialog" };
const _hoisted_4$1 = { class: "modal-content p-4" };
const _hoisted_5$1 = { class: "modal-body" };
const _hoisted_6$1 = { class: "modal-footer" };


var script$d = /*@__PURE__*/Object.assign({
  inheritAttrs: false,
}, {
  __name: 'BsModalLogin',
  props: {
  callback: { type: Function, required: true },
  id: { type: String, required: true },
},
  setup(__props) {

const password = vue.ref('');

/**
 * Purpose: Show a yes/no dialog to confirm an action
 */


/**
 * Props for callback and id
 */


vue.onMounted(() => {
  logDebug('BsModalLogin.onMounted()', 'Modal initialized for ID: ' + __props.id);
  document.getElementById(__props.id).click();
});

return (_ctx, _cache) => {
  return (vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
    vue.createElementVNode("button", {
      id: __props.id,
      type: "button",
      class: "btn btn-secondary",
      hidden: "",
      "data-bs-toggle": "modal",
      "data-bs-target": "#modalLogin"
    }, " Testing ", 8 /* PROPS */, _hoisted_1$a),
    vue.createCommentVNode("\n  "),
    vue.createElementVNode("div", _hoisted_2$3, [
      vue.createElementVNode("div", _hoisted_3$2, [
        vue.createElementVNode("div", _hoisted_4$1, [
          _cache[2] || (_cache[2] = vue.createElementVNode("div", { class: "modal-header" }, [
            vue.createElementVNode("h1", { class: "modal-title fs-5" }, "Enter your admin password")
          ], -1 /* CACHED */)),
          vue.createElementVNode("div", _hoisted_5$1, [
            vue.withDirectives(vue.createElementVNode("input", {
              "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((password).value = $event)),
              type: "password",
              class: "form-control"
            }, null, 512 /* NEED_PATCH */), [
              [vue.vModelText, password.value]
            ])
          ]),
          vue.createElementVNode("div", _hoisted_6$1, [
            vue.createElementVNode("button", {
              type: "button",
              class: "btn btn-primary",
              "data-bs-dismiss": "modal",
              onClick: _cache[1] || (_cache[1] = $event => (__props.callback(password.value)))
            }, " Confirm ")
          ])
        ])
      ])
    ])
  ], 64 /* STABLE_FRAGMENT */))
}
}

});

script$d.__file = "src/components/BsModalLogin.vue";

/**
 * Purpose: Show a progress bar
 */

var script$c = /*@__PURE__*/Object.assign({
  inheritAttrs: false,
}, {
  __name: 'BsProgress',
  props: {
    "progress": {
  type: [Number, String],
  default: 0,
  validator: value => {
    const num = Number(value);
    return !isNaN(num) && num >= 0 && num <= 100;
  },
},
    "progressModifiers": {},
  },
  emits: ["update:progress"],
  setup(__props) {

/**
 * 2024-05-28 Bootstrap VueJS wrapper, Magnus Persson
 */



/**
 * Ref that contains the value of the progress bar (0-100) (required).
 */
const progress = vue.useModel(__props, 'progress');

const progressStyle = vue.computed(() => {
  return 'width: ' + progress.value + '%';
});

return (_ctx, _cache) => {
  return (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
    class: "progress",
    style: {"height":"20px"}
  }, _ctx.$attrs), [
    vue.createElementVNode("div", {
      class: "progress-bar",
      role: "progressbar",
      style: vue.normalizeStyle(progressStyle.value)
    }, null, 4 /* STYLE */)
  ], 16 /* FULL_PROPS */))
}
}

});

script$c.__file = "src/components/BsProgress.vue";

const _hoisted_1$9 = {
  class: "btn-group",
  role: "group"
};
const _hoisted_2$2 = ["disabled"];


var script$b = /*@__PURE__*/Object.assign({
  inheritAttrs: false,
}, {
  __name: 'BsFileUpload',
  props: {
    "label": {
  type: String,
  default: undefined,
},
    "labelModifiers": {},
    "help": {
  type: String,
  default: undefined,
},
    "helpModifiers": {},
    "width": {
  type: [String, Number],
  default: undefined,
  validator: value => {
    if (value === undefined || value === null || value === '') return true;
    if (typeof value === 'number') return value > 0 && value <= 12;
    if (typeof value === 'string')
      return /^(\d|1[0-2])$|^(sm|md|lg|xl|xxl)-(\d|1[0-2])$/.test(value);
    return false;
  },
},
    "widthModifiers": {},
    "disabled": {
  type: Boolean,
  default: false,
},
    "disabledModifiers": {},
    "badge": {
  type: Number,
  default: 0,
},
    "badgeModifiers": {},
  },
  emits: ["update:label", "update:help", "update:width", "update:disabled", "update:badge"],
  setup(__props) {

/**
 * 2024-05-28 Bootstrap VueJS wrapper, Magnus Persson
 */

/**
 * Purpose: How a file upload component that allows the user to select a file. s
 */


/**
 * This text is shown above the form component (optional).
 */
const label = vue.useModel(__props, 'label');

/**
 * Help text is shown below the field to provide user help with input (optional).
 */
const help = vue.useModel(__props, 'help');

/**
 * Specify the width to force a specific size (optional).
 */
const width = vue.useModel(__props, 'width');

/**
 * Ref that steers if this component is enabled or not (required).
 */
const disabled = vue.useModel(__props, 'disabled');

/**
 * Specify the number to show in the badge to guide the user (optional).
 */
const badge = vue.useModel(__props, 'badge');

return (_ctx, _cache) => {
  const _component_BsInputBase = vue.resolveComponent("BsInputBase");

  return (vue.openBlock(), vue.createBlock(_component_BsInputBase, {
    width: width.value,
    label: label.value,
    help: help.value,
    badge: badge.value
  }, {
    default: vue.withCtx(() => [
      vue.createElementVNode("div", _hoisted_1$9, [
        vue.createElementVNode("input", vue.mergeProps({
          class: "form-control",
          type: "file"
        }, _ctx.$attrs, { disabled: disabled.value }), null, 16 /* FULL_PROPS */, _hoisted_2$2)
      ])
    ]),
    _: 1 /* STABLE */
  }, 8 /* PROPS */, ["width", "label", "help", "badge"]))
}
}

});

script$b.__file = "src/components/BsFileUpload.vue";

const _hoisted_1$8 = { class: "container-fluid align-center" };
const _hoisted_2$1 = { class: "navbar-brand" };
const _hoisted_3$1 = {
  id: "navbar",
  class: "collapse navbar-collapse"
};
const _hoisted_4 = { class: "navbar-nav" };
const _hoisted_5 = {
  key: 0,
  class: "nav-item"
};
const _hoisted_6 = {
  key: 1,
  class: "nav-item dropdown"
};
const _hoisted_7 = ["id", "disabled"];
const _hoisted_8 = {
  key: 1,
  class: "badge text-bg-danger rounded-circle"
};
const _hoisted_9 = ["aria-labelledby"];
const _hoisted_10 = {
  key: 0,
  class: "badge text-bg-danger rounded-circle"
};
const _hoisted_11 = { class: "text-white" };
const _hoisted_12 = { key: 0 };
const _hoisted_13 = {
  key: 1,
  class: "vr d-none d-lg-flex h-200 mx-lg-2 text-white"
};
const _hoisted_14 = { class: "p-2" };
const _hoisted_15 = {
  class: "spinner-border gx-4",
  role: "status",
  style: {"color":"white"}
};
const _hoisted_16 = { class: "p-2" };
const _hoisted_17 = { class: "form-check form-switch" };
const _hoisted_18 = ["checked", "disabled"];


var script$a = /*@__PURE__*/Object.assign({
  inheritAttrs: false,
}, {
  __name: 'BsMenuBar',
  props: {
  /**
   * Brand name to display (required)
   */
  brand: {
    type: String,
    default: 'Brand',
  },
  /**
   * Whether the menu is disabled (optional)
   */
  disabled: {
    type: Boolean,
    default: false,
  },
  /**
   * Array of menu items to display (required)
   */
  menuItems: {
    type: Array,
    default: () => [],
  },
  /**
   * Current dark mode state (required)
   */
  darkMode: {
    type: Boolean,
    default: false,
  },
  /**
   * MDNS name to display (optional)
   */
  mdns: {
    type: String,
    default: '',
  },
  /**
   * Whether config has changed and needs saving (optional)
   */
  configChanged: {
    type: Boolean,
    default: false,
  },
  /**
   * Current route path for active menu highlighting (optional)
   */
  currentRoute: {
    type: String,
    default: '',
  },
},
  emits: ['update:darkMode'],
  setup(__props, { emit: __emit }) {

/**
 * 2024-05-28 Bootstrap VueJS wrapper, Magnus Persson
 *
 * Purpose: Provide a menu with dropdown options and dark mode toggle.
 * Now uses props-based approach - no Pinia dependency!
 */


// Props
const props = __props;

// Events
const emit = __emit;

// Handle dark mode toggle
const handleDarkModeToggle = event => {
  emit('update:darkMode', event.target.checked);
};

// Handle menu click to manage dropdowns
const menuClicked = () => {
  // Optional: emit event for parent to handle if needed
};

// Handle submenu click to close dropdowns (fixes Bootstrap/Vue conflict)
const subMenuClicked = () => {
  // Added to fix the issue with dropdown-menu shown after select due to conflict with VueJS and BootstrapJS
  const dnList = document.getElementsByClassName('dropdown-menu show');
  for (var i = 0; i < dnList.length; i++) {
    dnList[i].classList.remove('show');
  }
};

return (_ctx, _cache) => {
  const _component_router_link = vue.resolveComponent("router-link");

  return (vue.openBlock(), vue.createElementBlock("nav", vue.mergeProps({ class: "navbar navbar-expand-lg navbar-dark bg-primary" }, _ctx.$attrs), [
    vue.createElementVNode("div", _hoisted_1$8, [
      _cache[3] || (_cache[3] = vue.createElementVNode("button", {
        class: "navbar-toggler",
        type: "button",
        "data-bs-toggle": "collapse",
        "data-bs-target": "#navbar",
        "aria-controls": "navbarNav",
        "aria-expanded": "false",
        "aria-label": "Toggle navigation"
      }, [
        vue.createElementVNode("span", { class: "navbar-toggler-icon" })
      ], -1 /* CACHED */)),
      vue.createElementVNode("div", _hoisted_2$1, vue.toDisplayString(props.brand), 1 /* TEXT */),
      _cache[4] || (_cache[4] = vue.createElementVNode("div", { class: "vr d-none d-lg-flex h-200 mx-lg-2 text-white" }, null, -1 /* CACHED */)),
      vue.createElementVNode("div", _hoisted_3$1, [
        vue.createElementVNode("ul", _hoisted_4, [
          (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(props.menuItems, (item, index) => {
            return (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: index }, [
              (!item.subs || !item.subs.length)
                ? (vue.openBlock(), vue.createElementBlock("li", _hoisted_5, [
                    vue.createVNode(_component_router_link, {
                      class: vue.normalizeClass([
                  'nav-link',
                  props.currentRoute && props.currentRoute.split('/')[1] === item.path.split('/')[1]
                    ? ' active fw-bold'
                    : '',
                ]),
                      to: item.path,
                      disabled: props.disabled
                    }, {
                      default: vue.withCtx(() => [
                        (item.icon !== undefined)
                          ? (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(item.icon), {
                              key: 0,
                              width: "1rem",
                              height: "1rem",
                              style: {"color":"white"}
                            }))
                          : vue.createCommentVNode("v-if", true),
                        vue.createTextVNode(" " + vue.toDisplayString(item.label), 1 /* TEXT */)
                      ]),
                      _: 2 /* DYNAMIC */
                    }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["class", "to", "disabled"])
                  ]))
                : (vue.openBlock(), vue.createElementBlock("li", _hoisted_6, [
                    vue.createElementVNode("a", {
                      id: 'navbarDropdown' + item.label,
                      class: vue.normalizeClass([
                  'nav-link',
                  'dropdown-toggle',
                  props.currentRoute && props.currentRoute.split('/')[1] === item.path.split('/')[1]
                    ? ' active fw-bold'
                    : '',
                ]),
                      role: "button",
                      "data-bs-toggle": "dropdown",
                      "aria-expanded": "false",
                      "data-bs-auto-close": "true",
                      disabled: props.disabled,
                      onClick: menuClicked
                    }, [
                      (item.icon !== undefined)
                        ? (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(item.icon), {
                            key: 0,
                            width: "1rem",
                            height: "1rem",
                            style: {"color":"white"}
                          }))
                        : vue.createCommentVNode("v-if", true),
                      vue.createTextVNode(" " + vue.toDisplayString(item.label) + " ", 1 /* TEXT */),
                      (
                    item.badge !== undefined &&
                    (typeof item.badge === 'function' ? item.badge() : item.badge) > 0
                  )
                        ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_8, vue.toDisplayString(typeof item.badge === 'function' ? item.badge() : item.badge), 1 /* TEXT */))
                        : vue.createCommentVNode("v-if", true)
                    ], 10 /* CLASS, PROPS */, _hoisted_7),
                    vue.createElementVNode("ul", {
                      class: "dropdown-menu",
                      "aria-labelledby": 'navbarDropdown' + item.label
                    }, [
                      (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(item.subs, (dn) => {
                        return (vue.openBlock(), vue.createElementBlock("li", {
                          key: dn.path
                        }, [
                          vue.createVNode(_component_router_link, {
                            class: "dropdown-item",
                            to: dn.path,
                            disabled: props.disabled,
                            onClick: subMenuClicked
                          }, {
                            default: vue.withCtx(() => [
                              vue.createTextVNode(vue.toDisplayString(dn.label) + " ", 1 /* TEXT */),
                              (
                        dn.badge !== undefined &&
                        (typeof dn.badge === 'function' ? dn.badge() : dn.badge) > 0
                      )
                                ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_10, vue.toDisplayString(typeof dn.badge === 'function' ? dn.badge() : dn.badge), 1 /* TEXT */))
                                : vue.createCommentVNode("v-if", true)
                            ]),
                            _: 2 /* DYNAMIC */
                          }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["to", "disabled"])
                        ]))
                      }), 128 /* KEYED_FRAGMENT */))
                    ], 8 /* PROPS */, _hoisted_9)
                  ]))
            ], 64 /* STABLE_FRAGMENT */))
          }), 128 /* KEYED_FRAGMENT */))
        ])
      ]),
      _cache[5] || (_cache[5] = vue.createElementVNode("div", { class: "vr d-none d-lg-flex h-200 mx-lg-2 text-white" }, null, -1 /* CACHED */)),
      vue.createElementVNode("div", _hoisted_11, vue.toDisplayString(props.mdns), 1 /* TEXT */),
      _cache[6] || (_cache[6] = vue.createElementVNode("div", { class: "vr d-none d-lg-flex h-200 mx-lg-2 text-white" }, null, -1 /* CACHED */)),
      (props.configChanged)
        ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_12, [...(_cache[0] || (_cache[0] = [
            vue.createElementVNode("span", { class: "badge bg-danger fs-6" }, "Save needed  ", -1 /* CACHED */)
          ]))]))
        : vue.createCommentVNode("v-if", true),
      (props.configChanged)
        ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_13))
        : vue.createCommentVNode("v-if", true),
      vue.createElementVNode("div", _hoisted_14, [
        vue.withDirectives(vue.createElementVNode("div", _hoisted_15, [...(_cache[1] || (_cache[1] = [
          vue.createElementVNode("span", { class: "visually-hidden" }, "Loading...", -1 /* CACHED */)
        ]))], 512 /* NEED_PATCH */), [
          [vue.vShow, props.disabled]
        ])
      ]),
      vue.createElementVNode("div", _hoisted_16, [
        vue.createElementVNode("div", _hoisted_17, [
          _cache[2] || (_cache[2] = vue.createTextVNode("  ", -1 /* CACHED */)),
          vue.createElementVNode("input", {
            checked: props.darkMode,
            class: "form-check-input",
            type: "checkbox",
            role: "switch",
            style: {"border-color":"white","transform":"scale(1.5)","transform-origin":"left center","display":"inline-block"},
            disabled: props.disabled,
            onChange: handleDarkModeToggle
          }, null, 40 /* PROPS, NEED_HYDRATION */, _hoisted_18)
        ])
      ])
    ])
  ], 16 /* FULL_PROPS */))
}
}

});

script$a.__file = "src/components/BsMenuBar.vue";

const _hoisted_1$7 = {
  class: "text-light text-center rounded-pill bg-primary",
  style: {"height":"30px"}
};


var script$9 = /*@__PURE__*/Object.assign({
  inheritAttrs: false,
}, {
  __name: 'BsFooter',
  props: {
    "text": {
  type: String,
  default: 'Footer Text',
},
    "textModifiers": {},
  },
  emits: ["update:text"],
  setup(__props) {

/**
 * 2024-05-28 Bootstrap VueJS wrapper, Magnus Persson
 */

/**
 * Purpose: Provide a generic footer
 */


/**
 * Text to show in the footer (required).
 */
const text = vue.useModel(__props, 'text');

return (_ctx, _cache) => {
  return (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({ class: "container-fluid" }, _ctx.$attrs), [
    _cache[0] || (_cache[0] = vue.createElementVNode("div", { style: {"height":"20px"} }, null, -1 /* CACHED */)),
    vue.createElementVNode("div", _hoisted_1$7, vue.toDisplayString(text.value), 1 /* TEXT */)
  ], 16 /* FULL_PROPS */))
}
}

});

script$9.__file = "src/components/BsFooter.vue";

const _hoisted_1$6 = {
  key: 0,
  class: "form-label fw-bold"
};
const _hoisted_2 = {
  key: 1,
  class: "badge text-bg-danger rounded-circle"
};
const _hoisted_3 = { class: "form-text" };


var script$8 = /*@__PURE__*/Object.assign({
  inheritAttrs: false,
}, {
  __name: 'BsInputBase',
  props: {
    "label": {
  type: String,
  default: undefined,
},
    "labelModifiers": {},
    "help": {
  type: String,
  default: undefined,
},
    "helpModifiers": {},
    "width": {
  type: [String, Number],
  default: undefined,
  validator: value => {
    if (value === undefined || value === null || value === '') return true;
    if (typeof value === 'number') return value > 0 && value <= 12;
    if (typeof value === 'string')
      return /^(\d|1[0-2])$|^(sm|md|lg|xl|xxl)-(\d|1[0-2])$/.test(value);
    return false;
  },
},
    "widthModifiers": {},
    "badge": {
  type: Number,
  default: 0,
},
    "badgeModifiers": {},
  },
  emits: ["update:label", "update:help", "update:width", "update:badge"],
  setup(__props) {

/**
 * 2024-05-28 Bootstrap VueJS wrapper, Magnus Persson
 */

/**
 * Purpose: Basic layout of a form component with label on top and help text below.
 *
 * Note! Should not be used directly, this is a base class for form components.
 */

/**
 * This text is shown above the form component (optional).
 */
const label = vue.useModel(__props, 'label');

/**
 * Help text is shown below the field to provide user help with input (optional).
 */
const help = vue.useModel(__props, 'help');

/**
 * Specify the width to force a specific size (optional).
 */
const width = vue.useModel(__props, 'width');

/**
 * Specify the number to show in the badge to guide the user (optional).
 */
const badge = vue.useModel(__props, 'badge');

return (_ctx, _cache) => {
  return (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({ class: "has-validation pt-2" }, _ctx.$attrs), [
    (label.value !== undefined)
      ? (vue.openBlock(), vue.createElementBlock("label", _hoisted_1$6, vue.toDisplayString(label.value), 1 /* TEXT */))
      : vue.createCommentVNode("v-if", true),
    _cache[0] || (_cache[0] = vue.createTextVNode("  ", -1 /* CACHED */)),
    (badge.value)
      ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_2, vue.toDisplayString(badge.value), 1 /* TEXT */))
      : vue.createCommentVNode("v-if", true),
    vue.createElementVNode("div", {
      class: vue.normalizeClass([width.value === undefined ? '' : 'col-' + width.value])
    }, [
      vue.createCommentVNode(" @slot this is where the main component is located "),
      vue.renderSlot(_ctx.$slots, "default")
    ], 2 /* CLASS */),
    vue.createElementVNode("div", _hoisted_3, vue.toDisplayString(help.value), 1 /* TEXT */)
  ], 16 /* FULL_PROPS */))
}
}

});

script$8.__file = "src/components/BsInputBase.vue";

const _hoisted_1$5 = ["width", "height"];


var script$7 = /*@__PURE__*/Object.assign({
  inheritAttrs: false,
}, {
  __name: 'IconHome',
  props: {
    "width": {
  type: [String, Number],
  default: 16,
  validator: value => {
    // Accept CSS units like "1rem", "16px", etc. or numeric values
    if (typeof value === 'string') {
      return /^(\d+(\.\d+)?)(px|rem|em|%|vh|vw|pt|pc|in|cm|mm|ex|ch|lh)?$/.test(value.trim());
    }
    const num = Number(value);
    return !isNaN(num) && num > 0;
  },
},
    "widthModifiers": {},
    "height": {
  type: [String, Number],
  default: 16,
  validator: value => {
    // Accept CSS units like "1rem", "16px", etc. or numeric values
    if (typeof value === 'string') {
      return /^(\d+(\.\d+)?)(px|rem|em|%|vh|vw|pt|pc|in|cm|mm|ex|ch|lh)?$/.test(value.trim());
    }
    const num = Number(value);
    return !isNaN(num) && num > 0;
  },
},
    "heightModifiers": {},
  },
  emits: ["update:width", "update:height"],
  setup(__props) {

/**
 * 2024-05-28 Bootstrap VueJS wrapper, Magnus Persson
 */

/**
 * Purpose: Show an svg icon on the UI. Used embedded svg to avoid downloading data from internet.
 */


/**
 * Width of the icon (optional).
 */
const width = vue.useModel(__props, 'width');

/**
 * Height of the icon (optional).
 */
const height = vue.useModel(__props, 'height');

return (_ctx, _cache) => {
  return (vue.openBlock(), vue.createElementBlock("svg", vue.mergeProps(_ctx.$attrs, {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 16 16",
    fill: "currentColor",
    width: width.value,
    height: height.value
  }), [...(_cache[0] || (_cache[0] = [
    vue.createElementVNode("path", { d: "M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z" }, null, -1 /* CACHED */)
  ]))], 16 /* FULL_PROPS */, _hoisted_1$5))
}
}

});

script$7.__file = "src/components/IconHome.vue";

const _hoisted_1$4 = ["width", "height"];


var script$6 = /*@__PURE__*/Object.assign({
  inheritAttrs: false,
}, {
  __name: 'IconTools',
  props: {
    "width": {
  type: [String, Number],
  default: 16,
  validator: value => {
    // Accept CSS units like "1rem", "16px", etc. or numeric values
    if (typeof value === 'string') {
      return /^(\d+(\.\d+)?)(px|rem|em|%|vh|vw|pt|pc|in|cm|mm|ex|ch|lh)?$/.test(value.trim());
    }
    const num = Number(value);
    return !isNaN(num) && num > 0;
  },
},
    "widthModifiers": {},
    "height": {
  type: [String, Number],
  default: 16,
  validator: value => {
    // Accept CSS units like "1rem", "16px", etc. or numeric values
    if (typeof value === 'string') {
      return /^(\d+(\.\d+)?)(px|rem|em|%|vh|vw|pt|pc|in|cm|mm|ex|ch|lh)?$/.test(value.trim());
    }
    const num = Number(value);
    return !isNaN(num) && num > 0;
  },
},
    "heightModifiers": {},
  },
  emits: ["update:width", "update:height"],
  setup(__props) {

/**
 * 2024-05-28 Bootstrap VueJS wrapper, Magnus Persson
 */

/**
 * Purpose: Show an svg icon on the UI. Used embedded svg to avoid downloading data from internet.
 */


/**
 * Width of the icon (optional).
 */
const width = vue.useModel(__props, 'width');

/**
 * Height of the icon (optional).
 */
const height = vue.useModel(__props, 'height');

return (_ctx, _cache) => {
  return (vue.openBlock(), vue.createElementBlock("svg", vue.mergeProps(_ctx.$attrs, {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 16 16",
    fill: "currentColor",
    width: width.value,
    height: height.value
  }), [...(_cache[0] || (_cache[0] = [
    vue.createElementVNode("path", { d: "M1 0 0 1l2.2 3.081a1 1 0 0 0 .815.419h.07a1 1 0 0 1 .708.293l2.675 2.675-2.617 2.654A3.003 3.003 0 0 0 0 13a3 3 0 1 0 5.878-.851l2.654-2.617.968.968-.305.914a1 1 0 0 0 .242 1.023l3.27 3.27a.997.997 0 0 0 1.414 0l1.586-1.586a.997.997 0 0 0 0-1.414l-3.27-3.27a1 1 0 0 0-1.023-.242L10.5 9.5l-.96-.96 2.68-2.643A3.005 3.005 0 0 0 16 3q0-.405-.102-.777l-2.14 2.141L12 4l-.364-1.757L13.777.102a3 3 0 0 0-3.675 3.68L7.462 6.46 4.793 3.793a1 1 0 0 1-.293-.707v-.071a1 1 0 0 0-.419-.814zm9.646 10.646a.5.5 0 0 1 .708 0l2.914 2.915a.5.5 0 0 1-.707.707l-2.915-2.914a.5.5 0 0 1 0-.708M3 11l.471.242.529.026.287.445.445.287.026.529L5 13l-.242.471-.026.529-.445.287-.287.445-.529.026L3 15l-.471-.242L2 14.732l-.287-.445L1.268 14l-.026-.529L1 13l.242-.471.026-.529.445-.287.287-.445.529-.026z" }, null, -1 /* CACHED */)
  ]))], 16 /* FULL_PROPS */, _hoisted_1$4))
}
}

});

script$6.__file = "src/components/IconTools.vue";

const _hoisted_1$3 = ["width", "height"];


var script$5 = /*@__PURE__*/Object.assign({
  inheritAttrs: false,
}, {
  __name: 'IconCpu',
  props: {
    "width": {
  type: [String, Number],
  default: 16,
  validator: value => {
    // Accept CSS units like "1rem", "16px", etc. or numeric values
    if (typeof value === 'string') {
      return /^(\d+(\.\d+)?)(px|rem|em|%|vh|vw|pt|pc|in|cm|mm|ex|ch|lh)?$/.test(value.trim());
    }
    const num = Number(value);
    return !isNaN(num) && num > 0;
  },
},
    "widthModifiers": {},
    "height": {
  type: [String, Number],
  default: 16,
  validator: value => {
    // Accept CSS units like "1rem", "16px", etc. or numeric values
    if (typeof value === 'string') {
      return /^(\d+(\.\d+)?)(px|rem|em|%|vh|vw|pt|pc|in|cm|mm|ex|ch|lh)?$/.test(value.trim());
    }
    const num = Number(value);
    return !isNaN(num) && num > 0;
  },
},
    "heightModifiers": {},
  },
  emits: ["update:width", "update:height"],
  setup(__props) {

/**
 * 2024-05-28 Bootstrap VueJS wrapper, Magnus Persson
 */

/**
 * Purpose: Show an svg icon on the UI. Used embedded svg to avoid downloading data from internet.
 */


/**
 * Width of the icon (optional).
 */
const width = vue.useModel(__props, 'width');

/**
 * Height of the icon (optional).
 */
const height = vue.useModel(__props, 'height');

return (_ctx, _cache) => {
  return (vue.openBlock(), vue.createElementBlock("svg", vue.mergeProps(_ctx.$attrs, {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 16 16",
    fill: "currentColor",
    width: width.value,
    height: height.value
  }), [...(_cache[0] || (_cache[0] = [
    vue.createElementVNode("path", { d: "M5 0a.5.5 0 0 1 .5.5V2h1V.5a.5.5 0 0 1 1 0V2h1V.5a.5.5 0 0 1 1 0V2h1V.5a.5.5 0 0 1 1 0V2A2.5 2.5 0 0 1 14 4.5h1.5a.5.5 0 0 1 0 1H14v1h1.5a.5.5 0 0 1 0 1H14v1h1.5a.5.5 0 0 1 0 1H14v1h1.5a.5.5 0 0 1 0 1H14a2.5 2.5 0 0 1-2.5 2.5v1.5a.5.5 0 0 1-1 0V14h-1v1.5a.5.5 0 0 1-1 0V14h-1v1.5a.5.5 0 0 1-1 0V14h-1v1.5a.5.5 0 0 1-1 0V14A2.5 2.5 0 0 1 2 11.5H.5a.5.5 0 0 1 0-1H2v-1H.5a.5.5 0 0 1 0-1H2v-1H.5a.5.5 0 0 1 0-1H2v-1H.5a.5.5 0 0 1 0-1H2A2.5 2.5 0 0 1 4.5 2V.5A.5.5 0 0 1 5 0m-.5 3A1.5 1.5 0 0 0 3 4.5v7A1.5 1.5 0 0 0 4.5 13h7a1.5 1.5 0 0 0 1.5-1.5v-7A1.5 1.5 0 0 0 11.5 3zM5 6.5A1.5 1.5 0 0 1 6.5 5h3A1.5 1.5 0 0 1 11 6.5v3A1.5 1.5 0 0 1 9.5 11h-3A1.5 1.5 0 0 1 5 9.5zM6.5 6a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5z" }, null, -1 /* CACHED */)
  ]))], 16 /* FULL_PROPS */, _hoisted_1$3))
}
}

});

script$5.__file = "src/components/IconCpu.vue";

const _hoisted_1$2 = ["width", "height"];


var script$4 = /*@__PURE__*/Object.assign({
  inheritAttrs: false,
}, {
  __name: 'IconUpArrow',
  props: {
    "width": {
  type: [String, Number],
  default: 16,
  validator: value => {
    // Accept CSS units like "1rem", "16px", etc. or numeric values
    if (typeof value === 'string') {
      return /^(\d+(\.\d+)?)(px|rem|em|%|vh|vw|pt|pc|in|cm|mm|ex|ch|lh)?$/.test(value.trim());
    }
    const num = Number(value);
    return !isNaN(num) && num > 0;
  },
},
    "widthModifiers": {},
    "height": {
  type: [String, Number],
  default: 16,
  validator: value => {
    // Accept CSS units like "1rem", "16px", etc. or numeric values
    if (typeof value === 'string') {
      return /^(\d+(\.\d+)?)(px|rem|em|%|vh|vw|pt|pc|in|cm|mm|ex|ch|lh)?$/.test(value.trim());
    }
    const num = Number(value);
    return !isNaN(num) && num > 0;
  },
},
    "heightModifiers": {},
  },
  emits: ["update:width", "update:height"],
  setup(__props) {

/**
 * 2024-05-28 Bootstrap VueJS wrapper, Magnus Persson
 */

/**
 * Purpose: Show an svg icon on the UI. Used embedded svg to avoid downloading data from internet.
 */


/**
 * Width of the icon (optional).
 */
const width = vue.useModel(__props, 'width');

/**
 * Height of the icon (optional).
 */
const height = vue.useModel(__props, 'height');

return (_ctx, _cache) => {
  return (vue.openBlock(), vue.createElementBlock("svg", vue.mergeProps(_ctx.$attrs, {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 16 16",
    fill: "currentColor",
    width: width.value,
    height: height.value
  }), [...(_cache[0] || (_cache[0] = [
    vue.createElementVNode("path", {
      "fill-rule": "evenodd",
      d: "M0 0h1v15h15v1H0zm10 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V4.9l-3.613 4.417a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61L13.445 4H10.5a.5.5 0 0 1-.5-.5"
    }, null, -1 /* CACHED */)
  ]))], 16 /* FULL_PROPS */, _hoisted_1$2))
}
}

});

script$4.__file = "src/components/IconUpArrow.vue";

const _hoisted_1$1 = ["width", "height"];


var script$3 = /*@__PURE__*/Object.assign({
  inheritAttrs: false,
}, {
  __name: 'IconGraphUpArrow',
  props: {
    "width": {
  type: [String, Number],
  default: 16,
  validator: value => {
    // Accept CSS units like "1rem", "16px", etc. or numeric values
    if (typeof value === 'string') {
      return /^(\d+(\.\d+)?)(px|rem|em|%|vh|vw|pt|pc|in|cm|mm|ex|ch|lh)?$/.test(value.trim());
    }
    const num = Number(value);
    return !isNaN(num) && num > 0;
  },
},
    "widthModifiers": {},
    "height": {
  type: [String, Number],
  default: 16,
  validator: value => {
    // Accept CSS units like "1rem", "16px", etc. or numeric values
    if (typeof value === 'string') {
      return /^(\d+(\.\d+)?)(px|rem|em|%|vh|vw|pt|pc|in|cm|mm|ex|ch|lh)?$/.test(value.trim());
    }
    const num = Number(value);
    return !isNaN(num) && num > 0;
  },
},
    "heightModifiers": {},
  },
  emits: ["update:width", "update:height"],
  setup(__props) {

/**
 * 2024-05-28 Bootstrap VueJS wrapper, Magnus Persson
 */

/**
 * Purpose: Show an svg icon on the UI. Used embedded svg to avoid downloading data from internet.
 */


/**
 * Width of the icon (optional).
 */
const width = vue.useModel(__props, 'width');

/**
 * Height of the icon (optional).
 */
const height = vue.useModel(__props, 'height');

return (_ctx, _cache) => {
  return (vue.openBlock(), vue.createElementBlock("svg", vue.mergeProps(_ctx.$attrs, {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 16 16",
    fill: "currentColor",
    width: width.value,
    height: height.value
  }), [...(_cache[0] || (_cache[0] = [
    vue.createElementVNode("path", {
      "fill-rule": "evenodd",
      d: "M0 0h1v15h15v1H0zm10 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V4.9l-3.613 4.417a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61L13.445 4H10.5a.5.5 0 0 1-.5-.5"
    }, null, -1 /* CACHED */)
  ]))], 16 /* FULL_PROPS */, _hoisted_1$1))
}
}

});

script$3.__file = "src/components/IconGraphUpArrow.vue";

const _hoisted_1 = ["width", "height"];


var script$2 = /*@__PURE__*/Object.assign({
  inheritAttrs: false,
}, {
  __name: 'IconCloudUpArrow',
  props: {
    "width": {
  type: [String, Number],
  default: 16,
  validator: value => {
    // Accept CSS units like "1rem", "16px", etc. or numeric values
    if (typeof value === 'string') {
      return /^(\d+(\.\d+)?)(px|rem|em|%|vh|vw|pt|pc|in|cm|mm|ex|ch|lh)?$/.test(value.trim());
    }
    const num = Number(value);
    return !isNaN(num) && num > 0;
  },
},
    "widthModifiers": {},
    "height": {
  type: [String, Number],
  default: 16,
  validator: value => {
    // Accept CSS units like "1rem", "16px", etc. or numeric values
    if (typeof value === 'string') {
      return /^(\d+(\.\d+)?)(px|rem|em|%|vh|vw|pt|pc|in|cm|mm|ex|ch|lh)?$/.test(value.trim());
    }
    const num = Number(value);
    return !isNaN(num) && num > 0;
  },
},
    "heightModifiers": {},
  },
  emits: ["update:width", "update:height"],
  setup(__props) {

/**
 * 2024-05-28 Bootstrap VueJS wrapper, Magnus Persson
 */

/**
 * Purpose: Show an svg icon on the UI. Used embedded svg to avoid downloading data from internet.
 */


/**
 * Width of the icon (optional).
 */
const width = vue.useModel(__props, 'width');

/**
 * Height of the icon (optional).
 */
const height = vue.useModel(__props, 'height');

return (_ctx, _cache) => {
  return (vue.openBlock(), vue.createElementBlock("svg", vue.mergeProps(_ctx.$attrs, {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 16 16",
    fill: "currentColor",
    width: width.value,
    height: height.value
  }), [...(_cache[0] || (_cache[0] = [
    vue.createElementVNode("path", {
      "fill-rule": "evenodd",
      d: "M7.646 5.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708z"
    }, null, -1 /* CACHED */),
    vue.createElementVNode("path", { d: "M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383m.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z" }, null, -1 /* CACHED */)
  ]))], 16 /* FULL_PROPS */, _hoisted_1))
}
}

});

script$2.__file = "src/components/IconCloudUpArrow.vue";

var script$1 = /*@__PURE__*/Object.assign({
  inheritAttrs: false,
}, {
  __name: 'IconData',
  setup(__props) {

/**
 * 2025-07-05 Bootstrap VueJS wrapper, Magnus Persson
 */

/**
 * Purpose: Show an svg icon on the UI. Used embedded svg to avoid downloading data from internet.
 */


return (_ctx, _cache) => {
  return (vue.openBlock(), vue.createElementBlock("svg", vue.mergeProps(_ctx.$attrs, {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 16 16",
    fill: "currentColor"
  }), [...(_cache[0] || (_cache[0] = [
    vue.createElementVNode("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      width: "16",
      height: "16",
      fill: "currentColor",
      class: "bi bi-database",
      viewBox: "0 0 16 16"
    }, [
      vue.createElementVNode("path", { d: "M4.318 2.687C5.234 2.271 6.536 2 8 2s2.766.27 3.682.687C12.644 3.125 13 3.627 13 4c0 .374-.356.875-1.318 1.313C10.766 5.729 9.464 6 8 6s-2.766-.27-3.682-.687C3.356 4.875 3 4.373 3 4c0-.374.356-.875 1.318-1.313M13 5.698V7c0 .374-.356.875-1.318 1.313C10.766 8.729 9.464 9 8 9s-2.766-.27-3.682-.687C3.356 7.875 3 7.373 3 7V5.698c.271.202.58.378.904.525C4.978 6.711 6.427 7 8 7s3.022-.289 4.096-.777A5 5 0 0 0 13 5.698M14 4c0-1.007-.875-1.755-1.904-2.223C11.022 1.289 9.573 1 8 1s-3.022.289-4.096.777C2.875 2.245 2 2.993 2 4v9c0 1.007.875 1.755 1.904 2.223C4.978 15.71 6.427 16 8 16s3.022-.289 4.096-.777C13.125 14.755 14 14.007 14 13zm-1 4.698V10c0 .374-.356.875-1.318 1.313C10.766 11.729 9.464 12 8 12s-2.766-.27-3.682-.687C3.356 10.875 3 10.373 3 10V8.698c.271.202.58.378.904.525C4.978 9.71 6.427 10 8 10s3.022-.289 4.096-.777A5 5 0 0 0 13 8.698m0 3V13c0 .374-.356.875-1.318 1.313C10.766 14.729 9.464 15 8 15s-2.766-.27-3.682-.687C3.356 13.875 3 13.373 3 13v-1.302c.271.202.58.378.904.525C4.978 12.71 6.427 13 8 13s3.022-.289 4.096-.777c.324-.147.633-.323.904-.525" })
    ], -1 /* CACHED */)
  ]))], 16 /* FULL_PROPS */))
}
}

});

script$1.__file = "src/components/IconData.vue";

var script = /*@__PURE__*/Object.assign({
  inheritAttrs: false,
}, {
  __name: 'IconClipboard',
  setup(__props) {

/**
 * 2024-11-03 Bootstrap VueJS wrapper, Magnus Persson
 */

/**
 * Purpose: Show an svg icon on the UI. Used embedded svg to avoid downloading data from internet.
 */


return (_ctx, _cache) => {
  return (vue.openBlock(), vue.createElementBlock("svg", vue.mergeProps(_ctx.$attrs, {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 16 16",
    fill: "currentColor"
  }), [...(_cache[0] || (_cache[0] = [
    vue.createElementVNode("path", { d: "M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z" }, null, -1 /* CACHED */),
    vue.createElementVNode("path", { d: "M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z" }, null, -1 /* CACHED */)
  ]))], 16 /* FULL_PROPS */))
}
}

});

script.__file = "src/components/IconClipboard.vue";

function useFetch() {
  const controllers = vue.ref(new Set());

  const managedFetch = async (url, options = {}) => {
    const controller = new AbortController();
    controllers.value.add(controller);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });

      controllers.value.delete(controller);
      return response;
    } catch (error) {
      controllers.value.delete(controller);

      if (error.name === 'AbortError') {
        logDebug('useFetch.managedFetch()', 'Request aborted:', url);
        return null;
      }

      logError('useFetch.managedFetch()', 'Fetch error:', error);
      throw error;
    }
  };

  const abortAllRequests = () => {
    controllers.value.forEach(controller => {
      controller.abort();
    });
    controllers.value.clear();
    logDebug('useFetch.abortAllRequests()', 'All fetch requests aborted');
  };

  const abortRequest = controller => {
    if (controllers.value.has(controller)) {
      controller.abort();
      controllers.value.delete(controller);
    }
  };

  vue.onBeforeUnmount(() => {
    abortAllRequests();
  });

  if (typeof window !== 'undefined') {
    const handleUnload = () => {
      abortAllRequests();
    };

    window.addEventListener('beforeunload', handleUnload);

    vue.onBeforeUnmount(() => {
      window.removeEventListener('beforeunload', handleUnload);
    });
  }

  return {
    managedFetch,
    abortAllRequests,
    abortRequest,
    activeControllers: controllers,
  };
}

function useTimers() {
  const timeouts = vue.ref(new Set());
  const intervals = vue.ref(new Set());

  const createTimeout = (callback, delay) => {
    const timeoutId = setTimeout(() => {
      timeouts.value.delete(timeoutId);
      callback();
    }, delay);

    timeouts.value.add(timeoutId);
    return timeoutId;
  };

  const createInterval = (callback, delay) => {
    const intervalId = setInterval(callback, delay);
    intervals.value.add(intervalId);
    return intervalId;
  };

  const clearManagedTimeout = timeoutId => {
    if (timeouts.value.has(timeoutId)) {
      clearTimeout(timeoutId);
      timeouts.value.delete(timeoutId);
    }
  };

  const clearManagedInterval = intervalId => {
    if (intervals.value.has(intervalId)) {
      clearInterval(intervalId);
      intervals.value.delete(intervalId);
    }
  };

  const clearAllTimers = () => {
    timeouts.value.forEach(timeoutId => {
      clearTimeout(timeoutId);
    });
    timeouts.value.clear();

    intervals.value.forEach(intervalId => {
      clearInterval(intervalId);
    });
    intervals.value.clear();

    logDebug('useTimers.clearAllTimers()', 'All timers cleared');
  };

  vue.onBeforeUnmount(() => {
    clearAllTimers();
  });

  return {
    createTimeout,
    createInterval,
    clearManagedTimeout,
    clearManagedInterval,
    clearAllTimers,
    activeTimeouts: timeouts,
    activeIntervals: intervals,
  };
}

// Minimal centralized HTTP client to standardize fetch usage across the app.
// Provides timeout, automatic Authorization header injection (from a getter),
// convenience helpers returning Promises (json/text), and built-in logging.
class HttpClient {
  constructor() {
    // autodetect base URL from env or window location
    if (typeof ({ url: (typeof document === 'undefined' ? require('u' + 'rl').pathToFileURL(__filename).href : (_documentCurrentScript && _documentCurrentScript.tagName.toUpperCase() === 'SCRIPT' && _documentCurrentScript.src || new URL('index.js', document.baseURI).href)) }) !== 'undefined' && undefined && undefined.VITE_APP_HOST) {
      this.baseURL = undefined.VITE_APP_HOST;
    } else if (typeof window !== 'undefined' && window.location) {
      this.baseURL = window.location.href;
    } else {
      this.baseURL = '';
    }

    // default timeout (ms)
    this.timeout =
      typeof ({ url: (typeof document === 'undefined' ? require('u' + 'rl').pathToFileURL(__filename).href : (_documentCurrentScript && _documentCurrentScript.tagName.toUpperCase() === 'SCRIPT' && _documentCurrentScript.src || new URL('index.js', document.baseURI).href)) }) !== 'undefined' && undefined && undefined.VITE_FETCH_TIMEOUT
        ? Number(undefined.VITE_FETCH_TIMEOUT)
        : 8000;

    this.token = '';
  }

  // Normalize an auth token into an Authorization header value.
  // Do not modify the token itself; simply prefix it with 'bearer '.
  _formatAuth(token) {
    if (!token) return token;
    const t = String(token).trim();
    return 'Bearer ' + t;
  }

  buildUrl(path) {
    if (!path) return this.baseURL;
    if (path.startsWith('http://') || path.startsWith('https://')) return path;
    return this.baseURL.endsWith('/') || path.startsWith('/')
      ? this.baseURL + path.replace(/^\//, '')
      : this.baseURL + path;
  }

  // Check if the baseURL uses SSL (HTTPS)
  isSSL() {
    return !!(this.baseURL && this.baseURL.startsWith('https://'));
  }

  async request(path, { method = 'GET', headers = {}, body, timeout } = {}) {
    const url = this.buildUrl(path);
    const controller = new AbortController();
    const t = timeout === undefined ? this.timeout : timeout;

    const finalHeaders = Object.assign({}, headers);
    if (this.token && !Object.keys(finalHeaders).some(k => k === 'Authorization')) {
      finalHeaders['Authorization'] = this._formatAuth(this.token);
    }

    const timer = setTimeout(() => controller.abort(), t);

    const res = await fetch(url, {
      method,
      headers: finalHeaders,
      body,
      signal: controller.signal,
    });
    clearTimeout(timer);
    return res;
  }

  async getJson(path, opts = {}) {
    const res = await this.request(path, Object.assign({ method: 'GET' }, opts));
    if (!res) return null;
    if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    return res.json();
  }

  async postJson(path, data, opts = {}) {
    const headers = Object.assign({ 'Content-Type': 'application/json' }, opts.headers || {});
    const body = JSON.stringify(data);
    const res = await this.request(path, Object.assign({ method: 'POST', headers, body }, opts));
    if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    return res;
  }

  async postText(path, data, opts = {}) {
    const headers = Object.assign({ 'Content-Type': 'application/json' }, opts.headers || {});
    const body = JSON.stringify(data);
    const res = await this.request(path, Object.assign({ method: 'POST', headers, body }, opts));
    if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    return res.text();
  }

  // Convenience helper to interact with the device filesystem API.
  // Accepts a data object, posts to 'api/filesystem' and returns an object
  // { success: boolean, text: string } to match previous callers' expectations.
  async filesystemRequest(data) {
    try {
      logInfo('httpClient.filesystemRequest()', 'Sending /api/filesystem');
      const text = await this.postText('api/filesystem', data);
      return { success: true, text };
    } catch (err) {
      logError('httpClient.filesystemRequest()', err);
      return { success: false, text: '' };
    }
  }

  // Ping the device to check connectivity. Returns boolean success/failure.
  async ping() {
    try {
      await this.getJson('api/ping');
      return true;
    } catch (err) {
      logError('httpClient.ping()', err);
      return false;
    }
  }

  // Map device push error codes to human readable messages
  getErrorString(code) {
    switch (code) {
      case -100:
        return 'Skipped since SSL is used';
      case 200:
        return 'Success (200)';
      case 401:
        return 'Access denied (401)';
      case 404:
        return 'Endpoint not found (404)';
      case 422:
        return 'Paylod cannot be parsed, check format and http headers';
      default:
        return '';
    }
  }

  // Perform Basic auth against device and store token on success.
  // optional `basicBase` should be the base64 encoded "user:pass" string (without the 'Basic ' prefix)
  // Performs auth, logs errors internally and returns boolean success/failure.
  async auth(basicBase) {
    try {
      const base = basicBase;
      logInfo('httpClient.auth()', 'Requesting /api/auth');
      const response = await this.request('api/auth', {
        method: 'GET',
        headers: { Authorization: 'Basic ' + base },
      });
      if (!response.ok) {
        const err = new Error(`HTTP ${response.status}: ${response.statusText}`);
        logError('httpClient.auth()', err);
        return false;
      }
      const json = await response.json();
      if (json && json.token) {
        this.token = json.token;
        logInfo('httpClient.auth()', 'Authentication succeeded, token set');
        return true;
      }
      const noTokenErr = new Error('Authentication response did not contain token');
      logError('httpClient.auth()', noTokenErr);
      return false;
    } catch (err) {
      logError('httpClient.auth()', err);
      return false;
    }
  }

  // Upload a file or FormData using XMLHttpRequest to support progress events.
  // path: endpoint path (e.g. 'api/firmware/upload')
  // data: File or FormData
  // opts: { fieldName = 'file', timeoutMs, onProgress }
  uploadFile(path, data, opts = {}) {
    const { fieldName = 'file', timeoutMs = 120000, onProgress } = opts;

    return new Promise(resolve => {
      try {
        const url = this.buildUrl(path);
        const xhr = new XMLHttpRequest();
        xhr.timeout = timeoutMs;

        xhr.onerror = e => {
          logError('httpClient.uploadFile()', e);
          resolve({ success: false, status: xhr.status, text: xhr.responseText || '' });
        };

        xhr.ontimeout = e => {
          logError('httpClient.uploadFile()', 'timeout', e);
          resolve({ success: false, status: xhr.status, text: xhr.responseText || '' });
        };

        xhr.onloadend = () => {
          const ok = xhr.status >= 200 && xhr.status < 300;
          if (ok) {
            resolve({ success: true, status: xhr.status, text: xhr.responseText });
          } else {
            logError('httpClient.uploadFile()', `HTTP ${xhr.status}`);
            resolve({ success: false, status: xhr.status, text: xhr.responseText || '' });
          }
        };

        if (xhr.upload && typeof onProgress === 'function') {
          xhr.upload.addEventListener('progress', ev => {
            if (ev.lengthComputable) {
              const percent = (ev.loaded / ev.total) * 100;
              try {
                onProgress(percent);
              } catch (e) {
                logError('httpClient.uploadFile.onProgress()', e);
              }
            }
          });
        }

        // Prepare form data
        let payload;
        if (data instanceof FormData) {
          payload = data;
        } else {
          payload = new FormData();
          payload.append(fieldName, data);
        }

        xhr.open('POST', url, true);
        // Set Authorization header if token present
        if (this.token) {
          try {
            xhr.setRequestHeader('Authorization', this._formatAuth(this.token));
          } catch (e) {
            // Some browsers may throw when setting forbidden headers; safest to ignore
            logError('httpClient.uploadFile.setRequestHeader()', e);
          }
        }

        xhr.send(payload);
      } catch (err) {
        logError('httpClient.uploadFile()', err);
        resolve({ success: false, status: 0, text: '' });
      }
    });
  }

  // Build a websocket URL from the client's baseURL and a path.
  buildWsUrl(path) {
    const base = this.baseURL || '';
    let wsBase = base;
    try {
      if (base.startsWith('https://')) wsBase = base.replace(/^https:\/\//i, 'wss://');
      else if (base.startsWith('http://')) wsBase = base.replace(/^http:\/\//i, 'ws://');
      else wsBase = base;
    } catch (e) {
      wsBase = base;
    }

    if (!path) return wsBase;
    if (path.startsWith('ws://') || path.startsWith('wss://')) return path;
    return wsBase.endsWith('/') || path.startsWith('/')
      ? wsBase + path.replace(/^\//, '')
      : wsBase + path;
  }

  // Create a WebSocket for a given path. Returns the raw WebSocket and a small helper to close.
  // opts: { protocols?, onOpen?, onMessage?, onClose?, onError?, autoReconnect?: boolean, reconnectIntervalMs?: number }
  createWebSocket(path, opts = {}) {
    const {
      protocols,
      onOpen,
      onMessage,
      onClose,
      onError,
      autoReconnect = false,
      reconnectIntervalMs = 3000,
    } = opts;

    let socket = null;
    let shouldReconnect = autoReconnect;
    let reconnectTimer = null;

    const open = () => {
      const url = this.buildWsUrl(path);
      socket = protocols ? new WebSocket(url, protocols) : new WebSocket(url);

      socket.onopen = ev => {
        if (typeof onOpen === 'function') onOpen(ev);
      };
      socket.onmessage = ev => {
        if (typeof onMessage === 'function') onMessage(ev);
      };
      socket.onclose = ev => {
        if (typeof onClose === 'function') onClose(ev);
        if (shouldReconnect) {
          reconnectTimer = setTimeout(() => open(), reconnectIntervalMs);
        }
      };
      socket.onerror = ev => {
        if (typeof onError === 'function') onError(ev);
      };
    };

    open();

    const close = () => {
      shouldReconnect = false;
      if (reconnectTimer) {
        clearTimeout(reconnectTimer);
        reconnectTimer = null;
      }
      if (socket) {
        try {
          socket.close();
        } catch (e) {
          logError('httpClient.createWebSocket.close()', e);
        }
        socket = null;
      }
    };

    return { socketGetter: () => socket, close };
  }

  // Perform a device restart via /api/restart and optionally schedule a client redirect
  // mdns: optional mDNS name (without .local) used to redirect to the device after restart
  // opts: { redirectDelayMs = 8000 }
  async restart(mdns, opts = {}) {
    const { redirectDelayMs = 8000 } = opts;
    try {
      const json = await this.getJson('api/restart');

      // If caller provided an mdns name and restart succeeded, schedule a redirect
      if (json && json.status === true && typeof window !== 'undefined' && mdns) {
        const redirectUrl = 'http://' + mdns + '.local';
        const redirectTimeout = setTimeout(() => {
          try {
            location.href = redirectUrl;
          } catch (error) {
            logError('httpClient.restart.redirect()', error);
            // Fallback to reload
            try {
              window.location.reload();
            } catch (_e) {
              // ignore
            }
          }
        }, redirectDelayMs);

        // Clean up on page unload to avoid dangling timeout
        if (typeof window !== 'undefined') {
          window.addEventListener(
            'beforeunload',
            () => {
              clearTimeout(redirectTimeout);
            },
            { once: true }
          );
        }

        return { success: true, json, redirectScheduled: true };
      }

      return { success: true, json, redirectScheduled: false };
    } catch (err) {
      logError('httpClient.restart()', err);
      return { success: false, error: err };
    }
  }

  // token is stored only in-memory; no explicit clearToken API
}

// Shared singleton client (will be initialized lazily; consumers should set baseURL/token/timeout)
const sharedHttpClient = new HttpClient();

// src/index.js
// ESP Framework UI Components Library

// Package version
const version = '1.6.0';

exports.BsCard = script$x;
exports.BsDropdown = script$w;
exports.BsFileUpload = script$b;
exports.BsFooter = script$9;
exports.BsInputBase = script$8;
exports.BsInputNumber = script$s;
exports.BsInputRadio = script$n;
exports.BsInputReadonly = script$o;
exports.BsInputSwitch = script$r;
exports.BsInputText = script$t;
exports.BsInputTextArea = script$q;
exports.BsInputTextAreaFormat = script$p;
exports.BsMenuBar = script$a;
exports.BsMessage = script$g;
exports.BsModal = script$f;
exports.BsModalConfirm = script$e;
exports.BsModalLogin = script$d;
exports.BsProgress = script$c;
exports.BsSelect = script$l;
exports.HttpClient = HttpClient;
exports.IconCheckCircle = script$j;
exports.IconClipboard = script;
exports.IconCloudUpArrow = script$2;
exports.IconCpu = script$5;
exports.IconData = script$1;
exports.IconExclamationTriangle = script$h;
exports.IconEye = script$u;
exports.IconEyeSlash = script$v;
exports.IconGraphUpArrow = script$3;
exports.IconHome = script$7;
exports.IconInfoCircle = script$i;
exports.IconTools = script$6;
exports.IconUpArrow = script$4;
exports.IconWifi = script$m;
exports.IconXCircle = script$k;
exports.barToPsi = barToPsi;
exports.formatTime = formatTime;
exports.gravityToPlato = gravityToPlato;
exports.gravityToSG = gravityToSG;
exports.isValidFormData = isValidFormData;
exports.isValidJson = isValidJson;
exports.isValidMqttData = isValidMqttData;
exports.kpaToPsi = kpaToPsi;
exports.logDebug = logDebug;
exports.logError = logError;
exports.logInfo = logInfo;
exports.psiToBar = psiToBar;
exports.psiToKPa = psiToKPa;
exports.roundVal = roundVal;
exports.sharedHttpClient = sharedHttpClient;
exports.tempToC = tempToC;
exports.tempToF = tempToF;
exports.useFetch = useFetch;
exports.useTimers = useTimers;
exports.validateCurrentForm = validateCurrentForm;
exports.version = version;
