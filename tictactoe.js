const x_class = 'x'
const o_class = 'o'
const Winning_comb = [
    [0,1,2], 
    [3,4,5], 
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
/* selector for the data cells */
const cellElements = document.querySelectorAll(".cell")
const board = document.getElementById('board')
const Winning_message_text_el = document.querySelector('[data-winning-message-text]')
const WinningMessageElement = document.getElementById('winningmessage')
const restart_button = document.getElementById('restartButton')
let circleturn


startgame()

restart_button.addEventListener('click', startgame)


function startgame()
{
    circleturn = false
    /* Looping through the elements in the cell */
    cellElements.forEach(cell => 
    {   
        cell.classList.remove(x_class)
        cell.classList.remove(o_class)
        cell.removeEventListener('click', handleClick)
        /* every time we click on the cell we want to add this  */
        cell.addEventListener('click', handleClick, { once: true})
    })
    setBoardHoverClass()
    WinningMessageElement.classList.remove('show')
}


function handleClick(e)
{
    /* This helps with debugging the code
    console.log('clicked') */
    //the cell we click on
    const cell = e.target
    // ternary statement
    const currentclass = circleturn ? o_class : x_class
    placemark(cell, currentclass)
    if(checkwin(currentclass))
        endgame(false)
    else if(isDraw())
        endgame(true)
    else
    {
        swapturns()
        //This function shows option for the next class to be chosen. hence, after we swap turns 
        setBoardHoverClass()
    }
    
}


function placemark(cell, currentclass)
{
    cell.classList.add(currentclass)
}

function swapturns()
{
    circleturn = !circleturn
}

function setBoardHoverClass()
{
    board.classList.remove(x_class)
    board.classList.remove(o_class)
    if(circleturn)
        board.classList.add(o_class)
    else
        board.classList.add(x_class)

}

// We all checking all of the winning combinations to see if some of the winning combinations are met by the current combinations 
function checkwin(currentclass)
{
   return Winning_comb.some(combination =>
    {
        //This checks if the current class is in the top three elements[0,1,2] in the combinations then we are a winner
        return combination.every(index =>
        {
            return cellElements[index].classList.contains(currentclass)
        } )
    })
}


function endgame(draw)
{
    if(draw)
    {
        Winning_message_text_el.innerText = `Draw!`
    }
    else
    {
        // if it's circle's turn print o else it prints x
        Winning_message_text_el.innerText = `${circleturn ? "O's" : "X's"} Wins!`
    }
    WinningMessageElement.classList.add('show')
    
}

//this function checks if every single cell contains an x or o class then we want to return true becuase it's a draw
function isDraw()
{
   return [...cellElements].every(cell =>
    {
        return cell.classList.contains(x_class) || cell.classList.contains(o_class)
    })
}