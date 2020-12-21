/*
将笔记、博客文档，以规范化的组织结构架设进行整理，最终输出为 README.md 文档，
便于阅览和管理项目笔记和博客。
输出 README.md 文档架构为
# 大标题
## Blog
### JavaScript
#### JavaScript 高级编程
...
author: listenlove
 */
const path = require('path')
const fs = require('fs')

const md = 'README.md'    // readme 文件

const BlogNote = ['Blog', 'Note']
const root = path.resolve(__dirname, '..')  // 定位到项目根目录
const mdPath = path.join(root, md)  // readme 文件路径

// let i = fs.openSync(path.join(root, 'test.md'), 'ax+')
let mdWriteStream       //  readme 文件写入流对象

fs.exists(mdPath, function (exists) {
    if (!exists) {
        fs.openSync(mdPath, 'ax+')      // 创建 readme 文件)
    }
    mdWriteStream = fs.createWriteStream(mdPath)
})
fs.readdir(root, function (err, files) {
    if (err) {
        throw new Error('读取根目录错误，', err)
    } else {
        // 读取 Note 目录 和 Blog 目录
        for (let file of files) {
            let filePath = path.join(root, file)
            // console.log(filePath)
            let stat = fs.lstatSync(filePath)
            if (stat.isDirectory() && isTarget(file, BlogNote)) {
                let parseContent = parseToList(filePath)
                // console.log(parseContent)
                parseDataToContent(mdWriteStream, parseContent)
            }
        }
    }
})

function parseDataToContent (writeStream, contentList) {
    let content = ''
    let map = []
    for (let i = 0; i < contentList.length; i++) {
        let dir = path.dirname(contentList[i].path)
        let baseName = path.basename(contentList[i].path)
        // console.log(baseName)
        // console.log('===============')
        // console.log(dir)
        let title = dir.replace(/[\.][\/]?/m, '')
        if (title === '') {     // Blog 或者 Note 这样的顶层目录
            title = addPrefixer(contentList[i], baseName)
            content += title
            map.push(title)
        } else {
            if (map.indexOf(title) === -1) map.push(title)
            content += addPrefixer(contentList[i], baseName)
        }
    }
    writeStream.write(content)
}

function addPrefixer (item, titleName) {
    let title = ''
    if (!(item.index && item.path)) {
        throw new Error('传入内容对象不符合解析规范')
    }
    for (let i = item.index; i > 0; i--) {
        title += '#'
    }
    if (fs.lstatSync(item.path.replace('.', root)).isFile() && path.extname(item.path) === '.md') {
        return `[${titleName.replace(/.md/, '')}](${item.path.replace(root, '.')})\n`
    } else {
        return `${title} ${titleName}\n`
    }

}

/**
 * 判断文件或目录是否在目标文件或目录列表中
 * @param source    当前文件或目录
 * @param targetList    目标文件列表或目录列表
 * @return {boolean}
 */
function isTarget (source, targetList) {
    if (targetList.find(function (value) {
        return value === source
    })) {
        return true
    } else {
        return false
    }
}

// let i = fs.openSync(path.join(root, 'test.md'), 'ax+')
/**
 * 递归遍历路径 dir 返回到的遍历的内容解析和层级
 * @param dir   解析的目录
 * @param index 解析的层级
 * @param contents 解析的返回内容
 * @return {*[]}
 */
function parseToList (dir, index = 2, contents = []) {
    let record = {
        path: dir.replace(root, '.'),  // 替换为相对于根目录的相对路径
        index: index,
    }
    contents.push(record)
    let stat = fs.lstatSync(dir)
    if (!stat.isDirectory()) {
        return contents
    }
    let newFileList = fs.readdirSync(dir)
    for (let file of newFileList) {
        if (file.startsWith('.')) {
            continue
        } else {
            let newFilePath = path.join(dir, file)
            parseToList(newFilePath, index + 1, contents)
        }
    }
    return contents
}
