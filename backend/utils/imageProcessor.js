import sharp from 'sharp';
import path from 'path';
import fs from 'fs/promises';

export class ImageProcessor {
  static async processImage(inputPath, outputPath, options = {}) {
    const {
      width = 800,
      height = 600,
      quality = 80,
      format = 'jpeg',
      fit = 'inside'
    } = options;

    try {
      const processedImage = sharp(inputPath)
        .resize(width, height, { fit })
        .toFormat(format, { quality });

      await processedImage.toFile(outputPath);
      return true;
    } catch (error) {
      console.error('Image processing error:', error);
      return false;
    }
  }

  static async generateThumbnail(inputPath, outputPath, size = 200) {
    try {
      await sharp(inputPath)
        .resize(size, size, { fit: 'cover' })
        .jpeg({ quality: 80 })
        .toFile(outputPath);
      
      return true;
    } catch (error) {
      console.error('Thumbnail generation error:', error);
      return false;
    }
  }

  static async getImageDimensions(filePath) {
    try {
      const metadata = await sharp(filePath).metadata();
      return {
        width: metadata.width,
        height: metadata.height
      };
    } catch (error) {
      console.error('Error getting image dimensions:', error);
      return null;
    }
  }

  static async optimizeImage(inputPath, outputPath, quality = 80) {
    try {
      await sharp(inputPath)
        .jpeg({ quality, progressive: true })
        .toFile(outputPath);
      
      return true;
    } catch (error) {
      console.error('Image optimization error:', error);
      return false;
    }
  }

  static async createMultipleSizes(inputPath, outputDir, sizes = []) {
    const results = [];
    
    for (const size of sizes) {
      const { width, height, suffix } = size;
      const outputPath = path.join(outputDir, `thumb_${suffix}.jpg`);
      
      try {
        await this.processImage(inputPath, outputPath, { width, height });
        results.push({ size, path: outputPath });
      } catch (error) {
        console.error(`Error creating size ${suffix}:`, error);
      }
    }
    
    return results;
  }
}