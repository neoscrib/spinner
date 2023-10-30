/**
 * Created by Tanner Jepsen on 4/22/2016.
 */

import EasingFunction from './EasingFunction';

/**
 * Represents an easing function that creates an animation that accelerates and/or decelerates using a circular function.
 */
export default class CircleEase extends EasingFunction {
    /**
     * Initializes a new instance of the CircleEase class.
     */
    constructor() {
        super();
    }

    /**
     * Transforms normalized time to control the pace of an animation for the EaseIn EasingMode
     * @param {number} normalizedTime Normalized time (progress) of the animation, which is a value from 0 through 1.
     * @returns {number} A number that represents the transformed progress.
     */
    public easeInCore(normalizedTime: number): number {
        const x: number = normalizedTime;
        return 1 - Math.sqrt(1 - x * x);
    }
}
