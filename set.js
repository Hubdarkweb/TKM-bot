const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSUJvUVU3aEFhVUdwcE92UEpsVW9jNklHT3VoOGcvNWJ2RWY1QXdiaWFsaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMkZpOThZMHcySHBmWmVSekxVa2VIdEsxaTVab3Q2UlBwQXpvQkV6T0xnaz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJxT2NpbmRMS09lMGhESXlFd2xyM2lSbWdaaVAvQjg3K3VBNzh3Z0krMTFvPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJicnZ1bXFhMTlyZ3E2WjZBZm1xV3V0UmtPL0NNdCtsNXA4ZUx6ZFVsSmlZPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IldBdHJOa0pybXQwR0VPRFUzcVNCc21QNi8rLzFjZWZnWksrangyeVlRbnc9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im45aWRYRzRudDJWblBCTFFVb3pzaElXSHl5aFlISUhyY2psbWJmaXl3U0U9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib0dja3B1b0hUVHI1Znl0aFlULzVQd2lXdHdxcDhXbHlBTnZORERoUGVrWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNUcvdVZKNXRrR0pSczgrQ0l5U0VZbHdHdW9pQ3RkOERWSkU2QnptOGkyUT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InQwc1A2T3BYRTlqT3IrWTFoWmZHMjhJK2JlWHBEOVBoNE05N0JsbFRvUkV4SjBBZitVTUIyd3E1WGYxamsxRFpvcHZNNGM5T3BnMUVJa1NPUi9jdmpnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MzIsImFkdlNlY3JldEtleSI6IktGazMrMU1zZUdseW02bU1lUW5lYm95T0JyV2U0ZHlibkMwaVE0aVhUQWc9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiMjU0MTEyMzg2OTIxQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkU2REJDMEJGOEZERDQyQzNFM0Y3OUYzODYzQTA4NzExIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3MjUzNzUxNDd9LHsia2V5Ijp7InJlbW90ZUppZCI6IjI1NDExMjM4NjkyMUBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiJEMUU4NEI3MDBBQjk4Q0YwQkE2RThCQUE3MEUwNENCMiJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzI1Mzc1MTQ3fV0sIm5leHRQcmVLZXlJZCI6NjEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjo2MSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJBSnRJd3V1dFJMLWF2WVhQS1hVOHJnIiwicGhvbmVJZCI6IjdlMGMyNzE3LWUzMGMtNGM3Mi04ZWI0LTlkOTQ0Mzk2MDIyZCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIyWjJJU3JseVphSmtkWE00aDlwbDZmcUVlNG89In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRFNSajlTbnY5UE4yM0FHWWJVWTdRbkJYaTYwPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkFLN01QNDM5IiwibWUiOnsiaWQiOiIyNTQxMTIzODY5MjE6MjlAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiVE9wUExVRyJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTjJVblA0SEVKckYzTFlHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoicXlMZnF1ZDR5bGdlRjhqSjNWTTFGRUpOMjI3enM5dGVUbWd3UG1ML3AwUT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiL1gyUG9rVlV1Y0FTMTloZytQYndaOVh4SWhtWXNhb2IrTGt2eFR0aVlESlFyRXhURVl4WHFGWFNUVGNxS3BnS2ROdUw5NmI4UmVOaFg2RnNIRCtPQ0E9PSIsImRldmljZVNpZ25hdHVyZSI6IjBMSWVPR3hwVXV2NkpGVUwrcXl2YjFCMEtOQ1F1SngyaUcwQ1hDaWNXUmUxNjNITytwOGdSTTNrdG5pZEZqOFJ5WVVxQ01LcVVRUVp3MGxqc3M5M2pBPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjU0MTEyMzg2OTIxOjI5QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmFzaTM2cm5lTXBZSGhmSXlkMVROUlJDVGR0dTg3UGJYazVvTUQ1aS82ZEUifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjUzNzUxNDQsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBRDNNIn0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "TOpPLUG",
    NUMERO_OWNER : process.env.OWNER_NUM || "254112386921",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'TKM bot',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/e07a3d933fb4cad0b3791.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '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',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    TZ : process.env.TIME_ZONE || 'Etc/GMT',
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    BOOM_MESSAGE_LIMIT : process.env.BOOM_MESSAGE_LIMIT || 100,
    PORT : process.env.PORT || 8000,
    LINK : process.env.LINK || '',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://tkm:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/takudzwa" : "postgresql://tkm:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/takudzwa",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`update ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
