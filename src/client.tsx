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

type ModuleRequire = (name: string) => any;

interface LazyModule {
  readonly id: string;
  factory(require: ModuleRequire): unknown;
}

/** The queue facade the Web shell injects before any bundle runs. */
declare const window: { __ModuleLoader__: { load(module: LazyModule): void } };

declare const console: { log(...args: unknown[]): void };

/** Ambient JSX surface for the classic `h` factory; the shell supplies React. */
declare namespace JSX {
  interface Element {}
  interface ElementClass {}
  interface ElementAttributesProperty {}
  interface IntrinsicElements {
    [name: string]: any;
  }
}

type CreateElement = (type: any, props?: any, ...children: any[]) => any;

/** Props the settings shell hands to a `settings.section` entry component. */
interface SettingsSectionProps {
  /** Closes the Settings dialog. */
  close?: () => void;
}

interface SettingsSectionOptions {
  readonly name: 'settings.section';
  readonly id: string;
  readonly order: number;
  /** Locale-following thunk resolved for the navigation label. */
  readonly label: () => string;
}

interface SlotsService {
  inject(ownerKey: string, contribute: () => unknown): unknown;
  register(options: SettingsSectionOptions, component: any): unknown;
}

interface ClientContext {
  readonly slots: SlotsService;
}

/** Pass-through tag: it exists so editors highlight the block below as CSS. */
const css = (strings: TemplateStringsArray): string => strings.join('');

/**
 * Entry-local styles: one rule per line, all inside a single tagged template so
 * the editor can highlight them. They render as a React element, so unmounting
 * the entry removes them with it. Only `--dsw-alias-*` theme tokens are
 * referenced, and class names carry this plugin's prefix so they cannot collide
 * with host CSS.
 */
const CSS = css`
.dst-settings-test-page { display: flex; flex-direction: column; gap: 12px; max-width: 560px; padding: 16px 0; }
.dst-settings-test-desc { margin: 0; font-size: 13px; line-height: 20px; color: var(--dsw-alias-label-secondary); }
.dst-settings-test-hint { margin: 0; font-size: 12px; line-height: 18px; color: var(--dsw-alias-label-tertiary); }
.dst-settings-test-code { padding: 0 4px; border: 0.5px solid var(--dsw-alias-border-l1); border-radius: 4px; font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; font-size: 12px; }
.dst-settings-test-button { align-self: flex-start; min-height: 28px; margin-top: 4px; padding: 6px 14px; font: inherit; font-size: 13px; line-height: 16px; color: inherit; background: transparent; border: 0.5px solid var(--dsw-alias-border-l1); border-radius: 8px; cursor: pointer; transform: scale(1); transition: transform 120ms ease, background-color 120ms ease, border-color 120ms ease; }
.dst-settings-test-button:hover { background: var(--dsw-alias-interactive-bg-hover-solid); }
.dst-settings-test-button:active { transform: scale(0.96); transition-duration: 60ms; }
.dst-settings-test-button:focus-visible { outline: 2px solid var(--dsw-alias-state-business-primary); outline-offset: 2px; }
@media (prefers-reduced-motion: reduce) { .dst-settings-test-button { transition: none; } .dst-settings-test-button:active { transform: scale(1); } }
`;

window.__ModuleLoader__.load({
  id: '@local/dsh-settings-test',
  factory(require) {
    const React = require('react') as { createElement: CreateElement };
    const h = React.createElement;
    const inject = ['slots'];

    function onLogClick(): void {
      console.log('[dsh-settings-test] button clicked', new Date().toISOString());
    }

    function TestPage(_props: SettingsSectionProps) {
      const page = (
        <div className="dst-settings-test-page">
          <style>{CSS}</style>
          <p className="dst-settings-test-desc">这是插件注册进设置导航的示例页面，注册点是 <code className="dst-settings-test-code">settings.section</code> 槽位。</p>
          <p className="dst-settings-test-desc">点下面的按钮不会改动任何设置或状态，只在浏览器控制台打印一条带时间戳的日志---。</p>
          <p className="dst-settings-test-hint">按 F12 打开开发者工具，在 Console 面板查看输出。</p>
          <button type="button" className="dst-settings-test-button" onClick={onLogClick}>
            输出日志
          </button>
        </div>
      );

      return page;
    }

    function apply(ctx: ClientContext): void {
      ctx.slots.inject('settings.section', () => ctx.slots.register(
        { name: 'settings.section', id: 'settings-test', order: 100, label: () => 'Test' },
        TestPage,
      ));
    }

    return { inject, apply };
  },
});
