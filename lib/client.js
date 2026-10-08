"use strict";
/**
 * Client half of the settings-test bundle.
 *
 * This file is a CLASSIC SCRIPT, not a module: it declares no imports and no
 * exports, so `tsc` emits it 1:1 as the lazy-CJS factory script the browser
 * module loader consumes. Running it only registers a factory under this
 * package's name; the module body runs when the shell materializes it.
 *
 * JSX compiles through the local `h` factory (`jsxFactory: "h"`), and React
 * itself comes from the shell's browser module table at runtime, which is why
 * the factory takes `require` as its parameter.
 */
/**
 * Entry-local styles. They render as a React element, so unmounting the entry
 * removes them with it. Only `--dsw-alias-*` theme tokens are referenced, and
 * class names carry this plugin's prefix so they cannot collide with host CSS.
 */
const CSS = `
.dst-settings-test-page {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 560px;
  padding: 16px 0;
}
.dst-settings-test-desc {
  margin: 0;
  font-size: 13px;
  line-height: 20px;
  color: var(--dsw-alias-label-secondary);
}
.dst-settings-test-hint {
  margin: 0;
  font-size: 12px;
  line-height: 18px;
  color: var(--dsw-alias-label-tertiary);
}
.dst-settings-test-code {
  padding: 0 4px;
  border: 0.5px solid var(--dsw-alias-border-l1);
  border-radius: 4px;
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 12px;
}
.dst-settings-test-button {
  align-self: flex-start;
  min-height: 28px;
  margin-top: 4px;
  padding: 6px 14px;
  font: inherit;
  font-size: 13px;
  line-height: 16px;
  color: inherit;
  background: transparent;
  border: 0.5px solid var(--dsw-alias-border-l1);
  border-radius: 8px;
  cursor: pointer;
  transform: scale(1);
  transition: transform 120ms ease, background-color 120ms ease, border-color 120ms ease;
}
.dst-settings-test-button:hover {
  background: var(--dsw-alias-interactive-bg-hover-solid);
}
.dst-settings-test-button:active {
  transform: scale(0.96);
  transition-duration: 60ms;
}
.dst-settings-test-button:focus-visible {
  outline: 2px solid var(--dsw-alias-state-business-primary);
  outline-offset: 2px;
}
@media (prefers-reduced-motion: reduce) {
  .dst-settings-test-button {
    transition: none;
  }
  .dst-settings-test-button:active {
    transform: scale(1);
  }
}
`;
window.__ModuleLoader__.load({
    id: '@local/dsh-settings-test',
    factory(require) {
        const React = require('react');
        const h = React.createElement;
        function onLogClick() {
            console.log('[dsh-settings-test] button clicked', new Date().toISOString());
        }
        function TestPage(_props) {
            return (h("div", { className: "dst-settings-test-page" },
                h("style", null, CSS),
                h("p", { className: "dst-settings-test-desc" },
                    "\u8FD9\u662F\u63D2\u4EF6\u6CE8\u518C\u8FDB\u8BBE\u7F6E\u5BFC\u822A\u7684\u793A\u4F8B\u9875\u9762\uFF0C\u6CE8\u518C\u70B9\u662F ",
                    h("code", { className: "dst-settings-test-code" }, "settings.section"),
                    " \u69FD\u4F4D\u3002"),
                h("p", { className: "dst-settings-test-desc" }, "\u70B9\u4E0B\u9762\u7684\u6309\u94AE\u4E0D\u4F1A\u6539\u52A8\u4EFB\u4F55\u8BBE\u7F6E\u6216\u72B6\u6001\uFF0C\u53EA\u5728\u6D4F\u89C8\u5668\u63A7\u5236\u53F0\u6253\u5370\u4E00\u6761\u5E26\u65F6\u95F4\u6233\u7684\u65E5\u5FD7\u3002"),
                h("p", { className: "dst-settings-test-hint" }, "\u6309 F12 \u6253\u5F00\u5F00\u53D1\u8005\u5DE5\u5177\uFF0C\u5728 Console \u9762\u677F\u67E5\u770B\u8F93\u51FA\u3002"),
                h("button", { type: "button", className: "dst-settings-test-button", onClick: onLogClick }, "\u8F93\u51FA\u65E5\u5FD7")));
        }
        return {
            inject: ['slots'],
            apply(ctx) {
                ctx.slots.inject('settings.section', () => ctx.slots.register({
                    name: 'settings.section',
                    id: 'settings-test',
                    order: 100,
                    label: () => 'Test',
                }, TestPage));
            },
        };
    },
});
