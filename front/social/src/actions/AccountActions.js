import * as types from '../constants/ActionTypes';

export function registration(name) {
  return {
    type: types.REGISTRATION,
    name
  };
}