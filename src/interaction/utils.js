
export const replaceInCollection = (collection, oldItem, newItem)=> {
  const index = collection.getArray().indexOf(oldItem);
  if (index < 0) {
    throw new Error('attempting to replace non-existent element');
  }
  collection.remove(oldItem);
  collection.insertAt(index, newItem);
};
