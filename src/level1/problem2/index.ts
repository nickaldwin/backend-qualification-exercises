import { randomBytes } from "crypto";
export class ObjectId {
  private data: Buffer;

  constructor(private readonly type: number, private readonly timestamp: number) {
    this.data = this.generateObjectId();
  }

  private generateObjectId(): Buffer {
    const buffer = Buffer.alloc(14);

    // Type (1 byte)
    buffer.writeUInt8(this.type, 0);

    // Timestamp (6 bytes)
    buffer.writeUIntBE(this.timestamp, 1, 6);

    // Random (4 bytes)
    randomBytes(4).copy(buffer, 7);

    // Counter (3 bytes)
    buffer.writeUIntBE(Math.floor(Math.random() * 16777216), 11, 3);

    return buffer;
  }

  static generate(type?: number): ObjectId {
    return new ObjectId(type ?? 0, Date.now());
  }
  
  toString(encoding?: 'hex' | 'base64'): string {
    return this.data.toString(encoding ?? 'hex');
  }
}