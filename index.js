const fs = require('fs');
const path = require('path');
const coreObj = require('./config/corsOptions');

const { logEvents, logger } = require('./middleware/logEvents');

const cors = require('cors');
const express = require('express');
const app = express();

const PORT = process.env.PORT || 3500;

app.use(logger);
app.use(cors(coreObj));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/', express.static(path.join(__dirname, '/public')));

app.use('/', require('./routes/root'));
app.use('/employees', require('./routes/api/employees'));

app.get('/', require('./routes/root'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
