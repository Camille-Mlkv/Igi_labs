import './App.css';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';

import GetMedicinesPage from './screens/Medicines/GetMedicinesPage/GetMedicinesPage';
import CreateMedicinePage from './screens/Medicines/CreateMedicinePage/CreateMedicinePage';
import MedicineInfoPage from './screens/Medicines/MedicineInfoPage/MedicineInfoPage';
import UpdateMedicinePage from './screens/Medicines/UpdateMedicinePage/UpdateMedicinePage';


import NewsPage from './screens/NewsPage/NewsPage';
import QuestionsPage from './screens/QuestionsPage/QuestionPage';
import { HomePage } from './screens/HomePage/HomePage';

import {BrowserRouter,Route,Routes} from 'react-router-dom';
import LoginPage from './screens/LoginPage/LoginPage';
import RegisterPage from './screens/RegisterPage/RegisterPage';


import { TimezoneProvider } from './components/TimezoneContext';
import PrivateRoute from './components/PrivateRoute';

import AgePage from './screens/AgePage/AgePage';
import CountryPage from './screens/CountryPage/CountryPage';


const App=()=> (
  <TimezoneProvider>
    <BrowserRouter>
    <Header />
    <main style={{ minHeight: "87vh" }}>
      <Routes>
        <Route path="/" element={<HomePage />} exact />
        <Route path="/news" element={<NewsPage />} exact />
        <Route path="/questions" element={<QuestionsPage />} exact />
        <Route path="/age" element={<AgePage />} exact />
        <Route path="/country" element={<CountryPage />} exact />

        <Route path="/medicines" element={<GetMedicinesPage/>} />
        <Route path="/medicine/:id" element={<MedicineInfoPage />} />

        <Route path="/create-medicine" element={<PrivateRoute element={<CreateMedicinePage />} />} />
        <Route path="/update-medicine/:id" element={<PrivateRoute element={<UpdateMedicinePage />} />} />

        {/* <Route path="/create-medicine" element={<CreateMedicinePage />} />
        <Route path="/update-medicine/:id" element={<UpdateMedicinePage />} /> */}

        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
        
      </Routes>
    </main>
    <Footer />
  </BrowserRouter>
  </TimezoneProvider>
  
)

export default App;
