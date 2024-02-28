import express from "express"
import "dotenv/config"

const app = express();
const PORT = process.env.PORT || 20000;

app.use(express.json());

app.get('/:entity', async (req, res) => {
  const { entity } = req.params;
  const data = await loadData(entity);
  res.json(data);
});

app.get('/:entity/:id', async (req, res) => {
  const { entity, id } = req.params;
  const data = await loadData(entity);
  if (!data[id]) {
    return res.status(404).send('Record not found');
  }
  res.json(data[id]);
});

app.post('/:entity', async (req, res) => {
  const { entity } = req.params;
  const id = Date.now();
  const record = req.body;
  const data = await loadData(entity);
  data[id] = record;
  await saveData(entity, data);
  res.status(201).send('Record added');
});

app.put('/:entity/:id', async (req, res) => {
  const { entity, id } = req.params;
  const record = req.body;
  const data = await loadData(entity);
  if (!data[id]) {
    return res.status(404).send('Record not found');
  }
  data[id] = record;
  await saveData(entity, data);
  res.send('Record updated');
});

app.delete('/:entity/:id', async (req, res) => {
  const { entity, id } = req.params;
  const data = await loadData(entity);
  if (!data[id]) {
    return res.status(404).send('Record not found');
  }
  delete data[id];
  await saveData(entity, data);
  res.send('Record deleted');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
