import {Readable} from 'node:stream'

class OneToHundredStream extends Readable {
    index = 1;
  
    _read() {
      const i = this.index++;
  
      setTimeout(() => {  
        if (i > 5) {
          this.push(null);
        } else {
          const buf = Buffer.from(String(i));
          this.push(buf);
        }
      }, 1000);
    }
  }


  fetch('http://localhost:3334', {
    method: 'POST',
    body: Readable.toWeb(new OneToHundredStream()), // Converte para ReadableStream
    headers: { 'Content-Type': 'text/plain' },
    duplex: 'half' // ESSA OPÇÃO É OBRIGATÓRIA
  })
    .then(response => response.text())
    .then(console.log)
    .catch(console.error);