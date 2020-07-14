import uniqBy from "lodash.uniqby"

export interface PaginationState {
  isFetching: boolean
  nextAfterCursor: string | undefined
  pageCount: number
  data: {[key: string]: any}[]
}

/**
 * Creates a reducer to manage pagination, given the actions types to handle,
 * @param {array} types 
 * @param boolean filterUniq This ensures that randomly ordered paginated lists contain unique elements
 */
function paginate({ types }: { types: string[] }, filterUniq = false) {
  if (!Array.isArray(types) || types.length !== 4) {
    throw new Error('Expected types to be an array of four elements.')
  }
  if (!types.every(t => typeof t === 'string')) {
    throw new Error('Expected types to be string')
  }

  const [ requestType, successType, refreshType, failureType ] = types

  const initialState: PaginationState = {
    isFetching: false,
    nextAfterCursor: undefined,
    pageCount: 0,
    data: [],
  }

  function updatePagination(
    state = initialState,
    action: {type: string, [key: string]: any}
  ): PaginationState {

    switch (action.type) {
      case requestType:
        console.log('action request', action, state)
        return {
          ...state,
          isFetching: true
        }
      case successType:
        console.log('action success', action, state)
        const nextData = [
          ...state.data,
          ...action.response.result
        ]; 
        return {
          ...state,
          isFetching: false,
          data: filterUniq ? uniqBy(nextData, item => item.id) : nextData,
          nextAfterCursor: action.response.nextAfterCursor,
          pageCount: state.pageCount + 1
        }
      case refreshType:
        console.log('action refresh', action, state)
        return {
          ...state,
          isFetching: false,
          data: action.response.result,
          nextAfterCursor: action.response.nextAfterCursor,
          pageCount: typeof action.response.nextAfterCursor !== 'undefined' ? state.pageCount + 1 : 0
        }
      case failureType:
        console.log('action failure', action, state)
        return {
          ...state,
          isFetching: false
        }
      default:
        return state
    }
  }

  return updatePagination
}

export default paginate
