import { db, storage } from "../firebase";

class FotoService {
  getAll() {
    return db.collection("imagenes/");
  }

  create(foto) {
    const { image, ...rest } = foto;
    const storageRef = storage.ref();
    const imageRef = storageRef.child(`imagenes/${image.name}`);
    return imageRef.put(image)
      .then((snapshot) => {
        return db.collection("imagenes").add({
          ...rest,
          url: snapshot.ref.getDownloadURL(),
        });
      });
  }

  update(id, value) {
    return db.collection("imagenes").doc(id).update(value);
  }

  delete(id, imageUrl) {
    const imageRef = storage.refFromURL(imageUrl);
    return imageRef.delete().then(() => {
      return db.collection("imagenes").doc(id).delete();
    });
  }

  getImageUrl(imageName) {
    const storageRef = storage.ref();
    const imageRef = storageRef.child(`imagenes/${imageName}`);
    return imageRef.getDownloadURL();
  }
}
const starsDataService = new FotoService();

export default starsDataService;