import express from 'express';

const app = express();

app.listen(5173, () => {
    console.log("Server is running on port 5173!");
});