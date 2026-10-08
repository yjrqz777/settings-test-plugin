# settings-test-plugin

DSH 浏览器半插件：在设置导航里注册一个 `Test` 页面，页面内一个按钮，点击在浏览器控制台输出日志。

源码是 TypeScript，由 `tsc` 编译到 `lib/` 目录的 `index.js` / `client.js`，后者就是 loader 实际加载的客户端产物。

## 文件

| 文件 | 作用 |
|---|---|
| `src/index.ts` | Host 半源码，本插件不做事，只占一个行 |
| `src/client.tsx` | 浏览器半源码，注册 `settings.section` 槽位 |
| `tsconfig.json` | 编译配置：`src` 编译到 `lib`，`jsxFactory: "h"` |
| `package.json` | 元数据清单：`dsh.bundle.patch` 指向补丁，`dsh.client` 声明浏览器半，`exports["./client"]` 指向产物 |
| `cordis.patch.yml` | 把 Host 行 `settings-test` 插入组合 |
| `lib/index.js` | 构建产物（`src/index.ts` 编译结果），未构建时不存在 |
| `lib/client.js` | 构建产物，lazy-CJS factory，未构建时不存在 |

## 构建

```
pnpm install
pnpm run build
```

装进 profile 之前必须先构建，否则 `lib/` 里没有 `index.js` / `client.js`，清单里的 `exports` 指向空文件。

`src/client.tsx` 里没有 `import` 也没有 `export`，所以 `tsc` 把它按普通脚本原样输出：产物是经典脚本，不是 ES 模块。这是硬要求，loader 只接受 `window.__ModuleLoader__.load({ id, factory })` 这种经典脚本产物。JSX 用局部 `h` 工厂编译（`jsxFactory: "h"`），React 由外壳的浏览器模块表在运行时提供，因此 factory 的参数是 `require`。产物不要改成 ESM，也不要加 CDN、UMD 引入。

## 注册点

`src/client.tsx` 里通过 `ctx.slots.inject('settings.section', ...)` 注册设置分区：

- `id`: `settings-test`
- `label`: `() => 'Test'`
- `order`: `100`（升序排在 `general` 0、`models` 10、`plugins` 15、`agent-presets` 20 之后）

## 修改点

- 按钮日志：`src/client.tsx` 的 `onLogClick`
- 页面说明文字：`src/client.tsx` 的 `TestPage`
- 按钮样式与按压动画：`src/client.tsx` 顶部的 `CSS` 常量
- 页面标题与排序：`src/client.tsx` 的 `label` 与 `order`
- 插件包名与行 id：`package.json` 的 `name`、`src/client.tsx` 的 factory `id`、`cordis.patch.yml` 的 `id`（三处必须一致）

## 安装

用 `plugin_manager` 的 `install_bundle`，`target` 传本目录的绝对路径。安装后进入设置即可看到 `Test` 页面。