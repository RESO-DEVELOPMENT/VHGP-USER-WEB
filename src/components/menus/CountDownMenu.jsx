import React from "react";

const CountDownMenu = ({ total, hours, minutes, seconds }) => {
    if (total) {
        return (
            <span className="count-down">
                <span
                    style={{
                        background: "var(--primary)",
                        color: "#fff",
                        fontWeight: 600,
                        fontSize: "0.9rem",
                        padding: "2px 4px",
                        transition: "all 0.3s",
                        WebkitTransition: "0.3s all",
                        borderRadius: 3,
                    }}
                >
                    {hours < 10 ? "0" + hours : hours}
                </span>
                :
                <span
                    style={{
                        background: "var(--primary)",
                        color: "#fff",
                        fontWeight: 600,
                        fontSize: "0.9rem",
                        padding: "2px 4px",
                        transition: "all 0.3s",
                        WebkitTransition: "0.3s all",
                        borderRadius: 3,
                    }}
                >
                    {minutes < 10 ? "0" + minutes : minutes}
                </span>
                :
                <span
                    style={{
                        background: "var(--primary)",
                        color: "#fff",
                        fontWeight: 600,
                        fontSize: "0.9rem",
                        padding: "2px 4px",
                        transition: "all 0.3s",
                        WebkitTransition: "0.3s all",
                        borderRadius: 3,
                    }}
                >
                    {seconds < 10 ? "0" + seconds : seconds}
                </span>
            </span>
        );
    } else {
        return (
            <span className="count-down">
                <span
                    style={{
                        background: "var(--primary)",
                        color: "#fff",
                        fontWeight: 600,
                        fontSize: "0.9rem",
                        padding: "2px 4px",
                        transition: "all 0.3s",
                        WebkitTransition: "0.3s all",
                        borderRadius: 3,
                    }}
                >
                    {"00"}
                </span>
                :
                <span
                    style={{
                        background: "var(--primary)",
                        color: "#fff",
                        fontWeight: 600,
                        fontSize: "0.9rem",
                        padding: "2px 4px",
                        transition: "all 0.3s",
                        WebkitTransition: "0.3s all",
                        borderRadius: 3,
                    }}
                >
                    {"00"}
                </span>
                :
                <span
                    style={{
                        background: "var(--primary)",
                        color: "#fff",
                        fontWeight: 600,
                        fontSize: "0.9rem",
                        padding: "2px 4px",
                        transition: "all 0.3s",
                        WebkitTransition: "0.3s all",
                        borderRadius: 3,
                    }}
                >
                    {"00"}
                </span>
            </span>
        );
    }
};

export default CountDownMenu;
