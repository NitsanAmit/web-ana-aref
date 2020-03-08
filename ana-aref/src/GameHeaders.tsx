import React from "react";
import './Game.css'

export default function GameHeaders(props) {
    return (
        <>
            <h4 className="h-score">Score: {props.points}</h4>
            <h1 className="h-german">{props.german}</h1>
            <h3 className="h-hebrew" style={{opacity: props.isFirstTime ? 100 : 0}}>{props.hebrew}</h3>
        </>
    );
}