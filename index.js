const exp = ['+', '-', '/', '*']
let
    levelIntensity = 3,
    scoreMultiplyer = 1,
    solution = 0,
    solutionUser = document.getElementById('solution'),
    questionUser = document.getElementById('question'),
    scoreDiv = document.getElementById('score'),
    timerDiv = document.getElementById('timer'),
    score = 0,
    timer = '',
    level = document.getElementById('level')

const levelChanger = _ => {
    let num = Number(level.value)
    switch (num) {
        case 1:
            levelIntensity = 3
            scoreMultiplyer = 1
            break;
        case 2:
            levelIntensity = 5
            scoreMultiplyer = 2
            break;
        case 3:
            levelIntensity = 6
            scoreMultiplyer = 3
            break;
        case 4:
            levelIntensity = 7
            scoreMultiplyer = 4
            break;
        default:
            levelIntensity = 3
            scoreMultiplyer = 1
    }
    restart(true)
}
const alert = (type, message) => {
    alertDiv.classList.remove('none')
    alertDiv.classList.add('alert-' + type)
    alertDiv.innerText = message
    setTimeout(() => {
        alertDiv.classList.add('none')
        alertDiv.classList.remove('alert-' + type)
        alertDiv.innerText = ''
    }, 2000);
}
const expGen = () => exp[Math.floor(Math.random() * 4)]

const newQuestion = () => {
    let quantity = Math.ceil(Math.random() * levelIntensity) + 1
    let nums = Array(quantity).fill(0).map(e => Math.ceil(Math.random() * levelIntensity ** levelIntensity))
    let Newquestion = ''
    nums.forEach((e, i) => {
        if (i == nums.length - 1) Newquestion += e
        else Newquestion += e + expGen()
    })
    questionUser.innerText = Newquestion
    solution = eval(Newquestion).toFixed(2)
    let i = 10 * scoreMultiplyer
    timer = setInterval(() => {
        if (i <= 0) {
            clearInterval(timer)
            return formSubmitter()
        }
        i--
        timerDiv.innerText = i
    }, 1000);
}

function restart(levelChanger) {
    if (!levelChanger) {
        levelIntensity = 3
        scoreMultiplyer = 1
    }
    solution = 0
    score = 0
    scoreDiv.innerText = score
    clearInterval(timer)
    timer = ''
    newQuestion()
}
const skip = () => {
    clearInterval(timer)
    timer = ''
    newQuestion()
}
const formSubmitter = e => {
    e ? e.preventDefault() : ''
    clearInterval(timer)
    let sol = String(solution).split('.')[0]
    let solUser = String(solutionUser.value).split('.')[0]

    if (solUser == sol) {
        alert('success', 'your solution was correct!')
        score += scoreMultiplyer
        scoreDiv.innerText = score
    } else {
        if (solUser.length) alert('danger', 'Incorrect Solution, solution was: ' + sol)
        else alert('danger', 'Time"s Up!, solution was: ' + sol)
        score -= scoreMultiplyer
        scoreDiv.innerText = score
    }
    solutionUser.value = ''
    newQuestion()
}


submitForm.addEventListener('submit', formSubmitter)
newQuestion()
