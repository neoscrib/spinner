/**
 * Created by Tanner Jepsen on 4/16/2016.
 */

import EasingMode from './EasingMode';

/**
 * This class is the base class for many easing functions.
 */
export default abstract class EasingFunction {
    /**
     * Transforms normalized time to control the pace of an animation for the EaseIn EasingMode
     * @param {number} normalizedTime Normalized time (progress) of the animation, which is a value from 0 through 1.
     * @returns {number} A number that represents the transformed progress.
     */
    public abstract easeInCore(normalizedTime: number): number;

    private _easingMode: EasingMode;

    constructor() {
        if (typeof(this.easeInCore) !== 'function') {
            throw new TypeError('Derived classes of EasingFunction must implement the easeInCore method');
        }

        this.easingMode = EasingMode.easeIn;
    }

    /**
     * Transforms normalized time to control the pace of an animation.
     * @param {number} normalizedTime Normalized time (progress) of the animation, which is a value from 0 through 1.
     * @returns {number} A number that represents the transformed progress.
     */
    public ease(normalizedTime: number): number {
        const x: number = normalizedTime;
        const f: (normalizedTime: number) => number = this.easeInCore.bind(this);

        switch (this.easingMode) {
            case EasingMode.easeIn:
                return f(x);
            case EasingMode.easeOut:
                return 1 - f(1 - x);
            case EasingMode.easeInOut:
            default:
                // TODO: something here isn't right
                return (x < 0.5) ?
                    f(x * 2) * 0.5 :
                    1 - f((1 - x) * 2) * 0.5 + 0.5;
        }
    }

    /**
     * Gets a value that specifies how the animation interpolates.
     * @returns {number} Value that specifies how the animation interpolates.
     */
    get easingMode(): EasingMode {
        return this._easingMode;
    }

    /**
     * Sets a value that specifies how the animation interpolates.
     * @param {number} value Value that specifies how the animation interpolates.
     */
    set easingMode(value: EasingMode) {
        this._easingMode = value;
    }
}
