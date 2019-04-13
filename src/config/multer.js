const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

module.exports = {
    dest: path.resolve(__dirname, '..', '..', 'temp'),
    storage: multer.diskStorage({
        destination: (req, file, call) => {
            call(null, path.resolve(__dirname, '..', '..', 'temp'));
        },
        filename: (req, file, call) => {
            crypto.randomBytes(16, (err, hash) => {
                if (err) {
                    call(err);
                } else {
                    file.key = `${hash.toString('hex')}-${file.originalname}`;
                    call(null, file.key);
                }
            });
        }
    })
};