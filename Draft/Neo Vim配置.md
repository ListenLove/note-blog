## 配置
- `vim.g.{name}`: 全局变量
- `vim.b.{name}`: 缓冲区变量
- `vim.w.{name}`: 窗口变量
- `vim.bo.{option}`: `buffer-local` 选项
- `vim.wo.{option}`: `window-local` 选项
> 一般来说，全部设置在 `vim.opt` 下也是可以的，例如 `vim.opt.number = true` 也是有效的，只是我们上边设置到了比较详细位置而已，具体每个变量的分类可以在 `:help` 文档中查看。

## 设置快捷键
在 Neovim 中使用以下方法设置快捷键：
- `vim.api.nvim_set_keymap()` 全局快捷键
- `vim.api.nvim_buf_set_keymap()` Buffer 快捷键
一般情况下，都是定义使用全局快捷键， Buffer 快捷键一般是在某些异步回调函数里指定，例如某插件初始化结束后，会有回调函数提供 Buffer，这个时候我们可以只针对这一个 Buffer 设置快捷键。

关于 Buffer 快捷键部分，我们后边课程会遇到，这里先看全局设置。

`vim.api.nvim_set_keymap('模式', '按键', '映射为', 'options')`
这里` 模式 `参数用一个字母表示，常见的有：

- **n** Normal 模式
- **i** Insert 模式
- **v** Visual 模式
- **t** Terminal 模式
- **c** Command 模式
按键 就是你按下的键，没什么说的。

映射为 可以是多个按键组合，比如 `5j` 就是连续点击5和j， 也可以是一条命令比如 `:q<CR>`，表示退出。

options 大部分会设置为` { noremap = true, silent = true }`。`noremap` 表示不会重新映射，比如你有一个映射 A -> B , 还有一个 B -> C，这个时候如果你设置 `noremap = false` 的话，表示会重新映射，那么 A 就会被映射为 C。silent 为 true，表示不会输出多余的信息。
