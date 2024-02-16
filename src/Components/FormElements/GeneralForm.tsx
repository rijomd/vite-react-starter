import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { Grid } from '@mui/material';
import { Form, Formik } from 'formik';

import { FormTextField } from './FormTextField';
import { FormSelectField } from './FormSelectField';
import { FormCheckBoxField } from './FormCheckBoxField';
import { FormAutoComplete } from './FormAutoComplete'

import { gridSpacing } from 'Services/Store/GridConstant';

type TypeOptions = {
    label: string,
    value: string | number
}

export type TypeFormValues = {
    name: string;
    label: string;
    type: 'text' | 'number' | 'email' | 'select' | 'HTMLcontent' | 'removeColumns' | 'checkBox' | 'autocomplete';
    placeholder?: string;
    disabled?: boolean;
    required?: boolean;
    HtmlContent?: React.ReactElement;
    options?: TypeOptions[] | undefined;
    grid?: {
        mediumDevice: number;
        largeDevice: number;
    },
    id?: string;
    multipleRows?: number;
    hideColumn?: boolean;
    gridClassName?: string;
    onBlur?: (value: string | number) => void;
    isAutoCompleteMultiple?: boolean;
}

type TypeGeneralForm = {
    initialValues: any;
    formValues: TypeFormValues[];
    validationSchema?: any;
    handleSubmit: (values: any) => void;
    formActionComponents?: React.ReactElement;
}

export const GeneralForm = forwardRef((props: TypeGeneralForm, ref) => {
    const { initialValues = {}, formValues, validationSchema, handleSubmit, formActionComponents } = props;

    const generalFormRef: React.MutableRefObject<any> = useRef(null);

    useImperativeHandle(ref, () => ({
        handleSubmit: () => { generalFormRef.current.handleSubmit(); },
        handleClear: () => { generalFormRef.current.resetForm(); },
    }));

    const onBlur = (item: TypeFormValues, value: string | number) => {
        if (typeof item?.onBlur === 'function') {
            item?.onBlur(value);
        }
    }

    return (
        <>
            {formValues?.length > 0 && <Formik
                enableReinitialize
                initialValues={initialValues}
                validationSchema={validationSchema}
                innerRef={generalFormRef}
                onSubmit={(values) => { handleSubmit(values) }}
            >
                {({ values, errors, touched, handleChange, setFieldValue }) => {
                    return (
                        <Form encType="multipart/form-data">
                            <Grid container spacing={gridSpacing}>
                                {formValues.map((item, key) => {

                                    if (item?.hideColumn) {
                                        return (<></>)
                                    }
                                    else {
                                        if (item?.type === "removeColumns") {
                                            return (
                                                <Grid item className={item?.gridClassName}
                                                    lg={item?.grid?.largeDevice || 3} md={item?.grid?.mediumDevice || 3}
                                                    xs={12} sm={12}
                                                    key={key}>
                                                </Grid>)
                                        }

                                        if (item?.type === "HTMLcontent") {
                                            return (
                                                <Grid item className={item?.gridClassName}
                                                    lg={item?.grid?.largeDevice || 3} md={item?.grid?.mediumDevice || 3}
                                                    xs={12} sm={12} key={key}>
                                                    {item?.HtmlContent}
                                                </Grid>)
                                        }

                                        if (item?.type === "text" || item?.type === "number" || item?.type === "email") {
                                            return (
                                                <Grid item className={item?.gridClassName}
                                                    lg={item?.grid?.largeDevice || 3} md={item?.grid?.mediumDevice || 3}
                                                    xs={12} sm={12} key={key}>
                                                    <FormTextField
                                                        label={item.label}
                                                        value={values?.[item.name]}
                                                        name={item.name}
                                                        disabled={item?.disabled || false}
                                                        type={item?.type}
                                                        multiline={item?.multipleRows ? true : false}
                                                        rows={item?.multipleRows || 0}
                                                        onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                                                            handleChange(e)
                                                        }}
                                                        required={item?.required}
                                                        onBlur={() => onBlur(item, values?.[item.name])}
                                                        error={{ isError: Boolean(errors[item.name]) && Boolean(touched[item.name]), errorMsg: errors[item.name] }}
                                                    />
                                                </Grid>
                                            );
                                        }

                                        if (item?.type === "select") {
                                            return (
                                                <Grid item className={item?.gridClassName}
                                                    lg={item?.grid?.largeDevice || 3} md={item?.grid?.mediumDevice || 3}
                                                    xs={12} sm={12} key={key}>
                                                    <FormSelectField
                                                        label={item?.label}
                                                        value={values?.[item.name]}
                                                        name={item.name}
                                                        options={item?.options || []}
                                                        disabled={item?.disabled || false}
                                                        onChange={handleChange}
                                                        required={item?.required}
                                                        onBlur={() => onBlur(item, values?.[item.name])}
                                                        error={{ isError: Boolean(errors[item.name]) && Boolean(touched[item.name]), errorMsg: errors[item.name], }}
                                                    />
                                                </Grid>
                                            );
                                        }

                                        if (item?.type === "autocomplete") {
                                            return (
                                                <Grid item className={item?.gridClassName}
                                                    lg={item?.grid?.largeDevice || 3} md={item?.grid?.mediumDevice || 3}
                                                    xs={12} sm={12} key={key}>
                                                    <FormAutoComplete
                                                        label={item?.label}
                                                        value={values?.[item.name]}
                                                        name={item.name}
                                                        options={item?.options || []}
                                                        disabled={item?.disabled || false}
                                                        onChange={(value: any) => { setFieldValue(item.name, value) }}
                                                        required={item?.required}
                                                        multiple={item?.isAutoCompleteMultiple}
                                                        onBlur={() => onBlur(item, values?.[item.name])}
                                                        error={{ isError: Boolean(errors[item.name]) && Boolean(touched[item.name]), errorMsg: errors[item.name], }}
                                                    />
                                                </Grid>
                                            );
                                        }

                                        if (item?.type === "checkBox") {
                                            return (
                                                <Grid item className={item?.gridClassName}
                                                    lg={item?.grid?.largeDevice || 3} md={item?.grid?.mediumDevice || 3}
                                                    xs={12} sm={12} key={key}>
                                                    <FormCheckBoxField
                                                        label={item?.label}
                                                        onChange={(e) => { setFieldValue(item.name, e.target.checked); }}
                                                        checked={values?.[item.name]}
                                                        name={item?.name}
                                                        disabled={item?.disabled || false}
                                                    />
                                                </Grid>
                                            );
                                        }

                                    }
                                })}

                                {formActionComponents && <Grid item lg={12} md={12} xs={12} sm={12} style={{ textAlign: "right" }}>
                                    {formActionComponents}
                                </Grid>}

                            </Grid>
                        </Form>)
                }}
            </Formik>}

        </>
    )
});