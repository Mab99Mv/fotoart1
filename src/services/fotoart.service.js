import firebase from "../firebase";

const db = firebase.collection("/foto");

class FotoService {

  getAll() {
    return db;
  }

  create(foto) {
    return db.add(foto);
  }

  update(id, value) {
    return db.doc(id).update(value);
  }

  delete(id) {
    return db.doc(id).delete();
  }
}

export default new FotoService()