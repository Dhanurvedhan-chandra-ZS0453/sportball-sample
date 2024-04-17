const log = require('node-file-logger');
const util = require('util');

const options = {
    timeZone: 'Asia/Kolkata',
    folderPath: './logs/',      
    dateBasedFileNaming: true,
    fileName: 'All_Logs',   
    fileNamePrefix: 'Logs_',
    fileNameSuffix: '',
    fileNameExtension: '.log',     
    
    dateFormat: 'YYYY-MM-DD',
    timeFormat: 'HH:mm:ss.SSS',
    logLevel: 'debug',
    onlyFileLogging: true
  }
   
  
  log.SetUserOptions(options); 

  function logError(error, message) {
  
    log.Error(message + ' | ' + util.inspect(error)); 
}

  module.exports = {
    logError: logError 
  };