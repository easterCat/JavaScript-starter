## Elasticsearch 介绍

Elasticsearch 是一个高度可扩展的开源的分布式 Restful 全文搜索和分析引擎。它允许用户快速的（近实时的）存储、搜索和分析海量数据。它通常用作底层引擎技术，为具有复杂搜索功能和要求的应用程序提供支持。
以下是 ES 可用于的一些场景：

1. 电商网站提供搜索功能：可使用 ES 来存储产品的目录和库存，并为它们提供搜索和自动填充建议。
2. 收集日志和交易数据，并进行分析：可使用 Logstash 来收集、聚合和解析数据， 然后让 Logstash 将此数据提供给 ES。然后可在 ES 中搜索和聚合开发者感兴趣的信息。
3. 需要快速调查、分析、可视化查询大量数据的特定问题：可以使用 ES 存储数据，然后使用 Kibana 构建自定义仪表板，来可视化展示数据。还可以使用 ES 的聚合功能针对这些数据进行复杂的商业分析。

## 安装 Elasticsearch

在 Mac 上可以使用 brew 快速安装 Elasticsearch

安装 Elasticsearch

```
brew install elasticsearch
```

安装完成后可使用 elasticsearch --version 查看 ES 版本信息

使用 brew 安装 ES 完成后的目录结构如下：

![](https://raw.githubusercontent.com/easterCat/img-package/master/img/20180810001726845.png)

然后执行启动命令：`elasticsearch`启动成功后，ES 的默认端口是 9200，可在浏览器中`localhost:9200`看到 ES 的基本信息

## 安装 Kibana

Kibana 是 ES 的一个配套工具，让用户在网页中可以直接与 ES 进行交互。

```
brew install kibana
```

安装完成后直接执行 kibana 命令启动 Kibana , Kibana 的默认端口是 5601
