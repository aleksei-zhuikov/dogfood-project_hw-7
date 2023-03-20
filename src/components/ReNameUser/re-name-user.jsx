import { useContext } from "react"
import { useForm } from "react-hook-form"
import { Link, useLocation, useNavigate } from "react-router-dom"
import api from "../../utils/api"
import Form from "../Form/form"
import { FormButton } from "../FormButton/form-button"
import { FormInput } from "../FormInput/form-input"
import { UserContext } from '../../context/userContext';
import { VALIDATE_CONFIG } from "../../utils/contants"


export const ReNameUser = () => {

    const { register, handleSubmit, formState: { errors } } = useForm({ mode: "onBlur" })
    const navigate = useNavigate()

    const { user: currentUser, setCurrentUser } = useContext(UserContext);
    // console.log('from re-name-jsx >>>>>>', currentUser)

    const sendChangeName = async (data) => {
        // console.log('send data from re-name-user-jsx', data);

        try {
            const responseData = await api.changeUserName(data);

            setCurrentUser({
                ...currentUser,
                name: responseData.name,
                about: responseData.about,
            })
            // console.log('responseData from TRY re-name-user-jsx >>>>', responseData)
            navigate('/')

        } catch (error) {

            alert(error)
        }
    }

    const newNameRegister = register('name', {
        required: {
            value: true,
            message: VALIDATE_CONFIG.requiredMessage
        }
    })

    const aboutMeRegister = register('about', {
        required: {
            value: true,
            message: VALIDATE_CONFIG.requiredMessage
        }
    })

    return (
        <Form title="Редактировать свои данные" handleFormSubmit={handleSubmit(sendChangeName)}>
            <FormInput
                {...newNameRegister}
                id="name"
                type="text"
                placeholder="введите ваше новое имя"
            />
            {errors?.name && <p className='errorMessage'>{errors?.name?.message}</p>}


            <FormInput
                {...aboutMeRegister}
                id="about"
                type="text"
                placeholder="напишите вашу профессию"
            />
            {errors?.about && <p className='errorMessage'>{errors?.about?.message}</p>}


            <FormButton type="submit" color="yellow" >Переименовать</FormButton>

        </Form>
    )
}