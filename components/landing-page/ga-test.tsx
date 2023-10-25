'use client'
import { useEffect } from "react";
import ReactGA from "react-ga4";


export default function GaTest() {

    useEffect(() => {
        ReactGA.initialize("G-J942NQQLB8");
        ReactGA.send({ hitType: "event", eventCategory: "test", eventAction: "test", eventLabel: "test"});
        // ReactGA.send({ hitType: "pageview", page: "/ga-test", title: "ga-test" })
    }, []);

    return <div id="ga-test"></div>;
}