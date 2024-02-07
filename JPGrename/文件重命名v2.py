import os
filepath=input("请输入文件路径：")
# filepath='r"'+filepath+'"'
print(f"文件路径{filepath}")
print("文件列表：")
num=1
for file in os.listdir(filepath):
    if(num<21):
        print(file)
        num+=1
    else:
        print("......")
        break
ave=input("请输入文件前缀：")
apd=input("请输入文件后缀：")
num=1
for file in os.listdir(filepath):
    os.rename(os.path.join(filepath,file),os.path.join(filepath,"%s%03d"%(ave,num))+"."+apd)
    num+=1