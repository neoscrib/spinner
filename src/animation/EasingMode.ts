/**
 * Created by Tanner Jepsen on 4/21/2016.
 */

export default class EasingMode {
    constructor() {
        throw new TypeError('The EasingMode class cannot be constructed.');
    }

    /**
     * Interpolation follows the mathematical formula associated with the easing function.
     * @returns {number}
     */
    static get easeIn(): number {
        return 1;
    }

    /**
     * Interpolation uses EaseIn for the first half of the animation and EaseOut for the second half.
     * @returns {number}
     */
    static get easeOut(): number {
        return 2;
    }

    /**
     * Interpolation follows 100% interpolation minus the output of the formula associated with the easing function.
     * @returns {number}
     */
    static get easeInOut(): number {
        return 3;
    }
}
