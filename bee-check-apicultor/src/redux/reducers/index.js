import { UserReducer} from './UserReducer';
import { ApiarioReducer } from './ApiarioReducer';
import { ColmeiaReducer } from './ColmeiaReducer';
import { VisitaReducer } from './VisitaReducer';
import { IntervencaoReducer } from './IntervencaoReducer';
import { combineReducers } from 'redux';

export const Reducers = combineReducers({
  userState: UserReducer,
  apiarioState: ApiarioReducer,
  colmeiaState: ColmeiaReducer,
  visitaState: VisitaReducer,
  intervencaoState: IntervencaoReducer,
});
