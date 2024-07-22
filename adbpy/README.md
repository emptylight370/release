# adbpy(adb launcher)
因为实在不想自己手动打开安卓模拟器再手动连接，所以干脆花点时间把这个过程自动化了。  
现在支持在程序路径下创建和读取配置文件，在里面保存模拟器的启动地址和端口号。在设定的时间后自动连接。  
使用`pyinstaller`打包成单个文件，放在[release](https://github.com/lingfengyu-dreaming/release/releases/)里面了。
> 完美兼容PowerToys的命令行调用。  
> 需要系统可以**直接**调用`adb`。

现在支持的参数有：
- `mode` 程序运行模式
- `name` 直接启动的配置文件名
- `list` 所有配置文件名称
- `version` 当前应用的版本号
