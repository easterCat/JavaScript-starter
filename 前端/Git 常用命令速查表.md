<div class="art_content" id="art_content">
				<h2><a name="1"></a>Git 常用命令速查</h2>
<ul>
<li>git branch 查看本地所有分支</li>
<li>git status 查看当前状态</li>
<li>git commit 提交</li>
<li>git branch -a 查看所有的分支</li>
<li>git branch -r 查看远程所有分支</li>
<li>git commit -am “init” 提交并且加注释</li>
<li>git remote add origin git@192.168.1.119:ndshow</li>
<li>git push origin master 将文件给推到服务器上</li>
<li>git remote show origin 显示远程库origin里的资源</li>
<li>git push origin master:develop</li>
<li>git push origin master:hb-dev 将本地库与服务器上的库进行关联</li>
<li>git checkout –track origin/dev 切换到远程dev分支</li>
<li>git branch -D master develop 删除本地库develop</li>
<li>git checkout -b dev 建立一个新的本地分支dev</li>
<li>git merge origin/dev 将分支dev与当前分支进行合并</li>
<li>git checkout dev 切换到本地dev分支</li>
<li>git remote show 查看远程库</li>
<li>git add . 他会监控工作区的状态树，使用它会把工作时的所有变化提交到暂存区，包括文件内容修改(modified)以及新文件(new)，但不包括被删除的文件。</li>
<li>git rm 文件名(包括路径) 从git中删除指定文件</li>
<li>git clone git://github.com/schacon/grit.git 从服务器上将代码给拉下来</li>
<li>git config –list 看所有用户</li>
<li>git ls-files 看已经被提交的</li>
<li>git rm [file name] 删除一个文件</li>
<li>git commit -a 提交当前repos的所有的改变</li>
<li>git add [file name] 添加一个文件到git index</li>
<li>git commit -v 当你用－v参数的时候可以看commit的差异</li>
<li>git commit -m “This is the message describing the commit” 添加commit信息</li>
<li>git commit -a -a是代表add，把所有的change加到git index里然后再commit</li>
<li>git commit -a -v 一般提交命令</li>
<li>git log 看你commit的日志</li>
<li>git diff 查看尚未暂存的更新</li>
<li>git rm a.a 移除文件(从暂存区和工作区中删除)</li>
<li>git rm –cached a.a 移除文件(只从暂存区中删除)</li>
<li>git commit -m “remove” 移除文件(从Git中删除)</li>
<li>git rm -f a.a 强行移除修改后文件(从暂存区和工作区中删除)</li>
<li>git diff –cached 或 $ git diff –staged 查看尚未提交的更新</li>
<li>git stash push 将文件给push到一个临时空间中</li>
<li>git stash pop 将文件从临时空间pop下来</li>
</ul>
<ul>
<li>git remote add origin git@github.com:username/Hello-World.git</li>
<li>git push origin master 将本地项目给提交到服务器中</li>
</ul>
<ul>
<li>git pull 本地与服务器端同步</li>
</ul>
<ul>
<li>git push (远程仓库名) (分支名) 将本地分支推送到服务器上去。</li>
<li>git push origin serverfix:awesomebranch</li>
</ul>
<ul>
<li>git fetch 相当于是从远程获取最新版本到本地，不会自动merge</li>
<li>git commit -a -m “log_message” (-a是提交所有改动，-m是加入log信息) 本地修改同步至服务器端 ：</li>
<li>git branch branch_0.1 master 从主分支master创建branch_0.1分支</li>
<li>git branch -m branch_0.1 branch_1.0 将branch_0.1重命名为branch_1.0</li>
<li>git checkout branch_1.0/master 切换到branch_1.0/master分支</li>
<li>du -hs</li>
<li>git branch 删除远程branch</li>
<li>git push origin :branch_remote_name</li>
<li>git branch -r -d branch_remote_name</li>
</ul>
<p>初始化版本库，并提交到远程服务器端</p>
<div><div id="highlighter_514493" class="syntaxhighlighter nogutter  js"><div class="toolbar"><span><a href="#" class="toolbar_item command_help help">?</a></span></div><table border="0" cellpadding="0" cellspacing="0"><tbody><tr><td class="code"><div class="container"><div class="line number1 index0 alt2"><code class="js plain">mkdir WebApp</code></div><div class="line number2 index1 alt1"><code class="js plain">cd WebApp</code></div><div class="line number3 index2 alt2"><code class="js plain">git init 本地初始化</code></div><div class="line number4 index3 alt1"><code class="js plain">touch README</code></div><div class="line number5 index4 alt2"><code class="js plain">git add README 添加文件</code></div><div class="line number6 index5 alt1"><code class="js plain">git commit -m </code><code class="js string">'first commit'</code></div><div class="line number7 index6 alt2"><code class="js plain">git remote add origin git@github.com:daixu/WebApp.git</code></div></div></td></tr></tbody></table></div></div>
<p>增加一个远程服务器端</p>
<p>上面的命令会增加URL地址为’git@github.com:daixu/WebApp.git’，名称为origin的远程服务器库，以后提交代码的时候只需要使用 origin别名即可</p>
<h2><a name="2"></a>Git 命令速查表</h2>
<h3><a name="2_1"></a>常用的Git命令</h3>
<table>
<thead>
<tr>
<th>命令</th>
<th>简要说明</th>
</tr>
</thead>
<tbody>
<tr>
<td>git add</td>
<td>添加至暂存区</td>
</tr>
<tr>
<td>git add–interactive</td>
<td>交互式添加</td>
</tr>
<tr>
<td>git apply</td>
<td>应用补丁</td>
</tr>
<tr>
<td>git am</td>
<td>应用邮件格式补丁</td>
</tr>
<tr>
<td>git annotate</td>
<td>同义词，等同于 git blame</td>
</tr>
<tr>
<td>git archive</td>
<td>文件归档打包</td>
</tr>
<tr>
<td>git bisect</td>
<td>二分查找</td>
</tr>
<tr>
<td>git blame</td>
<td>文件逐行追溯</td>
</tr>
<tr>
<td>git branch</td>
<td>分支管理</td>
</tr>
<tr>
<td>git cat-file</td>
<td>版本库对象研究工具</td>
</tr>
<tr>
<td>git checkout</td>
<td>检出到工作区、切换或创建分支</td>
</tr>
<tr>
<td>git cherry-pick</td>
<td>提交拣选</td>
</tr>
<tr>
<td>git citool</td>
<td>图形化提交，相当于 git gui 命令</td>
</tr>
<tr>
<td>git clean</td>
<td>清除工作区未跟踪文件</td>
</tr>
<tr>
<td>git clone</td>
<td>克隆版本库</td>
</tr>
<tr>
<td>git commit</td>
<td>提交</td>
</tr>
<tr>
<td>git config</td>
<td>查询和修改配置</td>
</tr>
<tr>
<td>git describe</td>
<td>通过里程碑直观地显示提交ID</td>
</tr>
<tr>
<td>git diff</td>
<td>差异比较</td>
</tr>
<tr>
<td>git difftool</td>
<td>调用图形化差异比较工具</td>
</tr>
<tr>
<td>git fetch</td>
<td>获取远程版本库的提交</td>
</tr>
<tr>
<td>git format-patch</td>
<td>创建邮件格式的补丁文件。参见 git am 命令</td>
</tr>
<tr>
<td>git grep</td>
<td>文件内容搜索定位工具</td>
</tr>
<tr>
<td>git gui</td>
<td>基于Tcl/Tk的图形化工具，侧重提交等操作</td>
</tr>
<tr>
<td>git help</td>
<td>帮助</td>
</tr>
<tr>
<td>git init</td>
<td>版本库初始化</td>
</tr>
<tr>
<td>git init-db*</td>
<td>同义词，等同于 git init</td>
</tr>
<tr>
<td>git log</td>
<td>显示提交日志</td>
</tr>
<tr>
<td>git merge</td>
<td>分支合并</td>
</tr>
<tr>
<td>git mergetool</td>
<td>图形化冲突解决</td>
</tr>
<tr>
<td>git mv</td>
<td>重命名</td>
</tr>
<tr>
<td>git pull</td>
<td>拉回远程版本库的提交</td>
</tr>
<tr>
<td>git push</td>
<td>推送至远程版本库</td>
</tr>
<tr>
<td>git rebase</td>
<td>分支变基</td>
</tr>
<tr>
<td>git rebase–interactive</td>
<td>交互式分支变基</td>
</tr>
<tr>
<td>git reflog</td>
<td>分支等引用变更记录管理</td>
</tr>
<tr>
<td>git remote</td>
<td>远程版本库管理</td>
</tr>
<tr>
<td>git repo-config*</td>
<td>同义词，等同于 git config</td>
</tr>
<tr>
<td>git reset</td>
<td>重置改变分支“游标”指向</td>
</tr>
<tr>
<td>git rev-parse</td>
<td>将各种引用表示法转换为哈希值等</td>
</tr>
<tr>
<td>git revert</td>
<td>反转提交</td>
</tr>
<tr>
<td>git rm</td>
<td>删除文件</td>
</tr>
<tr>
<td>git show</td>
<td>显示各种类型的对象</td>
</tr>
<tr>
<td>git stage*</td>
<td>同义词，等同于 git add</td>
</tr>
<tr>
<td>git stash</td>
<td>保存和恢复进度</td>
</tr>
<tr>
<td>git status</td>
<td>显示工作区文件状态</td>
</tr>
<tr>
<td>git tag</td>
<td>里程碑管理</td>
</tr>
</tbody>
</table>
<h3><a name="2_2"></a>对象库操作相关命令</h3>
<table>
<thead>
<tr>
<th>命令</th>
<th>简要说明</th>
</tr>
</thead>
<tbody>
<tr>
<td>git commit-tree</td>
<td>从树对象创建提交</td>
</tr>
<tr>
<td>git hash-object</td>
<td>从标准输入或文件计算哈希值或创建对象</td>
</tr>
<tr>
<td>git ls-files</td>
<td>显示工作区和暂存区文件</td>
</tr>
<tr>
<td>git ls-tree</td>
<td>显示树对象包含的文件</td>
</tr>
<tr>
<td>git mktag</td>
<td>读取标准输入创建一个里程碑对象</td>
</tr>
<tr>
<td>git mktree</td>
<td>读取标准输入创建一个树对象</td>
</tr>
<tr>
<td>git read-tree</td>
<td>读取树对象到暂存区</td>
</tr>
<tr>
<td>git update-index</td>
<td>工作区内容注册到暂存区及暂存区管理</td>
</tr>
<tr>
<td>git unpack-file</td>
<td>创建临时文件包含指定 blob 的内容</td>
</tr>
<tr>
<td>git write-tree</td>
<td>从暂存区创建一个树对象</td>
</tr>
</tbody>
</table>
<h3><a name="2_3"></a>引用操作相关命令</h3>
<table>
<thead>
<tr>
<th>命令</th>
<th>简要说明</th>
</tr>
</thead>
<tbody>
<tr>
<td>git check-ref-format</td>
<td>检查引用名称是否符合规范</td>
</tr>
<tr>
<td>git for-each-ref</td>
<td>引用迭代器，用于shell编程</td>
</tr>
<tr>
<td>git ls-remote</td>
<td>显示远程版本库的引用</td>
</tr>
<tr>
<td>git name-rev</td>
<td>将提交ID显示为友好名称</td>
</tr>
<tr>
<td>git peek-remote*</td>
<td>过时命令，请使用 git ls-remote</td>
</tr>
<tr>
<td>git rev-list</td>
<td>显示版本范围</td>
</tr>
<tr>
<td>git show-branch</td>
<td>显示分支列表及拓扑关系</td>
</tr>
<tr>
<td>git show-ref</td>
<td>显示本地引用</td>
</tr>
<tr>
<td>git symbolic-ref</td>
<td>显示或者设置符号引用</td>
</tr>
<tr>
<td>git update-ref</td>
<td>更新引用的指向</td>
</tr>
<tr>
<td>git verify-tag</td>
<td>校验 GPG 签名的Tag</td>
</tr>
</tbody>
</table>
<h3><a name="2_4"></a>版本库管理相关命令</h3>
<table>
<thead>
<tr>
<th>命令</th>
<th>简要说明</th>
</tr>
</thead>
<tbody>
<tr>
<td>git count-objects</td>
<td>显示松散对象的数量和磁盘占用</td>
</tr>
<tr>
<td>git filter-branch</td>
<td>版本库重构</td>
</tr>
<tr>
<td>git fsck</td>
<td>对象库完整性检查</td>
</tr>
<tr>
<td>git fsck-objects*</td>
<td>同义词，等同于 git fsck</td>
</tr>
<tr>
<td>git gc</td>
<td>版本库存储优化</td>
</tr>
<tr>
<td>git index-pack</td>
<td>从打包文件创建对应的索引文件</td>
</tr>
<tr>
<td>git lost-found*</td>
<td>过时，请使用 git fsck –lost-found 命令</td>
</tr>
<tr>
<td>git pack-objects</td>
<td>从标准输入读入对象ID，打包到文件</td>
</tr>
<tr>
<td>git pack-redundant</td>
<td>查找多余的 pack 文件</td>
</tr>
<tr>
<td>git pack-refs</td>
<td>将引用打包到 .git/packed-refs 文件中</td>
</tr>
<tr>
<td>git prune</td>
<td>从对象库删除过期对象</td>
</tr>
<tr>
<td>git prune-packed</td>
<td>将已经打包的松散对象删除</td>
</tr>
<tr>
<td>git relink</td>
<td>为本地版本库中相同的对象建立硬连接</td>
</tr>
<tr>
<td>git repack</td>
<td>将版本库未打包的松散对象打包</td>
</tr>
<tr>
<td>git show-index</td>
<td>读取包的索引文件，显示打包文件中的内容</td>
</tr>
<tr>
<td>git unpack-objects</td>
<td>从打包文件释放文件</td>
</tr>
<tr>
<td>git verify-pack</td>
<td>校验对象库打包文件</td>
</tr>
</tbody>
</table>
<h3><a name="2_5"></a>数据传输相关命令</h3>
<table>
<thead>
<tr>
<th>命令</th>
<th>简要说明</th>
</tr>
</thead>
<tbody>
<tr>
<td>git fetch-pack</td>
<td>执行 git fetch 或 git pull 命令时在本地执行此命令，用于从其他版本库获取缺失的对象</td>
</tr>
<tr>
<td>git receive-pack</td>
<td>执行 git push 命令时在远程执行的命令，用于接受推送的数据</td>
</tr>
<tr>
<td>git send-pack</td>
<td>执行 git push 命令时在本地执行的命令，用于向其他版本库推送数据</td>
</tr>
<tr>
<td>git upload-archive</td>
<td>执行 git archive –remote 命令基于远程版本库创建归档时，远程版本库执行此命令传送归档</td>
</tr>
<tr>
<td>git upload-pack</td>
<td>执行 git fetch 或 git pull 命令时在远程执行此命令，将对象打包、上传</td>
</tr>
</tbody>
</table>
<h3><a name="2_6"></a>邮件相关命令</h3>
<table>
<thead>
<tr>
<th>命令</th>
<th>简要说明</th>
</tr>
</thead>
<tbody>
<tr>
<td>git imap-send</td>
<td>将补丁通过 IMAP 发送</td>
</tr>
<tr>
<td>git mailinfo</td>
<td>从邮件导出提交说明和补丁</td>
</tr>
<tr>
<td>git mailsplit</td>
<td>将 mbox 或 Maildir 格式邮箱中邮件逐一提取为文件</td>
</tr>
<tr>
<td>git request-pull</td>
<td>创建包含提交间差异和执行PULL操作地址的信息</td>
</tr>
<tr>
<td>git send-email</td>
<td>发送邮件</td>
</tr>
</tbody>
</table>
<h3><a name="2_7"></a>协议相关命令</h3>
<table>
<thead>
<tr>
<th>命令</th>
<th>简要说明</th>
</tr>
</thead>
<tbody>
<tr>
<td>git daemon</td>
<td>实现Git协议</td>
</tr>
<tr>
<td>git http-backend</td>
<td>实现HTTP协议的CGI程序，支持智能HTTP协议</td>
</tr>
<tr>
<td>git instaweb</td>
<td>即时启动浏览器通过 gitweb 浏览当前版本库</td>
</tr>
<tr>
<td>git shell</td>
<td>受限制的shell，提供仅执行Git命令的SSH访问</td>
</tr>
<tr>
<td>git update-server-info</td>
<td>更新哑协议需要的辅助文件</td>
</tr>
<tr>
<td>git http-fetch</td>
<td>通过HTTP协议获取版本库</td>
</tr>
<tr>
<td>git http-push</td>
<td>通过HTTP/DAV协议推送</td>
</tr>
<tr>
<td>git remote-ext</td>
<td>由Git命令调用，通过外部命令提供扩展协议支持</td>
</tr>
<tr>
<td>git remote-fd</td>
<td>由Git命令调用，使用文件描述符作为协议接口</td>
</tr>
<tr>
<td>git remote-ftp</td>
<td>由Git命令调用，提供对FTP协议的支持</td>
</tr>
<tr>
<td>git remote-ftps</td>
<td>由Git命令调用，提供对FTPS协议的支持</td>
</tr>
<tr>
<td>git remote-http</td>
<td>由Git命令调用，提供对HTTP协议的支持</td>
</tr>
<tr>
<td>git remote-https</td>
<td>由Git命令调用，提供对HTTPS协议的支持</td>
</tr>
<tr>
<td>git remote-testgit</td>
<td>协议扩展示例脚本</td>
</tr>
</tbody>
</table>
<h3><a name="2_8"></a>版本库转换和交互相关命令</h3>
<table>
<thead>
<tr>
<th>命令</th>
<th>简要说明</th>
</tr>
</thead>
<tbody>
<tr>
<td>git archimport</td>
<td>导入Arch版本库到Git</td>
</tr>
<tr>
<td>git bundle</td>
<td>提交打包和解包，以便在不同版本库间传递</td>
</tr>
<tr>
<td>git cvsexportcommit</td>
<td>将Git的一个提交作为一个CVS检出</td>
</tr>
<tr>
<td>git cvsimport</td>
<td>导入CVS版本库到Git。或者使用 cvs2git</td>
</tr>
<tr>
<td>git cvsserver</td>
<td>Git的CVS协议模拟器，可供CVS命令访问Git版本库</td>
</tr>
<tr>
<td>git fast-export</td>
<td>将提交导出为 git-fast-import 格式</td>
</tr>
<tr>
<td>git fast-import</td>
<td>其他版本库迁移至Git的通用工具</td>
</tr>
<tr>
<td>git svn</td>
<td>Git 作为前端操作 Subversion</td>
</tr>
</tbody>
</table>
<h3><a name="2_9"></a>合并相关的辅助命令</h3>
<table>
<thead>
<tr>
<th>命令</th>
<th>简要说明</th>
</tr>
</thead>
<tbody>
<tr>
<td>git merge-base</td>
<td>供其他脚本调用，找到两个或多个提交最近的共同祖先</td>
</tr>
<tr>
<td>git merge-file</td>
<td>针对文件的两个不同版本执行三向文件合并</td>
</tr>
<tr>
<td>git merge-index</td>
<td>对index中的冲突文件调用指定的冲突解决工具</td>
</tr>
<tr>
<td>git merge-octopus</td>
<td>合并两个以上分支。参见 git merge 的octopus合并策略</td>
</tr>
<tr>
<td>git merge-one-file</td>
<td>由 git merge-index 调用的标准辅助程序</td>
</tr>
<tr>
<td>git merge-ours</td>
<td>合并使用本地版本，抛弃他人版本。参见 git merge 的ours合并策略</td>
</tr>
<tr>
<td>git merge-recursive</td>
<td>针对两个分支的三向合并。参见 git merge 的recursive合并策略</td>
</tr>
<tr>
<td>git merge-resolve</td>
<td>针对两个分支的三向合并。参见 git merge 的resolve合并策略</td>
</tr>
<tr>
<td>git merge-subtree</td>
<td>子树合并。参见 git merge 的 subtree 合并策略</td>
</tr>
<tr>
<td>git merge-tree</td>
<td>显式三向合并结果，不改变暂存区</td>
</tr>
<tr>
<td>git fmt-merge-msg</td>
<td>供执行合并操作的脚本调用，用于创建一个合并提交说明</td>
</tr>
<tr>
<td>git rerere</td>
<td>重用所记录的冲突解决方案</td>
</tr>
</tbody>
</table>
<h3><a name="2_10"></a>杂项</h3>
<table>
<thead>
<tr>
<th>命令</th>
<th>简要说明</th>
</tr>
</thead>
<tbody>
<tr>
<td>git bisect–helper</td>
<td>由 git bisect 命令调用，确认二分查找进度</td>
</tr>
<tr>
<td>git check-attr</td>
<td>显示某个文件是否设置了某个属性</td>
</tr>
<tr>
<td>git checkout-index</td>
<td>从暂存区拷贝文件至工作区</td>
</tr>
<tr>
<td>git cherry</td>
<td>查找没有合并到上游的提交</td>
</tr>
<tr>
<td>git diff-files</td>
<td>比较暂存区和工作区，相当于 git diff –raw</td>
</tr>
<tr>
<td>git diff-index</td>
<td>比较暂存区和版本库，相当于 git diff –cached –raw</td>
</tr>
<tr>
<td>git diff-tree</td>
<td>比较两个树对象，相当于 git diff –raw A B</td>
</tr>
<tr>
<td>git difftool–helper</td>
<td>由 git difftool 命令调用，默认要使用的差异比较工具</td>
</tr>
<tr>
<td>git get-tar-commit-id</td>
<td>从 git archive 创建的 tar 包中提取提交ID</td>
</tr>
<tr>
<td>git gui–askpass</td>
<td>命令 git gui 的获取用户口令输入界面</td>
</tr>
<tr>
<td>git notes</td>
<td>提交评论管理</td>
</tr>
<tr>
<td>git patch-id</td>
<td>补丁过滤行号和空白字符后生成补丁唯一ID</td>
</tr>
<tr>
<td>git quiltimport</td>
<td>将Quilt补丁列表应用到当前分支</td>
</tr>
<tr>
<td>git replace</td>
<td>提交替换</td>
</tr>
<tr>
<td>git shortlog</td>
<td>对 git log 的汇总输出，适合于产品发布说明</td>
</tr>
<tr>
<td>git stripspace</td>
<td>删除空行，供其他脚本调用</td>
</tr>
<tr>
<td>git submodule</td>
<td>子模组管理</td>
</tr>
<tr>
<td>git tar-tree</td>
<td>过时命令，请使用 git archive</td>
</tr>
<tr>
<td>git var</td>
<td>显示 Git 环境变量</td>
</tr>
<tr>
<td>git web–browse</td>
<td>启动浏览器以查看目录或文件</td>
</tr>
<tr>
<td>git whatchanged</td>
<td>显示提交历史及每次提交的改动</td>
</tr>
<tr>
<td>git-mergetool–lib</td>
<td>包含于其他脚本中，提供合并/差异比较工具的选择和执行</td>
</tr>
<tr>
<td>git-parse-remote</td>
<td>包含于其他脚本中，提供操作远程版本库的函数</td>
</tr>
<tr>
<td>git-sh-setup</td>
<td>包含于其他脚本中，提供 shell 编程的函数库</td>
</tr>
</tbody>
</table>
<p class="source">原文地址：<a href="http://www.yangyunhe.me/2017/git-instructions-intro/" target="_blank">http://www.yangyunhe.me/2017/git-instructions-intro/</a></p>