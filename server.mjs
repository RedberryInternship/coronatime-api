import exprees from "express"

const server = exprees();

server.get('/', (req, res, next) => {
    res.write('<h1>Hello Jon?!</h1>');
    res.end();
});

server.listen(4000, () => console.log(`I'm running on http://localhost:4000`));
