/**
 * Created by Tanner Jepsen on 4/20/2016.
 */

import { Vector3 } from '2a/geometry';
import Animation from './Animation';

export default class VectorAnimation extends Animation {
    private _from: Vector3;
    private _to: Vector3;

    /**
     * Initializes a new VectorAnimation with the specified from and to vectors and duration.
     * @param {Vector3} from The from vector.
     * @param {Vector3} to The to vector;
     * @param {number} duration The duration of the animation in milliseconds.
     */
    constructor(from: Vector3, to: Vector3, duration: number) {
        super(duration);
        this.from = from;
        this.to = to;
    }

    /**
     * Gets the from value.
     * @returns {Vector3} The from value.
     */
    get from(): Vector3 {
        return this._from;
    }

    /**
     * Sets the from value.
     * @param {Vector3} value The from value.
     */
    set from(value: Vector3) {
        this._from = value;
    }

    /**
     * Gets the to value.
     * @returns {Vector3} The to value.
     */
    get to(): Vector3 {
        return this._to;
    }

    /**
     * Sets the to value.
     * @param {Vector3} value The to value.
     */
    set to(value: Vector3) {
        this._to = value;
    }

    public getCurrentValue(): Vector3 {
        return Vector3.lerp(this.from, this.to, this.progress);
    }
}
