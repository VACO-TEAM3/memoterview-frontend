import { useState } from "react";

const initialState = {
  inputValue: "",
  searchViewList: [],
  searchItemFocusIndex: -1,
};

export default function useSearchField({ onSearchInputChange, onSelectSearchResult }) {
  const [searchState, setSearchState] = useState(initialState);

  function handleInputChange(event) {
    const inputValue = event.target.value.trim();

    if (!inputValue) {
      return setSearchState(initialState);
    }

    setSearchState({
      ...searchState,
      inputValue,
      searchItemFocusIndex: 0,
    });

    onSearchInputChange(inputValue, viewSearchList);
  }

  function handleKeyDown(event) {
    const key = event.key;
    const currentFocusIndex = searchState.searchItemFocusIndex;
    const maximumIndex = searchState.searchViewList.length - 1;

    switch (key) {
      case "ArrowUp":
        event.preventDefault();
        const prevFocusIndex =
        currentFocusIndex > -1 ? currentFocusIndex - 1 : -1;

        return setSearchState({
          ...searchState,
          searchItemFocusIndex: prevFocusIndex,
        });

      case "ArrowDown":
        event.preventDefault();
        const nextFocusIndex =
          currentFocusIndex < maximumIndex
            ? currentFocusIndex + 1
            : maximumIndex;

        return setSearchState({
          ...searchState,
          searchItemFocusIndex: nextFocusIndex,
        });

      case "Enter":
        setSearchState(initialState);
        onSelectSearchResult(searchState.searchViewList[currentFocusIndex]);
    }
  }

  function viewSearchList(searchViewList) {
    setSearchState((state) => ({
      ...state,
      searchViewList,
    }));
  }

  return { searchState, handleInputChange, handleKeyDown };
}
