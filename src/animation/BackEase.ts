/**
 * Created by Tanner Jepsen on 4/16/2016.
 */

import EasingFunction from './EasingFunction';

/**
 * This class implements an easing function that backs up before going to the destination.
 */
export default class BackEase extends EasingFunction {
    private _amplitude: number;

    /**
     * Initializes a new instance of the BackEase class.
     * @param {number} [amplitude=1] The amplitude of retraction associated with a BackEase animation. This value must
     * be greater than or equal to 0. The default value is 1.
     */
    constructor(amplitude = 1) {
        super();
        this.amplitude = amplitude;
    }

    /**
     * Transforms normalized time to control the pace of an animation for the EaseIn EasingMode
     * @param {number} normalizedTime Normalized time (progress) of the animation, which is a value from 0 through 1.
     * @returns {number} A number that represents the transformed progress.
     */
    public easeInCore(normalizedTime: number): number {
        const x: number = normalizedTime;
        const a: number = this.amplitude;
        return Math.pow(x, 3) - x * a * Math.sin(x * Math.PI);
    }

    /**
     * Gets the amplitude of retraction associated with a BackEase animation.
     * @returns {number} The amplitude of retraction associated with a BackEase animation. This value must be greater
     * than or equal to 0. The default value is 1.
     */
    get amplitude(): number {
        return this._amplitude;
    }

    /**
     * Sets the amplitude of retraction associated with a BackEase animation.
     * @param {number} value The amplitude of retraction associated with a BackEase animation. This value must be
     * greater than or equal to 0.
     */
    set amplitude(value: number) {
        this._amplitude = value;
    }
}
