import os
filepath=input("请输入文件路径：")
# filepath='r"'+filepath+'"'
print(f"文件路径{filepath}")
ave=input("请输入文件前缀：")
num=1
for file in os.listdir(filepath):
    os.rename(os.path.join(filepath,file),os.path.join(filepath,"%s%03d"%(ave,num))+".jpg")
    num+=1