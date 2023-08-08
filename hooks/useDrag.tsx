'use client'
import { useRef, useState } from "react";
import { useDraggable } from "react-use-draggable-scroll";


export default function useDrag() {
    // draggable
    const [mountedStatus, setMountedStatus] = useState(false);

    const dragRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
    const { events: dragEvents } = useDraggable(dragRef, {
        applyRubberBandEffect: true,
        isMounted: mountedStatus, 
    }); // Now we pass the reference to the useDraggable hook:

    return { dragRef, dragEvents, mountedStatus, setMountedStatus };
}

