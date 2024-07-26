const fs = require('fs');

let data = {
  name: 'John',
  age: 30,
  city: 'New York'
};

let jsonData = JSON.stringify(data, null, 2);

fs.writeFile('data.json', jsonData, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Data written to file');
    }
});