const express = require('express');
const app = express();
const PORT = process.env.PORT || 8081;
const cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));
const multer  = require('multer');
const os = require('os');
const upload = multer({ dest: os.tmpdir() });

app.use(express.urlencoded());

/* result:
{
"name": "package.json",
"type": "application/json",
"size": 364
}
 */
app.get('/', (req, res) => {
  res.set('Content-Type', 'text/html');
  res.send(Buffer.from(`
    <form enctype="multipart/form-data" method="POST" action="/api/fileanalyse">
      <input id="inputfield" type="file" name="upfile">
      <input id="button" type="submit" value="Upload">
    </form>
  `));
});

app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  const upfile = req.file;

  if (!upfile) {
    return res.json({'error': 'upfile is required'});
  }

  return res.json({
    name: upfile.originalname,
    type: upfile.mimetype,
    size: upfile.size,
  });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
