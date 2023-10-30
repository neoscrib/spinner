export const classNames = (...values: (string | object)[]): string => values.map(value => {
    if (Array.isArray(value)) {
        return classNames(...value);
    }

    switch (typeof value) {
        case 'string': return value;
        case 'object': return Object.entries(value)
            .map(([ key, value ]) => value ? key : undefined)
            .filter(Boolean)
            .join(' ');
        default: return undefined;
    }
}).filter(Boolean).join(' ');
