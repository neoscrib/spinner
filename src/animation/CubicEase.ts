/**
 * Created by Tanner Jepsen on 4/22/2016.
 */

import PowerEase from './PowerEase';

/**
 * Represents an easing function that creates an animation that accelerates and/or decelerates using the formula <i>f(t) = t<sup>3</sup></i>.
 */
export default class CubicEase extends PowerEase {
    /**
     * Initializes a new instance of the CubicEase class.
     */
    constructor() {
        super(3);
    }
}
