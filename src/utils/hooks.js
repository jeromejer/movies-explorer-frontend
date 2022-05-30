import { useState, useEffect } from "react";

export const useWindowWidthResize = () => {
    const getWindowWidth = () => document.body.clientWidth;
    const [width, setWidth] = useState(getWindowWidth());

    const onResize = () => setTimeout(()=>setWidth(getWindowWidth()), 300);

    useEffect(()=>{
        window.addEventListener('resize', onResize);
        return ()=>window.removeEventListener('resize', onResize);
    }, []);

    return width;
};