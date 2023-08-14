import React from "react";
import { useState } from "react";
import { useEffect } from "react";

export const CountDown = ({ callbackOrder }) => {
    const [counter, setCounter] = React.useState(15);
    useEffect(() => {
        if (counter === 0) {
            callbackOrder();
        }
        let timeoutId = counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [counter]);

    return <span>{counter}</span>;
};
