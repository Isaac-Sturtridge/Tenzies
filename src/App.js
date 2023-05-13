import React from 'react';
import './style.css';
import Die from './components/Die';

export default function App() {

    function allNewDice() {
        let array = []
        for (let i = 0; i < 10; i++) {
            array.push(Math.ceil(Math.random() * 6))
        }
        return array;
    }
    
    const [dice, setDice] = React.useState(allNewDice())

    const diceElements = dice.map(die => <Die value={die}/>)

    function handleClick() {
        setDice(allNewDice())
    }


    return (
        <main>
            <div className='container'>
                {diceElements}
            </div>
            <button className="roll-dice" onClick={handleClick}>Roll</button>
        </main>
    )
}