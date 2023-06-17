import random
import time
import os
import webbrowser

# 这里写实现功能的函数
# 这个是roll骰
def rd(i, ai):
    sum = 0
    for n in range(int(i)):
        sum += random.randint(1, int(ai))
    return sum


# 这里是帮助列表
def help():
    print("==========================")
    print("程序版本：%s" % (versioncode))
    print("帮助列表：")
    print("注意：不支持简写，会报错，请时刻使用全写")
    print("注意：未使用.或。作为前缀的内容都会被认为是内心独白或对话，不会响应")
    print("注意：如果使用过程中出现任何问题请检查本地txt文件排版是否正常")
    print("==========================")
    print("目前支持的指令类型\t内容")
    print(".exit\t\t\t退出")
    print(".help\t\t\t显示帮助列表")
    print(".help example\t\t显示输入示例列表")
    print(".help pc\t\t显示角色卡帮助列表")
    print(".help st\t\t显示属性帮助列表")
    print(".log\t\t\t通过后接参数on或off来决定是否开启记录，使用参数save来强制保存")
    print(".nn\t\t\t更改玩家的称呼，名字与指令之间必须有一个空格")
    print(".r1a聆听\t\t投一个100面骰并在显示结果时输出“聆听的结果”")
    print(".ra聆听\t\t\t投一个100面骰并在显示结果时输出“聆听的结果”")
    print(".r2d100\t\t\t投两个100面骰")
    print(".rd100\t\t\t投一个100面骰")
    print(".r2d100+5\t\t投两个100面骰求和并在结果上加5")
    print(".update\t\t生成更新脚本")
    print("==========================\n")


# 这里是pc的帮助列表
def helppc():
    print("==========================")
    print("角色卡管理帮助列表：")
    print("注意：角色卡仅储存角色姓名、属性等内容")
    print("==========================")
    print("目前支持的指令类型\t内容")
    print(".pc del\t\t删除角色卡，角色名字必须在del后空一空格输入")
    print(".pc new\t\t新建角色卡，角色名字必须在new后空一空格输入")
    print(".pc nn\t\t改名，角色名字必须在nn后空一空格输入")
    print(".pc show\t\t显示本地所有的角色卡，不需要加任何参数")
    print(".pc tag\t\t更换角色卡，角色名字必须在tag后空一空格输入")
    print("==========================\n")


# 这里是st的帮助列表
def helpst():
    print("==========================")
    print("属性管理帮助列表：")
    print("注意：此帮助列表使用.help st呼出")
    print("==========================")
    print("目前支持的指令类型\t内容")
    print(".st add\t\t\t添加角色属性，需要在add后空一个空格输入属性:数值")
    print(".st del\t\t\t删除角色属性，需要在del的后面空一个空格输入要删除的属性")
    print(".st show\t\t显示角色属性，可以在后面接属性名查看单个属性，也可以留空")
    print("==========================\n")


# 这里是示例输入列表
def helpexample():
    print("==========================")
    print("输入示例：\t\t\t内容")
    print("==========================")
    print(".exit\t\t\t\t退出")
    print(".help\t\t\t\t帮助列表")
    print(".help example\t\t\t输入示例")
    print(".help pc\t\t\t角色卡帮助")
    print(".help st\t\t\t属性帮助")
    print(".log on\t\t\t\t开始记录")
    print(".log off\t\t\t停止记录")
    print(".nn 用户名\t\t\t玩家改名")
    print(".pc del 角色卡名\t\t删除角色卡")
    print(".pc new 角色卡名\t\t新建角色卡")
    print(".pc nn 角色卡名\t\t\t角色卡改名")
    print(".pc tag 角色卡名\t\t切换角色卡")
    print(".ra属性名\t\t\t在显示结果时显示对应属性名")
    print(".rd100\t\t\t\t投一个100面骰")
    print(".r2d100\t\t\t\t投两个100面骰")
    print(".rd200+5\t\t\t投一个200面骰再在结果上加5")
    print(".st add 属性:数值 属性:数值\t向当前角色卡添加属性")
    print(".st del 属性\t\t\t删除当前角色卡的属性")
    print(".st show\t\t\t显示当前角色卡的所有属性")
    print(".st show 属性\t\t\t显示当前角色卡的某个属性")
    print(".update\t\t\t检查程序更新")
    print("==========================\n")


# 这里写主函数
if __name__ == "__main__":
    status = bool(1)
    logged = bool(0)
    name = "user"
    versioncode = "0.0.8_python"
    print("欢迎使用骰娘，在开始前请务必使用.help查看帮助列表")
    print("以及，请在开始使用前使用.help example查看本程序的输入示例，本程序并不与正常骰娘保持完全一致")
    record = open("record.txt", mode="a", encoding="UTF-8")
    try:
        playershell = open(".\\player\\launch.txt", mode="a", encoding="UTF-8")
    except:
        os.mkdir("player")
        playershell = open(".\\player\\launch.txt", mode="a", encoding="UTF-8")

    while status:
        command = input("%s:" % (name))
        # 这里进入判定
        if command:
            if command[0] == "." or command[0] == "。":
                # 这里是roll骰
                if command[1] == "r":
                    try:
                        if int(command[2]) > 0 and int(command[2]) <= 9:
                            if command[3] == "d":
                                addin = command.find("+")
                                subin = command.find("-")
                                pluin = command.find("*")
                                divin = command.find("/")
                                if max(addin, subin, pluin, divin) > 0:
                                    res = rd(
                                        command[2],
                                        command[4 : max(addin, subin, pluin, divin)],
                                    )
                                    try:
                                        if addin > 0:
                                            res += int(command[addin + 1 :])
                                        elif subin > 0:
                                            res -= int(command[subin + 1 :])
                                        elif pluin > 0:
                                            res *= int(command[pluin + 1 :])
                                        elif divin > 0:
                                            res /= int(command[divin + 1 :])
                                    except:
                                        print("请注意：目前还不支持r1d100+d3或r1d100+6*9等格式，请分开输入")
                                else:
                                    res = rd(command[2], command[4:])
                                print("%s的结果是%d" % (command, res))
                                # 写入记录
                                if logged == 1:
                                    record.write(
                                        "%s %s 输入指令 %s\n"
                                        % (
                                            time.strftime(
                                                "%Y-%m-%d %H:%M:%S", time.localtime()
                                            ),
                                            name,
                                            command,
                                        )
                                    )
                                    record.write(
                                        "%s 骰娘给出结果%d\n"
                                        % (
                                            time.strftime(
                                                "%Y-%m-%d %H:%M:%S", time.localtime()
                                            ),
                                            res,
                                        )
                                    )
                            elif command[3] == "a":
                                if command[4:].isalpha:
                                    res = rd(1, 100)
                                    print("%s的结果是%d" % (command[4:], res))
                                    # 写入记录
                                    if logged == 1:
                                        record.write(
                                            "%s %s 输入指令 %s"
                                            % (
                                                time.strftime(
                                                    "%Y-%m-%d %H:%M:%S",
                                                    time.localtime(),
                                                ),
                                                name,
                                                command,
                                            )
                                        )
                                        record.write(
                                            "%s 骰娘给出结果%d\n"
                                            % (
                                                time.strftime(
                                                    "%Y-%m-%d %H:%M:%S",
                                                    time.localtime(),
                                                ),
                                                res,
                                            )
                                        )
                            else:
                                print("请注意：仅识别.r1d100格式内容，您可能输入错误")
                    except:
                        try:
                            if command[2] == "a":
                                if command[3:].isalpha:
                                    res = rd(1, 100)
                                    print("%s的结果是%d" % (command[3:], res))
                                    # 写入记录
                                    if logged == 1:
                                        record.write(
                                            "%s %s 输入指令 %s\n"
                                            % (
                                                time.strftime(
                                                    "%Y-%m-%d %H:%M:%S",
                                                    time.localtime(),
                                                ),
                                                name,
                                                command,
                                            )
                                        )
                                        record.write(
                                            "%s 骰娘给出结果%d\n"
                                            % (
                                                time.strftime(
                                                    "%Y-%m-%d %H:%M:%S",
                                                    time.localtime(),
                                                ),
                                                res,
                                            )
                                        )
                            elif command[2] == "d":
                                addin = command.find("+")
                                subin = command.find("-")
                                pluin = command.find("*")
                                divin = command.find("/")
                                if max(addin, subin, pluin, divin) > 0:
                                    res = rd(
                                        command[2],
                                        command[4 : max(addin, subin, pluin, divin)],
                                    )
                                    try:
                                        if addin > 0:
                                            res += int(command[addin + 1 :])
                                        elif subin > 0:
                                            res -= int(command[subin + 1 :])
                                        elif pluin > 0:
                                            res *= int(command[pluin + 1 :])
                                        elif divin > 0:
                                            res /= int(command[divin + 1 :])
                                    except:
                                        print("请注意：目前还不支持rd100+d3格式，请分开输入")
                                else:
                                    res = rd(1, command[3:])
                                print("%s的结果是%d" % (command, res))
                                # 写入记录
                                if logged == 1:
                                    record.write(
                                        "%s %s 输入指令 %s\n"
                                        % (
                                            time.strftime(
                                                "%Y-%m-%d %H:%M:%S", time.localtime()
                                            ),
                                            name,
                                            command,
                                        )
                                    )
                                    record.write(
                                        "%s 骰娘给出结果%d\n"
                                        % (
                                            time.strftime(
                                                "%Y-%m-%d %H:%M:%S", time.localtime()
                                            ),
                                            res,
                                        )
                                    )
                        except:
                            print("请确认ra、rd的格式输入是否正确，不要试图用.r勾引骰娘")
                # 帮助列表
                elif command[1] == "h":
                    if command[1:5] == "help":
                        # 角色卡帮助列表
                        if command[6:] == "pc":
                            helppc()
                        # 角色属性帮助列表
                        elif command[6:] == "st":
                            helpst()
                        # 输入示例列表
                        elif command[6:] == "example":
                            helpexample()
                        # 程序总帮助列表
                        else:
                            help()
                    else:
                        print("使用.help呼出帮助列表")
                # 退出
                elif command[1:] == "exit":
                    status = 0
                    # 写入记录
                    if logged == 1:
                        record.write(
                            "%s %s 输入指令 %s\n"
                            % (
                                time.strftime("%Y-%m-%d %H:%M:%S", time.localtime()),
                                name,
                                command,
                            )
                        )
                        record.write(
                            "%s %s 退出了，停止记录\n"
                            % (
                                time.strftime("%Y-%m-%d %H:%M:%S", time.localtime()),
                                name,
                            )
                        )
                        logged = 0
                    break
                # 改名
                elif command[1] == "n":
                    if command[1:3] == "nn":
                        name1 = name
                        name = command[4:]
                        # 写入记录
                        if logged == 1:
                            record.write(
                                "%s %s 输入指令 %s\n"
                                % (
                                    time.strftime(
                                        "%Y-%m-%d %H:%M:%S", time.localtime()
                                    ),
                                    name,
                                    command,
                                )
                            )
                            record.write(
                                "%s %s 昵称改为 %s\n"
                                % (
                                    time.strftime(
                                        "%Y-%m-%d %H:%M:%S", time.localtime()
                                    ),
                                    name1,
                                    name,
                                )
                            )
                # 记录跑团过程
                elif command[1:4] == "log":
                    # 开始记录
                    if command[5:] == "on":
                        logged = 1
                        record.write(
                            "%s %s 输入指令 %s ，开始记录\n"
                            % (
                                time.strftime("%Y-%m-%d %H:%M:%S", time.localtime()),
                                name,
                                command,
                            )
                        )
                    # 停止记录
                    elif command[5:] == "off":
                        logged = 0
                        record.write(
                            "%s %s 输入指令 %s ，停止记录\n"
                            % (
                                time.strftime("%Y-%m-%d %H:%M:%S", time.localtime()),
                                name,
                                command,
                            )
                        )
                    # 保存记录
                    elif command[5:] == "save":
                        record.close()
                        record = open("record.txt", mode="a", encoding="UTF-8")
                    else:
                        print("输入错误，log仅支持on、off和save属性")
                # 角色卡管理
                elif command[1:3] == "pc":
                    # 新建角色卡
                    if command[4:7] == "new":
                        # 有输入名字
                        if command[8:]:
                            if playershell:
                                playershell.close()
                            playershell = open(
                                ".\player\%s.txt" % (command[8:]),
                                mode="w",
                                encoding="UTF-8",
                            )
                            playershell.write("#%s\n" % (command[8:]))
                            playershell.close()
                            playershell = open(
                                ".\player\%s.txt" % (command[8:]),
                                mode="r+",
                                encoding="UTF-8",
                            )
                            fname = name
                            name = command[8:]
                            # 写入记录
                            if logged == 1:
                                record.write(
                                    "%s %s 输入指令 %s\n"
                                    % (
                                        time.strftime(
                                            "%Y-%m-%d %H:%M:%S", time.localtime()
                                        ),
                                        fname,
                                        command,
                                    )
                                )
                                record.write(
                                    "%s 新建角色卡 %s\n"
                                    % (
                                        time.strftime(
                                            "%Y-%m-%d %H:%M:%S", time.localtime()
                                        ),
                                        name,
                                    )
                                )
                        # 未输入名字
                        else:
                            if playershell:
                                playershell.close()
                            playershell = open(
                                ".\\player\\NewPlayerShell.txt",
                                mode="w",
                                encoding="UTF-8",
                            )
                            playershell.write("#Default\n")
                            playershell.close()
                            playershell = open(
                                ".\\player\\NewPlayerShell.txt",
                                mode="r+",
                                encoding="UTF-8",
                            )
                            name = "未命名"
                            # 写入记录
                            if logged == 1:
                                record.write(
                                    "%s %s 输入指令 %s\n"
                                    % (
                                        time.strftime(
                                            "%Y-%m-%d %H:%M:%S", time.localtime()
                                        ),
                                        name,
                                        command,
                                    )
                                )
                                record.write(
                                    "%s 新建角色卡 %s\n"
                                    % (
                                        time.strftime(
                                            "%Y-%m-%d %H:%M:%S", time.localtime()
                                        ),
                                        name,
                                    )
                                )
                    # 更换角色卡
                    elif command[4:7] == "tag":
                        if command[8:]:
                            if playershell:
                                playershell.close()
                            playershell = open(
                                ".\player\%s.txt" % (command[8:]),
                                mode="r+",
                                encoding="UTF-8",
                            )
                            # 写入记录
                            if logged == 1:
                                record.write(
                                    "%s %s 输入指令 %s\n"
                                    % (
                                        time.strftime(
                                            "%Y-%m-%d %H:%M:%S", time.localtime()
                                        ),
                                        name,
                                        command,
                                    )
                                )
                                record.write("%s 更换角色卡 %s\n" % (name, command[8:]))
                            name = command[8:]
                        else:
                            print("tag后必须空一个空格输入角色名，请检查输入")
                    # 角色卡改名
                    elif command[4:6] == "nn":
                        if command[7:]:
                            fname = str(os.path.basename(".\player\%s.txt" % (name)))
                            playershell.close()
                            lname = command[7:]
                            os.rename(
                                ".\\player\\" + fname, ".\\player\\" + lname + ".txt"
                            )
                            playershell = open(
                                ".\player\%s.txt" % (lname), mode="r+", encoding="UTF-8"
                            )
                            name = lname
                            # 写入记录
                            if logged == 1:
                                record.write(
                                    "%s %s 输入指令 %s\n"
                                    % (
                                        time.strftime(
                                            "%Y-%m-%d %H:%M:%S", time.localtime()
                                        ),
                                        fname,
                                        command,
                                    )
                                )
                                record.write("%s 角色卡 %s 改名为 %s" % (fname, fname, lname))
                                record.write("%s 昵称改为 %s" % (fname, lname))
                        else:
                            print("请在nn后空一个空格输入新名字")
                    # 删除角色卡
                    elif command[4:7] == "del":
                        if command[8:]:
                            if playershell:
                                playershell.close()
                            os.remove(".\player\%s.txt" % (command[8:]))
                            # 写入记录
                            if logged == 1:
                                record.write(
                                    "%s %s 输入指令 %s\n"
                                    % (
                                        time.strftime(
                                            "%Y-%m-%d %H:%M:%S", time.localtime()
                                        ),
                                        fname,
                                        command,
                                    )
                                )
                                record.write("%s 删除角色卡 %s\n" % (name, command[8:]))
                            else:
                                print("请在del后空一个空格输入要删除的角色卡名字")
                    # 显示所有角色卡
                    elif command[4:8] == "show":
                        try:
                            for roots, dirs, files in os.walk("player"):
                                for i in files:
                                    print(i[:-4])
                        except:
                            print("出现错误，请检查输入")
                    else:
                        print("输入错误，请检查拼写或使用.help pc查看支持的指令")
                # 属性管理
                elif command[1:3] == "st":
                    # 属性显示
                    if command[4:8] == "show":
                        if command[9:]:
                            try:
                                playershell.seek(0, 0)
                                for line in playershell.readlines():
                                    if line.find(command[9:]) >= 0:
                                        stsplit = line.split(":")
                                        print(
                                            "%s %s的值为%s"
                                            % (name, stsplit[0], stsplit[1]),
                                            end="",
                                        )
                                        # 写入记录
                                        if logged == 1:
                                            record.write(
                                                "%s %s 输入指令 %s\n"
                                                % (
                                                    time.strftime(
                                                        "%Y-%m-%d %H:%M:%S",
                                                        time.localtime(),
                                                    ),
                                                    fname,
                                                    command,
                                                )
                                            )
                                            record.write(
                                                "%s 查找了属性 %s，数值为 %s\n"
                                                % (name, stsplit[0], stsplit[1])
                                            )
                                        break
                            except:
                                print("查找的属性不存在，请检查输入")
                        else:
                            try:
                                playershell.seek(0, 0)
                                for line in playershell.readlines():
                                    if line[0] == "#":
                                        print("%s的属性列表如下：" % (line[1:]))
                                    elif line[0] != "#":
                                        stsplit = line.split(":")
                                        print(
                                            "%s的值为%s" % (stsplit[0], stsplit[1]), end=""
                                        )
                                # 写入记录
                                if logged == 1:
                                    record.write(
                                        "%s %s 输入指令 %s\n"
                                        % (
                                            time.strftime(
                                                "%Y-%m-%d %H:%M:%S", time.localtime()
                                            ),
                                            fname,
                                            command,
                                        )
                                    )
                                    record.write("%s 查找了全部属性\n" % (name))
                            except:
                                print("查找属性时出现了问题，请检查是否打开角色卡")
                    # 添加属性
                    elif command[4:7] == "add":
                        sttxt = command[8:]
                        stsplit = sttxt.split(" ")
                        for x in stsplit:
                            playershell.seek(0, 2)
                            playershell.write(x + "\n")
                        # 写入记录
                        if logged == 1:
                            record.write(
                                "%s %s 输入指令 %s\n"
                                % (
                                    time.strftime(
                                        "%Y-%m-%d %H:%M:%S", time.localtime()
                                    ),
                                    fname,
                                    command,
                                )
                            )
                            record.write("%s 添加了属性\n" % (name))
                    # 删除属性
                    elif command[4:7] == "del":
                        if command[8:]:
                            sttxt = playershell.readlines()
                            for line in sttxt:
                                if line.find(command[8:]):
                                    line = ""
                                    playershell.truncate(0)
                                    playershell.writelines(sttxt)
                                    # 写入记录
                                    if logged == 1:
                                        record.write(
                                            "%s %s 输入指令 %s\n"
                                            % (
                                                time.strftime(
                                                    "%Y-%m-%d %H:%M:%S",
                                                    time.localtime(),
                                                ),
                                                fname,
                                                command,
                                            )
                                        )
                                        record.write(
                                            "%s 删除了属性 %s\n" % (name, command[8:])
                                        )
                                    break
                    else:
                        print("输入错误，请检查拼写或使用.help st查看支持的指令")
                # 更新脚本
                elif command[1] == "u":
                    if command[2:] == "pdate":
                        print("是否要检查更新？")
                        updatestr = input("是：[Y] 否：[N]")
                        if updatestr == "Y" or updatestr == "y":
                            print("当前程序版本为%s，点击任意键继续" % (versioncode))
                            os.system("pause")
                            webbrowser.open(
                                "https://github.com/lingfengyu-dreaming/lingfengyu-dreaming/tree/main/COC"
                            )
                        else:
                            continue
                # 报错默认处理
                else:
                    print("输入错误，请检查拼写或指令暂未支持，请使用.help查看支持的指令")
        # 非指令内容输入
        else:
            # 写入记录
            if logged == 1:
                record.write(
                    "%s %s 说：%s\n"
                    % (
                        time.strftime("%Y-%m-%d %H:%M:%S", time.localtime()),
                        name,
                        command,
                    )
                )
        playershell.flush()
        record.close()
        record = open("record.txt", mode="a", encoding="UTF-8")
    print("运行结束")
    record.write("---------------------------------------\n")
    record.close()
    playershell.close()
    os.remove(".\\player\\launch.txt")
    os.system("pause")
