export default class MathHelper {
    public static readonly radiansDegreesRatio: number = Math.PI / 180;
    public static readonly degreesRadiansRatio: number = 180 / Math.PI;

    public static toRadians(degrees: number): number {
        return MathHelper.radiansDegreesRatio * degrees;
    }

    public static toDegrees(radians: number): number {
        return MathHelper.degreesRadiansRatio * radians;
    }

    public static clamp(value: number, min: number, max: number): number {
        return Math.max(min, Math.min(value, max));
    }

    public static round(value: number, digits: number): number {
        const pow = Math.pow(10, digits);
        return Math.round(value * pow) / pow;
    }
}
