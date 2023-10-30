export default class SpinListener implements ISpinListener {
    private readonly listeners = new Map<string, Set<EventListenerOrEventListenerObject>>();

    public addEventListener(type: string, callback: EventListenerOrEventListenerObject | null, options?: AddEventListenerOptions | boolean): void;
    public addEventListener(type: string, listener: EventListener | EventListenerObject, options?: AddEventListenerOptions | boolean): void;
    public addEventListener(type: string, callback: EventListenerOrEventListenerObject | null | EventListener | EventListenerObject, options?: AddEventListenerOptions | boolean): void {
        (this.listeners.get(type) ?? this.listeners.set(type, new Set()).get(type)).add(callback);
    }

    public dispatchEvent(event: Event): boolean;
    public dispatchEvent(event: Event): boolean;
    public dispatchEvent(event: Event): boolean {
        Object.defineProperty(event, 'target', { value: this });
        Object.defineProperty(event, 'currentTarget', { value: this });

        if (this.listeners.has(event.type)) {
            for (const listener of this.listeners.get(event.type) ?? []) {
                try {
                    ('handleEvent' in listener ? listener.handleEvent : listener)(event);
                } catch (e) {
                    console.error('Error calling event callback', e);
                }
            }
            return true;
        }
        return false;
    }

    public removeEventListener(type: string, callback: EventListenerOrEventListenerObject | null, options?: EventListenerOptions | boolean): void;
    public removeEventListener(type: string, listener: EventListener | EventListenerObject, options?: EventListenerOptions | boolean): void;
    public removeEventListener(type: string, callback: EventListenerOrEventListenerObject | null | EventListener | EventListenerObject, options?: EventListenerOptions | boolean): void {
        (this.listeners.get(type) ?? this.listeners.set(type, new Set()).get(type)).delete(callback);
    }

    public spin(): void {
        this.dispatchEvent(new CustomEvent<MessageEvent>('spin'));
    }
}
