import classNames from "classnames";
import { Children, cloneElement, isValidElement, PropsWithChildren, ReactElement, RefObject, useRef } from "react";
import { Transition, TransitionStatus } from "react-transition-group";

interface Props {
    show: boolean;
}

export const FadeInOut = ({ show, children }: PropsWithChildren<Props>): ReactElement => {
    const ref: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

    return (
        <Transition
            in={show}
            timeout={150}
            nodeRef={ref}
        >
            {(status: TransitionStatus): ReactElement | null => (
                status === "exited"
                    ? null
                    : (
                        <>
                            {isValidElement(children) && Children.map(children, (child: ReactElement): ReactElement => (
                                cloneElement(child, {
                                    className: classNames(
                                        typeof child.props.className === "string" ? child.props.className as string : "",
                                        {
                                            "animate-fade-in": status === "entering",
                                            "animate-fade-out": status === "exiting"
                                        }
                                    ),
                                    ref: ref
                                })
                            ))}
                        </>
                    )
            )}
        </Transition>
    );
};
