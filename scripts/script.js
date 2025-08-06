const value_html = document.querySelectorAll('.floating-header .value-numeric')
function setNewWord() {
    value_html.forEach(val => {
        val.textContent = 0
    })

    const max_data = {
        score: {
            val: 0,
            max: 72.83
        },
        minscore: {
            val: 0,
            max: 58.74
        }
    }

    let maxindicator = {
        score: false,
        minscore: false
    }

    increment = setInterval(() => {
        Object.keys(max_data).forEach(key => {
            max_data[key].val += 0.23

            value_html.forEach(val_html => {
                if (val_html.id == key) {
                    let realmax = max_data[key].val - (max_data[key].val - max_data[key].max)
                    if (max_data[key].val > max_data[key].max && maxindicator[key] === false) {
                        if (max_data[key].val > realmax) {
                            maxindicator[key] = true
                            val_html.textContent = realmax.toFixed(2)
                        }
                    } else if (max_data[key].val <= max_data[key].max && maxindicator[key] === false) {
                        val_html.textContent = max_data[key].val.toFixed(2)
                    }
                }
            })
        })

        let totalmax = 0
        Object.keys(maxindicator).forEach(keymax => {
            if (maxindicator[keymax] === true && totalmax <= Object.keys(maxindicator).length) {
                totalmax++
            }
        })

        if (totalmax == Object.keys(maxindicator).length) {
            clearInterval(increment)
            setTimeout(() => setNewWord(), 2500)
        }
    }, 1)
}
setNewWord()