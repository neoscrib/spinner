/**
 * Created by Tanner Jepsen on 4/21/2016.
 */

import EasingFunction from './EasingFunction';

/**
 * Represents an easing function that creates an animated bouncing effect.
 */
export default class BounceEase extends EasingFunction {
    private _bounces: number;
    private _bounciness: number;

    /**
     * Initializes a new instance of the BounceEase class.
     * @param {number} [bounces=3] The number of bounces. The value must be greater than or equal to zero. Negative
     * values resolve to zero. The default is 3.
     * @param {number} [bounciness=2] The value that specifies how bouncy the bounce animation is. This value must be
     * positive. The default value is 2.
     */
    constructor(bounces = 3, bounciness = 2) {
        super();
        this.bounces = bounces;
        this.bounciness = bounciness;
    }

    /**
     * Transforms normalized time to control the pace of an animation for the EaseIn EasingMode
     * @param {number} normalizedTime Normalized time (progress) of the animation, which is a value from 0 through 1.
     * @returns {number} A number that represents the transformed progress.
     */
    public easeInCore(normalizedTime: number): number {
        // The math below is complicated because we have a few requirements to get the correct look for bounce:
        //  1) The bounces should be symetrical
        //  2) Bounciness should control both the amplitude and the period of the bounces
        //  3) Bounces should control the number of bounces without including the final half bounce to get you back to 1.0
        //
        //  Note: Simply modulating a expo or power curve with a abs(sin(...)) wont work because it violates 1) above.
        //

        // Constants
        const bounces: number = Math.max(0, this.bounces);
        let bounciness: number = this.bounciness;

        // Clamp the bounciness so we dont hit a divide by zero
        if (bounciness <= 1) {
            // Make it just over one.  In practice, this will look like 1.0 but avoid divide by zeros.
            bounciness = 1.001;
        }

        const pow: number = Math.pow(bounciness, bounces);
        const oneMinusBounciness: number = 1 - bounciness;

        // 'unit' space calculations.
        // Our bounces grow in the x axis exponentially.  we define the first bounce as having a 'unit' width of 1.0 and compute
        // the total number of 'units' using a geometric series.
        // We then compute which 'unit' the current time is in.
        const sumOfUnits: number = (1 - pow) / oneMinusBounciness + pow * 0.5; // geometric series with only half the last sum
        const unitAtT: number = normalizedTime * sumOfUnits;

        // 'bounce' space calculations.
        // Now that we know which 'unit' the current time is in, we can determine which bounce we're in by solving the geometric equation:
        // unitAtT = (1 - bounciness^bounce) / (1 - bounciness), for bounce.
        const bounceAtT: number = Math.log(-unitAtT * (1 - bounciness) + 1) / Math.log(bounciness);
        const start: number = Math.floor(bounceAtT);
        const end: number = start + 1;

        // 'time' space calculations.
        // We then project the start and end of the bounce into 'time' space
        const startTime: number = (1 - Math.pow(bounciness, start)) / (oneMinusBounciness * sumOfUnits);
        const endTime: number = (1 - Math.pow(bounciness, end)) / (oneMinusBounciness * sumOfUnits);

        // Curve fitting for bounce.
        const midTime: number = (startTime + endTime) * 0.5;
        const timeRelativeToPeak: number = normalizedTime - midTime;
        const radius: number = midTime - startTime;
        const amplitude: number = Math.pow(1 / bounciness, (bounces - start));

        // Evaluate a quadratic that hits (startTime,0), (endTime, 0), and peaks at amplitude.
        return (-amplitude / (radius * radius)) * (timeRelativeToPeak - radius) * (timeRelativeToPeak + radius);
    }

    /**
     * Gets the number of bounces.
     * @returns {number} The number of bounces. The value must be greater than or equal to zero. Negative values resolve
     * to zero. The default is 3.
     */
    get bounces(): number {
        return this._bounces;
    }

    /**
     * Sets the number of bounces.
     * @param {number} value The number of bounces. The value must be greater than or equal to zero. Negative values
     * resolve to zero. The default is 3.
     */
    set bounces(value: number) {
        this._bounces = value;
    }

    /**
     * Gets a value that specifies how bouncy the bounce animation is. Low values of this property result in bounces
     * with little lose of height between bounces (more bouncy) while high values result in dampened bounces (less
     * bouncy).
     * @returns {number} The value that specifies how bouncy the bounce animation is. This value must be positive. The
     * default value is 2.
     */
    get bounciness(): number {
        return this._bounciness;
    }

    /**
     * Sets a value that specifies how bouncy the bounce animation is. Low values of this property result in bounces
     * with little lose of height between bounces (more bouncy) while high values result in dampened bounces (less
     * bouncy).
     * @param {number} value The value that specifies how bouncy the bounce animation is. This value must be positive.
     * The default value is 2.
     */
    set bounciness(value: number) {
        this._bounciness = value;
    }
}
