import React from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../../components/controls/Controls";
import { useForm, Form } from '../../components/useForm';
import * as employeeService from "../../services/employeeService";

const initialFValues = {
    landlord_id: 0,
    landlord_name: '',
    Rate: '',
    location: '',
    departmentId: '',
    create: new Date(),
    isPermanent: false,
}

export default function Createlandlord(props) {
    const { addOrEdit, recordForEdit } = props

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('landlord_name' in fieldValues)
            temp.landlord_name = fieldValues.landlord_name ? "" : "This field is required."
        if ('email' in fieldValues)
            temp.email = (/$^|.+@.+..+/).test(fieldValues.email) ? "" : "Email is not valid."
        if ('departmentId' in fieldValues)
            temp.departmentId = fieldValues.departmentId.length != 0 ? "" : "This field is required."
        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFValues, true, validate);

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            addOrEdit(values, resetForm);
        }
    }

    useEffect(() => {
        if (recordForEdit != null)
            setValues({
                ...recordForEdit
            })
    }, [recordForEdit])

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                    <Controls.Input
                        name="landlord_name"
                        label="Landlord Name"
                        value={values.landlord_name}
                        onChange={handleInputChange}
                        error={errors.landlord_name}
                    />
                    <Controls.Input
                        label="Rate"
                        name="Rate"
                        value={values.Rate}
                        onChange={handleInputChange}
                        error={errors.Rate}
                    />
                    <Controls.Input
                        label="Location"
                        name="location"
                        value={values.location}
                        onChange={handleInputChange}
                    />
                    <Controls.DatePicker
                        name="create"
                        label="create Date"
                        value={values.create}
                        onChange={handleInputChange}
                    />
                    <div>
                        <Controls.Button
                            type="submit"
                            text="Submit" />
                        <Controls.Button
                            text="Reset"
                            color="default"
                            onClick={resetForm} />
                    </div>
                </Grid>
            </Grid>
        </Form>
    )
}
