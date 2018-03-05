from openpyxl import Workbook

"""
@desc 写入excel文件
@args excelName 读取文件名
"""


def writeExcel(excelName):
    wb = Workbook()
    sheet = wb.active
    sheet['C3'] = 'hello world'
    for i in range(10):
        sheet['A%d' % (i + 1)].value = i + 1
    sheet['E1'].value = '=SUM(A:A)'
    wb.save(excelName)


writeExcel('b.xlsx')
