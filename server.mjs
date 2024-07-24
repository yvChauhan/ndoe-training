import express from "express";
import bp from "body-parser";
import morgan from "morgan";


const PORT = process.env.port || '3000';
const localHost = 'localhost';

const { urlencoded, json } = bp;

const app = express();

// use middleware
app.use(urlencoded({ extended: true }));
app.use(json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://${localHost}:${PORT}`);
});


