import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import dashboard from './pages/dashboard/dashboard.trans';
import signin from './pages/signin/signin.trans';
import pageNotFound from './pages/404/404page.trans';
import language from './pages/language/language.trans';
import landing from './pages/landing/landing.trans';
import word from './pages/word/word.trans';
import level from './pages/level/level.trans';
import user from './pages/users/user.trans';
import sentence from './pages/sentences/sentence.trans'
import lesson from './pages/lessons/lesson.trans'
import globalTranslation from './translation';

import sideNav from './components/layouts/side-nav/side-nav.trans';

export const resources = ['en', 'pl', 'pt'].reduce(
  (acc, val) => ({
    ...acc,
    [val]: {
      dashboard: dashboard[val as keyof typeof dashboard],
      signin: signin[val as keyof typeof signin],
      pageNotFound: pageNotFound[val as keyof typeof pageNotFound],
      global: globalTranslation[val as keyof typeof globalTranslation],
      language: language[val as keyof typeof language],
      landing: landing[val as keyof typeof landing],
      word: word[val as keyof typeof word],
      sideNav: sideNav[val as keyof typeof sideNav],
      level: level[val as keyof typeof level],
      user: user[val as keyof typeof user],
      sentence: sentence[val as keyof typeof sentence],
      lesson: lesson[val as keyof typeof lesson],

    }
  }),
  {}
);

i18n.use(LanguageDetector).use(initReactI18next).init({
  returnNull: false,
  resources
});
