export declare class KrelToast {
    private dragToast;
    private $wrapper;
    constructor();
    private init;
    toast(text: string, type?: string): void;
    error(text: string): void;
    success(text: string): void;
    private onDragStart;
    private onDragMove;
    private onDragEnd;
    private closeTimeOut;
    private clientX;
}
export declare const toast: KrelToast;
