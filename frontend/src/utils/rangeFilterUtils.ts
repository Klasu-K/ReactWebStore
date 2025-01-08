const getRangeFilterByName = (filterName: string, rangeFilters: rangeFilter[])  => {
  let rangeFilter = rangeFilters.find(filter => filter[0] === filterName)
  return rangeFilter 
}

const getRangeFilterIndexByName = (filterName: string, rangeFilters: rangeFilter[]) => {
  let filterIndex = rangeFilters.findIndex(filter => filter[0] === filterName)
    if(filterIndex === -1) {
      console.error("could not find filter with name:", filterName)
    }
  return filterIndex
}

const rangeFilterExists = (filterName: string, rangeFilters: rangeFilter[]) => {
  return rangeFilters.some(filter => filter[0] === filterName)
}

export {getRangeFilterByName ,getRangeFilterIndexByName, rangeFilterExists}