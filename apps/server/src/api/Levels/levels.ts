import fs from 'fs';
import {v4 as uuidv4} from 'uuid';
import express from 'express';
import path from 'path';
import {ILevel} from '../../data-structures';

const currentDir = path.resolve();
const filePath = path.join(currentDir, 'data.json');
const router = express.Router();

router.post('/Levels', (req, res) => {
  const newLevel: ILevel = req.body;
  newLevel.id = uuidv4();

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading data:', err);
    } else {
      const levels: ILevel[] = JSON.parse(data);
      const newLevels: ILevel[] = [...levels, newLevel];
      const newData: string = JSON.stringify(newLevels);

      fs.writeFile('data.json', newData, 'utf8', (err) => {
        if (err) {
          console.error('Error writing data:', err);
          res.status(500).json({error: 'Error writing data'});
        } else {
          res.json(newLevel);
        }
      });
    }
  });
});

router.get('/Levels', (req, res) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading data:', err);
      res.status(500).json({error: 'Error reading data'});
    } else {
      const levels: ILevel[] | undefined = JSON.parse(data);

      res.json(levels);
    }
  });
});

router.get('/Levels/:id', (req, res) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading data:', err);
      res.status(500).json({error: 'Error reading data'});
    } else {
      const levels: ILevel[] | undefined = JSON.parse(data);
      const level: ILevel | undefined = levels?.find((l: any) => {
        return l.id === req.params.id;
      });

      res.json(level || {});
    }
  });
});

router.put('/Levels', (req, res) => {
  const newLevel: ILevel = req.body;
  console.log('🚀 ~ file: levels.ts:66 ~ router.put ~ newLevel:', newLevel);

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading data:', err);
    } else {
      const levels: ILevel[] = JSON.parse(data);
      const indexOfLevel: number = levels.findIndex(
        (l: ILevel) => l.id === newLevel.id
      );

      levels[indexOfLevel] = newLevel;

      const newData: string = JSON.stringify(levels);

      fs.writeFile('data.json', newData, 'utf8', (err) => {
        if (err) {
          console.error('Error writing data:', err);
          res.status(500).json({error: 'Error writing data'});
        } else {
          res.json(newLevel);
        }
      });
    }
  });
});

router.delete('/Levels/:id', (req, res) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading data:', err);
    } else {
      const levels: ILevel[] = JSON.parse(data);
      const newLevels: ILevel[] = levels.filter(
        (l: ILevel) => l.id !== req.params.id
      );
      const newData: string = JSON.stringify(newLevels);

      fs.writeFile('data.json', newData, 'utf8', (err) => {
        if (err) {
          console.error('Error writing data:', err);
          res.status(500).json({error: 'Error writing data'});
        } else {
          res.json(req.params.id);
        }
      });
    }
  });
});

export default router;
