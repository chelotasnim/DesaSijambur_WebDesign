const value_html = document.querySelectorAll('.floating-header .value-numeric')
function setNewWord() {
    let maxindicator = {}
    const max_data = {}

    value_html.forEach(val_el => {
        maxindicator[val_el.id] = false
        max_data[val_el.id] = { val: 0, max: parseFloat(val_el.getAttribute('data-max')) }
    })

    let max_lists = []
    Object.keys(max_data).forEach(key => {
        max_lists.push(max_data[key].max)
    })

    let increment_amount = 0
    let fixed_count = 0
    if (Math.max(...max_lists) <= 100) {
        increment_amount = 0.23
        fixed_count = 2
    } else {
        increment_amount = 3
    }

    increment = setInterval(() => {
        Object.keys(max_data).forEach(key => {
            max_data[key].val += increment_amount

            value_html.forEach(val_html => {
                if (val_html.id == key) {
                    let realmax = max_data[key].val - (max_data[key].val - max_data[key].max)
                    if (max_data[key].val > max_data[key].max && maxindicator[key] === false) {
                        if (max_data[key].val > realmax) {
                            maxindicator[key] = true
                            val_html.textContent = realmax.toFixed(fixed_count)
                        }
                    } else if (max_data[key].val <= max_data[key].max && maxindicator[key] === false) {
                        val_html.textContent = max_data[key].val.toFixed(fixed_count)
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