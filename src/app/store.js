import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import userReducer from '../features/user/userSlice'
import etablissementReducer from '../features/etablissement/etablissementSlice'
import horraireReducer from '../features/horraire/horraireSlice'
import pointeuseReducer from '../features/pointeuse/pointeuseSlice'
import pointageReducer from '../features/pointage/pointageSlice'
import periodReducer from '../features/period/periodSlice'
import messageReducer from '../features/message/messageSlice'
import maladieReducer from '../features/maladies/maladieSlice'
import documentReducer from '../features/document/documentSlice'
import customerReducer from '../features/customer/customerSlice'
import absenceReducer from '../features/absence/abscenceSlice'
import contratReducer from '../features/contrat/contratSlice'
import avenantReducer from '../features/avenant/avenantSlice'
export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    etablissement: etablissementReducer,
    horraire: horraireReducer,
    pointeuse: pointeuseReducer,
    pointage: pointageReducer,
    period: periodReducer,
    message: messageReducer,
    maladie: maladieReducer,
    document: documentReducer,
    customer: customerReducer,
    absence: absenceReducer,
    contrat: contratReducer,
    avenant: avenantReducer,
  },
})
