import { Method } from "@models/method";
import { MethodHandler } from "./method-handler";

export type MethodHandlers = {
    [method in Method]?: MethodHandler;
};
