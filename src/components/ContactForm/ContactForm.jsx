import { Form, Label, Input, Button } from "./ContactForm.styled";
import { nanoid } from "nanoid";
import React, { useState } from 'react'

const ContactForm = ({addContact}) => {
    const [data, setData] = useState({
        name: '',
        number: '',
    })

    const handleChange = ({target:{name, value}}) => {
        setData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const newContact = {
            id: nanoid(),
            ...data,
        };

        addContact(newContact);
        setData({
            name: '',
            number: '',
        });
    }

    return (
      <Form onSubmit={handleSubmit}>
        <Label>Name
            <Input type="text" name="name" value={data.name} onChange={handleChange} required />
        </Label>
        <Label>Number
            <Input type="tel" name="number" value={data.number} onChange={handleChange} required />
        </Label>
        <Button type="submit">Add contact</Button>
      </Form>
    )
}

export default ContactForm
