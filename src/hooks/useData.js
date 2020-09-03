import { useEffect, useReducer } from 'react';

const ACTION_TYPES = Object.freeze({
  LOAD_DATA_REQUEST: 'LOAD_DATA_REQUEST',
  LOAD_DATA_SUCCESS: 'LOAD_DATA_SUCCESS',
  LOAD_DATA_FAIL: 'LOAD_DATA_FAIL',
});

const handlers = {
  [ACTION_TYPES.LOAD_DATA_REQUEST]: (state, action) => ({
    ...state,
    isFetching: true,
  }),
  [ACTION_TYPES.LOAD_DATA_SUCCESS]: (state, action) => ({
    ...state,
    data: action.data,
    isFetching: false,
  }),
  [ACTION_TYPES.LOAD_DATA_FAIL]: (state, action) => ({
    ...state,
    error: action.error,
    isFetching: false,
  }),
};

function useDataReducer(state, action) {
  return action.type in handlers ? handlers[action.type](state, action) : state;
}

function useData(getData) {
  const [state, dispatch] = useReducer(useDataReducer, {
    data: null,
    error: null,
    isFetching: false,
  });

  useEffect(() => {
    dispatch({
      type: ACTION_TYPES.LOAD_DATA_REQUEST,
    });
    getData()
      .then(data => dispatch({ type: ACTION_TYPES.LOAD_DATA_SUCCESS, data }))
      .catch(error => dispatch({ type: ACTION_TYPES.LOAD_DATA_FAIL, error }));
  }, [getData]);

  return state;
}

export default useData;
