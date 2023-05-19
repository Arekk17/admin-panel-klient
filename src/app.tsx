import { Routes, Route } from 'react-router-dom';
import { useContext } from 'react';
import NotFoundPage from './pages/404';
import DashboardPage from './pages/dashboard';
import {
  LandingListPage,
  LandingEditPage,
  LandingCreatePage,
} from './pages/landing';
import {
  LanguageCreatePage,
  LanguageEditPage,
  LanguageListPage,
} from './pages/language';
import { UsersListPage } from './pages/users';
import UserCreatePage from './pages/users/create/user-create';
import UserEditPage from './pages/users/edit/user-edit';
import { WordCreatePage, WordEditPage, WordListPage } from './pages/word';
import {
  SentenceListPage,
  SentenceEditPage,
  SentenceCreatePage,
} from './pages/sentences';
import { LevelListPage, LevelEditPage, LevelCreatePage } from './pages/level';
import { LessonListPage, LessonCreatePage } from './pages/lessons';
import SignInPage from './pages/signin';
import PrivateRoute from './components/private-route/private-route';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { AuthContext } from './context/auth-context';
import Cookie from 'js-cookie';

const App = () => {
  const { getState }: any = useContext(AuthContext);
  const { i18n } = useTranslation();

  useEffect(() => {
    const isToken = Cookie.get('token');
    if (isToken) getState();

    const lng = navigator.language;
    i18n.changeLanguage(lng);
  }, []);

  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        {/* Landings */}
        <Route path="/landings" element={<LandingListPage />} />
        <Route path="/landing" element={<LandingCreatePage />} />
        <Route path="/landing/:id" element={<LandingEditPage />} />
        {/* Language */}
        <Route path="/languages" element={<LanguageListPage />} />
        <Route path="/language" element={<LanguageCreatePage />} />
        <Route path="/language/:id" element={<LanguageEditPage />} />
        {/* Users */}
        <Route path="/users" element={<UsersListPage />} />
        <Route path="/user" element={<UserCreatePage />} />
        <Route path="/user/:id" element={<UserEditPage />} />
        {/* Word */}
        <Route path="/words" element={<WordListPage />} />
        <Route path="/word" element={<WordCreatePage />} />
        <Route path="/word/:id" element={<WordEditPage />} />
        {/*Sentence*/}
        <Route path="/sentences" element={<SentenceListPage />} />
        <Route path="/sentence" element={<SentenceCreatePage />} />
        <Route path="/sentence/:id" element={<SentenceEditPage />} />
        {/* Level */}
        <Route path="/levels" element={<LevelListPage />} />
        <Route path="/level" element={<LevelCreatePage />} />
        <Route path="/level/:id" element={<LevelEditPage />} />
        {/*Lesson */}
        <Route path="/lessons" element={<LessonListPage />} />
        <Route path="/lesson" element={<LessonCreatePage />} />
      </Route>
      <Route path="/signin" element={<SignInPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
