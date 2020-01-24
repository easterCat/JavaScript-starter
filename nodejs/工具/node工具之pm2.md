## pm2

PM2 是带有内置负载平衡器的 Node.js 应用程序的生产过程管理器。它使您可以使应用程序永远保持活动状态，无需停机即可重新加载它们，并简化常见的系统管理任务。

安装

```
npm install pm2 -g
```

## 常用命令

- pm2 start app.js 开启进程
- pm2 list 所有进程
- pm2 stop <app_name|id|'all'|json_conf> / all 停止
- pm2 restart <app_name|id|'all'|json_conf> 重启
- pm2 delete <app_name|id|'all'|json_conf> 删除
- pm2 describe <id|app_name> 单一进程
- pm2 show <id|app_name> 单一进程
- pm2 monit 监控 cpu 和内存使用情况
- pm2 reload all 重开进程
- pm2 logs 日志信息
- pm2 flush 清理日志信息
- pm2 reloadLogs
- pm2 startup 开机自启动
- pm2 save 保存进程状态
- pm2 unstartup 取消开机自启动
- pm2 install <module_name> 安装模块
- pm2 update 更新

## 执行 npm 命令

```
pm2 start npm -- start
```

pm2.json

```
{
    "apps": [
        {
            "name": "my-nested-app",
            "cwd": "./nested-app",
            "script": "npm",
            "args": "start"
        }
    ]
}
```

pm2 start npm --no-automation --name {app name} -- run {script name}

- (--no-automation)当进程崩溃时,pm2 会自动帮你重启
- (--name)启动的名称
- (--run)执行的命令

## 参数

```
# Specify an app name
--name <app_name>

# Watch and Restart app when files change
--watch

# Set memory threshold for app reload
--max-memory-restart <200MB>

# Specify log file
--log <log_path>

# Pass extra arguments to the script
-- arg1 arg2 arg3

# Delay between automatic restarts
--restart-delay <delay in ms>

# Prefix logs with time
--time

# Do not auto restart app
--no-autorestart

# Specify cron for forced restart
--cron <cron_pattern>

# Attach to application log
--no-daemon
```

## 使用配置文件

```
{
    "apps": {
        "name": "wuwu",                             // 项目名
        "script": "./bin/www",                      // 执行文件
        "cwd": "./",                                // 根目录
        "args": "",                                 // 传递给脚本的参数
        "interpreter": "",                          // 指定的脚本解释器
        "interpreter_args": "",                     // 传递给解释器的参数
        "watch": true,                              // 是否监听文件变动然后重启
        "ignore_watch": [                           // 不用监听的文件
            "node_modules",
            "logs"
        ],
        "exec_mode": "cluster_mode",                // 应用启动模式，支持fork和cluster模式
        "instances": 4,                             // 应用启动实例个数，仅在cluster模式有效 默认为fork；或者 max
        "max_memory_restart": 8,                    // 最大内存限制数，超出自动重启
        "error_file": "./logs/app-err.log",         // 错误日志文件
        "out_file": "./logs/app-out.log",           // 正常日志文件
        "merge_logs": true,                         // 设置追加日志而不是新建日志
        "log_date_format": "YYYY-MM-DD HH:mm:ss",   // 指定日志文件的时间格式
        "min_uptime": "60s",                        // 应用运行少于时间被认为是异常启动
        "max_restarts": 30,                         // 最大异常重启次数，即小于min_uptime运行时间重启次数；
        "autorestart": true,                        // 默认为true, 发生异常的情况下自动重启
        "cron_restart": "",                         // crontab时间格式重启应用，目前只支持cluster模式;
        "restart_delay": "60s"                      // 异常重启情况下，延时重启时间
        "env": {
           "NODE_ENV": "production",                // 环境参数，当前指定为生产环境 process.env.NODE_ENV
           "REMOTE_ADDR": "爱上大声地"               // process.env.REMOTE_ADDR
        },
        "env_dev": {
            "NODE_ENV": "development",              // 环境参数，当前指定为开发环境 pm2 start app.js --env_dev
            "REMOTE_ADDR": ""
        },
        "env_test": {                               // 环境参数，当前指定为测试环境 pm2 start app.js --env_test
            "NODE_ENV": "test",
            "REMOTE_ADDR": ""
        }
    }
}
```

在 package/json 添加`"pm2": "pm2 start pm2.json"`

## Doc

[ 官方网站](https://pm2.keymetrics.io/docs/usage/pm2-doc-single-page/)
