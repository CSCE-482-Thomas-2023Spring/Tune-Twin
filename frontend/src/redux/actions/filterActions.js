export const setFilter = (filterType, filterValue) => ({
  type: 'SET_FILTER',
  filterType,
  filterValue
});

export const clearFilters = () => ({
  type: 'CLEAR_FILTERS'
});