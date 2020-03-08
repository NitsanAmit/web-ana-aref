import React from "react";
import {Answers} from "./Answers";
import GameHeaders from "./GameHeaders";
import './Game.css';
import data from './test_data.json'

export class Game extends React.Component<any, any> {

    state: GameState;
    wordsList: Question[];

    constructor(props: Readonly<any>) {
        super(props);
        this.wordsList = data;
        const selectedQuestion = this.getRandomQuestion();
        const answers = this.randomizeAnswers(selectedQuestion);
        this.state = {
            currentQuestion: selectedQuestion,
            answers: answers,
            guessStatus: this.generateStatus(answers),
            history: this.getInitialHistory(),
            round: 0,
        }
    }

    render() {
        return (
            <div className="game-window">
                <GameHeaders german={this.state.currentQuestion.german}
                             hebrew={this.state.currentQuestion.hebrew}
                             points={this.state.round}
                             isFirstTime={this.state.history[this.state.currentQuestion.id]}
                />
                <Answers answers={this.state.answers}
                         correctAnswer={this.state.currentQuestion}
                         onCorrect={this.nextQuestion}
                         round={this.state.round}
                />
            </div>
        );
    }

    getRandomQuestion(prev ?: Question) {
        let number = Math.floor(Math.random() * this.wordsList.length);
        while (this.wordsList[number] === prev) {
            number = Math.floor(Math.random() * this.wordsList.length);
        }
        return this.wordsList[number];
    }

    randomizeAnswers(correctAnswer: Question) {
        const answers = [correctAnswer];
        while (answers.length < 4) {
            const possibleAnswer = this.wordsList[Math.floor(Math.random() * this.wordsList.length)];
            if (!answers.includes(possibleAnswer)) {
                answers.push(possibleAnswer);
            }
        }
        answers.sort(() => Math.random() - 0.5);
        return answers;
    }

    nextQuestion = () => {
        const newQuestion = this.getRandomQuestion();
        this.setState((prevStat: GameState) => {
                const prevHist = prevStat.history;
                prevHist[prevStat.currentQuestion.id] = false;
                return {
                    round: prevStat.round + 1,
                    currentQuestion: newQuestion,
                    answers: this.randomizeAnswers(newQuestion),
                    history: prevHist
                }
            }
        );
    };

    private generateStatus(answers: Question[]) {
        return answers.reduce(function (map, obj) {
            map[obj.id] = false;
            return map;
        }, {});
    }

    private getInitialHistory() {
        return this.wordsList.reduce(function (map, obj) {
            map[obj.id] = true;
            return map;
        }, {});
    }
}

interface Question {
    id: number;
    hebrew: string;
    german: string;
}

interface GameState {
    currentQuestion: Question;
    answers: Question[];
    guessStatus: {};
    history: {};
    round: number;
}
