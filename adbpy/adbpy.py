import sys
import os
import json
import argparse
import time

# 帮助菜单
def helpMenu():
    """    \t  \t  \t\t\t  \t  \t \t\t  \t  \t """
    print("allow_args\t\tallow_value\t\tdescription")
    print("--mode/-m\t\t(None)\t\t\tDefault launch mode")
    print("\t\t\tsetting\t\t\tConfigure settings")
    print("--name/-n\t\t$profile_name\t\tThe profile name you want to launch")
    print("-help\t\t\t(None)\t\t\tShow help menu")
    print("--help/-h\t\t(None)\t\t\tShow default help menu")
    print("--list/-l\t\t(None)\t\t\tShow all profiles")
    print("--version/-v\t\t(None)\t\t\tShow current version")
    print("Notification:")
    print("1.\t模拟器需要支持adb连接方式")
    print("2.\t你需要让程序能够读取到adb,要么是添加环境变量,要么把adb和本程序放在同一个文件夹下")

# 设置菜单
def setMenu():
    with open(f"{dir_path}/adbpy.json", mode='r+', encoding="utf8") as profile:
        content = profile.read()
        setting = json.loads(content)
        print(f"目前的配置文件:{setting}")
        print("请选择需要设置的内容:")
        mode = int(input("1.修改配置文件\n2.添加配置文件\n3.删除配置文件\n4.退出\n:"))
        if mode == 1:
            name = input("请输入需要修改的配置文件名称")
            try:
                mod_name = input("请输入修改后名称(留空不变,可直接回车):")
            except KeyboardInterrupt:
                mod_name = ""
            try:
                mod_emulator = input("请输入修改后启动路径(可留空):")
            except KeyboardInterrupt:
                mod_emulator = ""
            try:
                mod_port = input("请输入修改后端口(可留空):")
            except KeyboardInterrupt:
                mod_port = ""
            try:
                mod_time = input("请输入修改后等待时间(可留空):")
            except KeyboardInterrupt:
                mod_time = ""
            if mod_name:
                if not mod_emulator:
                    mod_emulator = setting[name]["emulator"]
                if not mod_port:
                    mod_port = setting[name]["port"]
                if not mod_time:
                    mod_time = setting[name]["time"]
                setting.pop(name)
                setting[mod_name] = {"emulator": mod_emulator, "port": mod_port, "time": mod_time}
                return
            if mod_emulator:
                setting[name]["emulator"] = mod_emulator
            if mod_port:
                setting[name]["port"] = mod_port
            if mod_time:
                setting[name]["time"] = mod_time
        elif mode == 2:
            name = input("请输入配置文件名(可用于启动):")
            emulator = input("请输入或拖入模拟器的启动图标位置:")
            port = input("请输入模拟器使用的端口号:")
            timeee = input("请输入模拟器一般启动需要的时间,推荐为10秒:")
            if emulator.startswith("\""):
                emulator = emulator[1, -1]
            if emulator.endswith("\""):
                emulator = emulator[0, -2]
            setting[name] = {"emulator": emulator, "port": port, "time": timeee}
        elif mode == 3:
            name = input("请输入需要删除的配置文件名称:")
            setting.pop(name)
        elif mode == 4:
            return
        else:
            print("输入错误")
        profile.seek(0)
        profile.truncate()
        profile.write(json.dumps(setting))
        print("成功写入配置文件")

# 启动adb
def launch(emulator, port, wait_time=10):
    os.startfile(emulator)
    time.sleep(int(wait_time))
    os.system(f"adb connect 127.0.0.1:{port}")

def showCurrentVersion():
    print("Current adbpy's version IS " + VERSION)
    print("当前的adbpy的版本号是" + VERSION)

VERSION = "V2"

# 主函数
if __name__ == "__main__":
    # 读取参数
    parser = argparse.ArgumentParser()
    parser.add_argument("--mode", "-m", help="这是程序的运行模式")
    parser.add_argument("--name", "-n", help="输入配置文件名启动相应配置文件")
    parser.add_argument("-help", help="获取帮助列表", action="store_true")
    parser.add_argument("--list", "-l", help="获取所有配置文件的名称", action="store_true")
    parser.add_argument("--version", "-v", help="显示当前应用的版本号", action="store_true")
    args = parser.parse_args()

    # 读取配置参数
    setting = {}
    if getattr(sys, 'frozen', False) and hasattr(sys, '_MEIPASS'):
        # 程序被打包成单文件可执行文件并运行
        dir_path = os.path.dirname(sys.executable)
    else:
        # 程序在正常的Python环境中运行
        dir_path = os.path.dirname(os.path.realpath(__file__))
    if not os.path.exists(f"{dir_path}/adbpy.json"):
        with open(f"{dir_path}/adbpy.json", mode='w', encoding="utf8"):
            pass

    with open(f"{dir_path}/adbpy.json", mode='r+', encoding="utf8") as profile:
        content = profile.read()
        if content:
            setting = json.loads(content)
        else:
            print("初次使用,需要初始化,以下参数均不可为空")
            profile_name = input("请输入配置文件名(可用于快速启动):")
            emulator = input("请输入或拖入模拟器的启动图标位置:")
            port = input("请输入模拟器使用的端口号(仅数字):")
            timeee = input("请输入模拟器一般启动需要的时间,推荐为10秒(仅数字):")
            if emulator.startswith("\""):
                emulator = emulator[1, -1]
            if emulator.endswith("\""):
                emulator = emulator[0, -2]
            setting[profile_name] = {"emulator": emulator, "port": port, "time": timeee}
            text = json.dumps(setting)
            profile.seek(0)
            profile.truncate()
            profile.write(text)

    # 读取启动参数
    if args.mode:
        if args.mode == "setting":
            setMenu()
    elif args.name:
        launch(setting[args.name]["emulator"], setting[args.name]["port"], setting[args.name]["time"])
    elif args.help:
        helpMenu()
    elif args.list:
        print("目前的配置文件有：")
        for i in setting.keys():
            print("name: " + i, end=", ")
            print("port: " + setting[i]["port"])
    elif args.version:
        showCurrentVersion()
    else:
        print("请选择要执行的操作:")
        mode = int(input("1.设置\n2.启动\n3.帮助\n4.退出\n:"))
        if mode == 1:
            setMenu()
        elif mode == 2:
            print(f"目前的配置文件:{setting}")
            name = input("请输入要启动的配置文件名称:")
            launch(setting[name]["emulator"], setting[name]["port"], setting[name]["time"])
        elif mode == 3:
            helpMenu()
        elif mode == 4:
            sys.exit(0)
        else:
            print("输入错误")
            sys.exit(0)
