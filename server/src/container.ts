import { Container } from "inversify";

import { AbstractRoute } from "./routes/abstract-route";
import { WordsRoute } from "./routes/words-route";

const container: Container = new Container({
    autoBindInjectable: true,
    defaultScope: "Singleton"
});

container.bind<AbstractRoute>(AbstractRoute).to(WordsRoute);

export { container };
