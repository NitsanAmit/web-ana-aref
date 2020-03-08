import React from "react";
import {AnswerButton} from "./AnswerButton";
import './Game.css';

export default function Answers(props) {
    return props.answers.map(a =>
        <AnswerButton
            key={a.id + "_" + props.round}
            text={a.hebrew}
            isCorrect={a === props.correctAnswer}
            onCorrect={props.onCorrect}
        />
    )
}