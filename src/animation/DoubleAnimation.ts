/**
 * Created by Tanner Jepsen on 4/15/2016.
 */

import Animation from './Animation';

export default class DoubleAnimation extends Animation {
    private _from: number;
    private _to: number;

    constructor(from: number, to: number, duration: number) {
        super(duration);
        this.from = from;
        this.to = to;
    }

    get from(): number {
        return this._from;
    }

    set from(value: number) {
        this._from = value;
    }

    get to(): number {
        return this._to;
    }

    set to(value: number) {
        this._to = value;
    }

    public getCurrentValue(): number {
        return ((this.to - this.from) * this.progress) + this.from;
    }
}
