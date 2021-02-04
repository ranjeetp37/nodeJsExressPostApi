import express from 'express';
const app = express();


app.use(express.json());

app.post('/api/v1/parse', (req, res) => {
    const data = ''+ req.body.data;
    console.log('get request with ', data.toString());
    if ( data ) {
        const message = {
            data:  {
                firstName: data.substring(0,8),
                lastName: data.substring(8,18),
                clientId: `${data.substring(18,21)}-${data.substring(21,25)}`,
            }
        };        
        return res.send(message);
    } else {
        res.sendStatus(503);
    }
}); 

app.post('/api/v2/parse', (req, res) => {
    const data = req.body.data;
    if (data) {
        const nameRegex = /[A-Z]+/g;
        const numberRegex = /[1-9]+/g;
        const nameArray = [...data.matchAll(nameRegex)];
        const phoneArray = [...data.matchAll(numberRegex)];
        const phoneNo = phoneArray[0] && phoneArray[0][0];

        const message = {
            data:  {
                firstName: nameArray[0] && nameArray[0][0],
                lastName: nameArray[1] && nameArray[1][0],
                clientId: `${phoneNo.substring(0,3)}-${phoneNo.substring(3,7)}`,
            }
        };
        return res.send(message);
    }
    return res.sendStatus(200);
}); 


app.listen(3003, (err) => {
    if (err) { throw err; }
    console.log('server started on http://localhost:3003');
});