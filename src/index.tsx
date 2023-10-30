import * as React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

window.addEventListener('load', () => {
    const main = document.querySelector('main');
    main.style.padding = '16px';
    const root = createRoot(main);
    root.render(<App />);
});
