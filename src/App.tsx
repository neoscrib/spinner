import { createRef, useEffect, useState } from 'react';
import * as React from 'react';
import { Button, Card, CardContent, CssBaseline, Dialog, DialogActions, DialogContent, DialogContentText, IconButton, ThemeProvider, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import styles from './App.scss';
import ItemChip from './ItemChip';
import SpinListener from './SpinListener';
import { theme } from './theme';
import Wheel from './Wheel';
import confetti from 'canvas-confetti';

const spinListener = new SpinListener();

const defaultItems: IItem[] = [
    { enabled: true, label: 'Group 1' },
    { enabled: true, label: 'Group 2' },
    { enabled: true, label: 'Group 3' },
    { enabled: true, label: 'Group 4' },
    { enabled: true, label: 'Group 5' }
];

const fetti = () => {
    const duration = 7500;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }

    const interval = window.setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        // since particles fall down, start a bit higher than random
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
};

const saveState = (state: IAppState) => {
    window.localStorage.setItem('state', JSON.stringify(state));
}

const loadState = (): IAppState => {
    const defaultState = {
        rotation: Math.random() * Math.PI * 2,
        items: defaultItems
    };

    try {
        const json = window.localStorage.getItem('state');
        return json ? JSON.parse(json) : defaultState;
    } catch (e) {
        console.error('Failed to load application', e);
        return defaultState;
    }
}

const App = () => {
    const [ rotation, setRotation ] = useState(loadState().rotation);
    const [ items, setItems ] = useState(loadState().items);
    const [ selected, setSelected ] = useState('');
    const [ size, setSize ] = useState(600);

    const containerRef = createRef<HTMLDivElement>();

    useEffect(() => {
        saveState({ rotation, items });
    }, [ rotation, items ]);

    useEffect(() => {
        if (selected) {
            fetti();
        }
    }, [ selected ]);


    useEffect(() => {
        const resize = () => {
            const size = Math.min(containerRef.current.getBoundingClientRect().width - 32, 600);
            setSize(size);
        };

        resize();
        window.addEventListener('resize', resize);
        return () => window.removeEventListener('resize', resize);
    });

    const onUpdate = (oldItem: IItem, newItem: IItem) => setItems(items.map(i => i.label === oldItem.label ? newItem : i));

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline>
                <div className={styles.app} ref={containerRef}>
                    <Card raised>
                        <CardContent>
                            <Typography variant="h5" gutterBottom>Spinner</Typography>
                            <div className={styles.content}>
                                <Wheel onItemSelected={setSelected} spinListener={spinListener} size={size} startRotation={rotation} onRotationUpdated={setRotation} slices={items.filter(i => i.enabled).map(i => i.label)} />
                                <div className={styles.itemsContainer}>
                                    <Typography>Items <IconButton onClick={() => setItems([ ...items, { enabled: true, label: 'Untitled Item', editing: true } ])} ><AddIcon /></IconButton></Typography>
                                    <div className={styles.itemsList}>
                                        {items.map((group, i) => <ItemChip item={group} key={i}
                                                                           onDelete={label => setItems(items.filter(g => g.label !== label))}
                                                                           onUpdate={onUpdate} />)}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Dialog open={!!selected} onClose={() => setSelected('')} maxWidth="sm" fullWidth>
                        <DialogContent>
                            <DialogContentText>
                                <Typography variant="h2" style={{ textAlign: 'center' }}>{selected}</Typography>
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setSelected('')} autoFocus>Close</Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </CssBaseline>
        </ThemeProvider>
    );
}

export default App;