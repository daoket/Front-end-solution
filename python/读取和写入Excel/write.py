from openpyxl import Workbook
wb = Workbook()
sheet = wb.active
sheet['C3'] = 'hello world'
for i in range(10):
    sheet['A%d' % (i+1)].value = i + 1
sheet['E1'].value = '=SUM(A:A)'
wb.save('test.xlsx')