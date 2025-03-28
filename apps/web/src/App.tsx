import {RouterProvider, createHashRouter} from 'react-router-dom';
import './App.css';
import {Home} from './pages/home/Home';
import {Level} from './pages/level';
import {Levels} from './pages/levels';
import {PrivacyPolicy} from './PrivacyPolicy';

const App = () => {
  const router = createHashRouter(
    [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/levels',
        element: <Levels />,
      },
      {
        path: '/levels/:id',
        element: <Level />,
      },
      {
        path: '/Privacy-Policy',
        element: <PrivacyPolicy />,
      },
    ],
    {basename: '/'}
  );

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
