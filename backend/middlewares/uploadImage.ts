import fs from 'fs'
import path from 'path';
import sharp from 'sharp';
import { Response, Request, NextFunction } from 'express';

const uploadUrl = 'http://127.0.0.1:8000/uploads/'
export const uploadImage = (req: Request, res: Response, next: NextFunction) => {
  if (req.file) {
    const fileName = req.file.filename
    const filePath = req.file.path
    if (req.body.avatar) {
      const urlPath = req.body.avatar.substring(req.body.avatar.indexOf('/uploads'))
      fs.unlink(path.join(__dirname, '../', urlPath), err => {
        if (err) console.log(err);
      })
    }
    req.body.avatar = uploadUrl + fileName + '.webp'
    try {
      sharp(filePath)
        // .resize(300)
        .webp()
        .toFile(filePath + '.webp')
        .then(info => {
          fs.unlink(filePath, (err) => {
            if (err) console.log(err);
          })
        })
        .catch(err => {
          console.log('Ошибка преобразования файла');
          console.log(err);
        })
    } catch (error) {
      console.log('Ошибка преобразования файла');
      return res.status(500).json({ message: 'Internal error' })
    }
  }
  next()
}