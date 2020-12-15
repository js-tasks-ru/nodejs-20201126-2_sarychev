const stream = require('stream');
const os = require('os');

class LineSplitStream extends stream.Transform {
  constructor(options) {
    super(options);
  }

  _transform(chunk, encoding, callback) {
    
    const lines = ((this.temporal != null ? this.temporal: "") + chunk.toString()).split(/\r?\n/);
    
    this.temporal = lines.pop();
        
    for (let line of lines) {
       this.push(line); }
    
    callback();
  }

  _flush(callback) {
    this.push(this.temporal != null ? this.temporal:"");
   
    callback();
  }
}

module.exports = LineSplitStream;
