/**
 * Generic storage for files
 */
const FileStorage = () => {
  // stub implementation of in memory storage
  const inMemoryStorage = {};

  const save = async (path, content) => {
    inMemoryStorage[path] = content;
  };

  const get = async (path) => {
    return inMemoryStorage[path];
  };

  return { save, get };
};

module.exports = FileStorage;
