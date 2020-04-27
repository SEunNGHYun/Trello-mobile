
export const AUTH = 'AUTH';
export const SAVETOKEN = 'SAVETOKEN';
export const LOGOUT = 'LOGOUT';
export const BOARDTITLE = 'BOARDTITLE';
export const CARDNAME = 'CARDNAME';
export const CARDDESCRIPTION = 'CARDDESCRIPTION';
export const CARDDATE = 'CARDDATE';
export const CONTAINERID = 'CONTAINERID';
// 액션 타입 정의

export const LoginAuth = () => ({ type: AUTH });
export const SaveToken = (token) => ({ type: SAVETOKEN, token });
export const LogoutAuth = () => ({ type: LOGOUT });


export const SaveBoardTitle = (boardTitleObj) => ({ type: BOARDTITLE, boardTitleObj });
export const SaveCardName = (cardName) => ({ type: CARDNAME, cardName });
export const SaveCardDescription = (cardDescription) => ({ type: CARDDESCRIPTION, cardDescription });
export const SaveCardDate = (cardDate) => ({ type: CARDDATE, cardDate });
export const SaveContainerID = (containerId) => ({ type: CONTAINERID, containerId });
// export const

const initalTokenStore = {
  SavetokenInStorage: false,
  token: '',
  boardTitleObj: null,
  cardName: null,
  cardDescription: null,
  cardDate: {},
  containerId: null,
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
    case CARDNAME:
      return {
        ...state,
        cardName: action.cardName,
      };
    case CARDDESCRIPTION:
      return {
        ...state,
        cardDescription: action.cardDescription,
      };
    case CARDDATE:
      return {
        ...state,
        cardDate: action.cardDate,
      };
    case CONTAINERID:
      return {
        ...state,
        containerId: action.containerId,
      };
    default:
      return state;
  }
}
