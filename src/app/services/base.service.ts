

export interface IBaseService<T> {
    convert(value: number, from: String, to: String): Promise<T>;
    history(value: number, date: Date, from: String, to: String): Promise<T>;
}
