import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { addDoc } from "firebase/firestore";

import { useState } from "react";

export default function AddTodo({ dbRef }) {
  const createItem = async () => {
    await addDoc(dbRef, { Item: item, amount });
  };
  const [item, setItem] = useState("");
  const [amount, setAmount] = useState(0);
  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Name:</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Item"
          onChange={(e) => setItem(e.target.value)}
        />
        <Form.Text className="text-muted">
          Enter new item to the list.
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Amount</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter Amount"
          onChange={(e) => setAmount(e.target.value)}
        />
        <Form.Text className="text-muted">
          Enter new item to the list.
        </Form.Text>
      </Form.Group>
      <Button onClick={createItem}>Add Todo</Button>
    </Form>
  );
}
