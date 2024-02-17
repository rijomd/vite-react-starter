import * as Yup from 'yup';
import { Box } from "@mui/material";

import { GeneralForm, TypeFormValues, FormButtonField } from 'Components/FormElements'

export const UserForm = ({ formRef }: { formRef?: any }) => {


    const Schema = Yup.object().shape({
        firstName: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        email: Yup.string().required('Required'),
    });

    const initialValues = {
        firstName: '',
        email: '',
        country: [],
        isNew: false
    };

    const formValues: TypeFormValues[] = [
        {
            name: 'firstName',
            label: 'First Name',
            type: 'text',
            required: true,
        },
        {
            name: 'email',
            label: 'Email',
            type: 'select',
            options: [
                { label: 'apple', value: '101' },
                { label: 'orange', value: '111' },
                { label: 'banana', value: '123' }
            ],
            required: true,
        },
        {
            name: 'country',
            label: 'Country',
            type: 'autocomplete',
            options: [
                { label: 'India', value: 'in' },
                { label: 'Uae', value: 'uae' },
                { label: 'England', value: 'eng' }
            ],
            required: true,
            isAutoCompleteMultiple: true
        },
        {
            name: 'isNew',
            label: 'Is New',
            type: 'checkBox'
        },
    ];

    const handleSubmit = (values: any) => {
        console.log(values);
    }

    return (
        <Box sx={{ margin: '8px 4px' }}>
            <GeneralForm
                handleSubmit={handleSubmit}
                initialValues={initialValues}
                validationSchema={Schema}
                formValues={formValues}
                ref={formRef}
            />
            <FormButtonField sx={{ display: 'none' }} >Save</FormButtonField>
        </Box>
    )

}