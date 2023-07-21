import { Lora } from "next/font/google";

type NextFont = ReturnType<typeof Lora>;

export const font: NextFont = Lora({
    subsets: ["latin"]
});
