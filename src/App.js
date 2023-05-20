import React from 'react';
import './style.css';
import Die from './components/Die';
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export default function App() {
    
    const [dice, setDice] = React.useState(allNewDice())

    const [tenzies, setTenzies] = React.useState(false)

    React.useEffect(() => {
        const firstValue = dice[0].value
        const allEqual = dice.every(die => die.value === firstValue)
        const allHeld = dice.every(die => die.isHeld)
        if (allEqual && allHeld) {
            setTenzies(true)
            console.log("you won")
        }
    }, [dice])

    function allNewDice() {
        let array = []
        for (let i = 0; i < 10; i++) {
            let randomId = nanoid()
            array.push({
                value: Math.ceil(Math.random() * 6), 
                isHeld: false,
                id: randomId
            })
        }
        return array;
    }
    

    const diceElements = dice.map(die => <Die 
        key={die.id} 
        value={die.value}
        isHeld={die.isHeld}
        holdDice={() => holdDice(die.id)}
        />
    )

    function holdDice(id) {
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ? {...die, isHeld: !die.isHeld}: die
        })
        )
    }

    function handleClick() {
        if(tenzies) {
            setTenzies(false)
            setDice(allNewDice())
        }
        else { 
            setDice(oldDice => oldDice.map(die => {
            let randomId = nanoid()
            return die.isHeld ? die : {
                value: Math.ceil(Math.random() * 6), 
                isHeld: false,
                id: randomId
            }
        }))
        }
    }


    return (
        <main>
            {tenzies && <Confetti />}
            <div className='container'>
                {diceElements}
            </div>
            <button className="roll-dice" onClick={handleClick}>{tenzies ? "New Game" : "Roll"}</button>
        </main>
    )
}