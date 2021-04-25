export const totalResultHeadFixedFilters = ["평가", "지원자"];
const totalResultMidFilters = ["응답점수", "질문개수"];
const totalResultTailFilters = ["면접시간", "면접일자"];

function transFilterOptions(filters, defaultChecked) {
  return filters.map((filter) => ({
    filter,
    checked: defaultChecked,
  }));
}

export function getDefaultTotalResultFilters(customFilters) {
  const midFilterOptions = transFilterOptions(totalResultMidFilters, true);
  const customFilterOptions = transFilterOptions(customFilters, false);
  const tailFilterOptions = transFilterOptions(totalResultTailFilters, false);
  return [...midFilterOptions, ...customFilterOptions, ...tailFilterOptions];
}

export function getFiltersFromFilterOptions(filterOptions) {
  const checkedFilters = filterOptions.filter((filterOption) => filterOption.checked).map((filterOption) => filterOption.filter);

  return [...totalResultHeadFixedFilters, ...checkedFilters];
}
