export const initialState = {
  avatar: '',
  favorites: [],
  appointments: []
}

export const UserReducer = (state, action) => {
  switch (action.type) {
    case 'setAvatar':
      return { ...initialState, avatar: action.payload.avatar }

    default:
      return state
  }
}