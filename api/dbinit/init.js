import fs from 'node:fs';
import { readdir } from 'node:fs/promises';
import { GridFSBucket } from 'mongodb';
import getDB from './getDB.js';
import dotenv from 'dotenv';

// 기본 .env 파일 로딩(package.json에서 로딩함)
dotenv.config({ path: '.env' });
// 환경별 .env 파일 로딩
console.log('NODE_ENV', process.env.NODE_ENV);
if (process.env.NODE_ENV) {
  dotenv.config({ override: true, path: `.env.${process.env.NODE_ENV}` });
}

const [,,targetFolder, clientId] = process.argv;
const { db, client, nextSeq } = await getDB(clientId);

// mongodb에 GridFS를 이용한 이미지 저장
async function uploadFileToGridFS(filePath, fileName) {
  return new Promise((resolve, reject) => {
    try {
      const bucket = new GridFSBucket(db, {
        bucketName: 'upload'
      });
  
      const uploadStream = bucket.openUploadStream(fileName);
      const fileStream = fs.createReadStream(filePath);
  
      fileStream.on('data', (chunk) => {
        uploadStream.write(chunk);
      });
      
      fileStream.on('end', () => {
        uploadStream.end(() => {
          console.log('파일 업로드: ', fileName);
          resolve();
        });
      });
    } catch (err) {
      console.error(err);
      reject();
    }
  });
  
}

async function initDB(initData) {
  // 데이터 등록
  for(const collection in initData){
    const data = initData[collection];
    if(data.length > 0){
      await db[collection].insertMany(data);
    }
    console.debug(`${collection} ${data.length}건 등록.`);
  }

  // 이미지 등록
  const sampleFileFolder = `./${targetFolder}/uploadFiles`;
  const files = await readdir(sampleFileFolder);
  for(const fileName of files){
    await uploadFileToGridFS(`${sampleFileFolder}/${fileName}`, fileName);
  }
}

await db.dropDatabase();
console.info('DB 삭제.');

import(`./${targetFolder}/data.js`).then(async ({ initData }) => {
  await initDB(await initData(clientId, nextSeq));
  client.close();
  console.info('DB 초기화 완료.');
});


