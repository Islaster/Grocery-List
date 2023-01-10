import "./App.css";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import AddItem from "./components/AddItem/AddItem";
import {
  collection,
  setDoc,
  deleteDoc,
  doc,
  query,
  onSnapshot,
  getDocs,
} from "firebase/firestore";
import { db, firestore } from "./firebase_setup/firebase";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [list, setList] = useState([]);
  const listCollectionRef = collection(db, "GroceryList");
  const deleteItem = async (id) => {
    const itemDoc = doc(db, "GroceryList", id);
    await deleteDoc(itemDoc);
  };
  useEffect(() => {
    const getList = async () => {
      const data = await getDocs(listCollectionRef);
      setList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      console.log(list);
    };
    getList();
  }, []);
  return (
    <div className="App">
      <header>
        <h1>Grocery List</h1>
      </header>
      <Button variant="primary" onClick={handleShow}>
        Add Item
      </Button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <AddItem dbRef={listCollectionRef} />
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal>
      <ul>
        {list.length ? (
          list.map((e, i) => (
            <li key={i}>
              {e.amount} {e.Item}
              <Button
                onClick={() => {
                  deleteItem(e.id);
                }}
              >
                Finished
              </Button>
            </li>
          ))
        ) : (
          <h1>No Items on List</h1>
        )}
      </ul>
    </div>
  );
}

export default App;
