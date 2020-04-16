export const AUTH = 'AUTH';
export const SAVETOKEN = 'SAVETOKEN';
// 액션 타입 정의

export const LoginAuth = () => ({ type: AUTH });
export const SaveToken = (token) => ({ type: SAVETOKEN, token });

const initalTokenStore = {
  SavetokenInStorage: false,
  token: '',
};

export default function State(state = initalTokenStore, action) {
  switch (action.type) {
    case AUTH:
      return {
        ...state,
        SavetokenInStorage: true,
      };
    case SAVETOKEN:
      return {
        ...state,
        token: action.token,
      };
    default:
      return state;
  }
}
