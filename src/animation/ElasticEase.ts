/**
 * Created by Tanner Jepsen on 4/22/2016.
 */

import EasingFunction from './EasingFunction';

/**
 * Represents an easing function that creates an animation that resembles a spring oscillating back and forth until it
 * comes to rest.
 */
export default class ElasticEase extends EasingFunction {
    private _oscillations: number;
    private _springiness: number;

    /**
     * Initializes a new instance of the ElasticEase class.
     * @param {number} [oscillations=3] The number of times the target slides back and forth over the animation
     * destination. This value must be greater than or equal to 0. The default is 3.
     * @param {number} [springiness=3] A positive number that specifies the stiffness of the spring. The default value
     * is 3.
     */
    constructor(oscillations = 3, springiness = 3) {
        super();
        this.oscillations = oscillations;
        this.springiness = springiness;
    }

    /**
     * Gets the number of times the target slides back and forth over the animation destination.
     * @returns {number} The number of times the target slides back and forth over the animation destination. This value
     * must be greater than or equal to 0. The default is 3.
     *
     */
    get oscillations(): number {
        return this._oscillations;
    }

    /**
     * Sets the number of times the target slides back and forth over the animation destination.
     * @param {number} value The number of times the target slides back and forth over the animation destination. This
     * value must be greater than or equal to 0. The default is 3.
     */
    set oscillations(value: number) {
        this._oscillations = value;
    }

    /**
     * Gets the stiffness of the spring. The smaller the Springiness value is, the stiffer the spring and the faster the
     * elasticity decreases in intensity over each oscillation.
     * @returns {number} A positive number that specifies the stiffness of the spring. The default value is 3.
     */
    get springiness(): number {
        return this._springiness;
    }

    /**
     * Sets the stiffness of the spring. The smaller the Springiness value is, the stiffer the spring and the faster the
     * elasticity decreases in intensity over each oscillation.
     * @param {number} value A positive number that specifies the stiffness of the spring. The default value is 3.
     */
    set springiness(value: number) {
        this._springiness = value;
    }

    /**
     * Transforms normalized time to control the pace of an animation for the EaseIn EasingMode
     * @param {number} normalizedTime Normalized time (progress) of the animation, which is a value from 0 through 1.
     * @returns {number} A number that represents the transformed progress.
     */
    public easeInCore(normalizedTime: number): number {
        const oscillations: number = Math.max(0, this.oscillations);
        const springiness: number = Math.max(0, this.springiness);
        const exponent: number = springiness !== 0
            ? (Math.exp(springiness * normalizedTime) - 1) / (Math.exp(springiness) - 1.0) : normalizedTime;

        return exponent * (Math.sin((Math.PI * 2 * oscillations + Math.PI * 0.5) * normalizedTime));
    }
}
