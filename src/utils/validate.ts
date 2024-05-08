import { FormData, FormError, ValidateSchema } from "../store/types"

const validEmail: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const validateForm = (validateSchema: ValidateSchema<any>[]) => {

    let errors: FormError = {}
    validateSchema.map(schema => {
        const { name, type, value } = schema

        if (value === '' || value === null) {
            let error = {
                [name]: `Please insert ${name}.`
            }
            if(type === 'boolean') {
                error = {
                    [name]: `Please select ${name}.`
                }
            }
            errors = { ...errors, ...error }
        }
        else if (Array.isArray(value) && value.length < 1) {
            let error = {}
            if (type === 'file') {
                error = {
                    [name]: `Please upload ${name}.`
                }
            }
            else if (type === 'checkbox') {
                error = {
                    [name]: `Please choose ${name}.`
                }
            }
            errors = { ...errors, ...error }
        }

        else {
            switch (type) {
                case 'number':
                    if (value <= 0) {
                        const error = {
                            [name]: `Please insert valid ${name}.`
                        }
                        errors = { ...errors, ...error }

                    }

                    break;

                default:
                    break;
            }
        }

    })


    return errors
}

export default validateForm