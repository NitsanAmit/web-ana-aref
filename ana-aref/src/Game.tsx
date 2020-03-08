import React from "react";
import Answers from "./Answers";
import GameHeaders from "./GameHeaders";
import './Game.css';
import {getRandomQuestion, getRandomAnswers, getInitialHistory} from "./game-utils"

const data_url = "https://raw.githubusercontent.com/NitsanAmit/web-ana-aref/master/ana-aref/src/test_data.json";

export class Game extends React.Component<any, any> {

    state: GameState;
    wordsList: Question[] = [];

    constructor(props: Readonly<any>) {
        super(props);
        this.state = {
            currentQuestion: {
                id: 0,
                german: "",
                hebrew: ""
            },
            answers: [],
            history: {},
            round: 0,
        };
        fetch(data_url)
            .then(res => res.json())
            .then(json => {
                this.wordsList = json;
                const currentQuestion = getRandomQuestion(this.wordsList);
                const answers = getRandomAnswers(this.wordsList, currentQuestion);
                this.setState({
                    currentQuestion,
                    answers,
                    history: getInitialHistory(this.wordsList)
                });
            });
    }

    render() {
        const {currentQuestion, answers, round, history} = this.state;
        return (
            <div className="game-window">
                <GameHeaders german={currentQuestion.german}
                             hebrew={currentQuestion.hebrew}
                             points={round}
                             isFirstTime={history[currentQuestion.id]}
                />
                <Answers answers={answers}
                         correctAnswer={currentQuestion}
                         onCorrect={this.nextQuestion}
                         round={round}
                />
            </div>
        );
    }

    nextQuestion = () => {
        this.setState((prevStat: GameState) => {
                let {currentQuestion, round, history} = prevStat;
                history[currentQuestion.id] = false;
                currentQuestion = getRandomQuestion(this.wordsList, currentQuestion);
                return {
                    round: round + 1,
                    currentQuestion,
                    answers: getRandomAnswers(this.wordsList, currentQuestion),
                    history
                }
            }
        );
    };
}

export interface Question {
    id: number;
    hebrew: string;
    german: string;
}

interface GameState {
    currentQuestion: Question;
    answers: Question[];
    history: { [key: number]: boolean; };
    round: number;
}
