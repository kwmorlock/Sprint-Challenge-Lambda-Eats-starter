import React, { useState, useEffect } from "react";
import axios from "axios";
import * as yup from "yup";


const formSchema = yup.object().shape({
    name: yup.string().required("please input a name").min(2, "name must be more than 2 characters"),
    size: yup.string().required("must include a size for your pizza"),
});

export default function Form() {
    // state for whether our button should be disabled or not.
    const [buttonDisabled, setButtonDisabled] = useState(true);

    // managing state for our form inputs
    const [formState, setFormState] = useState({
        name: "",
        size: "",
    });

    // state for our errors
    const [errors, setErrors] = useState({
        name: "",
        size: "",
    });

    // new state to set our post request too. So we can console.log and see it.
    const [post, setPost] = useState([]);

    useEffect(() => {
        formSchema.isValid(formState).then(valid => {
            setButtonDisabled(!valid);
        });
    }, [formState]);

    const formSubmit = e => {
        e.preventDefault();
        axios
            .post("https://reqres.in/api/orders", formState)
            .then(res => {
                setPost(res.data); // get just the form data from the REST api

                // reset form if successful
                setFormState({
                    name: "",
                    size: "",
                });
            })
            .catch(err => console.log(err.response));
    };

    const validateChange = e => {
        // Reach will allow us to "reach" into the schema and test only one part.
        yup
            .reach(formSchema, e.target.name)
            .validate(e.target.value)
            .then(valid => {
                setErrors({
                    ...errors,
                    [e.target.name]: ""
                });
            })
            .catch(err => {
                setErrors({
                    ...errors,
                    [e.target.name]: err.errors[0]
                });
            });
    };

    const inputChange = e => {
        e.persist();
        const newFormData = {
            ...formState,
            [e.target.name]:
                e.target.type === "checkbox" ? e.target.checked : e.target.value
        };

        validateChange(e);
        setFormState(newFormData);
    };

    return (
        <form onSubmit={formSubmit}>
            <h1>Set up your food</h1>
            <label htmlFor="name">
                Name: 
        <input
                    type="text"
                    name="name"
                    value={formState.name}
                    onChange={inputChange}
                />
                {errors.name.length > 0 ? <p className="error">{errors.name}</p> : null}
            </label> <br/>
            <label htmlFor="size">
                What size pizza would you like?
                 <select 
                    id="size" 
                    name="size" 
                    onChange={inputChange}>
                    <option value="small">small</option>
                    <option value="medium">medium</option>
                    <option value="large">large</option>
                </select>
            </label> <br/>
            
            <pre>{JSON.stringify(post, null, 2)}</pre>
            <button disabled={buttonDisabled}>Submit</button>
        </form>
    );
}