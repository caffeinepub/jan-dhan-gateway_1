import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type CitizenID = string;
export interface backendInterface {
    requestMoney(arg0: CitizenID): Promise<void>;
}
