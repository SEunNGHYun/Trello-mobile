export const SaveToken = 'SAVETOKEN';
// 액션 타입 정의

export const saveTokenInStore = () => ({ type: SaveToken });

const initalTokenStore = {
  SavetokenInStorage: false,
};

export default function State(state = initalTokenStore, action) {
  switch (action.type) {
    case SaveToken:
      return {
        SavetokenInStorage: true,
      };
    default:
      return state;
  }
}
