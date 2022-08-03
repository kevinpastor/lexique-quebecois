import { Link, Typography } from "@mui/material";
import classNames from "classnames";
import NextLink from "next/link";
import { ReactElement } from "react";

import { useScrollingDirection } from "@utils/hooks/use-scrolling-direction";

import { Menu } from "./menu";
import { Search } from "./search";

export const Navigation = (): ReactElement => {
    const { isScrollingUp, scrollPosition } = useScrollingDirection();
    const showNavigation: boolean = isScrollingUp;
    const isAtTop: boolean = scrollPosition === 0;

    return (
        <nav
            className={classNames(
                "bg-white z-30 sticky transition-all ease-in-out",
                {
                    "shadow-md": showNavigation && !isAtTop,
                    "top-0": showNavigation,
                    "-top-14": !showNavigation
                }
            )}
        >
            <div className="relative container mx-auto h-14 px-2 flex justify-between gap-4">
                <div className="grow flex justify-center items-center">
                    <div className="grow flex items-center gap-2">
                        <Menu />
                        <Typography variant="h1">
                            <NextLink
                                href="/"
                                passHref
                            >
                                <Link
                                    color="inherit"
                                    underline="none"
                                >
                                    Lexique Québécois
                                </Link>
                            </NextLink>
                        </Typography>

                    </div>
                    <Search />
                </div>
            </div>
        </nav >
    );
};
