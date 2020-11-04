import { combineReducers } from 'redux';

import { UserReducer} from './UserReducer';
import { ApiarioReducer } from './ApiarioReducer';
import { ColmeiaReducer } from './ColmeiaReducer';
import { VisitaReducer } from './VisitaReducer';
import { IntervencaoReducer } from './IntervencaoReducer';
import { RESET_STATE_ON_LOGOUT } from '../actions/userActions/actionsType';

const appReducers = combineReducers({
  userState: UserReducer,
  apiarioState: ApiarioReducer,
  colmeiaState: ColmeiaReducer, 
  visitaState: VisitaReducer,
  intervencaoState: IntervencaoReducer,
})

const rootReducer = (state, action) => {
  if (action.type === RESET_STATE_ON_LOGOUT) {
    state = undefined; // Passar undefined como primeiro parâmetro de um reducer o faz retornar o estado inicial
  }

  return appReducers(state, action);
}

export default rootReducer;