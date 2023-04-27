import { getApiUrl } from '../api/api-fetcher';
import { useLoaderData } from 'react-router';
import { Game } from '../app-state/state-types';
import './Home.css';
import { Link } from 'react-router-dom';

export async function loader() {
  const resp = await fetch(getApiUrl());
  if (resp.ok) {
    return await resp.json();
  }
  throw new Error('Unable to load game data');
}

export function Home() {
  //const [questions, setQuestionState] = useRecoilState(questionsState);
  const questions = useLoaderData() as Game;

  // useEffect(() => {
  //   async () => {
  //     const resp = await fetch(API_URL);
  //     if (resp.ok) {
  //       setQuestionState(await resp.json());
  //     }
  //   };
  // }, []);

  return (
    <section className="page-container">
      <header className="page-header">
        <h1>CAE</h1>
        <h2>{questions.name}</h2>
      </header>

      <ul className="list">
        {questions.activities.map((act) => (
          <li key={act.activity_name}>
            <div className="item">{act.activity_name}</div>
          </li>
        ))}

        {['three', 'four', 'five'].map((inactive) => (
          <li key={inactive}>
            <div className="item inactive-item">activity {inactive}</div>
          </li>
        ))}
      </ul>
      <Link to="/results" aria-label="Results" className="results">
        RESULTS
      </Link>
    </section>
  );
}
