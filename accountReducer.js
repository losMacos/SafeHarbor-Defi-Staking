import {initialAccountBalances} from '../main/front-end/constants';

// const ISSERVER = typeof window === "undefined";

export const initializer = (initialValue = initialAccountBalances) => {
  return (JSON.parse(localStorage.getItem("localSteps"))) || initialValue;
}

export const accountReducer = (state, action) => {
  switch (action.type) {
    case "INIT_STEP":
      return action.step;

    case "TO_COUNTRY":
      const {deviceId, problemId} = state

      return {
        brand: {
          id: action.step.element.brandId,
          name: action.step.element.title,
          src: action.step.element.brandInformation.logo.mediaItemUrl,
          slug: action.step.element.slug,
        },
        country: "default_select",
        deviceId: deviceId, 
        problemId: problemId
      }
    default:
      return state;
  }
};

export const toCountrySelect = (step) => ({
  type: "TO_COUNTRY",
  step
});