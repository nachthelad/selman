export const openDatabase = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("myDatabase", 2);

    request.onerror = function (event) {
      reject("No se pudo abrir la base de datos");
    };

    request.onupgradeneeded = function (event) {
      const db = event.target.result;
      db.createObjectStore("favorites", { keyPath: "username" });
      db.createObjectStore("categories", { keyPath: "categoryName" });
    };

    request.onsuccess = function (event) {
      resolve(event.target.result);
    };
  });
};

export const saveFavorite = async (favorite) => {
  const db = await openDatabase();
  const transaction = db.transaction(["favorites"], "readwrite");
  const objectStore = transaction.objectStore("favorites");
  const request = objectStore.add(favorite);

  return new Promise((resolve, reject) => {
    transaction.oncomplete = function (event) {
      resolve();
    };

    transaction.onerror = function (event) {
      reject("Error en la transacción: " + transaction.error);
    };

    // Manejar eventos específicos para esta solicitud
    request.onsuccess = function(event) {
      // Código para manejar el éxito de la operación de añadir
      console.log(`Favorito añadido con éxito.`);
    };

    request.onerror = function(event) {
      // Código para manejar errores en la operación de añadir
      console.log(`Error al añadir el favorito.`);
    };
  });
};


export const getAllFavorites = async () => {
  const db = await openDatabase();
  const transaction = db.transaction(["favorites"], "readonly");
  const objectStore = transaction.objectStore("favorites");
  const request = objectStore.getAll();

  return new Promise((resolve, reject) => {
    request.onerror = function (event) {
      reject("Error al obtener los favoritos");
    };

    request.onsuccess = function (event) {
      resolve(request.result);
    };
  });
};

export const saveCategory = async (category) => {
  const db = await openDatabase();
  const transaction = db.transaction(["categories"], "readwrite");
  const objectStore = transaction.objectStore("categories");
  const request = objectStore.add(category);

  return new Promise((resolve, reject) => {
    transaction.oncomplete = function (event) {
      resolve();
    };

    transaction.onerror = function (event) {
      reject("Error al guardar la categoría");
    };

    // Manejar eventos específicos para esta solicitud
    request.onsuccess = function (event) {
      // Código para manejar el éxito de la operación de añadir
      console.log(`Categoría ${category} añadida con éxito.`);
    };

    request.onerror = function (event) {
      // Código para manejar errores en la operación de añadir
      console.log(`Error al añadir la categoría ${category}.`);
    };
  });
};

export const getAllCategories = async () => {
  const db = await openDatabase();
  const transaction = db.transaction(["categories"], "readonly");
  const objectStore = transaction.objectStore("categories");
  const request = objectStore.getAll();

  return new Promise((resolve, reject) => {
    request.onerror = function (event) {
      reject("Error al obtener las categorías");
    };

    request.onsuccess = function (event) {
      resolve(request.result);
    };
  });
};

export const deleteFavorite = async (favoriteId) => {
  return new Promise((resolve, reject) => {
    const openRequest = indexedDB.open("myDatabase", 2);

    openRequest.onerror = function (event) {
      reject("Error al abrir la base de datos");
    };

    openRequest.onsuccess = function (event) {
      const db = event.target.result;

      const transaction = db.transaction(["favorites"], "readwrite");

      const store = transaction.objectStore("favorites");

      const deleteRequest = store.delete(favoriteId);

      deleteRequest.onsuccess = function (event) {
        console.log(event);
        resolve("Elemento eliminado con éxito");
      };

      deleteRequest.onerror = function (event) {
        console.log(event);
        reject("Error al eliminar el elemento");
      };
    };
  });
};

export const deleteCategory = async (categoryName) => {
  return new Promise((resolve, reject) => {
    const openRequest = indexedDB.open("myDatabase", 2);

    openRequest.onerror = function (event) {
      reject("Error al abrir la base de datos");
    };

    openRequest.onsuccess = function (event) {
      const db = event.target.result;
      const transaction = db.transaction(["categories"], "readwrite"); // Asumiendo que tienes un 'objectStore' llamado 'categories'
      const store = transaction.objectStore("categories");
      const deleteRequest = store.delete(categoryName);

      deleteRequest.onsuccess = function (event) {
        resolve("Categoría eliminada con éxito");
      };

      deleteRequest.onerror = function (event) {
        reject("Error al eliminar la categoría");
      };
    };
  });
};