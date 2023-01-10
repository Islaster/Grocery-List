import { updateDoc, doc } from "firebase/firestore";

export const updateItem = async (db, id, item, amount) => {
  const itemDoc = doc(db, "GroceryList", id);
  const newFields = { Item: item, amount };
  await updateDoc(itemDoc, newFields);
};
