declare interface IItem {
    enabled: boolean;
    label: string;
    editing?: boolean;
}

declare interface IAppState {
    rotation: number;
    items: IItem[];
}
