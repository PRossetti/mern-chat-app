class SocketService {
  protected io;

  start(httpServer) {
    this.io = require('socket.io')(httpServer);
  }

  on(eventType, callback) {
    if (this.io) {
      this.io.on(eventType, callback);
      return;
    }
    console.warn('Do nothing');
  }

  emit(emitName, data) {
    console.log('se va a llamar a emit');
    this.io.emit(emitName, data);
    console.log('se llamo a emit', { emitName, data });
  }
}

export default new SocketService();
