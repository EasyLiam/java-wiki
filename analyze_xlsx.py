
import pandas as pd

xlsx = pd.ExcelFile('/root/.openclaw/media/inbound/ç´_æ1---cce5ba51-3360-4b9c-88ee-1fff7862b38f.xlsx')
df = pd.read_excel(xlsx, sheet_name='Sheet1', header=None)

# 提取数据
years_data = []
current_year = None

for idx, row in df.iterrows():
    name = str(row[0]) if pd.notna(row[0]) else ''
    if '四分位数' in name or '中位数' in name:
        if '上四分位数' in name:
            # 新的一年开始
            if current_year is not None:
                years_data.append(current_year)
            year_name = name.split('年')[0] + '年'
            current_year = {
                'year': year_name,
                'A': {'q3': None, 'q2': None, 'q1': None},
                'B': {'q3': None, 'q2': None, 'q1': None},
                'C': {'q3': None, 'q2': None, 'q1': None},
                'enterprises': []
            }
            # 上四分位数 q3
            for col in [1, 2, 3]:
                if pd.notna(row[col]):
                    current_year[['A', 'B', 'C'][col-1]]['q3'] = float(row[col])
        elif '中位数' in name:
            # 中位数 q2
            for col in [1, 2, 3]:
                if pd.notna(row[col]):
                    current_year[['A', 'B', 'C'][col-1]]['q2'] = float(row[col])
        elif '下四分位数' in name:
            # 下四分位数 q1
            for col in [1, 2, 3]:
                if pd.notna(row[col]):
                    current_year[['A', 'B', 'C'][col-1]]['q1'] = float(row[col])
    elif name.startswith('企业') and current_year is not None:
        # 企业数据
        ent = {}
        for col in [1, 2, 3]:
            if pd.notna(row[col]) and str(row[col]).strip() != '':
                ent[['A', 'B', 'C'][col-1]] = float(row[col])
            else:
                ent[['A', 'B', 'C'][col-1]] = None
        current_year['enterprises'].append(ent)

# 添加最后一年
if current_year is not None:
    years_data.append(current_year)

# 统计每个指标各区间的数量
def count_intervals(year_data, indicator):
    q3 = year_data[indicator]['q3']
    q2 = year_data[indicator]['q2']
    q1 = year_data[indicator]['q1']
    
    result = {
        '≥上四分位': 0,
        '≥中位数且＜上四分位': 0,
        '≥下四分位且＜中位数': 0,
        '＜下四分位': 0
    }
    
    for ent in year_data['enterprises']:
        val = ent[indicator]
        if val is None:
            continue
        if val >= q3:
            result['≥上四分位'] += 1
        elif val >= q2:
            result['≥中位数且＜上四分位'] += 1
        elif val >= q1:
            result['≥下四分位且＜中位数'] += 1
        else:
            result['＜下四分位'] += 1
    
    return result

# 输出结果
print('=' * 70)
print('📊 各年份各指标区间统计结果')
print('=' * 70)

for yd in years_data:
    print(f'\n🔸 {yd["year"]}（企业数量: {len(yd["enterprises"])})')
    print('-' * 50)
    for ind in ['A', 'B', 'C']:
        res = count_intervals(yd, ind)
        total = sum(res.values())
        print(f'  指标 {ind}:')
        for k, v in res.items():
            print(f'    {k}: {v} 家')
        print(f'    合计: {total} 家')

# 汇总所有年份
print('\n' + '=' * 70)
print('📈 所有年份汇总')
print('=' * 70)

total_all = {
    'A': {'≥上四分位': 0, '≥中位数且＜上四分位': 0, '≥下四分位且＜中位数': 0, '＜下四分位': 0},
    'B': {'≥上四分位': 0, '≥中位数且＜上四分位': 0, '≥下四分位且＜中位数': 0, '＜下四分位': 0},
    'C': {'≥上四分位': 0, '≥中位数且＜上四分位': 0, '≥下四分位且＜中位数': 0, '＜下四分位': 0}
}

for yd in years_data:
    for ind in ['A', 'B', 'C']:
        res = count_intervals(yd, ind)
        for k in res:
            total_all[ind][k] += res[k]

for ind in ['A', 'B', 'C']:
    print(f'\n指标 {ind}:')
    for k, v in total_all[ind].items():
        print(f'  {k}: {v} 家')
    print(f'  合计: {sum(total_all[ind].values())} 家')
