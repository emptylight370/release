import os
import re

label = int(input("请选择文件或文本模式:\n1:文件\t2:文本\n"))
# 输入文本
if label == 1:
    path = input('请拖入文件或输入文件路径:')
    path = re.sub("[\"\']", "", path)
    f1 = open(path, mode='r', encoding="utf8")
    txt = f1.readlines()
    f1.close()
    ls1 = txt
elif label == 2:
    txt = input("请输入需要分割的文本，使用空格分割：")
    ls1 = txt.split(" ")
label = input(f"请选择需要去除的文本\n1:英文字符\t2:数字\t3:非英文字符\t4:非数字字符\n1,2可多选")
labels = [0, 0, 0, 0]
regs = ["a-zA-Z", "0-9", "^a-zA-Z", "^0-9"]
reg = "["
for i in label:
    labels[int(i) - 1] = 1
if sum(labels) > 1 and (labels[2] or labels[3]):
    print("不可以哦")
    os.system("pause")
    exit(1)
for i in range(4):
    if labels[i]:
        reg += regs[i]
reg += "]"
f2 = open("output.txt", 'w', encoding="UTF-8")
for a in ls1:
    ab = re.sub(reg, '', a)
    if ab.endswith('\n'):
        f2.write(ab)
    else:
        f2.write(ab + '\n')
f2.close()
print("文件写入完成")
os.system("pause")
