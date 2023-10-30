/**
 * Created by Tanner Jepsen on 4/21/2016.
 */

import EasingFunction from './EasingFunction';

/**
 * Represents an easing function that creates an animation that accelerates and/or decelerates using the formula <i>f(t) = t<sup>p</sup></i>
 * where p is equal to the Power property.
 */
export default class PowerEase extends EasingFunction {
    private _power: number;

    /**
     * Initializes a new instance of the PowerEase class.
     * @param {number} [power=2] The exponential power of the animation interpolation. This value must be greater or
     * equal to 0. The default is 2.
     */
    constructor(power = 2) {
        super();
        this.power = power;
    }

    /**
     * Transforms normalized time to control the pace of an animation for the EaseIn EasingMode
     * @param {number} normalizedTime Normalized time (progress) of the animation, which is a value from 0 through 1.
     * @returns {number} A number that represents the transformed progress.
     */
    public easeInCore(normalizedTime: number): number {
        const x: number = normalizedTime;
        const p: number = this.power;
        return Math.pow(x, p);
    }

    /**
     * Gets the exponential power of the animation interpolation. For example, a value of 7 will create an animation
     * interpolation curve that follows the formula <i>f(t) = t<sup>7</sup></i>.
     * @returns {number} The exponential power of the animation interpolation. This value must be greater or
     * equal to 0. The default is 2.
     */
    get power(): number {
        return this._power;
    }

    /**
     * Sets the exponential power of the animation interpolation. For example, a value of 7 will create an animation
     * interpolation curve that follows the formula <i>f(t) = t<sup>7</sup></i>.
     * @param {number} value The exponential power of the animation interpolation. This value must be greater or
     * equal to 0. The default is 2.
     */
    set power(value: number) {
        this._power = value;
    }
}
