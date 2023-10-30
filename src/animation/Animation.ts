/**
 * Created by Tanner Jepsen on 4/16/2016.
 */

import AnimationState from './AnimationState';
import EasingFunction from './EasingFunction';

export default abstract class Animation {
    public abstract getCurrentValue(): any;

    public startTime: number;

    private _duration: number;
    private _easingFunction: EasingFunction;
    private _timer: number;

    constructor(duration: number) {
        if (typeof(this.getCurrentValue) !== 'function') {
            throw new TypeError('Derived classes of Animation must implement getCurrentValue');
        }

        this.easingFunction = null;
        this.duration = duration;
    }

    /**
     * Starts the animation.
     * @param {number} [interval=null] If specified, the interval in milliseconds at which the callback will be called.
     * @param {function} [callback=null] The callback which will receive the current value every <i>interval</i>
     * milliseconds.
     * @example
     * let anim = new DoubleAnimation(0, 1, 5000);
     * anim.start(50, (sender, e) => {
     *     let currentValue = e.value;
     * });
     */
    public start(interval: number = null, callback: (source: Animation, data: {value: number}) => void = null): void {
        this.startTime = performance.now();

        if (interval && callback) {
            this.stop();

            this._timer = window.setInterval(() => {
                if (this.state === AnimationState.stopped) {
                    callback(this, { value: this.value });
                    this.stop();
                } else {
                    callback(this, { value: this.value });
                }
            }, interval);
        }
    }

    /**
     * Stops the animation timer, if the animation was started with an interval and callback.
     */
    public stop(): void {
        window.clearInterval(this._timer);
    }

    /**
     * Gets the current value.
     * @returns {*}
     */
    get value(): number {
        return this.getCurrentValue();
    }

    /**
     * Gets the duration of the animation.
     * @returns {number} The duration.
     */
    get duration(): number {
        return this._duration;
    }

    /**
     * Sets the duration of the animation.
     * @param {number} value The duration.
     */
    set duration(value: number) {
        this._duration = value;
    }

    /**
     * Gets the progress of the animation from 0 to 1.
     * @returns {number} The progress of the animation.
     */
    get progress(): number {
        if (this.state === AnimationState.stopped) {
            return 1;
        }

        const now: number = performance.now();
        const elapsed: number = now - this.startTime;
        let progress: number = elapsed / this.duration;

        if (this.easingFunction && this.easingFunction.ease && typeof(this.easingFunction.ease) === 'function') {
            progress = this.easingFunction.ease(progress);
        }
        return progress;
    }

    /**
     * Gets the easing function of the animation.
     * @returns {EasingFunction} The easing function.
     */
    get easingFunction(): EasingFunction {
        return this._easingFunction;
    }

    /**
     * Sets the easing function of the animation.
     * @param {EasingFunction} value The easing function.
     */
    set easingFunction(value: EasingFunction) {
        this._easingFunction = value;
    }

    get state(): AnimationState {
        if (this.startTime === undefined) {
            return AnimationState.stopped;
        }

        const now: number = performance.now();
        const elapsed: number = now - this.startTime;
        return elapsed > this.duration ? AnimationState.stopped : AnimationState.running;
    }
}
