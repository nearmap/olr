
export const replaceInCollection = (collection, oldItem, newItem)=> {
  const index = collection.getArray().indexOf(oldItem);
  collection.remove(oldItem);
  collection.insertAt(index, newItem);
};
