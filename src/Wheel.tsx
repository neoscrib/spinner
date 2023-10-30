import { createRef, useEffect, useState } from 'react';
import { classNames } from './util';
import * as React from 'react';
import AnimationState from './animation/AnimationState';
import DoubleAnimation from './animation/DoubleAnimation';
import EasingMode from './animation/EasingMode';
import PowerEase from './animation/PowerEase';
import Color from './util/Color';
import MathHelper from './util/MathHelper';
import styles from './Wheel.scss';
import { theme } from './theme';

interface IComponentProps {
    size: number;
    startRotation?: number;
    spinListener: ISpinListener;
    slices: string[];
    onRotationUpdated?(rotation: number): void;
    onItemSelected(item: string): void;
}

const buttonSize = 72;

const measuredText = new Map<String, TextMetrics>();

const measureText = (context: CanvasRenderingContext2D, text: string, font: string) => {
    const key = `${font}::${text}`;
    if (measuredText.has(key)) {
        return measuredText.get(key)
    }

    const measurement = context.measureText(text);
    measuredText.set(key, measurement);
    return measurement;
}

const fillSlice = (context: CanvasRenderingContext2D, cx: number, cy: number, r: number, start: number, end: number, color: string) => {
    context.fillStyle = color;
    context.beginPath();
    context.moveTo(cx, cy);
    context.arc(cx, cy, r, start, end, false);
    context.fill();
}

const drawSliceText = (context: CanvasRenderingContext2D, fontSize: number, text: string, cx: number, cy: number, rotation: number, offset: number, sliceRadians: number) => {
    context.resetTransform();
    const textSize = measureText(context, text, `${fontSize}px sans-serif`);
    context.translate(cx, cy);
    context.rotate(rotation + offset + sliceRadians / 2);
    context.translate(cx - textSize.width - 10, 0);
    context.fillStyle = 'white';
    context.fillText(text, 0, 0);
    context.resetTransform();
};

const drawButton = (context: CanvasRenderingContext2D, cx: number, cy: number, fontSize: number, disabled: boolean)  => {
    const color = disabled ? theme.palette.text.disabled : theme.palette.text.primary;

    const drawButtonBase = (color: string) => {
        context.fillStyle = color;

        const path = new Path2D();
        path.ellipse(cx, cy, buttonSize / 2, buttonSize / 2, 0, 0, Math.PI * 2);
        path.closePath()
        path.moveTo(cx + buttonSize / 2 - 2, cy - 8);
        path.lineTo(cx + buttonSize / 2 + 14, cy);
        path.lineTo(cx + buttonSize / 2 - 2, cy + 8);
        context.fill(path);
    };

    drawButtonBase(theme.palette.background.default);
    drawButtonBase(color);

    context.fillStyle = theme.palette.background.default;
    context.beginPath();
    context.ellipse(cx, cy, buttonSize / 2 - 4, buttonSize / 2 - 4, 0, 0, Math.PI * 2);
    context.closePath();
    context.fill();

    context.resetTransform();
    const textSize = measureText(context, 'spin', `${fontSize}px sans-serif`);
    context.translate(cx - textSize.width / 2, cy + fontSize / 2 - 3);
    context.fillStyle = color;
    context.fillText('spin', 0, 0);
    context.resetTransform();
};

const animate = (context: CanvasRenderingContext2D, slices: string[], size: number, rotation: number, state: AnimationState, resolve?: () => void) => {
    context.fillStyle = 'transparent';
    context.clearRect(0, 0, size, size);

    const cx = size / 2;
    const cy = size / 2;
    const r = size / 2;
    const fontSize = size * 0.03;
    const sliceRadians = (Math.PI * 2) / slices.length;

    context.font = `${fontSize}px sans-serif`;

    for (let i = 0; i < slices.length; i++) {
        const offset = sliceRadians * i;
        const color = Color.parse('red')
            .rotate(MathHelper.toDegrees(offset + sliceRadians / 2))
            .darken(8);
        fillSlice(context, cx, cy, r, offset + rotation, offset + sliceRadians + rotation, color.toString());
        drawSliceText(context, fontSize, slices[i], cx, cy, rotation, offset, sliceRadians);
    }

    drawButton(context, cx, cy, fontSize, state === AnimationState.running);

    resolve?.();
};

const Wheel = ({ slices, spinListener, size, startRotation = 0, onRotationUpdated, onItemSelected }: IComponentProps) => {
    const ref = createRef<HTMLCanvasElement>();
    const [ animationState, setAnimationState ] = useState<AnimationState>(AnimationState.stopped);

    const onClick = () => {
        if (animationState === AnimationState.stopped) {
            spinListener.spin();
        }
    }

    useEffect(() => {
        const context = ref.current.getContext('2d');
        context.imageSmoothingEnabled = true;
        context.imageSmoothingQuality = 'high';

        const start = startRotation % (Math.PI * 2);
        animate(context, slices, size, start, AnimationState.stopped);

        const spin = async () => {
            const target = start + (Math.PI * 24) + (Math.random() * Math.PI * 2);
            const animation = new DoubleAnimation(start, target, 7500);
            const easing = new PowerEase(3);
            easing.easingMode = EasingMode.easeOut;
            animation.easingFunction = easing;
            animation.start();

            console.log(`target: ${target}`);
            let currentState: AnimationState;
            do {
                currentState = animation.state
                setAnimationState(currentState);
                const currentValue = animation.getCurrentValue();
                await new Promise<void>(resolve => {
                    const rotation = currentState === AnimationState.running ? currentValue : target;
                    // console.log(rotation)
                    window.requestAnimationFrame(() => animate(context, slices, size, rotation, currentState, resolve));
                });
            } while (currentState === AnimationState.running);

            const sliceRadians = (Math.PI * 2) / slices.length;
            const normalizedTarget = target % (Math.PI * 2);
            const selectedItem = Math.floor(((Math.PI * 2) - normalizedTarget) / sliceRadians);
            onItemSelected(slices[selectedItem]);
            onRotationUpdated?.(target);
        }

        spinListener.addEventListener('spin', spin);
        return () => spinListener.removeEventListener('spin', spin);
    }, [ size, startRotation, slices ]);

    return (
        <div>
            <canvas ref={ref} width={size} height={size} />
            <div className={classNames(styles.button, { [styles.disabled]: animationState === AnimationState.running })}
                 style={{ left: size / 2 - buttonSize / 2, top: -size / 2 - buttonSize / 2 - 7, width: buttonSize, height: buttonSize, }}
                 onClick={onClick} />
        </div>
    );
}

export default Wheel;
