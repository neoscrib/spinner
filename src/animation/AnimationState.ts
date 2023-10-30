/**
 * Created by Tanner Jepsen on 4/23/2016.
 */

export default class AnimationState {
    constructor() {
        throw new TypeError('The AnimationState class cannot be instantiated.');
    }

    static get stopped(): number {
        return 1;
    }

    static get running(): number {
        return 2;
    }
}
