# 社团黄页与管理系统
这是一个社团黄页与管理系统，解决多社团信息集中于管理的多方面问题。

## 功能

- [ ] 社团黄页
- [ ] 社团信息管理
- [ ] 在线报名
- [ ] 纳新管理
- [ ] 人员管理
- [ ] 活动报名
- [ ] 资产管理

## 目录说明
1. bin - 服务启动入口  
2. interface - 业务接口实现   
3. fontend - 前端代码  
    1. assets - 前端资源  
    2. components - 前端组件
    3. config - 运行与编译变量配置
    4. libs - 前端工具
    5. store - vue store
    6. template - 界面模板
    7. theme - 全局演示
    8. views - 界面 vue 文件
4. lib - 公共类库  
5. pubilc - 静态资源  
6. routes - 服务路由  
7. view - 视图  
8. script - 脚本  

# 数据库部署说明
1. 新建数据库`db`（以`config.json`内配置的数据库为准）；  
2. 修改`model`中的`config.json`的数据库链接信息；  
3. 执行`npm run initdb`；
4. 若需要重置某个表，如：重置`account`表，则执行`npm run initdb -- account`。

# 调试说明
1. 执行`npm install`;
2. 前端执行`npm run dev`，后端使用 Visual Studio Code 运行调试（直接按下`F5`即可）。

## 部署说明
1. 服务器需安装`nodejs`和`npm`。部署执行如下脚本：
```bash
npm install
```
2. 编译前端代码：  
```bash
npm run build
```
3. 启动服务：
```bash
npm start
```
4. 以守护进程方式，启动服务：
```bash
forever start ./bin/www
```

## 端口号
- 8988 （可在`config.json`配置）
