import MathHelper from './MathHelper';

export default class Color {
    private static readonly regex = /^rgba?\(([^,]+),\s*([^,]+),\s*([^,]+)(?:,\s*([^,]+))?\)$/;

    public r: number;
    public g: number;
    public b: number;
    public a: number;

    public constructor(r: number, g: number, b: number, a: number) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }

    public static parse(color: string): Color {
        if (typeof (HTMLElement.prototype as any).computedStyleMap !== 'function') {
            return new Color(0, 0, 0, 1);
        }

        const x = document.createElement('span');
        x.style.color = color;
        x.style.display = 'none';
        document.body.appendChild(x);
        const c = (x as any).computedStyleMap().get('color').toString();
        x.remove();

        const m = Color.regex.exec(c);
        if (m !== null) {
            const r = parseInt(m[1], 10);
            const g = parseInt(m[2], 10);
            const b = parseInt(m[3], 10);
            const a = m.length === 5 && !isNaN(parseFloat(m[4])) ? parseFloat(m[4]) : undefined;
            return new Color(r, g, b, a);
        }
        return new Color(0, 0, 0, 1);
    }

    public set(color: { r?: number, g?: number, b?: number, a?: number }): Color {
        if (!isNaN(color.r)) {
            this.r = color.r;
        }

        if (!isNaN(color.g)) {
            this.g = color.g;
        }

        if (!isNaN(color.b)) {
            this.b = color.b;
        }

        if (!isNaN(color.a)) {
            this.a = color.a;
        }

        return this;
    }

    public add(color: { r?: number, g?: number, b?: number, a?: number }): Color {
        if (!isNaN(color.r)) {
            this.r += color.r;
        }

        if (!isNaN(color.g)) {
            this.g += color.g;
        }

        if (!isNaN(color.b)) {
            this.b += color.b;
        }

        if (!isNaN(color.a)) {
            this.a += color.a;
        }

        return this;
    }

    public lighten(percentage: number = 10): Color {
        return this.add(Color.parse(`hsl(0, 0%, ${percentage}%)`));
    }

    public darken(percentage: number = 10): Color {
        const c = Color.parse(`hsl(0, 0%, ${percentage}%)`);
        return this.add({ r: -c.r, g: -c.g, b: -c.b });
    }

    public rotate(degrees: number): Color {
        const { h, s, l } = this.toHSL();
        let hue = (h + degrees) % 360;
        if (hue < 0) {
            hue += 360;
        }
        return Color.parse(`hsla(${hue}deg, ${s * 100}%, ${l * 100}%, ${this.a ?? 1})`);
    }

    public toHSL(): { h: number, s: number, l: number, a: number, toString: () => string } {
        const r = this.r / 255;
        const g = this.g / 255;
        const b = this.b / 255;
        const max = Math.max(r, Math.max(g, b));
        const min = Math.min(r, Math.min(g, b));
        const c = max - min;
        const l = (max + min) / 2;
        let h = 60 * (c === 0 ? 0 : max === r ? (g - b) / c : max === g ? ((b - r) / c) + 2 : ((r - g) / c) + 4);
        if (h < 0) {
            h += 360;
        }
        const s = max || (c / max);
        return { h, s, l, a: this.a, toString: () => `hsla(${h}deg, ${s * 100}%, ${l * 100}%, ${this.a ?? 1})` };
    }

    public toString(): string {
        const r = Math.floor(MathHelper.clamp(this.r, 0, 255));
        const g = Math.floor(MathHelper.clamp(this.g, 0, 255));
        const b = Math.floor(MathHelper.clamp(this.b, 0, 255));
        const a = this.a !== undefined ? MathHelper.clamp(this.a, 0, 1) : undefined;
        return a !== undefined && a < 1.0
            ? `rgba(${r}, ${g}, ${b}, ${a})` : `rgb(${r}, ${g}, ${b})`;
    }

    public toHtmlString(): string {
        const hex = (n: number) => n.toString(16).padStart(2, '0').toLowerCase();
        const r = Math.floor(MathHelper.clamp(this.r, 0, 255));
        const g = Math.floor(MathHelper.clamp(this.g, 0, 255));
        const b = Math.floor(MathHelper.clamp(this.b, 0, 255));
        const a = this.a !== undefined ? Math.floor(MathHelper.clamp(this.a, 0, 1) * 255) : undefined;
        return a !== undefined && a < 255 ? `#${hex(r)}${hex(g)}${hex(b)}${hex(a)}` : `#${hex(r)}${hex(g)}${hex(b)}`;
    }
}
