import {Question} from "./Game";
const data_url = "https://raw.githubusercontent.com/NitsanAmit/web-ana-aref/master/ana-aref/src/test_data.json";

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


export async function getWordslist() {
    const res = await fetch(data_url);
    return await res.json();
}
