export const makeRelatedActionTypes = type => {
  return [`${type}_SUCCESS`, `${type}_ERROR`];
};

const getAllIds = byIdList => {
  return byIdList.map(item => item.id);
};

const addById = (newByIdList, state) => {
  return {
    ...state.byId,
    ...newByIdList.reduce((obj, item) => {
      obj[item.id] = item;
      return obj;
    }, {}),
  };
};

const removeById = (deleteIds, state) => {
  const deletedByIdList = { ...state.byId };

  for (const deleteId of deleteIds) {
    delete deletedByIdList[deleteId];
  }

  return deletedByIdList;
};

const addIdInAllIds = (newByIdList, state) => {
  const newAllIds = state.allIds.concat(getAllIds(newByIdList));
  const removedDupulicateIds = new Set(newAllIds);
  return Array.from(removedDupulicateIds);
};

const removeIdInAllIds = (deleteIds, state) => {
  const newAllIdsSet = new Set(state.allIds);
  const deleteIdsSet = new Set(deleteIds);

  for (const id of newAllIdsSet) {
    if (deleteIdsSet.has(id)) {
      newAllIdsSet.delete(id);
    }
  }

  return Array.from(newAllIdsSet);
};

export const reducerUtils = {
  initial: (initialData = {}) => ({
    loading: false,
    byId: initialData,
    allIds: getAllIds(initialData),
    error: null,
  }),
  loading: (prevState = null) => ({
    loading: true,
    byId: prevState ? prevState.byId : null,
    allIds: prevState ? prevState.allIds : null,
    error: null,
  }),
  update: (payload, prevState = null) => {
    return {
      loading: false,
      byId: prevState ? addById(payload, prevState) : payload,
      allIds: prevState ? addIdInAllIds(payload, prevState) : getAllIds(payload),
      error: null,
    };
  },
  delete: (payload, state) => ({
    loading: false,
    byId: removeById(payload, state),
    allIds: removeIdInAllIds(payload, state),
    error: null,
  }),
  error: (error, prevState = null) => ({
    loading: false,
    byId: prevState ? prevState.byId : null,
    allIds: prevState ? prevState.allIds : null,
    error: error,
  }),
};

export const getProjectsByProjectType = (state, action, type) => {
  if (action.type.includes("SUCCESS")) {
    const myProjectIds = action.payload.map(payload => payload.id);
    return { ...state, visibleProjects: { ...state.visibleProjects, [type]: myProjectIds } };
  }

  return state;
};

export const handleAsyncUpdateStateActionsWithNormalize = (type, keepData = false) => {
  const [SUCCESS, ERROR] = makeRelatedActionTypes(type);

  return (state, action) => {
    switch (action.type) {
      case type:
        return { ...state, ...reducerUtils.loading(keepData ? state : null) };
      case SUCCESS:
        return { ...state, ...reducerUtils.update(action.payload, keepData ? state : null) };
      case ERROR:
        return reducerUtils.error(action.payload, keepData ? state : null);
      default:
        return state;
    }
  };
};

export const handleAsyncRemoveStateActionsWithNormalize = type => {
  const [SUCCESS, ERROR] = makeRelatedActionTypes(type);

  return (state, action) => {
    switch (action.type) {
      case type:
        return reducerUtils.loading(state);
      case SUCCESS:
        return reducerUtils.delete(action.payload, state);
      case ERROR:
        return reducerUtils.error(action.payload, state);
      default:
        return state;
    }
  };
};
