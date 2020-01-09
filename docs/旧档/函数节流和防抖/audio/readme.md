## audio 在浏览器中自动播放

#### autoplay 属性

autoplay 属性规定一旦音频就绪马上开始播放。
如果设置了该属性，音频将自动播放。

#### 使用 autoplay 属性进行播放

```
    //使用autoplay属性
    var src = "./award.wav";
    var body = document.getElementsByTagName("body")[0];

    if (body.getElementsByTagName("audio").length <= 0) {
      var audio = document.createElement("audio");
      audio.setAttribute("id", "awardAudio");
      audio.setAttribute("autoplay", "autoplay");
      audio.setAttribute("src", src);
      body.appendChild(audio);

      setTimeout(function() {
        body.removeChild(audio);
      }, 2300);
    }

```

#### oncanplaythrough 事件

oncanplaythrough 事件在视频/音频（audio/video）可以正常播放且无需停顿和缓冲时触发。
在视频/音频（audio/video）加载过程中，事件的触发顺序如下:

1. onloadstart
2. ondurationchange
3. onloadedmetadata
4. onloadeddata
5. onprogress
6. oncanplay
7. oncanplaythrough

```
//1
<audio oncanplaythrough="event">
//2
audio.oncanplaythrough=function(){event()};
//3
audio.addEventListener("canplaythrough", event;
```

#### 监听 canplaythrough 事件进行播放

```
    // 监听加载事件执行play方法
    var src = "./award.wav";
    var body = document.getElementsByTagName("body")[0];

    if (body.getElementsByTagName("audio").length <= 0) {
      var audio = document.createElement("audio");
      audio.setAttribute("id", "awardAudio");
      audio.setAttribute("src", src);
      body.appendChild(audio);

      //判断音频是否加载完成?
      audio.addEventListener(
        "canplaythrough",
        function() {
          audio.play();
          setTimeout(function() {
            body.removeChild(audio);
          }, audio.duration * 1000 + 100);
        },
        false
      );
    }
```

> duration 在 autoplay 下回失效,返回 NaN

#### JS 报错:Uncaught (in promise) DOMException: play() failed because the user didn't interact with the document first.

[https://goo.gl/xX8pDD](https://goo.gl/xX8pDD)这里是官方给出的解释,chrome66 之后反正是不能用了

解决方法

1. 在 chrome 浏览器中输入 chrome://flags/#autoplay-policy
2. 在 Autoplay policy 下拉中设置无需用户手势
3. 重启 chrome

或

1. chrome.exe --disable-features=AutoplayIgnoreWebAudio

[MDN->audio](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/audio)

- [MDN->audio 属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/audio)
  - src 歌曲的路径
  - preload 是否在页面加载后立即加载（设置 autoplay 后无效）
  - controls 显示 audio 自带的播放控件
  - loop 音频循环
  - autoplay 音频加载后自动播放
  - currentTime 音频当前播放时间
  - duration 音频总长度
  - ended 音频是否结束
  - muted 音频静音为 true
  - volume 当前音频音量
  - readyState 音频当前的就绪状态
- [MDN->audio 事件](https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Media_events)
  - abort 当音频/视频的加载已放弃时
  - canplay 当浏览器可以播放音频/视频时
  - canplaythrough 当浏览器可在不因缓冲而停顿的情况下进行播放时
  - durationchange 当音频/视频的时长已更改时
  - emptied 当目前的播放列表为空时
  - ended 当目前的播放列表已结束时
  - error 当在音频/视频加载期间发生错误时
  - loadeddata 当浏览器已加载音频/视频的当前帧时
  - loadedmetadata 当浏览器已加载音频/视频的元数据时
  - loadstart 当浏览器开始查找音频/视频时
  - pause 当音频/视频已暂停时
  - play 当音频/视频已开始或不再暂停时
  - playing 当音频/视频在已因缓冲而暂停或停止后已就绪时
  - progress 当浏览器正在下载音频/视频时
  - ratechange 当音频/视频的播放速度已更改时
  - seeked 当用户已移动/跳跃到音频/视频中的新位置时
  - seeking 当用户开始移动/跳跃到音频/视频中的新位置时
  - stalled 当浏览器尝试获取媒体数据，但数据不可用时
  - suspend 当浏览器刻意不获取媒体数据时
  - timeupdate 当目前的播放位置已更改时
  - volumechange 当音量已更改时
  - waiting 当视频由于需要缓冲下一帧而停止

[HTML 5 视频/音频参考手册](http://www.w3school.com.cn/html5/html5_ref_audio_video_dom.asp)
[HTML5 声音引擎 Howler.js](https://github.com/goldfire/howler.js)
[MDN audio](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/audio)
[基于 react 的 audio 组件](https://segmentfault.com/a/1190000007770098)
[HTML5 Audio 的兼容性问题和优化](https://www.codercto.com/a/44412.html)
[html5 audio 音频播放全解析](https://www.cnblogs.com/leinov/p/3896772.html)
[音频 API => AudioContext](https://www.jianshu.com/p/ee1ad766d8a7)
