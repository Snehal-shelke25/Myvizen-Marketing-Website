import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

// Minimal Zip file generator using pure Node.js built-ins
function createZipArchive(sourceDir, outPath) {
  const files = [];

  function readDirRecursive(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.name === 'node_modules' || entry.name === 'dist' || entry.name === '.git' || entry.name.endsWith('.zip')) {
        continue;
      }
      if (entry.isDirectory()) {
        readDirRecursive(fullPath);
      } else {
        files.push(fullPath);
      }
    }
  }

  readDirRecursive(sourceDir);

  const localHeaders = [];
  const centralDirs = [];
  let currentOffset = 0;

  for (const filePath of files) {
    const relativePath = path.relative(path.dirname(sourceDir), filePath).replace(/\\/g, '/');
    const content = fs.readFileSync(filePath);
    const fileNameBuffer = Buffer.from(relativePath, 'utf-8');

    // Calculate CRC32
    let crc = 0xFFFFFFFF;
    for (let i = 0; i < content.length; i++) {
      crc ^= content[i];
      for (let j = 0; j < 8; j++) {
        crc = (crc >>> 1) ^ (crc & 1 ? 0xEDB88320 : 0);
      }
    }
    crc = (crc ^ 0xFFFFFFFF) >>> 0;

    // Compression using raw deflate
    const compressedContent = zlib.deflateRawSync(content);

    const time = new Date();
    const dosTime = (time.getHours() << 11) | (time.getMinutes() << 5) | (time.getSeconds() >> 1);
    const dosDate = ((time.getFullYear() - 1980) << 9) | ((time.getMonth() + 1) << 5) | time.getDate();

    // Local Header
    const localHeader = Buffer.alloc(30 + fileNameBuffer.length);
    localHeader.writeUInt32LE(0x04034b50, 0); // Local header signature
    localHeader.writeUInt16LE(20, 4);          // Version needed
    localHeader.writeUInt16LE(0, 6);           // General purpose bit flag
    localHeader.writeUInt16LE(8, 8);           // Compression method (Deflate)
    localHeader.writeUInt16LE(dosTime, 10);
    localHeader.writeUInt16LE(dosDate, 12);
    localHeader.writeUInt32LE(crc, 14);
    localHeader.writeUInt32LE(compressedContent.length, 18);
    localHeader.writeUInt32LE(content.length, 22);
    localHeader.writeUInt16LE(fileNameBuffer.length, 26);
    localHeader.writeUInt16LE(0, 28); // Extra field length
    fileNameBuffer.copy(localHeader, 30);

    const localChunk = Buffer.concat([localHeader, compressedContent]);
    localHeaders.push(localChunk);

    // Central Directory Header
    const cdHeader = Buffer.alloc(46 + fileNameBuffer.length);
    cdHeader.writeUInt32LE(0x02014b50, 0); // Central directory signature
    cdHeader.writeUInt16LE(20, 4);         // Version made by
    cdHeader.writeUInt16LE(20, 6);         // Version needed
    cdHeader.writeUInt16LE(0, 8);          // General purpose bit flag
    cdHeader.writeUInt16LE(8, 10);         // Compression method
    cdHeader.writeUInt16LE(dosTime, 12);
    cdHeader.writeUInt16LE(dosDate, 14);
    cdHeader.writeUInt32LE(crc, 16);
    cdHeader.writeUInt32LE(compressedContent.length, 20);
    cdHeader.writeUInt32LE(content.length, 24);
    cdHeader.writeUInt16LE(fileNameBuffer.length, 28);
    cdHeader.writeUInt16LE(0, 30);         // Extra field length
    cdHeader.writeUInt16LE(0, 32);         // File comment length
    cdHeader.writeUInt16LE(0, 34);         // Disk number start
    cdHeader.writeUInt16LE(0, 36);         // Internal file attributes
    cdHeader.writeUInt32LE(0, 38);         // External file attributes
    cdHeader.writeUInt32LE(currentOffset, 42); // Relative offset of local header
    fileNameBuffer.copy(cdHeader, 46);

    centralDirs.push(cdHeader);
    currentOffset += localChunk.length;
  }

  const centralDirBuffer = Buffer.concat(centralDirs);
  const cdOffset = currentOffset;
  const cdSize = centralDirBuffer.length;

  // End of Central Directory Record
  const eocd = Buffer.alloc(22);
  eocd.writeUInt32LE(0x06054b50, 0);        // EOCD signature
  eocd.writeUInt16LE(0, 4);                 // Disk number
  eocd.writeUInt16LE(0, 6);                 // Disk with CD
  eocd.writeUInt16LE(files.length, 8);      // CD entries on this disk
  eocd.writeUInt16LE(files.length, 10);     // Total CD entries
  eocd.writeUInt32LE(cdSize, 12);           // CD size
  eocd.writeUInt32LE(cdOffset, 16);         // CD offset
  eocd.writeUInt16LE(0, 20);                // Comment length

  const finalZip = Buffer.concat([...localHeaders, centralDirBuffer, eocd]);
  fs.writeFileSync(outPath, finalZip);
  console.log(`Created zip at ${outPath} (${finalZip.length} bytes)`);
}

const source = 'C:\\Users\\sneha\\Downloads\\Myvizen-Marketing-Website';
const target = 'C:\\Users\\sneha\\Downloads\\Myvizen-Marketing-Website.zip';

createZipArchive(source, target);
