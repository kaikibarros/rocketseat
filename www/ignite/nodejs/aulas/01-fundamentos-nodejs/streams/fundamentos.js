// netflix & spotify

// importação de clientes via CSV (excel)
// post /upload import.csv

// 10mb/s
// readable streams / Writable Streams

// streams =>
// process.stdin.pipe(process.stdout);
// pipe = encaminhar

import { Readable, Writable, Transform } from "node:stream";

class OneToHundredStream extends Readable {
  index = 1;

  _read() {
    const i = this.index++;

    setTimeout(() => {
      if (i > 100) {
        this.push(null);
      } else {
        const buf = Buffer.from(String(i));
        this.push(buf);
      }
    }, 1000);
  }
}

class MultiplyByTenStream extends Writable{
    _write(chunk, encondig, callback){
        console.log(Number(chunk.toString())* 10) 
        callback()
    }
}

class InverseNumberStream extends Transform{
    _transform(chunk, encoding, callback){
        const transformed = Number(chunk.toString()) * -1

        callback(null, Buffer.from(String(transformed)))
    }
}

new OneToHundredStream()
.pipe(new InverseNumberStream)
.pipe(new MultiplyByTenStream)




