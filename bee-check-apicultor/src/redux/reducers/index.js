import { UserReducer} from './UserReducer';
import { ApiarioReducer } from './ApiarioReducer';
import { ColmeiaReducer } from './ColmeiaReducer';
import { VisitaApiarioReducer } from './VisitaApiarioReducer';
import { VisitaColmeiaReducer } from './VisitaColmeiaReducer';
import { IntervencaoReducer } from './IntervencaoReducer';
import { IntervencaoColmeiaReducer } from './IntervencaoColmeiaReducer';
import { combineReducers } from 'redux';

export const Reducers = combineReducers({
  userState: UserReducer,
  apiarioState: ApiarioReducer,
  colmeiaState: ColmeiaReducer,
  visitaApiarioState: VisitaApiarioReducer,
  visitaColmeiaState: VisitaColmeiaReducer,
  intervencaoState: IntervencaoReducer,
  intervencaoColmeiaState: IntervencaoColmeiaReducer,
});
