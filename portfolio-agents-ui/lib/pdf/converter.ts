import { fromBuffer } from 'pdf2pic';
import sharp from 'sharp';

export async function convertPdfToImages(
  pdfBuffer: Buffer
): Promise<string[]> {
  const options = {
    density: 300,           // High quality
    saveFilename: "page",
    savePath: "/tmp",
    format: "png" as const,
    width: 2000,
    height: 2600,
  };

  const convert = fromBuffer(pdfBuffer, options);
  
  const images: string[] = [];
  let pageNum = 1;
  let hasMore = true;

  while (hasMore) {
    try {
      const result = await convert(pageNum, { responseType: "base64" });
      
      if (result.base64) {
        // Optimize image with sharp
        const optimized = await sharp(Buffer.from(result.base64, 'base64'))
          .resize(1600, null, { withoutEnlargement: true })
          .png({ quality: 90 })
          .toBuffer();
        
        images.push(optimized.toString('base64'));
        pageNum++;
      } else {
        hasMore = false;
      }
    } catch (error) {
      hasMore = false;
    }
  }

  return images;
}
