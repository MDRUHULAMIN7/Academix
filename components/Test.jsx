"use client"

import { toast } from "sonner";
import { Button } from "./ui/button";


const Test = () => {
    const handleClick = (mode) => {
        mode ? toast.success("Test success") : toast.error("Test error");
    };

    return  <>
    <Button variant="ruhul" size="lg" className="underline" onClick={() => handleClick(true)}>Test Toast from sooner</Button>;

    <p className="text-secondary">Ruhul amin</p>
    </>
    
};

export default Test;
