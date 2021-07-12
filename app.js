const express = require('express');

const app = express();

app.get('/mean', function(req, res) {
    if (req.query.nums) {
        let arr = Array.from(req.query.nums.split(','))
        let result = 0;
        for (let i = 0; i < arr[i]; i++) {
            result = result + parseInt(arr[i])
        }
        return res.json({ operation: 'mean', value: result / arr.length });
    } else {
        return res.status(404).send("Invalid number seq")
    }
});

app.get('/median', function(req, res) {
    if (req.query.nums) {
        let result = 0;
        let arr = req.query.nums.split(',').sort();
        if (arr.length % 2 === 0) {
            result = (parseFloat(arr[arr.length / 2 - 1]) + parseFloat(arr[arr.length / 2])) / 2
        } else {
            result = arr[(arr.length - 1) / 2];
        }
        return res.json({ operation: 'median', value: result });
    } else {
        return res.status(404).send("Invalid number seq")
    }
});

app.get('/mode', function (req, res) {
    if (req.query.nums) {
        let numbers = Array.from(req.query.nums.split(','))
        let modes = []
        let count = []
        let i
        let max = 0
    
        for (i = 0; i < numbers.length; i += 1) {
            let number = numbers[i];
            count[number] = (count[number] || 0) + 1;
            if (count[number] > max) {
                max = count[number];
            }
        }

        for (i in count) {
            if (count.hasOwnProperty(i)) {
                if (count[i] === max) {
                    modes.push(Number(i));
                }
            }
        }
        return res.json({ operation: 'mode', value: modes });
    } else {
        return res.status(404).send("Invalid number seq")
    }
});

app.listen(3000, function () {
    console.log('App on port 3000');
})