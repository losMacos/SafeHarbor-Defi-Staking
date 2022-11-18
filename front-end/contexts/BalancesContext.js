import { createContext, useReducer } from 'react';

export const BalancesContext = createContext(null);
export const BalancesDispatchContext = createContext(null);

// Context Provider setup
export function BalancesProvidder({ children }) {
  const [balances, dispatch] = useReducer(
    balancesReducer,
    initialBalances
  );

  return (
    <BalancesContext.Provider value={balances}>
      <BalancesDispatchContext.Provider value={dispatch}>
        {children}
      </BalancesDispatchContext.Provider>
    </BalancesContext.Provider>
  );
}

// Reducer Setup
function balancesReducer(balances, action) {
  switch (action.type) {
    case 'updateBalances': {
      return {earnedBalance:action.earnedBalance, stakedBalance: action.stakedBalance, rtBalance:action.rtBalance};
    }
    case 'logOut': {
      return initialBalances;
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

const initialBalances = { 
  rtBalance: undefined,
  stakedBalance: undefined, 
};


