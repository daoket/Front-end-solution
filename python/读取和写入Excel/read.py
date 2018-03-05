from openpyxl import load_workbook


"""
@desc 读取excel文件
@args excelName 读取文件名
@args sheetName 读取sheet名
@args readLine 数字为列 字母为行
"""
def readExcel(excelName, sheetName, readLine):
    wb = load_workbook(excelName)
    sheet = wb.get_sheet_by_name(sheetName)
    for i in sheet[readLine]:
        print(i.value, end=',')


readExcel('a.xlsx', 'Sheet2', 'c')
