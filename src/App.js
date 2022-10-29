import React from 'react';
import Die from "./components/Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export default function App(){

    const[dice, setDice] = React.useState(allNewDice());

    const[tenzies, setTenzies] = React.useState(false);

    React.useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value;
        const allSameValue = dice.every(die => die.value === firstValue);
        if(allHeld && allSameValue){
            setTenzies(true);
        } 
    }, [dice])

    function holdDice(id){
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ? 
                {...die, isHeld: !die.isHeld} : 
                die
        }))
    }

    function generateNewDice() {
        return {
            value : Math.ceil(Math.random() * 6),
            isHeld : false,
            id: nanoid()
        }
    }

    function allNewDice(){
        const newDice = [];
        for(let i=0; i<10; i++){
            newDice.push(generateNewDice())
        }
        return newDice;
    }

    const diceElements = dice.map(die => 
    <Die 
        key={die.id} 
        value={die.value} 
        isHeld={die.isHeld} 
        holdDice={() => holdDice(die.id)} 
    />)

    function rollDice(){
        if(!tenzies){
            setDice(oldDice => oldDice.map(die => {
                return die.isHeld ? die : generateNewDice() 
            }))
        } else {
            setTenzies(false);
            setDice(allNewDice())
        }
    }

    return(
        <main>
            {tenzies && <Confetti />}
            <h1 className='title'>Tenzies</h1>
            <p>Roll until all the dice are same. Click each die to freeze it as it's current value between rolls.</p>
            <div className='dice-container'>
                {diceElements}
            </div>
            <button onClick={rollDice} className='dice-roll'>{tenzies ? "New Game" : "Roll" }</button>
        </main>
    )
}