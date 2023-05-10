export const cartInitialState = JSON.parse(window.localStorage.getItem('cart')) || [];

export const updateLocalStorage = (state) => {
  window.localStorage.setItem('cart', JSON.stringify(state));
}

export const CART_ACTION_TYPE = {
  ADD_TO_CART: "ADD_TO_CART",
  REMOVE_FROM_CART: "REMOVE_FROM_CART",
  REMOVE_ALL_FROM_ONE: "REMOVE_ALL_FROM_ONE",
  CLEAR_CART: "CLEAR_CART",
};

export const cartReducer = (state, action) => {
  const { type: actionType, payload: actionPayload } = action;

  switch (actionType) {
    case CART_ACTION_TYPE.ADD_TO_CART: {
      const { id } = actionPayload;
      const productInCartIndex = state.findIndex((item) => item.id === id);

      if (productInCartIndex >= 0) {
        const newState = structuredClone(state);
        newState[productInCartIndex].quantity += 1;
        updateLocalStorage(newState);
        return newState;
      }

      const newState = [
        ...state,
        {
          ...actionPayload,
          quantity: 1,
        },
      ];
      updateLocalStorage(newState);
      return newState;
    }

    case CART_ACTION_TYPE.REMOVE_FROM_CART: {
      const { id } = actionPayload;

      const productInCartIndex = state.findIndex((item) => item.id === id);

      if (productInCartIndex >= 0) {
        const newState = structuredClone(state);
        if (newState[productInCartIndex].quantity === 1) {
          const newState = state.filter((item) => item.id !== id);
          updateLocalStorage(newState);
          return newState;
        } else {
          newState[productInCartIndex].quantity -= 1;
          updateLocalStorage(newState);
          return newState;
        }
      }
    }

    case CART_ACTION_TYPE.REMOVE_ALL_FROM_ONE: {
      const { id } = actionPayload;
      const newState = state.filter((item) => item.id !== id);
      updateLocalStorage(newState);
      return newState
    }

    case CART_ACTION_TYPE.CLEAR_CART: {
      updateLocalStorage([]);
      return [];
    }
  }

  return state;
};
