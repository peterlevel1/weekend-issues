ant-design - Upload: 上传文件的请求

基本

- 是否禁用上传组件 disabled: boolean
- 值的存储字段: fileList: file[]
- 值的变化的处理回调: onChange({ file, fileList });
- 请求的路径: action
- 请求的方法: post
- 请求的参数名: name, 默认为file
- 请求头 headers, Content-Type: multipart/form-data
- 请求的参数，除了文件，还有其他请求的参数的话，用 data 字段
- 携带 cookie, 用 withCredentials: boolean

---

上传文件的处理

- 是否允许多个文件一起传，用 multiple: boolean
- 一共最多能传多少个 
- 文件允许哪些类型, 可以直接用 accept 字段
- 文件的类型/大小, 用 beforeUpload(file, fileList): void | Promise; 判断处理
- 文件的 interface 定义, { name, url, status, uid, response: string | object, }
- 文件的预览: onPreview(file) | previewFile(file) => Promise<dataURL: string>;
- 文件的删除: onRemove(file);
- 文件的下载: onDownload(file);
- 文件的拖放: onDrop(event: React.DragEvent);

---

样式

- item 样式: listType 字段
- 自定义渲染item, 用 itemRender(originNode, file, fileList, action: { preview, download, remove });
- 自定义渲染icon, 用 iconRender(file);

---

