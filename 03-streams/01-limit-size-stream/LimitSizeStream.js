const stream = require('stream');
const LimitExceededError = require('./LimitExceededError');

class LimitSizeStream extends stream.Transform {

  constructor(options) {
    super(options);
    this.limit = options.limit;
    this.data = 0;
  }



  _transform(chunk, encoding, callback) {
    
    try {
       this.data += Buffer.byteLength(chunk, 'utf8');
      if( this.data <= this.limit ){
       const resultString = `${chunk}`;
       callback(null, resultString);
      }else{
      throw new LimitExceededError();
      }
    } catch (err) {
      callback(err);
      }
      
  }
}

module.exports = LimitSizeStream;
