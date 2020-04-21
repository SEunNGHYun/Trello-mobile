
export const AUTH = 'AUTH';
export const SAVETOKEN = 'SAVETOKEN';
export const LOGOUT = 'LOGOUT';
export const BOARDTITLE = 'BOARDTITLE';
// 액션 타입 정의

export const LoginAuth = () => ({ type: AUTH });
export const SaveToken = (token) => ({ type: SAVETOKEN, token });
export const LogoutAuth = () => ({ type: LOGOUT });
export const SaveBoardTitle = (boardTitleObj) => ({ type: BOARDTITLE, boardTitleObj });

const initalTokenStore = {
  SavetokenInStorage: false,
  token: '',
  boardTitleObj: null,
};

export default function State(state = initalTokenStore, action) {
  console.log('action', action);
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
    case LOGOUT:
      return {
        ...state,
        SavetokenInStorage: false,
      };
    case BOARDTITLE:
      return {
        ...state,
        boardTitleObj: action.boardTitleObj,
      };
    default:
      return state;
  }
}
