import React, { useState, useEffect } from "react";
import axios from "axios";
import * as yup from "yup";
import {Link} from "react-router-dom"


const formSchema = yup.object().shape({
    name: yup.string().required("please input a name").min(2, "name must be more than 2 characters"),
    size: yup.string().required("must include a size for your pizza"),
    topping1: yup.boolean().oneOf([true || false]),
    topping2: yup.boolean().oneOf([true || false]),
    topping3: yup.boolean().oneOf([true || false]),
    topping4: yup.boolean().oneOf([true || false]),
    instructions: yup.string().required("please input instructions"),
});

export default function Form() {
    
    const [buttonDisabled, setButtonDisabled] = useState(true);

 
    const [formState, setFormState] = useState({
        name: "",
        size: "",
        // topping1: "",
        instructions: "",
    });

    const [errors, setErrors] = useState({
        name: "",
        size: "",
        topping1: "",
        topping2: "",
        topping3: "",
        topping4: "",
        instructions: "",
    });

    
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
                setPost(res.data); 

               
                setFormState({
                    name: "",
                    size: "",
                    topping1: "",
                    topping2: "",
                    topping3: "",
                    topping4: "",
                    instructions: "",
                });
            })
            .catch(err => console.log(err.response));
    };

    // const validateChange = e => {
       
    //     yup
    //         .reach(formSchema, e.target.name)
    //         .validate(e.target.value)
    //         .then(valid => {
    //             setErrors({
    //                 ...errors,
    //                 [e.target.name]: ""
    //             });
    //         })
    //         .catch(err => {
    //             setErrors({
    //                 ...errors,
    //                 [e.target.name]: err.errors[0]
    //             });
    //         });
    // };

    // const inputChange = e => {
    //     e.persist();
    //     const newFormData = {
    //         ...formState,
    //         [e.target.name]:
    //             e.target.type === "checkbox" ? e.target.checked : e.target.value
    //     };

    //     validateChange(e);
    //     setFormState(newFormData);
    // };


    const validateChange = e => {
        yup 
            .reach(formSchema, e.target.name)
            .validate(e.target.name ? e.target.checked : e.target.value)
            

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
            e.target.type  === "checkbox" ? e.target.checked : e.target.value
        };
        validateChange(e);
        setFormState(newFormData);
    };


    return (
        <form onSubmit={formSubmit}>

           <Link to={"/"}>
                <div>Home</div>
            </Link>

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

            <label htmlFor="topping1">
                Pepperoni
                <input
                    id='topping1'
                    type='checkbox'
                    name='topping1'
                    value={formState.topping1}
                    onChange={inputChange}
                />
                 {errors.topping1.length > 0 ? <p className="error">{errors.topping1}</p> : null} 
            </label>

            <label htmlFor="topping2">
                Black Olives
                <input
                    id='topping2'
                    type='checkbox'
                    name='topping2'
                    value={formState.topping2}
                    onChange={inputChange}
                />
                 {errors.topping2.length > 0 ? <p className="error">{errors.topping2}</p> : null} 
            </label>

            <label htmlFor="topping3">
                Green Peppers
                <input
                    id='topping3'
                    type='checkbox'
                    name='topping3'
                    value={formState.topping3}
                    onChange={inputChange}
                />
                 {errors.topping3.length > 0 ? <p className="error">{errors.topping3}</p> : null} 
            </label>

            <label htmlFor="topping4">
                Red Peppers
                <input
                    id='topping4'
                    type='checkbox'
                    name='topping4'
                    value={formState.topping4}
                    onChange={inputChange}
                />
                 {errors.topping4.length > 0 ? <p className="error">{errors.topping4}</p> : null} 
            </label>

            <label htmlFor="instructions">
                Special Instructions
                <textarea
                    id='instructions'
                    name='instructions'
                    value={formState.instructrions}
                    onChange={inputChange}
                />
                 {errors.topping4.length > 0 ? <p className="error">{errors.topping4}</p> : null} 
            </label>

            <pre>{JSON.stringify(post, null, 2)}</pre>
            <button disabled={buttonDisabled}>Submit</button>
        </form>
    );
}