from openpyxl import load_workbook
wb = load_workbook('test.xlsx')
sheet = wb.get_sheet_by_name('Sheet')
for i in sheet['C']:
    print(i.value, end=' ')