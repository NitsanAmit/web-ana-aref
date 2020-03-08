import {Question} from "./Game";

export function getRandomQuestion(wordlist: any[], prev ?: Question) {
    let number = Math.floor(Math.random() * wordlist.length);
    while (wordlist[number] === prev) {
        number = Math.floor(Math.random() * wordlist.length);
    }
    return wordlist[number];
}


export function getRandomAnswers(wordlist: any[], correctAnswer: Question) {
    const answers = [correctAnswer];
    while (answers.length < 4) {
        const possibleAnswer = wordlist[Math.floor(Math.random() * wordlist.length)];
        if (!answers.includes(possibleAnswer)) {
            answers.push(possibleAnswer);
        }
    }
    answers.sort(() => Math.random() - 0.5);
    return answers;
}

export function getInitialHistory(wordlist: any[]) {
    return wordlist.reduce(function (map, obj) {
        map[obj.id] = true;
        return map;
    }, {});
}