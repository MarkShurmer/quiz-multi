import { RouteObject } from 'react-router';
import { Home } from '../home/Home';
import { Score } from '../score/Score';
import { Question } from '../question/Question';
import { Round } from '../round/Round';

export const routes: Array<RouteObject> = [
  {
    path: '/',
    element: <Home />,
    children: [
      {
        path: 'score',
        element: <Score />,
      },
      {
        path: 'question',
        element: <Question />,
      },
      {
        path: 'round',
        element: <Round />,
      },
    ],
  },
];
