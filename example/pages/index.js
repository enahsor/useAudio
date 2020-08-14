import { useAudio } from '../../use-Audio';

import { toCamel } from '../lib/util';

import hookConfig from '../../use-Audio/package.json';

export default function Index() {
  const { name, description, repository = {}, author = {} } = hookConfig;

  const { name: authorName, url: authorUrl } = author;

  const { url: repositoryUrl } = repository;
  const repositoryExists = typeof repositoryUrl === 'string';

  const repositoryUrlDisplay = repositoryExists && repositoryUrl.split('://')[1];

  const url = 'https://opengameart.org/sites/default/files/audio_preview/tyhosidragson.ogg.mp3'

  const audio = useAudio(url);

  return (
    <main>
      <style jsx global>{`
        body {
          font-family: sans-serif;
          padding: 0;
          margin: 0;
        }

        main {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 1em 0;
        }

        h1 {
          font-size: 2em;
        }

        img {
          max-width: 100%;
        }

        pre {
          overflow: auto;
          max-height: 15em;
          background-color: #eeeeee;
          padding: 1em;
        }

        section,
        footer {
          width: 100%;
          max-width: 50em;
          margin: 0 auto;
        }

        footer p {
          font-size: .9em;
        }

        footer p,
        footer a {
          color: #546e7a;
        }
      `}</style>

      <section>

        <h1>{ toCamel(name) }</h1>

        <p>{ description }</p>

        { repositoryExists && (
          <p>
            <a href={repositoryUrl}>
              { repositoryUrlDisplay }
            </a>
          </p>
        )}
        <br></br>
        <h2>How to use</h2>

        <p>
          useAudio can be used in a similar fashion to the <code>Audio()</code> constructor as it's simply a wrapper around this constructor.
          
        </p>
          <br></br>
        

        <code>

        </code>

        <h3>Getting started</h3>
        
        <pre>
          <code>{`
const src = 'https://opengameart.org/sites/default/files/audio_preview/tyhosidragson.ogg.mp3'
const audio = useAudio(src);`}
          </code>          
        </pre>

        <p>All properties and methods exposed by an instantiation of the <code>Audio()</code> constructor should be available for use.</p>
        <pre>
          <code>{
            `
<p>Audio source: {audio.src}</p>
<p>Current time: {audio.currentTime}</p>
<p>Duration: {audio.duration}</p>
<button onClick={() => ''}>{audio.playing ? 'Pause': 'Play'}</button>
            `}           
          </code>
        </pre>
        <br></br>
        <p>Audio source: {audio.src}</p>
        <p>Current time: {audio.currentTime}</p>
        <p>Duration: {audio.duration}</p>
        <button onClick={() => ''}>{audio.playing ? 'Pause': 'Play'}</button>
                  
         
      </section>

      <footer>
        <p>
          Made by <a href={authorUrl}>{ authorName }</a>
        </p>
      </footer>
    </main>
  );

}