import { Container } from "inversify";

import { AbstractRoute } from "./routes/abstract-route";
import { DefinitionsRoute } from "./routes/definitions-route";

const container: Container = new Container({
    autoBindInjectable: true,
    defaultScope: "Singleton"
});

container.bind<AbstractRoute>(AbstractRoute).to(DefinitionsRoute);

export { container };