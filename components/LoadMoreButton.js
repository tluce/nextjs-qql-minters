import { Button } from "@web3uikit/core";
import { useState } from "react";

export default function LoadMoreButton({ loading, fetchedAllData, action }) {
    const [visible, setVisible] = useState(true);

    const toggleVisibility = () => {
        setVisible((prev) => !prev);
    };

    return (
        <div className={!visible || loading || fetchedAllData ? "invisible" : "visible"}>
            <Button
                onClick={() => {
                    setVisible(false);
                    action(toggleVisibility);
                }}
                text="Load More"
                theme="outline"
            />
        </div>
    );
}
