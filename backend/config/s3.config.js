import { S3Client } from "@aws-sdk/client-s3";
import config from "./index.js";

// const s3 = new S3Client({
//     endpoint: config.S3_ENDPOINT,
//     forcePathStyle: false,
//     region: config.S3_REGION,
//     credentials: {
//         accessKeyId: config.S3_ACCESS_KEY,
//         secretAccessKey: config.S3_SECRET_ACCESS_KEY,
//     },
// });
let s3;
export default s3;
// export default s3;