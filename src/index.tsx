import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './Components/App';
import { mergeStyles } from '@fluentui/react';

mergeStyles({
  ':global(body,html,#root)': {
    margin: 0,
    padding: 0,
    height: '100vh',
  },
});

ReactDOM.render(<App />, document.getElementById('root'));