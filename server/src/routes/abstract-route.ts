import { Router } from "express";

export abstract class AbstractRoute {

    public abstract get(): Router;

}