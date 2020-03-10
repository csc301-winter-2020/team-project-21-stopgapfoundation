import React from 'react';
import Navbar from "../Navbar/index"
import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';
import Textarea from 'muicss/lib/react/textarea';
import Button from 'muicss/lib/react/button';
import './styles.css';

class RequestForm extends React.Component {
    render() {
        return (
            <div>
                <Navbar title="Request Form" />
                <Form id='requestForm'>
                    <legend>Ramp Request</legend>
                    <Input placeholder="First Name" />
                    <Input placeholder="Last Name" />
                    <Textarea placeholder="Textarea" />
                    <Button variant="raised">Submit</Button>
                </Form>



            </div>

        )
    }


}
export default RequestForm;